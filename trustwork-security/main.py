from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from modules import phone_checker
from modules import link_scanner
from modules import template_detector
from modules import image_forensics
from modules import pgp_handler
from modules import company_checker

from score_engine import calculate_final_score

app = FastAPI()

# ---------------------------------------------------
# CORS
# ---------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5000",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------
# ROUTERS
# ---------------------------------------------------

app.include_router(
    phone_checker.router,
    prefix="/api",
    tags=["Phone"]
)

app.include_router(
    link_scanner.router,
    prefix="/api",
    tags=["Link"]
)

app.include_router(
    template_detector.router,
    prefix="/api",
    tags=["Text"]
)

app.include_router(
    image_forensics.router,
    prefix="/api",
    tags=["Image"]
)

app.include_router(
    pgp_handler.router,
    prefix="/api",
    tags=["Whistleblower"]
)

app.include_router(
    company_checker.router,
    prefix="/api",
    tags=["Company"]
)

# ---------------------------------------------------
# FULL SCAN
# ---------------------------------------------------

@app.post("/api/full-scan")
async def full_scan(payload: dict):

    return await calculate_final_score(payload)

# ---------------------------------------------------
# ROOT
# ---------------------------------------------------

@app.get("/")
def home():

    return {
        "message": "TrustWork Security API running",
        "version": "1.0.0"
    }