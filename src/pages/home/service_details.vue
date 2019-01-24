<template>
	<div style="height: 100%;padding-bottom: .8rem;">
		<div class="showAbs_box" v-if="Object.keys(serviceData).length">
			<div class="header-fixed" v-show="!showAbs" :style="opacityStyle">
				<div class="header-fixed-back">
					<div class="left_le" @click="left_le()">
						<img src="../../assets/img/img_vx/shop_le.png" />
					</div>
					<ul>
						<li class="fixed_li" v-for="(item,index) in alist">
							<!--<a :href="'#ul'+index" :class="{shlist :  index ==num}" @click="onshowlist(index)">{{item.name}}</a>-->
							<span :class="{shlist :  index ==num}" @click="onshowlist(index)">{{item.name}}</span>
							<!--{{item.name}}-->
						</li>
					</ul>
					<div class="left_ri" @click="share">
						<img src="../../assets/img/img_vx/shop_ri.png" />
					</div>
				</div>
			</div>
			<div class="left_rigth " v-show="showAbs">
				<div class="left_le" @click="left_le()">
					<img src="../../assets/img/img_vx/shop_le.png" />
				</div>

				<div class="left_ri" @click="share">
					<img src="../../assets/img/img_vx/shop_ri.png" />
				</div>
			</div>
			<div class="box">
        <floor-one :serviceData="serviceData"></floor-one>
        <floor-two :serviceData="serviceData"></floor-two>
        <floor-three :serviceData="serviceData"></floor-three>
        <floor-four :serviceData="serviceData"></floor-four>
        <floor-five v-if="serviceData.store_info.store_type != 'SELF_SUPPORT'" :serviceData="serviceData"></floor-five>
			</div>
			<!--底部-->
			<div class="bot_box">
				<div class="bot_box_div">
					<div class="bot_box_le">
						<div>
							<ul class="bot_box_ul">

								<li @click="call">
									<div class="bot_box_li_img">
										<img src="../../assets/img/service.png" />
									</div>
									<div class="bot_box_li_text">
										电话客服
									</div>
								</li>
								<li @click="onCollection">
									<div v-if="!collection">
										<div class="bot_box_li_img">
											<img src="../../assets/img/img_vx/bottom_4.png" />
										</div>
										<div class="bot_box_li_text">
											收藏
                    </div>
									</div>
									<div v-else>
										<div class="bot_box_li_img">
											<img src="../../assets/img/img_vx/bottom_4_h.png" />
										</div>
										<div class="bot_box_li_text" style="color: #18b4ed">
											已收藏
										</div>
									</div>
								</li>
								<li class="bot_box_li">
									<!--<div class="bot_box_li_img">
										<img src="../../assets/img/img_vx/bottom_4.png" />
									</div>
									<div class="bot_box_li_text">
										在线客服
									</div>-->
								</li>
							</ul>
						</div>
					</div>
					<div class="bot_box_ri">
						<span @click.stop="onweek()" v-if="serviceData.row.service_value_unit_id == 2">周期预约</span>
						<span @click.stop="onsecond()">单次预约</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import floorOne from '@/pages/Subcomponent/floorOne';
	import floorTwo from '@/pages/Subcomponent/floorTwo';
	import floorThree from '@/pages/Subcomponent/floorThree';
	import floorFour from '@/pages/Subcomponent/floorFour';
	import floorFive from '@/pages/Subcomponent/floorFive';

	export default {
		components: {
			floorOne,
			floorTwo,
			floorThree,
			floorFour,
			floorFive
		},
		data() {
			return {
				store_id: Number(this.$route.query.store_id) || 0,
				collection: false,
				alist: [{
						name: "介绍",
						id: 1
					},
					{
						name: "流程",
						id: 2
					},
					{
						name: "设备",
						id: 3
					},
					{
						name: "标准",
						id: 4
					},
					{
						name: "评价",
						id: 5
					},

				],
				event_top: '',
				event_two: '',
				event_three: '',
				event_four: '',
				event_five: '',
				showlist: true,
				num: 0,
				showAbs: true,
				opacityStyle: {
					opacity: 0
				},
				click_false: true,
				serviceData: {},
				unitList:[
					{
						id:1,
						unit_name:'元/次'
					},
					{
						id:2,
						unit_name:'元/小时'
					},
					{
						id:3,
						unit_name:'元/个'
					},
					{
						id:4,
						unit_name:'元/平米'
					},
					{
						id:5,
						unit_name:'元/间'
					}
				]
			}
		},
		methods: {

			getUnit(id){
				let name = '';
				if(this.unitList.length){
					this.unitList.forEach(item =>{
						if(item.id == id){
							name = item.unit_name
						}
					})
				}
				return name
			},
			//			点击收藏
			onCollection() {
				if(this.click_false) {
					this.click_false = false
					this.$fetch('user_collect', {
						collect_type: 'SERVICE'
					}, this.store_id).then(rs => {
						this.collection = !this.collection
						this.$toast(this.collection ? '收藏成功' : '已取消收藏');
						setTimeout(() => {
							this.click_false = true
						}, 1000)
					}).catch(e => {
						this.click_false = true
					})
				}
			},
			//周
			onweek() {

				if(this.serviceData.service_items.length > 0) {
					this.$router.push({
						path: '/bespeak_order',
						query: {
							service_id: this.store_id,
							type: 2
						}
					})
				} else {
					this.$router.push({
						path: '/reservation_week',
						query: {
							store_id: this.store_id
						}
					})
				}
				//				if(that.click_false) {
				//					that.click_false = false
				//					 that.$fetch('user_code_send', lists).then(rs => {
				//				            if (rs.error == 0) {
				//				              setTimeout(() => {
				//									this.click_false = true
				//								},1000)
				//				            } else {
				//				              setTimeout(() => {
				//									this.click_false = true
				//								},1000)
				//				            }
				//				          })
				//				}
			},
			//一次
			onsecond() {
				if(this.serviceData.service_items.length > 0) {
					this.$router.push({
						path: '/bespeak_order',
						query: {
							service_id: this.store_id,
							type: 1
						}
					})
				} else {
					this.$router.push({
						path: '/reservation_second',
						query: {
							store_id: this.store_id,
						}
					})
				}
			},

			left_le() {
				if(this.serviceData.store_info.store_type == 'SELF_SUPPORT') { //自营
          this.$router.go(-1)
					// this.$router.push({
					// 	path: '/home',
					// })
				} else {
					this.$router.push({
						path: '/service_list',
						query: {
							id: this.serviceData.row.service_level_1
						}
					})
				}

			},
			handleScroll() {
				const top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
				if(top > 0) {
					let opacity = top / 80
					opacity = opacity > 1 ? 1 : opacity
					this.opacityStyle = {
						opacity
					}
					this.showAbs = false
				} else {
					this.showAbs = true
				}
			},
			show_list() {
				const top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
				let top2 = Number(this.event_top) + Number(this.event_two);
				let top3 = top2 + Number(this.event_three);
				let top4 = top3 + Number(this.event_four);
				let top5 = top4 + Number(this.event_five);
				if(top > 0 && top <= this.event_top) {
					this.num = 0
				} else if(top > this.event_top && top <= top2) {
					this.num = 1
				} else if(top > top2 && top <= top3) {
					this.num = 2
				} else if(top > top3 && top <= top4) {
					this.num = 3
				} else if(top > top4 && top <= top5) {
					this.num = 4
				}else{
					this.num = 4
				}

			},
			onshowlist(index) {
				this.num = index
				var anchor = this.$el.querySelector('#ul' + index)
				if(document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset){
					document.documentElement.scrollTop = anchor.offsetTop
					document.body.scrollTop = anchor.offsetTop
					window.pageYOffset = anchor.offsetTop
				}
			},
			init() {
				this.$fetch('service_get', {
					get_store_info: 1
				}, this.store_id).then(rs => {
					this.serviceData = rs;
					this.collection = rs.service_collected;
				})
			},
			share() {
				this.$router.push({
					path: '/inviting',
					query: {
						user_id: this.$store.state.user_id
					}
				})
			},

			call() {
				window.location.href = "tel:" + this.serviceData.store_info.store_phone;
			},
		},
		mounted() {
			this.init();
			this.event_top = this.$store.state.oneH,
				this.event_two = this.$store.state.twoH,
				this.event_three = this.$store.state.threeH,
				this.event_four = this.$store.state.fourH,
				this.event_five = this.$store.state.fiveH,
				window.addEventListener('scroll', this.handleScroll)
			window.addEventListener('scroll', this.show_list)
		},
		unmounted() {
			window.removeEventListener('scroll', this.handleScroll)
			window.removeEventListener('scroll', this.show_list)
		}
	}
</script>

<style scoped>
	.showAbs_box {
		position: relative;
    height: 100%;
	}

	.price{
		height: .45rem;
		padding:0 .1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.price div:nth-child(1){
		font-size: .18rem;
		font-weight: 700;
	}
	.price div:nth-child(1) span{
		color: #f00;
	}
	.price div:nth-child(2){
		padding: 0.05rem  0 0 0;
	}
	.price div:nth-child(2) span{
		color: #ff9c00;
		border: .01rem solid #ff9c00;
		border-radius: .03rem;
		padding: 0 .06rem;

	}
	.box {
		width: 100%;
    padding-bottom: .5rem;
	}

	.header-fixed {
		position: fixed;
		z-index: 99999;
		top: 0;
		left: 0;
		right: 0;
		/*bottom: .5rem;*/
		height: .46rem;
		line-height: .46rem;
		text-align: center;
		color: #fff;
		background: #18b4ed;
		font-size: .22rem;
		 flex-direction: column;
	}

	.header-fixed-back {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.header-fixed-back .left_le {
		margin: 0 0 0 0.12rem;
	}

	.header-fixed-back .left_ri {
		margin: 0 0.12rem 0 0;
	}

	.header-fixed-back ul {
		display: flex;
		width: 65%;
		margin: 0 auto;
	}

	.fixed_li {
		font-size: .12rem;
		width: 20%;
	}

	.fixed_li>span {
		font-size: .12rem;
		color: #FFF;
		padding-bottom: .1rem;
	}

	.fixed_li .shlist {
		/*color: #f90 !important;*/
		border-bottom: 0.02rem solid #fff;
	}

	.left_rigth {
		height: .35rem;
		display: flex;
		justify-content: space-between;
		padding: 0.12rem;
	}

	.left_rigth .left_le {
		background: rgba(0, 0, 0, .2);
	}

	.left_rigth .left_ri {
		background: rgba(0, 0, 0, .2);
	}

	.left_le {
		width: .35rem;
		height: .35rem;
		border-radius: 50%;
	}

	.left_ri {
		width: .35rem;
		height: .35rem;
		border-radius: 50%;
		right: 0.12rem;
	}

	.left_ri img {
		padding: .07rem;
		width: .2rem;
		height: .2rem;
	}

	.left_le img {
		padding: .1rem .11rem;
		width: .1rem;
		height: .17rem;
	}

	.bot_box {
		width: 96%;
		padding: 0 .12rem;
		height: .5rem;
		position: fixed;
		bottom: 0;
		z-index: 9999;
	}

	.bot_box_div {
		height: .6rem;
		width: 100%;
		background: #fff;
		display: flex;
		/*align-items: center;*/
	}

	.bot_box_le {
		flex: 0 0 50%;
	}

	.bot_box_ul {
		height: .55rem;
		padding: 0 .05rem;
		padding-top: .05rem;
		display: flex;
		text-align: center;
		justify-content: space-between;
	}

	.bot_box_li {
		text-align: center;
	}

	.bot_box_li_img img {
		width: .18rem;
	}

	.bot_box_li_text {
		font-size: .12rem;
		/*color: #b2b2b2;*/
	}

	.bot_box_ri {
		width: 48%;
		margin-left: .1rem;
		height: .6rem;
		line-height: .5rem;
		text-align: right;
	}

	.bot_box_ri span {
		background: #18b4ed;
		color: #fff;
		padding: .08rem;
		border-radius: 0.05rem;
		margin-right: 5%
	}
	/* 可以设置不同的进入和离开动画 */
	/* 设置持续时间和动画函数 */

	.slide-fade-enter-active {
		transition: all .3s ease;
	}

	.slide-fade-leave-active {
		transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}

	.slide-fade-enter,
	.slide-fade-leave-to
	/* .slide-fade-leave-active for below version 2.1.8 */

	{
		transform: translateX(120px);
		opacity: 0;
	}
</style>
