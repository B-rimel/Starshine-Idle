<template>
  <div class="detail">
    <p>{{ star.starName }}</p>
    <p>Owned : {{ star.owned }}</p>
    <p>{{ star.description }}</p>
    <p>Next upgrade : {{ star.cost }} Stardust</p>
    <p>Generates {{ star.stardustGeneration }} Stardust</p>
    <p>
      Total stardust generation : {{ star.stardustGeneration * star.owned }}
    </p>
    <button @click="buyStar(star)">
      {{ star.owned > 0 ? 'Level up' : 'Buy' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useCurrencyStore } from '@/stores/currency'
import { usePlayerStore } from '@/stores/player'
import StarDatabase from '@/assets/StarDatabase.json'

const star = defineProps({
  starName: { type: String, required: true },
  id: { type: Number, required: true },
  cost: { type: Number, required: true },
  rarity: { type: String, required: true },
  description: { type: String, required: true },
  stardustGeneration: { type: Number, required: true },
  unlocked: { type: Boolean, required: true },
  owned: { type: Number, required: true },
  class: { type: String, required: true },
})

console.log(star)

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
  console.log('initialising function...')
  const foundStar = playerStore.starDb.find(
    s => s.starName === star.starName,
  ) as Star
  console.log(
    'found star is ',
    foundStar.starName,
    'and we have',
    foundStar.owned,
  )
  const previsionalCost = star.cost * Math.pow(1.03, star.owned)
  if (previsionalCost < currencyStore.stardustCount) {
    foundStar.cost = Math.floor(previsionalCost)
    foundStar.owned += 1
    console.log('We now have', foundStar.owned)

    foundStar.stardustGeneration = Math.floor(
      foundStar.stardustGeneration * Math.pow(1.02, star.owned),
    )
    console.log(foundStar.stardustGeneration)
    currencyStore.stardustCount -= previsionalCost
    if (0 > foundStar.owned) {
      foundStar.unlocked = true
    }
    playerStore.saveStarDb()
    updateStardustCount()
    console.log('db saved')
  } else {
    console.log('you broke')
  }
}

function updateStardustCount() {
  let initial = 0
  for (const star of StarDatabase.starsDatabase.filter(
    star => star.unlocked === true,
  )) {
    initial += star.stardustGeneration * star.owned
  }
  useCurrencyStore().stardustGeneration += initial
}
</script>

<style scoped></style>
