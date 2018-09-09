<template>
 <div
  class="prod-detail fixed-x"
>
<!--
<p class="page-loadmore-desc">translate : {{ translate }}</p>
<div class="loading-background" :style="{ transform: 'scale3d(' + moveTranslate + ',' + moveTranslate + ',1)' }">
  translateScale : {{ moveTranslate }}
</div> -->
<div v-if="show">
  <!-- <mt-loadmore
    :top-method="loadTop"
    @translate-change="translateChange"
    @top-status-change="handleTopChange"
    ref="loadmore"
    v-if="show"
  > -->

 <!-- banner -->
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
    :showBar="showBar"
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
    showMore
  ></detail-qaa>

  <detail-end class="end"></detail-end>

  <!-- 悬浮按钮 :eventRefId="eventRefId" -->
  <detail-button
    :text="dataSource.content"
    :id="dataSource.productid.toString()"
    :productName="dataSource.product_name"
    :productTypeId="dataSource.ptypeid.toString()"
    :isOpen="(dataSource.is_open===1)"

  ></detail-button>
</div>
<!-- </mt-loadmore > -->
  <div
    class="load-error"
    v-if="!show && relaoding"
    @click="relodingFun"
  >加载失败! 点击刷新</div>
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
    DetailButton,
    DetailEnd,
  } from 'plugins/details'

  export default {
    components: {
      DetailBanner,
      DetailBar,
      DetailData,
      DetailReckon,
      DetailQaa,
      DetailCycle,
      DetailButton,
      DetailEnd
    },
    data () {
      return {
        // showType: this.$route.params.prouid,
        show: false,
        showBar: true,
        // showCycle: false,
        dataSource: {
          rate_init: '', //第一个显示
          rate_ext: '', //第二个补贴利率
          rate_all: '', //总利率
          bankRate: '',  // 银行利率
          bannerBotList: [], //banner文字
          todayNum: 0, //今日交易人数
          todayMoney: "", //交易金额
          lists: [
            // { mobile: "用户1560****121",orderid:6565304, trade_money:"交易成功115.00元", trade_time:"16:43"},{ mobile: "用户1560****121",orderid:6565304, trade_money:"交易成功125.00元", trade_time:"16:43"},{ mobile: "用户1560****121",orderid:6565304, trade_money:"交易成功135.00元", trade_time:"16:43"},{ mobile: "用户1560****121",orderid:6565304, trade_money:"交易成功1111455.00元", trade_time:"16:43"},
          ],
          qaaList: [],
          msg: '',
          is_open: 1,
        },
        qaaList:[],
        xx: 1000000,
        showType: null,
        relaoding: false,

        list: [],
        topStatus: '',
        wrapperHeight: 0,
        translate: 0,
        moveTranslate: 0,

        allLoaded: false,
        bottomStatus: '',
      }
    },
    computed: {
      // 显示周期
      showCycle(){
        let bool = !(parseInt(this.$route.params.productid)===1 || parseInt(this.$route.params.productid)===9 ) // 周定、活期都隐藏产品周期
        return bool
      },
      eventRefId(){
        return this.$route.query.combinationId
      }
    },
    beforeRouteEnter(to, from, next){
      next(vm =>{
        vm.$root.title = to.name
      })
    },
    created() {
      // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
      this.xx = this.$JinrSDK.version
      this.$root.shareTitle = '鲸鱼——低门槛、稳收益、安全可靠',
      this.$root.shareContent = '鲸鱼超级新手福利：6000体验金+200元现金抵扣券',
      // this.$root.shareUrl = 'https://hbnew.jingyugame.com/activity/Activity/enter?combinationId=4RuZb1wTx72/L/24oCpfQQ=='
      this.$root.shareUrl = 'https://hbnew.jingyugame.com/activity/Activity/enter?combinationId=RQjCPoIO2kSGLNLM4dfecQ=='
      this.initFun()
    },
    mounted() {},
    methods: {
      /**
       * @author weizihua
       * 初始化方法
       */
      initFun(){
        this.show = false
        this.relaoding = false
        let params = {
          method: 'product.web',
          token: this.$root.appData.token,
          productid: this.$route.params.productid //年定期 2  季定期9
        }
        this.$http(params).then((response) => {
          this.changeTitle(response.product_name + "详情")
          this.setTitleText(response.product_name + "详情")
          console.log(this.$route);

          // this.$route.name = response.product_name + "详情"
          this.dataSource = response

          this.showType = this._showType(response.ptypeid)

          if(this.showType && this.dataSource.lists.length>3 ){
            this.dataSource.lists = this.dataSource.lists.concat(this.dataSource.lists)
          }

          this.show = true

        }).catch(error => {
          this.relaoding = true
          console.log('详情加载失败')
          console.log(error)
        })
      },

      // 切换开关
      closeBarFun(bool){
        this.dataSource.has_invest = true
      },

      _showType(ptypeid){
        // 1 为活期，2为定期  3保险箱  4日增息  5周期性 6周定期

        let bool = (
            ptypeid === 1
         || ptypeid === 2
         || ptypeid === 5
         || ptypeid === 6 // 新增周定期，显示每日数据列表
        ) ? true : false
        return bool
      },

      // 刷新
      relodingFun(){
        window.location.reload()
      },

      // 下拉刷新
      handleTopChange(status) {
        this.moveTranslate = 1;
        this.topStatus = status;
      },
      translateChange(translate) {
        const translateNum = +translate;
        this.translate = translateNum.toFixed(2);
        this.moveTranslate = (1 + translateNum / 70).toFixed(2);
      },
      loadTop() {
        setTimeout(() => {
          let firstValue = this.list[0];
          for (let i = 1; i <= 10; i++) {
            this.list.unshift(firstValue - i);
          }
          this.$refs.loadmore.onTopLoaded();
        }, 1500);
      },

    }
  }
</script>

<style lang="stylus">
@import '~style/mixin.styl'

// 定期详情
.prod-detail
  // position relative
  background-color #fff
  .load-error
    height 600px
    line-height @height
    text-align center
    font-size 32px
  .mint-loadmore-top
    span
      display: inline-block;
      transition: .2s linear;
      vertical-align: middle;
      font-size 20px
      color #999
    .is-rotate
      transform: rotate(180deg);

</style>
