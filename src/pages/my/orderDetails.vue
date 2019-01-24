<template>
	<div class="orderd" >

    <van-nav-bar title="订单详情" left-arrow @click-left="onClickLeft" />

		<div class="box" v-if="Object.keys(addslists).length">

			<!--点列表进来-->
			<!--点列表进来-->
			<!--点列表进来-->
			<!--点列表进来-->
			<div>
				<!--地图-->
				<div style="position: relative;height: 2rem;">
					<!--<addvue :lng="lng" :lat="lat"> </addvue>-->
					<amap-manager :center="[lng,lat]"></amap-manager>
				</div>
				<!--地图end-->
				<div class="adds">
					<div>
						<img src="../../assets/img/address.png" />
					</div>
					<div class="addsri">
						<div class="lrm">
							<div style="color:black">
								联系人：{{addslists.server_info.contact_name}}
							</div>
							<div>
								{{addslists.server_info.telephone}}

							</div>
						</div>

						<div class="addcor" style="color:black">
							联系地址：{{addslists.server_info.address_name}}<span v-if="addslists.server_info.house_number != '无门牌号' ">{{addslists.house_number}}</span>
						</div>

					</div>
				</div>

				<div class="com_box">
					<ul>
						<li class="list_coms">
							<div class="com_com">
								<div style="position: relative;">
									<div class="sys" v-if="addslists.order_detail.is_sys_order" style="position: absolute;top: 0;right: 0;background: #f00;color: #fff;font-size: .12rem;">周期</div>
									<img src="../../assets/img/logo_h.png" v-if="addslists.order_detail.order_pic == ''" />
									<img :src="uploadFileUrl + addslists.order_detail.order_pic[0]" v-else/>
								</div>
								<div class="com_com_x">
									<div class="com_com_x_tit">
										<div>{{addslists.order_detail.order_name}}</div>
                    <order-state :order_info="addslists" :is_store_page="false" style="flex: 0 0 .6rem;"></order-state>
									</div>
									<div class="com_com_x_ov" v-clampy="3" v-html="replaceStyle(addslists.order_detail.order_info)"></div>
									<!--<div class="com_com_x_score">
                                      <div>
                                          <span>评分:</span>
                                          <span class="com_com_x_score_colco">{{addslists.p_score}}</span>
                                      </div>
                                      <div>
                                          <span>已售:</span>
                                          <span class="com_com_x_score_colco">{{addslists.xis}}</span>
                                      </div>
                                  </div>-->
									<div class="com_com_x_score2">
										<div>
											￥{{addslists.payment.order_amount}}
										</div>
									</div>
								</div>

							</div>

							<div class="order_but">
								<div v-if="(addslists.order_detail['order_bis_state_dsc'].indexOf(['SET_UP', 'PENDING_ORDER', 'PENDING_ASSIGN', 'PENDING_DOOR']) > -1 && addslists.order_detail['order_bis_state_dsc'] != 'COMPLETED' && addslists.order_detail['order_bis_state_dsc'] != 'CLOSED') || addslists.order_detail['order_pay_state_dsc'] == 'PENDING_PAY'" class="but_coms_but1" @click.stop="shows(addslists)">
                  取消订单
								</div>
								<div v-if="addslists.order_detail['order_pay_state_dsc'] == 'PENDING_PAY' && !addslists.order_detail.is_non_resevation_order && addslists.order_detail['order_type'] != 4 " class="but_coms_but3" @click.stop="payShow(addslists)">
                  去支付
								</div>
								<div v-if="addslists.order_detail['order_bis_state_dsc'] == 'PENDING_ASSIGN' || addslists.order_detail['order_bis_state_dsc'] ==  'PENDING_DOOR'"class="but_coms_but4" @click="call(addslists)">
                  联系商家
								</div>
								<template v-if="addslists.order_detail['order_bis_state_dsc'] == 'PENDING_EVALUATE'">
									<!--<div style="border:none; padding:0; color:#18b4ed;margin-right: 1.5rem;" @click.stop="eval">评价说明</div>-->
									<div class="but_coms_but2" @click.stop="menvaluate(addslists)">评价</div>
								</template>
								<div v-if="addslists.order_detail['order_pay_state_dsc'] == 'PAYING' || addslists.order_detail['order_bis_state_dsc'] == 'COMPLETED' || addslists.order_detail['order_bis_state_dsc'] == 'CLOSED'" class="but_coms_but1" @click.stop="shows(addslists)">
									删除订单
								</div>
							</div>
						</li>
					</ul>
				</div>

				<div class="oredrs">
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
              <div v-if="addslists.order_detail.is_non_resevation_order">免预约金</div>
							<div v-else-if="addslists.payment.order_actual_amount == 0">
								<span v-if="addslists.order_deductible_type == 1">余额</span>
								<span v-else-if="addslists.order_deductible_type == 2">积分</span>抵扣
							</div>
							<div v-else>
								<div v-if="addslists.payment.order_pay_way == 'alipay'">支付宝</div>
								<div v-else-if="addslists.payment.order_pay_way == 'wechat'">微信</div>
								<div v-else>银行卡</div>
							</div>
						</li>
						<li>
							<div>下单时间</div>
							<div>{{addslists.time_record.add_time}}</div>
						</li>
						<li v-if="addslists.order_detail.order_type == 1 && !addslists.time_record.next_order_at">
							<div>服务时间</div>
							<div>{{addslists.time_record.contact_appointment_at}}</div>
						</li>
						<li v-if="addslists.time_record.next_order_at">
                <div>下期服务时间</div>
                <div>{{addslists.time_record.next_order_at}}</div>
            </li>
					</ul>
				</div>

				<!--弹出窗-->
				<div class="po_box" v-show="isshow" @click.stop="xbut">
					<div class="po_box_div">
						<div class="po_box_div_tit">提示</div>
						<div class="po_box_div_com" v-if="addslists.order_detail.order_state == 4 || addslists.order_detail.order_rate == 1 || addslists.order_detail.order_rate == -1 || addslists.order_detail.order_state == 5">
							确定要删除此订单？
						</div>
						<div class="po_box_div_com" v-else>
							确定要取消此订单？
						</div>
						<div class="po_box_but">
							<div @click.stop="xbut">取消</div>
							<div @click.stop="spilits">确认</div>
						</div>
					</div>
				</div>
				<!--弹出窗-->
			</div>
		</div>
		<orderConfirmation v-model="toPayShow" :orderData="orderData" :orderType="4"></orderConfirmation>
	</div>
</template>

<script>
	/*
			 		<div v-if="this.$route.query.order_sn">
							<!--地图-->
							<div style="position: relative;height: 2rem;">
								<addvue :lng="lng" :lat="lat"> </addvue>
							</div>
							<!--地图end-->
							<div class="adds">
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
										联系地址：{{addslists.server_info.address_name}}{{addslists.server_info.house_number}}
									</div>
								</div>
							</div>

							<div class="com_box">
								<ul>
									<li class="list_coms">
										<div class="com_com">
											<div>
												<img src="../../assets/img/logo_h.png" v-if="list_com.subject_img == ''" />
												<img :src="uploadFileUrl + list_com.subject_img[0]" v-else/>

											</div>
											<div class="com_com_x">
												<!--<div class="com_com_ri" v-if="addslists.type == 1">
			                                      企业
			                                  </div>-->
												<div class="com_com_x_tit">
													{{addslists.order_detail.order_name}}
												</div>
												<div class="com_com_x_ov" v-clampy="3" v-html="replaceStyle(addslists.order_info)"></div>
												<!--<div class="com_com_x_score">
			                                      <div>
			                                          <span>评分:</span>
			                                          <span class="com_com_x_score_colco">{{addslists.p_score}}</span>
			                                      </div>
			                                      <div>
			                                          <span>已售:</span>
			                                          <span class="com_com_x_score_colco">{{addslists.xis}}</span>
			                                      </div>
			                                  </div>-->
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

							<div class="oredrs">
								<ul>
									<li>
										<div>订单编号</div>
										<div>{{addslists.order_detail.order_sn}}</div>
									</li>
									<li>
										<div>支出</div>
										<div style="color: #f00;">{{addslists.order_detail.order_amount}}</div>
									</li>
									<li>
										<div>支付方式</div>
										<div v-if="addslists.order_actual_amount == 0">
											<span v-if="addslists.order_deductible_type == 1">余额</span>
											<span v-else-if="addslists.order_deductible_type == 2">积分</span> 抵扣
										</div>
										<div v-else>
											<div v-if="addslists.order_pay_way == 'alipay'">支付宝</div>
											<div v-else-if="addslists.order_pay_way == 'wechat'">微信</div>
											<div v-else>银行卡</div>
										</div>
									</li>
									<li>
										<div>下单时间</div>
										<div>{{addslists.time_record.pay_time}}</div>
									</li>
									<li>
										<div>服务时间</div>
										<div>{{addslists.time_record.contact_appointment_at}}</div>
									</li>
									<!--<li>
			                      <div>预约时间</div>
			                      <div>2018-07-04 16：23：40</div>
			                  </li>-->
								</ul>
							</div>

							<!--<div class="order_but">
			                  <div v-if="list_com.payment == 11" class="but_coms_but1">取消订单</div>
			                  <div v-if="list_com.payment == 11" class="but_coms_but3" @click.stop="ofgshow()">去付款</div>
			                  <div v-else-if="list_com.payment == 12" class="but_coms_but2">评价</div>
			                  <div v-else-if="list_com.payment == 14" class="but_coms_but4">联系商家</div>
			                  <div v-else="list_com.payment == 13" class="but_coms_but1">
			                      删除订单
			                  </div>

			              </div>-->

							<!--弹出窗-->
							<!--<div class="fug_box" v-show="fgshow" @click.stop="fgbut()">
			                  <transition name="slide-fade">
			                      <div class="fug_box_po" v-show="fgshow">
			                          <div class="fg_fangs">
			                              选择支付方式
			                          </div>
			                          <ul>
			                              <li v-for="(fgitem,index) in fglist" @click.stop="fgxuz(fgitem,index)">
			                                  <div>
			                                      <img :src="fgitem.imgs" />
			                                      <span>
			                                                              {{fgitem.name}}
			                                                          </span>
			                                  </div>
			                                  <div :class="{fg_imgsb : index == num}">

			                                  </div>
			                              </li>
			                          </ul>
			                      </div>
			                  </transition>
			              </div>-->
							<!--<div class="addsa" v-show="addshow" @click.stop="opadd()">
			                  <div class="addsa_div">
			                      <ul>
			                          <li v-for="(aditem,index) in addslists" @click="indexadd(aditem,index)">
			                              <div class="addsri">
			                                  <div class="lrm">
			                                      <div>
			                                          联系人：{{aditem.contact_name}}
			                                      </div>
			                                      <div>
			                                          {{aditem.telephone_number}}
			                                      </div>
			                                  </div>

			                                  <div class="addcor">
			                                      联系地址：{{aditem.contact_house_number}}
			                                  </div>
			                              </div>
			                          </li>
			                      </ul>
			                  </div>
			              </div>-->
						</div>
			 * */
	import api from '@/api/api'
	import addvue from '@/page/mem/addvue'
	import orderState from '@/components/orderState'
	import utils from '@/utils/utils'
	import orderConfirmation from '@/components/order_confirmation'
	import amapManager from '@/components/amapManager'
	export default {
		components: {
			addvue,
			orderState,
			orderConfirmation,
			amapManager
		},

		data() {
			return {
				toPayShow:false,
				orderData:{},
				addshow: false,
				isshow: false,
				indexs: '',
				num: '',
				uploadFileUrl: api.uploadFileUrl + '/',
				addslists: {},
				addnema: '',
				addtel: '',
				addaddres: '',
				listits: {},
				lng: '',
				lat: '',
				order_sign: '',
				order_sn: '',
				token: this.$store.state.token,
				oits_list: '',

			}
		},
		created () {
			this.order_getby()
		},
		methods: {
			call(info) {
				console.log(info.store_info.store_phone)
				if(info.store_info.store_phone) {
					window.location.href = "tel:" + info.store_info.store_phone
				} else {
					this.$toast('拨号失败！')
				}
			},
			qdfk() {
				let that = this
				let order_sign = that.order_sign
				let order_sn = that.order_sn
				utils.pay(order_sn,order_sign);

			},
			//			支付
			payShow(its) {
				this.order_sn = its.order_detail.order_sn
				this.orderData.order_sn = its.order_detail.order_sn;
				this.orderData.total = Number(its.payment.order_amount);
				this.orderData.order_pay_way = its.payment.order_pay_way;
				this.orderData.order_deductible_type = its.payment.order_deductible_type;
				this.toPayShow = true
			},
			shows(its) {
				let that = this
				console.log(its)
				that.isshow = true
				that.oits_list = its.order_detail.order_sn
			},
			menvaluate(its) {
				let that = this
				that.$router.push({
					path: '/menvaluate',
					query: {
						order_snx : that.$route.query.order_snx
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
				that.$fetch('order_get', {}, that.$route.query.order_snx).then(rs => {
					that.addslists = rs.order_info
					that.lat = rs.order_info.server_info.order_lat
					that.lng = rs.order_info.server_info.order_lng
				})

			},
			onClickLeft() {
			  if (this.$route.query.payOrder && this.addslists.order_detail.order_type == 1) {//服务
			    this.$router.push('/orders')
        } else if (this.$route.query.payOrder && this.addslists.order_detail.order_type == 2) {//需求
          this.$router.push('/myfb')
        } else {
          this.$router.back(-1)
        }
			},
			//	刪除或取消
			spilits() {
				let that = this
				let t
				if(that.addslists.order_detail.order_state == 0 || that.addslists.order_detail.order_state == 1 || that.addslists.order_detail.order_state == 2) {
					// 取消走这里
					that.$fetch('user_cancel_order', {}, that.addslists.order_detail.order_sn).then(rs => {
						that.$toast("取消成功");
						that.isshow = false
						that.order_getby()
					})
				} else {
					that.$fetch('order_delete', {}, that.addslists.order_detail.order_sn).then(rs => {
						that.$toast("删除成功");
						t = setTimeout(()=> {
							that.$router.back(-1);
						}, 1500);
					})
				}
			},
			//			关闭
			xbut() {
				let that = this
				that.isshow = false
			},
			fgxuz(fgitem, index) {
				let that = this
				that.num = index
			},
			opadd() {
				let that = this
				that.addshow = false
			},
		},

	}
</script>

<style scoped>
	.orderd {
		background: #f5f5f5;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.box {
		height: calc(100% - 0.46rem);
		overflow: auto;
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
		background: #fafafa;
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
		width: 2.15rem;
		font-size: .14rem;
		color: #707070;
		margin: 0.05rem 0;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
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
		padding: 0 .15rem;
		background: #fff;
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
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
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
