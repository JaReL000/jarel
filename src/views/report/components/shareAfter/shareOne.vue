<template>
<!-- 分享的第一个页面 -->
	<div class="swiper-slide slide10">
    <h6>恭喜{{user_name}}财主</h6>
    <p>位列鲸鱼财富榜第 <span v-text="rank_total_yield"></span> <span>名</span></p>
    <div class="slide10-content">
      <div class="slide10-one">
        加入鲸鱼 <br>
        <span v-text="join_days"></span>
        <span>天</span>
      </div>
      <div class="slide10-two">
        累计投资<br>
        <span v-text="total_money"></span>
        <span>元</span>
      </div>
      <div class="slide10-three">
        累计获得
        <span>(体验金)</span><br>
        <span v-text="total_red_packet_money"></span>
        <span>元</span>
      </div>
      <div class="slide10-four">
        累计赚取<br>
        <span v-text="total_yield"></span>
        <span>元</span>
      </div>
    </div>
    <div class="slide10-erweima">
      <img src="../../images/kaifaji.png" alt="二维码" class="erweima-img">
      <p v-text="test">长按识别二维码<br>
      查看我的财富报告</p>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {

    /*导航操作栏上移*/
    .fixed-x {
      padding-bottom rem(44) !important;
    }
    .fixed-xm {
      padding-bottom 14px !important
    }
    .iphone-xms {
      -webkit-overflow-scrolling: auto !important
    }

    .bottom-x {
      padding-bottom 44px !important
    }
    .footer-x{
      padding-bottom 25px !important
      background-color #fff
    }
    .main-x{
      bottom: 90px !important;
    }
    .fixed-x .content {
      background-size  center 76% !important;
    }

    .share .fixed-x {
      padding-bottom 100px !important;
    }
    .share .fixed-x  {
      background-size  center 66% !important;
    }
    .slide10 h6{
      padding-top: 5.666667rem !important;
    }
    .slide10-content{
      padding: 2.3rem 1.666667rem 0 !important;
    }
    .slide10-erweima{
      margin: 1.266667rem auto 0 !important;
    }
}
html,body,.slide10{
	height: 100%;
	width: 100%;
}
.slide10 {
	height: 100%;
	width: 100%;
  background: url("../../images/share1.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
}
.slide10 h6{
	font-size: 36px;
	line-height: 26px;
	color: #ffffff;
	text-align: center;
	padding-top: 350px;
}
.slide10 p {
	font-size: 40px;
	line-height: 100px;
	text-align: center;
	color: #ffffff;
	margin-top: 10px;
}
.slide10 p span:nth-of-type(1){
	font-size: 74px;
	line-height: 26px;
	color: #fed760;
}
.slide10 p span:nth-of-type(2){
	font-size: 30px;
	line-height: 26px;
	color: #fed760;
}
.slide10-content{
	padding :40px 125px 0;
}	
.slide10-one,
.slide10-two,
.slide10-four,
.slide10-three {
	display: inline-block;
	width:240px;
  font-size: 26px;
  color: #fff;
	text-align: center;
	padding-bottom: 50px;
}
.slide10-one span:nth-of-type(1),
.slide10-two span:nth-of-type(1),
.slide10-four span:nth-of-type(1) {
  font-size: 48px;
  color: #fed760;
}
.slide10-three span:nth-of-type(1) {
  font-size: 16px;
  color: #ffffff;
}
.slide10-three span:nth-of-type(2) {
  font-size: 48px;
  color: #fed760;
}

.slide10-erweima {
  width: 210px;
  margin: 20px auto 0;
  text-align: center;
}

.slide10-erweima .erweima-img {
  width: 210px;
  height: 210px;
}
.slide10-erweima p {
  font-size: 24px;
  /* color: #effaff; */
  color: #000;
  line-height: 44px;
}


</style>
<script>
	import { stringify } from 'qs'
  export default {
    name: '',
    data() {
      return {
        user_name:"",//用户名
        join_days:"",//加入天数
        total_money:"",//累计投资
        total_red_packet_money:"",//体验金
        total_yield:"",//累计收益
        rank_total_yield:"",//排名
        user_code:"",//用户id
        test:""  
      };
    },
    mounted(){
      this.reportFun()   
    },
    created(){
      let userCode = window.location.href;
      // let my_code = GetRequest(userCode)
      // let my_code = userCode.match(/userCode=(\S*)/)[1].replace(/%20/g,"+");
      let my_code = this.$route.query.userCode
      this.user_code = my_code;
    },
    methods: {
      //发送请求获取数据
      reportFun(){
        let user_code  = this.user_code
        this.initFun(user_code)
        return
      },
      // 初始化数据
      initFun(user_code){
        this.$http({
          method: 'yearly.share',
          user_code: user_code,
        }).then((res) => {
          console.log(res);
          let response = res.data
          this.user_name = response.user_name//用户姓名
          this.join_days  = response.join_days//加入天数
          this.total_money = response.total_money//累计投资
          this.total_red_packet_money = response.total_red_packet_money//体验金页面
          this.total_yield = response.total_yield//总收益
          this.rank_total_yield = response.rank_total_yield//排名
        })
      },
      //获取user_id路径
			GetRequest(name){
				var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
				var r = window.location.search.substr(1).match(reg);
				if (r != null) {
					console.log(r)
					return unescape(r[2]);
				}
				return null;
			},
    },
  };
</script>
