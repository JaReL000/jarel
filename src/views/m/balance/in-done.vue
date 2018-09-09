<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.balance-done
  position: fixed
  z-index: 100
  top: 0
  left: 0
  bottom: 0
  right: 0
  height 100%
  background-color baise
  .done_img
    padding-top rem(73)
    padding-bottom rem(50)
    text-align center
    img
      width rem(100)
  .main
    margin  0 rem(134)
    padding-bottom rem(66)
    color wordSecondColor
    text-align center
    &>div
      margin-bottom rem(106)
    .active
      color mainColor
    h5
      line-height rem(80)
      font-size rem(30)
      color mainColor
    p
      line-height rem(38)
      font-size rem(28)
      color wordDfColor
  .btn
    padding rem(0) rem(38)
    input
      width 100%
      line-height rem(94)
      border-radius rem(8)
      font-size rem(36)
      background-color mainColor
      color baise
    input:active
      background-color #0089dc
      color #ececec
</style>
<template>
  <transition name="fate" >
    <div class="balance-done">
      <div class="done_img"><img
        src="../assets/success_gou_data64.png"
        alt="成功标志">
      </div>
      <div class="main">
        <h5>充值成功</h5>
         <p v-text="nextData.money+ '元'"></p>
      </div>
      <div class="btn">
        <input
          type="button"
          value="完成"
           @click="okFun"
        >
      </div>
      
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'balance-done',
    components: {},
    props: ['nextData'],
    data() {
      return {}
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      okFun(){
        this.$router.replace({
          path: '/',
          query: {}
        })
      }
    },
  }
</script>
