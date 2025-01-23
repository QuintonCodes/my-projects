import requests
from core.config import settings
from models.user import User
from models.team import Team
from core.security import hash_password, verify_password
from sqlalchemy.orm import Session
import uuid

API_FOOTBALL_URL = "https://v3.football.api-sports.io"
API_FOOTBALL_HEADERS = {
    "x-rapidapi-host": "v3.football.api-sports.io",
    "x-rapidapi-key": settings.FOOTBALL_API_KEY,
}


async def ensure_team_exists(db: Session, team_details: dict):
    """Ensure the team exists in the Teams table."""
    existing_team = db.query(Team).filter(Team.id == team_details["id"]).first()
    if not existing_team:
        new_team = Team(
            id=team_details["id"],
            name=team_details["name"],
            league=team_details["league"],
            logo_url=team_details["logo_url"],
        )
        db.add(new_team)
        db.commit()
        db.refresh(new_team)


async def fetch_team_details_by_name(team_name: str) -> int:
    """Fetch the team ID from API-Football by name."""
    response = requests.get(
        f"{API_FOOTBALL_URL}/teams",
        params={"search": team_name},
        headers=API_FOOTBALL_HEADERS,
    )
    if response.status_code != 200:
        raise ValueError("Failed to connect to the football API.")

    data = response.json()
    if not data.get("response"):
        raise ValueError("Team not found or invalid API response.")

    try:
        team_data = data["response"][0]["team"]
        return {
            "id": team_data["id"],
            "name": team_data["name"],
            "logo_url": team_data["logo"],
            "league": data["response"][0]
            .get("league", {})
            .get("name"),  #! Change this to use league API
        }
    except KeyError as e:
        raise ValueError(f"Unexpected API response format: {data}")


async def register_user(
    db: Session, email: str, password: str, favourite_team_name: str = None
) -> dict:
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        raise ValueError("User already exists")

    hashed_password = hash_password(password)
    favourite_team_id = None

    if favourite_team_name:
        try:
            team_details = await fetch_team_details_by_name(favourite_team_name)
            await ensure_team_exists(db, team_details)
            favourite_team_id = team_details["id"]
        except ValueError as e:
            raise ValueError(f"Error fetching favourite team: {str(e)}")

    new_user = User(
        id=str(uuid.uuid4()),
        email=email,
        password=hashed_password,
        favourite_team=favourite_team_id,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "id": new_user.id,
        "email": new_user.email,
        "favourite_team": favourite_team_id,
    }


async def login_user(db: Session, email: str, password: str) -> dict:
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise ValueError("Invalid email or password")

    # Verify password
    if not verify_password(password, user.password):
        raise ValueError("Invalid email or password")

    return {"id": user.id, "email": user.email, "favourite_team": user.favorite_team}


async def update_user(db: Session, user_id: str, update_data: dict) -> dict:
    valid_fields = ["email", "favourite_team"]
    update_data = {k: v for k, v in update_data.items() if k in valid_fields}

    if not update_data:
        raise ValueError("No valid fields to update")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise ValueError("User not found")

    # Update allowed fields dynamically
    for key, value in update_data.items():
        setattr(user, key, value)

    db.commit()
    db.refresh(user)

    return {"id": user.id, "email": user.email, "favourite_team": user.favourite_team}


async def delete_user(db: Session, user_id: str) -> str:
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise ValueError("User not found")

    db.delete(user)
    db.commit()

    return "User deleted successfully"
