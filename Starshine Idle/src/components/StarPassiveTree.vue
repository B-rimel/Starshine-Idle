<template>
  <div class="tree-container">
    <svg
      width="100%"
      height="100%"
      view-box="0 0 100% 100%"
      preserve-aspect-ratio="xMinYMin meet"
    >
      <g>
        <line
          class="link"
          v-for="(link, index) in starPassiveTree.connections"
          :key="index"
          :x1="
            (passives.find(p => p.id === link.links[0])?.position.x || 0) *
            width
          "
          :y1="
            (passives.find(p => p.id === link.links[0])?.position.y || 0) *
            height
          "
          :x2="
            (passives.find(p => p.id === link.links[1])?.position.x || 0) *
            width
          "
          :y2="
            (passives.find(p => p.id === link.links[1])?.position.y || 0) *
            height
          "
          :stroke="
            passives.find(p => p.id === link.links[0] && p.unlocked == true) &&
            passives.find(p => p.id === link.links[1] && p.unlocked == true)
              ? 'red'
              : 'black'
          "
          :stroke-width="
            passives.find(p => p.id === link.links[0]) &&
            passives.find(p => p.id === link.links[1])
              ? '3'
              : '1'
          "
        />
      </g>
      <g
        v-for="(node, index) in starPassiveTree.passives"
        :key="index"
        :transform="`translate(${node.position.x * width}, ${node.position.y * height})`"
      >
        <text class="node">{{ node.id }}</text>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import starPassiveTree from '@/assets/starPassiveTree.json'
const passives = starPassiveTree.passives as Array<{
  id: number
  name: string
  parent: number
  description: string
  unlocked: boolean
  position: { x: number; y: number }
}>
// const connections = starPassiveTree.connections as Array<{
//   links: number[]
// }>

import { ref, onMounted } from 'vue'
// import { usePlayerStore } from '@/stores/player'
// import { useCurrencyStore } from '@/stores/currency'

const height = ref(0)
const width = ref(0)

onMounted(() => {
  const svgContainer = document.getElementsByClassName(
    'tree-container',
  )[0] as HTMLElement
  width.value = svgContainer.offsetWidth
  height.value = svgContainer.offsetHeight
})
</script>

<style scoped>
.tree-container {
  border: 1px black solid;
  height: 90vh;
}

.node {
  z-index: 1;
  font-size: 20px;
  transform: translateX(-5px);
}

.link {
  z-index: -1;
}
</style>
