import {
  reject
} from "when";

export default {
  data() {
    return { // 月季年周定期配置
      typeConfig: [{
          productId: "2",
          productTypeId: "2",
          productName: "年定期"
        },
        {
          productId: "7",
          productTypeId: "2",
          productName: "季定期"
        },
        {
          productId: "6",
          productTypeId: "2",
          productName: "月定期"
        },
        {
          productId: "9",
          productTypeId: "6",
          productName: "周定期"
        }
      ]
    }
  },
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
    _isGoInvest(combinationId, token) { //判断是否跳投资页面
      let params = {
        combinationId
      };
      !!token ? params.token = token : params;
      return new Promise((resolve, reject) => {
        this.$http('/activity/common/isGoInvestEnter', params, 'post').then((res) => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
