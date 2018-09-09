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
    },
    // 上拉加载函数
    RefreshUp(idName, callback, isAuto) {
      console.log('调用成功')
      // 下拉初始化
      var _this = this;
      let resf = new MiniRefresh({
        container: idName,
        down: {
          callback: function () {},
          isLock: true // 锁定下拉刷新
        },
        up: {
          callback: callback,
          isAuto: isAuto !== 'undefine' ? true : isAuto,
          loadFull: { //是否开启满屏加载
            isEnable: false,
            delay: 1000
          }
        },
        isScrollBar: false
      });
      return resf
    },
    _keepFoatMoney(money) {
      money = money.toString();
      //  console.log('log------------', index)
      if (money.indexOf(".") == -1) {
        return `${money}.00`;
      } else {
        let temp = money.split(".");
        if (temp[1].length < 2) {
          return `${temp[0]}.${temp[1]}0`;
        } else {
          return `${temp[0]}.${temp[1].substr(0, 2)}`;
        }
      }
    },
    /**
     * 跳转方法
     * @param path
     * @param query
     * @returns {*}
     * @author weizihua
     */
    routerPush(path, query, title) {
      // console.log(path, query, name);

      if (path) {
        this.$router.push({
          path: path,
          query: query,
          meta: {
            title: title
          },

        })
      }
    },
  }
}
