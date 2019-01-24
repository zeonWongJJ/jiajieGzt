<template>
	<div class="balance_more">
		<van-nav-bar class="white" title="积分明细详情" left-arrow @click-left="onClickLeft" />
		<div class="body" v-if="pl_id">
			<div class="pay">{{credit.pl_type == 1 ? '+'+ credit.pl_variation: '-'+ credit.pl_variation}}</div>
			<div class="row" v-if="credit.order_sn">
				<div class="span">订单号：</div>
				<div class="span">{{credit.order_sn}}</div>
			</div>
			<div class="row">
				<div class="span">类型：</div>
				<div class="span">{{credit.pl_item}}</div>
			</div>
			<div class="row">
				<div class="span">{{credit.pl_type == 1 ? '收入：' : '支出：'}}</div>
				<div class="span span_pay">{{credit.pl_variation}}</div>
			</div>
			<div class="row" v-if="credit.pl_pay_way">
				<div class="span">支付方式：</div>
				<div class="span">{{credit.pl_pay_way}}</div>
			</div>
			<div class="row">
				<div class="span">时间：</div>
				<div class="span">{{credit.pl_time}}</div>
			</div>
			<div class="row">
				<div class="span">剩余积分：</div>
				<div class="span">{{credit.pl_score}}</div>
			</div>
			<div class="row">
				<div class="span">备注：</div>
				<div class="span" style="flex: 1;text-align: right;">{{credit.pl_description}}</div>
			</div>
		</div>
		<div class="body" v-if="id">
			<div class="pay">{{credit.wallet_change_type == 1 ? '-' : '+'}}{{credit.wallet_change}}</div>
			<div class="row" v-if="credit.order_sn">
				<div class="span">订单号：</div>
				<div class="span">{{credit.order_sn}}</div>
			</div>
			<div class="row">
				<div class="span">余额变动：</div>
				<div class="span span_pay">{{credit.wallet_change_type == 1 ? '-' : '+'}}{{credit.wallet_change}}</div>
			</div>
			<div class="row" v-if="credit.pl_pay_way">
				<div class="span">支付方式：</div>
				<div class="span">{{credit.pl_pay_way}}</div>
			</div>
			<div class="row">
				<div class="span">时间：</div>
				<div class="span">{{credit.log_at}}</div>
			</div>
			<div class="row">
				<div class="span">剩余：</div>
				<div class="span">{{credit.current_balance}}</div>
			</div>
			<div class="row">
				<div class="span">备注：</div>
				<div class="span" style="flex: 1;text-align: right;">{{credit.log_remark}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	import api from '@/api/api'
	export default{
		data () {
    		return {
    			pl_id:0,
    			id:0,
    			credit:{}
			}
		},
		mounted(){
			this.id = this.$route.query.id;
			this.pl_id = this.$route.query.pl_id
			this.init();
		},
		methods:{
			init(){
				var that = this;
				var qs = require('qs');
				if(that.pl_id){
					that.$fetch('user_jifen_get', {}, that.pl_id).then(rs =>{
            that.credit = rs
					})
				}else{
					that.$fetch('get_income_log', {scene:1}, get_income_log).then(rs =>{
            that.credit = rs
					})
				}
			},
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
