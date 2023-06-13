<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['onSwitchStatus', 'onCompleteCurrent', 'onCallNext'],
  props: {
    current_number: String,
    id: { type: Number, required: true },
    online_status: { type: String, required: true },
    available_tickets: { type: Boolean, required: true }
  }
})
</script>

<template>
  <div class="flex flex-col border-2 border-black rounded-lg p-4 m-4">
    <h3 class="text-3xl text-center mb-3">Counter {{ id }}</h3>
    <button
      class="border-black border-2 rounded-lg px-3 py-1 text-lg mb-3 top-0 transition-all hover:scale-110 active:bg-black active:text-white disabled:opacity-70 disabled:bg-gray-300 disabled:scale-100 disabled:text-black"
      @click="$emit('onSwitchStatus')"
    >
      {{ online_status == 'ONLINE' || online_status == 'WORKING' ? 'Go Offline' : 'Go Online' }}
    </button>
    <button
      :disabled="online_status != 'WORKING'"
      class="border-black border-2 rounded-lg px-3 py-1 text-lg mb-3 top-0 transition-all hover:scale-110 active:bg-black active:text-white disabled:opacity-70 disabled:bg-gray-300 disabled:scale-100 disabled:text-black"
      @click="$emit('onCompleteCurrent')"
    >
      Complete Current
    </button>
    <button
      :disabled="(current_number != null && current_number != '') || !available_tickets"
      class="border-black border-2 rounded-lg px-3 py-1 text-lg top-0 transition-all hover:scale-110 active:bg-black active:text-white disabled:opacity-70 disabled:bg-gray-300 disabled:scale-100 disabled:text-black"
      @click="$emit('onCallNext')"
    >
      Call Next
    </button>
  </div>
</template>
