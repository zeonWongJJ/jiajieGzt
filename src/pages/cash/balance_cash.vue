<template>
	<div class="balance_cash">
		<van-nav-bar class="white" :title="cashNum == 1 ? '余额提现' : '积分提现'" left-arrow @click-left="onClickLeft" />
		<div class="body">
			<div class="top">
				<div class="left">
          <div>{{cashNum == 1 ? '可提现金额(元)' : '可兑换提现积分(元)'}}</div>
          <div class="sum">{{sum}}</div>
          <span class="pointRule" @click="pointRule">提现说明 ></span>
        </div>
        <div class="right" style="color: #fff;margin-left: .1rem;font-size: .14rem;color: #f00;" v-if="cashNum == 1">
          不包含返现金额{{Number(user_coupon).toFixed(2)}}元，返现金额不能提现
        </div>
			</div>
			<div class="center">
				<div class="row">
					<div>收款账户</div>
					<div class="right" @click="showSelect">
						<!--<div v-if="!withdraw_type_id">请添加收款账户</div>-->
						<div v-if="!withdraw_type_id">
							<span v-if="cashType">
								请选择收款账户
							</span>
							<span v-else>
								请添加收款账户
							</span>
						</div>
						<div class="pull_right" v-else>
							<div class="type" :class="[{wechat : withdraw_type_id == 1},{alipay : withdraw_type_id == 2},{union : withdraw_type_id == 3}]">
								{{withdraw_number}}
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div>收款方式</div>
					<div class="color_gray" v-if="!withdraw_type_id">选择账户后会识别方式</div>
					<div class="pull_right" v-else>{{withdraw_name}}</div>
				</div>
				<div class="row">
					<div>姓名</div>
					<div class="color_gray"><input type="text" v-model="withdraw_realname" placeholder="请输入收款人姓名" name="username" id="username" value="" /></div>
				</div>
				<div class="row">
					<div>{{cashNum == 1 ? '提现金额' : '提现积分'}}</div>
					<div class="color_gray"><input type="number" v-model="cash" placeholder="请输入提取金额" name="cash" id="cash" min="0" :max="sum" /></div>
				</div>
				<div class="row">
					<div>提现密码</div>
					<div class="color_gray"><input type="password" v-model="password" placeholder="输入您在本平台设置的支付密码" name="password" id="password" value="" /></div>
				</div>
			</div>

			<div class="bg_gray" v-if="withdraw_type_id == 3">
				中国银联收取1元服务费
			</div>

			<div class="bottom">
				<div class="btn" :class="{blue : blue}" @click="finish">预计两小时内到账，确认提取</div>
			</div>
		</div>
		<van-popup v-model="show" position="bottom">
			<div class="selectTypeView">
				<div class="btn">
					<div class="finish" @click="show = false">完成</div>
				</div>
				<div class="ul">
					<div class="li" v-for="item in cashType" @click="selectType(item),show = false">
						{{item.withdraw_name+''+item.withdraw_number}}
					</div>
					<div class="li" @click="toSetCash">+管理提现账户</div>
				</div>
			</div>
		</van-popup>

		<van-popup v-model="toast" position="bottom">
			<div class="toastView">
				<div class="title">
					<div></div>
					<div>收费提示</div>
					<div class="cancel" @click="toast = false"></div>
				</div>
				<div class="ul">
					<div class="li">
						<div>实际到账金额如下</div>
						<div></div>
					</div>
					<div class="li">
						<div class="color_gray">到账金额</div>
						<!--精确小数后两位↓-->
						<div class="color_red">{{Math.floor((cash - 1) * 100) / 100}}元</div>
					</div>
					<div class="li">
						<div class="color_gray">中国银联收取服务费</div>
						<div>1.00元</div>
					</div>
				</div>
				<div class="btn" @click="sure(),toast = false">继续提现</div>
			</div>
		</van-popup>
		<on-loading :show="showLoad"></on-loading>
    <van-popup class='ruleBox' v-model="rule" position="right">
      <van-nav-bar class="blue" title="提现说明" left-arrow @click-left="closeLay"></van-nav-bar>
      <p>1.帮家洁平台使用第三方支付方式进行提现，当前支持的提现方式包含：支付宝支付、微信支付、银联支付三种提现方式；</p>
      <p>2.您的帮家洁账号余额，可以通过支付宝支付、微信支付、银联支付三种提现方式，由于（支付宝支付、微信支付、银联支付）第三方支付需要收取手续费，帮家洁平台将根据不同的第三方提现方式代扣手续费，手续费代扣标准请查看其他条款。</p>
      <p>3.积分提现，您在帮家洁平台的积分达到500分或以上时，即可以提现，由于（支付宝支付、微信支付、银联支付）第三方支付需要收取手续费，帮家洁平台将根据不同的第三方提现方式代扣手续费，手续费代扣标准请查看其他条款。</p>
      <p>4.提现手续费率：当前支付宝支付、微信支付手续费率为0.6%，最低0.1元；银联手续费率根据个人用户和企业用户不同，个人用户每笔1元，企业用户每笔2元。</p>
    </van-popup>
	</div>
</template>

<script>
	import api from '@/api/api'
	export default {
		data() {
			return {
				cashNum: 0, //1代表余额提现，2代表积分提现
				cashType: [],
				show: false, //选择提现账户
				sum: 0, //余额
				rule: false,
				withdraw_type_id: null, //收款类型
				withdraw_name: '',
				withdraw_number: '',
				withdraw_realname: '',
				cash: null,
				password: '',
				showLoad:false,
				blue: false, //按钮颜色
				toast: false, //手续费提示
				way_type: '',
        user_coupon: 0
			}
		},
		created () {
			this.cashNum = this.$route.query.cashNum;
			this.sum = this.$route.query.value;
			if(typeof(this.$route.query.way_type) != "undefined") {
				this.way_type = this.$route.query.way_type
			}
			this.init();
		},
		methods: {
			init() {
				let that = this;
				if (!this.way_type) {
          that.$fetch('user_info_get', {
            is_withdraw: 1
          }, '', 'GET').then(rs =>{
            that.sum = (this.cashNum == 1 ? rs.user_balance : rs.user_score)
            that.user_coupon = rs.user_coupon
          })
        }
				that.$fetch('user_withdraw_account', {}).then(rs => {
					that.cashType = rs
				})
			},
			onClickLeft() {
				window.history.go(-1);
			},
			showSelect() {
				this.show = true
			},
			selectType(item) {
				this.withdraw_type_id = item.withdraw_type_id;
				this.withdraw_name = item.withdraw_name;
				this.withdraw_number = item.withdraw_number;
				this.withdraw_realname = item.withdraw_realname;
			},
			toSetCash() {
				this.$router.push({
					path: '/setCash'
				})
			},
			finish() {
				if(this.blue) { //按钮蓝色进行下一步
					if(this.withdraw_type_id == 3) { //银行手续费提示
						if(Math.floor((this.cash - 1) * 100) / 100 <= 0) {
							this.$toast('扣除手续费后不能达到最小提现额度，提现失败！')
						} else {
							this.toast = true
						}

					} else {
						this.sure();
					}
				}
			},
			pointRule() {
				this.rule = true;
			},
			closeLay() {
				this.rule = false;
			},
			sure() {
				if(this.cash < 0.1) {
					this.$toast('单笔最低提现金额0.1元');
					return
				}
				this.showLoad = true
				if(this.cashNum == 1) { //余额
					let that = this;
					var odata = {};
					odata.withdraw_account = that.withdraw_number;
					odata.withdraw_name = that.withdraw_realname;
					odata.payment_code = that.password;
					odata.withdraw_money = that.cash;
					odata.withdraw_type = 'bankcard';
					if(that.withdraw_name == '支付宝') {
						odata.withdraw_type = 'alipay';
					} else if(that.withdraw_name == '微信') {
						odata.withdraw_type = 'wechat';
					}
					if(that.way_type === 'store') {
						odata.way_type = 'store'
					}
					that.$fetch('user_withdraw_withdraw_balance', odata).then(rs => {
						that.$toast('提现成功！');
						that.$router.push({
							path: '/home'
						})
					}).catch(e => {
						that.showLoad = false
					})
				} else {
					let that = this;
					var odata = {};
					odata.withdraw_account = that.withdraw_number;
					odata.withdraw_name = that.withdraw_realname;
					odata.payment_code = that.password;
					odata.withdraw_score = that.cash;
					odata.withdraw_type = 'bankcard';
					if(that.withdraw_name == '支付宝') {
						odata.withdraw_type = 'alipay';
					} else if(that.withdraw_name == '微信') {
						odata.withdraw_type = 'wechat';
					}
					that.$fetch('user_withdraw_withdraw_score', odata).then(rs => {
						that.$toast('提现成功！');
						that.$router.push({
							path: '/home'
						})
					}).catch(e => {
						that.showLoad = false
					})
				}
			}
		},
		watch: {
			'cash': function(newVal, oldVal) {
				const regex = /^([0-9]*)+(.[0-9]{1,2})?$/
				if(newVal && !regex.test(newVal)) { //正则：纯数字，小数两位
					this.cash = 0
				}
				if(newVal && newVal > Number(this.sum)) { //大于账户余额\积分
					this.cash = this.sum //最大值
				}
				if(newVal.length && this.password && this.withdraw_name) { //按钮变蓝
					this.blue = true
				} else {
					this.blue = false
				}
			},
			'password': function(newVal, oldVal) {
				if(newVal.length && this.cash && this.withdraw_name) {
					this.blue = true
				} else {
					this.blue = false
				}
			},
			'withdraw_name': function(newVal, oldVal) {
				if(newVal.length && this.cash && this.password) {
					this.blue = true
				} else {
					this.blue = false
				}
			},

		}
	}
</script>

<style scoped>
	.balance_cash {
		background: #f5f5f5;
    height: 100%;
	}

	.balance_cash .body {}

	.balance_cash .body .top {
		background: #18B4ED;
		padding: .15rem;
		color: #fff;
		font-size: .18rem;
    display: flex;
	}

	.balance_cash .body .top .sum {
		font-size: .5rem;
		padding: .1rem 0;
	}

	.balance_cash .body .center {
		padding: 0 .15rem;
		background: #fff;
		font-size: .16rem;
	}

	.balance_cash .body .center .row {
		padding: .15rem 0;
		border-bottom: 1px solid #f5f5f5;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.balance_cash .body .center .row .pull_right {
		flex: 1;
		text-align: right;
		color: #000000;
	}

	.balance_cash .body .center .row .pull_right .type {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.balance_cash .body .center .row .pull_right .type.union:before {
		content: '';
		height: .25rem;
		width: .25rem;
		background: url(../../assets/img/unionpay.png) no-repeat;
		background-position: center;
		background-size: 100% auto;
		margin-right: .05rem;
	}

	.balance_cash .body .center .row .pull_right .type.alipay:before {
		content: '';
		height: .25rem;
		width: .25rem;
		background: url(../../assets/img/alipay_s.png) no-repeat;
		background-position: center;
		background-size: 100% auto;
		margin-right: .05rem;
	}

	.balance_cash .body .center .row .pull_right .type.wechat:before {
		content: '';
		height: .25rem;
		width: .25rem;
		background: url(../../assets/img/wechat_s.png) no-repeat;
		background-position: center;
		background-size: 100% auto;
		margin-right: .05rem;
	}

	.balance_cash .body .center .color_gray {
		flex: 1;
		color: #8e8e8e;
		text-align: right;
	}

	.balance_cash .body .center .color_gray>input {
		border: 0;
		width: 100%;
		text-align: right;
	}

	.balance_cash .right {
		flex: 1;
		display: flex;
		align-items: center;
		color: #8e8e8e;
		justify-content: flex-end;
	}

	.balance_cash .right:after {
		content: '';
		display: block;
		width: .07rem;
		height: .125rem;
		margin-left: .05rem;
		background: url(../../assets/img/right.png) no-repeat;
		background-position: center left;
		background-size: .07rem .125rem;
	}

	.balance_cash .body .bg_gray {
		background: #f5f5f5;
		color: #18B4ED;
		padding: .15rem;
	}
	/*确认按钮*/

	.balance_cash .body .bottom {
		padding: .5rem .15rem;
	}

	.balance_cash .body .bottom .btn {
		background: #cbcbcb;
		text-align: center;
		color: #fff;
		padding: .15rem;
		border-radius: .1rem;
	}

	.balance_cash .body .bottom .btn.blue {
		background: #18B4ED;
	}
	/*弹出层*/

	.selectTypeView {
		background: #f5f5f5;
	}

	.selectTypeView .btn {
		padding: .15rem;
		display: flex;
		justify-content: flex-end;
	}

	.selectTypeView .ul {
		background: #fff;
	}

	.selectTypeView .ul .li {
		padding: .15rem;
		text-align: center;
	}

	.selectTypeView .ul .li:active {
		color: #18B4ED;
	}

	.toastView .title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: .2rem .15rem;
		font-size: .18rem;
		color: #333333;
	}

	.toastView .cancel {
		width: .15rem;
		height: .15rem;
		background: url(../../assets/img/cancel.png) no-repeat;
		background-position: center;
		background-size: .11rem .11rem;
	}

	.toastView .ul {
		padding: 0 .15rem;
		font-size: .16rem;
	}

	.toastView .ul .li {
		padding: .15rem 0;
		display: flex;
		justify-content: space-between;
	}

	.toastView .btn {
		margin: .3rem .15rem;
		padding: .1rem;
		background: #18B4ED;
		color: #fff;
		border-radius: .1rem;
		font-size: .18rem;
		text-align: center;
	}

	.toastView .color_gray {
		color: #666666;
	}

	.toastView .color_red {
		color: #ff3434;
	}
	.ruleBox{
		width:100%;
		height:100%;
		font-size:0.14rem;
	}
	.ruleBox p{
		color:#999;
		padding:0 0.1rem;
		margin:0.1rem 0;
    text-indent: 2em;
	}
</style>

<!--
	作者：1056643093@qq.com
	时间：2018-08-01
	描述：这是余额和积分提现，屌不屌！
-->
