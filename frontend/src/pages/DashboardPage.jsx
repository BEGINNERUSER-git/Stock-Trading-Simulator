import { useEffect, useState } from 'react'
import BalanceWidget from '../components/BalanceWidget'
import PortfolioCard from '../components/PortfolioCard'
import TradeHistoryTable from '../components/TradeHistoryTable'
import Skeleton from '../components/Skeleton'
import { getBalance, getPortfolio } from '../services/portfolioService'
import { getOrders } from '../services/orderService'

function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [balance, setBalance] = useState(0)
  const [portfolio, setPortfolio] = useState({ totalValue: 0, pnlPercent: 0, holdings: [] })
  const [recentTrades, setRecentTrades] = useState([])

  useEffect(() => {
    const run = async () => {
      try {
           let balanceRes = { balance: 0 }
    let portfolioRes = { totalValue: 0, pnlPercent: 0, holdings: [] }
    let ordersRes = []

    try {
      balanceRes = await getBalance()
    } catch (e) {
      console.log("Balance failed")
    }

    try {
      portfolioRes = await getPortfolio()
    } catch (e) {
      console.log("Portfolio failed")
    }

    try {
      ordersRes = await getOrders()
    } catch (e) {
      console.log("Orders failed")
    }

    setBalance(balanceRes.balance ?? 0)
    setPortfolio(portfolioRes)
    setRecentTrades((ordersRes || []).slice(0, 5))
      } finally {
        setLoading(false)
      }
    }
    run()
    //    let balanceRes = { balance: 0 }
    // let portfolioRes = { totalValue: 0, pnlPercent: 0, holdings: [] }
    // let ordersRes = []

    // try {
    //   balanceRes = await getBalance()
    // } catch (e) {
    //   console.log("Balance failed")
    // }

    // try {
    //   portfolioRes = await getPortfolio()
    // } catch (e) {
    //   console.log("Portfolio failed")
    // }

    // try {
    //   ordersRes = await getOrders()
    // } catch (e) {
    //   console.log("Orders failed")
    // }

    // setBalance(balanceRes.balance ?? 0)
    // setPortfolio(portfolioRes)
    // setRecentTrades((ordersRes || []).slice(0, 5))
  }, [])

  if (loading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
        <Skeleton className="h-56" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <BalanceWidget balance={balance} />
        <PortfolioCard title="Portfolio Value" value={portfolio.totalValue} change={portfolio.pnlPercent} />
        <PortfolioCard title="Holdings" value={portfolio.holdings?.length || 0} />
      </div>
      <div>
        <h3 className="mb-3 text-lg font-semibold text-white">Recent Trades</h3>
        <TradeHistoryTable rows={recentTrades} />
      </div>
    </div>
  )
}

export default DashboardPage
