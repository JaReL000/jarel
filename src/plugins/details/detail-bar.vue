<template>
  <!-- bar  @click="investGoFun" -->
  <h1 
    class="datail-bar"
    v-if="!hasInvest" 
    @click="closeBarFun"
  ><span>新手特权:</span >{{ msg }}<label 
      
  ></label></h1>
</template>

<script>

  export default {
    props: {
      showBar: {
        type: Boolean
      },
      // 是否首投 1已投过
      hasInvest: {
        type: [Boolean, Number]
      },
      msg: {
        type: String
      },

    },
    data () {
      return {}
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
      closeBarFun(){
        this.$emit('closeBarFun', false)
      }
    }
  }
</script>

<style lang="stylus">
@import '~style/mixin.styl'

.datail-bar  //新手特权
  padding-left 68px
  line-height 70px
  // font-weight bold
  text-align left
  // letter-spacing 2px
  font-size 28px
  background #fceddd url('./images/hongbao_min.png') no-repeat 26px center
  background-size 30px 29px
  color #888888
  label 
    float right 
    margin 16px 20px 0 0
    height 30px
    width @height
    position relative
    &:before,&:after
      content ''
      position absolute
      height 1px
      width 100%
      top 50%
      left 0
      margin-top -.04rem
      border-radius .01rem
      background #888888
    &:before
      transform rotate(45deg)
    &:after
      transform rotate(-45deg)
</style>