<template>
<!-- 这是分享出去之后的第三个页面 -->
	<div class="share3">
		<div class="share3-title">
			亲爱的{{this.phone}}财主<br>
      暂未发现您2017年的鲸鱼足迹
		</div>
  <div class="share3-go">马上开启<br>您的2018年鲸鱼之旅吧</div>
  <a class="share3-download" :href="downloadAPP">立即下载鲸鱼APP</a>
  <div class="share3-content">
    <h6><img src="../../images/left.png" alt=""> 鲸鱼产品线<img src="../../images/right.png" alt=""></h6>
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</div>
</template>
<script>
import { stringify } from 'qs'
import {
  downloadAPP
} from "mixins/mixin";
  export default {
    name: '',
    components: {
    },
    data() {
      return {
        phone:"",
      };
    },
    computed: {
      downloadAPP(){
        return downloadAPP;
      },
    },
    mounted(){
      this.phoneFun()
      console.log(this.$route.query)
    },
    methods:{
        phoneFun(){//替换手机格式为111****1111
          this.phone = this.$route.query.userId.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        }
    }
  };
</script>
<style scoped>
  .share3{
    width: 100%;
    /* height: 2171px; */
    background: url("../../images/share3.jpg");
    background-position:center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .share3-title{
    padding-top: 250px;
    font-size: 28px;
    line-height:44px;
    color: #ffffff;
    text-align: center;
  }
  .share3-go{
    font-size: 36px;
    line-height: 52px;
    color: #ffffff;
    text-align: center;
    padding-top: 80px;
  }
  .share3-download{
    display: block;
    width: 540px;
    height: 88px;
    background-color: #fed760;
    box-shadow: 2px 5px 10px 0px rgba(29, 147, 196, 0.58);
    border-radius: 44px;
    font-size: 32px;
    /* line-height: 26px; */
    color: #756229;
    margin: 39px auto 0;
    text-align: center;
    line-height: 88px;
  }
  .share3-content{
    padding-top: 214px;
    text-align: center;
  }
  .share3-content h6{
    font-size: 46px;
    line-height: 26px;
    color: #ffffff;
    margin-bottom: 135px;
  }
  .share3-content h6>img{
    width: 209px;
	  height: 4px;
    vertical-align: middle;
  }
  .share3-content h6>img:nth-of-type(2){
    margin-left: 20px;
  }
  .share3-content>ul{
    width: 714px;
    text-align: center;
    margin: 0 auto;
    padding-bottom: 53px;
    margin-top: 67px;
  }
  .share3-content>ul>li{
    width: 714px;
    height: 349px;
    background-position:center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    list-style: none;
    margin-top: -54px;
    padding: 0;
  }
  li:nth-of-type(1){
    background: url("../../images/huoqi.png")
  }
  li:nth-of-type(2){
    background: url("../../images/jidingqi.png")
  }
  li:nth-of-type(3){
    background: url("../../images/yuedingqi.png")
  }
  li:nth-of-type(4){
    background: url("../../images/niandingqi.png")
  }
  .share-test{
    font-size: 70px;
  }
</style>



