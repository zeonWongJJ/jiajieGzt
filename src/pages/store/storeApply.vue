<template>
	<div>
		<div class="storeApply">
			<!-- 查看填写后资料 -->
			<div v-if="statusGet == 0">
				<van-nav-bar title="查看申请资料" left-arrow @click-left="onClickLeft" />
				<div class="btnBox" v-if="user_type != 1">
					<van-button v-for="(item,index) in btnList" :key="index" @click="btnClick(index)" :class="{btnCur:index==btn_cur}" target="_blank">{{item.btn}}</van-button>
					<!--<van-button   target="_blank">提交资料</van-button>-->
				</div>

				<div class="infoForm">
					<div class="infoBox" v-show="infoShow">
						<van-cell-group>
							<van-field v-if="detailGet.store_parent_id != 0" v-model="detailGet.store_parent_id" type="number" label="店铺ID" disabled />
							<van-field v-if="detailGet.store_user_address_info && detailGet.store_user_address_info && (storeSta == 1 || user_type && user_type != 3)" v-model="detailGet.store_address_info" label="住址地址" disabled />
							<van-field v-model="detailGet.store_director" label="经营者姓名" disabled />
							<van-field v-model="detailGet.store_phone" type="number" label="联系方式" disabled />
							<van-field v-model="detailGet.store_id_card" label="身份证号码" disabled />
							<div class="idCard_box">
								<div class="idCardA">
									<ul>
										<li v-if="detailGet.store_id_card_opposite">
											<img :src="$get_thumb_img(detailGet.store_id_card_opposite,150,110)" @click="showImg(detailGet.store_id_card_opposite)" />
										</li>
									</ul>
								</div>
								<div class="idCardB">
									<ul>
										<li v-if="detailGet.store_id_card_positive">
											<img :src="$get_thumb_img(detailGet.store_id_card_positive,150,110)" @click="showImg(detailGet.store_id_card_positive)" />
										</li>
									</ul>
								</div>
							</div>
							<div class="qual_box">
								<span>资质认证</span>
								<div class="qualA">
									<ul>
										<li v-if="detailGet.store_zizhi_opposite">
											<img :src="$get_thumb_img(detailGet.store_zizhi_opposite,150,110)" @click="showImg(detailGet.store_zizhi_opposite)" />
										</li>
									</ul>
								</div>
								<div class="qualB">
									<ul>
										<li v-if="detailGet.store_zizhi_positive">
											<img :src="$get_thumb_img(detailGet.store_zizhi_positive,150,110)" @click="showImg(detailGet.store_zizhi_positive)" />
										</li>
									</ul>
								</div>
							</div>
						</van-cell-group>
					</div>

					<div class="detailBox" v-show="detailShow">
						<van-cell-group>
							<van-field v-model="detailGet.store_name" clearable label="店铺名称" placeholder="请输入店铺名称" />
							<van-field v-model="detailGet.store_range" type="number" clearable label="服务范围" placeholder="请输入您的服务范围距离" />
							<div class="areaBox">
								<div>
									<span style="margin-right:0.2rem;">所在地区</span>
									<span>{{detailGet.store_region}}</span>
								</div>
							</div>
							<van-field v-model="detailGet.store_address" clearable label="详细地址" placeholder="例：钟村街道1号" />
              <div class="storeImage">
                <span>店铺照片</span>
                <ul>
                  <li v-for="(item,index) in detailGet.store_pic">
                    <!--<i @click="removeStore(index)"><img src="../../../static/images/gxx_1.png" alt="" /></i>-->
                    <img :src="$get_thumb_img(item,150,110)" @click="showImg(item)"/>
                  </li>
                </ul>
              </div>
							<van-field v-model="detailGet.store_info" type="textarea" clearable label="店铺描述" placeholder="请输入详细的店铺描述" />
						</van-cell-group>
					</div>
				</div>

			</div>
			<!-- 查看填写后资料 -->
			<!-- 申请填写的资料 -->
			<div v-else>
				<van-nav-bar :title="storeSta ? '申请清洁师' : '申请开店'" left-arrow @click-left="onClickLeft" v-if="!user_type" />
				<van-nav-bar title="资料更改" left-arrow @click-left="onClickLeft" v-if="user_type" />
				<div class="btnBox" v-if="!storeSta">
					<van-button v-for="(item,index) in btnList" :key="index" :disabled="btnDis" @click="btnClick(index)" :class="{btnCur:index==btn_cur}" target="_blank">{{item.btn}}</van-button>
				</div>
				<div class="infoForm">
					<div class="infoBox" v-show="infoShow">
						<van-cell-group>
							<van-field v-if="storeSta" v-model="storeSta" disabled label="店铺ID" placeholder="请输入所属店铺ID" />
							<van-field v-if="storeSta || user_type && user_type == 1" v-model="dragData.address" label="住址信息" placeholder="请选择住址" @click="adds = true" style="font-size: .1rem;" />
							<van-field v-model="username" maxlength="6" clearable label="姓名" placeholder="请输入姓名" />
							<van-field v-model="storecontact" type="number" maxlength="11" clearable label="联系方式" placeholder="请输入手机号码" />
              <van-field
                v-model="verify_code"
                center
                clearable
                label="短信验证码"
                placeholder="请输入短信验证码"
                v-if="storeSta"
                maxLength="4"
              >
                <van-button @click="getSMS" slot="button" size="small" style="background: #18b4ed;color: #fff;">{{count_text}}</van-button>
              </van-field>
							<van-field v-model="storeIdcard" clearable label="身份证号码" placeholder="请输入身份证号码" />
							<div class="idCard_box">
								<div class="idCardA">
                  <ul>
                    <li>
                      <van-icon v-if="!path_imgA" name="photograph" />
                      <img v-else :src="$get_thumb_img(path_imgA,150,110)" @click="showImg(path_imgA)" />
                    </li>
                  </ul>
									<van-uploader :after-read="idCardA" multiple>
										<p>上传图片</p>
									</van-uploader>
								</div>
								<div class="idCardB">
                  <ul>
                    <li>
                      <van-icon v-if="!path_imgB" name="photograph" />
                      <img v-else :src="$get_thumb_img(path_imgB,150,110)" @click="showImg(path_imgB)" />
                    </li>
                  </ul>
									<van-uploader :after-read="idCardB" multiple>
										<p>上传图片</p>
									</van-uploader>
								</div>
							</div>
							<div class="qual_box">
								<span>资质认证</span>
								<div class="qualA">
                  <ul>
                    <li>
                      <van-icon v-if="!qual_imgA" name="photograph" />
                      <img v-else :src="$get_thumb_img(qual_imgA,150,110)" @click="showImg(qual_imgA)" />
                    </li>
                  </ul>
									<van-uploader :after-read="qualA" multiple>
										<p>上传图片</p>
									</van-uploader>
								</div>
								<div class="qualB">
                  <ul>
                    <li>
                      <van-icon v-if="!qual_imgB" name="photograph" />
                      <img v-else :src="$get_thumb_img(qual_imgB,150,110)" @click="showImg(qual_imgB)" />
                    </li>
                  </ul>
									<van-uploader :after-read="qualB" multiple>
										<p>上传图片</p>
									</van-uploader>
								</div>
							</div>
							<button class="info_sub" @click="info_update" v-if="user_type">{{user_type != 1 ? '下一步' : '确定更改'}}</button>
							<button class="info_sub" @click="info_sub" v-else>{{storeSta ? '确认申请' : '下一步'}}</button>
						</van-cell-group>
					</div>

					<div class="detailBox" v-show="detailShow">
						<van-cell-group>
							<van-field v-model="storename" clearable label="店铺名称" placeholder="请输入店铺名称" />
							<div style="display: flex;align-items: center;">
								<div style="flex: 0 0 2.8rem;">
									<van-field v-model="storerange"   type="number" clearable label="服务范围" placeholder="请输入服务范围距离" />
								</div>
								<div>
									KM
								</div>

							</div>
							<div class="areaBox" @click="clickArea">
								<div>
									<span style="margin-right:0.2rem;">所在地区</span>
									<span style="color:#b2b2b2;">{{areaer}}</span>
								</div>

								<van-icon name="arrow" />
							</div>
							<van-field v-model="storeaddr" clearable label="详细地址" placeholder="例：钟村街道1号" />
							<div class="storeImage">
								<span>店铺照片</span>
								<van-uploader :after-read="onStore" accept="image/gif, image/jpeg" multiple>
									<van-icon name="photograph" />
								</van-uploader>
								<ul>
									<li v-for="(item,index) in store_path">
										<i @click="removeStore(index)"><img src="../../../static/images/gxx_1.png" alt="" /></i>
										<img :src="$get_thumb_img(item,150,110)" @click="showImg(item)" />
									</li>
								</ul>
							</div>
							<van-field v-model="storescr" type="textarea" clearable label="店铺描述" placeholder="请输入详细的店铺描述" />
							<button class="info_sub" @click="onClickRight">{{user_type ? '确定修改' :'确定申请'}}</button>
						</van-cell-group>
					</div>
				</div>

			</div>
			<!-- 申请填写的资料 -->
			<CityPicker @on-finish="handleFinish" v-model="visible" :defaultData='defaultData'></CityPicker>

		</div>
		<!--选择店铺地址-->
		<!--<div v-show="adds" class="addsr">
			<van-nav-bar title="标题" left-arrow @click-left="onClickLeft2" />
			<div class="g-wraper">
				<div class="m-part">
					<mapDrag @drag="dragMap" @inits="inits" :lat='dragData.lat' :lng='dragData.lng' class="mapbox"></mapDrag>
				</div>
				<div class="addss">
					{{dragData.address}}
				</div>
				<div class="addbut">
					<button @click="addbuts">确 定</button>
				</div>
			</div>
		</div>-->
		<amap-search v-model="adds" @finish="getAdd"></amap-search>
    <van-popup v-model="imgShow" style="width: 100%;">
      <img :src="imgSrc" alt="" @click="imgShow = false" style="width: 100%;height: auto;">
    </van-popup>
	</div>
</template>

<script>
	import CityPicker from 'vue-citypicker';
	import api from '@/api/api'
	import mapDrag from '@/page/releaseService/add'
	import amapSearch from '@/components/amapSearch'
	export default {
		components: {
			CityPicker,
			mapDrag,
			amapSearch
		},
		data() {
			return {
				//城市
				visible: false,
				btnDis: true,
				infoShow: true,
				detailShow: false,
				defaultData: [],
				uploadFileUrl: api.uploadFileUrl + '/',
				selected: {},
				areaer: "广东省广州市番禺区",
				btn_cur: 0,
				storeId: "", //所属店铺ID
				username: "", //申请人 名称
				storecontact: this.$store.state.user_info ? this.$store.state.user_info.user_phone : "", //联系方式
				storeIdcard: "", //身份证号码
				storename: "", //店铺名称
				storerange: "", //服务范围
				storeaddr: "", //地址
				storescr: "", //描述
				cardA: [],
				cardB: [],
				qualimgA: [],
				qualimgB: [],
				btnList: [{
						btn: "基本信息填写"
					},
					{
						btn: "提交资料"
					},
				],
				path_imgA: "", //身份证 正
				path_imgB: "", //身份证 反
				qual_imgA: "", //资质  正
				qual_imgB: "", //资质  反
				storeImage: [],
				store_path: [],
				//
				statusGet: 0,
				storeSta: '',
				user_type: 0,
				detailGet: {},

				adds: false,
				dragData: {
					lng: null,
					lat: null,
					address: null,
				},
				address:'',
				lal:'',
        verify_code: '',
        time: 60,
        count_text: '获取验证码',
        canSMS: true, //判断验证码按钮状态
        imgShow: false,
        imgSrc:''
			}
		},
		mounted() {
      this.storerange = this.onstorerange
			this.statusGet = this.$store.state.store_status; //获取用户店铺状态
			this.storeSta = this.$route.query.store_id; //1入驻店铺
			this.user_type = this.$route.query.type; //3店长
			if(this.statusGet == 1 || this.statusGet == 0 || this.user_type) { //店铺状态为0或1或是修改
				this.init();
			}
		},

		methods: { //方法
      showImg(src) {
        this.imgShow = true;
        this.imgSrc = this.uploadFileUrl + src
      },
			init() {
				var that = this;
				//店铺详情
				that.$fetch('user_store_info_get', {}).then(rs => {
					that.user_type = rs.staff_row.user_type;
					that.detailGet = rs.own_store;
					if(that.statusGet != 0) {
						//填充
						if(that.detailGet.store_parent_id == 0) {
							that.storeId = that.detailGet.id
						} else {
							that.storeId = that.detailGet.store_parent_id
						}
						that.storename = that.detailGet.store_name;
						that.username = that.detailGet.store_director;
						that.storecontact = that.detailGet.store_phone;
						that.storerange = that.detailGet.store_range;
						that.areaer = that.detailGet.store_region;
						that.storeaddr = that.detailGet.store_address;
						that.store_path = that.detailGet.store_pic;
						that.storescr = that.detailGet.store_info;
						that.qual_imgA = that.detailGet.store_zizhi_positive;
						that.qual_imgB = that.detailGet.store_zizhi_opposite;
						that.path_imgA = that.detailGet.store_id_card_positive;
						that.path_imgB = that.detailGet.store_id_card_opposite;
						that.storeIdcard = that.detailGet.store_id_card;
						that.dragData.address = that.detailGet.store_user_address_info;
						that.dragData.lng = that.detailGet.store_user_lng;
						that.dragData.lat = that.detailGet.store_user_lat;
					}
				})
			},

			loadImg(type, filer) { //图片上传方法
				var that = this;
				var lists = {}
				lists.img = filer.content
				that.path = "";
				that.$fetch('uploadBase', lists).then(rs => {
					if(type == "idCardA") {
						that.path_imgA = rs.path;
					} else if(type == "idCardB") {
						that.path_imgB = rs.path;
					} else if(type == "qualA") {
						that.qual_imgA = rs.path;
					} else if(type == "qualB") {
						that.qual_imgB = rs.path;
					} else if(type == "onStore") {
						that.store_path.push(rs.path);
					}

					that.$toast('上传成功');
				})
			},
			onClickLeft() {
				this.$router.back(-1);
			},
			onClickRight() {
				let that = this;
				let lists = {};
				let phone = /(1[3-9]\d{9}$)/; //手机
				let ic = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				lists.store_name = that.storename;
				lists.store_director = that.username;
				lists.store_phone = that.storecontact;
				lists.store_range = that.storerange;
				lists.store_region = that.areaer;
				lists.store_address = that.storeaddr;
				lists.store_pic = that.store_path;
				lists.store_info = that.storescr;
				lists.store_zizhi_positive = that.qual_imgA;
				lists.store_zizhi_opposite = that.qual_imgB;
				lists.store_id_card_positive = that.path_imgA;
				lists.store_id_card_opposite = that.path_imgB;
				lists.store_id_card = that.storeIdcard;
				lists.store_parent_id = '';
				lists.store_user_lat = that.dragData.lat;
				lists.store_user_lng = that.dragData.lng;
				lists.store_user_address_info = that.dragData.address;

				if(that.user_type) { //修改
					if(lists.store_name != "" && lists.store_director != "" && lists.store_phone != "" && lists.store_range != "" && lists.store_region != "" && lists.store_address != "" && lists.store_info != "" && lists.store_id_card_positive && lists.store_id_card_opposite && lists.store_id_card != "" && lists.store_pic.length != 0) {
						if(!phone.test(lists.store_phone)) {
							that.$toast("手机格式错误！");
							return false;
						} else if(!ic.test(lists.store_id_card)) {
							that.$toast("身份证格式错误！");
							return false;
						} else {
							that.$fetch('store_update', lists, that.storeId).then(rs => {
								let t;
								clearTimeout(t)
								that.$toast("修改成功");
								t = setTimeout(function() {
									that.$router.push({
										path: '/home'
									})
								}, 1000);
							})
						}
					} else {
						that.$toast("有选项未填写");
					}
				} else { //申请
					if(lists.store_name != "" && lists.store_director != "" && lists.store_phone != "" && lists.store_range != "" && lists.store_region != "" && lists.store_address != "" && lists.store_info != "" && lists.store_id_card_positive && lists.store_id_card_opposite && lists.store_id_card != "" && lists.store_pic.length != 0) {
						if(!phone.test(lists.store_phone)) {
							that.$toast("手机格式错误！");
							return false;
						} else if(!ic.test(lists.store_id_card)) {
							that.$toast("身份证格式错误！");
							return false;
						} else {
							that.$fetch('user_store_add', lists).then(rs => {
								that.$toast("已提交申请，请耐心等候");
								setTimeout(() => {
									that.$router.push({
										path: '/home'
									})
								}, 1500);
							})
						}
					} else {
						that.$toast("有选项未填写");
					}
				}

			},
			btnClick(index) {
				var that = this;
				that.btn_cur = index;
				if(index == 0) {
					that.infoShow = true;
					that.detailShow = false;
					that.btnDis = true;
				} else {
					that.infoShow = false;
					that.detailShow = true;
				}
			},
			clickArea() {
				this.visible = true;
			},
			handleFinish(selected) {
				console.log(selected)
				this.selected = selected;
				this.defaultData = [selected.province.code, selected.city.code, selected.area.code];
				this.areaer = selected.province.name + selected.city.name + selected.area.name
			},
			idCardA(file) {
				this.cardA.shift();
				this.cardA.push(file);
				this.loadImg("idCardA", file);
			},
			idCardB(file) {
				this.cardB.shift();
				this.cardB.push(file);
				this.loadImg("idCardB", file);
			},
			qualA(file) {
				this.qualimgA.shift();
				this.qualimgA.push(file);
				this.loadImg("qualA", file);
			},
			qualB(file) {
				this.qualimgB.shift();
				this.qualimgB.push(file);
				this.loadImg("qualB", file);
			},
			onStore(file) {
				if(this.storeImage.length < 9) {
					this.storeImage.push(file);
				} else {
					this.$toast('最多上传9张！');
				}
				this.loadImg("onStore", file)
			},
			removeStore(index) { //删除图片
				//				this.storeImage.splice(index, 1);
				let that = this
				let lists = {}
				lists.file = that.store_path[index]
				that.store_path.splice(index, 1)
				that.$fetch('file_remove', lists).then(rs => {
					that.$toast('已删除');
				})
			},
			info_update() {
				let that = this;
				if(that.user_type != 1) {
					that.infoShow = false;
					that.detailShow = true;
					that.btn_cur = 1;
					that.btnDis = false;
				} else {
					let lists = {};
					let phone = /(1[3-9]\d{9}$)/; //手机
					let ic = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
					var qs = require('qs');
					lists.store_parent_id = that.storeId;
					lists.store_director = that.username;
					lists.store_phone = that.storecontact;
					lists.store_zizhi_positive = that.qual_imgA;
					lists.store_zizhi_opposite = that.qual_imgB;
					lists.store_id_card_positive = that.path_imgA;
					lists.store_id_card_opposite = that.path_imgB;
					lists.store_id_card = that.storeIdcard;
					lists.store_user_lat = that.dragData.lat;
					lists.store_user_lng = that.dragData.lng;
					lists.store_address_info = that.dragData.address;
					if (that.$route.query.pid) {lists.parent_id = that.$route.query.pid}
					if(lists.store_parent_id != "" && lists.store_director != "" && lists.store_phone != "" && lists.store_id_card_positive && lists.store_id_card_opposite) {
						if(!phone.test(lists.store_phone)) {
							that.$toast("手机格式错误！");
							return false;
						} else if(!ic.test(lists.store_id_card)) {
							that.$toast("身份证格式错误！");
							return false;
						} else {
							that.$fetch('store_update', lists, that.detailGet.id).then(rs => {
								let t;
								clearTimeout(t)
								that.$toast("修改成功");
								t = setTimeout(function() {
									that.$router.push({
										path: '/home'
									})
								}, 2000);
							})
						}
					} else {
						that.$toast("有选项未填写");
					}
				}

			},

			info_sub() {
				var that = this;
				var qs = require('qs')
				let phone = /(1[3-9]\d{9}$)/; //手机
				var ic = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				if(that.storeSta) {
					if(that.username != "" && that.storecontact != "" && that.storeIdcard != "" && (that.path_imgA != "" && that.path_imgB != "")) {
						if(!phone.test(that.storecontact)) {
							that.$toast('手机非法');
						} else {
							var lists = {};
							lists.store_id = that.storeSta;
							lists.staff_name = that.username;
							lists.staff_tel = that.storecontact;
							lists.staff_id_card_pic_zm = that.path_imgA;
							lists.staff_id_card_pic_bm = that.path_imgB;
							lists.staff_cert_pic_zm = that.qual_imgA;
							lists.staff_cert_pic_bm = that.qual_imgB;
							lists.staff_id_card_number = that.storeIdcard;
              lists.store_user_lat = that.dragData.lat;
              lists.store_user_lng = that.dragData.lng;
							lists.staff_address_info = that.dragData.address;
              if (this.verify_code == '') {
                that.$toast("请先填写验证码！");
                return false
              } else {
                lists.verify_code = this.verify_code
              }
							that.$fetch('store_staff_add', lists).then(rs => {
								that.$toast("已提交申请，请耐心等候");
                  setTimeout(()=>{
                    that.$router.push({
                      path: '/home'
                    })
                  },1500)
                }).catch(e => {

						  })
						}
					} else {
						that.$toast('有选项未填写或身份证图片未上传！');
					}

				}
				else {
					if(that.username != "" && that.storecontact != "" && that.storeIdcard != "" && (that.path_imgA != "" && that.path_imgB != "")) {
						if(!phone.test(that.storecontact)) {
							that.$toast('手机非法');
						} else if(!ic.test(that.storeIdcard)) {
							that.$toast('身份证非法');
						} else {
							that.infoShow = false;
							that.detailShow = true;
							that.btn_cur = 1;
							that.btnDis = false;
						}

					} else {
						that.$toast('有选项未填写或身份证图片未上传！');
						that.detailShow = false;
					}
				}
			},

			onClickLeft2() {
				let that = this
				that.adds = false
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
			getAdd(data){
				console.log(data)
				this.dragData = {
					lng: data.location.lng,
					lat: data.location.lat,
					address:  data.pname + data.cityname + (data.address || '') + data.name
				}
			},
			//			关地图
			addbuts() {
				let that = this
				that.adds = false
			},

			inits(data) {
				console.log('init:', data)
			},
      getSMS(){
        if(this.canSMS){
          var phoneReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
          if (!phoneReg.test(this.storecontact)) {
            this.$toast('手机号码不合法')
          }else{
            this.canSMS = false
            this.$fetch('user_code_send', {'user_phone':this.storecontact}).then(rs => {
              this.$toast('验证码已发送')
              this.countDown()
            }).catch(e=>{
              this.canSMS = true
            })
          }
        }else{
          this.$toast('请勿频繁操作')
        }
      },
      countDown() {
        let that = this
        that.count_text = that.time + '秒'
        if(that.time === 0) {
          that.count_text = '获取验证码'
          that.time = 60
          that.canSMS = true
        } else {
          that.count_text = (that.time--) + '秒'
          setTimeout(that.countDown, 1000);
        }
      }
		},
	}
</script>

<style scoped>
	.storeApply{
    height: 100%;
    position: relative;
	}
	p {
		margin: 0;
	}

	.btnBox {
		display: flex;
		justify-content: space-between;
		padding: 0.1rem 0.12rem;
	}

	.btnCur {
		color: white;
		background: #18b4ed;
	}

	.idCard_box,
	.qual_box {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.12rem;
	}

	.idCard_box p,
	.qual_box p {
		width: 1.66rem;
		height: 0.3rem;
		line-height: 0.3rem;
		margin: 0.1rem auto;
		font-size: 0.14rem;
		text-align: center;
		color: white;
		background: #18b4ed;
		border-radius: 0.04rem;
	}

	.qual_box {
		position: relative;
		margin-top: 0.2rem;
	}

	.qual_box>span {
		position: absolute;
		top: -0.2rem;
		font-size: 0.16rem;
	}

	/*.idCardA>ul,*/
	/*.idCardB>ul,*/
	/*.qualA>ul,*/
	/*.qualB>ul {*/
		/*position: absolute;*/
		/*top: 0.1rem;*/
	/*}*/

	.idCardA>ul>li>img,
	.idCardB>ul>li>img,
	.qualA>ul>li>img,
	.qualB>ul>li>img {
		width: 1.66rem;
		height: 1.1rem;
	}

	.areaBox {
		display: flex;
		padding: 10px 15px;
		border-bottom: 1px solid #ddd;
		font-size: 0.16rem;
		justify-content: space-between;
		align-items: center;
	}

	.info_sub {
		width: 90%;
		height: 0.5rem;
		line-height: 0.5rem;
		display: block;
		margin: 0.2rem auto;
		font-size: 0.18rem;
		background: #18b4ed;
		text-align: center;
		color: white;
		border: none;
		border-radius: 0.04rem;
	}

	.storeImage {
		display: flex;
		padding: 10px 15px;
		border-bottom: 1px solid #ddd;
		justify-content: flex-start;
	}

	.storeImage>span {
		font-size: 0.16rem;
		margin-right: 0.4rem;
	}

	.storeImage {
		display: flex;
		padding: 10px 15px;
		border-bottom: 1px solid #ddd;
		justify-content: flex-start;
	}

	.storeImage>span {
		font-size: 0.16rem;
		margin-right: 0.4rem;
	}

	.storeImage>ul {
		width: 1.6rem;
		display: flex;
		flex-wrap: wrap;
	}

	.storeImage>ul>li {
		position: relative;
	}

	.storeImage>ul>li>i {
		position: absolute;
		top: -0.05rem;
		right: -0.08rem;
		cursor: pointer;
	}

	.storeImage>ul>li>i>img {
		width: 0.2rem;
		height: 0.2rem;
	}

	.storeImage>ul>li>img {
		width: 0.7rem;
		height: 0.7rem;
		margin-left: 0.08rem;
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
		z-index: 0;
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
<style>
	.storeApply .van-cell {
		font-size: 0.16rem;
	}

	.storeApply .btnBox button {
		width: 1.71rem;
		padding: 0;
	}

	.storeApply .infoForm .van-icon-photograph::before {
		width: 1.66rem;
		height: 1.1rem;
		content: "";
		background-size: 1.66rem 1.1rem;
	}

	.storeApply .infoForm .idCard_box .idCardA .van-icon-photograph::before {
		background-image: url(../../../static/images/id11_03.png);
	}

	.storeApply .infoForm .idCard_box .idCardB .van-icon-photograph::before {
		background-image: url(../../../static/images/zizhifan_03.png);
	}

	.storeApply .infoForm .qual_box .qualA .van-icon-photograph::before {
		background-image: url(../../../static/images/qual_03.png);
	}

	.storeApply .infoForm .qual_box .qualB .van-icon-photograph::before {
		background-image: url(../../../static/images/zizhifan_07.png);
	}

	.storeApply .storeImage .van-icon-photograph::before {
		width: 0.7rem;
		height: 0.7rem;
		content: "";
		background-image: url(../../../static/images/upLoad.png);
		background-size: 0.7rem 0.7rem;
	}
</style>
