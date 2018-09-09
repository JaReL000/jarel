<template>
    <!-- intData.url -->
    <div class="newbie">
        <hd :title="{name:'鲸鱼送福利'}"></hd>
        <div class="banner">
            <img :src="intData.url" alt="">
        </div>
        <div class="newbie-content">
            <div class="Card">
                <div class="card-receive" v-if="step===1">
                    <p class="value">
                      <span>+&nbsp;</span><span v-text="cardData.coupon_rate">0.5%</span>
                    </p>
                    <div class="button" @click="receive">
                    </div>
                </div>
                <div class="card-use" v-if="step===2">
                    <p class="value">
                      <span>+&nbsp;</span><span v-text="cardData.coupon_rate">0.5%</span>
                    </p>
                    <div class="button" @click="goUse">
                    </div>
                </div>
                <div class="card-used" v-if="step===3">
                    <p class="value">
                      <span>+&nbsp;</span><span v-text="cardData.coupon_rate">0.5%</span>
                    </p>
                    <div class="button" @click="goUsed">
                    </div>
                </div>
                <!-- card_used.png -->
            </div>
            <div class="conter-title">
                <p>
                  <span></span>
                  <span></span>
                </p>
                &nbsp;限量放送，还剩{{cardDataNum}}张&nbsp;
                <p>
                  <span></span>
                  <span></span>
                </p>
            </div>
            <slide cls="slide-box" :rateValue="cardData.coupon_rate" :data="slideData"></slide>
        </div>
    </div>
</template>
<script>
import slide from "./components/slide";
import hd from './components/x-header'
export default {
  data() {
    return {
      intData: {
        url: ""
      },
      cardData: {},
      slideData: [],
      rateValue: "",
      test: [
        {
          getTime: "2018-04-04 09:30",
          mobile: "第一个"
        },
        {
          getTime: "2018-04-04 09:30",
          mobile: "158****7269"
        },
        {
          getTime: "2018-04-04 09:30",
          mobile: "158****7269"
        },
        {
          getTime: "2018-04-04 09:30",
          mobile: "158****7269"
        },
        {
          getTime: "2018-04-04 09:30",
          mobile: "最后一个"
        }
      ],
      step: 1,
      eventRefId: "",  // 明文combinationId
      isReceive: false, // 判断是否可以领取
      cardDataNum: '',
      cuserid: '' // 用户领取卡卷id
    };
  },
  components: {
    slide,
    hd
  },
  created() {
    this.int();
  },
  computed: {
    isShowCoupon() {
      return this.$JinrSDK.getUrl().isShowCoupon;
    }
  },
  methods: {
    int() {
      // let combinationId = this.combinationId;
      // 获取活动展示数据
      this.$http("/activity/common/getActivityShowItem").then(({ data: res }) => {
        this.intData.url = res.background_image_url;
      });

       //获取活动配置的劵详情 cardData
       this.getCard()

      // 获取活动初始化信息
      this.$http("/activity/Welfareforapp/getInitData").then(({ data: res }) => {
        this.slideData = [...res.allReceiveData];
        this.eventRefId = res.combinationId;
        this.cuserid = res.cuserid;
        // this.isReceive =  res.userReceive === 0 ? true :false // 0表示未领取过
        if( res.userReceive === 0){ // 未领取
          this.isReceive = true
        }else if(res.userReceive === 1){ // 已领取，未使用
          this.step = 2;
        }else if(res.userReceive === 2){ // 已使用
          this.step = 3
        }
      });
    },
    // 领取卡券
    receive() {
      if(!this.isReceive){
        return
      }
      this.$http("/activity/Welfareforapp/sendUserGiftAward").then(res => {
        if (res.code === 10000) {
          // 领取成功，跳转至使用界面
          this.cuserid = res.data
          this.step = 2;
          // 重新请求接口查询剩余劵的数量
          this.getCard()
        } else if (res.code === 10001) {
          // 未登录，提示未登录
          // this.step = 2; // 测试用
          this.$flash(res.data);
        }
      });
    },
    goUse() {
      let cardData = this.cardData;
      let productidName = {
        6: "月定期",
        7: "季定期",
        2: "年定期"
      };
        // this.$messagebox(JSON.stringify({
        // cuserid: this.cuserid||'',
        // name:`${this.cardData.coupon_rate}加息卷`||''
        // }))
      // let
      this.$JinrSDK.pushProductTurnIn(
        String(cardData.productid), // 产品id
        productidName[cardData.productid], // 产品名字
        '2', // 产品类型ID
        '4',
        String(this.eventRefId),
        this.cuserid||'',
        `${this.cardData.coupon_rate}加息卷`||'',
        String(this.isShowCoupon)||'0' // 显示选择卡卷
      );
    },
    goUsed(){
      this.$flash('你已经领取过卡卷，不能重复领取');
    },
    getCard(){
      //获取活动配置的劵详情 cardData
      this.$http("/activity/common/getBindAwardData").then(({ data: res }) => {
        this.cardData = res.coupon[0];
        this.cardData.coupon_rate = parseFloat(this.cardData.coupon_rate).toFixed(1) + "%";
        this.cardDataNum = !res.coupon[0].coupon_total ? 0 : res.coupon[0].coupon_total-res.coupon[0].coupon_send
        // this.rateValue =
        // console.log('res', this.cardData)
      });
    }
  }
};
</script>
<style lang="stylus">
div.newbie {
  width: 100%;
  position: relative;

  img {
    width: 100%;
  }
}

div.newbie-content {
  width: 100%;
  height: 1489px;
  background: url('./images/bg_content.png') no-repeat 100% / 100%;
  margin-top: -10px;

  div.Card {
    width: 100%;
    position: absolute;
    top: 730px;
    left: 0;

    >div {
      position: relative;
      width: 600px;
      height: 368px;
      margin: 0 auto;

      >p.value {
        position: absolute;
        right: 72px;
        top: 54px;
        font-size: 38px;
        color: white;

        >span:last-child {
          font-size: 90px;
        }
      }

      >div.button {
        position: absolute;
        bottom: 58px;
        left: 65px;
        width: 472px;
        height: 80px;
      }

      &.card-receive {
        background: url('./images/card_receive.png') no-repeat 100% / 100%;
      }

      &.card-use {
        background: url('./images/card_use.png') no-repeat 100% / 100%;
      }
      &.card-used {
        background: url('./images/card_used.png') no-repeat 100% / 100%;
      }
    }
  }

  div.conter-title {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 790px;
    color: #ffe6ac;
    font-size: 32px;

    >p {
      span {
        display: inline-block;
        width: 30px;
        height: 0;
        border-top: 1px solid #ffe6ac;
        vertical-align: middle;
      }
    }
  }
}

div.slide-box {
  position: absolute;
  bottom: 182px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 694px;
  height: 580px;
  background: #d92622;
}
</style>


