
const mutations = {
  initState (state, initData) {
    Object.assign(state, initData)
  },
  setState (state, payLoads) {
    if (!payLoads.length) {
      this.commit('_setState', payLoads)
    } else {
      payLoads.forEach((payLoad) => {
        this.commit('_setState', payLoad)
      })
    }
  },
  _setState (state, payLoad) {
    this.commit({
      type: '__setState',
      name: payLoad.name,
      value: payLoad.value
    })
  },
  __setState (state, payLoad) {
    state[payLoad.name] = payLoad.value
  },
  clock (state) {
    state.nowTime = Date.now()
  }
}

export default mutations
