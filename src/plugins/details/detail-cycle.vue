<template>
<!-- 产品周期 -->
<div class="detail-cycle" >
  <div class="cycle-top">
    <h1>产品周期</h1>
  </div>

  <div class="cycle-main">
    <transition-group
    name="slide-fade"
    class="progress-title"
    tag="div">
    <span
      v-for="item in progressList"
      v-show="progressShow"
      v-bind:key="item.title" ><label
      v-text="item.title"></label></span>
    </transition-group>

    <div class="progressBar" >
      <transition
          name="progress"
      ><div v-show="progressShow"></div></transition >
    </div>

    <div class="progress-time">
      <span 
        v-for="(item, index) in progressList" 
        v-text="item.time"
        :key="index"
        ></span>
    </div>
  </div>
</div>
</template>

<script>

  export default {
    props: {
      progressList: {
        type: Array
      }
    },
    data () {
      return {
        progressShow: false
      }
    },
    computed: {},
    created() {},
    mounted() {
      this.progressShow = true
    },
    methods: {}
  }
</script>

<style lang="stylus">
@import '~style/mixin.styl'

.detail-cycle // 产品周期
  background #f5f5f5
  padding-bottom: 20px
  &>div   
    padding 0 32px
    background #fff
  .cycle-top
    overflow hidden
    line-height 104px
    h1
      float left
      /*border-bottom 1px solid #f0f0f0*/
      font-size 32px
      color wordDfColor
    h6
      float right
      font-size 18px
      color huise
      &:active
        color wordSecondColor
  .cycle-main
    padding 36px 24px 34px
  .progress-title, .progress-time
    display block
    display box
    display flex
    justify-content space-between
    box-align center 
    align-items center
    text-align center
    span
      display inline-block
      width 180px
      font-size 20px
      &:nth-child(1)
        padding-left 3px
      &:nth-child(2)
        width 330px
  .progress-title
    margin-bottom 14px
    color mainColor
    span
      height 60px
      label
        display inline-block
        padding 0 15px
        height 55px
        font-size 28px
        line-height 50px
        background url("./images/sanjiao1_data64.jpg") no-repeat center top 
        background-size 100% 100%
  .progress-time
    span
      font-size 28px
      line-height 64px
      color huise
  .progressBar
    position relative
    height 26px
    background url("./images/load-cou-empty_data64.jpg") no-repeat left top  
    background-size 700px @height
    &>div
      width 100%
      height 100%
      background url("./images/load-cou-full_data64.jpg") no-repeat left top  
      background-size 700px @height
  .slide-fade-enter-active
    transition: all 1.2s ease;
  .slide-fade-enter,.slide-fade-leave-to
    transform: translateX(-40px);
    opacity: 0.2;
  .progress-enter-active
    animation: bounce-in 1.5s ;   
  
        

@keyframes bounce-in
  0%
    width 0%
  100%
    width 100%
</style>