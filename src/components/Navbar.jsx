import { NavLink } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/', label: 'Главная' },
  { to: '/movies', label: 'Фильмы' },
  { to: '/series', label: 'Сериалы' },
  { to: '/favorites', label: 'Избранное' },
]

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 py-4 bg-black/80 backdrop-blur-sm border-b border-white/5">
      <NavLink
        to="/"
        className="text-red-600 text-3xl tracking-widest select-none hover:text-red-500 transition-colors duration-200"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        STREAMIX
      </NavLink>

      <ul className="flex items-center gap-8 list-none m-0 p-0">
        {NAV_LINKS.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-200 hover:text-white relative group ${
                  isActive ? 'text-white' : 'text-gray-400'
                }`
              }
            >
              {({ isActive }) => (
                <>
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
    </nav>
  )
}
