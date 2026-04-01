import { useEffect, useState } from 'react'
import Skeleton from '../components/Skeleton'
import { getPortfolio } from '../services/portfolioService'
import { currency, percent } from '../utils/formatters'

function PortfolioPage() {
  const [portfolio, setPortfolio] = useState({ holdings: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await getPortfolio()
        setPortfolio(data)
      } finally {
        setLoading(false)
      }
    }
    fetchPortfolio()
  }, [])

  if (loading) return <Skeleton className="h-72" />

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Portfolio</h2>
      <div className="panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/80 text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Avg Buy Price</th>
                <th className="px-4 py-3">Current Price</th>
                <th className="px-4 py-3">P/L</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.stocks?.map((item) => (
                <tr key={item.symbol} className="border-t border-border">
                  <td className="px-4 py-3 font-semibold text-white">{item.symbol}</td>
                  <td className="px-4 py-3">{item.quantity}</td>
                  <td className="px-4 py-3">{currency(item.avgBuyPrice)}</td>
                  <td className="px-4 py-3">{currency(item.currentPrice)}</td>
                  <td className={`px-4 py-3 ${item.pnlPercent >= 0 ? 'text-success' : 'text-danger'}`}>
                    {currency(item.pnl)} ({percent(item.pnlPercent)})
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PortfolioPage
