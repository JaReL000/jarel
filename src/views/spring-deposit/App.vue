<template>
  <div class="content">
      <hd :title = "{name: '加息活动'}"></hd>
      <div class="content-top">
          <!-- <div class="time" v-if= "gameIsEnd">
              加息倒计时: {{gameEndTimes.day}}天{{gameEndTimes.hours}}小时{{gameEndTimes.minutess}}分{{gameEndTimes.seconds}}秒
          </div>
          <div class="time" v-else>加息活动结束</div> -->
      </div>
      <div class="content-bottom">
          <section>
              <span @click="goEnter('2')"></span>
          </section>
          <section>
              <span @click="goEnter('7')"></span>
          </section>
          <section>
             <span  @click="goEnter('6')"></span>
          </section>
      </div>
  </div>
</template>
<script>
import { mapGetters,mapState, mapMutations } from "vuex";
import { setInterval } from 'timers';
import { resolve } from 'url';
import hd from './components/x-header/index'
const form = new FormData()
form.append('combinationId','Eeaeb5NWSXNv6/FpnpoyCA==')
export default {
  data(){
    return {
      timer:'',
      productName: '',  //产品名字
      productTypeId: '2',
      couponId: '0',
      couponName:'0',
      combinationId: '',
      token: '',
      eventRefId: ''
    }
  },
  components:{
    hd
  },
  computed: {
    ...mapState([
      'gameOverTimes'
    ]),
    ...mapGetters(["gameEndTimes", "gameIsEnd"])
  },
  created(){
    console.log('xxxxxxxxxx', this.$JinrSDK)
    this.token = this.getToken()
    this.combinationId = this.$JinrSDK.getUrl().combinationId
    this.getTime()
  },
  mounted(){
    // this.test()
  },
  methods:{
    ...mapMutations([
      'setState',
      'clock'

    ]),
    getTime(){
      const combinationId = this.combinationId
      const token = this.token
      let param = {combinationId,token}
      this.$fetch('/activity/common/getCombinationTimeInfo',param).then((res)=>{
        this.eventRefId = res.data.combinationId
        //  console.log('res---', this.eventRefId)
         let time = new Date().getTime() + res.data.countDownTimestamp*1000
        //  this.$JinrSDK.$msgBox(res.data)
        //  console.log('time', time)
         this.setState({
           name: 'gameOverTimes',
           value: time
         });
         this.countDown()
      })
    },
    // 进入对应的产品线
    goEnter(i){
      this.id = i
      if(i == 2){
        this.productName = '年定期'
      }else if(i==7){
        this.productName = '季定期'
      } else if (i== 6){
        this.productName = '月定期'
      }
      this.getIsEnTer().then((res)=>{
      this.$JinrSDK.pushProductTurnIn(
              this.id,
              this.productName,
              this.productTypeId,
              '4',
              this.eventRefId,
              this.couponId,
              this.couponName,
              '1'
        )
      }).catch((err)=>{
          this.$JinrSDK.$flash(err.data)
      })
    },
    // 判断是否可以进入产品线
    getIsEnTer(){
      const combinationId = this.combinationId
      const token = this.token
      let param = {combinationId,token}
       return new Promise((resolve,reject)=>{
         this.$fetch('/activity/common/isGoInvestEnter',param).then((res)=>{
          // this.$JinrSDK.$msgBox(res)
          this.$flash({
               message:res.data
          })
          if(res.code === 10000){
             resolve()
          }else if (res.code === 10001){
             reject(res)
          }
        }).catch((err)=>{
             reject()
        })
      })


    },
    countDown () {
      if (this.gameOverTimes) {
        this.clock()
        this.timer = setTimeout(this.countDown, 1000)
      }
      // console.log(this.gameOverTimes)
    },
    beforeDestroy () {
      clearTimeout(this.timer)
    },
    // 从url上获取token不是真正的token，和app的token不一样
    getToken(){
       return this.$JinrSDK.getUrl().token
    },
  }
};
</script>
<style lang="stylus">
.content-top
  width: 100%;
  height: 1112px;
  background: url("./images/bg-top.jpg") no-repeat center 100%/100%
  div.time
    position absolute
    top 462px
    left 50%
    background red
    transform translate(-50%,0)
    width 470px
    height 48px
    font-size 28px
    line-height 48px
    border-radius 20px
    text-align center
.content-bottom
  width 100%
  height 1562px
  background url('./images/bg-bottom.jpg') no-repeat 100%/100%
  >section
    position relative
    width:619px;
    height:300px;
    margin 0 auto 30px
    >span
      position absolute
      top 160px
      right 25px
      width 200px
      height 60px
      border-radius 20px
      // background green
    &:first-child
      background url('./images/year.png') no-repeat 100%/100%
      margin-top -5px;
    &:nth-child(2)
      background url('./images/season.png') no-repeat 100%/100%
    &:nth-child(3)
      background url('./images/month.png') no-repeat 100%/100%
</style>
