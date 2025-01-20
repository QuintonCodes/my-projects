from sqlalchemy import Column, UUID, TIMESTAMP, ForeignKey, Integer, JSON, Date
from sqlalchemy.sql import func
from core.database import Base


class Match(Base):
    __tablename__ = "Matches"
    id = Column(UUID, primary_key=True, default=func.gen_random_uuid())
    team_a_id = Column(UUID, ForeignKey("Teams.id"), nullable=False)
    team_b_id = Column(UUID, ForeignKey("Teams.id"), nullable=False)
    date = Column(Date, nullable=False)
    score_a = Column(Integer, nullable=True, default=0)
    score_b = Column(Integer, nullable=True, default=0)
    events = Column(JSON, nullable=True)
    created_at = Column(TIMESTAMP, server_default=func.now())
