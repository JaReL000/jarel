import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import state from './state'
import getters from './getters'
Vue.use(Vuex)

const DEBUG = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: DEBUG,
  state,
  mutations,
  getters
})
