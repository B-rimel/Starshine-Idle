<template>
  <div class="interfaceContainer" @click="playerStore.handleClick">
    <img
      src="../../assets/Assets/UI/ClicInterface_placeholder.png"
      alt=""
      srcset=""
      class="background"
    />
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()
</script>

<style scoped>
.interfaceContainer {
  height: 100vh;
}
.background {
  width: 100%;
  height: 100%;
  background-image: url('@/assets/Assets/UI/ClicInterface_placeholder.png');
  z-index: -1; /* Ensure the background is behind other elements */
}
</style>
