<script lang="ts">
import AdminCounterVue from '@/components/AdminCounter.vue'
import type { Counter } from '@/types/types'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { AdminCounterVue },
  data(): {
    connection: WebSocket | null
    admin_counter_data: Array<Counter>
  } {
    return {
      connection: null,
      admin_counter_data: [
        {
          id: 1,
          online_status: false,
          current_number: ''
        },
        {
          id: 2,
          online_status: false,
          current_number: ''
        },
        {
          id: 3,
          online_status: true,
          current_number: '0003'
        },
        {
          id: 4,
          online_status: false,
          current_number: ''
        }
      ]
    }
  },
  setup() {},
  mounted() {},
  created: function () {
    this.connection = new WebSocket('ws://localhost:8080')
  },
  methods: {
    switchStatus() {
      console.log('Switch Status')
    },
    completeCurrent() {
      console.log('Complete Current')
    },
    callNext() {
      console.log('Call Next')
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
        :available_tickets="true"
        @on-switch-status="switchStatus"
        @on-complete-current="completeCurrent"
        @on-call-next="callNext"
      />
    </div>
  </div>
</template>
