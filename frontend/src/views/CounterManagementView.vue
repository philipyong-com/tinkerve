<script lang="ts">
import AdminCounterVue from '@/components/AdminCounter.vue'
import type { Counter } from '@/types/types'
import { parse } from '@vue/compiler-dom'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { AdminCounterVue },
  data(): {
    connection: WebSocket | null
    admin_counter_data: Array<Counter>
    available_tickets: Boolean
    tickets: Array<number>
  } {
    return {
      connection: null,
      admin_counter_data: [],
      available_tickets: false,
      tickets: []
    }
  },
  setup() {},
  mounted() {},
  created: function () {
    this.connection = new WebSocket('ws://localhost:8080')
    this.connection.onmessage = (event) => {
      let parsedMessage = JSON.parse(event.data)
      if (parsedMessage.action == 'SETUP') {
        this.admin_counter_data = parsedMessage.counters
        this.available_tickets = parsedMessage.tickets.length > 0
        this.tickets = parsedMessage.tickets
        return
      }

      if (parsedMessage.action == 'Update Counters') {
        this.admin_counter_data = parsedMessage.counters
        return
      }

      if (parsedMessage.action == 'Update Ticket Data') {
        this.available_tickets = parsedMessage.tickets.length > 0
        this.tickets = parsedMessage.tickets
        return
      }
    }
  },
  methods: {
    switchStatus(counterId: Number) {
      const data = {
        action: 'Switch Status',
        counterId: counterId
      }
      if (this.connection != null) {
        this.connection.send(JSON.stringify(data))
      }
    },
    completeCurrent(counterId: Number) {
      const data = {
        action: 'Complete Current',
        counterId: counterId
      }
      if (this.connection != null) {
        this.connection.send(JSON.stringify(data))
      }
    },
    callNext(counterId: Number) {
      const data = {
        action: 'Call Next',
        counterId: counterId
      }
      if (this.connection != null) {
        this.connection.send(JSON.stringify(data))
      }
    }
  }
})
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <div class="flex mt-4">
      <AdminCounterVue
        v-for="counter in admin_counter_data"
        :id="counter.id"
        :current_number="counter.current_number"
        :online_status="counter.online_status"
        :available_tickets="available_tickets.valueOf()"
        @on-switch-status="switchStatus"
        @on-complete-current="completeCurrent"
        @on-call-next="callNext"
      />
    </div>
  </div>
</template>
