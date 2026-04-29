import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get Mongo URI from .env
MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    raise ValueError("MONGO_URI not found in .env file")

try:
    # Create MongoDB client
    client = MongoClient(MONGO_URI)

    # Create / connect database
    db = client["trustwork_security"]

    # Collections
    scam_phones_collection = db["scam_phones"]
    anonymous_reports_collection = db["anonymous_reports"]

    print("✅ MongoDB connected successfully")

except Exception as e:
    print("❌ MongoDB connection failed")
    print(e)