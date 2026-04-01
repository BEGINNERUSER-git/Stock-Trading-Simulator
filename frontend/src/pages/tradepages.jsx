import { useEffect, useState } from "react"
import Skeleton from "../components/Skeleton"
import TradeTable from "../components/tradetable"
import { getTransactions } from "../services/transaction.js"

function TradesPage() {
const [trades, setTrades] = useState([])
const [loading, setLoading] = useState(true)

const fetchTrades = async () => {
try {
const data = await getTransactions()
setTrades(data)
} finally {
setLoading(false)
}
}

useEffect(() => {
fetchTrades()
}, [])

if (loading) return <Skeleton className="h-72" />

return (
<div className="space-y-4">
<h2 className="text-xl font-semibold text-white">
Trade History
</h2>

  <TradeTable trades={trades} />
</div>

)
}

export default TradesPage