<script setup lang="ts">
// import { RouterLink } from 'vue-router'
import StarInterface from './components/StarInterface/StarInterface.vue'
import StarGacha from './components/StarGacha/StarGacha.vue'
import StarSidebar from './components/StarSidebar/StarSidebar.vue'
import StarDatabase from './assets/StarDatabase.json'
import sounds from './assets/Assets/sound/sound.json'

import { onBeforeMount } from 'vue'

import { useCurrencyStore } from './stores/currency'
import { usePlayerStore } from './stores/player'

const currencyStore = useCurrencyStore()
const playerStore = usePlayerStore()

// const lastSave = ref(new Date(playerStore.lastSave))

onBeforeMount(() => {
  // if (Date.now() > lastSave.value.getTime()) {
  //   console.log('Last save was a while ago')

  //   const now = new Date()
  //   console.log(now.toLocaleString())
  //   console.log(lastSave.value)
  //   const timeDifference = now - lastSave.value.getTime()
  //   const timeElapsed = (now - lastSave.value.getTime()) / 1000
  //   console.log(timeElapsed.toLocaleString())
  //   console.log(timeDifference.toLocaleString())

  //   // currencyStore.stardustCount +=
  //   //   (currencyStore.stardustGeneration * timeDifference) / 1000
  // }

  currencyStore.stardustCount = parseInt(
    (localStorage.getItem('stardust') as string) ?? 0,
  )
  if (localStorage.getItem('stardb')) {
    playerStore.starDb = JSON.parse(localStorage.getItem('stardb') as string)
    StarDatabase.starsDatabase = playerStore.starDb
    console.log('Database loaded')
  }

  if (localStorage.getItem('stargeneration')) {
    useCurrencyStore().stardustGeneration = Number(
      localStorage.getItem('stargeneration'),
    )
  }
})

let interval

// eslint-disable-next-line prefer-const, @typescript-eslint/no-unused-vars
interval = setInterval(() => {
  currencyStore.stardustCount += useCurrencyStore().stardustGeneration
  playerStore.lastSave = Date.now()
  localStorage.setItem('stardust', JSON.stringify(currencyStore.stardustCount))
  localStorage.setItem('stardb', JSON.stringify(StarDatabase.starsDatabase))
  localStorage.setItem(
    'stargeneration',
    useCurrencyStore().stardustGeneration.toString(),
  )
}, 1000)

function playSound() {
  const sound = sounds.sounds.sound1
  const playedSound = new Audio(sound)
  playedSound.play()
  console.log('sound played !')
}
</script>

<template>
  <div id="wrapper">
    <div id="sidebar">
      <p>Stardust : {{ Math.floor(currencyStore.stardustCount) }}</p>
      <p>
        Currently generating {{ currencyStore.stardustGeneration }} stardust
      </p>
      <button @click="currencyStore.resetStardust()">Reset gold</button>
      <button @click="currencyStore.addStardust()">Add gold</button>
      <button @click="playerStore.resetGame()">Reset game</button>
      <button @click="playSound()">Click me for sound !</button>
      <StarSidebar />
    </div>
    <div id="interface">
      <StarGacha />
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
