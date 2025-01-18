from sqlalchemy.ext.asyncio import AsyncSession
from models.user import User
from api.schemas import UserCreate


async def create_user(db: AsyncSession, user: UserCreate) -> User:
    new_user = User(email=user.email, password=user.password)
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user
