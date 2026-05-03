import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { authAPI, tasksAPI, projectsAPI } from '../services/api'
import { AuthContext } from '../contexts/AuthContext'

export default function EmployeeDetailDashboard() {
  const { email } = useParams()
  const [employee, setEmployee] = useState(null)
  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true')
  const navigate = useNavigate()
  const { user, logout } = useContext(AuthContext)

  useEffect(() => {
    fetchEmployeeData()
    localStorage.setItem('darkMode', darkMode)
  }, [email, darkMode])

  const fetchEmployeeData = async () => {
    try {
      const [empRes, tasksRes, projectsRes] = await Promise.all([
        authAPI.getEmployee(email),
        tasksAPI.getAll(),
        projectsAPI.getAll()
      ])

      const empData = empRes.data
      const tasksData = tasksRes.data
      const projectsData = projectsRes.data

      setEmployee(empData)
      setTasks(tasksData || [])
      setProjects(projectsData || [])
    } catch (err) {
      console.error('Failed to fetch employee data', err)
    } finally {
      setLoading(false)
    }
  }

  const getTaskStats = () => {
    const total = tasks.length
    const completed = tasks.filter(t => t.status === 'done').length
    const inProgress = tasks.filter(t => t.status === 'in_progress').length
    const pending = tasks.filter(t => t.status === 'todo' || t.status === 'pending').length

    return { total, completed, inProgress, pending }
  }

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.18),transparent_28%),linear-gradient(180deg,#181818_0%,#090909_70%,#050505_100%)]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-400 mb-4 mx-auto"></div>
        <p className="text-white text-xl">Loading employee dashboard...</p>
      </div>
    </div>
  )

  if (!employee) return (
    <div className="flex justify-center items-center h-screen bg-[#090909]">
      <div className="text-center">
        <p className="text-white text-xl mb-4">Employee not found</p>
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-bold transition"
        >
          Back to Admin Dashboard
        </button>
      </div>
    </div>
  )

  const stats = getTaskStats()

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className={`min-h-screen transition-colors ${darkMode ? 'bg-[#090909]' : 'bg-[#111111]'}`}>
        {/* Navigation */}
        <nav className={`${darkMode ? 'bg-[#111111] border-white/10' : 'bg-[#151515] border-white/10'} border-b shadow-lg transition-colors`}>
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="text-gray-400 hover:text-white transition"
              >
                ← Back
              </button>
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 text-black flex items-center justify-center text-sm font-black">
                TF
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">TaskFlow Admin</h1>
                <p className="text-xs text-gray-400">Employee Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition text-sm"
              >
                {darkMode ? 'Light mode' : 'Dark mode'}
              </button>
              <span className="text-gray-300 text-sm">{user?.email}</span>
              <button
                onClick={() => {
                  logout()
                  navigate('/login')
                }}
                className="px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 transition font-medium text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Employee Header */}
          <div className="mb-12 flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 text-black flex items-center justify-center font-bold text-2xl">
                  {employee.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">{employee.username}</h2>
                  <p className="text-gray-400">{employee.email}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                employee.role === 'admin'
                  ? 'bg-amber-500/20 text-amber-200'
                  : 'bg-blue-500/20 text-blue-200'
              }`}>
                {employee.role.charAt(0).toUpperCase() + employee.role.slice(1)}
              </span>
              <p className={`mt-2 text-sm font-semibold ${employee.is_active ? 'text-green-400' : 'text-red-400'}`}>
                {employee.is_active ? '● Active' : '● Inactive'}
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <div className={`p-6 rounded-2xl border transition-all ${
              darkMode
                ? 'bg-[#111111]/80 border-white/10'
                : 'bg-[#151515]/80 border-white/10'
            }`}>
              <div className="text-gray-400 text-sm mb-2">Total Tasks</div>
              <div className="text-3xl font-bold text-white">{stats.total}</div>
            </div>
            <div className={`p-6 rounded-2xl border transition-all ${
              darkMode
                ? 'bg-[#111111]/80 border-white/10'
                : 'bg-[#151515]/80 border-white/10'
            }`}>
              <div className="text-gray-400 text-sm mb-2">Completed</div>
              <div className="text-3xl font-bold text-green-400">{stats.completed}</div>
            </div>
            <div className={`p-6 rounded-2xl border transition-all ${
              darkMode
                ? 'bg-[#111111]/80 border-white/10'
                : 'bg-[#151515]/80 border-white/10'
            }`}>
              <div className="text-gray-400 text-sm mb-2">In Progress</div>
              <div className="text-3xl font-bold text-blue-400">{stats.inProgress}</div>
            </div>
            <div className={`p-6 rounded-2xl border transition-all ${
              darkMode
                ? 'bg-[#111111]/80 border-white/10'
                : 'bg-[#151515]/80 border-white/10'
            }`}>
              <div className="text-gray-400 text-sm mb-2">Pending</div>
              <div className="text-3xl font-bold text-yellow-400">{stats.pending}</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className={`p-6 rounded-2xl border mb-12 ${
            darkMode
              ? 'bg-[#111111]/80 border-white/10'
              : 'bg-[#151515]/80 border-white/10'
          }`}>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold text-white">Task Completion Rate</h3>
              <span className="text-2xl font-bold text-amber-400">
                {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-amber-400 to-orange-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` }}
              ></div>
            </div>
          </div>

          {/* Tasks List */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Assigned Tasks</h3>
            <div className="space-y-3">
              {tasks.length > 0 ? (
                tasks.map((task, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border flex justify-between items-center transition ${
                      darkMode
                        ? 'bg-[#111111]/80 border-white/10'
                        : 'bg-[#151515]/80 border-white/10'
                    }`}
                  >
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">{task.title}</h4>
                      <p className="text-sm text-gray-400">{task.description}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        task.status === 'done'
                          ? 'bg-green-500/20 text-green-200'
                          : task.status === 'in_progress'
                          ? 'bg-blue-500/20 text-blue-200'
                          : 'bg-yellow-500/20 text-yellow-200'
                      }`}>
                        {task.status === 'todo' ? 'Pending' : task.status === 'done' ? 'Completed' : 'In Progress'}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className={`text-center py-8 rounded-xl border-2 border-dashed border-white/10 ${
                  darkMode ? 'bg-[#111111]/50' : 'bg-[#151515]/50'
                }`}>
                  <p className="text-gray-400">No tasks assigned</p>
                </div>
              )}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Assigned Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.length > 0 ? (
                projects.map((project, idx) => (
                  <div
                    key={idx}
                    className={`p-6 rounded-2xl border transition-all ${
                      darkMode
                        ? 'bg-[#111111]/80 border-white/10'
                        : 'bg-[#151515]/80 border-white/10'
                    }`}
                  >
                    <h4 className="text-lg font-bold text-white mb-2">{project.name}</h4>
                    <p className="text-sm text-gray-400 mb-4">{project.description}</p>
                  </div>
                ))
              ) : (
                <div className={`col-span-full text-center py-8 rounded-xl border-2 border-dashed border-white/10 ${
                  darkMode ? 'bg-[#111111]/50' : 'bg-[#151515]/50'
                }`}>
                  <p className="text-gray-400">No projects assigned</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
