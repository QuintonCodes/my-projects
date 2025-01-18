from supabase import create_client, Client
from core.config import settings

supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)


async def register_user(email: str, password: str) -> dict:
    response = supabase.auth.sign_up(email=email, password=password)
    if response.get("error"):
        raise ValueError(response["error"]["message"])
    return response


async def login_user(email: str, password: str) -> dict:
    response = supabase.auth.sign_in_with_password(email=email, password=password)
    if response.get("error"):
        raise ValueError(response["error"]["message"])
    return response
