<template>
	<div>
			<!--显示二维码-->
			<van-popup v-model="show_ewm_plus">
				<img @click="show_ewm_plus = false" style="width:0.2rem; position: absolute; right:0.2rem; top:0.1rem" src="../../assets/img/cancel.png" alt="" />
				<div class="showView" @click="show_ewm_plus = false">
					<div class="code">
						<img src="../../assets/img/img_vx/bar_con.png" />
						<!--一个商家的一个【普通的-->
						<!--<img src="../../assets/img/img_vx/bar_con.png"/> -->
					</div>
					<div class="bottom">下单出示会员码，可积累积分</div>
				</div>
			</van-popup>

	<div class="myStore">

		<!--头像-->
					<div class="business_head_portrait">
						<div>
							<div>
								<div class="business_head_text" >
									<span>
										进入店铺主页
									</span>
								</div>
								<div class="business_head_img">
									<img src="../../assets/img/timg.png" />
								</div>
							</div>
							<div class="business_head_ewm" @click="show_ewm_plus = true">
								<img src="../../assets/img/top.png" />
							</div>
						</div>
						<div class="business_head_title">帮家洁清洁服务</div>
					</div>
					<!--我金额-->
					<div class="business_money">
						<div>
							<div v-if="show_money" class="business_money_number">
								<span>111111.00</span><img src="../../assets/img/img_vx/business_y_2.png" @click="show_money = false" />
							</div>
							<div v-if="!show_money" class="business_money_number">
								<span class="business_money_number_xx">******</span><img src="../../assets/img/img_vx/business_y_1.png" @click="show_money = true" />
							</div>
						</div>
						<div class="brief_intr_box">
							<span v-if="show_money" class="brief_intr">累计收入(元),其中昨日收入200.00元</span>
							<span v-if="!show_money" class="brief_intr">收入已隐藏</span>
						</div>
					</div>
					<!--我的订单-->
					<div class="personal_order">
						<!--店铺订单-->
						<div class="order">
							<div class="title"  @click="orders">
								<div>店铺订单</div>
								<div class="right">查看全部 </div>
							</div>
							<div class="row">
								<div class="span">
									<div class="top">待付款</div>
									<div>0</div>
								</div>
								<div class="span">
									<div class="top">待接单</div>
									<div>0</div>
								</div>
								<div class="span">
									<div class="top">待服务</div>
									<div>0</div>
								</div>
								<div class="span">
									<div class="top">待评价</div>
									<div>0</div>
								</div>
								<div class="span">
									<div class="top">已关闭</div>
									<div>0</div>
								</div>
							</div>
						</div>
					</div>
					<!--选项-->
					<ul class="option">
						<li class="option_li" @click="goServel">
							<div class="label">
								<div class="left">
									<div class="logo"><img src="../../assets/img/img_vx/business_2.png" /></div>
									<div>服务管理</div>
								</div>
								<div class="right"></div>
							</div>
						</li>
						<li class="option_li">
							<div class="label">
								<div class="left">
									<div class="logo"><img src="../../assets/img/img_vx/business_3.png" /></div>
									<div>订单管理</div>
								</div>
								<div class="right"></div>
							</div>
						</li>
						<li class="option_li">
							<div class="label">
								<div class="left">
									<div class="logo"><img src="../../assets/img/friend.png" /></div>
									<div>人员管理</div>
								</div>
								<div class="right"></div>
							</div>
						</li>
						<li class="option_li" @click="comme">
							<div class="label">
								<div class="left">
									<div class="logo"><img src="../../assets/img/edit.png" /></div>
									<div>评价管理</div>
								</div>
								<div class="right"></div>
							</div>
						</li>
						<li class="option_li"  v-show="store_type">
							<div class="label">
								<div class="left">
									<div class="logo"><img src="../../assets/img/img_vx/business_4.png" /></div>
									<div>店铺管理</div>
								</div>
								<div class="right"></div>
							</div>
						</li>
					</ul>
		<!--<van-nav-bar title="我的店铺" left-arrow right-text="发布服务" @click-left="onClickLeft" @click-right="onClickRight" />
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
		</div>-->
	</div>
	</div>
</template>

<script>
	import api from '@/api/api'
	export default {
		data() {
			return {
				show_money: true,
				show_ewm_plus: false,
        store_id: 0,
				storeStatus: [],
				statistics: {},
        storeInfo: {}
			}
		},
		mounted() { //生命周期
			this.ajax();
			this. init();
		},
		methods: { //方法
		init() {
      this.$fetch('user_info_get', {}, '', 'GET').then(rs =>{
        this.user = rs;
        this.$store.commit('userPhone', rs.user_phone);
      })
      this.$fetch('user_order_statistics', {}).then(rs =>{
        this.statistics = rs
        this.$fetch('user_store_info_get', {}).then(rs =>{
          this.storeInfo = rs.own_store
          this.$store.commit('threeH', rs.staff_row.user_type)
        })
      })
      this.$fetch('user_store_statistics').then(rs =>{
        this.storeStatus=rs
        })
      this.$fetch('store_order_statistics').then(rs =>{
        this.statistics=rs
        })
      },
			onClickLeft() {
				this.$router.push({
					path:'/home'
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
          var storeId = JSON.stringify(rs);
          that.$router.push({
            path: '/serverList',
            query: {
              storeId
            }
          })
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
		/*overflow: hidden;*/
	}
	.order {
		background: #fff;
		padding: 0 .15rem;
	}

	.order .title {
		display: flex;
		justify-content: space-between;
		padding: .15rem 0;
		border-bottom: 1px solid #f5f5f5;
	}

	.order .title div:nth-child(1) {
		font-size: .16rem;
	}

	.order .right {
		display: flex;
		align-items: center;
		color: #B2B2B2;
	}
	/*订单的5大块*/

	.order .row {
		display: flex;
		padding: .15rem 0;
		text-align: center;
		margin-bottom: .1rem;
	}

	.order .row .top {
		margin-bottom: .1rem;
		color: #b2b2b2;
	}

	.order .row .span {
		width: 20%;
	}
	/*选择项*/
	.option{
		background: #fff;
	}
	.option_li {
		height: .55rem;
		margin-bottom: .05rem;
		background: #fff;
		border-radius: 0.05rem;
		box-shadow: 2px 2px 10px rgba(224, 243, 250, 1);
	}
	/*label*/

	.label {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		padding: .15rem;
		/*border-bottom: 1px solid #f5f5f5;*/
	}

	.label.bottom {
		margin-bottom: .1rem;
	}

	.label .left {
		display: flex;
		align-items: center;
	}

	.label .left .logo {
		height: .24rem;
		width: .24rem;
		margin-right: .1rem;
	}

	.label .left .logo>img {
		width: 100%;
		height: auto;
	}

	.right {
		display: flex;
		align-items: center;
		color: #999999;
	}

	.right:after {
		content: '';
		display: block;
		width: .07rem;
		height: .125rem;
		margin-left: .05rem;
		background: url(../../assets/img/right.png) no-repeat;
		background-position: center left;
		background-size: .07rem .125rem;
	}
	.business_head_portrait {
		height: 1.62rem;
		border-radius: 0.05rem;
	}

	.business_head_portrait div:nth-child(1) {
		display: flex;
		align-items: center;
		padding: .07rem 0 0 .045rem;
	}

	.business_head_text {
		width: 1.04rem;
		position: relative;
		/*margin: 0 0 0 0.15rem;*/
	}

	.business_head_text span {
		width: 1.04rem;
		height: .48rem;
		line-height: 0.48rem;
		border-radius: .48rem;
		border: 0.02rem solid #fff;
		font-size: .12rem;
		padding-left: .15rem;
		color: #fff;
		position: absolute;
		left: .1rem;
	}

	.business_head_img {
		width: 1.04rem;
		height: 1.04rem;
		border-radius: 50%;
		background: #18b4ed;
		border: 0.02rem solid #fff;
		position: relative;
		z-index: 999;
	}

	.business_head_img img {
		margin: 0.03rem;
		width: .98rem;
		height: .98rem;
		border-radius: 50%;
	}

	.business_head_ewm {
		margin-left: .54rem;
		width: .36rem;
		height: .36rem;
	}

	.business_head_ewm img {
		width: .36rem;
		height: .36rem;
	}

	.business_head_title {
		margin: .04rem 0 0 0;
		text-align: center;
		color: #fff;
		font-size: .2rem;
	}

	.business_money {
		height: .82rem;
		margin-bottom: .15rem;
		border-radius: 0.05rem;
		background: #fff;
		box-shadow: 2px 2px 10px rgba(224, 243, 250, 1);
		text-align: center;
		padding-top: .2rem;
	}

	.business_money_number_xx {
		/*font-size: .24rem !important;*/
	}

	.business_money_number {
		font-size: .2rem;
		font-weight: 700;
	}

	.business_money_number img {
		margin-left: .22rem;
		width: .2rem;
		height: .13rem;
	}

	.brief_intr_box {
		margin-top: .15rem;
	}

	.brief_intr {
		color: #B2B2B2;
		font-size: .12rem;
	}
	/*弹出的二维码*/

	.showView {
		padding: .25rem;
	}

	.showView .user {
		display: flex;
		align-items: center;
	}

	.showView .user>img {
		width: .81rem;
		height: .81rem;
		border-radius: 50%;
	}

	.showView .code {
		width: 2.5rem;
		height: 2.5rem;
	}

	.showView .code>img {
		width: 100%;
		height: 100%;
	}

	.showView .bottom {
		margin-top: .2rem;
		text-align: center;
	}
</style>

