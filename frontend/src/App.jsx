import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { PrivateRoute } from './components/PrivateRoute'
import PremiumLogin from './pages/PremiumLogin'
import PremiumRegister from './pages/PremiumRegister'
import EnhancedDashboard from './pages/EnhancedDashboard'
import AdminDashboard from './pages/AdminDashboard'
import EmployeeDetailDashboard from './pages/EmployeeDetailDashboard'
import UserProfile from './pages/UserProfile'
import Projects from './pages/Projects'
import CreateProject from './pages/CreateProject'
import ProjectDetail from './pages/ProjectDetail'
import CreateTask from './pages/CreateTask'
import AdminTaskManagement from './pages/AdminTaskManagement'
import KanbanBoard from './pages/KanbanBoard'
import Analytics from './pages/Analytics'
import ActivityFeed from './pages/ActivityFeed'

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<PremiumLogin />} />
          <Route path="/register" element={<PremiumRegister />} />
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute requiredRole="admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/employees/:email"
            element={
              <PrivateRoute requiredRole="admin">
                <EmployeeDetailDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/tasks"
            element={
              <PrivateRoute requiredRole="admin">
                <AdminTaskManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <EnhancedDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <PrivateRoute>
                <Projects />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects/new"
            element={
              <PrivateRoute>
                <CreateProject />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <PrivateRoute>
                <ProjectDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects/:id/kanban"
            element={
              <PrivateRoute>
                <KanbanBoard />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks/new"
            element={
              <PrivateRoute>
                <CreateTask />
              </PrivateRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <PrivateRoute>
                <Analytics />
              </PrivateRoute>
            }
          />
          <Route
            path="/activity"
            element={
              <PrivateRoute>
                <ActivityFeed />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}
