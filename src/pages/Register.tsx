import { Link, Navigate, useLocation, useSearchParams } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import AuthForm from '../components/AuthForm'
import PageWrapper from '../components/PageWrapper'
import { safeRedirect } from '../utils/safeRedirect'

export default function Register() {
  const { status, register } = useAuthContext()
  const [searchParams] = useSearchParams()
  const { search } = useLocation()

  if (status === 'authenticated') {
    return <Navigate to={safeRedirect(searchParams.get('redirect'))} replace />
  }

  return (
    <PageWrapper>
      <AuthForm
        title='Sign Up'
        submitLabel='Create account'
        passwordAutoComplete='new-password'
        passwordMinLength={8}
        passwordHint='At least 8 characters'
        onSubmit={register}
        footer={
          <>
            Already have an account?{' '}
            <Link to={`/login${search}`} className='text-white hover:underline'>
              Sign in
            </Link>
          </>
        }
      />
    </PageWrapper>
  )
}
