from fastapi import APIRouter

router = APIRouter()

# ---------------------------------------------------
# TRUSTED COMPANIES DATABASE
# ---------------------------------------------------

trusted_companies = [

    {"name": "Infosys", "domain": "infosys.com", "gst": "29AAACI5950L1ZK"},
    {"name": "TCS", "domain": "tcs.com", "gst": "27AABCT3518Q1ZW"},
    {"name": "Wipro", "domain": "wipro.com", "gst": "29AAACW0387R1Z6"},
    {"name": "Accenture", "domain": "accenture.com", "gst": "27AAACA5443N1ZS"},
    {"name": "Capgemini", "domain": "capgemini.com", "gst": "27AAACC8374P1Z2"},
    {"name": "Cognizant", "domain": "cognizant.com", "gst": "27AAACH7931L1ZQ"},
    {"name": "HCL", "domain": "hcltech.com", "gst": "09AAACH1645P1Z6"},
    {"name": "Tech Mahindra", "domain": "techmahindra.com", "gst": "27AAACT4215E1Z7"},
    {"name": "IBM", "domain": "ibm.com", "gst": "29AAACI4403K1ZP"},
    {"name": "Google", "domain": "google.com", "gst": "29AABCG0527P1ZQ"},
    {"name": "Microsoft", "domain": "microsoft.com", "gst": "29AABCM4692L1ZU"},
    {"name": "Amazon", "domain": "amazon.in", "gst": "27AACCA4872D1Z5"},
    {"name": "Flipkart", "domain": "flipkart.com", "gst": "29AABCF6748M1ZM"},
    {"name": "Reliance", "domain": "ril.com", "gst": "27AAACR5055K1Z8"},
    {"name": "Deloitte", "domain": "deloitte.com", "gst": "27AAACD2475M1ZX"},
    {"name": "EY", "domain": "ey.com", "gst": "27AACCE9999Q1Z2"},
    {"name": "KPMG", "domain": "kpmg.com", "gst": "27AACCK1234M1ZX"},
    {"name": "PwC", "domain": "pwc.com", "gst": "27AACCP5678R1ZS"},
    {"name": "Zoho", "domain": "zoho.com", "gst": "33AAACZ4321P1ZX"},
    {"name": "Oracle", "domain": "oracle.com", "gst": "29AAACO8174A1ZN"},
    {"name": "Adobe", "domain": "adobe.com", "gst": "29AABCA5264H1ZT"},
    {"name": "Intel", "domain": "intel.com", "gst": "29AAACI1234M1ZX"},
    {"name": "NVIDIA", "domain": "nvidia.com", "gst": "29AACCN5678Q1ZS"},
    {"name": "Cisco", "domain": "cisco.com", "gst": "29AAACC4321L1ZX"},
    {"name": "Paytm", "domain": "paytm.com", "gst": "09AACCP2512Q1ZF"},
    {"name": "PhonePe", "domain": "phonepe.com", "gst": "29AADCP1234N1ZX"},
    {"name": "Swiggy", "domain": "swiggy.com", "gst": "29AADCS5678Q1ZT"},
    {"name": "Zomato", "domain": "zomato.com", "gst": "07AADCZ1234P1ZX"},
]

# ---------------------------------------------------
# MAJOR BRANDS FOR TYPO DETECTION
# ---------------------------------------------------

major_brands = [
    "google",
    "amazon",
    "microsoft",
    "infosys",
    "tcs",
    "wipro",
    "accenture",
    "linkedin",
    "facebook",
    "instagram",
    "whatsapp"
]


@router.get("/check-company")
async def check_company(
    company: str = "",
    domain: str = "",
    gst: str = ""
):

    company = company.lower().strip()
    domain = domain.lower().strip()
    gst = gst.upper().strip()

    # ---------------------------------------------------
    # TRUSTED COMPANY CHECK
    # ---------------------------------------------------

    for item in trusted_companies:

        company_match = (
            company and
            item["name"].lower() == company
        )

        domain_match = (
            domain and
            item["domain"] == domain
        )

        gst_match = (
            gst and
            item["gst"] == gst
        )

        if company_match or domain_match or gst_match:

            return {
                "status": "VERIFIED",
                "risk_score": 0,
                "message": "Company information matches trusted records",
                "company": item
            }

    # ---------------------------------------------------
    # TYPO-SQUATTING DETECTION
    # ---------------------------------------------------

    for brand in major_brands:

        if brand in domain and domain != f"{brand}.com":

            return {
                "status": "HIGH RISK",
                "risk_score": 95,
                "message": (
                    f"Possible typo-squatting detected. "
                    f"The domain may be impersonating {brand}."
                )
            }

    # ---------------------------------------------------
    # SUSPICIOUS DOMAINS
    # ---------------------------------------------------

    suspicious_domains = [
        "googlee.com",
        "amaz0n.com",
        "tcs-careers-job.com",
        "infosys-jobportal.com"
    ]

    if domain in suspicious_domains:

        return {
            "status": "HIGH RISK",
            "risk_score": 95,
            "message": (
                "Possible cloned or impersonating hiring domain detected"
            )
        }

    # ---------------------------------------------------
    # GST FORMAT VALIDATION
    # ---------------------------------------------------

    if gst:

        if len(gst) != 15:

            return {
                "status": "INVALID",
                "risk_score": 60,
                "message": "Invalid GST number format"
            }

    # ---------------------------------------------------
    # DEFAULT RESPONSE
    # ---------------------------------------------------

    return {
        "status": "UNKNOWN",
        "risk_score": 25,
        "message": (
            "Company not found in trusted database. "
            "Verify carefully before proceeding."
        )
    }