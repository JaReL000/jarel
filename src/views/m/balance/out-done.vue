<style lang="stylus" rel="stylesheet/stylus">
@import "../../../style/mixin.styl"

.balanceOut-done
  position: fixed
  z-index: 100
  top: 0
  left: 0
  bottom: 0
  right: 0
  padding rem(80) rem(80)
  padding-right 0
  height 100%
  background-color baise
  color mainColor
  .top_img
    margin-bottom rem(70)
    text-align center
    img
      width rem(152)
    h4
      line-height rem(84)
      font-size rem(36)
      color wordDfColor
  .week-out
    padding-left rem(95)
    text-align left
    background-position left rem(5)
    background-repeat no-repeat
    background-size rem(65) rem(261)
    background-image url("../assets/out_done_img.png")
    &.heightImg
      background-image url("../assets/out_done_img_h.png")
    .item
      padding-bottom rem(90)
      h2
        line-height rem(50)
        font-size rem(36)
      p
        line-height rem(54)
        font-size rem(26)
    .ban
      color huise
    .isHightLightStart
      color mainColor
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
  <transition name="slide" >
    <div class="balanceOut-done">

      <div class="top_img">
        <img src="../assets/out_done_top.png" alt="成功标志">
        <h4>转出成功</h4>
      </div>

      <div class="week-out" :class="{heightImg:nextData.time.isHightLightStart}">
        <div class="item">
          <h2 >转出申请已提交，等待审核</h2>
          <p v-text="nextData.time.tradeTime"></p>
        </div>
        <div class="item ban" :class="{isHightLightStart:nextData.time.isHightLightStart}">
          <h2>到账时间</h2>
          <p v-text="'预计 '+nextData.time.transOutToAccountTime +' 前'" ></p>
        </div>
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
    name: 'balanceOut-done',
    components: {},
    props: ['nextData' ],
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
          path: '/myAsset',
          query: {}
        })
      }
    },
  }
</script>
