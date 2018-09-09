<template>
    <div class="shake-three">
      <div class="shake-three_top">
        <div class="shake-three_top_info">
          <div class="juanzhou">
            <img src="../../images/juan.png" alt="" class="juan">
          </div>
          <div class="shake-three_content">
            <img src="../../images/logo_bg.png" alt="">
            <p v-show="testShow">恭喜你获得微信支付送鲸鱼红包</p>
            <h5 v-show="testShow">5000<span>元</span></h5>
            <p v-show="testShow">已存入你的鲸鱼账户，收益
              <a @click="countFun('shake:nowTixian:下载APP提现到账',downloadApp)">立即提现</a>
            </p>
          </div>
          <div class="juanzhou_bottom">
            <img src="../../images/juan.png" alt="" class="juan">
          </div>
        </div>
        <div  class="shake-three_button" >
          <a href="javascript:;"  @click="countFun('shake:downlodaTixian:下载APP提现到账',downloadApp)">
            <img src="../../images/button.png" alt="" class="juan">
          </a>
        </div>
      </div>
      <div class="shake-three_bottom" v-show="listShow">
        <ul>
          <li v-for="(userinfo,index) in userInfoList" :key='index'>
            <img :src="userinfo.userInfoPic" alt="">
            <span class="shake-three_bottom_name" v-text="userinfo.userInfoName"></span>
            <span class="shake-three_bottom_money">
              领了<span v-text="userinfo.userInfoMoney"></span>，已提现到账
            </span>
            <span class="shake-three_bottom_time" v-text="userinfo.userInfotiem"></span>
          </li>
        </ul>
        <ul>
          <li v-for="(userinfo,index) in userInfoList" :key='index'>
            <img :src="userinfo.userInfoPic" alt="">
            <span class="shake-three_bottom_name" v-text="userinfo.userInfoName"></span>
            <span class="shake-three_bottom_money">
              领了<span v-text="userinfo.userInfoMoney"></span>，已提现到账
            </span>
            <span class="shake-three_bottom_time" v-text="userinfo.userInfotiem"></span>
          </li>
        </ul>
      </div>
      <!-- <div class="mark">
        <div>
          <p>确定放弃<span>5000元</span>红包么</p>
          <a href="javascript:;">离开</a><a href="">去App提现</a>
        </div>
      </div> -->
    </div>
</template>
<script>
  import sdk from 'weixin-js-sdk'
  import {downloadApp} from "mixins/mixin";
  import * as jrUrl from '../../urlconfig/urlconfig'
  
  export default{
    data(){
      return{
        timeUser:Math.round(Math.random()*10)+"分钟以前",
        userInfoList:[
          {userInfoPic:require("../../images/1 (1).jpeg"),userInfoName:"宠辱不惊",userInfoMoney:"红包2500元",userInfotiem:"1分钟以前"},
          {userInfoPic:require("../../images/1 (1).jpg"),userInfoName:"放飞梦想",userInfoMoney:"红包5000元",userInfotiem:"1分钟以前"},
          {userInfoPic:require("../../images/1 (2).jpeg"),userInfoName:"李涛╭(╯~",userInfoMoney:"红包3500元",userInfotiem:"1分钟以前"},
          {userInfoPic:require("../../images/1 (2).jpg"),userInfoName:"苏叶 (-^)",userInfoMoney:"红包5000元",userInfotiem:"1分钟以前"},
          {userInfoPic:require("../../images/1 (3).jpg"),userInfoName:"夏老师jes",userInfoMoney:"红包3500元",userInfotiem:"1分钟以前"},
          {userInfoPic:require("../../images/1 (4).jpg"),userInfoName:"不忘初心",userInfoMoney:"红包2500元",userInfotiem:"2分钟以前"},
          {userInfoPic:require("../../images/1 (5).jpg"),userInfoName:"poetrylilo",userInfoMoney:"红包4500元",userInfotiem:"2分钟以前"},
          {userInfoPic:require("../../images/1 (6).jpg"),userInfoName:"鱼@小猫",userInfoMoney:"红包4000元",userInfotiem:"2分钟以前"},
          {userInfoPic:require("../../images/1 (7).jpg"),userInfoName:"~枫-叶~",userInfoMoney:"红包2500元",userInfotiem:"3分钟以前"},
          {userInfoPic:require("../../images/1 (8).jpg"),userInfoName:"晴※天※",userInfoMoney:"红包5500元",userInfotiem:"3分钟以前"},
          {userInfoPic:require("../../images/2 (1).jpg"),userInfoName:"紫色星空",userInfoMoney:"红包3500元",userInfotiem:"4分钟以前"},
          {userInfoPic:require("../../images/2 (2).jpg"),userInfoName:"Trouble",userInfoMoney:"红包4000元",userInfotiem:"4分钟以前"},
          {userInfoPic:require("../../images/2 (3).jpg"),userInfoName:"梦\/~伴~",userInfoMoney:"红包2500元",userInfotiem:"4分钟以前"},
          {userInfoPic:require("../../images/2 (4).jpg"),userInfoName:"任天地游",userInfoMoney:"红包4000元",userInfotiem:"5分钟以前"},
          {userInfoPic:require("../../images/2 (5).jpg"),userInfoName:"大地-~懵",userInfoMoney:"红包4500元",userInfotiem:"5分钟以前"},
          {userInfoPic:require("../../images/3 (1).jpg"),userInfoName:"娇伢子勒",userInfoMoney:"红包2500元",userInfotiem:"6分钟以前"},
          {userInfoPic:require("../../images/3 (1).png"),userInfoName:"阿威佳佳",userInfoMoney:"红包4500元",userInfotiem:"6分钟以前"},
          {userInfoPic:require("../../images/3 (2).jpg"),userInfoName:"￣(ｴ)￣",userInfoMoney:"红包4000元",userInfotiem:"6分钟以前"},
          {userInfoPic:require("../../images/3 (3).jpg"),userInfoName:"独上西楼",userInfoMoney:"红包2500元",userInfotiem:"7分钟以前"},
          {userInfoPic:require("../../images/3 (4).jpg"),userInfoName:"ladyingi",userInfoMoney:"红包5500元",userInfotiem:"7分钟以前"},
          {userInfoPic:require("../../images/3 (5).jpg"),userInfoName:"波波哥哥",userInfoMoney:"红包3500元",userInfotiem:"8分钟以前"},
          {userInfoPic:require("../../images/3 (6).jpg"),userInfoName:"熊猫来了",userInfoMoney:"红包4000元",userInfotiem:"8分钟以前"},
          {userInfoPic:require("../../images/3 (7).jpg"),userInfoName:"大老粗~~",userInfoMoney:"红包2500元",userInfotiem:"8分钟以前"},
          {userInfoPic:require("../../images/3 (8).jpg"),userInfoName:"金秀秀秀",userInfoMoney:"红包4000元",userInfotiem:"9分钟以前"},
          {userInfoPic:require("../../images/3 (9).jpg"),userInfoName:"Emotionl",userInfoMoney:"红包4500元",userInfotiem:"9分钟以前"},
          {userInfoPic:require("../../images/4 (1).jpg"),userInfoName:"执伞贤者",userInfoMoney:"红包2500元",userInfotiem:"9分钟以前"},
          {userInfoPic:require("../../images/4 (2).jpg"),userInfoName:"长虹饮涧",userInfoMoney:"红包4500元",userInfotiem:"10分钟以前"},
          {userInfoPic:require("../../images/4 (3).jpg"),userInfoName:"发条怪~ぐ",userInfoMoney:"红包4000元",userInfotiem:"10分钟以前"},
          {userInfoPic:require("../../images/4 (4).jpg"),userInfoName:"陈情不达",userInfoMoney:"红包2500元",userInfotiem:"10分钟以前"},
          {userInfoPic:require("../../images/4 (5).jpg"),userInfoName:"藏清欢:)",userInfoMoney:"红包5500元",userInfotiem:"10分钟以前"},
          {userInfoPic:require("../../images/4 (6).jpg"),userInfoName:"枕边旧宠",userInfoMoney:"红包3500元",userInfotiem:"11分钟以前"},
          {userInfoPic:require("../../images/4 (7).jpg"),userInfoName:"素酒青衣",userInfoMoney:"红包4000元",userInfotiem:"11分钟以前"},
          {userInfoPic:require("../../images/4 (8).jpg"),userInfoName:"自捅千刀~",userInfoMoney:"红包2500元",userInfotiem:"11分钟以前"},
          {userInfoPic:require("../../images/4 (9).jpg"),userInfoName:"毁我熱情",userInfoMoney:"红包4000元",userInfotiem:"12分钟以前"},
          {userInfoPic:require("../../images/4 (10).jpg"),userInfoName:"七分冷酷",userInfoMoney:"红包4500元",userInfotiem:"12分钟以前"},
          {userInfoPic:require("../../images/4 (11).jpg"),userInfoName:"感谢長野",userInfoMoney:"红包2500元",userInfotiem:"12分钟以前"},
          {userInfoPic:require("../../images/4 (12).jpg"),userInfoName:"不薈彈琹",userInfoMoney:"红包4500元",userInfotiem:"12分钟以前"},
          {userInfoPic:require("../../images/4 (13).jpg"),userInfoName:"风尘誓约",userInfoMoney:"红包4000元",userInfotiem:"12分钟以前"},
          {userInfoPic:require("../../images/4 (14).jpg"),userInfoName:"天幕流光",userInfoMoney:"红包2500元",userInfotiem:"13分钟以前"},
          {userInfoPic:require("../../images/4 (15).jpg"),userInfoName:"日青良月",userInfoMoney:"红包5500元",userInfotiem:"13分钟以前"},
          {userInfoPic:require("../../images/4 (16).jpg"),userInfoName:"细呷温酒",userInfoMoney:"红包3500元",userInfotiem:"14分钟以前"},
          {userInfoPic:require("../../images/4 (17).jpg"),userInfoName:"温柔行凶",userInfoMoney:"红包4000元",userInfotiem:"14分钟以前"},
          {userInfoPic:require("../../images/4 (18).jpg"),userInfoName:"树雾晚鲸",userInfoMoney:"红包2500元",userInfotiem:"15分钟以前"},
          {userInfoPic:require("../../images/4 (19).jpg"),userInfoName:"无限宠你",userInfoMoney:"红包4000元",userInfotiem:"15分钟以前"},
          {userInfoPic:require("../../images/4 (20).jpg"),userInfoName:"不择以年",userInfoMoney:"红包4500元",userInfotiem:"15分钟以前"},
          {userInfoPic:require("../../images/4 (21).jpg"),userInfoName:"君叹沉香",userInfoMoney:"红包3500元",userInfotiem:"16分钟以前"},
          {userInfoPic:require("../../images/4 (22).jpg"),userInfoName:"帝王怀旧",userInfoMoney:"红包4000元",userInfotiem:"18分钟以前"},
          {userInfoPic:require("../../images/4 (23).jpg"),userInfoName:"就此别过",userInfoMoney:"红包2500元",userInfotiem:"19分钟以前"},
          {userInfoPic:require("../../images/4 (24).jpg"),userInfoName:"水画中仙",userInfoMoney:"红包4000元",userInfotiem:"20分钟以前"},
          {userInfoPic:require("../../images/4 (25).jpg"),userInfoName:"Emotionl",userInfoMoney:"红包4500元",userInfotiem:"20分钟以前"}
        ],
        listShow:false,
        testShow:false
      }
    },
    computed: {
      downloadApp(){
        return downloadApp;
      },
    },
    created(){

      /** 屏蔽分享 */
			function onBridgeReady() {
				WeixinJSBridge.call('hideOptionMenu');
			}
			if (typeof WeixinJSBridge == "undefined") {
			if (document.addEventListener) {
				document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
			} else if (document.attachEvent) {
				document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
				document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
			}
			} else {
			 onBridgeReady();
			}
    },
    mounted(){
      // 判断路径中是否有关键字，避免在其他页面返回也出发弹框
      if(window.location.hash=="#/hbInfo"){
        let self = this
     //延时监听   
      setTimeout(function () {  
          //监听物理返回按钮  
          window.addEventListener("popstate", function(e) {
            if (window.location.hash=="#/") {
              window.history.forward()
            }  
            layer.open({
                content:'确定放弃<br><span>5000<span>元</span></span>红包么?',
                btn: ['离开','去APP提现'],
                shadeClose: false,
                yes: function(){
                  //离开
                  // window.history.back(-1);
                  sdk.closeWindow(); 
                  self.countFun("shake:out:离开")
                },
                  no: function(){
                  self.countFun("shake:app:去APP提现")                    
                  window.location.href = self.downloadApp
                }
            });
          }, false);  
        }, 300);          
      }
      this.showFun()
      this.textShowFun()
    },
    methods:{
      showFun(){
        setTimeout(() => {
          this.listShow =true
        }, 1000);
      },
      textShowFun(){
          setTimeout(() => {
            this.testShow = true
          }, 500);
        },
      //点击统计 
      countFun(key,link){
        let params = {
          key:key
        }
        var _this = this; 
        this.$http(jrUrl.productMessage,params).then(res=>{
          if( link ) {
            window.location.href = _this.downloadApp
          }
        })
        setTimeout(() => {
          if( link ) location.href = this.downloadApp
        }, 1000);
        
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
      .shake-three
        width 100%
        height 100%
        // background #c83737
        .shake-three_top
          // max-height 100px
          height 792px
          // background-image url('../../images/info.jpg') 
          background-position center top 
          background-repeat no-repeat
          background-size 100% 792px
          position relative
          background-color #c83737
          text-align center
          .shake-three_top_info
            height 506px
            // margin-top 30px
            .juanzhou
              .juan
                width 707px
                height 39px
                margin-top 40px
                vertical-align middle
                z-index 1
            .juanzhou_bottom
              .juan
                width 707px
                height 39px
                z-index 1
            .shake-three_content
              width 658px
              height 457px
              background url("../../images/bgInfo.png") no-repeat center center/100% 100%
              text-align center
              padding-top 71px
              margin 0 auto 
              animation show 1s linear 1 0.1s
              img
                width 130px
                height 43px
                margin-bottom 49px
              p:nth-of-type(1)
                font-size 30px
                line-height 46px 
                color #1c1c1c 
              h5
                margin 41px 0 37px
                font-size 72px
                line-height 46px
                font-weight 600
                color #c83737
                span 
                  font-size 30px
              p:nth-of-type(2)
                font-size 24px
                color #b6b6b6
                a
                  font-size 24px
                  color #f53c3c
          .shake-three_button
            display block
            text-align center
            position absolute
            top 83%
            left 50%
            transform translateX(-50%)
            img 
              width 534px
              height 134px
        .shake-three_bottom
          height 820px
          padding 0 27px
          overflow hidden
          // display none
          ul
            background-color #f7f7f7
            position relative
            animation move 20s linear infinite 1s
            li
              padding 12px 33px 10px 22px 
              border-bottom 1px solid #b5b5b5
              img 
                width 50px
                height 50px
                vertical-align middle
                border-radius 50%
              span 
                font-size 24px 
                line-height 46px
                color #353535
              .shake-three_bottom_name
                color #207ec0
              .shake-three_bottom_money
                span 
                  color #c83737
              .shake-three_bottom_time
                float right 
                color #818181
        // .mark
        //   display none
        //   position fixed
        //   top 0
        //   left 0
        //   right 0
        //   bottom 0
        //   background rgba(0,0,0,0.5)
        //   div
        //     width 500px
        //     height 300px
        //     background #ffffff
        //     position absolute
        //     left 50%
        //     top 50%
        //     transform translate(-50%,-50%)
        //     text-align center
        //     padding-top 90px
        //     box-sizing border-box
        //     border 1px solid #999
        //     p
        //       font-size 24px
        //       line-height 60px
        //       margin-bottom 80px
        //       span 
        //         font-size 53px
        //         color #f53c3c
        //     a
        //       display inline-block
        //       width 240px
        //       height 50px
        //       margin 0
        //       border 1px solid #999
        //       font-size 24px
        //       line-height 50px
        //     a:nth-of-type(1)
        //       color #ccc
        //     a:nth-of-type(2)
        //       color #f53c3c
.layui-m-layer0
  .layui-m-layerchild
    width 553px
    height 724px
    background url("../../images/bg.png") no-repeat center center/100% 100%
  .layui-m-layercont
    color #000
    font-size 36px
    line-height 60px
    span 
      font-size 72px
      color #ed2424
      font-weight 600
      span 
        font-size 36px
  .layui-m-layerbtn 
    span[yes]
      width 426px
      height 80px
      background rgba(186, 43, 43, 0.3)
      border-radius 40px
      font-size 36px
      line-height 80px
      border none
      margin 0 auto
      color #af2d2d
  .layui-m-layerbtn 
    span[no]
      width 426px
      height 80px
      background #fff45c
      border-radius 40px
      font-size 36px
      line-height 80px
      color #cf3434
      border none
      margin 0 auto 40px
.layui-m-layerbtn
  display block
  position absolute
  top 449px
  border none
  background #e24c4c
@-webkit-keyframes move
    form
      transform translateY(0)
    to
      transform translateY(-100%)
@-webkit-keyframes show 
  from {height: 100px;opacity :0;}
  to {height: 457px;opacity :1;}
</style>

