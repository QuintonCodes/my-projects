from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from core.database import init_db
from api.routes import auth, teams
from core.config import settings
from core.middleware import authorize_request

app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for specific domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def auth_middleware(request: Request, call_next):
    if request.url.path not in ["/auth/register", "/auth/login", "/"]:
        await authorize_request(request)
    return await call_next(request)


@app.on_event("startup")
def on_startup():
    init_db()


app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(teams.router, prefix="/teams", tags=["Teams"])


@app.get("/")
def read_root():
    return {"message": "Welcome to GamePulse Backend!"}
