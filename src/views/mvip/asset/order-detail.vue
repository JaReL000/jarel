<template>
  <transition name="slide" >
    <div class="order-details" v-if="show">
     <div class="order-details_Header">
      <!-- 定期头部 -->
      <h3 class="border-bottom-1px">
        <span>{{title + orderData.contract_no}}</span>
        <i>{{orderData.term_word}}</i>
      </h3>
      <h2>
          <i>{{orderData.lock_principal}}</i>
          <span>原始本金(元)</span>
      </h2>
      <h2 class="border-none">
          <i>{{orderData.total_yield}}</i>
          <span>已得收益(元)</span>
      </h2>
    </div>
     <!-- 头部end -->
     <!-- content -->
    <div class="order-content">
      <ul>
        <li 
          v-for="(item, index) in orderData.list"
          :key="index"
        >
          <!-- 图标 -->
          <div class="img_icon">
            <img 
              v-if="index===0"
              src="./images/success_gou_data64.png" 
              alt="图标" 
              class="order_littleOne"
            >
            <img v-if="index===1" src="./images/order3.png" alt="" >
            <img v-if="index===2 && !item.status" src="./images/order2.png" alt="" >
            <img v-if="index===2 && item.status" src="./images/order4.png" alt="" >

            <!-- 虚线 -->
            <div class="img_line">
              <img 
                v-if="item.status&&index===1" 
                src="./images/order.png" 
                alt="虚线" >
              <img 
                v-if="!item.status&&index===2" 
                src="./images/order1.png" 
                alt="半灰虚线" >
              <img 
                v-if="item.status&&index===2" 
                src="./images/order1.png" 
                alt="全色虚线" >
            </div>
          </div>
          <!-- 文本   -->
          <h3 :class="{h: item.status}">{{item.des}}</h3>
          <p>{{item.event}}</p>
        </li>
      </ul>
    </div>
    <!-- content end -->
    <!-- foot -->
    <div 
      class="order-foot"
      v-text="contractTxt"
      @touchstart.stop.prevent="routerPush(
        '/productM/protocol', 
        { 
          title:orderData.product_name,
          contract_no:orderData.contract_no,
          event:orderData.list[0].event,
          show_trade_time: orderData.show_trade_time,
          lock_principal: orderData.lock_principal,
          type:'hetong'
        }, (title+'合同'))"
    ></div>
  </div>
</transition>
</template>

<script>

  export default {
    name: 'order-details',
    components: {},
    props: {
      showDetail: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        show: false,
        orderData:'',
        contractTxt: '服务合同',
      }
    },
    computed: {},
    watch: {},
    created() {
      this.initFun()
    },
    mounted() {},
    methods: {
      initFun(){
        this.$http({
          servicename:'account.assetDetail',
          moneyid: this.$route.query.assetId || ''
        }).then((response) => {
          
          this.orderData = response
          this.title = response.product_name
          this.event = response.list[0].event
          this.changeTitle(this.title + '订单')
          this.show = true 
          
        })
      },

      serviceContract(orderData){
        window.location = "/contract"
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.order-details
  text-align center
  background-color #f5f5f5
  &_Header
    height 270px
    background #ffffff
    margin-bottom 30px
    h3
      height 86px
      margin 0 32px 20px
      line-height 86px
      text-align left
      span
        vertical-align middle
        font-size 30px
        height 30px
        line-height 30px
        color #666
      i
        vertical-align middle
        display inline-block
        height 30px
        padding 0 20px
        margin-left 20px
        border 2px solid #ef6a5c
        border-radius 15px
        text-align center
        line-height @height
        font-size 20px
        color #ef6a5c
    h2
      height 135px
      width 49%
      border-right 2px solid #e5e5e5
      float left
      padding-top 20px
      p
        width 100%
        height 135px
        margin auto
      span
        font-size 25px
        color #858585
        display inline-block
      i
        font-size 45px
        margin-top 0px
        display block
        overflow hidden
        height 70px
        line-height 40px
        text-overflow ellipsis
        white-space nowrap
        color #0d74e4
    .border-none
      border none
  .order-content
    background #ffffff
    padding 40px  0
    margin 0 0 30px 
    ul
      overflow hidden
      li
        float left
        width 33.3%
        color #777777
        .img_icon
          position relative
          height 84px
          &>img
            width 46px
            height 46px
          .img_line 
            position absolute
            left -74px
            top 7%
            // transform translate3d(0, -50%, 0)
            width 134px
            height 4px
            img 
              width 100%
              height 4px /* px */
        h3
          line-height 46px
          font-size 28px
          &.h 
            color mainColor
        p
          line-height 28px
          font-size 25px
  .order-foot
    height 100px
    background-color  #ffffff
    text-align left
    line-height 100px
    padding-left 30px
    font-size 32px
    indicator()
    h3
      height rem(100)
      span
        font-size rem(30)
        color #0c72e3
  // .order-foot:after
  //   border: 12px solid transparent;
  //   border-left: 10px solid #d6d6d6;
  //   width: 0;
  //   height: 0;
  //   position: absolute;
  //   right rem(10)
  //   top 50%
  //   content: ' '
</style>
