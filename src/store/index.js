import Vue from 'vue'
import Vuex from 'vuex'

import request from '@/api/apis.js'
// load plugin
import createPersistedState from 'vuex-persistedstate'
// load modules
import article from './modules/article'
import layout from './modules/layout'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    codes: [],
    profile: null,
    options: null
  },
  getters: {
    getOptions: state => {
      return Object.assign({
        lockMenu: false,
        pageSize: 6
      }, state.options)
    }
  },
  mutations: {
    SET_TOKEN (state, val) {
      sessionStorage.setItem('token', val)
      state.token = val
    },
    SET_CODES (state, val) {
      sessionStorage.setItem('codes', JSON.stringify(val))
      state.codes = val
    },
    SET_PROFILE (state, val) {
      state.profile = val
    },
    SET_OPTIONS (state, val) {
      state.options = val
    },
    LOGOUT (state, val) {
      state.token = ''
      state.codes = []
      state.profile = null
      state.options = null
      state.layout.menus = []
    }
  },
  actions: {
    async LOGOUT ({ commit }, arg) {
      const result = await request.fetchLogout()
      if (result.code) {
        console.log('logout.error:', result.message)
      }
      commit('LOGOUT', arg)
    }
  },
  modules: {
    article,
    layout
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer (state) {
      return {
        token: state.token,
        codes: state.codes,
        profile: state.profile,
        options: state.options,
        layout: state.layout
      }
    }
  })]
})
