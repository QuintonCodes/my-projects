from pydantic import BaseModel, EmailStr, Field, UUID4, AnyUrl
from typing import Optional, TypeVar, Generic
from datetime import datetime

# Generic Response Model
T = TypeVar("T")


class ResponseModel(Generic[T], BaseModel):
    message: str
    data: T


# Common Config
class BaseConfig:
    from_attributes = True


# Base User Models
class UserBase(BaseModel):
    email: EmailStr


class UserWithFavouriteTeam(UserBase):
    favourite_team: int


# User Schemas
class UserCreate(UserBase):
    password: str = Field(..., min_length=8, max_length=128)
    favourite_team: str = Field(default=None, max_length=50)


class UserLogin(UserBase):
    password: str


class UserResponse(BaseModel):
    id: UUID4
    updated_at: Optional[datetime]

    class Config(BaseConfig):
        pass


# User Response Varients
RegisterResponse = ResponseModel[UserResponse]
LoginResponse = ResponseModel[UserResponse]
UpdateResponse = ResponseModel[UserResponse]


# Teams Schemas
class TeamBase(BaseModel):
    name: str = Field(..., max_length=100)
    league: str = Field(..., max_length=50)
    logo_url: Optional[AnyUrl] = None


class TeamCreate(TeamBase):
    pass


class TeamResponse(BaseModel):
    id: UUID4
    created_at: str

    class Config(BaseConfig):
        pass
