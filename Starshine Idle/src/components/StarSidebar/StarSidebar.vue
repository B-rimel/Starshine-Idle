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
      :imgUrl="star.imgUrl"
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
  padding: 5px;
  border-radius: 24px;
  margin: 5px;
  background-color: #9029d0;
  background-image: linear-gradient(#9029d0, #3b429f);
}

.detail::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('@/assets/Assets/UI/fond_carte.svg');
  background-repeat: no-repeat;
  opacity: 0.2; /* Apply opacity to the SVG only */

  pointer-events: none; /* Ensure it doesn't block interactions */
}

button {
  background-color: transparent;
  padding: 5px;
  border: 1px black solid;
  border-radius: 10px;
}
</style>
