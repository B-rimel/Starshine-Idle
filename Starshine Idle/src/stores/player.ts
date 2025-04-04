import { defineStore } from 'pinia'
import starDatabase from '../assets/StarDatabase.json'
import { useCurrencyStore } from './currency'

export const usePlayerStore = defineStore('player', {
  state: () => ({
    lastSave: Date.now(),
    playerCurrency: 0,
    starDb: starDatabase.starsDatabase,
    clicPower: 1,
  }),

  actions: {
    saveStarDb() {
      localStorage.setItem('stardb', JSON.stringify(this.starDb))
      console.log(this.starDb)
      console.log('Saved')
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
      this.playerCurrency += this.clicPower
      console.log('Clicked for ' + this.clicPower)
    },
  },
})
