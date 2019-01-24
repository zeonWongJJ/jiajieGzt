<template>
	<div>
		<div class="white" v-if="this.items">
			<van-nav-bar title="编辑地址" left-arrow @click-left="onClickLeft" right-text="删除" @click-right="onClickRight" />
		</div>
		<div class="white" v-else>
			<van-nav-bar title="新增地址" left-arrow @click-left="onClickLeft" />
		</div>
		<div class="box_del">
			<!--联系人-->
			<div class="com_box">
				<form name="input" action="" method="get">
					<div class="contact">
						<div>联系人</div>
						<div class="contact_2">
							<div>
								<input type="text" v-model="datas.name_in" id="name_in" placeholder="姓名" />
							</div>
							<div class="contact_2_but">
								<button class="but_n b1" @click="butadd(item,index)" type="button" v-for="(item,index) in datas.nvn" :class="{button_colc : index == num}">{{item.name}}</button>
								<!--<button class="but_m b2" type="button" v-else>女生</button>-->
							</div>
						</div>
					</div>
					<div class="ul_div">
						<!--xiugai-->
						<ul v-if="this.items">
							<li class="li_add">
								<div>电话</div>
								<div>
									<input type="text" v-model="datas.mobile_in" id="mobile_in" placeholder="手机号码" />
								</div>
								<!--<div>+通讯录</div>-->
							</li>
							<li class="li_add">
								<div>地址</div>
								<div @click="Receadd()">
									<input type="text" disabled="disabled" id="add_in" v-model="x_add" placeholder="定位" />
								</div>
								<div @click="Receadd()">
									<img src="../../assets/img/more_gray.png" />
								</div>
							</li>
							<li class="li_add">
								<div>门牌号</div>
								<div>
									<input type="text" name="" v-model="x_addedit" id="add_door" placeholder="16栋6号" />
								</div>
							</li>
						</ul>
						<!--xinjia-->
						<ul v-else>
							<li class="li_add">
								<div>电话</div>
								<div>
									<input type="text" v-model="datas.mobile_in" id="mobile_in" placeholder="手机号码" />
								</div>
								<!--<div>+通讯录</div>-->
							</li>
							<li class="li_add">
								<div>地址</div>
								<div @click="Receadd()">
									<input type="text" disabled="disabled" id="add_in" v-model="dragData.addst" placeholder="定位" />
								</div>
								<div @click="Receadd()">
									<img src="../../assets/img/more_gray.png" />
								</div>
							</li>
							<li class="li_add">
								<div>门牌号</div>
								<div>
									<input type="text" name="" v-model="dragData.addstedit" id="add_door" placeholder="16栋6号" />
								</div>
								<!--<div>3</div>-->
							</li>
						</ul>
					</div>
				</form>
			</div>

			<div class="but">
				<button type="button" v-if="this.items" @click="butform">确定修改</button>
				<button type="button" v-else @click="butform">保存并使用</button>
			</div>
		</div>
		<div v-show="adds" class="addsr">
			<van-nav-bar title="标题" left-arrow @click-left="onClickLeft2" />
			<div class="g-wraper">
				<div class="m-part">
					<mapDrag @drag="dragMap" @inits="init" :lat='dragData.lat' :lng='dragData.lng' class="mapbox"></mapDrag>
				</div>
				<div class="addss">
					{{dragData.address}}
				</div>
				<div class="addbut">
					<button @click="addbuts">确 定</button>
				</div>
			</div>
		</div>
		<loading :show='onshows'></loading>
	</div>
</template>

<script>
	import api from '@/api/api'
	import mapDrag from '@/page/releaseService/add'
	import loading from '@/components/Loading'
	export default {
		components: {
			mapDrag,
			loading
		},
		data() {
			return {
				onshows: false,
				x_add: '',
				x_addedit: '',
				num: '',
				datas: {
					name_in: '', //名字
					mobile_in: '', //手机
					nvn: [{
							name: '先生',
							type: 1

						},
						{
							name: '女士',
							type: 2
						}
					],

				},

				items: null, //收货传下来
				upid: '', //修改id
				dragData: {
					lng: null,
					lat: null,
					address: null,
					nearestJunction: null,
					nearestRoad: null,
					nearestPOI: null,
					addst: null,
					addstedit: null,
				},
				adds: false,
			}
		},
		mounted() { //生命周期
			this.getadd()
		},
		created() {},
		methods: { //方法
			//			保存
			butform() {
				let that = this
				if(!that.onshows) {
					that.onshows = true
					let forms = {}
					let adds = that.dragData.lng + ',' + that.dragData.lat
					let nums = that.num + 1
					forms.contact_name = that.datas.name_in
					forms.telephone_number = that.datas.mobile_in
					forms.contact_gender = nums
					forms.contact_lal = adds
					if(that.$route.query.items) {
						forms.contact_address_name = that.x_addedit
						forms.contact_house_number = that.x_add
						that.$fetch('user_address_update', forms, that.upid).then(rs =>{
			              that.$toast("修改成功");
			              that.onClickLeft()
									}).catch(e => {
			              that.onshows = false
			            })
					} else {
						forms.contact_address_name = that.dragData.addstedit
						forms.contact_house_number = that.dragData.addst
						that.$fetch('user_address_add', forms).then(rs =>{
			              that.$toast("添加成功");
			               that.onClickLeft()
									}).catch(() => {
			              that.onshows = false
			            })
					}
				}
			},
			getadd() {
				let that = this;
				if(that.$route.query.items) {
					that.items = JSON.parse(that.$route.query.items);
					that.x_add = that.items.contact_house_number;
					that.x_addedit = that.items.contact_address_name;
					that.upid = that.items.id
					that.datas.name_in = that.items.contact_name
					that.datas.mobile_in = that.items.telephone_number
					that.dragData.addst = that.items.contact_house_number
					that.dragData.addst = that.items.contact_gender
					that.dragData.addst = that.items.contact_house_number
					that.num = that.items.contact_gender - 1;
				}
			},

			//返回上一级
			onClickLeft() {
				this.$router.back(-1)
			},
			//删除
			onClickRight() {
				let that = this;
				that.$fetch('user_address_delete', {}, that.upid).then(rs =>{
          that.$toast("删除成功");
          setTimeout(function() {
            that.$router.push({
              path: '/receadd'
            })
          }, 1000)
				})
			},
			onClickLeft2() {
				let that = this
				that.adds = false
			},
			//显示地图
			Receadd() {
				let that = this
				that.adds = true
			},
			init(data) {
				console.log('init:', data)
			},

			dragMap(data) {
				console.log('地图组件：', data)
				this.dragData = {
					lng: data.position.lng,
					lat: data.position.lat,
					address: data.address,
					nearestJunction: data.nearestJunction,
					nearestRoad: data.nearestRoad,
					nearestPOI: data.nearestPOI,
					addst: (data.regeocode.addressComponent.province) + (data.regeocode.addressComponent.city) + (data.regeocode.addressComponent.district),
					addstedit: (data.regeocode.addressComponent.township) + (data.regeocode.addressComponent.street) + (data.regeocode.addressComponent.streetNumber)
				}
			},
			//			关地图
			addbuts() {
				let that = this
				this.x_add = this.dragData.addst
				this.x_addedit = this.dragData.addstedit
				that.adds = false

			},
			//			男女
			butadd(item, index) {
				let that = this
				that.num = index
				that.iname = item
			},

		},

	}
</script>

<style scoped>
	.box_del .com_box {
		height: 100%;
		padding: 0 .15rem;
		background: #fff;
	}
	/*//anniu*/

	.button_colc {
		border: .01rem solid #f63;
		color: #f63;
	}

	.box_del .contact {
		display: flex;
		margin-top: .1rem;
		border-bottom: .01rem solid #eee;
	}

	.box_del .contact>div:nth-child(1) {
		flex: 0 0 .87rem;
		font-size: .18rem;
		font-weight: 700;
		height: .55rem;
		line-height: .55rem;
	}

	.box_del .contact_2 {
		width: 100%;
	}

	.box_del .contact_2 div {
		width: 100%;
		font-size: 0.14rem;
		height: .55rem;
		line-height: .55rem;
	}

	.box_del .contact_2 div input {
		font-size: 0.14rem;
		border: 0;
		background: none;
	}

	.box_del .contact_2 div:nth-child(1) {
		border-bottom: .01rem solid #eee;
	}

	.box_del .but_n,
	.box_del .but_m {
		width: .62rem;
		height: .3rem;
		line-height: .3rem;
		font-size: 0.14rem;
		background: #fff;
		border: .01rem solid #eee;
		border-radius: 0.05rem;
		cursor: pointer;
	}

	.box_del .but_colco {
		border: .01rem solid #f63;
		color: #f63;
	}

	.box_del .ul_div {}

	.box_del .li_add {
		display: flex;
		height: 0.55rem;
		line-height: 0.55rem;
		border-bottom: .01rem solid #EEEEEE;
		align-items: center;
	}

	.box_del .li_add>div:nth-child(1) {
		flex: 0 0 .87rem;
		font-size: .18rem;
		font-weight: 700;
	}

	.li_add>div:nth-child(2) {
		flex: 1;
	}

	.box_del .li_add>div input {
		width: 100%;
		font-size: 0.14rem;
		border: 0;
		background: none;
	}

	.box_del .li_add>div:nth-child(3) {
		flex: 0 0 .60rem;
		color: #f60;
		text-align: right;
	}

	.box_del .li_add>div:nth-child(3) img {
		width: .09rem;
		height: .18rem;
		margin-top: .2rem;
	}

	.box_del .but {
		padding: 0 .15rem;
		margin-top: .35rem;
	}

	.box_del .but button {
		border: 0;
		height: .5rem;
		line-height: .5rem;
		width: 100%;
		border-radius: .5rem;
		background: #f63;
		color: #FFFFFF;
		font-size: .18rem;
		cursor: pointer;
	}
	/*//ditu*/

	.apms {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #eee;
		z-index: 1009;
	}

	.m-part .mapbox {
		width: 100%;
		height: 3.5rem;
		margin-bottom: 20px;
		float: left;
	}

	.addsr {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 666;
		background: #fff;
	}

	.addss {
		position: absolute;
		top: 4rem;
		background: #fff;
		width: 3.45rem;
		font-size: .16rem;
		padding: .1rem .15rem;
		/*z-index:999;*/
	}

	.addbut {
		width: 100%;
		position: absolute;
		bottom: 0;
		z-index: 999;
	}

	.addbut button {
		width: 100%;
		height: .44rem;
		line-height: .44rem;
		border: 0;
		background: #007AFF;
		font-size: .16rem;
		color: #fff;
	}
</style>
