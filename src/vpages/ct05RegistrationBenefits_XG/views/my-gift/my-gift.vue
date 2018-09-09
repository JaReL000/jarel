<template>
   <div class="my-gift">
       <hd :title="{name:'我的奖品'}"></hd>
       <div class="content" v-if="!!initData.userReceiveData">
          <div class="line">
              <span>&nbsp;&nbsp;重要提示&nbsp;&nbsp;</span>
          </div>
          <p>为确保实物奖品如实送到您手上，请认真填写收货地址并核对信息确认无误，谢谢您的配合！</p>
          <p>请移步至APP里的【设置】-【收货地址】中填写您的收货信息。</p>
          <div class="list-box">
              <div class="title">
                  <p>我已投资：<span v-text="initData.everyCombinationStaticMoney.userInvestmentTotalMoney"></span> 元</p>
                  <p>预计到期收益：<span
                  v-text="(initData.everyCombinationStaticMoney.userInvestmentTotalMoney*0.06*365/365).toFixed(2)"></span> 元</p>
              </div>
              <div class="list">
                  <!-- 可以续投的奖品列表 -->
                  <ul class="Investment-list" v-if="!!initData.everyCombinationStaticMoney.userInvestmentLevel.length">
                     <li v-for="(item,index) in initData.everyCombinationStaticMoney.userInvestmentLevel" :key="item+index"
                       v-if="!!item.display"
                     >
                        <div class="left" :style="`background:url(${gifts[item.level].img}) no-repeat 100%/100%;`"></div>
                        <div class="right">
                           <div>
                              <div>
                                 <p v-text="gifts[item.level].title"></p>
                                 <p>还差<span v-text="item.diffMoney"></span>元即可得</p>
                              </div>
                               <p
                               :class="{'disable-btn':!initData.awardSetData[item.level-1].enable}"
                               v-text="!initData.awardSetData[item.level-1].enable?'已抢完':'继续投资'"
                               @click="_goInvest(item)">
                               继续续投</p>
                           </div>
                           <p>再投<span v-text="item.diffMoney"></span>元就可以把礼物带回家啦</p>
                        </div>
                     </li>
                  </ul>
                  <!-- 已经领取的的奖品列表 -->
                  <ul class="Receive-list" v-if="!!initData.userReceiveData.length">
                     <li v-for="(item,index) in initData.userReceiveData" :key="item+index">
                         <div v-if="!!gifts[item.level]">
                            <div class="left" :style="`background:url(${gifts[item.level].img}) no-repeat 100%/100%;`"></div>
                            <div class="right">
                              <div>
                                  <div>
                                    <p v-text="gifts[item.level].title"></p>
                                    <p>已投<span v-text="gifts[item.level].limt"></span>元</p>
                                  </div>
                                  <p>已获得</p>
                              </div>
                              <p v-text="item.level==1?'已发放至你的鲸鱼账户，请注意查收':'正在为您安排发货，请耐心等待'">正在</p>
                            </div>
                         </div>
                         <p>获得时间：<span v-text="item.getTime"></span></p>
                     </li>
                  </ul>
                  <p v-if="!!initData.userReceiveData.length||!!initData.everyCombinationStaticMoney.userInvestmentLevel.length">没有更多了~</p>
                  <div class="none-gift" v-if="!initData.userReceiveData.length&&!initData.everyCombinationStaticMoney.userInvestmentLevel.length">
                       <div></div>
                       <p>空空如也</p>
                  </div>

              </div>
          </div>
       </div>
   </div>
</template>
<script>
export default {
  data() {
    return {
      gifts: {
        1: {
          title: "5.20元现金红包",
          limt: 1000,
          img: require("./images/my_gift1.png")
        },
        2: {
          title: "鲸鱼定制保温杯",
          limt: 5000,
          img: require("./images/my_gift2.png")
        },
        3: {
          title: "鲸鱼新版公仔4个装",
          limt: 20000,
          img: require("./images/my_gift3.png")
        },
        4: {
          title: "百雀羚  水嫩呵护焕颜套装",
          limt: 35000,
          img: require("./images/my_gift4.png")
        },
        5: {
          title: "周六福珠宝  18k手链",
          limt: 80000,
          img: require("./images/my_gift5.png")
        },
        6: {
          title: "iPhone7 32G",
          limt: 250000,
          img: require("./images/my_gift6.png")
        }
      },
      initData: {}
    };
  },
  mounted() {
    // console.log(this.$route.params)
    this.init();
  },
  methods: {
    init() {
      if (!!Object.keys(this.$route.params).length) {
        this.sessionSet("initData", this.$route.params);
        this.initData = this.$route.params;
      } else if(!!this.sessionGet("initData")){
        this.initData = this.sessionGet("initData");
        console.log('session', this.initData);
      }
    },
    _goInvest(opt) {
      console.log(opt);
      if (!this.initData.awardSetData[opt.level-1].enable) return; // 已经抢完
      // console.log(this.initData.isShowCoupon)
      let combinationId = this.initData.combinationId
      this._isGoInvest(combinationId, this.initData.token)
        .then(res => {
          // console.log("进来了");
          let params = {
            productId: "2",
            productName: "年定期",
            productTypeId: "2",
            fromPage: "4",
            eventRefId: String(opt.combinationId),
            couponId: "",
            couponName: "",
            isShowCoupon: String(this.initData.isShowCoupon)
          };
          this.$JinrSDK.pushProductTurnIn(params);
        })
        .catch(res => {
          this.$flash(res.data);
        });
    }
  }
};
</script>

style.<style lang="scss">
div.my-gift {
  height: 100%;
  background: url("./images/my_gift_bg.png") repeat-y;
  background-size: 750px 23px;
  > div.content {
    // width:750px;
    height: 1206px;
    background: url("./images/my-gift_bg.png") no-repeat 100%/100%;
    padding: 30px 35px 0;
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    div.line {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      margin-bottom: 20px;
      color: #4d2222;
      &::before,
      &::after {
        content: "";
        display: block;
        width: 61px;
        height: 0;
        border-top: 1px solid #4d2222;
      }
    }
    > p {
      &:nth-child(2) {
        color: #4d2222;
        margin-bottom: 30px;
        font-size: 24px;
      }
      &:nth-child(3) {
        font-size: 24px;
        color: #ff3777;
        white-space:nowrap;
      }
    }
    > .list-box {
      position: absolute;
      bottom: 175px;
      left: 0;
      height: 789px;
      width: 100%;
      padding: 0 60px;
      box-sizing: border-box;
      .title {
        text-align: center;
        padding-top: 32px;
        margin-bottom: 15px;
        p {
          color: #000000;
          > span {
            color: #ee2c6b;
          }
          &:first-child {
            font-size: 24px;
            margin-bottom: 5px;
          }
          &:last-child {
            font-size: 28px;
          }
        }
      }
      > div.list {
        padding: 30px 24px;
        height: 735px;
        overflow-x: hidden;
        overflow-y: scroll;
        box-sizing: border-box;
        // box-sizing: border-box;
        ul {
          li {
            height: 150px;
            display: flex;
            margin-bottom: 30px;
            border-bottom: 1px solid #fe558c;
            div.left {
              height: 94px;
              width: 94px;
              margin: 0 30px 30px 0;
            }
            div.right {
              margin-bottom: 30px;
              flex: 1;
              > div {
                display: flex;
                align-items: center;
                justify-content: space-between;
                > div {
                  p {
                    color: #ee2c6b;
                    &:first-child {
                      font-size: 24px;
                      font-weight: 900;
                    }
                    &:nth-child(2) {
                      font-size: 21px;
                    }
                  }
                }
                > p {
                  font-size: 26px;
                  height: 57px;
                  width: 167px;
                  line-height: 57px;
                  text-align: center;
                  background: #ee2c6b;
                  color: #fff;
                  &.disable-btn {
                    background: #a1a1a1;
                  }
                }
              }
              > p {
                font-size: 20px;
                margin-top: 5px;
                > span {
                  color: #ee2c6b;
                }
              }
            }
          }
          &.Receive-list {
            li {
              display: block;
              height: 185px;
              > div {
                display: flex;
                div.left {
                  margin-bottom: 15px;
                }
                div.right {
                  margin-bottom: 15px;
                  > div {
                    > p {
                      background: #ff95b7;
                    }
                  }
                }
              }
              > p {
                margin-bottom: 25px;
                font-size:18px;
              }
            }
          }
        }
        > div.none-gift {
          div {
            width: 200px;
            height: 200px;
            background: url("./images/my_gift_none.gif") no-repeat 100%/100%;
            margin: 180px auto 60px;
          }
          > p {
            text-align: center;
          }
        }
        >p{
          text-align: center;
        }
      }
    }
  }
}
</style>

