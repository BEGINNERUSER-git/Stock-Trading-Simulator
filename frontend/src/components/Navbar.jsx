import { useAuthStore } from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const username = useAuthStore((state) => state.username)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-bg/80 px-4 py-3 backdrop-blur md:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-white">Trade Simulator</h1>
          <p className="text-xs text-muted">Virtual trading environment</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="rounded-full border border-border p-2 text-xs text-slate-300 transition hover:bg-slate-800">
            Alert
          </button>
          <div className="flex items-center gap-2 text-sm text-slate-200">
            <span className="inline-block rounded-full border border-border px-2 py-0.5 text-xs">User</span>
            <span>{username?.username || 'Trader'}</span>
          </div>
          <button onClick={handleLogout} className="btn-secondary flex items-center gap-2 px-3 py-1.5 text-xs">
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
