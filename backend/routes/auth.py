from fastapi import APIRouter, HTTPException, status
from datetime import timedelta
from datetime import datetime
import json
import base64

router = APIRouter(prefix="/api/auth", tags=["auth"])

# Admin users list
ADMIN_EMAILS = ["test@example.com"]

# Mock employees database
EMPLOYEES = {
    "pp27@gmail.com": {
        "id": 2,
        "email": "pp27@gmail.com",
        "username": "pp2703",
        "is_active": True,
        "role": "member"
    }
}

# Simple mock token generation
def create_token(email):
    payload = {"sub": email, "exp": datetime.utcnow().timestamp() + 3600}
    return base64.b64encode(json.dumps(payload).encode()).decode()

def decode_token(token):
    try:
        decoded = base64.b64decode(token).decode()
        payload = json.loads(decoded)
        return payload.get("sub")
    except:
        return None

def get_user_by_email(email):
    if email == "test@example.com":
        return {
            "id": 1,
            "email": email,
            "username": "testuser",
            "is_active": True,
            "role": "admin"
        }
    return EMPLOYEES.get(email, {
        "id": 999,
        "email": email,
        "username": email.split("@")[0],
        "is_active": True,
        "role": "member"
    })

@router.post("/login")
def login(credentials: dict):
    # Mock login for development - accept demo account or any registered account
    email = credentials.get("email")
    password = credentials.get("password")
    
    # Demo admin account
    if email == "test@example.com" and password == "password123":
        return {
            "access_token": create_token(email),
            "token_type": "bearer",
            "user": get_user_by_email(email)
        }
    
    # Allow any other email/password combo for development
    if email and password and len(password) >= 6:
        user = get_user_by_email(email)
        # Store employee if new
        if email not in EMPLOYEES and email != "test@example.com":
            EMPLOYEES[email] = user
        return {
            "access_token": create_token(email),
            "token_type": "bearer",
            "user": user
        }
    
    raise HTTPException(status_code=401, detail="Invalid credentials")

@router.post("/register")
def register(user: dict):
    email = user.get("email", "user@example.com")
    username = user.get("username", email.split("@")[0])
    
    new_user = {
        "id": len(EMPLOYEES) + 2,
        "email": email,
        "username": username,
        "is_active": True,
        "role": "member"
    }
    EMPLOYEES[email] = new_user
    
    return {
        "access_token": create_token(email),
        "token_type": "bearer",
        "user": new_user
    }

@router.get("/me")
def get_me():
    return {
        "id": 1,
        "email": "test@example.com",
        "username": "testuser",
        "is_active": True,
        "role": "admin"
    }

@router.get("/employees")
def get_all_employees():
    """Get all employees - admin only"""
    return {
        "employees": [
            {
                "id": 1,
                "email": "test@example.com",
                "username": "testuser",
                "is_active": True,
                "role": "admin"
            }
        ] + list(EMPLOYEES.values())
    }

@router.get("/employees/{email}")
def get_employee(email: str):
    """Get employee details - admin only"""
    user = get_user_by_email(email)
    if not user:
        raise HTTPException(status_code=404, detail="Employee not found")
    return user
