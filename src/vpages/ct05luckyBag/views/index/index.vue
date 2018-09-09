<template>
   <div class="ct05luckyBag" v-if="!!show">
      <hd :title="{name:'幸运福袋'}"></hd>
      <div class="top-section" :style="`background:url(${topSectionBg[cards.length]||''}) no-repeat 100%/100%`" v-if="!!cards.length">
          <div class="tow-cards" v-if="cards.length==2">
             <div class="card" v-for="(item,index) in cards" :key="item+index">
                <p><span v-text="!!parseFloat(item.use_money_min||0)?`满${item.use_money_min}元可用`:'无门槛'"></span></p>
                <p v-text="item.rpcfg_name||item.coupon_type_name"></p>
                <p v-text="!!parseFloat(item.rpcfg_rate||item.coupon_rate)?`${parseFloat(item.rpcfg_rate||item.coupon_rate).toFixed(1)}%`:`${item.mode_min||item.rand_money_max}元`"></p>
                <p class="specific" v-if="item.productName" v-text="item.productName"></p>
             </div>
          </div>
          <div class="three-cards" v-else>
              <div class="card" v-for="(item,index) in cards" :key="item+index">
                <p><span>无门槛</span></p>
                <p v-text="item.rpcfg_name||item.coupon_type_name"></p>
                <p v-text="`${parseFloat(item.rpcfg_rate||item.coupon_rate).toFixed(1)}%`"></p>
                <p class="specific" v-if="item.productName" v-text="item.productName"></p>
              </div>
          </div>
          <div class="btn"
          :style="`background:url(${btn_imgs[userData.btnState]}) no-repeat 100%/100%`"
          @click="_showCp"
          ></div>
      </div>
      <div class="bottom-section">
          <h4>限量放送，还剩<span v-text="userData.surplusNum+'份'"></span>福袋</h4>
          <div class="Listroll">
            <Slide
              :options="{direction:'up'}"
              :data="ListData"
              >
                <ul>
                  <li v-for="(item,index) in ListData" :key="item+index">
                      <div class="left">
                         <div>
                            <p v-text="item.mobile"></p>
                            <p v-text="item.getTime"></p>
                         </div>
                      </div>
                      <div class="right">抢到幸运福袋</div>
                  </li>
                </ul>
             </Slide>
          </div>
      </div>
      <!-- <div class="bottom-section"></div> -->
      <components :is="cp" v-model="show" @GoUse="_goUse"></components>
   </div>
</template>
<script>
import dialog from "./dialog";
export default {
  data() {
    return {
      ListData: [],
      userData: {
        btnState: 1,
        surplusNum: 0, //剩余数量
        userLogin: "" // 是否登录
      },
      cp: null,
      cpShow: false,
      btn_imgs: [
        require("./images/top_section_btn0.png"),
        require("./images/top_section_btn1.png"),
        require("./images/top_section_btn2.png")
      ],
      topSectionBg: {
        2: require("./images/top_section_bg_twos.png"),
        3: require("./images/top_section_bg_threes.png")
      },
      show: false,
      cards: []
    };
  },
  mounted() {
    this.init();
    // this.$flash({
    //   message:{
    //     combinationId:this.combinationId,
    //     token:this.token
    //   }
    // })
    // this.sessionSet("token", this.AppToken);
  },
  created() {
    this.getCardCofig();
  },
  computed: {
    combinationId() {
      return this.$JinrSDK.getUrl().combinationId;
    },
    token() {
      return this.$JinrSDK.getUrl().token;
    },
    AppToken() {
      return this.$JinrSDK.token;
    }
    // isShowCoupon() {
    //   return this.$JinrSDK.getUrl().isShowCoupon;
    // }
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
      this.$http("/activity/welfareformay/initData", params).then(
        ({ data: res }) => {
          this.show = true;
          this.$nextTick(() => {
            this.ListData = res.allReceiveData;
            this.userData.surplusNum = res.surplusNum;
            if (res.isUserReceive === 0) {
              if (res.surplusNum > 0) {
                this.userData.btnState = 0; // 未领取且有剩余福袋
              } else {
                this.userData.btnState = 2; // 未领取且没有剩余的福袋
              }
            } else {
              this.userData.btnState = 1; // 已经领取
            }
            // this.userData.btnState = 0 //test
          });
        }
      ).catch(error=>{
        console.log('eror', error)
      });
    },
    _showCp() {
      let userData = this.userData;
      console.log(userData.btnState);
      if (userData.btnState == 0) {
        let res = this._receive();
      } else if (userData.btnState == 1) {
        this._goUse();
      }
    },
    _goUse() {
      window.location.href = `/app/4.0/index.html#/welfare/myCore?AppToken=${
        this.AppToken
      }`;
    },
    async _receive() {
      let params = {
        combinationId: this.combinationId,
        token: this.token
      };
      let res = await this.$http(
        "/activity/welfareformay/sendUserGiftAward",
        params
      );
      if (res.code == 10000) {
        this.show = true;
        this.cp = dialog; // 显示模态框
      } else {
        this.$flash(res.data);
      }
    },
    async getCardCofig() {
      let params = {
        combinationId: this.combinationId
      };
      const { data: res } = await this.$http(
        "/activity/common/getBindAwardData",
        params
      );

      const { coupon, experienceRedPacket } = res;
      if (!!coupon.length) {
        // 卡卷
        const couponName = {
          0: "所有产品",
          2: "年定期 ",
          6: "月定期",
          7: "季定期"
        };
        const coupon_type_name = {
          1: "加息劵",
          2: "抵扣劵",
          3: "免手续费",
          4: "火箭券"
        };
        coupon.forEach((item, i) => {
          let opt = Object.assign({}, item);
          opt.productName = couponName[opt.productid];
          opt.coupon_type_name = coupon_type_name[opt.coupon_type];
          this.cards.push(opt);
        });
      }
      // test
      // experienceRedPacket[0] = {
      //   rpcfg_name: "现金红包",
      //   rpcfg_type: 1,
      //   rpcfg_rate: 4.203
      // };
      if (!!experienceRedPacket.length) {
        const envelope = {
          1: "理财红包",
          2: "现金红包"
        };
        experienceRedPacket.forEach((item, i) => {
          let opt = Object.assign({}, item);
          opt.coupon_type_name = envelope[opt.coupon_type];
          this.cards.push(opt);
          console.log(this.cards.length);
        });
      }
    }
  },
  watch: {
    show(isShow) {
      if (!isShow) {
        this.cp = null;
        this.init();
      }
    }
  }
};
</script>
<style lang="scss">
.ct05luckyBag {
  width: 100%;
  overflow-x: hidden;
  .top-section {
    width: 100%;
    height: 1148px;
    // background: url("./images/top_section_bg.png") no-repeat 100%/100%;
    padding: 0 27px;
    box-sizing: border-box;
    position: relative;
    .btn {
      width: 596px;
      height: 105px;
      background: url("./images/top_section_btn1.png") no-repeat 100%/100%;
      position: absolute;
      bottom: 15px;
      left: 50%;
      transform: translateX(-50%);
    }
    .tow-cards,
    .three-cards {
      width: 437px;
      position: absolute;
      top: 400px;
      left: 50%;
      display: flex;
      justify-content: center;
      transform: translate(-50%);
      text-align: center;
      color: #f5563c;
      .card {
        width: 192px;
        // background: hotpink;
      }
      p {
        &:first-child {
          margin-top: 10px;
          span {
            background: #fa3619;
            padding: 0 5px;
            font-size: 22px;
            color: #fff;
          }
        }
        &:nth-child(2) {
          font-size: 28px;
        }
        &:nth-child(3) {
          font-size: 40px;
        }
        &.specific {
          color: #6e4e13;
          // margin-top:5px;
          font-size: 24px;
        }
      }
    }
    .tow-cards {
      .card {
        position: absolute;
        // height: 100px;
        // background: hotpink;
        &:first-child {
          left: 18px;
          top: 35px;
          transform: rotateZ(-15deg);
        }
        &:last-child {
          right: 10px;
          top: 25px;
          transform: rotateZ(8deg);
        }
      }
    }
    .three-cards {
      width: 624px;
      .card {
        position: absolute;
        top: 25px;

        &:first-child {
          left: 50px;
          top:60px;
          transform: rotateZ(-20deg);
        }
        &:nth-child(2) {
          // left: 30px;
          left:240px;
          z-index:2;
        }
        &:last-child{
          top:45px;
          right:10px;
          transform: rotateZ(26deg);
        }
      }
    }
  }
  .bottom-section {
    width: 100%;
    height: 1015px;
    background: url("./images/bottom_section_bg.png") no-repeat 100%/100%;
    h4 {
      text-align: center;
      // width: 425px;
      margin: 0 auto;
      padding-top: 5px;
      color: #fff;
      font-size: 32px;
      white-space:nowrap;
      > span {
        color: #ffbb4e;
      }
    }
    .Listroll {
      padding: 60px;
      color: #fbaea2;
      font-size: 28px;
      height: 620px;
      overflow: hidden;
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 130px;
        border-bottom: 1px solid #ce4a4d;
        > div {
          flex: 0 0 auto;
        }
        div.left {
          display: flex;
          justify-content: space-between;
          &::before {
            content: "";
            display: block;
            width: 76px;
            height: 76px;
            border: 5px;
            background: url("./images/bottom_section_left_logo.png") no-repeat
              100%/100%;
            margin-right: 10px;
          }
          p {
            &:first-child {
              margin-bottom: 5px;
            }
            &:last-child {
              font-size: 21px;
            }
          }
        }
        div.right {
          background: #cb252e;
          padding: 5px 20px;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>


