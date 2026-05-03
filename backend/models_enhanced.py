from sqlalchemy import create_engine, Column, Integer, String, DateTime, ForeignKey, Enum, Boolean, Text
from sqlalchemy.orm import sessionmaker, declarative_base, relationship
from database import Base
from datetime import datetime
import enum

class UserRole(str, enum.Enum):
    ADMIN = "admin"
    MEMBER = "member"

class TaskStatus(str, enum.Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"

class TaskPriority(str, enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    projects = relationship("Project", back_populates="owner", foreign_keys="Project.owner_id")
    tasks = relationship("Task", back_populates="assigned_to_user")
    project_members = relationship("ProjectMember", back_populates="user")

class Project(Base):
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(Text)
    owner_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    owner = relationship("User", back_populates="projects", foreign_keys=[owner_id])
    members = relationship("ProjectMember", back_populates="project", cascade="all, delete-orphan")
    tasks = relationship("Task", back_populates="project", cascade="all, delete-orphan")
    activities = relationship("Activity", back_populates="project", cascade="all, delete-orphan")

class ProjectMember(Base):
    __tablename__ = "project_members"
    
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    role = Column(Enum(UserRole), default=UserRole.MEMBER)
    joined_at = Column(DateTime, default=datetime.utcnow)
    
    project = relationship("Project", back_populates="members")
    user = relationship("User", back_populates="project_members")

class Task(Base):
    __tablename__ = "tasks"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    project_id = Column(Integer, ForeignKey("projects.id"))
    assigned_to = Column(Integer, ForeignKey("users.id"))
    status = Column(Enum(TaskStatus), default=TaskStatus.PENDING)
    priority = Column(Enum(TaskPriority), default=TaskPriority.MEDIUM)
    labels = Column(String, default="")
    due_date = Column(DateTime)
    progress = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    project = relationship("Project", back_populates="tasks")
    assigned_to_user = relationship("User", back_populates="tasks")
    comments = relationship("TaskComment", back_populates="task", cascade="all, delete-orphan")
    activities = relationship("Activity", back_populates="task", cascade="all, delete-orphan")

class TaskComment(Base):
    __tablename__ = "task_comments"
    
    id = Column(Integer, primary_key=True, index=True)
    task_id = Column(Integer, ForeignKey("tasks.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    content = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    task = relationship("Task", back_populates="comments")
    user = relationship("User")

class Activity(Base):
    __tablename__ = "activities"
    
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"))
    task_id = Column(Integer, ForeignKey("tasks.id"), nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    action = Column(String)
    description = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    project = relationship("Project", back_populates="activities")
    task = relationship("Task", back_populates="activities")
    user = relationship("User")
