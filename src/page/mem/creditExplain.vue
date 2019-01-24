<template>
	<div class="creditExplain">
		<van-nav-bar class="white" title="积分说明" left-arrow @click-left="onClickLeft" />
		<div class="body">
			<div class="left">
				<div class="img"><img src="../../assets/img/logo_h.png" /></div>
				<div class="info">什么是积分？</div>
			</div>
			<div class="right">
				<div class="img"><img src="../../assets/img/logo_h.png" /></div>
				<div class="info"> 积分是广州柒度信息科技有限公司 发行的数字货币，可以在企擎旗下 所有app中流通使用，是会员财富 的免征，1个积分等于一元人民币。</div>
			</div>
			<div class="left">
				<div class="img"><img src="../../assets/img/logo_h.png" /></div>
				<div class="info">怎么获得积分？</div>
			</div>
			<div class="right">
				<div class="img"><img src="../../assets/img/logo_h.png" /></div>
				<div class="info">会员消费，或者移动店主所推荐的 人消费，都将产生积分回馈。</div>
			</div>
			<div class="left">
				<div class="img"><img src="../../assets/img/logo_h.png" /></div>
				<div class="info">积分可以干什么？</div>
			</div>
			<div class="right">
				<div class="img"><img src="../../assets/img/logo_h.png" /></div>
				<div class="info">在企擎旗下的所有app中，用积分 可以直接购买产品或服务，也可以 以一积分折现一元人民币的比例进 行提现。</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {

			onClickLeft() {
				window.history.go(-1);
			},
		}
	}
</script>

<style scoped>
	.creditExplain {
		background: #f5f5f5;
	}
	
	.creditExplain .body {
		padding: .15rem;
		line-height: .25rem;
	}
	/*左*/
	
	.creditExplain .body .left {
		display: flex;
		margin-bottom: .2rem;
	}
	
	.creditExplain .body .left .info {
		background: #fff;
		padding: .15rem;
		border-radius: .05rem;
		position: relative;
		margin: 0 .5rem 0 .1rem;
	}
	
	.creditExplain .body .left .info:before {
		content: '';
		position: absolute;
		left: -0.08rem;
		top: 0.16rem;
		width: 0;
		height: 0;
		border: .04rem solid;
		border-color: transparent #fff transparent transparent;
		z-index: 100;
	}
	/*右*/
	
	.creditExplain .body .right {
		display: flex;
		flex-direction: row-reverse;
		margin-bottom: .2rem;
	}
	
	.creditExplain .body .right .info {
		background: #18B4ED;
		padding: .15rem;
		border-radius: .05rem;
		margin: 0 .1rem 0 .5rem;
		position: relative;
		color: #fff;
	}
	
	.creditExplain .body .right .info:before {
		content: '';
		position: absolute;
		right: -0.08rem;
		top: 0.16rem;
		width: 0;
		height: 0;
		border: .04rem solid;
		border-color: transparent transparent transparent #18B4ED;
		z-index: 100;
	}
	
	.creditExplain .body .img {
		flex: 0 0 .4rem;
		height: .4rem;
		border-radius: 50%;
		overflow: hidden;
	}
	
	.creditExplain .body .img>img {
		width: 100%;
		height: auto;
	}
</style>