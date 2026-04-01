import net from "net"

export const sendOrderToEngine = (message) => {
  return new Promise((resolve, reject) => {

    const client = new net.Socket()

    let buffer = ""

    client.connect(9000, "127.0.0.1", () => {
      client.write(message)
    })

    client.on("data", (data) => {
      buffer += data.toString()
    })

    client.on("close", () => {

      if (!buffer) {
        resolve([])
        return
      }

      const trades = buffer
        .trim()
        .split("\n")
        .map(line => JSON.parse(line))

      resolve(trades)
    })

    client.on("error", reject)

  })
}