<template>
	<div class="fomd_job">
		<van-nav-bar class="head" title="赚钱" />
		<van-tabs @click="navFun">
			<van-tab v-for="(a,index) in nav" :key='index' :title="a.data">
			</van-tab>
		</van-tabs>
		<!-- 弹框 -->
		<div class="lay" @click="layShow" v-show="layBox">
			<div class="serviceType">
				<a v-for="(item,index) in category_list" @click.stop="setCategoryId(item,index)" :class="{serCur:index==ser_Show}">{{item.cat_name}}</a>
			</div>
			<!--<div class="dealType" v-show="dealShow">
				<a v-for="(item,index) in deal" @click.stop="dealO(item,index)" :class="{dealCur:index==deal_Show}">{{item.data}}</a>
			</div>-->
		</div>
		<!-- 弹框 -->
		<div class="lay" @click="serShows" v-show="serShow">
			<div class="serviceType">
				<a v-for="(item,index) in rest" @click.stop="setRest(item,index)" :class="{serCur:index == deal_Show}">{{item.name}}</a>
			</div>
			<!--<div class="dealType" v-show="dealShow">
				<a v-for="(item,index) in deal" @click.stop="dealO(item,index)" :class="{dealCur:index==deal_Show}">{{item.data}}</a>
			</div>-->
		</div>

		<!-- 列表 -->
		<!--<div v-if="list == ''" style="text-align: center;margin-top: 0.3rem;color: #b2b2b2;">
			暂无需求
		</div>-->

		<div class="list_container">
			<scroller :on-infinite="infinite" ref="scroller_liststs">
				<ul class="list_container_ul" v-if="liststs">
					<li class="list_li" v-for="(item,index) in liststs" :id="item.id" @click="goDeatil(item,index)">
						<div class="list_left" v-if="item.demand_img">
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
					</li>
				</ul>
			</scroller>

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
				index:0,
				page: 1,
				end: false,
				firstFinish: false,
				uploadFileUrl: api.uploadFileUrl + '/',
				layBox: false,
				serShow: false,
				dealShow: false,
				ser_Show: 0,
				deal_Show: 0,
				nav: [{
						data: "综合排序"
					},
					{
						data: "服务类别"
					},
					{
						data: "离我最近"
					},
				],
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
				liststs: [],
				category_list: [],
				lal:''
			}
		},
		mounted() { //生命周期
			this.init();
			// 定位
      if (utils.is_android() && typeof android != 'undefined') {
        android.locationCurrentPosition();
      }
      if (utils.is_ios() && window.webkit && window.webkit.messageHandlers.locationCurrentPosition) {
        window.webkit.messageHandlers.locationCurrentPosition.postMessage({});
      }

      window['locationSuccess'] = res => {
//      		this.address = res.address;
      this.lal = res.longitude + ',' + res.latitude;
			}
		},
		methods: {
			init() {
				let req = {}
				req.condition = {
					"b.order_is_pay": 1,
					"b.order_belong_store_id": 0
				}
				req.page = this.page
				this.$fetch('demand_list', req).then(rs => {
					this.page++ //请求页数自加
					this.liststs = rs; //覆盖本地数据
					if(rs.length != 10) { //如果数据长度小于10证明下次请求没有数据
						this.end = true
						this.$refs.scroller_liststs.finishInfinite(true); //执行组件完成上拉方法(true代表没有数据)
					} else {
						this.$refs.scroller_liststs.finishInfinite(false); //执行组件完成上拉方法(true代表没有数据)
					}
					this.firstFinish = true //标记已完成第一次上拉
				}).catch(e=>{
					console.log(e);
					this.$refs.scroller_liststs.finishInfinite(false); //执行组件完成上拉方法(true代表没有数据)
				})
				this.getCategoryList();
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
						if(index == 0){
							this.serOs(0,done);
						}else if(index == 1){
							this.getDemandByCategoryId(0,done);
						}else{
							this.serju(0,done);
						}
					}

				}
			},
			layShow() {
				this.layBox = !this.layBox;

			},
			serShows() {
				this.serShow = !this.serShow;
			},
			navFun(index, title) {
				this.index = index
				if(index == 1) {
					this.layBox = true;
					this.serShow = false
				} else if(index == 0) {
					this.serShow = true;
					this.layBox = false;
				} else {
					this.layBox = false;
					this.serShow = false;
					this.serju(1);
				}

			},

			getCategoryList() {
        let lists = {}
        lists.condition = {
          parent_id: 0,
          cate_is_show: 1
        };
        lists.sort = {
          is_self_support: "desc",
          cate_sort: 'desc'
        }
        lists.only_get_support = 1
				this.$fetch('category_list', lists).then(rs => {
					this.category_list = rs
				})

			},

			//根据服务类别
			setCategoryId(item, index){
				this.ser_Show = index;
				this.layBox = !this.layBox;
				this.getDemandByCategoryId(1);
			},
			getDemandByCategoryId(page,done) {
				if(page){
					this.page = 1;
				}
				let req = {};
				req.condition = {
					"a.demand_level_1": this.category_list[this.ser_Show].id,
					"b.order_is_pay": 1,
					"b.order_belong_store_id": 0
				};
				req.page = this.page;
				this.$fetch('demand_list', req).then(rs => {
					this.page++ //请求页数自加
					if(page){
						this.liststs = rs; //覆盖本地数据
					}else{
						this.liststs = this.liststs.concat(rs);
					}
					if(rs.length != 10) { //如果数据长度小于10证明下次请求没有数据
						if(done){
							setTimeout(() => {
				                done(true)
			              	})
						}else{
							this.$refs.scroller_liststs.finishInfinite(true); //执行组件完成上拉方法(true代表没有数据)
						}
						this.end = true
					} else {
						if(done){
							setTimeout(() => {
				                done()
			              	})
						}else{
							this.$refs.scroller_liststs.finishInfinite(false); //执行组件完成上拉方法(true代表没有数据)
						}
					}
				}).catch(e=>{
					if(done){
						setTimeout(() => {
			                done(true)
		              	})
					}else{
						this.$refs.scroller_liststs.finishInfinite(false); //执行组件完成上拉方法(true代表没有数据)
					}
				})
			},


			//根据综合排序

			setRest(item, index){
				this.deal_Show = index;
				this.serShow = !this.serShow;
				this.serOs(1)
			},
			serOs(page,done) {
				if(page){
					this.page = 1
				}
				let req = {}
				req.page = this.page
				req.condition = {
					"b.order_is_pay": 1,
					"b.order_belong_store_id": 0
				}
				if(this.deal_Show == 1) {
					req.sort = {
						'a.demand_remuneration': 'desc'
					}
				} else if(this.deal_Show == 2) {
					req.sort = {
						'a.demand_remuneration': 'asc'
					}
				}
				this.$fetch('demand_list', req).then(rs => {
					this.page++ //请求页数自加
					if(page){
						this.liststs = rs;
					}else{
						this.liststs = this.liststs.concat(rs);
					}
					if(rs.length != 10){//如果数据长度小于10证明下次请求没有数据
	                  if(done){
	                  	  setTimeout(() => {
		                    done(true)//true返回已无数据
		                  })
	                  }else{
	                  	this.$refs.scroller_liststs.finishInfinite(true);
	                  }
	                  that.end = true

	                }else{
	                  if(done){
	                  	  setTimeout(() => {
		                    done()
		                  })
	                  }else{
	                  	this.$refs.scroller_liststs.finishInfinite(false);
	                  }
	                }
				}).catch(e => {
	              if(done){
	              	  setTimeout(() => {
		                done(true)
		              })
	              }else{
	              	this.$refs.scroller_liststs.finishInfinite(false); //执行组件完成上拉方法(true代表没有数据)
	              }
	            })
			},
			//			距离
			serju(page,done) {
				if(page){
					this.page = 1;
					// 定位
		          	if (utils.is_android()) {
			            android.locationCurrentPosition();
		          	}
			        // IOS app
		          	if (utils.is_ios() && window.webkit.messageHandlers.locationCurrentPosition) {
			            window.webkit.messageHandlers.locationCurrentPosition.postMessage({});
		          	}
				}
				if(this.lal){
					let req = {}
					req.locate_info = this.lal;
					req.page = this.page;
					this.$fetch('demand_list_lal', req).then(rs => {
						this.page++ //请求页数自加
						if(page){
							this.liststs = rs; //覆盖本地数据
						}else{
							this.liststs = this.liststs.concat(rs);
						}
						if(rs.length != 10){//如果数据长度小于10证明下次请求没有数据
		                  if(done){
		                  	  setTimeout(() => {
			                    done(true)//true返回已无数据
			                  })
		                  }else{
		                  	this.$refs.scroller_liststs.finishInfinite(true);
		                  }
		                  that.end = true
		                }else{
		                	if(done){
		                		setTimeout(() => {
			                    done()
			                  })
		                	}else{
		                		this.$refs.scroller_liststs.finishInfinite(false);
		                	}

		                }
					}).catch(e => {
						if(done){
							setTimeout(() => {
				                done(true)
			              	})
						}else{
							this.$refs.scroller_liststs.finishInfinite(false);
						}
		           })
				}else{
					this.$toast('定位出错');
				}

			},
			goDeatil(item, index) {

				this.$router.push({
					path: 'detailDem',
					query: {
						item_id: item.id
					}
				})
			},

		}
	};
</script>

<style scoped>
	.fomd_job {
		position: relative;
    height: 100%;
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
		position: absolute;
		top: 1rem;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .3);
		z-index: 9999;
	}

	.list_container {
		position: absolute;
		top: 1rem;
		left: 0;
		right: 0;
		bottom: 0;
		height: calc(100% - 1rem);
		overflow: auto;
		z-index: 9;
		background: #fff;
	}

	.list_container_ul {
		padding: 0.1rem;
		/*border-bottom: 0.01rem solid #eee;*/
	}

	.list_li {
		display: flex;
		background: #fff;
		margin-bottom: 0.1rem;
		padding: 0.1rem 0;
		box-shadow: 2px 2px 10px rgba(224, 243, 250, 1);
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
		margin-right: .15rem;
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

	.list_right>div:nth-child(2)>img {
		width: 0.1rem !important;
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
