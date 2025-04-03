<template>
  <div class="detail">
    <div class="star">
      <img
        v-bind:src="'src/assets/Assets/Stars/' + star.id + '.png'"
        @error="onImageError"
        alt=""
        class="star"
      />
    </div>
    <div class="starText">
      <p class="starName">{{ star.starName }}</p>
      <p>Level : {{ star.owned }}</p>
      <p class="starDescription">{{ star.description }}</p>
      <p>Generates {{ star.stardustGeneration }} Stardust</p>

      <img
        src="/src/assets/Assets/UI/buttons/level_up.svg"
        alt=""
        v-on:click="buyStar(star)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCurrencyStore } from '@/stores/currency'
import { usePlayerStore } from '@/stores/player'
import StarDatabase from '@/assets/StarDatabase.json'

function onImageError(event: Event) {
  const target = event.target as HTMLImageElement
  target.src = 'src/assets/Assets/Stars/default.png'
}

const star = defineProps({
  starName: { type: String, required: true },
  family: { type: String, required: false },
  id: { type: String, required: true },
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
  id: string
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

<style scoped>
.detail {
  display: flex;
  position: relative;
}

.star {
  display: flex;
  margin: auto;
  width: 25%;

  img {
    width: 100px;
    height: 100px;
  }
}

.starText {
  width: 75%;
  color: white;

  .starName {
    font-size: 140%;
    font-weight: 500;
  }

  .starDescription {
    color: #fffcc5;
  }
  .starButton {
    background-color: #f4a5ae;
    color: white;
    border: none;
  }

  .starButton:active {
    background-color: #d28790;
    color: #eca9ad;
    transition: ease-in-out 100ms;
  }
}
</style>
