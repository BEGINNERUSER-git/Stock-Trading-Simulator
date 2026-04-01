import { currency } from '../utils/formatters'

function BalanceWidget({ balance }) {
  return (
    <div className="panel p-4">
      <p className="text-xs uppercase tracking-wide text-muted">Coin Balance</p>
      <p className="mt-2 text-2xl font-semibold text-white">{currency(balance)}</p>
    </div>
  )
}

export default BalanceWidget
