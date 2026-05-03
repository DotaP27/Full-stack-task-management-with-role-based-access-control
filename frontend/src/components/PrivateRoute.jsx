import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

export function PrivateRoute({ children, requiredRole = null }) {
  const { token, user, loading } = useContext(AuthContext)

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!token) {
    return <Navigate to="/login" />
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/dashboard" />
  }

  return children
}
