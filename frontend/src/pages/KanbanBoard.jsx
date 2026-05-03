import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { projectsAPI, tasksAPI } from '../services/api'

export default function KanbanBoard() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [project, setProject] = useState(null)

  useEffect(() => {
    fetchData()
  }, [id])

  const fetchData = async () => {
    try {
      const [projectRes, tasksRes] = await Promise.all([
        projectsAPI.getOne(id),
        tasksAPI.getProjectTasks(id),
      ])
      setProject(projectRes.data)
      setTasks(tasksRes.data)
    } catch (err) {
      console.error('Failed to fetch data', err)
    } finally {
      setLoading(false)
    }
  }

  const tasksByStatus = {
    pending: tasks.filter(t => t.status === 'pending'),
    in_progress: tasks.filter(t => t.status === 'in_progress'),
    completed: tasks.filter(t => t.status === 'completed'),
  }

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-sky-500/15 text-sky-300',
      medium: 'bg-amber-500/15 text-amber-300',
      high: 'bg-orange-500/15 text-orange-300',
      urgent: 'bg-red-500/15 text-red-300',
    }
    return colors[priority] || 'bg-white/10 text-gray-300'
  }

  const KanbanColumn = ({ status, title, tasks }) => (
    <div className="flex-1 bg-[#111111] rounded-lg p-4 min-h-96 border border-white/10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-white">{title}</h3>
        <span className="bg-white/10 px-2 py-1 rounded text-xs font-semibold text-gray-300">{tasks.length}</span>
      </div>
      <div className="space-y-3">
        {tasks.map(task => (
          <div
            key={task.id}
            onClick={() => navigate(`/tasks/${task.id}`)}
            className="bg-white/5 p-3 rounded-lg shadow hover:shadow-lg transition cursor-pointer border-l-4 border-amber-500 group"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-sm text-white group-hover:text-amber-300">{task.title}</h4>
              {task.priority && (
                <span className={`text-xs px-2 py-1 rounded font-semibold ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              )}
            </div>
            {task.progress !== undefined && (
              <div className="mb-2">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{task.progress}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-orange-600 h-2 rounded-full transition-all"
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
              </div>
            )}
            {task.due_date && (
              <p className="text-xs text-gray-400">
                Due: {new Date(task.due_date).toLocaleDateString()}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.14),transparent_30%),linear-gradient(180deg,#181818_0%,#090909_72%,#050505_100%)]">
      <div className="max-w-7xl mx-auto p-6">
        <button
          onClick={() => navigate(`/projects/${id}`)}
          className="mb-6 text-white hover:text-gray-300 flex items-center gap-2"
        >
          ← Back to Project
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">{project?.name}</h1>
          <p className="text-gray-300">Kanban board view</p>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4">
          <KanbanColumn status="pending" title="To Do" tasks={tasksByStatus.pending} />
          <KanbanColumn status="in_progress" title="In Progress" tasks={tasksByStatus.in_progress} />
          <KanbanColumn status="completed" title="Done" tasks={tasksByStatus.completed} />
        </div>
      </div>
    </div>
  )
}
