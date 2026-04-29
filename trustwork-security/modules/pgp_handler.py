import base64
import secrets
from datetime import datetime

from fastapi import APIRouter
from pydantic import BaseModel

from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import hashes

from db import anonymous_reports_collection

router = APIRouter()


class ReportInput(BaseModel):
    report: str


@router.post("/submit-report")
async def submit_report(payload: ReportInput):

    report_text = payload.report

    # ---------------------------------------------------
    # RSA KEY GENERATION
    # ---------------------------------------------------

    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048
    )

    public_key = private_key.public_key()

    # ---------------------------------------------------
    # LIMIT SIZE FOR RSA
    # ---------------------------------------------------

    truncated_report = report_text[:190]

    # ---------------------------------------------------
    # ENCRYPT REPORT
    # ---------------------------------------------------

    encrypted_data = public_key.encrypt(
        truncated_report.encode(),

        padding.OAEP(
            mgf=padding.MGF1(
                algorithm=hashes.SHA256()
            ),

            algorithm=hashes.SHA256(),
            label=None
        )
    )

    # Convert to base64
    encrypted_base64 = base64.b64encode(
        encrypted_data
    ).decode()

    # ---------------------------------------------------
    # GENERATE TRACKING TOKEN
    # ---------------------------------------------------

    tracking_token = secrets.token_hex(16)

    # ---------------------------------------------------
    # STORE IN DATABASE
    # ---------------------------------------------------

    anonymous_reports_collection.insert_one({

        "tracking_token": tracking_token,

        "encrypted_report": encrypted_base64,

        "status": "pending",

        "created_at": datetime.utcnow()

    })

    # ---------------------------------------------------
    # RESPONSE
    # ---------------------------------------------------

    return {

        "status": "Report received anonymously",

        "tracking_token": tracking_token,

        "message": (
            "Your identity is fully hidden. "
            "Save this token — you will need it to track your report."
        ),

        "encrypted_preview": encrypted_base64[:50] + "...",

        "security_note": (
            "This report is encrypted. "
            "Even TrustWork admins cannot read it without the private key."
        )
    }


@router.get("/track-report")
async def track_report(token: str):

    report = anonymous_reports_collection.find_one({
        "tracking_token": token
    })

    if not report:

        return {
            "status": "not found",
            "note": "Check if you copied the token correctly"
        }

    return {

        "token": token,

        "status": report["status"],

        "created_at": report["created_at"],

        "note": "Your identity remains hidden throughout"
    }