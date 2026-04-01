import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Skeleton from '../components/Skeleton'
import TradeHistoryTable from '../components/TradeHistoryTable'
import { cancelOrder, getOrders } from '../services/orderService'

function OrderHistoryPage() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    try {
      const data = await getOrders()
      setRows(data || [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const onCancel = async (id) => {
    try {
      await cancelOrder(id)
      toast.success('Order cancelled')
      fetchOrders()
    } catch {
      toast.error('Unable to cancel order')
    }
  }

  if (loading) return <Skeleton className="h-72" />

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Order History</h2>
      <TradeHistoryTable rows={rows} showCancel onCancel={onCancel} />
    </div>
  )
}

export default OrderHistoryPage
