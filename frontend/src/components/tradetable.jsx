import { currency } from "../utils/formatters"

function TradeTable({ trades = [] }) {
return (
<div className="panel overflow-hidden">
<div className="overflow-x-auto">
<table className="w-full text-left text-sm">
<thead className="bg-slate-900/80 text-xs uppercase tracking-wide text-muted">
<tr>
<th className="px-4 py-3">Symbol</th>
<th className="px-4 py-3">Price</th>
<th className="px-4 py-3">Qty</th>
<th className="px-4 py-3">Side</th>
<th className="px-4 py-3">Time</th>
</tr>
</thead>

      <tbody>
        {trades.map((t) => (
          <tr key={t._id} className="border-t border-border">
            <td className="px-4 py-3 font-semibold text-white">
              {t.symbol}
            </td>

            <td className="px-4 py-3">
              {currency(t.price)}
            </td>

            <td className="px-4 py-3">
              {t.quantity}
            </td>

            <td
              className={`px-4 py-3 ${
                t.side === "buy" ? "text-success" : "text-danger"
              }`}
            >
              {t.side}
            </td>

            <td className="px-4 py-3">
              {new Date(t.createdAt).toLocaleTimeString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

)
}

export default TradeTable