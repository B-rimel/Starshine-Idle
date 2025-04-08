import { defineStore } from 'pinia'
import starDatabase from '../assets/StarDatabase.json'
import { useCurrencyStore } from './currency'

export const usePlayerStore = defineStore('player', {
  state: () => ({
    lastSave: Date.now(),
    playerCurrency: 0,
    starDb: starDatabase.starsDatabase,
    clicPower: 1,
    clicMultiplier: 1,
    stardustMultiplier: 1,
  }),

  actions: {
    saveStarDb() {
      localStorage.setItem('stardb', JSON.stringify(this.starDb))
    },
    resetGame() {
      for (const star of this.starDb) {
        star.unlocked = false
        star.owned = 0
      }
      useCurrencyStore().stardustGeneration = 0
      console.log(useCurrencyStore().stardustGeneration)
    },
    handleClick() {
      const currencyStore = useCurrencyStore()
      currencyStore.stardustCount += this.clicPower * this.clicMultiplier
    },
  },
})
