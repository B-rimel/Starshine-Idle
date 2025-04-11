<template>
  <div>
    <StarDetail
      v-for="star in usePlayerStore().starDb.filter(
        star => star.unlocked === true,
      )"
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
import StarDetail from './StarDetails.vue'
import { usePlayerStore } from '@/stores/player'
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
}

button {
  background-color: transparent;
  padding: 5px;
  border: 1px black solid;
  border-radius: 10px;
}
</style>
