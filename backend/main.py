from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response
from database import Base, engine
from config import settings
from routes import auth, projects, tasks

# Try to create tables, but don't crash if database is unavailable
try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    print(f"Warning: Could not create database tables: {e}")

# Create FastAPI app
app = FastAPI(
    title="Team Task Manager API",
    description="A full-stack task management application with role-based access",
    version="1.0.0"
)

# Custom CORS middleware
class CORSMiddlewareCustom(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        if request.method == "OPTIONS":
            return Response(
                status_code=200,
                headers={
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization",
                }
            )
        response = await call_next(request)
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        return response

app.add_middleware(CORSMiddlewareCustom)

# Include routers
app.include_router(auth.router)
app.include_router(projects.router)
app.include_router(tasks.router)

@app.get("/")
def read_root():
    return {
        "message": "Team Task Manager API",
        "version": "1.0.0",
        "docs": "/docs",
        "redoc": "/redoc"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
