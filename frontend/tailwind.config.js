/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0B1220',
        panel: '#111827',
        border: '#1F2937',
        muted: '#9CA3AF',
        success: '#22C55E',
        danger: '#EF4444',
        accent: '#3B82F6',
      },
      boxShadow: {
        panel: '0 10px 30px rgba(2, 6, 23, 0.35)',
      },
    },
  },
  plugins: [],
}

