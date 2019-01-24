<template>
	<div class="one" ref="one">
		<!--第1块-->
		<div class="one_top">
      <div class="price">
        <div>
          <div>新春不加价: &nbsp;<span class="red">{{serviceData.row.service_remuneration}}{{getUnit(serviceData.row.service_value_unit_id)}}</span></div>
          <!--<div><span v-if="serviceData.row._service_remuneration" class="gray">原价：<s>￥{{serviceData.row._service_remuneration}}</s></span></div>-->
        </div>
        <div>
						<span>
							{{serviceData.row.cat_name}}
						</span>
        </div>
      </div>
			<div class="img_text" v-if="serviceData.row.service_img && serviceData.row.service_img[0]">
				<div class="imgs">
					<img :src="uploadFileUrl + serviceData.row.service_img[0]"/>
				</div>
			</div>
			<!--第二块-->
			<div class="one_bottom" v-html="replaceStyle(serviceData.row.service_info)"></div>

		</div>

	</div>
</template>

<script>
	import api from '@/api/api'
	export default {
		props:{
			serviceData:{
				type:Object,
				default:()=>{}
			}
		},
		data() {
			return {
				uploadFileUrl:api.uploadFileUrl +'/',
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
		mounted() {
			this.onTop();
			this.$fetch('service_util_list').then(rs=>{
				this.unitList = rs
			}).catch(e=>{
				console.log(e);
			})
		},
		unmounted() {
		},
		methods: { //方法
			onTop() {
				 let oneHeight = this.$refs.one.offsetHeight;
				 this.$store.commit('oneH', oneHeight)
			},
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
      replaceStyle(str) {
        const reg = /<[^<>]+>/g
        return str.replace(reg, '');
      }
		},

	}
</script>

<style scoped>
	.one {
		padding:0 .12rem;
	}

	.one_top {

		/*box-shadow: 2px 2px 5px rgba(224, 243, 250, 1);*/
	}
	.price{
		height: .45rem;
		padding:0 .1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.price >div:nth-child(1){
		font-size: .18rem;
		font-weight: 700;
	}
	.price >div:nth-child(1) span.red{
		color: #f00;
	}
  .price >div:nth-child(1) span.gray{
    font-weight: 400;
    font-size: .14rem;
    color: #707070;
  }
	.price >div:nth-child(2){
		padding: 0.05rem  0 0 0;
	}
	.price >div:nth-child(2) span{
		color: #ff9c00;
		border: .01rem solid #ff9c00;
		border-radius: .03rem;
		padding: 0 .06rem;

	}
	.img_text{
		padding:0 .1rem;
		margin: 0.05rem 0 0 0;
		box-shadow: 2px 2px 5px rgba(224, 243, 250, 1);
	}

	.imgs img{
		border-radius: .03rem;
		width: 100%;
		height: 1.64rem;
	}
	.text{
		margin: 0.1rem 0 0 0;
		padding-bottom: .1rem;
		font-size: .14rem;
		line-height: .24rem;
	}
	.one_bottom {
		margin-top: .05rem;
		padding: 0 0 0.15rem 0;
		box-shadow: 2px 2px 10px rgba(224, 243, 250, 1);
	}
	.one_bot_top{
		padding: .15rem 0;
		text-align: center;
	}
	.one_bot_top>div:nth-child(2){
		color: #B2B2B2;
	}
	.bot_title{
		position: relative;
		font-size: .16rem;
	}
	.bot_title:before{
	 content: '';                 /*CSS伪类用法*/
            position: absolute;         /*定位背景横线的位置*/
            top: 50%;
            left: .4rem;
            background: #b2b2b2;       /*宽和高做出来的背景横线*/
            width: .3rem;
            height: 0.01rem;

	}
	.bot_title:after{
		 content: '';                 /*CSS伪类用法*/
            position: absolute;         /*定位背景横线的位置*/
            top: 50%;
            right: .4rem;
            background: #b2b2b2;       /*宽和高做出来的背景横线*/
            width:  .3rem;
            height: 0.01rem;
	}
	.bot_list{
		padding: 0 .1rem;
		display: flex;
		/*justify-content: space-between;*/
		align-items: center;
	}

	.bot_list_img{
		flex: 0 0 .55rem;
	}
	.bot_list_img img{
		width:.45rem ;
		/*border-radius: 50%;*/
	}
	.bot_list_text{
		fill: 1;
	}
	.bot_list_title{
		font-size: .16rem;
		font-weight: 700;
	}
	.bot_list_text>div:nth-child(2){
		line-height: .24rem;
	}
</style>
