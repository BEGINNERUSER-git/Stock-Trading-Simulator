import { useEffect, useMemo, useState } from 'react'
import OrderForm from '../components/OrderForm'
import Skeleton from '../components/Skeleton'
import StockChart from '../components/StockChart'
import { getStockBySymbol } from '../services/stockService'
import { useTradingStore } from '../store/useTradingStore'
import { currency, percent } from '../utils/formatters'

function TradingPage() {
  const symbol = useTradingStore((state) => state.selectedSymbol)
  const [stock, setStock] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadStock = async () => {
    setLoading(true)
    try {
      const data = await getStockBySymbol(symbol)
      setStock(data)
      setError('')
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to load stock details')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStock()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol])

  const chartPoints = useMemo(() => stock?.history || [], [stock])

  if (loading) return <Skeleton className="h-96" />
  if (error) return <p className="text-sm text-danger">{error}</p>

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <div className="panel p-4">
          <p className="text-sm text-muted">Selected Stock</p>
          <h2 className="text-2xl font-semibold text-white">{stock.symbol}</h2>
          <p className="text-lg text-white">{currency(stock.price)}</p>
          {/* <p className={stock.changePercent >= 0 ? 'text-success' : 'text-danger'}>{percent(stock.changePercent)}</p> */}
        </div>
        <StockChart points={chartPoints} />
      </div>
      <OrderForm symbol={stock.symbol} lastPrice={stock.price} onOrderPlaced={loadStock} />
    </div>
  )
}

export default TradingPage
