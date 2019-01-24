<template>
	<div class="setup">
		<div>
			<van-nav-bar title="设置" left-arrow @click-left="onClickLeft" />
		</div>
		<div class="steup_com">
			<div class="setup_tit">
				安全设置
			</div>
			<ul class="com_ul">
				<li @click="show(1)">
					<div class="le_tit">
						登陆密码
					</div>
					<div class="ri_inpu">
						<img src="../../assets/img/more_gray.png" />
					</div>
				</li>
				<li @click="show(2)">
					<div class="le_tit">
						支付密码
					</div>
					<div class="ri_inpu">
						<img src="../../assets/img/more_gray.png" />
					</div>
				</li>
			</ul>
			<!--<div class="set_p">
				<div>
					清除图片缓存
				</div>
				<div>
					0.5MB
				</div>
			</div>-->
			<!--<div class="set_s">
				<div>
					<p class="set_s_p">推送通知</p>
					<p>包含订单状态、优惠促销等重要信息的推送</p>
				</div>
				<div>
					<van-switch v-model="checked" />
				</div>
			</div>-->

			<div class="set_but" @click="loginOut">
				退出登陆
			</div>


		<van-popup v-model="isshow" class="setView" position="bottom">
			<div class="li" v-if="!paypass && index == 2" @click="setNext(3)">设置支付密码</div>
			<template v-else>
				<div class="li" @click="setNext(1)">通过旧密码方式</div>
				<div class="li border_top" @click="setNext(2)">通过手机验证方式</div>
			</template>
			<div class="li" @click="isshow = false">取消</div>
		</van-popup>
		</div>
	</div>
</template>

<script>
	import api from '@/api/api'
	export default {
		data() {
			return {
				checked: true,
				isshow: false,
				index:0,
				paypass:false,
			}
		},
		mounted() { //生命周期
			this.init();
		},
		methods: { //方法
			init(){
				var that = this;
				that.$fetch('userpayment_code_check', {}).then(rs =>{
          that.paypass = true
        }).catch(() => {
          that.paypass = false
        })
			},
			//			返回上一级
			onClickLeft() {
				this.$router.back(-1)
			},

			//退出登录
			loginOut(){
				let that = this;
				that.$fetch('user_logout', {}).then(rs =>{
          localStorage.removeItem('token')
          that.$router.push({
            path:'/'
          })
				})
			},
			//选择修改方式
			show(index) {
				let that = this;
				that.isshow = true;
				that.index = index;
			},
			setNext(type){
				if(this.index == 1){
					this.$router.push({
						path:'/setlogin',
						query:{
							type
						}
					})
				}else{
					this.$router.push({
						path:'/setpay',
						query:{
							type
						}
					})
				}
			}

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
		z-index: 1009;
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

	.setView{
		text-align: center;
		font-size: .16rem;
		background: none;
		padding: .3rem;
	}
	.setView .li{
		padding: .1rem 0;
		background: #fff;
		width: calc(100% - .3rem);
		margin: 0 auto;
		border-radius: .05rem;
	}
	.setView .li{
		padding: .15rem 0;
		background: #fff;
		width: calc(100% - .3rem);
		margin: 0 auto;
		border-radius: .05rem;
	}
	.setView .li.border_top{
		border-top: 1px solid #999999;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}
	.setView .li:first-child{
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}
	.setView .li:last-child{
		margin-top: .05rem;
	}
</style>
