import { defineStore } from 'pinia'
import starDatabase from '../assets/StarDatabase.json'
import { useCurrencyStore } from './currency'

export const usePlayerStore = defineStore('player', {
  state: () => ({
    lastSave: Date.now(),
    playerCurrency: 0 as number,
    starDb: starDatabase.starsDatabase,
    clicPower: 1 as number,
    clicMultiplier: 1 as number,
    stardustMultiplier: 1 as number,
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
      useCurrencyStore().stardustCount = 0
    },
    handleClick() {
      const currencyStore = useCurrencyStore()
      if (this.clicMultiplier > 1) {
        currencyStore.stardustCount +=
          (currencyStore.stardustGeneration / 100) * this.clicMultiplier
      } else {
        currencyStore.stardustCount += 1
      }
      console.log(this.clicPower)
    },
  },
})
