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
          font-size: 30px;
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
      color: #999;
      span 
        font-size: 24px;
        color: #999;
        line-height 50px;
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
              @click="onSubmit($event)"
            >
          </div> 
        </form>  
      </div>
    </div>
  </transition>
</template>

<script>
  import { upload } from '../api'
  let wx = require('weixin-js-sdk');
  export default {
    components: {},
    data() {
      return {
        show: false,
        num: '',
        number: 0,
        items: {
          text: '',
          file: ''
        },
        images: {
          localId: [],
          serverId: []
        },
        tupian: require('./images/feedback_photo.png')
      }
    },
    computed: {
      highlight(){
        let bool = this.items.text.length >= 1
        return bool 
      }
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
    created() {},
    mounted() {
      // this.initFun()
      this.show = true
      
    },
    methods: {
      getFile(event) {
        let files = event.target.files[0];
        let bool = (files.type=='image/png') || (files.type=='image/jpeg')
        console.log(bool);
        
        // 判断图片格式
        if(bool){ 
          this.items.file = files
          this.gen_base64(files)
         
        }else{
          this.$flash('图片格式不正确');
          // event.target.files.length = 0;
          // $(event.target).val('');
          return false
        }
        
      },
      gen_base64(file) {
        let r = new FileReader();  //本地预览
        r.onload = ()=>{
          this.tupian = r.result
        }
        r.readAsDataURL(file);    //Base64
      },

      onSubmit(event) {
        // 提交
        if (!this.items.text) {
          this.$flash("提交内容不能为空!");
          return false;
        } 

        let formData = new FormData(); //创建form对象
        
        let data = {
          method: 'feedback.add',
          token: this.$root.appData.token,
          problem: this.items.text,
          v: '102',
          appid: 'jinr_embed',
        }
        data = JSON.stringify(data)
        formData.append('data', data);
        
        // formData.append('method', 'feedback.add');
        // formData.append('token', this.$root.appData.token,);
        // formData.append('problem', this.items.text); //文本内容
        // formData.append('v', '102'); //接口版本 100 101
        // formData.append('appid', 'jinr_embed'); //应用标识  jinr_test jinr_embed


        if(this.items.file){
          formData.append('image', this.items.file); //图片
        }
        let url = 'https://jinrapp.dev.jinr.com/Embed/Index/Index'
        upload(url, formData).then((res)=>{
          // console.log("成功了:"+res)
          if(res.code == 1000200){
            this.items.text = ''
            this.tupian = require('./images/feedback_photo.png')
            this.$flash(res.msg)
          }
          
        })
      },

      

      initFun(){
        this.$http({servicename: 'api.index'}).then((response)=>{
          
          this.show = true
          wx.config({
            debug: false,
            appId: 'wxf8b4f85f3a794e77',
            timestamp: 1518074933,
            nonceStr: '90R4aKxrpGsmgOqB',
            signature: 'b0611e40bb7f81106274c00fe05d798c3da596e7',
            jsApiList: [
              // 'checkJsApi',
              // 'onMenuShareTimeline',
              // 'onMenuShareAppMessage',
              // 'onMenuShareQQ',
              // 'onMenuShareWeibo',
              // 'onMenuShareQZone',
              // 'hideMenuItems',
              // 'showMenuItems',
              // 'hideAllNonBaseMenuItem',
              // 'showAllNonBaseMenuItem',
              // 'translateVoice',
              // 'startRecord',
              // 'stopRecord',
              // 'onVoiceRecordEnd',
              // 'playVoice',
              // 'onVoicePlayEnd',
              // 'pauseVoice',
              // 'stopVoice',
              // 'uploadVoice',
              // 'downloadVoice',
              'chooseImage',
              'previewImage',
              'uploadImage',
              'downloadImage',
              // 'getNetworkType',
              // 'openLocation',
              // 'getLocation',
              // 'hideOptionMenu',
              // 'showOptionMenu',
              // 'closeWindow',
              // 'scanQRCode',
              // 'chooseWXPay',
              // 'openProductSpecificView',
              // 'addCard',
              // 'chooseCard',
              // 'openCard'
            ]
          });

        }).catch((error)=>{
          this.show = true
          console.log("失败了:"+error)
        });
      },

      // 选择图片
      selectFun(){
        console.log('选择图片');
        wx.chooseImage({
          success: function (res) {
            this.images.localId = res.localIds;
            alert('已选择 ' + res.localIds.length + ' 张图片');
          }
        });
      },

      // 提交意见反馈
      feedback(){
        if (this.images.localId.length == 0) {
          alert('请先使用 chooseImage 接口选择图片');
          return;
        }
        var i = 0, length = images.localId.length;
        this.images.serverId = [];
        function upload() {
          wx.uploadImage({
            localId: images.localId[i],
            success: function (res) {
              i++;
              //alert('已上传：' + i + '/' + length);
              images.serverId.push(res.serverId);
              if (i < length) {
                upload();
              }
            },
            fail: function (res) {
              alert(JSON.stringify(res));
            }
          });
        }
        upload();
      }
    },
  }
</script>
