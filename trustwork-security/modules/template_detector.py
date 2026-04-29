import re

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class TextInput(BaseModel):
    text: str


def generate_verdict(score):

    if score > 65:
        return "HIGH RISK"

    elif score >= 31:
        return "MEDIUM RISK"

    return "LOW RISK"


@router.post("/check-text")
async def check_text(payload: TextInput):

    text = payload.text.lower()

    risk_score = 0

    flags = []

    detailed_matches = []

    # ---------------------------------------------------
    # SCAM PATTERNS
    # ---------------------------------------------------

    patterns = [

        # HIGH RISK
        {
            "regex": r"registration fee|joining fee|security deposit|training fee|activation fee",
            "weight": 65,
            "flag": "Upfront fee demand — the #1 red flag in Indian job scams"
        },

        {
            "regex": r"send.*aadhaar|send.*aadhar|send.*pan card|send.*bank.*detail|send.*account.*number|send.*otp|share.*aadhaar|upload.*aadhaar",
            "weight": 70,
            "flag": "Requesting sensitive personal documents (Aadhaar/PAN/OTP)"
        },

        {
            "regex": r"lottery|prize|winner|congratulations.*job|selected.*candidate|you have been selected|lucky.*candidate",
            "weight": 55,
            "flag": "Lottery-style job offer — classic scam format"
        },

        {
            "regex": r"prepaid task|task.*earn|complete.*task.*money|task.*paise|task.*commission|youtube.*like.*earn|telegram.*task.*earn",
            "weight": 50,
            "flag": "Prepaid task scam — a rapidly growing fraud type in India"
        },

        # MEDIUM RISK
        {
            "regex": r"work from home.*earn|earn.*per day|₹\d+.*daily|rs\.?\s*\d+.*per day|earn \d+ daily|daily income",
            "weight": 45,
            "flag": "Unrealistic work-from-home earning claim"
        },

        {
            "regex": r"guaranteed.*salary|guaranteed.*income|100%.*placement|assured.*job|income guaranteed|salary guaranteed",
            "weight": 40,
            "flag": "Guaranteed income claim — real companies never promise this"
        },

        {
            "regex": r"foreign.*job|abroad.*opportunity|gulf.*vacancy|dubai.*job.*free|canada.*job.*free|uk.*job.*free|visa.*free.*job",
            "weight": 45,
            "flag": "Suspicious foreign job offer"
        },

        {
            "regex": r"no experience.*required.*salary|fresher.*\d{4,}.*month|no qualification.*\d{4,}",
            "weight": 35,
            "flag": "No experience but high salary — unrealistic promise"
        },

        {
            "regex": r"online.*typing.*job|data entry.*earn|click.*ads.*earn|survey.*earn.*daily|watching.*video.*earn",
            "weight": 40,
            "flag": "Known online fraud job category"
        },

        {
            "regex": r"part.?time.*\d{4,}|home.*based.*\d{4,}|online.*job.*\d{4,}|ghar.*baithe.*\d{4,}",
            "weight": 35,
            "flag": "Unusually high salary claimed for part-time or home-based work"
        },

        # LOW RISK
        {
            "regex": r"whatsapp.*only|apply.*whatsapp|contact.*whatsapp|message.*whatsapp|join.*whatsapp.*group",
            "weight": 30,
            "flag": "WhatsApp-only recruitment"
        },

        {
            "regex": r"urgent.*hiring|immediate.*joining|apply.*today.*only|limited.*seats|last.*date.*today|hurry.*apply",
            "weight": 25,
            "flag": "Urgency pressure tactic"
        },

        {
            "regex": r"telegram.*group|join.*telegram|apply.*telegram|contact.*telegram",
            "weight": 25,
            "flag": "Telegram-based recruitment"
        },

        {
            "regex": r"call.*now.*job|call.*immediately.*job|call.*for.*interview.*now|contact.*immediately.*job",
            "weight": 25,
            "flag": "Pressure to call immediately"
        },

        {
            "regex": r"interview.*fee|shortlisting.*fee|background.*check.*fee|id.*verification.*fee",
            "weight": 60,
            "flag": "Fee for interview/verification"
        }

    ]

    # ---------------------------------------------------
    # CHECK PATTERNS
    # ---------------------------------------------------

    for pattern in patterns:

        if re.search(pattern["regex"], text, re.IGNORECASE):

            risk_score += pattern["weight"]

            flags.append(pattern["flag"])

            detailed_matches.append({
                "pattern": pattern["flag"],
                "weight": pattern["weight"]
            })

    # Cap score
    risk_score = min(risk_score, 100)

    verdict = generate_verdict(risk_score)

    # ---------------------------------------------------
    # ADVICE
    # ---------------------------------------------------

    if verdict == "HIGH RISK":

        advice = (
            "DO NOT respond to this message. "
            "Do NOT share documents or pay fees. "
            "Report to cybercrime.gov.in or call 1930."
        )

    elif verdict == "MEDIUM RISK":

        advice = (
            "Be cautious. Verify the company on MCA.gov.in before proceeding. "
            "Never pay fees or share Aadhaar/PAN before joining."
        )

    else:

        advice = (
            "No major red flags found. "
            "Still verify the company officially before sharing personal information."
        )

    return {
        "risk_score": risk_score,
        "verdict": verdict,
        "flags": flags,
        "patterns_matched": len(detailed_matches),
        "detailed_matches": detailed_matches,
        "advice": advice
    }