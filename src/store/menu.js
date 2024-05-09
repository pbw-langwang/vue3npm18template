import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      openmenu: ['/home']
    }
  },
  getters: {},
  actions: {
    SET_OPENMENU(params) {
      this.openmenu = this.openmenu.splice(0, 1, params)
    }
  }
})
