<template>
	<div class="squareds">
		<div>
			<van-nav-bar title="需求酬金" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
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

			<form class="box">
				<div class="input_text">
					<div>
						<input type="text" v-model="form.test" placeholder="清晰明确的标题更吸引人哦" />
					</div>
					<div>{{reversedMessage}}/15</div>
				</div>
				<div class="textarea">
					<textarea name="" rows="4" cols="" v-model="form.textareas" placeholder="请填写您的收费标准、服务内容、服务流程、服务保
障等。详细的服务介绍可以吸引更多客户下单。"></textarea>
					<div class="text_div">{{reversedMessage2}}/500</div>
				</div>

				<div class="uploade_div">

					<ul class="uploade_div_ul">
						<li v-if="file_img != ''" v-for="(item,index) in file_img" class="uploade_div_img">
							<span @click="spli(item,index)"></span>
							<img :src="uploadFileUrl + item" />
						</li>
						<li class="uploade_div_img_w">
							<van-uploader :after-read="onRead">
								<van-icon name="photograph" />
							</van-uploader>
						</li>
					</ul>
				</div>
			</form>

			<div class="div_re">
				<div>
					服务酬金
				</div>
				<!--<div @click="charge()">-->
				<div>
					<input style="color: #000;" type="number" name="" v-model="price" id="" placeholder="输入金额" /> 元/次
					<!--<span v-if="price == ''">去编辑</span>-->
					<!--<span v-else>{{liname}}:{{price}}</span>-->
					<!--<img src="../../assets/img/more_gray.png" />-->
				</div>

			</div>
			<div class="div_time" @click="service_time">
				<div>
					可服务时间
				</div>
				<div>
					<span v-if="currentDate == ''">去编辑</span>
					<span style="color: #000;" v-else>{{setTime(currentDate)}}</span>
					<img src="../../assets/img/more_gray.png" />
				</div>
			</div>

			<div class="ul_add">
				<ul class="ul_add_ui">
					<li>
						<div>
							联系人
						</div>
						<div>
							<input type="text" v-model="name_l" placeholder="联系人姓名" />
						</div>
					</li>
					<li>
						<div>
							联系电话
						</div>
						<div>
							<input type="number" v-model="tel_l" placeholder="联系电话" />
						</div>
					</li>
					<!--<li>
                        <div>
                            联系电话
                        </div>
                        <div>
                            <button class="but_n b1" @click="butadd(item,index)" type="button" v-for="(item,index) in onv" :class="{button_colc : index == nums}">{{item.name}}</button>

                        </div>
                    </li>-->
					<li>
						<div>
							联系地址
						</div>
						<div @click="oapms()">
							<span v-if="dragData.nearestRoad != ''">{{demand_address_name}}</span>
							<span v-else>选择地址</span>
							<!--<span class="bo_span">附近30公里</span>-->
						</div>
					</li>
					<li>
						<div>
							详情地址
						</div>
						<div>
							<input type="text" v-model="demand_house_number" placeholder="详情地址如门牌号" />
							<!--<span class="bo_span">附近30公里</span>-->
						</div>
					</li>
				</ul>
			</div>

			<div class="but">

				<button @click.stop="pay_meng()">确认发布</button>
			</div>

		</div>

		<!--//服务收费-->
		<!--<div class="charge" v-show="isshow">
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
            </div>-->
		<!--//-->
		<!--<div class="charge_com">
                <div>
                    收费方式
                </div>
                <ul class="charge_com_ul">
                    <li v-for="(item,index) in lists" @click="licilk(item,index)">
                        <div class="charge_com_ul_div1" :class="{charge_com_ul_colc : index == num}">
                            {{item.name}}
                        </div>
                    </li>
                </ul>
                <div class="charge_com_ul_divli">
                    {{li}}
                </div>

            </div>-->
		<!--//价格-->
		<!--<div class="charge_price">
                <div>价格</div>
                <div>
                    <input type="number"  v-model="price" placeholder="请输入参考价格" />
                </div>
            </div>-->
		<!-- 支付方式 -->
		<!--<div class="pay_container" v-show="payShow">
                <dl>
                    <dt>选择支付方式</dt>
                    <dd v-for="(item,index) in payList">
                        <label :for="'pay'+index">
                            <div class="pay_left">
                                <img :src="item.Limg" alt="" />
                                <span>{{item.name}}</span>
                            </div>
                            <div class="pay_right">
                                <img :src="item.Rimg" alt="" />
                                <input @click="payChoice($event,item,index)" name="payFor" :id="'pay'+index" type="radio" />
                            </div>
                        </label>
                    </dd>
                </dl>
            </div>
            <div class="but">
                <button @click="price_but()">确定</button>
            </div>
        </div>-->

		<!-- 选择时间 -->
		<div class="time_container" v-show="timeContainer">
			<!--<van-nav-bar title="选择时间" right-text="完成" left-arrow @click-left="backTit" @click-right="comp"/>-->
			<div class="time_box">
				<van-datetime-picker v-model="currentDate"

					confirm-button-text="完成"
					@change="timeChange($event)"
					@cancel="timeCancel"
					@confirm="timeSuccess($event)"
					title="选择时间(年-月-日 时 : 分)"
					cancel-button-text="返回"
					 type="datetime"
					:min-date="minDate"
					:max-date="maxDate"
					 :formatter="formatter"
					  />

			</div>
		</div>

		<!--//地图-->
		<div class="apms" v-show="apms">
			<van-nav-bar title="选择地址" left-arrow @click-left="onClickLeft2" />
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
		<!--弹出窗-->
		<!--<div class="fug_box" v-show="fgshow" @click.stop="fgbut()">
            <transition name="slide-fade">
                <div class="fug_box_po" v-show="fgshow">
                    <div class="fg_fangs">
                        选择支付方式
                    </div>

                    <ul>
                        <li v-for="(fgitem,index) in fglist" @click.stop="fgxuz(fgitem,index)">
                            <div>
                                <img :src="fgitem.imgs" />
                                <span>
                                                            {{fgitem.name}}
                                                        </span>
                            </div>
                            <div :class="{fg_imgsb : index == num}">

                            </div>
                        </li>
                    </ul>
                    <div class="but">
                        <button @click.stop="ubmission()">确认支付 {{price}}元</button>
                    </div>
                </div>
            </transition>
        </div>-->

	</div>
</template>

<script>
	import api from '@/api/api'
	import mapDrag from '@/page/releaseService/add'
	import headRi from '@/page/pages/head_ri_sub'
  	import utils from '@/utils/utils'
	export default {
		components: {
			mapDrag,
			headRi
		},
		data() {
			return {
				uploadFileUrl:api.uploadFileUrl+ '/',
				rishow: false,
				name_l: '',
				tel_l: '',
				fgshow: false,
				fglist: [{
						name: '支付宝',
						type: 'alipay',
						imgs: require('../../assets/img/wechat.png'),
					},
					{
						name: '微信',
						type: 'wechat',
						imgs: require('../../assets/img/wechat.png'),
					},
					{
						name: '银行',
						type: 'bankcard',
						imgs: require('../../assets/img/wechat.png'),
					}
				],
				onv: [{
						name: '男'
					},
					{
						name: '女'
					},
				],
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
				minHour: 10,
				maxHour: 20,
				minDate: addMin(),
				maxDate: addMax(),
				currentDate:addMin(),
				//
				apms: false,
				num: null,
				nums: '',
				price: '', //金额
				getTime: '',
				isshow: false,
				timeContainer: false, //选择时间
				alert_show: false,
				payShow: false,
				form: {
					test: '',
					textareas: '',
				},
				li: '', //一口价简介
				liname: '', //一口价
				//支付方式
				payList: [{
						name: "支付宝支付",
						type: 'alipay',
						Limg: "../../../static/images/store.png",
						Rimg: "../../../static/images/store.png",
					},
					{
						name: "微信支付",
						type: 'wechat',
						Limg: "../../../static/images/store.png",
						Rimg: "../../../static/images/store.png",
					},
					{
						name: "银行卡支付",
						type: 'bankcard',
						Limg: "../../../static/images/store.png",
						Rimg: "../../../static/images/store.png",
					},
				],
				price_type: '',
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
				file_img: [],
				demand_address_name:'',
				demand_house_number:'',
				uploadFileUrl:api.uploadFileUrl+'/',

			}
		},
		computed: {
			reversedMessage: function() {
				if(this.form.test.length > 15) {
					this.form.test = this.form.test.substring(0,15);
					this.$toast('不能超过15个字');
				}
				return this.form.test.length
			},
			reversedMessage2: function() {
				if(this.form.textareas.length > 500) {
					this.form.textareas = this.form.textareas.substring(0,500);
					this.$toast('不能超过500个字');
				}
				return this.form.textareas.length
			},
		},
		mounted() { //生命周期
		},
		activated(){
			if(this.$store.state.path.from === '/release_dem_category'){
				this.form.test = '';
				this.form.textareas = '';
				this.file_img = [];
				this.price = '';
				this.currentDate = addMin();
				this.name_l = '';
				this.tel_l = '';
				this.demand_address_name = '';
				this.demand_house_number = '';
			}
		},
		created() {

		},
		methods: { //方法
			//
			formatter(type, value) {
				if(type === 'year') {
			    return `${value}年`;
			      } else if (type === 'month') {
			        return `${value}月`
				}else if (type === 'day') {
			        return `${value}日`
				}
				else if (type === 'hour') {
			        return `${value}时`
				}
				else if (type === 'minute') {
			        return `${value}分`
				}
				return value;
			},

			//
			pay_meng() {

				let that = this
				let adds = that.dragData.lng + ',' + that.dragData.lat

				let lists = {};
				if(that.form.test == '') {
					that.$toast('标题不能为空');
				} else if(that.form.textareas == '') {
					that.$toast('描述不能为空');
				} else if(that.price == '') {
					that.$toast('金额不能为空');
				} else if(that.currentDate == '') {
					that.$toast('时间不能为空');
				} else if(that.name_l == '') {
					that.$toast('联系人不能为空');
				} else if(that.tel_l == '') {
					that.$toast('联系电话不能为空');
				} else if(that.demand_address_name == '') {
					that.$toast('地址不能为空');
				} else if(that.demand_house_number == '') {
					that.$toast('详情地址不能为空');
				} else {
					lists.demand_level_1 = this.$route.query.level_1
					lists.demand_level_2 = this.$route.query.level_2
					lists.demand_level_3 = this.$route.query.level_3
					lists.subject_title = that.form.test
					lists.demand_info = that.form.textareas
					lists.price = that.price
					lists.demand_contact_name = that.name_l
					lists.demand_telephone = that.tel_l
					lists.demand_gender = that.nums + 1
					lists.demand_service_at = that.setTime(that.currentDate) //时间
					lists.demand_img = that.file_img
					lists.demand_lal = adds
					lists.demand_address_name = that.demand_address_name
					lists.demand_house_number = that.demand_house_number
					that.$router.push({
						path: '/payments',
						query: {
							lists:JSON.stringify(lists)
						}
					})
				}

			},
			price_but() {
				let that = this;
				if(that.liname == '') {
					that.$toast('请选择收费方式');
					return false
				} else if(that.price == "") {
					that.$toast('请输入金额');
					return false
				}
				//				else if(that.num == 1) {
				//						if($(".pay_right>input:checked").length == 0) {
				//							that.$toast('请选择支付方式');
				////							return false
				//					}
				//				}
				else {
					that.isshow = false
				}

				//				if(that.num == 0) {
				//					this.payType();
				//				} else if(that.num == 1) {
				//					if(this.price == "") {
				//						this.$toast('请输入金额');
				//						return false
				//					} else {
				//						if($(".pay_right>input:checked").length == 0) {
				//							that.$toast('请选择支付方式');
				//							return false
				//						}
				//					}
				//				} else if(that.num == 2) {
				//					this.payType();
				//				} else {
				//					that.$toast('请选择收费方式');
				//					return false
				//				}
			},
			//			服务收费去编辑
			charge() {
				let that = this
				that.isshow = true
				//				that.price = ""

			},

			//选择支付方式
			//			payChoice(event, item, index) {
			//				this.price_type = item.type
			//				var tar = event.currentTarget;
			//				var imger = document.getElementsByClassName("pay_right");
			//				for(var i = 0; i < imger.length; i++) {
			//					imger[i].firstChild.src = tar.parentNode.firstElementChild.src = "../../../static/images/store.png";
			//					if(tar.checked) {
			//						tar.parentNode.firstElementChild.src = "../../../static/images/gou_1.png";
			//
			//					}
			//				}
			//			},
			//服务时间
			service_time() {
				this.timeContainer = true;
			},
			timeSuccess(value) {
				if(!this.getTime){
					this.currentDate = value;
				}else{
					this.currentDate = this.getTime;
				}
				this.timeContainer = false;

			},
			timeChange(index) {
				var str = index.getValues();
				this.getTime = str[0] + str[1] + str[2] + str[3] + str[4];
				this.getTime = utils.convertDataFormat(this.getTime);
				this.getTime = new Date(this.getTime.replace(/-/g,'/'));
			},
			timeCancel() {
				this.timeContainer = false;
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
//				this.$router.push({
//					path:'/release_dem_category',
//					query:{
//						ids:this.$route.query.level_1
//					}
//				})
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
			//图片上传
			onRead(file) {
				if(this.file_img.length == 9){
					this.$toast('图片最多上传9张')
					return false
				}
				let that = this
				let lists = {}
				lists.img = file.content
				this.$fetch('uploadBase', lists).then(rs =>{
          this.file_img.push(rs.path)
          this.$toast('上传成功');
				})
			},
			//删除
			spli(item, index) {
				let that = this
				let lists = {}
				lists.file = that.file_img[index]
				this.$fetch('file_remove',lists).then(rs =>{
          this.$toast('已删除');
          this.file_img.splice(index, 1)
				})
			},
			//地图
			oapms() {
				let that = this
				that.apms = true

			},
			dragMap(data) {
				console.log(data)
				sessionStorage.setItem('lng', data.position.lng);
	            sessionStorage.setItem('lat', data.position.lat);
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
				this.demand_address_name = this.dragData.addst;
				this.demand_house_number = this.dragData.addstedit;
			},
			addbuts() {
				let that = this
				that.apms = false

			},
			//			男女
			butadd(item, index) {
				let that = this
				that.nums = index
				that.iname = item
			},
			//转换时间
	      setTime(time) {
	        var data = new Date(time)
	        if (data) {
	          var year = data.getFullYear();
	          var month = this.add0(data.getMonth() + 1);
	          var day = this.add0(data.getDate());
	          var hour = this.add0(data.getHours());
	          var minute = this.add0(data.getMinutes());
	          return year +'年'+  month + '月' + day+ '日' +  hour + '时' + minute + '分'
	        } else {
	          console.log('时间格式有误：' + time);
	          return ''
	        }
	      },
	      add0(time) {
	        var time = Number(time);
	        if (time < 10) {
	          time = '0' + time
	        }
	        return time
	      },

		},
	}

	function addMin() {
		return new Date(new Date().valueOf() + 30 * 60 * 1000)
	}
	function addMax() {
		return new Date(new Date().valueOf() + 30 * 24 * 60 * 60 * 1000)
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
		background-image: url(../../../static/images/gxx_1.png);
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
	.div_time,
	.div_contact {
		margin: .1rem 0 0 0;
		padding: 0 .15rem;
		display: flex;
		line-height: .35rem;
		justify-content: space-between;
		background: #fff;
		height: .68rem;
		line-height: .68rem;
	}

	.div_re>div:nth-child(1),
	.div_time>div:nth-child(1),
	.div_contact>div:nth-child(1) {
		font-size: .18rem;
		font-weight: 700;
	}

	.div_re>div:nth-child(2),
	.div_time>div:nth-child(2),
	.div_contact>div:nth-child(2) {
		font-size: .16rem;
		color: #B2B2B2;
	}

	.div_re input {
		background: none;
		border: 0;
		text-align: right;
	}

	.div_re img {
		width: .08rem;
	}

	.div_time img {
		width: .08rem;
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

	.time_container {
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

	.amap-page-container {
		width: 100%;
		height: 300px;
	}

	.pay_container {
		background: white;
	}

	.pay_container>dl {
		padding: 0 0.12rem;
	}

	.pay_container dt {
		padding: 0.22rem 0;
		font-size: 0.18rem;
		font-weight: 700;
	}

	.pay_container dd {
		margin: 0;
		padding: 0.13rem 0;
		font-size: 0.16rem;
	}

	.pay_container dd>label {
		display: flex;
		justify-content: space-between;
	}

	.pay_container dd>label>div {
		display: flex;
		align-items: center;
	}

	.pay_left>span {
		margin-left: 0.16rem;
	}

	.ul_add {
		background: #fff;
		margin: .1rem 0;
		padding: 0 .15rem;
	}

	.ul_add_ui>li {
		display: flex;
		justify-content: space-between;
		height: .34rem;
		line-height: .34rem;
		font-size: .14rem;
		padding: .1rem 0;
		border-bottom: .01rem solid #eee;
	}

	.ul_add_ui>li>div:nth-child(1) {
		font-size: .14rem;
	}

	.ul_add_ui>li>div:nth-child(2) input {
		width: 2.3rem;
		border: 0;
		font-size: .14rem;
		background: 0;
	}

	.ul_add_ui>li>div:nth-child(2) span {
		display: block;
		width: 2.3rem;
		font-size: .14rem;
		word-wrap: break-word;
	}

	.but_n {
		width: .62rem;
		height: .3rem;
		line-height: .3rem;
		font-size: 0.14rem;
		background: #fff;
		border: .01rem solid #eee;
		border-radius: 0.05rem;
		cursor: pointer;
		margin: 0 .2rem;
	}

	.button_colc {
		border: .01rem solid #f63;
		color: #f63;
	}

	.fug_box {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		/*height: 100%;*/
		background: rgba(0, 0, 0, .3);
		z-index: 9999;
	}

	.fug_box ul li {
		display: flex;
		justify-content: space-between;
		height: .55rem;
		line-height: .55rem;
		padding: 0 .1rem;
		background: #FFF;
		border-bottom: .01rem solid #eee;
		align-items: center;
	}

	.fug_box ul li div:nth-child(1) {
		display: flex;
		align-items: center;
	}

	.fug_box ul li div:nth-child(1) img {
		width: .24rem;
		height: .24rem;
		margin-right: .1rem;
	}

	.fg_imgsb {
		flex: 0 0 .2rem;
		height: .2rem;
		background: url(../../assets/img/checked.png) no-repeat;
		background-size: .18rem;
	}

	.fug_box_po {
		position: absolute;
		/*height: 2.2rem;*/
		overflow: hidden;
		width: 90%;
		margin: 0 5%;
		background: #fff;
		bottom: 1rem;
		border-radius: .1rem;
	}

	.slide-fade-enter-active {
		transition: all .3s ease;
	}

	.slide-fade-leave-active {
		transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}

	.slide-fade-enter,
	.slide-fade-leave-to
	/* .slide-fade-leave-active for below version 2.1.8 */

	{
		transform: translateY(2rem);
		opacity: 0;
	}

	.fg_fangs {
		height: .44rem;
		line-height: .44rem;
		text-align: center;
		border-bottom: .01rem solid #eee;
	}
</style>
s
