# QUICK_START.md

## Quick Start Guide 🚀

Get the Team Task Manager up and running in 5 minutes!

## Prerequisites

- Python 3.9+
- Node.js 16+
- PostgreSQL 12+
- Git

## Installation

### Option 1: Automated Setup (Recommended)

#### On macOS/Linux:
```bash
chmod +x setup.sh
./setup.sh
```

#### On Windows:
```bash
setup.bat
```

### Option 2: Manual Setup

#### Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate  # macOS/Linux
# OR
venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt

# Configure database
cp .env.example .env
# Edit .env with your database URL

# Start server
python main.py
```

The backend will run on `http://localhost:8000`

#### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## First Steps

1. **Open the application**
   - Navigate to `http://localhost:5173` in your browser

2. **Create an account**
   - Click "Register" link
   - Fill in email, username, and password
   - Click "Register"

3. **Create your first project**
   - After login, click "Create New Project"
   - Enter project name and description
   - Click "Create Project"

4. **Add team members**
   - Go to your project
   - Click "Members" tab
   - Add team members by their email

5. **Create tasks**
   - In your project, click "Tasks" tab
   - Click "+ New Task"
   - Assign the task to a team member
   - Set due date and priority

6. **Track progress**
   - Go to Dashboard to see task statistics
   - Update task status as work progresses
   - View overdue tasks

## API Documentation

### Swagger UI
- Navigate to `http://localhost:8000/docs`
- Test API endpoints interactively

### ReDoc
- Navigate to `http://localhost:8000/redoc`
- View complete API documentation

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost/task_manager
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
CORS_ORIGINS=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000/api
```

## Common Commands

### Backend
```bash
# Start server with auto-reload
python main.py

# Run with custom port
uvicorn main:app --host 0.0.0.0 --port 8001
```

### Frontend
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Database Setup

### Using Docker (Recommended)

```bash
# Start PostgreSQL container
docker run --name task-manager-db \
  -e POSTGRES_USER=taskuser \
  -e POSTGRES_PASSWORD=taskpass \
  -e POSTGRES_DB=task_manager \
  -p 5432:5432 \
  -d postgres:15-alpine

# Update .env with:
# DATABASE_URL=postgresql://taskuser:taskpass@localhost/task_manager
```

### Using Docker Compose

```bash
# From the root directory
docker-compose up -d postgres

# This will start PostgreSQL and the backend/frontend
```

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 8000
lsof -i :8000

# Kill the process
kill -9 <PID>
```

### Database Connection Error
- Verify PostgreSQL is running
- Check DATABASE_URL in .env file
- Ensure database and user exist

### CORS Errors
- Add frontend URL to CORS_ORIGINS in backend .env
- Restart backend after changes

### Frontend Can't Connect to Backend
- Verify backend is running on port 8000
- Check VITE_API_URL in frontend .env
- Check browser network tab for API errors

## Next Steps

1. **Deploy to Railway**: Follow [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
2. **Add more features**: 
   - Notifications
   - Task comments
   - File attachments
   - Team workspaces

3. **Improve UI**:
   - Add dark mode
   - Drag-and-drop tasks
   - Calendar view
   - Timeline/Gantt chart

4. **Performance**:
   - Add caching
   - Implement pagination
   - Optimize database queries

## Support 💬

- Check [README.md](README.md) for detailed documentation
- Review API docs at http://localhost:8000/docs
- Check logs for error messages
- Open an issue on GitHub

## Next: Deployment

Ready to deploy? Check out [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for step-by-step deployment instructions to Railway.
