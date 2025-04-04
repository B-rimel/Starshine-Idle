<template>
  <div @click="playerStore.handleClick">
    <img src="../../assets/Assets/clic.webp" alt="" srcset="" />
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()
</script>
