<template>
  <transition name="fate" >
    <div class="weekProfitAsset fixed iphone-xms">
      <Loading v-show="!show" ></Loading>
      <div class="myAsset" v-show="show">
        <jr-banner
          type="asset"
          title="周周盈"
          titleTop="周周盈总资产"
          :productid="account.productid"
          money_type="12"
          order_type="0"
          :account="account"
          record="/asset/weekAsset/jrRecord"
        ></jr-banner>
        <div
          class="tips"
          v-if="week_day">每周<span
          v-text="week_day"
        ></span>可免费转出</div>
        <div class="moneyList">
          <div>
            <p>可转出金额</p>
            <h5 v-text="principal.unlock_principal"></h5>
          </div>
          <div @click="goToPush">
            <p>锁定期金额</p>
            <h5 v-text="principal.lock_principal"></h5>
          </div>
        </div>
        <jr-cycle
          v-if="lockList.list.length===0"
          @showDetail="showDetailFun"
          :ad="ad"
        ></jr-cycle>
        <wp-detail
          :showDetail="showDetail"
          @closeFun="closeFun"
        ></wp-detail>
        <div 
          class="list-cell" 
          v-for="(item, index) in lockList.list"
          :key="index"
          >
          <div class="list-cell-top">
            <h6><span v-text="item.order_no"></span></h6>
            <i v-text="item.end_word"></i>
          </div>
          <div class="list-cell-main">
            <div>
              <p>投资本金(元)</p>
              <h5 v-text="item.trade_principal">3.825%</h5>
            </div>
            <div>
              <p>已得收益(元)</p>
              <h5 v-text="item.yield_money">18.1</h5>
            </div>
          </div>
        </div>
        <h6
          @click="moreLockListFun()"
          class="myAsset_regular_lordMore"
          v-if="isMore && !responseing"
        >加载更多...</h6>
        <div v-if="!isMore && !responseing"
          class="myAsset_regular_lordMore"
        >
          <span>已经全部加载完毕</span>
        </div>
        <!--两个按钮  parseFloat(account.total_money)!==0  &&-->
        <transition name="fold">
          <div class="footer fixed-xm" v-if="false">
            <div class="link-doubel" v-if="productLimit.is_out_open">
              <router-link
                :to="{ path: `/productOut/${$route.query.productid}`, query: {take_money: account.totalAccount}}"
              >转出</router-link>
              <router-link
                :to="{ path: `/productIn/${$route.query.productid}`}" class="changein"
                v-show="productLimit.is_open"
              >转入</router-link>
              <a href="javascript:;" class="changeinfade"
                v-show="!productLimit.is_open"
              >{{productLimit.content}}</a>
            </div>
            <div class="link-single" v-if="!productLimit.is_out_open">
              <router-link
                :to="{ path: `/productIn/${$route.query.productid}`}" class="changein"
                v-show="productLimit.is_open"
              >转入</router-link>
              <a href="javascript:;" class="changeinfade"
                v-show="!productLimit.is_open"
              >{{productLimit.content}}</a>
            </div>
          </div>
        </transition>
        <router-view></router-view>
      </div>
    </div>
  </transition>
</template>

<script>
  import JrBanner from '../components/JrBanner'
  import JrCycle from '../components/JrCycle'
  import WpDetail from './WPDetail'
  // import WeekList from './WeekList.vue'

  export default {
    name: 'weekProfitAsset',
    components: {
      JrBanner,
      JrCycle,
      WpDetail,
      // WeekList
    },
    data() {
      return {
        show: false,
        showList: false,
        showDetail: false,
        isMore: true,
        lockListIndex: 2,
        responseing: false,
        account: {
          totalAccount: '0.00',
          total_yield: '0.00',
          yestodayIncome: '0.00',
          productid:5
        },
        week_day: '',
        ad: { // 投资时间 广告文案
          ad_compute_date: "2017-07-21",
          ad_invest_date: "2017-07-20",
          ad_transfer_date: "2017-07-27",
        },
        principal: {
          lock_principal: '0.00',
          unlock_principal: '0.00',
        },
        is_out_day: 0, //今天是不是转出出
        productLimit: {
          content: "", //
          every_money_min: 0, // 0 灰色不可点击
          is_open: 0,
          is_out_open: 0,
          money: 0
        },
        // 订单
        lockList: {
          count: '0',
          list: [],

        },
        totalCount:''
      }
    },
    computed: {

    },
    watch: {},
    created() {
      this.weekAsset()
      this.lockListFun()
      this.getcurTime()
    },
    mounted() {
      this.$messagebox.close()
    },
    methods: {
      showDetailFun(bool){
        this.showDetail = bool
      },
      closeFun(bool){
        this.showDetail = bool
      },
      goToPush(){
        this.$router.push({
          path: 'lockAmount',
          query: {}
        })
      },
      weekAsset(){
        let params={
          servicename:'product.productAsset',
          productid:this.$route.query.productid || '',
        }
        this.$http(params).then((response)=>{
            
          let num = (Number( response.asset.unlock_principal) + Number( response.asset.residue_yield))

          this.principal.unlock_principal = response.asset.unlock_principal
          this.principal.lock_principal = response.asset.lock_principal

          console.log(this.account);
          this.account.totalAccount = response.asset.total_money //周周赢总资产
          this.account.total_yield = response.asset.total_yield  //总收益
          this.account.yestodayIncome = response.asset.yesterday_yield //昨日收益
          this.account.productid = response.asset.ptypeid //产品ID

          console.log(this.account);
          this.week_day = response.asset.week_day

          this.productLimit = response.productLimit
          this.show = true
          this.current = true
        }).catch(err => {
          this.show = true
          // this.$messagebox.confirm(err)

        });
      },

      lockListFun(){
        let params={
          servicename:'account.assetList',
          productid:this.$route.query.productid || '',
        }
        this.$http(params).then((response)=>{
            this.lockList = response
            this.showList = true
        }).catch((error)=>{
          this.show = true
          // this.$messagebox.confirm(error)
        });
      },

      //获取当前时间
      getcurTime(){
        var date = new Date();
        var seperator1 = "-";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }

        this.ad.ad_invest_date = date.getFullYear() + seperator1 + month + seperator1 + strDate

        //获取第二天相对应的时间
        if(date.getHours() >= 15){
          var nextDate = new Date(date.getTime() + 24*60*60*1000); //后一天

          var monthnext = nextDate.getMonth() + 1;
          var strDatenext = nextDate.getDate();
          if (monthnext >= 1 && monthnext <= 9) {
              monthnext = "0" + monthnext;
          }
          if (strDatenext >= 0 && strDatenext <= 9) {
              strDatenext = "0" + strDatenext;
          }
          this.ad.ad_compute_date = nextDate.getFullYear() + seperator1 + monthnext + seperator1 + strDatenext

          //获取八天后的时间
          // var nextsevenDate = new Date(date.getTime() + 8*24*60*60*1000);
        }else{
          this.ad.ad_compute_date = date.getFullYear() + seperator1 + month + seperator1 + strDate
        }

        //获取七天后的时间
        var nextsevenDate = new Date(date.getTime() + 7*24*60*60*1000);
        var monthnext7 = nextsevenDate.getMonth() + 1;
        var strDatenext7 = nextsevenDate.getDate();
        if (monthnext7 >= 1 && monthnext7 <= 9) {
            monthnext7 = "0" + monthnext7;
        }
        if (strDatenext7 >= 0 && strDatenext7 <= 9) {
            strDatenext7 = "0" + strDatenext7;
        }
        this.ad.ad_transfer_date = nextsevenDate.getFullYear() + seperator1 + monthnext7 + seperator1 + strDatenext7

      },

       // 加载更多
      moreLockListFun(){
        this.isMore = false
        this.responseing = true
        let params={
          servicename:'account.assetList',
          productid: this.$route.query.productid || '',
          page: this.lockListIndex
        }
        this.$http(params).then((response) => {
          console.log(response);
          
          let isBool = response.list.length!==0
          if(isBool){
            response.list.forEach((value, index) => {
              this.lockList.list.push(value)
            });
            this.lockListIndex++
            this.responseing = false
            this.isMore = true
          }else {
            this.isMore = false
            this.responseing = false
          }
        })
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.weekProfitAsset
  text-align center
  padding-bottom rem(90)
  background #f5f5f5
  overflow scroll
  -webkit-overflow-scrolling touch
  .tips
    line-height rem(62)
    font-size rem(28)
    background-color #fffbe6
    color #fc9010
  .myAsset
    .list-cell
      padding 0 rem(30)
      margin-bottom rem(20)
      background-color baise
      .list-cell-top
        display flex
        justify-content space-between
        align-items center
        border-bottom 1px solid #e8e8e8
        line-height rem(75)
        font-size rem(26)
        h6
          span
            padding-left rem(6)
            font-size rem(28)
        i
          display block
          padding 0 rem(20)
          border 1px solid #fc971f
          height rem(28)
          line-height rem(28)
          border-radius (@height/2)
          font-size rem(20)
          color #fc971f
      .list-cell-main
        display flex
        overflow hidden
        position relative
        margin-bottom rem(20)
        padding rem(34) 0
        background-color baise
        &:before
          content ''
          position absolute
          top 0%
          left 50%
          width rem(3)
          height rem(75)
          transform translate3d(-50%, 60%, 0)
          background-color #e3e3e3
        &>div
          width 50%
          p
            line-height rem(42)
            font-size rem(28)
            color huise9
          h5
            line-height rem(52)
            font-size rem(44)
            color mainColor
  .moneyList
    display flex
    overflow hidden
    position relative
    margin-bottom rem(20)
    margin-top rem(20)
    padding rem(44) 0  rem(50) 0
    background-color baise
    &:before
      content ''
      position absolute
      top 0%
      left 50%
      width rem(3)
      height rem(75)
      transform translate3d(-50%, 60%, 0)
      background-color #e3e3e3
    &>div
      width 50%
      p
        line-height rem(34)
        font-size rem(28)
        color huise9
      h5
        line-height rem(40)
        font-size rem(38)
        color mainColor
  .keyIn
    padding rem(34) rem(56) rem(40)
    background-color baise
    &-btn
      float right

  .link-doubel
    padding 10px 30px
    overflow hidden
    background #ffffff
    a
      width 47%
      height 93px
      border 2px solid #0C72E3
      border-radius 15px
      background none 
    a.changein
      float right
      background #0C72E3
      color #fff
    a.changeinfade
      float right
      background #C7C7C7
      border 2px solid #C7C7C7
      color #fff
  .link-single
    padding 10px 30px
    overflow hidden
    background #ffffff
    a
      width 100%
      height 97px
      border:0px
      border-radius 15px
      background mColor
      color #ffffff
    a.changeinfade
      background #C7C7C7
      color #fff
.myAsset_regular_lordMore
  line-height 180px
  margin-bottom 50px



  </style>
