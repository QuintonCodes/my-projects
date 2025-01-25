import secrets
import hashlib
import requests
from urllib.parse import urlencode
from core.config import settings


def generate_code_verifier() -> str:
    """Generate a secure code verifier for PKCE."""
    return secrets.token_urlsafe(64)


def generate_code_challenge(verifier: str) -> str:
    """Generate a code challenge based on the verifier."""
    return hashlib.sha256(verifier.encode()).digest().hex()


async def get_auth_url() -> str:
    """Generate Auth0 authorization URL with PKCE."""
    verifier = generate_code_verifier()
    challenge = generate_code_challenge(verifier)

    params = {
        "client_id": settings.AUTH0_CLIENT_ID,
        "response_type": "code",
        "redirect_uri": f"{settings.APP_BASE_URL}/callback",
        "scope": "openid profile email",
        "audience": settings.AUTH0_AUDIENCE,
        "code_challenge": challenge,
        "code_challenge_method": "S256",
    }

    auth_url = f"https://{settings.AUTH0_DOMAIN}/authorize?{urlencode(params)}"
    return auth_url, verifier


async def exchange_code_for_token(code: str, verifier: str) -> dict:
    """Exchange the authorization code for access and refresh tokens."""
    url = f"https://{settings.AUTH0_DOMAIN}/oauth/token"
    payload = {
        "grant_type": "authorization_code",
        "client_id": settings.AUTH0_CLIENT_ID,
        "client_secret": settings.AUTH0_CLIENT_SECRET,
        "code": code,
        "redirect_uri": f"{settings.APP_BASE_URL}/callback",
        "code_verifier": verifier,
    }

    response = requests.post(url, json=payload)
    response.raise_for_status()
    return response.json()
