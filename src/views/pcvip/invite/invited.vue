<style lang="stylus" rel="stylesheet/stylus">
@import '~style/mixin.styl';

.jinr-msgbox-message {
  width: 300px;
  word-wrap: break-word;
  word-break: normal;
}

.invite {
  width: 100%;

  // margin 0 auto
  .banner-vip {
    img {
      width: 100%;
      // height: 380px;
    }
  }

  .content {
    width: 470px;
    margin: 0 auto;
  }

  .form__item input {
    font-size: 18px !important;
  }

  .border-px {
    border: 1px solid #2a8bf6;
  }

  .form {
    position: relative;
    padding: 44px 42px;

    &__item {
      position: relative;
      overflow: hidden;
      width: 100%;
      margin-bottom: 22px;
      text-align: left;

      input {
        width: 100%;
        // margin: 30px 0;
        height: 64px;
        line-height: 64px;
        text-indent: 30px;
        font-size: 32px;
        box-sizing: border-box;

        &::-webkit-input-placeholder {
          line-height: 32px;
          font-size: 16px;
          color: #909090;
        }
      }

      .verifica-btn {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        width: 175px;
        margin: 0;
        text-indent: 0px;
        // border-color #dddddd
        background-color: $mvip-color;
        color: #ffffff;

        &:active {
          background-color: mainColor;
        }

        &:disabled {
          background-color: #bdbdbd;
        }
      }

      label {
        display: inline-block;
        margin-left: 80px;
        padding-left: 10px;
        line-height: 20px;
        background: url('../assets/fa_select_tick.png') no-repeat left center \/ 18px 18px;
      }

      label.isgouZc {
        background: url('../assets/fa_select_null.png') no-repeat 6px center \/ 12px 11px, url('../assets/fa_select_tick.png') no-repeat left center \/ 18px 18px;
      }

      .xieyi {
        color: $mvip-color;
      }
    }

    .aBtnRe {
      width: 100%;
      height: 98px;
      padding-top: 30px;

      .register-btn {
        height: 64px;
        width: 100%;
        border: none;
        text-indent: 0;
        border-radius: 12px;
        line-height: 24px;
        font-size: 20px;
        background-color: $mvip-color;
        color: #ffffff;

        &:active {
          background-color: mainColor;
        }

        &:disabled {
          background-color: #bdbdbd;
        }
      }
    }
  }

  .imgcodepop {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    background: rgba(0, 0, 0, 0.5);

    .codepopm {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      width: 40%;
      padding: 20px;
      border-radius: 5px;
      background: #ffffff;

      h3 {
        margin-bottom: 10px;
        text-align: center;
        line-height: 100px;
        font-size: 24px;
      }

      .imgbox {
        padding: 0px 38px 42px;
        overflow: hidden;
        display: flex;
        justify-content: space-between;

        img {
          width: 200px;
          height: 60px;
          // float: left;
        }

        input {
          line-height: 60px;
          font-size: 24px;
          padding: 0 30px;
          border: 1px solid #999999;
          width: 45%;
          margin-left: 20px;
          // float: left;
        }
      }

      .codebtns {
        text-align: center;
        padding-bottom: 40px;

        button {
          height: 45px;
          width: 20%;
          margin: 0 5%;
          border: 0px;
          background: #CCCCCC;
          font-size: 24px;
          color: #fff;
          cursor: pointer;
        }

        button.ok {
          background: #0C71E3;
        }
      }
    }
  }

  .showAlert {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    background: rgba(0, 0, 0, 0.5);

    .convip {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      // width 540px
      // padding: 20px
      border-radius: 9px;
      background: #ffffff;

      img {
        width: 540px;
        height: 360px;
      }
    }
  }
}
</style>
<template>
<div class="invite">
    <div class="banner-vip"><img src="../assets/vip_pc_banner.jpg" alt="鲸鱼"></div>
    <div class="content">
        <!-- 主体区域 -->
        <div class="main">
          <div class="form">
            <div class="form__item border-px">
              <input
                type="tel" class="tel"
                placeholder="输入11位手机号码"
                maxlength="13"
                v-model="tel"
              />
            </div>
            <!-- 注册用户 -->
            <div v-show="validated && !isRegister">
              <div class="form__item border-px">
                <input
                    type="tel"
                    class="verifica"
                    placeholder="请输入验证码"
                    v-model="verifica"
                    maxlength="6" >
                <input
                  type="button"
                  class="firstCast verifica-btn"
                  value="获取验证码"
                  :disabled="!verificaH"
                  @click="codepopshowFun"/>
              </div>

              <div class="form__item border-px">
                <input
                  type="text"
                  class="tel"
                  placeholder="请输入邀请码"
                  maxlength="16" minlength="6"
                  v-model="inviteKey">
              </div>
              <div class="form__item border-px" >
                <input
                    type="password"
                    class="password"
                    placeholder="请输入6-12位数字+字母"
                    maxlength="16" minlength="6"
                    v-show="!open"
                    v-model="passwordVal">
                <input
                    type="text"
                    class="password"
                    placeholder="请输入6-12位数字+字母"
                    maxlength="16" minlength="6"
                    v-show="open"
                    v-model="passwordVal">
                <a href="javascript:;"
                    class="eye" :class="{open}"
                    @click.stop="eyeFun"></a>
              </div>
            </div>

            <!-- 已注册用户 -->
            <div v-show="validated && isRegister">
              <div class="form__item border-px">
                <input
                    type="password"
                    class="password"
                    placeholder="请输入密码"
                    maxlength="16" minlength="6"
                    v-show="!open"
                    v-model="passwordVal">
                <input
                    type="text"
                    class="password"
                    placeholder="请输入密码"
                    maxlength="16" minlength="6"
                    v-show="open"
                    v-model="passwordVal">
                <a
                  href="javascript:;"
                  class="eye"
                  :class="{open}"
                  @click.stop="eyeFun"
                ></a>
              </div>
            </div>
            <div v-if="validated" class="form__item">
              <label
                  :class="{isgouZc}"
                  @click.stop="agreeFun"
              >&nbsp;&nbsp;&nbsp;&nbsp;我同意《</label><a
                class="xieyi"
                href="https://jinrfe.jinr.com/#/treaty/user"
                @click="routerReplace('/treaty/user')"
                v-text="'鲸鱼用户服务协议'"
              ></a>》
            </div>
            <!-- 按钮 -->
            <div class="aBtn aBtnRe" >
              <input
                type="button"
                class="firstCast register-btn"
                :value="btnValue"
                :disabled="!highlight"
                @click="initFun"
              />
            </div>
          </div>
        </div>
        <!-- 图形验证码 -->
        <div class="imgcodepop" v-show="codepopshow">
          <div class="codepopm">
            <h3>输入图形验证码</h3>
            <div class="imgbox">
              <img :src="codeimg" alt="稳健收益" @click="getimgcode">
              <input type="text" v-model="inputcode" placeholder="输入图形验证码" />
            </div>
            <div class="codebtns">
              <button @click="codepopshow=false">取消</button>
              <button @click="verifyimgcode()" class="ok">确认</button>
            </div>
          </div>
        </div>

        <!-- 已注册用户 -->
        <div v-show="showAlert" class="showAlert">
          <div
            class="convip"
            @click="showAlertFun"
          ><img src="./register_ok.png" alt="已经注册"></div>
        </div>
    </div>
  </div>
</template>

<script>
import { Trim } from "utils/utils.js";
export default {
  components: {},
  data() {
    return {
      show: false,
      btnValue: "开启代理之旅",
      tel: "",
      telVal: "",
      passwordVal: "",
      verifica: "",
      isRegister: false, // 是否已经注册
      verificaH: true,
      open: false, //密码是否可见
      isgouZc: true, //是否同意协议
      validated: false, // 是否验证
      responseing: false,
      inviteKey: "",
      codepopshow: false,
      codeimg: "",
      showAlert: false,
      inputcode: "",
      play: ""
      // baseUrl: process.domain
    };
  },
  computed: {
    highlight() {
      let reg = /^1[3|4|5|6|7|8|9]\d{9}$/;

      let boolTel = reg.test(this.telVal);
      let boolVar = this.verifica.length >= 6;
      let boolPwd = this.passwordVal.length >= 6;

      // 第一次
      if (this.validated) {
        // 注册用户
        if (!this.isRegister) {
          return boolTel && boolVar && boolPwd && this.isgouZc;
        } else {
          // 登陆用户
          return boolTel && boolPwd && this.isgouZc;
        }
      }

      return boolTel;
    }
    // baseUrl:
  },
  watch: {
    tel(newValue, oldValue) {
      let reg = /^[0-9]*$/;
      let kong = /\s/g;
      if (!reg.test(newValue)) this.tel = "";
      if (!reg.test(newValue) && !kong.test(newValue))
        newValue = this.telVal = "";
      newValue = newValue.replace(kong, "");
      newValue = newValue.replace(/(^\d{3})(?=\d)/g, "$1 ");
      newValue = newValue.replace(/(\d{4})(?=\d)/g, "$1 ");
      this.tel = newValue;
      this.telVal = Trim(this.tel, "g");
    }
  },
  created() {
    this.isEnter() // 判断是否是pc端访问
  },
  mounted() {
    console.log("-------", process.domain);
  },
  methods: {
    initFun() {
      //是否第一次请求数据进行验证
      // setTimeout(() => {
      //   this.validated = true;
      //   this.isRegister = true;
      // }, 5000);
      if (!this.validated) {
        this.$http({
          servicename: "user.vipMobileExist",
          mobile: this.telVal || "",
          fromId: "309784180"
        })
          .then(response => {
            // console.log(response)
            if (response.register_status == "register") {
              this.validated = true;
              this.isRegister = false;
            } else if (response.register_status == "login") {
              this.validated = true;
              this.isRegister = true;
            } else if (response.register_status == "forbid") {
              // forbid
              this.showAlert = true;
              // this.$flash('您已经是鲸鱼用户')
              setTimeout(() => {
                this.showAlert = false;
              }, 2200);
            }
          })
          .catch(function(error) {
            console.log("失败了:" + error);
          });
      } else {
        // 是否注册用户
        if (this.isRegister) {
          // 登陆
          this.loginFun();
        } else {
          // 进行用户注册
          this.doregister();
        }
      }
    },
    agreeFun() {
      this.isgouZc = !this.isgouZc;
    },

    // 发送验证码
    getVerificationCode() {
      let reg = /^1[3|4|5|6|7|8|9]\d{9}$/;
      if (this.telVal.length < 11) {
        this.$flash("手机号码应为11位数");
        return false;
      } else if (!reg.test(this.telVal)) {
        this.$flash("手机号码格式有误");
        return false;
      }

      if (this.resposeing) return;
      this.resposeing = true;
      console.log("请求短信");
      this._countDown();
      let params = {
        servicename: "user.sendRegisterSms",
        mobile: this.telVal || ""
      };

      this.$http(params)
        .then(res => {
          setTimeout(() => {
            this.resposeing = false;
          }, 1000);
        })
        .catch(error => {});
    },

    // 登陆
    loginFun() {
      if (this.responseing) {
        return;
      }
      this.responseing = true;

      this.$http({
        mobile: this.telVal || "",
        // password: this.passwordVal,
        password: this.encrypt(this.passwordVal) || "",
        type: "pwd",
        servicename: "user.login",
        combination_id: sessionStorage["combination_id"] || "",
        param: sessionStorage["param"] || ""
      })
        .then(res => {
          setTimeout(() => {
            this.responseing = false;
          }, 770);
          this.$root.checked = res.event.checked;
          this.$router.replace("/result");
        })
        .catch(error => {
          setTimeout(() => {
            this.responseing = false;
          }, 770);
          // this.$flash(response.msg)
          console.log("res.msg-----------------------");
          console.log(error);
        });
    },

    //注册执行
    doregister() {
      if (this.resposeing) return;
      this.resposeing = true;
      let params = {
        servicename: "user.register",
        mobile: this.telVal || "",
        password: this.encrypt(this.passwordVal) || "",
        code: this.verifica || "",
        inviteKey: this.inviteKey
      };

      this.$http(params)
        .then(response => {
          setTimeout(() => {
            this.resposeing = false;
          }, 1000);

          this.routerPush("result");
          this.$flash("注册成功");
        })
        .catch(error => {
          setTimeout(() => {
            this.resposeing = false;
          }, 1000);
          // this.$flash(response.msg)
        });
    },

    // 倒计时效果
    _countDown() {
      let codeTime = 60;
      let verificaBtn = document.getElementsByClassName("verifica-btn")[0];

      verificaBtn.value = codeTime + "s";
      verificaBtn.disabled = true;

      // 时间倒计时
      this.play = setInterval(() => {
        let verificaBtn = document.getElementsByClassName("verifica-btn")[0];
        codeTime--;
        if (codeTime === 0) {
          verificaBtn.value = "重新获取";
          clearInterval(this.play);
          verificaBtn.disabled = false;
          verificaBtn.setAttribute("class", "verifica-btn");
          return;
        }
        verificaBtn.value = codeTime + "s";
      }, 1000);
    },

    getimgcode() {
      // debugger
      //验证图形验证码
      this.inputcode = "";
      // this.codepopshow=true
      this.codeimg =
        process.domain +
        "/m/index/?servicename=user.getRegisterImgCode&t=" +
        new Date().getTime();
      // this.codeimg = 'http://jinrpc.dev.jinr.com/m/index/?servicename=user.getRegisterImgCode&t='+new Date().getTime()
    },

    verifyimgcode() {
      //验证图形验证码
      if (this.resposeing) return;
      this.resposeing = true;
      let params = {
        servicename: "user.imgCodeValidate",
        imgCode: this.inputcode || ""
      };
      this.$http(params)
        .then(res => {
          this.resposeing = false;
          console.log("验证图形验证码成功");
          // 发送短信
          this.getVerificationCode();

          this.codepopshow = false;
        })
        .catch(err => {
          setTimeout(() => {
            this.resposeing = false;
          }, 1000);
        });
    },

    //
    codepopshowFun() {
      this.getimgcode();
      this.codepopshow = !this.codepopshow;
    },

    showAlertFun() {
      this.showAlert = !this.showAlert;
    },
    isEnter(){
      this.$http({
        servicename:'api.entrance',
        fromId: "309784180"
      }).then((res)=>{
        console.log('res')
      })
    }
  }
};
</script>
