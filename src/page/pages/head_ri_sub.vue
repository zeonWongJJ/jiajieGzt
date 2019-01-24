<template>
	<div class="head_ri_sub">
		<ul class="head_ul">
			<li v-for="(item,index) in list" @click.stop="orouter(item,index)">
				<div>
					<img :src="item.imgs" />
				</div>
				<div>
					{{item.name}}
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '首页',
					imgs: require('../../assets/img/index/home_index.png')
				}, {
					name: '信息',
					imgs: require('../../assets/img/img_vx/bottom_4_h.png')
				}, {
					name: '我的订单',
					imgs: require('../../assets/img/img_vx/bottom_3_h.png')
				}, {
					name: '会员中心',
					imgs: require('../../assets/img/index/member_index.png')
				}]

			}
		},
		mounted() { //生命周期 

		},
		methods: { //方法
		orouter(item,index){
			let that = this;
			if(index == 0){
				that.$router.push({
					path: 'home'
				})
			}else if(index == 1){
				that.$router.push({
					path: 'mymess'
				})
			}else if(index == 2){
				that.$router.push({
					path: 'ten_about'
				})
			}
			else if(index == 3){
				that.$router.push({
					path: 'member'
				})
			}
		}
		},

	}
</script>

<style scoped>
.head_ul{
	
}
.head_ul li{
	/*width: 1.5rem;*/
	display: flex;
	/*margin: .1rem 0;*/
	padding:.1rem .05rem;
	border-bottom: 0.01rem solid #eee;
}
.head_ul li img{
	width: .18rem;
	
}
.head_ul li div:nth-child(2){
	margin-left: .05rem;
	font-size: .14rem;
	color: #fff;
}
</style>