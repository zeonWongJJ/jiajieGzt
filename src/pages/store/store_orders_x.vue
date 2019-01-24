<template>
	<div class="find">
		<div class="find_top">
			<!--<van-nav-bar title="服务记录" left-arrow @click-left="onClickLeft" v-if="fromStaff" />-->
			<van-nav-bar title="服务记录" left-arrow @click-left="onClickLeft" v-if="fromStaff">
				<!--<van-icon name="wap-nav" color="white" slot="right"  @click-right="onClickRight"/>-->
			</van-nav-bar>
			<van-nav-bar title="订单管理" left-arrow @click-left="onClickLeft"  v-else>
				<!--<van-icon name="wap-nav" color="white" slot="right" @click-right="onClickRight"/>-->
			</van-nav-bar>
			<div v-show="rishow" @click.stop="orishow()" style="position: fixed;z-index: 9999; top: 0;right: 0;left: 0;bottom: 0; background: rgba(0,0,0,0); ">
				<div style="position: absolute;z-index: 9999; top: .45rem;right: 0;width: 1rem ;background: rgba(0,0,0,.2); ">
					<head-ri></head-ri>
				</div>
			</div>

			<!--<van-nav-bar title="订单管理" left-arrow @click-left="onClickLeft" v-else />-->
		</div>
		<ul class="top_nav_ul">
			<li v-for="(item,index) in tabs" :class="{li_style:index == num}" @click="tab(index)">
				<div class="top_nav_img" @click="dad(item,(index == 0 || index == 2))">
					{{item.name}}
				</div>
			</li>
		</ul>
		<div class="top_nav">

			<div class="commodity">
				<ul>
					<li v-for="(its,index) in list_com" class="list_coms" :class="'state_'+its.order_detail.order_status" @click="detailst(its.order_detail.order_sn)">
						<div class="com_tit">
							<div class="com_tit_img">
								<div>
									订单编号：{{its.order_detail.order_sn}}
								</div>
							</div>
							<order-state :order_info="its" :is_store_page="true"></order-state>
						</div>
						<div class="com_com">
							<div style="position: relative;">
								<div class="sys" v-if="its.order_detail.is_sys_order" style="position: absolute;top: 0;right: 0;background: #f00;color: #fff;font-size: .12rem;">周期</div>
								<img :src="its.order_detail.order_pic[0] && its.order_detail.order_pic[0].length > 0 ? uploadFileUrl + its.order_detail.order_pic[0] : '../../assets/img/logo_h.png'" />
							</div>
							<div class="com_com_x">
								<div class="com_com_x_tit" style="font-weight: bold;">
									{{its.order_detail.order_name}}
								</div>
								<div class="com_com_x_ov" v-html="replaceStyle(its.order_detail.order_info)"></div>
								<!--<div class="com_com_x_score">
									<div>
										<span>{{its.order_sn}}</span>
									</div>
								</div>-->
								<div class="com_com_x_ov" style="width:2.6rem; overflow: hidden;text-overflow:ellipsis;white-space:nowrap;">
									{{its.server_info.address_name}}<span v-if="its.server_info.house_number != '无门牌号' ">{{its.server_info.house_number}}</span>
								</div>
								<div class="com_com_x_score2">
									<div>
										￥{{its.payment.order_amount}}
									</div>
								</div>
							</div>
						</div>
						<!--时间-->
						<div class="sj_x">
							<div class="sj_x_img">
								<img src="../../assets/img/mmen.png" />
								<template>
									<span style="color: red;">{{its.server_info.appointed_row[0].staff_name}}</span>
									<span v-if="i" v-for="(item, i) in its.server_info.appointed_row">
									  <i v-if="i !== its.server_info.appointed_row.length">,</i>
									  {{item.staff_name}}
									</span>
								</template>
            					<!--<render-appointed-row :member="its.server_info.appointed_row"></render-appointed-row>-->
								<!--<span v-html="renderAppointedRow(its.appointed_row)"></span>-->
							</div>
							<div class="sj_x_sj">
								<div>服务时间:</div>
								<div>{{its.time_record.contact_appointment_at}}</div>
							</div>
							<div class="sj_x_sj" v-if="its.time_record.next_order_at">
								<div>下期服务时间:</div>
								<div>{{its.time_record.next_order_at}}</div>
							</div>
						</div>
						<!--anniu-->
						<div class="but_coms" v-if="its.order_detail['order_pay_state_dsc'] == 'PAY_SUCCESS'">
							<template>
                <div v-if="its.order_detail['order_bis_state_dsc'] == 'PENDING_DOOR' && !fromStaff && its.order_detail._is_accepted != 0" class="but_coms_but2" @click.stop="startServer(its.order_detail)">
                  开始服务
                </div>
                <div v-if="its.order_detail['order_pay_state_dsc'] == 'PAY_SUCCESS' &&
            its.order_detail['order_bis_state_dsc'] == 'PENDING_DOOR' && !fromStaff" class="but_coms_but2" @click.stop="o_cancel(its.order_detail.order_sn)">
                  拒绝订单
                </div>
                <div v-else-if="its.order_detail['order_bis_state_dsc'] == 'IN_SERVICE' && !fromStaff" class="but_coms_but2" @click.stop="completed(its,index)">
                  已完成
                </div>
                <div v-else-if="its.order_detail['order_bis_state_dsc'] == 'COMPLETED'" class="but_coms_but2" @click.stop="getComment(its.order_detail.order_comment_id)">
                  查看评价
                </div>
              </template>
              <div class="but_coms_but1" v-if="its.order_detail._is_accepted == 0 && !fromStaff" @click.stop="sureOrder(its)">
                我知道了
              </div>
              <div v-if="its.order_detail['order_pay_state_dsc'] == 'PAY_SUCCESS' &&
            (its.order_detail['order_bis_state_dsc'] == 'COMPLETED' || its.order_detail['order_bis_state_dsc'] == 'CLOSED') ||
            its.order_detail['order_pay_state_dsc'] == 'REFUNDED'" class="but_coms_but1" @click.stop="store_delete_order(its)">
                删除订单
              </div>
						</div>

						<div class="distri_box" v-show="distri" @click.stop="o_distri">
							<transition name="slide-fade">
								<div class="distri_biv" v-show="distri">
									<div class="distri_biv_div1">
										<div style="color: #B2B2B2;font-size: .12rem;" @click.stop="o_distri">
											返回
										</div>
										<div style="font-size: .14rem;">
											分配人员
										</div>
										<div style="color: #18B4ED;font-size: .12rem;" @click.stop="o_distri">
											确定
										</div>
									</div>
									<div class="distri_biv_div2">
										<ul>
											<li v-for="(item,index) in list_distri">
												<span :class="{distri_biv_div_span:index == distri_num}" @click.stop="tab_distri(index)">{{item.name}}{{index}}</span>
											</li>
										</ul>
									</div>
								</div>
							</transition>
						</div>
					</li>
				</ul>

			</div>
		</div>

	</div>
</template>

<script>
	import api from '@/api/api'
	import headRi from '@/page/pages/head_ri_sub'
	import orderState from '@/components/orderState'

	export default {
		components: {
			headRi,
			orderState
		},
		data() {
			return {
        		cancel_reason: '',
				rishow: false, //headRi
				distri: false,
				cancel_x: false,
				isshow: false,
				fgshow: false,
				list_distri: [],
				distri_num: null,
				orderState: '',
				indexs: '',
				order_sn: '',
				tabs: [{
						name: '未完成',
						id: 99
					},
					{
						name: '已完成',
						id: 0
					},

				],
				num: 0, //tab
				numlist: 0, //综合
				numlist2: 0, //建议方式
				inishow: false,
				ids: '', //
				list_com: [],
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
				token: '',
				staff_id: 0,
				fromStaff: 0,
				uploadFileUrl: api.uploadFileUrl + '/',

			}
		},
		mounted() { //生命周期
			this.staff_id = this.$route.query.staff_id;
			this.fromStaff = this.$route.query.fromStaff;
			this.listget()
			//			this.distri_list()
			this.token = this.$store.state.token
		},
		methods: { //方法
			replaceStyle(str) {
				const reg = /<[^<>]+>/g
				return str.replace(reg, '');
			},
	      	renderAppointedRow(appointed_row) {
		        this.$nextTick(() => {
		          let renderStr = '';
		          if (appointed_row.length > 0) {
		            const captain =  appointed_row.shift();
		            renderStr = `<i style="color: red;">${captain.store_director}</i>`
		            appointed_row.forEach((item, index) => {
		              renderStr += `，<i>${item.store_director}</i>`;
		            });
		          }
		          return renderStr;
		        })
	      	},
			orishow() {
				let that = this
				that.rishow = false
			},
			onClickRight() {
				let that = this
				that.rishow = !that.rishow
			},
			f_distri(its, index) {

				this.distri = true

			},
			xg_distri(its, index) {
				this.distri = true
			},
			o_distri() {
				this.distri = false

			},
			//			选人
			tab_distri(index) {
				let that = this
				let lists = {}
				that.distri_num = index;
			},

			//			旧的
			listget() {
				let that = this
				let forms = {}
				forms.rows = 500;
				forms.state = 0;
				that.$fetch('staff_service_record', forms, that.staff_id, 'POST',1).then(rs =>{
          			that.list_com = rs
				})
			},

			dad(item, index) {
				let that = this
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
			sureOrder(its, index) { //确认接单
				let that = this
				that.$dialog.alert({
					title: "提示",
					message: '确认要接单吗',
					showCancelButton: true,
				}).then(() => {
					let that = this
					that.$fetch('order_change_status_receipt', {}, its.order_detail.order_sn).then(rs =>{
            that.listget();
					})
				}).catch(() => {

				});
			},
			startServer(order_detail) { //开始服务
				let that = this
				that.$dialog.alert({
					title: "提示",
					message: '确定要开始服务吗',
					showCancelButton: true,
				}).then(() => {
					const req = order_detail.order_sn + ('-' + order_detail.order_sub_sn || '')
					that.$fetch('order_change_status_begin', {}, req).then(re =>{
			            that.listget();
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
            			that.listget();
					})
				}).catch(() => {

				});
			},
			onClickLeft() {
				let that = this
					that.$router.push({
					path:'/home'
				})
				that.$store.commit('store_show', false )
			},
			//详情
			detailst(its) {
				let that = this
				//还差个id
				that.$router.push({
					path: '/orderDetails_x',
					query: {
						its,
						usertype: 1
					}
				})
			},
			//tab
			tab(index) {
				let that = this
				that.num = index;
				let lists = {}
				lists.rows = 500;
				lists.state = index;
				that.$fetch('staff_service_record', lists, that.staff_id, 'POST',1).then(rs =>{
          that.list_com = rs
				})
			},
			//打开
			shows(its, index) {
				let that = this
				that.isshow = true
				that.indexs = index
				that.order_sn = its.order_sn
			},

			//			支付
			ofgshow(its, index) {
				let that = this
				that.listits = its
				that.order_sn = its.order_sn
				that.$fetch('order_sign_get', {}, its.order_sn).then(rs =>{
          that.fgshow = true
          that.order_sign = rs.order_sign
          that.listget();
				})
			},
			//			支付
			qdfk() {
				let that = this
				let token = encodeURIComponent(that.token)
				let order_sign = that.order_sign
				let order_sn = that.order_sn
				window.location.href = `http://jiajie-server.7dugo.com/order.pay?order_sign=${order_sign}&order_sn=${order_sn}&token=${token}`
			},
			//取消订单
			spilits_cancel() {
				let that = this

				//				alert(that.order_sn_ok)
				let list = {}
				list.cancel_reason = that.cancel_reason
				let apis = api.order_cancel + that.order_sn_ok
				that.$fetch('order_cancel', list, that.order_sn_ok).then(rs =>{
          that.cancel_x = false
          that.listget();
				}).catch(e => {
          that.cancel_x = false
        })

			},
			o_cancel(order_sn) {
        this.$dialog.alert({
          title: "提示",
          message: '确认要拒绝订单吗',
          showCancelButton: true,
        }).then(() => {
          this.$fetch('order_refuse', {order_sn: order_sn}).then(rs => {
            this.tab(this.num,this.page)
            this.$toast('订单已拒绝');
          })
        }).catch(() => {

        })
			},
			xbut_cancel_x() {
				let that = this

			},
			xbut_cancel() {
				let that = this
				that.cancel_x = false
			},
			//			关闭
			xbut() {
				let that = this
				that.isshow = false
			},
			//			关闭
			//			付款
			fgbut() {
				let that = this
				that.fgshow = false
			},
			fgxuz(fgitem, index) {
				let that = this
				that.num = index
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
			getComment(order_comment_id) {
				this.$router.push({
					path: '/myeval',
					query: {
						order_comment_id
					}
				})

			}
		},
	}
</script>

<style scoped>
	.find {
		width: 100%;
		height: 100%;
		background: #f5f5f5;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	/*.find_top {
		height: calc(100% - 1.05rem);
		overflow: auto;

	}*/

	.top_nav {
		width: 100%;
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
		background: rgba(0, 0, 0, .1);
		z-index: 9999;
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
		flex: 0 0 50%;
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
		width: 100%;
		background: #f5f5f5;
		position: absolute;
	}

	.commodity ul {
		background: #f5f5f5;
	}

	.list_coms {
		margin-top: .1rem;
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
		padding-bottom: .05rem;
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
	}

	.but_coms div {
		margin: .08rem 0 .08rem .1rem;
		flex: 0 0 .72rem;
		height: .2rem;
		line-height: .2rem;
		text-align: center;
		padding: .08rem .05rem;
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
		background: rgba(0, 0, 0, .05);
		z-index: 9999;
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

	.sj_x {
		background: #fff;
		/*display: flex;*/
		/*justify-content: space-between;*/
		/*align-items: center;*/
		padding: .05rem .1rem;
		font-size: .12rem;
	}

	.sj_x_img {
		display: flex;
		align-items: center;
		border-bottom: 0.01rem solid #f8f8f8;
		padding: .05rem 0
	}

	.sj_x_img img {
		width: 0.2rem;
		margin-right: .1rem;
	}

	.sj_x_sj {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 0.01rem solid #f8f8f8;
		padding: .05rem 0
	}
</style>
<style type="text/css">
	.find .van-nav-bar .van-icon {
		color: #fff !important;
	}
</style>
