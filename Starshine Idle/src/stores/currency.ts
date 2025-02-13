import { defineStore } from 'pinia'


export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    stardustCount: 0,
    stardustGeneration: 0
  }),

  actions: {
    resetStardust() {
      this.stardustCount = 0
      console.log("Stardust reset")
    },
    addStardust() {
      this.stardustCount += 100
    }
  }
})
