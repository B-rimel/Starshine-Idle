<script setup lang="ts">
// import { RouterLink } from 'vue-router'
import StarInterface from './components/StarInterface/StarInterface.vue'
import StarGacha from './components/StarGacha/StarGacha.vue'
import StarSidebar from './components/StarSidebar/StarSidebar.vue'
import StarDatabase from './assets/StarDatabase.json'

import { onBeforeMount, ref } from 'vue'

import { useCurrencyStore } from './stores/currency'
import { usePlayerStore } from './stores/player'

const currencyStore = useCurrencyStore()
const playerStore = usePlayerStore()

const lastSave = ref(new Date(playerStore.lastSave))

onBeforeMount(() => {
  currencyStore.stardustCount = parseInt(
    (localStorage.getItem('stardust') as string) ?? 0,
  )
  if (Date.now() > lastSave.value.getTime() + 5 * 60 * 1000) {
    //Do something
  }
})

function updateStardustCount() {
  let initial = 0
  for (const star of StarDatabase.starsDatabase.filter(
    star => star.unlocked === true,
  )) {
    initial += star.stardustGeneration
  }
  currencyStore.stardustCount += initial * playerStore.stardustMultiplier
  return initial
}

let interval

// eslint-disable-next-line prefer-const, @typescript-eslint/no-unused-vars
interval = setInterval(() => {
  currencyStore.stardustCount +=
    currencyStore.stardustGeneration * playerStore.stardustMultiplier
  playerStore.lastSave = Date.now()
  localStorage.setItem('stardust', JSON.stringify(currencyStore.stardustCount))
  localStorage.setItem('stardb', JSON.stringify(StarDatabase.starsDatabase))
}, 1000)

const isGachaVisible = ref(false)

const toggleGacha = () => {
  isGachaVisible.value = !isGachaVisible.value
}
</script>

<template>
  <div id="wrapper">
    <div id="sidebar">
      <p>Stardust : {{ Math.floor(currencyStore.stardustCount) }}</p>
      <p>Click multiplier : {{ usePlayerStore().clicMultiplier }}</p>
      <p>Stardust multiplier : {{ usePlayerStore().stardustMultiplier }}</p>
      <button v-on:click="updateStardustCount">Add Stardust</button>
      <StarSidebar />
    </div>
    <div id="interface">
      <nav class="nav">
        <button id="gachaButton" v-on:click="toggleGacha">Get new stars</button>
      </nav>
      <StarGacha
        v-if="isGachaVisible"
        :is-visible="isGachaVisible"
        @closeGacha="isGachaVisible = false"
      />
      <StarInterface />
    </div>
  </div>
</template>

<style scoped>
#wrapper {
  display: flex;
  flex-direction: row;
}

#sidebar {
  width: 33%;
}

#interface {
  width: 67%;
}
</style>
