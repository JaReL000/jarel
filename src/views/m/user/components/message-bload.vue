<template>
  <div id="message-bload">
    
    <div class="shotmessage">
      <div class="messagetip">
        <p>验证银行卡预留手机号</p>
        <p>已向<span>{{telnum}}</span>发送短信</p>
      </div>
      <div class="messageinputbox">
        <span>{{inputvaule.input0}}</span>
        <span>{{inputvaule.input1}}</span>
        <span>{{inputvaule.input2}}</span>
        <span>{{inputvaule.input3}}</span>
        <span>{{inputvaule.input4}}</span>
        <span>{{inputvaule.input5}}</span>
      </div>
      <div class="sentagain">
        <button :disabled="clickable" @click="sentmessage()">
          <span v-show="!clickable">重新获取验证码</span>
          <span v-show="clickable">{{count}}</span>
        </button>
        <p></p>
        <button :disabled="!disable" class="nextstep" @click="nextstep()">下一步</button>
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
    <loading v-if="response"></loading> 
  </div>
</template>

<script>
export default {
  data(){
    return{
      responseing: false,
      message:'', //记录输入的验证码
      cursor:0,    //用于记录当前输入框
      timer:null,  //定时器
      telnum:'1588888****',//电话号码

      clickable: false, //控制获取验证码按钮可点击状态

      count:'60',
      
      //timecontropro:this.timeController,

      inputvaule:{  //用于记录输入的内容
        input0:'',
        input1:'',
        input2:'',
        input3:'',
        input4:'',
        input5:'',
      }
    }
  },
  props:{

  },
  computed: {
    disable(){
      return this.message.length===6
    }
  },
  mounted(){
    this.startime()
    this.telnum = this.$route.query.telnum
  },
  watch:{
  },
  methods:{
    keyclick(vule){
      this.inputvaule["input"+this.cursor] = vule
      this.message = this.message + this.inputvaule["input"+this.cursor]
      this.message = this.message.substr(0,6)
      this.cursor++
      console.log(this.message);
      if(this.cursor>=6){
        this.cursor = 6
      }
    },
    delectclick(){
      this.cursor--
      this.message = this.message.substr(0,this.cursor)
      console.log(this.message)
      this.inputvaule["input"+this.cursor] = ''
      if(this.cursor <=0){
        this.cursor = 0
      }
    },
    startime(){ //定时器
      console.log('启动定时器')
      this.clickable = true
      this.count = 60;
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        if (this.count > 0 && this.count <= 60) {
          this.count--;
        } else {
          clearInterval(this.timer);
          this.clickable =false
        }
      }, 1000)
    },
    sentmessage(){ //发送短信验证码
      if(this.responseing){
        return
      }
      this.responseing = true
      let params = {
        servicename: 'bank.bindCardSmsRetry',
      }
      this.$http(params).then((response)=>{
        // this.response = false
        setTimeout(()=> {
          this.responseing = false
        }, 1000);
        this.startime();
      }).catch((err)=>{
        // this.response = false
        setTimeout(()=> {
          this.responseing = false
        }, 1000);
        // this.$flash(err)
      })
    },
    nextstep(){
      if(this.responseing){
       
        return
      }
      this.responseing = true
      let params = {
        servicename: 'bank.bankCardConfirm',
        sms_code: this.message || '',
        combination_id: sessionStorage['combination_id'] || '',
        param: sessionStorage['param'] || ''
      }
      this.$http(params).then((response)=>{
        // this.response = false
        setTimeout(()=> {
          this.responseing = false
        }, 1000);
        // this.$router.push("/certification/password")
        this.routerReplace("/certification/password")
        // this.message = ''
      }).catch((err)=>{
        // this.response = false
        setTimeout(()=> {
          this.responseing = false
        }, 1000);
        // this.$flash(err)
        // this.message = ''
      })
    }

  }
}
</script>

<style lang="stylus" scoped>
.shotmessage
  width 100%
  height 100%
  position fixed
  top 0px
  left 0px
  background #f5f5f5
  .messagetip
    padding 38px 30px
    p
      line-height 56px
      font-size 32px
      color #BBBBBB
      span 
        color #0C72E3
  .messageinputbox
    text-align center
    padding-top 25px
    width 520px
    margin 0 auto
    overflow hidden
    span 
      float left
      width 60px
      height 60px
      line-height 60px
      border-bottom 1px solid #878787
      margin 0 13px
  .sentagain
    padding 82px 30px 0
    text-align center
    p
      padding-top 30px
      line-height 78px
      text-align right
    button
      border 0px
      padding 10px 20px
      border-radius 6px
      &:disabled
        background-color #ccc
    .nextstep
      width 100%;
      line-height 96px
      border 0px
      background #0c72e3
      border-radius 10px
      font-size 32px
      color #ffffff
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


