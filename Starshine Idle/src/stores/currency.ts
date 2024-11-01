import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('currency', () => {
  const stardustCount = ref(0)
  const doubleCount = computed(() => stardustCount.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
