<template>
  <transition name="fate" >
    <div class="week-regular fixed">
      <Loading v-show="!show && !showList" ></Loading>
      <div class="myAsset" v-show="show && showList">
          <jr-banner
            type="asset"
            :title="bannertitle.title"
            :titleTop="bannertitle.titleTop"

            :productid="account.productid"
            money_type="12"
            order_type="0"
            :account="account"
            :record="$route.path + '/jrRecord'"
          ></jr-banner>
          <div :class="{'balance-assets':true,'balance-message-hidden': tipShow =='0'}">
             <p>可提现金额：<span v-text="account.unlock_principal"></span></p>
             <p>锁定金额：  <span v-text="account.lock_principal"></span></p>
          </div>
          <p class="balance-message" v-if="tipShow =='1'">亲爱的财主，您的原“活期资产”在“可提现金额”中哦！</p>
          <div
            class="myAsset_regular_img"
            v-if="dataList.length===0 && showList"
          >
            <div>
                <img src="../assets/week_null_bg_data64.png">
            </div>
            <span>您还没有购买记录哦~</span>
          </div>
             <div class="minirefresh-wrap">
                <div class="minirefresh-scroll">
                    <ul
                      class="myAsset_regular_Record"
                      v-if="dataList.length!==0 && showList" >
                        <li
                          v-for="(cout, index) in dataList"
                          :key="index"
                          class="myAsset_regular_li"
                        >
                            <h3><span>{{cout.order_no}}</span><i>{{cout.end_word}}</i></h3>
                            <!-- <h6>{{cout.term_word}}</h6> -->
                            <h4 class="myH4">
                              <span>投资本金（元）</span>
                              <h5>
                                  <span class="expected_price">{{cout.lock_principal}}</span>
                                  <span class="expected_priceA"></span>
                              </h5>
                            </h4>
                            <h4>
                              <span>已得收益（元）</span>
                              <h5>
                                <span class="expected_price">{{cout.total_yield}}</span>
                                <span class="expected_priceA"></span>
                              </h5>
                            </h4>
                            <h2>
                              <h3>
                                <!-- <span>{{30+'天'}} | </span> -->
                                <span class="span2">{{cout.invest_days}}</span>
                              </h3>
                              <h5>
                                <span>原始本金</span>
                                <span>{{cout.lock_principal}}元</span>
                              </h5>
                            </h2>
                        </li>
                    </ul>
                </div>
             </div>

          <h6
            @click="moreLockListFun(true)"
            class="myAsset_regular_lordMore"
            v-if="isMore && !responseing "
          >加载更多...</h6>
          <div v-if="!isMore && !responseing"
            class="myAsset_regular_lordMore"
          >
            <span>已经全部加载完毕</span>
          </div>
          <!-- <div class="myAsset_regular_btn">
            <h2>立即转入</h2>
          </div> -->
          <!--一个按钮-->
      <transition name="fold">
        <div class="footer footer-x">
          <div class="link-doubel" v-if="productLimit.is_out_open">
            <router-link
              :to="{ path: `/productOut/${$route.query.productid}`}"
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
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  import JrBanner from '../components/JrBanner'
  import WpDetail from './WPDetail'
  // import WeekList from './WeekList.vue'

  export default {
    name: 'regularAsset',
    components: {
      JrBanner,
      WpDetail,
      // WeekList
    },
    data() {
      return {
        show: false,
        showList: false,
        showDetail: false,
        assetId: '',
        isMore: true,
        lockListIndex: 2,
        responseing: false,
        account: {
          "totalAccount": "2.14",
          "yestodayIncome": "0.00",
          "total_yield": "2.14",
          "showCurrentNotify": 2,
          "productid":2,
          "lock_principal": '' ,// 锁定金额
          "unlock_principal": '', // 可转出金额
        },
        bannertitle:{
          title:"我的月定期",
          titleTop:"月定期总资产(元)"
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
        dataList:[],
        myData:'',
        idxxx: '',
        totalCount:'',
        tipShow: false
      }
    },
    computed: {

    },
    watch: {},
    created() {
      // console.log('----------', this.RefreshUp)
      this.tipShow = this.$route.query.tipShow
      this.initFun()
      this.lockListFun()
    },
    mounted() {
      this.$messagebox.close()
      console.log('===', this.tipShow)
    },
    methods: {


      initFun(){
        this.$http({
          servicename: 'product.productAsset',
          productid: this.$route.query.productid || '',
        }).then((response)=>{
          this.account.totalAccount = response.asset.total_money //广告条数据
          this.account.yestodayIncome = response.asset.yesterday_yield
          this.account.total_yield = response.asset.total_yield
          this.account.productid = response.asset.productid
          this.account.unlock_principal = response.asset.unlock_principal // 可转出金额
          this.account.lock_principal = response.asset.lock_principal // 可转出金额
          console.log('this.account',  this.account)
          this.account = response.asset
          this.productLimit = response.productLimit
          this.show = true
          this.settitle()

        }).catch(function(error){
          console.log("失败了:"+error)
        });
      },

      lockListFun(){
        let params={
          servicename:'account.assetList',
          productid: this.$route.query.productid || '',
        }
        this.$http(params).then((response)=>{
            this.dataList = response.list
            this.showList = true
        }).catch((error)=>{
          this.show = true
          // this.$messagebox.confirm(error)
        });
      },

      recordFun(){
        this.$router.push('/regularAsset/regularRecord')
      },
      // orderFun(val){
      //   console.log('vvvvvvvvvvvvvvvvv', val)
      //   this.assetId = val
      //   this.$router.push({
      //     path: '/asset/orderDetail',
      //     query: {assetId: val}
      //   })
      // },
      settitle(){
        console.log(this.account);
        if(this.account.productid == 6){
          this.bannertitle.title = "我的月定期"
          this.changeTitle("我的月定期")
          this.bannertitle.titleTop = "月定期总资产(元)"
        }else if(this.account.productid == 7){
          this.bannertitle.title = "我的季定期"
           this.changeTitle("我的季定期")
          this.bannertitle.titleTop = "季定期总资产(元)"
        }else if(this.account.productid == 2){
          this.bannertitle.title = "我的年定期"
          this.changeTitle("我的年定期")
          this.bannertitle.titleTop = "年定期总资产(元)"
        }else if(this.account.productid == 9){
          this.changeTitle('我的周定期')
          this.bannertitle.titleTop = "周定期总资产(元)"
        }else{
          this.bannertitle.title = "我的定期"
          this.bannertitle.titleTop = "总资产(元)"
        }
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
          let isBool = response.list.length!==0
          if(isBool){
            response.list.forEach((value, index) => {
              this.dataList.push(value)
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
.week-regular
  text-align center
  padding-bottom rem(150)
  background #f5f5f5
  overflow scroll
  -webkit-overflow-scrolling touch
  .myAsset
    width rem(750)
    margin 0 auto
    &_Regular
      background-image linearGradient
      width rem(750)
      height rem(356)
      span
        color #a8caed
        display block
        text-align left
        height rem(90)
        line-height rem(90)
        padding-left rem(20)
        font-size rem(28)
      h3
        width rem(750)
        height rem(142)
        margin-bottom rem(30)
        line-height rem(142)
        font-size rem(77)
        color #ffffff
      h5
        height rem(39)
        color #a8caed
        line-height rem(39)
        font-size rem(28)
        border 1px solid #ffffff
        margin auto
        width rem(152)
        border-radius rem(15)
    .myAsset_regular_two
      height rem(162)
      background #ffffff
      padding-top rem(33)
      margin-bottom rem(23)
      h3
        font-size rem(28)
        color #888888
      h5
        height rem(124)
        color #0c72e3
        line-height rem(124)
        font-size rem(65)
    .myAsset_regular_img
      height rem(566)
      div
        height rem(310)
        img
          width rem(200)
      span
        font-size rem(28)
    .myAsset_regular_Record
      // overflow hidden
      // margin-bottom rem(50)
      li
        // width rem(750)
        height rem(306+60)
        padding-left rem(30)
        padding-top rem(30)
        margin-bottom rem(30)
        background #ffffff
        // indicator()
        h6
          text-align right
          line-height 60px
          padding-right 60px
          color #666666
        h3
          text-align left
          margin-bottom rem(30)
          span
            font-size rem(30)
          i
            margin-left rem(20)
            font-size rem(24)
            height rem(35)
            line-height rem(35)
            color #ee5f50
            width rem(190)
            border-radius 15px
            border 1px solid #ee5f50
            text-align center
            display inline-block
        h4
          height rem(115)
          width rem(345)
          display inline-block
          margin-bottom rem(50)
          span
            font-size rem(28)
            color #666666
          h5
            font-size rem(65)

            // display inline-block
            .expected_price
              font-size rem(50)
              color #0d74e4
            .expected_priceA
              font-size rem(30)
              color #0d74e4
        .myH4
          border-right 2px solid #e5e5e5
        h2
          border-top 2px solid #e5e5e5
          text-align left
          width rem(720)
          h3
            height rem(60)
            line-height rem(60)
            color #989898
            display inline-block
            float left
            width rem(360)
            span
              font-size rem(25)
          h5
            display inline-block
            height rem(60)
            line-height rem(60)
            width rem(300)
            text-align right
            .span2
              margin-right rem(30)
            span
              font-size rem(25)
    .myAsset_regular_lordMore
      display inline-block
      width rem(230)
      height rem(30)
      margin 0 auto
      text-align center
      color #a5a5a5
      margin-bottom rem(30)
      padding-bottom rem(30)
    .myAsset_regular_btn
      h2
        width rem(692)
        height rem(100)
        line-height rem(100)
        background #0c72e3
        font-size rem(35)
        color #ffffff
        border-radius rem(10)
        position fixed
        left  rem(30)
        bottom rem(30)
    .footerOut
      padding 0 rem(30) rem(10)
      a
        display block
        width rem(690)
        margin auto
        float none
        border-radius rem(12)
        // background mainColor
        background mColor
        color baise
        font-size rem(30)
        letter-spacing rem(3)
      a.lanse
        // background-color mainColor
        background mColor
        color #fff
      a.inBan
        background-color #ececec
        font-size rem(28)
        color huise

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
  .balance-assets
    display flex
    justify-content space-between
    background: #ffffff
    p
      flex 1
      line-height 130px
      font-size 28px
      color #666
      // font-weight 500
      span
        color #0d74e4
        font-size 32px
  .balance-message
    color #0d74e4
    font-size 28px
    background #f5f5f5
    line-height 80px
  .minirefresh-wrap
    position static
  .balance-message-hidden
    margin-bottom 20px;
</style>
