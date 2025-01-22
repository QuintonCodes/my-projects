import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


class Settings:
    PROJECT_NAME: str = "GamePulse Server"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")
    API_KEY: str = os.getenv("API_KEY", "")

    if not DATABASE_URL:
        raise ValueError("DATABASE_URL environment variable is required.")
    if not SUPABASE_URL or not SUPABASE_KEY:
        raise ValueError("Supabase credentials are required.")


settings = Settings()
