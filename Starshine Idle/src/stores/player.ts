import { defineStore } from "pinia";

export const usePlayerStore = defineStore('player',{
    state: () => ({
        lastSave: Date.now(),
        playerCurrency: 0
      }),
}
)