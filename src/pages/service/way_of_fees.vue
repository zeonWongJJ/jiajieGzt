<template>
	<div class="way_of_fees" v-show="visible">
		<van-nav-bar title="服务收费" class="white" left-arrow @click-left="close" />
		<div class="main">
			<div class="select">
				<div class="top">请选择服务方式</div>
				<!--<table border="0">
					<tr><th>方式</th><th>价格</th><th>计价单位</th></tr>
					<tr><td>选择服务方式</td><td>价格</td><td>请选择</td></tr>
				</table>-->
				<div class="table">
					<div class="tr type">
						<div class="th">方式</div>
						<div class="td" @click="typeShow(1)">
							<div class="more">{{selected.type.id ? selected.type.name : '选择服务方式'}}</div>
						</div>
					</div>
					<div class="tr price">
						<div class="th">价格</div>
						<div class="td">
							<input type="number" name="price" id="price" v-model.number="selected.price" @change="canFinish = checkSelect()" placeholder="价格" />
						</div>
					</div>
					<div class="tr unit">
						<div class="th">计价单位</div>
						<div class="td" @click="typeShow(2)">
							<div v-if="selected.type.id && selected.type.id == 2">--</div>
							<div class="more" v-else>{{selected.unit.id ? selected.unit.unit_name : '请选择'}}</div>
						</div>
					</div>
				</div>
				<van-button round  size="large" class="finish" :class="{canFinish:canFinish}" @click="finish">确定</van-button>
			</div>
		</div>
		<van-popup v-model="show" position="bottom">
		 	<div class="popup">
		 		<div class="top">
			 		<div class="left" @click="show = false">取消</div>
			 		<div class="title">{{popupType == 1 ? '选择收费方式' : '选择计价规格'}}</div>
			 		<div class="right" @click="hidden">确定</div>
			 	</div>
			 	<div class="ul">
			 		<div v-show="popupType == 1" class="li" :class="{check : (popupData.id ? popupData.id : selected.type.id) == item.id}" v-for="item in typeList" @click="popupData = item">{{item.name}}</div>
			 		<div v-show="popupType == 2" class="li" :class="{check : (popupData.id ? popupData.id : selected.unit.id) == item.id}" v-for="item in unitList" @click="popupData = item">{{item.unit_name}}</div>
			 	</div>
		 	</div>
		</van-popup>
	</div>
</template>

<script>
	export default{
		props:{
			value:{
				type:Boolean,
				default:false
			},
			data:{
				type:Object,
				default:()=>{}
			},
			typeList:{
				type:Array,
				default:()=>[]
			},
			unitList:{
				type:Array,
				default:()=>[]
			}
		},
		data(){
			return{
				selected:{
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
				canFinish:false,
				show:false,
				popupType:0,
				popupData:{},
			}
		},
		computed: {
      		visible() {
	        	return this.value;
      		},
	    },
	    watch: {
      		value(val) {
		        if (val && Object.keys(this.data).length > 0) {
		        	Object.keys(this.data).forEach(key=>{
		        		this.selected[key] = this.data[key];
		        	})
		        }
	      	},
	    },
		methods:{
			close(){
				this.$emit('input',false)
			},
			finish(){
				if(this.canFinish){
			        const temp = {};
			        Object.keys(this.selected).forEach((key) => {
			          	temp[key] = this.selected[key];
			        });
					this.close();
					this.$emit('select',temp)
				}
			},
			checkSelect(){
				if(this.selected.type.id){//已选择服务收费类型
          if(this.selected.price && this.selected.price > 0){//已填写价格
            if(this.selected.id === 2){//服务类型为定金（无须选择单位）
              return true
            }else{
              if(this.selected.unit.id){//已选择单位
                return true
              }
            }
          }
				}
				return false
			},
			typeShow(type){
				if(type === 2){
					if(this.selected.type.id == 2){
						return
					}
				}

				this.popupType = type;
				this.popupData = {};
				this.show = true;
			},
			hidden(){
				this.show = false;
				if(Object.keys(this.popupData).length > 0){
					if(this.popupType == 1){
						this.selected.type = this.popupData;
					}else{
						this.selected.unit = this.popupData;
					}
				}
				this.canFinish = this.checkSelect();
			}
		},
	}
</script>

<style lang="less" scoped>
	.way_of_fees{
		height: 100%;
		width: 100%;
		background: #f5f5f5;
		position: absolute;
		z-index: 2000;
		top: 0;
		.select{
			margin: .1rem;
			background: #fff;
			.top{
				border-bottom: 1px solid #c2c2c2;
				font-size: .18rem;
				font-weight: 900;
				padding: .1rem;
			}
			.table{
				display: flex;
				justify-content: space-around;
				text-align: center;
				padding: 0 .1rem .3rem;
				.tr{
					.th{
						padding: .1rem;
					}
					.td{
						font-size: .16rem;
						background: #f4f4f4;
						overflow: hidden;
						padding: .1rem;
						input{
							display: inline-block;
							width: 100%;
							height: 100%;
							margin: 0;
							padding: 0;
							background: #f5f5f5;
							border: none;
							text-align: center;
							-webkit-appearance: none;
						}
						.more{
							display: flex;
							align-items: center;
							justify-content: center;
						}
						.more:after{
							display: inline-block;
							width: .2rem;
							height: .2rem;
							content: '';
							background: url(../../assets/img/down.png) no-repeat;
							background-position: center;
							background-size: .1rem auto;
						}
					}
				}
				.tr.type{
					width: 1.37rem;
				}
				.tr.price{
					width:.8rem;
				}
				.tr.unit{
					width: 1rem;
				}
			}
		}
		.popup{
			padding: .1rem;
			.top{
				display: flex;
				justify-content: space-between;
				.left,.right{
					color: #18B4ED;
					font-size: .16rem;
				}
			}
			.ul{
				padding-bottom: .3rem;
				display: flex;
				flex-wrap: wrap;
				.li{
					background: #f2f3f7;
					margin-right: .1rem;
					margin-top: .1rem;
					padding: .1rem .2rem;
				}
				.li.check{
					background: #18B4ED;
					color: #fff;
				}
			}
		}
		.van-button.finish{
			margin-top: .1rem;
			background: #b2b2b2;
			color: #fff;
			font-size: .18rem;
		}
		.van-button.finish.canFinish{
			background: #18b4ed;
		}
	}
</style>
