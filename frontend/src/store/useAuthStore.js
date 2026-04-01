import { create } from 'zustand'
import { loginRequest, registerRequest } from '../services/authService'

const parseStoredUser = () => {
  const raw = localStorage.getItem('user')
  return raw ? JSON.parse(raw) : null
}

export const useAuthStore = create((set) => ({
  token: localStorage.getItem('token'),
  user: parseStoredUser(),
  loading: false,
  error: null,

  login: async (payload) => {
    set({ loading: true, error: null })
    try {
      const data = await loginRequest(payload)
      if (!data?.token) {
        set({ loading: false, error: 'Login succeeded but no token was returned by backend' })
        return false
      }
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.username ? { username: data.username } : data.user))
      set({ token: data.token, user: data.user, loading: false })
      return true
    } catch (error) {
      set({ loading: false, error: error?.response?.data?.message || 'Login failed' })
      return false
    }
  },

  register: async (payload) => {
    set({ loading: true, error: null })
    try {
      const data = await registerRequest(payload)
      if (!data?.token) {
        set({
          loading: false,
          error: 'Registration succeeded. Please login again.',
        })
        return false
      }
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      set({ token: data.token, user: data.user, loading: false })
      return true
    } catch (error) {
      set({ loading: false, error: error?.response?.data?.message || 'Registration failed' })
      return false
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({ token: null, user: null, error: null })
  },
}))
