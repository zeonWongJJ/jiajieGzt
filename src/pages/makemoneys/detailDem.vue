<template>
	<div class="detailDem">
		<div>
			<van-nav-bar title="需求详情" left-arrow @click-left="onClickLeft" >
				<!--<van-icon name="wap-nav" color="white" slot="right" />-->
			</van-nav-bar>
			<div v-show="rishow" @click.stop="orishow()" style="position: fixed;z-index: 9999; top: 0;right: 0;left: 0;bottom: 0; background: rgba(0,0,0,0); ">
				<div style="position: absolute;z-index: 9999; top: .45rem;right: 0;width: 1rem ;background: rgba(0,0,0,.2); ">
					<head-ri></head-ri>
				</div>
			</div>
		</div>
		<div class="div_box">
			<!--			<van-nav-bar class="head" title="需求详情" left-arrow @click-left="onClickLeft" />
-->
			<div class="content_container">
				<van-swipe :autoplay="3000" v-if="lists.demand_img.length>0">
					<van-swipe-item v-for="(images,index) in lists.demand_img" :key="index">
						<img src="../../assets/img/logo_h.png" v-if="images == 0" />
						<img v-lazy="uploadFileUrl  + images" v-else />
					</van-swipe-item>
				</van-swipe>
				<ul style="width: 100%;">
					<li>
						<div class="div_title">
							{{lists.subject_title}}
						</div>
					</li>
					<li>
						<p>需求描述</p>
						<span>{{lists.demand_info}}</span>
					</li>
					<li>
						<p>可服务时间</p>
						<span>{{lists.demand_service_at}}</span>
					</li>
					<li>
						<p>联系方式</p>
						<span>姓名：{{lists.demand_contact_name}}</span><br />
						<span>手机号:{{lists.demand_telephone}}</span>
					</li>
					<li>
						<p>联系地址</p>
						<span>{{lists.demand_address_name}}{{lists.demand_house_number}}</span>
					</li>
				</ul>
			</div>

		</div>
		<div class="bottom">
			<div class="btm_left">
				<span>¥{{lists.demand_remuneration}}</span>
			</div>
			<div class="btm_right" :class="{isstop:stop}" @click="jiedan()">接单</div>
		</div>
	</div>
</template>

<script>
	import api from '@/api/api'
	import headRi from '@/page/pages/head_ri_sub'

	export default {
		components: {
			headRi,
		},
		data() {
			return {
				rishow: false,
				pri: 9000,
				mes: "一口价",
				uploadFileUrl: api.uploadFileUrl + '/',
				balanceImg: [
					"../../assets/img/timg.png",
					"../../assets/img/timg.png",
				],
				data: [],
				lists: [],
				user_type: 0, //3店主
				staff_id: 0,
				stop: false,
			}
		},
		mounted() { //生命周期
			this.olitst()
		},
		methods: { //方法

			onClickRight() {
				let that = this
				that.rishow = !that.rishow
			},
			orishow() {
				let that = this
				that.rishow = false
			},
			onClickLeft() {
				this.$router.push({
					path: "makemoney"
				});
			},
			olitst() {
				let that = this
				that.$fetch('demand_get', {}, that.$route.query.item_id, 'POST', 0).then(rs => {
					that.lists = rs
				})
        that.$fetch('user_store_info_get', {},'','POST', 0).then(rs => {
          that.user_type = rs.staff_row.user_type;
          that.staff_id = rs.staff_row.user_id;
          console.log(rs)

        })
     
			},
			jiedan() {
				let that = this
				if(!that.stop) {
					that.stop = true;

					that.$fetch('demand_receipt', {}, that.$route.query.item_id).then(rs => {
						that.$toast('接单成功');

						setTimeout(() => {
							if(that.user_type == 3) {
								that.$router.push({
									path: '/store_orders'
								})
							} else {
								that.$router.push({
									path: '/store_orders_x',
									query: {
										staff_id: that.staff_id
									}
								})
							}
						}, 1000);
					}).catch(e => {
						that.stop = false;
					})
				} else {
					that.$toast('请不要频繁操作')
				}
			},

		},
	}
</script>

<style scoped>
	.detailDem {
		flex-wrap: wrap;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: auto;
	}
	
	.div_box {
		overflow: auto;
		width: 100%;
		height: calc( 100% - 1.07rem);
	}
	
	.head {
		background: #18b4ed;
		color: white;
	}
	
	.content_container,
	.body,
	.bottom,
	.btm_left,
	.btm_right {
		display: -webkit-box;
		display: flex;
	}
	
	.content_container {
		flex-wrap: wrap;
		height: 100%;
	}
	
	.content_container>div {
		width: calc( 4.75rem - 1rem);
		height: 2.22rem;
	}
	
	.content_container>div>img {
		width: 100%;
	}
	
	.content_container>ul {
		/*padding-left:0.12rem;*/
	}
	
	.content_container>ul>li {
		background: #fff;
		font-size: 0.2rem;
		margin-bottom: 0.05rem;
		padding: 0.1rem;
	}
	
	.content_container>ul>li>p {
		font-size: 0.16rem;
		font-weight: bold;
		margin: 0;
	}
	
	.div_title {
		font-weight: bold;
		padding: .05rem 0;
	}
	
	.content_container>ul>li>span {
		font-size: 0.14rem;
		color: #666666;
	}
	
	.bottom {
		width: 100%;
		height: 0.6rem;
		align-self: flex-end;
		justify-content: space-between;
		border-top: 1px solid #ddd;
		background: #fff;
	}
	
	.btm_left {
		padding-left: 0.12rem;
	}
	
	.btm_left,
	.btm_right {
		align-items: center;
	}
	
	.btm_left>span:first-child {
		font-size: 0.25rem;
		color: #ff3434;
	}
	/*.btm_left>span:last-child{
		color:white;
		font-size:0.14rem;
		background:#ff3434;
		padding:0.04rem 0.05rem;
		border-radius: 0.04rem;
		margin-left:0.09rem;
	}*/
	
	.btm_right {
		width: 1.3rem;
		font-size: 0.18rem;
		color: white;
		justify-content: center;
		background: #18b4ed;
	}
	
	.btm_right.isstop {
		background: #999999;
	}
</style>
<style>
	.detailDem .van-icon {
		color: white !important;
	}
	
	.detailDem .van-submit-bar {
		border-top: 1px solid #ddd;
	}
	
	.detailDem .van-submit-bar__price {
		text-align: left;
		padding-left: 0.2rem;
		font-size: 0.18rem;
	}
	
	.detailDem .van-button--danger {
		background: #18b4ed;
		border: 1px solid #18b4ed;
	}
	
	.van-swipe-item img {
		width: 100%;
		height: 100%;
	}
</style>
