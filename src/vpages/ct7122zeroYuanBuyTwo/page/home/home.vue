<template>
  <div class="index">
    <section class="index-wrap">
      <img class="logos" src="../../images/logo.png">
      <div class="index-bg1">
        <div class="index-scrolldata">
          <ul>
            <li v-for="( item,index ) in scrollData" :key='index'>
              恭喜<span v-text="item.mobile"></span> 抢到<span v-text="item.gift"></span>&nbsp;&nbsp;<span v-text="item.awardTimestamp"></span>
            </li>
          </ul>
          <ul>
            <li v-for="( item,index ) in scrollData" :key='index'>
              恭喜<span v-text="item.mobile"></span> 抢到<span v-text="item.gift"></span>&nbsp;&nbsp;<span v-text="item.awardTimestamp"></span>
            </li>
          </ul>
        </div>
        <div class="index-mygift" @click="gotoFun">
          <img src="../../images/bg2.png">
        </div>
      </div>

      <div class="index-bg2">
        <section class="index-bg1-div">
          <div v-if="!$root.end">抢购倒计时：<span v-text="publicData.splitday1"></span><span v-text="publicData.splitday2"></span>天<span class="span1" v-text="publicData.splithour1"></span><span  v-text="publicData.splithour2"></span>时<span  class="span1" v-text="publicData.splitmin1"></span><span  v-text="publicData.splitmin2"></span>分<span class="span1" v-text="publicData.splitsec1"></span><span  v-text="publicData.splitsec2"></span>秒</div>
          <div v-else>活动已结束</div>
        </section>
      </div>

      <div class="index-hot" @click="toGiftDetail(hotRecommendDetail.commodityid,hotRecommendDetail.is_online,hotRecommendDetail.real_pay_money,hotRecommendDetail.combination_id,hotRecommendDetail.productid)">
        <div class="index-hot-div1">
          <div class="index-hot-child">
            <span v-text="hotRecommendDetail.commodity_name"></span>
            <i class="hot-i1">鲸喜价<b>0</b><em>元</em></i>
            <i class="hot-i2">原价<a href="javascript:;" v-text="hotRecommendDetail.market_price"></a></i>
            <i class="hot-i3">立即投资</i>
          </div>
          <img class="index-hot-div1-img" :src="hotRecommendDetail.photoPath">
        </div>
        <div class="index-hot-div2" v-if="hotRecommendDetail.reason.length>0">
          <img src="../../images/bg4.png">
          <span v-text="hotRecommendDetail.reason"></span>
        </div>
        <img class="index-hot-img" src= "../../images/bg3.png">
      </div>

      <div class="index-no1">
        <img src="../../images/bg7.png">
        <div @click="$root.alertRule=true"></div>
      </div>

      <div class="index-detail">
        <div class="index-detail-clomne" v-for="(item,index) in commodityColumn" :key='index'>
          <div class="index-detail-clomne-wrap">
            <img class="clomne-wrap-img1" v-if="index==1" src="../../images/bg12.png">
            <img class="clomne-wrap-img2" v-if="index==1" src="../../images/bg13.png">
            <img class="clomne-wrap-img3" v-if="index==2" src="../../images/bg14.png">
            <img class="clomne-wrap-img4" v-if="index==2" src="../../images/bg15.png">
            <div class="clomne-name">
              <span v-text="item.column_name"></span>
            </div>
            <ul>
              <li class="ul-li1" v-for="(key,i) in item['list']" :key='i' v-if="index!=1" @click="toGiftDetail(key.commodityid,key.is_online,key.real_pay_money,key.combination_id,key.productid)">
                <div class="clomne-div1">
                  <img class="clomne-div1-img1" :src="key.photo_path">
                  <div class="clomne-div1-firstChild" v-if="key.label_name.length>0">
                    <div v-text="key.label_name"></div>
                    <!-- <div>多少多少</div> -->
                    <!-- <img src="../../images/bg10.png">
                    <span v-text="key.label_name"></span> -->
                  </div>
                  <div class="clomne-div1-child" v-if="key.is_online == 0">
                    <img class="clomne-div1-child-img1" src="../../images/bg11.png">
                  </div>
                </div>
                <span v-text="key.commodity_name"></span>
                <b v-text="key.commodity_desc"></b>
                <i v-if="key.real_pay_money == 0">投<em v-text="key.productType"></em><em v-text="key.invest_money"></em>元可得</i>
                <i v-if="key.real_pay_money > 0">您还差<em v-text="key.invest_money-key.real_pay_money"></em>元可得</i>
              </li>

              <li class="ul-li2" v-for="(temp,j) in item['list']" :key="j"  v-if="index==1" @click="toGiftDetail(temp.commodityid,temp.is_online,temp.real_pay_money,temp.combination_id,temp.productid)">
                <div class="ul-li2-div1" :class="{'floatleft': j%2==0,'floatright': j%2!=0}">
                  <img class="ul-li2-div1-img" :src="temp.photo_path">
                  <div class="ul-li2-div1-child1" v-if="temp.label_name.length>0">
                    <!-- <img src="../../images/bg10.png">
                    <span v-text="temp.label_name">热抢</span> -->
                    <span v-text="temp.label_name"></span>
                  </div>
                  <div class="ul-li2-div1-child2" v-if="temp.is_online == 0">
                    <img class="ul-li2-div1-child-img1" src="../../images/bg11.png">
                  </div>
                </div>
                <div class="ul-li2-div2" :class="{'floatleft': j%2!=0,'floatright': j%2==0}">
                  <span v-text="temp.commodity_name"></span>
                  <b v-text="temp.commodity_desc"></b>
                  <i v-if="temp.real_pay_money == 0">投<em v-text="temp.productType"></em><em v-text="temp.invest_money"></em>元可得</i>
                  <i v-if="temp.real_pay_money > 0">您还差<em v-text="temp.invest_money-temp.real_pay_money"></em>元可得</i>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="div-bot">
        <p>官方客服热线 1010-2015</p>
        <p>存钱赚利息,就上鲸鱼APP</p>
        <img src="../../images/bg21.png">
      </div>
    </section>
    <alertRule v-if="$root.alertRule"></alertRule>
  </div>
</template>

<script>
import * as jrUrl from '../../urlconfig/urlconfig'
import {getRequest,pattern} from '../../util/util'
import Flash from '@/components/flash'
import jinrsdk from 'src/jinr-sdk/index'
import alertRule from "../../components/alertRule"


export default {
  components: {
    alertRule
  },
  name: 'index',
  data () {
    return {
      datas: null,
      combinationId: '',
      isShowCoupon: null,
      scrollData: [],//顶部轮播数据
      publicData: {//倒计时
        deadTime: 0,
        day: null,
        hour: null,
        min: null,
        sec: null,
        splitday1: null,
        splitday2: null,
        splithour1: null,
        splithour2: null,
        splitmin1: null,
        splitmin2: null,
        splitsec1: null,
        splitsec2: null
      },
      hotRecommendDetail: {//热门商品数据
        'reason': '',
        'commodity_name': '',
        'market_price': '',
        'detailImg': ''
      },
      commodityColumn: []
    }
  },
  computed: {

  },
  created () {
    // this.token = getRequest()['token']
    this.$root.title = '好货0元购'
    this.combinationId = getRequest()['combinationId']
    this.datas = getRequest()['data']
    
    this.isShowCoupon = getRequest()['isShowCoupon'].toString()
    sessionStorage.setItem( 'isShowCoupon',this.isShowCoupon )
    sessionStorage.setItem( 'datas',this.datas )
    sessionStorage.setItem('combinationIds',this.combinationId)

    pattern()
    this.getInitData ()
  },
  mounted () {
    
  },
  methods: {
    getInitData () {
      //获取首页数据
      let params = {
        'combinationId': this.combinationId,
        'data': this.datas
      }
      this.$http( jrUrl.getInitData,params ).then(res=>{
        if( res.userLogin == 1 ){
          sessionStorage.setItem('log',1)
          // this.$root.log = true
        }else{
          // this.$root.log = false
          sessionStorage.setItem('log',0)
        }
        this.scrollData = res.allOnliveLiveData
        this.publicData.deadTime = res.countDownTime/1000
        this.$root.countDownTime = res.countDownTime/1000
        if( res.countDownTime <=0 ){
          this.$root.end = true
        }else{
          this.$root.end = false
          this.deadTime()
        }
        this.hotRecommendDetail = this.transformHotRecommendDetail( res.HomeHotCommodity,res.HomeHotCommodity.detailImg )

        this.commodityColumn = this.transformHomeAllCommodity(res.homeAllCommodity)

        sessionStorage.setItem('endTimestamp',res.endTimestamp)

      })
    },
    transformHomeAllCommodity ( $homeAllCommodity ) {
      if( $homeAllCommodity&&$homeAllCommodity instanceof Array&&$homeAllCommodity.length>0 ) {
        $homeAllCommodity.map(( val,i ) => {
          if( val['list'].length>0 ){
            for( let j=0;j<val['list'].length;j++ ) {
              let productid = val['list'][j]['productid']
              switch ( productid ) {
                case 2:
                  val['list'][j]['productType'] = '年定期'
                  break
                case 7:
                  val['list'][j]['productType'] = '季定期'
                  break
                case 6:
                  val['list'][j]['productType'] = '月定期'
                  break
                case 9:
                  val['list'][j]['productType'] = '周定期'
                  break
              }
            }
          }
        })
      }
      return $homeAllCommodity
    },

    transformHotRecommendDetail ( $HomeHotCommodity = {},detailImgArr = [] ) {
      //转换置顶图片数据
      if( detailImgArr.length>0 ){
        $HomeHotCommodity['photoPath'] = detailImgArr[0]
      }
      return $HomeHotCommodity
    },
    toApp(){
      location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.jinr.core"
    },
    toGiftDetail( $commodityid,is_online,real_pay_money,combination_id,productid ){
      // if( !this.$root.log ){
      //   Flash( '请先登录!' )
      //   return false
      // }
      if( this.$root.end ){ 
        Flash( '活动已结束!' )
        return false
      }
      if(is_online==0&&real_pay_money==0){
        Flash('商品已抢光!')
        return false
      }
      this.$router.push({
        path: '/giftDetail',
        query: {
          'newcombination_id': combination_id,
          'commodityid': $commodityid,
          'product_id': productid
        }
      })
      sessionStorage.setItem('deadTime',this.publicData.deadTime)
      sessionStorage.setItem( 'commodityid', $commodityid )
      sessionStorage.setItem('combination_id',combination_id)
      sessionStorage.setItem('product_id',productid)
    },
    deadTime(){
      clearInterval(this.time)
      this.time = setInterval(()=>{
        this.publicData.day=Math.floor(this.publicData.deadTime/3600/24)
        if( this.publicData.day<10 ){
          this.publicData.day = '0' + this.publicData.day
        }
        let _tempday = this.publicData.day.toString().split('')
        this.publicData.splitday1 = _tempday[0]
        this.publicData.splitday2 = _tempday[1]
        this.publicData.hour=Math.floor((this.publicData.deadTime-this.publicData.day*3600*24)/3600)
        if(this.publicData.hour<10){
          this.publicData.hour = '0' + this.publicData.hour
        }
        let _temphour = this.publicData.hour.toString().split('')
        this.publicData.splithour1 = _temphour[0]
        this.publicData.splithour2 = _temphour[1]
        this.publicData.min=Math.floor((this.publicData.deadTime-this.publicData.day*3600*24-this.publicData.hour*3600)/60)
        if(this.publicData.min<10){
          this.publicData.min = '0' + this.publicData.min
        }
        let _tempmin = this.publicData.min.toString().split('')
        this.publicData.splitmin1 = _tempmin[0]
        this.publicData.splitmin2 = _tempmin[1]
        this.publicData.sec=Math.floor(this.publicData.deadTime-this.publicData.day*3600*24-this.publicData.hour*3600-this.publicData.min*60)
        if(this.publicData.sec<10){
          this.publicData.sec = '0' + this.publicData.sec
        }
        let _tempsec = this.publicData.sec.toString().split('')
        this.publicData.splitsec1 = _tempsec[0]
        this.publicData.splitsec2 = _tempsec[1]
        this.publicData.deadTime--
        if(this.publicData.deadTime===-1){
          this.$root.end = true
          clearInterval(this.time)
        }
      },1000)
    },
    gotoFun(){
      this.$router.push({
        path: "/myDetail",
        query: {
          data: this.$route.query.data,
          combinationId: this.$route.query.combinationId,
        },
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../style/mixin.styl'
  .index
    width 100%
    height 100%
    overflow hidden
    background #39adf7
    position relative
    box-sizing border-box
    padding-top 92px
    .index-wrap
      width 100%
      height 100%
      overflow-y scroll
      -webkit-overflow-scrolling touch
      position relative
      overflow-x hidden
      .logos
        width 144px
        position absolute
        left 5px
        top 20px
        z-index 100
      .index-bg1
        width 100%
        height 746px
        bis1('../../images/bg1')
        overflow hidden
        .index-scrolldata
          min-width 448px
          height 50px
          background #1d8ed5
          border-radius 26px
          overflow hidden
          margin 20px 0 0 160px
          // position absolute
          // top 20px
          // left 50%
          // transform translateX(-40%)
          // white-space nowrap
          ul
            overflow hidden
            -webkit-animation  scrolls 16s linear 2s infinite
            li
              min-width 448px
              height 100%
              line-height 50px
              overflow hidden
              font-size 24px
              color #87caf4
              box-sizing border-box
              padding-left 25px
              padding-right 25px
        .index-mygift
          width 125px
          height 116px
          position absolute
          right 0
          top 630px
          img 
            display block
            width 100%
    .index-bg2
      height 117px
      overflow hidden
      .index-bg1-div
        height 100%
        line-height 117px
        position relative
        overflow hidden
        div
          box-sizing border-box
          height 117px
          line-height 117px
          overflow hidden
          text-align center
          font-size 30px
          position absolute
          left 50%
          top 0
          transform translateX(-50%)
          padding 0 55px
          white-space nowrap
          color #7fe7fd
          span 
            display inline-block
            width 33px
            height 46px
            line-height 46px
            background  #f1f1f1
            border-radius 8px
            margin-right 10px
            vertical-align middle
            color #2397e1
          .span1
            margin-left 10px
    .index-hot
      width 710px
      height auto
      margin 0 auto
      // overflow hidden
      position relative
      background #fff
      border-radius 4px
      padding-top 8px
      margin-bottom 37px
      padding-bottom 10px
      .index-hot-div1
        width 690px
        height 320px
        background #f8efe3
        margin 0 auto
        overflow hidden
        border-radius 4px
        .index-hot-child
          width 370px
          height 100%
          overflow hidden
          float left
          span 
            display block
            font-size 40px
            font-weight bold
            color #ac7758
            margin 46px 0 15px 30px
          .hot-i1
            font-size 30px
            color #ac7758
            margin 0 0 15px 30px
            b
              font-size 50px
              color #da4a4a
            em
              color #da4a4a
              font-size 30px
          .hot-i2
            color #ab9c93
            font-size 20px
            margin-left 10px
            a
              color #ab9c93
              text-decoration line-through
          .hot-i3
            display block
            font-size 30px
            color #e15e5e
            display inline-block
            border 1px solid #da4a4a
            border-radius 6px
            text-align center
            height 46px
            width 150px
            line-height 46px
            font-weight 600
            margin 25px 0 0 30px
        .index-hot-div1-img
          display block
          width 320px
          height 100%
          float left
      .index-hot-img
        display block
        width 130px
        position absolute
        right -4px
        top -4px
      .index-hot-div2
        width 690px
        height 80px
        line-height 80px
        background #fff
        margin 0 auto
        img 
          width 48px
          vertical-align middle
          margin-right 10px
        span 
          width 590px
          display inline-block
          vertical-align middle
          ellipsis()
    .index-no1
      height 340px
      overflow hidden
      position relative
      img 
        height 100%
      div
        width 120px
        height 44px
        position absolute
        right 20px
        top 55px
    .index-detail
      height auto
      overflow hidden
      background url('../../images/bg8.png') repeat-y center 
      .index-detail-clomne
        width 710px
        margin 0 auto
        overflow hidden
        font-size 32px
        color #fff
        font-weight 600
        text-align center
        margin-bottom 20px
        .index-detail-clomne-wrap
          overflow hidden
          height auto
          position relative
          .clomne-wrap-img1
            position absolute
            left 0px
            top 0
            width 53px
            z-index 10
          .clomne-wrap-img2
            position absolute
            right 150px
            top 0
            width 64px
            z-index 10
          .clomne-wrap-img3
            position absolute
            left 0px
            top 0
            width 55px
            z-index 10
          .clomne-wrap-img4
            position absolute
            right 0
            top 0
            width 55px
            z-index 10
          .clomne-name 
            height 52px
            line-height 52px
            margin-bottom 30px
            display -webkit-flex
            align-items center
            span 
              text-align center
              display inline-block
              box-sizing border-box
              height 52px
              line-height 52px
              padding 0 20px
              border 1px solid rgb(255, 255, 255)
              flex 0 0 auto
              margin 0 20px
            &:before
              content ''
              flex 1
              display inline-block
              height 1px
              background #fbe44b
              opacity 0.3
              vertical-align middle
            &:after
              content ''
              flex 1
              display inline-block
              height 1px
              background #fbe44b
              opacity 0.3
          ul
            .ul-li1
              width 345px
              height 525px
              background #fff
              overflow hidden
              margin-bottom 25px
              &:nth-child(odd)
                float left
              &:nth-child(even)
                float right
              .clomne-div1
                height 345px
                overflow hidden
                position relative
                .clomne-div1-img1
                  width 100%
                .clomne-div1-firstChild
                  width 92px
                  height 92px
                  // line-height 92px
                  position absolute
                  right 4px
                  bottom 4px
                  overflow hidden
                  background #ec7181
                  border-radius 50%
                  box-sizing border-box
                  display flex
                  align-items center
                  // transform rotate(-45deg)
                  // transform-origin 50% 50%
                  div 
                    // width 40px
                    // height 100%
                    // line-height 24px
                    flex 0.8
                    white-space pre-wrap
                    font-size 26px
                    text-align center
                    // display inline
                    margin 0 auto
                    border 0
                    color #ffffff
                    z-index 101
                    // line-height 92px

                  // img 
                  //   width 92px
                  // span 
                  //   color #e15e5e
                  //   display block 
                  //   height 100%
                  //   line-height 92px
                  //   text-align center
                  //   position absolute
                  //   margin-top 0
                  //   left 50%
                  //   top 50%
                  //   transform translate(-50%,-50%)
                  //   font-size 22px
                  //   white-space nowrap
                .clomne-div1-child
                  width 100%
                  height 100%
                  position absolute
                  left 0px
                  top 0px
                  z-index 110
                  background rgba(0,0,0,0.6)
                  .clomne-div1-child-img1
                    width 92px
                    position absolute
                    right 4px
                    bottom 4px
              span 
                display block
                color #333
                text-align center
                font-size 28px
                margin-top 15px
                margin-bottom 10px
              b
                font-weight 500
                color #999999
                display block
                font-size 22px
                text-align center
                margin-bottom 10px
                font-weight 500
                width 250px
                ellipsis()
                margin 0 auto 10px
              i 
                // display block
                height 42px
                line-height 42px
                font-weight 500
                padding 5px 15px
                color #e15e5e
                border solid 1px #e15e5e
                font-size 26px
            .ul-li2
              height 252px
              background #ffffff
              overflow hidden
              margin-bottom 25px
              .ul-li2-div1
                // float left
                background #f5f5f5
                height 100%
                width 260px
                overflow hidden
                font-weight 500
                position relative
                .ul-li2-div1-img
                  width 100%
                  height 100%
                  display block
                  position absolute
                  left 50%
                  top 50%
                  transform translate(-50%,-50%)
                .ul-li2-div1-child1
                  width 72px
                  height 72px
                  overflow hidden
                  position absolute
                  right 3px
                  bottom 3px
                  // line-height 92px
                  overflow hidden
                  background #ec7181
                  border-radius 50%
                  box-sizing border-box
                  display flex
                  align-items center
                  span
                    flex 0.8
                    white-space pre-wrap
                    font-size 24px
                    text-align center
                    // display inline
                    margin 0 auto
                    border 0
                    color #ffffff
                    z-index 101
                  // img 
                  //   width 100%
                  // span 
                  //   color #e15e5e
                  //   display block 
                  //   height 100%
                  //   line-height 72px
                  //   text-align center
                  //   margin-top 0
                  //   position absolute
                  //   left 50%
                  //   top 50%
                  //   transform translate(-50%,-50%)
                  //   font-size 20px
                  //   white-space nowrap
                .ul-li2-div1-child2
                  position absolute
                  left 0px
                  top 0px
                  width 100%
                  height 100%
                  z-index 110
                  background rgba( 0,0,0,0.6 )
                  img 
                    width 72px
                    position absolute
                    right 3px
                    bottom 3px
              .ul-li2-div2
                height 100%
                width 450px
                background #ffffff
                overflow hidden
                // float right 
                padding-right 10px
                font-size 500
                box-sizing border-box
                span 
                  display block
                  color #333
                  text-align left
                  font-size 32px
                  margin-top 30px
                  margin-bottom 15px
                  margin-left 55px
                b
                  font-weight 500
                  color #999999
                  display block
                  font-size 22px
                  text-align left
                  margin-bottom 10px
                  margin-left 55px
                  width 370px
                  ellipsis()
                  // margin 0 auto 10px
                i 
                  height 42px
                  line-height 42px
                  padding 5px 15px
                  color #e15e5e
                  border solid 1px #e15e5e
                  font-size 26px
                  font-weight 500
                  margin-left 55px
                  float left
    .div-bot
      height 228px
      background url('../../images/bg8.png') repeat-y center
      position relative
      p
        font-size 24px
        color #fff
        text-align center
      img 
        width 100%
        position absolute
        left 0px
        bottom 0px



.floatleft
   float left  
.floatright
  float right
@-webkit-keyframes scrolls {
  0% {
    -webkit-transform : translateY(0)  
  }
  100% {
    -webkit-transform : translateY(-100%) 
  }
}
// @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)
//   .appbot
//     height 322px!important
//   .app-bg6
//     margin-bottom 335px!important
</style>

