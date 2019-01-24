<template>
	<div class="balance_more">
		<van-nav-bar class="white" title="余额明细" left-arrow @click-left="onClickLeft" />
		<div class="body" >
			<div class="pay">{{balance.ub_type == 1 ? '+' + balance.ub_money : '-' + balance.ub_money}}</div>
			<div class="row">
				<div class="span">订单号：</div>
				<div class="span">{{balance.ub_number}}</div>
			</div>
			<div class="row">
				<div class="span">类型：</div>
				<div class="span">{{balance.ub_item}}</div>
			</div>
			<div class="row">
				<div class="span">{{balance.ub_type == 1 ? '收入：' : '支出：'}}</div>
				<div class="span span_pay">{{balance.ub_money}}</div>
			</div>
			<div class="row" v-if="balance.ub_pay_way">
				<div class="span">支付方式：</div>
				<div class="span">{{balance.ub_pay_way}}</div>
			</div>
			<div class="row">
				<div class="span">时间：</div>
				<div class="span">{{balance.ub_time}}</div>
			</div>
			<div class="row">
				<div class="span">余额：</div>
				<div class="span">{{balance.ub_balance}}</div>
			</div>
			<div class="row">
				<div class="span">备注：</div>
				<div class="span" style="flex: 1;text-align: right;">{{balance.ub_description}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	import api from '@/api/api'
	export default{
		data () {
    		return {
    			id:0,
    			balance:{}
			}
		},
		mounted(){
			this.id = this.$route.query.id;
			if(this.id){
				var that = this;
				that.$fetch('user_balance_get', {}, that.id)
				.then(rs =>{
					that.balance = rs
				})
			}
		},
		methods:{
			
	    	onClickLeft(){
	    		window.history.go(-1);
	    	},
		}
	}
</script>

<style scoped>
	.balance_more{
	}
	.balance_more .body{
		padding: .15rem;
	}
	.balance_more .body .pay{
		font-size: .4rem;
		text-align: center;
		margin: .3rem 0 .5rem;
	}
	.balance_more .body .row{
		display: flex;
		padding-top: .15rem;
		justify-content: space-between;
		font-size: .16rem;
	}
	.balance_more .body .row .span_pay{
		color: #ff3434;
	}
</style>
<style>
	.balance_more .van-hairline--bottom::after{
		content: none;
	}
</style>