from fastapi import APIRouter, HTTPException
from services.auth_service import register_user, login_user
from api.schemas import UserCreate

router = APIRouter()


@router.post("/register", status_code=201)
async def register(user: UserCreate):
    try:
        response = await register_user(user.email, user.password)
        return {"message": "User registered successfully", "data": response}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/login")
async def login(user: UserCreate):
    try:
        response = await login_user(user.email, user.password)
        return {"message": "Login successful", "data": response}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
