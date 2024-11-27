import { defineStore } from 'pinia'

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    stardustCount: 0,
  }),
})
