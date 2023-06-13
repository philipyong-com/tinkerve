export declare interface Counter {
  id: number
  online_status: boolean
  current_number: number | undefined
}

export declare interface TicketData {
  tickets: Array<number>
  nowServing: number | undefined
  lastNumber: number | undefined
}
