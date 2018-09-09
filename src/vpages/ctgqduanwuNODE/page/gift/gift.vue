<template>
  <div class="gift">
    <div class="invest-details">
      <div class="details-content">
        <p>累计投资:<span v-text="totalInvest">21000.00</span><span>元</span></p>
        <div>
          <p><span >月定期</span>:<span v-text="monInvest"> 10000.00</span><span>元</span></p>
          <p><span >季定期</span>:<span v-text="quartInvest">6000.00</span><span>元</span></p>
        </div>
        <p><span class="year-span">年定期</span>:<span v-text="yearInvest">5000.00</span><span>元</span></p>
        <div>共获得<span class="tiems" v-text="changces">30</span><span class="tiems">次</span>抽奖机会，已使用<span class="tiems" v-text="usedChances">10</span><span class="tiems">次</span></div>
        <div>累计获得奖品数量：<span class="tiems" v-text="gotGift">10</span><span class="tiems">份</span></div>  
      </div>
    </div>
    <div class="get-gift">
      <div class="gift-details">
        <div v-if="giftList.length<=0">暂无获奖记录
          <p @click="$router.go(-1)">立即去抽奖 </p>
        </div>
        <ul v-else>
          <li v-for="(item,index) in giftList" :key="index">
            <span v-text="item.rank">1</span>
            <span>恭喜获得<span v-text="item.gift"></span></span>
            <span v-text="item.time"></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import {getRequest,pattern} from '../../util/util'
import * as jrUrl from '../../urlconfig/urlconfig'
export default {
  components: {
    
  },
  data () {
    return {
      token: '',
      combinationId: '',
      totalInvest: 0,//累计投资
      monInvest: 0,//月定期
      quartInvest: 0,//季定期
      yearInvest: 0,//年定期
      changces: 0,//已获得抽奖机会
      usedChances: 0,//已使用次数
      gotGift: 0,//累计获得奖品
      giftList: []
    }
  },
  created () {
    pattern()
    this.token = getRequest()['token']
    this.combinationId = getRequest()['combinationId']
    this.getMyAwardData()
  },
  mounted () {
    
  },
  methods: {
    getMyAwardData(){
      let params = {
        combinationId: this.combinationId,
        token: this.token
        // combinationId:"5NUVGIcfFo1gWQfOb3eu8w==",
        // token:"8f17AlNSAQRVAlMGUQRcWVtQUVUHCFoGB1YGUAIGUgdUUgYDU1s4Ul1UBVJSBVhQAVRaVgJQUVQEAwIFXQAAVVBZBQZXVlU9VwJSDkxWD0wIA0JTUwtTAwkEBDpX"
      }
      this.$http(jrUrl.getMyAwardData,params).then(res=>{
        console.log(res,'用户投资数据')
        this.totalInvest = res.userInvestmentData.allInvestment
        if(res.userInvestmentData.productData.length>0){
          res.userInvestmentData.productData.map((val,i)=>{
            if(val.productName === '年定期'){
              this.yearInvest = val.money
            }else if(val.productName === '季定期'){
              this.quartInvest = val.money
            }else if(val.productName === '月定期'){
              this.monInvest = val.money
            }
          })
        }
        this.changces = res.userAllChange
        this.usedChances = res.userUsedChange
        this.gotGift = res.allUserGetGiftCount
        let _arr = ["iPhone 7plus",
        "粽子礼盒",
        "鲸鱼保温杯",
        "8.8元现金红包",
        "8元现金抵扣券",
        "",
        "15元现金红包"]
        if(res.userRecordData.length>0){
          res.userRecordData.map((val,i)=>{
            let data = new Date(val.awardTimestamp*1000)
            val.gift = _arr[val.awardIndex-1]
            val.time = data.pattern("MM/dd HH:mm")
            if(val.awardIndex==6){
              this.giftList.push({
              rank: i+1,
              gift: val.awardMoney+"元理财红包",
              time: val.time
              })
            }else{
              this.giftList.push({
                rank: i+1,
                gift: val.gift,
                time: val.time
              })
            }
            
          })
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.gift
  width 100%
  overflow hidden
  padding-top 80px
  .invest-details
    width 100%
    height 794px
    background url("../../images/gift2.png") no-repeat center/100% 100%
    overflow hidden
    .details-content
      margin-top 544px
      text-align center
      font-size 30px
      line-height 48px
      p
        color #181818
        span 
          color #eb6100
      div
        >p
          display inline-block
          margin 0 10px
          span:nth-of-type(1)
            color #181818
      p
        color #181818
        .year-span
          color #181818
  .get-gift
    width 100%
    background url("../../images/index_bg2.png") repeat center/100% 100%
    .gift-details
      width 100%
      height 631px
      background url("../../images/gift3.png") no-repeat center/100% 100%
      font-size 30px
      line-height 48px
      color #333
      padding-top 127px
      box-sizing border-box
      div
        width 409px
        margin 30px auto 0
        text-align center
        >p
          width 409px
          height 72px
          background #eb6100
          line-height 72px
          text-align center
          border-radius 34px
          font-size 32px
          color #fff
          margin 0 auto
      ul
        width 640px
        height 239px
        margin 0 auto
        padding 0 25px 0
        box-sizing border-box
        overflow-x hidden
        -webkit-overflow-scrolling touch
        li
          >span:last-of-type 
            // width 200px
            // margin-left 30px
            display inline-block
            // text-align right 
            float right  
.tiems
  color #eb6100
a
  display none
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  .index{
    -webkit-overflow-scrolling: none !important//iphoneX滑动卡顿处理  
    }
  }
</style>

