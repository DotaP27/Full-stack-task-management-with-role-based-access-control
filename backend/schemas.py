from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List
from models import UserRole, TaskStatus

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    username: str

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# Project Schemas
class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(ProjectBase):
    pass

class ProjectResponse(ProjectBase):
    id: int
    owner_id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# Project Member Schemas
class ProjectMemberResponse(BaseModel):
    id: int
    user_id: int
    role: UserRole
    joined_at: datetime
    user: UserResponse
    
    class Config:
        from_attributes = True

# Task Schemas
class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    due_date: Optional[datetime] = None

class TaskCreate(TaskBase):
    project_id: int
    assigned_to: int
    priority: Optional[str] = "medium"
    status: Optional[str] = "pending"

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[TaskStatus] = None
    assigned_to: Optional[int] = None
    due_date: Optional[datetime] = None
    priority: Optional[str] = None

class TaskResponse(TaskBase):
    id: int
    project_id: int
    assigned_to: int
    status: TaskStatus
    created_at: datetime
    updated_at: datetime
    assigned_to_user: Optional[UserResponse]
    
    class Config:
        from_attributes = True

# Auth Schemas
class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

class TokenData(BaseModel):
    email: Optional[str] = None
