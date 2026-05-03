import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { tasksAPI, projectsAPI } from '../services/api'
import { AuthContext } from '../contexts/AuthContext'

export default function AdminTaskManagement() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const [projects, setProjects] = useState([])
  const [employees, setEmployees] = useState([])
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project_id: '',
    assigned_to: '',
    due_date: '',
    priority: 'medium',
    status: 'pending'
  })

  const [activeTab, setActiveTab] = useState('create') // 'create' or 'manage'

  useEffect(() => {
    fetchInitialData()
  }, [])

  const fetchInitialData = async () => {
    try {
      setLoading(true)
      
      // Fetch projects
      const projectsRes = await projectsAPI.getAll()
      setProjects(projectsRes.data || [])

      // Fetch employees
      const employeesRes = await fetch('http://localhost:8000/api/auth/employees')
      const employeesData = await employeesRes.json()
      setEmployees(employeesData.employees || [])

      // Fetch tasks
      const tasksRes = await tasksAPI.getAll()
      setTasks(tasksRes.data || [])
    } catch (err) {
      console.error('Failed to fetch data:', err)
      setError('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTask = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!formData.title.trim()) {
      setError('Task title is required')
      return
    }

    if (!formData.project_id) {
      setError('Project selection is required')
      return
    }

    if (!formData.assigned_to) {
      setError('Assignee selection is required')
      return
    }

    try {
      setLoading(true)
      const taskData = {
        title: formData.title,
        description: formData.description,
        project_id: parseInt(formData.project_id),
        assigned_to: parseInt(formData.assigned_to),
        due_date: formData.due_date ? new Date(formData.due_date).toISOString() : null,
        priority: formData.priority,
        status: formData.status
      }

      await tasksAPI.create(taskData)
      
      setSuccess('Task created successfully!')
      setFormData({
        title: '',
        description: '',
        project_id: '',
        assigned_to: '',
        due_date: '',
        priority: 'medium',
        status: 'pending'
      })

      // Refresh tasks list
      const tasksRes = await tasksAPI.getAll()
      setTasks(tasksRes.data || [])

      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create task')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return

    try {
      await tasksAPI.delete(taskId)
      setSuccess('Task deleted successfully!')
      
      const tasksRes = await tasksAPI.getAll()
      setTasks(tasksRes.data || [])
      
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError('Failed to delete task')
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const getEmployeeName = (id) => {
    const emp = employees.find(e => e.id == id)
    return emp ? emp.username : `User ${id}`
  }

  const getProjectName = (id) => {
    const proj = projects.find(p => p.id == id)
    return proj ? proj.name : `Project ${id}`
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'done':
        return 'bg-green-500/20 text-green-300'
      case 'in_progress':
        return 'bg-blue-500/20 text-blue-300'
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300'
      default:
        return 'bg-gray-500/20 text-gray-300'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-300'
      case 'medium':
        return 'bg-amber-500/20 text-amber-300'
      case 'low':
        return 'bg-green-500/20 text-green-300'
      default:
        return 'bg-gray-500/20 text-gray-300'
    }
  }

  return (
    <div className="min-h-screen bg-[#090909] text-white">
      {/* Navigation */}
      <nav className="bg-[#111111] border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 text-black flex items-center justify-center text-sm font-black">
              TF
            </div>
            <div>
              <h1 className="text-xl font-bold">TaskFlow Admin</h1>
              <p className="text-xs text-gray-400">Task Management</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="px-4 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 transition font-medium"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-white/10">
          <button
            onClick={() => setActiveTab('create')}
            className={`px-6 py-3 font-semibold transition border-b-2 ${
              activeTab === 'create'
                ? 'border-amber-500 text-amber-300'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            Create New Task
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`px-6 py-3 font-semibold transition border-b-2 ${
              activeTab === 'manage'
                ? 'border-amber-500 text-amber-300'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            Manage Tasks ({tasks.length})
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-200">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 rounded-lg bg-green-500/20 border border-green-500/30 text-green-200">
            {success}
          </div>
        )}

        {/* Create Task Tab */}
        {activeTab === 'create' && (
          <div className="max-w-2xl">
            <div className="bg-[#111111] rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6">Create New Task</h2>

              <form onSubmit={handleCreateTask} className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Task Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter task title"
                    className="w-full px-4 py-3 bg-[#181818] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter task description"
                    rows="4"
                    className="w-full px-4 py-3 bg-[#181818] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white resize-none"
                  />
                </div>

                {/* Project */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Project <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="project_id"
                    value={formData.project_id}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#181818] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                  >
                    <option value="">Select a project</option>
                    {projects.map(project => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Assignee */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Assign To <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="assigned_to"
                    value={formData.assigned_to}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#181818] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                  >
                    <option value="">Select team member</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {emp.username} ({emp.email})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#181818] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#181818] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>

                {/* Due Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Due Date
                  </label>
                  <input
                    type="datetime-local"
                    name="due_date"
                    value={formData.due_date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#181818] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold transition"
                  >
                    {loading ? 'Creating...' : 'Create Task'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Manage Tasks Tab */}
        {activeTab === 'manage' && (
          <div>
            <div className="space-y-4">
              {tasks.length === 0 ? (
                <div className="text-center py-12 rounded-2xl border-2 border-dashed border-white/10 bg-[#111111]/50">
                  <p className="text-gray-400 text-lg">No tasks created yet</p>
                </div>
              ) : (
                tasks.map(task => (
                  <div
                    key={task.id}
                    className="bg-[#111111] rounded-xl border border-white/10 p-6 hover:border-amber-500/30 transition"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2">{task.title}</h3>
                        {task.description && (
                          <p className="text-gray-400 text-sm mb-3">{task.description}</p>
                        )}
                        <div className="flex flex-wrap gap-3">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300">
                            Project: {getProjectName(task.project_id)}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300">
                            Assigned to: {getEmployeeName(task.assigned_to)}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
                            {task.status.replace('_', ' ').toUpperCase()}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="ml-4 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 transition font-medium text-sm"
                      >
                        Delete
                      </button>
                    </div>
                    {task.due_date && (
                      <div className="mt-4 text-xs text-gray-500">
                        Due: {new Date(task.due_date).toLocaleDateString()} at {new Date(task.due_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
