from db import scam_phones_collection

# Demo scam numbers
demo_numbers = [
    "9999911111",
    "8888822222",
    "7676767676",
    "9191919191",
    "8181818181",
    "7000100001",
    "6000600060",
    "9090909090",
    "8000800080",
    "7001700170"
]

inserted_count = 0

for number in demo_numbers:

    # Check if number already exists
    existing = scam_phones_collection.find_one({"phone": number})

    if existing:
        print(f"⚠️ Number already exists: {number}")

    else:
        scam_phones_collection.insert_one({
            "phone": number,
            "reported_as": "job_scam",
            "source": "demo_seed_data"
        })

        inserted_count += 1
        print(f"✅ Inserted: {number}")

print(f"\n🎯 Total new numbers inserted: {inserted_count}")