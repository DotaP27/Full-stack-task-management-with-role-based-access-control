import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { tasksAPI, projectsAPI } from '../services/api'

export default function CreateTask() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const projectId = searchParams.get('project')

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [assignedTo, setAssignedTo] = useState('')
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (projectId) {
      fetchMembers()
    }
  }, [projectId])

  const fetchMembers = async () => {
    try {
      const res = await projectsAPI.getMembers(projectId)
      setMembers(res.data)
    } catch (err) {
      console.error('Failed to fetch members', err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await tasksAPI.create({
        title,
        description,
        project_id: parseInt(projectId),
        assigned_to: parseInt(assignedTo),
        due_date: dueDate ? new Date(dueDate).toISOString() : null,
      })
      navigate(`/projects/${projectId}`)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create task')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-3xl font-bold mb-6">Create New Task</h2>

          {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Task Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Assign To</label>
              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a member</option>
                {members.map(member => (
                  <option key={member.user.id} value={member.user.id}>
                    {member.user.username} ({member.user.email})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Due Date</label>
              <input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
              >
                {loading ? 'Creating...' : 'Create Task'}
              </button>
              <button
                type="button"
                onClick={() => navigate(`/projects/${projectId}`)}
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
