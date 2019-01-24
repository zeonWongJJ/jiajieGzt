<template>
	<div class="as">
		<!--<mt-header fixed title="固定在顶部"></mt-header>-->
		<div class="header">
			<div @click="goReturn"><</div>
			<div>标题</div>
			<div>。。。</div>
		</div>


	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			goReturn() {
				let that = this;
				window.history.go(-1);
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.header{
		font-size: 0.12rem;
		display: flex;
		justify-content:space-between;
		height: .44rem;
		line-height: .44rem;
		background: #f8f8f8;
	}
	.header div:nth-child(1),.header div:nth-child(3){
		width: .44rem;
	}
	
</style>