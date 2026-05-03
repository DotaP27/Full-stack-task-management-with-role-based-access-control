# Team Task Manager 🚀

A full-stack web application for managing projects, assigning tasks, and tracking progress with **role-based access control** (Admin/Member), task prioritization, and comprehensive admin oversight capabilities.

## Features ✨

- **Authentication**: Secure signup/login with JWT tokens
- **Project Management**: Create projects and manage team members
- **Task Management**: Create, assign, and track task status with priority levels
- **Admin Task Assignment**: Admins can create and assign tasks directly to team members
- **Role-Based Access Control**: Admin and Member roles with appropriate permissions
- **Admin Oversight**: View all employee dashboards, task completion rates, and project status
- **Task Prioritization**: Mark tasks as Low/Medium/High priority
- **Status Tracking**: Pending, In Progress, Done with overdue detection
- **User Profiles**: View and edit user information
- **Dark Mode UI**: Professional dark theme with amber/orange accent colors
- **Dashboard Analytics**: Task statistics, completion rates, and overdue tracking

## Tech Stack 🛠️

### Backend
- **Framework**: FastAPI 0.104.1 (Python)
- **Database**: PostgreSQL (with mock data fallback)
- **Authentication**: JWT (JSON Web Tokens)
- **Server**: Uvicorn
- **Validation**: Pydantic

### Frontend
- **Framework**: React 18.2.0
- **Routing**: React Router 6.20.0
- **Styling**: Tailwind CSS 3.3.6
- **HTTP Client**: Axios 1.6.2
- **Build Tool**: Vite 5.0.0
- **State**: React Context API

## Project Structure 📁

```
.
├── backend/
│   ├── main.py                 # FastAPI application entry point
│   ├── models.py               # SQLAlchemy database models
│   ├── schemas.py              # Pydantic schemas for validation
│   ├── database.py             # Database configuration
│   ├── config.py               # Configuration management
│   ├── auth.py                 # JWT and password utilities
│   ├── dependencies.py         # FastAPI dependencies
│   ├── routes/
│   │   ├── auth.py            # Authentication endpoints
│   │   ├── projects.py        # Project management endpoints
│   │   └── tasks.py           # Task management endpoints
│   ├── requirements.txt        # Python dependencies
│   └── .env.example           # Environment variables template
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx           # Entry point
│   │   ├── App.jsx            # Root component and routing
│   │   ├── api.js             # Axios configuration
│   │   ├── services/
│   │   │   └── api.js         # API service functions
│   │   ├── pages/
│   │   │   ├── PremiumLogin.jsx         # Differentiated login
│   │   │   ├── PremiumRegister.jsx      # User registration
│   │   │   ├── EnhancedDashboard.jsx    # Employee dashboard
│   │   │   ├── AdminDashboard.jsx       # Admin employee directory
│   │   │   ├── AdminTaskManagement.jsx  # Admin task creation/management
│   │   │   ├── EmployeeDetailDashboard.jsx  # Admin view of employee
│   │   │   ├── UserProfile.jsx          # User profile management
│   │   │   ├── Projects.jsx
│   │   │   └── ...
│   │   ├── components/
│   │   │   └── PrivateRoute.jsx         # Route protection
│   │   └── contexts/
│   │       └── AuthContext.jsx          # Auth state management
│   ├── package.json           # Node dependencies
│   ├── vite.config.js         # Vite configuration
│   ├── tailwind.config.js     # Tailwind configuration
│   ├── postcss.config.js      # PostCSS configuration
│   └── .env.example           # Environment variables template
│
└── README.md                  # This file
```

## Quick Start 🚀

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL 12+ (optional, app uses mock data if unavailable)

### Backend Setup

1. **Create virtual environment**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

4. **Start server**
   ```bash
   python main.py
   ```
   Server runs on `http://localhost:8000`

### Frontend Setup

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env.local
   # Verify VITE_API_URL=http://localhost:8000/api
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

## Demo Credentials 👤

### Admin Account
- **Email**: test@example.com
- **Password**: password123
- **Role**: Administrator
- **Access**: Full access to all employees, task management, project oversight

### Employee Account
- **Email**: pp27@gmail.com
- **Password**: 7428219340
- **Role**: Team Member
- **Access**: Personal dashboard, assigned tasks and projects

## API Endpoints 📡

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user info
- `GET /api/auth/employees` - List all employees (admin only)
- `GET /api/auth/employees/{email}` - Get employee details (admin only)

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create new project
- `GET /api/projects/{id}` - Get project details
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project
- `GET /api/projects/{id}/members` - List project members
- `POST /api/projects/{id}/members` - Add member to project
- `DELETE /api/projects/{id}/members/{user_id}` - Remove member

### Tasks
- `GET /api/tasks` - Get all tasks with optional filtering
- `POST /api/tasks` - Create new task
- `GET /api/tasks/{id}` - Get task details
- `PUT /api/tasks/{id}` - Update task (status, priority, assignment)
- `DELETE /api/tasks/{id}` - Delete task
- `GET /api/tasks/project/{project_id}` - Get project tasks
- `GET /api/tasks/dashboard/summary` - Get task statistics

### Query Parameters
- `GET /api/tasks?status=pending` - Filter by status
- `GET /api/tasks?priority=high` - Filter by priority

## User Roles 👥

### Admin (Administrator)
- Full project management (create, edit, delete)
- Manage project members (add/remove)
- Create and assign tasks to any team member
- Set task priority and status
- View all employee dashboards
- Monitor team task completion rates
- Manage all tasks in the system

### Member (Team Member)
- View assigned projects
- View assigned tasks
- Update task status
- View personal dashboard
- View task statistics
- Edit own profile

## Features in Detail 🎯

### Authentication System
- User registration with email and password
- Secure JWT token-based authentication
- Token stored in localStorage
- Auto-redirect based on role (Admin → /admin/dashboard, Member → /dashboard)
- Protected routes with PrivateRoute component

### Task Management
- **Create Tasks**: Admin can create and assign tasks
- **Task Properties**:
  - Title (required)
  - Description
  - Priority (Low/Medium/High)
  - Status (Pending/In Progress/Done)
  - Due date with overdue detection
  - Project assignment
  - User assignment
- **Task Filtering**: Filter by status and priority
- **Task Deletion**: Delete tasks with confirmation

### Admin Features
- **Employee Management**: View complete employee directory
- **Employee Oversight**: 
  - View individual employee dashboards
  - Check task completion rates
  - Monitor project assignments
  - Track overdue tasks
- **Task Assignment**: Directly assign tasks to team members
- **Task Management Page**: Create, view, and manage all tasks

### Dashboard Features
- **Employee Dashboard**:
  - Total tasks count
  - Completed tasks
  - In-progress tasks
  - Pending tasks
  - Overdue tasks
  - High-priority tasks
  - Project list
  - Recent tasks
- **Admin Dashboard**:
  - Employee directory
  - Quick access to employee dashboards
  - Task management interface
- **Employee Detail Dashboard** (Admin View):
  - Employee information
  - Task completion rate with progress bar
  - Task statistics
  - Assigned tasks list
  - Assigned projects

## Environment Variables 🔐

### Backend `.env.example`
```
DATABASE_URL=postgresql://user:password@localhost/task_manager
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
CORS_ORIGINS=http://localhost:5173,http://localhost:4174
```

### Frontend `.env.example`
```
VITE_API_URL=http://localhost:8000/api
```

## Project Status ✅

### Completed Features
- ✅ Full authentication system with JWT
- ✅ User registration and login
- ✅ Project CRUD operations
- ✅ Project member management
- ✅ Task CRUD operations
- ✅ Task filtering by status and priority
- ✅ Role-based access control (Admin/Member)
- ✅ Admin dashboard with employee oversight
- ✅ Admin task management and assignment
- ✅ Task status tracking and overdue detection
- ✅ User profile management
- ✅ Professional dark UI theme
- ✅ Input validation and error handling
- ✅ CORS configuration for API access

### Optional Enhancements
- Real-time updates (WebSockets)
- Task comments and activity feed
- Advanced reporting and analytics
- Email notifications
- Pagination for large datasets
- Task search and advanced filtering

## Deployment 🚀

### Local Deployment
Follow the Quick Start section above.

### Production Deployment
See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed production deployment instructions.

## Troubleshooting 🔧

### Frontend won't load
- Ensure backend is running on `http://localhost:8000`
- Check VITE_API_URL in `.env.local`
- Clear browser cache and refresh

### Backend API errors
- Check PostgreSQL is running (or use mock data)
- Verify .env configuration
- Check console logs for detailed error messages

### CORS errors
- Verify CORS_ORIGINS in backend .env includes frontend URL
- Restart backend after changing .env

## Contributing 🤝

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details.

## Support 💬

For issues and questions, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ by the TaskFlow Team**

### Member
- View project and tasks
- Update own task status
- View project dashboard

## Deployment 🌐

### Deploy to Railway

1. **Create Railway account** at https://railway.app

2. **Connect GitHub repository**
   - Fork this repository
   - Connect to Railway

3. **Configure environment variables** in Railway:
   ```
   DATABASE_URL=your_railway_db_url
   SECRET_KEY=your_secret_key
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   CORS_ORIGINS=your_frontend_url
   ```

4. **Set build commands**
   - Backend: `pip install -r backend/requirements.txt`
   - Start: `cd backend && uvicorn main:app --host 0.0.0.0`

5. **Deploy frontend**
   - Build: `npm run build`
   - Output: `frontend/dist`

6. **Create PostgreSQL database** in Railway and link it

## Database Schema 🗄️

### Users Table
- `id` (PK)
- `email` (UNIQUE)
- `username` (UNIQUE)
- `hashed_password`
- `is_active` (Boolean)
- `created_at`

### Projects Table
- `id` (PK)
- `name`
- `description`
- `owner_id` (FK to Users)
- `created_at`
- `updated_at`

### ProjectMembers Table
- `id` (PK)
- `project_id` (FK to Projects)
- `user_id` (FK to Users)
- `role` (ENUM: admin, member)
- `joined_at`

### Tasks Table
- `id` (PK)
- `title`
- `description`
- `project_id` (FK to Projects)
- `assigned_to` (FK to Users)
- `status` (ENUM: pending, in_progress, completed)
- `due_date`
- `created_at`
- `updated_at`

## Security Features 🔒

- JWT token-based authentication
- Password hashing with bcrypt
- Role-based access control (RBAC)
- CORS configuration
- Input validation with Pydantic
- HTTP-only token storage recommendations

## Error Handling ⚠️

The API returns standard HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## Demo Video 🎥

A demonstration of the application features is available in the demo video showing:
- User registration and login
- Project creation and team management
- Task assignment and status tracking
- Dashboard statistics and task overview
- Role-based access control in action

## Contributing 🤝

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details.

## Support 💬

For support, email support@taskmanager.com or open an issue in the GitHub repository.

---

**Built with ❤️ by Priyanshu Pandey**
