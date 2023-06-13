import { WebSocket, WebSocketServer } from 'ws'
import { Counter, TicketData } from './types'

const wss = new WebSocketServer({ port: 8080 })

const counters: Array<Counter> = [
  {
    id: 1,
    online_status: false,
    current_number: undefined,
  },
  {
    id: 2,
    online_status: false,
    current_number: undefined,
  },
  {
    id: 3,
    online_status: false,
    current_number: undefined,
  },
  {
    id: 4,
    online_status: false,
    current_number: undefined,
  },
]

const ticketData: TicketData = {
  tickets: [],
  nowServing: undefined,
  lastNumber: undefined,
}

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data: String) {
    let parsedData = JSON.parse(data.toString())

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
      return
    }

    if (parsedData.action == 'Take A Number') {
      let newNumber =
        ticketData.lastNumber == undefined ? 1 : ticketData.lastNumber + 1
      ticketData.tickets.push(newNumber)
      ticketData.lastNumber = newNumber
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              action: 'Update Ticket Data',
              nowServing: ticketData.nowServing,
              lastNumber: ticketData.lastNumber,
              tickets: ticketData.tickets,
            })
          )
        }
      })
      return
    }

    if (parsedData.action == 'Call Next') {
      let currentNumber = ticketData.tickets.shift()
      ticketData.nowServing = currentNumber
      counters[parsedData.counterId - 1].current_number = currentNumber

      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              action: 'SETUP',
              counters: counters,
              nowServing: ticketData.nowServing,
              lastNumber: ticketData.lastNumber,
              tickets: ticketData.tickets,
            })
          )
        }
      })
      return
    }

    if (parsedData.action == 'Complete Current') {
      counters[parsedData.counterId - 1].current_number = undefined
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              action: 'Update Counters',
              counters: counters,
            })
          )
        }
      })
      return
    }
  })
  ws.send(
    JSON.stringify({
      action: 'SETUP',
      counters: counters,
      nowServing: ticketData.nowServing,
      lastNumber: ticketData.lastNumber,
      tickets: ticketData.tickets,
    })
  )
})
