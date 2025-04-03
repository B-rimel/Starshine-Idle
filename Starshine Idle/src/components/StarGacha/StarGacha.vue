<template>
  <div class="gachaModal">
    <button @click="closeButton">Close</button>
    <img
      src="/src/assets/Assets/UI/buttons/make_a_wish.svg"
      @click="pullGacha"
    />
    <div v-if="viewPulled == true">
      <p>You just unlocked {{ pulled.starName }} !</p>
      <img
        v-bind:src="'src/assets/Assets/Stars/' + pulled.id + '.png'"
        @error="onImageError"
      />
      <p>{{ pulled.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import database from '../../assets/StarDatabase.json'
import { defineProps } from 'vue'
import { defineEmits } from 'vue'

defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['closeGacha'])

const StarDatabase = ref(database)

function onImageError(event: Event) {
  const target = event.target as HTMLImageElement
  target.src = 'src/assets/Assets/Stars/default.png'
}

const viewPulled = ref(false as boolean)
const pulled = ref()
function pullGacha() {
  const pullArray = []
  for (const star of StarDatabase.value.starsDatabase.filter(
    star => star.unlocked == false,
  )) {
    for (let i = 0; i < star.weight; i++) {
      pullArray.push(star.starName)
    }
  }
  const pulledStar = pullArray[Math.floor(Math.random() * pullArray.length)]

  const foundStar = StarDatabase.value.starsDatabase.find(
    star => star.starName === pulledStar,
  )

  if (foundStar) {
    pulled.value = foundStar
    viewPulled.value = true
    foundStar.unlocked = true
    console.log('Pulled Star:', foundStar.starName)
  } else {
    console.log('Star not found')
  }
  console.log(database.starsDatabase.filter(star => star.unlocked == false))
}

function closeButton() {
  emit('closeGacha')
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

.gachaModal {
  height: 50%;
  width: 50%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

.gachaModal::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

button {
  background-color: transparent;
  padding: 5px;
  border: 1px black solid;
  border-radius: 10px;
}
</style>
