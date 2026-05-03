import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { authAPI } from '../services/api'
import { AuthContext } from '../contexts/AuthContext'

export default function PremiumLogin() {
  const [loginMode, setLoginMode] = useState('employee') // 'employee' or 'admin'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await authAPI.login({ email, password })
      login(response.data.access_token, response.data.user)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const isAdminMode = loginMode === 'admin'

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-all duration-500 ${
      isAdminMode
        ? 'bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.16),transparent_34%),linear-gradient(180deg,#1a1625_0%,#0f0a15_60%,#050005_100%)]'
        : 'bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.16),transparent_34%),linear-gradient(180deg,#181818_0%,#090909_60%,#050505_100%)]'
    }`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isAdminMode ? (
          <>
            <div className="absolute -top-12 -left-12 w-80 h-80 bg-purple-600 rounded-full blur-3xl opacity-15 animate-pulse"></div>
            <div className="absolute top-32 right-0 w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
          </>
        ) : (
          <>
            <div className="absolute -top-12 -left-12 w-80 h-80 bg-amber-500 rounded-full blur-3xl opacity-15 animate-pulse"></div>
            <div className="absolute top-32 right-0 w-96 h-96 bg-orange-600 rounded-full blur-3xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
          </>
        )}
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Mode Toggle */}
        <div className="flex gap-3 mb-6 bg-[#111111]/85 backdrop-blur-xl rounded-2xl p-1.5 border border-white/10">
          <button
            onClick={() => setLoginMode('employee')}
            className={`flex-1 py-2.5 px-4 rounded-lg font-semibold transition transform ${
              !isAdminMode
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Employee Login
          </button>
          <button
            onClick={() => setLoginMode('admin')}
            className={`flex-1 py-2.5 px-4 rounded-lg font-semibold transition transform ${
              isAdminMode
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Admin Login
          </button>
        </div>

        <div className={`bg-[#111111]/95 backdrop-blur-xl rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.55)] p-8 border transition-all duration-500 ${
          isAdminMode
            ? 'border-purple-500/30'
            : 'border-white/10'
        }`}>
          <div className="text-center mb-8">
            <div className={`mx-auto mb-4 h-14 w-14 rounded-2xl text-black flex items-center justify-center text-xl font-black tracking-[0.3em] shadow-lg transition-all duration-500 ${
              isAdminMode
                ? 'bg-gradient-to-br from-purple-400 to-indigo-600'
                : 'bg-gradient-to-br from-amber-400 to-orange-600'
            }`}>
              TF
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
              {isAdminMode ? 'TaskFlow Admin' : 'TaskFlow'}
            </h1>
            <p className="text-gray-300">
              {isAdminMode 
                ? 'Team oversight & management portal'
                : 'Command center for high-velocity work'
              }
            </p>
          </div>

          {error && (
            <div className="bg-red-500/15 text-red-200 p-4 rounded-xl mb-6 border border-red-500/30">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-200 font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-none transition ${
                  isAdminMode
                    ? 'border-white/10 focus:ring-purple-500 focus:bg-white/8'
                    : 'border-white/10 focus:ring-amber-500 focus:bg-white/8'
                }`}
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-gray-200 font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-none transition ${
                  isAdminMode
                    ? 'border-white/10 focus:ring-purple-500 focus:bg-white/8'
                    : 'border-white/10 focus:ring-amber-500 focus:bg-white/8'
                }`}
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white font-bold py-3 rounded-xl transition transform hover:scale-[1.02] disabled:scale-100 shadow-lg ${
                isAdminMode
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:from-gray-500 disabled:to-gray-600 shadow-purple-950/30'
                  : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 disabled:from-gray-500 disabled:to-gray-600 shadow-orange-950/30'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {isAdminMode ? 'Signing in Admin...' : 'Signing in...'}
                </span>
              ) : (
                isAdminMode ? 'Admin Login' : 'Login'
              )}
            </button>
          </form>

          {!isAdminMode && (
            <p className="text-center mt-6 text-gray-300">
              Don't have an account?{' '}
              <a href="/register" className="text-amber-400 hover:text-amber-300 font-semibold transition">
                Register here
              </a>
            </p>
          )}
        </div>

        {/* Demo Credentials */}
        <div className={`mt-6 bg-[#111111]/85 backdrop-blur-xl rounded-2xl p-4 border transition-all duration-500 ${
          isAdminMode
            ? 'border-purple-500/20'
            : 'border-white/10'
        }`}>
          <p className="text-xs tracking-[0.2em] uppercase text-gray-300 mb-2">
            {isAdminMode ? 'Admin Demo Account' : 'Employee Demo Account'}
          </p>
          <p className={`text-xs ${
            isAdminMode
              ? 'text-purple-300 font-semibold'
              : 'text-gray-400'
          }`}>
            {isAdminMode 
              ? 'test@example.com / password123'
              : 'pp27@gmail.com / 7428219340'
            }
          </p>
        </div>

        {/* Info Cards */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {isAdminMode ? (
            <>
              <div className="bg-purple-600/10 border border-purple-500/20 rounded-xl p-3 backdrop-blur-sm">
                <p className="text-xs text-purple-300 font-semibold mb-1">Team Overview</p>
                <p className="text-xs text-gray-400">Monitor employee dashboards</p>
              </div>
              <div className="bg-purple-600/10 border border-purple-500/20 rounded-xl p-3 backdrop-blur-sm">
                <p className="text-xs text-purple-300 font-semibold mb-1">Task Tracking</p>
                <p className="text-xs text-gray-400">View task completion rates</p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-amber-600/10 border border-amber-500/20 rounded-xl p-3 backdrop-blur-sm">
                <p className="text-xs text-amber-300 font-semibold mb-1">Your Tasks</p>
                <p className="text-xs text-gray-400">Manage your workflow</p>
              </div>
              <div className="bg-amber-600/10 border border-amber-500/20 rounded-xl p-3 backdrop-blur-sm">
                <p className="text-xs text-amber-300 font-semibold mb-1">Projects</p>
                <p className="text-xs text-gray-400">Collaborate with teams</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

