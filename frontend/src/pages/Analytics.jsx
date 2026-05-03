import React, { useEffect, useState } from 'react'
import { projectsAPI, tasksAPI } from '../services/api'

export default function Analytics() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await projectsAPI.getAll()
      setProjects(res.data)
      if (res.data.length > 0) setSelectedProject(res.data[0].id)
    } catch (err) {
      console.error('Failed to fetch projects', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.14),transparent_30%),linear-gradient(180deg,#181818_0%,#090909_70%,#050505_100%)]">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-white mb-8">Analytics Dashboard</h1>

        {/* Project Selection */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-4">
          {projects.map(project => (
            <button
              key={project.id}
              onClick={() => setSelectedProject(project.id)}
              className={`px-6 py-3 rounded-lg transition whitespace-nowrap ${
                selectedProject === project.id
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {project.name}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Completion Rate', value: '75%', icon: 'Rate', color: 'from-emerald-500 to-emerald-600' },
            { label: 'Avg Task Duration', value: '4.2 days', icon: 'Duration', color: 'from-sky-500 to-cyan-600' },
            { label: 'Team Velocity', value: '12 tasks/week', icon: 'Velocity', color: 'from-amber-500 to-orange-600' },
            { label: 'Productivity', value: '+24%', icon: 'Output', color: 'from-red-500 to-orange-600' },
          ].map((stat, idx) => (
            <div key={idx} className={`bg-gradient-to-br ${stat.color} p-6 rounded-xl text-white shadow-lg`}>
              <div className="text-xs uppercase tracking-[0.24em] opacity-80 mb-2">{stat.icon}</div>
              <p className="text-sm opacity-90">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Task Distribution */}
          <div className="bg-[#111111] p-6 rounded-xl text-white border border-white/10">
            <h3 className="text-xl font-bold mb-4">Task Status Distribution</h3>
            <div className="space-y-4">
              {[
                { label: 'Completed', value: 65, color: 'bg-emerald-500' },
                { label: 'In Progress', value: 25, color: 'bg-amber-500' },
                { label: 'Pending', value: 10, color: 'bg-red-500' },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-2">
                    <span>{item.label}</span>
                    <span className="font-bold">{item.value}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                    <div
                      className={`${item.color} h-3 rounded-full transition-all`}
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Performance */}
          <div className="bg-[#111111] p-6 rounded-xl text-white border border-white/10">
            <h3 className="text-xl font-bold mb-4">Team Performance</h3>
            <div className="space-y-4">
              {[
                { name: 'John Doe', tasks: 12, efficiency: 95 },
                { name: 'Jane Smith', tasks: 10, efficiency: 92 },
                { name: 'Bob Johnson', tasks: 8, efficiency: 88 },
              ].map((member, idx) => (
                <div key={idx} className="border-b border-gray-700 pb-4 last:border-b-0">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">{member.name}</span>
                    <span className="text-gray-400">{member.tasks} tasks</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-orange-600 h-2 rounded-full"
                      style={{ width: `${member.efficiency}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
