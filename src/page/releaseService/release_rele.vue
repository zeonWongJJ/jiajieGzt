<template>
	<div class="squareds">
		<div class="white">
			<van-nav-bar :title="this.$route.query.type == 'edit' ? '编辑服务' : '发布服务'" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
				<van-icon name="wap-nav" color="white" slot="right" />
			</van-nav-bar>
			<div v-show="rishow" @touchmove.prevent="orishow()" @click.stop="orishow()" style="position: fixed;z-index: 9999; top: 0;right: 0;left: 0;bottom: 0; background: rgba(0,0,0,0); ">
				<div style="position: absolute;z-index: 9999; top: .45rem;right: 0;width: 1rem ;background: rgba(0,0,0,.2); ">
					<head-ri></head-ri>
				</div>
			</div>
		</div>
		<!--///-->
		<div class="com_box">

			<div class="box">
				<div class="input_text">
					<div>
						<input type="text" v-model="form.tests" placeholder="清晰明确的标题更吸引人哦" />
					</div>
					<div>{{reversedMessage}}/15</div>
				</div>
				<div class="textarea">
					<!--<textarea name="" rows="4" cols="" v-model="form.textareas" placeholder="请填写您的收费标准、服务内容、服务流程、服务保障等。详细的服务介绍可以吸引更多客户下单。">
                    </textarea>-->
					<vue-html5-editor :content="form.textareas" :height="400" @change="updateData" :model.sync="form.textareas"></vue-html5-editor>
					<!--<div class="text_div">{{reversedMessage2}}/500</div>-->
				</div>
				<div class="uploade_div">
					<ul class="uploade_div_ul">
						<li v-if="file" v-for="(item,index) in path_img" class="uploade_div_img">
							<span @click="spli(item,index)"></span>
							<img :src="uploadFileUrl+item" />
						</li>
						<li class="uploade_div_img_w">
							<van-uploader :after-read="onRead">
								<van-icon name="photograph" />
							</van-uploader>
						</li>
					</ul>
				</div>
			</div>

			<div class="div_re">
				<div>
					服务收费
				</div>
				<div>
					<input type="number" name="" v-model="price" placeholder="输入金额" />元/
					<span v-if="pay_type == 2">次</span>
					<span v-if="pay_type == 1">时</span>
				</div>
			</div>

			<div class="div_re_bottom">
				<div>
					服务范围
				</div>
				<div>
					<div @click="oapms()">
						<span v-if="dragData.nearestRoad != ''">{{dragData.nearestRoad}}</span>
						<span v-else>选择地址</span>
						<span class="bo_span">附近{{store_range_s}}公里</span> &nbsp;
					</div>
					<div>
						<img src="../../assets/img/more_gray.png" />
					</div>
				</div>
			</div>

			<div class="xy">
				发布商品即代表您同意家洁<span>《用户协议》 隐私条款》</span>
			</div>
			<div class="but">
				<button @click="ubmission()">确定</button>
			</div>

		</div>
		<!--//服务收费-->
		<div class="charge" v-show="isshow">
			<div class="charge_alert" v-show="alert_show">
				<div class="charge_alert_div">
					<p>提示</p>
					<div>直接离开将不保存已填写的信息，是否离开</div>
					<div>
						<span>取消</span>
						<span @click="span_but()">确定</span>
					</div>
				</div>
			</div>

			<div>
				<van-nav-bar title="收费方式" left-arrow @click-left="onClickLeft1" />
			</div>
			<!--/收费方式/-->
			<div class="charge_com">
				<div>
					收费方式
				</div>
				<ul class="charge_com_ul">
					<li v-for="(item,index) in lists" @click="licilk(item,index)">
						<div class="charge_com_ul_div1" :class="{charge_com_ul_colc : index == num}">
							{{item.name}}
							<!--<span class="charge_com_ul_span"><img src="../../../static/images/gou_1.png"/></span> {{item.name}}-->
						</div>
					</li>
				</ul>

				<div class="charge_com_ul_divli">
					{{li}}
				</div>
			</div>
			<!--//价格-->
			<div class="charge_price">
				<div>价格</div>
				<div>
					<input type="text" v-model="price" placeholder="请输入参考价格" />
				</div>
			</div>
			<div class="but">
				<button @click="price_but()">确定</button>
			</div>
		</div>

		<!--//地图-->
		<div class="apms" v-show="apms">
			<van-nav-bar title="标题" left-arrow @click-left="onClickLeft2" />
			<div class="g-wraper">
				<div class="m-part">
					<mapDrag @drag="dragMap" class="mapbox"></mapDrag>
				</div>
				<div class="addss">
					{{dragData.address}}
				</div>
				<div class="addbut">
					<button @click="addbuts">确 定</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import api from '@/api/api'
	import mapDrag from '@/page/releaseService/add'
	import headRi from '@/page/pages/head_ri_sub'
	import loading from '@/components/Loading'
	export default {
		components: {
			mapDrag,
			headRi,
			loading
		},
		data() {
			return {
        file: [],
				content: '请输入文章内容',
				items: [],
				onshows: true,
				rishow: false,
				dragData: {
					lng: null,
					lat: null,
					address: null,
					nearestJunction: null,
					nearestRoad: null,
					nearestPOI: null
				},
				apms: false,

				num: 0,
				price: '', //一口价
				isshow: false,
				alert_show: false,
				form: {
					tests: '',
					textareas: '',

				},
				li: '', //一口价简介
				liname: '', //一口价
				lists: [{
						type: 'price',
						name: '一口价',
						li: '客户预约时一次性付款，后期无额外费用，否则用户投诉被核实无误，您在平台上的信誉将受损'
					},
					{
						type: 'deposit',
						name: '定金',
						li: '客户预约时支付订金，完成服务后线上收取尾款'
					},
					{
						type: 'free',
						name: '免费预约',
						li: '客户预约时无需费用，完成服务后线上收取费用'
					},
				],
				listtype: '',
				path_img: [], //上传返回
				pay_type: '', //a安时算
				editData: {},
				uploadFileUrl: api.uploadFileUrl + '/',
				store_range_s: '',
			}
		},
		computed: {
			reversedMessage: function() {
				if(this.form.tests.length > 15) {
					this.form.tests = this.form.tests.substring(0,15);
					this.$toast('不能超过15个字');
				}
				return this.form.tests.length
			},
			// reversedMessage2: function () {
			//   if (this.form.textareas.length < 500) {
			//     return this.form.textareas.length
			//
			//   } else {
			//     alert('不能超过500个字')
			//     //					this.$toast('不能超过15个字');
			//   }
			// },
		},
		mounted() { //生命周期
			// this.items = JSON.parse(this$router.query.items);
			// console.log(this.items);
			this.odpst();
			if(this.$route.query.type == 'edit') { //编辑页面
				let that = this
				var data = that.editData = that.$route.query.data;
				var add = data.service_lal.split(',');
				that.form.tests = data.service_name;
				that.form.textareas = data.service_info;
				that.listtype = data.service_pay_way;
				that.price = data.service_remuneration;
				that.path_img = data.service_img;
				that.dragData.lng = add[0];
				that.dragData.lat = add[1];
				that.dragData.nearestRoad = data.service_address_name;
				that.path_img = data.service_img
				that.$fetch('category_get_payway', {}, that.$route.query.data.service_level_2).then(rs =>{
          that.pay_type = rs.pay_type
				})
			} else {
				this.category_get()
			}
		},
		created() {
			this.dragMap()
		},
		beforeUpdate() {
			if(this.dragData) {
			} else {
				window.history.go(0)
			}
		},
		methods: { //方法
			updateData(e) {
				let c1 = e.replace(/<img width="100%"/g, '<img');
				let c2 = c1.replace(/<img/g, '<img width="100%"');
				this.form.textareas = c2
			},
			odpst() {
				let that = this
				that.$fetch('user_store_info_get').then(rs =>{
          that.store_range_s = rs.store_range
				})
			},

			category_get() {
				let that = this
				// let apis = api.category_get_payway + this.$route.query.items.parent_id
				// let apis = api.category_get_payway + this.items.parent_id
				that.$fetch('category_get_payway', {}, this.$route.query.level_2).then(rs =>{
          that.pay_type = rs.pay_type
				})
			},
			//提交
			ubmission() {
				let that = this;
				let adds = that.dragData.lng + ',' + that.dragData.lat
				if(that.form.tests == '') {
					that.$toast('标题不能为空');
				} else if(that.form.textareas == '') {
					that.$toast('描述不能为空');
				} else if(that.price == '') {
					that.$toast('金额不能为空');
				} else {
					let lists = {};
					var qs = require('qs');
					if(that.$route.query.type == 'edit') {
						apis = api.service_update + that.editData.id
						lists.service_level_1 = that.editData.service_level_1
						lists.service_level_2 = that.editData.service_level_2
						lists.service_level_3 = that.editData.service_level_3
					} else {
						// lists.service_level_1 = that.$route.query.items.top_id
						// lists.service_level_2 = that.$route.query.items.parent_id
						// lists.service_level_3 = that.$route.query.items.id
						lists.service_level_1 = that.$route.query.level_1
						lists.service_level_2 = that.$route.query.level_2
						lists.service_level_3 = that.$route.query.level_3
					}
					lists.service_name = that.form.tests
					lists.service_info = that.form.textareas
					lists.service_remuneration = that.price
					lists.service_img = that.path_img
					lists.service_lal = adds
					lists.service_address_name = that.dragData.nearestRoad

					if(that.onshows) {
						that.onshows = false
						that.$fetch('service_add', lists).then(rs =>{
              that.onshows = true
              if(that.$route.query.type == 'edit') {
                that.$router.push({
                  path: 'shop'
                })
              } else {
                that.$router.push({
                  path: 'shop'
                })
              }
						}).catch(e => {
              that.onshows = true
            })
					}

				}
			},

			//			一口价哪里
			licilk(item, index) {
				let that = this
				that.num = index
				that.li = item.li
				that.liname = item.name
				that.listtype = item.type

			},
			//			一口价收费按钮
			price_but() {
				let that = this
				if(that.liname == '') {
					that.$toast('请选择收费方式');
					return false
				} else if(that.price == "") {
					that.$toast('请输入金额');
					return false
				} else {
					that.isshow = false
				}
			},
			//			服务收费去编辑
			charge() {
				let that = this
				that.isshow = true
				//				that.price = ""

			},
			//	服务收费去编辑   g关必3
			onClickLeft1() {
				let that = this
				that.alert_show = true

			},
			onClickLeft2() {
				let that = this
				that.apms = false
			},
			//			确定 g关必3
			span_but() {
				let that = this
				that.isshow = false
				that.price = ""
				that.num = null
				that.li = ""
				that.alert_show = false
			},

			onClickLeft() {
				// this.$router.back(-1)
				// 删除已上传的图片
				this.$fetch('file_remove',{files: this.path_img}).then(rs =>{
					const isEdit = this.$route.query.type === 'edit';
					if(isEdit) {
						window.history.go(-1);
					} else {
						this.$router.push({
							path: '/release_service',
						})
					}
				})
			},
			onClickRight() {
				let that = this
				that.rishow = !that.rishow
			},
			orishow() {
				let that = this
				that.rishow = false
			},
			//图片上传
			onRead(file) {
			  if (file) {
          if(this.path_img.length == 9){
            this.$toast('图片最多上传9张')
            return false
          }
          let that = this
          let lists = {}
          lists.img = file.content
          that.$fetch('uploadBase', lists).then(rs =>{
            that.path_img.push(rs.path)
            that.$toast('上传成功');
          })
        }
			},
			//删除
			spli(item, index = 0) {
			  if (lists.file) {
          let that = this
          let lists = {}
          lists.file = that.path_img[index]
          that.path_img.splice(index, 1)
          that.$fetch('file_remove', lists).then(rs =>{
            that.$toast('已删除');
          })
        }
			},
			//地图
			oapms() {
				let that = this
				that.apms = true
			},
			dragMap(data) {
			  if (data) {
          this.dragData = {
            lng: data.position.lng,
            lat: data.position.lat,
            address: data.address,
            nearestJunction: data.nearestJunction,
            nearestRoad: data.nearestRoad,
            nearestPOI: data.nearestPOI
          }
        }
			},
			addbuts() {
				let that = this
				that.apms = false

			},
		},
	}
</script>

<style scoped>
	.squareds {
		width: 100%;
		height: 100%;
		background: #f5f5f5;
		position: absolute;
		top: 0rem;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.com_box {
		background: #f5f5f5;
		height: calc(100% - 0.46rem);
		overflow: auto;
	}

	.box {
		background: #fff;
		padding-bottom: .15rem;
	}

	.input_text {
		padding: .1rem .15rem;
		display: flex;
		justify-content: space-between;
		height: .35rem;
		line-height: .35rem;
		border-bottom: .01rem solid #eee;
		margin: 0 0 .1rem 0;
	}

	.input_text>div:nth-child(1) {
		flex: 0 0 3rem;
		background: #fff;
	}

	.input_text>div:nth-child(2) {
		color: #b2b2b2;
		font-size: .12rem;
	}

	.input_text>div:nth-child(1) input {
		width: 100%;
		background: none;
		border: none;
		font-size: .14rem;
		color: #333;
	}

	 ::-webkit-input-placeholder {
		/* WebKit browsers */
		color: #b2b2b2;
	}

	.textarea {
		padding: 0 .15rem;
		position: relative;
	}

	.textarea textarea {
		width: 3.4rem;
		border: 0;
	}

	.text_div {
		position: absolute;
		bottom: -0.2rem;
		right: .15rem;
		font-size: .12rem;
		color: #b2b2b2;
	}
	/*上传图片*/

	.uploade_div {
		margin: .3rem 0 0 0;
		padding: 0 .15rem .15rem .15rem;
	}

	.uploade_div_ul {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}

	.uploade_div_img {
		height: .75rem;
		width: .75rem;
		margin-right: 0.11rem;
		margin-bottom: .1rem;
		position: relative;
	}

	.uploade_div_img span {
		content: '';
		width: .18rem;
		height: .18rem;
		line-height: .18rem;
		border-radius: 50%;
		position: absolute;
		top: -0.09rem;
		right: -0.09rem;
		background: url(../../../static/images/gxx_1.png);
		background-size: .18rem .18rem;
	}

	.uploade_div_img img {
		height: .75rem;
		width: .75rem;
	}

	.uploade_div_img_w {
		height: .75rem;
		width: .75rem;
		line-height: .75rem;
		text-align: center;
		border: .01rem dashed #eee;
		margin-right: 0.1rem;
		margin-bottom: .1rem;
	}
	/*.uploade_div_img div {
        height: .78rem;
        width: .78rem;
    }*/
	/*.uploade_div_img div img {
        height: .78rem;
        width: .78rem;
    }*/
	/*.uploade_div div:nth-child(2) {
        height: .78rem;
        width: .78rem;
        line-height: .78rem;
        text-align: center;
        border: .01rem double #eee;
    }*/
	/*//*/

	.div_re,
	.div_re_bottom {
		margin: .1rem 0 0 0;
		padding: 0 .15rem;
		display: flex;
		line-height: .35rem;
		justify-content: space-between;
		background: #fff;
		height: .68rem;
		line-height: .68rem;
	}

	.div_re img {
		width: .08rem;
	}

	.div_re_bottom img {
		padding: 0.28rem 0 0 0;
		width: .08rem;
	}

	.div_re>div:nth-child(1) {
		font-size: .18rem;
		font-weight: 700;
	}

	.div_re>div:nth-child(2) {
		font-size: .16rem;
		color: #B2B2B2;
	}

	.div_re input {
		background: none;
		border: 0;
		text-align: right;
	}

	.div_re_bottom>div:nth-child(1) {
		font-size: .18rem;
		font-weight: 700;
	}

	.div_re_bottom>div:nth-child(2) {
		display: flex;
	}

	.bo_span {
		font-size: .12rem;
		border: .01rem solid #F0AD4E;
		color: #F0AD4E;
		border-radius: .05rem;
		padding: .01rem .03rem;
		margin: 0 .05rem;
	}

	.but {
		padding: .15rem;
	}

	.but button {
		width: 100%;
		border: 0;
		background: #18b4ed;
		height: .5rem;
		line-height: .5rem;
		font-size: .18rem;
		color: #fff;
		border-radius: .1rem;
	}

	.xy {
		padding: .15rem;
		font-size: .12rem;
		text-align: right;
	}

	.xy span {
		color: #F0AD4E;
	}
	/*收費方式*/

	.charge {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #F5F5F5;
		z-index: 1000;
	}

	.charge_com {
		margin: .1rem 0 0 0;
		background: #fff;
		padding-bottom: .25rem;
	}

	.charge_com div {
		height: .44rem;
		line-height: .44rem;
		font-size: .16rem;
		font-weight: 700;
		padding: 0 .15rem;
	}

	.charge_com_ul {
		display: flex;
		justify-content: space-around;
		text-align: center;
		padding: 0 .15rem;
	}

	.charge_com_ul li {
		flex: 0 0 30%;
		margin: 2%;
		text-align: center;
	}

	.charge_com_ul li div {
		flex: 0 0 30%;
		margin: 2%;
		font-weight: 500;
		text-align: center;
		background: #F5F5F5;
		border-radius: .05rem;
		height: .44rem;
		line-height: .44rem;
		border: 0.01rem solid #eee;
		position: relative;
	}

	.charge_com_ul_colc {
		flex: 0 0 30%;
		margin: 2%;
		font-weight: 500;
		text-align: center;
		height: .44rem;
		line-height: .44rem;
		position: relative;
		border: .01rem solid #ff9c0f !important;
		color: #ff9c0f !important;
		background: #fff !important;
	}

	.charge_com_ul_colc:before {
		content: '';
		width: .18rem;
		height: .18rem;
		line-height: .18rem;
		background: #f00;
		border-radius: 50%;
		position: absolute;
		top: -0.09rem;
		right: -0.09rem;
		background-image: url(../../../static/images/gou_1.png);
		background-size: .18rem .18rem;
	}

	.charge_com_ul_divli {
		height: 100% !important;
		line-height: .18rem !important;
		font-size: .12rem !important;
		font-weight: 500 !important;
		color: #B2B2B2;
	}

	.charge_com_ul_span img {
		width: .18rem;
		height: .18rem;
	}

	.charge_price {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: .71rem;
		line-height: .71rem;
		background: #fff;
		margin-top: .1rem;
		padding: 0 .15rem;
		margin-bottom: .5rem;
	}

	.charge_price>div:nth-child(1) {
		font-size: .18rem;
		flex: 0 0 .8rem;
		font-weight: 700;
	}

	.charge_price>div:nth-child(2) input {
		font-size: .16rem;
		border: none;
		text-align: right;
		background: none;
	}
	/*弹出窗*/

	.charge_alert {
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.3);
		z-index: 1001;
		margin: 0 auto;
	}

	.charge_alert_div {
		width: 2.9rem;
		height: 1.85rem;
		position: absolute;
		top: 50%;
		left: 50%;
		margin: -0.925rem -1.45rem;
		background: #fff;
		border-radius: .1rem;
		z-index: 1005;
	}

	.charge_alert_div p {
		text-align: center;
		font-size: .18rem;
		color: #18b4ed;
	}

	.charge_alert_div div:nth-child(2) {
		padding: 0.15rem .35rem;
		font-size: .14rem;
		border-bottom: .01rem solid #eee;
		border-top: .01rem solid #eee;
	}

	.charge_alert_div div:nth-child(3) {
		height: .5rem;
		line-height: .5rem;
	}

	.charge_alert_div div:nth-child(3) span {
		display: inline-block;
		width: 49%;
		text-align: center;
		font-size: .16rem;
	}

	.charge_alert_div div:nth-child(3) span:nth-child(2) {
		border-left: .01rem solid #eee;
		color: #18b4ed;
	}
	/*//地图*/

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

	.addss {
		position: absolute;
		top: 4rem;
		background: #fff;
		width: 3.45rem;
		font-size: .16rem;
		padding: .1rem .15rem;
	}

	.addbut {
		width: 100%;
		position: absolute;
		bottom: 0;
		z-index: 3333;
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
<style>
	.toolbar{
		z-index: 999!important;
	}
</style>
