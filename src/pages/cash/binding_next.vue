<template>
  <div class="binding_next">
    <van-nav-bar class="white" :title="bindtype == 3 ? '绑定银行卡' : bindtype == 2 ? '绑定支付宝' : '绑定微信'" left-arrow
                 @click-left="onClickLeft"/>
    <!--这是银行卡-->
    <div class="body" v-if="bindtype == 3">
      <div class="top">请绑定需要提现的银行卡</div>
      <div class="center">
        <div class="label">
          <div class="left">姓名</div>
          <div class="right">
            <input v-model="union.bank_realname" type="text" placeholder="请输入收款人姓名"/>
          </div>
        </div>
        <div class="label">
          <div class="left">卡号</div>
          <div class="right">
            <input v-model="union.bank_number" type="text" placeholder="请输入银行卡账号"/>
          </div>
        </div>
        <div class="label">
          <div class="left">开户行名称</div>
          <div class="right">
            <input v-model="union.bank_name" type="text" placeholder="请输入开户行名称"/>
          </div>
        </div>
        <div class="label">
          <div class="left">开户行所在省</div>
          <div class="right">
            <input v-model="union.bank_province" type="text" placeholder="请输入开户行所在省"/>
          </div>
        </div>
        <div class="label">
          <div class="left">开户行所在地区</div>
          <div class="right">
            <input v-model="union.bank_city" type="text" placeholder="请输入开户行所在地区"/>
          </div>
        </div>
        <div class="label">
          <div class="left">开户支行名称</div>
          <div class="right">
            <input v-model="union.sub_bank" type="text" placeholder="请输入开户支行名称"/>
          </div>
        </div>
      </div>
      <div class="btn" @click="sure3">确定</div>
    </div>

    <!--这是支付宝-->
    <div class="body" v-if="bindtype == 2">
      <div class="top">请仔细核对您的支付宝账号，以确保能成功提现</div>
      <div class="center">
        <div class="label">
          <div class="left">姓名</div>
          <div class="right">
            <input v-model="alipay.alipay_realname" type="text" placeholder="请输入收款人姓名"/>
          </div>
        </div>
        <div class="label">
          <div class="left">提现账户</div>
          <div class="right">
            <input v-model="alipay.alipay_number" type="text" placeholder="请输入支付宝账号"/>
          </div>
        </div>
      </div>
      <div class="btn" @click="sure2">确定</div>
    </div>

    <!--这是微信-->
    <div class="body" v-if="bindtype == 1">
      <div class="top">请仔细核对您的微信账号，以确保能成功提现</div>
      <div class="center">
        <div class="label">
          <div class="left">微信名</div>
          <div class="right">
            <input id="wechat_nickname" v-model="wechat.wx_nickname" type="text" placeholder="请点击绑定获取微信名" readonly/>
          </div>
        </div>
        <div class="label">
          <div class="left">提现账号</div>
          <div class="right">
            <input id="wechat_openid" v-model="wechat.wx_openid" type="text" placeholder="请点击绑定获取微信账号" readonly/>
          </div>
        </div>
      </div>
      <div class="btn" @click="sure1">确定</div>
    </div>
  </div>
</template>

<script>
  import api from '@/api/api'
  import utils from '@/utils/utils'

  export default {
    data() {
      return {
        bindtype: 0,
        //微信
        wechat: {
          wx_nickname: '',
          wx_openid: '',
          wx_unionid: ''
        },
        //支付宝
        alipay: {
          alipay_realname: '',
          alipay_number: '',
        },
        union: {
          bank_realname: '',//姓名
          bank_number: '',//卡号
          bank_name: '',//开户行名称
          bank_province: '',//开户行所在省
          bank_city: '',//开户行所在地区
          sub_bank: '',//开户支行名称
        }
      }
    },
    mounted() {
      this.bindtype = this.$route.query.bindtype;

      if (this.bindtype == 1) {
        // 微信公众号打开的时候，直接获取
        const is_completed = utils.getUrlParam('is_completed')
        console.log(is_completed);
        if (utils.is_weixin() && is_completed != 'true') {
          window.location.href = `${window.config.baseURL}/wechat.get.userinfo?refer=${window.config.touchURL}&route=binding_next?bindtype=1`
        } else {
        	const wx_nickname = decodeURIComponent(utils.getUrlParam('user_name'));
        	const wx_openid = utils.getUrlParam('open_id');
          const wx_unionid = utils.getUrlParam('wx_unionid');
          this.wechat.wx_nickname = wx_nickname;
          this.wechat.wx_openid = wx_openid;
          this.wechat.wx_unionid = wx_unionid;
        }
        // 安卓APP
        if (utils.is_android()) {
          android.wxAuthorizationLogin();
        }
        // IOS app
        if (utils.is_ios()) {
          window.webkit.messageHandlers.wxAuthorizationLogin.postMessage({});
        }
        window['wxAuthorizationLoginSuccess'] = res =>{
        	this.wechat.wx_nickname = res.nickname;
        	this.wechat.wx_openid = res.openid;
        	this.wechat.wx_unionid = res.unionid;
        }
      }
    },
    methods: {
      onClickLeft() {
        window.history.go(-1);
      },
      sure3() {//绑定银行卡
        var that = this;
        var sure = 0;
        Object.keys(that.union).forEach(function (key) {
          if (that.union[key].length !== 0) {
            sure++
          }
        })
        if (sure !== 6) {
          that.$toast('请填写必填项！')
          return
        }
        let lists = that.union;
        that.$fetch('user_bind_bank', lists).then(rs => {
          that.$toast('绑定成功');
          setTimeout(function () {
            that.$router.push({
              path: '/setCash'
            })
          }, 1000)
        })
      },
      sure2() {//绑定支付宝
        var that = this;
        if (that.alipay.alipay_realname.length == 0) {
          that.$toast('请填写支付宝收款人真实名字！')
          return
        }
        if (that.alipay.alipay_number.length == 0) {
          that.$toast('请填写支付宝收款账号！')
          return
        }
        let lists = that.alipay;
        that.$fetch('user_bind_alipay', lists).then(rs => {
          that.$toast('绑定成功');
          setTimeout(function () {
            that.$router.push({
              path: '/setCash'
            })
          }, 1000)
    		})
			},
      sure1() {//绑定微信
        const that = this
        if (this.wechat.wx_nickname && this.wechat.wx_openid && this.wechat.wx_unionid) {
          let lists = this.wechat;
          that.$fetch('user_bind_wechat', lists).then(rs => {
            that.$toast('绑定成功');
            that.$router.push({
              path: '/setCash'
            })
          })
        } else {
          this.$toast('请先绑定微信！')
        }

      }
    }
  }
</script>

<style scoped>
  .binding_next {
    background: #f5f5f5;
  }

  .binding_next .body {

  }

  .binding_next .body .top {
    background: #fff3d1;
    padding: .1rem .15rem;
    font-size: .12rem;
  }

  .binding_next .body .center {
    background: #fff;
    padding: .15rem;
    font-size: .16rem;
  }

  .binding_next .body .center .label {
    display: flex;
  }

  .binding_next .body .center .label + .label {
    margin-top: .3rem;
  }

  .binding_next .body .center .label .left {
    flex: 1;
    margin-right: .2rem;
  }

  .binding_next .body .center .label .right {
    flex: 1;
    display: flex;
    justify-content: space-between;
  }

  .binding_next .body .center .label .right > input {
    border: 0;
  }

  .binding_next .body .btn {
    background: #18B4ED;
    color: #fff;
    padding: .1rem;
    margin: .3rem .15rem;
    text-align: center;
    border-radius: .1rem;
    font-size: .18rem;
  }
</style>
