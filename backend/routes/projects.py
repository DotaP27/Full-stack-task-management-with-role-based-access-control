from fastapi import APIRouter, HTTPException, status
from typing import List
from datetime import datetime
from schemas import ProjectCreate, ProjectUpdate, ProjectResponse

router = APIRouter(prefix="/api/projects", tags=["projects"])

# Mock data with members
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

mock_project_members = [
    {"id": 1, "project_id": 1, "user_id": 1, "role": "admin", "joined_at": "2024-01-15T10:00:00Z"},
    {"id": 2, "project_id": 1, "user_id": 2, "role": "member", "joined_at": "2024-01-15T10:00:00Z"},
    {"id": 3, "project_id": 2, "user_id": 1, "role": "admin", "joined_at": "2024-01-10T09:30:00Z"}
]

@router.get("")
def list_projects():
    for p in mock_projects:
        p["member_count"] = len([m for m in mock_project_members if m["project_id"] == p["id"]])
    return mock_projects

@router.post("")
def create_project(project: ProjectCreate):
    if not project.name or len(project.name.strip()) == 0:
        raise HTTPException(status_code=400, detail="Project name is required")
    if len(project.name) > 100:
        raise HTTPException(status_code=400, detail="Project name must be less than 100 characters")
    
    new_project = {
        "id": len(mock_projects) + 1,
        "name": project.name,
        "description": project.description or "",
        "owner_id": 1,
        "status": "active",
        "created_at": datetime.utcnow().isoformat()
    }
    mock_projects.append(new_project)
    return new_project

@router.get("/{project_id}")
def get_project(project_id: int):
    if project_id <= 0:
        raise HTTPException(status_code=400, detail="Invalid project ID")
    
    for p in mock_projects:
        if p["id"] == project_id:
            members = [m for m in mock_project_members if m["project_id"] == project_id]
            p["member_count"] = len(members)
            return p
    raise HTTPException(status_code=404, detail="Project not found")

@router.put("/{project_id}")
def update_project(project_id: int, project: ProjectUpdate):
    if project_id <= 0:
        raise HTTPException(status_code=400, detail="Invalid project ID")
    if project.name and len(project.name.strip()) == 0:
        raise HTTPException(status_code=400, detail="Project name cannot be empty")
    
    for i, p in enumerate(mock_projects):
        if p["id"] == project_id:
            if project.name:
                p["name"] = project.name
            if project.description is not None:
                p["description"] = project.description
            return mock_projects[i]
    raise HTTPException(status_code=404, detail="Project not found")

@router.delete("/{project_id}")
def delete_project(project_id: int):
    if project_id <= 0:
        raise HTTPException(status_code=400, detail="Invalid project ID")
    
    global mock_projects, mock_project_members
    found = False
    for p in mock_projects:
        if p["id"] == project_id:
            found = True
            break
    
    if not found:
        raise HTTPException(status_code=404, detail="Project not found")
    
    mock_projects = [p for p in mock_projects if p["id"] != project_id]
    mock_project_members = [m for m in mock_project_members if m["project_id"] != project_id]
    return {"message": "Project deleted successfully"}

# Project Members Management
@router.get("/{project_id}/members")
def get_project_members(project_id: int):
    if project_id <= 0:
        raise HTTPException(status_code=400, detail="Invalid project ID")
    
    project = next((p for p in mock_projects if p["id"] == project_id), None)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    return [m for m in mock_project_members if m["project_id"] == project_id]

@router.post("/{project_id}/members")
def add_project_member(project_id: int, member: dict):
    if project_id <= 0:
        raise HTTPException(status_code=400, detail="Invalid project ID")
    if not member.get("user_id"):
        raise HTTPException(status_code=400, detail="User ID is required")
    
    project = next((p for p in mock_projects if p["id"] == project_id), None)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    existing = next((m for m in mock_project_members 
                    if m["project_id"] == project_id and m["user_id"] == member["user_id"]), None)
    if existing:
        raise HTTPException(status_code=400, detail="User is already a member of this project")
    
    new_member = {
        "id": max([m.get("id", 0) for m in mock_project_members], default=0) + 1,
        "project_id": project_id,
        "user_id": member["user_id"],
        "role": member.get("role", "member"),
        "joined_at": datetime.utcnow().isoformat()
    }
    mock_project_members.append(new_member)
    return new_member

@router.delete("/{project_id}/members/{user_id}")
def remove_project_member(project_id: int, user_id: int):
    if project_id <= 0 or user_id <= 0:
        raise HTTPException(status_code=400, detail="Invalid project or user ID")
    
    global mock_project_members
    original_count = len(mock_project_members)
    mock_project_members = [m for m in mock_project_members 
                           if not (m["project_id"] == project_id and m["user_id"] == user_id)]
    
    if len(mock_project_members) == original_count:
        raise HTTPException(status_code=404, detail="Member not found in project")
    
    return {"message": "Member removed from project"}
