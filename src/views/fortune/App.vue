<template>
<!--首页+详情页 -->
<div class="fortune">
  <!-- 首页 -->
  <div class="fortune-home" v-show="homeShow">
    <div class="home-name">
      姓名:<input type="text" placeholder="施主，请报上名来" v-model="textInput">
    </div>
    <div class="home-test" @click="checkFun()">马上测一测</div>
  </div>
  <!-- 算命详情页 -->
	<div class="fortune-details" v-show="detailsShow">
		<div class="fortune-details-one" v-show = "showArr[0]">
			<div class="details-time">
				<span>星期五</span>
				<span>10</span>
				<span>2018年1月</span>
			</div>
			<div class="details-content">近日，不少市民纷纷赶来找神算子测财运！热心市民<span v-text="textInput"></span>向记者透露了他的2018年运势：</div>
			<div class="details-img"><img src="./images/touxiang.png" alt="">
				<span v-text="textInput"></span>
			</div>
			<div class="details-erweima"><img src="./images/erweima.jpg" alt=""></div>
		</div>
		<div class="fortune-details-two" v-show = "showArr[1]">
			<div class="details-time">
				<span>星期五</span>
				<span>10</span>
				<span>2018年1月</span>
			</div>
			<div class="details-content">近日，不少市民纷纷赶来找神算子测财运！热心市民<span v-text="textInput">王小明</span>向记者透露了他的2018年运势：</div>
			<div class="details-img"><img src="./images/touxiang.png" alt="">
				<span v-text="textInput">王小明</span>
			</div>
			<div class="details-erweima"><img src="./images/erweima.jpg" alt=""></div>
		</div>
		<div class="fortune-details-three" v-show = "showArr[2]">
			<div class="details-time">
				<span>星期五</span>
				<span>10</span>
				<span>2018年1月</span>
			</div>
			<div class="details-content">近日，不少市民纷纷赶来找神算子测财运！热心市民<span v-text="textInput">王小明</span>向记者透露了他的2018年运势：</div>
			<div class="details-img"><img src="./images/touxiang.png" alt="">
				<span v-text="textInput">王小明</span>
			</div>
			<div class="details-erweima"><img src="./images/erweima.jpg" alt=""></div>
		</div>
		<div class="fortune-details-four" v-show = "showArr[3]">
			<div class="details-time">
				<span>星期五</span>
				<span>10</span>
				<span>2018年1月</span>
			</div>
			<div class="details-content">近日，不少市民纷纷赶来找神算子测财运！热心市民<span v-text="textInput">王小明</span>向记者透露了他的2018年运势：</div>
			<div class="details-img"><img src="./images/touxiang.png" alt="">
				<span v-text="textInput">王小明</span>
			</div>
			<div class="details-erweima"><img src="./images/erweima.jpg" alt=""></div>
		</div>
		<div class="fortune-details-five" v-show = "showArr[4]">
			<div class="details-time">
				<span>星期五</span>
				<span>10</span>
				<span>2018年1月</span>
			</div>
			<div class="details-content">近日，不少市民纷纷赶来找神算子测财运！热心市民<span v-text="textInput">王小明</span>向记者透露了他的2018年运势：</div>
			<div class="details-img"><img src="./images/touxiang.png" alt="">
				<span v-text="textInput">王小明</span>
			</div>
			<div class="details-erweima"><img src="./images/erweima.jpg" alt=""></div>
		</div>
		<div class="fortune-details-six" v-show = "showArr[5]">
			<div class="details-time">
				<span>星期五</span>
				<span>10</span>
				<span>2018年1月</span>
			</div>
			<div class="details-content">近日，不少市民纷纷赶来找神算子测财运！热心市民<span v-text="textInput">王小明</span>向记者透露了他的2018年运势：</div>
			<div class="details-img"><img src="./images/touxiang.png" alt="">
				<span v-text="textInput">王小明</span>
			</div>
			<div class="details-erweima"><img src="./images/erweima.jpg" alt=""></div>
		</div>
		<div class="fortune-details-seven" v-show = "showArr[6]">
			<div class="details-time">
				<span>星期五</span>
				<span>10</span>
				<span>2018年1月</span>
			</div>
			<div class="details-content">近日，不少市民纷纷赶来找神算子测财运！热心市民<span v-text="textInput">王小明</span>向记者透露了他的2018年运势：</div>
			<div class="details-img"><img src="./images/touxiang.png" alt="">
				<span v-text="textInput">王小明</span>
			</div>
			<div class="details-erweima"><img src="./images/erweima.jpg" alt=""></div>
		</div>
		<div class="fortune-details-eight" v-show = "showArr[7]">
			<div class="details-time">
				<span>星期五</span>
				<span>10</span>
				<span>2018年1月</span>
			</div>
			<div class="details-content">近日，不少市民纷纷赶来找神算子测财运！热心市民<span v-text="textInput">王小明</span>向记者透露了他的2018年运势：</div>
			<div class="details-img"><img src="./images/touxiang.png" alt="">
				<span v-text="textInput">王小明</span>
			</div>
			<div class="details-erweima"><img src="./images/erweima.jpg" alt=""></div>
		</div>
		<div class="fortune-details-nine" v-show = "showArr[8]">
			<div class="details-time">
				<span>星期五</span>
				<span>10</span>
				<span>2018年1月</span>
			</div>
			<div class="details-content">近日，不少市民纷纷赶来找神算子测财运！热心市民<span v-text="textInput">王小明</span>向记者透露了他的2018年运势：</div>
			<div class="details-img"><img src="./images/touxiang.png" alt="">
				<span v-text="textInput">王小明</span>
			</div>
			<div class="details-erweima"><img src="./images/erweima.jpg" alt=""></div>
		</div>
		<div class="fortune-details-ten" v-show = "showArr[9]">
			<div class="details-time">
				<span>星期五</span>
				<span>10</span>
				<span>2018年1月</span>
			</div>
			<div class="details-content">近日，不少市民纷纷赶来找神算子测财运！热心市民<span v-text="textInput">王小明</span>向记者透露了他的2018年运势：</div>
			<div class="details-img"><img src="./images/touxiang.png" alt="">
				<span v-text="textInput">王小明</span>
			</div>
			<div class="details-erweima"><img src="./images/erweima.jpg" alt=""></div>
		</div>
		<div class="fortune-details-eleven" v-show = "showArr[10]">
			<div class="details-time">
				<span>星期五</span>
				<span>10</span>
				<span>2018年1月</span>
			</div>
			<div class="details-content">近日，不少市民纷纷赶来找神算子测财运！热心市民<span v-text="textInput">王小明</span>向记者透露了他的2018年运势：</div>
			<div class="details-img"><img src="./images/touxiang.png" alt="">
				<span v-text="textInput">王小明</span>
			</div>
			<div class="details-erweima"><img src="./images/erweima.jpg" alt=""></div>
		</div>
		<div class="fortune-details-twelve" v-show = "showArr[11]">
			<div class="details-time">
				<span>星期五</span>
				<span>10</span>
				<span>2018年1月</span>
			</div>
			<div class="details-content">近日，不少市民纷纷赶来找神算子测财运！热心市民<span v-text="textInput">王小明</span>向记者透露了他的2018年运势：</div>
			<div class="details-img"><img src="./images/touxiang.png" alt="">
				<span v-text="textInput">王小明</span>
			</div>
			<div class="details-erweima"><img src="./images/erweima.jpg" alt=""></div>
		</div>
		<div class="fortune-details-thirteen" v-show = "showArr[12]">
			<div class="details-time">
				<span>星期五</span>
				<span>10</span>
				<span>2018年1月</span>
			</div>
			<div class="details-content">近日，不少市民纷纷赶来找神算子测财运！热心市民<span v-text="textInput">王小明</span>向记者透露了他的2018年运势：</div>
			<div class="details-img"><img src="./images/touxiang.png" alt="">
				<span v-text="textInput">王小明</span>
			</div>
			<div class="details-erweima"><img src="./images/erweima.jpg" alt=""></div>
		</div>
		<div class="fortune-details-fourteen" v-show = "showArr[13]">
			<div class="details-time">
				<span>星期五</span>
				<span>10</span>
				<span>2018年1月</span>
			</div>
			<div class="details-content">近日，不少市民纷纷赶来找神算子测财运！热心市民<span v-text="textInput">王小明</span>向记者透露了他的2018年运势：</div>
			<div class="details-img"><img src="./images/touxiang.png" alt="">
				<span v-text="textInput">王小明</span>
			</div>
			<div class="details-erweima"><img src="./images/erweima.jpg" alt=""></div>
		</div>
		<div class="fortune-details-fiveteen" v-show = "showArr[14]">
			<div class="details-time">
				<span>星期五</span>
				<span>10</span>
				<span>2018年1月</span>
			</div>
			<div class="details-content">近日，不少市民纷纷赶来找神算子测财运！热心市民<span v-text="textInput">王小明</span>向记者透露了他的2018年运势：</div>
			<div class="details-img"><img src="./images/touxiang.png" alt="">
				<span v-text="textInput">王小明</span>
			</div>
			<div class="details-erweima"><img src="./images/erweima.jpg" alt=""></div>
		</div>
	</div>
	<!-- 分享 -->
	      <!-- <share
        :shareType="shareType"
        :imageUrl="imageUrl"
        :text="text"
        :title="title"
        :url="url"
    ></share> -->
</div>
  
</template>
<script>
import share from "components/share"
   export default{
     data(){
       return{
				detailsShow:false,
        textInput:"",
				showArr:[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
				homeShow:true,
				//分享
				shareType:"1",
        imageUrl:window.location.origin + require("./images/shareimg.png"),
        text:"2018，你的财运如何？码上测测",
        title:"施主，请留步！",
        url:window.location.href,
				// showShare:false,//分享
				// 星期

				// 日
				// 年月
       }
     },
     mounted(){},
     methods:{
      //  点击测试
      checkFun(){
        if(this.textInput  ==""){
          return
        }else{
					let randomNum = parseInt(Math.random()*15) 
					this.homeShow = false
					this.detailsShow= true
					if(randomNum==0){
						this.showArr[0]=true
					}else if(randomNum==1){
						this.showArr[1]=true
					}else if(randomNum==2){
						this.showArr[2]=true
					}else if(randomNum==3){
						this.showArr[3]=true
					}else if(randomNum==4){
						this.showArr[4]=true
					}else if(randomNum==5){
						this.showArr[5]=true
					}else if(randomNum==6){
						this.showArr[6]=true
					}else if(randomNum==7){
						this.showArr[7]=true
					}else if(randomNum==7){
						this.showArr[8]=true
					}else if(randomNum==9){
						this.showArr[9]=true
					}else if(randomNum==10){
						this.showArr[10]=true
					}else if(randomNum==11){
						this.showArr[11]=true
					}else if(randomNum==12){
						this.showArr[12]=true
					}else if(randomNum==13){
						this.showArr[13]=true
					}else{
						this.showArr[14]=true
					}
        }
      }
     }
   }
</script>
<style>
body,
html,
.fortune{
	width: 100%;
  height: 100%;
  margin: 0 auto;
  font-family: "PingFang-SC-Heavy";
}
/* 首页 */
.fortune-home{
  width: 100%;
  height: 100%;
  background: #f8f4e6;
  background: url("./images/home.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
	background-position: center center;
	position: relative;
}
.fortune-home .home-name{
  width: 630px;
  height: 46px;;
  padding-top:1121px;
  margin: 0 auto;
	font-size: 36px;
	line-height: 26px;
	color: #333129;
	border-bottom: 1px solid #908a7c;
	position: absolute;
	bottom:15%;
	left: 50%;
	transform: translateX(-50%);
}
.fortune-home .home-name>input{
    font-size: 36px;
    line-height: 26px;
    color: #908a7c;
    border: 0;
    background: transparent;
    outline:none;
}
.fortune-home .home-test{
  width: 624px;
	height: 122px;
	background-color: #d65245;
  background: url("./images/botton.png") no-repeat center center/100% 100%;
	font-size: 42px;
	line-height: 122px;
  text-align: center;
	color: #ebdec2;
	margin: 25px auto 0;
	position: absolute;
	bottom:3%;
	left: 50%;
	transform: translateX(-50%);
}
/* 详情页面 */
.fortune-details{
	width: 100%;
	height: 100%;
}
.fortune-details .fortune-details-one{
	width: 100%;
	height: 100%;
	background: #f8f4e6;
  background: url("./images/1.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
	background-position: center center;
	position: relative;
}
/* 不同背景图 */
.fortune-details .fortune-details-two{
	width: 100%;
	height: 100%;
	background: #f8f4e6;
	background: url("./images/2.jpg");
	background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;

}
.fortune-details .fortune-details-three{
	width: 100%;
	height: 100%;
	background: #f8f4e6;
	background: url("./images/3.jpg");	
	background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
}
.fortune-details .fortune-details-four{
	width: 100%;
	height: 100%;
	background: #f8f4e6;
	background: url("./images/4.jpg");
	background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
}
.fortune-details .fortune-details-five{
	width: 100%;
	height: 100%;
	background: #f8f4e6;
	background: url("./images/5.jpg");	
	background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
}
.fortune-details .fortune-details-six{
	width: 100%;
	height: 100%;
	background: #f8f4e6;
	background: url("./images/6.jpg");	
	background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
}
.fortune-details .fortune-details-seven{
	width: 100%;
	height: 100%;
	background: #f8f4e6;
	background: url("./images/7.jpg");	
	background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
}
.fortune-details .fortune-details-eight{
	width: 100%;
	height: 100%;
	background: #f8f4e6;
	background: url("./images/8.jpg");	
	background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
}
.fortune-details .fortune-details-nine{
	width: 100%;
	height: 100%;
	background: #f8f4e6;
	background: url("./images/9.jpg");	
	background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
}
.fortune-details .fortune-details-ten{
	width: 100%;
	height: 100%;
	background: #f8f4e6;
	background: url("./images/10.jpg");	
	background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
}
.fortune-details .fortune-details-eleven{
	width: 100%;
	height: 100%;
	background: #f8f4e6;
	background: url("./images/11.jpg");	
	background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
}
.fortune-details .fortune-details-twelve{
	width: 100%;
	height: 100%;
	background: #f8f4e6;
	background: url("./images/12.jpg");	
	background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
}
.fortune-details .fortune-details-thirteen{
	width: 100%;
	height: 100%;
	background: #f8f4e6;
	background: url("./images/13.jpg");	
	background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
}
.fortune-details .fortune-details-fourteen{
	width: 100%;
	height: 100%;
	background: #f8f4e6;
	background: url("./images/14.jpg");	
	background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
}
.fortune-details .fortune-details-fiveteen{
	width: 100%;
	height: 100%;
	background: #f8f4e6;
	background: url("./images/15.jpg");	
	background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
}
.fortune-details .fortune-details-one .details-time,
.fortune-details .fortune-details-two .details-time,
.fortune-details .fortune-details-three .details-time,
.fortune-details .fortune-details-four .details-time,
.fortune-details .fortune-details-five .details-time,
.fortune-details .fortune-details-six .details-time,
.fortune-details .fortune-details-seven .details-time,
.fortune-details .fortune-details-eight .details-time,
.fortune-details .fortune-details-nine .details-time,
.fortune-details .fortune-details-ten .details-time,
.fortune-details .fortune-details-eleven .details-time,
.fortune-details .fortune-details-twelve .details-time,
.fortune-details .fortune-details-thirteen .details-time,
.fortune-details .fortune-details-fourteen .details-time,
.fortune-details .fortune-details-fiveteen .details-time
{
	width: 130px;
	height: 130px;
	/* margin-left: 587px; */
	/* padding-top: 50px; */
	text-align: center;
	position: absolute;
	top: 4%;
	left:78%;
}
.fortune-details .fortune-details-one .details-time>span:nth-of-type(1),
.fortune-details .fortune-details-two .details-time>span:nth-of-type(1),
.fortune-details .fortune-details-three .details-time>span:nth-of-type(1),
.fortune-details .fortune-details-four.details-time>span:nth-of-type(1),
.fortune-details .fortune-details-five .details-time>span:nth-of-type(1),
.fortune-details .fortune-details-six .details-time>span:nth-of-type(1),
.fortune-details .fortune-details-seven .details-time>span:nth-of-type(1),
.fortune-details .fortune-details-eight .details-time>span:nth-of-type(1),
.fortune-details .fortune-details-nine .details-time>span:nth-of-type(1),
.fortune-details .fortune-details-ten .details-time>span:nth-of-type(1),
.fortune-details .fortune-details-eleven .details-time>span:nth-of-type(1),
.fortune-details .fortune-details-twelve .details-time>span:nth-of-type(1),
.fortune-details .fortune-details-thirteen .details-time>span:nth-of-type(1),
.fortune-details .fortune-details-fourteen .details-time>span:nth-of-type(1),
.fortune-details .fortune-details-fiveteen .details-time>span:nth-of-type(1)
{
	font-family: "PingFangSC-Regular";
	font-size: 18px;
	line-height: 26px;
	color: #333129;
}
.fortune-details .fortune-details-one .details-time>span:nth-of-type(2),
.fortune-details .fortune-details-two .details-time>span:nth-of-type(2),
.fortune-details .fortune-details-three .details-time>span:nth-of-type(2),
.fortune-details .fortune-details-four.details-time>span:nth-of-type(2),
.fortune-details .fortune-details-five .details-time>span:nth-of-type(2),
.fortune-details .fortune-details-six .details-time>span:nth-of-type(2),
.fortune-details .fortune-details-seven .details-time>span:nth-of-type(2),
.fortune-details .fortune-details-eight .details-time>span:nth-of-type(2),
.fortune-details .fortune-details-nine .details-time>span:nth-of-type(2),
.fortune-details .fortune-details-ten .details-time>span:nth-of-type(2),
.fortune-details .fortune-details-eleven .details-time>span:nth-of-type(2),
.fortune-details .fortune-details-twelve .details-time>span:nth-of-type(2),
.fortune-details .fortune-details-thirteen .details-time>span:nth-of-type(2),
.fortune-details .fortune-details-fourteen .details-time>span:nth-of-type(2),
.fortune-details .fortune-details-fiveteen .details-time>span:nth-of-type(2)
{
	font-family: "PingFangSC-Bold";
	font-size: 62px;
	line-height: 50px;
	color: #333129;
}
.fortune-details .fortune-details-one .details-time>span:nth-of-type(3)
.fortune-details .fortune-details-two .details-time>span:nth-of-type(3),
.fortune-details .fortune-details-three .details-time>span:nth-of-type(3),
.fortune-details .fortune-details-four.details-time>span:nth-of-type(3),
.fortune-details .fortune-details-five .details-time>span:nth-of-type(3),
.fortune-details .fortune-details-six .details-time>span:nth-of-type(3),
.fortune-details .fortune-details-seven .details-time>span:nth-of-type(3),
.fortune-details .fortune-details-eight .details-time>span:nth-of-type(3),
.fortune-details .fortune-details-nine .details-time>span:nth-of-type(3),
.fortune-details .fortune-details-ten .details-time>span:nth-of-type(3),
.fortune-details .fortune-details-eleven .details-time>span:nth-of-type(3),
.fortune-details .fortune-details-twelve .details-time>span:nth-of-type(3),
.fortune-details .fortune-details-thirteen .details-time>span:nth-of-type(3),
.fortune-details .fortune-details-fourteen .details-time>span:nth-of-type(3),
.fortune-details .fortune-details-fiveteen .details-time>span:nth-of-type(3)
{
	font-family: "PingFangSC-Regular";
	font-size: 16px;
	line-height: 26px;
	color: #333129;
}
.fortune-details .fortune-details-one .details-content,
.fortune-details .fortune-details-two .details-content,
.fortune-details .fortune-details-three .details-content,
.fortune-details .fortune-details-four .details-content,
.fortune-details .fortune-details-five .details-content,
.fortune-details .fortune-details-six .details-content,
.fortune-details .fortune-details-seven .details-content,
.fortune-details .fortune-details-eight .details-content,
.fortune-details .fortune-details-nine .details-content,
.fortune-details .fortune-details-ten .details-content,
.fortune-details .fortune-details-eleven .details-content,
.fortune-details .fortune-details-twelve .details-content,
.fortune-details .fortune-details-thirteen .details-content,
.fortune-details .fortune-details-fourteen .details-content,
.fortune-details .fortune-details-fiveteen .details-content{
	width: 642px;
	height: 63px;
	font-family: "PingFangSC-Medium";
	font-size: 28px;
	line-height: 36px;
	color: #5a5748;
	position: absolute;
	top: 31%;
	left: 50%;
	transform: translateX(-50%);
}
.fortune-details .fortune-details-one .details-content>span,
.fortune-details .fortune-details-two .details-content>span,
.fortune-details .fortune-details-three .details-content>span,
.fortune-details .fortune-details-four .details-content>span,
.fortune-details .fortune-details-five .details-content>span,
.fortune-details .fortune-details-six .details-content>span,
.fortune-details .fortune-details-seven .details-content>span,
.fortune-details .fortune-details-eight .details-content>span,
.fortune-details .fortune-details-nine .details-content>span,
.fortune-details .fortune-details-ten .details-content>span,
.fortune-details .fortune-details-eleven .details-content>span,
.fortune-details .fortune-details-twelve .details-content>span,
.fortune-details .fortune-details-thirteen .details-content>span,
.fortune-details .fortune-details-fourteen .details-content>span,
.fortune-details .fortune-details-fiveteen .details-content>span
{
	max-width:150px;
	display: inline-block;
	font-family: "PingFangSC-Medium";
	font-size: 30px;
	line-height: 44px;
	color: #d82d1c;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	vertical-align: middle
}
.fortune-details .fortune-details-one .details-img>span,
.fortune-details .fortune-details-two .details-img>span,
.fortune-details .fortune-details-three .details-img>span,
.fortune-details .fortune-details-four .details-img>span,
.fortune-details .fortune-details-five .details-img>span,
.fortune-details .fortune-details-six .details-img>span,
.fortune-details .fortune-details-seven .details-img>span,
.fortune-details .fortune-details-eight .details-img>span,
.fortune-details .fortune-details-nine .details-img>span,
.fortune-details .fortune-details-ten .details-img>span,
.fortune-details .fortune-details-eleven .details-img>span,
.fortune-details .fortune-details-twelve .details-img>span,
.fortune-details .fortune-details-thirteen .details-img>span,
.fortune-details .fortune-details-fourteen .details-img>span,
.fortune-details .fortune-details-fiveteen .details-img>span
{
	max-width: 150px;
	display: inline-block;
	font-family: "PingFangSC-Medium";
	font-size: 30px;
	line-height: 44px;
	color: #d82d1c;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.fortune-details .fortune-details-one .details-img,
.fortune-details .fortune-details-two .details-img,
.fortune-details .fortune-details-three .details-img,
.fortune-details .fortune-details-four .details-img,
.fortune-details .fortune-details-five .details-img,
.fortune-details .fortune-details-six .details-img,
.fortune-details .fortune-details-seven .details-img,
.fortune-details .fortune-details-eight .details-img,
.fortune-details .fortune-details-nine .details-img,
.fortune-details .fortune-details-ten .details-img,
.fortune-details .fortune-details-eleven .details-img,
.fortune-details .fortune-details-twelve .details-img,
.fortune-details .fortune-details-thirteen .details-img,
.fortune-details .fortune-details-fourteen .details-img,
.fortune-details .fortune-details-fiveteen .details-img
{
	width: 150px;
	height: 150px;
	text-align: center;
	position: absolute;
	top: 41%;
	left: 13%;
	border-radius: 50%;
}
.fortune-details .fortune-details-one .details-img>img,
.fortune-details .fortune-details-two .details-img>img,
.fortune-details .fortune-details-three .details-img>img,
.fortune-details .fortune-details-four .details-img>img,
.fortune-details .fortune-details-five .details-img>img,
.fortune-details .fortune-details-six .details-img>img,
.fortune-details .fortune-details-seven .details-img>img,
.fortune-details .fortune-details-eight .details-img>img,
.fortune-details .fortune-details-nine .details-img>img,
.fortune-details .fortune-details-ten .details-img>img,
.fortune-details .fortune-details-eleven .details-img>img,
.fortune-details .fortune-details-twelve .details-img>img,
.fortune-details .fortune-details-thirteen .details-img>img,
.fortune-details .fortune-details-fourteen .details-img>img,
.fortune-details .fortune-details-fiveteen .details-img>img{
	width: 140px;
	height: 140px;
}

.fortune-details .fortune-details-one .details-erweima,
.fortune-details .fortune-details-two .details-erweima,
.fortune-details .fortune-details-three .details-erweima,
.fortune-details .fortune-details-four .details-erweima,
.fortune-details .fortune-details-five .details-erweima,
.fortune-details .fortune-details-six .details-erweima,
.fortune-details .fortune-details-seven .details-erweima,
.fortune-details .fortune-details-eight .details-erweima,
.fortune-details .fortune-details-nine .details-erweima,
.fortune-details .fortune-details-ten .details-erweima,
.fortune-details .fortune-details-eleven .details-erweima,
.fortune-details .fortune-details-twelve .details-erweima,
.fortune-details .fortune-details-thirteen .details-erweima,
.fortune-details .fortune-details-fourteen .details-erweima,
.fortune-details .fortune-details-fiveteen .details-erweima{
	width: 113px;
	height: 113px;
	position: absolute;
	top: 77%;
	right: 8%;
}
.fortune-details .fortune-details-one .details-erweima>img,
.fortune-details .fortune-details-two .details-erweima>img,
.fortune-details .fortune-details-three .details-erweima>img,
.fortune-details .fortune-details-four .details-erweima>img,
.fortune-details .fortune-details-five .details-erweima>img,
.fortune-details .fortune-details-six .details-erweima>img,
.fortune-details .fortune-details-seven .details-erweima>img,
.fortune-details .fortune-details-eight .details-erweima>img,
.fortune-details .fortune-details-nine .details-erweima>img,
.fortune-details .fortune-details-ten .details-erweima>img,
.fortune-details .fortune-details-eleven .details-erweima>img,
.fortune-details .fortune-details-twelve .details-erweima>img,
.fortune-details .fortune-details-thirteen .details-erweima>img,
.fortune-details .fortune-details-fourteen .details-erweima>img,
.fortune-details .fortune-details-fiveteen .details-erweima>img
{
	width: 140px;
	height: 140px
}
</style>


