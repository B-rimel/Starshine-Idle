<template>
  <p>Oui</p>
  <div
    v-for="star in StarDatabase.starsDatabase"
    id="starBubble"
    v-bind:key="star.id"
  >
    <div>{{ star.starName }}</div>
  </div>
</template>

<script setup lang="ts">
import StarDatabase from '../../assets/StarDatabase.json'
</script>

<style scoped>
#starBubble {
  border: 2px lime solid;
}
</style>
