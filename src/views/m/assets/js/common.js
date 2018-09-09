exports.install = function (Vue, options) {
  Vue.prototype.$Object = {
    name: 'Jinr',
    say: (text) => {
      console.log(text)
    },
    // 对应页面
    goBank : {
      '104' : 'balance',
      '105' : 'myAsset',
      '106' : 'myAsset',
      '108' : 'weekProfitAsset',
      '101' : 'currentAsset',
      '102' : 'myAsset',
      '103' : 'myAsset',
    }
  }
};
