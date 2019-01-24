<template>
	<div class="fomd_job">
		<van-nav-bar class="head" title="找活干" />
		<van-tabs @click="serFun">
			<van-tab v-for="(a,index) in tle" :key='index' :title="a.data">
			</van-tab>
		</van-tabs>
		<!-- 弹框 -->
		<div class="lay" @click="layShow" v-show="layBox">
			<div class="serviceType">
				<a v-for="(item,index) in ser" @click.stop="serO(item,index)" :class="{serCur:index==ser_Show}">{{item.cat_name}}</a>
			</div>
			<!--<div class="dealType" v-show="dealShow">
				<a v-for="(item,index) in deal" @click.stop="dealO(item,index)" :class="{dealCur:index==deal_Show}">{{item.data}}</a>
			</div>-->
		</div>
		<!-- 弹框 -->
		<div class="lay" @click="serShows" v-show="serShow">
			<div class="serviceType">
				<a v-for="(item,index) in rest" @click.stop="serOs(item,index)" :class="{serCur:index == deal_Show}">{{item.name}}</a>
			</div>
			<!--<div class="dealType" v-show="dealShow">
				<a v-for="(item,index) in deal" @click.stop="dealO(item,index)" :class="{dealCur:index==deal_Show}">{{item.data}}</a>
			</div>-->
		</div>

		<!-- 列表 -->
		<div class="list_container" v-if="list != ''">
			<ul>
				<li v-for="(item,index) in list" :id="item.id" @click="goDeatil(item,index)">
					<a>
						<div class="list_left">
							<!--<img :src="uploadFileUrl + item.demand_img[0]" alt="" />-->
							<img src="../../assets/img/logo_h.png" v-if="item.demand_img == ''" />
							<img :src="uploadFileUrl + item.demand_img[0]" v-else />
						</div>
						<div class="list_right">
							<div>
								<span>{{item.subject_title}}</span>
								<!--<span>{{item.km}}km</span>-->
							</div>
							<div>
								<span>{{item.demand_info}}</span>
								<img src="../../assets/img/right.png" alt="" />
							</div>
							<div>
								<span>¥{{item.demand_remuneration}}</span>
							</div>
						</div>
					</a>
				</li>
			</ul>

		</div>
		<div v-else style="text-align: center;margin-top: 0.3rem;color: #b2b2b2;">
			暂无需求
		</div>
		<!-- 列表 -->
	</div>

</template>

<script>
	import api from '@/api/api'
  import utils from '@/utils/utils'

	export default {
		data() {
			return {
				uploadFileUrl: api.uploadFileUrl + '/',
				layBox: false,
				serShow: false,
				dealShow: false,
				ser_Show: 0,
				deal_Show: 0,
				list: [],
				rest: [{
						name: '全部'
					},
					{
						name: '价格高到低'
					},
					{
						name: '价格低到高'
					},
				],
				//				list: [{
				//						id: 1,
				//						img: "../../../static/images/login_j.png",
				//						name: "流氓兔1",
				//						type: "厨房清洁1",
				//						km: "6",
				//						cri: "balabalabalabalabalabalabalabala",
				//						price: "90",
				//						payType: "一口价"
				//					},
				//					{
				//						id: 2,
				//						img: "../../../static/images/login_j.png",
				//						name: "流氓兔2",
				//						type: "厨房清洁2",
				//						km: "4",
				//						cri: "balabalabalabalabalabalabalabala",
				//						price: "100",
				//						payType: "定金"
				//					},
				//				],

				tle: [{
						data: "综合排序"
					},
					{
						data: "服务类别"
					},
					{
						data: "离我最近"
					},
					//					{
					//						data: "交易方式"
					//					},
				],
				ser: [],
				lat: sessionStorage.getItem('lat'),
				lng: sessionStorage.getItem('lng')
			}
		},
		mounted() { //生命周期
			this.olists()
		},
		methods: {
			olists() {
				let that = this
				let lists = {}
				lists.condition = {
					"b.order_is_pay": 1,
					"b.order_belong_store_id": 0
				}
				lists.rows = 500
				that.$fetch('demand_list', lists).then(rs => {
          that.list = rs
        })
			},

			layShow() {
				this.layBox = !this.layBox;

			},
			serShows() {
				this.serShow = !this.serShow;
			},
			serFun(index, title) {
				if(index == 1) {
					this.layBox = true;
					this.serShow = false
					//					this.dealShow = false;
					this.serviceType()
				} else if(index == 0) {
					this.serShow = true;
					this.layBox = false;
				} else {
					this.serju()
					this.layBox = false;
					this.serShow = false
				}

			},
			serviceType() {
				let that = this;
				let lists = {}
				lists.condition = {
					parent_id: 0
				};
				lists.rows = 500
				that.$fetch('category_list', lists).then(rs => {
          that.ser = rs
        })
			},

			//			dealType(){
			//				let that = this;
			//				let lists ={}
			//				lists.condition = {
			//					"a.demand_pay_type":"price"
			//				};
			//				lists.rows = 50
			//				var qs = require('qs');
			//				that.axios({
			//						method: 'post',
			//						headers: {
			//							"Content-Type": "application/x-www-form-urlencoded"
			//						},
			//						url: api.demand_list,
			//						data: qs.stringify(lists) //传参变量
			//
			//					})
			//					.then(function(res) {
			//
			//				})
			//			},

			serO(item, index) {
				var that = this;
				that.list = item.id
				console.log(that.list);
				that.ser_Show = index;
				that.layBox = !that.layBox;
				let lists = {}
				lists.condition = {
					//					parent_id: item.id
					"a.demand_level_1": item.id,
					"b.order_is_pay": 1,
					"b.order_belong_store_id": 0
				};
				lists.rows = 500
				that.$fetch('demand_list', lists).then(rs => {
          that.list = rs
        })
			},
			serOs(item, index) {
				var that = this;
				//				that.list=item.id
				that.deal_Show = index;
				that.serShow = !that.serShow;
				let lists = {}

				if(index == 1) {
					lists.sort = {
						'a.demand_remuneration': 'desc'
					}
				} else if(index == 2) {
					lists.sort = {
						'a.demand_remuneration': 'asc'
					}
				} else {

				}
				lists.rows = 500
				lists.condition = {
					"b.order_is_pay": 1,
					"b.order_belong_store_id": 0
				}
				that.$fetch('demand_list', lists).then(rs => {
          that.list = rs
        })
			},
			//			距离
			serju() {
				var that = this;
				let lists = {}
				if (!this.lng || !this.lat) {
				  return this.$toast('定位失败!');
        }
				// lists.lal = this.lng + ',' + this.lat
        lists.lng = this.lng
        lists.lat = this.lat
				lists.rows = 50
				that.$fetch('demand_list', lists).then(rs => {
          that.list = rs
        })
			},
			//			dealO(item, index) {
			//				this.deal_Show = index;
			//				this.layBox = !this.layBox;
			//			},
			goDeatil(item, index) {
				this.$router.push({
					path: 'detailDem',
					query: {
						item_id:item.id
					}
				})
			},

		}
	};
</script>

<style scoped>
	.fomd_job {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.head {
		background: #18b4ed;
		color: white;
	}

	.serviceType,
	.dealType {
		width: 100%;
		display: flex;
		position: absolute;
		align-items: center;
		flex-wrap: wrap;
		background: white;
		z-index: 99;
		padding-bottom: 0.1rem;
	}

	.serviceType>a,
	.dealType>a {
		height: 0.38rem;
		line-height: 0.38rem;
		text-align: center;
		flex: 0 0 28%;
		margin-left: 3.5%;
		margin-top: 0.14rem;
		color: #707070;
		border: 1px solid #cccccc;
		border-radius: 0.04rem;
	}

	.serCur,
	.dealCur {
		color: #18b4ed !important;
		border: 1px solid #18b4ed !important;
	}

	.lay {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 1rem;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .3);
		z-index: 9999;
	}

	.list_container {
		height: calc(100% - 1rem);
		overflow: auto;
	}

	.list_container>ul>li {
		border-bottom: 0.01rem solid #eee;
	}

	.list_container>ul>li>a,
	.list_left,
	.list_right>div {
		display: flex;
	}

	.list_container>ul>li>a {
		justify-content: flex-start;
		align-items: center;
		background: white;
		margin-top: 0.1rem;
		padding: 0.13rem 0;
	}

	.list_left {
		width: 0.85rem;
		flex-wrap: wrap;
		justify-content: center;
		margin-left: 0.12rem;
	}

	.list_left>img {
		width: 0.85rem;
		height: 0.85rem;
		border-radius: 0.03rem;
	}

	.list_left>span {
		font-size: 0.14rem;
		margin-top: 0.05rem;
	}

	.list_right {
		width: 2.5rem;
		margin-left: 0.15rem;
	}

	.list_right>div {
		margin-bottom: 0.14rem;
	}

	.list_right>div:nth-child(1),
	.list_right>div:nth-child(2),
	.list_right>div:nth-child(3) {
		justify-content: space-between;
		align-items: center;
	}

	.list_right>div:nth-child(1)>span:first-child {
		font-size: 0.16rem;
		color: black;
		font-weight: bold;
	}

	.list_right>div:nth-child(1)>span:last-child {
		font-size: 0.14rem;
		/*color:#b2b2b2;*/
	}

	.list_right>div:nth-child(2)>span {
		width: 2.15rem;
		font-size: 0.14rem;
		color: #707070;
		word-break: break-all;
		word-wrap: break-word;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.list_right>div:nth-child(3) {
		justify-content: flex-start;
	}

	.list_right>div:nth-child(3)>span:first-child {
		font-size: 0.18rem;
		color: #ff3434;
	}

	.list_right>div:nth-child(3)>span:last-child {
		font-size: 0.1rem;
		padding: 0.03rem 0.06rem;
		color: white;
		background: #ff3434;
		border-radius: 0.04rem;
		margin-left: 0.08rem;
	}
</style>
<style>
	.fomd_job .content {
		background: #f3f2f3;
	}

	.fomd_job .van-nav-bar__title {
		/*font-size: 0.18rem;*/
	}

	.fomd_job .van-tabs__line {
		/*width: 0.5rem !important;*/
		background: #18b4ed;
		border-bottom: 1px solid #ddd;
	}

	.fomd_job .van-tab--active {
		color: #18b4ed;
	}

	.fomd_job .van-tab {
		position: relative;
		/*font-size:0.16rem;*/
	}
</style>
