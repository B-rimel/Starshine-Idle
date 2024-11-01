<template>
  <p>Oui</p>
  <div
    v-for="star in StarDatabase.starsDatabase"
    id="starBubble"
    v-bind:key="star.id"
  >
    <div class="detail">
      <p>{{ star.starName }}</p>
      <p>Owned : {{ star.owned }}</p>
      <p>{{ star.description }}</p>
      <p>Generates {{ star.stardustGeneration }} Stardust</p>
      <button v-on:click="event => buyStar(star, event)">Level up!</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import StarDatabase from '../../assets/StarDatabase.json'

function buyStar(star, event) {
  console.log(star)
  const boundingBox = event.target.getBoundingClientRect()
  console.log(boundingBox.left, boundingBox.top)
  console.log(boundingBox.right, boundingBox.bottom)

  const isMouseOverButton =
    event.clientX >= boundingBox.left &&
    event.clientX <= boundingBox.right &&
    event.clientY >= boundingBox.top &&
    event.clientY <= boundingBox.bottom
  console.log(isMouseOverButton)

  const previsionalCost = star.cost * Math.pow(1.03, star.owned)
  console.log(Math.floor(previsionalCost))
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
