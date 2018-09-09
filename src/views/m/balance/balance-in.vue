<template>
<div class="turn-in" v-if="show">

  <!-- 主体区域 -->
  <number-keyboard
    :type="type"
    :money="money"
    :sumMax="product.sum_max"
    :moneyMin="product.money_min"
    :moneyMax="product.money_max"
    :expectedTime="product.expected_time"
    :selectedName="selected_name"
    :placeholder="placeholder"
    :dataOut="dataOut"
    @confirmPayment="confirmPayment"
    @onInputChange="onInputChange"
    @goToCouponList="goToCouponList"
  ></number-keyboard>

  <!--支付方式列表-->
  <pay-list
    :showPay="showPay"
    :money="money"
    :moneyReduce="moneyReduce"
    :payList="payList"
    :agreemPay="agreemPay"
    @selectPay="selectPay"
    @showKeyboardFun="showKeyboardFun"
    @closePayListFun="closePayListFun"
  ></pay-list>

  <!-- 密码输入键盘 -->
  <pay-keyboard
    :type="type"
    :money="money"
    :showKeyboard="showKeyboard"
    :payType="payType" 
    :buyType="buyType" 
    :payProductid="payProductid"
    :productid="productid"
    @closekeyBoardFun="closekeyBoardFun"
    @goToDone="goToDone"
  ></pay-keyboard>

  <div class="other">
    <router-link
      to="/explain/balance"
    >余额说明</router-link>
    <span>|</span>
    <router-link
      :to="{ path: '/balance/jrRecord', query: {productid:-1, movetype:1}}"
    >交易记录</router-link>
  </div>

  <!-- 路由组件 -->
  <router-view 
    :productid="productid"
    :money="parseFloat(money)"
    :orderList="orderList"
  ></router-view>
</div>
</template>

<script>
import PayList from '../products/pay-list'

import NumberKeyboard from '../products/number-keyboard'
import PayKeyboard from '../products/pay-keyboard'

export default {
  components:{
    PayList,
    NumberKeyboard,
    PayKeyboard
  },
  data(){
    return {
      show: false,
      type: 3, // 1转入 2转出 3充值  4提现
      agreement: true, //服务协议控制
      agreemPay: false,
      money: '', //用户输入的金额
      moneyReduce: '',

      // 产品字段
      product: {
        money_min: 22, //最小购买金额
        money_max: 10000, //还可购买金额
        sum_max: 10000, //最高限额   
        expected_time: '',	 //预计收益时间
        head_content: '', 	  
        head_content: '', 	  
      },
       
      // 文案
      selected_name: '',

      // 卡券
      showCoupon: false, //显示卡券列表
      couponList: [],
      cuserid: '',  //卡券id

      // 支付列表
      showPay: false, //显示支付列表
      payList:  [],
      payIndex: null,  

      // 支付键盘
      showKeyboard: false,
      payType: null,
      payProductid: null, //产品类型id

      // 订单
      orderList: [],

      bank_logo_image:"http://jinrapp.dev.jinr.comhttp://files.dev.jinr.com/statics/bankimages/pingan",
      content:"http://jinrapp.dev.jinr.com/homeAssetDetail?",
      money_description:"额度50000.00元",
      title:"平安银行(尾号2214)",

      buyType: null
    }
  },
  computed: {
    placeholder(){
      let m = this.money
      let mDef = `请输入充值金额`
      return ( m ? m : mDef)
    },
    productid(){
      return this.$route.params.productid 
    }
  }, 
  created() {
    this.initFun()
  },
  mounted(){},
  methods:{

    // 初始化请求
    initFun(){
      let params={
        servicename: 'api.assetTransaction',
        type: this.type,
        productid: this.$route.query.productid || -1,
        action: 1,
      }
      this.$http(params).then((res)=>{
        
        if(res===1000301){
          this.$router.replace('/bindCard')
          return
        }
        
        // this.product = res.product
        this.bank_logo_image = res.bank_logo_image      
        this.content = res.content     
        this.money_description = res.money_description     
        this.title = res.title     
        this.buyType = res.buy_type  
        this.dataOut = res  
        // this.payList = res.payList.list
        this.userToken = res.userToken
        this.show = true
      }).catch((error)=>{
        // this.$router.replace('/bindCard')
      });
    },

    // 确定转入 调出支付列表
    confirmPayment(){
      let params={
        servicename: 'order.payList',
        money: this.money || '',
        productid: this.productid  || '',
        
      }
      this.$http(params).then((res)=>{
        if(res===1000303){
          this.$messagebox({
            title: '实名认证' ,
            message: '为了保证您的资金安全，需要身份验证',
            showCancelButton: false,
            closeOnClickModal: false,
          }).then((action) => {
            if(action==='cancel'){
              // this.$router.go(-1)
            }else if(action==='confirm'){
              this.routerReplace('/certification')
            }
          });
          return
        }
        this.payList = res.list
        this.moneyReduce = res.pay_info.money
        this.showPay = !this.showPay      
      })
    },

    // 键盘回收 键盘数字回调
    onInputChange(val){
      let bool = parseInt(val) > this.product.sum_max
      if(bool){
        this.money = this.product.sum_max
        return
      }
      this.money = val    
    },

    // 前往选择卡券
    goToCouponList(){
      if(this.couponList.length){
        // this.$router.push(`${this.$route.path}/choice`)
        this.showCoupon = !this.showCoupon
      } 
    },

    // 选择卡券回调
    selectNameFun(index){
      this.showCoupon = !this.showCoupon
      this.selected_name = (index >= 0)
        ? this.couponList[index].selected_name
        : `有${this.couponList.length}优惠券可用`

      this.cuserid = this.couponList[index].cuserid
    },

    // 选择支付方式
    selectPay(index){    
      // 未绑卡
      if(this.payList[index].status === 2){
        this.routerReplace('/bindCard')
        return
      }  
      
      if(this.payList[index].status){
        this.payList.forEach((el, index)=> {
          this.$set(this.payList[index], 'is_select', false)
        });

        this.payList[index].is_select = true
        this.agreemPay = true
        this.payIndex = index
        this.payType = this.payList[index].pay_type
        this.payProductid = this.payList[index].pay_productid
      } 
    },

    // 关闭支付列表
    closePayListFun(bool){
      this.agreemPay = false
      this.showPay = bool
    },

    // 开启支付键盘 唤起支付键盘
    showKeyboardFun(){
      // 微信支付跳转
      if(this.payList[this.payIndex].pay_type === 32){
        this.setWxOrderCacheData() 
        return
      }

      // 关闭支付列表
      this.showPay = false 
      this.showKeyboard = true 
    },

    // 关闭支付键盘
    closekeyBoardFun(bool){
      this.agreemPay = false
      this.payIndex = null
      this.payType = null
      this.showKeyboard = bool

      // 关闭支付列表
      this.showPay = false 
    },

    // 微信支付跳转
    setWxOrderCacheData(){
      let params={
        servicename: 'wxpay.getWxOrderParams',
        type: this.type || '',
      }

      this.$http(params).then((res)=>{
        let url ={
          // token: '',
          money: this.money,
          // passwd: '',
          // platform: '',
          cuserid: this.cuserid, //卡券id
          event_ref_id: '',
          pay_type: this.payType,
          src_ref_id: this.payProductid,
          productid: this.productid,
          buy_type: this.buyType,
          // openid: '',
          userToken: this.userToken,
          redirectUrl: document.location.href, //本页url
          type: this.type
        }
        
        let paramStr = this.urlEncode(url)
        paramStr = paramStr.substr(1, paramStr.length-1)

        let urlHref = `${res.orderFields.redirectUrl}/?${paramStr}`
        window.location.href = urlHref

      }).catch(function(error){
        console.log(res.msg)
      });
    },

    /** 
     * param 将要转为URL参数字符串的对象 
     * key URL参数字符串的前缀 
     * encode true/false 是否进行URL编码,默认为true 
     * @author 7043 
     * return URL参数字符串 
     */  
    urlEncode(param, key, encode) {  
      if(param==null) return '';  
      var paramStr = '';  
      var t = typeof (param);  
      if (t == 'string' || t == 'number' || t == 'boolean') {  
        paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);  
      } else {  
        for (var i in param) {  
          var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);  
          paramStr += this.urlEncode(param[i], k, encode);  
        }  
      }     
      return paramStr
    },

    // 跳转至结果页
    goToDone(list){
      this.orderList = list
      this.$router.replace(`${this.$route.path}/Done`)
    }
  }
}
</script>

<style lang="stylus" >
@import "~style/mixin.styl"
     
.turn-in
  .other
    text-align center
    span
      padding 0 rem(10) rem(15)
      color #3a8de8
    &>a
      vertical-align middle
      line-height rem(160)
      font-size rem(26)
      color mainColor
</style>

