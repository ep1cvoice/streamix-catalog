import { Link, Navigate, useLocation, useSearchParams } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import AuthForm from '../components/AuthForm'
import PageWrapper from '../components/PageWrapper'
import { safeRedirect } from '../utils/safeRedirect'

export default function Login() {
  const { status, login } = useAuthContext()
  const [searchParams] = useSearchParams()
  const { search } = useLocation()

  // Handles both "already signed in" and "just signed in": the redirect happens on re-render
  if (status === 'authenticated') {
    return <Navigate to={safeRedirect(searchParams.get('redirect'))} replace />
  }

  return (
    <PageWrapper>
      <AuthForm
        title='Sign In'
        submitLabel='Sign in'
        passwordAutoComplete='current-password'
        onSubmit={login}
        footer={
          <>
            New to Streamix?{' '}
            <Link to={`/register${search}`} className='text-white hover:underline'>
              Sign up now
            </Link>
          </>
        }
      />
    </PageWrapper>
  )
}
