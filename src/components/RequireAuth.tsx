import { type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useIsPresent } from 'framer-motion'
import { useAuthContext } from '../context/AuthContext'

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { status } = useAuthContext()
  const location = useLocation()
  const isPresent = useIsPresent()

  // Can take a while on a cold API start, so show something instead of a blank page
  if (status === 'loading') {
    return (
      <div className='min-h-screen flex items-center justify-center' aria-label='Loading'>
        <div className='h-8 w-8 rounded-full border-2 border-red-600 border-t-transparent animate-spin' />
      </div>
    )
  }

  if (status === 'guest') {
    // Still rendered while animating out after sign-out navigated home; redirecting would override that
    if (!isPresent) return null
    const redirect = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/login?redirect=${redirect}`} replace />
  }

  return children
}
