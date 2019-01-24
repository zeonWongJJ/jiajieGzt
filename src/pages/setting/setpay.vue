<template>
	<div class="set_show">
		<div>
			<van-nav-bar title="修改支付密码" left-arrow @click-left="onClickLeft" />
		</div>
		<div class="com" v-if="type == 1">
			<van-cell-group>
				<van-field v-model="old_payment" type="password" label="旧密码" placeholder="请输入旧密码" />

				<van-field v-model="new_payment" type="password" label="新密码" placeholder="请输入新密码" />
			</van-cell-group>
		</div>
		<div class="com" v-if="type == 2">
			<van-cell-group>
				<van-field v-model="user.phone" label="手机号" placeholder="请输入手机号" />
				<van-cell-group>
					<van-field v-model="sms" label="验证码" placeholder="请输入短信验证码">
						<van-button slot="button" size="small" type="primary" @click="fun_count_down">{{count_down}}{{count_down2}}</van-button>

					</van-field>
				</van-cell-group>
				<van-field v-model="password" type="password" label="密码" placeholder="请输入密码" />
			</van-cell-group>
		</div>
		<div class="com" v-if="type == 3">
			<van-cell-group>
				<van-field v-model="old_payment" type="password" label="新密码" placeholder="请设置支付密码" />

				<van-field v-model="new_payment" type="password" label="重复密码" placeholder="请再次输入支付密码" />
			</van-cell-group>
		</div>

		<div class="set_but">
			<button @click="sure">确 定</button>
		</div>
	</div>

</template>

<script>
	import api from '@/api/api';
	import { Toast } from 'vant';
	export default {
		data() {
			return {
				type: 0,
				phone: '',
				username: '', //手机号
				sms: '', //验证码
				password: '', //密码
				count_down: '获取验证码',
				count_down2: '',
				time: 60,
				dx_type: true,
				//旧密码
				old_payment: '',
				new_payment: '',
				user: {
					phone: '',
				},
			}
		},
		mounted() {
			this.init()
			this.type = this.$route.query.type;
			window['onSMSReceiveSuccess'] = res => {
				this.sms = res.code
			}
		},
		watch: {
//			phone(val, old) {
//				if(val.length > 11) {
//					this.user.phone = val.substr(0, 11)
//				}
//				let phoneReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
//				if(phoneReg.test(val)) {
//					this.username = val
//					var reg = /(\d{3})\d{4}(\d{4})/;
//					this.user.phone = ('' + val).replace(reg, '$1****$2')
//				} else {
//					//监听默认给空！输入会默认
//					//					this.phone = ''
//				}
//			}
		},
		methods: { //方法
			//			返回上一级
			onClickLeft() {
				this.$router.back(-1)
			},
			init() {
				let that = this
				that.$fetch('user_info_get', {}, '', 'GET', 1).then(rs => {
					that.phone = rs.user_phone;
					var str = rs.user_phone;
					var str2 = str.substr(0, 3) + "****" + str.substr(7);
					that.user.phone = str2

//					console.log(that.user.phone)
				})
			},

			sure() {
				let that = this;
				let lists = {}
				if(that.type == 1) { //通过旧密码
					if(that.old_payment.length >= 6 && that.new_payment.length >= 6) {
						lists.old_payment = that.old_payment
						lists.new_payment = that.new_payment
						lists.user_phone = that.phone

					} else {
						that.$toast('登录密码不小于6位哦！')
						return
					}
				} else if(that.type == 2) { //通过手机验证码
					if(that.phone.length !== 11 || that.user.phone.length !== 11) {
						that.$toast('请填写正确的手机号')
						return
					}
					if(that.password.length < 6) {
						that.$toast('登录密码不小于6位哦！')
						return
					}
					if(that.sms.length != 4) {
						that.$toast('验证码不合法！')
						return
					}
					lists.phone =  that.phone
					lists.new_payment = that.password
					lists.code = that.sms
				} else {
					if(that.old_payment !== that.new_payment) {
						that.$toast('两个密码不一致，请重新检查！')
						return
					}
					lists.payment_code = that.old_payment;
					that.$fetch('userpayment_init', lists,'','POST',0).then(rs => {
						that.$toast('修改成功');
						setTimeout(() => {
							that.$router.push({
								path: '/home'
							})
						}, 1000);
						return
					})
				}
				that.$fetch('user_info_update_payment', lists, that.type,'POST',0).then(rs => {
					that.$toast('修改成功');
					setTimeout(() => {
						that.$router.push({
							path: '/home'
						})
					}, 1000);
				})
			},
			fun_count_down() {
				let that = this

//				let phoneReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
//				if(that.phone != 11) {
//					that.$toast("请输入正确的手机号");
//					return false;
//				}
				if(that.dx_type) {
					that.dx_type = false
					let lists = {};
					lists.user_phone = that.phone
					that.$fetch('user_code_send', lists).then(rs => {
						that.$toast('验证码已发送');
						that.fun_yzm()
					}).catch(e => {
            that.dx_type = true
          })
				}
			},

			//倒计时
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
		},

	}
</script>

<style scoped>
	.setup {
		background: #F5F5F5;
	}

	.steup_com {
		margin-top: .1rem;
	}

	.setup_tit {
		height: .55rem;
		line-height: .55rem;
		padding: 0 .15rem;
		border-bottom: .01rem solid #eee;
		background: #fff;
		color: #b2b2b2;
	}

	.com_ul li {
		display: flex;
		height: .55rem;
		line-height: .55rem;
		padding: 0 .15rem;
		justify-content: space-between;
		border-bottom: .01rem solid #eee;
		background: #fff;
	}

	.le_tit {
		font-size: .16rem;
		font-weight: 600;
	}

	.ri_inpu {
		/*flex: 0 0 .3rem;*/
		padding: .02rem 0 0 0;
	}

	.ri_inpu img {
		width: .1rem;
	}

	.set_p {
		display: flex;
		justify-content: space-between;
		margin: .1rem 0;
		padding: 0 .15rem;
		height: .55rem;
		line-height: .55rem;
		background: #fff;
	}

	.set_p div:nth-child(1) {
		font-size: .16rem;
		font-weight: 600;
	}

	.set_s {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: .1rem 0;
		padding: 0 .15rem;
		background: #fff;
	}

	.set_s_p {
		font-size: .16rem;
		font-weight: 600;
	}

	.set_but {
		margin-top: .65rem;
		width: 100%;
		height: .5rem;
		line-height: .5rem;
		background: #fff;
		text-align: center;
		font-size: .18rem;
		color: #18b4ed;
	}
	/*././/*/

	.set_show {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #f5f5f5;
	}

	.com {
		margin-top: .1rem;
	}

	.set_show .set_but {
		background: none;
	}

	.set_but button {
		width: 90%;
		margin: 0 auto;
		background: #18b4ed;
		color: #fff;
		font-size: .16rem;
		border: 0;
		border-radius: .1rem;
	}
</style>
