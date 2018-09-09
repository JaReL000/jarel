<style scoped lang="stylus">
	.vc-keyboard 
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		background: white;
		z-index: 999;
		.done 
			height: 80px;
			background: #f9f9f9;
			font-size: 40px;
			border: .5px solid #d6d6d6;
			border-right: none;
			border-left: none;
			padding-right: 30px;
			border-bottom: none;
			font-weight: bold;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			.text 
				color: #007eff;			
		.list 
			.key
				height: 108px;
				width: 33.33%;
				float: left;		
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 30px;
				&:active
					background: #e2e2e2;
				.keym 
					border-right: 1px solid #e9e9e9;
					border-top: 1px solid #e9e9e9;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100%;
					height: 100%;
					// color: #000000;
					font-weight: bold;
					font-size: 60px;
			.key:nth-child(3n)
				.keym
					border-right: none;
			.key:nth-of-type(10),
			.key:nth-of-type(12){
				background #f2f2f2
			}
	.del 
		font-size: 28px;
	.animated 
		animation-duration: .2s;
		animation-fill-mode: both;

	.slide-enter-active 
		animation-name: slideInUp;	
	.slide-leave-active 
		animation-name: slideInDown;

	@keyframes slideInDown 
		from 
			transform: translate3d(0, 0, 0);
			visibility: visible;
		to 
			transform: translate3d(0, 100%, 0);
			display: none;
	@keyframes slideInUp 
		from 
			transform: translate3d(0, 100%, 0);
			visibility: visible;
		to 
			transform: translate3d(0, 0, 0);


	
</style>

<template>
	<transition name="slide">
		<div 
			class="vc-keyboard animated fixed-x" 
			v-show="show" 
			@touchstart.stop.prevent="fn"
		>
			<!-- 完成 按钮-->
			<!-- <div class="done">
				<p class="text" @touchstart="complete">完成</p>
			</div> -->
			<!-- 键盘区域 -->
			<div class="list">
				<div class="key" @touchstart="typing('1')"><div class="keym">1</div></div>
				<div class="key" @touchstart="typing('2')"><div class="keym">2</div></div>
				<div class="key" @touchstart="typing('3')"><div class="keym">3</div></div>
				<div class="key" @touchstart="typing('4')"><div class="keym">4</div></div>
				<div class="key" @touchstart="typing('5')"><div class="keym">5</div></div>
				<div class="key" @touchstart="typing('6')"><div class="keym">6</div></div>
				<div class="key" @touchstart="typing('7')"><div class="keym">7</div></div>
				<div class="key" @touchstart="typing('8')"><div class="keym">8</div></div>
				<div class="key" @touchstart="typing('9')"><div class="keym">9</div></div>
				<div class="key dot"><div class="keym">
					<!-- <i class="iconfont icon-dot"></i> --></div>
				</div>
				<div class="key" 
					@touchstart="typing('0')"><div class="keym">0</div></div>
				<div class="key"
					@touchstart="typing('')"
					><div class="keym">
					<i class="iconfont icon-keyboard-delete del"></i></div>
				</div>
			</div>

		</div>
	</transition>
</template>

<script>	
	export default {
		name: 'keyboard',
		props: ['show'],
		methods: {
			/*防止点击完成按钮左边的空白区域收起键盘*/
			fn () {},
			/*输入*/
			typing (val) {
				this.$emit('typing', val);
			},
			/*点击完成*/
			complete () {
				this.$emit('complete');
			}	
		}
	}
</script>