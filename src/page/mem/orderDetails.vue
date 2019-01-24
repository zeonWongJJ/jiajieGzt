<template>
	<div class="orderd">

		<div>
			<van-nav-bar title="订单详情" left-arrow @click-left="onClickLeft2" v-if="this.$route.query.order_sn" />
			<van-nav-bar title="订单详情" left-arrow @click-left="onClickLeft" v-else/>
		</div>
		<div class="box">
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
								联系人：{{addslists.contact_name}}
							</div>
							<div>
								{{addslists.telephone}}
							</div>
						</div>

						<div class="addcor">
							联系地址：{{addslists.address_name}}{{addslists.house_number}}
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
										{{addslists.order_name}}
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
											￥{{addslists.order_amount}}
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
							<div>{{addslists.order_sn}}</div>
						</li>
						<li>
							<div>支出</div>
							<div style="color: #f00;">{{addslists.order_amount}}</div>
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
							<div>{{addslists.pay_time}}</div>
						</li>
						<li>
							<div>服务时间</div>
							<div>{{addslists.contact_appointment_at}}</div>
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

			<!--点列表进来-->
			<!--点列表进来-->
			<!--点列表进来-->
			<!--点列表进来-->
			<div v-else>
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
							<div style="color:black">
								联系人：{{addslists.contact_name}}
							</div>
							<div>
								{{addslists.telephone}}

							</div>
						</div>

						<div class="addcor" style="color:black">
							联系地址：{{addslists.address_name}}<span v-if="addslists.house_number != '无门牌号' ">{{addslists.house_number}}</span>
						</div>

					</div>
				</div>

				<div class="com_box">
					<ul>
						<li class="list_coms">
							<div class="com_tit">
								<div class="com_tit_img">
								</div>
								<div style="margin:0;">
									<order-state :order_info="addslists" :is_store_page="false"></order-state>
								</div>
							</div>
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
										{{addslists.order_name}}
									</div>
									<div class="com_com_x_ov"  v-clampy="3" v-html="replaceStyle(addslists.order_info)"></div>
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
											￥{{addslists.order_amount}}
										</div>
									</div>
								</div>

							</div>

							<div class="order_but">
								<div v-if="addslists.order_state == 0 || addslists.order_state == 1 || (addslists.order_state == 2 && addslists.order_rate == 0)" class="but_coms_but1" @click.stop="shows(addslists)">取消订单
								</div>
								<div v-if="addslists.order_state == 0 && addslists.order_rate == 0" class="but_coms_but3" @click.stop="payShow(addslists)">去支付
								</div>
								<!--<div v-if="its.order_state == 1" class="but_coms_but3" @click.stop="ofgshow(its, index)"></div>-->
								<div v-if="addslists.order_state == 3 && addslists.order_rate == 0" class="but_coms_but4" @click="call(addslists.store_info)">联系商家
								</div>
								<template v-if="addslists.order_comment_id == 0 && addslists.order_state == 3 && addslists.order_rate == 1">
									<!--<div style="border:none; padding:0; color:#18b4ed;margin-right: 1.5rem;" @click.stop="eval">评价说明</div>-->
									<div class="but_coms_but2" @click.stop="menvaluate(addslists)">评价</div>
								</template>

								<div v-if="addslists.order_state == 4 || addslists.order_rate == 1 || addslists.order_rate == -1 || addslists.order_state == 5" class="but_coms_but1" @click.stop="shows(addslists)">
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
							<div>{{addslists.order_sn}}</div>
						</li>
						<li>
							<div>支出</div>
							<div style="color: #f00;">{{addslists.order_amount}}</div>
						</li>
						<li>
							<div>支付方式</div>
							<div v-if="addslists.order_actual_amount == 0">
								<span v-if="addslists.order_deductible_type == 1">余额</span>
								<span v-else-if="addslists.order_deductible_type == 2">积分</span>抵扣
							</div>
							<div v-else>
								<div v-if="addslists.order_pay_way == 'alipay'">支付宝</div>
								<div v-else-if="addslists.order_pay_way == 'wechat'">微信</div>
								<div v-else>银行卡</div>
							</div>
						</li>
						<li>
							<div>下单时间</div>
							<div>{{addslists.add_time}}</div>
						</li>
						<li>
							<div>服务时间</div>
							<div>{{addslists.contact_appointment_at}}</div>
						</li>
						<!--<li>
                      <div>预约时间</div>
                      <div>2018-07-04 16：23：40</div>
                  </li>-->
					</ul>
				</div>

				<div class="fug_box" v-show="fgshow" @click.stop="fgbut()">
					<transition name="slide-fade">
						<div class="fug_box_po" v-show="fgshow">
							<div class="fg_fangs">
								支付信息
							</div>
							<div style="display: flex;justify-content: space-between;padding: .1rem .2rem;border-bottom: 0.01rem solid #eee;">
								<div>订单号</div>
								<div>{{addslists.order_sn}}</div>
							</div>
							<div style="display: flex;justify-content: space-between;padding: .1rem .2rem;border-bottom: 0.01rem solid #eee;">
								<div>支付方式</div>
								<div>{{addslists.order_pay_way}}</div>
							</div>
							<div style="display: flex;justify-content: space-between;padding: .1rem .2rem;border-bottom: 0.01rem solid #eee;">
								<div>支付金额</div>
								<div>{{addslists.order_actual_amount}}元</div>
							</div>
							<div class="fg_fangs" @click.stop="qdfk()">
								确 定 支 付
							</div>
						</div>
					</transition>
				</div>
				<!--弹出窗-->
				<div class="po_box" v-show="isshow" @click.stop="xbut">
					<div class="po_box_div">
						<div class="po_box_div_tit">提示</div>
						<div class="po_box_div_com" v-if="addslists.order_state == 0 || addslists.order_state == 5 || addslists.order_state == 4">
							确定要进行此操作吗？将会不可恢复
						</div>
						<!--<div class="po_box_div_com" v-else-if="addslists.order_state == 0 || addslists.order_state == 1 || addslists.order_state == 2">
							确定要取消此订单？
						</div>-->
						<div class="po_box_but">
							<div @click.stop="xbut">取消</div>
							<div @click.stop="spilits">确认</div>
						</div>
					</div>
				</div>
				<!--弹出窗-->
			</div>
		</div>
	</div>
</template>

<script>
	import api from '@/api/api'
	import addvue from '@/page/mem/addvue'
	import orderState from '@/components/orderState'

	export default {
		components: {
			addvue,
			orderState,
		},

		data() {
			return {
				addshow: false,
				isshow: false,
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
			call(info){
				if(inof.store_phone){
					window.location.href = "tel:" + info.store_phone;
				}else{
					this.$toast('拨号失败！')
				}
			},
			//			付款
			fgbut() {
				let that = this
				that.fgshow = false

			},
			qdfk() {
				let that = this
				let token = encodeURIComponent(that.token)
				let order_sign = that.order_sign
				let order_sn = that.order_sn
				window.location.href = `http://jiajie-server.7dugo.com/order.pay?order_sign=${order_sign}&order_sn=${order_sn}`

			},
			//			支付
			payShow(its) {
				let that = this
				that.listits = its
				switch(its.order_pay_way) {
					case 'wechat':
						that.listits.order_pay_way = '微信支付'
						break;
					case 'alipay':
						that.listits.order_pay_way = '支付宝支付';
						break;
					case 'bankcard':
						that.listits.order_pay_way = '银联支付';
						break;
				}
				that.order_sn = its.order_sn
				that.$fetch('order_sign_get', {}, its.order_sn).then(rs =>{
          that.fgshow = true
          that.order_sign = rs.order_sign
				})
			},
			shows(its) {
				let that = this
				that.isshow = true
				//				that.indexs = index
				that.oits_list = its
			},
			menvaluate(its) {
				let that = this
				that.$router.push({
					path: '/menvaluate',
					query: {
						its
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
				if(that.$route.query.order_sn) {
					that.$fetch('order_getby_sn', {}, that.$route.query.order_sn).then(rs =>{
            that.addslists = rs.order_info
            that.list_com = rs.entity_row
            that.lat = that.list_com.lat
            that.lng = that.list_com.lng
					})
				} else {
					that.olist()
					that.$fetch('order_get', {}, that.$route.query.its.order_sn).then(rs =>{
            that.addslists = rs.order_info
            that.list_com = rs.entity_row
            that.lat = that.list_com.lat
            that.lng = that.list_com.lng
					})
				}

			},
			//			地址列表
			//			oaddlists() {
			//				let that = this
			//				let forms = {}
			//				forms.row = 50
			//				var qs = require('qs');
			//				that.axios({
			//						method: 'post',
			//						headers: {
			//							"Content-Type": "application/x-www-form-urlencoded"
			//						},
			//						url: api.user_address_list,
			//						data: qs.stringify(forms) //传参变量
			//					})
			//					.then(function(res) {
			//						console.log(res.data.data)
			//						if(res.data.error == 0) {
			//							that.addslists = res.data.data
			//
			//						} else {
			//							//					this.$toast(res.data.msg)
			//							that.$toast(res.data.msg);
			//						}
			//					})
			//			},
			indexadd(aditem, index) {
				let that = this
				that.addnema = aditem.contact_name
				that.addtel = aditem.telephone_number
				that.addaddres = aditem.contact_house_number

				console.log(aditem)
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
				this.$router.back(-1)
			},
			onClickLeft2() {
				this.$router.push({
					path: '/member'
				})
			},
			//打开
			shows(its) {
				let that = this
				that.isshow = true
				//				that.indexs = index
			},
			//			刪除或取消
			spilits() {
				let that = this
				if(that.addslists.order_state == 0 || that.addslists.order_state == 1 || that.addslists.order_state == 2) {
					// 取消走这里
					that.$fetch('user_cancel_order', {}, that.addslists.order_sn).then(rs =>{
            that.$toast("取消成功");
            that.isshow = false
            that.order_getby()
					})
				} else {
					that.$fetch('order_delete', {}, that.addslists.order_sn).then(rs =>{
            that.$toast("删除成功");
            t = setTimeout(function() {
              that.$router.back(-1);
            }, 2000);
					})
				}
			},
			//			关闭
			xbut() {
				let that = this
				that.isshow = false
			},
			//			付款
			ofgshow() {
				let that = this
				that.fgshow = true
			},
			fgbut() {
				let that = this
				that.fgshow = false
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
