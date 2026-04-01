import { useMemo } from 'react'
import Skeleton from '../components/Skeleton'
import { useRealtimeStocks } from '../hooks/useRealtimeStocks'

function OrderBookPage() {
  const { stocks, loading } = useRealtimeStocks()
  const syntheticBook = useMemo(
    () =>
      stocks.slice(0, 8).map((stock) => ({
        symbol: stock.symbol,
        buy: Number(stock.price * 0.995).toFixed(2),
        sell: Number(stock.price * 1.005).toFixed(2),
        buyQty: Math.floor((stock.volume || 1000) / 20),
        sellQty: Math.floor((stock.volume || 1200) / 24),
      })),
    [stocks],
  )

  if (loading) return <Skeleton className="h-72" />

  return (
    <div className="panel overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900/80 text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">Symbol</th>
              <th className="px-4 py-3">Best Buy</th>
              <th className="px-4 py-3">Buy Qty</th>
              <th className="px-4 py-3">Best Sell</th>
              <th className="px-4 py-3">Sell Qty</th>
            </tr>
          </thead>
          <tbody>
            {syntheticBook.map((row) => (
              <tr key={row.symbol} className="border-t border-border">
                <td className="px-4 py-3 font-semibold text-white">{row.symbol}</td>
                <td className="px-4 py-3 text-success">{row.buy}</td>
                <td className="px-4 py-3">{row.buyQty}</td>
                <td className="px-4 py-3 text-danger">{row.sell}</td>
                <td className="px-4 py-3">{row.sellQty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderBookPage
