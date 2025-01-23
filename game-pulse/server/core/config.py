import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


class Settings:
    PROJECT_NAME: str = "GamePulse Server"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")
    FOOTBALL_API_KEY: str = os.getenv("FOOTBALL_API_KEY", "")
    AUTH0_DOMAIN: str = os.getenv("AUTH0_DOMAIN", "")
    AUTH0_AUDIENCE: str = os.getenv("AUTH0_AUDIENCE", "")
    AUTH0_ISSUER: str = os.getenv("AUTH0_ISSUER", "")

    if not DATABASE_URL:
        raise ValueError("DATABASE_URL environment variable is required.")
    if not SUPABASE_URL or not SUPABASE_KEY:
        raise ValueError("Supabase credentials are required.")


settings = Settings()
