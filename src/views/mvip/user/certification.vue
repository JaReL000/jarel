<template>
  <div id="certificaton">
    <div v-show="show">
      <div class="certificat-top">
        {{xxx}}
        <h3>实名认证</h3>
        <p v-show="identify" class="pstate">已绑定身份信息</p>
        <p v-show="!identify" class="pstate">绑定身份信息</p>
        <p v-show="!identify" class="promit">请绑定本人的身份证,身份信息一经提交不可修改</p>
      </div>
      <ul class="inforbox">
        <li><span>姓名</span>
          <p v-show="!identify"><input type="text" placeholder="请输入您的姓名" v-model="identiname"></p>
          <p v-show="identify">{{identiname}}</p>
        </li>
        <li><span>身份证</span>
          <p v-show="!identify"><input type="text" placeholder="请输入您的身份证号码" v-model="identinum"></p>
          <p v-show="identify">{{identinum}}</p>
        </li>
      </ul>
      <div v-show="!identify" class="confirmbox"><button :disabled="!disabled" @click="comfirmfun">提交认证</button></div>

      <div class="resultbox" v-show="resultboxshow" @click="resultboxshow=false">
        <img v-show="!confirmidentyfy" src="../assets/identifyfaile.png" alt="鲸鱼,最好的理财平台">
        <img v-show="confirmidentyfy" src="../assets/identifyok.png" alt="鲸鱼,最好的理财平台">
      </div>
    </div>
  </div>
</template>
<script>
import {baseApi} from '../api'
export default {
  data(){
    return{
      responseing: false,
      identify:false,  //数据库初始认证状态
      identiname:'',   //姓名
      identinum:'',     //身份证号码
      confirmidentyfy:false, //记录提交验证后验证结果状态
      resultboxshow:false,   //控制验证结果展示
      xxx: null,
      show:false,
    }
  },
  created(){
    this.getmsg()
  },
  computed:{
    disabled(){
      return (this.identinum.length>1 && this.identiname.length>1)
    }
  },
  methods:{
    getmsg(){ //获取数据库出事数据

      let params = {
        servicename: 'user.index',
      }
      this.$http(params).then((response)=>{
        this.identiname = response.userInfo.username  //获取名字
        this.identinum = response.userInfo.identityid //获取身份证
        this.identify = response.userInfo.identityid ? true : false //初始化登入状态判断字段,用于控制控件显示
        this.show = true
      }).catch((err)=>{
        this.show = true
        console.log(err)
      })
    },
    comfirmfun(){ //提交认证
      if(this.responseing){
        return
      }
      this.responseing = true
      let params = {
        servicename : 'user.identity',
        card_no : this.identinum  || '',
        name : this.identiname  || ''
      }

      this.$http(params).then((response)=>{
        this.responseing = false
        this.$flash('认证成功');
        this.routerReplace('/index')
        return
        // this.getmsg();
      }).catch((err)=>{
        this.responseing = false
        // this.$flash(err);
        console.log(err)
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "~style/mixin.styl"

#certificaton
  position fixed
  height 100%
  width 100%
  background-color #fff

.certificat-top
  padding-top 38px
  h3
    width 190px
    height 190px
    margin 0 auto
    background-image url('../assets/certif.png')
    background-repeat no-repeat
    background-size 100% 100%
    text-indent -9999px
  .pstate
    height 74px
    line-height 74px
    text-align center
    font-size 32px
    color #333333
    text-align center
  .promit
    text-align center
    font-size 28px
    color #888888
.inforbox
  margin-top 92px
  padding 0 30px
  background #ffffff
  li
    height 100px
    line-height 100px
    border-bottom 1px solid #CCCCCC
    span
      float left
      width 130px
      padding-left 22px
      color #333333
      font-size 32px
    p
      padding-left 155px
      input
        background none
        line-height 100px
        width 100%
        font-size 32px
        color #BDBDBD

.confirmbox
  padding 90px 30px
  button
    width 100%
    height 96px
    // background #0C72E3
    background mColor
    color #ffffff
    font-size 30px
    border 0px
    border-radius 10px
    &:disabled
      background-color #ccc
.resultbox
  position fixed
  top 0px
  left 0px
  width 100%;
  height 100%;
  background rgba(0,0,0,0.5)
  img
    display block
    width 413px
    height 224px
    position absolute
    left 50%
    top 50%
    margin -112px 0 0 -206px

</style>

