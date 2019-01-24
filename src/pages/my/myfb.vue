<template>
	<div class="find">
		<div class="top_box" v-if="payShow == true">
			<van-nav-bar title="支付" left-arrow @click-left="onpayShow" @click-right="onClickRight">
				<van-icon name="wap-nav" color="white" slot="right" />
			</van-nav-bar>
			<div v-show="rishow" @touchmove.prevent="orishow()" @click.stop="orishow()" style="position: fixed;z-index: 9999; top: 0;right: 0;left: 0;bottom: 0; background: rgba(0,0,0,0); ">
				<div style="position: absolute;z-index: 9999; top: .45rem;right: 0;width: 1rem ;background: rgba(0,0,0,.2); ">
					<head-ri></head-ri>
				</div>
			</div>
		</div>
		<div class="top_box" v-else>
			<van-nav-bar title="我的发布" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
				<van-icon name="wap-nav" color="white" slot="right" />
			</van-nav-bar>
			<div v-show="rishow" @touchmove.prevent="orishow()" @click.stop="orishow()" style="position: fixed;z-index: 9999; top: 0;right: 0;left: 0;bottom: 0; background: rgba(0,0,0,0); ">
				<div style="position: absolute;z-index: 9999; top: .45rem;right: 0;width: 1rem ;background: rgba(0,0,0,.2); ">
					<head-ri></head-ri>
				</div>
			</div>
		</div>

		<div class="top_nav">
			<ul class="top_nav_ul">
				<li v-for="(item,index) in tabs" :class="{li_style:index == num}" @click="tab(index)">
					<div class="top_nav_img" @click="dad(item,(index == 0 || index == 2))">
						{{item.name}}
					</div>
				</li>
			</ul>
			<div class="commodity">
        <scroller :on-infinite="infinite" ref="list_com_fb">
				<ul>
          <li v-if="list_com == ''" style="opacity: 0">
            暂无数据
          </li>
					<li v-for="(its,index) in list_com" class="list_coms" @click="detailst(its,index)">
						<div class="com_com_ri_box">
							<div>订单编号:{{its.order_table_sn}}</div>
							<div>
								<order-state :order_info="its.order" :is_store_page="true"></order-state>
								<!--<div v-if="its.type == 1">

								</div>
								<div class="com_com_ri" v-if="its.order.order_detail.order_state == 0">
									待付款
								</div>
								<div class="com_com_ri" v-else-if="its.order_is_pay == 1 && its.order_belong_store_id == 0 && its.order.order_detail.order_state != 4">
									待接单
								</div>

								<div class="com_com_ri" v-else-if="its.order.order_detail.order_state == 1 ">
									待服务
								</div>
								<div class="com_com_ri" v-else-if="its.order.order_detail.order_state == 3 && its.order.order_detail.order_comment_id == 0">
									待评价
								</div>
								<div class="com_com_ri" v-else-if="its.order.order_detail.order_state == 4">
									已关闭
								</div>
								<div class="com_com_ri" v-else-if="its.order.order_detail.order_state == 5">
									已完成
								</div>-->

							</div>
						</div>
						<div class="com_com">
							<div>
								<!--<img :src="uploadFileUrl + its.demand_img[0]" />-->
								<img src="../../assets/img/logo_h.png" v-if="its.demand_img == ''" />
								<img :src="uploadFileUrl + its.demand_img[0]" v-else />
								<!--<div style="text-align: center;">{{its.contact_name}}</div>-->
							</div>
							<div class="com_com_x">

								<div class="com_com_x_tit">
									{{its.cat_name}}
								</div>
								<div class="com_com_x_ov">
									{{its.demand_address_name}}
								</div>
								<div class="com_com_x_score">
									<div>
										<span>门牌号：</span>
										<span>{{its.demand_house_number}}</span>
									</div>

								</div>
								<!--<div class="com_com_x_score">
									<div>
										<span>{{its.demand_remuneration}}</span>
									</div>
								</div>-->
								<div class="com_com_x_score2">
									<div>
										￥{{its.demand_remuneration}}
									</div>

								</div>
							</div>

						</div>
						<!--anniu-->
						<div class="but_coms">
							<!--&& its.order.order_detail.order_belong_store_id-->
							<template v-if="its.order.order_detail['order_pay_state_dsc'] == 'PAY_SUCCESS'">
								<!--支付成功的按钮-->
								<!--<div v-if="its.order.order_detail['order_bis_state_dsc'] == 'PENDING_EVALUATE'" class="but_coms_but3" @click="confirm(its,index)">确认完成</div>-->
								<div v-if="its.order.order_detail['order_bis_state_dsc'] == 'PENDING_EVALUATE'" class="but_coms_but3" @click.stop="menvaluate(its,index)">
                  立即评价</div>
							</template>
							<template v-else>
              <div v-if="its.order.order_detail['order_pay_state_dsc'] == 'PENDING_PAY'" class="but_coms_but3" @click.stop="ofgshow(its, index)">
                去支付</div>
							</template>
							<!--完成-->
							<div v-if="its.order.order_detail['order_bis_state_dsc'] == 'PENDING_ASSIGN' || its.order.order_detail['order_bis_state_dsc'] ==  'PENDING_DOOR'" class="but_coms_but4" @click.stop="call(its)">
                联系商家</div>
							<div v-else-if="its.order.order_detail['order_pay_state_dsc'] == 'PAYING' || its.order.order_detail['order_bis_state_dsc'] == 'COMPLETED' || its.order.order_detail['order_bis_state_dsc'] == 'CLOSED'" class="but_coms_but1" @click.stop="shows_qx(its,index)">
                删除订单</div>
              <div v-if="['SET_UP', 'PENDING_ORDER', 'PENDING_ASSIGN', 'PENDING_DOOR'].indexOf(its.order.order_detail['order_bis_state_dsc']) > -1 || its.order.order_detail['order_pay_state_dsc'] == 'PENDING_PAY'" class="but_coms_but1" @click.stop="shows(its,index)">
                取消订单</div>
						</div>

					</li>
				</ul>
        </scroller>
			</div>
		</div>
		<orderConfirmation v-model="payShow" :orderData="orderData" :orderType="4"></orderConfirmation>
		<!--弹出窗{{its.order.order_detail['order_bis_state_dsc']}}-->
		<div class="po_box" v-show="isshow_qx" @click.stop="xbut()" v-if="order_sn.order">
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

		<div class="po_box" v-show="isshow" @click.stop="xbut()" v-if="order_sn.order">
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
	import api from '@/api/api'
	import headRi from '@/page/pages/head_ri_sub'
	import utils from '@/utils/utils'
	import orderState from '@/components/orderState'
	import orderConfirmation from '@/components/order_confirmation'
	export default {
		components: {
			orderConfirmation,
			headRi,
			orderState
		},
		data() {
			return {
        end: false,
        firstFinish: false,
        page: 1,
				payShow: false,
				rishow: false,
				uploadFileUrl: api.uploadFileUrl + '/',
				order_sn: {}, //删除用的订单号
				isshow: false,
				isshow_qx: false, // 取消订单遮罩层
				fgshow: false,
				indexs: '',
				tabs: [{
						name: '全部',
						id: 1
					},
					{
						name: '待接单',
						id: 2
					},
					{
						name: '待服务',
						id: 3
					},
					{
						name: '已完成',
						id: 4
					},
					{
						name: '已关闭',
						id: 5
					},
				],
				orderData: {},
				itemshij: new Date().valueOf() / 1000,
				num: 0, //tab
				numlist: 0, //综合
				numlist2: 0, //建议方式
				inishow: false,
				ids: '', //
				list_com: [],
				its_zf: {},
				order_sign: '',
				fglist: [{
						name: '支付宝',
						imgs: require('../../assets/img/wechat.png'),
					},
					{
						name: '微信',
						imgs: require('../../assets/img/wechat.png'),
					},
					{
						name: '银行',
						imgs: require('../../assets/img/wechat.png'),
					}
				],
				user_id: this.$store.getters.user_id

			}
		},
		mounted() { //生命周期
			this.listget()
		},
		methods: { //方法
      listget() {
        let that = this
        that.page = 1
        let forms = {}
        forms.page = that.page
        forms.condition = {
          "b.user_id": that.user_id
        }
        that.$fetch('user_get_demand', forms).then(rs => {
          that.page++ //请求页数自加
          that.list_com = rs; //覆盖本地数据
          if(rs.length != 10) { //如果数据长度小于10证明下次请求没有数据
            that.$refs.list_com_fb.finishInfinite(true); //执行组件完成上拉方法(true代表没有数据)
            that.end = true
          } else {

            that.$refs.list_com_fb.finishInfinite(false); //执行组件完成上拉方法(true代表没有数据)
          }
          that.firstFinish = true //标记已完成第一次上拉
        })
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
            that.page = 1
            var lists = {
              page: that.page
            }
            that.$fetch('ouser_get_order', lists).then(rs => {
              setTimeout(() => {
                that.page++ //请求页数自加
                that.list_com = that.list_com.concat(rs); //合并至本地数据

                if(rs.length != 10) { //如果数据长度小于10证明下次请求没有数据
                  setTimeout(() => {
                    done(true) //true返回已无数据
                  })
                  that.end = true
                } else {
                  setTimeout(() => {
                    done()
                  })
                }
              }, 1500)
            }).catch(e => {
              setTimeout(() => {
                done(true)
              })
            })
          }

        }
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
				this.$router.push('/home')
			},
			onpayShow() {
				this.payShow = false
			},
			onClickRight() {
				let that = this
				that.rishow = !that.rishow
			},
			orishow() {
				let that = this
				that.rishow = false
			},
			//详情
			detailst(its, index) {
				let that = this
				//还差个id

				that.$router.push({
					path: '/myfb_details',
					query: {
						order_sn: its.order_table_sn
					}
				})
			},
			//tab
			tab(index) {
				let that = this
				let lists = {}
				lists.rows = 500
				that.num = index;
				var qs = require('qs');
				if(index == 1) {
					lists.condition = {
						"b.order_is_pay": 1,
						"b.order_belong_store_id": 0,
						"b.order_state <>": 4,
						"b.user_id": that.user_id
					}
					that.$fetch('user_get_demand', lists).then(rs => {
						that.list_com = rs
					})
				} else if(index == 2) {
					lists.condition = {
						"b.order_state": 2,
						"b.user_id": that.user_id
					}
					that.$fetch('user_get_demand', lists).then(rs => {
						that.list_com = rs
					})
				} else if(index == 3) {
					lists.condition = {
						"b.order_state": 5,
						"b.user_id": that.user_id
					}
					that.$fetch('user_get_demand', lists).then(rs => {
						that.list_com = rs
					})
				} else if(index == 4) {
					lists.condition = {
						"b.order_state": 4,
						"b.user_id": that.user_id
					}
					that.$fetch('user_get_demand', lists).then(rs => {
						that.list_com = rs
					})
				} else {
					that.$fetch('user_get_demand', lists).then(rs => {
						that.list_com = rs
					})
				}

			},
			//			立即評論
			menvaluate(its, index) {
				console.log(its)
				let that = this
				that.$router.push({
					path: '/menvaluate',
					query: {
						order_snx: its.order_table_sn
					}
				})
			},
			call(info) {
				alert(info.order.store_info)
				if(info.order.store_info.store_phone) {
					window.location.href = "tel:" + info.order.store_info.store_phone;
				} else {
					this.$toast('拨号失败！')
				}
			},
			//确认订单
			confirm() {

			},
			//打开删除
			shows(its, index) {
				let that = this
				that.isshow = true
				that.indexs = index
				that.order_sn = its
			},
			//打开取消
			shows_qx(its, index) {
				let that = this
				that.isshow_qx = true
				that.indexs = index
				that.order_sn = its

			},
			//			shows_qx(its, index) {
			//				let that = this
			//				that.isshow_qx = true
			//				that.indexs = index
			//				if(its){
			//					that.order_sn = its.order_table_sn
			//					console.log(its.order_table_sn)
			//				}
			//			},

			// 取消订单
			//			spilits_qx(its, index) {
			//				let that = this
			//				that.$fetch('order_cancel', {}, that.order_sn).then(rs => {
			//					that.isshow_qx = false
			//					that.listRend();
			//				})
			//			},
			//	删除订单 //取消订单
			spilits() {
				let that = this
				if(that.order_sn.order) {
					console.log(that.order_sn.order.order_detail)
				}
				// 取消走这里
				that.$fetch('user_cancel_order', {}, that.order_sn.order_table_sn).then(rs => {
					that.$toast("取消成功");
					that.isshow = false
					setTimeout(() => {
            that.listget()
					}, 2000)
				})
			},
			spilitsx() {
				let that = this
				if(that.order_sn.order) {
					console.log(that.order_sn.order.order_detail)
				}
				that.$fetch('order_delete', {}, that.order_sn.order_table_sn).then(rs => {
					that.$toast("删除成功");
					that.list_com.splice(that.indexs, 1)
					that.isshow_qx = false
					setTimeout(() => {
						that.listRend()
					}, 2000)
				})
			},
			//			关闭
			xbut() {
				let that = this
				that.isshow_qx = false
				that.isshow = false
			},

			//	支付
			ofgshow(its, index) {
				let that = this
				that.orderData.order_sn = its.order_table_sn;
				that.orderData.total = Number(its.demand_remuneration); //价钱
				that.orderData.successUrl = "myfb";
				that.orderData.order_pay_way = its.demand_price_type; //支付
				that.orderData.order_deductible_type = its.order.payment.order_deductible_type;
				that.payShow = true;
			},

		},
	}
</script>

<style scoped>
	[v-cloak] {
		display: none !important;
	}
	.find {
		width: 100%;
		height: 100%;
		background: #f5f5f5;
	}

	.top_box {
		width: 100%;
		/*position: absolute;*/
		top: 0;
		z-index: 9999;
	}

	.top_nav {
		/*margin-top: .46rem;*/

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
		overflow: auto;
	}

	.top_nav_ul {
		display: flex;
		background: #fff;
		border-bottom: .02rem solid #eee;
	}

	.top_nav_ul>li {
		text-align: center;
		height: .54rem;
		line-height: .54rem;
		flex: 0 0 20%;
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

	.com_com_ri_box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: .1rem;
	}

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
		position: absolute;
		top: 1.02rem;
		left: 0;
		right: 0;
		bottom: 0;
		background: #f5f5f5;
		overflow: auto;
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
		/*position: absolute;*/
		/*top: 0rem;*/
		/*right: 0.1rem;*/
		border: 0.01rem solid #ff9c0f;
		color: #ff9c0f;
		font-size: .12rem;
		border-radius: .05rem;
		padding: .01rem .03rem;
	}

	.com_com_x_tit {
		font-size: .16rem;
	}

	.com_com_x_ov {
		width: 2.65rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
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
		border-top: 0.01rem solid #eee;
	}

	.but_coms div {
		margin: .08rem 0 .08rem .1rem;
		flex: 0 0 .75rem;
		height: .28rem;
		line-height: .28rem;
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

	.fug_box {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		/*height: 100%;*/
		background: rgba(0, 0, 0, 0.1);
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
		font-size: .16rem;
	}
</style>
<style type="text/css">
	.find .van-nav-bar .van-icon {
		color: #fff !important;
	}
</style>
