<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.side
  &-mask
    position fixed
    right 0
    top 0
    width 100%
    height 100%
    background-color rgba(7, 17, 27, 0.6)
  &-main
    position fixed
    right 0
    top 0
    height 100%
    width 50%
    background-color #fff
  .menu
    position fixed
    right rem(50)
    top rem(40)
    width rem(50)
    height rem(60)
    &:active span
      background-color rosybrown
    span
      display block
      height rem(6)
      margin-bottom rem(10)
      background-color #fff




</style>
<template>
  <transition name="fate" >
    <div class="side" >

      <!--导航三道杠队长-->
      <div
        class="menu"
        @click="menuFun"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <!--遮罩层-->
      <div
        class="side-mask"
        v-if="sildShow"
        @click="menuFun"
      ></div>
      <div class="side-main"  v-if="sildShow"></div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'side',
    components: {},
    data() {
      return {
        sildShow: false
      }
    },
    computed: {
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {
      menuFun(){
        this.sildShow = !this.sildShow
      },
    },
  }
</script>
