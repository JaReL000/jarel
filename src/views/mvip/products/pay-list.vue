<template>
<div class="pay">
<!-- 购物车列表 -->
<transition name="fold">
  <div class="pay-main fixed-x" v-show="showPay">
    <!-- 头部 -->
    <div class="pay-main-header">
      <div
        class="empty"
        @click="closeFun"
      ></div>
      <h1 class="title" v-text="'确认方式'"></h1>
    </div>
    <!-- 中部支付列表 -->
    <div class="pay-main-content">
      <ul class="main-content" ref="listContent">
        <li
          class="cell"
          v-for="(item, index) in payList"
          @click="selectPay(index)"
          :key="index"
        >
          <!-- <div class="cell-img"><img
            :src="item.image ? item.image + '_enable_logo_48x48.png' : require('../assets/bank_df.png')"
            alt="支付图标"
          ></div> -->
          <div class="cell-img"><img
            :src="setImageUrl(item.image, item.status)"
            alt="支付图标"
          ></div>
          <div class="cell-wrapper">
            <h3 
              v-text="item.title"
              :class="{h: !item.status}"
            ></h3>
            <p 
              v-text="item.money_description"
              :class="{h: !item.status}"
            ></p>
          </div>

          <div class="cell-choice" >
            <i 
              class="radio" 
              :class="{ active: item.is_select }"
            ></i>
          </div>
        </li>
      </ul>
    </div>
    <!-- 尾部 -->
    <div class="pay-main-footer">
      <div class="txt">实际支付<span class="banl">￥</span><span v-text="moneyReduce"></span></div>
      <button 
        :disabled="!money" 
        v-text="btnText"
        @click="payKeyboardFun"
        :class="{agreemPay: agreemPay && money}"
      ></button>
    </div>
  </div>
</transition>

<!-- 底部模糊层 -->
<transition name="fade">
  <div
    class="pay-mask"
    v-show="showPay"
    @click="closeFun"
  ></div>
</transition>

</div>
</template>

<script>

export default {
  components: {},
  props: {
    showPay: {
      type: Boolean,
      defaule: false
    },
    agreemPay: {
      type: Boolean,
      defaule: false
    },
    // 支付列表
    payList: {
      type: Array,
      default () {
        return [];
      }
    },
    money: {
      type: [String, Number],
    },
    moneyReduce: {
      type: [String, Number],
    }
  },
  data () {
    return {
      dropBalls: [],
      listShow: true,
      btnText: '确认转入',
    };
  },
  watch: {
    payList () {
      console.log(this.payList)
    }
  },
  computed: {
    imageHost () {
      return location.host
    }
  },
  methods: {
    closeFun () {
      this.$emit('closePayListFun', false)
    },
    selectPay(index){
      this.$emit('selectPay', index)
    },
    payKeyboardFun(){
      this.$emit("showKeyboardFun")
    },
    setImageUrl(image, status){
      // console.log(image, status);
      // 是否有图片
      if(image){
        // 是否能高亮
        if(status){
          return image + '_' + 'enable_logo_72x72.png'
        }else{
          return image + '_' + 'disable_logo_72x72.png'
        }
      }else{
        return require('../assets/bank_df.png')
      }
    }
  },

};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.pay
  position: fixed
  left: 0
  bottom: 0
  z-index: 2
  width: 100%
  height: rem(0)
  color: rgba(255, 255,255, 0.4)
  .pay-main // 购物车清单
    position: absolute
    left: 0
    top: 0
    width: 100%
    transform: translate3d(0,-100%,0)
    transition: all .3s
    background: #fff
    &.fold-enter
      transform: translate3d(0,0,0)
    &.fold-leave
      transform: translate3d(0,-100%,0)
    &.fold-leave-active
      transform: translate3d(0,0,0)
    .pay-main-header
      height: rem(100)
      line-height: @height
      padding: 0 rem(32)
      font-size: rem(44)
      border1px()
      &:before
        background #cccccc
      .empty
        float left
        margin-top rem(25)
        padding rem(10)
        margin-right rem(10)
        border-radius 50%
        position relative
        width rem(30)
        height @width
        border-radius 50%
        &:before,&:after
          content ''
          position absolute
          height rem(2.5)
          width 60%
          top 50%
          left 0
          margin-top -.04rem
          border-radius .01rem
          background huise9
        &:before
          transform rotate(45deg)
        &:after
          transform rotate(-45deg)
      .title
        text-align center
        color: rgb(7,17,27)
        text-indent rem(-60)
    .pay-main-content
      max-height 660px
      overflow auto
      padding-left  rem(32)
      background: #fff
      ul.main-content
        li.cell
          overflow hidden
          height rem(100)
          position: relative
          padding: rem(12) 0
          // border-bottom  1px solid huise9
          color wordDfColor
          border1px()
          .cell-choice
            position absolute
            top 50%
            right 10px 
            transform translate3d(0, -50%, 0)
          .cell-img
            display table-cell
            width rem(88)
            padding-right rem(0)
            line-height rem(100)
            text-align left
            float left
            img
              vertical-align middle
              width rem(58)
              line-height rem(100)
          .cell-wrapper
            padding-top rem(14)
            float left
            h3
              line-height rem(48)
              font-size rem(32)  
              color #333
            p
              line-height rem(28)
              font-size rem(24)
              color #999
            .h 
              color #b3b3b3
    .pay-main-footer
      padding 60px  30px 40px
      .txt
        line-height 90px
        text-align center
        font-size 30px
        color #000
        span 
          font-size 50px
          color #0C72E3
        .banl
          font-size 30px
      button
        width 100%
        height 96px
        border-radius 10px
        background #CCCCCC
        border none
        color #ffffff
        font-size 32px
      button.agreemPay
        // background #0C72E3
        background mColor
      button:disabled
        background #CCCCCC
          
// 遮罩层
.pay-mask
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: rgba(0,0,0,0.6)
  z-index -1
  // filter: blur(10px)
  backdrop-filter: blur(10px)
  &.fade-enter-active
    opacity: 1
    background: rgba(7,17,27,0.6)
    transition: all .3s
  &.fade-enter, &.fade-leave
    opacity: 0
    background: rgba(7,17,27,0)
    backdrop-filter: blur(0px)
  &.fade-leave-active
    opacity: 0
    background: rgba(7,17,27,0)
    transition: all .3s

</style>
