import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { tasksAPI, projectsAPI } from '../services/api'
import { AuthContext } from '../contexts/AuthContext'

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [tasksRes, projectsRes, dashboardRes] = await Promise.all([
        tasksAPI.getAll(),
        projectsAPI.getAll(),
        tasksAPI.getDashboard(),
      ])
      setTasks(tasksRes.data)
      setProjects(projectsRes.data)
      setDashboard(dashboardRes.data)
    } catch (err) {
      console.error('Failed to fetch dashboard data', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Task Manager</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">{user?.username}</span>
            <button
              onClick={() => {
                localStorage.removeItem('token')
                navigate('/login')
              }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-3xl font-bold mb-8">Dashboard</h2>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-gray-600 text-sm">Total Tasks</div>
            <div className="text-3xl font-bold text-blue-600">{dashboard?.total_tasks}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-gray-600 text-sm">Completed</div>
            <div className="text-3xl font-bold text-green-600">{dashboard?.completed_tasks}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-gray-600 text-sm">In Progress</div>
            <div className="text-3xl font-bold text-yellow-600">{dashboard?.in_progress_tasks}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-gray-600 text-sm">Pending</div>
            <div className="text-3xl font-bold text-purple-600">{dashboard?.pending_tasks}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-gray-600 text-sm">Overdue</div>
            <div className="text-3xl font-bold text-red-600">{dashboard?.overdue_tasks}</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => navigate('/projects')}
            className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 font-semibold"
          >
            View All Projects
          </button>
          <button
            onClick={() => navigate('/projects/new')}
            className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 font-semibold"
          >
            Create New Project
          </button>
        </div>

        {/* Recent Tasks */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-4">Your Recent Tasks</h3>
          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks yet</p>
          ) : (
            <div className="space-y-2">
              {tasks.slice(0, 5).map(task => (
                <div key={task.id} className="flex justify-between items-center p-3 border-b hover:bg-gray-50">
                  <div>
                    <p className="font-semibold">{task.title}</p>
                    <p className="text-sm text-gray-600">{task.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded text-sm font-semibold ${
                    task.status === 'completed' ? 'bg-green-100 text-green-800' :
                    task.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
