<template>
  <div class="gachaModal">
    <div class="gachaModalContent">
      <button id="closeButton" @click="closeButton">Close</button>
      <img
        id="pullButton"
        src="/src/assets/Assets/UI/buttons/make_a_wish.svg"
        @click="pullGacha"
      />
      <div v-if="viewPulled == true" id="pullResults">
        <p>You just unlocked {{ pulled.starName }} !</p>
        <img
          v-bind:src="'src/assets/Assets/Stars/' + pulled.id + '.png'"
          @error="onImageError"
        />
        <p>{{ pulled.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import database from '../../assets/StarDatabase.json'
import { usePlayerStore } from '@/stores/player'
import { useCurrencyStore } from '@/stores/currency'

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
  for (const star of usePlayerStore().starDb.filter(
    star => star.unlocked == false,
  )) {
    for (let i = 0; i < star.weight; i++) {
      pullArray.push(star.starName)
    }
  }
  const pulledStar = pullArray[Math.floor(Math.random() * pullArray.length)]

  const foundStar = usePlayerStore().starDb.find(
    star => star.starName === pulledStar,
  )

  if (foundStar) {
    console.log(foundStar)
    pulled.value = foundStar
    viewPulled.value = true
    foundStar.unlocked = true
    foundStar.owned = 1
  } else {
    console.error('Star not found in player store')
  }

  checkStarFamilyBonuses()
  updateStardustCount()
}

function checkStarFamilyBonuses() {
  const pulledStarFamily = pulled.value.family

  const unlockedStars = database.starsDatabase.filter(
    star => star.family === pulledStarFamily && star.unlocked == true,
  ).length

  const familyBonusesType: string | undefined = database.families.find(
    family => family.familyName === pulledStarFamily,
  )?.bonus?.bonusType

  const familyBonusesValue: number | undefined = database.families.find(
    family => family.familyName === pulledStarFamily,
  )?.bonus?.bonusValue[unlockedStars - 1]

  if (familyBonusesType && familyBonusesValue) {
    switch (familyBonusesType) {
      case 'stardustMultiplier':
        usePlayerStore().stardustMultiplier = familyBonusesValue
        break

      case 'clicMultiplier':
        usePlayerStore().clicMultiplier +=
          (useCurrencyStore().stardustGeneration / 100) * familyBonusesValue
        console.log(usePlayerStore().$state)
        break
    }
    localStorage.setItem('player', JSON.stringify(usePlayerStore().$state))
  }
}

function updateStardustCount() {
  let initial = 0
  for (const star of StarDatabase.value.starsDatabase.filter(
    star => star.unlocked === true,
  )) {
    initial += star.stardustGeneration
  }
  useCurrencyStore().stardustGeneration = initial
  console.log(useCurrencyStore().stardustGeneration)
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

.gachaModalContent {
  position: relative;
  height: 100%;
}

#closeButton {
  position: absolute;
  top: -10px;
  right: -10px;
}

.closeButton {
  background-color: transparent;
  padding: 5px;
  border: 1px black solid;
  border-radius: 10px;
}

#pullResults {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  img {
    width: 120px;
    height: 120px;
  }
}

#pullButton {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  height: 100px;
  width: 200px;
}
</style>
