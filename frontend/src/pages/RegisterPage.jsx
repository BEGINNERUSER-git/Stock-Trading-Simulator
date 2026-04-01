import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { validateAuthForm } from '../utils/validators'



function RegisterPage() {
  const navigate = useNavigate()
  const register = useAuthStore((state) => state.register)
  const loading = useAuthStore((state) => state.loading)
  const error = useAuthStore((state) => state.error)
  const [form, setForm] = useState({ username: '', password: '' })
  const [errors, setErrors] = useState({})

  const submit = async (e) => {
    e.preventDefault()
    const nextErrors = validateAuthForm(form, 'register')
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    const ok = await register(form)
    if (ok) navigate('/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg p-4">
      <form className="panel w-full max-w-md space-y-4 p-6" onSubmit={submit}>
        <h2 className="text-xl font-semibold text-white">Register</h2>
        <input className="input" placeholder="Username" value={form.username} onChange={(e) => setForm((s) => ({ ...s, username: e.target.value }))} />
        {errors.username && <p className="text-xs text-danger">{errors.username}</p>}
        <input className="input" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))} />
        {errors.password && <p className="text-xs text-danger">{errors.password}</p>}
        {error && <p className="text-xs text-danger">{error}</p>}
        <button className="btn-primary w-full" disabled={loading}>
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
        <p className="text-sm text-muted">
          Already have an account? <Link className="text-accent" to="/login">Login</Link>
        </p>
      </form>
    </div>
  )
}

export default RegisterPage
