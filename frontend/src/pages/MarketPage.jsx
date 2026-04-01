import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Skeleton from '../components/Skeleton'
import StockTable from '../components/StockTable'
import { useRealtimeStocks } from '../hooks/useRealtimeStocks'
import { useTradingStore } from '../store/useTradingStore'

function MarketPage() {
  const navigate = useNavigate()
  const setSelectedSymbol = useTradingStore((state) => state.setSelectedSymbol)
  const { stocks, loading, error } = useRealtimeStocks()
  const [query, setQuery] = useState('')

  const filtered = useMemo(
    () => stocks.filter((s) => s.symbol.toLowerCase().includes(query.toLowerCase())),
    [stocks, query],
  )

  const openTrading = (symbol) => {
    setSelectedSymbol(symbol)
    navigate('/trading')
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-white">Market</h2>
        <input className="input max-w-xs" placeholder="Search symbol" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      {error && <p className="text-sm text-danger">{error}</p>}
      {loading ? <Skeleton className="h-72" /> : <StockTable stocks={filtered} onSelect={openTrading} />}
    </div>
  )
}

export default MarketPage
