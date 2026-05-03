import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

export default function UserProfile() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  })
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true')
  const navigate = useNavigate()
  const { user, logout } = useContext(AuthContext)

  useEffect(() => {
    if (user) {
      setProfile(user)
      setFormData({
        username: user.username || '',
        email: user.email || ''
      })
      setLoading(false)
    }
  }, [user])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    if (!formData.username.trim() || !formData.email.trim()) {
      alert('All fields are required')
      return
    }
    setProfile({ ...profile, ...formData })
    setIsEditing(false)
    alert('Profile updated successfully')
  }

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.18),transparent_28%),linear-gradient(180deg,#181818_0%,#090909_70%,#050505_100%)]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-400 mb-4 mx-auto"></div>
        <p className="text-white text-xl">Loading profile...</p>
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
              <button
                onClick={() => navigate(user?.role === 'admin' ? '/admin/dashboard' : '/dashboard')}
                className="text-gray-400 hover:text-white transition"
              >
                ← Back
              </button>
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 text-black flex items-center justify-center text-sm font-black">
                TF
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">TaskFlow</h1>
                <p className="text-xs text-gray-400">User Profile</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition text-sm"
              >
                {darkMode ? 'Light mode' : 'Dark mode'}
              </button>
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
        <div className="max-w-2xl mx-auto px-6 py-12">
          {/* Profile Header */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-white mb-2">User Profile</h2>
            <p className="text-gray-400">Manage your account information</p>
          </div>

          {/* Profile Card */}
          <div className={`rounded-2xl border p-8 transition-all ${
            darkMode
              ? 'bg-[#111111]/80 border-white/10'
              : 'bg-[#151515]/80 border-white/10'
          }`}>
            {/* Avatar and Basic Info */}
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center space-x-6">
                <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 text-black flex items-center justify-center text-4xl font-bold">
                  {profile?.username?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{profile?.username}</h3>
                  <p className="text-gray-400 mb-3">{profile?.email}</p>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      profile?.role === 'admin'
                        ? 'bg-purple-500/20 text-purple-200'
                        : 'bg-blue-500/20 text-blue-200'
                    }`}>
                      {profile?.role === 'admin' ? 'Administrator' : 'Member'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      profile?.is_active
                        ? 'bg-green-500/20 text-green-200'
                        : 'bg-red-500/20 text-red-200'
                    }`}>
                      {profile?.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-medium transition"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {/* Profile Details */}
            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div>
                  <label className="block text-gray-200 font-semibold mb-2">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white/8 transition ${
                      darkMode ? 'border-white/10' : 'border-white/10'
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-200 font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white/8 transition ${
                      darkMode ? 'border-white/10' : 'border-white/10'
                    }`}
                    required
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl hover:from-amber-400 hover:to-orange-500 transition"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false)
                      setFormData({
                        username: profile?.username || '',
                        email: profile?.email || ''
                      })
                    }}
                    className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6 border-t border-white/10 pt-8">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Username</p>
                  <p className="text-white text-lg font-semibold">{profile?.username}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm mb-1">Email</p>
                  <p className="text-white text-lg font-semibold">{profile?.email}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm mb-1">Role</p>
                  <p className="text-white text-lg font-semibold">
                    {profile?.role === 'admin' ? 'Administrator' : 'Team Member'}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm mb-1">Account Status</p>
                  <p className={`text-lg font-semibold ${profile?.is_active ? 'text-green-400' : 'text-red-400'}`}>
                    {profile?.is_active ? 'Active' : 'Inactive'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Account Actions */}
          <div className={`mt-8 rounded-2xl border p-6 transition-all ${
            darkMode
              ? 'bg-[#111111]/80 border-white/10'
              : 'bg-[#151515]/80 border-white/10'
          }`}>
            <h3 className="text-lg font-bold text-white mb-4">Account Actions</h3>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to logout?')) {
                  logout()
                  navigate('/login')
                }
              }}
              className="w-full px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-200 font-bold rounded-xl transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
