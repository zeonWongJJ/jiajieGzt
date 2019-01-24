<template >
	<div class="find" >
		<div class="top_box">
				<van-nav-bar title="我的发布" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
				<van-icon name="wap-nav" color="white" slot="right" />
			</van-nav-bar>
			<div v-show="rishow"  @touchmove.prevent="orishow()" @click.stop="orishow()"  style="position: fixed;z-index: 9999; top: 0;right: 0;left: 0;bottom: 0; background: rgba(0,0,0,0); ">
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
						</span>
					</div>
				</li>
			</ul>

			<div class="commodity">
				<ul>
					<li v-for="(its,index) in list_com" class="list_coms" @click="detailst(its,index)">
						<div class="com_com">
							<div>
								<!--<img :src="uploadFileUrl + its.demand_img[0]" />-->
									<img src="../../assets/img/logo_h.png" v-if="its.demand_img == ''" />
										<img :src="uploadFileUrl + its.demand_img[0]"  v-else />
								<div style="text-align: center;">{{its.contact_name}}</div>
							</div>
							<div class="com_com_x">
								<div v-if="its.type == 1">

								</div>
								<div class="com_com_ri" v-if="its.order_state == 0">
									待付款
								</div>
								<div class="com_com_ri" v-else-if="its.order_is_pay == 1 && its.order_belong_store_id == 0 && its.order_state != 4">
									待接单
								</div>

								<div class="com_com_ri" v-else-if="its.order_state == 2 ">
									待服务
								</div>
								<div class="com_com_ri" v-else-if="its.order_state == 3 && its.order_comment_id == 0">
									待评价
								</div>
								<div class="com_com_ri" v-else-if="its.order_state == 4">
									已关闭
								</div>
								<div class="com_com_ri" v-else-if="its.order_state == 5">
									已完成
								</div>

								<div class="com_com_x_tit">
									{{its.demand_contact_name}}
								</div>
								<div class="com_com_x_ov">
									{{its.demand_info}}
								</div>
								<div class="com_com_x_score">
									<div>
										<span>服务时间：</span>
										<span>{{its.demand_service}}</span>
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
							<div v-if="its.order_state == 0 || its.order_state == 1 || its.order_state == 2" class="but_coms_but1" @click.stop="shows_qx(its,index)">取消订单</div>
							<div v-if="its.order_state == 0" class="but_coms_but3" @click.stop="ofgshow(its, index)">去支付</div>
							<div v-else-if="its.order_is_pay == 1 && its.order_belong_store_id == 0 && its.order_state != 4" class="but_coms_but4" @click="shows(its,index)">待接单</div>
							<div v-else-if="its.order_state == 2" class="but_coms_but4" @click="shows(its,index)">联系商家</div>
							<div v-else-if="its.order_state == 3 && its.order_comment_id == 0" class="but_coms_but2" @click.stop="menvaluate(its,index)">评价</div>
							<div v-else-if="its.order_state == 0 || its.order_state == 4 " class="but_coms_but1" @click.stop="shows(its,index)">
								删除订单
							</div>

						</div>
						<!--弹出窗-->
						<div class="po_box" v-show="isshow" @click.stop="xbut()">
							<div class="po_box_div">
								<div class="po_box_div_tit">提示</div>
								<div class="po_box_div_com" v-if="its.order_state == 0 || its.order_state == 4">
									确定要删除此订单？
								</div>
								<div class="po_box_div_com" v-else-if="its.order_state == 0 || its.order_state == 1 || its.order_state == 2">
									确定要取消此订单？
								</div>
								<div class="po_box_but">
									<div @click.stop="xbut()">取消</div>
									<div @click.stop="spilits(its,index)">确认</div>
								</div>
							</div>
						</div>
            <!--取消订单弹出框-->
            <div class="po_box" v-show="isshow_qx" @click.stop="xbut()">
              <div class="po_box_div">
                <div class="po_box_div_tit">提示</div>
                <div class="po_box_div_com" v-if="its.order_state == 0 || its.order_state == 4">
                  确定要删除此订单？
                </div>
                <div class="po_box_div_com" v-else-if="its.order_state == 0 || its.order_state == 1 || its.order_state == 2">
                  确定要取消此订单？
                </div>
                <div class="po_box_but">
                  <div @click.stop="xbut()">取消</div>
                  <div @click.stop="spilits_qx(its,index)">确认</div>
                </div>
              </div>
            </div>
						<!--弹出窗-->
						<div class="fug_box" v-show="fgshow" @click.stop="fgbut()">
							<transition name="slide-fade">
								<div class="fug_box_po" v-show="fgshow">
									<div class="fg_fangs">
										支付信息
									</div>
									<ul>
										<!--<li v-for="(fgitem,index) in fglist" @click.stop="fgxuz(fgitem,index)">
											<div>
												<img :src="fgitem.imgs" />
												<span>
										   		 		{{fgitem.name}}
										   		 	</span>
											</div>
											<div :class="{fg_imgsb : index == num}">

											</div>
										</li>-->
										<li>
											<div>订单号</div>
											<div>{{its_zf.order_sn}}</div>
										</li>
										<li>
											<div>支付方式</div>
											<div>
												<span v-if="its_zf.order_pay_way == 'wechat'">微信</span>
												<span v-if="its_zf.order_pay_way ==2 ">支付金额</span>
												<span v-if="its_zf.order_pay_way == 7">支付金额</span>
											</div>
										</li>
										<li>
											<div>支付方式</div>
											<div>￥{{its_zf.order_actual_amount}}</div>
										</li>
									</ul>
									<div class="fg_fangs" @click.stop="fgxuz()">
										确 定 支 付
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

	export default {
		components: {

			headRi
		},
		data() {
			return {
				rishow:false,
				uploadFileUrl: api.uploadFileUrl + '/',
				order_sn: '', //删除用的订单号
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
				itemshij: new Date().valueOf() / 1000,
				num: 0, //tab
				numlist: 0, //综合
				numlist2: 0, //建议方式
				inishow: false,
				ids: '', //
				list_com: [],
				its_zf:{},
				order_sign:'',
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
				user_id: this.$store.getters.user_id,
				token:'',

			}
		},
		mounted() { //生命周期
			//			this.itemshij =  Number(new Date()/1000)
			this.token = this.$store.state.token
			this.listget()
			this.listRend()
		},
		methods: { //方法
			//	获取列表
			listRend() {
				let that = this
				let forms = {}
				forms.rows = 500
				forms.condition = {
					"b.user_id": that.user_id
				}
				that.$fetch('user_get_demand', forms).then(rs =>{
        		  that.list_com = rs
				})
			},
			listget() {
				//				let that = this
				//				let forms = {}
				//				forms.rows = 50
				//				var qs = require('qs');
				//				that.axios({
				//						method: 'post',
				//						headers: {
				//							"Content-Type": "application/x-www-form-urlencoded"
				//						},
				//						url: api.ouser_get_order,
				//						data: qs.stringify(forms) //传参变量
				//					})
				//					.then(function(res) {
				//						console.log('22222222',res)
				//						if(res.data.error == 0) {
				//							that.list_com = res.data.data
				//
				//						} else {
				//							//					this.$toast(res.data.msg)
				//							that.$toast(res.data.msg);
				//						}
				//					})
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
				this.$router.back(-1)
			},
				onClickRight(){
				let that = this
				that.rishow =!that.rishow
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
					path: '/orderDetails',
					query: {
						its
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
					that.$fetch('user_get_demand', lists).then(rs =>{
            that.list_com = rs
          })
				} else if(index == 2) {
					lists.condition = {
						"b.order_state": 2,
						"b.user_id": that.user_id
					}
					that.$fetch('user_get_demand', lists).then(rs =>{
            that.list_com = rs
					})
				} else if(index == 3) {
					lists.condition = {
						"b.order_state": 5,
						"b.user_id": that.user_id
					}
					that.$fetch('user_get_demand', lists).then(rs =>{
            that.list_com = rs
					})
				} else if(index == 4) {
					lists.condition = {
						"b.order_state": 4,
						"b.user_id": that.user_id
					}
					that.$fetch('user_get_demand', lists).then(rs =>{
            that.list_com = rs
					})
				} else {
					that.$fetch('user_get_demand', lists).then(rs =>{
            that.list_com = rs
					})
				}

			},
			menvaluate(its, index) {
				console.log(its)
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
        that.order_sn = its.order_sn

        //								coits.order_snnsole.log('-----',its.order_sn)
      },
      shows_qx(its, index) {
        let that = this
        that.isshow_qx = true
        that.indexs = index
        that.order_sn = its.order_sn
        //								coits.order_snnsole.log('-----',its.order_sn)
      },

			//			支付
			ofgshow(its, index) {
				let that = this
				that.fgshow = true
				that.its_zf = its
				that.$fetch('order_sign_get', lists, its.order_sn).then(rs =>{
          that.order_sign = rs.order_sign
				})
			},
      // 取消订单
      spilits_qx() {
        let that = this
        let urls = api.order_cancel + that.order_sn
        that.$fetch('order_cancel', {}, its.order_sn).then(rs =>{
          that.isshow_qx = false
          that.listRend();
		    })
      },
			//	删除
			spilits() {
				let that = this
				let urls = api.order_delete + that.order_sn
				that.$fetch('order_delete', {}, its.order_sn).then(rs =>{
          that.list_com.splice(that.indexs, 1)
          that.isshow = false
				})
			},
			//			关闭
			xbut() {
				let that = this
				that.isshow = false
			},
			//			付款
			fgbut() {
				let that = this
				that.fgshow = false
			},
			fgxuz() {
				let that = this
				let token = encodeURIComponent(that.token)
				let order_sign = that.order_sign
				let order_sn = that.its_zf.order_sn
				window.location.href = `http://7dugo.com/order.pay?order_sign=${order_sign}&order_sn=${order_sn}&token=${token}`


			},

		},
	}
</script>

<style scoped>
	.find {
		width: 100%;
		height: 100%;
		background: #f5f5f5;
	}

.top_box{
	width: 100%;
	position: absolute;
	top: 0;
	z-index: 9999;
}
	.top_nav {
		position: relative;
		top: .46rem;
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
		top: 0rem;
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
		background: rgba(0, 0, 0,0.1);
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
