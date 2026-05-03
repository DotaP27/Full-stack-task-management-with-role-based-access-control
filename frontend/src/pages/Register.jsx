import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { authAPI } from '../services/api'
import { AuthContext } from '../contexts/AuthContext'

export default function Register() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
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
      await authAPI.register({ email, username, password })
      // Auto login after registration
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.16),transparent_34%),linear-gradient(180deg,#181818_0%,#090909_60%,#050505_100%)]">
      <div className="bg-[#111111]/95 rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.55)] p-8 w-full max-w-md border border-white/10">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">Create Account</h1>
        
        {error && <div className="bg-red-500/15 text-red-200 p-4 rounded-xl mb-4 border border-red-500/30">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-200 font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-200 font-semibold mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-200 font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold py-3 rounded-xl hover:from-amber-400 hover:to-orange-500 disabled:from-gray-500 disabled:to-gray-600"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        
        <p className="text-center mt-4 text-gray-400">
          Already have an account? <a href="/login" className="text-amber-400 hover:underline">Login</a>
        </p>
      </div>
    </div>
  )
}
