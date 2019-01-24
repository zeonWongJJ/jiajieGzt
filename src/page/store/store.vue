<template>
	<div class="store">
		<van-nav-bar title=" " left-arrow @click-left="onClickLeft" @click-right="onClickRight" v-if="user_type != 1">
			<van-icon name="upgrade" color="white" slot="right" v-if="canIrelease"/>
		</van-nav-bar>
		<van-nav-bar title=" " left-arrow @click-left="onClickLeft" v-else />
		<div class="body">
			<!--top-->
			<div class="top">
				<div class="img" @click="revise" v-if="user_type == 3">
					<img :src="getStorePic(store)"/>
					<div class="name">{{store.store_name}} <span class="right"></span></div>
					<div class="more">
						<span>店铺ID：  {{store.id}}</span>
						<span style="margin-left: .2rem;">店铺评分：  {{store.store_comment_count == 0 ? store.comment_average_score : (store.comment_average_score / store.store_comment_count).toFixed(2)}}</span>
					</div>
				</div>
				<div class="img" v-else>
					<img :src="getStorePic(store)"/>
					<div class="name">{{store.store_name}}</div>
					<div class="more">
						<span>店铺ID：  {{store.id}}</span>
						<span style="margin-left: .2rem;">店铺评分：  {{store.store_comment_count == 0 ? store.comment_average_score : (store.comment_average_score / store.store_comment_count).toFixed(2)}}</span>
					</div>
				</div>
				<div class="bgc"></div>
			</div>
			<!--center  v-if="user_type == 3"-->
			<div class="center">
				<div class="item" @click="goOrders">
					<div>{{statistics.order_count}}</div>
					<div>今日订单</div>
				</div>
				<!-- @click="goDeal"-->
				<div class="item">
					<div>{{statistics.pay_count}}</div>
					<div>今日交易额</div>
				</div>
				<div class="item" @click="toStoreProfit">
					<div>{{statistics.store_total_income}}</div>
					<div>服务收益</div>
				</div>
			</div>
			<!--share-->
			<div class="shareimg">
				<div class="img">
					<img src="../../assets/img/share.png"/>
				</div>
				<div class="right">
					<div class="h1">分享邀请好友加入店铺</div>
					<div class="h2">邀 / 好 / 友 / 一 / 起 / 赚 / 钱</div>
				</div>
			</div>
			<!--bottom-->
			<div class="bottom type1" v-if="user_type == 1">
				<div class="item" @click="revise">
					<img src="../../assets/img/store_set.png"/>
					<div>资料设置</div>
				</div>
				<div class="item" @click="comme">
					<img src="../../assets/img/store_comme.png"/>
					<div>店铺评价</div>
				</div>
				<div class="item" @click="order">
					<img src="../../assets/img/store_order.png"/>
					<div>订单管理</div>
				</div>
			</div>
			<div class="bottom type2" v-else>
				<div class="item" @click="setting">
					<img src="../../assets/img/store_set.png"/>
					<div>店铺设置</div>
				</div>
				<div class="item" @click="comme">
					<img src="../../assets/img/store_comme.png"/>
					<div>店铺评价</div>
				</div>
				<div class="item" @click="orders">
					<img src="../../assets/img/store_order.png"/>
					<div>订单管理</div>
				</div>
				<div class="item" @click="goServel">
					<img src="../../assets/img/store_server.png"/>
					<div>服务管理</div>
				</div>
				<div class="item" @click="toStaff">
					<img src="../../assets/img/store_staff.png"/>
					<div>员工管理</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import api from '@/api/api'
	export default {
		data(){
			return{
        canIrelease: false, // 判断是否能发布服务
				user_type:0,//3店主
				store:{},
				statistics:{},
				uploadFileUrl:api.uploadFileUrl+'/',
				statusGet:'',
				staff_id:0,
			}
		},

		mounted () {
		  this.McanIrelease()
			this.init();
		},
		methods:{
		  getStorePic(storeInfo) {
		    if (storeInfo.store_pic) {
          return this.uploadFileUrl + storeInfo.store_pic[0]
        }
      },
      McanIrelease() {
      	this.$fetch('can_i_use', {node_key: 'Service.insert'}).then(rs =>{
          this.canIrelease = true
      	})
      },
			init(){
				var that = this;
				//店铺详情
				that.$fetch('user_store_info_get', {}).then(rs =>{
          that.user_type = rs.staff_row.user_type;
          that.staff_id = rs.staff_row.user_id;
          if(that.user_type == 3){//店主
            this.$nextTick(() => {
              that.store = rs.own_store;
            })
          }else{//店员
            this.$nextTick(() => {
              that.store = rs.superior;
            })
          }
				})
				//店铺数据
				that.$fetch('user_store_statistics',{}).then(rs =>{
         		 that.statistics = rs
				})
			},
			toStoreProfit(){
				this.$router.push({
					path:'/storeProfit'
				})
			},
			goServel() {
				let that=this;
				if(Object.keys(that.store).length > 0){
					that.$router.push({
						path: '/serverList',
						query: {
							storeId:that.store.id
						}
					})
				}else{
					that.$toast('user_store_info_get:error');
				}

			},
			comme() {
				this.$router.push({
					path: "commentAdmin"
				});
			},
			goOrders() {
				this.$router.push({
					path: "storeOrders"
				});
			},
			setting(){
				this.$router.push({
					path:'/storeSet'
				})
			},
			order(){
				this.$router.push({
					path:'/store_orders_x',
					query:{
						staff_id:this.staff_id
					}
				})
			},
			orders(){
				this.$router.push({
					path: '/store_orders'
				})
			},
			toStaff(){
				this.$router.push({
					path: '/store_staff'
				})
			},
			onClickLeft(){
				this.$router.push({
					path:'/member'
				})
			},
			onClickRight(){
				this.$router.push({
					path: "release_service"
				});
			},
			revise(){
				var that = this;
				that.$router.push({
					path: '/storeApply',
					query: {
						type: that.user_type
					}
				})
			}
		}

	}
</script>

<style scoped>
	.store{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #f5f5f5;
	}
	.store .body{
		height: calc(100% -.46rem);
		overflow: hidden;
	}
	.store .body .top{
		/*height: 1.33rem;*/
		width: 100%;
		line-height: 0;
		text-align: center;
		position: relative;
		padding: .15rem 0;
		border-bottom: 1px solid #f5f5f5;
		background: #fff;

	}
	.store .body .top .img>img{
		height: 1.05rem;
		width: 1.05rem;
		border-radius: 50%;
		border: 1px solid #fff;
		position: relative;
		z-index: 100;
	}
	.store .body .top .name{
		font-size: .18rem;
		line-height: .18rem;
		margin: .05rem;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.store .body .top .name .right{
		margin-left: .1rem;
		height: .15rem;
		width: .2rem;
		background: url(../../assets/img/more_gray.png) no-repeat;
		background-size: auto .15rem;
	}
	.store .body .top .more{
		color:#707070;
		padding: .15rem 0 .1rem;
	}
	.store .body .top .bgc{
		background: #18B4ED;
		height: calc(50% - .2rem);
		width: 100%;
		z-index: 1;
		position: absolute;
		top: 0;
	}
	.store .body .center{
		display: flex;
		margin-bottom: .1rem;
	}
	.store .body .center .item{
		flex: 1;
		text-align: center;
		background: #fff;
		padding: .15rem;
	}
	.store .body .center .item+.item{
		border-left: 1px solid #f5f5f5;
	}
	.store .body .shareimg{
		background: #fff;
		padding: .15rem;
		display: flex;
	}
	.store .body .shareimg .img{
		width: 1.31rem;
	}
	.store .body .shareimg .img>img{
		width: 100%;
		height: auto;
	}
	.store .body .shareimg .right{
		flex: 1;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.store .body .shareimg .right .h1{
		font-size: .18rem;
		font-weight: 700;
	}
	.store .body .shareimg .right .h2{
		font-size: .12rem;
		color: #b2b2b2;
	}
	.store .body .bottom{
		display: flex;
		flex-wrap: wrap;
		background: #fff;
	}
	.store .body .bottom.type1 .item{
		flex: 1;
		text-align: center;
		padding: .15rem 0;
		border-top: 1px solid #f5f5f5;
	}
	.store .body .bottom.type1 .item+.item{
		border-left: 1px solid #f5f5f5;
	}
	.store .body .bottom.type2 .item{
		flex: 0 0 33%;
		text-align: center;
		padding: .15rem 0;
		border-top: 1px solid #f5f5f5;
		border-right: 1px solid #f5f5f5;
	}
	.store .body .bottom .item:nth-child(3),.store .body .bottom .item:nth-child(6){
		border-right:0;
	}
	.store .body .bottom .item>img{
		height: .55rem;
		width: .55rem;
		border-radius: 50%;
	}
</style>
<style type="text/css">
	.store .van-hairline--bottom::after{
		border: 0;
	}
</style>
