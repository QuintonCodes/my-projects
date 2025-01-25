from starlette.middleware.sessions import SessionMiddleware
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.database import init_db
from api.routes import auth, teams
from core.config import settings

app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(
    SessionMiddleware,
    secret_key="Deeznuts@77",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for specific domains in production
    allow_credentials=True,
    allow_methods=["GET" "POST", "PUT", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)


@app.on_event("startup")
def on_startup():
    init_db()


app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(teams.router, prefix="/teams", tags=["Teams"])


@app.get("/")
def read_root():
    return {"message": "Welcome to GamePulse Backend!"}
