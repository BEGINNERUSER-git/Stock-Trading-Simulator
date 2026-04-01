import api from './api'
const getCurrentUserId = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    return user?._id || user?.id || null
  } catch {
    return null
  }
}

export const getTransactions = async () => {
  const userId = getCurrentUserId()
  const { data } = await api.get(`/transactions/${userId}`)
  return data.data
}