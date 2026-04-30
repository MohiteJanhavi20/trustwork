import hashlib
import io

import exifread

from fastapi import APIRouter, UploadFile, File

router = APIRouter()


# ---------------------------------------------------
# VERDICT ENGINE
# ---------------------------------------------------

def generate_verdict(score):

    if score >= 70:
        return "HIGH RISK"

    elif score >= 40:
        return "MEDIUM RISK"

    return "LOW RISK"


@router.post("/check-image")
async def check_image(file: UploadFile = File(...)):

    risk_score = 0

    flags = []

    # ---------------------------------------------------
    # READ FILE
    # ---------------------------------------------------

    contents = await file.read()

    file_hash = hashlib.md5(contents).hexdigest()

    file_size_kb = round(len(contents) / 1024, 2)

    # IMPORTANT:
    # Use BytesIO because file.file pointer becomes unreliable
    # after reading contents
    image_stream = io.BytesIO(contents)

    # ---------------------------------------------------
    # READ EXIF METADATA
    # ---------------------------------------------------

    tags = exifread.process_file(
        image_stream,
        details=False
    )

    # ---------------------------------------------------
    # DEFAULT METADATA
    # ---------------------------------------------------

    metadata = {
        "file_hash": file_hash,
        "file_size_kb": file_size_kb,
        "software": None,
        "camera_make": None,
        "camera_model": None,
        "date_taken": None,
        "GPS_latitude": None,
        "GPS_longitude": None
    }

    # ---------------------------------------------------
    # CHECK 1 — NO EXIF DATA
    # ---------------------------------------------------

    if not tags:

        risk_score += 40

        flags.append(
            "No EXIF metadata found — image may be screenshot, compressed, or edited"
        )

    else:

        # ---------------------------------------------------
        # CHECK 2 — GPS METADATA
        # ---------------------------------------------------

        gps_lat = tags.get("GPS GPSLatitude")
        gps_long = tags.get("GPS GPSLongitude")

        if gps_lat or gps_long:

            risk_score += 15

            flags.append(
                "GPS metadata present in image"
            )

            metadata["GPS_latitude"] = str(gps_lat)
            metadata["GPS_longitude"] = str(gps_long)

        # ---------------------------------------------------
        # CHECK 3 — EDITING SOFTWARE DETECTION
        # ---------------------------------------------------

        software = tags.get("Image Software")

        if software:

            software_name = str(software)

            metadata["software"] = software_name

            suspicious_software = [
                "photoshop",
                "gimp",
                "canva",
                "paint",
                "lightroom",
                "pixlr",
                "snapseed",
                "picsart",
                "illustrator",
                "inkscape",
                "adobe"
            ]

            lower_software = software_name.lower()

            for tool in suspicious_software:

                if tool in lower_software:

                    risk_score += 35

                    flags.append(
                        f"Image editing software detected: {software_name}"
                    )

                    break

        # ---------------------------------------------------
        # CHECK 4 — CAMERA INFORMATION
        # ---------------------------------------------------

        camera_make = tags.get("Image Make")
        camera_model = tags.get("Image Model")

        if camera_make:
            metadata["camera_make"] = str(camera_make)

        if camera_model:
            metadata["camera_model"] = str(camera_model)

        if not camera_make and not camera_model:

            risk_score += 20

            flags.append(
                "No camera device information found"
            )

        # ---------------------------------------------------
        # CHECK 5 — ORIGINAL DATE
        # ---------------------------------------------------

        date_taken = tags.get("EXIF DateTimeOriginal")

        if date_taken:

            metadata["date_taken"] = str(date_taken)

        else:

            risk_score += 15

            flags.append(
                "Original image capture date not found"
            )

    # ---------------------------------------------------
    # FILE SIZE HEURISTICS
    # ---------------------------------------------------

    if file_size_kb < 15:

        risk_score += 10

        flags.append(
            "Highly compressed image detected"
        )

    # ---------------------------------------------------
    # LIMIT SCORE
    # ---------------------------------------------------

    risk_score = min(risk_score, 100)

    # ---------------------------------------------------
    # FINAL VERDICT
    # ---------------------------------------------------

    verdict = generate_verdict(risk_score)

    # ---------------------------------------------------
    # ENSURE MINIMUM FLAGS
    # ---------------------------------------------------

    if not flags:

        flags.append(
            "No major forensic manipulation indicators detected"
        )

    # ---------------------------------------------------
    # STANDARDIZED RESPONSE
    # ---------------------------------------------------

    return {
        "filename": file.filename,

        # Frontend-compatible keys
        "riskScore": risk_score,
        "severity": (
            "HIGH"
            if risk_score >= 70
            else "MEDIUM"
            if risk_score >= 40
            else "LOW"
        ),
        "issues": flags,

        # Detailed response
        "risk_score": risk_score,
        "verdict": verdict,
        "flags": flags,
        "metadata": metadata
    }