<style  lang="stylus">
.vc-keyboard 
	font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
	user-select: none;
	font-size: 16px;
	width: 100%;
	.input-box 
		display: flex;
		align-items: center;
		justify-content: space-between;
		line-height: 46px;
		position: relative;
		.clear
			position absolute
			width 40px
			height @width
			right 30px
			background-image url("./fonts/clearinput.png")
			background-repeat no-repeat
			background-size 100% 100%
			z-index 100
		.label 
			color: #333;
		.content 
			display: flex;
			.input 
				font-size: 40px;
				color: #B3B3B3;
				line-height: 50px;
				&.h 
					font-size 44px
					color #333
			.cursor 
				background-color: #4788c5;
				width: 3px;
				margin-left: 2px;
			.placeholder 
				color: #B3B3B3;
				font-size: 36px;
			.currency 
				color: #c1c1c1;
	.mask-kb
		background-color rgba(0, 0, 0, 0)
</style>

<template>
	<div class="vc-keyboard">
		<!-- 自定义输入框 -->
		<div 
			class="input-box" 
			@touchstart.stop="focus"
		>
			<!-- 左侧标签 -->
			<!-- <p class="label">{{label}} : </p> -->
			<!-- 右侧内容 -->
			<div class="content">
				
				<p 
					class="input"
					:class="{h: val.length}"
					v-text="val"
				>
					<!-- <span class="currency" v-show="val">¥</span> -->
				</p>
				<p class="cursor" v-show="val.length != 0" :style="{visibility: cursor ? 'visible' : 'hidden'}"></p>
				<p class="cursor" v-show="val.length === 0" :style="{visibility: cursor ? 'visible' : 'hidden'}"></p>
				<p 
					class="placeholder" 
					v-show="val.length === 0"
					v-text="myplacehold"
				></p>
				<!-- 光标 -->
			</div>
			<div class="clear" v-show="keyboard&&val" @click="clear()"></div>
		</div>

		<!-- 蒙版 -->
		<div 
			class="mask-kb fixed"
			v-show="keyboard"
			@touchstart.stop="blur"
		></div>
		<!-- 自定义键盘 -->
		<keyboard 
			:show="keyboard"
			@typing="typing"
			@complete="blur"
		></keyboard>
	</div>		
</template>

<script>
import keyboard from './keyboard'
// import { mapActions } from 'vuex'
// import { mapGetters } from 'vuex'
export default {
	name: 'wc-keyboard',
	components: {
		keyboard
	},
	created () {
		// document.addEventListener('touchstart', () => {
		// 	this.blur();
		// });
	},	
	props: {
		money: {
			default: ''
		},
		moneyMax: {
			default: 10000000
		},
		inter: {
			default: 5
		},
		decimal: {
			default: 2
		},
		label: {
			default: '消费金额'
		},
		placeholder: {
			type: String,
			default: '请输入金额'
		}
	},
	data () {
		return {
			cursor: false,
			keyboard: false,

			/*value 在组件中的值*/
			val: '', 
			aIllegal: ['00', '01' ,'02','03','04','05','06','07','08','09', '0..', '.'],
			cursorDuration: 600,
			bodyHeight: '',
			bodyOverflow: '',
			myplacehold: this.placeholder
		}
	},
	methods: {
		/*focus*/
		focus () {
			/*检测默认传递进来的值*/
			this.checkdefaultvalue()
			/*显示键盘*/
			this.showKeyboard();				
			/*显示光标*/
			this.showCursor();
			/*闪烁光标*/
			this.blinkCursor();
		},
		blinkCursor () {
			clearInterval(this.intervalID);
			this.intervalID = setInterval(()=>{
				this.cursor = !this.cursor;
			}, this.cursorDuration);
		},
		unblinkCursor () {
			clearInterval(this.intervalID);
		},
		/*blur*/
		blur () {
			
			/*隐藏光标*/
			this.hideCursor();
			/*停止光标闪烁*/
			this.unblinkCursor();
			/*隐藏键盘*/
			this.hideKeyboard();
			/*
				附加 00, 如果用户输入了一个以 . 结尾的值就点完成了, 
				那么这个时候就在后面加上00
			*/
			// this.toCompletion();
			/*通知父组件, 老子值出来了*/
			/*
				校验用户输入的金额是不是为 0, 如果是的话, 直接重置
			*/
			this.checkValue();
			this.notify();

			// 收起键盘回调
			this.$emit('complete');
		},
		checkdefaultvalue(){
			// if(this.myplacehold!="请输入金额"){
			// 	this.val = this.myplacehold
			// }
		},
		showKeyboard () {
			this.keyboard = true;
		},
		hideKeyboard () {
			this.keyboard = false;
		},
		showCursor () {
			this.cursor = true;
		},
		hideCursor () {
			this.cursor = false;
		},
		checkValue () {
			if (parseFloat(this.val) === 0) {
				this.val = '';
			}
		},
		/*判读是否需要加0*/
		toCompletion () {
			let list = this.money.split('.');
			if (typeof list[1] === 'undefined') {
				if (this.val !== '') {
					this.val = this.val + '.';
					this.completion(this.decimal);
				}
			} else {
				if (list[1].length < this.decimal) {
					this.completion(this.decimal - list[1].length);
				}					
			}
		},
		completion (len) {
			let v = '';
			for(let i =0;i<len;i++){
				v = v + '0';
			}
			this.val = this.val + v;
		},
		notify () {
			
			this.$emit('onInputChange', this.val);
		},
		del () {
			/*删除值并不会触发值的校验, 所以需要手动再触发一次*/
			this.val = this.val.slice(0, -1);
			this.notify();
		},
		/*输入*/
		clear(){
			this.val ='';
			this.myplacehold='请输入金额'
			this.notify();
		},
		typing (value) {
			
			/*如果是点击删除*/
			if (value === '') {
				this.del();
			}
			/*保存旧的值*/
			let oldValue = this.val;
			/*获取新的值*/
			this.val = this.val + value;
			/*检验新值, 如果没有通过检测, 恢复值*/
			if (!this.passCheck(this.val)) {
				this.val = oldValue;
				
				return;
			}
			console.log((this.val), this.moneyMax);
			
			if(parseFloat(this.val)  > this.moneyMax){
				this.val = this.moneyMax.toString()
			}
			
			/*为了让外界同步输入, 需要发送事件*/
			this.notify();
		},
		passCheck (val) {
			/*验证规则*/
			let aRules = [
				this.illegalInput,
				this.illegalValue,
				this.accuracy,

			]
			return aRules.every((item) => {
				return item(val);
			});
		},

		/**
		 * 验证规则
		 */
		illegalInput (val) {
			if (this.aIllegal.indexOf(val) > -1) {
				return false;
			}
			return true;
		},
		/*非法值*/
		illegalValue (val) {
			if (parseFloat(val) != val) {
				return false;
			}	
			return true;			
		},
		/*验证精度*/
		accuracy (val) {
			let v = val.split('.')
			if (v[0].length > this.inter) {
				return false;
			}
			if (v[1] && (v[1].length) > this.decimal) {
				return false;					
			}
			return true;				
		},
		compareVal(val){
			return true
		}
	}
}

</script>