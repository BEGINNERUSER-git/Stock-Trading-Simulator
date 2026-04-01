import api from './api'
import { normalizeBalance, normalizePortfolio } from './responseMapper'

const getCurrentUserId = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    return user?._id || user?.id || null
  } catch {
    return null
  }
}

export const getPortfolio = async () => {
  const userId = getCurrentUserId()
  // await api.get('/portfolio/create') 
  const { data } = await api.get(`/portfolio/${userId}`)
  return normalizePortfolio(data)
}

export const getBalance = async () => {
  const { data } = await api.get('/users/balance')
  console.log("RAW BALANCE RESPONSE:", data.data.balance);
  return normalizeBalance(data)
}

export const getPortfolioValue = async () => {
  const userId = getCurrentUserId()
  const { data } = await api.get(`/portfolio/${userId}/value`)
  return data.value
}

export const getStockPosition = async (symbol) => {
  const userId = getCurrentUserId()
  const { data } = await api.get(`/portfolio/${userId}/symbol?symbol=${symbol}`)
  return data.position
}

export const deletePortfolio = async () => {
  const userId = getCurrentUserId()
  await api.delete(`/portfolio/${userId}`)
}