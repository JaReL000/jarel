<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.feedback
  background-color #fff
  .feedback_banner
    margin-bottom 30px
    img
      height 100px
      width 100%
  .feedback-con 
    position relative
    padding: 0 30px 0;
    .feedback-text
      position relative
      textarea 
        width: 100%;
        height: 368px;
        font-size: 30px;
        padding: 28px 0px 30px;
        text-indent:35px
        border-color #b2b2b2
        border-radius 5px
        resize: none;
        &::-webkit-input-placeholder 
          font-size: 24px;
          color: #b2b2b2;
      .file 
        position: absolute;
        left 12px
        bottom 26px
        border-radius: 4px;
        padding: 4px 12px;
        color: #1E88C7;
        text-decoration: none;
        text-indent: 0;
        line-height: 20px;
        input 
          position: absolute;
          font-size: 100px;
          right: 0;
          top: 0;
          opacity: 0;
        &:hover 
          color: #004974;
          text-decoration: none;
        img   
          width 50px
    .feedback-num 
      text-align: left;
      height 50px;
      line-height 50px;
      font-size: 24px;
      padding: 0 20px 0px 20px;
      margin-bottom 0px
      color: #999;
      span 
        font-size: 24px;
        color: #999;
        line-height 50px;
    .tell-text
      width 100%
      border 1px solid #b2b2b2
      border-radius 10px
      margin-bottom 30px
      overflow hidden
      input 
        // padding-left 25px
        text-indent 25px
        margin 30px 0
        width 100% 
        font-size: 24px;
    .feedback-submit 
      padding 50px 5px
      input.subtn
        width 100%
        height 95px
        border-radius rem(6)
        font-size rem(32)
        background mColor
        color baise
      input.subtn:disabled
        background-color #ccc
      input.subtn:active
        background-color #6699ff
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
        &>h5 
          text-align center
          width 200px
          height 80px
          float left
          line-height 80px
          font-size 34px
          letter-spacing 6px
          color #333
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
        input
          height 75px
          width 38%
          margin 0 5%
          border 0px
          background #CCCCCC;
          font-size 38px
          color #fff
        input.ok
          background #0C71E3
        input:disabled
          background-color #ccc
        input:active
          background-color #6699ff


</style>

<template>
  <transition name="fate" >
    <div class="feedback fixed" >
      <loading v-if="!show" ></loading>
      <div
        v-if="show" 
      >
        <div class="feedback_banner"><img src="./images/feedback_banner@3x.png" alt="横幅"></div>
        <!-- 
          表单 

          name="imgForm" 
          enctype="multipart/form-data" 
          action="图片上传接口" 
          method='post'> 
        -->
        <form 
          class="feedback-con" 
          @submit.prevent="submit"  
        >
          <div class="tell-text">
            <input 
              type="text" 
              maxlength="11" 
              minlength="6"
              placeholder="请输入鲸鱼注册手机号"
              v-model="tel"
            >
          </div>
          <div class="feedback-text">
            <!-- 文本输入框 -->
            <textarea 
              name="text" 
              placeholder="写下您的宝贵意见或建议" 
              v-model="items.text" 
              ref="count"
            ></textarea>
            <!-- 上传图片图标 -->
            <div class="file">
              <input 
                id="upload" 
                class="pic" 
                type="file" 
                placeholder="上传安全风险图片" 
                @change="getFile($event)" 
                value="" 
                accept="image/*,audio/*"
                name="upload"
              >
              <img :src="tupian" alt="选择图片">
            </div> 
          </div>
        
          <div class="feedback-num">还可以输入<span >{{300 - number}}</span><span></span>个字</div>
          
          
          <div class="feedback-submit">
            <input
              class="subtn"
              type="button"
              value="提交"
              :disabled="!highlight"
              @click="getVerifyCode($event)"
            >
          </div> 
        </form>  
      </div>
      <!--  -->
      <div class="imgcodepop" v-show="codepopshow">
        <div class="codepopm">
          <!-- <h3>输入图形验证码</h3> -->
          <h3>输入验证码</h3>
          <div class="imgbox">
            <!-- <img 
              :src="codeimg" 
              alt="稳健收益" 
              @click="getimgcode"
            /> -->
            <h5 
              v-text="codeimg" 
              @click="getVerifyCode"
            ></h5>
            <input 
              type="text" 
              v-model="inputcode" 
              maxlength="4" 
              minlength="4"
              placeholder="输入验证码"
            />
          </div>
          <div class="codebtns">
            <input 
              type="button"
              value="取消" 
              @click="colseFun" 
            />
            <input 
              type="button" 
              value="确认" 
              :disabled="!codeHighlight"  
              @click="onSubmit" 
              class="ok"
            />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { upload } from '../api'
  import { signFun } from 'mixins/mixin'
  import { isMobile, isWeixn } from 'utils/utils'

  import Loading from 'components/loading'

  // let wx = require('weixin-js-sdk');
  export default {
    components: {},
    data() {
      return {
        show: false,
        num: '',
        number: 0,
        items: {
          text: '',
          file: '',
        },
        images: {
          localId: [],
          serverId: []
        },
        tupian: require('./images/feedback_photo.png'),
        responseing: false,
        tel: '',

        codeimg:'加载中..',  //展示的图形验证
        inputcode:'',
        codepopshow:false,
        resposeing: false,
        codeText: '获取验证码'
      }
    },
    computed: {
      highlight(){
        let bool = this.items.text.length >= 1
        return bool 
      },
      codeHighlight(){
        let bool = this.inputcode.length >= 4
        return bool 
      },

    },
    watch: {
      //watch()监听某个值（双向绑定）的变化，从而达到change事件监听的效果
      items: {
        handler: function() {
          var _this = this;
          var _sum = 300; //字体限制为300个
          _this.$refs.count.setAttribute("maxlength", _sum);
          _this.number = _this.$refs.count.value.length;
        },
        deep: true
      }
    },
    created() {
      // 微信且线上开发机环境
      if(!isWeixn() && process.env.NODE_ENV === 'prod'){
        if(isMobile){
          window.location.href = '/'
        }else{
          window.location.href = 'https://jinr.com'
        }
        
      }
    },
    mounted() {
      // this.initFun()
      this.show = true
      
    },
    methods: {
      
      getFile(event) {
        let files = event.target.files[0];
        let bool = (files.type=='image/png') || (files.type=='image/jpeg')
        
        // 判断图片格式
        if(bool){ 
          this.items.file = files
          this._genBase64(files)
         
        }else{
          this.$flash('图片格式不正确');
          // event.target.files.length = 0;
          // $(event.target).val('');
          return false
        }
      },

      showCodeFun(){
        let reg = /^1[3|4|5|6|7|8|9]\d{9}$/
        if(!this.tel){
          this.$flash("请填写鲸鱼注册手机号");
          return false;
        }else if(!reg.test(this.tel)){
          this.$flash("手机号格式不正确");
          return false;
        }
        this.getVerifyCode()
      },

      /**
       * 反馈意见提交
       * @author 7043
       * @param { event }  事件
       */
      onSubmit(event) {
        let reg = /^1[3|4|5|6|7|8|9]\d{9}$/
        if(!this.tel){
          this.$flash("请填写鲸鱼注册手机号");
          return false;
        }else if(!reg.test(this.tel)){
          this.$flash("手机号格式不正确");
          return false;
        }

        let text;
        
        // 禁止提交空文本
        if (!this.items.text) {
          this.$flash("提交内容不能为空!");
          return false;
        }else{
          text = this.items.text + '  用户手机号： ' + this.tel
        }
        
        // 仿重复提交
        if(this.responseing){ 
          return
        }
        this.responseing = true
        //创建form对象
        let formData = new FormData(); 
  
        let param = {
          servicename: 'feedback.submitFeedback',
          text: text,
          verifycode: this.inputcode
        }
        formData.append('servicename', param.servicename);
        // formData.append('imgCode', this.inputcode);
        formData.append('verifycode', param.verifycode);

        //如果有图片加入字段
        if(this.items.file){
          param.file = this.items.file
          formData.append('image', param.file); 
        }
        // 文本内容
        formData.append('problem', param.text); 
        // 加密验签
        formData.append('sign', signFun(param)); 
        // 随机数
        formData.append('nonceStr', Math.random()); 

        // 域名处理
        let domain = process.domain;
        let ishttps = 'https:' == document.location.protocol ? true : false;
        if (ishttps) {
          domain = domain.replace("http", "https");
        }
        domain = process.env.NODE_ENV === 'dev' ? '' : domain

        
        // 请求发送
        Loading.open('Loading...');
        upload(domain + '/m/index', formData).then((res)=>{
          Loading.close()
          
          this.responseing = false
          this.items.text = ''
          this.number = 0
          this.tupian = require('./images/feedback_photo.png')
          
          this.colseFun()
          this.$flash(res.msg)
          
        }).catch((err)=>{
          Loading.close()
          this.responseing = false
          this.colseFun()
          console.log(err)
        })
      },

      //验证图形验证码
      getimgcode(){  
        this.codepopshow=true
        this.codeimg = process.domain + '/m/index/?servicename=feedback.getVerifyCode&t='+new Date().getTime()

      },

      getVerifyCode(){
        Loading.open('Loading...');
        this.$http({servicename: 'Feedback.getVerifyCode'}).then((response)=>{
          Loading.close()
          this.codeimg = response
          this.codepopshow=true
          
        }).catch((error)=>{
          Loading.close()
          this.codepopshow = true
          this.codeimg = '加载失败'
          console.log("失败了:"+error)
        });
      },

      colseFun(){
        this.codeimg = ''
        this.inputcode = ''
        this.codepopshow = false
      },

      // 转换base64
      _genBase64(file) {
        //本地预览
        let r = new FileReader();  
        r.onload = ()=>{
          this.tupian = r.result
        }
        //Base64
        r.readAsDataURL(file);    
      },

      

    },
  }
</script>
