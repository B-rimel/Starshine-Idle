<template>
  <div
    v-for="star in StarDatabase.starsDatabase"
    id="starBubble"
    v-bind:key="star.id"
  >
    <div class="detail">
      <p>{{ star.starName }}</p>
      <p>Owned : {{ star.owned }}</p>
      <p>{{ star.description }}</p>
      <p>Next upgrade : {{ star.cost }} Stardust</p>
      <p>Generates {{ star.stardustGeneration }} Stardust</p>
      <button v-on:click="event => buyStar(star)">
        {{ star.owned > 0 ? 'Level up' : 'Buy' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import database from '../../assets/StarDatabase.json'
const StarDatabase = ref(database)

import { useCurrencyStore } from '../../stores/currency'

const currencyStore = useCurrencyStore()

function buyStar(star: object[any]) {
  console.log(star)

  const previsionalCost = star.cost * Math.pow(1.03, star.owned)
  if (previsionalCost < currencyStore.stardustCount) {
    console.log('La currency est suffisante', currencyStore.stardustCount)
    star.cost = Math.floor(previsionalCost)
    star.owned += 1
    star.stardustGeneration = Math.floor(
      star.stardustGeneration * Math.pow(1.02, star.owned),
    )
    currencyStore.stardustCount -= previsionalCost
    console.log(star)
  }
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
