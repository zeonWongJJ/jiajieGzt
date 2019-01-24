<template>
	<div class="forget">
		<div class="f_nav">
			<van-nav-bar title="忘记密码" left-arrow @click-left="onClickLeft" />
		</div>

		<div class="com">
			<van-cell-group>
				<van-field v-model="username" label="手机号" placeholder="请输入手机号" />
				<van-cell-group>
					<van-field v-model="sms" label="验证码" placeholder="请输入短信验证码">
						<van-button slot="button" size="small" type="primary" @click="fun_count_down">{{count_down}}{{count_down2}}</van-button>

					</van-field>
				</van-cell-group>
				<van-field v-model="password" type="password" label="密码" placeholder="请输入密码" />
			</van-cell-group>
		</div>

		<div class="but" @click="buts">
			<button >确定</button>
		</div>
	</div>
</template>

<script>
	import api from '@/api/api'
	export default {
		data() {
			return {
				username: '', //手机号
				sms: '', //验证码
				password: '', //密码
				count_down: '获取验证码',
				count_down2: '',
				time: 60,
				dx_type: true
			}
		},
		mounted() {

		},
		methods: {
			onClickLeft() {
				this.$router.back(-1)
			},
			//获取验证码事件
			fun_count_down() {
				let that = this
				let re = /(1[3-9]\d{9}$)/;
				// 验证手机号
				if(that.username == "") {
					that.$toast("手机号不能为空");
					return false;
				}
				if(!re.test(that.username)) {
					that.$toast("请输入正确的手机号");
					return false;
				}
				if(that.dx_type) {
					that.dx_type = false
					let lists = {};
					lists.user_phone = that.username
					that.$fetch('user_code_send', lists).then(rs => {
            that.$toast('验证码已发送');
            that.fun_yzm()
					}).catch(e => {
            that.dx_type = true
          })
				}
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
			buts(){
				let that = this
				if(that.username.length < 11){
					that.$toats('请填写正确的手机号')
					return
				}
				if(that.password.length < 6){
					that.$toast('登录密码不小于6位哦！')
					return
				}
				if(that.sms.length == 0){
					that.$toast('请填写验证码！')
					return
				}
				let lists = {};
				lists.phone = that.username
				lists.new_password = that.password
				lists.code = that.sms
				that.$fetch('user_info_update_pwd', lists , '2').then(rs => {
          that.$toast('修改成功');
          setTimeout(() => {
            that.$router.push({
              path: '/'
            })
          }, 1000);
        })
			},
		},
	}
</script>

<style scoped>
	.forget {
		background: #f7f7f7;
	}

	.van-button--primary {
		background: none !important;
		color: #18b4ed;
		border: 0.01rem solid #18b4ed;
	}

	.f_nav {
		background: #fff;
	}

	.com {
		margin-top: 0.1rem;
	}

	.but {
		width: 100%;
		margin-top: .35rem;
	}

	.but button {
		width: 90%;
		margin: 0 5%;
		border-radius: .1rem;
		border: 0;
		background: #18b4ed;
		color: #fff;
		height: .5rem;
		line-height: .5rem;
		font-size: .18rem;
	}
</style>
<style type="text/css">
	.forget .van-cell__title {
		font-weight: 600 !important;
	}

	.forget .van-cell {
		padding: 0 .15rem;
		height: .5rem;
		line-height: .5rem;
	}
</style>
