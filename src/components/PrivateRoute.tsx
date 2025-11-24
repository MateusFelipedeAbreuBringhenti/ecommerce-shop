import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/auth-context'
import type { JSX } from 'react'

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return children
}