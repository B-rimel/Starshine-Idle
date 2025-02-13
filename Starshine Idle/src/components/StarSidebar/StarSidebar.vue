<template>
  <div>
    <StarDetail
      v-for="star in StarDatabase.starsDatabase.filter(star => star.unlocked)"
      :key="star.id"
      :starName="star.starName"
      :id="star.id"
      :cost="star.cost"
      :rarity="star.rarity"
      :description="star.description"
      :stardustGeneration="star.stardustGeneration"
      :unlocked="star.unlocked"
      :owned="star.owned"
      :class="star.rarity"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import database from '../../assets/StarDatabase.json'
import StarDetail from './StarDetails.vue'
const StarDatabase = ref(database)
console.log('database :', StarDatabase.value.starsDatabase)
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
