<template>
	<div class="about">
		<!--头部-->
		<van-nav-bar class="white" title="关于帮家洁" left-arrow @click-left="onClickLeft" />

		<div class="body">
			<img src="../../assets/img/logo_h.png"/>
			<div class="name">帮家洁&nbsp;v2.0.2</div>
      <p>帮家洁属于领启集团旗下产品</p>
      <p>是一家典型的“互联网+生活服务”平台</p>
      <p>提供优质家庭生活服务和企业后勤服务</p>
      <p>用户可以在线预约</p>
      <p>家庭清洁、办公清洁、开荒清洁、深度清洁、</p>
      <p>家电清洁，油烟清洁、管道疏通、外墙清洗</p>
      <p>等服务</p>
			<div class="top">......</div>
			<div class="top">
				<p class="top">我们付出这么多的时间</p>
				<p>只为给您一款更好的产品</p>
			</div>

      <div class="top qr_code_box">
        <p>扫码下载</p>
        <img :src="fuck_qr_code" alt="">
      </div>
      <div style="height: 0.4rem;"></div>
		</div>
	</div>
</template>

<script>
	export default{
		data () {
    		return {
          fuck_qr_code: require('@/assets/img/fuck_qr_code.png')
			}
		},
		methods:{

	    	onClickLeft(){
	    		this.$store.commit('store_show', true )
	    		window.history.go(-1);
	    	},
		}
	}
</script>

<style scoped>
	.about{
		background: #fff;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.body{
		height: calc(100% - 0.46rem);
		overflow: auto;
	}
	.about .body{
		text-align: center;
		/*padding: .15rem;*/
		font-size: .13rem;
	}
	.about .body>img{
		width: .965rem;
		height: .965rem;
		margin-top: .4rem;
	}
	.about .body .name{
		color: #18B4ED;
		font-size: .22rem;
		padding: .2rem;
	}
	.about .body .top{
		padding-top: .2rem;
	}
  .qr_code_box img {
    width: .965rem;
    height: .965rem;
  }
</style>
<style>
	.about .van-nav-bar .van-icon{
		color: #000000;
	}
	.about .van-nav-bar:after{
		content: none;
	}
</style>
