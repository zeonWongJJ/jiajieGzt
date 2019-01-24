<template>
	<div class="releaseService">
		<!--header-->
    <van-nav-bar v-if="this.$route.query.id" title="编辑服务" left-arrow @click-left="onClickLeft" />
    <van-nav-bar v-else title="发布服务" left-arrow @click-left="onClickLeft" />
		<!--main-->
		<div class="main">
			<div class="form">
				<!--服务分类-->
				<div class="cell flex category" @click="categorySelect = true">
					<div class="logo">
						<img src="../../assets/img/fastReservation/category.png"/>
					</div>
					<div class="category_div" :class="{black : category}">{{category ? categoryType.cat_name : '请选择服务分类'}}</div>
					<div class="more">
						<img src="../../assets/img/fastReservation/category_more.png"/>
					</div>
				</div>
				<!--填写内容-->
				<div class="cell message">
					<van-field
					    v-model="title"
					    type="textarea"
					    placeholder="请填写您的服务标题"
					    autosize
					/>
				</div>
				<!--填写内容-->
				<div class="cell message">
					<van-field
					    v-model="message"
					    type="textarea"
					    placeholder="请填写您的收费标准、服务内容、服务流程、 服务保障等。详细的服务介绍可以吸引更多客 户下单。"
					    rows="4"
					    autosize
					/>
				</div>
				<!--上传图片-->
				<div class="cell photo">
					<div @click="show = true">请上传您的现场图片</div>
					<div class="upload_box">
						<div class="upload_img" v-for="(item,index) in uploadList">
							<div class="delete" @click="deleteImg(index)"><img src="../../assets/img/delete.png"/></div>
							<img :src="uploadFileUrl + item"/>
						</div>
						<van-uploader :after-read="onRead">
					  		<div class="upload_icon"><img src="../../assets/img/upload.png"/></div>
						</van-uploader>
					</div>
				</div>
        <!--收费方式-->
        <div class="cell flex fees">
          <div class="label">服务收费</div>
          <div class="right" @click="showFees = true">
            <div class="gray" v-show="!feesType.type.id">去编辑</div>
            <div class="price">{{feesType.price + (feesType.type.id == 2 ? '元' : '')}}
              <span v-if="feesType.type.id != 2">{{feesType.unit.unit_name}}</span></div>
            <div class="red">{{feesType.type.name}}</div>
          </div>
        </div>
        <!--劳动佣金-->
        <div class="cell flex fees">
          <div class="label">劳动报酬</div>
          <div class="right">
            <input type="number" v-model="remuneration" placeholder="请填写合理的劳动报酬">
          </div>
        </div>
				<!--服务范围-->
				<div class="cell flex range" @click="locationCurrentPosition">
					<div class="label">服务范围</div>
					<div class="right">
						<div>{{address.length > 0 ? address : addressTip}}</div>
						<div class="plain">附近30公里</div>
					</div>
				</div>
			  	<!--协议-->
			  	<div class="protocol">
			  		<Protocol showTip="3"></Protocol>
			  	</div>
			  	<van-button round  size="large" class="release" :class="{canReservation:canReservation}" @click="release">{{$route.query.id ? '修改' : '发布'}}</van-button>
			</div>
		</div>
		<!--category-->
		<Category :is-home-page="$store.state.store_info.store_type == 'SELF_SUPPORT'" v-model="categorySelect" :category="category" @select="finishCategory"></Category>
		<Fees v-model="showFees" :data="feesType" @select="finishFees" :typeList="typeList" :unitList="unitList"></Fees>
		<amap-search v-model="amapShow" :center="lal" @finish="selectAmap"></amap-search>
	</div>
</template>

<script>
	import Protocol from '@/components/protocol'
	import Category from '@/components/category'
	import Fees from '@/pages/service/way_of_fees'
	import utils from '@/utils/utils'
	import api from '@/api/api'
	import amapSearch from '@/components/amapSearch'
	export default{
		components:{
			Protocol,
			Category,
			Fees,
			amapSearch
		},
		data(){
			return{
				uploadFileUrl: api.uploadFileUrl + '/',
				categorySelect:false,
				category:0,
				categoryType:{},
				title:'',
				message:'',
        remuneration: '',
				canReservation:false,
				uploadList:[],
				showFees:false,
				feesType:{
					type:{
						id:'',
						name:''
					},
					price:'',
					unit:{
						id:'',
						name:''
					}
				},
				address:'',
				lal:'113.280637,23.125178',
				amapShow:false,
				addressTip:'定位中...',
				typeList:[
					{
						id:1,
						name:'一口价',
						type:'FIXED_PRICE'
					},
					{
						id:2,
						name:'定金',
						type:'HAS_RESERVATION'
					},
					{
						id:3,
						name:'免费预约',
						type:'NON_RESERVATION'
					},
				],
				unitList: this.$store.state.unitList
			}
		},
		watch:{
			message(val){
				this.canReservation = this.checkReservation();
			},
			address(val){
				this.canReservation = this.checkReservation();
			},
      remuneration (val) {
        this.canReservation = this.checkReservation()
      }
		},
		mounted(){
      this.$fetch('service_util_list').then(rs=>{
        if (rs.length > 0) {
          this.unitList = rs
          this.$store.commit('setUnit', rs)
        }
      })
			// 定位
          	if(this.$route.query.id){
          		this.getServiceInfo(this.$route.query.id)
          	}else{
          		if (utils.is_android() && typeof android != 'undefined') {
		            android.locationCurrentPosition();
	          	}
	          	if (utils.is_ios() && window.webkit && window.webkit.messageHandlers.locationCurrentPosition) {
		            window.webkit.messageHandlers.locationCurrentPosition.postMessage({});
	          	}
				setTimeout(()=>{
					this.addressTip = '定位失败，请选择地址'
				},5000)
          	}
          	window['locationSuccess'] = res => {
              if(res.cityCode == '020'){
              	this.address = res.address;
              	this.lal = res.longitude + ',' + res.latitude;
              }else{
              	this.$toast('您当前定位不在广州市，请选择广州市区域地址')
              }
	      	}

        	window['searchAddressByPoiSuccess'] = res => {
        		if(res.cityCode == '020'){
	                this.address = (res.provinceName || '') + (res.cityName || '') + (res.direction || '') + (res.address || '') + (res.title || '');
	                this.lal = res.longitude + ',' + res.latitude;
              	}else{
              		this.$toast('请选择广州市区域地址')
              	}
        	}
		},
		methods:{
			getServiceInfo(id){
				this.$fetch('service_get', {}, id).then(rs => {
					this.category = rs.row.service_level_1;
					this.categoryType.cat_name = rs.row.cat_name;
					this.title = rs.row.service_name;
					this.message = rs.row.service_info;
					this.uploadList = rs.row.service_img;
					this.feesType.price = (rs.row._service_remuneration || rs.row.service_remuneration);
					this.feesType.type = this.setType(rs.row.order_charging);
					this.feesType.unit = this.setUnit(rs.row.service_value_unit_id);
					this.address = rs.row.service_address_name;
					this.lal = rs.row.lng + ',' + rs.row.lat;
					this.remuneration = rs.row.service_commissions;
				})
			},
			setType(type){
				let feesType = this.typeList[0]
				this.typeList.forEach(item =>{
					if(item.type == type){
						feesType = item
					}
				})
				return feesType
			},
			setUnit(id){
				let feesUnit = this.unitList[0];
				this.unitList.forEach(item => {
					if(item.id == id){
						feesUnit = item
					}
				})
				return feesUnit
			},
			//返回
			onClickLeft(){
				this.$router.back(-1);
			},

			//检查发布服务条件
			checkReservation(toast){
				if(!this.category){
					toast && this.$toast('请选择服务分类')
					return false
				}else if(this.title.length === 0){
					toast && this.$toast('请填写服务标题')
					return false
				}else if(this.message.length === 0){
					toast && this.$toast('请填写服务内容')
					return false
				}else if(!this.feesType.type.id){
					toast && this.$toast('请选择服务收费类型')
					return false
				}else if(this.address.length === 0){
					toast && this.$toast('请选择服务范围')
					return false
				} else if (this.remuneration == '' || Number(this.remuneration) > Number(this.feesType.price)) {
          toast && this.$toast('请填写合理的服务人员劳动报酬')
          return false
        }
				else{
					return true
				}
			},

			//选择服务分类
			finishCategory(type){
				this.categoryType = type;
				this.category = type.id;
				this.canReservation = this.checkReservation();
			},

			//选择服务收费
			finishFees(type){
				this.feesType = type;
				this.canReservation = this.checkReservation();
			},

			//发布服务
			release(){
				if(this.canReservation) {
					let data = {};
					data.service_cate_id = this.category;
					data.service_name = this.title;
					data.service_info = this.message;
					data.service_img = this.uploadList;
					data.service_remuneration = this.feesType.price;
					data.order_charging = this.feesType.type.type;
					data.service_value_unit_id = (this.feesType.type.id == 2 ? 0 : this.feesType.unit.id);
					data.service_address_name = this.address;
					data.service_lal = this.lal;
					data.remuneration = this.remuneration
					if(this.$route.query.id){
						this.$fetch('service_update', data, this.$route.query.id).then(rs=>{
							this.onClickLeft();
						})
					}else{
						this.$fetch('service_add',data).then(rs=>{
							this.onClickLeft();
						})
					}

				}else{
					this.checkReservation(true);
				}
			},

			//**********上传图片
			beforeRead(){
				if(this.uploadList.length >= 8){
					this.$toast('最多上传8张图片')
					return false
				}
				return true
			},
			onRead(file){
				if(file.length){
					file.forEach(item =>{
						if(this.uploadList.length >= 8){
							this.$toast('最多上传8张图片')
							return
						}
						this.$fetch('uploadBase', lists).then(rs =>{
			          	this.uploadList.push(rs.path);
				          	this.$toast('上传成功');
				       })
					})
				}else{
					var lists = {};
			        lists.img = file.content;
			        this.$fetch('uploadBase', lists).then(rs =>{
			          	this.uploadList.push(rs.path);
			          	this.$toast('上传成功');
			        })

				}
			},
			deleteImg(index){
				let lists = {};
				lists.file = this.uploadList[index];
				this.uploadList.splice(index, 1);
				this.$fetch('file_remove',lists).then(rs =>{
		          	this.$toast('已删除');
				})
			},
			//********上传图片end

			//地图
			locationCurrentPosition(){
	          	if (utils.is_android() && typeof android != 'undefined') {
		            android.searchAddressByPoi({});
	          	}else if (utils.is_ios() && window.webkit && window.webkit.messageHandlers.searchAddressByPoi) {
		            window.webkit.messageHandlers.searchAddressByPoi.postMessage({});
	          	}else{
	          		this.amapShow = true
	          	}
			},
			selectAmap(data){
				this.address = data.pname + data.cityname + (data.address || '') + data.name
				this.lal = data.location.lng +','+ data.location.lat;
			}
		}
	}
</script>
<style lang="less" scoped>
	.releaseService{
		height: 100%;
		background: #f5f5f5;
		position: relative;
		.main{
			height:calc(100% - .46rem);
			overflow-y: auto;
			.form{
				padding: .1rem;
			}
			.cell{
				border: none;
				box-shadow: 0px 5px 13px rgba(148,213,237,.2);
				margin-bottom: .1rem;
				background: #fff;
				border-radius: 5px;
				overflow: hidden;
				font-size: .16rem;
				.right{
					display: flex;
					align-items: center;
					height: 100%;
					.gray{
						color: #b2b2b2;
					}
					.red{
						background: #ff3434;
						color: #fff;
						font-size:.14rem;
						padding: 0 .06rem;
						line-height: .24rem;
						border-radius: .05rem;
						margin-left: .1rem;
					}
					.price{
						color: #ff3434;
					}
					.plain{
						border: 1px solid #ff9c0f;
						color: #ff9c0f;
						border-radius: .1rem;
						font-size: .12rem;
						padding: .02rem .05rem;
						margin-left: .1rem;
						flex: 0 0 auto;
					}
          input{
            border: none;
            webkit-appearance: none;
            outline: none;
            background: none;
          }
				}
				.right:after{
					content: '';
					display: block;
					height: .12rem;
					width: .12rem;
					margin-left: .1rem;
					background: url(../../assets/img/right.png) no-repeat;
					background-position: center;
					background-size: auto .12rem;
				}
			}
			.cell.flex{
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			.cell.category{
				.category_div{
					line-height: .6rem;
					flex: 1;
			    	font-size: .16rem;
			    	color:#757575;
				}
				.category_div.black{
					color: #000;
				}
				.logo,.more{
					width: .2rem;
					height: .2rem;
					overflow: hidden;
					margin: 0 .2rem;
					img{
						height: 100%;
					}
				}
				.more{
					margin: .2rem;
				}
			}
			.cell.photo{
				padding: .2rem;
				color: #757575;
				.upload_box{
					display:flex;
					flex-wrap: wrap;
					.upload_img,.upload_icon{
						width: .8rem;
						height: .8rem;
						margin-top: .1rem;
						margin-right: .1rem;
						position: relative;
						.delete{
							position: absolute;
							right: -.1rem;
							top:-.1rem;
							width:.2rem;
							height:.2rem;
							img{
								width: 100%;
								height: 100%;
							}
						}
						img{
							width: 100%;
							height: 100%;
						}
					}
				}
			}
			.cell.fees{
				line-height:.24rem;
				padding: .2rem;
			}
			.cell.range{
				padding: .2rem;
				.right{
					flex: 1;
					margin-left: .1rem;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
			}
			.protocol{
				text-align: center;
			}

			.van-button.release{
				margin-top: .1rem;
				background: #b2b2b2;
				color: #fff;
				font-size: .18rem;
			}
			.van-button.release.canReservation{
				background: #18b4ed;
			}
		}
	}

</style>
