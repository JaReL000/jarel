<template>
   <div class="ct05hundredMillion" >
      <hd :title="{name:'亿万红包大派送'}"></hd>
      <div class="top-section">
         <div class="time">
            <countdown :times="times"></countdown>
         </div>
         <div class="left-section">
              <p>累计发放：<span v-text="totalMoney"></span>元理财红包</p>
              <div class="scroll">
              <Slide
              :options="{direction:'up'}"
              :data="ListData"
              >
                <ul>
                  <li v-for="(item,index) in ListData" :key="item+index">
                      <div>
                         <span v-text="_changeAppTopListTime(item.timestamp)
                         "></span><span v-text="item.mobile"> &nbsp;&nbsp;</span>投资<span v-text="item.productName"></span>获得<span v-text="item.money"></span>元理财红包
                      </div>

                  </li>
                </ul>
             </Slide>
              </div>
         </div>
      </div>
      <div class="center-section">
        <ul>
           <li
           v-for="(item,index) in imgs" :key="item+index"
           :style="`background:url(${imgs[index]}) no-repeat 100%/100%;`"
           >
             <div class="btn" @click="__goInvest(index)"></div>
           </li>
        </ul>
         <div class="my-record">
            <div class="login" v-if="!!isLogin">
              <h4 v-if="!!myRollData.length">累计领取：<span v-text="myTotalMoney +'元'"></span><span>理财红包</span></h4>
              <div class="roll" v-if="myRollData.length">
                <Slide
                  :options="{direction:'up'}"
                  :data="myRollData"
                  :step ="0.5"
                  :isPlayNum="4"
                  >
                    <ul>
                      <li v-for="(item,index) in myRollData" :key="item+index">
                          <div class="left" v-text="item.showTime"></div>
                          <div class="right" v-text="item.showTxt"></div>
                      </li>
                    </ul>
                </Slide>
              </div>
              <div class="none" v-else>
                  暂无领取记录
              </div>
            </div>
            <div class="no_login" v-else>
                请登录后查看
            </div>
         </div>
      </div>
      <div class="bottom-section">

      </div>
   </div>
</template>
<script>
// import dialog from "./dialog";

export default {
  data() {
    return {
      ListData: [],
      userData: {
        btnState: 1,
        surplusNum: 0, //剩余数量
        userLogin: "" // 是否登录
      },
      imgs: [
        require("./images/center_section_content_0.png"),
        require("./images/center_section_content_1.png"),
        require("./images/center_section_content_2.png"),
        require("./images/center_section_content_3.png")
      ],
      eventRefId: "", // 活动事件id
      show: false,
      myRollData: [],
      myTotalMoney: 0, // 我的领取的理财红包
      totalMoney:0, // 总共发放的理财红包
      isLogin:0,
      times: 0
    };
  },
  mounted() {
    this.init();
    // this.sessionSet("token", this.AppToken);
  },
  created() {
    // this.getCardCofig();
  },
  computed: {
    datas() {
      return this.$JinrSDK.getUrl().data;
    },
    combinationId() {
      return this.$JinrSDK.getUrl().combinationId;
    },
    token() {
      return this.$JinrSDK.getUrl().token;
    },
    AppToken() {
      return this.$JinrSDK.token;
    },
    isShowCoupon() {
      return this.$JinrSDK.getUrl().isShowCoupon;
    }
  },
  methods: {
    init() {
      // this.times = 500;
      // this.show = false;
      let params = {
        combinationId: this.combinationId,
        data: this.datas
        // token: this.token,
        // debug: "1",
        // userId: "100131500"
      };
      this.$http("/activity/Youinvestmenttomoney/getInitData", params).then(
        ({ data: res }) => {
          this.show = true;
          

          this.$nextTick(() => {
            this.ListData = res.rollData;
            this.eventRefId = res.combinationId;
            this.times = res.countDownTime;
            this.myRollData = res.myRecordAwardData;
            this.myTotalMoney = res.myGetTotalMoney;
            this.totalMoney = res.pariticanMoney;
            this.isLogin = res.userLogin
          });
        }
      );
    },
    _changeAppTopListTime(time) {
      // 修改app顶部轮播
      let _temp = Math.floor((Date.now() - time * 1000) / 86400 / 1000);
      if (_temp > 0) {
        // 大于1天，显示天
        return _temp + "天前";
      } else {
        // 小于一天，大于一小时
        let _temp1 = Math.floor((Date.now() - time * 1000) / 3600 / 1000);
        if (_temp1 > 0) {
          return _temp1 + "小时前";
        }
        // 大于一分钟，小于一小时
        let _temp2 = Math.floor((Date.now() - time * 1000) / 60 / 1000);
        if (_temp2 > 0) {
          return _temp2 + "分钟前";
        }
        return "刚刚";
      }
    },
    async __goInvest(index) {
      try {
        let isGo = await this._isGoInvest(this.combinationId, this.token);
        let baseParams = {
          productId: "",
          productName: "",
          productTypeId: "",
          fromPage: "4",
          eventRefId: String(this.eventRefId),
          couponId: "",
          couponName: "",
          isShowCoupon: String(this.isShowCoupon)
        };
        //  if()
        // console.log(isGo)
        if (isGo.code == 10000) {
          let params = Object.assign(baseParams, this.typeConfig[index]);
          // console.log('params', params)
          // 跳投资页面
          this.$JinrSDK.pushProductTurnIn(params);
        }else{
          this.$flash(isGo.data)
        }
      } catch (error) {
        console.log(error);
        // console.log(isGo);
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
.ct05hundredMillion {
  width: 100%;
  overflow-x: hidden;
  .top-section {
    width: 100%;
    height: 811px;
    background: url("./images/top_section_bg.png") no-repeat 100%/100%;
    position: relative;
    > .time {
      position: absolute;
      top: 535px;
      left: 50%;
      transform: translate(-50%);
      height: 75px;
      line-height: 75px;
    }
    > .left-section {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 20px;
      overflow: hidden;
      > p {
        margin-top: 15px;
      }
      p,
      li {
        height: 50px;
        text-align: center;
        width: 475px;
        border: 4px solid #000;
        border-radius: 25px;
        line-height: 58px;
        background: #feb840;
        // margin-top: 15px;
      }
      .scroll {
        height: 110px;
        overflow-y: hidden;
        margin-top: 10px;
        ul {
          li {
            width: auto;
            padding: 5px 20px;
            height: 35px;
            line-height: 42px;
            margin-top: 10px;
            text-align: left;
            display: inline-block;
            > div {
              font-size: 16px;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
  .center-section {
    width: 100%;
    height: 1393px;
    background: url("./images/center-section_bg.png") no-repeat 100%/100%;
    position: relative;
    > ul {
      padding: 0 54px;
      overflow: hidden;
      li {
        width: 100%;
        height: 238px;
        // margin-top:33px;
        position: relative;
        div.btn {
          position: absolute;
          right: 26px;
          bottom: 50px;
          height: 60px;
          width: 270px;
          // background: hotpink;
        }
        &:first-child {
          div.btn {
            bottom: 35px;
          }
        }
      }
    }
    > .my-record {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 25px;
      // background: hotpink;
      width: 658px;
      height: 211px;
       h4{
         text-align: center;
         line-height: 45px;
         font-size:32px;
         margin:10px 0;
         >span{
           color:#ff6921;
         }
       }
      .roll {
        width: 100%;
        height: 130px;
        overflow: hidden;
        li{
          display: flex;
          justify-content: space-between;
          font-size:21px;
          padding:0 35px;
          white-space: nowrap;
          height:35px;
          div{
             line-height: 30px;
            &:first-child{
              flex:30%;
            }
            &:last-child{
              flex:80%;
            }
          }
        }
        //  margin:0 auto;
      }
      .none,.no_login{
        font-size:32px;
        text-align:center;
        line-height:211px;
      }
    }
  }
  .bottom-section{
    width:100%;
    height:946px;
    background:url('./images/bottom_section_bg.png') no-repeat 100%/100%;
  }
}
</style>


