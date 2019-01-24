<template>
	<div class="storeMain">
		<div class="body">
			<van-nav-bar title="店铺主体"  left-arrow @click-left="onClickLeft" />
			<div class="list_container">
				<ul>
					<li @click="gostoreA">
						<img src="../../../static/images/prosssssss.png" alt="" />
						<p>企业</p>
					</li>
					<li @click="gostoreB">
						<img src="../../../static/images/perssss.png" alt="" />
						<p>个人</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		mounted() {//生命周期 

		},
		methods: {//方法
			onClickLeft(){
				this.$router.back(-1);
			},
			gostoreA(){
				this.$router.push({
	    			path:'upStore'
	    		})
			},
			gostoreB(){
				this.$router.push({
	    			path:'upStore'
	    		})
			},	
		},
	}
</script>

<style scoped>
	
	.list_container ul{
		padding:0.12rem;
	}
	.list_container li{
		text-align: center;
		background:white;
		margin-bottom:0.12rem;
	}
	.list_container li>img{
		margin-top:0.39rem;
		width:0.74rem;
		margin-bottom: 0.17rem;
	}
	.list_container li>p{
		margin:0;
		font-size:0.19rem;
		padding-bottom: 0.66rem;
	}
</style>
<style>
	.storeMain .body{
		background:#f5f5f5 !important;
	}
	.storeMain .van-nav-bar{
		background:white !important;
	}

	.storeMain .van-nav-bar .van-icon,.storeMain .van-nav-bar__title{
		color:black !important;
	}	
</style>