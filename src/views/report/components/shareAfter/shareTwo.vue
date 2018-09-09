<template>
	<div class="swiper-slide slide11">
          <div class="slide11-mark" v-show="markShow">
            <div class="mark-content">
              <!-- <img src="../../images/close.png" alt=""> -->
              暂未发现您的鲸鱼足迹<br>马上开启您的鲸鱼之旅吧
            </div>
          </div>
          <div class="slide11-warp">
            <input type="text" placeholder="请输入手机号码" class="slide11-phone" v-model="phone" ref="count">
            <div class="slide11-go" @click = "registerFun(phone)">登上鲸鱼时光穿梭机</div>
            <p>报告数据截止至2017年12月31日</p>
            <img src="../../images/public.png" alt="" class = "erweima2-img">
            <p>关注鲸鱼微信公众号</p>
          </div>
        </div>
</template>
<style >
html,body,slide10{
	height: 100%;
	width: 100%;
}
.slide11 {
	height: 100%;
	width: 100%;
  background: url("../../images/share2.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
}
.slide11 .slide11-mark {
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  padding: 72% 13%;
  
}
.slide11-mark .mark-content {
  width: 330px;
  height: 75px;
  background-color: #ffffff;
  border-radius: 10px;
  font-size: 30px;
  line-height: 30px;
  color: #393838;
  text-align: center;
  padding: 112px;
  position: fixed;
  z-index: 1;
}
.slide11-warp {
  position: absolute;
  top:50%;
  left:50%;
  transform: translateX(-50%);
  text-align: center;
}
.slide11-warp .slide11-phone {
  width: 540px;
  height: 88px;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 2px 5px 10px 0px rgba(29, 147, 196, 0.58);
  border-radius: 44px;
  font-size: 32px;
  line-height: 88px;
  color: #d9f1ff;
  margin: 0 auto 20px;
  text-align: center;
}
.slide11-warp .slide11-go {
  width: 540px;
  height: 88px;
  background-color: #fed760;
  box-shadow: 2px 5px 10px 0px rgba(29, 147, 196, 0.58);
  border-radius: 44px;
  font-size: 32px;
  line-height: 88px;
  color: #756229;
  margin: 0 auto 20px;
}

.slide11-warp p:nth-of-type(1) {
  font-size: 24px;
  color: #b1e7ff;
}

.slide11-warp .erweima2-img {
  width: 210px;
  height:210px;
  margin-top: 70px;
}
.slide11-warp p:nth-of-type(2) {
  font-size: 24px;
  color: #effaff;
}
</style>
<script>
import { stringify } from 'qs'
import {
  mUrl
} from "mixins/mixin";
  export default {
    name: 'App',
    components: {
    },
    data() {
      return {
        markShow:false,//弹窗
        phone:"",//手机号
      };
    },
    computed: {
      mUrl(){
        return mUrl;
      },
    },
    mounted(){
      this.androidFun()
    },
    methods: {
      //用于判断用户是否注册
      registerFun(mobile){
        let reg = /^1[3|4|5|6|7|8|9]\d{9}$/
        this.$http({
          method:'user.mobile.exist',
          mobile: mobile,
        }).then((data) => {
          if(mobile==""||!reg){
            return
          }else if(data.code == 1000504){
            this.markShow = false
            this.$router.push({path: '/shareThree',query:{userId:mobile}});
          }else{
            this.markShow = true
              setTimeout(() => {
                this.markShow = false
                window.location = "https://hbnew.jingyugame.com/activity/Activity/enter?combinationId=rhesjvNFqHJbBiyzKJQoMg=="
              }, 3000);
          }     
        })
      },
      //解决安卓机键盘弹起页面被压缩
      androidFun(){
        window.onload=function(){
          document.getElementsByTagName('body')[0].style.height = document.body.clientHeight + 'px';
        }
      }
    },
    watch: {
    //watch()监听某个值（双向绑定）的变化，从而达到change事件监听的效果
    //限制可输入字数为11
      phone: {
        handler: function() {
          var _this = this;
          var _sum = 11; //字数限制为11个
          _this.$refs.count.setAttribute("maxlength", _sum);
          _this.number = _this.$refs.count.value.length;
        },
        // deep: true
      }
    }
  };
</script>
