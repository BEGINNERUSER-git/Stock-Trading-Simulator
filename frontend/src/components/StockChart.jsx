import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler)

function StockChart({ points = [] }) {
  const labels = points.map((item) => item.time)
  const prices = points.map((item) => item.price)

  return (
    <div className="panel p-4">
      <p className="mb-3 text-sm font-semibold text-white">Price History</p>
      <Line
        data={{
          labels,
          datasets: [
            {
              label: 'Price',
              data: prices,
              borderColor: '#3B82F6',
              backgroundColor: 'rgba(59,130,246,0.15)',
              fill: true,
              tension: 0.3,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            x: { ticks: { color: '#9CA3AF' }, grid: { color: '#1F2937' } },
            y: { ticks: { color: '#9CA3AF' }, grid: { color: '#1F2937' } },
          },
        }}
      />
    </div>
  )
}

export default StockChart
