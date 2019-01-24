<template>
	<div class="shop">
		<div class="left_rigth">
			<div class="left_le" @click="onleft">
			</div>
			<!--<div class="left_ri">
				<img src="../../assets/img/img_vx/shop_ri.png" />
			</div>-->
		</div>

		<div class="shop_top" v-if="Object.keys(serviceData).length">
			<div class="shop_top_img">
				<!--<img src="../../../src/assets/img/logo_h.png" />-->
				<img src="../../../src/assets/img/logo_h.png" v-if="serviceData.store_pic == ''" />
				<img :src="uploadFileUrl + serviceData.store_pic" v-else/>

			</div>
			<div class="text title">{{serviceData.store_name}}</div>
			<!--<div class="text text_sapn">{{serviceData.store_info.city_name}}&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;服务次数100&nbsp;|&nbsp;&nbsp;&nbsp;好评率{{store.store_comment_count == 0 ? store.comment_average_score : (store.comment_average_score / store.store_comment_count).toFixed(2)}}%</div>-->
			<div class="text text_sapn">{{serviceData.store_region}}&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;服务次数{{serviceData.store_sold}}次&nbsp;|&nbsp;&nbsp;好评率{{serviceData.comment_average_score}}%</div>

			<div class="text text_p">
				<div><img src="../../assets/img/img_vx/shop_h_shou.png" /></div>
				<div>企业认证 </div>
				<div class="com_com_ri" v-if="serviceData.store_type == 'ENTERPRISE'">企业</div>
				<div class="com_com_ri" v-else-if="serviceData.store_type == 'CO_OPERATOR'">供应商</div>
				<div class="com_com_ri" v-else>自营</div>
			</div>
			<!--<div class="shop_top_po po_top" v-if="" @click="toCollect()">-->
				<!--{{serviceData.store_collected ? '已收藏' : '收藏'}}-->
			<!--</div>-->
		</div>
		<!--tab-->
		<ul class="tab_ul">
			<li class="tab_li" v-for="(item,index) in list_tab" @click="onTab(item.id,index)">
				<span :class="{tabli_h : index == num}">{{item.name}}</span>
			</li>

		</ul>
		<shopsx :is='currentTab' :serviceData='serviceData'   keep-alive></shopsx>

	</div>
</template>

<script>
	import api from '@/api/api'
	import shopsx from '@/pages/Subcomponent/subShop';
	import evalsx from '@/pages/Subcomponent/subShop_eval';
	import busines from '@/pages/Subcomponent/subShop_busines';
	export default {
		components: {
			shopsx,
			evalsx,
			busines
		},
		data() {
			return {
				store: {},
				statistics: {},
				num: 0,
				uploadFileUrl: api.uploadFileUrl + '/',
				isshow: false,
				click_false:true,
				list_tab: [{
						name: '服务',
						id: 'shopsx'
					},
					{
						name: '评价',
						id: 'evalsx'
					}, {
						name: '商家',
						id: 'busines'
					}
				],
				currentTab: 'shopsx',
				serviceData: {},

			}
		},
		mounted() { //生命周期
			this.init()
		},
		methods: { //方法
			//				init(){
			//				var that = this;
			//				//店铺详情
			//				that.$fetch('user_store_info_get', {}).then(rs =>{
			//			          that.user_type = rs.staff_row.user_type;
			//			          that.staff_id = rs.staff_row.user_id;
			////			          if(that.user_type == 3){//店主
			//			            this.$nextTick(() => {
			//			              that.store = rs.own_store;
			//			            })
			////			          }else{//店员
			////			            this.$nextTick(() => {
			////			              that.store = rs.superior;
			////			            })
			////			          }
			//				})
			//				//店铺数据
			//				that.$fetch('user_store_statistics',{}).then(rs =>{
			//     				   that.statistics = rs
			//				})
			//			},
			init() {
				this.$fetch('store_get', {
					comment_store_id : this.$route.query.statistics_id
				}, this.$route.query.statistics_id).then(rs => {
					this.serviceData = rs;
					//		          	this.collection = rs.user_collected;

					//			              this.images = this.images.concat(rs.service_img);
					//			          this.comment_count = rs.comment_count;
					//			          this.user_collected = rs.user_collected
					//			          this.comment_list()
				})
			},

			// toCollect() {
			// 	if(this.click_false) {
			// 		this.click_false = false
			// 		this.$fetch('user_collect', {
			// 			collect_type: 'STORE'
			// 		}, this.serviceData.id).then(rs => {
			// 			this.serviceData.store_collected = !this.serviceData.store_collected;
			// 			this.$toast(this.serviceData.store_collected ? '收藏成功' : '已取消收藏');
			// 			setTimeout(() => {
			// 				this.click_false = true
			// 			}, 1000)
			// 		}).catch(e => {
			// 			this.click_false = true
			// 		})
			// 	}
			// },

			onleft() {
			  if (!this.$route.query.storeUnshow) {
          this.$store.commit('store_show', false)
        }
				this.$router.back(-1)
			},
			onTab(item, index) {
				this.currentTab = item
				this.num = index
			}
		},

	}
</script>

<style scoped>
	.tab_ul {
		display: flex;
		padding: 0.05rem 0;
		box-shadow: 2px 2px 10px rgba(224, 243, 250, 1);
	}

	.tab_li {
		width: 33.3%;
		height: .44rem;
		line-height: .44rem;
		text-align: center;
		font-size: .16rem;
		font-weight: 700;
	}

	.tabli_h {
		color: #18b4ed;
		border-bottom: .02rem solid #18b4ed;
	}

	.tab_li span {
		padding: 0 0 0.1rem 0;
	}

	.shop {
		width: 3.75rem;
		height: 100%;
		/*overflow: hidden;*/
	}

	.left_rigth {
		position: relative;
		width: 100%;
		height: .9rem;
		background: url(../../assets/img/img_vx/shop_top.png) no-repeat;
		background-size: 100% 100%;
	}

	.left_le {
		width: .35rem;
		height: .35rem;
		position: absolute;
		top: .1rem;
		left: 0.05rem;
		background: url(../../assets/img/img_vx/shop_le.png) no-repeat;
		background-size: .1rem .175rem;
		background-position: 50%;
	}

	.left_ri {
		width: .35rem;
		height: .35rem;
		border-radius: 50%;
		background: rgba(0, 0, 0, .2);
		position: absolute;
		top: .1rem;
		right: 0.12rem;
	}

	.left_ri img {
		padding: .07rem;
		width: .2rem;
		height: .2rem;
	}

	.shop_top {
		position: relative;
		height: 1.35rem;
		width: 100%;
		box-shadow: 2px 2px 10px rgba(224, 243, 250, 1);
	}

	.shop_top_img {
		position: absolute;
		top: -0.7rem;
		left: 50%;
		width: 1.07rem;
		height: 1.07rem;
		margin-left: -0.525rem;
		background: #fff;
		border-radius: 50%;
		border: none;
		overflow: hidden;
	}

	.shop_top_img img {
		margin: .03rem;
		width: 1.01rem;
		height: 1.01rem;
		border-radius: 50%;
		border: none;
	}

	.title {
		font-size: .18rem;
		font-weight: 700;
		padding-top: .4rem;
	}

	.text {
		text-align: center;
	}

	.text_sapn {
		font-size: .12rem;
		margin: .1rem 0 0.08rem 0;
	}

	.text_p {
		display: flex;
		justify-content: center;
		align-items: auto;
		font-size: .14rem;
	}
	.text_p div:nth-child(2){
		margin: 0 .15rem;
	}
	.text_p img {
		width: .18rem;
		/*margin: 0 0.3rem 0 0;*/
	}

	.shop_top_po {
		position: absolute;
		right: 0;
		text-align: center;
		border-radius: .5rem 0 0 .5rem;
		padding: .05rem 0;
	}

	.po_top {
		top: .4rem;
		width: .65rem;
		border: .01rem solid #eee;
	}

	.po_bot {
		top: .8rem;
		width: .65rem;
		background: #1dd1f1;
		color: #fff;
	}

	.po_bot img {
		width: .15rem;
		margin-right: .05rem;
		vertical-align: middle;
	}

	.box {
		position: absolute;
		top: 0.44rem;
		left: 0;
		right: 0;
		/*bottom: 0;*/
		height: calc(100% - 3rem);
		overflow: auto;
		z-index: 9999;
	}
		.com_com_ri {
		/*position: absolute;*/
		/*top: -.06rem;*/
		/*right: 0.1rem;*/
		border: 0.01rem solid #ff9c0f;
		color: #ff9c0f;
		font-size: .12rem;
		border-radius: .05rem;
		padding: 0 .04rem;
	}
</style>
