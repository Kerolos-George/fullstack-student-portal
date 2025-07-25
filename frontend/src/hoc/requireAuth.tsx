import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'

export function requireAuth<T extends object>(WrappedComponent: React.ComponentType<T>) {
  const AuthenticatedComponent = (props: T) => {
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

    if (!isAuthenticated) {
      return <Navigate to="/" replace />
    }

    return <WrappedComponent {...props} />
  }

  AuthenticatedComponent.displayName = `requireAuth(${WrappedComponent.displayName || WrappedComponent.name})`

  return AuthenticatedComponent
}
