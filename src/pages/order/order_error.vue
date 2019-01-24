<template>
	<div class="order_error">
		<van-nav-bar class="white" left-arrow @click-left="onClickLeft" />
		<div class="img">
			<img src="./assets/img/error.png"/>
			<h1>支付失败</h1>
		</div>
	</div>
</template>

<script>
	export default{
		methods:{
			onClickLeft(){
				this.$router.back(-1)
			}
		}
	}
</script>

<style lang="less" scoped>
	.order_error{
		height: 100%;
		.img{
			padding-top: 1rem;
			text-align: center;
		}
	}
</style>