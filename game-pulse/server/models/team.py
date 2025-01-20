from sqlalchemy import Column, String, UUID, TIMESTAMP
from sqlalchemy.sql import func
from core.database import Base


class Team(Base):
    __tablename__ = "Teams"
    id = Column(UUID, primary_key=True, default=func.gen_random_uuid())
    name = Column(String, unique=True, nullable=False)
    league = Column(String, nullable=False)
    logo_url = Column(String, nullable=True)
    created_at = Column(TIMESTAMP, server_default=func.now())
