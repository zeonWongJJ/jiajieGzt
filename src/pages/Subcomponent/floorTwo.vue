<template>
	<div class="two" ref="two">
		<div class="two_box">
			<!--<div class="two_title">-->
				<!--服务流程-->
			<!--</div>-->
      <img style="width: 100%;" v-if="serviceData.row.service_flow" :src="uploadFileUrl + serviceData.row.service_flow" />
			<!--<ul class="two_ul">-->
				<!--<li class="two_li" v-for="(item,index) in serviceData.row.service_flow">-->
					<!--<div>-->
						<!--<img :src="uploadFileUrl + item.flow_cover" />-->
					<!--</div>-->
					<!--<div>-->
						<!--{{item.flow_title}}-->
					<!--</div>-->
					<!--<div>-->
						<!--{{item.flow_content}}-->
					<!--</div>-->
				<!--</li>-->
			<!--</ul>-->
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
				uploadFileUrl:api.uploadFileUrl + '/',
			}
		},
		mounted() { //生命周期
			this.onTwo()
		},
		methods: { //方法
			onTwo() {
				let twoHeight = this.$refs.two.offsetHeight;
				this.$store.commit('twoH', twoHeight)
			},
		},

	}
</script>

<style scoped>
	.two {
		margin-top: .12rem;
		padding: 0 .12rem;
	}

	.two_box {
		box-shadow: 2px 2px 10px rgba(224, 243, 250, 1);
	}

	.two_title {
		height: .4rem;
		line-height: .4rem;
		text-align: center;
		font-size: .16rem;
		font-weight: 700;
	}

	.two_ul {
		padding: .1rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.two_li {
		width: 49%;
		margin: 0 0 .1rem 0;
	}

	.two_li>div:nth-child(1) img {
		width: 100%;
		border-radius: .03rem;
	}
</style>
