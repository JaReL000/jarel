<template>
  <div class="gift">
    <img class="gift-bg1" src="../../images/i-bg31.png">
    <section class="gift-invest" v-if="$root.log&&totalInvest>0">
      累计投资：<span v-text="totalInvest"></span>元<br/>
      月定期：<span v-text="monInvest"></span>元
      季定期：<span v-text="quartInvest"></span>元<br/>
      年定期：<span v-text="yearInvest"></span>元<br/>
      共获得<span v-text="changces"></span>次抽奖机会，已使用<span v-text="usedChances"></span>次<br/>
      累计获得奖品数量：<span v-text="gotGift"></span>份
    </section>
    <section class="gift-no" v-if="giftList.length<=0">
      <!-- 未获奖 -->
      <p>暂无获奖记录</p>
      <div @click="$router.go(-1)">立即去抽奖</div>
    </section>
    <section class="gift-yes" v-else>
      <!-- 获奖列表 -->
      <ul>
        <li v-for="(item,index) in giftList" :key="index">
          <span v-text="item.rank" style="margin-right:10px;"></span>恭喜获得<span v-text="item.gift"></span>
          <span v-text="item.time"></span>
        </li>
      </ul>
    </section>
    <section class="gift-bot">
      <div>PS：排行榜奖品以活动结束后的最终排名为准</div>
      <p>活动仅限部分地区部分用户参与</p>
      <p>本活动最终解释权归鲸鱼所有</p>
    </section>
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
        let _arr = ['iPhone 7plus','1688元理财红包','鲸鱼公仔4个装','66666元理财红包','6元现金抵扣券','鲸鱼保温杯','15元现金券']
        if(res.userRecordData.length>0){
          res.userRecordData.map((val,i)=>{
            let data = new Date(val.awardTimestamp*1000)
            val.gift = _arr[val.awardIndex-1]
            val.time = data.pattern("MM/dd HH:mm")
            this.giftList.push({
              rank: i+1,
              gift: val.gift,
              time: val.time
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../style/mixin.styl'
.gift
  height auto
  overflow hidden
  background #4610a5
  box-sizing border-box
  padding-top 92px
  .gift-bg1
    width 685px
    display block
    margin 35px auto
  .gift-invest
    height 223px
    text-align center
    overflow hidden
    line-height 46px
    font-size 31px
    color #fff
    span 
      color #ffea00
  .gift-no
    width 685px
    height 420px
    bis1('../../images/i-bg32','.jpg')
    overflow hidden
    margin 210px auto 0
    overflow hidden
    p
      text-align center
      font-size 30px
      color #4610a5
      margin 190px 0 24px 0
    div
      width 409px
      height 72px
      background #eb6100
      line-height 72px
      text-align center
      border-radius 34px
      font-size 32px
      color #fff
      margin 0 auto
  .gift-yes
    width 685px
    height 420px
    bis1('../../images/i-bg32','.jpg')
    overflow hidden
    margin 210px auto 0
    overflow hidden
    ul
      height 235px
      overflow scroll
      margin-top 120px
      -webkit-overflow-scrolling touch
      li
        text-align center
        font-size 28px
        line-height 48px
        color #4610a5
        span 
          display inline-block
        span:nth-of-type(2)
          width 235px
          text-align left
  .gift-bot
    // height 137px
    overflow hidden
    margin-bottom 27px
    div
      font-size 30px
      color #fff
      text-align center
      line-height 48px
      margin 23px 0 20px
    p
      text-align center
      font-size 18px
      color #bfbfbf
</style>
