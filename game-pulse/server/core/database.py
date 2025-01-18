from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from .config import settings

# Create the database engine
engine = create_engine(
    settings.DATABASE_URL, connect_args={"sslmode": "require"}, echo=True
)

# Session factory
SessionLocal = sessionmaker(bind=engine, expire_on_commit=False)


# Base class for models
Base = declarative_base()


def init_db():
    # from models.user import User

    Base.metadata.create_all(bind=engine)
