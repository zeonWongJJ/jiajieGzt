<template>
	<div class="order_confirmation" v-if="value">
		<!--header-->
		<van-nav-bar title="确认订单" class="white" left-arrow @click-left="onClickLeft" />
		<!--body-->
		<div class="main">
			<div class="top">
				<div>金额</div>
				<div style="font-size: .25rem;" v-if="typeof orderData.demand_remuneration != 'undefined'">{{orderData.demand_remuneration.toFixed(2)}}元</div>
				<div style="font-size: .25rem;" v-if="typeof orderData.total != 'undefined'">{{orderData.total.toFixed(2)}}元</div>
			</div>
			<!--抵扣-->
			<div class="deduct">
				<div class="label" @click="order_deductible_type == 1 ? order_deductible_type = 0 : order_deductible_type = 1">
					<div class="left">
						<div class="img">
							<img src="../assets/img/balance.png"/>
						</div>
						<!--balance-->
						<div class="middle">
							<div>账户余额<span class="gray">({{balance}}元)</span></div>
							<div class="red" v-if="orderData.demand_remuneration">可用{{balance > orderData.demand_remuneration ? orderData.demand_remuneration.toFixed(2) : balance}}余额抵扣{{balance > orderData.demand_remuneration ? orderData.demand_remuneration.toFixed(2) : balance}}元</div>
							<div class="red" v-if="orderData.total">可用{{balance > orderData.total ? orderData.total.toFixed(2) : balance}}余额抵扣{{balance > orderData.total ? orderData.total.toFixed(2) : balance}}元</div>
						</div>
					</div>
					<div class="inputBox">
						<i class="iconfont" :class="[order_deductible_type == 1 ? 'icon-checkoutline02' : 'icon-check02']"></i>
					</div>
				</div>
				<div class="label" @click="order_deductible_type == 2 ? order_deductible_type = 0 : order_deductible_type = 2">
					<div class="left">
						<div class="img">
							<img src="../assets/img/score.png"/>
						</div>
						<!--score-->
						<div class="middle">
							<div>账户积分<span class="gray">({{score}})</span></div>
							<div class="red" v-if="orderData.demand_remuneration">可用{{score > orderData.demand_remuneration ? orderData.demand_remuneration : score}}积分抵扣{{balance > orderData.demand_remuneration ? orderData.demand_remuneration.toFixed(2) : score}}元</div>
							<div class="red" v-if="orderData.total">可用{{score > orderData.total ? orderData.total : score}}积分抵扣{{balance > orderData.total ? orderData.total.toFixed(2) : score}}元</div>
						</div>
					</div>
					<div class="inputBox">
						<i class="iconfont" :class="[order_deductible_type == 2 ? 'icon-checkoutline02' : 'icon-check02']"></i>
					</div>
				</div>
			</div>
			<!--支付方式-->
			<div class="pay">
				<ul>
					<li v-for="item in paylist" @click="price_type = item.type" v-if="(item.type == 'wechat') || !wechat">
						<div class="left">
							<img :src="item.img" />
							<span class="middle">{{item.name}}</span>
						</div>
						<i class="iconfont" :class="[price_type == item.type ? 'icon-checkoutline02' : 'icon-check02']"></i>
					</li>
				</ul>
			</div>
		</div>
		<!--footer-->
		<div class="footer">
			<div class="btn" @click="demandAdd" :class="{gray : loading}">确认支付</div>
			<div>合计: <span class="c_red">￥<span style="font-size: .18rem;">{{num}}</span></span></div>
		</div>
		<on-loading :show="loading"></on-loading>
	</div>
</template>

<script>
	import utils from '@/utils/utils'
	export default{
		name: 'orderConfirmation',
		props:{
			value:{
				type:Boolean,
				default:false
			},
			orderData:{
				type:Object,
				default(){
					return {}
				}
			},
			orderType:{
				type:Number,
				default:1,
			},
		},
		data(){
			return{
				wechat: false,
				paylist: [
					{
						name: '支付宝',
						type: 'alipay',
						img: require('../assets/img/alipay.png'),

					},
					{
						name: '微信',
						type: 'wechat',
						img: require('../assets/img/wechat.png'),
					},
					{
						name: '银行',
						type: 'bankcard',
						img: require('../assets/img/unionpay.png'),
					}
				],
				num:0,
				balance:0,
				score:0,
				order_deductible_type:0,
				price_type:'alipay',
				loading:false,
			}
		},
		watch:{
			value:function(val){
				if(val){
					this.init()
				}
			},
			order_deductible_type:function(val){
				if(this.orderData.demand_remuneration){
					if(val == 1){
					this.num = this.balance > this.orderData.demand_remuneration ? 0 : (this.orderData.demand_remuneration - this.balance).toFixed(2)
					}else if(val == 2){
						this.num = this.score > this.orderData.demand_remuneration ? 0 : (this.orderData.demand_remuneration - this.score).toFixed(2)
					}else{
						this.num = this.orderData.demand_remuneration.toFixed(2)
					}
				}
				if(this.orderData.total){
					if(val == 1){
					this.num = this.balance > this.orderData.total ? 0 : (this.orderData.total - this.balance).toFixed(2)
					}else if(val == 2){
						this.num = this.score > this.orderData.total ? 0 : (this.orderData.total - this.score).toFixed(2)
					}else{
						this.num = this.orderData.total.toFixed(2)
					}
				}
			}
		},
		created(){
			this.init();
		},
		methods:{
			init(){
				this.wechat = this.isWechat();
				if(typeof this.orderData.demand_remuneration != 'undefined'){
					this.num = this.orderData.demand_remuneration.toFixed(2);
				}
				if(typeof this.orderData.total != 'undefined'){

					this.num = this.orderData.total.toFixed(2);
				}
				if(this.orderData.order_pay_way){
					this.price_type = this.orderData.order_pay_way;
				}
				if(this.orderData.order_deductible_type){
					this.order_deductible_type = this.orderData.order_deductible_type;
				}
				//用户信息
				this.$fetch('user_info_get',{},'','GET').then(rs =>{
					this.balance = (Number(rs.user_balance) + Number(rs.user_coupon)).toFixed(2)
					this.score = rs.user_score
				}).catch(err =>{
					console.log(err);
				})
			},
			isWechat() {
				var ua = navigator.userAgent.toLowerCase();
				var isWeixin = ua.indexOf('micromessenger') != -1;
				if(isWeixin) {
					return true;
				} else {
					return false;
				}
			},
			onClickLeft(){
				this.$emit('input',false);
			},
			demandAdd(){
				if(!this.loading){
					if(this.price_type){
						this.loading = true;
						if(this.orderType == 1){//发布需求
							this.orderData.order_deductible_type = this.order_deductible_type;
							this.orderData.demand_price_type = this.price_type;
							this.$fetch('demand_add', this.orderData).then(rs =>{
                let order_sign = rs.order_sign; // 订单签名
                let order_sn = rs.order_sn; // 订单流水号
                utils.pay(order_sn, order_sign);
              }).catch(e=>{
                this.loading = false
              })
						}else if(this.orderType ==2){//周期下单
							this.orderData.order_deductible_type = this.order_deductible_type;
							this.orderData.service_price_type = this.price_type;
							this.$fetch('service_cyc_orders', this.orderData,this.orderData.service_id).then(rs =>{
                let order_sign = rs.order_sign; // 订单签名
                let order_sn = rs.order_sn; // 订单流水号
                utils.pay(order_sn, order_sign);
              }).catch(e=>{
                this.loading = false
              })
						}else if(this.orderType == 3){//单次下单
							this.orderData.order_deductible_type = this.order_deductible_type;
							this.orderData.service_price_type = this.price_type;
							this.$fetch('user_buy_service', this.orderData,this.orderData.service_id).then(rs =>{
                let order_sign = rs.order_sign; // 订单签名
                let order_sn = rs.order_sn; // 订单流水号
                utils.pay(order_sn, order_sign);
              }).catch(e=>{
                this.loading = false
              })
						}else{//改支付方式下单
							this.$fetch('order_sign_get', {}, this.orderData.order_sn).then(rs => {
								utils.pay(this.orderData.order_sn, rs.order_sign, this.orderData.successUrl ,'order_error',this.price_type,this.order_deductible_type);
							}).catch(e=>{
								this.loading = false
							})
						}
					}else{
						this.$toast('请选择支付类型');
					}
				}else{
					this.$toast('请勿频繁操作');
				}

			}
		}
	}
</script>

<style lang="less" scoped>
	@import "../assets/icon/iconfont.css";
	.order_confirmation{
		position: absolute;
		top: 0;
		height: 100%;
		width: 100%;
		background: #f5f5f5;
		z-index: 999;
		i{
			color: #1BB9ED;
		}
		.main{
			height: calc(100% - 1.01rem);
			overflow-y: auto;
			>*{
				margin-top: .1rem;
				background: #fff;
			}
			.top{
				padding: .2rem;
				text-align: center;
			}
			.deduct .label{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: .1rem;
				.left{
					display: flex;
					align-items: center;
					.img{
						width: .3rem;
						height: .3rem;
						img{
							width: 100%;
							height: 100%;
						}
					}
					.middle{
						margin-left: .1rem;
						.red{
							color: #ff2a00;
						}
						.gray{
							color: #333333;
						}
					}
				}
			}
			.pay ul li {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: .1rem;
				img{
					width: .3rem;
					height: .3rem;
				}
			}
		}
		.footer{
			position: absolute;
			bottom: 0;
			height: .55rem;
			width: 100%;
			display: flex;
			flex-direction: row-reverse;
			font-size: .12rem;
			line-height: .55rem;
			background: #fff;
			.c_red{
				color: #ff3434;
			}
			.btn{
				margin-left: .2rem;
				background: #ff3434;
				color: #fff;
				width: 1.5rem;
				text-align: center;
				font-size: .16rem;
			}
			.btn.gray{
				background: #999999;
			}
		}
	}
</style>
