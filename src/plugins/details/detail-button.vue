<template>
  <!-- 按钮 -->
<transition name="fold">
  <div 
    class="detail-button fixed-x" 
    v-if="show"
    @click="pushTurnIn"
  >
    <div 
      class="button" 
      :class="{open: isOpen}"
      v-text="text"
    ></div>
  </div>
</transition>
</template>

<script>

  export default {
    props: {
      text: {
        type: String,
        default: "立即转入"
      },
      id: {
        type: String
      },
      productName: {
        type: String
      },
      productTypeId: {
        type: String
      },
      isOpen: {
        type: Boolean
      },
      eventRefId: {
        type: String,
        default: '0'
      },
      couponId: {
        type: String,
        default: '0'
      },
      couponName: {
        type: String,
        default: '0'
      },
      isLogin: {
        type: Boolean
      }
    },
    data () {
      return {
        show: false,
      }
    },
    computed: {},
    created() {},
    mounted() {
      this.$nextTick(()=>{
        this.show = true
      })
    },
    methods: {
      
      pushTurnIn(){
        if(this.isOpen){
          this.$JinrSDK.pushProductTurnIn(
            this.id, 
            this.productName, 
            this.productTypeId, 
            '3', 
            this.eventRefId, 
            this.couponId, 
            this.couponName,
            '1'
          )

          return

          // 版本4.1.0以上
          if(this.$root.appVersion>=410){
            try {
              /**
               * productId 产品ID
               * productName 产品名字
               * productTypeId 产品类型ID
               * fromPage 从哪个页面跳转过来的 1-首页 2-资产页 3-详情页  4-活动页 
               * eventRefId 活动事件ID,活动的页面点击的时候传，其余默认为“0”
               * couponId 卡券ID
               * couponName 卡券名称
               */
              Jinr.pushProductTurnIn(
                this.id, 
                this.productName, 
                this.productTypeId, 
                '3', 
                this.eventRefId, 
                this.couponId, 
                this.couponName
              )
            } catch (error) {
              this.$flash(this.changeI18n(error)) 
              
            }

          } else {
            try {
              /**
               * productId 产品ID
               * productName 产品名字
               * productTypeId 产品类型ID
               * fromPage 从哪个页面跳转过来的 1-首页 2-资产页 3-详情页  4-活动页 
               * eventRefId 活动事件ID,活动的页面点击的时候传，其余默认为“0”
               */
              
              Jinr.pushProductTurnIn(this.id, this.productName, this.productTypeId, '3', this.eventRefId)
            } catch (error) {
              this.$flash(this.changeI18n(error)) 
              
            }
          }
          
        }   
      },

    }
  }
</script>

<style lang="stylus">
@import '~style/index.styl'

.detail-button
  position fixed
  left 0
  bottom 0px
  z-index 1
  width 100%
  height 98px
  padding 20px 0
  translate3d(0,0,0)
  transition: all .7s
  background-color #fff
  .button
    width 690px
    height 98px
    margin 0  auto
    border-radius 12px
    line-height @height
    font-size 34px
    text-align center
    background-color $color-light-grey-def
    color $color-light-grey-s
    &.open
      background-color appColor
      color #fff
  &.fold-enter
    transform: translate3d(0,100%,0)
  &.fold-leave
    transform: translate3d(0,0,0)
  &.fold-leave-active
    transform: translate3d(0,100%,0)

</style>