<template>
	<div class="item" :style="style">
		<span>Item # {{ index }}</span>
		<i class="px">{{ height }}px</i>
	</div>
</template>

<script>
	export default {
		props: {
			index: Number,
			height: Number
		},

		computed: {
			style () {
				return {
					'height': this.height + 'px',
					'line-height': this.height + 'px'
				}
			}
		}
	}
</script>

<style>
    .item {
        height: 100px;
        line-height: 100px;
        padding-left: 20px;
        border-bottom: 1px solid #eee;
    }
</style>
