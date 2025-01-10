import { defineStore } from 'pinia'
import { ref } from 'vue'
import database from '../assets/StarDatabase.json'
const StarDatabase = ref(database)

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    stardustCount: 0,
    stardustGeneration: 0
  }),

  getters:  () => {

  },

  setters: ()  => {
     updateStardustGeneration:  {
      
     }
  }
})
