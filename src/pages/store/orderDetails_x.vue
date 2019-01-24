<template>
	<div class="orderd">
		<div>
			<van-nav-bar title="订单详情" left-arrow @click-left="onClickLeft2" v-if="this.$route.query.order_sn" />
			<van-nav-bar title="订单详情" left-arrow @click-left="onClickLeft" v-else/>
		</div>
		<div v-if="this.$route.query.order_sn" class="orderd_box">
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
						<div class="com_tit">
							<div class="com_tit_img">
								<div>
									<img src="../../../static/images/store.png" />
								</div>
								<div>
									{{addslists.server_info.contact_name}}
								</div>
							</div>

						</div>
						<div class="com_com">
							<div>
								<img :src="uploadFileUrl + list_com.subject_img[0]" />
							</div>
							<div class="com_com_x">
								<div class="com_com_x_tit">
									{{addslists.order_detail.order_name}}
								</div>
								<div class="com_com_x_ov">
									{{addslists.order_detail.order_info}}
								</div>
								<div class="com_com_x_score2">
									<div>￥{{addslists.payment.order_amount}}
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
						<div>费用</div>
						<div style="color: #f00;">{{addslists.payment.order_amount}}</div>
					</li>
					<li>
						<div>支付方式</div>
			            <div v-if="addslists.payment.order_actual_amount == 0">
			              <span v-if="addslists.payment.order_deductible_type == 1">余额</span>
			              <span v-else-if="addslists.payment.order_deductible_type == 2">积分</span>
			              抵扣
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
					<li>
						<div>预约时间</div>
						<div>{{addslists.time_record.contact_appointment_at}}</div>
					</li>
				</ul>
			</div>
		</div>

		<!--点列表进来-->
		<div v-else class="orderd_box">
			<!--地图-->
			<div class="mapsss" style="position:relative;height: 2rem;">
				<!--<addvue :lng="lng" :lat="lat"> </addvue>-->
				<amap-manager :center="[lng,lat]"></amap-manager>
			</div>
			<!--地图end-->
			<a :href='"tel:"+addslists.server_info.telephone'>
				<div class="adds">
					<div>
						<img src="../../assets/img/callout.png" />
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
							联系地址：{{addslists.server_info.address_name}}<span v-if="addslists.server_info.house_number != '无门牌号' ">{{addslists.server_info.house_number}}</span>
						</div>

					</div>
				</div>
			</a>

			<div class="com_box">

				<ul>
					<li class="list_coms">
						<div class="com_com">
							<div style="position: relative;">
								<div class="sys" v-if="addslists.order_detail.is_sys_order" style="position: absolute;top: 0;right: 0;background: #f00;color: #fff;font-size: .12rem;">周期</div>
								<img v-if="!list_com.subject_img" :src="defaultServiceImages" />
								<img v-else :src="uploadFileUrl + list_com.subject_img[0]" />
							</div>
							<div class="com_com_x">
								<div class="com_com_x_tit">
									{{addslists.order_detail.order_name}}
								</div>
								<div class="com_com_x_ov" v-html="replaceStyle(addslists.order_detail.order_info)"></div>
								<!--orderDetails-->
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
						<div>费用</div>
						<div style="color: #f00;">{{addslists.payment.order_amount}}</div>
					</li>
					<li>
						<div>支付方式</div>
						<div v-if="addslists.payment.order_pay_way == 'alipay'">支付宝</div>
						<div v-else-if="addslists.payment.order_pay_way == 'wechat'">微信</div>
						<div v-else>银行卡</div>

					</li>
					<li>
						<div>下单时间</div>
						<div>{{addslists.time_record.add_time}}</div>
					</li>
					<li>
						<div>服务时间</div>
						<div>{{addslists.time_record.contact_appointment_at}}</div>
					</li>
					<li v-if="addslists.time_record.next_order_at">
						<div>下期服务时间</div>
						<div>{{addslists.time_record.next_order_at}}</div>
					</li>
					<li>
						<div>服务人员</div>
						<!--<div>{{getTime(addslists.contact_appointment_at*1000)}}</div>-->
						<div>
							<span  v-for="(item, i) in addslists.server_info.appointed_row" style="display: flex;">
        			        	<span style="width: .3rem;height:0.3rem;line-height: .3rem; border-radius: 50%;overflow: hidden;align-items: center;flex-wrap: wrap;">
        			        		<img :src="uploadFileUrl + item.user_pic" alt="" style="width: .3rem;height:.3rem;"/>
        			        	</span>
        			     	  <span style="height:0.3rem;line-height: .3rem;margin-left: 0.05rem;" :class="{i_item : 0 == i } ">{{item.staff_name}}</span>
						      <!--<span>{{item.store_director}}</span>-->
						   </span>
						</div>
					</li>
				</ul>
			</div>

			<div class="order_but">
        <div v-if="(addslists.order_detail['order_pay_state_dsc'] == 'PAY_SUCCESS' || addslists.order_detail['order_pay_state_dsc'] == 'PENDING_PAY') &&
          (addslists.order_detail['order_bis_state_dsc'] == 'SET_UP' || addslists.order_detail['order_bis_state_dsc'] == 'PENDING_ORDER' || addslists.order_detail['order_bis_state_dsc'] == 'PENDING_ASSIGN' || addslists.order_detail['order_bis_state_dsc'] == 'PENDING_DOOR' &&
          usertype != 1)" class="but_coms_but1" @click.stop="o_cancel(addslists)">
          取消订单
        </div>
        <div v-if="addslists.order_detail['order_pay_state_dsc'] == 'PAY_SUCCESS' &&
          addslists.order_detail['order_bis_state_dsc'] == 'PENDING_ORDER' &&
          usertype != 1" class="but_coms_but2" @click.stop="sureOrder(addslists)">
          确认接单
        </div>
        <div v-if="addslists.order_detail['order_pay_state_dsc'] == 'PAY_SUCCESS' &&
          addslists.server_info.appointed_row.length > 0 &&
          addslists.order_detail['order_bis_state_dsc'] == 'PENDING_DOOR' &&
          addslists.time_record.order_sm_at == 0 &&
          usertype != 1" class="but_coms_but2" @click.stop="xg_distri(addslists)">
          修改分配
        </div>
        <div v-if="addslists.order_detail['order_pay_state_dsc'] == 'PAY_SUCCESS' &&
          addslists.server_info.appointed_row.length == 0 &&
          addslists.order_detail.order_rate != -1 &&
          addslists.order_detail['order_bis_state_dsc'] == 'PENDING_ASSIGN' &&
          usertype != 1" class="but_coms_but2" @click.stop="xg_distri(addslists)">
          分配人员
        </div>
        <div v-if="canIreceipt && addslists.order_detail['order_pay_state_dsc'] == 'PAY_SUCCESS' &&
          addslists.order_detail['order_bis_state_dsc'] == 'PENDING_DOOR' && addslists.server_info.appointed_uid.indexOf(user_id) > -1 &&
          addslists.order_detail._is_accepted != 0" class="but_coms_but2" @click.stop="startServer(addslists.order_detail)">
          开始服务
        </div>
        <div v-if="addslists.order_detail.order_rate == 0 &&
            addslists.order_detail['order_bis_state_dsc'] == 'IN_SERVICE' &&
            addslists.server_info.appointed_uid.indexOf(user_id) > -1" class="but_coms_but2" @click.stop="completed(addslists)">
          已完成
        </div>
				<div v-if="addslists.order_detail['order_pay_state_dsc'] == 'PAY_SUCCESS' &&
				    addslists.order_detail['order_bis_state_dsc'] == 'PENDING_EVALUATE' &&
            addslists.order_detail.Torder_rate == 1 && addslists.order_detail.order_comment_id != 0" class="but_coms_but2" @click.stop="getComment(addslists.order_detail.order_comment_id)">
          查看评价
        </div>
        <div class="but_coms_but2" v-if="addslists.order_detail['order_pay_state_dsc'] == 'PAY_SUCCESS' &&
            addslists.order_detail['order_bis_state_dsc'] == 'PENDING_DOOR' &&
            addslists.server_info.appointed_uid.indexOf(user_id) > -1 &&
            usertype == 1" @click.stop="refuse(addslists)">
          拒绝订单
        </div>
        <div class="but_coms_but1" v-if="addslists.order_detail._is_accepted == 0 && addslists.server_info.appointed_uid.indexOf(user_id) > -1" @click="sureOrder(addslists)">
          我知道了
        </div>
			</div>
		</div>
		<!--取消订单-->
		<div class="po_box" v-show="cancel_x">
			<div class="po_box_div2">
				<div class="po_box_div_tit">提示</div>
				<div style="height: 1rem;border-bottom: 0.01rem solid #eee;">
					<div style="margin: .2rem .2rem 0 .2rem;">
						确定要取消此订单？
					</div>
					<div style="margin: .2rem ">
						取消原因 : <input type="text" class="" v-model="cancel_reason" />
					</div>
				</div>
				<div class="po_box_but">
					<div @click.stop="xbut_cancel">取消</div>
					<div @click.stop="spilits_cancel">确认</div>
				</div>
			</div>
		</div>
		<!--分配人员-->
		<div class="distri_box" v-show="distri">
			<transition name="slide-fade">
				<div class="distri_biv">
					<div class="distri_biv_div1">
						<div style="color: #B2B2B2;font-size: .12rem;" @click.stop="distri = false">
							返回
						</div>
						<div style="font-size: .14rem;">
							可分配人员
						</div>
						<div style="color: #18B4ED;font-size: .12rem;" @click.stop="o_distri_ok" v-if="list_distri.length > 0">
							确定
						</div>
						<div v-else>

						</div>
					</div>
					<div class="distri_biv_div2">
						<ul>
							<li v-if="list_distri.length == 0">
								暂无人员分配
							</li>
							<li v-for="(item,index) in list_distri" v-else>
								<span :class="{distri_biv_div_span:distri_num.indexOf(item.id) > -1}" @click.stop="tab_distri(item,index)">{{item.staff_name}}</span>
							</li>

						</ul>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
	import api from '@/api/api'
	import addvue from '@/page/mem/addvue'
	import amapManager from '@/components/amapManager'
	export default {
		components: {
			addvue,
			amapManager
		},
		data() {
			return {
				defaultServiceImages: require('../../assets/img/logo_h.png'),
				addshow: false,
				isshow: false,
				indexs: '',
				num: '',
				uploadFileUrl: api.uploadFileUrl + '/',
				fgshow: false,
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
				addslists: {},
				list_com: {},
				addnema: '',
				addtel: '',
				addaddres: '',
				usertype: 0, //3是店长，1为店员
				//取消
				order_sn_ok: '',
				cancel_x: false,
				cancel_reason: '',
				//修改
				distri: false,
				list_distri: [],
				distri_num: [],
				lng: 0,
				lat: 0,
				canIreceipt:false,//能否接单
				user_id: this.$store.state.user_id,
				serverMan:'',//服务人员
			}
		},

		mounted() { //生命周期
			this.init();
			this.canIdo();
		},
		methods: { //方法
      refuse (its) {
        this.$dialog.alert({
          title: "提示",
          message: '确认要拒绝订单吗',
          showCancelButton: true,
        }).then(() => {
          this.$fetch('order_refuse', {order_sn: its.order_detail.order_sn}).then(rs => {
            this.tab(this.num,this.page)
            this.$toast('订单已拒绝');
          })
        }).catch(() => {

        })
      },
			canIdo() {
				this.$fetch('can_i_use', {node_key: 'Store.changeOrderStatus.receipt'}, '', 'POST', 1).then(rs =>{
          this.canIreceipt = true
				})
			},
			replaceStyle(str) {
			  if (str) {
          const reg = /<[^<>]+>/g
          return str.replace(reg, '')
        }
			},
			init() {
				let that = this;
				let list = {}
				list.get_appointed = 1
				that.usertype = that.$route.query.usertype;
				if(that.usertype == 3) {
					that.distri_list();
				}
				if(that.$route.query.order_sn) {
					that.$fetch('order_get', list, that.$route.query.order_sn).then(rs =>{
            that.addslists = rs.order_info
            that.list_com = rs.entity_row
					})
				} else {
					that.olist()
					that.$fetch('order_get', list, that.$route.query.its).then(rs =>{
            that.addslists = rs.order_info
            that.list_com = rs.entity_row
            that.lat = rs.order_info.server_info.order_lat
            that.lng = rs.order_info.server_info.order_lng
					})
				}

			},
			onClickLeft() {
				this.$router.back(-1)
			},
			onClickLeft2() {
				this.$router.push({
					path: '/home'
				})
			},
			//打开
			shows() {
				let that = this
				that.isshow = true
			},
			//			/刪除
			spilits() {
				let that = this
				that.list_com.splice(that.indexs, 1)
				that.isshow = false
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

			//			取消订单
			o_cancel(its) {
				let that = this
				that.order_sn_ok = its.order_detail.order_sn
				that.cancel_x = true
			},
			//取消订单
			spilits_cancel() {
				let that = this
				let list = {}
				list.cancel_reason = that.cancel_reason
				that.$fetch('order_cancel', list, that.order_sn_ok).then(re =>{
		          	that.cancel_x = false
		          	that.init();
				}).catch(e => {
          			that.cancel_x = false
        		})
			},

			xbut_cancel() {
				let that = this
				that.cancel_x = false
			},

			//确认接单
			sureOrder(its) { //确认接单
				let that = this
				that.$dialog.alert({
					title: "提示",
					message: '确认要接单吗',
					showCancelButton: true,
				}).then(() => {
					that.$fetch('order_change_status_receipt', {}, its.order_detail.order_sn).then(rs =>{
            			that.init();
					})
				}).catch(() => {

				});
			},

			//修改分配
			xg_distri(its) {
				this.distri = true
				this.order_sn_ok = its.order_detail.order_sn;
				that.distri_list();
			},
			//			选人
			tab_distri(item, index) {
				const indexOf = this.distri_num.indexOf(item.id)
				if(indexOf > -1) {
					this.distri_num.splice(indexOf, 1)
				} else {
					this.distri_num.push(item.id)
				}
			},
			//			分配确定
			o_distri_ok() {
				let that = this
				if(that.distri_num.length) { //
					that.$fetch('appointed_order', {appointed_uid: this.distri_num}, that.order_sn_ok).then(rs =>{
			            that.distri = false
			            that.init()
					})
				} else {
					that.$toast('请选择一个员工')
				}

			},

			//查看评论
			getComment(order_comment_id) {
				this.$router.push({
					path: '/myeval',
					query: {
						order_comment_id
					}
				})
			},

			//获取可分配人员列表
			distri_list() {
				let that = this
				that.$fetch('staff_get_allocation', {} ,that.$route.query.its).then(rs =>{
          			that.list_distri = rs
          			rs.forEach((item, index) => {
		        		if(item.staff_assigned) {
		              		this.distri_num.push(item.id)
		            	}
	          		})
				})
			},

			startServer(order_detail) { //开始服务
				let that = this
				that.$dialog.alert({
					title: "提示",
					message: '确定要开始服务吗',
					showCancelButton: true,
				}).then(() => {
					const req = order_detail.order_sn + ('-' + order_detail.order_sub_sn || '')
					that.$fetch('order_change_status_begin', {}, req).then(rs =>{
            			that.init();
					})
				}).catch(() => {

				});
			},

			completed(its) { //完成
				let that = this
				that.$dialog.alert({
					title: "提示",
					message: '确认要成订单吗',
					showCancelButton: true,
				}).then(() => {
					const req = its.order_detail.order_sn + ('-' + its.order_detail.order_sub_sn || '')
					that.$fetch('order_change_status_completed', {}, req).then(rs =>{
            			that.init();
					})
				}).catch(() => {

				});
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

			//转换时间
			getTime(time) {
				var data = new Date(time)
				if(data) {
					var year = data.getFullYear();
					var month = this.add0(data.getMonth() + 1);
					var day = this.add0(data.getDate());
					var hour = this.add0(data.getHours());
					var minute = this.add0(data.getMinutes());
					return year + '-' + month + '-' + day + ' ' + hour + ':' + minute
				} else {
					console.log('时间格式有误：' + time);
					return ''
				}
			},
			add0(time) {
				var time = Number(time);
				if(time < 10) {
					time = '0' + time
				}
				return time
			},

		},

	}
</script>

<style scoped>
	.orderd {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom:0 ;
		background: #f5f5f5;
	}
	.orderd_box{
		overflow: auto;
		height:calc(100% - 0.45rem);
	}
	.commodity {
		background: #FAFAFA;
	}

	.commodity ul {
		background: #FAFAFA;
	}

	.list_coms {
		margin-top: .1rem;
		padding-bottom: .15rem;
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
	}

	.com_com_x_ov {
		width: 2.65rem;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
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
		display: flex;
	}

	.but_coms_x {
		display: flex;
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

	.po_box_div2 {
		position: absolute;
		top: 40%;
		left: 50%;
		width: 2.75rem;
		height: 2.22rem;
		background: #fff;
		border-radius: .1rem;
		margin: -0.95rem 0 0 -1.375rem;
		border-top: 0.01rem solid #eee;
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
		margin: .1rem 0 0 0;
		padding: 0 .15rem;
		background: #fff;
	}

	.adds>div:nth-child(1) {
		flex: 0 0 .5rem;
		height: 1rem;
		line-height: 1.1rem;
	}

	.adds>div:nth-child(1) img {
		width: .4rem;
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
		width: calc(100% - .3rem);
		height: .67rem;
		line-height: .67rem;
		background: #fff;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 0 .15rem;
	}

	.order_but>div {
		margin: .08rem 0 .08rem .1rem;
		padding: 0 0.15rem;
		height: .28rem;
		line-height: .28rem;
		text-align: center;
		border-radius: .3rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.but_coms_but1 {
		height: .28rem;
		line-height: .28rem;
		padding: .05rem .08rem;
		background: #fff;
		border-radius: .3rem;
		font-size: .14rem;
		color: #B2B2B2;
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

	.distri_box {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		/*height: 100%;*/
		background: rgba(0, 0, 0, .05);
		z-index: 9999;
	}

	.distri_biv_div1 {
		height: .44rem;
		line-height: .44rem;
		display: flex;
		justify-content: space-between;
		padding: 0 .15rem;
		align-items: center;
		border-bottom: 0.01rem solid #eee;
	}

	.distri_biv_div2 {
		height: 2.09rem;
		overflow: auto;
	}

	.distri_biv_div2 ul {
		background: #fff;
		padding: 0.05rem 0;
	}

	.distri_biv_div2 ul li {
		height: .44rem;
		line-height: .44rem;
		text-align: center;
		background: #fff;
		padding: 0.05rem 0.15rem;
	}

	.distri_biv_div2 ul li span {
		display: block;
		height: .4rem;
		line-height: .4rem;
		text-align: center;
		background: #eee;
		border-radius: .05rem;
	}

	.distri_biv_div_span {
		background: #e7f9ff;
		color: #18b4ed;
	}

	.distri_biv {
		width: 100%;
		height: 2.5rem;
		background: #FFF;
		position: absolute;
		bottom: 0;
	}
</style>
