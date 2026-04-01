import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { createOrder } from '../services/orderService'
import { currency } from '../utils/formatters'

function OrderForm({ symbol, lastPrice, onOrderPlaced }) {
  const [side, setSide] = useState('buy')
  const [orderType, setOrderType] = useState('market')
  const [quantity, setQuantity] = useState(1)
  const [limitPrice, setLimitPrice] = useState(lastPrice || 0)
  const [loading, setLoading] = useState(false)

  const effectivePrice = orderType === 'limit' ? Number(limitPrice || 0) : Number(lastPrice || 0)
  const estimatedCost = useMemo(() => Number(quantity || 0) * effectivePrice, [quantity, effectivePrice])

  const placeOrder = async (e) => {
    e.preventDefault()
    if (!quantity || quantity <= 0) return toast.error('Enter valid quantity')
    if (orderType === 'limit' && (!limitPrice || limitPrice <= 0)) return toast.error('Enter valid limit price')

    setLoading(true)
    try {
      await createOrder({
        symbol,
        side,
        orderType,
        quantity: Number(quantity),
        price: orderType === 'limit' ? Number(limitPrice) : Number(lastPrice || 0),
      })
      toast.success('Order placed successfully')
      onOrderPlaced?.()
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Order placement failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="panel space-y-4 p-4" onSubmit={placeOrder}>
      <p className="text-sm font-semibold text-white">Place Order - {symbol}</p>

      <div className="grid grid-cols-2 gap-2">
        <button type="button" onClick={() => setSide('buy')} className={side === 'buy' ? 'btn-primary' : 'btn-secondary'}>
          Buy
        </button>
        <button type="button" onClick={() => setSide('sell')} className={side === 'sell' ? 'btn-primary' : 'btn-secondary'}>
          Sell
        </button>
      </div>

      <select className="input" value={orderType} onChange={(e) => setOrderType(e.target.value)}>
        <option value="market">Market</option>
        <option value="limit">Limit</option>
      </select>

      <input className="input" type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" />
      {orderType === 'limit' && (
        <input className="input" type="number" min="0.01" step="0.01" value={limitPrice} onChange={(e) => setLimitPrice(e.target.value)} placeholder="Limit Price" />
      )}

      <div className="rounded-lg border border-border bg-slate-900 p-3 text-sm text-slate-300">
        Estimated Cost: <span className="font-semibold text-white">{currency(estimatedCost)}</span>
      </div>

      <button className="btn-primary w-full" disabled={loading}>
        {loading ? 'Placing...' : 'Place Order'}
      </button>
    </form>
  )
}

export default OrderForm
