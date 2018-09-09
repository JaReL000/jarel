<template>
  <div 
    class="order-details fixed" 
    v-if="show"
  >
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
      <!-- 定期显示 -->
      <h2 class="border-none" v-if="orderData.ptypeid===2">
          <!-- <i>{{orderData.total_yield}}</i> -->
          <!-- <span>已得收益(元)</span>  -->
          <!-- <i>{{ parseFloat(orderData.rate_init)}}%</i> -->
          <i>{{ orderData.rate_init}}%</i>
          <span>预期年化收益率</span> 
      </h2>
      <h2 class="border-none" v-if="orderData.ptypeid!==2">
          <i>{{orderData.total_yield}}</i>
          <span>已得收益(元)</span> 
      </h2>
    </div>
    <!-- 头部end -->
    <!-- 新增4.1.0 -->
    <div 
      class="coupon-content"
      v-if="$root.showHeader && orderData.coupon_content"
      v-html="orderData.coupon_content"
    ></div>

    <!-- content jinr-col-12 -->
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
              class="order_littleOne img-icon"
            >
            <img class="img-icon" v-if="index===1" src="./images/order3.png" alt="图标" >
            <img class="img-icon" v-if="index===2 && !item.status" src="./images/order2.png" alt="图标" >
            <img class="img-icon" v-if="index===2 && item.status" src="./images/order4.png" alt="图标" >

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
                src="./images/order.png" 
                alt="全色虚线" >
            </div>
          </div>
          <!-- 文本   -->
          <h3 :class="{h: item.status}">{{item.des}}</h3>
          <p>{{item.event}}</p>
        </li>
      </ul>
    </div>
   
    <!-- 按钮状态当前：{{orderData.money_flag_status}} -------请求传输的字段：{{aaa}} --- {{bbb}} -->
    <!-- 切换 money_flag_status -->
    <div 
      class="swich"
      v-if="orderData.ptypeid===2 && orderData.money_flag_status!==2 && $root.showHeader"
    >
      <div class="swich-left">
        <label @click="showOrderAlertFun">到期本息续投</label><span
          :class="{'h-swich': !orderData.money_flag_status}"
          v-text="orderData.money_flag_content"
        ></span>
      </div>
      <div class="swich-right">
        <!-- <input 
          type="checkbox"  
          class="al-toggle-button"
          :disabled="inputStatus"
          v-model="orderData.money_flag_status" 
          v-on:click="alockedFun(orderData.money_flag_status)"
        > -->

        <!--  -->
        <mt-switch 
          v-model="orderData.money_flag_status" 
          :disabled="inputStatus"
          @change="alockedFun"
        ></mt-switch>
      </div>
    </div>
    <!-- <div 
      class="order-foot" 
      v-text="contractTxt"
      @touchstart.stop.prevent="routerPush(
        '/assert/contract', 
        { 
          event: event,
          title:title, 
          contract_no: orderData.contract_no,
          show_trade_time: orderData.show_trade_time,
          lock_principal: orderData.lock_principal,
          type:'contract'
        }, (title+'合同'))"
    ></div> -->
    <div 
      class="order-foot"
      v-text="contractTxt"
      @touchstart.stop.prevent="serviceContract(
        orderData.product_name,
        orderData.contract_no,
        event,
        orderData.show_trade_time,
        orderData.lock_principal
      )"
    ></div>

    <!-- 转让 撤销 -->
    <div 
      v-if="orderData.end_text"
      class="button-order fixed-x"
      :class="{agreexy: orderData.jump}"
      @click="confirmPayment"
      v-text="orderData.end_text"
    ></div>
    

    <!-- 弹窗 -->
    <div class="order-alert-wrap fixed" v-if="showOrderAlert">
      <div 
        class="alert-mask fixed" 
        @click.stop.prevent="showOrderAlertFun"
      ></div>
      <div class="alert" >
        <div class="alert-main">
          <div class="title">
            <div class="xutou" >关于续投</div>
            <span class="detail-title">投资者须知</span>
          </div>
          <ul>
            <li>
              <span> 1）</span>选择续投，订单到期后本金和利息将自动投资到下一个订单中；
            </li>
            <li>
              <span> 2）</span>订单到期的24小时之前可选择续投或取消续投，最后一天订单进行结算不能更改。
            </li>
          </ul>
        </div>
        <div @click.stop.prevent="showOrderAlertFun" class="ok-yes">明白了</div>
      </div>
    </div>
  </div>
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
        inputStatus: false,

        show: false,
        orderData:{},
        contractTxt: '服务合同',
        title: '',
        event: '',
        resposeing: false,
        showOrderAlert: false,
        aaa: 0,
        bbb: false
      }
    },
    // beforeRouteEnter (to, from, next) {
    //   // 在渲染该组件的对应路由被 confirm 前调用
    //   // 不！能！获取组件实例 `this`
    //   // 因为当守卫执行前，组件实例还没被创建
    //   console.log('4--父级---beforeRouteEnter');
    //   next()
    // },
    computed: {},
    watch: {},
    created() {
      // this.changeTitle(this.$route.query.moneyid)
      // this.zzz = this.$root.appData.token
      // this.show = true 
      this.initFun()
    },
    mounted() {},
    methods: {
      initFun(){
        this.show = false 
        this.$http({
          method: 'money.detail',
          token: this.$root.appData.token,
          // token: this.$route.query.token,
          moneyid: this.$route.query.moneyid  || '1017830'
        }).then((response) => {
          this.responseing = false
          this.orderData = response
          // this.orderData.money_flag_status = !!response.money_flag_status 
          // 初始化不让他切换 锁定状态不可更改
          this.inputStatus = !!response.is_lock_flag_status
          this.title = response.product_name
          this.event = response.list[0].event
          this.changeTitle(this.title + '订单')
          this.show = true 
          // this.nextTick(()=>{
          //   let verificaBtn = document.getElementsByClassName('al-toggle-button')[0]
          //   if(this.orderData.is_lock_flag_status){
              
          //     verificaBtn.disabled = false
          //   }else{
          //     verificaBtn.disabled = true
          //   }
          // })
         
          
        })
      },

      // 切换switch
      alockedFun(status){
        // let verificaBtn = document.getElementsByClassName('al-toggle-button')[0]
        // verificaBtn.disabled = true
        this.inputStatus = true
        console.log(status);
        
        // if(this.$JinrSDK._version() == 410){
        //   status =  !status ? 0 : 1 // 抽风代码处理 线上一直不正常
        // }else{
        //   // status =  status ? 0 : 1 // 4.2测试就ok
        //   // 如果是 iOS 设备 2.7测试结果  ios取反
        //   if(navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
        //     status =  !status ? 0 : 1 // 抽风代码处理 线上一直不正常
          
        //   // 安卓正常
        //   }else{
        //     status =  status ? 0 : 1 // 4.2测试就ok 
            
        //   }
        // }

        // status =  !status ? 0 : 1 // 抽风代码处理 线上一直不正常
        // console.log(status);
        // this.aaa = status
        // this.$flash(status)
        // return
        status =  status ? 0 : 1
        this.$http({
          method: 'regular.continue.invest',
          token: this.$root.appData.token,
          money_flag_status: status,
          moneyid: this.orderData.moneyid 
        }).then((response) => {
          setTimeout(()=> {
            // let verificaBtn = document.getElementsByClassName('al-toggle-button')[0]
            // verificaBtn.disabled = false
            this.inputStatus = false
          }, 400);
          this.$flash(response.msg)
          
          // 禁止操作
          if(response.code === 1000000){
            // this.orderData.money_flag_status = this.orderData.money_flag_status === 1 ? true : false
            return
          }
          
          this.orderData.money_flag_status = response.money_flag_status
          this.orderData.money_flag_content = response.content
          this._changeContinueStatus(status)
          
        })
        
      },

      // 修改续投状态 客户端交互
      _changeContinueStatus(status){
        this.$JinrSDK.changeContinueStatus(
          this.orderData.moneyid.toString(),
          status.toString(),
          this.orderData.money_flag_content,
        )
        return

        try {
          Jinr.changeContinueStatus(
            this.orderData.moneyid.toString(),
            status.toString(),
            this.orderData.money_flag_content,
          )
        } catch (error) {
          
        }
      },
      showOrderAlertFun(){
        this.showOrderAlert = !this.showOrderAlert
      },

      confirmPayment(){
        if(this.orderData.jump){
          try {
            // redirect  0 表示跳转让  1-表示跳撤销
            if(this.orderData.redirect){
              // this.$flash('撤销--order_id',this.orderData.order_id)
              let order_id = this.orderData.order_id.toString()
              Jinr.undoTransfer(order_id)
            }else{
              // this.$flash('转让--moneyid-->'+this.orderData.moneyid+'zzz'+this.$route.query.moneyid)
              let moneyid = this.orderData.moneyid.toString()
              let productid = this.orderData.productid.toString()
              // console.log(moneyid, productid);
              
              Jinr.transfer(
                moneyid, 
                productid, 
                // this.orderData.term_word, 
                // this.orderData.lock_principal, 
                // this.orderData.total_yield, 
                // (this.orderData.product_name+this.orderData.contract_no), 
              )
            }
            
          } catch (error) {
            
          }
        }
        
      },

      serviceContract(title, contract_no, event, show_trade_time, lock_principal){
        window.location = `/app/4.0/index.html#/assert/contract?title=${title}&contract_no=${contract_no}&event=${event}&show_trade_time=${show_trade_time}&lock_principal=${lock_principal}&type=contract`
      },

    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.order-details
  text-align center
  background-color #f5f5f5
  overflow-y scroll
  &::-webkit-scrollbar 
    display:none;
  &_Header
    height 270px
    background #ffffff
    margin-bottom 30px
    h3
      height 86px
      margin 0 0 20px 32px
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
        padding 0 15px
        // margin-left 20px
        border 2px solid #ef6a5c
        border-radius 15px
        text-align center
        line-height 32px
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
        height 40px
        line-height 40px
        text-overflow ellipsis
        white-space nowrap
        color #0d74e4
    .border-none
      border none
  .coupon-content
    font-size 28px
    margin-bottom 30px
    span 
      color mainColor
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
          height 50px
          padding-bottom 36px
          &>img.img-icon
            width 46px 
            height 46px 
          .img_line 
            position absolute
            left -74px
            top -30%
            // transform translate3d(0, -50%, 0)
            width 134px
            height 4px
            img 
              width 100%
              height 4px /*! px */
        h3
          line-height 46px
          font-size 28px
          &.h 
            color mainColor
        p
          line-height 28px
          font-size 25px
  .swich
    // height 98px
    height 120px
    line-height 98px
    background-color #fff
    margin-bottom 20px
    overflow hidden
    .h-swich
      background-color mainColor
      color #fff
    &-left
      float left 
      padding-left 30px
      font-size 30px
      label 
        display block
        padding-top 10px
        height 100%
        line-height 52px
        padding-right 80px
        text-align left
        background  url('./images/ico_question.png') 200px 20px no-repeat
        background-size 28px 28px
        color #333
      span  
        display block
        // margin-left 20px
        border-radius 8px
        padding 0  8px
        font-size 18px
        line-height 38px
        // background-color mainColor
        border 1px solid mainColor
        color mainColor
    &-right
      float right 
      padding 30px 30px 0 0
      .al-toggle-button
        transform translate(0, 20%)
  .order-foot
    height 100px
    background-color  #ffffff
    text-align left
    line-height 100px
    padding-left 30px
    font-size 32px
    indicator()
  .button-order
    position absolute
    bottom 0
    width 100%
    height 96px
    line-height @height
    border-radius 10px
    background #CCCCCC
    border none
    color #ffffff
    font-size 32px
    &.agreexy
      background #0C72E3
  .order-alert-wrap
    position fixed
    background transparent 
    .alert-mask
      position fixed
      background rgba(0,0,0,0.4)
    .alert
      position: absolute;
      left: 50%;
      top: 50%;
      width 75%
      transform translate3d(-50%, -50%, 0)
      font-size 26px
      line-height 50px
      text-align center
      color #fff
      // background-color transparent
      .alert-main
        padding-top 28px
        border-radius 12px 12px 0 0 
        // background: url('./p_bg.png') no-repeat left  top 
        background-image linearGradient
        background-size 100% 100%
        .title
          position relative
          &:before
            content ''
            position absolute
            width 100%
            left  0
            bottom  0
            border-bottom 1px solid  rgba(255,255,255,0.3)
            transform scaleY(0.5)
          .xutou  
            line-height 64px
            font-size 44px
          span.detail-title 
            display inline-block
            line-height 40px
            margin-bottom 30px
            padding 0  15px
            border-radius 4px
            background-color #2986c4
      ul  
        text-align left
        padding 34px 22px  40px
        li
          line-height 44px
          margin-bottom 20px
          font-size 26px
          span 
            float left 
            height 44*2px
      .ok-yes 
        border-radius 0 0 12px 12px
        line-height 90px
        font-size 32px
        background-color #fff
        color #0c72e3


.al-toggle-button{
    appearance: none;
    -webkit-appearance: none;
    position: relative;
    width: 52*2px;
    height: 32*2px;
    background: #dfdfdf;
    border-radius: 16*2px;
    border: 1px solid #dfdfdf;
    outline: 0;
    box-sizing: border-box;
}
.al-toggle-button:checked{
    border-color: mainColor; //#0c72e3
    background-color: mainColor;
}
.al-toggle-button:before, .al-toggle-button:after{
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    height: 30*2px;
    border-radius: 15*2px;
    transition: transform 0.3s;
    transition: -webkit-transform 0.3s;
    transition: transform 0.3s, -webkit-transform 0.3s;
    -webkit-transition: -webkit-transform 0.3s;
}
.al-toggle-button:before{
    width: 50*2px;
    background-color: #fdfdfd;
}
.al-toggle-button:after{
    width: 30*2px;
    background-color: white;
    box-shadow: 0 1px 3*2px rgba(0, 0, 0, 0.4);
}
.al-toggle-button:checked:before{
    transform: scale(0);
    -webkit-transform: scale(0);
}
.al-toggle-button:checked:after{
    transform: translateX(20*2px);
    -webkit-transform: translateX(20*2px);
}
</style>
