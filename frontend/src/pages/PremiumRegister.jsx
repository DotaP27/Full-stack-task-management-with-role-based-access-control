import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { authAPI } from '../services/api'
import { AuthContext } from '../contexts/AuthContext'

export default function PremiumRegister() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const validateForm = () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) return

    setLoading(true)

    try {
      await authAPI.register({ email, username, password })
      const loginResponse = await authAPI.login({ email, password })
      login(loginResponse.data.access_token, loginResponse.data.user)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.16),transparent_34%),linear-gradient(180deg,#181818_0%,#090909_60%,#050505_100%)]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-12 -left-12 w-80 h-80 bg-amber-500 rounded-full blur-3xl opacity-15 animate-pulse"></div>
        <div className="absolute top-32 right-0 w-96 h-96 bg-orange-600 rounded-full blur-3xl opacity-10" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-[#111111]/95 backdrop-blur-xl rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.55)] p-8 border border-white/10">
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 text-black flex items-center justify-center text-xl font-black tracking-[0.3em] shadow-lg">
              TF
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Join TaskFlow</h1>
            <p className="text-gray-300">Create a secure workspace account</p>
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
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500/40 focus:bg-white/8 transition"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-gray-200 font-semibold mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500/40 focus:bg-white/8 transition"
                placeholder="Username"
                required
              />
            </div>

            <div>
              <label className="block text-gray-200 font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500/40 focus:bg-white/8 transition"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-gray-200 font-semibold mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500/40 focus:bg-white/8 transition"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold py-3 rounded-xl hover:from-amber-400 hover:to-orange-500 disabled:from-gray-500 disabled:to-gray-600 transition transform hover:scale-[1.02] disabled:scale-100 shadow-lg shadow-orange-950/30"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-300">
            Already have an account?{' '}
            <a href="/login" className="text-amber-400 hover:text-amber-300 font-semibold transition">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
