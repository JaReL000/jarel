<template>
<div class="p-keyboard">
  <!-- 转入 -->
  <div class="p-keyboard-in" v-if="type===1">
    <!--购买输入框-->
    <div class="invest-box">
      <div class="money-box">
        <div class="inputmark">￥</div>
        <div class="inputbox">
          <div class="box">
            <!-- 数字键盘 v-model="investMoney" -->
            <wc-keyboard
              :placeholder="placeholder"
              :money="money"
              :moneyMax="moneyMax"
              :inter="moneyMax.toString().length+2"
              decimal="2"
              @complete="complete"
              @onInputChange="onInputChange"
            ></wc-keyboard>
          </div>
        </div>
      </div>
      <!-- 转入 选择卡券 -->
      <div
        class="card"
        @click="goToCouponList"
        v-if="isShowCoupon"
      >
        <span class="span1">卡券</span>
        <span
          class="span2"
          :class="{h: !enableTotal}"
          v-text="selectedName || '暂无可使用卡券'"
        ></span>
      </div>
    </div>
    <!--购买说明-->
    <div class="invest-content">
      <p class="explain" >预计{{expectedTime}}首次收益到账</p>
      <p class="explain" >最高限额{{sumMax}}元,还可转入{{moneyMax}}元</p>
      <div class="invest-confirm">
        <button
          :disabled="!agreement || !(parseFloat(money)>=parseFloat(moneyMin))"
          :class="{agreexy: agreement && (parseFloat(money)>=parseFloat(moneyMin)) }"
          @click="confirmPayment"
          v-text="btnText"
        ></button>
        <p class="fwxy">
          <label @click="agreement=!agreement"><span class="agreebtn " :class="{agreebtnyes:agreement}"></span>{{agreeText}}</label><router-link :to="treaty" v-text="prlText"></router-link>
          <!-- <router-link to="/"><span class="xesm" v-text="xeTextIn"></span></router-link> -->
        </p>
      </div>
    </div>
  </div>

  <!-- 转出 -->
  <div class="p-keyboard-out" v-if="type===2">
    <!--购买输入框-->
    <div class="invest-box">
      <h5>转出余额：</h5>
      <div class="money-box">
        <div class="inputmark">￥</div>
        <div class="inputbox">
          <div class="box">
            <!-- 数字键盘 v-model="investMoney" -->
            <wc-keyboard
              :placeholder="placeholder"
              :money="money"
              :moneyMax="moneyMax"
              :inter="10"
              decimal="2"
              :isDecimal="isDecimal"
              @complete="complete"
              @onInputChange="onInputChange"
            ></wc-keyboard>
          </div>
        </div>
      </div>

      <!-- 转出 -->
      <div
        class="card"
        @click="goToCouponList"
        v-if="parseFloat(product.lock_principal)"
      >
        <h6 >冻结金额{{product.lock_principal}}元不可转出</h6>
        <span
          :class="{h: !selectedName}"
          v-text="'查看原因'"
          @click="viewReasonsFun"
        ></span>
      </div>
    </div>

    <!--购买说明-->
    <div class="invest-content">
      <p class="explain" >预计到账时间: <span>{{product.profit_time}}</span> 前</p>
      <div class="invest-confirm">
        <!--
          周周盈转出限制
          isOk 是周周盈 => 非转出日且有卡券

          非周周盈为true
        -->
        <button
          :disabled="(!agreement ) || (!(parseFloat(money)) && !isOk)"
          :class="{agreexy: agreement && ((parseFloat(money))&& isOk) }"
          @click="confirmPayment"
          v-text="btnText"
        ></button>
        <p class="fwxy">
          <router-link :to="`/explain/out?productid=${product.productid}`"><span class="xesm" v-text="xeTextOut"></span></router-link>
        </p>
      </div>
    </div>
  </div>

   <!-- 充值 -->
  <div class="p-keyboard-out" v-if="type===3">
    <!-- <div class="top">
      <div class="top-main">
        <img src="../assets/bank_df.png" alt="">
        <h2>{{dataOut.title}}</h2>
      </div>
    </div> -->
    <!--购买输入框-->
    <div class="invest-box">
      <h5>充值金额：</h5>
      <div class="money-box">
        <div class="inputmark">￥</div>
        <div class="inputbox">
          <div class="box">
            <!-- 数字键盘 v-model="investMoney" -->
            <wc-keyboard
              :placeholder="placeholder"
              :money="money"
              :moneyMax="moneyMax"
              :inter="10"
              decimal="2"
              @complete="complete"
              @onInputChange="onInputChange"
            ></wc-keyboard>
          </div>
        </div>
      </div>

      <!-- 转出 -->
      <!-- <div
        class="card"
        @click="goToCouponList"
      >
        <h6 >当前金额</h6>
      </div> -->
    </div>

    <!--购买说明-->
    <div class="invest-content">
      <div class="invest-confirm">
        <button
          :disabled="!agreement || !parseFloat(money)"
          :class="{agreexy: agreement && parseFloat(money) }"
          @click="confirmPayment"
          v-text="btnText"
        ></button>
      </div>
    </div>
  </div>

  <!-- 提现 -->
  <div class="p-keyboard-out" v-if="type===4">
    <div class="top">
      <div class="top-main">
        <img :src="setImageUrl(product.bank_logo_image)" alt="银行卡">
        <h2>{{product.title}}</h2>
      </div>
      <p class="tops">今日可提现机会剩余<span>{{product.take_times}}</span>次</p>
    </div>
    <!--购买输入框-->
    <div class="invest-box">
      <h5>转出余额：</h5>
      <div class="money-box">
        <div class="inputmark">￥</div>
        <div class="inputbox">
          <div class="box">
            <!-- 数字键盘 v-model="investMoney" -->
            <wc-keyboard
              :placeholder="placeholder"
              :money="money"
              :moneyMax="moneyMax"
              :inter="10"
              decimal="2"
              :isDecimal="isDecimal"
              @complete="complete"
              @onInputChange="onInputChange"
            ></wc-keyboard>
          </div>
        </div>
      </div>

      <!-- 转出 -->
      <div
        class="card"
        @click="goToCouponList"
      >
        <h6 >当前金额 <label>￥{{sumMax}}</label> </h6>
      </div>
    </div>

    <!--购买说明-->
    <div class="invest-content">
      <!-- <p class="explain" >预计到账时间: <span></span> 前</p> -->
      <div class="invest-confirm">
        <button
          :disabled="!agreement || !parseFloat(money)"
          :class="{agreexy: agreement && parseFloat(money) }"
          @click="confirmPayment"
          v-text="'申请提现'"
        ></button>
      </div>
    </div>
  </div>
</div>
</template>

<script>

export default {
  components:{},
  props: {
    type: {
      type: Number
    },
    money: {
      type: String,
    },
    selectedName: {
      type: String,
      default: ''
    },
    enableTotal: {
      type: Number,
    },
    placeholder: {
      type: String,
    },
    sumMax: {
      type: Number,
    },
    moneyMax: {
      type: [Number, String],
    },
    moneyMin: {
      type: Number,
    },
    expectedTime: {
      type: String,
    },
    product: {
      type: Object
    },
    isOk: {
      type: [Boolean, Number]
    }
  },
  data(){
    return {
      show: false,
      agreement: true, //服务协议控制
      isDecimal: true, // 允许输入小数
      // 文案
      btnText: '确认转入',
      prlText: '《鲸鱼服务协议》',
      xeTextIn: '转入说明',
      xeTextOut: '转出说明',
      agreeText: '同意',
      treaty: '/treaty/user',

    }
  },
  computed: {
    isShowCoupon(){
      let bool = true
      let boolVal = sessionStorage.getItem('is_show_coupon')

      if(boolVal){
        bool = !!parseInt(boolVal)
      }

      return bool
    }
  },
  created() {},
  mounted(){},
  beforeDestroy () {
    sessionStorage.removeItem('is_show_coupon')
  },
  methods:{
    // 确定转入
    confirmPayment(){
      this.$emit('confirmPayment')
    },

    // 键盘回收 键盘数字回调
    onInputChange(val){
      this.$emit('onInputChange', val)
    },

    //获取卡券列表数据
    selectCouponListFun(){
      this.$emit('selectCouponListFun')
    },

    //匹配最佳卡券
    welfareBestCoupon(){
      this.$emit('welfareBestCoupon')
    },

    complete(){
      this.$emit('complete')
    },

    // 前往选择卡券
    goToCouponList(){
      this.$emit('goToCouponList')
    },

    // 查看原因
    viewReasonsFun(){
      this.$messagebox({
        title: null,
        message: this.product.lock_reason,
      }).then((action) => {
      });
    },

    setImageUrl(image, status){
      console.log(image, status);
      // 是否有图片
      if(image){
        return image + '_' + 'enable_logo_72x72.png'
        // 是否能高亮
        // if(status){
        //   return image + '_' + 'enable_logo_72x72.png'
        // }else{
        //   return image + '_' + 'disable_logo_72x72.png'
        // }
      }else{
        return require('../assets/bank_df.png')
      }
    }
  }
}
</script>

<style lang="stylus" >
@import "~style/mixin.styl"

.p-keyboard-in
  .invest-box
    margin-top 20px
    padding-top 30px
    background #ffffff
    h5.title
      padding-left 32px
      font-size 26px
      // font-weight bold
      line-height 26px
      margin-bottom 30px
    .money-box
      padding 0 0 36px
      border-bottom 1px solid #E6E6E6
      .inputmark
        width 95px
        height 46px
        float left
        text-align center
        font-size 50px
        line-height 50px
        color #333333
      .inputbox
        padding-left 98px
        height 46px
    .card
      line-height 69px
      padding-left 32px
      font-size 30px
      overflow hidden
      .span1
        float left
        padding-left 46px
        color #333333
        background-image url("../assets/cardicon.png")
        background-position left 18px
        background-repeat no-repeat
        background-size 34px 26px
      .span2
        float right
        padding-right 37px
        background-image url("../assets/arowright.png")
        background-position right 17px
        background-repeat no-repeat
        background-size 17px 30px
        margin-right 13px
        color #F03C3C
        &.h
          color #b3b3b3
  .invest-content
    padding 11px 30px
    .explain
      line-height 40px
      font-size 26px
      color #999999
    .invest-confirm
      padding-top 50px
      button
        width 100%
        height 96px
        border-radius 10px
        background #CCCCCC
        border none
        color #ffffff
        font-size 32px
      button.agreexy
        // background #0C72E3
        background mColor
      .fwxy
        line-height 60px
        color #333333
        font-size 24px
        .xesm
          float right
        .agreebtn
          display inline-block
          width 22px
          height 22px
          background-image url("../assets/xybtn0.png")
          background-repeat no-repeat
          background-size 100% 100%
          margin-right 10px
          position relative
          top 2px
        .agreebtnyes
          background-image url("../assets/xybtn1.png")
          background-repeat no-repeat
          background-size 100% 100%
        a
          color #0C72E3

.p-keyboard-out
  .top
    padding-top 30px
    .top-main
      padding-left 30px
      height 100px
      background-color #fff
      h2
        display inline-block
        line-height 100px
        font-size 32px
      img
        height 50px
        vertical-align middle
    p.tops
      padding-left 30px
      font-size 24px
      color #999
      line-height 50px
      span
        color #0C72E3
  .invest-box
    // margin-top 20px
    padding-top 30px
    background #ffffff
    h5
      padding-left 32px
      font-size 26px
      // font-weight bold
      line-height 26px
      margin-bottom 30px
    .money-box
      padding 0 0 36px
      border-bottom 1px solid #E6E6E6
      .inputmark
        width 95px
        height 46px
        float left
        text-align center
        font-size 50px
        line-height 50px
        color #333333
      .inputbox
        padding-left 98px
        height 46px
    .card
      line-height 69px
      padding-left 32px
      font-size 26px
      overflow hidden
      h6
        float left
        background-position left 18px
        background-repeat no-repeat
        background-size 34px 26px
        font-size 100%
        color #666666
        label
          color #0C72E3
      span
        float right
        padding-right 17px
        margin-right 13px
        background-position right 17px
        background-repeat no-repeat
        background-size 17px 30px
        color #0C72E3
  .invest-content
    padding 11px 30px
    .explain
      line-height 40px
      font-size 28px
      color #999999
      span
        color #0C72E3
    .invest-confirm
      padding-top 50px
      button
        width 100%
        height 96px
        border-radius 10px
        background #CCCCCC
        border none
        color #ffffff
        font-size 32px
      button.agreexy
        background #0C72E3
      .fwxy
        line-height 60px
        color #333333
        font-size 18px
        text-align right
        .xesm
          font-size 26px
          text-align right
          // float right
        .agreebtn
          display inline-block
          width 22px
          height 22px
          background-image url("../assets/xybtn0.png")
          background-repeat no-repeat
          background-size 100% 100%
          margin-right 10px
          position relative
          top 2px
        .agreebtnyes
          background-image url("../assets/xybtn1.png")
          background-repeat no-repeat
          background-size 100% 100%
        a
          color #0C72E3

</style>

