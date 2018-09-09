<template>
<div class="asset_detail x-header-top" v-if="show">
  <div class="asset_detail__centon">
    <h2>鲸鱼贷A-18031228</h2>
    <ul>
      <li >
        <h6>投标金额</h6>
        <span v-text="assetDetail.invest_money">3，500.00元</span>
      </li>
      <li >
        <h6>投标时间</h6>
        <span v-text="assetDetail.c_time">3，500.00元</span>
      </li>
      <li >
        <h6>预期年化收益率</h6>
        <span v-text="assetDetail.rate_init + '%+' + assetDetail.rate_ext + '%'">3，500.00元</span>
      </li>
      <li >
        <h6>项目期限</h6>
        <span v-text="assetDetail.project_period + '个月'">3，500.00元</span>
      <li >
        <h6>预期收益</h6>
        <span v-text="assetDetail.prospective_yield">3，500.00元</span>
      </li>
      <li >
        <h6>还款方式</h6>
        <span v-text="assetDetail.repay_way">3，500.00元</span>
      </li>
      <li class="end">
        <h6 @click="routerPush('/detail/detail')">查看项目详情</h6>
        <span @click="routerPush('/detail/detail')">协议凭证</span>
      </li>
    </ul>
  </div>
</div>
</template>


<script>

export default {
  // name: 'index',
  components: {},
  data() {
    return {
      show: false,
      assetDetail: {

      }
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
      this.$http("/jyd/accountUserInvestInfo", {
        pinvestid: this.$route.query.pinvestid,
        userid: this.$route.query.userid,
      })
      .then((res) => {
        console.log(res);
        this.assetDetail = res.data
        this.show = true
      }).catch(error => {
        console.log(error);
        this.show = true
      });
    },
    
  },
}
</script>


<style lang="stylus">
.asset_detail  
  margin-top 20px
  // background-color #f5f5f5
  .asset_detail__centon
    padding 18px 36px 30px
    background #fff
    h2 
      line-height 68px
      font-size 30px
    ul 
      li 
        overflow hidden
        line-height 56px
        font-size 26px
        h6 
          width 50%
          float left
          color #a5a5a5 
        span 
          width 50%
          float right 
          text-align right 
      .end
        h6 
          color #0c72e3
          text-decoration: underline;
        span 
          color #0c72e3
          text-decoration: underline;

</style>

