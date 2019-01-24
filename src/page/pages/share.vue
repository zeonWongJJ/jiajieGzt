<template>
	<div class="share" v-if="!setup">
		<img src="../../assets/img/share_img.png" />
		<div class="btn" @click="gosetup">立即注册</div>
		<div class="or">或</div>
		<a class="btn" href="http://jiajie-pc.7dugo.com/qr.php">下载APP</a>
	</div>
	<div class="setup" v-else>
		<div class="logo">
			<img src="../../assets/img/logo_h.png" />
			<h1>帮家洁</h1>
		</div>
		<div class="from">
			<div class="input">
				<input type="text" name="tel" id="tel" placeholder="请输入手机号" v-model="tel" />
			</div>
			<div class="input code">
				<input type="text" name="code" id="code" placeholder="请输入验证码" v-model="code" />
				<div class="getcode" @click="getcode">{{count_down}}{{count_down2}}</div>
			</div>
			<div class="input">
				<input type="password" name="userpassword" id="userpassword" placeholder="请输入至少六位密码" v-model="userpassword" />
			</div>
			<div class="input">
				<input type="password" name="nuserpassword" id="nuserpassword" placeholder="请重复密码" v-model="nuserpassword" />
			</div>
			<div class="btn" @click="finish">注册</div>
		</div>
	</div>
</template>

<script>
	import api from '@/api/api'

	export default {
		data() {
			return {
				user_referee: 0,
				setup: 0,
				tel: '',
				code: '',
				userpassword: '',
				nuserpassword: '',
				//获取验证码倒计时
				count_down: '获取验证码',
				count_down2: '',
				dx_type: 1,
				time: 60,
			}
		},
		mounted() {
			this.user_referee = this.$route.query.userid
		},
		methods: {
			gosetup() {
				this.setup = 1
			},
			fun_yzm() {
				let that = this
				that.count_down = that.time
				that.count_down2 = '秒'
				if(that.time === 0) {
					that.count_down = '获取验证码'
					that.count_down2 = ''
					that.time = 60
					that.dx_type = true
				} else {
					that.count_down = that.time--
						setTimeout(that.fun_yzm, 1000);
				}
			},
			getcode() {
				let that = this
				if(that.dx_type) {
					let re = /(1[3-9]\d{9}$)/;
					if(that.tel == "") {
						that.$toast("手机号不能为空");
						return
					}
					if(!re.test(that.tel)) {
						that.$toast("请输入正确的手机号");
						return
					}
					let lists = {};
					lists.user_phone = that.tel
					that.$fetch('user_code_send',lists).then(rs =>{
            that.dx_type = false
            that.$toast('验证码已发送');
            that.fun_yzm()
					})
				}
			},
			finish() {
				let that = this
				let re = /(1[3-9]\d{9}$)/;
				if(!re.test(that.tel)) {
					that.$toast('请输入正确的手机号！');
					return
				}
				if(that.code.length <= 0) {
					that.$toast('请输入验证码！');
					return
				}
				if(that.userpassword.length < 6) {
					that.$toast('请输入至少六位密码！')
					return
				}
				if(that.userpassword !== that.nuserpassword) {
					that.$toast('两次输入密码不一致！')
					return
				}
				let lists = {};
				lists.user_phone = that.tel
				lists.user_password = that.userpassword
				lists.verify_code = that.code
				lists.user_referee = that.user_referee
				that.$fetch('user_register', lists).then(rs =>{
          that.$toast("注册成功");
          that.setup = 0;
				})
			}
		}
	}
</script>

<style scoped>
	.share {
		background: #fff;
	}

	.share>img {
		width: 100%;
		height: auto;
	}

	.share .or {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 .5rem;
		color: #999;
	}

	.share .or:before {
		content: '';
		flex: 1;
		height: 1px;
		background: #999999;
		margin-right: .2rem;
	}

	.share .or:after {
		content: '';
		flex: 1;
		height: 1px;
		background: #999999;
		margin-left: .2rem;
	}

	.share .btn {
		display: block;
		background: rgb(255, 152, 0);
		border-radius: .3rem;
		line-height: .46rem;
		color: #fff;
		font-size: .18rem;
		margin: .15rem;
		text-align: center;
	}

	.logo>img {
		width: 1rem;
		height: auto;
	}

	.setup {
		background: #fff;
		padding: .15rem;
	}

	.setup .logo {
		padding-top: .15rem;
		text-align: center;
	}

	.from {
		padding: 0 .3rem;
	}

	.from .input {
		border: 1px solid #DEDEDE;
		border-radius: .3rem;
		line-height: .46rem;
		height: .46rem;
		font-size: .18rem;
		margin-top: .15rem;
		overflow: hidden;
		padding-left: .15rem;
		position: relative;
	}

	.from .input>input {
		border: 0;
		height: .46rem;
		width: 100%;
	}

	.from .btn {
		background: #18B4ED;
		border-radius: .3rem;
		line-height: .46rem;
		color: #fff;
		font-size: .18rem;
		margin-top: .15rem;
		text-align: center;
	}

	.from .input .getcode {
		position: absolute;
		right: .05rem;
		bottom: 0;
		color: #18B4ED;
		font-size: .16rem;
	}
</style>
