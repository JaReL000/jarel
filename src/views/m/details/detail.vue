<template>
<div class="prod-detail">
<loading v-if="!show" ></loading>
<div v-if="show">
  <!--banner-->
  <detail-banner
    :textTop="dataSource.text_top"
    :showType="showType"
    :rateInit="dataSource.rate_init"
    :rateExt="dataSource.rate_ext"
    :rateExtText="dataSource.rate_ext_text"
    :activeInfo="dataSource.active_info"
    :rateOffset="dataSource.rate_offset"
    :rateFinish="dataSource.rate_finish"
    :bannerBotList="dataSource.bannerBotList"
  ></detail-banner>

  <!-- bar 新手特权  -->
  <detail-bar
    :msg="dataSource.msg"
    :hasInvest="dataSource.msg && dataSource.has_invest"
    @closeBarFun="closeBarFun"
  ></detail-bar>

  <!-- 每日数据 滚动显示  // is_forbid    1  限制   0不限制 -->
  <detail-data
    :todayNum="dataSource.todayNum"
    :todayMoney="dataSource.todayMoney"
    :lists="dataSource.lists"
    v-if="showType && !dataSource.is_forbid"
  ></detail-data>

  <!-- 收益估算 -->
  <detail-reckon
    :rateAll="!!dataSource.rate_ext?dataSource.rate_all:dataSource.rate_init"
    :bankRate="dataSource.bankRate"
    :investDays="dataSource.invest_days"
    :ptypeid="dataSource.ptypeid"
     v-if="showType"
  ></detail-reckon>

  <!-- 产品周期  -->
  <detail-cycle
    v-if="showCycle"
    :progressList="dataSource.progressList"
  ></detail-cycle>

  <!-- 问答 -->
  <detail-qaa
    :qaaList="dataSource.qaaList"
  ></detail-qaa>


  <detail-end class="end"></detail-end>
  <!-- 底部转入按钮 -->
  <btn
    :content="dataSource.content"
    :isOpen="dataSource.is_open"
    :isLogin="$root.isLogin"
    :isOutOpen="dataSource.is_out_open"
  ></btn>
</div>
</div>
</template>

<script>

  import {
    DetailBanner,
    DetailBar,
    DetailData,
    DetailReckon,
    DetailQaa,
    DetailCycle,
    DetailEnd
  } from 'plugins/details'

  import { productApi } from '../api'
  import Btn from './btn'

  export default {
    components: {
      DetailBanner,
      DetailBar,
      DetailData,
      DetailReckon,
      DetailQaa,
      DetailCycle,
      Btn,
      DetailEnd
    },
    data () {
      return {
        show: false,
        isLogin:false, //登入状态
        dataSource: {
          rate_init: '', //第一个显示
          rate_ext: '', //第二个补贴利率
          rate_all: '', //总利率
          bankRate: '',  // 银行利率
          bannerBotList: [], //banner文字
          todayNum: 0, //今日交易人数
          todayMoney: "", //交易金额
          lists: [
            // { mobile: "用户1560****121",orderid:6565304, trade_money:"交易成功15.00元", trade_time:"16:43"},
          ],
          qaaList: [],
          msg: ''
        },
        showType: null
      }
    },
    computed: {
      showCycle(){
        let bool = !(parseInt(this.$route.params.productid)===1|| parseInt(this.$route.params.productid)===9 ) // 增加周定期判断
        return bool
      }
    },

    created() {
      this.currentDetail();
    },
    mounted() {},
    methods: {
      /**
       * @author tangli
       * 初始化方法
       */
      currentDetail(){
        let params={
          servicename : 'Product.produuctWeb',
          productid : this.$route.params.productid || '',
        }

        this.$http(params).then((response)=>{
          this.changeTitle(response.product_name + "详情")
          this.dataSource = response
          this.showType = this._showType(response.ptypeid)
          if(this.showType && this.dataSource.lists.length>3 ){
              this.dataSource.lists = this.dataSource.lists.concat(this.dataSource.lists)
          }
          this.$nextTick(()=>{
            this.show = true
          })

        }).catch(function(error){
          console.log("失败了:"+error)
        });
      },
      // 切换开关
      closeBarFun(bool){
        this.dataSource.has_invest = true
      },

      _showType(ptypeid){
        // 1 为活期，2为定期  3保险箱  4日增息  5周期性 6为周定期
        console.log(ptypeid);

        let bool = (
            ptypeid === 1
         || ptypeid === 2
         || ptypeid === 5
         || ptypeid === 6
        ) ? true : false
        return bool
      }
    }
  }
</script>

<style lang="stylus">
@import '~style/mixin.styl'

// 定期详情
.prod-detail
  // display none
  padding-bottom 40px
  background-color #fff
  .footer-a
    position fixed
    bottom 0
    left 0
    width 100%
.tips
  text-align center
  // padding-bottom 150px
  color #666
</style>
