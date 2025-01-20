from pydantic import BaseModel, EmailStr, Field, UUID4, AnyUrl
from typing import Optional, List, Dict


# User
class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)


class UserResponse(BaseModel):
    id: int
    email: EmailStr
    favourite_team: str | None

    class Config:
        from_attributes = True


# Teams
class TeamCreate(BaseModel):
    name: str = Field(..., max_length=100)
    league: str = Field(..., max_length=50)
    logo_url: Optional[AnyUrl]


class TeamResponse(BaseModel):
    id: UUID4
    name: str
    league: str
    logo_url: Optional[AnyUrl]
    created_at: str

    class Config:
        from_attributes = True


# Players
class PlayerCreate(BaseModel):
    name: str = Field(..., max_length=100)
    position: str = Field(..., max_length=50)
    team_id: UUID4
    stats: Optional[Dict]


class PlayerResponse(BaseModel):
    id: UUID4
    name: str
    position: str
    team_id: UUID4
    stats: Optional[Dict]
    created_at: str

    class Config:
        from_attributes = True


# Matches
class MatchCreate(BaseModel):
    team_a_id: UUID4
    team_b_id: UUID4
    date: str  # Use ISO date format (YYYY-MM-DD)


class MatchResponse(BaseModel):
    id: UUID4
    team_a_id: UUID4
    team_b_id: UUID4
    date: str
    score_a: Optional[int]
    score_b: Optional[int]
    events: Optional[Dict]
    created_at: str

    class Config:
        from_attributes = True


# Real-time Updates
class RealTimeUpdateCreate(BaseModel):
    match_id: UUID4
    update_data: Optional[Dict]


class RealTimeUpdateResponse(BaseModel):
    id: UUID4
    match_id: UUID4
    update_data: Optional[Dict]
    created_at: str

    class Config:
        from_attributes = True
