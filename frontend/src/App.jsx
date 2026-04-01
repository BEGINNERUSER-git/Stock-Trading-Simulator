import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardPage from './pages/DashboardPage'
import LeaderboardPage from './pages/LeaderboardPage'
import LoginPage from './pages/LoginPage'
import MarketPage from './pages/MarketPage'
import OrderBookPage from './pages/OrderBookPage'
import OrderHistoryPage from './pages/OrderHistoryPage'
import PortfolioPage from './pages/PortfolioPage'
import RegisterPage from './pages/RegisterPage'
import TradingPage from './pages/TradingPage'
import TradesPage from './pages/tradepages'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="market" element={<MarketPage />} />
        <Route path="trading" element={<TradingPage />} />
        <Route path="order-book" element={<OrderBookPage />} />
        <Route path="orders" element={<OrderHistoryPage />} />
        <Route path="portfolio" element={<PortfolioPage />} />
        <Route path="transactions" element={<TradesPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default App
