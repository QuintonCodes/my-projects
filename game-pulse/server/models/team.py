from sqlalchemy import Column, String, Integer, TIMESTAMP
from sqlalchemy.sql import func
from core.database import Base


class Team(Base):
    __tablename__ = "Teams"
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=True)
    league = Column(String, nullable=True)
    logo_url = Column(String, nullable=True)
    created_at = Column(TIMESTAMP, server_default=func.now())
