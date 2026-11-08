import { useId, useState, type FormEvent, type ReactNode } from 'react'
import { ApiError } from '../api/client'

interface AuthFormProps {
  title: string
  submitLabel: string
  passwordAutoComplete: 'current-password' | 'new-password'
  passwordMinLength?: number
  passwordHint?: string
  // Sign-up only: a second password field that has to match the first
  confirmPassword?: boolean
  onSubmit: (email: string, password: string) => Promise<void>
  footer: ReactNode
}

interface FieldErrors {
  email?: string
  password?: string
  confirmPassword?: string
}

export default function AuthForm({
  title,
  submitLabel,
  passwordAutoComplete,
  passwordMinLength,
  passwordHint,
  confirmPassword = false,
  onSubmit,
  footer,
}: AuthFormProps) {
  const id = useId()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    // Checked here, not on the server: the API only ever receives one password
    if (confirmPassword && password !== passwordAgain) {
      setFieldErrors({ confirmPassword: "Passwords don't match" })
      return
    }

    setSubmitting(true)
    setFieldErrors({})
    try {
      await onSubmit(email, password)
    } catch (err) {
      if (err instanceof ApiError) {
        const fields = { email: err.fields.email?.[0], password: err.fields.password?.[0] }
        setFieldErrors(fields)
        // Field problems show under the inputs; the banner is for everything else
        if (!fields.email && !fields.password) setError(err.message)
      } else {
        console.error(err)
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center px-4 pt-24 pb-16'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-md bg-black/70 border border-white/5 rounded-md px-8 py-10 md:px-12 md:py-12 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
      >
        <h1
          className='text-4xl text-white mb-8 tracking-wider'
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {title}
        </h1>

        {error && (
          <p role='alert' className='mb-6 rounded bg-red-600/15 border border-red-600/30 px-4 py-3 text-sm text-red-300 first-letter:uppercase'>
            {error}
          </p>
        )}

        <Field
          id={`${id}-email`}
          label='Email'
          type='email'
          autoComplete='email'
          value={email}
          onChange={setEmail}
          error={fieldErrors.email}
        />
        <Field
          id={`${id}-password`}
          label='Password'
          type='password'
          autoComplete={passwordAutoComplete}
          minLength={passwordMinLength}
          value={password}
          onChange={setPassword}
          error={fieldErrors.password}
          hint={passwordHint}
        />
        {confirmPassword && (
          <Field
            id={`${id}-password-again`}
            label='Confirm password'
            type='password'
            autoComplete='new-password'
            value={passwordAgain}
            onChange={setPasswordAgain}
            error={fieldErrors.confirmPassword}
          />
        )}

        <button
          type='submit'
          disabled={submitting}
          className='mt-3 w-full h-12 rounded bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-wait text-white font-semibold transition-colors cursor-pointer'
        >
          {submitting ? 'Please wait…' : submitLabel}
        </button>

        <p className='mt-8 text-sm text-gray-500'>{footer}</p>
      </form>
    </div>
  )
}

interface FieldProps {
  id: string
  label: string
  type: 'email' | 'password'
  autoComplete: string
  value: string
  onChange: (value: string) => void
  minLength?: number
  error?: string
  hint?: string
}

function Field({ id, label, type, autoComplete, value, onChange, minLength, error, hint }: FieldProps) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined

  return (
    <div className='mb-5'>
      <label htmlFor={id} className='block text-sm text-gray-400 mb-1.5'>
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        autoComplete={autoComplete}
        minLength={minLength}
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`w-full h-12 bg-white/5 border text-white px-4 rounded outline-none transition-colors ${
          error ? 'border-red-600' : 'border-white/10 focus:border-red-600/50'
        }`}
      />
      {error ? (
        <p id={`${id}-error`} className='mt-1.5 text-xs text-red-400 first-letter:uppercase'>{error}</p>
      ) : (
        hint && <p id={`${id}-hint`} className='mt-1.5 text-xs text-gray-500'>{hint}</p>
      )}
    </div>
  )
}
