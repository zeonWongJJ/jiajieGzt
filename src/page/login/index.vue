<template>
	<div class="login">
		<div class="header">登录</div>
		<div class="main">
			<div class="tip">你可以用以下方式登录</div>
			<div class="login_box">
				<div class="login_btn" @click="toLogin(1)">
					<img src="../../assets/img/login/wechat_L.png"/>
					<div>微信登录</div>
				</div>
				<div class="login_btn" @click="toLogin(2)">
					<img src="../../assets/img/login/alipay_L.png"/>
					<div>支付宝登录</div>
				</div>
				<div class="login_btn" @click="toLogin(3)">
					<img src="../../assets/img/login/mibile_L.png"/>
					<div>手机登录</div>
				</div>
			</div>
		</div>
		<div class="footer">
			<img src="../../assets/img/logo_h.png"/>
			<div class="logo_name">广州柒度信息科技有限公司</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			toLogin(type){
				if(type === 3){
					this.$router.push({
						path:'/loginByMobile'
					})
				}else{
					
				}
			}
		}
	}
</script>

<style scoped>
	.login{
		position: relative;
		height: 100%;
	}
	.login .header{
		font-size: .18rem;
		text-align: center;
		line-height: .46rem;
		height: .46rem;
		color: #fff;
		background: #18b4ed;
	}
	.login .footer{
		position: absolute;
		bottom: .15rem;
		text-align: center;
		width: 100%;
	}
	.login .footer>img{
		width: .89rem;
		height: auto;
	}
	.login .main{
		text-align: center;
		font-size: .16rem;
	}
	.login .main .tip{
		padding: .4rem 0;
	}
	.login .main .login_box{
		display: flex;
		justify-content: space-between;
		padding: 0 .3rem;
	}
	.login .main .login_box .login_btn>img{
		width: .75rem;
		height: auto;
	}
</style>