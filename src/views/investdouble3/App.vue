<template>
  <div id="app" >
    <index-box></index-box>
  </div>
</template>

<script>
import IndexBox from './pages/index'
export default {
  name: 'app',
  data () {
    return {
      scrollTop: 0
    }
  },
  computed: {
  },
  methods: {
    hideWeChatShare () {
      /* global WeixinJSBridge */
      document.addEventListener('WeixinJSBridgeReady', function onBridgeReady () {
        // 通过下面这个API隐藏右上角按钮
        WeixinJSBridge.call('hideOptionMenu')
      })
    },
    fixPageScroll () {
      this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    },
    resetPageScroll () {
      this.$nextTick(() => {
        document.body.scrollTop = document.documentElement.scrollTop = this.scrollTop
      })
    },
    init () {
    }
  },
  created () {
  },
  components: {
    IndexBox
  }
}
</script>

<style>
body{
  margin: 0;
}
body>a{
  display: none;
}
body p{
  margin: 0;
}
#app{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  width: 750px;
  margin: 0 auto;
  background: #fcdb70;
}
#app.fix-scroll{
  height: 100vh;
  overflow: hidden;
}
#warning{
  position: fixed;
  top: 7rem;
  width: 7rem;
  left: 1.5rem;
  box-sizing: border-box;
  text-align: center;
  font-size: .5rem;
  padding: .6rem;
  background: rgba(0, 0, 0, .9);
  color: red;
  text-align: center;
  border-radius: .2rem;
}
</style>
