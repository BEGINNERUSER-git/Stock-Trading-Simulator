import api from './api'
import { normalizeOrders, unwrapApiResponse } from './responseMapper'

const getCurrentUserId = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    return user?._id || user?.id || null
  } catch {
    return null
  }
}

export const createOrder = async (payload) => {
  const userId = getCurrentUserId()
  const backendPayload = {
    userId,
    stockSymbol: payload.symbol,
    quantity: payload.quantity,
    price: payload.price,
    transactionType: payload.side,
  }

  const { data } = await api.post('/orders/place', backendPayload)
  return unwrapApiResponse(data)
}

export const getOrders = async () => {
  const userId = getCurrentUserId()
  const { data } = await api.get(`/orders/history/${userId}`)
  // console.log("Fetching orders for userId:", data);

  return normalizeOrders(data)
}

export const cancelOrder = async (orderId) => {
  // const orderId = fetchOrderId();
  // console.log("Cancelling order with ID:", orderId);
const { data } = await api.patch(`/orders/cancel/${orderId}`)
// console.log("Cancel order response:", );
  return data;

}
