<template>
<!-- 收益估算 -->
  <div class="detail-reckon">
    <div class="dr-main">
      <h2>收益估算 <span v-text="isDay ?　'(1个月)': '('+investDays+'天)'　"></span></h2>
      <ul class="mind">
        <li v-for="(item, index) in reckonList" :key="index">
          <div class="mind-top">
            <span v-text="item.money"></span>
            <label>元</label>
          </div>
          <p v-text="item.text"></p>
        </li>
      </ul>
      <div class="pics">
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li
              class="pic-item"
              v-for="(pic, index) in gunList"
              :key="index"
              :style="`width: ${width}px`"
              >
              <span :style="`width: ${width}px`">{{pic}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="tips">
      <h1 v-text="textTips"></h1>
    </div>
  </div>
</template>

<script>
  import BScroll  from 'better-scroll'
  export default {
    props: {
      rateAll: {
        type: String
      },
      bankRate: {
        type: String
      },
      investDays: {
        type: Number
      },
      ptypeid: {
        type: Number
      }
    },
    data () {
      return {
        timer: null,
        picScroll: null,
        scroll: null,
        picScroll: null,
        textTips: '左右滑动，估算收益',
        reckonList: [
          { money: 0, text: '银行同期' },
          { money: 0, text: '投资金额' },
          { money: this._money(10000, this._rate(this.rateAll), this.day), text: '预期收益' },
        ],
        defMoney: 10000,
        width: '', // 常规100px
      }
    },
    computed: {
      gunList(){
        let moneyArr = [];
        let moneyVal = 1000;
        for (let index = 1; index < 51; index++) {
          moneyArr.push(moneyVal*index)
        }
        return moneyArr
      },

      isDay(){
        let bool = (this.ptypeid===1 || this.ptypeid===5 || this.ptypeid===6)
        // console.log(bool);

        return bool
      },

      // 天数  1为活期 5为周周盈(正式机为6）
      day(){
        return this.isDay ? 30 : this.investDays
      },
    },
    created() {
      this.$nextTick(() => {
        this._initPics();
      });

    },
    mounted() {
      this.reckonList[1].money = this.defMoney
      this.reckonList[0].money = this._money(this.defMoney, this._rate(this.bankRate), this.day)

      // this.reckonList[2].money = this._money(this.defMoney, this._rate(this.rateAll), this.day)
      this.reckonList[2].money = this.isDay && this.ptypeid !== 6  // 周定期为活期特殊情况故增加一判断条件
          ? this._money(this.defMoney, this._rate(this.rateAll), this.day)
          : this._moneyC(this.defMoney, parseFloat(this.rateAll/100), this.day)
    },
    methods: {
      /**
       * 横向滚动
       */
      _initPics() {
        if (this.gunList) {
          let picWidth = 100;
          this.width = picWidth/2
          let width = picWidth  * this.gunList.length ;
          // this.$refs.picList.style.width = width/75 + 'rem';
          this.$refs.picList.style.width =`${width/2}px`;
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,
              probeType: 3,
              bounce: false,
              startX: -(this.defMoney/20)
              // eventPassthrough: 'vertical'
            }).on('scroll', (pos) => {
              this._calculate(pos.x)

            })
          } else {
            this.picScroll.refresh();
          }
        }
      },

      /**
       * 计算
       * @author weizihua
       * @param { Number } x
       *
       * 活期收益 = ((1+利率)^(天数/365)-1)*本金
       * 定期利息 = 本金*年利率*(天数/365)
       * 周周盈收益 = ？
       */
      _calculate(x){
        let rate = 20 //倍率
        let capital = Math.abs(x) * rate //真正的钱

        this.reckonList[1].money = Math.floor(capital * 100) / 100
        if(this.reckonList[1].money > (this.defMoney*5)){
          this.reckonList[1].money = this.defMoney * 5
        }
        this.reckonList[0].money = this._money(capital, this._rate(this.bankRate), this.day)
        // console.log(this._money(capital, this._rate(this.rateAll), this.day));
        // console.log(this._moneyC(capital, parseFloat(rate/100), this.day));
        // this.reckonList[2].money = this._money(capital, this._rate(this.rateAll), this.day)

        this.reckonList[2].money = this.isDay && this.ptypeid !== 6  // 周定期为活期特殊情况故增加一判断条件
          ? this._money(capital, this._rate(this.rateAll), this.day)
          : this._moneyC(capital, parseFloat(this.rateAll/100), this.day)
      },

      //计算利率
      _rate(rate){
        return (1 + parseFloat(rate/100))
      },

      /**
       * @author weizihua
       * capital 真正的前
       * lilv 利率
       * cycle 周期
       */
      _money(capital, lilv, day){
        let cycle =  day/365
        let shouyi = (Math.pow(lilv, cycle)-1) * capital
        return Math.floor(shouyi * 100) / 100
      },
      // 本金*年利率*(天数/365)
      _moneyC(capital, lilv, day){
        let shouyi = capital*day*lilv/365

        return Math.floor(shouyi * 100) / 100
      },
    }
  }
</script>

<style lang="stylus">
@import '~style/mixin.styl'

// 收益估算
.detail-reckon
  font-size 30px
  padding-bottom: 20px
  background $color-light-grey-def
  &>div.dr-main
    background #fff
    padding-bottom 8px
  &>div.tips
    position relative
    line-height 80px
    font-size 26px
    text-align center
    background-color #fff
    color #cccccc
    &:after
      content ''
      position absolute
      left 50%
      top 50%
      width 500px
      transform translate3d(-50%, -50%, 0)
      border-bottom 1px #e7e7e7 solid
    h1
      position relative
      z-index 1
      width 270px
      margin 0  auto
      background-color #fff
  h2
    padding-left 32px
    line-height 110px
    span
      padding-left 10px
      font-size 26px
      color #a0a0a0
  ul.mind
    text-align center
    font-size 0
    li
      display inline-block
      width 33.2%
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      label
        font-size 24px
      span
        font-size 30px
        line-height 42px
      p
        font-size 26px
        line-height 38px
        color #999999
      &:nth-child(2)
        .mind-top
          color mainColor
      &:nth-child(3)
        .mind-top
          color #fc5465
  .pics
    padding: 18px 0 0
    .title
      margin-bottom: 12px
      line-height: 28px
      color: rgb(7, 17, 27)
      font-size: 26px
    .pic-wrapper
      position relative
      width: 100%
      overflow: hidden
      white-space: nowrap
      background-color #f5f5f5
      &::after
        content ''
        position absolute
        height 100%
        width 3px
        left 50%
        top 50%
        transform translate3d(-50%, -50%, 0)
        background-color: #0c72e3
      ul.pic-list
        font-size: 0
        padding  0  50%
        text-align right
        background-color #fff
        .pic-item
          position relative
          display: inline-block
          width: 100px
          height: 100px
          font-size: 26px
          background url("./images/rule.png") repeat-x left  bottom
          background-size 100% 50px
          color #777777
          &:last-child
            margin: 0
          span
            position absolute
            top 0
            left 0%
            transform translate3d(50%, 0, 0)
            text-align center

</style>