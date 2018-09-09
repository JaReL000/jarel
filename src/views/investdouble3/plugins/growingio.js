/*
 |--------------------------------------------------------------------------
 |  https://www.growingio.com/
 |--------------------------------------------------------------------------
 |
 |  厦门吉才神金融信息技术服务有限公司
 |  7043@usfund.com.cn
 |  ZIHUA
 |  1216603348
 |
 |  cpsj@usfund.com.cn
 |  jinrcp2017
 |
 */

/* eslint semi: "error" */
var _vds = _vds || []
window._vds = _vds
function addVDS () {
  // 项目ID
  _vds.push(['setAccountId', '9349ed78e6acad92'])
  // 启用 hashtag 作为页面收集
  _vds.push(['enableHT', true])
  function addScript () {
    var vds = document.createElement('script')
    vds.type = 'text/javascript'
    vds.async = true
    vds.src = (document.location.protocol === 'https:' ? 'https://' : 'http://') + 'assets.growingio.com/vds.js'
    var s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(vds, s)
  }
  addScript()
}

function addCNZZ () {
  var vds = document.createElement('script')
  vds.type = 'text/javascript'
  vds.async = true
  vds.src = (document.location.protocol === 'https:' ? 'https://' : 'http://') + 's19.cnzz.com/z_stat.php?id=1273204227&web_id=1273204227'
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(vds, s)
}
if (process.env.NODE_ENV === 'production') {
  addVDS()
  addCNZZ()
}
