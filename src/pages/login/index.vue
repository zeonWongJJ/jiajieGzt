<template>
	<div class="login">
		<!--header-->
		<van-nav-bar title="登录" />
		<!--main-->
		<div class="main">
			<div class="tip">{{info}}</div>
			<div class="login_box">
				<div class="login_btn" @click="toLogin(1)">
					<img src="../../assets/img/login/wechat_L.png"/>
					<div>微信登录</div>
				</div>
				<div class="login_btn" @click="toLogin(2)">
					<img src="../../assets/img/login/alipay_L.png"/>
					<div>支付宝登录</div>
				</div>
				<div class="login_btn" @click="toLogin(3)">
					<img src="../../assets/img/login/mibile_L.png"/>
					<div>手机登录</div>
				</div>
			</div>
		</div>
		<!--协议-->
		<div class="protocol">
			<Protocol showTip="1"></Protocol>
		</div>
		<!--footer-->
		<div class="footer">
			<img src="../../assets/img/logo_h.png"/>
			<div class="logo_name">广州柒度信息科技有限公司</div>
		</div>
	</div>
</template>

<script>
	import Protocol from '@/components/protocol'
	import utils from '@/utils/utils'
	export default{
		components:{
			Protocol
		},
		data(){
			return{
				info:'你可以用以下方式登录',
        user_referee: this.$route.query.user_referee,
				wechat: {
          wx_nickname: utils.getUrlParam('user_name') || '',
          wx_openid: utils.getUrlParam('open_id') || '',
          wx_unionid: utils.getUrlParam('wx_unionid') || ''
        },
			}
		},
		methods:{
			toLogin(type){
				if(type === 3){
				  let path = {}
				  path.path = '/loginByMobile'
          this.user_referee ? path.query = {user_referee: this.user_referee} : 1
          this.$router.replace(path)
				}else if(type === 1){
					// 微信公众号打开的时候，直接获取
          const is_completed = utils.getUrlParam('is_completed')
          console.log(is_completed);
          if (utils.is_weixin() && is_completed != 'true') {
            window.location.href = `${window.config.baseURL}/wechat.get.userinfo?refer=${window.config.touchURL}/&route=login`
          }
          //           let data = {};
					// data.wx_openid = 'osAKb1WtZuKUhM3kYZLfyMt_2Nmo';
					// data.wx_nickname = '11';
					// data.wx_unionid = 'ocSxFxKoReM6PFImaqUIWJj5yM81';
          // this.$fetch('user_login_wechat',data).then(rs =>{
          //   // utils.loginToJPush(rs.user_id)
          //   this.$store.commit('login',rs.token)
          //   if(rs.need_bind_phone){
          //     this.$router.replace({
          //       path:'/loginByMobile',
          //       query:{
          //         bind:1,
          //         oauth_type: 'wechat',
          //         oauth_account: data.wx_unionid
          //       }
          //     })
          //   }else{
          //     this.$router.replace({
          //       path:'/home'
          //     })
          //   }
          // })
          // return
          if (utils.is_android()) {
            android.wxAuthorizationLogin();
          }
          if (utils.is_ios() && window.webkit.messageHandlers.wxAuthorizationLogin) {
            window.webkit.messageHandlers.wxAuthorizationLogin.postMessage({});
          }
				} else if (type === 2) {

			// 		let data = {};
			// 		data.auth_code = '7522c44dc59f4f5f8e69de303d4fTD16';
          // this.$fetch('user_login_alipay',data).then(rs =>{
          //   utils.loginToJPush(rs.user_id)
          //   this.$store.commit('login', rs.token);
          //   if(rs.need_bind_phone){
          //     this.$router.replace({
          //       path:'/loginByMobile',
          //       query:{
          //         bind:1,
          //         oauth_type: 'alipay',
          //         oauth_account: rs.alipay_user_id
          //       }
          //     })
          //   }else{
          //     this.$router.replace({
          //       path:'/home'
          //     })
          //   }
          // })
          // return



				// 	this.$fetch('user_login_alipay',data).then(rs =>{
				// 	  console.log(rs)
            // return
				// 		this.$store.commit('login', rs.token)
            // this.$router.replace({
            //   path:'/home'
            // })
				// 	})
          if (utils.is_android()) {
            android.alipayAuth2();
          }
          if (utils.is_ios() && window.webkit.messageHandlers.alipayAuth2) {
            window.webkit.messageHandlers.alipayAuth2.postMessage({});
          }
        }
			}
		},
		mounted(){
		  this.$store.commit('logout')
			let toPath = this.$store.state.path.to;
			if( toPath === '/member'){
				this.info = '登录后可查看个人主页'
			}
			if( toPath === '/mymess'){
				this.info = '登录后可查看消息'
			}

      if (this.wechat.wx_nickname && this.wechat.wx_openid && this.wechat.wx_unionid) {
        let data = this.wechat;
        this.$fetch('user_login_wechat',data).then(rs =>{
          utils.loginToJPush(rs.user_id)
          this.$store.commit('login',rs.token)
          if(rs.need_bind_phone){
            this.$router.replace({
              path:'/loginByMobile',
              query:{
                bind:1,
                oauth_type: 'wechat',
                oauth_account: this.wechat.wx_unionid
              }
            })
          }else{
            this.$router.replace({
              path:'/home'
            })
          }
        })
      }
			//微信登录回调
			window['wxAuthorizationLoginSuccess'] = obj =>{
				let data = {}
				data.wx_openid = obj.openid
				data.wx_nickname = obj.nickname
				data.wx_unionid = obj.unionid
        this.user_referee ? data.user_referee = this.user_referee : 1
        this.$fetch('user_login_wechat',data).then(rs =>{
          utils.loginToJPush(rs.user_id)
					this.$store.commit('login',rs.token)
					if(rs.need_bind_phone){
						this.$router.replace({
							path:'/loginByMobile',
							query:{
								bind:1,
                oauth_type: 'wechat',
                oauth_account: obj.unionid
							}
						})
					}else{
            this.$router.replace({
              path:'/home'
            })
					}
				})
			}
			//支付宝登录回调
			window['aliPayAuthSuccess'] = obj =>{
				let data = {}
				data.auth_code = obj.auth_code
        this.user_referee ? data.user_referee = this.user_referee : 1
        this.$fetch('user_login_alipay',data).then(rs =>{
          utils.loginToJPush(rs.user_id)
					this.$store.commit('login', rs.token);
          if(rs.need_bind_phone){
            this.$router.replace({
              path:'/loginByMobile',
              query:{
                bind:1,
                oauth_type: 'alipay',
                oauth_account: rs.alipay_user_id
              }
            })
          }else{
            this.$router.replace({
              path:'/home'
            })
          }
				})
			}
		}
	}
</script>

<style scoped>
	.login{
		position: relative;
		height: 100%;
	}
	.login .header{
		font-size: .18rem;
		text-align: center;
		line-height: .46rem;
		height: .46rem;
		color: #fff;
		background: #18b4ed;
	}
	.login .footer{
		position: absolute;
		bottom: .15rem;
		text-align: center;
		width: 100%;
	}
	.login .footer>img{
		width: .89rem;
		height: auto;
	}
	.login .main{
		text-align: center;
		font-size: .16rem;
	}
	.login .main .tip{
		padding: .4rem 0;
	}
	.login .main .login_box{
		display: flex;
		justify-content: space-between;
		padding: 0 .3rem;
	}
	.login .main .login_box .login_btn>img{
		width: .75rem;
		height: auto;
	}
	.login .protocol{
		padding: .2rem 0;
		font-size: .12rem;
	}
</style>
