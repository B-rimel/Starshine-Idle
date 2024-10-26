<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import StarInterface from './components/StarInterface/StarInterface.vue'
import StarSidebar from './components/StarSidebar/StarSidebar.vue'
import StarDatabase from './assets/StarDatabase.json'

function updateStardustCount() {
  let initial = 0
  for (const star of StarDatabase.starsDatabase.filter(
    star => star.unlocked === true,
  )) {
    initial += star.stardustGeneration * star.owned
  }
  return initial
}

const stardustCount = ref(10)
let interval

// eslint-disable-next-line prefer-const, @typescript-eslint/no-unused-vars
interval = setInterval(() => {
  stardustCount.value += updateStardustCount()
}, 1000)
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <p>Stardust : {{ stardustCount }}</p>
  <StarSidebar />
  <StarInterface />
</template>

<style scoped></style>
