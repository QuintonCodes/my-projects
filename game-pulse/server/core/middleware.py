# import jwt
from fastapi import Request, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt as jose_jwt
from jose.exceptions import JWTError
from urllib.request import urlopen
import json
from cachetools import TTLCache
from core.config import settings

security = HTTPBearer()

JWKS_CACHE = TTLCache(maxsize=1, ttl=3600)

def get_jwks():
    """Fetch JWKS dynamically and cache it."""
    if not JWKS_CACHE.get("jwks"):
        jwks_url = f"{settings.AUTH0_DOMAIN}/.well-known/jwks.json"
        response = urlopen(jwks_url)
        JWKS_CACHE["jwks"] = json.loads(response.read())
    response JWKS_CACHE["jwks"]

def verify_permissions(required_scopes: list, token_scopes: list):
    """Verify that required scopes exist in the token scopes."""
    if not set(required_scopes).issubset(set(token_scopes)):
        raise HTTPException(
            status_code=403, detail="Insufficient permissions for this action"
        )

async def authorize_request(
    request: Request, credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials
    jwks = get_jwks()

    try:
        # Decode token dynamically using JWKS
        unverifiedd_header = jose_jwt.get_unverified_header(token)
        rsa_key = next(
            (
                {
                    "kty": key["kty"],
                    "kid": key["kid"],
                    "use": key["use"],
                    "n": key["n"],
                    "e": key["e"],
                }
                for key in jwks["keys"]
                if key["kid"] == unverifiedd_header["kid"]
            ),
            None,
        )

        if not rsa_key:
            raise HTTPException(status_code=403, detail="Invalid token header")

        decoded_token = jose_jwt.decode(
            token,
            rsa_key,
            algorithms=["RS256"],
            audience=settings.AUTH0_AUDIENCE,
            issuer=f"{settings.AUTH0_ISSUER}",
        )

        # Attach decoded token to request state
        request.state.user = decoded_token

        # Check permissions for protected routes
        required_scopes = request.scope.get("permissions", [])
        verify_permissions(required_scopes, decoded_token.get("scopes", "").split())

    except JWTError as e:
        raise HTTPException(status_code=403, detail=f"Invalid token: {str(e)}")
