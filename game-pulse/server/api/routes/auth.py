import requests
from fastapi import APIRouter, HTTPException, Depends, Body
from services.auth_service import register_user, login_user, update_user, delete_user
from api.schemas import UserCreate, UserResponse, RegisterResponse
from core.database import SessionLocal
from core.config import settings
from typing import Dict

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/register", status_code=201, response_model=RegisterResponse)
async def register(user: UserCreate, db=Depends(get_db)):
    try:
        new_user = await register_user(
            db, user.email, user.password, user.favourite_team
        )
        return {
            "message": "User registered successfully",
            "data": UserResponse(**new_user),
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/login", response_model=Dict[str, UserResponse])
async def login(user: UserCreate, db=Depends(get_db)):
    try:
        logged_in_user = await login_user(db, user.email, user.password)
        return {"message": "Login successful", "data": UserResponse(**logged_in_user)}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.put("/update", response_model=Dict[str, UserResponse])
async def update(user_id: str, update_data: dict = Body(...), db=Depends(get_db)):
    try:
        updated_user = await update_user(db, user_id, update_data)
        return {
            "message": "User updated successfully",
            "data": UserResponse(**updated_user),
        }
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.delete("/delete", status_code=200)
async def delete(user_id: str, db=Depends(get_db)):
    try:
        message = await delete_user(db, user_id)
        return {"message": message}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.post("/refresh", response_model=Dict[str, str])
async def refresh_token(refresh_token: str = Body(...)):
    try:
        url = f"https://{settings.AUTH0_DOMAIN}/oauth/token"
        headers = {"Content-Type": "application/json"}
        payload = {
            "client_id": settings.AUTH0_CLIENT_ID,
            "client_secret": settings.AUTH0_CLIENT_SECRET,
            "grant_type": "refresh_token",
            "refresh_token": refresh_token,
        }

        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        return response.json()  # Returns new access token
    except requests.RequestException as e:
        raise HTTPException(
            status_code=400, detail=f"Failed to refresh token: {str(e)}"
        )
