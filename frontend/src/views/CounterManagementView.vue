<script lang="ts">
import AdminCounterVue from '@/components/AdminCounter.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { AdminCounterVue },
  data() {
    return {
      admin_counter_data: [
        {
          id: 1,
          online_status: 'OFFLINE',
          current_number: ''
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
  setup() {},
  mounted() {},
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
