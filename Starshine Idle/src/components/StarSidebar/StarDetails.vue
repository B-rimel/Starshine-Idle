<template>
  <div class="detail">
    <p>{{ star.starName }}</p>
    <p>Owned : {{ star.owned }}</p>
    <p>{{ star.description }}</p>
    <p>Next upgrade : {{ star.cost }} Stardust</p>
    <p>Generates {{ star.stardustGeneration }} Stardust</p>
    <button v-on:click="event => buyStar(star)">
      {{ star.owned > 0 ? 'Level up' : 'Buy' }}
    </button>
  </div>
</template>

<script setup lang="ts">

import {useCurrencyStore} from '@/stores/currency'
import {usePlayerStore} from "@/stores/player";

const props = defineProps(['star'])
const currencyStore = useCurrencyStore()
const playerStore = usePlayerStore()

interface Star {
  starName: string
  id: number
  cost: number
  rarity: string
  description: string
  stardustGeneration: number
  unlocked: boolean
  owned: number
}

function buyStar(star: Star) {
  const foundStar = playerStore.starDb.find(s => s.id === star.id)
  const previsionalCost = star.cost * Math.pow(1.03, star.owned)
  if (previsionalCost < currencyStore.stardustCount) {
    foundStar.cost = Math.floor(previsionalCost)
    foundStar.owned += 1

    foundStar.stardustGeneration = Math.floor(
      foundStar.stardustGeneration * Math.pow(1.02, star.owned),
    )
    console.log(foundStar.stardustGeneration)
    currencyStore.stardustCount -= previsionalCost
    if (0 > foundStar.owned) {
      foundStar.unlocked = true
    }
    playerStore.saveStarDb()
    console.log("db saved")
  }
}
</script>

<style scoped></style>
