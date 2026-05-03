import React, { useEffect, useState } from 'react'
import { projectsAPI } from '../services/api'

export default function ActivityFeed() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await projectsAPI.getAll()
      setProjects(res.data)
    } catch (err) {
      console.error('Failed to fetch projects', err)
    } finally {
      setLoading(false)
    }
  }

  // Mock activity data
  const activities = [
    { id: 1, user: 'John Doe', action: 'created', item: 'New Project "Q4 Planning"', time: '2 hours ago', icon: 'Create' },
    { id: 2, user: 'Jane Smith', action: 'completed', item: 'Task "Design Homepage"', time: '4 hours ago', icon: 'Done' },
    { id: 3, user: 'Bob Johnson', action: 'assigned', item: 'Task "API Development" to Jane Smith', time: '6 hours ago', icon: 'Assign' },
    { id: 4, user: 'John Doe', action: 'commented', item: 'on "Database Optimization"', time: '1 day ago', icon: 'Note' },
    { id: 5, user: 'Jane Smith', action: 'joined', item: 'Project "Backend Development"', time: '2 days ago', icon: 'Join' },
  ]

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.12),transparent_30%),linear-gradient(180deg,#181818_0%,#090909_72%,#050505_100%)] p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Activity Feed</h1>

        <div className="space-y-4">
          {activities.map((activity, idx) => (
            <div
              key={activity.id}
              className="bg-[#111111] p-6 rounded-lg border-l-4 border-amber-500 hover:border-orange-500 transition border border-white/10"
            >
              <div className="flex items-start gap-4">
                <div className="text-xs uppercase tracking-[0.24em] text-amber-400 pt-1">{activity.icon}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white">
                        <span className="font-bold text-amber-400">{activity.user}</span>
                        <span className="text-gray-400"> {activity.action} </span>
                        <span className="text-white font-semibold">{activity.item}</span>
                      </p>
                    </div>
                    <span className="text-gray-500 text-sm whitespace-nowrap ml-4">{activity.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-3 rounded-lg hover:from-amber-400 hover:to-orange-500 transition">
            Load More Activities
          </button>
        </div>
      </div>
    </div>
  )
}
