<template>
	<div class="upStore">
		<div class="body">
			<van-nav-bar title="申请开店" left-arrow right-text="确定申请" @click-left="onClickLeft" @click-right="onClickRight" />
			<div class="formList">
				<van-cell-group>
					<van-field v-model="storename" clearable label="店铺名称" placeholder="请输入店铺名称" />
					<van-field v-model="storeOffname" clearable label="负责人名称" placeholder="请输姓名" />
					<van-field v-model="storecontact" type="number" clearable label="联系方式" placeholder="请输入手机号码" />
					<van-field v-model="storeIdcard"  clearable label="身份证号码" placeholder="请输入身份证号码" />
					<van-field v-model="storerange" type="number" clearable label="服务范围" placeholder="请输入您的服务范围距离" />
					<!--<van-field v-model="storearea" clearable label="所在地区" @clikc="clickArea" placeholder="例：广东省广州市番禺区" icon="arrow"  />-->
					<div class="areaBox" @click="clickArea">
						<div>
							<span style="margin-right:0.4rem;">所在地区</span>
							<span style="color:#b2b2b2;">{{areaer}}</span>
						</div>

						<van-icon name="arrow" />
					</div>
					<van-field v-model="storeaddr" clearable label="详细地址" placeholder="例：钟村街道1号" />
					<div class="idCard">
						<span>身份证照片</span>
						<van-uploader :after-read="onIdCard" accept="image/gif, image/jpeg" multiple>
							<van-icon name="photograph" />
						</van-uploader>
						<ul>
							<li v-for="(item,index) in idImage">
								<i @click="removeIdCard(index)"><img src="../../../static/images/gxx_1.png" alt="" /></i>
								<img :src="item.content" />
							</li>
						</ul>
					</div>
					<div class="qual">
						<span>资质照片</span>
						<van-uploader :after-read="onQual" accept="image/gif, image/jpeg" multiple>
							<van-icon name="photograph" />
						</van-uploader>
						<ul>
							<li v-for="(item,index) in qualImage">
								<i @click="removeQualImage(index)"><img src="../../../static/images/gxx_1.png" alt="" /></i>
								<img :src="item.content" />
							</li>
						</ul>
					</div>
					<div class="storeImage">
						<span>店铺照片</span>
						<van-uploader :after-read="onStore" accept="image/gif, image/jpeg" multiple>
							<van-icon name="photograph" />
						</van-uploader>
						<ul>
							<li v-for="(item,index) in storeImage">
								<i @click="removeStore(index)"><img src="../../../static/images/gxx_1.png" alt="" /></i>
								<img :src="item.content" />
							</li>
						</ul>
					</div>
					<van-field v-model="storescr" clearable label="店铺描述" placeholder="请输入详细的店铺描述" />
				</van-cell-group>

			</div>
			<!--<van-popup v-model="showArea" position="bottom">
				<van-area :area-list="areaList" :columns-num="2" title="所在地区" @cancel="cancelArea" @change="changeArea($event)" @confirm="sureArea($event)"/>
			</van-popup>-->
			<CityPicker @on-finish="handleFinish" v-model="visible" :defaultData='defaultData'></CityPicker>
		</div>
	</div>
</template>

<script>
	import CityPicker from 'vue-citypicker';
	import api from '@/api/api'
	export default {
		components: {
    		CityPicker,
  		},
		data() {
			return {
				//城市
    			visible:false,
    			defaultData: [],
      			selected: {},
				areaer:"例：广东省广州市番禺区",
				storename: "",
				storeOffname: "",
				storecontact: "",
				storeIdcard:"",
				storerange: "",
				storearea: "",
				storeaddr: "",
				storescr: "",
				idImage: [],
				qualImage:[],
				storeImage: [],
				path_img1:[],//返回的图
				path_img2:[],//返回的图
				path_img3:[],//返回的图
			}
		},
		mounted() { //生命周期

		},
		methods: { //方法
			loadImg(that,filer,path){//图片上传方法
				var lists = {}
				lists.img = filer.content
				var qs = require('qs');
				that.path="";
				that.$fetch('uploadBase',lists).then(rs =>{
          path.push(rs.path)
          that.$toast('上传成功');
				})
			},
			onClickLeft() {
				this.$router.back(-1);
			},
			onClickRight() {
				let that = this;
				let lists = {};
				let phone = /(1[3-9]\d{9}$)/;//手机
				let ic = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				var qs = require('qs');
				lists.store_name=that.storename;
				lists.store_director=that.storeOffname;
				lists.store_phone=that.storecontact;
				lists.store_range=that.storerange;
				lists.store_region=that.areaer;
				lists.store_address=that.storeaddr;
				lists.store_pic=that.path_img1;
				lists.store_zizhi_pic=that.path_img2;
				lists.store_info=that.storescr;
				lists.store_id_card=that.path_img3;
				lists.store_id_card_num=that.storeIdcard;

				if( lists.store_name != "" && lists.store_director != "" && lists.store_phone != "" && lists.store_range != "" && lists.store_region != "" && lists.store_address != "" && lists.store_pic != "" && lists.store_zizhi_pic && lists.store_info != "" && lists.store_id_card != "" && lists.store_id_card_num != ""){
					if(!phone.test(lists.store_phone)){
						that.$toast("手机格式错误！");
						return false;
					}else if(!ic.test(lists.store_id_card_num)){
						that.$toast("身份证格式错误！");
						return false;
					}else{
						that.$fetch('user_store_add',lists).then(rs =>{
						})
					}
				}else{
					that.$toast("有选项未填写");
				}


			},
			clickArea() { //弹出地区
				this.visible = true;
			},
			handleFinish(selected) {
      			this.selected = selected;
      			this.defaultData = [selected.province.code, selected.city.code, selected.area.code];
      			this.areaer=selected.province.name+selected.city.name+selected.area.name
    		},
			onIdCard(file) {

				if($(".idCard>ul>li").length < 2) {
					this.idImage.push(file);
				} else {
					this.$toast('最多上传2张！');
				}
				this.loadImg(this,file,this.path_img1)
			},
			onQual(file) {
				if($(".qual>ul>li").length < 2) {
					this.qualImage.push(file);
				} else {
					this.$toast('最多上传2张！');
				}
				this.loadImg(this,file,this.path_img2)
			},
			onStore(file) {
				if($(".storeImage>ul>li").length < 9) {
					this.storeImage.push(file);
				} else {
					this.$toast('最多上传9张！');
				}
				this.loadImg(this,file,this.path_img3)
			},
			removeIdCard(index) { //删除图片
				this.idImage.splice(index, 1);
			},
			removeStore(index) { //删除图片
				this.storeImage.splice(index, 1);
			},
		},
	}
</script>

<style scoped>
	.areaBox {
		display: flex;
		padding: 10px 15px;
		border-bottom: 1px solid #ddd;
		font-size: 0.16rem;
		justify-content: space-between;
		align-items: center;
	}

	.idCard,
	.qual,
	.storeImage {
		display: flex;
		padding: 10px 15px;
		border-bottom: 1px solid #ddd;
		justify-content: flex-start;
	}

	.idCard>span,
	.qual>span,
	.storeImage>span {
		font-size: 0.16rem;
		margin-right: 0.4rem;
	}

	.idCard>ul,
	.qual>ul,
	.storeImage>ul {
		width: 1.6rem;
		display: flex;
		flex-wrap: wrap;
	}

	.idCard>ul>li,
	.qual>ul>li,
	.storeImage>ul>li {
		position: relative;
	}

	.idCard>ul>li>i,
	.qual>ul>li>i,
	.storeImage>ul>li>i {
		position: absolute;
		top: -0.05rem;
		right: -0.08rem;
		cursor: pointer;
	}

	.idCard>ul>li>i>img,
	.qual>ul>li>i>img,
	.storeImage>ul>li>i>img {
		width: 0.2rem;
		height: 0.2rem;
	}

	.idCard>ul>li>img,
	.qual>ul>li>img,
	.storeImage>ul>li>img {
		width: 0.7rem;
		height: 0.7rem;
		margin-left: 0.08rem;
	}
</style>
<style>
	.upStore .formList input::-webkit-input-placeholder {
		color: #b2b2b2;
	}

	.upStore .van-nav-bar {
		background: white !important;
	}

	.upStore .van-field .van-cell__title {
		min-width: 1rem;
	}

	.upStore .van-nav-bar .van-icon,
	.upStore .van-nav-bar__title {
		color: black !important;
	}

	.upStore .van-cell {
		line-height: 0.24rem !important;
		font-size: 0.16rem;
		border-bottom: 1px solid #ddd;
	}

	.upStore .van-cell__value {
		margin-left: 0.1rem;
	}

	.upStore .van-icon-photograph::before {
		width: 0.7rem;
		height: 0.7rem;
		content: "";
		background-image: url(../../../static/images/upLoad.png);
		background-size: 0.7rem 0.7rem;
	}
</style>
