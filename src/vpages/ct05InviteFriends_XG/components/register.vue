<template>
   <div class="register">
      <div class="dialog">
         <div class="register-section" v-if="ISregister">
            <h3>马上领取更多牛股</h3>
            <div>
              <input type="number" placeholder="请输入手机号" v-model="formData.phone">
            </div>
            <div class="imgCode">
              <input type="text" placeholder="图形验证码"  v-model="formData.imageCode">
              <!-- <img :src="codeUrl" alt="" @click="getImgCode"> -->
              <span v-html="imgCode.code" @click="getImgCode">></span>
            </div>
              <div>
                <input type="text" placeholder="验证码" v-model="formData.phoneCode">
                <p :class="{getCode:true,disabled:!isSend.state}" @click="_getPhoneCode" v-text="isSend.text"></p>
            </div>
            <div>
                <div class="ht">
                    <p :class="{check:true,checked:check}" @click="check=!check"><span></span></p>
                    <p>同意 <span>《鲸鱼选股用户服务协议》</span></p>
                </div>
                <div class="submit" @click="_register">马上领取更多牛股</div>
            </div>

         </div>
         <div class="register-section register-success" v-else>
              <h3>牛股领取成功</h3>
              <span class="close" @click="_close">×</span>
              <a class="goDownload" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.goldfish.stocks">
                 登录app产看更多牛股
              </a>
         </div>
      </div>
      <div class="msk" @click="_close"></div>
   </div>
</template>
<script>
export default {
  name: "Register",
  data() {
    return {
      codeUrl: "",
      formData: {
        phone: "",
        imageCode: "",
        phoneCode: ""
      },
      check: true,
      isSend: {
        state: 1,
        text: "获取验证码"
      },
      imgCode:{ // 图形验证码
        code:'',
        key:''
      },
      ISregister: true // 控制注册模块显示隐藏
    };
  },
  created() {
    // console.log("---open_id", this.open_id);
    this.getImgCode();
    //  console.log(this._getUrl("open_id"));
  },
  computed: {
    open_id() {
      return this.$JinrSDK.WXgetUrl("open_id").open_id;
    },
    expert_id() {
      return this.$JinrSDK.WXgetUrl("open_id").expert_id;
    },
    dstock_id() {
      return this.$JinrSDK.WXgetUrl("open_id").dstock_id;
    },
  },
  methods: {
    getImgCode() {
      this.$http(
        "/xg/app/getImageCode",
        { imageCodeKey: this.imageCodeKey },
        "get"
      ).then(({data:res}) => {
        // console.log("res", res);
        this.imgCode.code = res.img;
        this.imgCode.key = res.imageCodeKey
      });
    },
    _getPhoneCode() {
      let { state, text } = this.isSend;
      let phone = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
      if (!state) {
        return;
      }else if(!phone.test(this.formData.phone)){
        this.$flash('请填写手机号')
        return
      }
      let params = {
        mobile: this.formData.phone,
        imageCode: this.formData.imageCode,
        imageCodeKey: this.imgCode.key
      };
      this.$http("/xg/app/getPhoneCode", params).then(res => {
        console.log(res);
        if (res.code == 10000) {
          this.isSend.text = "60s";
          this.isSend.state = 0; // 发送成功状态改为0
          this._countdown();
          this.$flash("验证码发送成功");
        } else {
          this.getImgCode();
          this.$flash(res.msg);
        }
      });
    },
    _countdown() {
      let temp = 60;
      let timeId = setInterval(() => {
        temp--;
        this.isSend.text = `${temp}s`;
        if (temp == 0) {
          clearInterval(timeId);
          this.isSend.state = 1;
          this.isSend.text = "发送验证码";
        }
      }, 1000);
    },
    _register() {
      let phone = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
      if (!this.formData.phone) {
        this.$flash("请填写手机号");
        return;
      } else if (!phone.test(this.formData.phone)) {
        this.$flash("手机号码格式有误");
        return;
      } else if (!this.formData.phoneCode) {
        this.$flash("请填写短信验证码");
        return;
      } else if (!this.check) {
        this.$flash("请同意服务协议");
        return;
      }
      let params = {
        open_id: this.open_id,
        expert_id: this.expert_id,
        dstock_id: this.dstock_id,
        mobile: this.formData.phone,
        sms_code: this.formData.phoneCode
      };
      this.$http("/xg/app/register", params)
        .then(res => {
          if (res.code == 10000) {
            this.$flash("领取成功");
            this.ISregister = false;
          }
        })
        .catch(error => {
          console.log("error", error);
          this.$flash("注册失败");
        });
    },
    _close() {
      this.$emit("close", false);
    }
  }
};
</script>
style.<style lang="scss">
.register {
  // position: relative;
  .dialog {
    > .register-section {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      z-index: 3;
      height: 690px;
      width: 615px;
      padding: 0 43px;
      box-sizing: border-box;
      h3 {
        text-align: center;
        font-size: 46px;
        line-height: 154px;
      }
      > div {
        height: 90px;
        border-bottom: 1px solid #e1e9f2;
        box-sizing: border-box;
        padding-top: 20px;
        display: flex;
        justify-content: space-between;
        &:last-child {
          border: none;
          display: block;
        }
        input::-webkit-input-placeholder {
          /* WebKit browsers */
          font-size: 24px;
        }
        input {
          height: 60px;
        }
        img {
          vertical-align: middle;
          border: 1px solid #000;
          height: 64px;
        }
        > p.getCode {
          width: 190px;
          height: 57px;
          line-height: 57px;
          text-align: center;
          background: #3d85ff;
          color: #fff;
          border-radius: 28px;
        }
        > p.disabled {
          background: #ccc;
        }
        > div.ht {
          height: 30px;
          display: inline-block;
          display: flex;
          align-items: center;
          p {
            height: auto;
            &.check {
              width: 32px;
              height: 32px;
              border: 1px solid #a2a2a2;
              border-radius: 50%;
              box-sizing: border-box;
              display: flex;
              align-items: center;
              margin-right: 10px;
              > span {
                display: block;
                width: 18px;
                height: 18px;
                border-radius: 8px;
                margin: 0 auto;
              }
            }
            &.checked {
              > span {
                background: #3d85ff;
              }
            }
            &:last-child {
              > span {
                color: #3d85ff;
              }
            }
          }
        }
        > div.submit {
          width: 490px;
          height: 88px;
          background: #3d85ff;
          margin: 50px auto;
          font-size: 32px;
          border-radius: 44px;
          color: #fff;
          line-height: 88px;
          text-align: center;
        }
      }
    }
    > .register-success {
      height: 434px;
      // position: relative;
      > span.close {
        // content:'x';
        font-size: 54px;
        color: #000;
        position: absolute;
        top: 20px;
        right: 30px;
      }
      .goDownload {
        display: block;
        margin: 60px auto 0;
        width: 488px;
        height: 88px;
        color: #fff;
        font-size: 32px;
        line-height: 88px;
        text-align: center;
        background: #3d85ff;
        border-radius: 44px;
      }
    }
  }
  .msk {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.4);
  }
}
</style>


