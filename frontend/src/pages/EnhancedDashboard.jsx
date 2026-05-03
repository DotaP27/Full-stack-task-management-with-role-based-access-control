import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { tasksAPI, projectsAPI } from '../services/api'
import { AuthContext } from '../contexts/AuthContext'

export default function EnhancedDashboard() {
  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true')
  const navigate = useNavigate()
  const { user, logout } = useContext(AuthContext)

  useEffect(() => {
    // Redirect admin to admin dashboard
    if (user?.role === 'admin') {
      navigate('/admin/dashboard')
    }
    fetchDashboardData()
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

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
      console.error('Failed to fetch data', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.18),transparent_28%),linear-gradient(180deg,#181818_0%,#090909_70%,#050505_100%)]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-400 mb-4 mx-auto"></div>
        <p className="text-white text-xl">Loading your dashboard...</p>
      </div>
    </div>
  )

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className={`min-h-screen transition-colors ${darkMode ? 'bg-[#090909]' : 'bg-[#111111]'}`}>
        {/* Navigation */}
        <nav className={`${darkMode ? 'bg-[#111111] border-white/10' : 'bg-[#151515] border-white/10'} border-b shadow-lg transition-colors`}>
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 text-black flex items-center justify-center text-sm font-black tracking-[0.2em] shadow-lg">
                TF
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-white'}`}>TaskFlow</h1>
                <p className="text-xs text-gray-400 uppercase tracking-[0.28em]">Operations board</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`px-4 py-2 rounded-lg transition ${darkMode ? 'bg-white/5 text-amber-400 border border-white/10' : 'bg-white/5 text-amber-400 border border-white/10'}`}
              >
                {darkMode ? 'Light mode' : 'Dark mode'}
              </button>
              <button
                onClick={() => navigate('/profile')}
                className={`px-4 py-2 rounded-lg transition border ${darkMode ? 'bg-white/5 text-white border-white/10 hover:bg-white/10' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}
              >
                {user?.username}
              </button>
              <button
                onClick={() => {
                  logout()
                  navigate('/login')
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="mb-8">
            <h2 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-white'}`}>Welcome back, {user?.username}</h2>
            <p className="text-gray-400">Your task pipeline, projects, and performance at a glance.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            {[
              { label: 'Total Tasks', value: dashboard?.total_tasks, icon: 'Total', color: 'from-[#f59e0b] to-[#ea580c]' },
              { label: 'Completed', value: dashboard?.completed_tasks, icon: 'Done', color: 'from-emerald-500 to-emerald-600' },
              { label: 'In Progress', value: dashboard?.in_progress_tasks, icon: 'Active', color: 'from-amber-500 to-orange-600' },
              { label: 'Pending', value: dashboard?.pending_tasks, icon: 'Queue', color: 'from-zinc-500 to-zinc-600' },
              { label: 'Overdue', value: dashboard?.overdue_tasks, icon: 'Alert', color: 'from-red-500 to-red-600' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-br ${stat.color} p-6 rounded-xl shadow-lg text-white transform hover:scale-[1.02] transition`}
              >
                <div className="text-xs uppercase tracking-[0.24em] opacity-80 mb-2">{stat.icon}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
                <div className="text-3xl font-bold">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Projects Section */}
          <div className={`${darkMode ? 'bg-[#111111]' : 'bg-[#111111]'} rounded-xl shadow-lg p-6 mb-8 transition-colors border border-white/10`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-white'}`}>Your Projects</h3>
              <button
                onClick={() => navigate('/projects/new')}
                className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-amber-400 hover:to-orange-500 transition"
              >
                + New Project
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {projects.slice(0, 3).map(project => (
                <div
                  key={project.id}
                  onClick={() => navigate(`/projects/${project.id}`)}
                  className={`p-4 rounded-lg cursor-pointer transition transform hover:scale-105 ${
                    darkMode ? 'bg-white/5 hover:bg-white/8' : 'bg-white/5 hover:bg-white/8'
                  }`}
                >
                  <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-white'}`}>{project.name}</h4>
                  <p className="text-sm text-gray-400 truncate">{project.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Tasks */}
          <div className={`${darkMode ? 'bg-[#111111]' : 'bg-[#111111]'} rounded-xl shadow-lg p-6 transition-colors border border-white/10`}>
            <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-white'}`}>Recent Tasks</h3>
            {tasks.length === 0 ? (
              <p className="text-center py-8 text-gray-400">No tasks yet</p>
            ) : (
              <div className="space-y-3">
                {tasks.slice(0, 5).map(task => (
                  <div
                    key={task.id}
                    className={`flex justify-between items-center p-4 rounded-lg border-l-4 border-amber-500 ${
                      darkMode ? 'bg-white/5 hover:bg-white/8' : 'bg-white/5 hover:bg-white/8'
                    } transition cursor-pointer`}
                    onClick={() => navigate(`/tasks/${task.id}`)}
                  >
                    <div className="flex-1">
                      <p className={`font-semibold ${darkMode ? 'text-white' : 'text-white'}`}>{task.title}</p>
                      <p className="text-sm text-gray-400">{task.description?.substring(0, 50)}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      task.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                      task.status === 'in_progress' ? 'bg-amber-500/20 text-amber-300' :
                      'bg-white/10 text-gray-300'
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
    </div>
  )
}
