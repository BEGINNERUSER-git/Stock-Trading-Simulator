import { NavLink } from 'react-router-dom'
import { ROUTES } from '../utils/constants'

function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-64 border-r border-border bg-panel p-4 md:block">
      <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted">Navigation</p>
      <nav className="space-y-1">
        {ROUTES.map((route) => (
          <NavLink
            key={route.to}
            to={route.to}
            className={({ isActive }) =>
              `block rounded-lg px-3 py-2 text-sm transition ${
                isActive ? 'bg-accent text-white' : 'text-slate-300 hover:bg-slate-800'
              }`
            }
          >
            {route.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
