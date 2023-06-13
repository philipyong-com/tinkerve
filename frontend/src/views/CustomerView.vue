<script lang="ts">
import CustomerCounter from '@/components/CustomerCounter.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { CustomerCounter },
  data() {
    return {
      latest_serving_number: '0001',
      last_issued_number: '0002',
      counter_data: [
        {
          id: 1,
          online_status: 'OFFLINE',
          current_number: '0001'
        },
        {
          id: 2,
          online_status: 'OFFLINE',
          current_number: '0002'
        },
        {
          id: 3,
          online_status: 'ONLINE',
          current_number: '0003'
        },
        {
          id: 4,
          online_status: 'WORKING',
          current_number: '0004'
        }
      ]
    }
  },
  mounted() {
    this.setup()
  },
  methods: {
    setup() {},
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
        :current_number="counter.current_number"
        :online_status="counter.online_status"
      />
    </div>
  </div>
</template>
