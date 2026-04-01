import { use, useCallback, useEffect, useState } from 'react'
import { POLL_INTERVAL_MS } from '../utils/constants'
import { getStocks } from '../services/stockService'
import { createMarketSocket } from '../services/websocket'

export const useRealtimeStocks = () => {
  const [stocks, setStocks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchStocks = useCallback(async () => {
    try {
      const data = await getStocks()
      // setStocks(Array.isArray(data) ? data : data?.data? data.data: data?.stocks? data.stocks: [])
      setStocks(data || [])
      setError('')
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to fetch stocks')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStocks()
  }, [fetchStocks])
  // useEffect(() => {
  //   fetchStocks()
  //   const poll = setInterval(fetchStocks, POLL_INTERVAL_MS)
  //   // const socket = createMarketSocket((update) => {
  //   //   if (!update?.symbol) return
  //   //   setStocks((prev) => prev.map((item) => (item.symbol === update.symbol ? { ...item, ...update } : item)))
  //   // })

  //   return () => {
  //     clearInterval(poll)
  //     if (socket) socket.close()
  //   }
  // }, [fetchStocks])

  return { stocks, loading, error, refresh: fetchStocks }
}
