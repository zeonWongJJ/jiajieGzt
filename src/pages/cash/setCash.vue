<template>
	<div class="setCash">
		<van-nav-bar class="white" title="收款账户管理" left-arrow @click-left="onClickLeft" />
		<div class="body">
			<div class="label">
				<div class="title">
					<div>储蓄卡</div>
					<div class="color_gray" @click="showDel(cashType.union[0])">
						{{cashType.union.length ? '管理' : ''}}
					</div>
				</div>
				<div class="addUser" v-if="!cashType.union.length" @click="binding(3)">+添加账户</div>
				<div class="center union" v-for="item in cashType.union">
					<div class="row">
						<div class="left">
							<div class="img"></div>
							<div class="title">
								<div class="cashName">{{item.withdraw_name}}</div>
								<div class="cartype" v-if="item.carType">{{item.carType}}</div>
							</div>
						</div>
						<div class="right">{{item.withdraw_realname}}</div>
					</div>
					<div class="typeNum">{{item.withdraw_number}}</div>
				</div>
			</div>
			<div class="label">
				<div class="title">
					<div>支付宝</div>
					<div class="color_gray" @click="showDel(cashType.alipay[0])">
						{{cashType.alipay.length ? '管理' : ''}}
					</div>
				</div>
				<div class="addUser" v-if="!cashType.alipay.length" @click="binding(2)">+添加账户</div>
				<div class="center alipay" v-for="item in cashType.alipay">
					<div class="row">
						<div class="left">
							<div class="img"></div>
							<div class="title">
								<div class="cashName">{{item.withdraw_name}}</div>
							</div>
						</div>
						<div class="right">{{item.withdraw_realname}}</div>
					</div>
					<div class="typeNum">{{item.withdraw_number}}</div>
				</div>
			</div>
			<div class="label">
				<div class="title">
					<div>微信</div>
					<div class="color_gray" @click="showDel(cashType.wechat[0])">
						{{cashType.wechat.length ? '管理' : ''}}
					</div>
				</div>
				<div class="addUser" v-if="!cashType.wechat.length" @click="binding(1)">+添加账户</div>
				<div class="center wechat" v-for="item in cashType.wechat">
					<div class="row">
						<div class="left">
							<div class="img"></div>
							<div class="title">
								<div class="cashName">{{item.withdraw_name}}</div>
							</div>
						</div>
						<div class="right">{{item.withdraw_realname}}</div>
					</div>
					<div class="typeNum">{{item.withdraw_number}}</div>
				</div>
			</div>
		</div>
		<van-popup v-model="show" class="setView" position="bottom">
			<div class="title color_gray" v-if="setCash.withdraw_type_id != 1">您可对尾号{{endNum(setCash.withdraw_number)}}的{{setCash.withdraw_name}}进行操作</div>
			<div class="title color_gray" v-else>{{'您可对'+setCash.withdraw_realname+'的'+setCash.withdraw_name+'进行操作'}}</div>
			<div class="li color_red" @click="sureDel">解除绑定</div>
			<div class="li" @click="show = false">取消</div>
		</van-popup>
	</div>
</template>

<script>
	import api from '@/api/api'
	export default {
		data() {
			return {
				show:false,
				setCash:{},
				cashType:{
					union:[],
					alipay:[],
					wechat:[]
				}
			}
		},
		mounted(){
			this.init();
		},
		methods:{
			init(){
				let that = this;
				that.$fetch('user_withdraw_account', {})
				.then(rs => {
		            var arr = rs
					arr.forEach(function(item){
						if(item.withdraw_type_id == 1){
							that.cashType.wechat.push(item)
						}else if(item.withdraw_type_id == 2){
							that.cashType.alipay.push(item)
						}else if(item.withdraw_type_id == 3){
							that.cashType.union.push(item)
						}else{
							console.log('提现账号中包含未知类型：'+item)
						}
					})
		        })
			},
			onClickLeft() {
				this.$router.push({
					path:'/home'
				})
			},
			showDel(item){//管理
				this.setCash = item;
				this.show = true;
			},
			sureDel(){//确定解绑
				let that = this;
				var url;
				if(that.setCash.withdraw_type_id == 1){
					url = 'user_bind_wechat_unbind'
				}else if(that.setCash.withdraw_type_id == 2){
					url = 'user_bind_alipay_unbind'
				}else if(that.setCash.withdraw_type_id == 3){
					url = 'user_bind_bank_unbind'
				}else{
					console.log('未知提现账号类型！')
					return
				}
				that.$fetch(url, {})
				.then(rs => {
		            if(that.setCash.withdraw_type_id == 1){
						that.cashType.wechat = []
					}else if(that.setCash.withdraw_type_id == 2){
						that.cashType.alipay = []
					}else if(that.setCash.withdraw_type_id == 3){
						that.cashType.union = []
					}else{
						console.log('未知提现账号类型')
					}
					that.$toast('解绑成功')
					that.show = false
		       })
			},
			binding(num){
				this.$router.push({
					path:'/binding',
					query:{
						bindtype:num
					}
				})
			},
			endNum(str){
				if(str && str.length>4){
					return str.substr(str.length-4)
				}else{
					return ''
				}

			}
		}
	}
</script>

<style scoped>
	.setCash{
		background: #f5f5f5;
	}
	.setCash .body{

	}
	.setCash .body .label{
		background: #fff;
		padding: .2rem .15rem;
		margin-bottom: .1rem;
	}
	.setCash .body .label .title{
		display: flex;
		justify-content: space-between;
		font-size: .16rem;
	}
	.setCash .body .label .addUser{
		text-align: center;
		border: 1px dashed #8e8e8e;
		color: #8e8e8e;
		margin: .2rem 0;
		padding: .1rem;
		border-radius: .025rem;
	}

	.setCash .body .label .center{
		padding: .1rem;
		border-radius: .025rem;
		margin: .1rem 0;
		color: #fff;
	}
	.setCash .body .label .center .row{
		display: flex;
		align-items: center;
	}
	.setCash .body .label .center .row .left{
		display: flex;
		flex: 1;
		align-items: center;
	}
	.setCash .body .label .center .row .left .title{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-left: .1rem;
	}
	.setCash .body .label .center .row .left .title .cartype{
		font-size: .1rem;
	}
	.setCash .body .label .center .row .left .img{
		width: .3rem;
		height: .3rem;
		border-radius: 50%;
	}
	.setCash .body .label .center .row .right{
		font-size: .1rem;
	}
	.setCash .body .label .center .typeNum{
		font-size: .19rem;
		text-align: right;
		margin: .2rem 0 .1rem;
	}
	.setCash .body .label .center.union{
		background: linear-gradient(to right, #ff6262, #ea0101);
	}
	.setCash .body .label .center.union .row .left .img{
		background: #fff url(../../assets/img/unionpay.png) no-repeat;
		background-position: center;
		background-size: 80% auto;
	}
	.setCash .body .label .center.alipay{
		background: linear-gradient(to right, #5db6e5, #1296db);
	}
	.setCash .body .label .center.alipay .row .left .img{
		background: #fff url(../../assets/img/alipay_s.png) no-repeat;
		background-position: center;
		background-size: 80% auto;
	}
	.setCash .body .label .center.wechat{
		background: linear-gradient(to right, #37d052, #04a220);
	}
	.setCash .body .label .center.wechat .row .left .img{
		background: #fff url(../../assets/img/wechat_s.png) no-repeat;
		background-position: center;
		background-size: 80% auto;
	}
	.setCash .color_gray{
		color: #666666;
	}
	.setCash .color_red{
		color: #ff0000;
	}
	.setView{
		text-align: center;
		font-size: .16rem;
	}
	.setView .title{
		padding: .1rem;
		border-bottom: 1px solid #dedede;
	}
	.setView .li{
		padding: .1rem 0;
	}
	.setView .li+.li{
		border-top: .05rem solid #dedede;
	}
</style>
