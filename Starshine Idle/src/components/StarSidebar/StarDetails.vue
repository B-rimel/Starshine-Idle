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
const props = defineProps(['star'])
import { useCurrencyStore } from '../../stores/currency'

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
  const previsionalCost = star.cost * Math.pow(1.03, star.owned)
  if (previsionalCost < currencyStore.stardustCount) {
    star.cost = Math.floor(previsionalCost)
    star.owned += 1

    star.stardustGeneration = Math.floor(
      star.stardustGeneration * Math.pow(1.02, star.owned),
    )
    currencyStore.stardustCount -= previsionalCost
    if (0 > star.owned) {
      star.unlocked = true
    }
  }
}
</script>

<style scoped></style>
