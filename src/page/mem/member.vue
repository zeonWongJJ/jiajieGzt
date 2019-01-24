<template>
  <div class="member">
    <!--顶部-->
    <div class="top">
      <div class="clearfix">
        <div class="setting" @click="setup()"></div>
      </div>
      <div class="content">
        <div class="left">
          <div class="img" @click="pers">
            <img :src="!user.user_pic ? imgs : user.user_pic" />
          </div>
          <div class="other" v-if="user">
            <div class="name">{{user.user_nickname == '' ? '昵称' : user.user_nickname}}</div>
            <div class="id">ID：{{user.user_id}}</div>
          </div>
          <div class="other" v-else @click="toLogin">
            <div class="unLogin">登录/注册</div>
          </div>
        </div>
        <div class="QR_code" @click="showCode">
          <!--<img :src="user.user_qrcode" />-->
          <img src="../../assets/img/rwm_t.png"/>
          <p style="font-size: .1rem;">会员专属码</p>
        </div>
      </div>
    </div>

    <!--三大块-->
    <div class="row">
      <div class="span" @click="toBalance">
        <div>{{user.user_balance}}</div>
        <div class="color_gray">余额</div>
      </div>
      <div class="span" @click="toCredit">
        <div>{{user.user_score}}</div>
        <div class="color_gray">积分</div>
      </div>
      <div class="span">
        <div>{{user.collect_count}}</div>
        <div @click="myColl" class="color_gray">收藏</div>
      </div>
    </div>

		<!--我的订单-->
		<div class="order">
			<div class="title" @click="orders">
				<div>我的订单</div>
				<div class="right">查看全部</div>
			</div>
			<div class="row">
				<div class="span" @click="onduiy(1)">
					<div class="top">待付款</div>
					<div>{{statistics.pending_payment}}</div>
				</div>
				<div class="span" @click="onduiy(2)">
					<div class="top">待接单</div>
					<div>{{statistics.pending_receipt}}</div>
				</div>
				<div class="span" @click="onduiy(3)">
					<div class="top">待服务</div>
					<div>{{statistics.pending_service}}</div>
				</div>
				<div class="span" @click="onduiy(4)">
					<div class="top">待评价</div>
					<div>{{statistics.pending_comment}}</div>
				</div>
				<div class="span" @click="closeOrders">
					<div class="top">已关闭</div>
					<div>{{statistics.closed}}</div>
				</div>
			</div>
		</div>
		<!--label-->
		<!--<div class="label bottom" @click="gomyfb">
			<div class="left">
				<div class="logo"><img src="../../assets/img/contacts.png" /></div>
				<div>我的发布</div>
			</div>
			<div class="right"></div>
		</div>-->
		<!--label-->
		<div class="label bottom" @click="goStore">
			<div class="left">
				<div class="logo"><img src="../../assets/img/contacts.png" /></div>
				<div>{{store_type == 3 ? '我的店铺 ': '我的服务'}}</div>
			</div>
			<div class="right"></div>
		</div>
		<div class="label bottom" @click="toInviting">
			<div class="left">
				<div class="logo"><img src="../../assets/img/friend.png" /></div>
				<div>邀请好友</div>
			</div>
			<div class="right"></div>
		</div>
		<div class="label" @click="addss">
			<div class="left">
				<div class="logo"><img src="../../assets/img/address.png" /></div>
				<div>地址管理</div>
			</div>
			<div class="right"></div>
		</div>
		<div class="label" @click="toMyeval">
			<div class="left">
				<div class="logo"><img src="../../assets/img/edit.png" /></div>
				<div>我的评价</div>
			</div>
			<div class="right"></div>
		</div>
		<div class="label" @click="toService">
			<div class="left">
				<div class="logo"><img src="../../assets/img/service.png" /></div>
				<div>联系客服</div>
			</div>
			<div class="right"></div>
		</div>
		<div class="label bottom" @click="toAbout">
			<div class="left">
				<div class="logo"><img src="../../assets/img/about.png" /></div>
				<div>关于帮家洁</div>
			</div>
			<div class="right"></div>
		</div>

    <!--显示二维码-->
    <van-popup v-model="show">
    	<img @click="closeCode" style="width:0.2rem; position: absolute; right:0.2rem; top:0.1rem" src="../../assets/img/cancel.png" alt="" />
      <div class="showView" @click="show = false">
        <div class="code">
          <img :src="user.user_qrcode"/>
        </div>
        <div class="bottom">下单出示会员码，可积累积分</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import utils from '@/utils/utils'
  import api from '@/api/api'

  export default {
    data() {
      return {
        show: false,
        user: {},
        statistics: {},
        imgs: require('../../../src/assets/img/logo_h.png'),
        store_type:0,
      }
    },
    mounted() {
      this.init();
    },
    methods: {
    	onduiy(index){
    			let that = this
    			  that.$router.push({
          path: '/orders',
          query:{
          	index
          }
        })


    	},

      init() {
        var that = this;
        that.$fetch('user_info_get', {}, '', 'GET').then(rs =>{
          that.user = rs;
          that.$store.commit('userPhone', rs.user_phone);
          that.$fetch('user_order_statistics', {}).then(rs =>{
            that.statistics = rs
            that.$fetch('user_store_info_get', {}).then(rs =>{
              that.store_type = rs.staff_row.user_type;
            })
          })
        })
      },
      gomyfb() {
        this.$router.push({
          path: '/myfb'
        })
      },
      orders() {
        this.$router.push({
          path: '/orders'
        })
      },
      toAbout() {
        this.$router.push({
          path: '/about'
        })
      },
      showCode() {
        this.show = true
      },
      addss() {
        this.$router.push({
          path: '/receadd'
        })
      },
      pers() {
        this.$router.push({
          path: '/pers'
        })
      },
      setup() {
        this.$router.push({
          path: '/setup'
        })
      },
      toLogin() {
        this.$router.push({
          path: '/'
        })
      },
      toBalance() {
        this.$router.push({
          path: '/balance',
          query: {
            value: this.user.user_balance
          }
        })
      },
      toCredit() {
        this.$router.push({
          path: '/credit',
          query: {
            value: this.user.user_score
          }
        })
      },
      toService() {
        this.$router.push({
          path: '/service'
        })
      },
      toMyeval() {
        this.$router.push({
          path: '/myeval'
        })
      },
      toInviting() {
        if (utils.is_weixin()) {
          window.location.href = `http://www.7dugo.com/fuck.search.jiajie?user_id=${this.user.user_id}`
        } else {
          this.$router.push({
            path: '/inviting',
            query: {
              user_id: this.user.user_id
            }
          })
        }
      },
      closeCode(){
      	this.show=false;
      },
      closeOrders(){
      	this.$router.push({
          path: 'closeOrder'
        })
      },
      myColl() {
        this.$router.push({
          path: 'myColl'
        })
      },
      goStore() { //店铺
        var that = this;
        var qs = require('qs');
        //获取用户店铺状态
        that.$fetch('user_store_status', {}).then(rs =>{
          var re = rs;
          that.$store.commit('store_status', re.status);//保存店铺状态
          //店铺状态 0 审核中 1 正常 2 关闭 -1 不通过审核 4没有店铺
          if (re.status == 0) {
            that.$dialog.alert({
              title: '提示',
              message: '店铺正在审核中,请耐心等待',
              confirmButtonText: "查看审核资料",
              showCancelButton: true
            }).then(() => {
              that.$router.push({
                path: '/storeApply',

              })
            }).catch(() => {

            });
          } else if (re.status == 1) {
            that.$router.push({
              path: '/shop'
            })
          } else if (re.status == -1) {
            that.$dialog.alert({
              title: '提示',
              message: rs.reason,
              confirmButtonText: "重新申请",
            }).then(() => {
              that.$router.push({
                path: '/storeApply'
              })
            })
          } else if (re.status == 2) {
            that.$dialog.alert({
              title: '提示',
              message: '因违反相关规定暂时关闭',
              confirmButtonText: "确认",
            }).then(() => {

            })
          } else if (rs.status == 4) {
            that.$dialog.alert({
              title: '提示',
              closeOnClickOverlay: true,
              message: '如果已有所属店铺则选择加盟店铺如没有则选择新开店铺',
              confirmButtonText: "新开店铺",
              cancelButtonText: "登录店铺",
              showCancelButton: true
            }).then(() => {
              that.$router.push({
                path: '/storeApply'
              })
            }).catch(() => {
              that.$router.push({
                path: '/storeApply',
                query: {
                  storeSta: 1,
                }
              })
            });
          }
        })
        //
      },
    }
  }
</script>

<style scoped>
  .member {
    background: #f5f5f5;
  }

  /*都是顶部*/

  .member > .top {
    background: url('../../assets/img/top.png') no-repeat;
    background-position: center;
    background-size: 100% auto;
    padding: .15rem;
    color: #fff;
  }

  .member .setting {
    width: .2rem;
    height: .2rem;
    background: url('../../assets/img/setting.png') no-repeat;
    background-position: center;
    background-size: .19rem .19rem;
    float: right;
  }

  .member .top .content {
    display: flex;
    justify-content: space-between;
  }

  .member .top .content .left {
    display: flex;
  }

  .member .top .content .img {
    height: .85rem;
    width: .85rem;
    border-radius: 50%;
    overflow: hidden;
  }

  .member .top .content .img > img {
    width: 100%;
    height: 100%;
  }

  .member .top .content .other {
    flex: 1;
    margin-left: .2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: .85rem;
  }

  .member .top .content .other .name {
    font-size: .18rem;
  }

  .member .top .content .other .id {
    font-size: .14rem;
  }

  .member .top .content .other .unLogin {
    font-size: .2rem;
  }

  .member .top .content .QR_code {
    margin-top: .3rem;
    text-align: center;
  }

  .member .top .content .QR_code > img {
    width: .34rem;
    height: auto;
  }

  /*三大块*/

  .member .row {
    display: flex;
    background: #fff;
    justify-content: space-around;
    padding: .15rem;
    margin-bottom: .1rem;
    text-align: center;
  }

  /*我的订单*/

  .member .order {
    background: #fff;
    padding: 0 .15rem;
  }

  .member .order .title {
    display: flex;
    justify-content: space-between;
    padding: .15rem 0;
    border-bottom: 1px solid #f5f5f5;
  }

  /*订单的5大块*/

  .member .order .row {
    display: flex;
    padding: .15rem 0;
    text-align: center;
    margin-bottom: .1rem;
  }

  .member .order .row .top {
    margin-bottom: .1rem;
    color: #b2b2b2;
  }

  /*label*/

  .member .label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    padding: .15rem;
    border-bottom: 1px solid #f5f5f5;
  }

  .member .label.bottom {
    margin-bottom: .1rem;
  }

  .member .label .left {
    display: flex;
    align-items: center;
  }

  .member .label .left .logo {
    height: .24rem;
    width: .24rem;
    margin-right: .1rem;
  }

  .member .label .left .logo > img {
    width: 100%;
    height: auto;
  }

  .member .right {
    display: flex;
    align-items: center;
    color: #999999;
  }

  .member .right:after {
    content: '';
    display: block;
    width: .07rem;
    height: .125rem;
    margin-left: .05rem;
    background: url(../../assets/img/right.png) no-repeat;
    background-position: center left;
    background-size: .07rem .125rem;
  }

  /*弹出二维码*/

  .member .showView {
    padding: .25rem;
  }

  .member .showView .user {
    display: flex;
    align-items: center;
  }

  .member .showView .user > img {
    width: .81rem;
    height: .81rem;
    border-radius: 50%;
  }

  .member .showView .code {
    width: 2.5rem;
    height: 2.5rem;
  }

  .member .showView .code > img {
    width: 100%;
    height: 100%;
  }

  .member .showView .bottom {
    margin-top: .2rem;
    text-align: center;
  }

  .clearfix {
    clear: both;
    overflow: hidden;
  }

  .color_gray {
    color: #707070;
  }
</style>
