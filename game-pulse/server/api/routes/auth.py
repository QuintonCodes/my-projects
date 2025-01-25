import requests
from fastapi import APIRouter, HTTPException, Depends, Body, Query, Request
from fastapi.responses import JSONResponse, RedirectResponse
from services.auth_service import (
    ensure_team_exists,
    fetch_team_details_by_name,
    update_user,
    delete_user,
)
from api.schemas import (
    UserResponse,
    UpdateResponse,
)
from core.database import SessionLocal
from core.config import settings
from core.security import get_auth_url, exchange_code_for_token
from typing import Dict

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/callback")
async def callback(request: Request, code: str = Query(...)):
    """Handle callback and exchange code for tokens."""
    try:
        # Retrieve verifier (e.g., from session or DB)
        verifier = request.session.get("verifier")
        if not verifier:
            raise HTTPException(status_code=400, detail="Verifier not found")
        token_data = await exchange_code_for_token(code, verifier)
        return {"message": "Authentication successful", "tokens": token_data}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/register", status_code=201)
async def register(request: Request):
    """Redirect to Auth0 registration page."""
    auth_url, verifier = await get_auth_url()
    request.session["verifier"] = verifier
    return RedirectResponse(auth_url)


@router.post("/login", status_code=302)
async def login(request: Request):
    """Redirect user to Auth0 login page"""
    auth_url, verifier = await get_auth_url()
    request.session["verifier"] = verifier
    return RedirectResponse(auth_url)


@router.put("/update", response_model=UpdateResponse)
async def update(user_id: str, update_data: dict = Body(...), db=Depends(get_db)):
    try:
        if "favourite_team" in update_data:
            favourite_team_name = update_data.get("favourite_team")
            team_details = await fetch_team_details_by_name(favourite_team_name)
            await ensure_team_exists(db, team_details)
            update_data["favourite_team"] = team_details["id"]

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
        token_data = response.json()

        # Set httpOnly cookie for access token
        response = JSONResponse({"access_token": token_data["access_token"]})
        response.set_cookie(
            key="refresh_token",
            value=token_data["refresh_token"],
            httponly=True,
            secure=True,
            samesite="Lax",
        )
        return response
    except requests.RequestException as e:
        raise HTTPException(
            status_code=400, detail=f"Failed to refresh token: {str(e)}"
        )
