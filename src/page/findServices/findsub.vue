<template>
	<div class="find">
		<div>
			<van-nav-bar title="服务列表" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
				<van-icon name="wap-nav" color="white" slot="right" />
			</van-nav-bar>
			<div v-show="rishow" @click.stop="orishow()" style="position: fixed;z-index: 9999; top: 0;right: 0;left: 0;bottom: 0; background: rgba(0,0,0,0); ">
				<div style="position: absolute;z-index: 9999; top: .45rem;right: 0;width: 1rem ;background: rgba(0,0,0,.2); ">
					<!--<head-ri></head-ri>-->
				</div>
			</div>
		</div>
		<ul class="top_nav_ul">
			<li v-for="(item,index) in tabs" :class="{li_style:index == num}" @click="tab(index)">
				<div class="top_nav_img" @click="dad(item,(index == 0))">
					{{item.name}}
					<span v-if="index == 0" class="spanimg" :class="{spanimg_h:index == num}">
						</span>
				</div>
			</li>
		</ul>
		<div class="po_div" v-show="inishow" @touchmove.prevent="tabRe()" @click="tabRe()">
			<ul>
				<li class="po_div_li" v-for="(item,index) in lists" v-if="ids == 1">
					<span :class="{li_style : index == numlist}" @click.stop="tab_list(index)">{{item.name}}</span>
				</li>
			</ul>
		</div>
		<div class="top_nav">
			<!--...-->
			<div class="commodity">
				<ul>
					<li v-if="list_com == ''" style="text-align: center;margin: 0.44rem 0 0 0; color: #b2b2b2;">
						暂无服务
					</li>
					<li v-else v-for="(items,index) in list_com" class="list_coms" @click="toDetails(items.id)">
						<div class="com_tit">
							<div class="com_tit_img">
								<div><img src="../../../static/images/store.png" /></div>
								<div>
									{{items.store_name}}
								</div>
							</div>
							<div>
								<!--{{items.service_lal}}-->
								{{getLong(items.service_lal)}}
							</div>
						</div>
						<!--///-->
						<ul>
							<!--v-for="its in items.list"-->
							<li class="com_li">
								<!--////////-->
								<div class="com_com">
									<div>
										<img src="../../assets/img/logo_h.png" v-if="items.service_img == ''" />
										<img :src="uploadFileUrl + items.service_img[0]" v-else />
									</div>
									<div class="com_com_x">
										<div class="com_com_ri" v-if="items.type == 1">
											企业
										</div>
										<div class="com_com_x_tit">
											{{items.service_name}}
										</div>
										<div class="com_com_x_ov" v-html="replaceStyle(items.service_info)"></div>
										<div class="com_com_x_score">
											<div>
												<span>等级</span>
												<span class="com_com_x_score_colco">{{items.store_level}}</span>
											</div>
											<div style="margin-left: 0.1rem;">
												<span>已售</span>
												<span class="com_com_x_score_colco">{{items.service_sold}}</span>
											</div>
											<div style="margin-left: 0.1rem;">
												<span>总评分</span>
												<span class="com_com_x_score_colco">{{items.service_average_score}}</span>
											</div>

										</div>
										<div class="com_com_x_score2">
											<div>
												￥{{items.service_remuneration}}
											</div>
											<!--<div>
												{{items.service_average_score}}
												<van-rate :value="items.service_average_score"/>
											</div>-->
										</div>
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import api from '@/api/api'
//	import headRi from '@/page/pages/head_ri_sub'

	export default {
//		components: {
//			headRi
//		},
		data() {
			return {
				rishow: false,
				tabs: [{
						name: '综合排序',
						id: 1
					},
					{
						name: '离我最近',
						id: 2
					},
					{
						name: '等级最高',
						id: 3
					},
				],
				num: 0, //tab
				numlist: 0, //综合
				numlist2: 0, //建议方式
				inishow: false,
				lists: [{
						name: '综合排序'
					},
					{
						name: '销量最高'
					},
					{
						name: '评分最高'
					},
					{
						name: '价格由高到低'
					},
					{
						name: '价格由低到高'
					},
				],
				ids: '', //
				list_com: [],
				uploadFileUrl: api.uploadFileUrl + '/',
				AMap: null,
				condition: {},
//     			 originLevel: this.$route.query.originLevel
			}
		},
		mounted() { //生命周期
//		  if (this.originLevel == 1) {
//      this.condition = {
//        'a.service_level_1': this.$route.query.item
//      }
//    } else if (this.originLevel == 3) {
//      this.condition = {
//        'a.service_level_3': this.$route.query.item
//      }
//    } else {
//      this.condition = {
//        'a.service_level_1': this.$route.query.item
//      }
//    }
      this.condition = {
          'a.service_level_1': this.$route.query.item
        }

			this.olists()
			if(window.AMap) {
				this.AMap = window.AMap;
			}
		},
		methods: { //方法
			getLong(string) { //计算距离
				if(this.$store.state.lat && this.$store.state.lng) {
					if(this.AMap) {
						var p1 = [this.$store.state.lng, this.$store.state.lat];
						var p2 = string.split(',');
						var length = this.AMap.GeometryUtil.distance(p1, p2);
						return Number(length / 1000).toFixed(1) + 'km';
					} else {
						console.log('地图组件加载失败')
						return ''
					}
				} else {
					return ''
				}
			},

			olists() {
				let that = this
				let lists = {}
				lists.rows = 500
				lists.condition = that.condition
				that.$fetch('service_list',lists).then(rs =>{
          that.list_com = rs
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
				} else {
					that.inishow = false
				}
			},
			onClickLeft() {
				this.$router.back(-1)
			},
			onClickRight() {
				let that = this
				that.rishow = !that.rishow
			},
			orishow() {
				let that = this
				that.rishow = false
			},
			//tab
			tab(index) {
				let that = this
				that.num = index;
				let lists = {}
				lists.rows = 500
				lists.condition = that.condition
				if(index == 1) {
					//					that.$toast('定位失败');
				} else if(index == 2) {
					lists.sort = {
						"b.store_level": "desc"
					}
				}
				that.$fetch('service_list',lists).then(rs =>{
          that.list_com = rs
				})
			},
			//综合排序
			tabRe() {
				this.inishow = false;
			},
			tab_list(index) {
				let that = this
				let lists = {}
				that.numlist = index
				that.inishow = !that.inishow
				lists.condition = that.condition
				lists.rows = 500
				if(index == 1) {
					lists.sort = {
						"a.service_sold": "desc"
					}
				} else if(index == 2) {
					lists.sort = {
						"a.service_average_score": "desc"
					}

				} else if(index == 3) {
					lists.sort = {
						"a.	service_remuneration": "desc"
					}

				} else if(index == 4) {
					lists.sort = {
						"a.	service_remuneration": "asc"
					}
				}

				that.$fetch('service_list',lists).then(rs =>{
          that.list_com = rs
				})

			},
			//交易方式
			tab_list2(index) {
				let that = this
				that.numlist2 = index
				that.inishow = !that.inishow
			},
			toDetails(serverId) {
				let that = this
//				let serId = this.$route.query.item.id;
				this.$router.push({
					path: '/details',
					query: {
						serverId
					}
				})
			},
			replaceStyle(str){
				const reg = /<[^<>]+>/g
				return str.replace(reg,'');
			}
		},
	}
</script>

<style scoped>
	.find {
		width: 100%;
		height: 100%;
		background: #f5f5f5;
		/*background: #fff;*/
		position: absolute;
		top: 0rem;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.top_nav {
		position: relative;
		height: calc(100% - 1.05rem);
		overflow: auto;
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
		flex: 0 0 33.3%;
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

	.commodity>ul {}

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
		color: #b2b2b2;
	}

	.com_com {
		display: flex;
		background: #fafafa;
	}

	.com_com>div:nth-child(1) {
		flex: 0 0 .85rem;
		height: .85rem;
		margin: .15rem .1rem .1rem .1rem;
		border-radius: .1rem;
		overflow: hidden;
	}

	.com_com>div:nth-child(1) img {
		width: .85rem;
		height: .85rem;
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
</style>
<style type="text/css">
	.find .van-nav-bar .van-icon {
		color: #fff !important;
	}
</style>
