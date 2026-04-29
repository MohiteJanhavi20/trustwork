import re

from modules.phone_checker import check_phone
from modules.link_scanner import check_link
from modules.template_detector import check_text


class FakeTextPayload:
    def __init__(self, text):
        self.text = text


def clean_phone(text):

    cleaned = re.sub(r"\D", "", text)

    if cleaned.startswith("91") and len(cleaned) > 10:
        cleaned = cleaned[2:]

    return cleaned


async def calculate_final_score(payload: dict):

    user_input = payload.get("input", "").strip()

    # ---------------------------------------------------
    # PHONE DETECTION
    # ---------------------------------------------------

    cleaned = clean_phone(user_input)

    if (
        len(cleaned) == 10 and
        cleaned[0] in ["6", "7", "8", "9"]
    ):

        result = await check_phone(user_input)

        message = "Number appears valid"

        if result["risk_score"] > 65:
            message = "Phone number flagged as suspicious"

        return {
            "score": result["risk_score"],
            "verdict": result["verdict"],
            "message": message,
            "input_type": "phone",
            "details": result
        }

    # ---------------------------------------------------
    # URL DETECTION
    # ---------------------------------------------------

    is_url = (

        user_input.startswith("http://") or

        user_input.startswith("https://") or

        (
            "." in user_input and
            " " not in user_input
        )
    )

    if is_url:

        result = await check_link(user_input)

        message = "Domain appears established"

        if result["risk_score"] > 65:
            message = "Suspicious domain detected"

        return {
            "score": result["risk_score"],
            "verdict": result["verdict"],
            "message": message,
            "input_type": "url",
            "details": result
        }

    # ---------------------------------------------------
    # DEFAULT → TEXT SCAN
    # ---------------------------------------------------

    fake_payload = FakeTextPayload(user_input)

    result = await check_text(fake_payload)

    message = "No major scam patterns found"

    if result["patterns_matched"] > 0:

        message = (
            f"{result['patterns_matched']} scam pattern(s) detected"
        )

    return {
        "score": result["risk_score"],
        "verdict": result["verdict"],
        "message": message,
        "input_type": "text",
        "details": result
    }