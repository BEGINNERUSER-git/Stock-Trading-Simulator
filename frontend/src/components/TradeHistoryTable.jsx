import { currency } from '../utils/formatters'

function TradeHistoryTable({ rows = [], showCancel, onCancel }) {
  return (
    <div className="panel overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900/80 text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">Symbol</th>
              <th className="px-4 py-3">Side</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Status</th>
              {showCancel && <th className="px-4 py-3">Action</th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-border">
                <td className="px-4 py-3 font-semibold text-white">{row.symbol}</td>
                <td className={`px-4 py-3 uppercase ${row.side === 'buy' ? 'text-success' : 'text-danger'}`}>{row.side}</td>
                <td className="px-4 py-3">{row.quantity}</td>
                <td className="px-4 py-3">{currency(row.price)}</td>
                <td className="px-4 py-3 capitalize">{row.status}</td>
                {showCancel && (
                  <td className="px-4 py-3">
                    {row.status === 'pending' ? (
                      <button className="btn-secondary py-1 text-xs" onClick={() => onCancel?.(row.id)}>
                        Cancel
                      </button>
                    ) : (
                      '-'
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TradeHistoryTable
