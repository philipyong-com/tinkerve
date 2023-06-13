<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['closeModal'],
  props: {
    showModal: Boolean,
    last_issued_number: Number
  }
})
</script>

<template>
  <div
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full transition-all"
    :class="{
      hidden: !showModal
    }"
    id="my-modal"
  >
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
    >
      <div class="mt-3 text-center">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <svg
            class="h-6 w-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">Successful!</h3>
        <div class="mt-2 px-7 py-3">
          <p class="text-lg text-gray-500">You took Ticket {{ last_issued_number }}!</p>
        </div>
        <div class="items-center px-4 py-3">
          <button
            id="ok-btn"
            class="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
            @click="$emit('closeModal')"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
