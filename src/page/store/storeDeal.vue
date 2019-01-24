<template>
	<div>
		<div class="storeDealBox">
			<van-nav-bar title="今日交易额" left-arrow @click-left="onClickLeft" />
			<div class="dealList">
				<ul>
					<li v-for="(item,index) in listDeal">
						<div>
							<img :src="item.imger" alt="" />
							<div>
								<p>{{item.name}}</p>
								<span style="font-size:0.12rem; color:#666666;">{{item.dater}} {{item.timer}}</span>
							</div>
						</div>
						<span>{{item.deal}}</span>
					</li>
				</ul>
			</div>

		</div>
	</div>
</template>
<script>
	import api from "@/api/api"
	export default {
		data() {
			return {
//				listDeal:[
//					{
//						imger:require("../../assets/img/wechat.png"),
//						name:"家居清洁",
//						dater:"2018-08-16",
//						timer:"10:50",
//						deal:"+70.00"
//					},
//					{
//						imger:require("../../assets/img/wechat.png"),
//						name:"家居清洁",
//						dater:"2018-08-16",
//						timer:"10:50",
//						deal:"+80.00"
//					},
//					{
//						imger:require("../../assets/img/wechat.png"),
//						name:"家居清洁",
//						dater:"2018-08-16",
//						timer:"10:50",
//						deal:"-90.00"
//					},
//				]
				listDeal:[],
			}
		},
		mounted() { //生命周期
			this.ajax();
		},
		methods: { //方法
			ajax(){
				var that = this;
				that.$fetch('store_today_order',{}).then(rs =>{
          if(rs.length>0){
            that.listDeal = rs
          }else{
            that.$toast('暂无记录')
          }
				})
			},
			onClickLeft() {
				this.$router.back(-1);
			}

		},
	}
</script>

<style scoped>
	p{ margin:0; }

	.dealList li{
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: white;
		margin-top:0.1rem;
		padding:0.15rem 0.12rem;
		font-size:0.16rem;
	}
	.dealList li>div{
		display: flex;
		align-items: center;
	}
	.dealList li>div>img{
		width:0.6rem;
		height:0.6rem;
		border-radius: 50%;
		margin-right:0.1rem;
	}
</style>
<style>
	.storeDealBox{
		background:#f5f5f5;
	}
</style>
