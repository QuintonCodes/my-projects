from fastapi import APIRouter, HTTPException, Depends, Body
from services.auth_service import register_user, login_user, update_user, delete_user
from api.schemas import UserCreate, UserResponse
from core.database import SessionLocal
from typing import Dict

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/register", status_code=201, response_model=Dict[str, UserResponse])
async def register(user: UserCreate, db=Depends(get_db)):
    try:
        new_user = await register_user(db, user.email, user.password)
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
