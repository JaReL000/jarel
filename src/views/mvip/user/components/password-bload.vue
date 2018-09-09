<template>
  <div id="password-bload">
    <div class="passwordinput">
      <p class="ptitle">{{titilemsg}}</p>
      <div class="inputbox">
        <span>{{inputvaule.input0}}</span>
        <span>{{inputvaule.input1}}</span>
        <span>{{inputvaule.input2}}</span>
        <span>{{inputvaule.input3}}</span>
        <span>{{inputvaule.input4}}</span>
        <span>{{inputvaule.input5}}</span>
      </div>
    </div>
    <div class="message-keyboad">
      <div class="keybox"><div class="key" @click="keyclick('1')">1</div></div>
      <div class="keybox"><div class="key" @click="keyclick('2')">2</div></div>
      <div class="keybox"><div class="key" @click="keyclick('3')">3</div></div>
      <div class="keybox"><div class="key" @click="keyclick('4')">4</div></div>
      <div class="keybox"><div class="key" @click="keyclick('5')">5</div></div>
      <div class="keybox"><div class="key" @click="keyclick('6')">6</div></div>
      <div class="keybox"><div class="key" @click="keyclick('7')">7</div></div>
      <div class="keybox"><div class="key" @click="keyclick('8')">8</div></div>
      <div class="keybox"><div class="key" @click="keyclick('9')">9</div></div>
      <div class="keybox"><div class="key"></div></div>
      <div class="keybox"><div class="key" @click="keyclick('0')">0</div></div>
      <div class="keybox"><div class="key" @click="delectclick()">X</div></div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      titilemsg:'设置交易密码',
      password1:'',  //记录第一次设置交易密码
      password2:'',  //记录第二次设置交易密码
      cursor:0,
      inputvaule:{
        input0:'',
        input1:'',
        input2:'',
        input3:'',
        input4:'',
        input5:'',
      }
    }
  },
  methods:{
    keyclick(value){
      this.inputvaule["input"+this.cursor] = value
      this.cursor++
      if(this.cursor>5 && this.password1 == ""){
        this.password1 = this.inputvaule.input0+this.inputvaule.input1+this.inputvaule.input2+this.inputvaule.input3+this.inputvaule.input4+this.inputvaule.input5
        console.log(this.password1)
        this.titilemsg = "再次输入交易密码"
        this.clearinput()

      }else if(this.cursor>5 && this.password1 && this.password2 == ''){
        this.password2 = this.inputvaule.input0+this.inputvaule.input1+this.inputvaule.input2+this.inputvaule.input3+this.inputvaule.input4+this.inputvaule.input5

        console.log(this.password2)
        if(this.password1 != this.password2){
          this.password2 = ''
          this.password1 = ''
          this.titilemsg = "重新设置交易密码"
          this.clearinput()
          this.$flash("两次密码不一样");
        }else{
          console.log("相同")
          let params = {
            servicename: 'user.tradePasswordSet',
            // trade_password: this.password1,
            trade_password: this.encrypt(this.password1)  || ''
          }
          this.$http(params).then((response)=>{
            this.$flash("设置成功")
            console.log(response)
            this.password2 = ''
            this.password1 = ''
            setTimeout(()=>{
              if(response.redirectUrl){
                window.location=response.redirectUrl
              }else{
                this.routerReplace("/index",{},"鲸鱼")
                // this.routerReplace("/personalCenter",{},"个人中心")
              }
              // this.routerReplace("/personalCenter"," ","个人中心")
              // this.$router.push("/")
            }, 400);
          }).catch((err)=>{
            // this.$flash(err)
          })
          this.clearinput()
        }
      }
    },
    delectclick(){
      this.cursor--
      this.inputvaule["input"+this.cursor] = ''
      if(this.cursor <=0){
        this.cursor = 0
      }
    },
    clearinput(){
      this.cursor = 0
      this.inputvaule.input0 = ''
      this.inputvaule.input1 = ''
      this.inputvaule.input2 = ''
      this.inputvaule.input3 = ''
      this.inputvaule.input4 = ''
      this.inputvaule.input5 = ''
    }

  }
}
</script>
<style lang="stylus" scoped>
.passwordinput
  width 100%
  height 100%
  position fixed
  top 0px
  left 0px
  background #F5F5F5
  .ptitle
    padding 57px 30px 0
    line-height 116px
    text-align center
    font-size 32px
    color #999999
  .inputbox
    text-align center
    width 610px
    margin 0 auto
    span
      float left
      background #ffffff
      width 99px
      text-align center
      height 99px
      line-height 99px
      border 1px solid #7E7E7E
      margin-left -1px
.message-keyboad
  position absolute
  width 100%
  bottom 0px
  left 0px
  .keybox
    width 33.33%
    float left
    .key
      height 100px
      text-align center
      line-height 100px
      background #ffffff
      border-top 1px solid #bbbbbb
      border-right 1px solid #bbbbbb
      font-size 50px
  .keybox:nth-child(3n)
    .key
      border-right none
</style>




