from sqlalchemy import Column, String, UUID, TIMESTAMP, ForeignKey, JSON
from sqlalchemy.sql import func
from core.database import Base


class Player(Base):
    __tablename__ = "Players"
    id = Column(UUID, primary_key=True, default=func.gen_random_uuid())
    name = Column(String, unique=True, nullable=False)
    position = Column(String, nullable=False)
    team_id = Column(UUID, ForeignKey("Teams.id"), nullable=False)
    stats = Column(JSON, nullable=True)
    created_at = Column(TIMESTAMP, server_default=func.now())
