<template>
  <div :class="`order-content order-content-${logo}` " v-if="!!orderData.order_no">
      <h3 v-if="logo==='top'"><img src="./images/order_logo.png" alt=""></h3>
       <div>
          <h4 :class="{'right':logo==='right'}">臻爱-百万医疗保险</h4>
            <div>
                <img src="./images/order_list.png" alt="" v-if="logo==='right'">
                <div class="left">
                    <p><span :class="'state'+state.index" v-if="logo==='right'" :style="`background:url('${stateUrl[state.index]}') no-repeat 100%/100%`"></span><span v-text="state.text"></span></p>
                    <p  v-if="logo==='right'">
                      <label>保单号：</label><span v-text="orderData.order_no">张三</span>
                    </p>
                    <p v-if="logo==='right'">
                      <label>保险名称：</label><span v-text="['经典版','升级版','尊享版'][orderData.plan_type]"></span>
                    </p>
                    <p>
                      <label>被保险人：</label><span v-text="orderData.b_name">张三</span>
                    </p>
                    <div>
                        <label >保障期限：</label>
                        <div v-if="orderData.s_time">
                           <p>自<span v-text="orderData.s_time.split('-')[0]"></span>年<span v-text="orderData.s_time.split('-')[1]"></span>月<span v-text="orderData.s_time.split('-')[2]"></span>日 00:00:00起
                          </p>
                          <p>
                             至<span v-text="endTime[0]"></span>年<span v-text="endTime[1]"></span>月<span v-text="endTime[2]"></span>日 23:59:59止</p></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    orderData: {
      type: Object,
      default() {
        return {};
      }
    },
    logo: {
      type: String
    },
    state: {
      type: Object,
      default() {
        return {
          index: "",
          text: ""
        };
      }
    }
  },
  data() {
    return {
      stateUrl: [
        require("./images/order_list_state1.png"),
        require("./images/order_list_state2.png"),
        require("./images/order_list_state3.png"),
        require("./images/order_list_state4.png")
      ],
      endTile: ""
    };
  },
  mounted() {
    // setTimeout(() => {
    //   this.getTime()
    // }, 1000);
  },
  computed: {
    endTime() {
      let today = new Date(this.orderData.s_time);
      today.setFullYear(today.getFullYear() + 1);
      today.setDate(today.getDate()-1);
      return [
        today.getFullYear(),
        today.getMonth() + 1<10?`0${today.getMonth() + 1}`:today.getMonth() + 1,
        today.getDate() < 10 ? `0${today.getDate()}` : today.getDate()
      ];
    }
  },
  methods: {
    getTime() {
      console.log("-----", this.startTime);
      // this.$flash({
      //   message: this.startTime
      // });
    }
  },
  watch: {
    // "orderData.s_time"(val) {
    //   let today = new Date(val);
    //   today.setFullYear(today.getFullYear() + 1);
    //   return `${today.getFullYear}-${today.getMonth() + 1}-${today.getDate()}`;
    //   //  console.log('----,', today)
    // }
  }
};
</script>

style.<style lang="scss">
.order-content {
  margin: 20px 0;
  background: #fff;
  padding-bottom: 20px;
  font-size: 26px;
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
      font-size: 32px;
      color: #333333;
      line-height: 90px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &.right {
        border-bottom: 1px solid #e5e5e5;
        &:after {
          content: "";
          width: 155px;
          height: 59px;
          background: url("./images/order_logo.png") no-repeat 100%/100%;
        }
      }
    }
    // div.left{
    > div {
      color: #666666;
      line-height: 46px;
      font-size: 26px;
      display: flex;
      padding-top: 22px;
      box-sizing: border-box;
      // align-items:center;
      // >p{
      //   // width:161px;
      //   // height:157px;
      //   // vertical-align: middle;

      // }
      img {
        height: 157px;
        margin-right: 20px;
      }
      div.left {
        position: relative;
        label {
          // padding-right: 10px;
          // color: red;
          white-space: nowrap;
        }
        > p {
          display: flex;
          &:first-child {
            // display: block;
            position: absolute;
            right: 0;
            top: 30px;
            width: 140px;
            align-items: center;
            color: #0c72e3;
            > span:first-child {
              flex: 0 0 35px;
              height: 35px;
              margin-right: 10px;
              // background-size: 100%/100%;
            }
          }
          > label {
            width: 140px;

            // color: red;
          }
          > span {
            flex: 1;
          }
        }
        > div {
          display: flex;
          > div {
            > p {
              color: #999999;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
  // }
}
.order-content-top {
  margin-top: 0;
}
</style>

