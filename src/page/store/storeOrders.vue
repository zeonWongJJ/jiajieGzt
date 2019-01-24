<template>
	<div class="find">
		<div>
			<van-nav-bar title="今日订单" left-arrow @click-left="onClickLeft" />
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
				<ul>
					<li v-for="(its,index) in list_com" class="list_coms" @click="detailst(its,index)">
						<div class="com_tit">
							<div class="com_tit_img">
								<!--<div>
									<img src="../../../static/images/store.png" />
								</div>-->
								<div>
									订单编号：{{its.order_sn}}
								</div>

							</div>
							<div style="margin:0">
								<order-state :order_info="its" :is_store_page="false"></order-state>
							</div>
							<div v-if="its.payment == 0">
								待付款
							</div>
							<div v-if="its.payment == 1">
								待确认
							</div>
							<div v-if="its.payment == 2">
								待服务
							</div>
							<div v-if="its.payment == 3">
								服务中
							</div>
							<div v-if="its.payment == 4">
								交易成功
							</div>
						</div>
						<div class="com_com">
							<div>
								<img src="../../assets/img/logo_h.png" v-if="its.order_pic == ''" />
								<img :src="uploadFileUrl + its.order_pic[0]"  v-else />
							</div>
							<div class="com_com_x">
								<!--<div class="com_com_ri" v-if="its.type == 1">
									企业
								</div>-->
								<div class="com_com_x_tit">
									{{its.order_name}}
								</div>
								<div class="com_com_x_ov">
									{{its.order_info}}
								</div>
								<div class="com_com_x_ov">
									{{its.contact_appointment_at}}
								</div>
								<!--<div class="com_com_x_score">
									<div>
										<span>评分</span>
										<span class="com_com_x_score_colco">{{its.p_score}}</span>
									</div>
									<div>
										<span>已售</span>
										<span class="com_com_x_score_colco">{{its.xis}}</span>
									</div>
								</div>-->
								<div class="com_com_x_score2">
									<div>
										￥{{its.order_amount}}
									</div>
									<!--<div>
										<span>{{its.price_y}}</span>
									</div>-->
								</div>
							</div>

						</div>
						<!--anniu-->
						<div class="but_coms">
							<div v-if="its.payment == 0" class="but_coms_but1">取消订单</div>
							<div v-if="its.payment == 1" class="but_coms_but3">确认订单</div>
							<div v-if="its.payment == 2" class="but_coms_but2">开始服务</div>
							<div v-if="its.payment == 3" class="but_coms_but2">已完成</div>
							<div v-if="its.payment == 4" class="but_coms_but1" @click.stop="shows(its,index)">
								删除订单
							</div>

						</div>
						<!--弹出窗-->
						<div class="po_box" v-show="isshow" @click.stop="xbut()">
							<div class="po_box_div">
								<div class="po_box_div_tit">提示</div>
								<div class="po_box_div_com" v-if="indexs ">
									确定要删除此订单？
								</div>
								<div class="po_box_div_com" v-else>
									确定要取消此订单？
								</div>
								<div class="po_box_but">
									<div @click.stop="xbut()">取消</div>
									<div @click.stop="spilits(its,index)">确认</div>
								</div>
							</div>
						</div>
						<!--弹出窗-->
						<div class="fug_box" v-show="fgshow" @click.stop="fgbut()">
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
						</div>

					</li>
				</ul>

			</div>
		</div>

	</div>
</template>

<script>
	import api from '@/api/api'
	import orderState from '@/components/orderState'
	export default {
		components: {
			orderState
		},
		data() {
			return {
				isshow: false,
				fgshow: false,
				indexs: '',
				tabs: [{
						name: '全部',
						id: 1
					},
					{
						name: '待付款',
						id: 2
					},
					{
						name: '待确认',
						id: 3
					},
					{
						name: '待服务',
						id: 4
					},
					{
						name: '服务中',
						id: 5
					},
				],
				num: 0, //tab
				numlist: 0, //综合
				numlist2: 0, //建议方式
				inishow: false,
				ids: '', //
				list_com: [],
				uploadFileUrl :api.uploadFileUrl + '/',
				page: 1,
				//				list_com: [{
				//						listnum: '20181216548979875498',
				//						payment: 0,
				//						type: 1,
				//						name: "消费柜清洗",
				//						xiangq: "啊手动阀手动阀手动阀手动阀按时的发按时的发按时的发按时的发按时的发大师傅大师傅按时的发",
				//						p_score: 4.5,
				//						xis: 2222,
				//						price: 90,
				//						price_y: '一口价',
				//					},
				//					{
				//						listnum: '20181216548979875498',
				//						payment: 1,
				//						type: 1,
				//						name: "消费柜清洗",
				//						xiangq: "啊手动阀手动阀手动阀手动阀按时的发按时的发按时的发按时的发按时的发大师傅大师傅按时的发",
				//						p_score: 4.5,
				//						xis: 2222,
				//						price: 90,
				//						price_y: '一口价',
				//					},
				//					{
				//						listnum: '20181216548979875498',
				//						payment: 2,
				//						type: 1,
				//						name: "消费柜清洗",
				//						xiangq: "啊手动阀手动阀手动阀手动阀按时的发按时的发按时的发按时的发按时的发大师傅大师傅按时的发",
				//						p_score: 4.5,
				//						xis: 2222,
				//						price: 90,
				//						price_y: '再谈价'
				//					},
				//					{
				//						listnum: '20181216548979875498',
				//						payment: 3,
				//						type: 1,
				//						name: "消费柜清洗",
				//						xiangq: "啊手动阀手动阀手动阀手动阀按时的发按时的发按时的发按时的发按时的发大师傅大师傅按时的发",
				//						p_score: 4.5,
				//						xis: 2222,
				//						price: 90,
				//						price_y: '再谈价'
				//					},
				//					{
				//						listnum: '20181216548979875498',
				//						payment: 4,
				//						type: 1,
				//						name: "消费柜清洗",
				//						xiangq: "啊手动阀手动阀手动阀手动阀按时的发按时的发按时的发按时的发按时的发大师傅大师傅按时的发",
				//						p_score: 4.5,
				//						xis: 2222,
				//						price: 90,
				//						price_y: '一口价',
				//					},
				//				],
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

			}
		},
		mounted() { //生命周期
			//    		alert(this.$route.query.name)
			this.getOrder();
		},
		methods: { //方法
			getOrder() {
				var that = this;
				var lists = {};
				lists.page = that.page;
				lists.limit = 50;
				that.$fetch('store_today_order',{}).then(rs =>{
          that.list_com = rs
				})
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
				console.log(index)
				let that = this
				that.num = index;
				let lists = {}
				var qs = require('qs');
				if(index == 1) {
					//								alert(index)
					lists.condition = {
						"order_state": 0,
						"order_type <> ": 3

					}
					that.$fetch('store_today_order',lists).then(rs =>{
            that.list_com = rs
					})
				} else if(index == 2) {
					lists.condition = {
						"order_state": 1,
						"order_type <> ": 3
					}
					that.$fetch('store_today_order',{}).then(rs =>{
            that.list_com = rs
					})
				} else if(index == 3) {
					//								alert(index)
					lists.condition = {
						"order_state": 2,
						"order_type <> ": 3
					}
					that.$fetch('store_today_order',{}).then(rs =>{
            that.list_com = rs
					})
				} else if(index == 4) {
					lists.condition = {
						"order_state": 3,
						"order_type <> ": 3,
						"order_comment_id": 0
					}
					that.$fetch('store_today_order',{}).then(rs =>{
            that.list_com = rs
					})
				} else {
					lists.condition = {
						"order_type <> ": 3,
					}
					that.$fetch('store_today_order',{}).then(rs =>{
            that.list_com = rs
					})
				}

			},
			menvaluate(its, index) {
				let that = this
				that.$router.push({
					path: '/menvaluate'
				})
			},
			//打开
			shows(its, index) {
				let that = this
				that.isshow = true
				that.indexs = index
				//				console.log(its)
			},

			//			支付
			ofgshow(its, index) {
				let that = this
				that.fgshow = true
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
			fgbut() {
				let that = this
				that.fgshow = false
			},
			fgxuz(fgitem, index) {
				let that = this
				that.num = index
			},

		},
	}
</script>

<style scoped>
	.find {
		width: 100%;
		height: 100%;
		background: #f5f5f5;
		/*background: #fff;*/
	}

	.top_nav {
		position: relative;
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
		color: #ff3434;
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
		flex: 0 0 2.6rem;
		margin-top: .1rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
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

	.but_coms_but3 {
		border: 0.01rem solid #f00 !important;
		color: #f00 !important;
	}

	.but_coms_but2 {
		border: 0.01rem solid #18b4ed !important;
		color: #18b4ed !important;
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
</style>
<style type="text/css">
	.find .van-nav-bar .van-icon {
		color: #fff !important;
	}
</style>
