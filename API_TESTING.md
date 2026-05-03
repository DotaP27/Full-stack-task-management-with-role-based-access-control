# API Testing Guide

## Manual API Testing with cURL

You can test the API endpoints using curl commands. Make sure the backend server is running on `http://localhost:8000`.

### Authentication Endpoints

#### 1. Register a new user
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "username": "testuser",
    "password": "securepassword123"
  }'
```

#### 2. Login
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword123"
  }'
```

Response will contain:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "testuser",
    "is_active": true,
    "created_at": "2024-01-01T12:00:00"
  }
}
```

**Save the `access_token` for subsequent requests.**

### Project Endpoints

#### 3. Create a project
```bash
TOKEN="your_access_token_here"

curl -X POST http://localhost:8000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Q1 Development",
    "description": "Development tasks for Q1"
  }'
```

#### 4. Get all projects
```bash
TOKEN="your_access_token_here"

curl -X GET http://localhost:8000/api/projects \
  -H "Authorization: Bearer $TOKEN"
```

#### 5. Get project by ID
```bash
TOKEN="your_access_token_here"

curl -X GET http://localhost:8000/api/projects/1 \
  -H "Authorization: Bearer $TOKEN"
```

#### 6. Update project
```bash
TOKEN="your_access_token_here"

curl -X PUT http://localhost:8000/api/projects/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Q1 Development - Updated",
    "description": "Updated description"
  }'
```

#### 7. Get project members
```bash
TOKEN="your_access_token_here"

curl -X GET http://localhost:8000/api/projects/1/members \
  -H "Authorization: Bearer $TOKEN"
```

### Task Endpoints

#### 8. Create a task
```bash
TOKEN="your_access_token_here"

curl -X POST http://localhost:8000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Implement user authentication",
    "description": "Add JWT token-based auth",
    "project_id": 1,
    "assigned_to": 1,
    "due_date": "2024-02-01T17:00:00"
  }'
```

#### 9. Get all my tasks
```bash
TOKEN="your_access_token_here"

curl -X GET http://localhost:8000/api/tasks \
  -H "Authorization: Bearer $TOKEN"
```

#### 10. Get project tasks
```bash
TOKEN="your_access_token_here"

curl -X GET http://localhost:8000/api/tasks/project/1 \
  -H "Authorization: Bearer $TOKEN"
```

#### 11. Update task status
```bash
TOKEN="your_access_token_here"

curl -X PUT http://localhost:8000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "status": "in_progress"
  }'
```

#### 12. Get dashboard summary
```bash
TOKEN="your_access_token_here"

curl -X GET http://localhost:8000/api/tasks/dashboard/summary \
  -H "Authorization: Bearer $TOKEN"
```

Response will show:
```json
{
  "total_tasks": 5,
  "completed_tasks": 2,
  "in_progress_tasks": 2,
  "pending_tasks": 1,
  "overdue_tasks": 0,
  "overdue_task_details": []
}
```

## Using Postman

1. Download Postman from https://www.postman.com/downloads/
2. Import the API collection (if available)
3. Set up environment variables for `base_url` and `token`
4. Run tests sequentially

## Using Swagger UI

1. Navigate to http://localhost:8000/docs
2. Click on any endpoint
3. Click "Try it out"
4. Fill in parameters
5. Click "Execute"

For endpoints requiring authentication, click on the lock icon and enter your token.

## Error Responses

### 400 - Bad Request
```json
{
  "detail": "User with this email or username already exists"
}
```

### 401 - Unauthorized
```json
{
  "detail": "Invalid authentication credentials"
}
```

### 403 - Forbidden
```json
{
  "detail": "Only admins can update projects"
}
```

### 404 - Not Found
```json
{
  "detail": "Project not found"
}
```

## Testing Workflow

1. **Register**: Create a new user account
2. **Login**: Get an access token
3. **Create Project**: Create your first project
4. **Create Task**: Add a task to the project
5. **Update Task**: Change task status
6. **Dashboard**: Check task summary
7. **Delete**: Clean up test data

## Automation with Python

```python
import requests
import json

BASE_URL = "http://localhost:8000/api"

# Register
register_response = requests.post(
    f"{BASE_URL}/auth/register",
    json={
        "email": "test@example.com",
        "username": "testuser",
        "password": "password123"
    }
)

# Login
login_response = requests.post(
    f"{BASE_URL}/auth/login",
    json={
        "email": "test@example.com",
        "password": "password123"
    }
)

token = login_response.json()["access_token"]
headers = {"Authorization": f"Bearer {token}"}

# Create project
project_response = requests.post(
    f"{BASE_URL}/projects",
    headers=headers,
    json={
        "name": "Test Project",
        "description": "Test Description"
    }
)

print(project_response.json())
```

## Tips

- Always save the `access_token` from login response
- Include the token in Authorization header for protected endpoints
- Token format: `Bearer <token_value>`
- Tokens expire after the time set in `ACCESS_TOKEN_EXPIRE_MINUTES`
- Use `Content-Type: application/json` for all requests
- Task status values: `pending`, `in_progress`, `completed`
- User roles: `admin`, `member`
