<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['onSwitchStatus', 'onCompleteCurrent', 'onCallNext'],
  props: {
    current_number: Number,
    id: { type: Number, required: true },
    online_status: { type: Boolean, required: true },
    available_tickets: { type: Boolean, required: true }
  }
})
</script>

<template>
  <div class="flex flex-col border-2 border-black rounded-lg p-4 m-4">
    <h3 class="text-3xl text-center mb-3">Counter {{ id }}</h3>
    <button
      class="border-black border-2 rounded-lg px-3 py-1 text-lg mb-3 top-0 transition-all hover:scale-110 active:bg-black active:text-white disabled:opacity-70 disabled:bg-gray-300 disabled:scale-100 disabled:text-black"
      @click="$emit('onSwitchStatus', id)"
      :disabled="current_number != undefined"
    >
      {{ online_status == true ? 'Go Offline' : 'Go Online' }}
    </button>
    <button
      :disabled="online_status == false || current_number == undefined"
      class="border-black border-2 rounded-lg px-3 py-1 text-lg mb-3 top-0 transition-all hover:scale-110 active:bg-black active:text-white disabled:opacity-70 disabled:bg-gray-300 disabled:scale-100 disabled:text-black"
      @click="$emit('onCompleteCurrent')"
    >
      Complete Current
    </button>
    <button
      :disabled="online_status == false || current_number != undefined || !available_tickets"
      class="border-black border-2 rounded-lg px-3 py-1 text-lg top-0 transition-all hover:scale-110 active:bg-black active:text-white disabled:opacity-70 disabled:bg-gray-300 disabled:scale-100 disabled:text-black"
      @click="$emit('onCallNext', id)"
    >
      Call Next
    </button>
  </div>
</template>
