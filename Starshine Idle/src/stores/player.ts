import { defineStore } from 'pinia'
import starDatabase from "../assets/StarDatabase.json"


export const usePlayerStore = defineStore('player', {
  state: () => ({
    lastSave: Date.now(),
    playerCurrency: 0,
    starDb: starDatabase.starsDatabase
  }),

  actions: {
    saveStarDb() {
      localStorage.setItem('stardb', JSON.stringify(this.starDb))
      console.log(this.starDb)
      console.log("Saved")
    },
    resetGame() {
      for (const star of this.starDb) {
              star.unlocked = false
              star.owned = 0
            }
    }

}
})
