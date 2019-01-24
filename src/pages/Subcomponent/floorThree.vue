<template>
	<div class="three" ref="three">
		<div class="three_box">
      <img style="width: 100%;" v-if="serviceData.row.service_equipment" :src="uploadFileUrl + serviceData.row.service_equipment" />
			<!--<div class="three_title">-->
				<!--专业设备-->
			<!--</div>-->
			<!--<div class="three_con">-->
				<!--<ul class="three_ul">-->
					<!--<li class="three_li" v-for="(item,index) in serviceData.row.service_equipment">-->
						<!--<div>-->
							<!--&lt;!&ndash;equipment_img&ndash;&gt;-->
							<!--<img :src="uploadFileUrl + item.equipment_img" />-->
						<!--</div>-->
						<!--<div>-->
							<!--{{item.equipment_name}}-->
						<!--</div>-->
						<!--<div>-->
							<!--{{item.equipment_content}}-->
						<!--</div>-->
					<!--</li>-->
					<!--&lt;!&ndash;为了最后一行能左对齐&ndash;&gt;-->
					<!--<li class="three_li" style="height: 0px;visibility: hidden;"></li>-->
					<!--<li class="three_li" style="height: 0px;visibility: hidden;"></li>-->
					<!--<li class="three_li" style="height: 0px;visibility: hidden;"></li>-->
					<!--&lt;!&ndash;为了最后一行能左对齐&ndash;&gt;-->
				<!--</ul>-->
			<!--</div>-->
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
			this.onThree()
		},
		methods: { //方法
			onThree() {
				let threeHeight = this.$refs.three.offsetHeight;
				this.$store.commit('threeH', threeHeight)
			},

		},

	}
</script>

<style scoped>
	.three_box {
		padding: 0 .12rem;
		box-shadow: 2px 2px 10px rgba(224, 243, 250, 1);
	}

	.three_title {
		height: .4rem;
		line-height: .4rem;
		text-align: center;
		font-size: .16rem;
		font-weight: 700;
	}

	.three_ul {
		/*padding: .1rem;*/
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0 0.12rem;
	}

	.three_li {
		width: 33.3%;
		margin: 0 0 .1rem 0;
	}

	.three_li>div:nth-child(2) {
		text-align: center;
		margin-top: .05rem;
	}

	.three_li>div:nth-child(1) {
		width:96%;
		/*height: 1rem;*/
		background: #eee;
		border-radius: .03rem;
	}

	.three_li>div:nth-child(1) img {
		width: 100%;
		/*height: 1rem;*/
	}
</style>
