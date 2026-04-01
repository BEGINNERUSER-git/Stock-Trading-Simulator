import { create } from 'zustand'

export const useTradingStore = create((set) => ({
  selectedSymbol: 'AAPL',
  setSelectedSymbol: (selectedSymbol) => set({ selectedSymbol }),
}))
