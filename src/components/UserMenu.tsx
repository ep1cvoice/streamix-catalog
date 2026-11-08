import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { LogIn, LogOut } from 'lucide-react'
import { useAuthContext } from '../context/AuthContext'
import { useSignOut } from '../hooks/useSignOut'

export default function UserMenu() {
  const { status, user } = useAuthContext()
  const { signOut, error } = useSignOut()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close on outside click or Escape
  useEffect(() => {
    if (!isOpen) return
    function onPointerDown(e: PointerEvent) {
      if (e.target instanceof Node && !menuRef.current?.contains(e.target)) setIsOpen(false)
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  // Same footprint as the avatar, so the navbar doesn't jump once the session is known
  if (status === 'loading') return <div className='h-8 w-8' />

  if (!user) {
    return (
      <NavLink
        to='/login'
        className='flex items-center gap-1.5 text-sm lg:text-base font-medium text-gray-400 hover:text-white transition-colors whitespace-nowrap'
        aria-label='Sign in'
      >
        <LogIn className='h-[18px] w-[18px]' />
        {/* Icon only below xl: with the search open there is no room for the label */}
        <span className='hidden xl:inline'>Sign in</span>
      </NavLink>
    )
  }

  return (
    <div ref={menuRef} className='relative'>
      <button
        onClick={() => setIsOpen(o => !o)}
        className='h-8 w-8 rounded-full bg-red-600 hover:bg-red-500 text-white text-sm font-bold uppercase flex items-center justify-center transition-colors cursor-pointer'
        aria-haspopup='menu'
        aria-expanded={isOpen}
        aria-label='Account menu'
      >
        {user.email[0]}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role='menu'
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className='absolute right-0 mt-3 w-60 bg-[#0d0d0d] border border-white/10 rounded-md shadow-xl py-2'
          >
            <p className='px-4 pt-1 pb-2 text-xs text-gray-500'>Signed in as</p>
            <p className='px-4 pb-3 text-sm text-white truncate'>{user.email}</p>
            <div className='h-px bg-white/5 mb-1' />
            <button
              role='menuitem'
              onClick={signOut}
              className='w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer'
            >
              <LogOut className='h-[15px] w-[15px]' />
              Sign out
            </button>
            {error && <p role='alert' className='px-4 pt-1 pb-1 text-xs text-red-400'>{error}</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
