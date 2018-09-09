<style lang="stylus" rel="stylesheet/stylus">

  #registertwo
    padding 26px
    height 100%
    background-color #ffffff
    .topnom
      height 129px
      padding 0 23px
      line-height 90px
      p
        font-size 30px
        color #666666
        span
          color #0C72E3
    ul
      li
        height 76px
        line-height 76px
        border-bottom 1px solid #CCCCCC
        
        position relative
        .spantab
          float left
          width 157px
          padding-left 23px
          font-size 33px
          color #333333
        p
          padding-left 180px
          input
            width 100%
            line-height 76px
            color #C1C1C1
            font-size 32px
            background none
        button
          position absolute
          top 13px
          right 20px
          height 54px
          padding 0 20px
          border 1px solid #0C72E3
          border-radius 5px
          font-size 30px
          background #ffffff
          color #0C72E3
      li+li
        margin-top 39px
    .tips
      padding 0 18px
      line-height 47px
      font-size 26px
      color #C1C1C1
    .regbox
      padding-top 100px
      input[type="button"]
        width 100%
        height 96px
        display block
        background-color #0C72E3
        color #ffffff
        border-radius 10px
        font-size 32px
.imgcodepop
  width 100%
  height 100%
  position fixed
  top 0px
  left 0px
  background rgba(0,0,0,0.5)
  .codepopm
    position: fixed  
    top: 50%
    left: 50%
    transform: translate3d(-50%,-50%,0)
    width 80%
    padding: 20px     
    border-radius 5px
    background #ffffff
    h3
      margin-bottom 10px
      text-align center
      line-height 100px
      font-size 40px
    .imgbox
      padding 0px 38px 42px
      overflow hidden
      img
        width 200px
        height 80px
        float left
      input
        line-height 78px
        font-size 32px
        padding 0 30px
        border 1px solid #999999
        width 45%
        margin-left 20px
        float left
    .codebtns
      text-align center
      padding-bottom 40px
      button
        height 75px
        width 38%
        margin 0 5%
        border 0px
        background #CCCCCC;
        font-size 38px
        color #fff
      button.ok
        background #0C71E3

</style>
<template>
  <transition name="fater" >
    <div id="registertwo" >
      <div class="topnom"><p>点击获取验证码至 <span>{{tetnum}}</span></p></div>
      <ul>
        <li>
          <span class="spantab">验证码</span>
          <p><input type="text" placeholder="请输入验证码" v-model="formData.code"></p>
          <button @click="getimgcode" :disabled="!show">
            <span v-show="show" v-text="codeText"></span>
            <span v-show="!show" class="count">{{count}} s</span>
          </button>
        </li>
        <li>
          <span class="spantab">密码</span>
          <p><input type="password" placeholder="请输入6位数以上数字或字母组合" v-model="formData.password1"></p>
        </li>
        <li>
          <span class="spantab">密码</span>
          <p><input type="password" placeholder="请再次确认密码" v-model="formData.password2"></p>
        </li>
      </ul>
      <div class="tips">注：密码区分大小写，建议使用6位以上数字、字母组合</div>
      <div class="regbox"><input type="button" value="注册" @click="doregister()"></div>

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
    </div>
  </transition>
</template>

<script>

  export default {
    name: 'registertwo',
    components: {},
    data() {
      return {
        formData: {
          password1:'',
          password2:'',
          code:'',
        },
        tetnum:'123',
        show:true,
        count:'',
        timer:null,

        codeimg:'',  //展示的图形验证
        inputcode:'',
        codepopshow:false,
        resposeing: false,
        codeText: '获取验证码'
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
      this.tetnum = this.$route.query['telnum'];
      // this.tetnum = "14870430011";
      // this.getimgcode()
    },
    methods: {
      getimgcode(){  //验证图形验证码
        this.codepopshow=true
        this.codeimg = process.domain + '/m/index/?servicename=user.getRegisterImgCode&t='+new Date().getTime()
        // this.codeimg = 'http://jinrpc.dev.jinr.com/m/index/?servicename=user.getRegisterImgCode&t='+new Date().getTime()
      },

      verifyimgcode(){  //验证图形验证码
        if(this.resposeing) return
        this.resposeing = true
        let params={
          servicename : 'user.imgCodeValidate',
          imgCode : this.inputcode  || ''
        }
        this.$http(params).then((res)=>{
          setTimeout(()=> {
            this.resposeing = false
          }, 1000);
          console.log('验证图形验证码成功')
          this.getCode();

          this.codepopshow=false
        }).catch((err)=>{
          setTimeout(()=> {
            this.resposeing = false
          }, 1000);
        })
      },

      //获取短信验证码
      getCode(){  
        if (!this.timer){
          // if(this.resposeing) return
          // this.resposeing = true
          let params={
            servicename : 'user.sendRegisterSms',
            mobile : this.tetnum  || '',
          }
          
          this.$http(params).then((response)=>{
            setTimeout(()=> {
              this.resposeing = false
            }, 1000);
            this.count = 60;
            this.show = false;
            // this.$flash("发送成功")
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= 60) {
                this.count--;
              } else {
                this.show = true;
                this.codeText = '重新获取验证码'
                clearInterval(this.timer);
                this.timer = null;
              }
            }, 1000)
          }).catch(function(error){
            setTimeout(()=> {
              this.resposeing = false
            }, 1000);
            this.$flash(response.msg)
          });
        }
      },
      doregister(){  //注册执行
        if(this.formData.code == ""){
          this.$flash("验证码不能为空")
          return;
        }else if(this.formData.password1 == "" || this.formData.password2 == ""){
          this.$flash("密码不能为空")
          return;
        }else if(this.formData.password1 != this.formData.password2){
          this.$flash("两次输入的密码不一致")
          return;
        }
        if(this.resposeing) return
        this.resposeing = true
        let params={
          servicename : 'user.register',
          mobile: this.tetnum  || '',
          // password: this.formData.password1,
          password: this.encrypt(this.formData.password1)  || '',
          // password: this.encrypt(this.passwordVal),
          code: this.formData.code  || '',
          combination_id : sessionStorage['combination_id']  || '',
          param : sessionStorage['param']  || '',
        }

        this.$http(params).then((response)=>{
          setTimeout(()=> {
            this.resposeing = false
          }, 1000);
          
          setTimeout(()=> {
            this.$router.push({
              path: '/'
            })
          }, 500);
          this.$flash("注册成功");
        }).catch((error)=>{
          setTimeout(()=> {
            this.resposeing = false
          }, 1000);
          // this.$flash(response.msg)
        });
      }
    },
    
  }
</script>
