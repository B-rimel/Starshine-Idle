<script setup lang="ts">
// import { RouterLink } from 'vue-router'
import StarInterface from './components/StarInterface/StarInterface.vue'
import StarGacha from './components/StarGacha/StarGacha.vue'
import StarSidebar from './components/StarSidebar/StarSidebar.vue'

import { onBeforeMount, ref } from 'vue'

import { useCurrencyStore } from './stores/currency'
import { usePlayerStore } from './stores/player'
import StarPassiveTree from './components/StarPassiveTree.vue'

const currencyStore = useCurrencyStore()
const playerStore = usePlayerStore()

const interfaceView = ref('interface')

const lastSave = ref(new Date(playerStore.lastSave))

onBeforeMount(() => {
  currencyStore.stardustCount = parseInt(
    (localStorage.getItem('stardust') as string) ?? 0,
  )
  playerStore.starDb = JSON.parse(localStorage.getItem('stardb') as string)
  playerStore.$state = JSON.parse(localStorage.getItem('player') as string)
  if (Date.now() > lastSave.value.getTime() + 5 * 60 * 1000) {
    //Do something
  }
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const interval = setInterval(() => {
  currencyStore.stardustCount +=
    currencyStore.stardustGeneration * playerStore.stardustMultiplier
  playerStore.lastSave = Date.now()
  localStorage.setItem('stardust', JSON.stringify(currencyStore.stardustCount))
  localStorage.setItem('stardb', JSON.stringify(playerStore.starDb))
}, 1000)

const isGachaVisible = ref(false)

const toggleGacha = () => {
  isGachaVisible.value = !isGachaVisible.value
}
</script>

<template>
  <div id="wrapper">
    <div id="sidebar">
      <nav id="buttonsBox">
        <div>
          <p>Stardust : {{ Math.floor(currencyStore.stardustCount) }}</p>
          <p>Click multiplier : {{ usePlayerStore().clicMultiplier }}</p>
          <p>Stardust multiplier : {{ usePlayerStore().stardustMultiplier }}</p>
        </div>
        <div class="devButtons">
          <button
            v-on:click="
              currencyStore.stardustCount += currencyStore.stardustGeneration
            "
          >
            Add Stardust
          </button>
          <button v-on:click="playerStore.resetGame">Reset game</button>
        </div>
        <nav class="navButtons">
          <button v-on:click="interfaceView = 'interface'">Click</button>
          <button v-on:click="interfaceView = 'passiveTree'">Passives</button>
          <button v-on:click="toggleGacha">Get new stars</button>
          <button>Collection</button>
          <button>Achievements</button>
        </nav>
      </nav>
      <StarSidebar id="starsBox" />
    </div>
    <div id="interface">
      <StarGacha
        v-if="isGachaVisible"
        :is-visible="isGachaVisible"
        @closeGacha="isGachaVisible = false"
      />
      <StarInterface v-if="interfaceView === 'interface'" />
      <StarPassiveTree v-if="interfaceView === 'passiveTree'" />
    </div>
  </div>
</template>

<style scoped>
#buttonsBox {
  height: 25vh;
}

#starsBox {
  height: 75vh;
  overflow-y: auto;
}
.navButtons {
  display: flex;
  justify-content: space-between;
  margin: 10px;
}
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
