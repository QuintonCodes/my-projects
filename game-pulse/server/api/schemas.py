from pydantic import BaseModel, EmailStr, Field, UUID4, AnyUrl
from typing import Optional


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
