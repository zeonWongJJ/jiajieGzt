<template>
	<div class="releaseDemand">
		<!--header-->
		<van-nav-bar title="发布需求" left-arrow @click-left="onClickLeft" />
		<!--main-->
		<div class="main">
			<div class="form">
				<!--服务分类-->
				<div class="cell flex category" @click="categorySelect = true">
					<div class="category_div" :class="{black : category}">{{category ? categoryType.cat_name : '请选择服务分类'}}</div>
					<div class="more">
						<img src="../../assets/img/fastReservation/category_more.png"/>
					</div>
				</div>
				<!--填写内容-->
				<div class="cell message">
					<van-field
					    v-model="message"
					    type="text更换area"
					    placeholder="请填写您的服务要求"
					    rows="4"
					    autosize
					/>
				</div>
				<!--上传图片-->
				<div class="cell photo">
					<div>请上传您的现场图片</div>
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
				<!--服务范围-->
				<div class="cell flex padding" @click="addressShow = true">
					<div class="input">
						<div class="gray" v-if="!address.contact_name">请添加您的家庭地址</div>
						<template v-else>
							<div>{{address.contact_address_name}}</div>
							<div>
								{{address.contact_name}}
								{{address.contact_gender == 1 ? '先生' : address.contact_gender == 2 ? '女士' : ''}}
								{{'  '+address.telephone_number}}
							</div>
						</template>
					</div>
					<div class="blue" >{{address.contact_name ? '更换' :'+地址簿'}}</div>
				</div>
				<!--金额-->
				<div class="cell flex padding">
					{{price ? '￥' : ''}}
					<div class="input">
						<input v-model.number="price" type="number" placeholder="请填写您愿意支付的服务报酬金额"/>
					</div>
				</div>
			  	<!--协议-->
			  	<div class="protocol">
			  		<Protocol showTip="3"></Protocol>
			  	</div>
			  	<van-button round  size="large" class="release" :class="{canReservation:canReservation}" @click="release">发布</van-button>
			</div>
		</div>
		<div class="addsa" v-show="addressShow" @click="addressShow = false">
	        <div class="addsa_div">
	          <ul>
	            <li v-for="(aditem,index) in addslists" @click="indexadd(aditem,index)">
	              <div class="addsri">
	                <div class="lrm">
	                  <div>
	                    联系人：{{aditem.contact_name}}{{aditem.contact_gender == 1 ? '先生' : aditem.contact_gender == 2 ? '女士' : ''}}
	                  </div>
	                  <div>
	                    {{aditem.telephone_number}}
	                  </div>
	                </div>

	                <div class="addcor">
	                  联系地址：{{aditem.contact_address_name}}
	                </div>
	              </div>
	            </li>
	            <li style="padding:0; border-bottom: none;">
	              <div style="width:60%; padding:0.08rem 0; border-radius: 0.4rem; margin:0.1rem auto; background:#18b4ed; color:white; text-align: center;font-size: .14rem;" @click.stop="onaddShow()">
	                添加新地址
	              </div>
	            </li>
	          </ul>
	        </div>
      	</div>
		<!--category-->
		<Category :is-home-page="false" v-model="categorySelect" :category="category" @select="finishCategory"></Category>
		<orderConfirmation v-model="show" :orderData="orderData" :orderType="1"></orderConfirmation>
		<editAddress v-model="addShow" :addData="{}"></editAddress>
	</div>
</template>

<script>
	import Protocol from '@/components/protocol'
	import Category from '@/components/category'
	import orderConfirmation from '@/components/order_confirmation'
	import editAddress from '@/components/editAddress'
	import api from '@/api/api'
	export default{
		components:{
			Protocol,
			Category,
			orderConfirmation,
			editAddress
		},
		data(){
			return{
				categorySelect:false,
				category:0,
				categoryType:{},
				message:'',
				canReservation:false,
				uploadList:[],
				address:{},
				lal:[],
				price:'',
				show:false,
				uploadFileUrl:api.uploadFileUrl + '/',
				orderData:{},
				addShow:false,
				addslists:[],
				addressShow:false,
			}
		},
		watch:{
			message(val){
				this.canReservation = this.checkReservation();
			},
			address(val){
				this.canReservation = this.checkReservation();
			},
			price(val){
				this.canReservation = this.checkReservation();
			},
			addShow(val){
				this.init();
			}
		},
		mounted(){
			this.init();
		},
		methods:{
			init(){
				let forms = {}
		        forms.row = 500
		        this.$fetch('user_address_list', forms).then(rs =>{
		            this.addslists = rs;
		          	if (this.addslists.length > 0) {
		            	this.address = this.addslists.reverse()[0];
		          	}
		        })
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
				}else if(this.message.length === 0){
					toast && this.$toast('请填写服务内容')
					return false
				}else if(!this.address.contact_name){
					toast && this.$toast('请添加您的家庭地址')
					return false
				}else if(!this.price || this.price <= 0){
					toast && this.$toast('请填写您愿意支付的服务报酬金额')
					return false
				}else{
					return true
				}
			},

			//选择服务分类
			finishCategory(type){

				this.categoryType = type;
				this.category = type.id;
				this.canReservation = this.checkReservation();

			},

			//发布服务
			release(){
				if(this.canReservation){
					this.show = true;
					this.orderData = {};
					this.orderData.demand_cate_id = this.category;
					this.orderData.demand_remuneration = this.price;
					this.orderData.demand_info = this.message;
					this.orderData.demand_img = this.uploadList;

					this.orderData.demand_contact_name = this.address.contact_name;
					this.orderData.demand_gender = this.address.contact_gender;
					this.orderData.demand_telephone = this.address.telephone_number;
					this.orderData.demand_address_name = this.address.contact_address_name;
					this.orderData.demand_house_number = this.address.contact_house_number;
					this.orderData.demand_lal = this.address.contact_lal;
//					latitude,longitude
				}else{
					this.checkReservation(true);
				}
			},
			onaddShow(){
				this.addressShow = false
				this.addShow = true
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
			indexadd(item){
				this.address = item;
				this.addressShow = false;
			}
		}
	}
</script>
<style lang="less" scoped>
	.releaseDemand{
		height: 100%;
		background: #f5f5f5;
		position: relative;
		.main{
			height: calc(100% - .46rem);
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
				.input{
					flex: 1;
					.gray{
						color: #b2b2b2;
					}
					input{
						border: none;
						width: 100%;
					}
				}
				.blue{
					color: #18B4ED;
					flex: 0 0 1;
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
			    	padding-left: .2rem;
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
			.cell.padding{
				padding: .2rem;
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
		.addsa {
		    position: fixed;
		    top: 0;
		    left: 0;
		    right: 0;
		    bottom: 0;
		    width: 100%;
		    z-index: 9999;
		    background: rgba(0, 0, 0, .3);
		    .addsa_div {
			    background: #fff;
			    border-radius: .1rem;
			    width: 90%;
			    padding: 0 .1rem;
			    margin: .65rem auto;
			    height: 5rem;
			    overflow: auto;
			    ul li {
				    border-bottom: .01rem solid #eee;
				    padding: .1rem 0;
			  	}
		  	}
		  }
	}

</style>
