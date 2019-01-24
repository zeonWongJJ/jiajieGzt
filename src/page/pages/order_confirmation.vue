<template>
	<div class="order_confirmation">
		<!--header-->
		<van-nav-bar title="确认订单" left-arrow @click-left="onClickLeft" />
		<!--body-->
		<div class="body">
			<div class="top">
				<div>金额</div>
				<div>120.00元</div>
			</div>
			<div class="center">
				<!--抵扣-->
				<div class="deduct">
					<div class="label">
						<div class="img"></div>
						<div class="middle">
							<div>账户余额</div>
							<div>可用**余额抵扣**元</div>
						</div>
						<div class="input">
							
						</div>
					</div>
					<div class="label">
						<div class="img"></div>
						<div class="middle">
							<div>账户积分</div>
							<div>可用**积分抵扣**元</div>
						</div>
						<div class="input">
							
						</div>
					</div>
				</div>
				<!--支付方式-->
				<div class="pay">
					<ul>
						<li v-for="(item,index) in paylist" @click="payClick(item,index)" v-if="item.type == 'wechat' || !wechat)">
							<div>
								<img :src="item.img" />
								<span>{{item.name}}</span>
							</div>
							<div :class="{paycheck : index == num}"></div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import api from '@/api/api'
	data(){
		return{
			wechat: false,
			paylist: [
				{
					name: '支付宝',
					type: 'alipay',
					img: require('../../assets/img/alipay.png'),
	
				},
				{
					name: '微信',
					type: 'wechat',
					img: require('../../assets/img/wechat.png'),
				},
				{
					name: '银行',
					type: 'bankcard',
					img: require('../../assets/img/unionpay.png'),
				}
			],
		}
	},
	created(){
		this.lists = JSON.parse(this.$route.query.lists)
		this.init();
		this.wechat = this.isWechat();
	},
	methods:{
		isWechat() {
			var ua = navigator.userAgent.toLowerCase();
			var isWeixin = ua.indexOf('micromessenger') != -1;
			if(isWeixin) {
				return true;
			} else {
				return false;
			}
		},
	}
</script>
	
<style>

</style>