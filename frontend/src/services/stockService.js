import api from './api'
import { unwrapApiResponse } from './responseMapper'

export const getStocks = async () => {
  const { data } = await api.get('/stock/all')
  console.log("RAW STOCKS RESPONSE:", data);
  // const raw = unwrapApiResponse(data)
  // return Array.isArray(raw) ? raw : raw?.stocks || []
  return data?.data || [];
}

export const getStockBySymbol = async (symbol) => {
  const { data } = await api.get(`/stock/daily/${symbol}`)
  const raw = unwrapApiResponse(data) || {}
  return {
    symbol: raw.symbol || raw.stockSymbol || symbol,
    price: raw.price || raw.currentPrice || 0,
    history: raw.history || raw.priceHistory || [],
  }
}
