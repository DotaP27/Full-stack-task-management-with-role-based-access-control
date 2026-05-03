import api from '../api'

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getCurrentUser: () => api.get('/auth/me'),
}

export const projectsAPI = {
  getAll: () => api.get('/projects'),
  getOne: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
  getMembers: (id) => api.get(`/projects/${id}/members`),
  addMember: (projectId, userId, role) => 
    api.post(`/projects/${projectId}/members`, { user_id: userId, role }),
  removeMember: (projectId, userId) => 
    api.delete(`/projects/${projectId}/members/${userId}`),
}

export const tasksAPI = {
  getAll: () => api.get('/tasks'),
  getOne: (id) => api.get(`/tasks/${id}`),
  getProjectTasks: (projectId) => api.get(`/tasks/project/${projectId}`),
  create: (data) => api.post('/tasks', data),
  update: (id, data) => api.put(`/tasks/${id}`, data),
  delete: (id) => api.delete(`/tasks/${id}`),
  getDashboard: () => api.get('/tasks/dashboard/summary'),
}
