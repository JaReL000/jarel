
export default {
  data() {
    return {
      // 分享
      shareType: '1',
      time: "2017-11-28",

      showShare: false,
      // url: document.location.href,
      // header
      showMenu: false,
      drawerVisibility: false,
      showMode: 'push',
      showModeValue: 'push',
      showPlacement: 'left',
      showPlacementValue: 'left'
    }
  },
  created() {},
  computed: {
    // 分享
    title(){
      return this.$root.shareTitle //鲸鱼——低门槛、稳收益、安全可靠
    },
    text(){
      return this.$root.shareContent
    },
    url(){
      return this.$root.shareUrl
    },
    isShow(){
      let bool = (!this.isLogin  && !this.$root.isAPP)
      return bool
    },
    imageUrl(){
      let url = document.location.origin + require('../../images/logo.png')

      return url
    },
    leftOptions () {
      return {
        showBack: this.$route.path !== '/'
      }
    },
    rightOptions () {
      return {
        showMore: this.$route.meta.isShowMore,
        textCopy: this.$route.meta.textCopy,
        textUrl: this.$route.meta.textUrl,
      }
    },
    titleOptions(){
      return {
        name: this.$route.name || this.$root.title || this.$root.twoTitle
        // name: this.$root.title
      }
    }
  },
  methods: {
    // 初始化数据
    initFun(){
      // 尝试获取APP方法
      this.$root.appData.token = this.$JinrSDK.token
      this.$root.appData.longitude = this.$JinrSDK.longitude
      this.$root.appData.latitude = this.$JinrSDK.latitude
      let version = this.$JinrSDK._version()
      this.$root.appVersion = version
      this.$root.showHeader = version >= 410
      this.$root.latestVersion = version >= 410
      this.$root.isAPP = this.$JinrSDK.isAPP
      console.log(this.$root.isAPP);

      this.isShowLogin = this.$JinrSDK.isShowLogin

      // this.isShowLogin = this.$JinrSDK.appData.isShowLogin
      // try {
      //   this.$root.appData = this.$JinrSDK.appData
      //   this.isLogin = this.$root.appData.token ? true : false
      //   // 处理版本如果小于4.1.0 设置为真
      //   let version = parseFloat(this.$root.appData.app_v.replace('.', '').replace('.', ''))
      //   let version = this.$JinrSDK.version
      //   this.$root.appVersion = version
      //   this.$root.showHeader = version >= 410
      //   this.$root.latestVersion = version >= 410

      // } catch (error) {
      //   this.$root.appData.token = sessionStorage.getItem('token')
      //   this.isLogin = sessionStorage.getItem('token') ? true : false
      //   // this.$root.latestVersion = true
      // }
      // this.$root.isAPP = ((this.$root.appData.platform == "3") || (this.$root.appData.platform == "4"))
    },

    shareToggleFun(){
      // this.$JinrSDK.showShare('1', 'http://192.168.28.82:8999/img/logo.3c482af.png', '鲸鱼超级新手福利：6000体验金+200元现金抵扣券', '鲸鱼理财——低门槛、稳收益、安全可靠', 'https://hbnew.jingyugame.com/activity/Activity/enter?combinationId=xvjErjR71VVoi0BxdGb82g==')
      this.showShare = !this.showShare
      // this.$JinrSDK.$flash('鲸鱼理财——低门槛、稳收益、安全可靠')
      // this.$indicator.open('Loading...')
    },
  }
}
