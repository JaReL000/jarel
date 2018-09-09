<template>
  <div class="safeBox">
    <x-header>保险箱日增息</x-header>
    <div class="box-one">
      <div class="box-ont-box"  >
        <div class="box-one-content" v-for="(itme,index) in cardList.list" :key="index" v-if="itme.is_money==1">
            <div class="box-one-content-left">
              <p v-text="itme.walf_name"></p>
              <span v-text="itme.interest_type"></span>
            </div>
            <div class="box-one-content-right">
              <div class="smalldiv" v-text="itme.use_limit"></div>
              <p><span v-text="itme.money"></span>元</p>
            </div>
        </div>
        <div class="box-one-content" v-else>
            <div class="box-one-content-left">
              <p v-text="itme.walf_name"></p>
              <span v-text="itme.interest_type"></span>
            </div>
            <div class="box-one-content-right">
              <div class="smalldiv" v-text="itme.use_limit"></div>
              <p><span v-text="itme.money"></span>%</p>
            </div>
        </div>
      </div>
    </div>
    <div class="box-two">
      <div class="button-2">
        <div class="box-two-butotn">
          <div class="two-button-1" @click="skip('3','保险箱')" v-if="cardList.has_safe" >
            保险箱一键转入年定期
          </div>
          <div class="two-button-1" @click="skip('4','日增息')" v-if="cardList.has_daily">
            日增息一键装入年定期
          </div>
        </div>
        <!-- <div class="box-one-button"  style="display:none">
           <span>立即一键转入年定期</span>
        </div> -->

      </div>

    <div class="yearUl">
       <ul>
        <li v-for="(itme,index) in cardList.list" :key="index" v-if="itme.is_money==1">
          <div><span v-text="itme.money"></span>元</div>
          <p v-text="itme.dsc"></p>
        </li>
        <li v-else>
          <div>+<span v-text="itme.money"></span>%
            <p v-if="itme.coupon_rate_days > 0 ">加息<span v-text="itme.coupon_rate_days"></span>天</p>

          </div>
           <p v-text="itme.dsc"></p>
        </li>
      </ul>
    </div>
   </div>
    <div class="box-three">
    </div>
  </div>
</template>

<script>
import xHeader from "@/views/app/components/x-header/index";
import jinrsdk from "src/jinr-sdk/index";
// var Vue = require('vue');
// var VueResource = require('vue-resource');
// Vue.use(VueResource);

export default {
  name: "carrousel",
  components: {
    xHeader
  },
  data() {
    return {
      cardList: []
    };
  },
  computed: {
    orderId() {
      return;
      this.$JinrSDK.orderId;
    },
    isShowCoupon() {
      return this.$JinrSDK.getUrl().isShowCoupon || "1";
    }
  },
  created() {},
  mounted() {
    this.getCardInfo();
  },
  methods: {
    getCardInfo() {
      let params = {
        data: this.$JinrSDK.getUrl().data,
        combinationId: this.$JinrSDK.getUrl().combinationId
      };
      this.$http("/app/newSafeToYearWelfare", params)
        .then(res => {
          console.log(res);
          this.cardList = res;
        })
        .catch(error => {
          console.log("-錯誤", error);
          //  console.log(res.data);
          // this.cardList = res.data;
        });
    },
      // pushOtherAssets(product_name,product_id)
    // skip(product_id,product_name) {
    //   this.$JinrSDK.$flash(product_id, product_name);
    //   this.$JinrSDK.pushProductTurnIn(
    //     product_id.toString(),
    //     product_name,
    //     "2",
    //     "4",
    //     this.cardList.combinationId,
    //     "0",
    //     "0",
    //     this.isShowCoupon
    //   );
    // }

      skip(product_id,product_name) {
      this.$JinrSDK.$flash(product_name);
      this.$JinrSDK.pushOtherAssets(
         product_name,
         product_id.toString()
      );
    }
  }
};
</script>


<style lang="stylus" rel="stylesheet/stylus">
.safeBox {
  width: 100%;
  overflow-x: hidden;
  position: relative;

  .box-one {
    width: 100%;
    height: 1142px;
    background: url('./images/box-one.png') no-repeat center / 100% 1143px;

    .box-ont-box {
      padding-top: 525px;
    }

    .box-one-content {
      width: 606px;
      margin: 11px auto 20px;
      height: 171px;

      .box-one-content-left {
        width: 200px;
        float: left;
        margin: 45px 0 0 31px;

        p {
          font-size: 36px;
          color: #000;
          margin-bottom: 10px;
        }

        span {
          font-size: 30px;
          color: #e33e32;
        }
      }

      .box-one-content-right {
        width: 368px;
        float: right;
        margin: auto;
        text-align: center;

        .smalldiv {
          background-color: #ff8b3d;
          color: #fff;
          padding: 5px 12px;
          margin: 16px -4px 0 0;
          float: right;
        }

        p {
          width: 368px;
          height: 40px;
          color: #e33e32;
          // padding 54px 50px 42px
          margin: 70px auto 42px;
          font-size: 47px;
          line-height 40px;
          span {
            font-size: 95px;
          }
        }
      }
    }
  }

  .box-two {
    width: 100%;
    height: 1173px;
    background: url('./images/box-two.png') no-repeat center / 100% 1174px;

    .button-2 {
      width: 100%;
      height: 250px;
      line-height 250px
      .box-two-butotn {
          width: 100%;
          vertical-align middle
          position: relative; 
          left: 50%; 
          top: 50%; 
          transform: translate(-50%, -50%); 
        .two-button-1 {
          width: 592px;
          height: 94px;
          background: url('./images/button.png') no-repeat center / 100% 94px;
          margin: 0 auto 33px;
          text-align: center;
          color: #ce2635;
          font-size: 36px;
          line-height: 94px;
          font-family: PingFang-SC-Medium;
          
        }
      }

      .box-one-button {
        width: 592px;
        height: 94px;
        background: url('./images/button.png') no-repeat center / 100% 94px;
        margin: 0 auto 0;
        text-align: center;
        font-family: PingFang-SC-Medium;
        position: relative;
        top: 90px;
      }

      span {
        color: #ce2635;
        font-size: 36px;
        line-height: 94px;
      }
    }

    .yearUl {
      margin: auto;
      text-align: center;
      position: relative;
      top: 485px;

      ul {
        width: 560px;
        margin: auto;

        li {
          float: left;
          width: 150px;
          margin-left: 44px;
          text-align: center;
          div {
            width: 98px;
            height: 75px;
            line-height: 30px;
            color: #fff;
            margin: auto;
            padding-top: 8px;
            font-size: 24px;

            span {
              font-size: 30px;
              color: #fff;
              line-height: 30px;
            }
            p{
              font-size: 18px;
              font-weight: normal;
              letter-spacing: 0px;
              color: #ffffff;
              span{
                font-size: 18px!important;
              }
            }
          }

          p {
            font-size: 24px;
          }
        }

        li:nth-of-type(1) {
          margin-left: 5px;
        }
      }
    }
  }

  .box-three {
    width: 100%;
    height: 751px;
    background: url('./images/box-three.png') no-repeat center / 100% 751px;
  }
}

/* ********** 适配pc ********** */
html body {
  max-width: 980px;
  margin: 0 auto;
}

body, html {
  height: 100%;
  width: 100%;

  #app {
    width: 100%;
    height: 100%;
  }
}
</style>
