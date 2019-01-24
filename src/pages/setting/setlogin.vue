<template>
	<div class="set_show">
		<div>
			<van-nav-bar title="修改密码" left-arrow @click-left="onClickLeft" />
		</div>
		<div class="com" v-if="type == 1">
			<van-cell-group>
				<van-field v-model="old_password" type="password" label="旧密码" placeholder="请输入旧密码" />

				<van-field v-model="new_password" type="password" label="新密码" placeholder="请输入新密码" />
			</van-cell-group>
		</div>
		<div class="com" v-if="type == 2">
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

		<div class="set_but">
			<button @click="sure">确 定</button>
		</div>
	</div>

</template>

<script>
	import api from '@/api/api'
	export default {
		data() {
			return {
				type:0,
				username: '', //手机号
				sms: '', //验证码
				password: '', //密码
				count_down: '获取验证码',
				count_down2: '',
				time: 60,
				dx_type: true,
				//旧密码
				old_password:'',
				new_password:'',
			}
		},
		mounted(){
			this.type = this.$route.query.type;
		},
		methods: { //方法
			//			返回上一级
			onClickLeft() {
				this.$router.back(-1)
			},
			sure(){
				let that = this;
				let lists = {}
				if(that.type == 1){//通过旧密码
					if(that.old_password.length >= 6 && that.new_password.length >= 6){
							lists.old_password = that.old_password
							lists.new_password = that.new_password
							lists.phone = that.$store.state.userPhone

					}else{
						that.$toast('登录密码不小于6位哦！')
						return
					}
				}else{//通过手机验证码
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
					lists.phone = that.username;
					lists.new_password = that.password
					lists.code = that.sms
				}
				this.$fetch('user_info_update_pwd', lists, that.type).then(rs =>{
          this.$toast('修改成功');
          setTimeout(() => {
            that.$router.push({
              path: '/'
            })
          }, 1000);
				})
			},
			fun_count_down() {
				let that = this
				let re = /(1[3-9]\d{9}$)/;
//				 验证手机号
				if(that.username == "") {
					alert("手机号不能为空");
					return false;
				}
				if(!re.test(that.username)) {
					alert("请输入正确的手机号");
					return false;
				}
				if(that.dx_type) {
					that.dx_type = false
					let lists = {};
					lists.user_phone = that.username
					that.$fetch('user_code_send', lists).then(rs =>{
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
	.steup_com{
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
