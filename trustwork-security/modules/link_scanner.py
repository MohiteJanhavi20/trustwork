import re
from datetime import datetime

import whois

from fastapi import APIRouter

router = APIRouter()


def generate_verdict(score):

    if score > 65:
        return "HIGH RISK"

    elif score >= 31:
        return "MEDIUM RISK"

    return "LOW RISK"


def extract_domain(url):

    domain = re.sub(r"https?://", "", url)
    domain = domain.split("/")[0]

    return domain.lower()


@router.get("/check-link")
async def check_link(url: str):

    risk_score = 0
    flags = []

    domain = extract_domain(url)

    # ---------------------------------------------------
    # TRUSTED DOMAINS
    # ---------------------------------------------------

    trusted_domains = [
        "google.com",
        "youtube.com",
        "microsoft.com",
        "apple.com",
        "amazon.com",
        "linkedin.com",
        "github.com",
        "facebook.com",
        "instagram.com",
        "whatsapp.com"
    ]

    # ---------------------------------------------------
    # TYPO SQUATTING CHECK
    # ---------------------------------------------------

    suspicious_brands = [
        "google",
        "facebook",
        "amazon",
        "linkedin",
        "whatsapp",
        "instagram",
        "microsoft",
        "apple"
    ]

    for brand in suspicious_brands:

        if brand in domain and domain != f"{brand}.com":

            risk_score += 45

            flags.append(
                f"Possible typo-squatting detected — '{domain}' may be impersonating {brand}"
            )

            break

    # ---------------------------------------------------
    # DOMAIN INFO
    # ---------------------------------------------------

    domain_info = {
        "registered_on": None,
        "domain_age_days": None,
        "registrar": None,
        "registrant_country": None,
        "expires_on": None,
        "name_servers": []
    }

    # ---------------------------------------------------
    # CHECK 1 — HTTP
    # ---------------------------------------------------

    if url.startswith("http://"):

        risk_score += 20

        flags.append(
            "No SSL certificate — uses HTTP not HTTPS"
        )

    # ---------------------------------------------------
    # CHECK 2 — SUSPICIOUS KEYWORDS
    # ---------------------------------------------------

    suspicious_keywords = [
        "free-job",
        "job-offer",
        "earn-daily",
        "work-from-home",
        "apply-fast",
        "job4u",
        "quickjob",
        "easymoney",
        "jobs4free",
        "ghar-baithe",
        "naukri-free"
    ]

    lower_url = url.lower()

    for keyword in suspicious_keywords:

        if keyword in lower_url:

            risk_score += 25

            flags.append(
                f"Suspicious keyword detected: {keyword}"
            )

            break

    # ---------------------------------------------------
    # CHECK 3 — WHOIS
    # ---------------------------------------------------

    try:

        domain_data = whois.whois(domain)

        creation_date = domain_data.creation_date
        expiration_date = domain_data.expiration_date

        if isinstance(creation_date, list):
            creation_date = creation_date[0]

        if isinstance(expiration_date, list):
            expiration_date = expiration_date[0]

        today = datetime.now()

        # DOMAIN AGE
        if creation_date:

            age_days = (today - creation_date).days

            domain_info["registered_on"] = str(
                creation_date.date()
            )

            domain_info["domain_age_days"] = age_days

            if age_days <= 30:

                risk_score += 70

                flags.append(
                    f"Very new domain — only {age_days} days old"
                )

            elif age_days <= 90:

                risk_score += 50

                flags.append(
                    f"New domain — {age_days} days old"
                )

            elif age_days <= 365:

                risk_score += 15

                flags.append(
                    "Domain less than 1 year old"
                )

            else:

                flags.append(
                    "Established domain"
                )

        else:

            if domain not in trusted_domains:

                risk_score += 40

                flags.append(
                    "WHOIS creation date hidden"
                )

        # EXPIRY
        if expiration_date:

            domain_info["expires_on"] = str(
                expiration_date.date()
            )

            days_until_expiry = (
                expiration_date - today
            ).days

            if days_until_expiry < 30:

                risk_score += 20

                flags.append(
                    f"Domain expires soon ({days_until_expiry} days)"
                )

        # REGISTRAR
        registrar = domain_data.registrar

        if registrar:

            domain_info["registrar"] = registrar

        # COUNTRY
        country = domain_data.country

        if country:

            domain_info["registrant_country"] = country

        # NAME SERVERS
        name_servers = domain_data.name_servers

        if name_servers:

            if isinstance(name_servers, list):

                domain_info["name_servers"] = name_servers

            else:

                domain_info["name_servers"] = [name_servers]

    except Exception:

        if domain not in trusted_domains:

            risk_score += 25

            flags.append(
                "WHOIS lookup failed or domain may not exist"
            )

    # ---------------------------------------------------
    # TRUSTED DOMAIN OVERRIDE
    # ---------------------------------------------------

    if domain in trusted_domains:

        risk_score = 0

        flags = ["Trusted well-known domain"]

    # ---------------------------------------------------
    # FINAL SCORE
    # ---------------------------------------------------

    risk_score = min(risk_score, 100)

    verdict = generate_verdict(risk_score)

    return {
        "url": url,
        "domain_checked": domain,
        "risk_score": risk_score,
        "verdict": verdict,
        "flags": flags,
        "domain_info": domain_info,
        "manual_whois": f"https://whois.domaintools.com/{domain}"
    }