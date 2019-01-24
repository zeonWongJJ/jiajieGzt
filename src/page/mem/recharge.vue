<template>
	<div class="recharge">
		<van-nav-bar class="white" title="余额充值" left-arrow @click-left="onClickLeft" />
		<div class="body">
			<div class="type" @click="show = true">
				<div class="left">
					<div class="img"
					:class="[{alipay : payType == 'alipay'},{wechat :payType == 'wechat'},{unionpay : payType == 'bankcard'}]"></div>
					{{payType == 'alipay' ? '支付宝' : payType == 'wechat' ? '微信' : payType == 'bankcard' ? '银行卡' : ''}}
				</div>
				<div class="right"></div>
			</div>
			<div class="money">
				<div class="title">充值金额</div>
				<div class="input">
					<input v-model="recharge_money" type="number" />
				</div>
				<div class="btn" @click="finish">
					确认
				</div>
			</div>
		</div>
		<!--选择支付方式-->
		<van-popup v-model="show" :close-on-click-overlay="false">
			<div class="payTypeView">
				<div class="title">
					<div></div>
					<div>选择支付方式</div>
					<div class="cancel" @click="show = false"></div>
				</div>
				<div class="ul">
					<div v-if="!wechat" class="li" :class="{checked : payType == 'alipay'}" @click="payType = 'alipay',show = false">
						<div class="left">
							<div class="img alipay"></div>支付宝支付
						</div>
					</div>
					<div class="li" :class="{checked : payType == 'wechat'}" @click="payType = 'wechat',show = false">
						<div class="left">
							<div class="img wechat"></div>微信支付
						</div>
					</div>
					<div v-if="!wechat" class="li" :class="{checked : payType == 'bankcard'}" @click="payType = 'bankcard',show = false">
						<div class="left">
							<div class="img unionpay"></div>银行卡支付
						</div>
					</div>
				</div>
			</div>
		</van-popup>
	</div>
</template>

<script>
	import api from '@/api/api'
	export default{
		data () {
    		return {
    			show:false,
    			payType:'alipay',
    			recharge_money:0,
    			wechat:false,
			}
		},
		mounted(){
			this.wechat = this.isWechat();
			if(this.wechat){
				this.payType = 'wechat';
			}
		},
		methods:{
	    	onClickLeft(){
	    		window.history.go(-1);
	    	},
	    	isWechat(){
	    		var ua = navigator.userAgent.toLowerCase();
				var isWeixin = ua.indexOf('micromessenger') != -1;
				if (isWeixin) {
				    return true;
				}else{
				    return false;
				}
	    	},
	    	finish(){
	    		let that = this;
	    		if(that.recharge_money <=0){
	    			that.$toast('充值金额不合法！')
	    			return
	    		}
	    		let apis = api.user_balance_recharge + that.payType
	    		let lists = {};
				lists.recharge_money = that.recharge_money
				that.$fetch('user_balance_recharge', lists, that.payType).then(rs =>{
          let order_sign = rs.order_sign
          let order_sn = rs.order_sn
          window.location.href = `http://7dugo.com/order.pay?order_sign=${order_sign}&order_sn=${order_sn}`
				})
	    	},
		}
	}
</script>

<style scoped>
	.recharge{
		background: #fff;
	}
	.recharge .body{

	}
	.recharge .body .type{
		padding: .15rem;
		border-bottom: 1px solid #f5f5f5;
		display: flex;
		justify-content: space-between;
	}
	.recharge .body .type .left{
		display: flex;
		align-items: center;
	}
	.recharge .body .type .left .img{
		width: .3rem;
		height: .3rem;
		margin-right: .1rem;
	}

	.recharge .body .money{
		padding: .2rem .15rem;
	}
	.recharge .body .money .input{
		border-bottom: 1px solid #F5F5F5;
	}
	.recharge .body .money .input:before{
		content: '￥';
		font-size: .21rem;
	}
	.recharge .body .money .input input{
		border: 0;
		font-size: .5rem;
		width: calc(100% - .4rem);
	}
	.recharge .body .money .btn{
		background: #18B4ED;
		border-radius: .1rem;
		padding: .1rem;
		color: #fff;
		text-align: center;
		margin-top: .4rem;
	}


	/*选择支付方式*/
	.recharge .van-popup{
		width: calc(100% - .3rem);
	}
	.recharge .payTypeView .title{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: .2rem .15rem;
		font-size: .18rem;
		color: #333333;
	}
	.recharge .payTypeView .ul .li{
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #f5f5f5;
		padding: .15rem;
	}
	.recharge .payTypeView .ul .li.checked:after{
		content: '';
		width: .14rem;
		height: .1rem;
		background: url(../../assets/img/checked.png) no-repeat;
		background-position: center;
		background-size: .135rem .095rem;
	}
	.recharge .payTypeView .ul .li .left{
		display: flex;
		align-items: center;
	}
	.recharge .payTypeView .ul .li .left .img{
		width: .3rem;
		height: .3rem;
		margin-right: .1rem;
	}


	/*支付宝*/
	.recharge .left .img.alipay{
		background: url(../../assets/img/alipay.png) no-repeat;
		background-position: center;
		background-size: 100% auto;
	}
	/*微信*/
	.recharge .left .img.wechat{
		background: url(../../assets/img/wechat.png) no-repeat;
		background-position: center;
		background-size: 100% auto;
	}
	/*银行卡*/
	.recharge .left .img.unionpay{
		background: url(../../assets/img/unionpay.png) no-repeat;
		background-position: center;
		background-size: 100% auto;
	}

	.recharge .cancel{
		width: .15rem;
		height: .15rem;
		background: url(../../assets/img/cancel.png) no-repeat;
		background-position: center;
		background-size: .11rem .11rem;
	}
	.recharge .right{
		display: flex;
		align-items: center;
		color: #999999;
	}
	.recharge .right:after{
		content: '';
		display: block;
		width: .07rem;
		height: .125rem;
		margin-left: .05rem;
		background: url(../../assets/img/right.png) no-repeat;
		background-position: center left;
		background-size: .07rem .125rem;
	}
</style>
