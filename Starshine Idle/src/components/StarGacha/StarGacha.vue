<template>
  <p
    v-for="star in StarDatabase.starsDatabase.filter(
      star => star.unlocked == false,
    )"
    id="starBubble"
    v-bind:key="star.id"
  >
    {{ star.starName }}
  </p>
  <button @click="pullGacha">Click me !</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import database from '../../assets/StarDatabase.json'
const StarDatabase = ref(database)

function pullGacha() {
  const pullArray = []
  for (const star of StarDatabase.value.starsDatabase.filter(
    star => star.unlocked == false,
  )) {
    for (let i = 0; i < star.weight; i++) {
      pullArray.push(star.starName)
    }
  }
  const pulledStar = pullArray[Math.floor(Math.random() * pullArray.length)]

  const foundStar = StarDatabase.value.starsDatabase.find(
    star => star.starName === pulledStar,
  )

  if (foundStar) {
    foundStar.unlocked = true
    console.log('Pulled Star:', foundStar.starName)
  } else {
    console.log('Star not found')
  }
  console.log(database.starsDatabase.filter(star => star.unlocked == false))
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=DynaPuff:wght@400..700&display=swap');

* {
  font-family: 'DynaPuff';
}

.detail {
  border: 2px black solid;
  padding: 5px;
  border-radius: 5px;
  margin: 5px;
}

button {
  background-color: transparent;
  padding: 5px;
  border: 1px black solid;
  border-radius: 10px;
}
</style>
