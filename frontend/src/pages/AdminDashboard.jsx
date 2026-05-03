import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

export default function AdminDashboard() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true')
  const navigate = useNavigate()
  const { user, logout } = useContext(AuthContext)

  useEffect(() => {
    fetchEmployees()
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/auth/employees')
      const data = await response.json()
      setEmployees(data.employees || [])
    } catch (err) {
      console.error('Failed to fetch employees', err)
    } finally {
      setLoading(false)
    }
  }

  const handleViewEmployee = (email) => {
    navigate(`/admin/employees/${email}`)
  }

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.18),transparent_28%),linear-gradient(180deg,#181818_0%,#090909_70%,#050505_100%)]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-400 mb-4 mx-auto"></div>
        <p className="text-white text-xl">Loading employees...</p>
      </div>
    </div>
  )

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className={`min-h-screen transition-colors ${darkMode ? 'bg-[#090909]' : 'bg-[#111111]'}`}>
        {/* Navigation */}
        <nav className={`${darkMode ? 'bg-[#111111] border-white/10' : 'bg-[#151515] border-white/10'} border-b shadow-lg transition-colors`}>
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 text-black flex items-center justify-center text-sm font-black">
                TF
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">TaskFlow Admin</h1>
                <p className="text-xs text-gray-400">Employee Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/tasks')}
                className="px-4 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 transition font-medium text-sm"
              >
                Manage Tasks
              </button>
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
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white mb-3">Employee Directory</h2>
            <p className="text-gray-300">Manage and monitor team members' dashboards and task completion</p>
          </div>

          {/* Employees Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map((employee) => (
              <div
                key={employee.email}
                onClick={() => handleViewEmployee(employee.email)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                  darkMode
                    ? 'bg-[#111111]/80 border-white/10 hover:border-amber-500/50 hover:bg-[#111111]'
                    : 'bg-[#151515]/80 border-white/10 hover:border-amber-500/50 hover:bg-[#151515]'
                } hover:shadow-lg hover:shadow-amber-500/20`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 text-black flex items-center justify-center font-bold text-lg">
                    {employee.username.charAt(0).toUpperCase()}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    employee.role === 'admin'
                      ? 'bg-amber-500/20 text-amber-200'
                      : 'bg-blue-500/20 text-blue-200'
                  }`}>
                    {employee.role.charAt(0).toUpperCase() + employee.role.slice(1)}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{employee.username}</h3>
                <p className="text-sm text-gray-400 mb-4">{employee.email}</p>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <p className={`text-sm font-semibold ${employee.is_active ? 'text-green-400' : 'text-red-400'}`}>
                      {employee.is_active ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                  <button className="px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-sm font-medium transition">
                    View Dashboard
                  </button>
                </div>
              </div>
            ))}
          </div>

          {employees.length === 0 && (
            <div className={`text-center py-12 rounded-2xl border-2 border-dashed border-white/10 ${darkMode ? 'bg-[#111111]/50' : 'bg-[#151515]/50'}`}>
              <p className="text-gray-400 text-lg">No employees found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
