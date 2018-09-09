<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.login
  z-index 2
  .from
    padding rem(295) rem(50) rem(25)
    .from-item
      position relative
      overflow hidden
      padding rem(20) 0
      margin-bottom rem(44)
      border-bottom 1px solid #DDDDDD
      .img_icon
        vertical-align middle
        display inline-block
        text-align center
        width rem(102)
        line-height 0
        img
          height rem(55)
          width auto
      input
        color #323232
        width 62%
        line-height rem(70)
        font-size rem(32)
      input::-webkit-input-placeholder
        line-height rem(86)
        font-size rem(28)
        color #909090
      a.eye
        float right
        height rem(70)
        width rem(50)
        background-image url("./images/eye_close_data64.png")
        background-size  @width rem(29)
        background-repeat no-repeat
        background-position center center
      a.open
        background-image url("./images/eye_open_data64.png")
      .close
        float right
        height rem(70)
        width rem(55)
        margin-right rem(20)
        background url("./images/delete_data64.jpg") no-repeat center center \/ rem(34) rem(34)
  .null-bor
    padding 0
    border none
    .forget
      text-align center
      a
        display inline-block
        padding 0 rem(10)
        font-size rem(32)
        color mainColor
      span
        display inline-block
        font-size rem(32)
        padding rem(0) rem(20)
        color mainColor
  &-btn
    padding rem(50) rem(50)
    input.login
      width 100%
      height rem(92)
      border-radius rem(12)
      font-size rem(32)
      background mainColor
      color baise
    input.login:disabled
      background-color #ccc
    input.login:active
      background-color #6699ff
</style>
<template>
  <transition name="fate" >
    <div class="login fixed">
      <div class="from">
        <div class="from-item">
          <div
            class="img_icon"><img
            src="./images/phone_data64.jpg"
            alt="手机号"></div>
          <input
            type="tel"
            class="tel"
            placeholder="输入11位手机号码"
            maxlength="13"
            v-model="tel"
            @blur="onBlur"
            @keyup="onKeyUp($event)"
          />
          <i
            class="close"
            v-show="disabledTel"
            @click="clearTel"
          ></i>
        </div>
        <div class="from-item">
          <div
            class="img_icon"><img
            src="./images/password_data64.jpg"
            alt="密码锁"></div>
          <input
            type="password"
            class="password"
            placeholder="请输入登录密码"
            maxlength="16" minlength="6"
            v-show="!open"
            v-model="passwordVal"
            @keyup="onKeyUpPW"
          >
          <input
            type="text"
            class="password"
            placeholder="请输入登录密码"
            maxlength="16" minlength="6"
            v-show="open"
            v-model="passwordVal"
            @keyup="onKeyUpPW"
          >
          <a href="javascript:;"
             class="eye" :class="{open}"
             @click.stop="eyeFun"></a>
          <i
            class="close"
            v-show="disabledPW"
            @click="clearPW"
          ></i>
        </div>
      </div>

      <div class="login-btn">
        <input
          class="login"
          type="button"
          value="登录"
          :disabled="!highlight"
          	@touchstart.stop.prevent="loginFun"
        >
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'login',
    components: {},
    data() {
      return {
        tel: '', 
        telVal: '',  
        passwordVal: '', 
        open: false,
        disabled: false,
        disabledTel: false,
        disabledPW: false,
        xx: 'jinr'
      }
    },
    computed: {
      highlight(){
        let reg = /^1[3|4|5|6|7|8]\d{9}$/
        

        let boolTel = reg.test(this.telVal)
        let boolPwd = this.passwordVal.length >= 6
        return boolTel && boolPwd
        return true
      }
    },

    watch: {
      tel(newValue, oldValue){

        let reg = /^[0-9]*$/
        let kong = /\s/g
        if(!reg.test(newValue)) this.tel = ''
        if(!reg.test(newValue) && !kong.test(newValue)) newValue = this.telVal = ''
        newValue = newValue.replace(kong, '')
        newValue = newValue.replace(/(^\d{3})(?=\d)/g, "$1 ")
        newValue = newValue.replace(/(\d{4})(?=\d)/g, "$1 ")
        this.tel = newValue
        this.telVal = this._Trim(this.tel, 'g')
      }
    },
    created() {},
    mounted() {},
    methods: {
      // 切换眼镜
      eyeFun() {
        this.open = !this.open
      },
      clearTel(){
        this.tel =  ''
        this.telVal = ''
        this.disabledTel = !this.disabledTel
      },
      clearPW(){
        this.passwordVal = ''
        this.disabledPW = !this.disabledPW
      },
      onBlur(){

      },
      onKeyUp(evt){

        let reg = /^[0-9]*$/
//        if(!reg.test(evt.key)) return
        if(this.telVal.length>0) this.disabledTel = true
        if(this.telVal.length>=11) return
        this.telVal = this._Trim(this.tel, 'g')
      },

      onKeyUpPW(){
        if(this.passwordVal.length>0) this.disabledPW = true
        this.passwordVal = this.passwordVal.replace(/[^\x00-\xff]/g,'')
      },

      loginFun(){
        this.$emit('loginFun', this.telVal, this.passwordVal)
      },

      findpassword(){
        this.$flash("请移步鲸鱼APP找回密码");
      },

      _Trim(str, is_global){
        var result;
        result = str.replace(/(^\s+)|(\s+$)/g,"");
        if(is_global.toLowerCase()=="g"){
          result = result.replace(/\s/g,"");
        }
        return result;
      }

    },
  }
</script>
