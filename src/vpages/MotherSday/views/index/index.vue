<template>
   <div class="MotherSday" v-if="show">
      <hd :title="{name:'母亲节加息又送礼'}"></hd>
      <div class="top-section">
          <div class="top-slide">
              <Slide
              :options="{direction:'left'}"
              :data="ListData"
              >
                <ul>
                  <li v-for="(item,index) in ListData" :key="item+index">
                      <div class="left">
                          恭喜<span v-text="item.mobile"></span>获得
                          <span v-text="level[item.level-1]"></span>
                      </div>
                      <div class="right" v-text="item.getTime"></div>

                  </li>
                </ul>
              </Slide>
          </div>
          <div class="MotherSday-content">
            <div class="MotherSday-countdown">
                <Countdown :times="times"></Countdown>
            </div>
             <div class="btn" @click="_goMyGift">点击查看我的奖品>></div>
             <p>仅可通过本活动的【投资按钮】投资才能获得礼物哦</p>
          </div>
      </div>
      <div class="center-section">
           <div v-for="(item,index) in giftsList_BaseData" :key="item+index" v-if="!!giftsList[index]">
               <div class="heart" v-text="item.text"></div>
               <div class="left" :style="`background:url(${item.img}) no-repeat 100%/100%;`"></div>
               <div class="right">
                  <h3 v-text="item.title"></h3>
                  <p >投资年定期<span v-text="giftsList[index].money"></span>元可免费得</p>
                  <div
                  @click="_goInvest(giftsList[index])"
                  :class="!!giftsList[index].enable?'btn':'btn disable-btn'"
                  v-text="!!giftsList[index].enable?'立即投资':'已抢光'">
                  </div>
                  <p>预计到期收益<span v-text="item.earnings"></span>元</p>
               </div>
               <div class="limit" v-if="!!giftsList[index].limit">限量
                 <span v-text="giftsList[index].limit"></span>
               </div>
           </div>
      </div>
      <div class="bottom-section"></div>
   </div>
</template>
<script>
export default {
  data() {
    return {
      ListData: [],
      level: [
        "5.20现金红包",
        "鲸鱼保温杯",
        "鲸鱼保温杯",
        "鲸鱼新版公仔",
        "百雀羚",
        "周六福珠宝",
        " iphone7"
      ],
      times: 0, // 倒计时秒
      giftsList_BaseData: [
        {
          title: "5.20元现金红包",
          text: "母",
          earnings: 60,
          img: require("./images/center_section_gift0.png")
        },
        {
          title: "鲸鱼定制保温杯",
          text: "亲",
          earnings: 300,
          img: require("./images/center_section_gift1.png")
        },
        {
          title: "鲸鱼新版公仔4个装",
          text: "节",
          earnings: 1200,
          img: require("./images/center_section_gift2.png")
        },
        {
          title: "百雀羚  水嫩呵护焕颜套装",
          text: "快",
          earnings: 2100,
          img: require("./images/center_section_gift3.png")
        },
        {
          title: "周六福珠宝  18k手链",
          text: "乐",
          earnings: 4800,
          img: require("./images/center_section_gift4.png")
        },
        {
          title: "iPhone7 32G",
          text: "!",
          earnings: 15000,
          img: require("./images/center_section_gift5.png")
        }
      ],
      giftsList: [],
      isBtnClick: true, // 按钮是否可以点击
      initData: {},
      show: false
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    combinationId() {
      return this.$JinrSDK.getUrl().combinationId;
    },
    token() {
      return this.$JinrSDK.getUrl().token;
    },
    isShowCoupon() {
      return this.$JinrSDK.getUrl().isShowCoupon;
    }
  },
  methods: {
    init() {
      this.show = false;
      let params = {
        combinationId: this.combinationId,
        token: this.token
        // debug: "1",
        // userId: "100008857"
      };
      this.$http("/activity/Motherday/getInitData", params, "post").then(
        ({ data: res }) => {
          // console.log("-kkkkkkkk--", res);
          this.show = true;
          this.$nextTick(() => {
            this.initData = res;
            this.ListData = res.onlineLiveRollData; // 顶部滚动
            this.giftsList = res.awardSetData; // 中部礼品
            // this.giftsList[0].enable = 0;
            this.times = res.countDowmTime;
            // console.log('jjjjjjj', this.times)
          });
        }
      );
      // this._getSlide();
    },
    _goMyGift() {
      // 跳转至我的奖品页面
      let params = Object.assign(this.initData, {
        token: this.token,
        combinationId: this.combinationId,
        isShowCoupon: this.isShowCoupon
      });
      this.$router.push({ name: "myGift", params: this.initData });
    },
    _goInvest(opt) {
      console.log(opt);
      if (!opt.enable) return; // 已经抢完
      this._isGoInvest(this.combinationId, this.token)
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
            isShowCoupon: String(this.isShowCoupon)
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
<style lang="scss">
.MotherSday {
  width: 100%;
  overflow-x: hidden;
  .top-section {
    width: 100%;
    height: 1005px;
    background: url("./images/top_section_bg.png") no-repeat 100%/100%;
    padding: 0 27px;
    box-sizing: border-box;
    position: relative;
    .slide-box {
      background: #ff729f;
      border-radius: 20px;
    }
    .top-slide {
      padding-top: 10px;
      position: relative;
      overflow-y: hidden;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-32%);
        width: 50px;
        height: 35px;
        display: block;
        background: url("./images/top_section_ horn.png") no-repeat center;
        background-size: 34px 30px;
        margin-right: 10px;
        background-color: #ff729f;
        border-radius: 20px 0 0 20px;
        z-index: 1;
      }
      ul {
        li {
          color: #fff;
          font-size: 21px;
          height: 40px;
          overflow: hidden;
          line-height: 40px;
          box-sizing: border-box;
          padding: 0 24px 0 60px;
          display: flex;
          justify-content: flex-start;
          > div {
            height: 100%;
            line-height: 45px;
          }
          div.left {
            float: left;
            display: flex;
            // flex:50%;
            justify-content: flex-start;
            align-items: center;
            white-space:nowrap;
            margin-right:50px;
          }
          // div.right {
          //   float: right;
          // }
        }
      }
    }
    .MotherSday-content {
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      // height:218px;
      text-align: center;
      .MotherSday-countdown {
        // margin:0 auto;
        color: #ee2c6b;
        font-size: 24px;
        margin-bottom: 53px;
      }
      div.btn {
        height: 60px;
        width: 376px;
        line-height: 60px;
        color: #fff;
        font-size: 24px;
        background: #ff3777;
        margin: 0 auto 24px;
      }
      > p {
        margin-bottom: 10px;
        color: #ee2c6b;
      }
    }
  }
  .center-section {
    width: 100%;
    height: 2035px;
    background: url("./images/center_section_bg.png") no-repeat 100%/100%;
    padding: 0 7px;
    > div {
      height: 337px;
      background: url("./images/center_section_list_box_bg.png") no-repeat 100%/100%;
      position: relative;
      display: flex;
      box-sizing: border-box;
      padding: 78px;
      > div.heart {
        position: absolute;
        top: 5px;
        left: 20px;
        width: 73px;
        height: 76px;
        background: url("./images/center_section_list_heart.png") no-repeat 100%/100%;
        text-align: center;
        line-height: 76px;
        color: #fff;
      }
      > div.left {
        width: 176px;
        height: 176px;
        margin-right: 43px;
      }
      > div.right {
        h3 {
          line-height: 50px;
          font-size: 30px;
          color: #ee2c6b;
          font-weight: 900;
        }
        p {
          > span {
            color: #ee2c6b;
          }
          &:nth-child(2) {
            font-size: 24px;
            line-height: 38px;
            margin-top: 5px;
          }
          &:nth-child(4) {
            color: #534d4d;
            font-size: 20px;
            line-height: 42px;
          }
        }
        > div.btn {
          height: 57px;
          width: 377px;
          background: #ee2c6b;
          text-align: center;
          line-height: 57px;
          color: #fff;
          font-size: 28px;
          // margin-top:15px;
        }
        > div.disable-btn {
          background: #a1a1a1;
        }
      }
      > div.limit {
        position: absolute;
        top: 0;
        right: 58px;
        top: 50px;
        height: 42px;
        width: 113px;
        background: #fe558c;
        color: #fff;
        text-align: center;
      }
    }
  }
  .bottom-section {
    height: 696px;
    background: url("./images/bottom_section.png") no-repeat 100%/100%;
  }
}
</style>


