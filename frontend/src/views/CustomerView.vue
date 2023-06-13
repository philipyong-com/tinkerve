<script lang="ts">
import CustomerCounter from '@/components/CustomerCounter.vue'
import type { Counter } from '@/types/types'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { CustomerCounter },
  data(): {
    connection: WebSocket | null
    latest_serving_number: string | null
    last_issued_number: string | null
    counter_data: Array<Counter>
  } {
    return {
      connection: null,
      latest_serving_number: '0001',
      last_issued_number: '0002',
      counter_data: []
    }
  },
  created: function () {
    this.connection = new WebSocket('ws://localhost:8080')
    this.connection.onmessage = (event) => {
      let parsedMessage = JSON.parse(event.data)
      if (parsedMessage.action == 'SETUP') {
        this.counter_data = parsedMessage.counters
        return
      }

      if (parsedMessage.action == 'Update Counters') {
        this.counter_data = parsedMessage.counters
        return
      }
    }
  },
  methods: {
    takeANumber() {}
  }
})
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <div
      class="md mt-10 flex flex-col justify-center rounded-lg border-2 border-solid border-black p-6 items-center"
    >
      <h1 class="pb-2 text-4xl">Now Serving: {{ latest_serving_number }}</h1>
      <h1 class="pb-4 text-4xl">Last Number: {{ last_issued_number }}</h1>
      <button
        class="rounded-lg border-2 border-solid border-black px-4 py-2 text-2xl relative top-0 transition-all hover:scale-110 active:bg-black active:text-white"
        v-on:click="takeANumber"
      >
        Take a Number
      </button>
    </div>
    <div class="flex mt-4">
      <CustomerCounter
        v-for="counter in counter_data"
        :id="counter.id"
        :online_status="counter.online_status"
        :current_number="counter.current_number"
      />
    </div>
  </div>
</template>
