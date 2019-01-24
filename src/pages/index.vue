<template>
	<div class="index">
		<div class="content" id="content">
			<router-view></router-view>
		</div>
		<div class="bottomNav">
			<!--<LeftMenu></LeftMenu>-->
			<div class="navItem" :class="{index : $store.state.path == '/home'}" @click="home()">
				<div class="logo home"></div>
				<div>首页</div>
			</div>
      <div class="navItem" style="position: relative;" :class="{index : $store.state.path == '/mymess'}" @click="news()">
        <div class="logo xinx"></div>
        <div>消息</div>
        <span v-if="unread > 0" class="listst_if">
					<span>
						{{unread}}
					</span>
				</span>
      </div>
			<div class="navItem" :class="{index : $store.state.path == '/makemoney'}" @click="find_job()">
				<div class="logo find_job"></div>
				<div>赚钱</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'index',
		data() {
			return {
				isRelease: false,
			}
		},
		created() {
			this.init()
		},
    computed: {
      unread () {
        return this.$store.state.unread
      }
    },
		methods: {
			init() {
				if(this.$store.state.token) {
					//用户信息
					this.$fetch('user_info_get', {}, '', 'GET').then(rs => {
						this.$store.commit('user_info', rs);
						this.$store.commit('user_id', rs.user_id);
					}).catch(err => {
						console.log(err);
					})
				}
			},
			home() {
				let that = this;
				that.$router.replace({
					path: 'home'
				})
				that.$store.commit('store_show', true)
			},
			find_job() {
				let that = this;
				that.$router.replace({
					path: 'makemoney'
				})
				that.$store.commit('store_show', true)
			},
			news() {
				let that = this;
				that.$router.replace({
					path: 'mymess'
				})
				that.$store.commit('store_show', true)
			},
			member() {
				let that = this;
				that.$router.replace({
					path: 'member'
				})
			},
			find_services() {
				let that = this;
				that.$store.commit('store_show', true)
				that.$router.replace({
					path: 'ten_about'
				})
			},
			unRelease() {
				let that = this;
				that.isRelease = false;
			},
			goStore() { //店铺
				var that = this;
				that.$fetch('user_store_status', {}).then(rs => {
					that.$store.commit('store_status', rs.data.status);
					if(rs.data.status == 1) {
						that.$router.push({
							path: 'release_service'
						})
					} else {
						that.$toast("只有店主才能操作");
					}
				})
			},
			releaseService() {
				this.goStore();
				// let that = this;
				// that.axios({
				//   method: 'post'
				//   , url: api.user_store_info_get
				//   , headers: {
				//     "Content-Type": "application/x-www-form-urlencoded"
				//   }
				// }).then(rs => {
				//
				// })
				// // let sta=that.$store.state.store_status;
				// console.log(sta);
				// if( sta != 1 ){
				// 	that.$toast("只有店主才能操作");
				// }else{
				// 	that.$router.push({
				// 		path: 'release_service'
				// 	})
				// }
			},
			releaseDemand() {
				let that = this;
				that.$router.push({
					path: 'release_demand'
				})
			},
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
	.index {
		height: 100%;
		background: #fff;
		overflow: hidden;
	}

	.index::-webkit-scrollbar {
		width: 0px
	}

	.warpper {
		background-color: rgba(0, 0, 0, 0);
	}

	.content {
		height: calc(100% - .5rem);
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}

	.content::-webkit-scrollbar {
		width: 0px
	}

	.listst_if {
		position: absolute;
		top: .03rem;
		right: .35rem;
		width: 0.18rem;
		height: .18rem;
		font-size: .12rem;
		color: #fff;
		border-radius: 50%;
		background: #f00;
	}

	.bottomNav {
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
		width: 33.33%;
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
		background: url(../assets/img/index/home.png) no-repeat;
		background-position: center;
		background-size: .2rem .2rem;
	}

	.navItem.index .logo.home {
		background: url(../assets/img/index/home_index.png) no-repeat;
		background-position: center;
		background-size: .2rem .2rem;
	}

	.navItem .logo.find_job {
		background: url(../assets/img/index/find_job.png) no-repeat;
		background-position: center;
		background-size: .2rem .2rem;
	}

	.navItem.index .logo.find_job {
		background: url(../assets/img/index/find_job_index.png) no-repeat;
		background-position: center;
		background-size: .2rem .2rem;
	}
	.navItem .logo.xinx {
		background: url(../assets/img/img_vx/bottom_4.png) no-repeat;
		/*background: url(') no-repeat;*/
		background-position: center;
		background-size: .2rem .2rem;
	}

	.navItem.index .logo.xinx {
		background: url(../assets/img/img_vx/bottom_4_h.png) no-repeat;
		background-position: center;
		background-size: .2rem .2rem;
	}

	.navItem .logo.find_services {
		background: url(../assets/img/img_vx/bottom_3.png) no-repeat;
		background-position: center;
		background-size: .2rem .2rem;
	}

	.navItem.index .logo.find_services {
		background: url(../assets/img/img_vx/bottom_3_h.png) no-repeat;
		background-position: center;
		background-size: .2rem .2rem;
	}

	.navItem .logo.member {
		background: url(../assets/img/index/member.png) no-repeat;
		background-position: center;
		background-size: .2rem .2rem;
	}

	.navItem.index .logo.member {
		background: url(../assets/img/index/member_index.png) no-repeat;
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
