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
    initial += star.stardustGeneration * star.owned
    // console.log("L'étoile" + star.starName + 'génère' + star.stardustGeneration)
  }
  return initial
}

let interval

// eslint-disable-next-line prefer-const, @typescript-eslint/no-unused-vars
interval = setInterval(() => {
  currencyStore.stardustCount += updateStardustCount()
  playerStore.lastSave = Date.now()
  localStorage.setItem('stardust', JSON.stringify(currencyStore.stardustCount))
  localStorage.setItem('stardb', JSON.stringify(StarDatabase.starsDatabase))
}, 1000)

const currentTab = ref('StarInterface')
const tabs = {
  StarGacha,
  StarInterface,
}
</script>

<template>
  <div id="wrapper">
    <div id="sidebar">
      <p>Stardust : {{ Math.floor(currencyStore.stardustCount) }}</p>
      <StarSidebar />
    </div>
    <div id="interface">
      <button v-for="(_, tab) in tabs" :key="tab" @click="currentTab = tab">
        {{ tab }}
      </button>
      <component :is="tabs[currentTab]" />
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
