<template>
<!-- 收益估算 -->
  <div class="detail-reckon">
    <div class="dr-main">
      <!-- <h2>收益估算 <span v-text="isDay ?　'(1个月)': '('+investDays+'天)'　"></span></h2> -->
      <h2>收益估算 <span v-text="`（${investDays}个月）`"></span></h2>
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
    name:'DetailReckon',
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
      ptypeid: { // 还款类型
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
        // reckonList: [
        //   { money: 0, text: '银行同期' },
        //   { money: 10000, text: '投资金额' },
        //   { money: 0, text: '预期收益' }
        // ],
        defMoney: 10000,
        investMoney:10000,
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
    reckonList(){
      // 银行收益
      let temp1 = this._Earnings(this.investMoney,this.investDays,this.bankRate)['1']()
      // 投资金额
      let temp2 = this._keepFoatMoney(this.investMoney);
      // 鲸鱼贷收益
      let key = this.ptypeid == 4 ? this.ptypeid : '1'
      let rate = parseFloat(this.rateAll)/100
      console.log('--rate-',rate)
      let temp3 = this._Earnings(this.investMoney,this.investDays,rate)[key]()
      return [
          { money: temp1, text: '银行同期' },
          { money: temp2, text: '投资金额' },
          { money: temp3, text: '预期收益' }
      ]
    }
    },
    created() {
      this.$nextTick(() => {
        this._initPics();
      });

    },
    mounted() {
      this.initData()
    },
    methods: {
      initData(){
        let reckonList = this.reckonList
        reckonList[0].money =  this._Earnings(10000,this.investDays,this.bankRate)['1']()
      },
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
       * 根据移动比例换算投资金额
       */
      _calculate(x){
        let rate = 20 //倍率
        this.investMoney = Math.abs(x) * rate //真正的钱
      },
      /**
       * 计算投资金额
       */
      _Earnings(investMoney,time,rate){
        let _this = this
        return {
          '1'(){ // 先息后本/还本付息
          // console.log(investMoney,rate,12,time)
            return _this._keepFoatMoney(investMoney*rate/12*time)
          },
          '4'(){ // 等额本息
            return _this._keepFoatMoney((investMoney*rate/12*Math.pow((1+rate/12),time))/(Math.pow((1+rate/12),time)-1))
          }
        }
      }
    }
  }
</script>

<style lang="stylus">
@import '~style/mixin.styl';

// 收益估算
.detail-reckon {
  font-size: 30px;
  padding-bottom: 20px;
  background: $color-light-grey-def;

  &>div.dr-main {
    background: #fff;
    padding-bottom: 8px;
  }

  &>div.tips {
    position: relative;
    line-height: 80px;
    font-size: 26px;
    text-align: center;
    background-color: #fff;
    color: #cccccc;

    &:after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      width: 500px;
      transform: translate3d(-50%, -50%, 0);
      border-bottom: 1px #e7e7e7 solid;
    }

    h1 {
      position: relative;
      z-index: 1;
      width: 270px;
      margin: 0 auto;
      background-color: #fff;
    }
  }

  h2 {
    padding-left: 32px;
    line-height: 110px;

    span {
      padding-left: 10px;
      font-size: 26px;
      color: #a0a0a0;
    }
  }

  ul.mind {
    text-align: center;
    font-size: 0;

    li {
      display: inline-block;
      width: 33.2%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      label {
        font-size: 24px;
      }

      span {
        font-size: 30px;
        line-height: 42px;
      }

      p {
        font-size: 26px;
        line-height: 38px;
        color: #999999;
      }

      &:nth-child(2) {
        .mind-top {
          color: mainColor;
        }
      }

      &:nth-child(3) {
        .mind-top {
          color: #fc5465;
        }
      }
    }
  }

  .pics {
    padding: 18px 0 0;

    .title {
      margin-bottom: 12px;
      line-height: 28px;
      color: rgb(7, 17, 27);
      font-size: 26px;
    }

    .pic-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      background-color: #f5f5f5;

      &::after {
        content: '';
        position: absolute;
        height: 100%;
        width: 3px;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
        background-color: #0c72e3;
      }

      ul.pic-list {
        font-size: 0;
        padding: 0 50%;
        text-align: right;
        background-color: #fff;

        .pic-item {
          position: relative;
          display: inline-block;
          width: 100px;
          height: 100px;
          font-size: 26px;
          background: url('./images/rule.png') repeat-x left bottom;
          background-size: 100% 50px;
          color: #777777;

          &:last-child {
            margin: 0;
          }

          span {
            position: absolute;
            top: 0;
            left: 0%;
            transform: translate3d(50%, 0, 0);
            text-align: center;
          }
        }
      }
    }
  }
}
</style>