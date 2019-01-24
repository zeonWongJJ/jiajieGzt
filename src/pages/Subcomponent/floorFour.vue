<template>
	<div class="four" ref="four">
		<div class="four_box">
      <img style="width: 100%;" v-if="serviceData.row.service_standards" :src="uploadFileUrl + serviceData.row.service_standards" />
			<!--<div class="four_title">-->
				<!--服务标准-->
			<!--</div>-->

			<!--<div class="four_con">-->
				<!--<ul class="four_ul">-->
					<!--<li class="four_li" v-for="(item,index) in serviceData.row.service_standards">-->
						<!--<div>-->
							<!--<img :src="uploadFileUrl + item.standards_cover" />-->
						<!--</div>-->
						<!--<h4>-->
							<!--{{item.standards_desc}}-->
						<!--</h4>-->
						<!--<div>-->
							<!--&lt;!&ndash;{{item.com}}&ndash;&gt;-->
						<!--</div>-->
					<!--</li>-->
					<!--&lt;!&ndash;为了最后一行能左对齐&ndash;&gt;-->
					<!--<li class="four_li" style="height: 0px;visibility: hidden;"></li>-->
					<!--<li class="four_li" style="height: 0px;visibility: hidden;"></li>-->
					<!--<li class="four_li" style="height: 0px;visibility: hidden;"></li>-->
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
				uploadFileUrl:api.uploadFileUrl +'/',
			}
		},
		mounted() { //生命周期
			this.onFour();

		},
		methods: { //方法
			onFour() {
				let fourHeight = this.$refs.four.offsetHeight;
				this.$store.commit('fourH', fourHeight)
			},
		},

	}
</script>

<style scoped>
	.four{	background: #fff;}
	.four_box {
		margin-top: .15rem;
		padding: 0 .1rem;
		background: #fff;
	}
  .four_title {
    height: .4rem;
    line-height: .4rem;
    text-align: center;
    font-size: .16rem;
    font-weight: 700;
  }
	.four_con  {
		margin-bottom: .15rem;
		padding:.1rem .1rem;
		box-shadow: 2px 2px 10px rgba(224, 243, 250, 1);
	}

	.four_ul {
		/*padding: .1rem;*/
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		/*padding: 0 0.12rem;*/
	}

	.four_li {
		width: 33%;
		margin: 0 0 .1rem 0;
		text-align: center;
	}
	.four_li h4{
		margin: 0.05rem 0;
		padding: 0;
		font-size: .16rem;

	}
	.four_li>div:nth-child(2) {
		text-align: center;
		margin-top: .05rem;
	}

	.four_li>div:nth-child(1) {
		width: 100%;
		height: 1.05rem;
		border-radius: 50%
	}

	.four_li>div:nth-child(1) img {
		width: 1.05rem;
		height: 1.05rem;
		border-radius: 50%
	}
</style>
