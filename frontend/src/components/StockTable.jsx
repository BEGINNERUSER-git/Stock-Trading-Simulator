import { compactNumber, currency, percent } from '../utils/formatters'

function StockTable({ stocks, onSelect }) {
  return (
    <div className="panel overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900/80 text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">Symbol</th>
              <th className="px-4 py-3">Name</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr
                key={stock.symbol}
                className="cursor-pointer border-t border-border transition hover:bg-slate-900"
                onClick={() => onSelect?.(stock.symbol)}
              >
                <td className="px-4 py-3 font-semibold text-white">{stock.symbol}</td>
                <td className="px-4 py-3">{stock.name}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StockTable
