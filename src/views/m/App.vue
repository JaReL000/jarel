<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

html
  body
    min-height 100%
    background-color #f5f5f5
  h1, h2, h3, h4, h5, h6
    font-weight 400
    font-size 80%;
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)

.slideIn-enter-active, .slideIn-leave-active
  transition: all 0.3s

 .slideIn-leave-to
  transform: translate3d(-100%, 0, 0)

.footer, .footerOut
  position fixed
  left 0
  bottom 0
  width 100%
  text-align center
  transform: translate3d(0,0,0)
  transition: all .7s
  &.fold-enter
    transform: translate3d(0,100%,0)
  &.fold-leave
    transform: translate3d(0,0,0)
  &.fold-leave-active
    transform: translate3d(0,100%,0)
  a
    float left
    width 50%
    line-height rem(90)
    font-size rem(36)
    background-color #fff
    color mainColor
  a.lanse
    background-color mainColor
    color #fff
  a.outBan
    background-color #fff
    color huise
  a.inBan
    background-color baise
    font-size rem(28)
    color huise
  // a:active
  //   background-color #0089dc
  //   color #ececec
.footerOut
  a
    width 100%

.jr-btn
  input
    width 85%
    height rem(92)
    border-radius rem(12)
    font-size rem(32)
    background mainColor
    color baise
  input:disabled
    background-color #ccc
  input:active
    background-color #6699ff


i.radio
  float right
  width 100px
  height @width
  background url('./assets/weixuanzhe@3x.png') no-repeat  center center
  background-size 44px 44px
  &.active
    background-image url('./assets/xuanze@3x.png')  
</style>

<template>
  <router-view ></router-view>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

