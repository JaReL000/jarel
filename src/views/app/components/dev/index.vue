<template> 
  <!-- 导航模块 -->
  <nav class="navWrapper" >
    <h1>内嵌页列表</h1>
    <div class="wrapper" ref="wrapper">
      <ul class="navB" >
        <div class="top">
          <h2>本地</h2>
          <a href="http://192.168.29.67:8999/app/4.0/index.html#/details/1">http://192.168.29.67:8999/app/4.0/index.html#/</a>
          <h2>线上</h2>
          <p href="http://jinrfe.dev.jinr.com/app/4.0/index.html#">http://jinrfe.dev.jinr.com/app/4.0/index.html#</p>
        </div>
        <li 
          v-for="(items, index) in router" 
          :key="index"
          >
          <router-link 
            class="h4"
            v-if="items.path!=='/'"
            :to="items.path"
          >{{items.name}}</router-link>
          <div class="navIndex"  >
            <router-link 
              v-for="(item, index) in items.children"  
              :key="index" 
              :to="`${items.path}/${item.path}`"
              v-if="!(item.path == ':productid')"
            >{{ item.name }}</router-link>
          </div>
        </li>
      </ul>
    </div> 
  </nav> 
</template>

<script>
import router from '../../router/routes'
import BScroll from 'better-scroll'

export default {
  name: 'dev',
  components: {},
  data() {
    return {
      router,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true
    })
  },
  methods: {},
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

nav.navWrapper
  position absolute
  top 0
  bottom 0
  width 100%
  z-index -1
  color: #34495e
  h1 
    text-align: center
    font-size 44px
  .wrapper
    position: absolute
    left: 0
    top: 56px
    right: 0
    bottom: 10px
    overflow: hidden
  .navB
    padding-bottom 20px
    color #7f8c8d
    li 
      overflow hidden
    .top 
      font-size 30px
      margin-bottom 10px
      h2 
        padding 0 10px
        margin 40px 20px 10px
        font-size 24px
        line-height 20px
        color #000
        border-left: 4px solid #42b983;
        margin-left 10px
      a, p
        display block
        user-select all
        -webkit-touch-callout default
        padding-left 30px
        color #42b983
    .h4 
      display block
      margin-left 10px
      margin-bottom 15px
      padding-left 20px
      line-height 100%
      border-left 4px solid #42b983
      font-size 30px
      color #2c3e50
      &:active
        color #000
        background-color #ececec
    .navIndex
      overflow hidden
      display block
      display flex
      // justify-content space-around
      flex-wrap wrap
      align-items center
      text-align center  
      margin-bottom 30px
      a 
        width 33%
        display inline-block
        font-size 24px
        height 88px
        line-height @height
        color #42b983
        margin-bottom 4px
        margin-left 2px
        background-color: #f8f8f8;
      a:hover
        color #000
        background-color #ececec
      a.router-link-exact-active
        background-color #42b983
        color #ececec
      
</style>