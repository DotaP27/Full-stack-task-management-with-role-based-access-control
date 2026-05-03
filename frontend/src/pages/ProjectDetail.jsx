import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { projectsAPI, tasksAPI } from '../services/api'

export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [members, setMembers] = useState([])
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('tasks')
  const [newMemberEmail, setNewMemberEmail] = useState('')

  useEffect(() => {
    fetchProjectData()
  }, [id])

  const fetchProjectData = async () => {
    try {
      const [projectRes, membersRes, tasksRes] = await Promise.all([
        projectsAPI.getOne(id),
        projectsAPI.getMembers(id),
        tasksAPI.getProjectTasks(id),
      ])
      setProject(projectRes.data)
      setMembers(membersRes.data)
      setTasks(tasksRes.data)
    } catch (err) {
      console.error('Failed to fetch project', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>

  if (!project) return <div className="text-center py-12">Project not found</div>

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-4">
        <button
          onClick={() => navigate('/projects')}
          className="mb-4 text-blue-500 hover:text-blue-700"
        >
          ← Back to Projects
        </button>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-3xl font-bold mb-2">{project.name}</h2>
          <p className="text-gray-600">{project.description}</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('tasks')}
              className={`flex-1 py-4 text-center font-semibold ${
                activeTab === 'tasks'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600'
              }`}
            >
              Tasks ({tasks.length})
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`flex-1 py-4 text-center font-semibold ${
                activeTab === 'members'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600'
              }`}
            >
              Members ({members.length})
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'tasks' && (
              <div>
                <button
                  onClick={() => navigate(`/tasks/new?project=${id}`)}
                  className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  + New Task
                </button>
                {tasks.length === 0 ? (
                  <p className="text-gray-500">No tasks yet</p>
                ) : (
                  <div className="space-y-2">
                    {tasks.map(task => (
                      <div key={task.id} className="flex justify-between items-center p-3 border rounded hover:bg-gray-50">
                        <div>
                          <p className="font-semibold">{task.title}</p>
                          <p className="text-sm text-gray-600">{task.description}</p>
                        </div>
                        <span className={`px-3 py-1 rounded text-sm font-semibold ${
                          task.status === 'completed' ? 'bg-green-100 text-green-800' :
                          task.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {task.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'members' && (
              <div>
                <div className="space-y-4">
                  {members.map(member => (
                    <div key={member.id} className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <p className="font-semibold">{member.user.username}</p>
                        <p className="text-sm text-gray-600">{member.user.email}</p>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm font-semibold">
                        {member.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
