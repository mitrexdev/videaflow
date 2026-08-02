from fastapi import APIRouter

from app.modules.auth.webhooks import router as auth_webhooks_router
from app.modules.projects.routes import router as projects_router

api_router = APIRouter()
api_router.include_router(projects_router)
api_router.include_router(auth_webhooks_router)
