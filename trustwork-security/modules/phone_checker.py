import os
import re
import httpx

from fastapi import APIRouter
from dotenv import load_dotenv

from db import scam_phones_collection

# Load environment variables
load_dotenv()

router = APIRouter()

NUMVERIFY_KEY = os.getenv("NUMVERIFY_KEY")
ABSTRACT_KEY = os.getenv("ABSTRACT_KEY")


def clean_number(number: str):
    """
    Remove +91, spaces, dashes and non-digit chars
    """

    cleaned = re.sub(r"\D", "", number)

    if cleaned.startswith("91") and len(cleaned) > 10:
        cleaned = cleaned[2:]

    return cleaned


def generate_verdict(score: int):

    if score > 65:
        return "HIGH RISK"

    elif score >= 31:
        return "MEDIUM RISK"

    return "LOW RISK"


@router.get("/check-phone")
async def check_phone(number: str):

    risk_score = 0
    flags = []

    cleaned = clean_number(number)

    # ---------------------------------------------------
    # STEP 1 — DATABASE CHECK
    # ---------------------------------------------------

    existing = scam_phones_collection.find_one({
        "phone": cleaned
    })

    if existing:

        return {
            "phone": f"+91 {cleaned}",
            "risk_score": 95,
            "verdict": "HIGH RISK",
            "source": "community_database",
            "flags": [
                "This number has been flagged and reported as a scam number in our database"
            ],
            "carrier_info": {
                "carrier": "Unknown",
                "line_type": "Unknown",
                "valid": False,
                "location": "Unknown"
            }
        }

    # ---------------------------------------------------
    # STEP 2 — BASIC RULE CHECKS
    # ---------------------------------------------------

    # Invalid length
    if len(cleaned) != 10:

        return {
            "phone": cleaned,
            "risk_score": 30,
            "verdict": "MEDIUM RISK",
            "source": "rule_and_api_check",
            "flags": [
                "Invalid length — Indian mobile numbers must be 10 digits"
            ],
            "carrier_info": {}
        }

    # Invalid starting digit
    if cleaned[0] not in ["6", "7", "8", "9"]:

        risk_score += 40

        flags.append(
            "Does not start with 6/7/8/9 — not a valid Indian mobile number"
        )

    # Scam prefixes
    scam_prefixes = [
        "9999",
        "8888",
        "7000",
        "7001",
        "6000",
        "7676",
        "8676",
        "9191",
        "8181",
        "9090"
    ]

    prefix4 = cleaned[:4]

    if prefix4 in scam_prefixes:

        risk_score += 40

        flags.append(
            f"Known scam prefix detected: {prefix4}"
        )

    # Suspicious telecom series
    suspicious_series = ["700", "600"]

    prefix3 = cleaned[:3]

    if prefix3 in suspicious_series:

        risk_score += 20

        flags.append(
            f"Suspicious number series: {prefix3}"
        )

    # Same digit repeated
    if len(set(cleaned)) == 1:

        risk_score += 30

        flags.append(
            "Repeated digits — likely a fake or test number"
        )

    # Sequential numbers
    if cleaned in [
        "1234567890",
        "0987654321"
    ]:

        risk_score += 30

        flags.append(
            "Sequential digits — fake number"
        )

    # ---------------------------------------------------
    # STEP 3 — API LOOKUPS
    # ---------------------------------------------------

    carrier = "Unknown"
    line_type = "Unknown"
    valid = True
    location = "Unknown"

    # NumVerify API
    try:

        numverify_url = (
            f"http://apilayer.net/api/validate"
            f"?access_key={NUMVERIFY_KEY}"
            f"&number=91{cleaned}"
            f"&country_code=IN"
            f"&format=1"
        )

        async with httpx.AsyncClient(timeout=10) as client:

            response = await client.get(numverify_url)

            data = response.json()

            if data.get("valid") is False:

                risk_score += 40

                flags.append(
                    "API confirms this number is invalid or unassigned"
                )

                valid = False

            carrier = data.get("carrier") or carrier
            line_type = data.get("line_type") or line_type
            location = data.get("location") or location

    except Exception as e:

        flags.append("NumVerify lookup failed")

    # Abstract API
    try:

        abstract_url = (
            f"https://phonevalidation.abstractapi.com/v1/"
            f"?api_key={ABSTRACT_KEY}"
            f"&phone=91{cleaned}"
        )

        async with httpx.AsyncClient(timeout=10) as client:

            response = await client.get(abstract_url)

            data = response.json()

            if data.get("valid") is False:

                risk_score += 40

                flags.append(
                    "API confirms this number is invalid or unassigned"
                )

                valid = False

            api_type = data.get("type", "")

            if api_type:
                line_type = api_type

            api_carrier = data.get("carrier")

            if isinstance(api_carrier, dict):
                carrier = api_carrier.get("name", carrier)

    except Exception as e:

        flags.append("Abstract API lookup failed")

    # ---------------------------------------------------
    # STEP 4 — LINE TYPE CHECKS
    # ---------------------------------------------------

    if str(line_type).lower() == "voip":

        risk_score += 30

        flags.append(
            "VoIP number — commonly used by scammers to hide identity"
        )

    elif str(line_type).lower() == "landline":

        risk_score += 15

        flags.append(
            "Landline used as recruiter contact — unusual"
        )

    # Cap score at 100
    risk_score = min(risk_score, 100)

    verdict = generate_verdict(risk_score)

    return {
        "phone": f"+91 {cleaned}",
        "risk_score": risk_score,
        "verdict": verdict,
        "source": "rule_and_api_check",
        "flags": flags,
        "carrier_info": {
            "carrier": carrier,
            "line_type": line_type,
            "valid": valid,
            "location": location
        }
    }