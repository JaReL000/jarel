
<template>
<div class="pord">
  <x-header 
    slot="header"
    class="x-header"
    :left-options="leftOptions"
    :right-options="rightOptions"
    :title="titleOptions"
    transition="vux-header-fade-in-left"
    @onClickMore="shareToggleFun"
    @onClickUrl="routerPush"
    v-if="$root.showHeader"
  ></x-header>
  <router-view
    :class="{'x-header-top': $root.showHeader}"
  ></router-view> 
  <share
    :shareType="shareType"
    :imageUrl="imageUrl"
    :text="text"
    :title="title"
    :url="url"
    :showShare="showShare" 
    @shareToggleFun="shareToggleFun"
  ></share>
</div>
  
</template>

<script>
import mixins from './mixin'

import xHeader from './components/x-header/index'
import share from 'components/share'

export default {
  // name: 'index',
  components: {
    share,
    xHeader
  },
  data() {
    return {}
  },
  mixins: [mixins],
  computed: {},
  watch: {},
  created() {
    // 初始化数据
    this.initFun()
    this.$root.isProd = true 
  },
  mounted() {},
  methods: {},
}
</script>


<style lang="stylus">
@import "~style/mixin.styl"

html 
  color #343434

img  
  width 100%
  height 100%

.slide-enter-active, .slide-leave-active
    transition: all 0.3s

.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)

// 淡入淡出
.show-enter-active 
  opacity  1
  transition  opacity .3s
.show-leave-active 
  opacity  1
  transition  opacity .3s
.show-enter  
  opacity  0.1
.show-leave-active 
  opacity  0.1

.noData
  text-align center
  color #999
  font-size 30px
  line-height 80px
  &>img 
    padding-top 300px
    width 300px
    // height @width
    height auto



</style>

