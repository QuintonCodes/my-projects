from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from core.database import SessionLocal
from typing import List
from models.team import Team
from api.schemas import TeamCreate, TeamResponse
from core.middleware import authorize_request


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


router = APIRouter()


@router.get("/", response_model=List[TeamResponse])
async def get_teams(request: Request, db: Session = Depends(get_db)):
    request.scope["permissions"] = ["read:teams"]
    await authorize_request(request)
    return db.query(Team).all()


@router.post("/", response_model=TeamResponse)
def add_team(team: TeamCreate, db: Session = Depends(get_db)):
    new_team = Team(name=team.name, league=team.league, logo_url=team.logo_url)
    db.add(new_team)
    db.commit()
    db.refresh(new_team)
    return new_team
