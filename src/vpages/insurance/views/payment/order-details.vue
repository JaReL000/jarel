<template>
   <div class="order-details">
     <hd
      :title="{name:'保单详情'}"
      :rightOptions="order.headerLeft"
      @onClickUrl="go"
     ></hd>
     <div class="content-box">
      <div class="order-information">
          <h3><img src="./images/order-details_logo.png" alt=""></h3>
      </div>
      <div class="order-state">
           <div>
             <p>臻爱-百万医疗保险</p>
             <p><span :style="`background:url(${stateLogo[order.state.index]})  no-repeat 100%/100%`"></span><span v-text="order.state.text"></span></p>
           </div>
            <p><span>保单号：</span><span v-text="order.orderData.order_no"></span></p>
      </div>
      <div class="order-details-data">
                <!-- 投保人信息 -->
              <div class="section">
                  <h4>投保人信息</h4>
                  <div class="item">
                    <label>与被保人关系</label>
                    <div class="nav" v-text="b_relations[order.orderData.b_relation]"></div>
                  </div>
                    <div class="item">
                        <label>姓名</label>
                        <input type="text" placeholder="请填写" :value="order.orderData.t_name" readonly>
                    </div>
                    <div class="item">
                        <label>证件类型</label>
                        <input type="text" placeholder="身份证"  readonly>
                    </div>
                    <div class="item">
                        <label>证件号码</label>
                        <input type="text" placeholder="请填写" :value="order.orderData.t_paper_num" readonly>
                    </div>
                    <div class="item">
                        <label>性别</label>
                         <div>
                          <p  v-if="order.orderData.t_sex==1">男</p>
                          <p  v-else>女</p>
                        </div>
                    </div>
                    <div class="item">
                        <label>手机号码</label>
                        <input type="text" placeholder="请填写银行卡所绑定的手机号码" :value="order.orderData.tel" readonly>
                    </div>
              </div>
                <!-- 被保人信息 -->
              <div class="section" >
                  <h4>被保人信息</h4>
                    <div class="item">
                        <label>被保人</label>
                        <input type="text" placeholder="请填写" :value="order.orderData.b_relation ==1?'本人':order.orderData.b_name" readonly>
                    </div>
                    <div class="item">
                        <label>证件类型</label>
                        <input type="text" placeholder="身份证"  readonly>
                    </div>
                    <div class="item">
                        <label>证件号码</label>
                        <input type="text" placeholder="请填写" :value="order.orderData.b_paper_num"  readonly>
                    </div>
                    <div class="item">
                        <label>性别</label>
                         <div>
                          <p v-if="order.orderData.b_sex==1">男</p>
                          <p  v-else>女</p>
                        </div>
                    </div>
              </div>
              <!-- 保障项目 -->
              <div class="item1">
                <h4 :class="{'arrow':true,'active':!!childShow}" @click="childShow=!childShow"><span>保障项目</span></h4>
                <p class="child" v-if="!!childShow">臻爱-百万医疗保险</p>
             </div>
             <div class="item2">
                <p>支付金额</p>
                <p>¥<span v-text="parseFloat(order.orderData.trade_money).toFixed(2)"></span></p>
             </div>
              <div class="item2">
                <p>支付时间</p>
                <p v-text="payTime"></p>
             </div>
              <div class="item2 arrow" @click.stop="$router.push('/information?index=1')">
                <span>保险条款</span>
             </div>
              <div class="item2 arrow" @click.stop="$router.push('/information?index=2')">
                <span>理赔流程</span>
             </div>
             <div class="item2 arrow" @click.stop="$router.push('/information?index=3')">
                <span>常见问题</span>
             </div>
      </div>
     </div>
     <div class="btn"></div>
   </div>
</template>
<script>
// import order from "../components/order.vue";
export default {
  props: {
    // state: {
    //   type: Object,
    //   default() {
    //     return {
    //       index: 2,
    //       text: "审核中"
    //     };
    //   }
    // }
  },
  // components: {
  //   order
  // },
  computed: {},
  created() {
    this.init();
  },
  data() {
    return {
      order: {
        orderData: {},
        state: {}
      },
      b_relations: { 1: "本人", 13: "配偶", 12: "子女", 11: "父母", 8: "其他" },
      stateLogo: [
        require("./images/order-details_state1.png"),
        require("./images/order-details_state2.png"),
        require("./images/order-details_state3.png"),
        require("./images/order-details_state4.png")
      ],
      payTime: "",
      childShow: false
    };
  },
  methods: {
    init() {
      if (this.$route.params.orderData) {
        this.sessionSet("order", this.$route.params);
        this.order = this.$route.params;
      } else {
        this.order = this.sessionGet("order");
      }
      this.payTime = this.getDate(this.order.orderData.trade_time);
      console.log("this.$route.params", this.order);
      // console.log("-----", this.$route.params);
    },
    go(url) {
      console.log("url", url);
      this.$router.push(url);
    },
    getDate(tiem) {
      let date = new Date(parseFloat(tiem));
      return `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }
  }
};
</script>
style.<style lang="scss">
.order-details {
  background: #f5f5f5;
  width: 100%;
  overflow-x: hidden;
  .content-box {
    .order-information {
      background: #fff;
      padding: 0 30px;
      box-sizing: border-box;
      > h3 {
        height: 104px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e5e5e5;
        img {
          width: 155px;
        }
      }
    }
    .order-state {
      background: #fff;
      padding: 0 30px 30px;
      box-sizing: border-box;
      > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          &:first-child {
            line-height: 94px;
            font-size: 30px;
          }
          &:last-child {
            padding-right: 20px;
            font-size: 28px;
            > span {
              color: #0c72e3;
              &:first-child {
                display: inline-block;
                width: 33px;
                height: 33px;
                vertical-align: middle;
                margin-right: 20px;
              }
            }
          }
        }
      }
      > p {
        font-size: 28px;
      }
    }
    .order-details-data {
      margin-top: 20px;
      .section {
        font-size: 28px;
        color: #999999;
        > h4 {
          line-height: 104px;
          font-size: 32px;
          color: #333;
          background: #fff;
          text-align: center;
        }
        > .item {
          padding: 0 30px;
          display: flex;
          line-height: 104px;
          border-bottom: 1px solid #e5e5e5;
          box-sizing: border-box;
          > label {
            padding-right: 30px;
            width: 250px;
            white-space: nowrap;
          }
          > div {
            flex: 1;
            &.nav {
              display: block;
              // justify-content: flex-end;
              // align-items: center;
              text-align: right;
              > span {
                width: 88px;
                text-align: center;
                // margin-right: 16px;
                height: 52px;
                // border: 1px solid #c5c5c5;
                line-height: 52px;
                border-radius: 10px;
                &.active {
                  background: #0c72e3;
                  color: white;
                  border: none;
                }
              }
            }
          }
          > input {
            flex: 1;
            background: #f5f5f5;
            color: #999999;
            text-align: right;
          }
          > div {
            display: flex;
            justify-content: flex-end;

            > p {
              width: 100px;
              // background:hotpink;
              display: flex;
              align-items: center;
              text-align: right;

              &:before {
                content: "";
                display: inline-block;
                width: 33px;
                height: 33px;
                // background: url("./images/insuranceList_no-check.png") no-repeat
                //   100%/100%;
                // vertical-align: middle;
                margin-right: 20px;
              }
              &:last-child {
                margin-left: 80px;
              }
              &.active {
                &::before {
                  // background: url("./images/insuranceList_check.png") no-repeat
                  //   100%/100%;
                }
              }
            }
          }
          > p {
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            // &::after {
            //   content: "";
            //   width: 34px;
            //   height: 35px;
            //   background: url("./images/insuranceList_date_logo.png") no-repeat
            //     100%/100%;
            // }
            > span.placeholder {
              color: #b2b2b2;
            }
            &.professional {
              display: flex;
              justify-content: space-between;
              align-items: center;
              line-height: 42px;
              font-size: 28px;
              &::after {
                content: "";
                width: 20px;
                height: 20px;
                border-top: 1px solid #999999;
                border-right: 1px solid #999999;
                display: inline-block;
                background-image: none;
                transform: rotateZ(45deg);
              }
            }
          }
        }
      }
      .arrow {
        height: 104px;
        color: #333;
        line-height: 104px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 30px;
        // border-bottom:1px solid #e5e5e5;
        &:after {
          content: "";
          display: block;
          width: 20px;
          height: 20px;
          border-right: 1px solid #999;
          border-top: 1px solid #999;
          transform: rotateZ(45deg);
          transition: all 0.1s;
        }
        &.active {
          &::after {
            transform: rotateZ(135deg);
          }
        }
      }
      .item1 {
        font-size: 28px;
        margin-bottom: 20px;
        background: #fff;
        > p.child {
          // display: none;
          height: 104px;
          background: #f5f5f5;
          line-height: 104px;
          padding: 0 30px;
          color: #9f9f9f;
        }
      }
      .item2 {
        display: flex;
        height: 104px;
        line-height: 104px;
        justify-content: space-between;
        padding: 0 30px;
        border-bottom: 1px solid #e5e5e5;
        background: #fff;
        font-size: 28px;
        > p:last-child {
          color: #999;
        }
        > span {
          color: #333;
        }
        // &:first-child{
        //   margin-top:20px;
        // }
      }
    }
  }
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  .order-details {
    padding-bottom: 108px;
    .btn {
      height: 108px;
      width: 100%;
      background: #fff;
      position: fixed;
      bottom: 0;
      left: 0;
    }
  }
}
</style>


