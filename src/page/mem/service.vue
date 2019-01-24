<template>
	<div class="service">
		<van-nav-bar title="客服中心" class="white" left-arrow @click-left="onClickLeft"/>
		<div class="body">
			<a class="item" href="http://lyt.zoosnet.net/lr/chatpre.aspx?id=LYT42657310">
				<div class="img">
					<img src="../../assets/img/feedback.png"/>
				</div>
				<div class="title">在线客服</div>
				<div class="more">工作时间10:00-22:00</div>
			</a>
			<a class="item" href="tel:18998301449">
				<div class="img">
					<img src="../../assets/img/callout.png"/>
				</div>
				<div class="title">电话客服</div>
				<div class="more">工作时间10:00-22:00</div>
			</a>
		</div>
	</div>
</template>

<script>
	export default{
		data () {
    		return {
    			
			}
		},
		methods:{
			
	    	onClickLeft(){
	    		window.history.go(-1);
	    	},
		}
	}
</script>

<style scoped>
	.service{
		background: #f5f5f5;
	}
	
	.service .body{
		padding: .15rem;
	}
	
	.service .body .item{
		background: #fff;
		text-align: center;
		border-radius: .05rem;
		padding: .3rem 0;
		display: block;
	}
	.service .body .item>*{
		margin: .1rem auto;
	}
	.service .body .item+.item{
		margin-top: .1rem;
	}
	.service .body .item .img{
		width: .55rem;
		height: .55rem;
	}
	.service .body .item .img>img{
		width: 100%;
		height: auto;
	}
	.service .body .item .title{
		font-size: .16rem;
		color:#999;
	}
	.service .body .item .more{
		color: #999999;
	}
</style>