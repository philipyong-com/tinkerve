<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      latest_serving_number: '0001',
      last_issued_number: '0002'
    }
  }
})
</script>

<template>
  <div class="flex justify-center">
    <div
      class="md mt-10 flex flex-col justify-center rounded-lg border-2 border-solid border-black p-6"
    >
      <h1 class="pb-2 text-4xl">Now Serving: {{ latest_serving_number }}</h1>
      <h1 class="pb-4 text-4xl">Last number: {{ last_issued_number }}</h1>
      <button class="self-center rounded-lg border-2 border-solid border-black px-4 py-2 text-3xl">
        Take a Number
      </button>
    </div>
  </div>
</template>
