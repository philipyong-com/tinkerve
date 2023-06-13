import { WebSocket, WebSocketServer } from 'ws'

const wss = new WebSocketServer({ port: 8080 })

const counters = [
  {
    id: 1,
    online_status: false,
    current_number: null,
  },
  {
    id: 2,
    online_status: false,
    current_number: null,
  },
  {
    id: 3,
    online_status: false,
    current_number: null,
  },
  {
    id: 4,
    online_status: false,
    current_number: null,
  },
]

wss.on('connection', function connection(ws) {
  console.log('Connected!')
  ws.on('message', function message(data: String) {
    let parsedData = JSON.parse(data.toString())
    // console.log(parsedData)

    if (parsedData.action == 'Switch Status') {
      counters[parsedData.counterId - 1].online_status =
        !counters[parsedData.counterId - 1].online_status

      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({ action: 'Update Counters', counters: counters })
          )
        }
      })
    }
  })
  ws.send(
    JSON.stringify({
      action: 'SETUP',
      counters: counters,
    })
  )
})
