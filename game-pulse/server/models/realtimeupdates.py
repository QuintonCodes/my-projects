from sqlalchemy import Column, UUID, TIMESTAMP, ForeignKey, JSON
from sqlalchemy.sql import func
from core.database import Base


class RealTimeUpdate(Base):
    __tablename__ = "RealtimeUpdates"
    id = Column(UUID, primary_key=True, default=func.gen_random_uuid())
    match_id = Column(UUID, ForeignKey("Matches.id"), nullable=False)
    update_data = Column(JSON, nullable=True)
    created_at = Column(TIMESTAMP, server_default=func.now())
