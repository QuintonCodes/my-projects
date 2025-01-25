from pydantic import BaseModel, EmailStr, Field, UUID4, AnyUrl
from typing import Optional
from datetime import datetime


# User
class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=128)
    favourite_team: str = Field(default=None, max_length=50)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: UUID4
    email: EmailStr
    favourite_team: Optional[int]
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True


class RegisterResponse(BaseModel):
    message: str
    data: UserResponse


class LoginResponse(BaseModel):
    message: str
    data: UserResponse


class UpdateResponse(BaseModel):
    message: str
    data: UserResponse


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
