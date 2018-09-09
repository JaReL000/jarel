<template>
<div class="turn-in" v-if="show">
  <!--bannaer-->
  <banner
    :headContent="product.head_content"
    :footContent="product.foot_content"
    :rateInit="product.rate_init"
    :rateExt="product.rate_ext"
    :activeInfo="product.active_info"
  ></banner>

  <!-- 主体区域 -->
  <number-keyboard
    :type="type"
    :money="(money)"
    :sumMax="product.sum_max"
    :moneyMin="product.money_min"
    :moneyMax="product.money_max"
    :expectedTime="product.expected_time"
    :selectedName="selectedName"
    :placeholder="placeholder"
    :enableTotal="enableTotal"
    @confirmPayment="confirmPayment"
    @onInputChange="onInputChange"
    @complete="complete"
    @selectCouponListFun="selectCouponListFun"
    @goToCouponList="goToCouponList"
  ></number-keyboard>

  <!--支付方式列表-->
  <pay-list
    :showPay="showPay"
    :money="(money)"
    :moneyReduce="moneyReduce"
    :payList="payList"
    :agreemPay="agreemPay"
    @selectPay="selectPay"
    @showKeyboardFun="showKeyboardFun"
    @closePayListFun="closePayListFun"
  ></pay-list>

  <!-- 密码输入键盘 -->
  <pay-keyboard
    :showKeyboard="showKeyboard"
    :payType="payType"
    :payProductid="payProductid"
    :productid="productid"
    :type="type"
    :money="money"
    :cuserid="cuserid"
    @closekeyBoardFun="closekeyBoardFun"
    @goToDone="goToDone"
  ></pay-keyboard>

  <!-- 卡券列表 -->
  <coupon-choice
    :showCoupon="showCoupon"
    :productid="productid"
    :money="(money)"
    :couponList="couponList"
    @selectNameFun="selectNameFun"
  ></coupon-choice>

  <!-- 路由组件 -->
  <router-view
    :productid="productid"
    :money="(money)"
    :orderList="orderList"
  ></router-view>
</div>
</template>

<script>
import Banner from './banner'
import PayList from './pay-list'
import CouponChoice from './coupon-choice'

import NumberKeyboard from './number-keyboard'
import PayKeyboard from './pay-keyboard'

export default {
  components:{
    Banner,
    PayList,
    CouponChoice,
    NumberKeyboard,
    PayKeyboard
  },
  data(){
    return {
      show: false,
      responseing: false, //防重复提交
      agreement: true, //服务协议控制
      agreemPay: false,
      money: '', //用户输入的金额
      moneyReduce: '', //抵扣金额

      // 产品字段
      product: {
        money_min: '22', //最小购买金额
        money_max: '11', //还可购买金额
        sum_max: '', //最高限额
        expected_time: ''	 //预计收益时间
      },

      // 文案
      selectedName: '',
      enableTotal: 0, //可选几张

      // 卡券
      showCoupon: false, //显示卡券列表
      couponList: [],
      cuserid: 0,  //卡券id

      // 支付列表
      showPay: false, //显示支付列表
      payList:  [],
      payIndex: null,

      // 支付键盘
      showKeyboard: false,
      type: 1, // 1转入 2转出 3充值  4提现
      payType: null,
      payProductid: null, //产品类型id

      // 订单
      orderList: [],
      userToken: null,

    }
  },
  computed: {
    placeholder(){
      let m = this.money
      let mDef = `请输入金额, ${this.product.money_min}元起投`
      return ( m ? m : mDef)
    },
    productid(){
      return this.$route.params.productid
    }
  },
  created() {
    this.initFun()
    this.welfareBestCoupon()
    // console.log('xxxxxxxxxxx')
  },
  mounted(){

    this.selectCouponListFun()
  },
  methods:{

    // 初始化请求
    initFun(){
      let params={
        servicename: 'api.assetTransaction',
        type: this.type  || '',
        productid: this.productid || '',
      }
      this.$http(params).then((res)=>{
         console.log('res', res)
        // this.$messagebox({
        //   // title: 'xxxx',
        //   message: '非常遗憾！由于你绑定的银行卡发卡行原因，暂时无法购买。',
        //   // messageHtml:'<p style="color: #26a2ff">只需更换银行卡，即可正常购买</p>',
        //   confirmButtonText: '立即更换',
        //   callback(e){
        //     console.log('----------------', e==='confirm')
        //   }
        // })
        this.changeTitle(res.product.product_name+"转入")
        this.product = res.product
        this.userToken = res.userToken
        this.show = true
      })
    },

    // 确认输入
    confirmPayment(){
      console.log('xxxxxxxxxxxx--------')
      // this.moneyReduce = this.money.toString()
      // this.cuserid ? this.getMoney() : this.showPayFun()
      this.showPayFun()
    },

    //交易时计算使用卡券后金额
    getMoney(){
      if(this.responseing){
        this.$flash('请求中')
        return
      }
      this.responseing = true //请求中

      this.$http({
        servicename : 'order.couponMoney',
        money: this.money  || '',
        productid: this.productid  || '',
        cuserid: this.cuserid  || '',
      }).then((res)=>{
        this.responseing = false //请求结束
        this.moneyReduce = res.pay_money.toString()
        this.showPayFun()
      }).catch((error)=>{
        this.responseing = false //请求结束
        console.log(res.msg)
      });
    },

    // 确定转入 调出支付列表
    showPayFun(){
      if(this.responseing){
        this.$flash('请求中')
         console.log('xxxxxxxxxxxx111111111--------')
        return
      }
      this.responseing = true //请求中

      let params={
        servicename: 'order.payList',
        money: this.money  || '',
        productid: this.productid  || '',
        action: 1,
        cuserid: this.cuserid || '',
        // combination_id : sessionStorage['combination_id'],
        // param : sessionStorage['param']
      }
      this.$http(params).then((res)=>{
        this.responseing = false //请求结束
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
        }else{
          this.responseing = false //请求结束
          this.payList = res.list
          this.moneyReduce = res.pay_info.money
          this.showPay = !this.showPay
        }
      }).catch((error)=>{
        // console.log('错误了')
        this.responseing = false
      });

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

    // 键盘回调
    complete(){
      this.welfareBestCoupon()
      this.selectCouponListFun()
    },

    //最佳匹配卡券
    welfareBestCoupon(){
      //this.responseing = true //请求中

      this.$http({
        servicename : 'Welfare.bestCoupon',
        money: this.money || 50000,
        productid: this.productid  || '',
        action: 1,
      }).then((res)=>{
        console.log(res);

        this.enableTotal = res.enable_total
        this.selectedName = res.selected_name
      }).catch((error)=>{
        console.log(res.msg)
      });
    },

    //获取卡券列表数据
    selectCouponListFun(){
      //this.responseing = true //请求中
      let params = {
        servicename : 'Welfare.selectCouponList',
        money: this.money || 50000,
        productid: this.productid  || '',
        action: 1,
      }

      this.$http(params).then((res)=>{
        this.couponList = res.list
        let hasCoupon = `有${this.couponList.length}优惠券可用`
        this.selectedName = this.couponList.length ? hasCoupon : ''
      }).catch((error)=>{
        console.log(res.msg)
      });
    },

    // 前往选择卡券
    goToCouponList(){
      if(this.enableTotal){
        // this.$router.push(`${this.$route.path}/choice`)
        this.showCoupon = !this.showCoupon
      }
    },

    // 选择卡券回调
    selectNameFun(index){
      if(index!==-1){
        this.couponList.forEach((value, index) => {

          value.select = false
        });

        this.$set(this.couponList[index], 'select', true)
        this.selectedName = this.couponList[index].selected_name
        this.cuserid = this.couponList[index].cuserid
      }else{
        this.couponList.forEach((value, index) => {
          value.select = false
        });
        this.selectedName = '不使用卡券'
        // this.enableTotal = 0
        this.cuserid = 0
      }
      this.showCoupon = !this.showCoupon

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
      this.payIndex = null
      this.payType = null
      this.showKeyboard = bool
    },

    // 微信支付跳转
    setWxOrderCacheData(){
      if(this.responseing){
        this.$flash('请求中')
        return
      }
      this.responseing = true //请求中

      this.$http({
        servicename: 'wxpay.getWxOrderParams',
        type: this.type || '',
      }).then((res)=>{
        this.responseing = false //请求结束
        let url ={
          // token: '',
          money: this.money,
          // passwd: '',
          // platform: '',
          cuserid: this.cuserid, //卡券id
          event_ref_id: '',  //活动id
          pay_type: this.payType,
          src_ref_id: this.payProductid,
          productid: this.productid,
          userToken: this.userToken,
          // openid: '',
          redirectUrl: document.location.href, //本页url 失败 中途
          paySuccessUrl: 'http://'+document.location.host+window.location.pathname+'#/weixin/done', //回调
          type: this.type,
          combination_id : sessionStorage['combination_id'],
          param : sessionStorage['param']
        }
        // if(this.$root.checked){
        //   url.combination_id = sessionStorage['combination_id']
        //   url.param = sessionStorage['param']
        // }
        let paramStr = this.urlEncode(url)
        paramStr = paramStr.substr(1, paramStr.length-1)

        let urlHref = `${res.orderFields.redirectUrl}/?${paramStr}`
        console.log(urlHref)

        window.location.href = urlHref

      }).catch((error)=>{
        this.responseing = false //请求结束
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

</style>

