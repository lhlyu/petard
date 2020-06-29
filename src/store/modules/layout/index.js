import { getMenus } from '@/router/add_routers'

export default {
  state: {
    menus: []
  },
  mutations: {
    SET_MENUS (state, val) {
      state.menus = getMenus(val)
    }
  }
}
