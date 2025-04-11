<template>
  <div class="detail" v-bind:style="{ backgroundImage }">
    <div class="star">
      <img src="../../assets/Assets/Stars/default.png" alt="" class="star" />
    </div>
    <div class="starText">
      <p class="starName">{{ star.starName }} ({{ star.rarity }})</p>
      <p>Level : {{ star.owned }}</p>
      <p class="starDescription">{{ star.description }}</p>
      <p>Generates {{ star.stardustGeneration }} Stardust</p>

      <img
        class="buyButton"
        src="/src/assets/Assets/UI/buttons/level_up.svg"
        alt=""
        v-on:click="buyStar(star)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCurrencyStore } from '@/stores/currency'
import { usePlayerStore } from '@/stores/player'
import StarDatabase from '@/assets/StarDatabase.json'

const star = defineProps({
  imgUrl: { type: String, required: true },
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

const backgroundImages = {
  common: `/src/assets/Assets/UI/cards/card_common.webp` as string,
  rare: `/src/assets/Assets/UI/cards/card_rare.webp` as string,
  legendary: `/src/assets/Assets/UI/cards/card_legendary.webp` as string,
  unique: `/src/assets/Assets/UI/cards/card_unique.webp` as string,
}

const backgroundImage = computed(() => {
  return `url(${backgroundImages[star.rarity as keyof typeof backgroundImages]})`
})
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
  const foundStar = playerStore.starDb.find(
    s => s.starName === star.starName,
  ) as Star

  const previsionalCost = star.cost * Math.pow(1.03, star.owned)
  if (previsionalCost < currencyStore.stardustCount) {
    foundStar.cost = Math.floor(previsionalCost)
    foundStar.owned += 1

    foundStar.stardustGeneration = Math.floor(
      foundStar.stardustGeneration * Math.pow(1.02, star.owned),
    )
    console.log(foundStar.stardustGeneration)
    currencyStore.stardustCount -= previsionalCost
    playerStore.saveStarDb()
    updateStardustCount()
    console.log('db saved')
  }
}

function updateStardustCount() {
  let initial = 0
  for (const star of StarDatabase.starsDatabase.filter(
    star => star.unlocked === true,
  )) {
    initial += star.stardustGeneration
  }
  useCurrencyStore().stardustGeneration = initial
  console.log(useCurrencyStore().stardustGeneration)
}
</script>

<style scoped>
.detail {
  display: flex;
  position: relative;
  background-size: fill;
  background-position: center;
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

  .buyButton {
    height: 50px;
    width: 100px;
  }

  .starButton:active {
    background-color: #d28790;
    color: #eca9ad;
    transition: ease-in-out 100ms;
  }
}
</style>
