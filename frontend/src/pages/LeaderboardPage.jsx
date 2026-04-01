import { useMemo } from 'react'
import { useRealtimeStocks } from '../hooks/useRealtimeStocks'
import Skeleton from '../components/Skeleton'
import { currency, percent } from '../utils/formatters'

function LeaderboardPage() {
  const { stocks, loading } = useRealtimeStocks()

  const rows = useMemo(
    () =>
      stocks.slice(0, 10).map((stock, index) => ({
        rank: index + 1,
        name: `Trader_${stock.symbol}`,
        profit: stock.price * (index + 1) * 0.42,
        roi: stock.changePercent * 1.7,
      })),
    [stocks],
  )

  if (loading) return <Skeleton className="h-72" />

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Leaderboard</h2>
      <div className="panel overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900/80 text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">Trader</th>
              <th className="px-4 py-3">Profit</th>
              <th className="px-4 py-3">ROI</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.rank} className="border-t border-border">
                <td className="px-4 py-3">{row.rank}</td>
                <td className="px-4 py-3 font-semibold text-white">{row.name}</td>
                <td className={`px-4 py-3 ${row.profit >= 0 ? 'text-success' : 'text-danger'}`}>{currency(row.profit)}</td>
                <td className={`px-4 py-3 ${row.roi >= 0 ? 'text-success' : 'text-danger'}`}>{percent(row.roi)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LeaderboardPage
