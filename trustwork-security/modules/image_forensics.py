import hashlib

import exifread

from fastapi import APIRouter, UploadFile, File

router = APIRouter()


def generate_verdict(score):

    if score > 65:
        return "HIGH RISK"

    elif score >= 31:
        return "MEDIUM RISK"

    return "LOW RISK"


@router.post("/check-image")
async def check_image(file: UploadFile = File(...)):

    risk_score = 0

    flags = []

    # Read file bytes
    contents = await file.read()

    # ---------------------------------------------------
    # FILE HASH
    # ---------------------------------------------------

    file_hash = hashlib.md5(contents).hexdigest()

    file_size_kb = round(len(contents) / 1024, 2)

    # ---------------------------------------------------
    # READ EXIF
    # ---------------------------------------------------

    tags = exifread.process_file(
        file.file,
        details=False
    )

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
    # CHECK 1 — NO EXIF
    # ---------------------------------------------------

    if not tags:

        risk_score += 40

        flags.append(
            "No EXIF metadata found — image may be edited or screenshotted"
        )

    else:

        # ---------------------------------------------------
        # CHECK 2 — GPS
        # ---------------------------------------------------

        gps_lat = tags.get("GPS GPSLatitude")
        gps_long = tags.get("GPS GPSLongitude")

        if gps_lat or gps_long:

            risk_score += 35

            flags.append(
                "GPS coordinates embedded in image"
            )

            metadata["GPS_latitude"] = str(gps_lat)
            metadata["GPS_longitude"] = str(gps_long)

        # ---------------------------------------------------
        # CHECK 3 — EDITING SOFTWARE
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
                "inkscape"
            ]

            lower_software = software_name.lower()

            for tool in suspicious_software:

                if tool in lower_software:

                    risk_score += 35

                    flags.append(
                        f"Image edited using {software_name}"
                    )

                    break

        # ---------------------------------------------------
        # CHECK 4 — CAMERA INFO
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
                "No camera information found"
            )

        # ---------------------------------------------------
        # CHECK 5 — DATE
        # ---------------------------------------------------

        date_taken = tags.get("EXIF DateTimeOriginal")

        if date_taken:

            metadata["date_taken"] = str(date_taken)

        else:

            risk_score += 15

            flags.append(
                "No original capture date found"
            )

    # ---------------------------------------------------
    # FINAL SCORE
    # ---------------------------------------------------

    risk_score = min(risk_score, 100)

    verdict = generate_verdict(risk_score)

    return {
        "filename": file.filename,
        "risk_score": risk_score,
        "verdict": verdict,
        "flags": flags,
        "metadata": metadata
    }