import { useEffect } from 'react'

export const usePolling = (callback, intervalMs) => {
  useEffect(() => {
    callback()
    const interval = setInterval(callback, intervalMs)
    return () => clearInterval(interval)
  }, [callback, intervalMs])
}
