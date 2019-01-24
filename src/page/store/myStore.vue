<template>
	<div class="myStore">
		<van-nav-bar title="我的店铺" left-arrow right-text="发布服务" @click-left="onClickLeft" @click-right="onClickRight" />
		<div class="body">
			<div class="storeBox">
				<img src="../../../static/images/clean.png" alt="" />
				<p>近30天收入(元)</p>
				<span>{{storeStatus._30days_count}}</span>
			</div>
			<div class="oreder_container">
				<div class="o1">
					<div @click="goOrders">
						<p>今日订单</p>
						<span>{{storeStatus.order_count}}</span>
					</div>
					<div @click="goDeal">
						<p>今日交易额</p>
						<span>{{storeStatus.pay_count}}</span>
					</div>
				</div>
				<div class="o2">
					<div @click="comme">
						<p>评价管理</p>
						<span>{{storeStatus.store_comment_count}}</span>
					</div>
					<div @click="goServel">
						<p>服务列表</p>
						<span>{{storeStatus.store_service_count}}</span>
					</div>
				</div>
			</div>
			<div class="myOrder">
				<div class="tit" @click="orders">
					<span>店铺的订单</span>
					<a>
						<span>查看全部</span>
						<van-icon style="color: #999999;" name="arrow" />
					</a>
				</div>
				<div class="orderList">
					<ul>
						<li>
							<p>待付款</p>
							<span>{{statistics.pending_order}}</span>
						</li>
						<li>
							<p>待接单</p>
							<span>{{statistics.pending_receipt}}</span>
						</li>
						<li>
							<p>待服务</p>
							<span>{{statistics.pending_service}}</span>
						</li>
						<li>
							<p>服务中</p>
							<span>{{statistics.servicing}}</span>
						</li>
						<li>
							<p>已关闭</p>
							<span>{{statistics.closed}}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import api from '@/api/api'
	export default {
		data() {
			return {
        store_id: 0,
				storeStatus:[],
				statistics:{},
			}
		},
		mounted() { //生命周期 
			this.ajax();
		},
		methods: { //方法
			ajax(){
				var that = this;
				that.$fetch('user_store_statistics', {}).then(rs =>{
					if( rs.error==0 ){
						that.storeStatus=rs.data
					}else{
						that.$toast(rs.msg[0]);
					}
				})
				that.$fetch('store_order_statistics', {}).then(rs =>{
					if( rs.error==0 ){
						that.statistics=rs.data
					}else{
						that.$toast(rs.msg[0]);
					}
				})
			},	
			onClickLeft() {
				this.$router.push({
					path:'/member'
				})
			},
			onClickRight() {
				this.$router.push({
					path: "release_service"
				});
			},
			orders(){
				this.$router.push({
					path: '/store_orders'
				})
			},
			goOrders() {
				this.$router.push({
					path: "store_orders_x"
//					path: "storeOrders"
					
				});
			},
			goDeal() {
				this.$router.push({
					path: "storeDeal"
				});
			},
			comme() {
				this.$router.push({
					path: "commentAdmin"
				});
			},
			goServel() {
				let that=this;
				that.$fetch('user_store_info_get', {}).then(rs =>{
					if(rs.error == 0){
						var storeId = JSON.stringify(rs.data);
            			that.$router.push({
							path: '/serverList',
							query: {
								storeId
							}
						})
					}else{
						that.$toast(rs.msg[0]);
					}
				})
			}
		},
	}
</script>

<style scoped>
	.myStore{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
	}
	.myStore .body{
		height: calc(100% - .46rem);
		background: #f5f5f5;
		overflow-y: auto;
	}
	.oreder_container,.myOrder{
		background: #fff;
	}
	p {
		margin: 0;
	}
	
	.storeBox {
		height: 2.36rem;
		text-align: center;
		background: linear-gradient(to right, #19b5ed, #2ddeea);
	}
	
	.storeBox>img {
		width: 0.86rem;
		height: 0.86rem;
		border-radius: 50%;
		margin-top: 0.28rem;
		margin-bottom: 0.2rem;
	}
	
	.storeBox>p {
		font-size: 0.14rem;
		color: white;
	}
	
	.storeBox>span {
		font-size: 0.5rem;
		color: white;
	}
	
	.oreder_container>div {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #ddd;
	}
	
	.oreder_container>div>div {
		width: 50%;
		padding-left: 0.12rem;
	}
	
	.oreder_container>div>div:first-child {
		border-right: 1px solid #ddd;
	}
	
	.oreder_container>div>div>p {
		padding: 0.1rem 0;
		font-size: 0.16rem;
		color: #b2b2b2;
	}
	
	.oreder_container>div>div>span {
		display: inline-block;
		font-size: 0.18rem;
		color: #1bb9ed;
		margin-bottom: 0.15rem;
	}
	
	.myOrder {
		border-top: .1rem solid #f5f5f5;
		padding: 0.1rem 0.15rem .2rem;
	}
	
	.tit {
		height: 0.48rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #ddd;
	}
	
	.tit>span {
		font-size: 0.16rem;
	}
	
	.tit>a>span {
		color: #999999;
	}
	
	.orderList>ul {
		display: flex;
	}
	
	.orderList>ul>li {
		width: 20%;
		text-align: center;
	}
	
	.orderList>ul>li>p {
		padding: 0.1rem 0;
		color: #b2b2b2;
	}
</style>
<style>
	.myStore .van-nav-bar {
		background: white !important;
	}
	
	.myStore .van-nav-bar__title {
		color: black;
	}
	
	.myStore .van-nav-bar .van-icon {
		color: black !important;
	}
</style>
