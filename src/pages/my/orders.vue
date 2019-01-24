<template>
	<div class="find">
		<div>
			<van-nav-bar title="我的订单" left-arrow @click-left="onClickLeft" right-text="订单说明" @click-right="pointRule" />
		</div>
		<ul class="top_nav_ul">
			<li v-for="(item,index) in tabs" :class="{li_style:index == num}" @click="tab(index)">
				<div class="top_nav_img" @click="dad(item,(index == 0 || index == 2))">
					{{item.name}}
				</div>
			</li>
		</ul>
		<div class="top_nav">
			<!--<ul class="top_nav_ul">
        <li v-for="(item,index) in tabs" :class="{li_style:index == num}" @click="tab(index)">
          <div class="top_nav_img" @click="dad(item,(index == 0 || index == 2))">
            {{item.name}}
          </div>
        </li>
      </ul>-->

			<div class="commodity">
				<scroller :on-infinite="infinite" ref="list_com_order" v-if="!loading">
					<ul>
            <li v-if="list_com == ''" style="opacity: 0">
              暂无数据
            </li>
						<li v-else v-for="(its,index) in list_com" class="list_coms" @click="detailst(its,index)">
							<div class="com_com">
								<div style="position: relative;">
									<div v-if="its.order_detail.is_sys_order" class="sys" style="font-size:.12rem;position: absolute;top: 0;right: 0;background: #f00;color: #fff;">周期</div>
									<img src="../../assets/img/logo_h.png" v-if="its.order_detail.order_img == ''" />
									<img :src="uploadFileUrl + its.order_detail.order_img[0]" v-else/>
								</div>
								<div class="com_com_x">
									<!--<div class="com_com_ri" v-if="its.order_detail.order_type == 1">
									企业
								</div>-->
									<div class="com_com_x_tit">
										<div>{{its.order_detail.order_name}}</div>
										<order-state :order_info="its" :is_store_page="false" style="flex: 0 0 .6rem;"></order-state>
									</div>
									<div class="com_com_x_ov" v-clampy="3" v-html="replaceStyle(its.order_detail.order_info)"></div>
									<div class="com_com_x_score2">
										<div>￥{{its.payment.order_amount}}</div>
									</div>
								</div>

							</div>
							<!--下单时间-->
							<div class="item_sj">
								<div>
									<div>下单时间 :</div>
									<div>{{its.time_record.add_time}}</div>
								</div>
								<div>
									<div>服务时间 :</div>
									<div>{{its.time_record.contact_appointment_at}}</div>
								</div>
								<div>
									<div style="width:1rem;">联系地址 :</div>
									<div>{{its.server_info.address_name}}{{its.server_info.house_number}}</div>
								</div>
								<div v-if="its.time_record.next_order_at">
									<div>下期服务时间 :</div>
									<div>{{its.time_record.next_order_at}}</div>
								</div>
							</div>

							<!--anniu-->
							<div class="but_coms" style="display: flex; justify-content:flex-end; align-items:center">
								<div v-if="['SET_UP', 'PENDING_ORDER', 'PENDING_ASSIGN', 'PENDING_DOOR'].indexOf(its.order_detail['order_bis_state_dsc']) > -1 || its.order_detail['order_pay_state_dsc'] == 'PENDING_PAY'" class="but_coms_but1" @click.stop="shows(its)">
                  取消订单
								</div>
								<template v-if="its.order_detail['order_type'] != 4">
									<div v-if="its.order_detail['order_pay_state_dsc'] == 'PENDING_PAY'"
										 class="but_coms_but3"
										 @click.stop="ofgshow(its, index)">去支付
									</div>
								</template>
								<!--<div v-if="its.order_detail.order_is_peddling == 0 && its.order_detail.order_state == 0 && its.order_detail.order_rate == 0" class="but_coms_but3" @click.stop="call(its.server_info.telephone)">联系商家
							</div>-->
								<template v-if="its.order_detail['order_pay_state_dsc'] == 'PAY_SUCCESS'">
									<div v-if="its.order_detail['order_bis_state_dsc'] == 'PENDING_ASSIGN' || its.order_detail['order_bis_state_dsc'] ==  'PENDING_DOOR'"
										 class="but_coms_but4"
										 @click.stop="call(its.store_info.store_phone)">联系商家</div>
								</template>

								<!--<div v-else-if="its.order_is_peddling == 0 && its.order_state == 0" class="but_coms_but3" @click.stop="ofgshow(its, index)">去付款</div>-->
								<!--<div v-if="its.order_state == 1" class="but_coms_but3" @click.stop="ofgshow(its, index)"></div>-->

								<template v-if="its.order_detail['order_bis_state_dsc'] == 'PENDING_EVALUATE' && its.order_detail['order_pay_state_dsc'] != 'PENDING_PAY'">
									<div class="but_coms_but2" @click.stop="menvaluate(its,index)">评价</div>
									<!--<div class="but_coms_but4" @click.stop="eval">评价说明</div>-->
								</template>
								<div v-if="its.order_detail.order_type != 4 && (its.order_detail['order_pay_state_dsc'] == 'PAY_SUCCESS' &&
                  (its.order_detail['order_bis_state_dsc'] == 'COMPLETED' || its.order_detail['order_bis_state_dsc'] == 'CLOSED')) ||
                  its.order_detail['order_pay_state_dsc'] == 'REFUNDED'" class="but_coms_but1" @click.stop="shows(its,1)">
									删除订单
								</div>
							</div>
						</li>
					</ul>
				</scroller>
			</div>
		</div>

		<van-popup class='ruleBox' v-model="rule" position="right">
			<van-nav-bar class="" title="订单说明" left-arrow @click-left="closeLay"></van-nav-bar>
			<p>1.您发布的需求，在您指定的预约时间，如果仍然没有人接单（通常是因为价格过低），帮家洁平台将会自动将您的需求取消，如果您想使需求继续生效，可以通过修改，调整预约时间来使需求重新生效。</p>
			<p>2.您购买的产品，从产品的购买时间算起，逾期15天，如果您在15天内，没有操作确认收货的话，平台将自动确认为您已收货，并更新订单状态为已完成，请您务必及时关注您的订单。</p>
			<p>3.您购买的服务，从服务的开始时间算起，逾期3天，如果您在3天内，没有操作确认服务完成的话，平台将自动确认更新订单状态为服务完成，并请您务必及时关注您的订单。</p>
		</van-popup>
		<orderConfirmation v-model="payShow" :orderData="orderData" :orderType="4"></orderConfirmation>

	</div>
</template>

<script>
	import api from '@/api/api'
	import orderState from '@/components/orderState'
	import utils from '@/utils/utils'
	import orderConfirmation from '@/components/order_confirmation'
	export default {
		components: {
			orderState,
			orderConfirmation
		},
		data() {
			return {
				end: false,
				firstFinish: false,
				page: 1,
				price_type:'',
				wechat: false,
				onshows: true,
				uploadFileUrl: api.uploadFileUrl + '/',
				fgshow: false,
				rule: false,
				paylist: [{
						name: '支付宝',
						type: 'alipay',

					},
					{
						name: '微信',
						type: 'wechat',
					},
					{
						name: '银行',
						type: 'bankcard',
					}
				],
				tabs: [{
						name: '全部'
					},
					{
						name: '待付款'
					},
					{
						name: '待接单'
					},
					{
						name: '待服务'
					},
					{
						name: '待评价'
					},
          {
            name: '已关闭'
          }
				],
				num: sessionStorage.getItem('orderIndex') || 0, //tab
				numlist: 0, //综合
				numlist2: 0, //建议方式
				inishow: false,
				ids: '', //
				list_com: [],
				order_sign: '',
				order_sn: '',
				listits: {},
				oits_list: {},
				payShow:false,
				orderData:{},
        loading: false
			}
		},
		mounted() { //生命周期
			if(this.$route.query.index) {
				this.num = this.$route.query.index
			}
      this.listget(this.num)
		},
		methods: { //方法
			//			打电话
			call(info) {
				if(info) {
					window.location.href = "tel:" + info
				} else {
					this.$toast('拨号失败！')
				}
			},
			replaceStyle(str) {
				const reg = /<[^<>]+>/g
				return str.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(reg, '');
			},
			listget(index) {
				let that = this
				let lists = {}
        lists.page = 1
        if (index == 1) {
          lists.condition = {
            "order_state": 0
          }
        } else if (index == 2) {
          lists.condition = {
            "order_state": 1
          }
        } else if (index == 3) {
          lists.condition = {
            "order_state": 2
          }
        } else if (index == 4) {
          lists.condition = {
            "order_rate": 1,
            "order_comment_id": 0,
            "order_state": 3
          }
        } else if (index == 5) {
				  lists.condition = {
				    'order_state': 4
          }
        } else {
          lists.condition = {
            "order_type <>": 3
          }
        }

				that.$fetch('ouser_get_order', lists).then(rs => {
						that.list_com = rs; //覆盖本地数据
					if(rs.length != 10) { //如果数据长度小于10证明下次请求没有数据
						that.$refs.list_com_order.finishInfinite(true); //执行组件完成上拉方法(true代表没有数据)
						that.end = true
					} else {
						that.$refs.list_com_order.finishInfinite(false); //执行组件完成上拉方法(true代表没有数据)
					}
					that.firstFinish = true //标记已完成第一次上拉
				})
			},
			pointRule() {
				this.rule = true;
			},
			closeLay() {
				this.rule = false;
			},
			dad(item, index) {
				let that = this
				//				console.log(item)
				that.ids = item.id
				if(item.id == 1) {
					if(that.inishow == true) {
						that.inishow = false
					} else {
						that.inishow = !that.inishow
					}
				} else if(item.id == 3) {
					if(that.inishow == true) {
						that.inishow = false
					} else {
						that.inishow = !that.inishow
					}
				} else {
					that.inishow = false
				}
			},

			onClickLeft() {
				// this.$router.back(-1)
				this.$router.push({
					path: '/home'
				})
			},
			//详情
			detailst(its, index) {
        this.$router.push({
					path: '/orderDetails',
					query: {
						order_snx: its.order_detail.order_sn
					}
				})
			},
			//tab
			tab(index, page, done) {
				let that = this
        that.num = index
        that.end = false
				let lists = {}
				lists.page = page || 1;

        that.loading = (lists.page == 1)
				if (index == 1) {
					lists.condition = {
						"order_state": 0
					}
				} else if (index == 2) {
					lists.condition = {
						"order_state": 1
					}
				} else if (index == 3) {
					lists.condition = {
						"order_state": 2
					}
				} else if (index == 4) {
					lists.condition = {
						"order_rate": 1,
						"order_comment_id": 0,
						"order_state": 3
					}
				} else if (index == 5) {
          lists.condition = {
            'order_state': 4
          }
        } else {
					lists.condition = {
						"order_type <>": 3
					}
				}
        that.$fetch('ouser_get_order', lists).then(rs => {
          that.loading = false
          lists.page == 1 ?  that.list_com = rs : that.list_com = that.list_com.concat(rs)
          that.page = lists.page
          sessionStorage.setItem('orderIndex',index)
          rs.length != 10 ? that.end = true : 1
          if (done) {
            if (rs.length != 10) {
              setTimeout(() => {
                done(true)
              })
            } else {
              setTimeout(() => {
                done()
              })
            }
          }
        }).catch(e => {
          that.loading = false
          if (done) {
            setTimeout(() => {
              done(true)
            })
          }
        })
			},

			menvaluate(its, index) {
				let that = this
				that.$router.push({
					path: '/menvaluate',
					query: {
						//						its:JSON.stringify(its)
						order_snx: its.order_detail.order_sn
					}
				})
			},

			//			支付
			ofgshow(its, index) {
				this.orderData.order_sn = its.order_detail.order_sn;
				this.orderData.total = Number(its.payment.order_amount);
				this.orderData.order_pay_way = its.payment.order_pay_way;
				this.orderData.order_deductible_type = its.payment.order_deductible_type;
				this.payShow = true;
			},
			//打开
			shows(its, isdelete) {
        if (!isdelete) {
          this.$dialog.alert({
            title: "提示",
            message: '服务开始前24小时外取消，订单金额100%退还;服务开始前24-2小时取消，订单金额退还80%; 服务开始前2小时内取消，订单金额退还50%。确认要取消订单吗？',
            showCancelButton: true,
          }).then(() => {
            this.$fetch('user_cancel_order', {}, its.order_detail.order_sn).then(rs => {
              this.tab(this.num)
              this.$toast('取消成功')
            })
          }).catch(() => {

          })
        } else {
          this.$dialog.alert({
            title: "提示",
            message: '确认要删除订单吗',
            showCancelButton: true,
          }).then(() => {
            this.$fetch('order_delete', {}, its.order_detail.order_sn).then(rs => {
              this.tab(this.num)
              this.$toast('删除成功');
            })
          }).catch(() => {

          })
        }
			},
			//			付款
			fgbut() {
				let that = this
				that.fgshow = false

			},
			fgxuz(fgitem, index) {
				let that = this
				that.num = index

			},
			qdfk() {
				let that = this
				if(that.onshows) {
					let order_sign = that.order_sign
					let order_sn = that.order_sn
					let price_type = that.price_type
					utils.pay(order_sn, order_sign,'orderDetails', 'orderDetails',price_type);
					that.onshows = false
					//					window.location.href = `http://jiajie-server.7dugo.com/order.pay?order_sign=${order_sign}&order_sn=${order_sn}`
				}
			},
			eval() {
				this.$dialog.alert({
					title: "评价说明",
					message: '订单如果逾期没有评价的话（默认从订单的服务开始时间算起，逾期时间为3天），平台将自动给予好评，逾期时间请参考订单的规则。',
				});
			},
			infinite(done) { //上拉方法
				var that = this;
				if(that.firstFinish) { //如果初始化完成才能继续上拉
					if(that.end) { //如果end == true代表已无数据
						setTimeout(() => {
							done(true) //true返回已无数据
						}, 1500)
						return
					} else {
            this.tab(that.num, that.page + 1, done)
					}
				}
			},
		},
	}
</script>

<style scoped>
	.find {
		width: 100%;
		height: 100%;
		background: #f5f5f5;
		position: relative;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.top_nav {
		position: relative;
		height: calc(100% - 1.05rem);
		overflow: auto;
	}

	.po_div {
		position: fixed;
		top: 1.02rem;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .2);
		z-index: 9999;
	}

	.top_nav_ul {
		display: flex;
		background: #fff;
		border-bottom: .02rem solid #eee;
	}
	/*下单时间*/

	.item_sj {
		padding: 0 0.2rem;
	}

	.item_sj>div {
		display: flex;
		justify-content: space-between;
		padding: 0.02rem 0;
		font-size: .12rem;
		color: #b2b2b2;
	}

	.top_nav_ul>li {
		text-align: center;
		height: .54rem;
		line-height: .54rem;
		flex: 0 0 16.6%;
		position: relative;
	}

	.li_style {
		color: #18B4ED;
	}

	.li_style:before {
		content: '';
		position: absolute;
		left: 50%;
		bottom: 0;
		background: #18b4ed;
		width: 0.12rem;
		margin-left: -0.06rem;
		margin-bottom: -0.02rem;
		height: 0.02rem;
	}

	.van-nav-bar {
		background: #18b4ed;
	}

	.top_nav_img {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	/*.top_nav_img img{
        width: .1rem;
    }*/

	.spanimg {
		margin: .02rem 0 0 .05rem;
		width: .1rem;
		height: .1rem;
		background: url(../../../static/images/bot_s.png) no-repeat;
		background-size: .1rem;
	}

	.spanimg_s {
		margin: .02rem 0 0 .05rem;
		width: .1rem;
		height: .1rem;
		background: url(../../../static/images/bot_h.png) no-repeat;
		background-size: .1rem;
	}

	.spanimg_h {
		margin: .02rem 0 0 .05rem;
		width: .1rem;
		height: .1rem;
		background: url(../../../static/images/top_s.png) no-repeat;
		background-size: .1rem;
	}

	.po_div_li {
		height: .44rem;
		line-height: .44rem;
		padding: 0 .2rem;
		background: #fff;
		border-bottom: 0.01rem solid #eee;
	}

	.po_div_li span {
		display: block;
		height: .44rem;
		line-height: .44rem;
	}

	.po_div_li2 {
		background: #fff;
		display: flex;
		padding: .25rem 2.5%;
	}

	.po_div_li2_div {
		border: 0.01rem solid #eee;
		border-radius: .05rem;
		flex: 0 0 30%;
		padding: 2% 0;
		text-align: center;
	}

	.po_div_li2_div_h {
		display: block;
		border: 0.01rem solid #18B4ED;
		color: #18B4ED;
		border-radius: .05rem;
		padding: .08rem 0;
		text-align: center;
	}

	.po_div_li2 div:nth-child(2) {
		margin: 0 2.5%;
	}
	/*列表*/

	.commodity {
		background: #f5f5f5;
	}

	.commodity ul {
		background: #f5f5f5;
	}

	.list_coms {
		margin-top: .1rem;
		background: #fff;
	}

	.com_li {
		margin-bottom: 0.1rem;
		background: #fff;
		padding: 0 0 0.2rem 0;
	}

	.com_tit {
		font-size: .12rem;
		color: #b2b2b2;
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

	.com_com {
		display: flex;
	}

	.com_com>div:nth-child(1) {
		flex: 0 0 .9rem;
		margin: .08rem;
		border-radius: .1rem;
		overflow: hidden;
	}

	.com_com>div:nth-child(1) img {
		width: .9rem;
		height: .9rem;
	}

	.com_com_x {
		position: relative;
		flex: 1;
		margin-top: .1rem;
		margin-right: .15rem;
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
		width: 2.55rem;
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
		padding: 0 .15rem;
		background: #fff;
	}

	.but_coms div {
		margin: .08rem 0 .08rem .1rem;
		flex: 0 0 .72rem;
		height: .14rem;
		line-height: .14rem;
		text-align: center;
		padding: .08rem .05rem;
		background: #fff;
		border: 0.01rem solid #B2B2B2;
		border-radius: .3rem;
		font-size: .12rem;
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

	.ruleBox {
		width: 100%;
		height: 100%;
		font-size: 0.14rem;
	}

	.ruleBox p {
		color: #999;
		padding: 0 0.1rem;
		margin: 0.1rem 0;
    text-indent: 2em;
	}

	.left {
		display: flex;
		align-items: center;
	}

</style>
<style type="text/css">
	.find .van-dialog__message {
		font-size: 0.12rem !important;
	}

	.find .van-nav-bar__text {
		color: white;
		font-size: 0.12rem !important;
	}
</style>
