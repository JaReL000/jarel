<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.login-auth
  height 100%
  background-color baise
  .top
    padding-top 50px
    text-align center
    img
      width 350px
  .from
    padding rem(105) rem(50) rem(25)
    .from-item
      position relative
      overflow hidden
      padding rem(20) 0 0
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
      input
        padding-left 20px
        color #323232
        width 62%
        line-height rem(70)
        font-size rem(32)
      input::-webkit-input-placeholder
        line-height rem(86)
        font-size rem(30)
        color #bdbdbd
      a.eye
        float right
        height rem(70)
        width rem(50)
        background-image url("../assets/eye_close_data64.png")
        background-size  @width rem(29)
        background-repeat no-repeat
        background-position center center
      a.open
        background-image url("../assets/eye_open_data64.png")
      .close
        float right
        height rem(70)
        width rem(55)
        margin-right rem(20)
        background url("../assets/delete_data64.jpg") no-repeat center center \/ rem(34) rem(34)
  .null-bor
    padding 0
    border none
    .forget
      text-align left
      overflow hidden
      padding 0  40px
      a
        float left
        padding 0 rem(10)
        font-size 28px
        color mainColor
        text-decoration underline
      a.shouye
        float right
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
      background mColor
      color baise
    input.login:disabled
      background-color #ccc
    input.login:active
      background-color #6699ff
</style>
<template>
  <transition name="fate" >
    <div class="login-auth fixed">
      <div class="top"><img src="./top_login_auth.png" alt="鲸鱼"></div>
      <div class="from">
        <div class="from-item">
          <input
            type="tel"
            class="tel"
            placeholder="请输入鲸鱼账号"
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
          <input
            type="password"
            class="password"
            placeholder="请输入鲸鱼密码"
            maxlength="16" minlength="6"
            v-show="!open"
            v-model="passwordVal"
            @keyup="onKeyUpPW"
          >
          <input
            type="text"
            class="password"
            placeholder="请输入鲸鱼密码"
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

      <div class="login-auth-btn">
        <input
          class="login"
          type="button"
          value="提交"
          :disabled="!highlight"
          @click="loginFun"
        >
      </div>

      <div class="from-item null-bor">
          <div class="forget">
            <!-- <a href="/user/register.html">快速注册</a> -->
            <router-link to="/register">还不是鲸鱼用户?</router-link>
            <router-link class="shouye" to="/">暂不绑定, 去登陆</router-link>
          </div>
        </div>
    </div>
  </transition>
</template>

<script>
  import {
    Trim
  } from 'utils/utils.js'

  export default {
    name: 'login',
    components: {},
    data() {
      return {
        tel: '', //   14850520030 14870610006
        telVal: '',  //   14850520030  14812345688 14870610006
        passwordVal: '', //   c123456 a123456 c123456
        open: false,
        disabled: false,
        disabledTel: false,
        disabledPW: false,
        xx: 'jinr',
        responseing: false
      }
    },
    computed: {
      highlight(){
        let reg = /^1[3|4|5|6|7|8|9]\d{9}$/
        // let reg = /^(1[358][0-9]|14[57]|17[01678]|199)[0-9]{8}$/
//        let regPws = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
//        let boolPwd = regPws.test(this.passwordVal)

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
        this.telVal = Trim(this.tel, 'g')
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
        this.telVal = Trim(this.tel, 'g')
      },

      onKeyUpPW(){
        if(this.passwordVal.length>0) this.disabledPW = true
        this.passwordVal = this.passwordVal.replace(/[^\x00-\xff]/g,'')
      },

      loginFun(){
        // 进行加密
        // let mobile = this.encrypt(this.telVal, 'mobile')
        // let password =
        // console.log(mobile, password);

        if(this.responseing){
          return
        }
        this.responseing = true

        this.$http({
          mobile: this.telVal  || '',
          // password: this.passwordVal,
          password: this.encrypt(this.passwordVal)  || '',
          type: 'pwd',
          servicename:'user.login',
          combination_id: sessionStorage['combination_id']  || '',
          param: sessionStorage['param']  || ''
        }).then((res)=>{
          setTimeout(()=> {
            this.responseing = false
          }, 770);
          this.$root.checked = res.event.checked
          // this.$router.replace('bindWxDone')
          this.bindWxFun()
          // window.location.href= this.$route.query.redirectUrl

        }).catch((error)=>{
          setTimeout(()=> {
            this.responseing = false
          }, 770);
          // this.$flash(response.msg)
          console.log('res.msg-----------------------')
          console.log(error)
        });
      },

      // 绑定
      bindWxFun(){
        this.$http({
          servicename:'user.bindWx',
          wxKey: this.$route.query.wxKey,
        }).then((res)=>{
          this.$router.replace('bindWxDone')

        }).catch((error)=>{
          console.log('res.msg-----------------------')
          console.log(error)
      });
      },

      findpassword(){
        // this.$flash("请移步鲸鱼APP找回密码");
        this.$messagebox({
          title: '下载APP' ,
          message: '请前往应用商店下载鲸鱼APP完成操作',
          showCancelButton: true,
          closeOnClickModal: false,
        }).then((action) => {
          if(action==='cancel'){
              // this.$router.go(-1)
          }else if(action==='confirm'){
            location.href='http://a.app.qq.com/o/simple.jsp?pkgname=com.jinr.core'
          }

        });
      }

    },
  }
</script>
