<style lang="stylus" rel="stylesheet/stylus">
@import "../../../style/mixin.styl"

.cycle
  padding 0 rem(32)
  margin-bottom rem(20)
  background-color baise
  .cycle-top
    overflow hidden
    line-height rem(104)
    h1
      float left
      /*border-bottom 1px solid #f0f0f0*/
      font-size rem(32)
      color wordDfColor
    h6
      float right
      font-size rem(18)
      color huise
      &:active
        color wordSecondColor
  .cycle-main
    padding rem(36) rem(24) rem(34)
  .progress-title, .progress-time
    display block
    display box
    display flex
    justify-content space-between
    box-align center 
    align-items center
    text-align center
    span
      display block
      width rem(150)
      font-size rem(20)
      &:nth-child(1)
        padding-left rem(3)
  .progress-title
    margin-bottom rem(14)
    color mainColor
    span
      height rem(40)
      label
        display inline-block
        padding 0 rem(15)
        height rem(40)
        line-height rem(34)
        background url("../assets/sanjiao1_data64.jpg") no-repeat center top \/ 100% 100%
  .progress-time
    span
      line-height rem(64)
      color huise
  .progressBar
    position relative
    height rem(26)
    background url("../assets/load-cou-empty_data64.jpg") no-repeat left top \/ rem(638) @height
    &>div
      width 100%
      height 100%
      background url("../assets/load-cou-full_data64.jpg") no-repeat left top \/ rem(638) @height
  .slide-fade-enter-active
    transition: all 1.2s ease;
  .slide-fade-enter,.slide-fade-leave-to
    transform: translateX(rem(-40));
    opacity: 0.2;
  .progress-enter-active
    animation: bounce-in 1.5s ;



@keyframes bounce-in
  0%
    width 0%
  100%
    width 100%



</style>

<template>
    <div class="cycle" >
      <div class="cycle-top">
        <h1>产品周期</h1>
        <h6 @click="showDetail">查看详情</h6>
      </div>

      <div class="cycle-main">
        <transition-group
          name="slide-fade"
          class="progress-title"
          tag="div">
          <span
            v-for="item in progressTitle"
            v-show="progressShow"
            v-bind:key="item" ><label
            v-text="item"></label></span>
        </transition-group>

        <div class="progressBar" >
          <transition
            name="progress"
          ><div v-show="progressShow"></div></transition >
        </div>

        <div class="progress-time">
          <span v-text="ad.ad_invest_date"></span>
          <span v-text="ad.ad_compute_date"></span>
          <span v-text="ad.ad_transfer_date"></span>
        </div>
      </div>


    </div>
</template>

<script>
  export default {
    name: 'cycle',
    components: {},
    // props: ['ad', 'showDetailBtn'],
    props: {
      ad: Object,
      progressTitle: {
        type: Array,
        default() {
          return [
          '投资',
          '计息',
          '转出日',
          // '到期回款'
        ]
        },
      },
    },
    data() {
      return {
        progressShow: false,
      }
    },
    computed: {
    },
    watch: {},
    created() {},
    mounted() {
      this.progressShow = !this.progressShow
    },
    methods: {
      showDetail() {
        this.$emit('showDetail', true)
      },
    },
  }
</script>
