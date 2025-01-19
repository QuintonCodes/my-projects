from supabase import create_client, Client
from core.config import settings
from models.user import User
from core.security import hash_password, verify_password
from sqlalchemy.orm import Session
import uuid

supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)


async def register_user(db: Session, email: str, password: str) -> dict:
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        raise ValueError("User already exists")

    hashed_password = hash_password(password)

    new_user = User(id=str(uuid.uuid4()), email=email, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "id": new_user.id,
        "email": new_user.email,
        "favourite_team": new_user.favorite_team,
    }


async def login_user(db: Session, email: str, password: str) -> dict:
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise ValueError("Invalid email or password")

    # Verify password
    if not verify_password(password, user.password):
        raise ValueError("Invalid email or password")

    return {"id": user.id, "email": user.email, "favourite_team": user.favorite_team}
