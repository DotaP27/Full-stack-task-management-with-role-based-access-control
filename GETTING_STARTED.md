# 🎯 Getting Started - Team Task Manager

## What You Have

A complete, production-ready full-stack Team Task Manager application with:
- ✅ FastAPI Backend with PostgreSQL
- ✅ React Frontend with Vite
- ✅ Role-Based Access Control (RBAC)
- ✅ JWT Authentication
- ✅ Docker Support
- ✅ Complete Documentation
- ✅ Ready for Railway Deployment

## 🚀 Start Here

### Option 1: Quick Local Setup (Recommended for Windows)

#### Step 1: Run Setup Script
```bash
setup.bat
```

This will:
- Create virtual environment
- Install Python dependencies
- Install Node dependencies
- Create .env files

#### Step 2: Start PostgreSQL

**Using Docker (Easiest):**
```bash
docker run --name task-manager-db -e POSTGRES_USER=taskuser -e POSTGRES_PASSWORD=taskpass -e POSTGRES_DB=task_manager -p 5432:5432 -d postgres:15-alpine
```

**Or use Docker Compose:**
```bash
docker-compose up postgres
```

#### Step 3: Start Backend
```bash
cd backend
venv\Scripts\activate
python main.py
```

Backend runs at: http://localhost:8000

#### Step 4: Start Frontend (new terminal)
```bash
cd frontend
npm run dev
```

Frontend runs at: http://localhost:5173

---

### Option 2: Docker Compose (All-in-One)

```bash
docker-compose up -d
```

This starts everything in one command:
- PostgreSQL (port 5432)
- FastAPI Backend (port 8000)
- React Frontend (port 3000)

Wait 30 seconds for services to start, then open http://localhost:3000

---

## ✅ Verify Installation

1. **Backend API**: http://localhost:8000
   - Should show welcome message

2. **API Documentation**: http://localhost:8000/docs
   - Interactive API testing

3. **Frontend**: http://localhost:5173 or http://localhost:3000
   - Should show Login page

---

## 🧪 Test the Application

### Create Test Account
1. Click "Register"
2. Enter email: `test@example.com`
3. Enter username: `testuser`
4. Enter password: `password123`
5. Click "Register"

### Create First Project
1. Login with test account
2. Click "Create New Project"
3. Enter: `My First Project`
4. Click "Create Project"

### Create First Task
1. Go to your project
2. Click "Tasks" tab
3. Click "+ New Task"
4. Enter: `Learn Task Manager`
5. Select yourself as assignee
6. Click "Create Task"

### View Dashboard
1. Click "Dashboard" link
2. See your task statistics
3. View recent tasks

---

## 📁 Important Files to Know

| File | Purpose |
|------|---------|
| `backend/main.py` | FastAPI application entry point |
| `backend/models.py` | Database schema |
| `backend/routes/` | API endpoints |
| `frontend/src/App.jsx` | React routing |
| `frontend/src/pages/` | UI pages |
| `README.md` | Full documentation |
| `QUICK_START.md` | Setup guide |
| `DEPLOYMENT_GUIDE.md` | Railway deployment |
| `API_TESTING.md` | API examples |
| `docker-compose.yml` | Local development |

---

## 🔧 Common Commands

### Backend
```bash
cd backend
source venv/bin/activate     # macOS/Linux
# or
venv\Scripts\activate         # Windows

python main.py                # Run server
pip install -r requirements.txt  # Install deps
```

### Frontend
```bash
cd frontend
npm install                   # Install dependencies
npm run dev                   # Development server
npm run build                 # Build for production
npm run preview               # Preview build
```

### Database
```bash
# With Docker
docker-compose up postgres    # Start PostgreSQL
docker-compose down          # Stop all services

# Check if PostgreSQL is running
psql -U taskuser -d task_manager -h localhost
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process using port 8000
lsof -i :8000
# Kill it
kill -9 <PID>
```

### Database Connection Error
Check `.env` file in backend folder:
```
DATABASE_URL=postgresql://taskuser:taskpass@localhost:5432/task_manager
```

### Frontend Can't Reach Backend
Check `frontend/.env`:
```
VITE_API_URL=http://localhost:8000/api
```

### Module Not Found Errors
```bash
# Reinstall dependencies
# Backend:
pip install -r requirements.txt

# Frontend:
npm install
```

---

## 📊 Database Setup (Manual)

If not using Docker:

### Install PostgreSQL
- Download from https://www.postgresql.org/download/
- Install and note your password

### Create Database
```bash
psql -U postgres
CREATE USER taskuser WITH PASSWORD 'taskpass';
CREATE DATABASE task_manager OWNER taskuser;
GRANT ALL PRIVILEGES ON DATABASE task_manager TO taskuser;
\q
```

### Update .env
```
DATABASE_URL=postgresql://taskuser:taskpass@localhost:5432/task_manager
```

---

## 🚀 Deploy to Railway (Next Step)

Once local testing works:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push
   ```

2. **Follow DEPLOYMENT_GUIDE.md** for Railway setup

3. **Set Environment Variables** on Railway

4. **Your app will be live!**

---

## 📚 Documentation Map

```
📖 README.md                    ← Start here for overview
├── 🚀 QUICK_START.md           ← Setup instructions
├── 🌐 DEPLOYMENT_GUIDE.md      ← Railway deployment
├── 🧪 API_TESTING.md          ← Test endpoints
├── 📋 PROJECT_SUMMARY.md      ← Complete feature list
└── 🏗️ INFRASTRUCTURE.md        ← Technical details
```

---

## 💡 Key Features Ready to Use

1. **User Management**
   - ✅ Registration with validation
   - ✅ Secure login with JWT tokens
   - ✅ Password hashing
   - ✅ Automatic logout on expiration

2. **Projects**
   - ✅ Create, edit, delete projects
   - ✅ Add/remove team members
   - ✅ Set admin/member roles
   - ✅ View project details

3. **Tasks**
   - ✅ Create tasks with descriptions
   - ✅ Assign to team members
   - ✅ Set due dates
   - ✅ Track status (Pending, In Progress, Completed)
   - ✅ View in dashboard

4. **Dashboard**
   - ✅ Task statistics
   - ✅ Overdue tasks
   - ✅ Quick actions
   - ✅ Recent tasks list

5. **Security**
   - ✅ JWT authentication
   - ✅ Role-based access
   - ✅ Password hashing
   - ✅ Protected routes

---

## 🎯 Next Steps

### Immediate (5 minutes)
1. ✅ Run setup script
2. ✅ Start backend and frontend
3. ✅ Create test account
4. ✅ Create test project

### Short Term (30 minutes)
1. ✅ Test all features
2. ✅ Review API docs at /docs
3. ✅ Check database with pgAdmin

### Medium Term (1-2 hours)
1. ✅ Deploy to Railway (see DEPLOYMENT_GUIDE.md)
2. ✅ Test live deployment
3. ✅ Share live URL

### Long Term
1. Add more features
2. Optimize performance
3. Add notifications
4. Create mobile app

---

## 🤝 Need Help?

1. **Check documentation**: See above links
2. **Review error messages**: Check terminal/browser console
3. **Check logs**: Look at backend terminal output
4. **Test API**: Use http://localhost:8000/docs

---

## 📧 Project Information

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: FastAPI + SQLAlchemy + PostgreSQL
- **Authentication**: JWT with bcrypt
- **Database**: PostgreSQL 15
- **Deployment**: Docker + Railway
- **Version**: 1.0.0
- **Status**: Production Ready ✅

---

## ✨ You're All Set!

The application is complete and ready to use. Start with the backend, then frontend, and explore all the features.

**Happy task managing! 🎉**

---

**Last Updated**: May 2, 2026
**Built by**: Team Task Manager Development
