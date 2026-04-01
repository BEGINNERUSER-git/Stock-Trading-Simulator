import api from './api.js'
import { normalizeAuth } from './responseMapper'

export const loginRequest = async (payload) => {
  const { data } = await api.post('/users/login', payload)
  return normalizeAuth(data)
}

export const registerRequest = async (payload) => {
  const { data } = await api.post('/users/register', payload)
  return normalizeAuth(data)
}
