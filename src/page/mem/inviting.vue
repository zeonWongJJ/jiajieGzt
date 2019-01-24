<template>
  <div class="inviting">
    <div class="img">
      <img src="../../../static/images/inviting.jpg"/>
      <div class="btnBox">
        <div class="btn" @click="ShareWechat('talk')"></div>
        <div class="btn" @click="ShareWechat('friends')"></div>
        <div class="btn"
             v-clipboard:copy="shareLine"
             v-clipboard:success="onCopy"
             v-clipboard:error="onError"></div>
      </div>
    </div>
    <div class="onClickLeft" @click="onClickLeft"></div>
    <div class="number">成功推荐{{num}}人</div>
  </div>
</template>

<script>
  import api from '@/api/api'
  import utils from '@/utils/utils'

  export default {
    data() {
      return {
        num: 0,
        share: {
          title: '打造洁净环境，享受优质生活！'
          , desc: '帮家洁高品质家政平台，自己用省钱，分享能赚钱。'
          , link: `http://jiajie-touch.7dugo.com/#/share?userid=${this.$route.query.user_id}`
          , imgUrl: require('@/assets/img/logo_h.png')
        }
        , wx_config: {
          secret: 'adf0f60eadb80e743ed412e68156b6fb',
          appid: 'wx14173836d13caa7a'
        }
        , shareLine: `http://jiajie-touch.7dugo.com/#/share?userid=${this.$route.query.user_id}`
      }
    },
    mounted() {
      const user_id = localStorage.getItem('user_id')
      this.$fetch('user_get_share_count', {}, user_id)
      .then(rs => {
        this.num = rs._count
    	})
      if (utils.is_weixin()) {
        window.location.href = `http://www.7dugo.com/fuck.search.jiajie?user_id=${this.$route.query.user_id}`
      }
    },
    methods: {
      onClickLeft() {
        window.history.go(-1);
      },
      onCopy: function (e) {
        this.$toast('已复制')
      },
      onError: function (e) {
        this.$toast('复制失败')
      }
      // 分享给好友
      , ShareWechat: function (whoToShare) {
        const that = this
        if (utils.is_weixin()) {
        } else {
          if (utils.is_android() || utils.is_ios()) {
            let json = {
              "whatTypeShare": "wx",
              "whoToShare": whoToShare,
              "shareType": "url",
              "shareContent": that.shareLine,
              "title": '好打造洁净环境，享受优质生活',
              "content": "帮家洁高品质家政平台，自己用省钱，分享能赚钱",
              "img_url": require('@/assets/img/logo_h.png')
            }
            if (utils.is_android()) {
              android.shareToThirdApp(JSON.stringify(json));
            } else if (utils.is_ios()) {
              window.webkit.messageHandlers.shareToThirdApp.postMessage(json);
            }
          }
        }
      }
    }
  }
</script>

<style scoped>
  .inviting {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    background: #ff2a20;
    color: #fff;
  }

  .inviting .img {
    width: 100%;
    position: relative;
  }

  .inviting .img > img {
    width: 100%;
  }

  .inviting .img .btnBox {
    position: absolute;
    width: calc(100% - .3rem);
    bottom: .5rem;
    height: .8rem;
    display: flex;
    margin: 0 .15rem;
    justify-content: space-around;
  }

  .inviting .img .btnBox .btn {
    flex: 0 0 30%;
  }

  .inviting .onClickLeft {
    position: absolute;
    top: 0;
    left: 0;
    width: .4rem;
    height: .4rem;
    z-index: 1000;
  }

  .inviting .number {
    position: absolute;
    top: .6rem;
    right: .15rem;
  }
</style>
