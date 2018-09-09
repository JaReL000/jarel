<template>
<div class="turn-in" v-if="show">

  <!-- 主体区域 -->
  <number-keyboard
    :type="type"
    :money="money"
    :sumMax="parseFloat(product.take_money)"
    :moneyMin="product.money_min"
    :moneyMax="product.take_money"
    :expectedTime="product.expected_time"
    :placeholder="placeholder"
    @confirmPayment="confirmPayment"
    @onInputChange="onInputChange"
    :product="product"
  ></number-keyboard>

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
      :to="{ path: '/balance/jrRecord', query: {productid:-1, movetype:0}}"
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
      type: 4, // 1转入 2转出 3充值  4提现
      agreement: true, //服务协议控制
      money: '', //用户输入的金额

      // 产品字段
      product: {
        money_min: 22, //最小购买金额
        money_max: 11, //还可购买金额
        sum_max: '', //最高限额   
        expected_time: ''	 //预计收益时间 	  
      },
       
      // 支付键盘
      showKeyboard: false,
      payType: 11,
      payProductid: null, //产品类型id
      buyType: null,
      // 订单
      orderList: [],

      dataOut: {
        bank_logo_image:"http://jinrapp.dev.jinr.comhttp://files.dev.jinr.,com/statics/bankimages/boc",
        content:"http://jinrapp.dev.jinr.com/homeAssetDetail?", //右上角说明
        is_freeze:0,  //  0 未冻结   1冻结金额
        lock_free_money:"0.00",  //冻结金额数目
        lock_reason:"",  ////冻结原因
        take_money:"997995.00", //今日可提现金额
        take_times:3, //今日可提现次数
        title:"中国银行(尾号1991)", //银行卡title
        type:31, //类型  下单用
      }
      
    }
  },
  computed: {
    placeholder(){
      let m = this.money
      let mDef = `请输入提现金额`
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
        action: 2,
      }
      this.$http(params).then((res)=>{
        console.log(res);
        
        if(res===1000301){
          console.log(res);
          this.$router.replace('/bindCard')
          return
        }
        this.payType = res.pay_type
        this.buyType = res.type
        this.product = res
        this.product.sum_max = parseFloat(res.take_money)
        this.show = true
      }).catch((error)=>{
        // this.$router.replace('/bindCard')
      });
    },

    // 确定转入 调出支付列表
    confirmPayment(){
      this.showKeyboard = true 
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

    // 关闭支付键盘
    closekeyBoardFun(bool){
      this.payIndex = null
      // this.payType = null
      this.showKeyboard = bool
    },

    // 微信支付跳转
    setWxOrderCacheData(){
      let params={
        servicename : 'wxPay.getWxOrderParams',
        type: this.$route.query.type || '',
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
          // openid: '',
          redirectUrl: document.location.href, //本页url
        }
        
        let urlHref = `${res.orderFields.redirectUrl}/?${this.urlEncode(url)}`
        console.log(urlHref);
        window.location.href = urlHref

      }).catch(function(error){
        console.log(res.msg)
      });
    },

    /** 
     * param 将要转为URL参数字符串的对象 
     * key URL参数字符串的前缀 
     * encode true/false 是否进行URL编码,默认为true 
     *  
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

      return paramStr.substr(0, paramStr.length);  
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

