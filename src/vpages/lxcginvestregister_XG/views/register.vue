<template>
   <div class="register" v-if="showContent">
     <div class="register1" v-if="!register">
       <img src="../images/unregister1.png" alt="">
        <div class="register-section">
          <div>
            <input type="text" placeholder="请输入手机号" v-model="formData.phone" maxlength="11">
          </div>
          <div>
              <input type="text" placeholder="验证码" v-model="formData.phoneCode" >
              <p :class="{getCode:true,disabled:!isSend.state}" @click="_getPhoneCode" v-text="isSend.text"></p>
          </div>
          <div>
            <div class="ht">
                <p :class="{check:true,checked:check}" @click="check=!check"></p>
                <p>同意 <span>《鲸鱼选股用户服务协议》</span></p>
            </div>
          </div>
        </div>
        <div class="submit" @click="_register">立即注册领取</div>
     </div>
     <div class="register2" v-else>
       <div class="register2_readey" v-if="true">
          <h6 style="text-align:center;">红包已领取</h6>
          <p>注册后15天有效</p>
       </div>
       <div class="register2_unreadey register2_unreadey_sub" v-else>
          <h6>红包已过期</h6>
          <p class="unreadey_p">有效期：<span>已过期</span></p>
       </div>
       <div class="submit" @click="goInvest">马上跟投 赚5%收益</div>
     </div>
     <div></div>
     <plan></plan>
      <div class="submit" @click="Gotop" v-if="!register">立即注册领取</div>
      <div class="submit"  @click="goInvest" v-else>马上跟投 赚5%收益</div>
     <prompt ref="prompt"></prompt>
   </div>
</template>
<script>
import plan from '../components/plane/plane'
import Flash from '@/components/flash'
import prompt from '../components/prompt'
/**
 * this.$refs.prompt.show()
 * this.$refs.prompt.close()
 */
export default {
  name: "Register",
  components: {
    plan,
    prompt
  },
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
        state: 1,// 发送成功状态改为0
        text: "获取验证码"
      },
      imgCode:{ // 图形验证码
        code:'',
        key:''
      },
      register:"",//是否注册
      cardVoucher:true,//卡券是否过期
      use_status:"",//卡券是否过期
      valid_time_end:"",//卡券时间
      showContent:false,//内容是否显示
    };
  },
  created() {
    this._getInit()
  },
  mounted() {
    // this.$refs.prompt.close()
  },
  computed: {
    data(){
      return this.$JinrSDK.getUrl().data;
    }
  },
  methods: {
    //初始化
    _getInit(){
      // Flash(this.data)
      let params = {
        data: this.$JinrSDK.getUrl().data
      }
      this.$http("xg/app/zeroYuan",params).then(res=>{
        res.data.isLogin = 1
        this.register = res.data.isLogin
        this.$root.intData = res.data.inIData;
        // this.getHb()
        // console.log('---',res)
        this.valid_time_end = res.data.redEnvelope.valid_time_end
        this.use_status = res.data.redEnvelope.use_status
        this.showContent = true
      }).catch(error=>{
        this.showContent = true
      })
    },
    //跳转投资计划页
    goInvest(){
       try {
        JinrStock.pushInvestPlan()
      } catch (error) {
      }
    },
    //获取手机号码
    _getPhoneCode() {
      let { state, text } = this.isSend;
      let phone = /^1[3|4|5|6|7|8|9]\d{9}$/;
      if (!state) {
        return;
      }else if(!phone.test(this.formData.phone)){
        this.$flash('请填写手机号')
        return
      }
      let params = {
        mobile: this.formData.phone,
      };
      this.$http("xg/app/fastGetPhoneCode", params).then(res => {
        console.log(res);
        if (res.code == 10000) {
          this.isSend.text = "60s";
          this.isSend.state = 0; // 发送成功状态改为0
          this._countdown();
          this.$flash("验证码发送成功");
        } else {
          // this.getImgCode();
          this.$flash(res.msg);
        }
      });
    },
    //获取验证码
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
      let phone = /^1[3|4|5|6|7|8|9]\d{9}$/;
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
            // this.$flash("领取成功");
            this.$refs.prompt.show()
            this.register = !this.register
            this.data = res.data.data
            this.valid_time_end = res.data.redEnvelope.valid_time_end
            this.use_status = res.data.redEnvelope.use_status
            // this.getHb()
          }
        })
        .catch(error => {
          console.log("error", error);
          this.$flash("注册失败");
        });
    },
    _close() {
      this.$emit("close", false);
    },
    //回到顶部
    Gotop(){
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    //获取红包
    getHb(){
      let params={
        data:this.data
      }
      this.$http("xg/app/registeRedEnvelope",params).then(res=>{
        console.log()
        this.use_status = res.data.redEnvelope.use_status
        this.valid_time_end = res.data.redEnvelope.valid_time_end
      })
    }
  }
};
</script>
<style lang="scss">
.register {
  overflow: hidden;
  padding-bottom: 160px;
  >.register1{
    width: 100%;
    height: 709px;
    overflow: hidden;
    >img{
      width: 100%;
    }
    > .register-section {
      	width: 649px;
        height: 259px;
        border-radius: 10px;
        border: solid 1px #c2bece;
        box-sizing: border-box;
        margin: 49px auto 0;
        padding: 0 57px 0 72px;
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
        position: relative;
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
          height: 54px;
          background-color: #3d85ff;
          border-radius: 20px;
          font-size: 30px;
          line-height: 54px;
          text-align: center;
          color: #fff;
          position: absolute;
          top: 27px;
          right: 0;
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

            &.check {
              width: 28px;
              height: 28px;
              margin-right:10px;
              background:url('../images/check_bg.png') no-repeat 100%/100%;
              > span {
                display: block;
                width: 18px;
                height: 18px;
                border-radius: 8px;
                margin: 0 auto;
              }
            }
            &.checked {
              background:url('../images/checked_bg.png') no-repeat 100%/100%;
            }
            &:last-child {
              > span {
                color: #3d85ff;
              }
            }
          }
        }
      }
      >div:nth-of-type(3){
        border: none;
      }
    }
    >.submit {
      width: 684px;
      height: 105px;
      background-color: #2772ff;
      border-radius: 20px;
      margin: 21px auto 0;
      font-size: 34px;
      color: #fff;
      line-height: 105px;
      text-align: center;
    }

  }
  >.register2{
    width: 100%;
    height: 656px;
    overflow: hidden;
    background: url("../images/register.png") no-repeat center/100% 656px;
    >.register2_readey{
      width: 650px;
      height: 83px;
      position: relative;
      margin: 0 auto;
      >h6{
        margin-top: 99px;
        font-size: 60px;
        font-weight: 600;
        line-height: 61px;
        letter-spacing: 0px;
        color: #ff5300;
      }
      >p{
        position: absolute;
        left: 177px;
        top: 254px;
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 61px;
        letter-spacing: 0px;
        color: #4e77fd;
        &.unreadey_p{
          margin-top:80px;
        }
      }
    }

   >.register2_unreadey{
      width: 650px;
      height: 83px;
      position: relative;
      margin: 0 auto;
      >h6{
        margin-top: 99px;
        font-size: 60px;
        font-weight: 600;
        line-height: 61px;
        letter-spacing: 0px;
        color: #ff5300;
      }
      >p{
        position: absolute;
        left: 177px;
        top: 254px;
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 61px;
        letter-spacing: 0px;
        color: #4e77fd;
        &.unreadey_p{
          margin-top:80px;
        }
      }
    }

    >.register2_unreadey{
      >h6{
        color: #6d6d6d;
        position: absolute;
        top: 99px;
        left: 50%;
        transform:translateX(-50%);
        margin-top: 0;
      }
    }
    >.register2_unreadey_sub{
      height: 200px
    }
    >.submit {
      width: 684px;
      height: 105px;
      background-color: #2772ff;
      border-radius: 20px;
      margin: 320px auto 0;
      font-size: 34px;
      color: #fff;
      line-height: 105px;
      text-align: center;
    }
    >.submit_sub {
      margin-top: 480px
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
  >.submit {
      width: 684px;
      height: 105px;
      background-color: #2772ff;
      border-radius: 20px;
      margin: 21px auto 0;
      font-size: 34px;
      color: #fff;
      line-height: 105px;
      text-align: center;
    }
}
</style>


