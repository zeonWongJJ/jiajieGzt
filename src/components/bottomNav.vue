<template>
	<div class="bottomNav">
		<!--<LeftMenu></LeftMenu>-->
		<div class="navItem" :class="{index : path == '/home'}" @click="home()">
			<div class="logo home"></div>
			<div>首页</div>
		</div>
		<div class="navItem" :class="{index : path == '/find_job'}" @click="find_job()">
			<div class="logo find_job"></div>
			<div>找活干</div>
		</div>
		<div class="navItem">
			<div class="release">
				<div class="logo" @click="pagesc"></div>
			</div>
			<div class="logo"></div>
			<div>发布</div>
		</div>
		<div class="navItem" :class="{index : path == '/find_services'}" @click="find_services()">
			<div class="logo find_services"></div>
			<div>找服务</div>
		</div>
		<div class="navItem" :class="{index : path == '/member'}" @click="member()">
			<div class="logo member"></div>
			<div>个人中心</div>
		</div>
	</div>
	<!--<div class="releaseView" @click="unRelease" v-show="isRelease">
		<div class="releaseBox">
			<div class="releaseItem" @click="releaseDemand">
				<img src="../assets/img/index/releaseDemand.png" />
				<div>发布需求</div>
			</div>
			<div class="releaseItem" @click="releaseService">
				<img src="../assets/img/index/releaseService.png" />
				<div>发布服务</div>
			</div>
		</div>
		<div class="unRelease"></div>
		<div class="bgcWhite"></div>
	</div>-->
</template>

<script>
	export default {
		props:['path'],
		data() {
			return {
				isRelease: false,
			}
		},
		methods:{
			home() {
				let that = this;
				that.$router.push({
					path: 'home'
				})
			},
			find_job() {
				let that = this;
				that.$router.push({
					path: 'find_job'
				})
			},
			pagesc() {
				let that = this;
				//				that.isRelease = true;
				that.$router.push({
					path: 'release_demand'
				})
			},
			find_services() {
				let that = this;
				that.$router.push({
					path: 'find_services'
				})
			},
			member() {
				let that = this;
				that.$router.push({
					path: 'member'
				})
			},
			
			unRelease() {
				let that = this;
				that.isRelease = false;
			},
			releaseService() {
				var that = this;
				that.$fetch('user_store_status',{}).then(rs =>{
					that.$store.commit('store_status', rs.data.status);
					if(rs.status == 1) {
						that.$router.push({
							path: 'release_service'
						})
					} else {
						that.$toast("只有店主才能操作");
					}
				})
			},
			releaseDemand() {
				let that = this;
				that.$router.push({
					path: 'release_demand'
				})
			},
		}
	}
</script>

<style scoped>
	.bottomNav {
		position: absolute;
		bottom: 0;
		display: flex;
		z-index: 999;
		border-top: 2px solid #f8f8f8;
		align-items: flex-start;
		width: 100%;
		font-size: .11rem;
		height: .5rem;
	}

	.navItem {
		text-align: center;
		width: 20%;
		height: .5rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.navItem.index {
		color: #18B4ED;
	}

	.navItem .logo {
		margin: 0 auto;
		width: .2rem;
		height: .2rem;
	}
	/*导航栏图标*/

	.navItem .logo.home {
		background: url('../assets/img/index/home.png') no-repeat;
		background-position: center;
		background-size: .2rem .2rem;
	}

	.navItem.index .logo.home {
		background: url('../assets/img/index/home_index.png') no-repeat;
		background-position: center;
		background-size: .2rem .2rem;
	}

	.navItem .logo.find_job {
		background: url('../assets/img/index/find_job.png') no-repeat;
		background-position: center;
		background-size: .2rem .2rem;
	}

	.navItem.index .logo.find_job {
		background: url('../assets/img/index/find_job_index.png') no-repeat;
		background-position: center;
		background-size: .2rem .2rem;
	}

	.navItem .logo.find_services {
		background: url('../assets/img/index/find_services.png') no-repeat;
		background-position: center;
		background-size: .2rem .2rem;
	}

	.navItem.index .logo.find_services {
		background: url('../assets/img/index/find_services_index.png') no-repeat;
		background-position: center;
		background-size: .2rem .2rem;
	}

	.navItem .logo.member {
		background: url('../assets/img/index/member.png') no-repeat;
		background-position: center;
		background-size: .2rem .2rem;
	}

	.navItem.index .logo.member {
		background: url('../assets/img/index/member_index.png') no-repeat;
		background-position: center;
		background-size: .2rem .2rem;
	}
	/*导航栏图标end*/

	.navItem .release {
		position: absolute;
		left: calc(40%);
		/*top: -0.25rem;*/
		bottom: .23rem;
		text-align: center;
		width: 20%;
	}

	.navItem .release .logo {
		margin: auto;
		border-radius: 50%;
		height: .56rem;
		width: .56rem;
		background: #fff url('../../static/images/release.png') no-repeat;
		background-position: center;
		background-size: .46rem .46rem;
	}

	.releaseView {
		background: rgba(0, 0, 0, .2);
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1000;
	}

	.releaseView .releaseBox {
		display: flex;
		position: absolute;
		bottom: 0.78rem;
		text-align: center;
		background: #fff;
		width: calc(100% - .2rem);
		margin: 0 .1rem;
		border-radius: .1rem;
	}

	.releaseView .releaseBox .releaseItem {
		padding: .3rem;
		width: 50%;
		text-align: center;
	}

	.releaseView .releaseBox .releaseItem>img {
		width: .4rem;
		height: auto;
	}

	.releaseView .unRelease {
		border-radius: 0 0 50% 50%;
		height: .56rem;
		width: .56rem;
		background: #fff url('../../static/images/unRelease.png') no-repeat;
		background-position: center;
		background-size: .72rem .72rem;
		position: absolute;
		bottom: .23rem;
		left: calc(50% - 0.28rem);
		z-index: 1001;
		/*left: calc(40% + 0.1rem);*/
	}

	.releaseView .bgcWhite {
		/*height: .28rem;
		width: calc(100% - .2rem);
		margin: 0 .1rem;
		position: absolute;
		bottom: .5rem;
		background: #fff;*/
		width: .28rem;
		height: 0;
		border-top: .6rem solid #Fff;
		border-right: .28rem solid transparent;
		border-left: .28rem solid transparent;
		position: absolute;
		bottom: .3rem;
		left: calc(50% - .42rem);
	}

	.releaseView .bgcLeft {
		background: rgba(0, 0, 0, .2);
		position: absolute;
		bottom: 0;
		z-index: 1002;
		height: .28rem;
		width: calc(50% - .38rem);
		bottom: .5rem;
		margin-left: .1rem;
		border-radius: 0 1rem 0 0;
	}

	.releaseView .bgcRight {
		background: rgba(0, 0, 0, .2);
		position: absolute;
		bottom: 0;
		z-index: 1002;
		height: .28rem;
		width: calc(50% - .38rem);
		bottom: .5rem;
		right: .1rem;
		border-radius: 1rem 0 0 0;
	}
</style>