<template>
	<div class="subshop">
		<!--false-->
		<transition name="slide-fade">
			<div class="subshop_f_top" v-show="!tab_show">
				<div class="f_top_div">
					<div>
						<div class="subshop_li">全部类别</div>
						<div @click="tab_show = !tab_show"><img src="../../assets/img/img_vx/service_h_top.png" /></div>
					</div>
					<div class="subshop_flaset">
						<ul ref="rrr">
							<li>
								<a :class="{subshop_li_f : 0 == num}" @click="tab_li(0)">全部</a>
							</li>
							<li v-for='(item ,index) in lists'>
								<a :class="{subshop_li_f : index+1 == num}" @click="tab_li(item,index+1)">{{item.cat_name}}</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</transition>
		<!--true-->
		<div class="subshop_t_top">
			<div class="ul_parent">
				<!--<span v-for='(item ,index) in lists' :class="{subshop_li : index == num_true}" @click="tab_li_true(index)">

					{{item}}
				</span>-->
				<ul class="ddd">
					<li :class="{subshop_li : 0 == num}" @click="tab_li_true(0)" id="ul0">
						全部
					</li>
					<li v-for='(item ,index) in lists' class="aaa" :class="{subshop_li : index + 1 == num}" :id="'ul'+ (index+1)" @click="tab_li_true(item,index+1)">
						{{item.cat_name}}
					</li>
				</ul>
			</div>
			<div class="img_parent" @click="tab_show = !tab_show"><img src="../../assets/img/img_vx/service_s_bottom.png" /></div>
		</div>

		<div class="box">
			<div class="box_list">
				<scroller :on-infinite="infinite" ref="scroller_lists_coms">
					<div class="box_list_li" v-for="(item,index) in lists_com" @click="service_details(item.id)">
						<div class="box_list_li_img">
							<img src="../../assets/img/logo_h.png" v-if="item.service_img == ''" />
							<img :src="uploadFileUrl + item.service_img[0]" alt="" v-else />
						</div>
						<div class="box_list_li_text">
							<div class="box_list_li_text_title">
								<h4>{{item.service_name}}</h4>
								<!--<span>{{item.type}}</span>-->
							</div>
							<div class="box_list_li_text_com">
								<div>
									<van-rate v-model="item.service_average_score" :size="10" disabled-color="#ff3434" void-color="#ceefe8" disabled/>
								</div>
								<div><span>&nbsp;&nbsp;{{item.service_average_score}}</span><span>&nbsp;&nbsp;|&nbsp;&nbsp;已售{{item.service_sold}}</span></div>
							</div>
							<!--<div class="box_list_li_text_star">tt5
								<span>评分<span>{{item.star}}</span></span>
							</div>-->
							<div class="box_list_li_text_money">
								<p>￥{{item.service_remuneration}} </p><span>{{order_charging_map[item.order_charging] || ''}}</span>
							</div>
						</div>
					</div>
				</scroller>
			</div>
			<!--<div class="box_list">
				<ul>
					<li class="box_list_li" v-for="(item,index) in lists_com"  :title="item">
						<div class="box_list_li_img">
							<img src="../../assets/img/find_server/server_7.png" />
						</div>
						<div class="box_list_li_text">
							<div class="box_list_li_text_title">
								<h4>{{item.title}}</h4>
							</div>
							<div class="box_list_li_text_com">
								<div>
								</div>
								<div><span>&nbsp;&nbsp;{{item.star}}</span><span>&nbsp;&nbsp;|&nbsp;&nbsp;已售200</span></div>
							</div>
							<div class="box_list_li_text_money">
								<p>￥{{item.money}} </p><span>{{item.type}}</span>
							</div>
						</div>
					</li>
				</ul>
			</div>-->

		</div>

	</div>
</template>

<script>
	import api from '@/api/api'
	export default {
		data() {
			return {
				order_charging_map: {
					FIXED_PRICE: '一口价',
					NON_RESERVATION: '免预约',
					HAS_RESERVATION:'预约金'
				},
				uploadFileUrl:api.uploadFileUrl+'/',
				lists: [],
				//				flase_lists:[
				//				'全部', '我', '你', '我们你的', '阿斯顿发射点给', '你', '我们你的', '我们你的你', '我们你的', '阿斯顿发射点给', '我们你的', '我们你的',
				//				],
				num: 0,
				//				num_false:0,
				tab_show: true,
				lists_com: [],
				loading: false,
				finished: false,
				list: [],
			}
		},
		//		props: ['serviceData'],
		mounted() { //生命周期
			this.init()
		},
		methods: { //方法
			//			分类
			serviceType() {
				let that = this;
				let lists = {}
        lists.condition = {
          parent_id: 0,
          cate_is_show: 1
        }
        lists.sort = {
          is_self_support: "desc",
          cate_sort: 'desc'
        }
        lists.only_get_support = 1
				that.$fetch('category_list', lists).then(rs => {
					that.lists = rs
				})

			},
			init() {
				this.serviceType()
				this.getServiceList()
			},
			getServiceList (categoryId = 0) {
				let urlAppend = parseInt(this.$route.query.statistics_id || 0);
				if (categoryId) {
					urlAppend = `${urlAppend}-${categoryId}`
				}
				this.$fetch('store_get_services', {
					page: this.page || 0
				}, urlAppend).then(rs => {
					this.page++ //请求页数自加
						this.lists_com = rs; //覆盖本地数据
					if(rs.length != 10) { //如果数据长度小于10证明下次请求没有数据
						this.end = true
						this.$refs.scroller_lists_coms.finishInfinite(true); //执行组件完成上拉方法(true代表没有数据)
					} else {
						this.$refs.scroller_lists_coms.finishInfinite(false); //执行组件完成上拉方法(true代表没有数据)
					}
					this.firstFinish = true //标记已完成第一次上拉
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
						var lists = {
							page: that.page
						}
						that.$fetch('store_get_services', lists, that.$route.query.statistics_id).then(rs => {
							setTimeout(() => {
								that.page++ //请求页数自加
									that.lists_com = that.lists_com.concat(rs); //合并至本地数据
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
      service_details(serverId){
        this.$router.push({
          path: '/service_details',
          query:{
            store_id:serverId
          }
        })
      },
			tab_li(item, index) {
				if(index == 0){
					this.num = 0
				}
				else{
					this.num = index
				}
				this.tab_show = !this.tab_show
				this.getServiceList(item.id || 0)
        this.$el.querySelector('#ul' + index).scrollIntoView();
				return false
			},
			tab_li_true(item, index) {
				if(index == 0){
					this.num = 0
				}else{
					this.num = index
				}

				this.getServiceList(item.id)
			},

		},

	}
</script>

<style scoped>
	.subshop {
		/*padding: 0 0.12rem;*/
	}

	a:hover {
		cursor: pointer
	}

	.subshop_f_top {
		position: absolute;
		top: 2.8rem;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .1);
		z-index: 9999;
	}

	.f_top_div {
		background: #fff;
	}

	.f_top_div div:nth-child(1) {
		height: .3rem;
		line-height: .3rem;
		padding: 0 0.12rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 0.01rem solid #f8f8f8;
	}

	.f_top_div div:nth-child(1) img {}

	.subshop_t_top {
		height: .35rem;
		line-height: .35rem;
		display: flex;
		justify-content: space-between;
	}

	.ul_parent {
		width: 3.4rem;
	}

	.ul_parent ul {
		width: 3.5rem;
		height: .35rem;
		line-height: .35rem;
		display: -webkit-box;
		overflow-x: auto;
		/*justify-content: space-between;*/
	}

	.subshop_t_top ul li {
		max-width: 1rem;
		margin: 0 .1rem;
	}

	.subshop_t_top ul::-webkit-scrollbar {
		display: none;
	}

	.subshop_t_top::-webkit-scrollbar {
		display: none;
	}

	.subshop_t_top>div:nth-child(1) {
		flex: 0 0 3.35rem;
		overflow-x: auto;
	}

	.subshop_t_top div:nth-child(2) {
		position: absolute;
		right: 0;
		width: .35rem;
		text-align: center;
	}

	.subshop_flaset ul {
		padding: .12rem 0;
		overflow: hidden;
		display: flex;
		flex-wrap: wrap;
	}

	.subshop_flaset ul li {}

	.subshop_flaset ul li a {
		display: block;
		color: rgb(51, 51, 51);
		height: .3rem;
		line-height: .3rem;
		text-align: center;
		padding: 0rem 0.1rem;
		margin: 0 0.05rem .1rem;
		border-radius: 0.02rem;
		background: #f2f3f7;
		border-radius: 0.02rem;
		border: 0.01rem solid #f2f3f7;
	}

	.subshop_li {
		color: #18b4ed;
	}

	a.subshop_li_f {
		color: #18b4ed !important;
		border: 0.01rem solid #18b4ed !important;
		background: #fff !important;
	}
	/* 可以设置不同的进入和离开动画 */
	/* 设置持续时间和动画函数 */

	.slide-fade-enter-active {
		transition: all .5s ease;
	}

	.slide-fade-leave-active {
		transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}

	.slide-fade-enter,
	.slide-fade-leave-to
	/* .slide-fade-leave-active for below version 2.1.8 */

	{
		transform: translateY(-30px);
		opacity: 0;
	}

	.box {
		position: absolute;
		top: 3.2rem;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 0 .12rem;
		height: calc(100% - 3.2rem);
		overflow: auto;
	}
	/*list*/

	.box_list {
		/*padding: 0 .12rem;*/
	}

	.box_list_li {
		background: #fff;
		display: flex;
		height: 1rem;
		padding-top: .15rem;
		border-radius: 0.03rem;
		margin-bottom: 0.12rem;
		box-shadow: 2px 2px 10px rgba(224, 243, 250, 1);
	}

	.box_list_li_img {
		flex: 0 0 .96rem;
	}

	.box_list_li_img img {
		margin-left: .1rem;
		border-radius: 0.05rem;
		width: .86rem;
		height: .86rem;
	}

	.box_list_li_text {
		width: 100%;
		margin-left: .14rem;
	}

	.box_list_li_text_title {
		position: relative;
		margin-bottom: .08rem;
	}

	.box_list_li_text_title h4 {
		padding: 0;
		margin: 0;
		width: 2rem;
		overflow: hidden;
		font-size: .16rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis
	}

	.box_list_li_text_com {
		display: flex;
	}

	.box_list_li_text_com span {
		color: #707070;
		font-size: .12rem;
	}
	/*.box_list_li_text_star {
		margin: 0.03rem 0;
	}

	.box_list_li_text_star>span {
		border: solid #ff9c00 .01rem;
		font-size: .12rem;
		color: #ff9c00;
		padding: 0 0 0.02rem .06rem;
		overflow: hidden;
		border-radius: 0.03rem;
	}

	.box_list_li_text_star>span span {
		display: inline-block;
		width: .27rem;
		font-size: .12rem;
		background: #ff9c00;
		color: #fff;
		text-align: center;
		padding: 0 0rem .02rem 0;
		margin-left: 0.01rem;
	}*/

	.box_list_li_text_money {
		display: flex;
		font-size: .18rem;
		color: #f00;
		align-items: center;
		margin: 0.15rem 0;
	}

	.box_list_li_text_money p {
		margin: 0 0.15rem 0 0;
		padding: 0 0;
	}

	.box_list_li_text_money span {
		font-size: .12rem !important;
		background: #f00;
		color: #fff;
		line-height: .15rem;
		padding: 0.02rem 0.05rem;
		border-radius: 0.03rem;
	}
</style>
