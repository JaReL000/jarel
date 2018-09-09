import {
  reject
} from "when";

export default {
  methods: {
    sessionSet(key, value) {
      console.log(window.sessionStorage)
      let session = window.sessionStorage
      value = typeof value === 'object' ? JSON.stringify(value) : value
      session.setItem(key, value)
    },
    sessionGet(key) {
      let session = window.sessionStorage
      let value
      try {
        value = JSON.parse(session.getItem(key))
      } catch (error) {
        value = session.getItem(key)
      }
      return value
    },
    _isGoInvest(combinationId, token) {
      let params = {
        combinationId
      };
      !!token ? params.token = token : params;
      return new Promise((resolve, reject) => {
        this.$http('/activity/common/isGoInvestEnter', params, 'post').then((res) => {
          if (res.code === 10000) {
            resolve(res)
          } else {
            reject(res)
          }
        })
      })
    }
  }
}
