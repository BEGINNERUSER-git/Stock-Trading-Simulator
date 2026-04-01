export const createMarketSocket = (onMessage) => {
  const wsUrl = import.meta.env.VITE_WS_URL
  if (!wsUrl) return null

  const socket = new WebSocket(wsUrl)
  socket.onmessage = (event) => {
    try {
      onMessage(JSON.parse(event.data))
    } catch {
      // Ignore malformed updates
    }
  }
  return socket
}
