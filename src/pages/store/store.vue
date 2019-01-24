<template>
	<div style="position: relative;">
		<div class="myStore">
			<div class="business_head_portrait">
				<div>
					<div>
						<div class="business_head_text" @click="onshop">
							<span>
								进入店铺主页
							</span>
						</div>
						<div class="business_head_img">
							<img :src="store.store_pic[0] ? uploadFileUrl + store.store_pic[0] : defaultImg" />
						</div>
					</div>
					<div class="business_head_ewm" @click="show_ewm_plus = true">
						<img src="../../assets/img/QR_code.png" />
					</div>
				</div>
				<div class="business_head_title">{{store.store_name}}</div>
			</div>
			<!--我金额-->
			<div class="business_money">
				<div>
          <div>{{store.store_type == 'SELF_SUPPORT' && user_type != 1 ? '平台净收入（元）' : '累计收入（元）'}}</div>
					<div v-if="show_money" class="business_money_number">
						<span>{{config_value || store.store_total_income}}</span><img src="../../assets/img/img_vx/business_y_2.png" @click="show_money = false" />
					</div>
					<div v-if="!show_money" class="business_money_number">
						<span class="business_money_number_xx">******</span><img src="../../assets/img/img_vx/business_y_1.png" @click="show_money = true" />
					</div>
				</div>
				<div class="brief_intr_box">
					<span v-if="show_money" class="brief_intr">{{statistics.yesterday ? '昨日收入' + statistics.yesterday + '元' : ''}}{{store.store_type == 'SELF_SUPPORT' && user_type != 1 ? '' : '，可提现金额'+ statistics.total_income + '元'}}</span>
					<span v-if="!show_money" class="brief_intr">收入已隐藏</span>
				</div>
				<div v-if="!(store.store_type === 'SELF_SUPPORT' && user_type != 1)" style="display: flex;justify-content: space-around;color: #18B4ED;padding: .1rem;">
					<div @click="onstoreProfit">查看明细</div>
					<div @click="toBalance_cash">立即提现</div>
				</div>
			</div>
			<!--我的订单-->
			<div class="personal_order" v-if="user_type != 1">
				<!--店铺订单-->
				<div class="order">
					<div class="title" @click="orders">
						<div>店铺订单</div>
						<div class="right">查看全部</div>
					</div>
					<div class="row">
						<div class="span">
							<div class="top">待付款</div>
							<div>{{store_order['pending_pay'] || 0}}</div>
						</div>
						<div class="span">
							<div class="top">待接单</div>
							<div>{{store_order['pending_order'] || 0}}</div>
						</div>
						<div class="span">
							<div class="top">待服务</div>
							<div>{{(store_order['pending_door'] + store_order['pending_assign']) || 0}}</div>
						</div>
						<div class="span">
							<div class="top">待评价</div>
							<div>{{store_order['pending_evaluate'] || 0}}</div>
						</div>
						<div class="span">
							<div class="top">已关闭</div>
							<div>{{store_order['closed'] || 0}}</div>
						</div>
					</div>
				</div>
			</div>
			<!--选项-->
			<ul class="option">
				<li class="option_li" @click="goServel" v-if="user_type != 1">
					<div class="label">
						<div class="left">
							<div class="logo"><img src="../../assets/img/img_vx/business_2.png" /></div>
							<div>服务管理</div>
						</div>
						<div class="right"></div>
					</div>
				</li>
				<li class="option_li" @click="order" v-if="user_type == 1">
					<div class="label">
						<div class="left">
							<div class="logo"><img src="../../assets/img/img_vx/business_3.png" /></div>
							<div>订单管理</div>
						</div>
						<div class="right"></div>
					</div>
				</li>

				<li class="option_li" @click="toStaff" v-if="user_type != 1">
					<div class="label">
						<div class="left">
							<div class="logo"><img src="../../assets/img/friend.png" /></div>
							<div>人员管理</div>
						</div>
						<div class="right"></div>
					</div>
				</li>

        <li class="option_li" @click="achievements">
          <div class="label">
            <div class="left">
              <div class="logo"><img src="../../assets/img/achievements.png" height="42" width="40"/></div>
              <div>绩效</div>
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
				<li class="option_li" @click="setting" v-if="user_type != 1">
					<div class="label">
						<div class="left">
							<div class="logo"><img src="../../assets/img/img_vx/business_4.png" /></div>
							<div>店铺管理</div>
						</div>
						<div class="right"></div>
					</div>
				</li>
        <li class="option_li" @click="setup()">
          <div class="label">
            <div class="left">
              <div class="logo"><img src="../../assets/img/index/set_up.png"/></div>
              <div>安全设置</div>
            </div>
            <div class="right"></div>
          </div>
        </li>
			</ul>
		</div>

    <!--显示二维码-->
    <van-popup v-model="show_ewm_plus">
      <img @click="show_ewm_plus = false" style="width:0.2rem; position: absolute; right:0.2rem; top:0.1rem" src="../../assets/img/cancel.png" alt="" />
      <div class="showView" @click="show_ewm_plus = false">
        <div class="code">
          <img :src="uploadFileUrl + store.store_inducted_qrcode" />
        </div>
        <div class="bottom">扫一扫，成为清洁师</div>
      </div>
    </van-popup>
	</div>
</template>

<script>
	import api from '@/api/api'
	export default {
		data() {
			return {
				show_money: this.$store.state.show_money === true,
				canIrelease: false, // 判断是否能发布服务
				user_type: 0, //3店主
				store: {},
				statistics: {},
				uploadFileUrl: api.uploadFileUrl + '/',
        defaultImg: require('../../assets/img/logo_h.png'),
				statusGet: '',
				staff_id: 0,
				show_ewm_plus: false,
				store_order: {},
        config_value: 0
			}
		},
		watch: {
			show_money(val) {
				this.$store.commit('set_show_money', val)
			}
		},
		mounted () {
			this.init()
		},
		methods: {
			getStorePic(storeInfo) {
				if(storeInfo.store_pic) {
					return this.uploadFileUrl + storeInfo.store_pic[0]
				}
			},
			McanIrelease() {
				this.$fetch('can_i_use', {
					node_key: 'Service.insert'
				}, '', 'POST', 1).then(rs => {
					this.canIrelease = true
				})
			},
			init () {
				//店铺详情
				this.$fetch('user_store_info_get', {}, '', 'POST', 1).then(rs => {
				  this.$store.commit('setStoreInfo',rs.own_store)
          this.user_type = rs.staff_row.user_type
          this.staff_id = rs.staff_row.user_id
          this.$nextTick(() => {
            this.store = rs.own_store
            if(this.store.store_type == 'SELF_SUPPORT' && this.user_type != 1) {
              this.$fetch('get_platform_benefit').then(rs =>{
                this.config_value = rs.config_value
              })
            }
          })
					if (this.user_type != 1) { //店主
            this.$fetch('store_order_statistics').then(rs => {
              this.store_order = rs
						})
					} else { //店员

					}
				})
				//店铺数据
        this.$fetch('user_store_statistics', {}).then(rs => {
          this.statistics = rs
				})

			},
			toStoreProfit () {
				this.$router.push('/storeProfit')
			},
			goServel() {
				let that = this;
				if(Object.keys(that.store).length > 0) {
					that.$router.push({
						path: '/serverList',
						query: {
							storeId: that.store.id
						}
					})
				} else {
					that.$toast('user_store_info_get:error');
				}

			},
			onshop() {
				this.$router.push({
					path: "onshop",
					query: {
						statistics_id: this.store.id
					}
					//					path: "storeProfit",

				});
			},
			onstoreProfit() {
				this.$router.push({
					path: "storeProfit"

				});
			},
			comme() {
				this.$router.push({
					path: "commentAdmin"
				});
			},
			goOrders() {
				this.$router.push({
					path: "storeOrders"
				});
			},
			setting() {
				this.$router.push({
					path: '/storeSet'
				})
			},
			order() {
				this.$router.push({
					path: '/store_orders_x',
					query: {
						staff_id: this.staff_id
					}
				})
			},


			orders() {
				let that = this
				if(that.user_type == 1) {
          that.$router.push({
            path: '/store_orders_x',
            query: {
              staff_id: that.staff_id
            }
          })
				} else {
          that.$router.push({
            path: '/store_orders'
          })
				}

			},
			toStaff() {
				this.$router.push({
					path: '/storeStaff'
				})
			},
			onClickLeft() {
				this.$router.push({
					path: '/home'
				})
			},
			onClickRight() {
				this.$router.push({
					path: "release_service"
				});
			},
      //团队 // 绩效
      achievements(){
        var that = this;
        that.$router.push({
          path: '/achievements',

        })
      },
			revise() {
				var that = this;
				that.$router.push({
					path: '/storeApply',
					query: {
						type: that.user_type
					}
				})
			},
			toBalance_cash() {
				this.$router.push({
					path: '/balance_cash',
					query: {
						cashNum: 1, //余额提现传1，积分提现传2
						value: this.statistics.total_income,
						way_type: 'store'
					}
				})
			},
      setup() {
        this.$router.push({
          path: '/setup'
        })
      }
		}

	}
</script>

<style scoped>
	/* 可以设置不同的进入和离开动画 */
	/* 设置持续时间和动画函数 */

	.slide-fade-enter-active {
		transition: all .3s ease;
	}

	.slide-fade-leave-active {
		transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}

	.slide-fade-enter,
	.slide-fade-leave-to
	/* .slide-fade-leave-active for below version 2.1.8 */

	{
		transform: translateX(120px);
		opacity: 0;
	}

	.store {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #f5f5f5;
	}

	.store .body {
		height: calc(100% -.46rem);
		overflow: hidden;
	}

	.store .body .top {
		/*height: 1.33rem;*/
		width: 100%;
		line-height: 0;
		text-align: center;
		position: relative;
		padding: .15rem 0;
		border-bottom: 1px solid #f5f5f5;
		background: #fff;
	}

	.store .body .top .img>img {
		height: 1.05rem;
		width: 1.05rem;
		border-radius: 50%;
		border: 1px solid #fff;
		position: relative;
		z-index: 100;
	}

	.store .body .top .name {
		font-size: .18rem;
		line-height: .18rem;
		margin: .05rem;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.store .body .top .name .right {
		margin-left: .1rem;
		height: .15rem;
		width: .2rem;
		background: url(../../assets/img/more_gray.png) no-repeat;
		background-size: auto .15rem;
	}

	.store .body .top .more {
		color: #707070;
		padding: .15rem 0 .1rem;
	}

	.store .body .top .bgc {
		background: #18B4ED;
		height: calc(50% - .2rem);
		width: 100%;
		z-index: 1;
		position: absolute;
		top: 0;
	}

	.store .body .center {
		display: flex;
		margin-bottom: .1rem;
	}

	.store .body .center .item {
		flex: 1;
		text-align: center;
		background: #fff;
		padding: .15rem;
	}

	.store .body .center .item+.item {
		border-left: 1px solid #f5f5f5;
	}

	.store .body .shareimg {
		background: #fff;
		padding: .15rem;
		display: flex;
	}

	.store .body .shareimg .img {
		width: 1.31rem;
	}

	.store .body .shareimg .img>img {
		width: 100%;
		height: auto;
	}

	.store .body .shareimg .right {
		flex: 1;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.store .body .shareimg .right .h1 {
		font-size: .18rem;
		font-weight: 700;
	}

	.store .body .shareimg .right .h2 {
		font-size: .12rem;
		color: #b2b2b2;
	}

	.store .body .bottom {
		display: flex;
		flex-wrap: wrap;
		background: #fff;
	}

	.store .body .bottom.type1 .item {
		flex: 1;
		text-align: center;
		padding: .15rem 0;
		border-top: 1px solid #f5f5f5;
	}

	.store .body .bottom.type1 .item+.item {
		border-left: 1px solid #f5f5f5;
	}

	.store .body .bottom.type2 .item {
		flex: 0 0 33%;
		text-align: center;
		padding: .15rem 0;
		border-top: 1px solid #f5f5f5;
		border-right: 1px solid #f5f5f5;
	}

	.store .body .bottom .item:nth-child(3),
	.store .body .bottom .item:nth-child(6) {
		border-right: 0;
	}

	.store .body .bottom .item>img {
		height: .55rem;
		width: .55rem;
		border-radius: 50%;
	}
	/*-------------------------------------------*/

	.myStore {
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

	.option {
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
		background: #18b4ed;
		border: 0.02rem solid #fff;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    z-index: 999;
	}

	.business_head_img img {
    width: 100%;
    height: 100%;
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
		margin-left: .1rem;
		width: .2rem;
		height: .13rem;
	}

	.brief_intr_box {
    padding: .1rem;
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
