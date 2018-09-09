<template>
	<!-- 算命详情页 -->
	<div class="fortune-details">
		<div class="fortune-details-one" v-show = "oneShow">
			<div class="details-time">
				<span>星期五</span>
				<span>10</span>
				<span>2018年1月</span>
			</div>
			<div class="details-content">近日，不少市民纷纷赶来找神算子测财运！热心市民<span v-text="this.$route.query.userName">王小明</span>向记者透露了他的2018年运势：</div>
			<div class="details-img"><img src="../images/touxiang.png" alt="">
				<span v-text="this.$route.query.userName">王小明</span>
			</div>
			<div class="details-erweima"><img src="../images/erweima.jpg" alt=""></div>
		</div>
		<div class="fortune-details-two" v-show = "twoShow">
			<div class="details-time">
				<span>星期五</span>
				<span>10</span>
				<span>2018年1月</span>
			</div>
			<div class="details-content">近日，不少市民纷纷赶来找神算子测财运！热心市民<span v-text="this.$route.query.userName">王小明</span>向记者透露了他的2018年运势：</div>
			<div class="details-img"><img src="../images/touxiang.png" alt="">
				<span v-text="this.$route.query.userName">王小明</span>
			</div>
			<div class="details-erweima"><img src="../images/erweima.jpg" alt=""></div>
		</div>
		<div class="fortune-details-three" v-show = "threeShow">
			<div class="details-time">
				<span>星期五</span>
				<span>10</span>
				<span>2018年1月</span>
			</div>
			<div class="details-content">近日，不少市民纷纷赶来找神算子测财运！热心市民<span v-text="this.$route.query.userName">王小明</span>向记者透露了他的2018年运势：</div>
			<div class="details-img"><img src="../images/touxiang.png" alt="">
				<span v-text="this.$route.query.userName">王小明</span>
			</div>
			<div class="details-erweima"><img src="../images/erweima.jpg" alt=""></div>
		</div>
		<div class="fortune-details-four" v-show = "fourShow">
			<div class="details-time">
				<span>星期五</span>
				<span>10</span>
				<span>2018年1月</span>
			</div>
			<div class="details-content">近日，不少市民纷纷赶来找神算子测财运！热心市民<span v-text="this.$route.query.userName">王小明</span>向记者透露了他的2018年运势：</div>
			<div class="details-img"><img src="../images/touxiang.png" alt="">
				<span v-text="this.$route.query.userName">王小明</span>
			</div>
			<div class="details-erweima"><img src="../images/erweima.jpg" alt=""></div>
		</div>
		<div class="fortune-details-five" v-show = "fiveShow">
			<div class="details-time">
				<span>星期五</span>
				<span>10</span>
				<span>2018年1月</span>
			</div>
			<div class="details-content">近日，不少市民纷纷赶来找神算子测财运！热心市民<span v-text="this.$route.query.userName">王小明</span>向记者透露了他的2018年运势：</div>
			<div class="details-img"><img src="../images/touxiang.png" alt="">
				<span v-text="this.$route.query.userName">王小明</span>
			</div>
			<div class="details-erweima"><img src="../images/erweima.jpg" alt=""></div>
		</div>
		<div class="fortune-details-six" v-show = "sixShow">
			<div class="details-time">
				<span>星期五</span>
				<span>10</span>
				<span>2018年1月</span>
			</div>
			<div class="details-content">近日，不少市民纷纷赶来找神算子测财运！热心市民<span v-text="this.$route.query.userName">王小明</span>向记者透露了他的2018年运势：</div>
			<div class="details-img"><img src="../images/touxiang.png" alt="">
				<span v-text="this.$route.query.userName">王小明</span>
			</div>
			<div class="details-erweima"><img src="../images/erweima.jpg" alt=""></div>
		</div>
		<div class="fortune-details-seven" v-show = "sevenShow">
			<div class="details-time">
				<span>星期五</span>
				<span>10</span>
				<span>2018年1月</span>
			</div>
			<div class="details-content">近日，不少市民纷纷赶来找神算子测财运！热心市民<span v-text="this.$route.query.userName">王小明</span>向记者透露了他的2018年运势：</div>
			<div class="details-img"><img src="../images/touxiang.png" alt="">
				<span v-text="this.$route.query.userName">王小明</span>
			</div>
			<div class="details-erweima"><img src="../images/erweima.jpg" alt=""></div>
		</div>
		<div class="fortune-details-eight" v-show = "eightShow">
			<div class="details-time">
				<span>星期五</span>
				<span>10</span>
				<span>2018年1月</span>
			</div>
			<div class="details-content">近日，不少市民纷纷赶来找神算子测财运！热心市民<span v-text="this.$route.query.userName">王小明</span>向记者透露了他的2018年运势：</div>
			<div class="details-img"><img src="../images/touxiang.png" alt="">
				<span v-text="this.$route.query.userName">王小明</span>
			</div>
			<div class="details-erweima"><img src="../images/erweima.jpg" alt=""></div>
		</div>
		<div class="fortune-details-nine" v-show = "nineShow">
			<div class="details-time">
				<span>星期五</span>
				<span>10</span>
				<span>2018年1月</span>
			</div>
			<div class="details-content">近日，不少市民纷纷赶来找神算子测财运！热心市民<span v-text="this.$route.query.userName">王小明</span>向记者透露了他的2018年运势：</div>
			<div class="details-img"><img src="../images/touxiang.png" alt="">
				<span v-text="this.$route.query.userName">王小明</span>
			</div>
			<div class="details-erweima"><img src="../images/erweima.jpg" alt=""></div>
		</div>
		<div class="fortune-details-ten" v-show = "tenShow">
			<div class="details-time">
				<span>星期五</span>
				<span>10</span>
				<span>2018年1月</span>
			</div>
			<div class="details-content">近日，不少市民纷纷赶来找神算子测财运！热心市民<span v-text="this.$route.query.userName">王小明</span>向记者透露了他的2018年运势：</div>
			<div class="details-img"><img src="../images/touxiang.png" alt="">
				<span v-text="this.$route.query.userName">王小明</span>
			</div>
			<div class="details-erweima"><img src="../images/erweima.jpg" alt=""></div>
		</div>
		<div class="fortune-details-eleven" v-show = "elevenShow">
			<div class="details-time">
				<span>星期五</span>
				<span>10</span>
				<span>2018年1月</span>
			</div>
			<div class="details-content">近日，不少市民纷纷赶来找神算子测财运！热心市民<span v-text="this.$route.query.userName">王小明</span>向记者透露了他的2018年运势：</div>
			<div class="details-img"><img src="../images/touxiang.png" alt="">
				<span v-text="this.$route.query.userName">王小明</span>
			</div>
			<div class="details-erweima"><img src="../images/erweima.jpg" alt=""></div>
		</div>
		<div class="fortune-details-twelve" v-show = "twelveShow">
			<div class="details-time">
				<span>星期五</span>
				<span>10</span>
				<span>2018年1月</span>
			</div>
			<div class="details-content">近日，不少市民纷纷赶来找神算子测财运！热心市民<span v-text="this.$route.query.userName">王小明</span>向记者透露了他的2018年运势：</div>
			<div class="details-img"><img src="../images/touxiang.png" alt="">
				<span v-text="this.$route.query.userName">王小明</span>
			</div>
			<div class="details-erweima"><img src="../images/erweima.jpg" alt=""></div>
		</div>
		<div class="fortune-details-thirteen" v-show = "thirteenShow">
			<div class="details-time">
				<span>星期五</span>
				<span>10</span>
				<span>2018年1月</span>
			</div>
			<div class="details-content">近日，不少市民纷纷赶来找神算子测财运！热心市民<span v-text="this.$route.query.userName">王小明</span>向记者透露了他的2018年运势：</div>
			<div class="details-img"><img src="../images/touxiang.png" alt="">
				<span v-text="this.$route.query.userName">王小明</span>
			</div>
			<div class="details-erweima"><img src="../images/erweima.jpg" alt=""></div>
		</div>
		<div class="fortune-details-fourteen" v-show = "fourteenShow">
			<div class="details-time">
				<span>星期五</span>
				<span>10</span>
				<span>2018年1月</span>
			</div>
			<div class="details-content">近日，不少市民纷纷赶来找神算子测财运！热心市民<span v-text="this.$route.query.userName">王小明</span>向记者透露了他的2018年运势：</div>
			<div class="details-img"><img src="../images/touxiang.png" alt="">
				<span v-text="this.$route.query.userName">王小明</span>
			</div>
			<div class="details-erweima"><img src="../images/erweima.jpg" alt=""></div>
		</div>
		<div class="fortune-details-fiveteen" v-show = "fiveteenShow">
			<div class="details-time">
				<span>星期五</span>
				<span>10</span>
				<span>2018年1月</span>
			</div>
			<div class="details-content">近日，不少市民纷纷赶来找神算子测财运！热心市民<span v-text="this.$route.query.userName">王小明</span>向记者透露了他的2018年运势：</div>
			<div class="details-img"><img src="../images/touxiang.png" alt="">
				<span v-text="this.$route.query.userName">王小明</span>
			</div>
			<div class="details-erweima"><img src="../images/erweima.jpg" alt=""></div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				oneShow:false,
				twoShow:false,
				threeShow:false,
				fourShow:false,
				fiveShow:false,
				sixShow:false,
				sevenShow:false,
				eightShow:false,
				nineShow:false,
				tenShow:false,
				elevenShow:false,
				twelveShow:false,
				thirteenShow:false,
				fourteenShow:false,
				fiveteenShow:false
			}
		},
		mounted(){
			this.bgFun()
			// this.testFun()
		},
		methods: {
			bgFun(){
				let bgNum = this.$route.query.num
				console.log(bgNum)
				if(bgNum==4){
					console.log(bgNum==4)
					this.nineShow==true
				}
				// if(bgNum==0){
				// 	this.oneShow == true
				// }else if(bgNum==1){
				// 	console.log(bgNum==1)
				// 	this.twoShow == true
				// 	console.log(1)
				// }else if(bgNum==2){
				// 	console.log(bgNum==2)
				// 	this.threeShow == true
				// 	console.log(2)
				// }else if(bgNum==3){
				// 	console.log(bgNum==3)
				// 	this.fourShow == true
				// 	console.log(3)
				// }else if(bgNum==4){
				// 	console.log(bgNum==4)
				// 	this.fiveShow == true
				// 	console.log(4)
				// }else if(bgNum==5){
				// 	console.log(bgNum==5)
				// 	this.sixShow == true
				// 	console.log(5)
				// }else if(bgNum==6){
				// 	this.sevenShow == true
				// 	console.log(6)
				// }else if(bgNum==7){
				// 	console.log(bgNum==7)
				// 	this.eightShow == true
				// 	console.log(7)
				// }else if(bgNum==8){
				// 	console.log(bgNum==8)
				// 	this.nineShow == true
				// 	console.log(8)
				// }else if(bgNum==9){
				// 	console.log(bgNum==9)
				// 	this.tenShow == true
				// 	console.log(9)
				// }else if(bgNum==10){
				// 	console.log(bgNum==10)
				// 	this.elevenShow == true
				// 	console.log(10)
				// }else if(bgNum==11){
				// 	console.log(bgNum==11)
				// 	this.twelveShow == true
				// 	console.log(11)
				// }else if(bgNum==12){
				// 	console.log(bgNum==12)
				// 	this.thirteenShow == true
				// 	console.log(12)
				// }else if(bgNum==13){
				// 	console.log(bgNum==13)
				// 	this.fourteenShow == true
				// 	console.log(13)
				// }else{
				// 	this.fiveteenShow == true
				// }
			},
			// testFun(){
			// 	if(this.tei = 12)
			// 	this.fiveteenShow = true
			// }
		}
	}
</script>
<style>
body,html,.fortune-details{
  height: 100%;
  margin: 0 auto;
  font-family: "PingFang-SC-Heavy";
}
.fortune-details .fortune-details-one,
.fortune-details .fortune-details-two,
.fortune-details .fortune-details-three,
.fortune-details .fortune-details-four,
.fortune-details .fortune-details-five,
.fortune-details .fortune-details-six,
.fortune-details .fortune-details-seven,
.fortune-details .fortune-details-eight,
.fortune-details .fortune-details-nine,
.fortune-details .fortune-details-ten,
.fortune-details .fortune-details-eleven,
.fortune-details .fortune-details-twelve,
.fortune-details .fortune-details-thirteen,
.fortune-details .fortune-details-fourteen,
.fortune-details .fortune-details-fiveteen
{
	width: 100%;
	height: 100%;
	background: #f8f4e6;
  background: url("../images/1.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
}
/* 不同背景图 */
.fortune-details .fortune-details-two{
	background: url("../images/2.jpg");
	width: 100%;
	height: 100%;
	background: #f8f4e6;
	background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;

}
.fortune-details .fortune-details-three{
	background: url("../images/3.jpg");
	width: 100%;
	height: 100%;
	background: #f8f4e6;
	background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
}
.fortune-details .fortune-details-four{
	background: url("../images/4.jpg");
	width: 100%;
	height: 100%;
	background: #f8f4e6;
	background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
}
.fortune-details .fortune-details-five{
	background: url("../images/5.jpg");
	width: 100%;
	height: 100%;
	background: #f8f4e6;
	background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
}
.fortune-details .fortune-details-six{
	background: url("../images/6.jpg");
	width: 100%;
	height: 100%;
	background: #f8f4e6;
	background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
}
.fortune-details .fortune-details-seven{
	background: url("../images/7.jpg");
	width: 100%;
	height: 100%;
	background: #f8f4e6;
	background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
}
.fortune-details .fortune-details-eight{
	background: url("../images/8.jpg");
	width: 100%;
	height: 100%;
	background: #f8f4e6;
	background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
}
.fortune-details .fortune-details-nine{
	background: url("../images/9.jpg");
	width: 100%;
	height: 100%;
	background: #f8f4e6;
	background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
}
.fortune-details .fortune-details-ten{
	background: url("../images/10.jpg");
	width: 100%;
	height: 100%;
	background: #f8f4e6;
	background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
}
.fortune-details .fortune-details-eleven{
	background: url("../images/11.jpg");
	width: 100%;
	height: 100%;
	background: #f8f4e6;
	background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
}
.fortune-details .fortune-details-twelve{
	background: url("../images/12.jpg");
	width: 100%;
	height: 100%;
	background: #f8f4e6;
	background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
}
.fortune-details .fortune-details-thirteen{
	background: url("../images/13.jpg");
	width: 100%;
	height: 100%;
	background: #f8f4e6;
	background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
}
.fortune-details .fortune-details-fourteen{
	background: url("../images/14.jpg");
	width: 100%;
	height: 100%;
	background: #f8f4e6;
	background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
}
.fortune-details .fortune-details-fiveteen{
	background: url("../images/15.jpg");
	width: 100%;
	height: 100%;
	background: #f8f4e6;
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
	margin-left: 587px;
	padding-top: 50px;
	text-align: center;
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
	font-family: PingFangSC-Regular;
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
	font-family: PingFangSC-Bold;
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
	font-family: PingFangSC-Regular;
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
	margin: 250px auto 0;
	font-family: PingFangSC-Medium;
	font-size: 28px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 36px;
	letter-spacing: 0px;
	color: #5a5748;
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
	color: #d92d1c;
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
	width: 116px;
	height: 116px;
	margin-top: 62px;
	margin-left: 103px;
	text-align: center;
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
.fortune-details .fortune-details-one.details-img>span,
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
.fortune-details .fortune-details-fiveteen .details-img>span{
	font-family: PingFangSC-Medium;
	font-size: 30px;
	line-height: 44px;
	color: #d82d1c;
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
	margin-top: 360px;
	margin-left: 570px;
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
