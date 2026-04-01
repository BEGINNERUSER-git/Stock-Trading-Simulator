import { data } from "react-router-dom"

export const unwrapApiResponse = (payload) => {
  if (!payload || typeof payload !== 'object') return payload


  if ('data' in payload && payload.data !== null) return payload.data
  return payload
}

export const normalizeAuth = (payload) => {
  // console.log("RAW PAYLOAD FROM SERVER:", payload); 
  const raw = unwrapApiResponse(payload)
  // console.log("UNWRAPPED DATA:", raw);             

  const token = raw?.accessToken || raw?.token || payload?.message?.accessToken || null
  const user = raw?.user || payload?.payload?.user || payload?.message?.user || null

  return { token, user }
}

export const normalizeOrders = (payload) => {
  // const raw = unwrapApiResponse(payload)
  // const list = Array.isArray(raw) ? raw : payload?.data || []
  const list = Array.isArray(payload) ? payload : payload?.data || payload?.data?.data||[]

  return list.map((item) => ({
    id: item._id,
    symbol: item.stockSymbol || item.symbol,
    side: item.orderType || item.side,
    quantity: item.quantity,
    price: item.price,
    status: item.status || 'pending',
  }))
}

export const normalizePortfolio = (payload) => {
  const raw = unwrapApiResponse(payload) || {}
  const holdings = (raw.stocks || raw.holdings || []).map((item) => ({
    symbol: item.stockSymbol || item.symbol,
    quantity: item.quantity || 0,
    avgBuyPrice: item.averagePrice || item.avgBuyPrice || 0,
    currentPrice: item.currentPrice || item.averagePrice || 0,
    pnl: item.pnl || 0,
    pnlPercent: item.pnlPercent || 0,
  }))

  return {
    totalValue: raw.totalValue || 0,
    pnlPercent: raw.pnlPercent || 0,
    holdings,
  }
}

export const normalizeBalance = (payload) => {
  const raw = unwrapApiResponse(payload) || {}
  return { balance: raw.user?.balance|| payload?.balance ||payload?.data?.balance|| payload?.data?.user?.balance || raw.balance|| balance || 0 }
}
  