<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    current_number: String,
    id: { type: Number, required: true },
    online_status: { type: String, required: true }
  }
})
</script>

<template>
  <div class="flex flex-col items-center border-2 border-black rounded-lg p-4 m-4">
    <div
      class="w-8 h-8 rounded-full self-end transition-all mb-2"
      :class="{
        'bg-gray-500': online_status == 'OFFLINE',
        'bg-green-500': online_status == 'ONLINE',
        'bg-red-500': online_status == 'WORKING'
      }"
    ></div>
    <h3 class="text-3xl mb-2">Counter {{ id }}</h3>
    <h3 v-if="current_number != null && current_number != ''" class="text-3xl">
      {{ current_number }}
    </h3>
    <h3 v-else class="text-3xl">Available</h3>
  </div>
</template>
