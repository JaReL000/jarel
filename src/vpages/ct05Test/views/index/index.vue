<template>
   <div class="ct05Test">
        <hd :title="{name:'APP跳转测试'}"></hd>
        <p @click="goTo(1)">跳转收货地址</p>
        <p @click="goTo(2)">跳转日增息资产页</p>
        <p @click="goTo(3)">跳转保险箱资产页</p>
        <p @click="goTo(4)">跳转年定期转入页</p>
        <p @click="goTo(5)">跳转季定期转入页</p>
        <p @click="goTo(6)">跳转月定期转入页</p>
        <p @click="goTo(7)">跳转周定期转入页</p>
        <component :is="cp" v-model="show" :data="res"></component>
   </div>
</template>
<script>
import dialog from "./dialog";

export default {
  data() {
    return {
      cp: null,
      show: false,
      res: {}
    };
  },
  mounted() {
    // this.$flash("页面刷新了");
    setTimeout(() => {
      let orderId = this.$JinrSDK.orderId;
      if (!!orderId) {
        // this.$flash({
        //   message: orderId
        // });
        this.cp = dialog;
        this.show = true;
        this._getOrderDetal(orderId);
      }
    }, 1000);
  },
  methods: {
    goTo(index) {
      if (index == 1) {
        this.$JinrSDK.pushAddress();
      } else if (index == 2 || index == 3) {
        let productName = index == 2 ? "日增息" : "保险箱";
        let productId = index == 2 ? 4 : 3;
        this.$JinrSDK.pushOtherAssets(productName, productId);
      } else {
        let baseParams = {
          productId: "2",
          productName: "年定期",
          productTypeId: "2",
          fromPage: "4",
          eventRefId: String(135),
          couponId: "",
          couponName: "",
          isShowCoupon: String(1)
        };
        if (index == 5) {
          baseParams.productId = 7;
          baseParams.productTypeId = 2;
          baseParams.productName = "季定期";
        } else if (index == 6) {
          baseParams.productId = 6;
          baseParams.productTypeId = 2;
          baseParams.productName = "月定期";
        } else if (index == 7) {
          baseParams.productId = 9;
          baseParams.productTypeId = 6;
          baseParams.productName = "周定期";
        }
        this.$JinrSDK.pushProductTurnIn(baseParams);
      }
    },
    _getOrderDetal(orderId) {
      let param = {
        v: "1.0.0",
        orderId,
        token:this.$JinrSDK.token,
        // token:
        //   "325dVgBTVFYBAFFWBltRUwgAVwcDUl0ACwNXUwAHAgMBAVxXOQZVUFIBVwJUV1RVWQAFWwNRAlBRUQ9TUAEBDgECUgcEalZWAAhMVgBPB18YBVNYVwBeVwc8BQ",
        // request_no: new Date().getTime().toString(16)
      };
        // this.$flash('进来了')
      this.$http("/", param).then(res => {
        // this.$nextTick(() => {
        //   this.cp = dialog;
        //   this.show = true;
        // });
        // this.$set(this, "res", res);
        this.res = res.data
        console.log(this.res);
      });
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
<style lang="scss">
.ct05Test {
  // padding-top: 100px;
  p {
    width: 300px;
    height: 100px;
    font-size: 36px;
    color: #fff;
    background: hotpink;
    margin: 100px auto;
    border-radius: 20px;
    text-align: center;
    line-height: 100px;
  }
}
</style>


