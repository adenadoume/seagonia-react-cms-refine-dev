import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const navItems = [
  { label: 'Dashboard', path: '/' },
  { label: 'Pages', path: '/pages' },
  { label: 'Rooms', path: '/rooms' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Testimonials', path: '/testimonials' },
  { label: 'Amenities', path: '/amenities' },
  { label: 'Experiences', path: '/experiences' },
  { label: 'Settings', path: '/settings' },
]

const secondaryNav = [
  { label: 'Messages', path: '/messages' },
  { label: 'Newsletter', path: '/newsletter' },
]

export default function Layout() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-48 bg-navy text-white flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/10">
          <div className="text-gold font-semibold tracking-wide text-sm">SEAGONIA</div>
          <div className="text-white/40 text-xs mt-0.5">Admin</div>
        </div>

        {/* Primary nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `block px-3 py-2 rounded text-sm transition-colors ${
                  isActive
                    ? 'bg-gold text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          <div className="pt-3 mt-3 border-t border-white/10 space-y-0.5">
            {secondaryNav.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded text-sm transition-colors ${
                    isActive
                      ? 'bg-gold text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* User / sign out */}
        <div className="px-4 py-4 border-t border-white/10">
          <div className="text-white/50 text-xs truncate mb-2">{user?.email}</div>
          <button
            onClick={handleSignOut}
            className="text-white/60 hover:text-white text-xs transition-colors"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-slate-900">
        <Outlet />
      </main>
    </div>
  )
}
