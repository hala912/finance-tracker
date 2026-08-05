// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) return <p>Loading...</p>
  console.log('user', user)
  if (!user) return <Navigate to="/login" replace />

  return <></>
}