<template>
  <div class="jr-keyboard">
    <div class="keyboard">
      <!-- 键盘列表 -->
      <transition name="fold">
        <div>
           <div class="blank-list" v-if="!!isShowBlankList">
              <div class="keyboard-main-header">
                <div class="empty" @click="closeFun"></div>
                <h1 class="title">确认付款</h1>
             </div>
              <div class="list">
                <div class="left">
                  <!-- &&orderData.card_no.sbustr.substr(-4,4) -->
                    <p><span  v-text="orderData.bank_name"></span>（尾号<span v-text="orderData.card_no&&orderData.card_no.substr(-4,4)">8988</span>）</p>
                    <!-- <p>可用额度5000元</p> -->
                </div>
                <div class="right"></div>
              </div>
              <p class="price">实际支付：<span v-text="parseFloat(orderData.trade_money).toFixed(2)">152.00</span></p>
              <p @click="selectBlank">确认支付</p>
           </div>
          <div class="keyboard-main fixed-x" v-if="!!showKeyboard">
             <div class="loading">
                <loading :visible="!!resposeing" :payState="payState"></loading>
             </div>
            <div class="keyboard-main-header"  v-if="!showLoading">
              <div
                class="empty"
                @click="closeFun"
              ></div>
              <h1
                class="title"
                v-if="!showVer"
              >请输入密码</h1>
              <h1
                class="title"
                v-if="!!showVer&&!payState.state"
              >请输入验证码</h1>
              <h1
                class="title"
                v-if="!!showVer&&!!payState.state"
              v-text="payState.title"></h1>
              <!-- <h1
                class="title"
                v-else
              >支付失败</h1> -->
            </div>
            <div class="keyboard-main-frame">
               <!-- {{showLoading}} -->
              <!-- <div
                :class="{loadPwd: !showVer, loadVer: showVer}"
                v-if="!!showLoading">
                <Loading ></Loading>
              </div> -->

              <!--密码输入框-->
              <div class="from-pwd" v-show="!showVer && !showLoading">
                <!--，用于余额提现-->
                <!-- <h5>金额<span v-text="money || '1'"></span>元</h5> -->
                <ul>
                  <!-- v-text="item.boll" -->
                  <li
                    v-for="(item, index) in balls"
                    :class="{bai:balls[index].show}"
                    :key="index"
                  ><span v-if="!!item.show"></span></li>
                </ul>
                <a
                  class="forget"
                  href="javascript:;"
                  @click="tipsFun"
                >忘记密码？</a>
              </div>
              <!--验证码输入框-->
              <div class="from-ver" v-show="showVer && !showLoading">
                <div class="verifica_text">
                  <span
                    v-for="(item, index) in balls"
                    v-text="item.verNum"
                    :key="index"
                  ></span>
                </div>
                <input
                  type="button"
                  class="verifica_btn"
                  value="发送验证码"
                  @click="getVerificationCode"
                />
              </div>
            </div>
            <table class="keyboard-main-content" ref="listContent" v-if="!showLoading">
              <tbody>
                <tr v-for="(items, index) in keyBoardlists" :key="index">
                  <td
                    v-if="item!=='del'"
                    v-for="(item, index) in items"
                    @click.stop="keyBoard(item)"
                    v-text="item==='clean'?'清除':item"
                    :class="{clean:item==='clean'}"
                    :key="index"
                  ></td>
                  <td
                    v-if="item==='del'"
                    v-for="item in items"
                    @click.stop="keyBoardDel"
                    :class="{del:item==='del'}"
                    :key="item"
                  ><img
                    src="./images/delete_data64.png"
                    alt=""></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </transition>
    </div>
    <!-- 底部模糊层 -->
    <transition name="fade">
      <div
        class="keyboard-mask"
        v-show="showKeyboard||isShowBlankList"
        @click="closeFun"
      ></div>
    </transition>
</div>
</template>

<script >
let boll = "●";
import loading from "../components/loading";
export default {
  components: {
    loading
  },
  props: {
    // showKeyboard: {
    //   // 键盘是否显示
    //   type: Boolean,
    //   defaule: false
    // },
    isShowBlankList: {
      type: Boolean,
      default: false
    },
    coupon_id: {
      type: String,
      defaule: ""
    },
    money: {
      type: [String, Number]
    },
    payType: {
      type: Number
    },
    payProductid: {
      type: Number
    },
    type: {
      type: Number
    },
    buyType: {
      type: Number
    },
    cuserid: {
      type: Number
    },
    orderData: {
      type: Object
    }
  },
  data() {
    return {
      showLoading: false,
      dropBalls: [],
      keyBoardlists: [
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"],
        ["clean", "0", "del"]
      ],
      payNum: "",
      // 键盘数据
      balls: [
        { show: false, boll, verNum: "" },
        { show: false, boll, verNum: "" },
        { show: false, boll, verNum: "" },
        { show: false, boll, verNum: "" },
        { show: false, boll, verNum: "" },
        { show: false, boll, verNum: "" }
      ],
      verNum: "", // 验证码专用
      payPwd: "", // 密码专用
      showVer: false, // 是否显示验证码
      play: null,
      token: "",
      numReCi: 0,
      orderid: "",
      resposeing: false,
      showKeyboard: false, // 键盘是否显示
      isInput: true,
      payState: {},
      isAgainVerNum: true
    };
  },
  created() {
    // setTimeout(() => {
    //   console.log("--cccc-", this.orderData);
    // }, 2000);
  },
  computed: {
    useData() {
      return this.sessionGet("userData");
    },
    appData(){
      return this.sessionGet('appData');
    }
  },
  beforeDestroy() {
    clearInterval(this.play);
  },
  methods: {
    tipsFun() {
      this.$flash("请移步鲸鱼APP找回密码");
    },
    selectBlank() {
      //选择银行卡
      this.$emit("closeBlankList", false);
      this.showKeyboard = true;
    },
    // 清除键盘数据
    closeFun() {
      clearInterval(this.play);
      if (this.showLoading) return;
      this.orderid = "";
      this._initKeyBoard(false);
      this.$emit("closeBlankList", false);
      this.showKeyboard = false;
      this.isInput = true;
      this.payState = {};
      this.resposeing = false;
    },

    // 键盘操作
    keyBoard(val) {
      // console.log("xx进来了xx");
      if (this.showLoading || !this.isInput) return;
      if (val !== "clean") {
        // 验证码
        if (val) {
          this.balls[this.payPwd.length].verNum = val;
          this.verNum += val;
        }
        // console.log('进来了',this.verNum)
        if (this.payPwd.length < 5) {
          this.balls[this.payPwd.length].show = true;
          this.payPwd += val;
        } else if (this.payPwd.length === 5) {
          this.balls[this.payPwd.length].show = true;
          this.payPwd += val;

          if (this.payType === 31) {
            if (!this.showVer) {
              // 验证交易密码
              this.validOrder();
            } else {
              // 验证验证码
              this.validateCode();
            }
          } else {
            // this.validOrder()
          }
        }
      } else {
        this._initKeyBoard(this.showVer);
      }
    },

    // 初始化键盘数据
    _initKeyBoard(bool) {
      // console.log('----', bool)
      !bool ? clearInterval(this.play) : "";
      this.verNum = "";
      this.payPwd = "";
      this.showVer = bool ? bool : false;
      // this.showVer =  false
      this.balls.forEach((ele, index) => {
        ele.show = false;
        ele.verNum = "";
      });
    },

    // 删除按钮
    keyBoardDel() {
      if (this.showLoading) return;

      let indexNum = !this.showVer ? this.payPwd.length : this.verNum.length;
      if (indexNum === 0) {
        this.balls[0].verNum = "";
        this.balls[0].show = false;
        this.payPwd = this.verNum = "";
        return;
      }
      this.balls[indexNum - 1].show = false;
      this.balls[indexNum - 1].verNum = "";
      this.payPwd = this.payPwd.substring(0, this.payPwd.length - 1);
      this.verNum = this.verNum.substring(0, this.verNum.length - 1);
    },
    // 验证交易密码
    validOrder() {
      this.resposeing = true;
      let params = {
        // appid: this.$JinrSDK.appid,
        appid: "jinr_baigebao", // 固定写死84
        v: "1.0.4", // 接口版本号
        app_v: this.appData.app_v||this.$JinrSDK.app_v,
        token:this.appData.token || this.$JinrSDK.token,
        pwd: this.payPwd
      };
      // let testData = {
      //   v: "1.0.4",
      //   token:
      //     "1ba7UlNUAwABBwBTBANRBQAFXAUEAlJXUgIFBwUDB1NSBAFaVlY6UwhWBVtRAVRaVVZbU1AHVQVVVQBUVlcEBgUOCVJaVwo5AwcBWxkHA04BCxlXDQlVDQ4BBGoA",
      //   // unique_id: "",
      //   // appid: "jinr_ios",
      //   appid: "jinr_baigebao", // 固定写死84
      //   app_v: "4.3.1",
      //   pwd: this.payPwd
      // };
      this.$http("/api/valtradePwd", params, "get")
        .then(res => {
          // console.log('res', res)
          this.resposeing = false;
          if (res.code === 1000200) {
            this.showVer = true;
            this._initKeyBoard(true);
            this.getVerificationCode(); /// 验证通过自动发送验证码
          } else if (res.code === 1000000) {
            this.$flash(res.msg);
            this._initKeyBoard(false);
          } else {
            this.$flash({
              message: res.msg || "验证失败，请重试"
            });
          }
        })
        .catch(err => {
          this.resposeing = false;
          this.$flash({
            message: err.msg || "验证失败，请重试"
          });
        });
    },

    // 验证验证码
    validateCode() {
      this.resposeing = true;
      let params = {
        uid: String(this.orderData.userid),
        orderId: String(this.orderData.order_no),
        validatecode: String(this.verNum)
      };
      this.$http("/api/payvalidate", params, "post")
        .then(res => {
          // this.resposeing = false;
          if (res.success) {
            if (res.data.payType === "SMS_VALIDATE_PAY") {
              this.payState = {
                state: true,
                text: "您已支付成功",
                title: "支付成功"
              };
              this.sessionSet("orderID", null);
              setTimeout(() => {
                // 跳转到订单详情页面
                this.resposeing = false;
                this.$router.replace({
                  name: "orderDetails",
                  params: {
                    orderData: this.orderData,
                    headerLeft: {
                      showMore: false,
                      textUrl: "/myInsurance?index=0",
                      textCopy: "完成"
                    },
                    state: {
                      index: 0,
                      text: "审核中"
                    }
                  }
                });
              }, 2000);
            } else {
              this.payState = {
                state: true,
                text: "支付失败",
                title: "支付失败"
              };
              setTimeout(() => {
                this.resposeing = false;
                this.closeFun(); // 关闭键盘
              }, 2000);
            }
          } else {
            this.resposeing = false;
            this.$flash(res.msg);
            this.showVer = true;
            this._initKeyBoard(this.showVer);
            if (res.code != "3001") {
              this.closeFun();
              this.$router.replace("/");
            }
          }

          // else {
          //   this.resposeing = false;
          //   this.$flash({
          //     message:res
          //   });
          //   this.showVer = true;
          //   this._initKeyBoard(this.showVer);
          // }
        })
        .catch(error => {
          // this.showLoading = !this.showLoading;
          this.resposeing = false;
          console.log(this.showVer);
          this.showVer = true;
          this._initKeyBoard(this.showVer);
        });
    },

    // 发送验证码
    getVerificationCode() {
      //useData
      let params = {
        uid: String(this.orderData.userid), // 用户id
        cardNo: String(this.orderData.card_no), // 银行卡号
        orderId: String(this.orderData.order_no),
        idCardNo: String(this.orderData.t_paper_num),
        familyName: String(this.orderData.t_name),
        mobile: String(this.orderData.tel),
        // amount:String(this.orderData.trade_money)
        amount: String(1.0)
        // mobile:17665354037,
        // amount:orderData.
      };
      let http = !!this.isAgainVerNum
        ? this.$http("/api/quickpay", params, "post")
        : this.$http(
            "/api/smsresend ",
            { uid: params.uid, orderId: params.orderId },
            "post"
          );
      this.isAgainVerNum = false;
      // console.log("--xxxx-", params);
      if (this.resposeing) return;
      this.resposeing = true;
      http
        .then(res => {
          this.resposeing = false;
          if (res.code == 0) {
            this._initKeyBoard(this.showVer); // 初始化键盘
            this.$nextTick(() => {
              this.isInput = true;
              this._countDown();
            }); // 倒计时
          } else if (res.code === "600122") {
            this.$flash(res.msg);
          } else if (res.code == "600049" || res.code == "3011") {
            //提示订单重复提交时重新发送验证码
            // this.$flash(res.msg);
            this.getVerificationCode();
          } else {
            this.$flash({
              message: res.msg
            });
            this.closeFun();
          }
        })
        .catch(error => {
          this.resposeing = true;
          console.log(this.showVer);
          this._initKeyBoard(this.showVer);
        });
      // this.resposeing = true;
      // this._initKeyBoard(this.showVer); // 初始化键盘
      // this.$nextTick(() => {
      //   this.resposeing = false;
      //   this.isInput = true;
      //   this._countDown();
      // }); // 倒计时
      // setTimeout(() => {}, 2000);
    },

    // 倒计时效果
    _countDown() {
      clearInterval(this.play);
      let codeTime = 60;
      let verificaBtn = document.getElementsByClassName("verifica_btn")[0];
      verificaBtn.value = codeTime + "s";
      verificaBtn.disabled = true;
      verificaBtn.setAttribute("class", "verifica_btn");

      // 时间倒计时
      this.play = setInterval(() => {
        let verificaBtn = document.getElementsByClassName("verifica_btn")[0];
        codeTime--;
        if (codeTime === 0 || codeTime < 0) {
          verificaBtn.value = "重新获取";
          clearInterval(this.play);
          verificaBtn.disabled = false;
          verificaBtn.setAttribute("class", "verifica_btn");
          return;
        }
        verificaBtn.value = codeTime + "s";
      }, 1000);
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~style/mixin.styl';

.keyboard {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 2;
  width: 100%;
  height: rem(0);
  color: rgba(255, 255, 255, 0.4);
  z-index: 999;

  .keyboard-main, .blank-list { // 购物车清单
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    transform: translate3d(0, -100%, 0);
    transition: all 0.3s;
    background: #ffffff;
    color: wordDfColor;

    &.fold-enter {
      transform: translate3d(0, 0, 0);
    }

    &.fold-leave {
      transform: translate3d(0, -100%, 0);
    }

    &.fold-leave-active {
      transform: translate3d(0, 0, 0);
    }

    .keyboard-main-header {
      position: relative;
      height: rem(100);
      line-height: @height;
      padding: 0 rem(32);
      font-size: rem(44);

      &:before {
        content: '';
        position: absolute;
        height: 1px;
        width: 100%;
        bottom: 0;
        right: 0;
        background-color: #e9e9e9;
      }

      .empty {
        float: left;
        margin-top: rem(25);
        padding: rem(10);
        margin-right: rem(10);
        border-radius: 50%;
        position: relative;
        width: rem(30);
        height: @width;
        border-radius: 50%;

        &:before, &:after {
          content: '';
          position: absolute;
          height: rem(2.5);
          width: 60%;
          top: 50%;
          left: 0;
          margin-top: -0.04rem;
          border-radius: 0.01rem;
          background: huise9;
        }

        &:before {
          transform: rotate(45deg);
        }

        &:after {
          transform: rotate(-45deg);
        }
      }

      .title {
        // font-size rem(32)
        text-align: center;
        text-indent: rem(-60);
        color: rgb(7, 17, 27);
      }
    }

    .keyboard-main-frame {
      text-align: center;

      .loadPwd {
        height: rem(310);
        position: relative;
      }

      .from-pwd {
        // height rem(310)
        padding: 60px 0 0;

        h5 {
          padding-top: rem(15);
          line-height: rem(100);
          font-size: rem(28);
        }

        ul {
          margin: 0 rem(30);
          overflow: hidden;
          border: 1px solid #acacac;
          border-radius: rem(12);

          li {
            position: relative;
            float: left;
            height: rem(100);
            width: 112px;
            line-height: @height;
            font-size: rem(85);
            border-right: 1px solid #acacac;
            color: #f3f5f7;

            span {
              position: absolute;
              top: 50%;
              left: 50%;
              width: rem(26);
              height: @width;
              border-radius: 50%;
              transform: translate3d(-50%, -50%, 0);
              background-color: #000;
            }
          }

          li.bai {
            color: wordDfColor;
          }

          li:last-child {
            border-right: none;
          }
        }

        &>a.forget {
          display: block;
          width: auto;
          height: auto;
          position: static;
          padding-right: rem(35);
          margin-bottom: rem(42);
          border-top: none;
          text-align: right;
          line-height: rem(50);
          font-size: rem(28);
          background-color: #ffffff;
          color: mainColor;
        }
      }

      .loadVer {
        position: relative;
        height: rem(90);
        padding: rem(36) rem(48) rem(42);
      }

      .from-ver {
        height: rem(90);
        padding: rem(36) rem(48) rem(42);
        line-height: @height;
        text-align: center;
        background-color: baise;

        .verifica_text {
          float: left;
          overflow: hidden;
          height: rem(90);
          padding: 0 rem(80);
          border-radius: rem(12);
          background-color: #f3f3f3;

          span {
            display: inline-block;
            width: rem(34);
            font-size: rem(46);
          }
        }

        input.verifica_btn {
          float: right;
          width: rem(220);
          height: rem(90);
          border: none;
          line-height: @height;
          font-size: rem(36);
          border-radius: rem(12);
          background-color: mainColor;
          color: #ececec;
        }

        input::-webkit-input-placeholder {
          font-size: rem(30);
          line-height: rem(90);
          color: baise;
        }

        input.verifica_btn:disabled {
          background-color: #ccc;
          letter-spacing: 2px;
          color: baise;
        }

        input.verifica_btn:active {
          background-color: #6699ff;
        }
      }

      .cube-loading {
        width: 200px;
        margin: 200px auto 0;
        text-align: center;
        display: flex;
        justify-content: center;
      }
    }

    .keyboard-main-content {
      width: 100%;
      padding-left: rem(32);
      background: #fff;
      text-align: center;

      tr {
        border-top: 1px solid #dfdfdf;

        &>td:nth-child(3) {
          border-right: none;
        }
      }

      td {
        border-right: 1px solid #dfdfdf;
        width: 33.3%;
        line-height: rem(108);
        font-size: rem(60);
        color: wordDfColor;

        &:active {
          background-color: #ebebeb;
        }
      }

      .clean {
        font-size: rem(32);

        &:active {
          background-color: mainColor;
        }
      }

      .del {
        display: table-cell;
        background-color: mainColor;

        &:active {
          background-color: #ebebeb;
        }

        img {
          width: rem(54);
          vertical-align: middle;
        }
      }
    }
  }

  .blank-list {
    padding: 0 30px;
    box-sizing: border-box;
    font-size: 34px;

    >.list {
      height: 140px;
      margin-bottom: 90px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e6e6e6;

      >.left {
        // padding-top:40px;
        box-sizing: border-box;

        >p {
          font-size: 36px;
          color: #333;
        }
      }

      >.right {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        overflow: hidden;
        background: url('./images/keyboard_check.jpg') no-repeat 100% / 100%;
      }
    }

    >p.price {
      text-align: center;
      margin-bottom: 32px;

      >span {
        color: #0c72e3;
        font-size: 42px;

        &:before {
          content: '¥';
          font-size: 24px;
        }
      }
    }

    >p:last-child {
      height: 96px;
      width: 690px;
      background: #0c72e3;
      line-height: 96px;
      text-align: center;
      color: #fff;
      border-radius: 10px;
      margin-bottom: 47px;
    }
  }
}

.keyboard-mask { // 遮罩层
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 900;
  // filter: blur(rem(10))
  backdrop-filter: blur(10px);

  &.fade-enter-active {
    opacity: 1;
    background: rgba(7, 17, 27, 0.06);
    transition: all 0.3s;
  }

  &.fade-enter, &.fade-leave {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
    backdrop-filter: blur(0px);
  }

  &.fade-leave-active {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
    transition: all 0.3s;
  }
}
</style>
