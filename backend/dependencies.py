from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer
from starlette.datastructures import Headers
from sqlalchemy.orm import Session
from database import get_db
from models import User
from auth import decode_token

security = HTTPBearer()

async def get_current_user(
    credentials = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    token = credentials.credentials
    token_data = decode_token(token)
    
    if token_data is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user = db.query(User).filter(User.email == token_data.email).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return user

def require_admin(user: User = Depends(get_current_user)) -> User:
    # Check if user is admin in the context of their projects
    # This will be more specific in route handlers
    return user
