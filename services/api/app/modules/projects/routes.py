from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import CurrentIdentity
from app.core.database import get_db
from app.models.content import Project
from app.schemas.project import ProjectCreate, ProjectRead

router = APIRouter(prefix="/projects", tags=["projects"])

Db = Annotated[AsyncSession, Depends(get_db)]


@router.get("", response_model=list[ProjectRead])
async def list_projects(db: Db, identity: CurrentIdentity) -> list[Project]:
    """List projects, scoped to the caller's org. Never unscoped."""
    result = await db.execute(
        select(Project)
        .where(Project.org_id == identity.org_id)
        .order_by(Project.created_at.desc())
        .limit(100)
    )
    return list(result.scalars().all())


@router.post("", response_model=ProjectRead, status_code=201)
async def create_project(
    payload: ProjectCreate, db: Db, identity: CurrentIdentity
) -> Project:
    project = Project(
        org_id=identity.org_id,
        owner_user_id=identity.user_id,
        name=payload.name,
        aspect_ratio=payload.aspect_ratio,
    )
    db.add(project)
    await db.commit()
    await db.refresh(project)
    return project
