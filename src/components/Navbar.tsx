import { useState, useEffect, useRef, type ChangeEvent } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import SearchIcon from '../assets/Icons/SearchIcon'

interface NavLinkItem {
  to: string
  label: string
  heart?: boolean
}

const NAV_LINKS: NavLinkItem[] = [
  { to: '/', label: 'Home' },
  { to: '/movies', label: 'Movies' },
  { to: '/series', label: 'Series' },
  { to: '/cartoons', label: 'Cartoons' },
  { to: '/favorites', label: 'Favorites', heart: true },
]

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-[15px] w-[15px]'
    fill={filled ? 'currentColor' : 'none'}
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={2}
  >
    <path strokeLinecap='round' strokeLinejoin='round' d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
  </svg>
)

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const location = useLocation()
  const navigate = useNavigate()

  // Close mobile drawer on navigation
  useEffect(() => { setIsOpen(false) }, [location])

  // Reset search when leaving /search
  useEffect(() => {
    if (location.pathname !== '/search') {
      setIsSearchOpen(false)
      setQuery('')
    }
  }, [location.pathname])

  // Auto-focus input when search opens
  useEffect(() => {
    if (isSearchOpen) inputRef.current?.focus()
  }, [isSearchOpen])

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setQuery(val)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      if (val.trim()) {
        navigate(`/search?q=${encodeURIComponent(val.trim())}`)
      } else {
        navigate('/')
      }
    }, 700)
  }

  function openSearch() {
    setIsSearchOpen(true)
  }

  function closeSearch() {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    setIsSearchOpen(false)
    setQuery('')
    if (location.pathname === '/search') navigate('/')
  }

  return (
    <>
      <nav className='fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-black/80 backdrop-blur-sm border-b border-white/5'>
        <NavLink
          to='/'
          className='text-red-600 text-3xl tracking-widest select-none hover:text-red-500 transition-colors duration-200'
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          STREAMIX
        </NavLink>

        {/* Desktop: nav links + search */}
        <div className='hidden md:flex items-center gap-8'>
          <ul className='flex items-center gap-8 list-none m-0 p-0'>
            {NAV_LINKS.map(({ to, label, heart }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `text-base font-medium transition-colors duration-200 hover:text-white relative group flex items-center gap-1.5 ${
                      isActive ? 'text-white' : 'text-gray-400'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {heart && <HeartIcon filled={isActive} />}
                      {label}
                      <span
                        className={`absolute -bottom-1 left-0 h-0.5 bg-red-600 transition-all duration-200 ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Expanding search */}
          <div className='flex items-center gap-2 '>
            <motion.div
              animate={{ width: isSearchOpen ? 220 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className='overflow-hidden'
            >
              <input
                ref={inputRef}
                type='text'
                value={query}
                onChange={handleSearchChange}
                onKeyDown={e => e.key === 'Escape' && closeSearch()}
                onBlur={() => { if (!query) closeSearch() }}
                placeholder='Titles, genres…'
                className='w-[220px] bg-black/60 border border-white/20 text-white text-sm px-3 py-1.5 rounded-sm outline-none focus:border-white/50 placeholder:text-gray-500 transition-colors'
              />
            </motion.div>
            <button
              onClick={isSearchOpen ? closeSearch : openSearch}
              className='text-gray-400 hover:text-white transition-colors cursor-pointer'
              aria-label='Search'
            >
              <SearchIcon />
            </button>
          </div>
        </div>

        {/* Mobile: hamburger only */}
        <button
          onClick={() => setIsOpen(o => !o)}
          className='md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8'
          aria-label='Toggle menu'
        >
          <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </nav>

      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Slide-in drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-[#0d0d0d] border-l border-white/5 flex flex-col md:hidden transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer header */}
        <div className='flex items-center justify-between px-6 py-4 border-b border-white/5'>
          <span
            className='text-red-600 text-2xl tracking-widest'
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            STREAMIX
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className='text-gray-400 hover:text-white transition-colors'
            aria-label='Close menu'
          >
            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>

        {/* Mobile search input */}
        <div className='px-4 py-3 border-b border-white/5'>
          <div className='relative flex items-center'>
            <span className='absolute left-3 text-gray-500 pointer-events-none'>
              <SearchIcon />
            </span>
            <input
              type='text'
              value={query}
              onChange={handleSearchChange}
              placeholder='Titles, genres…'
              className='w-full bg-white/5 border border-white/10 text-white text-sm pl-10 pr-3 py-2 rounded outline-none focus:border-red-600/50 placeholder:text-gray-500 transition-colors'
            />
          </div>
        </div>

        {/* Drawer links */}
        <ul className='flex flex-col list-none m-0 p-0 px-4 py-4 gap-1'>
          {NAV_LINKS.map(({ to, label, heart }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-white bg-red-600/10 border-l-2 border-red-600 pl-[14px]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {heart && <HeartIcon filled={isActive} />}
                    {label}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
