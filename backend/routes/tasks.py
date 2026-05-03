from fastapi import APIRouter, HTTPException
from typing import List, Optional
from datetime import datetime
from schemas import TaskCreate, TaskUpdate

router = APIRouter(prefix="/api/tasks", tags=["tasks"])

# Mock data
mock_tasks = [
    {
        "id": 1,
        "title": "Create marketing materials",
        "description": "Design and create social media posts",
        "project_id": 1,
        "assigned_to": 1,
        "status": "in_progress",
        "priority": "high",
        "due_date": "2024-02-15T17:00:00Z",
        "created_at": "2024-01-15T10:00:00Z"
    },
    {
        "id": 2,
        "title": "Review campaign metrics",
        "description": "Analyze Q1 campaign performance",
        "project_id": 1,
        "assigned_to": 1,
        "status": "pending",
        "priority": "medium",
        "due_date": "2024-02-20T17:00:00Z",
        "created_at": "2024-01-16T11:00:00Z"
    },
    {
        "id": 3,
        "title": "Update website design",
        "description": "Implement new UI changes",
        "project_id": 2,
        "assigned_to": 1,
        "status": "done",
        "priority": "high",
        "due_date": "2024-02-10T17:00:00Z",
        "created_at": "2024-01-10T09:30:00Z"
    }
]

def is_overdue(due_date_str: str) -> bool:
    try:
        due_date = datetime.fromisoformat(due_date_str.replace('Z', '+00:00'))
        return due_date < datetime.utcnow() and due_date_str
    except:
        return False

@router.get("")
def list_tasks(status: Optional[str] = None, priority: Optional[str] = None):
    tasks = mock_tasks.copy()
    
    if status:
        tasks = [t for t in tasks if t["status"] == status]
    if priority:
        tasks = [t for t in tasks if t["priority"] == priority]
    
    for t in tasks:
        t["is_overdue"] = is_overdue(t["due_date"])
    
    return tasks

@router.post("")
def create_task(task: TaskCreate):
    if not task.title or len(task.title.strip()) == 0:
        raise HTTPException(status_code=400, detail="Task title is required")
    if len(task.title) > 200:
        raise HTTPException(status_code=400, detail="Task title must be less than 200 characters")
    if task.project_id <= 0:
        raise HTTPException(status_code=400, detail="Invalid project ID")
    if task.assigned_to <= 0:
        raise HTTPException(status_code=400, detail="Invalid user ID")
    
    # Validate priority
    valid_priorities = ["low", "medium", "high"]
    priority = task.priority if task.priority else "medium"
    if priority not in valid_priorities:
        raise HTTPException(status_code=400, detail="Invalid priority. Must be low, medium, or high")
    
    # Validate status
    valid_statuses = ["pending", "in_progress", "done"]
    status = task.status if task.status else "pending"
    if status not in valid_statuses:
        raise HTTPException(status_code=400, detail="Invalid status. Must be pending, in_progress, or done")
    
    new_task = {
        "id": len(mock_tasks) + 1,
        "title": task.title,
        "description": task.description or "",
        "project_id": task.project_id,
        "assigned_to": task.assigned_to,
        "status": status,
        "priority": priority,
        "due_date": task.due_date.isoformat() if task.due_date else None,
        "created_at": datetime.utcnow().isoformat(),
        "is_overdue": False
    }
    mock_tasks.append(new_task)
    return new_task

@router.get("/{task_id}")
def get_task(task_id: int):
    if task_id <= 0:
        raise HTTPException(status_code=400, detail="Invalid task ID")
    
    for t in mock_tasks:
        if t["id"] == task_id:
            t["is_overdue"] = is_overdue(t["due_date"])
            return t
    raise HTTPException(status_code=404, detail="Task not found")

@router.put("/{task_id}")
def update_task(task_id: int, task: TaskUpdate):
    if task_id <= 0:
        raise HTTPException(status_code=400, detail="Invalid task ID")
    
    for i, t in enumerate(mock_tasks):
        if t["id"] == task_id:
            if task.title is not None:
                if not task.title.strip():
                    raise HTTPException(status_code=400, detail="Task title cannot be empty")
                t["title"] = task.title
            if task.description is not None:
                t["description"] = task.description
            if task.status is not None:
                valid_statuses = ["pending", "in_progress", "done"]
                if task.status not in valid_statuses:
                    raise HTTPException(status_code=400, detail="Invalid status")
                t["status"] = task.status
            if task.priority is not None:
                valid_priorities = ["low", "medium", "high"]
                if task.priority not in valid_priorities:
                    raise HTTPException(status_code=400, detail="Invalid priority")
                t["priority"] = task.priority
            if task.assigned_to is not None:
                if task.assigned_to <= 0:
                    raise HTTPException(status_code=400, detail="Invalid user ID")
                t["assigned_to"] = task.assigned_to
            if task.due_date is not None:
                t["due_date"] = task.due_date.isoformat()
                t["is_overdue"] = is_overdue(t["due_date"])
            return mock_tasks[i]
    raise HTTPException(status_code=404, detail="Task not found")

@router.delete("/{task_id}")
def delete_task(task_id: int):
    if task_id <= 0:
        raise HTTPException(status_code=400, detail="Invalid task ID")
    
    global mock_tasks
    original_count = len(mock_tasks)
    mock_tasks = [t for t in mock_tasks if t["id"] != task_id]
    
    if len(mock_tasks) == original_count:
        raise HTTPException(status_code=404, detail="Task not found")
    
    return {"message": "Task deleted successfully"}

@router.get("/project/{project_id}")
def list_tasks_by_project(project_id: int):
    if project_id <= 0:
        raise HTTPException(status_code=400, detail="Invalid project ID")
    tasks = [t for t in mock_tasks if t["project_id"] == project_id]
    for t in tasks:
        t["is_overdue"] = is_overdue(t["due_date"])
    return tasks

@router.get("/dashboard/summary")
def get_dashboard_summary():
    total = len(mock_tasks)
    done = len([t for t in mock_tasks if t["status"] == "done"])
    in_progress = len([t for t in mock_tasks if t["status"] == "in_progress"])
    pending = len([t for t in mock_tasks if t["status"] == "pending"])
    overdue = len([t for t in mock_tasks if t.get("due_date") and is_overdue(t["due_date"])])
    high_priority = len([t for t in mock_tasks if t.get("priority") == "high" and t["status"] != "done"])
    
    return {
        "total": total,
        "completed": done,
        "in_progress": in_progress,
        "pending": pending,
        "overdue": overdue,
        "high_priority": high_priority
    }
