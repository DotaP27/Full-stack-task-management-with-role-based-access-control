import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { projectsAPI } from '../services/api'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll()
      setProjects(response.data)
    } catch (err) {
      console.error('Failed to fetch projects', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Projects</h2>
          <button
            onClick={() => navigate('/projects/new')}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            + New Project
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects yet. Create one to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <div
                key={project.id}
                onClick={() => navigate(`/projects/${project.id}`)}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg cursor-pointer transition"
              >
                <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="text-sm text-gray-500">
                  Created: {new Date(project.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
