<style lang="stylus" rel="stylesheet/stylus">
@import '~style/mixin.styl';

.result
  .banner-vip
    img
      width: 100%;
      height: 360px;
  .main
    padding: 0px 28px 0;
    color: #333;
    .pk
      overflow: hidden;
      padding-top: 60px;
      text-align: center;
      .pk-title
        float: left;
        line-height: 380px;
        font-size: 46px;
        color: #ff8400;
      .pk-conten
        float: left;
        padding: 0px 30px 20px;
        width: 248px;
        h2
          height: 75px;
          line-height: @height;
          background-color: #8fb2d8;
          border-radius: 12px 12px 0 0;
          font-size: 30px;
          color: #fff;
        .conten
          width: 246px;
          padding-top: 70px;
          padding-bottom: 112px;
          border-radius: 0 0 12px 12px;
          background-color: rgb(255, 255, 255);
          box-shadow: 0px 2px 16px 0px rgba(18, 117, 215, 0.16);
          color: #999999;
          h1
            height: 84px;
            line-height: @height;
            font-size: 60px;
            span
              font-size: 28px;
          p
            height: 38px;
            line-height: @height;
            font-size: 24px;
      .pk-vip
        h2
          background-color: $mvip-color;
        .conten
          background: url('../assets/wansheng@2x.png') no-repeat right bottom;
          background-size: 123px 103px;
          color: $mvip-color;
          p
            color: #333;
    .form
      position: relative;
      padding: 44px 42px;
      &__item
        position: relative;
        overflow: hidden;
        width: 100%;
        margin-bottom: 22px;
        text-align: left;
        input
          width: 100%;
          height: 98px;
          margin: 30px 0;
          height: 38px;
          border-radius: 12px;
          line-height: @height;
          text-indent: 30px;
          font-size: 30px;
          box-sizing: border-box;
          &::-webkit-input-placeholder
            line-height: rem(44);
            font-size: rem(28);
            color: #909090;
      .aBtnRe
        width: 100%;
        height: 98px;
        padding-top: 30px;
        .register-btn
          height: 98px;
          width: 100%;
          border: none;
          text-indent: 0;
          border-radius: 12px;
          line-height: 98px;
          font-size: 34px;
          background-color: $mvip-color;
          color: #ffffff;
          &:active
            background-color: mainColor;
          &:disabled
            background-color: #bdbdbd;
  .showAlert
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    background: rgba(0, 0, 0, 0.5);
    .convip
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      // width 540px
      // padding: 20px
      border-radius: 12px;
      background: #ffffff;
      img
        width: 540px;
        height: 360px;


</style>
<template>
<div class="result">
  <loading v-if="!show"></loading>
  <div v-if="show">
    <div class="banner-vip"><img src="../assets/vip_banner.jpg" alt="鲸鱼"></div>
    <!-- 主体区域 -->
    <div class="main ">
      <!-- PK -->
      <div class="pk">
        <div class="pk-conten">
          <h2>鲸鱼APP</h2>
          <div class="conten">
            <h1>{{old_regular}}<span>%</span></h1>
            <p>年定期利率</p>
          </div>
        </div>
        <h4 class="pk-title">PK</h4>
        <div class="pk-conten pk-vip">
          <h2>鲸鱼VIP专享</h2>
          <div class="conten">
            <h1>{{vip_regular}}<span>%</span></h1>
            <p>年定期利率</p>
          </div>
        </div>
      </div>
      <div class="form">
        <div class="form__item border-px">
          <input
            type="tel" class="tel"
            placeholder="输入11位手机号码"
            maxlength="13"
            v-model="tel"
          />
        </div>
        <!-- 按钮 -->
        <div class="aBtn aBtnRe" >
          <input
            type="button"
            class="firstCast register-btn"
            :value="btnValue"
            :disabled="!highlight"
            @click="isExistFun"
          />
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
      tel: "",
      telVal: "",
      btnValue: "开启鲸鱼财富之旅",
      isRegister: true, // 是否已经注册
      responseing: false,
      old_regular: "",
      vip_regular: "",
      showAlert: false
    };
  },
  computed: {
    highlight() {
      let reg = /^1[3|4|5|6|7|8|9]\d{9}$/;

      let boolTel = reg.test(this.telVal);
      return boolTel;
    }
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
    this.initFun();
  },
  mounted() {},
  methods: {
    initFun() {
      this.$http({
        servicename: "api.index",
        mobile: this.telVal || ""
      })
        .then(response => {
          this.show = true;
          console.log(response);
          this.old_regular = response.productList.old_regular.rate_init;
          this.vip_regular = response.productList.vip_regular.rate_init;
        })
        .catch(function(error) {
          this.show = true;
          console.log("失败了:" + error);
        });
    },

    isExistFun() {
      this.$http({
        servicename: "user.vipMobileExist",
        mobile: this.telVal || ""
      })
        .then(response => {
          console.log(response);

          if (response.register_status === "register") {
            console.log("----", this.$route.query.inviteCode);
            this.routerPush("registertwo", {
              telnum: this.telVal,
              inviteCode: this.$route.query.inviteCode
            });
          } else if (response.register_status === "login") {
            this.routerPush("login", {
              tel: this.telVal,
              inviteCode: this.$route.query.inviteCode
            });
            return;
          } else {
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
    },

    showAlertFun() {
      this.showAlert = !this.showAlert;
    }
  }
};
</script>
