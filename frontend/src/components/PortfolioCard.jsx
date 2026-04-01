import { currency, percent } from '../utils/formatters'

function PortfolioCard({ title, value, change }) {
  const isPositive = Number(change) >= 0
  return (
    <div className="panel p-4">
      <p className="text-xs uppercase tracking-wide text-muted">{title}</p>
      <p className="mt-2 text-xl font-semibold text-white">{currency(value)}</p>
      {typeof change !== 'undefined' && (
        <p className={`mt-1 text-sm ${isPositive ? 'text-success' : 'text-danger'}`}>{percent(change)}</p>
      )}
    </div>
  )
}

export default PortfolioCard
