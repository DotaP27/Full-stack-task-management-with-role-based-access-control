import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { projectsAPI } from '../services/api'

export default function CreateProject() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await projectsAPI.create({ name, description })
      navigate('/projects')
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create project')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-3xl font-bold mb-6">Create New Project</h2>

          {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Project Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
              >
                {loading ? 'Creating...' : 'Create Project'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/projects')}
                className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
