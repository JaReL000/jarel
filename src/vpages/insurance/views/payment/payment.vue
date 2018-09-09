<template>
  <div class="orderList" >
     <hd :title="{name:'确认支付'}"
        :leftOptions="{preventGoBack:true}"
        @on-click-back="goBack"
     ></hd>
        <order :orderData="orderDetails" logo="top" @click.native="goOrderDetail"></order>
        <div class="price">
            <span>订单价格</span>
            <span class="money" v-text="orderDetails.trade_money&&parseFloat(orderDetails.trade_money).toFixed(2)"></span>
        </div>
     <!-- </div> -->
     <div class="btn fixed-x">
        <p>需要支付：<span class="money" v-text="parseFloat(orderDetails.trade_money).toFixed(2)"></span></p>
        <p @click="pay">立即支付</p>
     </div>
     <!-- <component :is="cp"

     ></component> -->
     <keyboard
      :orderData="orderDetails"
      :isShowBlankList="show"
      :payType="31"
      @closeBlankList ='show=false'

     ></keyboard>
     <!-- 订单详情 -->
  </div>
</template>
<script>
import order from "../components/order";
import keyboard from "./keyboard";
export default {
  data() {
    return {
      show: false,
      orderDetails: {}
    };
  },
  components: {
    order,
    keyboard
  },
  mounted() {
    // console.log("===", this.orderData);
    this.init();
  },
  computed: {
    orderID() {
      return this.sessionGet("orderID");
    }
  },
  methods: {
    init() {
      let orderNo = this.orderID;
      this.$http(
        "/api/getOrderDetail",
        {
          orderNo
        },
        "get"
      ).then(res => {
        this.orderDetails = res;
      });
    },
    pay() {
      this.show = true;
    },
    goBack() {
      console.log("-------");
      this.$router.replace("/myInsurance?index=3");
    },
    goOrderDetail() {
      let params = {
        orderData: this.orderDetails,
        state: {
          index: 0,
          text: '待支付'
        }
      };
      this.$router.push({ name: "orderDetails", params });
    }
  },
  watch: {
    show(isShow) {
      if (!isShow) {
        this.cp = null;
      }
    }
  }
};
</script>
style.<style lang="scss">
.orderList {
  height: 100%;
  overflow: hidden;
  position: relative;
  background: #f5f5f5;
  // > .content-box {
  > .content {
    margin: 20px 0;
    background: #fff;
    padding-bottom: 20px;
    > h3 {
      height: 104px;
      padding: 28px 0 28px 30px;
      box-sizing: border-box;
      border-bottom: 1px solid #e5e5e5;
      img {
        height: 100%;
      }
    }
    > div {
      padding: 0 30px;
      > h4 {
        font-size: 28px;
        color: black;
        line-height: 90px;
      }
      > div {
        color: #666666;
        line-height: 46px;
        font-size: 26px;
        label {
          padding-right: 10px;
        }
        > p {
          display: flex;
        }
        > div {
          display: flex;
          > p {
            color: #999999;
          }
        }
      }
    }
  }
  > .price {
    height: 107px;
    padding: 0 30px;
    background: white;
    display: flex;
    justify-content: space-between;
    line-height: 107px;
    color: black;
    font-size: 32px;
    > span {
      &:last-child {
        color: #0c72e3;
      }
      // &::before {
      //   content:'¥';
      //   font-size:24px;
      //   padding-right:10px;
      // }
    }
  }
  // }
  > .btn {
    font-size: 28px;
    color: black;
    display: flex;
    width: 100%;
    height: 104px;
    position: absolute;
    left: 0;
    bottom: 0;
    background: #fff;
    line-height: 104px;
    text-align: center;
    > p {
      flex: 1;
      &:first-child {
        text-align: left;
        padding-left: 30px;
        > span {
          color: #0c72e3;
          font-size: 46px;
        }
      }
      &:last-child {
        background: #0c72e3;
        color: #fff;
      }
    }
  }
  .money::before {
    content: "¥";
    font-size: 24px;
    padding-right: 10px;
  }
}
</style>


