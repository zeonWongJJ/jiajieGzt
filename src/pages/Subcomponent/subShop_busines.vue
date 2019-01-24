<template>
	<div class="subshop">
		<div class="box">
					<div>
						<div class="box_j">
							<h4>商家介绍</h4>
							<p>{{serviceData.store_info}}</p>
						</div>
						<div class="box_add">
							<h4>商家信息</h4>
							<div class="box_add_div">
								<div>
									<img src="../../assets/img/img_vx/shop_busines.png"/>
								</div>
								<div>商家名称：{{serviceData.store_name}}</div>
							</div>
							<div class="box_add_div">
								<div>
									<img src="../../assets/img/img_vx/shop_add.png"/>
								</div>
								<div>
									所在城市：{{serviceData.store_region}}
								</div>
							</div>
						</div>
					</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		mounted() {//生命周期 
		
		},
		props:['serviceData'],
		methods: {//方法


		},
	
}
</script>

<style scoped>
	
	h4{
		margin: 0 ;
		padding: 0 ;
		font-size: .16rem;
	}
	p{
		margin: 0 ;
		padding: 0 ;
		font-size: .14rem;
	}
.box{
		position: absolute;
		top: 2.9rem;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 0 .12rem;
		height: calc(100% - 3rem);
		overflow: auto;
				
	}
 .box_j{
 	box-shadow: 2px 2px 10px rgba(224, 243, 250, 1);
 	padding: 0.1rem 0 0.15rem 0;
 	
 }
  .box_j h4{
  	margin: 0 0 0.1rem 0;
 }
 
 .box_add{
 	padding: 0.1rem 0 0.15rem 0;
 	box-shadow: 2px 2px 10px rgba(224, 243, 250, 1);
 	
 }
  .box_add h4{
  	margin: 0 0 0.1rem 0;
 }
   .box_add_div{
   	height: .18rem;
  	margin: 0 0 0.1rem 0;
  	display: flex;
  	align-items: flex-start;
 }
  .box_add>div div{
  	align-items: center;
 }
 .box_add div img{
 	width: 0.16rem;
 	margin :0 .08rem ;
 	/*vertical-align:text-bottom;*/
 }
 
</style>