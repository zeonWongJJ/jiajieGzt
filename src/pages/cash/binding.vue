<template>
	<div class="binding">
		<van-nav-bar class="white" :title="bindtype == 3 ? '添加银行卡' : bindtype == 2 ? '添加支付宝' : '添加微信'" left-arrow @click-left="onClickLeft" />
		<div class="body">
			<div class="top">为了您的账户安全，请完成身份验证</div>
			<div class="center">
				<div class="label">
					<div class="left">手机号</div>
					<div class="right">
						<input type="text" placeholder="请输入手机号" v-model="phone"/>
					</div>
				</div>
				<div class="label">
					<div class="left">校验码</div>
					<div class="right">
						<div class="input">
							<input type="text" placeholder="请输入校验码" v-model="code"/>
						</div>
						<div class="getCode" :class="{isget : isget}" @click="getCode">{{isget ? count : '获取验证码'}}</div>
					</div>
				</div>
			</div>
			<div class="btn" @click="binding_next">确认</div>
		</div>
	</div>
</template>

<script>
	import api from '@/api/api'
	export default{
		data () {
    		return {
    			bindtype:0,//绑定类型（银行卡/支付宝/微信）
    			isget:false,//是否已请求验证码;
    			time:60,//倒计时
    			code:'',//验证码
    			phone:'',//手机号
			}
		},
		computed:{
			count(){
				return this.time + '秒'
			}
		},
		mounted(){
			this.bindtype = this.$route.query.bindtype;
		},
		methods:{
	    	onClickLeft(){
	    		window.history.go(-1);
	    	},
	    	binding_next(){
	    		let that = this;
          let re = /(1[3-9]\d{9}$)/;
            // 验证手机号
          if(that.phone == "") {
            that.$toast("手机号不能为空");
            return
          }
          if(!re.test(that.phone)) {
            that.$toast("请输入正确的手机号");
            return
          }
          if(that.code == ''){
            that.$toast("验证码不能为空");
            return
          }
          let lists = {};
          lists.user_phone = that.phone;
          lists.code = that.code;
          that.$fetch('user_code_check', lists).then(rs => {
            that.$router.push({
              path:'/binding_next',
              query:{
                bindtype:that.bindtype
              }
            })
          })
	    	},
	    	getCode(){
	    		let that = this
				let re = /(1[3-9]\d{9}$)/;
				// 验证手机号
				if(that.phone == "") {
					that.$toast("手机号不能为空");
					return false;
				}
				if(!re.test(that.phone)) {
					that.$toast("请输入正确的手机号");
					return false;
				}
				if(!that.isget) {
					that.isget = true;
					let lists = {};
					lists.user_phone = that.phone
					that.$fetch('user_code_send', lists).then(rs => {
            that.$toast('验证码已发送');
            that.timeOut();
          })
				}
	    	},
	    	timeOut(){
	    		let that = this
				if(that.time === 0) {
					that.isget = false;
					that.time = 60
				} else {
					that.time--
					setTimeout(that.timeOut, 1000);
				}
	    	},
		}
	}
</script>

<style scoped>
	.binding{
		background: #f5f5f5;
	}
	.binding .body{

	}
	.binding .body .top{
		background: #fff3d1;
		padding: .1rem .15rem;
		font-size: .12rem;
	}
	.binding .body .center{
		background: #fff;
		padding: .15rem;
		font-size: .16rem;
	}
	.binding .body .center .label{
		display: flex;
		overflow: hidden;
	}
	.binding .body .center .label+.label{
		margin-top: .3rem;
	}
	.binding .body .center .label .left{
		margin-right: .2rem;
	}
	.binding .body .center .label .right{
		flex: 1;
		display: flex;
		justify-content: space-between;
	}
	.binding .body .center .label .right input{
		border: 0;
		width: 100%;
	}
	.binding .body .center .label .right .getCode{
		border-left: 1px solid #8e8e8e;
		padding-left: .15rem;
		color: #18B4ED;
		flex: 0 0 auto;
	}
	.binding .body .center .label .right .getCode.isget{
		color: #999999;
	}
	.binding .body .btn{
		background: #18B4ED;
		color: #fff;
		padding: .1rem;
		margin: .3rem .15rem;
		text-align: center;
		border-radius: .1rem;
		font-size: .18rem;
	}
</style>
