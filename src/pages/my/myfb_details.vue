<template>
	<div class="orderd">
		<div v-if="payShow == true">
			<van-nav-bar title="支付" left-arrow @click-left="onClickLeft" />
		</div>
		<div v-else>
			<van-nav-bar title="订单详情" left-arrow @click-left="onClickLeft2" />
		</div>
		<div class="box">
			<div v-if="addslists">
				<div class="adds" v-if="addslists.server_info">
					<div>
						<img src="../../assets/img/address.png" />
					</div>
					<div class="addsri">
						<div class="lrm">
							<div>
								联系人：{{addslists.server_info.contact_name}}
							</div>
							<div>
								{{addslists.server_info.telephone}}
							</div>
						</div>

						<div class="addcor">
							联系地址：{{addslists.server_info.address_name}}
						</div>
					</div>
				</div>
				<div class="com_box" v-if="addslists.server_info">
					<ul>
						<li class="list_coms">
							<div class="com_com">
								<div>
									<img src="../../assets/img/logo_h.png" v-if="addslists.order_detail.order_pic == ''" />
									<img :src="uploadFileUrl + addslists.order_detail.order_pic[0]" v-else/>
								</div>
								<div class="com_com_x">
									<div class="com_com_x_tit">
										<div>{{addslists.order_detail.cat_name}}</div>
										<div>
											<order-state :order_info="addslists" :is_store_page="false"></order-state>
										</div>
									</div>
									<div class="com_com_x_ov">
										{{addslists.order_detail.order_name}}
									</div>
									<!--<div class="com_com_x_ov" v-clampy="3" v-html="replaceStyle(addslists.order_info)"></div>-->
									<div class="com_com_x_score2">
										<div>
											￥{{addslists.payment.order_amount}}
										</div>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<div class="oredrs" v-if="addslists.server_info">
					<ul>
						<li>
							<div>订单编号</div>
							<div>{{addslists.order_detail.order_sn}}</div>
						</li>
						<li>
							<div>支出</div>
							<div style="color: #f00;">{{addslists.payment.order_amount}}</div>
						</li>
						<li>
							<div>支付方式</div>
							<div v-if="addslists.payment.order_actual_amount == 0">
								<span v-if="addslists.payment.order_deductible_type == 1">余额</span>
								<span v-else-if="addslists.payment.order_deductible_type == 2">积分</span> 抵扣
							</div>
							<div v-else>
								<div v-if="addslists.payment.order_pay_way == 'alipay'">支付宝</div>
								<div v-else-if="addslists.payment.order_pay_way == 'wechat'">微信</div>
								<div v-else>银行卡</div>
							</div>
						</li>
						<!--<li>
						<div>下单时间</div>
						<div>{{item.time_record.pay_time}}</div>
					</li>-->
						<li>
							<div>下单时间</div>
							<div>{{addslists.time_record.contact_appointment_at}}</div>
						</li>

					</ul>
				</div>
				<div class="but_coms" v-if="addslists.order_detail">
					<!--&& its.order.order_detail.order_belong_store_id-->
					<template v-if="addslists.order_detail['order_pay_state_dsc'] == 'PAY_SUCCESS'">
						<!--支付成功的按钮-->
						<!--<div v-if="item.order_detail['order_bis_state_dsc'] == 'PENDING_EVALUATE'" class="but_coms_but3" @click="confirm(item,index)">确认完成</div>-->
						<div v-if="addslists.order_detail['order_bis_state_dsc'] == 'PENDING_EVALUATE'" class="but_coms_but3" @click.stop="menvaluate(addslists)">立即评价</div>
					</template>
					<template v-else>
						<div v-if="addslists.order_detail['order_pay_state_dsc'] == 'PENDING_PAY'" class="but_coms_but3" @click.stop="ofgshow(addslists)">去支付</div>
					</template>
					<!--完成-->
					<div v-if="addslists.order_detail['order_bis_state_dsc'] == 'PENDING_ASSIGN' || addslists.order_detail['order_bis_state_dsc'] == 'PENDING_DOOR'" class="but_coms_but4" @click.stop="call(addslists)">联系商家</div>
					<div v-else-if="addslists.order_detail['order_bis_state_dsc'] == 'COMPLETED' || addslists.order_detail['order_bis_state_dsc'] == 'CLOSED'" class="but_coms_but1" @click.stop="shows_qx(addslists)">删除订单</div>
          <div v-if="['SET_UP','PENDING_PAY', 'PENDING_ORDER', 'PENDING_ASSIGN', 'PENDING_DOOR'].indexOf(addslists.order_detail['order_bis_state_dsc']) && addslists.order_detail['order_bis_state_dsc'] != 'COMPLETED' || addslists.order_detail['order_pay_state_dsc'] == 'PENDING_PAY'" class="but_coms_but1" @click.stop="shows(addslists)">
            取消订单</div>
				</div>
			</div>
		</div>
		<orderConfirmation v-model="payShow" :orderData="orderData" :orderType="4"></orderConfirmation>
	<!--取消订单弹出框-->
				<!--<div class="po_box" v-show="isshow" @click.stop="xbut()" v-if="oits_list.order_detail">
					<div class="po_box_div">
						<div class="po_box_div_tit">提示</div>
						<div class="po_box_div_com" v-if="oits_list.order_detail['order_bis_state_dsc'] == 'COMPLETED' || oits_list.order_detail['order_bis_state_dsc'] == 'CLOSED'"">
							确定要删除此订单？
						</div>
						<div class="po_box_div_com" v-else>
							确定要取消此订单？
						</div>
						<div class="po_box_but">
							<div @click.stop="xbut()">取消</div>
							<div @click.stop="spilits()">确认</div>
						</div>
					</div>
				</div>-->
	<div class="po_box" v-show="isshow_qx" @click.stop="xbut()" v-if="oits_list.order_detail">
			<div class="po_box_div">
				<div class="po_box_div_tit">提示</div>
				<div class="po_box_div_com">
					确定要删除此订单？
				</div>
				<div class="po_box_but">
					<div @click.stop="xbut()">取消</div>
					<div @click.stop="spilitsx()">确认</div>
				</div>
			</div>
		</div>

		<div class="po_box" v-show="isshow" @click.stop="xbutx()" v-if="oits_list.order_detail">
			<div class="po_box_div">
				<div class="po_box_div_tit">提示</div>
				<div class="po_box_div_com">
					确定要取消此订单？
				</div>

				<div class="po_box_but">
					<div @click.stop="xbut()">取消</div>
					<div @click.stop="spilits()">确认</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import api from '@/api/api';
	import orderState from '@/components/orderState';
	import utils from '@/utils/utils';
	import orderConfirmation from '@/components/order_confirmation';
	export default {
		components: {
			orderState,
			orderConfirmation
		},
		data() {
			return {
				payShow:false,
				orderData:{},
				addshow: false,
				isshow: false,
				isshow_qx:false,
				indexs: '',
				num: '',
				uploadFileUrl: api.uploadFileUrl + '/',
				fgshow: false,
				list_com: {
					listname: '',
					payment: '',
					type: '',
					name: "",
					xiangq: "",
					p_score: '',
					xis: '',
					price: '',
					price_y: '',
				},
				//				dizhi
				addslists: {},
				list_com: {},
				addnema: '',
				addtel: '',
				addaddres: '',
				lng: 0,
				lat: 0,
				order_sign: '',
				order_sn: '',
				token: '',
				fgshow: false,
				oits_list: {},
			}
		},
		mounted() { //生命周期
			this.order_getby()
			this.token = this.$store.state.token
		},
		methods: { //方法
			call(info) {
				if(info.order.store_info.store_phone) {
					window.location.href = "tel:" + info.order.store_info.store_phone
				} else {
					this.$toast('拨号失败！')
				}
			},


				//			立即評論
			menvaluate() {
				let that = this
				that.$router.push({
					path: '/menvaluate',
					query: {
						order_snx : that.$route.query.order_sn
					}
				})
			},
			replaceStyle(str) {
				const reg = /<[^<>]+>/g
				return str.replace(reg, '');
			},
			addsadd() {
				let that = this
				that.addshow = true
			},
			order_getby() {
				let that = this
				that.$fetch('order_getby_sn', {}, that.$route.query.order_sn).then(rs => {
					that.addslists = rs.order_info
					//						console.log('rs',	that.addslists)
				})

			},

			olist() {
				let that = this
				let lists = this.$route.query.its
				that.list_com.listname = lists.listname
				that.list_com.name = lists.name
				that.list_com.p_score = lists.p_score
				that.list_com.payment = lists.payment
				that.list_com.price = lists.price
				that.list_com.price_y = lists.price_y
				that.list_com.type = lists.type
				that.list_com.xiangq = lists.xiangq
				that.list_com.xis = lists.xis

			},
			onClickLeft() {
				this.payShow = false
			},
			onClickLeft2() {
				this.$router.back(-1)
			},

			//			刪除或取消
			shows_qx(item) {
				let that = this
				that.isshow_qx = true
				console.log(that.oits_list)
				that.oits_list = item
			},
			shows(item) {
				let that = this
				that.isshow = true
				that.oits_list = item
				console.log(that.oits_list)
			},
			spilits() {
				let that = this
				if(that.oits_list.order_detail) {
					console.log(that.oits_list.order_detail)
				}
				// 取消走这里
				that.$fetch('user_cancel_order', {}, that.oits_list.order_detail.order_sn).then(rs => {
					that.$toast("取消成功");
					that.isshow = false
					setTimeout(() => {
						that.order_getby()
					}, 2000)
				})

			},
			spilitsx() {
				let that = this
				if(that.oits_list.order_detail) {
					console.log(that.oits_list.order_detail)
				}
				that.$fetch('order_delete', {}, that.oits_list.order_detail.order_sn).then(rs => {
					that.$toast("删除成功");
					t = setTimeout(function() {
							that.$router.back(-1);
						}, 2000);
				})
			},
//			spilits() {
//				let that = this
//				if(that.oits_list){
//					console.log(that.oits_list)
//				}
//				if(that.oits_list.order_detail['order_bis_state_dsc'].indexOf(['SET_UP','PENDING_PAY', 'PENDING_ORDER', 'PENDING_ASSIGN', 'PENDING_DOOR'])) {
//					// 取消走这里
//					that.$fetch('user_cancel_order', {}, that.oits_list.order_detail.order_sn).then(rs => {
//						that.$toast("取消成功");
//						that.isshow = false
//						setTimeout(()=> {
//							that.order_getby()
//						},2000)
//					})
//				} else {
//					that.$fetch('order_delete', {}, that.oits_list.order_detail.order_sn).then(rs => {
//						that.$toast("删除成功");
//						t = setTimeout(function() {
//							that.$router.back(-1);
//						}, 2000);
//					})
//				}
//			},
			//			关闭
			xbut() {
				let that = this
				that.isshow = false
				that.isshow_qx = false
			},
			//			付款
				//	支付
			ofgshow(its) {
				let that = this
				that.orderData.order_sn = its.order_table_sn;
				that.orderData.total = Number(its.demand_remuneration); //价钱
				that.orderData.successUrl = "myfb";
				that.orderData.order_pay_way = its.demand_price_type; //支付
				that.orderData.order_deductible_type = its.payment.order_deductible_type;
				that.payShow = true;
			},
			fgbut() {
				let that = this
				that.fgshow = false
			},
			opadd() {
				let that = this
				that.addshow = false
			},
		},

	}
</script>

<style scoped>
	.orderd {}

	.box {
		position: absolute;
		top: .46rem;
		left: 0;
		right: 0;
		bottom: 0;
		height: calc(100% - 0.46rem);
		overflow: auto;
		background: #f5f5f5;
	}

	.commodity {
		background: #FAFAFA;
	}

	.commodity ul {
		background: #FAFAFA;
	}

	.list_coms {
		margin-top: .1rem;
		/*padding-bottom: .15rem;*/
		background: #fff;
	}

	.com_li {
		margin-bottom: 0.1rem;
		background: #fff;
		padding: 0 0 0.2rem 0;
	}

	.com_tit {
		height: .38rem;
		line-height: .38rem;
		padding: 0 .1rem;
		background: #fff;
		display: flex;
		justify-content: space-between;
	}

	.com_tit_img {
		display: flex;
		font-size: .14rem;
		font-weight: 600;
		align-items: flex-start;
	}

	.com_tit_img>div img {
		width: .15rem;
		height: .15rem;
		margin-top: .11rem;
		margin-right: .05rem;
	}

	.com_tit>div:nth-child(2) {
		font-size: .12rem;
		color: #b2b2b2;
	}

	.com_com {
		display: flex;
		background: #fff;
	}

	.com_com>div:nth-child(1) {
		flex: 0 0 .9rem;
		margin: .08rem;
		border-radius: .1rem;
		overflow: hidden;
		padding: .05rem 0 0 0;
	}

	.com_com>div:nth-child(1) img {
		width: .9rem;
		height: .9rem;
	}

	.com_com_x {
		position: relative;
		flex: 1;
		margin-top: .1rem;
		/*padding-right: .1rem;*/
	}

	.com_com_ri {
		position: absolute;
		top: -.06rem;
		right: 0.1rem;
		border: 0.01rem solid #ff9c0f;
		color: #ff9c0f;
		font-size: .12rem;
		border-radius: .05rem;
		padding: .01rem .03rem;
	}

	.com_com_x_tit {
		font-size: .16rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.com_com_x_ov {
		width: 2.65rem;
		font-size: .14rem;
		color: #707070;
		margin: 0.05rem 0;
	}

	.com_com_x_score {
		display: flex;
		font-size: .12rem;
		margin-bottom: .05rem;
	}

	.com_com_x_score_colco {
		margin-right: .05rem;
		color: #f00;
	}

	.com_com_x_score2 {
		display: flex;
	}

	.com_com_x_score2>div:nth-child(1) {
		font-size: .18rem;
		color: #f00;
		margin-right: .25rem;
	}

	.com_com_x_score2>div:nth-child(2) span {
		font-size: .10rem;
		color: #fff;
		background: #f00;
		border-radius: .05rem;
		padding: 0.015rem 0.063rem;
	}

	.but_coms {
		display: flex;
		justify-content: flex-end;
		padding: 0 0.15rem;
		background: #fff;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.but_coms div {
		margin: .08rem 0 .08rem .1rem;
		flex: 0 0 .75rem;
		height: .22rem;
		line-height: .22rem;
		text-align: center;
		padding: .05rem .08rem;
		background: #fff;
		border: 0.01rem solid #B2B2B2;
		border-radius: .3rem;
		font-size: .14rem;
		color: #B2B2B2;
	}

	.but_coms_but1 {
		border: 0.01rem solid #B2B2B2 !important;
		color: #B2B2B2 !important;
	}

	.but_coms_but2 {
		border: 0.01rem solid #f00 !important;
		color: #f00 !important;
	}

	.but_coms_but3 {
		border: 0.01rem solid #f00 !important;
		color: #f00 !important;
	}

	.but_coms_but4 {
		border: 0.01rem solid #18b4ed !important;
		color: #18b4ed !important;
	}

	.po_box {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		/*height: 100%;*/
		background: rgba(0, 0, 0, .3);
		z-index: 9999;
	}

	.po_box_div {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 2.75rem;
		height: 1.9rem;
		background: #fff;
		border-radius: .1rem;
		margin: -0.95rem 0 0 -1.375rem;
	}

	.po_box_div_tit {
		color: #18B4ED;
		height: .5rem;
		line-height: .5rem;
		text-align: center;
		border-bottom: .01rem solid #eee;
	}

	.po_box_div_com {
		height: .85rem;
		line-height: .85rem;
		text-align: center;
		font-size: .16rem;
		border-bottom: .01rem solid #eee;
	}

	.po_box_but {
		display: flex;
	}

	.po_box_but div {
		flex: 0 0 49%;
		text-align: center;
		height: .5rem;
		line-height: .5rem;
	}

	.po_box_but div:nth-child(2) {
		border-left: .01rem solid #eee;
		color: #18B4ED;
	}

	.adds {
		display: flex;
		/*margin: .1rem 0 0 0;*/
		padding: 0 .15rem;
		background: #fff;
	}

	.adds>div:nth-child(1) {
		flex: 0 0 .5rem;
		height: 1rem;
		line-height: 1rem;
	}

	.adds>div:nth-child(1) img {
		width: .2rem;
	}

	.addsri {
		flex: 0 0 1;
	}

	.lrm {
		display: flex;
		margin: .2rem 0 .05rem 0;
		justify-content: space-between;
	}

	.lrm div:nth-child(1) {
		flex: 0 0 1.9rem;
	}

	.addcor {
		flex: 0 0 2.8rem;
	}
	/*//dingdan*/

	.oredrs {
		margin-top: .1rem;
		background: #FFF;
	}

	.oredrs ul {
		padding: .1rem 0;
	}

	.oredrs ul li {
		display: flex;
		justify-content: space-between;
		padding: 0 .15rem;
		height: .34rem;
		line-height: .34rem;
	}

	.order_but {
		width: 100%;
		/*height: .67rem;*/
		/*line-height: .67rem;*/
		/*position: absolute;*/
		bottom: 0;
		background: #fff;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.order_but div {
		margin: .08rem 0 .08rem .1rem;
		flex: 0 0 .75rem;
		height: .20rem;
		line-height: .20rem;
		text-align: center;
		padding: .05rem .08rem;
		background: #fff;
		border: 0.01rem solid #B2B2B2;
		border-radius: .3rem;
		font-size: .14rem;
		color: #B2B2B2;
		margin-right: .15rem;
	}

	.but_coms_but1 {
		border: 0.01rem solid #B2B2B2 !important;
		color: #B2B2B2 !important;
	}

	.but_coms_but2 {
		border: 0.01rem solid #f00 !important;
		color: #f00 !important;
	}

	.but_coms_but3 {
		border: 0.01rem solid #f00 !important;
		color: #f00 !important;
	}

	.but_coms_but4 {
		border: 0.01rem solid #18b4ed !important;
		color: #18b4ed !important;
	}

	.fug_box {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		/*height: 100%;*/
		background: rgba(0, 0, 0, .3);
		z-index: 9999;
	}

	.fug_box ul li {
		display: flex;
		justify-content: space-between;
		height: .55rem;
		line-height: .55rem;
		padding: 0 .1rem;
		background: #FFF;
		border-bottom: .01rem solid #eee;
		align-items: center;
	}

	.fug_box ul li div:nth-child(1) {
		display: flex;
		align-items: center;
	}

	.fug_box ul li div:nth-child(1) img {
		width: .24rem;
		height: .24rem;
		margin-right: .1rem;
	}

	.fg_imgsb {
		flex: 0 0 .2rem;
		height: .2rem;
		background: url(../../assets/img/checked.png) no-repeat;
		background-size: .18rem;
	}

	.fug_box_po {
		position: absolute;
		/*height: 2.2rem;*/
		overflow: hidden;
		width: 90%;
		margin: 0 5%;
		background: #fff;
		bottom: .15rem;
		border-radius: .1rem;
	}

	.slide-fade-enter-active {
		transition: all .3s ease;
	}

	.slide-fade-leave-active {
		transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}

	.slide-fade-enter,
	.slide-fade-leave-to
	/* .slide-fade-leave-active for below version 2.1.8 */

	{
		transform: translateY(2rem);
		opacity: 0;
	}

	.fg_fangs {
		height: .44rem;
		line-height: .44rem;
		text-align: center;
		border-bottom: .01rem solid #eee;
	}

	.addsa {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		/*height: 100%;*/
		z-index: 9999;
		background: rgba(0, 0, 0, .3);
	}

	.addsa_div {
		background: #fff;
		border-radius: .1rem;
		width: 90%;
		padding: 0 .1rem;
		margin: .65rem auto;
		height: 5rem;
		overflow: auto;
	}

	.addsa_div ul li {
		border-bottom: .01rem solid #eee;
		padding: .1rem 0;
	}

	.fug_box ul li {
		display: flex;
		justify-content: space-between;
		height: .55rem;
		line-height: .55rem;
		padding: 0 .1rem;
		background: #FFF;
		border-bottom: .01rem solid #eee;
		align-items: center;
	}

	.fug_box ul li div:nth-child(1) {
		display: flex;
		align-items: center;
	}

	.fug_box ul li div:nth-child(1) img {
		width: .24rem;
		height: .24rem;
		margin-right: .1rem;
	}

	.fug_box_po {
		position: absolute;
		/*height: 2.2rem;*/
		overflow: hidden;
		width: 90%;
		margin: 0 5%;
		background: #fff;
		bottom: .15rem;
		border-radius: .1rem;
	}

	.fg_fangs {
		height: .44rem;
		line-height: .44rem;
		text-align: center;
		border-bottom: .01rem solid #eee;
	}
</style>
