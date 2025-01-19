from sqlalchemy import Column, String, UUID, TIMESTAMP
from core.database import Base
from sqlalchemy.sql import func


class User(Base):
    __tablename__ = "Users"

    id = Column(UUID, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    favorite_team = Column(UUID, nullable=True)  # FK to teams(id)
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())
