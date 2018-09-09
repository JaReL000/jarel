<template>
	<div id="register">
		<form class="form">
			  <div v-if="!isPageOne">
			    <input type="tel" maxlength="11" class="tel" placeholder="请输入11位手机号" v-model="telVal" />
			  </div>
			  <div v-if="isPageOne">
			    <input type="tel" maxlength="11" class="tel" placeholder="请输入11位手机号" v-model="telVal"/>
			    <div class="clear"></div>
			    <!--新增图形验证码-->
			    <div class="tuxings">
			    	<input type="text" maxlength="5" placeholder="请输入图形码" class="tuxings-input" v-model="picVal"/>
						<img class="tuxing-a" @click.stop="renewTuxing" :src="domain +'/activity/commonget/getVerificationCode?'+'combinationId='+combinationId+'&token='+token">
			    </div>
			    <div class="clear"></div>
			    <div class="border border-no">
			      <input type="tel" class="code secrets" placeholder="请输入手机验证码" maxlength="6" v-model="verifica" />
			      <input type="button" class="code code_1 btn" value="获取验证码" @click="GetVerificationCode" />
			      <div class="clear"></div>
			    </div>
			    <div class="passwords">
				 	<input type="password" class="password fl passwords-child" maxlength="16" placeholder="请设置6~16位字母数字组合的密码" v-model="passwordVal" v-if="!open" />
				  	<input type="text" class="password fl passwords-child" maxlength="16" placeholder="请设置6~16位字母数字组合的密码" v-model="passwordVal" v-if="open" />
				  	<input type="button" class="see-secret" @click.stop="eyeFun" :class="{open}" />
			    </div>
			    <div class="clear"></div>
			    <p class="p">
			    	<label class="jy_lable" :class="{active}" @click="toggleClassFun"></label>
			    	<span><a :href="protocolApp" style="color: #333;font-size:12px;">同意《鲸鱼用户服务协议》</a></span>
			    </p>
			    <div class="clear"></div>
			  </div>
		
			  <!-- <input type="button" class="submit" @click="receiveFun" value="注册领取"> -->
				<img class="submit" @click="receiveFun" src='./img/a_bg54.png'>
			  <div class="clear"></div>
			</form>
	</div>
</template>
<script>
	import qs from 'qs'
	import * as jrUrl from '../../urlconfig/urlConfig'
	import {getRequest} from '../../util/util'
	import "babel-polyfill"
	import Flash from '@/components/flash'
	import {mapState,mapMutations} from 'vuex'
	import '../../plugin/jquery.min'
	
	let domain = process.domain
	let ishttps = 'https:' == document.location.protocol ? true: false
	if(ishttps){
		domain = domain.replace("http", "https")
	}
	export default{
		name:'index',
		data(){
			return {
				domain: '',
				isPageOne: false,
				telVal: '',
				passwordVal: '',
				verifica: '',
				scroll: null,
				eventKey: '',
				active: true,
				open: false,
				// token: '',
				picVal:'',
				inviter:'',
				combinationId:''
			}
		},
		props:['day','tel','token','activIsEnd'],
		created (){
			this.inviter=getRequest()['inviter']
			this.combinationId=getRequest()['combinationId']
			// this.token = getRequest()['token']
			this.domain = domain
//	  this.hideWeChatShareBtn();
		},
		computed:{
			// ...mapState([]),
			protocolApp() {
					return jrUrl.protocolApp
		   }
		},
		mounted(){

		},
		methods:{
			...mapMutations(['CHANGEalertold']),
			hideWeChatShareBtn () {
				document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
				// 通过下面这个API隐藏右上角按钮
				WeixinJSBridge.call('hideOptionMenu')
					}, false);
			 },
			//刷新图形码
			renewTuxing(){
				$('.tuxing-a').attr({"src":this.domain + '/activity/commonget/getVerificationCode?'+Math.random()+'&combinationId='+this.combinationId+'&token='+this.token})
			},
			toggleClassFun(){
				this.active = !this.active
			},
	      
			eyeFun() {
				this.open = !this.open
			},
			receiveFun() {
				if(this.activIsEnd){
					Flash('活动已结束')
					return false
				}
				if(!this.isPageOne){
					let regTel = /^1[3|4|5|7|8]\d{9}$/;
					if (this.telVal.length < 11) {
						setTimeout(()=>{
							Flash('手机号码应为11位数')
						},600)
						return false;
					} else if (!regTel.test(this.telVal)) {
							Flash('手机号码格式有误')
							return false;
						setTimeout(()=>{
							Flash('手机号码格式有误')
						},600)
						return false;
					}
					this.receiveHttp()
				}else {
					var reg = /^[0-9]*$/
					var regPws = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
					if (this.telVal === '' || this.telVal === null) {
						setTimeout(()=>{
							Flash('手机号不能为空')
						},600)
						return false
					} else if (this.verifica === '' || this.verifica === null) {
						setTimeout(()=>{
							Flash('验证码不能为空')
						},600)
						return false
					} else if (!reg.test(this.verifica)) {
						setTimeout(()=>{
							Flash('验证码只能为数字')
						},600)
						return false
					} else if (this.verifica.length !== 6) {
						setTimeout(()=>{
							Flash('验证码为6位数')
						},600)
						return false
					} else if (this.passwordVal === '' || this.passwordVal === null) {
						setTimeout(()=>{
							Flash('密码不能为空')
						},600)
						return false
					} else if (!regPws.test(this.passwordVal)) {
						setTimeout(()=>{
							Flash('密码格式错误')
						},600)
						return false
					}else if (!this.active) {
						setTimeout(()=>{
							Flash('请遵守协议')
						},600)
						return false
					}
					this.receiveHttp()
				}
		},
	
		receiveHttp() {
			this.fetch(jrUrl.getUserRegisterInfo, qs.stringify({
				tel: this.telVal,
				combinationId:this.combinationId,
				token: this.token
			})).then((response) => {
				response = response.data;
				// 没有注册
				if(response.code === 10000 && response.data==1) {
					if(this.isPageOne){
						this.register()
					}else {
						this.isPageOne = true
					}

				// 已经注册
				} else if(response.code === 10000 &&  response.data==2) {
					//已注册(非此活动用户) 
					window.scrollTo(0, 0)
					this.CHANGEalertold(true)
				}else if(response.code === 10000 && response.data==3){
					//已注册（此活动用户）
					window.scrollTo(0, 0)
					this.$emit('changeUserMobile',this.telVal)
					this.$emit('changeResult',true)
					this.$emit('getWechatFriendAward')
					this.$emit('getWechatShare')
					this.$emit('changeNewUser',true)
				}
			})
		},
		// 发送验证码
		GetVerificationCode() {
			$(".getCode").attr("disabled","disabled");
			var picVal=$.trim(this.picVal);
			var tel=$.trim(this.telVal);
			if(picVal){
				if(tel){
					if(!(/^1[34578]\d{9}$/.test(tel))){
					$(".getCode").removeAttr("disabled");
							setTimeout(()=>{
								Flash('手机号码填写错误')
							},600)
							return false;
				}else{
					// 填写正确，发送验证码
						this.fetch(jrUrl.newGetSmsCode, qs.stringify({
								tel: tel,
								code:picVal,
								combinationId: this.combinationId,
								token: this.token
							})).then((response) => {
										$(".getCode").removeAttr("disabled");
										response = response.data;
										if(response.code == 10000) {
											$(".getCode").removeAttr("disabled");
											this.countDown()
										}else{
											$(".getCode").removeAttr("disabled");
											setTimeout(()=>{
												Flash(response.data)
											},600)
											$('.tuxing-a').attr({"src":this.domain + '/activity/commonget/getVerificationCode?'+Math.random()+'&combinationId='+this.combinationId+'&token='+this.token})
											return false;
										}
									})
								}
							}else{
									$(".getCode").removeAttr("disabled");
										setTimeout(()=>{
											Flash('手机号码不能为空')
										},600)
										return false;
								}
							}else{
								$(".getCode").removeAttr("disabled");
								setTimeout(()=>{
									Flash('图形验证码不能为空')
									},600)
								return false;
							}
			},
			// 注册
      register() {
	        this.fetch(jrUrl.commonRegisterInviter, qs.stringify({
	          tel: this.telVal,
	          checkSms: this.verifica,
	          password: this.passwordVal,
	          combinationId:this.combinationId,
						inviter:this.inviter,
						token: this.token
	        })).then((response) => {
	          response = response.data;
	          if(response.code == 10000) {
						//注册成功
							this.$emit('changeUserMobile',this.telVal)
							window.scrollTo(0, 0)
							this.$emit('changeResult',true)
							this.$emit('getWechatFriendAward')
							this.$emit('changeNewUser',true)
							this.$emit('getWechatShare')
	          }else if(response.code == 10001||response.code == 12004){
							Flash(response.data)
	            return false;
	          }
	        })
	      },
				// 倒计时
	      countDown() {
	        var codeTime = 60;
	        $('.code_1').val(codeTime+'s重新获取');
	        $('.code_1').attr('disabled','disabled').addClass('active')
	        this.play = setInterval(() => {
	          codeTime--;
	          if(codeTime==0){
	            $('.code_1').val('发送验证码');
	            clearInterval(this.play);
	            $('.code_1').removeAttr('disabled').addClass('active')
	            return;
	          }
	          $('.code_1').val(codeTime+'s重新获取');
					},1000);
					setTimeout(()=>{
						Flash('验证码发送成功')
					},600)
	        return false;
	      }
		},
		components:{}
	}
	
</script>
<style lang="stylus" scoped>
@import '../../style/mixin.styl'
	.form{
	  	// width:709px;
	  	/*height:610px;*/
	    overflow: hidden;
	    text-align: center;
	    font-size:0;
	    background: #fefdf3;
	    // margin-left:20.5px;
	    padding-top: 44px;
	    // border-radius: 4px;
	    margin-bottom: 40px;
	  }
	  .form .tel,.password{
	    width:593px;
	    height:88px;
	    padding-left:30px;
	    margin-bottom: 30px;
	    /*border:1px solid #ddd;*/
	    border-radius: 2px;
	    box-sizing: border-box;
	    line-height: 88px;
	    font-size: 30px;
	    color: #333;
	    -webkit-appearance: none;
	  }
	  .tel{
	  	border:1px solid #d1d7da;
	  	height: 30px!important;
	  	line-height: 30px!important;
	  	padding:42px 0 42px 0;
	  }
	  .form .password{
	    margin-bottom: 20px;
	  }
	  .form .border{
	    width:640px;
	    height:88px;
	    border-radius: 2px;
	    margin:0 auto 30px auto;
	    /*border:1px solid #ddd;*/
	  }
	  .form .code{
	    width:320px;
	    height:88px;
	    border:0;
	    outline:none;
	    border-radius: 2px;
	    padding-left:30px;
	    text-align: left;
	    box-sizing: border-box;
	    margin:0;
	    float:left;
	    line-height: 88px;
	    color:#333;
	    font-size:30px;
	  }
	  .form .code_1{
	    box-sizing: border-box;
	    text-align: center;
	    width: 223px;
	    padding-right:30px;
	    background:#ffe455;
	    float:left;
	    font-size:30px;
	    color:#d28500;
	    padding-left:0;
	    border:1px solid #d1d0b8;
	    padding-right: 0;
	    border-radius: 6px;
	  }
	  .form .p{
	    width:640px;
	    margin:10px auto 0;
	    text-align: left;
			overflow: hidden;
	  }
	  .form .p .jy_lable{
	  	width:26px;
	  	height:26px;
	  	border-radius: 4px;
	  	background: url('./img/sx_bg14.png') no-repeat center;
	  	background-size:100% 100%;
	  	float:left;
	    margin-right:14px;
	    margin-top: 14px;
			margin-left: 15px;
	  }
	  .form .p .active{
	    background:url('./img/sx_bg15.png') no-repeat center;
	    background-size:100% 100%;
	  }
	  .form .p span , .form .p a{
	    display: inline-block;
	    color:#b3b3b3;
	    font-size:33px;
	    text-align: left;
	    padding-top:5px;
	  }
	  .form .submit{
	    display: block;
	    width:584px;
	    height: 92px;
	    // line-height: 0.88px;
	    // @include bis('./img/wj_bg36.png');
			// background: #dd462a;
			border-radius: 4px;
	    border:0;
	    // outline: none;
	    color:#fff;
	    margin:24px auto 50px;
	    font-size:37px;
	    // padding-bottom: 0.1px;
	  }
	  
	  /*手机验证码*/
	 .secrets{
	 	width: 343px!important;
	 	border: 1px solid #d1d7da!important;
	 	-webkit-appearance: none;
	 	margin-right: 25px!important;
	 	height: 30px!important;
	 	line-height: 30px!important;
	 	padding: 45px 0 40px 0;
	 	border-radius: 4px;
	 }
	 /*密码*/
	.passwords{
		width: 588px;
		height: 88px;
		margin: 0 auto;
		border: 1px solid #d1d7da;
		border-radius: 4px;
		overflow: hidden;
		background: #fff;
	}
	.passwords-child{
		width: 511px;
		outline: none;
		height: 30px!important;
	 	line-height: 30px!important;
	 	padding: 45px 0 40px 30px;
	}
	/*显示密码*/
	.see-secret{
		width: 40px;
		margin-top: 24px;
		background: url('./img/pr_eye_close1.png') no-repeat center;
		background-size:contain ;
		margin-right: 20px;
	}
	
	.open{
		background: url('./img/pr_eye_open1.png') no-repeat center;
		background-size:contain;
	}
	
	.tuxings{
		width: 640px;
		height: 88px;
		box-sizing: border-box;
		border-radius: 4px;
		margin: 0 auto;
		margin-bottom: 20px;	
	}
	.tuxings-input{
		width: 342px;
		height: 88px;
		margin-right: 25px;
		background:#fff!important;
		display: block;
		float: left;
		outline: none;
		-webkit-appearance: none;
		border: 1px solid #d1d7da;
		font-size: 30px;
		box-sizing: border-box;
		padding-left: 30px;
		border-radius: 4px!important;
	}
	.tuxing-a{
		width: 220px;
		height: 84px;
		border: 1px solid #d1d0b8;
		float: left;
		border-radius: 4px;	
	}
	.showHide{
		width: 60px;
		height: 10px;
		background: rgba(0,0,0,0.5);
		position: absolute;
		left: 50%;
		top: 70%;
		-webkit-transform: translate(-50%,-50%);
		z-index:20000;
		border-radius: 4px;
		font-size: 40px;
		color: #fff;
		text-align: center;
		line-height: 10px;	
	}
  .hide_com{
		display: none;
	}
	
	#register{
		width: 600px;
		// background: #e33539;
		height: 100%;
		overflow: hidden;
		margin: 0 auto;
	}
	
	::-webkit-input-placeholder{
		color: #ced5d8;
	}


	
</style>