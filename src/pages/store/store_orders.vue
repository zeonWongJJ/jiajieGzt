<template>
	<div class="find">
		<div class="find_top">
			<van-nav-bar title="店铺的订单" left-arrow @click-left="onClickLeft">
				<!--<van-icon name="wap-nav" color="white" slot="right" @click-right="onClickRight" />-->
			</van-nav-bar>
		</div>
		<div v-show="rishow" @click.stop="orishow()" style="position: fixed;z-index: 9999; top: 0;right: 0;left: 0;bottom: 0; background: rgba(0,0,0,0); ">
			<div style="position: absolute;z-index: 9999; top: .45rem;right: 0;width: 1rem ;background: rgba(0,0,0,.2); ">
				<head-ri></head-ri>
			</div>
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
					<li v-for="(its,index) in list_com" class="list_coms" :class="'state_'+its.order_status" @click="detailst(its.order_detail.order_sn)">
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
								<img src="../../assets/img/logo_h.png" v-if="its.order_detail.order_pic == ''" />
								<img :src="uploadFileUrl + its.order_detail.order_pic[0]" v-else/>
							</div>
							<div class="com_com_x">
								<!--<div class="com_com_ri" v-if="its.type == 1">
                                    企业
                                </div>-->
								<div class="com_com_x_tit" style="font-weight: bold;">
									{{its.order_detail.order_name}}
								</div>
								<div class="com_com_x_ov" v-html="replaceStyle(its.order_detail.order_info)"></div>
								<!--<div class="com_com_x_score">
                                    <div>
                                        <span>{{its.order_sn}}</span>
                                    </div>
                                </div>-->
								<div class="com_com_x_ov" style="width:2.6rem; overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
									{{its.server_info.address_name}}<span v-if="its.server_info.house_number != '无门牌号' ">{{its.server_info.house_number}}</span>
								</div>
								<div class="com_com_x_score2">
									<div>
										￥{{its.payment.order_amount}}
									</div>
								</div>
							</div>

						</div>
						<div class="director" v-if="its.server_info.appointed_row">
							<div class="right">
								<div>下单时间:{{its.time_record.add_time}}</div>
								<div>服务时间:{{its.time_record.contact_appointment_at}}</div>
							</div>
							<div style="margin-left: .1rem;" v-if="its.time_record.next_order_at">下期服务时间:{{its.time_record.next_order_at}}</div>
							<div style="display: flex;border-bottom: 0.01rem solid #f8f8f8; padding: 0.08rem .1rem;">
								<!--<div class="img"><img src="../../assets/img/mmen.png" alt="" /></div>-->
								<div class="left">
                			  <!--<render-appointed-row :member="its.appointed_row"></render-appointed-row>-->
                			     <span  v-for="(item, i) in its.server_info.appointed_row" style="display: flex;">
                			        	<span style="width: .3rem;height:0.3rem;line-height: .3rem; border-radius: 50%;overflow: hidden;align-items: center;flex-wrap: wrap;">
                			        		<img :src="uploadFileUrl + item.user_pic" alt="" style="width: .3rem;height:.3rem;"/>
                			        	</span>
                			     	  <span style="height:0.3rem;line-height: .3rem;margin-left: 0.05rem;" :class="{i_item : 0 == i } ">{{item.staff_name}}</span>
								      <!--<span>{{item.store_director}}</span>-->
								    </span>
								</div>
							</div>
						</div>
						<!--anniu-->
						<div class="but_coms">
							<!--<div v-if="its.order_state == 0" class="but_coms_but1" >待付款</div>-->
							<div v-if="its.order_detail['order_pay_state_dsc'] == 'PAY_SUCCESS' &&
            its.order_detail['order_bis_state_dsc'] == 'PENDING_ORDER'" class="but_coms_but3" @click.stop="sureOrder(its,index)">
								确认接单
							</div>
							<div v-if="its.order_detail['order_pay_state_dsc'] == 'PAY_SUCCESS' &&
            (its.order_detail['order_bis_state_dsc'] == 'COMPLETED' || its.order_detail['order_bis_state_dsc'] == 'CLOSED') ||
            its.order_detail['order_pay_state_dsc'] == 'REFUNDED'" class="but_coms_but1" @click.stop="store_delete_order(its,index)">
								删除订单
							</div>
							<div v-if="canIreceipt && its.order_detail['order_pay_state_dsc'] == 'PAY_SUCCESS' &&
            its.order_detail['order_bis_state_dsc'] == 'PENDING_DOOR' && its.server_info.appointed_uid.indexOf(user_id) > -1 &&
            its.order_detail._is_accepted != 0" class="but_coms_but2" @click.stop="startServer(its,index)">
								开始服务
							</div>
							<div v-if="its.order_detail.order_rate == 0 &&
            its.order_detail['order_bis_state_dsc'] == 'IN_SERVICE' &&
            its.server_info.appointed_uid.indexOf(user_id) > -1" class="but_coms_but2" @click.stop="completed(its,index)">
								已完成
							</div>
							<div class="but_coms_but2" v-if="its.order_detail['order_pay_state_dsc'] == 'PAY_SUCCESS' &&
            its.server_info.appointed_row.length > 0 &&
            its.order_detail['order_bis_state_dsc'] == 'PENDING_DOOR' &&
            its.time_record.order_sm_at == 0" @click.stop="f_distri(its,index)">
								修改分配
							</div>
							<div class="but_coms_but2" v-if="its.order_detail['order_pay_state_dsc'] == 'PAY_SUCCESS' &&
            its.server_info.appointed_row.length == 0 &&
            its.order_detail.order_rate != -1 &&
            its.order_detail['order_bis_state_dsc'] == 'PENDING_ASSIGN'" @click.stop="f_distri(its,index)">
								分配人员
							</div>
							<div class="but_coms_but1" v-if="(its.order_detail['order_pay_state_dsc'] == 'PAY_SUCCESS' || its.order_detail['order_pay_state_dsc'] == 'PENDING_PAY') &&
            (its.order_detail['order_bis_state_dsc'] == 'SET_UP' || its.order_detail['order_bis_state_dsc'] == 'PENDING_ORDER' || its.order_detail['order_bis_state_dsc'] == 'PENDING_ASSIGN' || its.order_detail['order_bis_state_dsc'] == 'PENDING_DOOR')" @click.stop="o_cancel(its,index)">
								取消订单
							</div>
							<div v-if="its.order_detail['order_pay_state_dsc'] == 'PAY_SUCCESS' && its.order_detail['order_bis_state_dsc'] == 'PENDING_EVALUATE' &&
            its.order_detail.order_rate == 1 && its.order_detail.order_comment_id != 0" class="but_coms_but2" @click.stop="getComment(its.order_detail.order_comment_id)">查看评价</div>
						</div>
					</li>
				</ul>

			</div>
		</div>
		<!--弹出窗 分配人员-->
		<div class="distri_box" v-show="distri" @click.stop="o_distri">
			<transition name="slide-fade">
				<div class="distri_biv">
					<div class="distri_biv_div1">
						<div style="color: #B2B2B2;font-size: .12rem;" @click.stop="o_distri">
							返回
						</div>
						<div style="font-size: .14rem;">
							可分配人员
						</div>
						<div style="color: #18B4ED;font-size: .12rem;">
							<span @click.stop="o_distri_ok">确定</span>
						</div>
					</div>
					<div class="distri_biv_div2">
						<ul>
							<li v-if="list_distri.length < 0">
								暂无人员分配
							</li>
							<li v-if="item.can_assign"  v-for="(item,index) in list_distri" v-else>
								<span :class="{distri_biv_div_span: distri_num.indexOf(item.id) > -1}" @click.stop="tab_distri(item,index)">{{item.staff_name}}</span>
							</li>
						</ul>
					</div>
				</div>
			</transition>
		</div>

		<!--弹出窗-->
		<div class="po_box" v-show="cancel_x" @click.stop="xbut_cancel_x">
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
				<!--<div class="po_box_div_com">
                    取消原因:<input type="text" name="" id="" value="" />
                </div>-->
				<div class="po_box_but">
					<div @click.stop="xbut_cancel">取消</div>
					<div @click.stop="spilits_cancel">确认</div>
				</div>
			</div>
		</div>

		<!--弹出窗-->
		<div class="po_box" v-show="isshow" @click.stop="xbut">
			<div class="po_box_div">
				<div class="po_box_div_tit">提示</div>
				<div class="po_box_div_com">
					确定要删除此订单？
				</div>
				<div class="po_box_but">
					<div @click.stop="xbut">取消</div>
					<div @click.stop="spilits">确认</div>
				</div>
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
				canIreceipt: false, // 是否可以接单
				rishow: false, //headRi
				distri: false,
				cancel_x: false,
				isshow: false,
				fgshow: false,
				list_distri: [],
				uploadFileUrl: api.uploadFileUrl + '/',
				distri_num: [],
				orderState: '',
				indexs: '',
				order_sn: '',
				tabs: [{
						name: '全部',
						id: 99
					},
					{
						name: '待付款',
						id: 0
					},
					{
						name: '待确认',
						id: 1
					},
					{
						name: '待服务', //待接单
						id: 1
					},
					{
						name: '服务中',
						id: 2
					},
				],
				num: 0, //tab
				numlist: 0, //综合
				numlist2: 0, //建议方式
				inishow: false,
				ids: '', //
				list_com: [],
				unapplication: [], // 不可分配的用户
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
				item_id: '', //分配id
				order_sn_ok: '', //分配需要的订单号
				cancel_reason: '',
				user_id: this.$store.state.user_id
			}
		},
		created(){

		},
		mounted() { //生命周期
			this.canIdo()
			this.tab(this.num)
			this.token = this.$store.state.token
		},
		methods: { //方法
      //打开取消个人
      store_delete_order(its) {
        this.$dialog.alert({
          title: "提示",
          message: '确认要删除订单吗',
          showCancelButton: true,
        }).then(() => {
          this.$fetch('store_delete_order', {}, its.order_detail.order_sn).then(rs => {
            this.tab(this.num,this.page)
            this.$toast('删除成功');
          })
        }).catch(() => {

        })

      },
			canIdo() {
				this.$fetch('can_i_use', {node_key: 'Store.changeOrderStatus.receipt'}).then(rs =>{
          this.canIreceipt = true
				})
			},
			replaceStyle(str) {
				const reg = /<[^<>]+>/g
				return str.replace(reg, '');
			},
			//			headRi
			orishow() {
				let that = this
				that.rishow = false
			},
			onClickRight() {
				let that = this
				that.rishow = !that.rishow
			},
			//获取可分配人员列表
			distri_list() {
				this.$fetch('staff_get_allocation', {}, this.order_sn_ok).then(rs =>{
          rs.forEach((item, index) => {
            if(item.staff_assigned) {
                this.distri_num.push(item.id)
            }
          })
          this.list_distri = rs
				})
			},
			// 新的
			f_distri(its, index) {
				// 获取店员列表
				this.order_sn_ok = its.order_detail.order_sn
				this.list_distri = []
				this.distri_num = []
				this.distri_list()
				this.distri = true
			},
			xg_distri(its, index) {
				this.distri = true
				this.order_sn_ok = its.order_detail.order_sn
			},
			o_distri() {
				this.distri = false

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
				this.$fetch('appointed_order',{appointed_uid: this.distri_num},this.order_sn_ok).then(rs =>{
		          	this.distri = false
		          	this.tab(this.num)
				})
			},

			//			取消订单
			o_cancel(its, index) {
				let that = this
				that.cancel_reason = ''
				that.order_sn_ok = its.order_detail.order_sn
				that.cancel_x = true
			},
			//取消订单
			spilits_cancel() {
				let that = this
				let list = {}
				list.cancel_reason = that.cancel_reason
				that.$fetch('order_cancel', list, that.order_sn_ok).then(rs =>{
		          	that.cancel_x = false
		          	that.cancel_reason = ''
		          	this.tab(this.num)
				}).catch(e => {
		          	that.cancel_x = false
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
					this.$fetch('order_change_status_receipt', {}, its.order_detail.order_sn).then(rs =>{
            			this.tab(this.num)
					})
				}).catch(() => {

				});
			},
			startServer(its, index) { //开始服务
				let that = this
				that.$dialog.alert({
					title: "提示",
					message: '确定要开始服务吗',
					showCancelButton: true,
				}).then(() => {
					const req = its.order_detail.order_sn + ('-' + its.order_detail.order_sub_sn || '')
					that.$fetch('order_change_status_begin', {}, req).then(rs =>{
            			this.tab(this.num)
					})
				}).catch(() => {

				});
			},
			completed(its, index) { //完成
				let that = this
				that.$dialog.alert({
					title: "提示",
					message: '确认要完成成订单吗',
					showCancelButton: true,
				}).then(() => {
					const req = its.order_detail.order_sn + ('-' + its.order_detail.order_sub_sn || '')
					that.$fetch('order_change_status_completed', {}, req).then(rs =>{
            			this.tab(this.num)
					})
				}).catch(() => {

				});
			},
			onClickLeft() {
				let that = this
				this.$router.back(-1)
				this.$store.commit('store_show', false)
			},
			//详情
			detailst(its) {
				let that = this
				//还差个id
				that.$router.push({
					path: '/orderDetails_x',
					query: {
						its,
						usertype: 3
					}
				})
			},
			//tab
			tab(index) {
				let that = this
				let lists = {}
				lists.rows = 500;
				that.num = index;
				if(index == 1) {
					lists.condition = {
						"order_state": 0,
						"order_type <> ": 3
					}
					that.$fetch('store_order_list', lists).then(rs =>{
            			that.list_com = rs
					})
				} else if(index == 2) {
					lists.condition = {
						"order_state": 1,
						"order_type <> ": 3
					}
					that.$fetch('store_order_list',lists).then(rs =>{
            			that.list_com = rs
					})
				} else if(index == 3) {
					lists.condition = {
						"order_state": 2,
						"order_type <> ": 3
					}
					that.$fetch('store_order_list',lists).then(rs =>{
            			that.list_com = rs
					})
				} else if(index == 4) {
					lists.condition = {
						"order_state": 3,
						"order_type <> ": 3
					}
					that.$fetch('store_order_list',lists).then(rs =>{
            			that.list_com = rs
					})
				} else {
					that.$fetch('store_order_list').then(rs =>{
            			that.list_com = rs
					})
				}
			},

			menvaluate(its, index) {
				let that = this
				that.$router.push({
					path: '/menvaluate',
					query: {
						its
					}
				})
			},
			//打开
			shows(its, index) {
				let that = this
				that.isshow = true
				that.indexs = index
				that.order_sn = its.order_detail.order_sn
			},

			//			/刪除
			spilits() {
				let that = this;
				let urls = api.store_delete_order + that.order_sn;
				that.$fetch('store_delete_order', {}, that.order_sn).then(rs =>{
					that.isshow = false
		          	that.$toast("删除成功");
		          	that.list_com.splice(that.indexs, 1)
		          	this.tab(this.num)
				})
			},

			xbut_cancel() {
				let that = this
				that.cancel_x = false
			},
			xbut_cancel_x() {
				let that = this

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
		position: relative;
	}

	.find_top {
		/*position: absolute;
        width: 100%;
        top: 0;*/
	}

	.top_nav {
		width: 100%;
		position: relative;
		height: calc(100% - 1.05rem);
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

	.director {
		/*display: flex;*/
		background: #fff;
		font-size: 0.12rem;
		/*justify-content: space-between;*/
		/*align-items: center;*/
	}

	.director .left {
		display: flex;
		align-items: center;
	}

	.director .right {
		/*margin: 0.08rem 0 0 0;*/
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.08rem .1rem;
		border-bottom: 0.01rem solid #f8f8f8;
	}

 .img {
	 	flex:0 0 0.25rem ;
		height: .25rem;
		width: .25rem;
		border-radius: 50%;
		overflow: hidden;
		margin-right: .08rem;
	}

	.director .img>img {
		width: 100%;
		height: 100%;
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
	.i_item{
		color: red;
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
		height: .14rem;
		line-height: .14rem;
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

	.item_disapplication {
		background: #e80f0f;
		color: yellow;
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
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, .2);
		box-shadow: 10px 10px 5px #007AFF;
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

	.distri_box {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .2);
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
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .2);
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
</style>
<style type="text/css">
	.find .van-nav-bar .van-icon {
		color: #fff !important;
	}
</style>
