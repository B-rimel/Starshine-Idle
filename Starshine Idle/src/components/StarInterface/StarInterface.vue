<template>
  <div @click="onClick">
    <img src="../../assets/Assets/clic.webp" alt="" srcset="" />
  </div>
</template>

<script setup lang="ts">
import { useCurrencyStore } from '@/stores/currency'
function onClick() {
  console.log('clic')
  useCurrencyStore().stardustCount += 1
}
</script>
