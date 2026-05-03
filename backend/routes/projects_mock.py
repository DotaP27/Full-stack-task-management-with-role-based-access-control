from fastapi import APIRouter
from typing import List

router = APIRouter(prefix="/api/projects", tags=["projects"])

# Mock data
mock_projects = [
    {
        "id": 1,
        "name": "Q4 Marketing Campaign",
        "description": "Launch the new product marketing campaign",
        "owner_id": 1,
        "status": "active",
        "created_at": "2024-01-15T10:00:00Z"
    },
    {
        "id": 2,
        "name": "Website Redesign",
        "description": "Redesign the company website",
        "owner_id": 1,
        "status": "planning",
        "created_at": "2024-01-10T09:30:00Z"
    }
]

@router.get("")
def list_projects():
    return mock_projects

@router.post("")
def create_project(project: dict):
    new_project = {
        "id": len(mock_projects) + 1,
        **project,
        "created_at": "2024-01-20T12:00:00Z"
    }
    mock_projects.append(new_project)
    return new_project

@router.get("/{project_id}")
def get_project(project_id: int):
    for p in mock_projects:
        if p["id"] == project_id:
            return p
    return {"error": "Project not found"}

@router.put("/{project_id}")
def update_project(project_id: int, project: dict):
    for i, p in enumerate(mock_projects):
        if p["id"] == project_id:
            mock_projects[i].update(project)
            return mock_projects[i]
    return {"error": "Project not found"}
