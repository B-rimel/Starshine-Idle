<template>
  <div>
    <StarDetail
      :star="star"
      v-for="star in StarDatabase.starsDatabase"
      v-bind:key="star.id"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import database from '../../assets/StarDatabase.json'
import StarDetail from './StarDetails.vue'
const StarDatabase = ref(database)
console.log(StarDatabase.value)

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
