from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# from supabase
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for specific domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

engine = create_async_engine(DATABASE_URL, echo=True)
async_session_maker = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
Base = declarative_base()


# Dependency to get database session
async def get_db() -> AsyncSession:
    async with async_session_maker() as session:
        yield session


# Supabase integration
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Supabase credentials are not set in environment variables")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
