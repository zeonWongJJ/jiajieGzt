<template>
	<div class="as">
	

		<mt-tabbar v-model="selected">
			<div class="foon-img" @click="pagesa">
				<img src="../../../build/logo.png" />
				<p>
					首页
				</p>
			</div>
			<div class="foon-img"  @click="pagesb">
				<img src="../../../build/logo.png" />
				<p>
					首页
				</p>
			</div>
			<div class="foon-img" @click="pagesc">
				<img src="../../../build/logo.png" />
				<p>
					首页
				</p>
			</div>
			<div class="foon-img" @click="pagesd">
				<img src="../../../build/logo.png" />
				<p>
					首页
				</p>
			</div>
		</mt-tabbar>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				selected: '外卖'
			}
		},
		methods: {
			pagesa() {
				let that = this;
				that.$router.push({
					path: 'pagesa'
				})
			},
			pagesb() {
				let that = this;
				that.$router.push({
					path: 'pagesb'
				})
			},
			pagesc() {
				let that = this;
				that.$router.push({
					path: 'pagesc'
				})
			},
			pagesd() {
				let that = this;
				that.$router.push({
					path: 'pagesd'
				})
			},
			pagese() {
				let that = this;
				that.$router.push({
					path: 'pagese'
				})
			},

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.ivu-menu-item {
		padding: 0 !important;
	}
	
	.ivu-menu {
		/*height: 500px;*/
		/*bottom: 0;*/
		position: absolute;
		left: 0;
		top: 0px;
		bottom: 0;
	}
	
	.as {
		/*position: absolute;
left: 0;
top: 100px;
bottom: 0;*/
		/*width: 200px;*/
	}
	
	span {
		display: block;
		padding: 14px 24px;
	}
	.foon-img{
			text-align: center;
	}
	.foon-img img {
		width: 25%;
	}
</style>