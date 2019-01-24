<template>
  <div class="details">
    <!--头部-->
    <!--<van-nav-bar class="white" title="服务详情" left-arrow @click-left="onClickLeft" />-->
    <van-nav-bar class="white" title="服务详情" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
      <van-icon name="wap-nav" color="#18b4ed" slot="right"/>
    </van-nav-bar>
    <div v-show="rishow" @click.stop="orishow()"
         style="position: fixed;z-index: 9999; top: 0;right: 0;left: 0;bottom: 0; background: rgba(0,0,0,0); ">
      <div style="position: absolute;z-index: 9999; top: .45rem;right: 0;width: 1rem ;background: rgba(0,0,0,.2); ">
        <head-ri></head-ri>
      </div>
    </div>
    <!--body-->
    <div class="body">
      <!--轮播图-->
      <van-swipe :autoplay="3000" v-if="images.length>0">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img style="width: 3.75rem ; height: 2.21rem;" src="../../assets/img/logo_h.png" v-if="image==''"/>
          <img style="width: 3.75rem ; height: 2.21rem;" v-lazy="uploadFileUrl + image" v-else/>
        </van-swipe-item>
      </van-swipe>
      <div class="detail">
        <div class="name">{{items.service_name}}</div>
        <div class="center">
          <span class="price">{{items.service_remuneration}}</span>
        </div>
        <div class="other">
          <div class="start">
            <van-rate :value="Number(items.service_average_score)" disabled-color="#ff3434" void-color="#ceefe8"
                      disabled/>
            <div class="value"> {{Number(items.service_average_score).toFixed(1)}}</div>
          </div>
          <div class="sell"> {{items.service_sold}}</div>
        </div>
      </div>
      <div class="evaluate">
        <div class="title">用户评价(<span class="color_gray">{{comment_count.zs}}</span>)</div>
        <div class="types">
          <div class="type">全部<span>{{comment_count.zs}}</span></div>
          <div class="type">好评<span>{{comment_count.hp}}</span></div>
          <div class="type">中评<span>{{comment_count.zp}}</span></div>
          <div class="type">差评<span>{{comment_count.cp}}</span></div>
          <div class="type">有图<span>{{comment_count.yt}}</span></div>
        </div>
        <div class="eval" v-for="(item,index) in comment_list_f" v-if="comment_list_f">
          <div class="user">
            <!--comment_average_score-->
            <div class="img" v-if="item.user_pic  == ''">
              <img src="../../assets/img/logo_h.png"/>
            </div>
            <div class="img" v-else>
              <img :src="item.user_pic"/>
            </div>
            <div class="right">
              <div class="name">{{item.user_name}}</div>
              <van-rate :value="parseInt(item.comment_average_score)" disabled-color="#ff3434" void-color="#ceefe8"
                        disabled/>
            </div>
          </div>
          <div class="other">
            <div class="time">{{item.add_time}}</div>
            <!--<div class="pay">支付方式:</div>-->
            <div class="product">产品: {{item.service_name}}</div>
          </div>
          <div class="info">
            {{item.comment_content}}
          </div>
          <div class="imgs">
            <img v-for="imgs in item.comment_img_urls" :src="uploadFileUrl + imgs"/>
          </div>

        </div>
        <div v-if="comment_list_f == ''" style="text-align: center;padding:0.05rem 0;margin: .15rem 0; color: #b2b2b2;">
          暂无评论
        </div>

        <div style="text-align: center;">
          <div class="more" @click="more()">查看全部评价</div>
        </div>
      </div>

      <!--...-->
      <div class="describe">
        <div class="title">服务详情</div>
        <div class="content">
          <p>为了保障你的权益（请仔细阅读）</p>
          <div v-html="items.service_info" style="padding-bottom: .2rem"></div>
        </div>
      </div>
      <div class="end">没有更多啦~</div>
    </div>

    <!--底部-->
    <div class="bottom">
      <div class="left">
        <a class="btn" :href="'tel:' + items.store_tel" style="color: #000">
          <img src="../../assets/img/phone.png"/>
          <div>联系商家</div>
        </a>
        <div v-if="user_collected == 1">
          <div class="btn" @click="likeqx()" v-show="imgs_xx">
            <img src="../../assets/img/xx_h.png"/>
            <div>取消收藏</div>
          </div>
          <div class="btn" @click="like()" v-show="imgs_xx3">
            <!--<span class="imgs_b "  :class="{'imgs_h':imgs_xx}"></span>-->
            <img src="../../assets/img/like.png"/>
            <div>收藏</div>
          </div>
        </div>
        <div v-if="user_collected == 0">
          <div class="btn" @click="likeqx()" v-show="imgs_xx2">
            <img src="../../assets/img/xx_h.png"/>
            <div>取消收藏</div>
          </div>
          <div class="btn" @click="like()" v-show="imgs_xx1">
            <!--<span class="imgs_b "  :class="{'imgs_h':imgs_xx}"></span>-->
            <img src="../../assets/img/like.png"/>
            <div>收藏</div>
          </div>
        </div>

      </div>
      <div class="rightBtn" @click="toPlaceOrder()">
        去下单
      </div>
    </div>
    <div v-show="add_show" class="add_shows">
      <div class="add_shows_div">
        <h3>请先添加服务地址</h3>
        <div>
          <span @click="add_qx">取消</span>
          <span @click="add_xadd">添加地址</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/api/api'
  import headRi from '@/page/pages/head_ri_sub'

  export default {
    components: {
      headRi
    },
    data() {
      return {
        //轮播图
        rishow: false, //headRi
        comment_count: {},
        images: [],
        uploadFileUrl: api.uploadFileUrl + '/',
        items: {},
        imgs_xx: true,
        imgs_xx1: true,
        imgs_xx2: false,
        imgs_xx3: false,
        user_collected: '',
        comment_list_f: [],
        serverId: this.$route.query.serverId,
        add_show: false,
      }
    },
    mounted() { //生命周期
      this.rendDetails();
    },
    methods: {
      //			headRi
      onClickRight() {
        this.rishow = !this.rishow
      },
      onClickLeft() {
        window.history.go(-1);
      },
      orishow() {
        this.rishow = false
      },
      rendDetails() { //详情信息
        this.$fetch('service_get', {}, this.serverId).then(rs => {
          this.images = this.images.concat(rs.service_img);
          this.items = rs;
          this.comment_count = rs.comment_count;
          this.user_collected = rs.user_collected
          this.comment_list()
        })
      },
      commEval() {
        var that = this;
        var lists = {}
        lists.condition = {
          'a.service_id': that.$route.query.serId,
        }
        that.$fetch('comment_list', lists).then(rs => {

        })
      },
      like() {
        var that = this;
        var lists = {}
        lists.service_id = that.items.id
        that.$fetch('user_collect_add', lists).then(rs => {
          if (rs.error == 0) {
            that.imgs_xx1 = false
            that.imgs_xx2 = true
            that.imgs_xx = true
            that.imgs_xx3 = false
            that.$toast('收藏成功');
          } else {
            that.$toast(rs.msg[0]);
          }
        })
      },

      likeqx() {
        var that = this;
        that.$fetch('user_collect_delete', {}, that.items.id).then(rs => {
          if (rs.error == 0) {
            that.imgs_xx2 = false
            that.imgs_xx1 = true
            that.imgs_xx = false
            that.imgs_xx3 = true
            that.$toast('取消收藏');
          } else {
            that.$toast(rs.msg[0]);
          }
        })
      },
      /*call() {
                      this.$dialog.confirm({
                          title: '提示',
                          message: '您是否要拨打电话'
                      }).then(() => {

                          // on confirm
                      }).catch(() => {
                          this.$toast('已取消');
                          // on cancel
                      });
                  },*/
      more() {
        var that = this;
        let ids = that.items.id
        that.$router.push({
          path: '/evaluate',
          query: {
            ids
          }
        })
      },
      toPlaceOrder() {
        // 地址列表
        let that = this
        let forms = {}
        forms.row = 50
        that.$fetch('user_address_list', forms).then(rs => {
          that.addslists = rs
          if (that.addslists.length == 0) {
            that.add_show = true
          } else {
            let lists = JSON.stringify(that.items)
            that.$router.push({
              path: 'placeOrder',
              query: {
                lists
              }
            })
          }
        })
      },
      add_xadd() {
        this.$router.push({
          path: 'editadd'
        })

      },
      add_qx() {
        this.add_show = false
      },
//					地址列表^^^^^^^^^^^
      comment_list() {
//				this.axios({
//					method: 'post',
//					url: api.service_comment_list + this.serverId,
//		          data: {
//							  rows: 2
//		          }
//				}).then(res => {
//					if(!res.data.error) {
//						this.comment_list_f = res.data.data
//					} else {
//						this.$toast(res.data.msg);
//					}
//				})
        let that = this
        let lists = {}
        lists.rows = 2
        lists.condition = {
          "a.service_id": this.serverId
        }
        that.$fetch('comment_list', lists).then(rs => {
          if (!rs.error) {
            this.comment_list_f = rs.data
          } else {
            that.$toast(rs.msg[0]);
          }
        })
      },
    }
  }
</script>
<style scoped>
  .details {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background: #f5f5f5;
  }

  .details .body {
    height: calc(100% - .46rem);
    overflow-y: auto;
  }

  /**/

  .details .body .detail,
  .details .body .evaluate,
  .details .body .department {
    padding: .15rem;
    margin-bottom: .1rem;
    background: #fff;
  }

  .details .body .detail .name {
    font-size: .18rem;
  }

  .details .body .detail .price {
    color: #ff3434;
    font-size: .25rem;
  }

  .details .body .detail .price:before {
    content: '￥';
  }

  .details .body .detail .type {
    color: #fff;
    background: #ff3434;
    border-radius: .025rem;
    padding: .02rem .05rem;
  }

  .details .body .detail .other {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .details .body .detail .other .start {
    display: flex;
    align-items: center;
  }

  .details .body .detail .other .start .value {
    margin-left: .1rem;
    color: #ff3434;
  }

  .details .body .detail .other .sell {
    color: #b2b2b2;
  }

  .details .body .detail .other .sell:before {
    content: '已售';
  }

  /*评论*/

  .details .body .evaluate .types {
    display: flex;
    flex-wrap: wrap;
  }

  .details .body .evaluate .type {
    background: rgba(255, 52, 52, .1);
    color: #707070;
    margin: .1rem .1rem 0 0;
    padding: .08rem .1rem;
    border-radius: .15rem;
  }

  .details .body .evaluate .type > span {
    margin-left: .05rem;
  }

  .details .body .evaluate .eval {
    padding: .1rem 0;
    border-bottom: .01rem solid #eee;
  }

  .details .body .evaluate .eval .img {
    width: .35rem;
    height: .35rem;
    border-radius: 50%;
    overflow: hidden;
  }

  .details .body .evaluate .eval .user {
    display: flex;
  }

  .details .body .evaluate .eval .user .img > img {
    width: 100%;
    height: 100%;
  }

  .details .body .evaluate .eval .user .right {
    flex: 1;
    margin-left: .1rem;
  }

  .details .body .evaluate .eval .other {
    display: flex;
    font-size: .115rem;
    color: #b2b2b2;
    padding: .05rem 0;
  }

  .details .body .evaluate .eval .other > div {
    margin-right: .1rem;
  }

  .details .body .evaluate .eval .imgs {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    margin: 0.08rem 0;
  }

  .details .body .evaluate .eval .imgs > img {
    max-width: .6rem;
    height: auto;
    margin-right: .1rem;
  }

  .details .body .evaluate .more {
    display: inline-block;
    margin: .1rem auto;
    color: #ff3434;
    border: 1px solid #ff3434;
    border-radius: .15rem;
    line-height: .3rem;
    padding: 0 .1rem;
  }

  .details .body .department {
    display: flex;
  }

  .details .body .department .img {
    width: .68rem;
    height: .68rem;
  }

  .details .body .department .img > img {
    width: 100%;
    height: 100%;
  }

  .details .body .department .right {
    flex: 1;
    margin-left: .1rem;
  }

  .details .body .department .right .name {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: .18rem;
  }

  .details .body .department .right .name .like {
    font-size: .14rem;
    color: #ff3434;
  }

  /*描述*/

  .details .body .describe {
    padding: .15rem;
    background: #fff;
  }

  .details .body .describe .content {
    color: #707070;
  }

  /*end*/

  .details .body .end {
    color: #888888;
    text-align: center;
    padding: .1rem;
  }

  /*底部*/

  .details .bottom {
    height: .6rem;
    width: 100%;
    position: absolute;
    bottom: 0;
    background: #fff;
    display: flex;
    text-align: center;
  }

  .details .bottom .left {
    flex: 1;
    display: flex;
    font-size: .12rem;
    padding: .1rem .15rem;
  }

  .details .bottom .left .btn {
    margin-right: .2rem;
  }

  .details .bottom .left .btn > img {
    width: .2rem;
    height: .2rem;
    margin-bottom: .05rem;
  }

  .imgs_b {
    display: block;
    width: .2rem;
    height: .2rem;
    margin-bottom: .08rem;
    background: url(../../assets/img/like.png) no-repeat;
    background-size: .2rem .2rem;
  }

  .imgs_h {
    display: block;
    width: .2rem;
    height: .2rem;
    margin-bottom: .08rem;
    background: url(../../assets/img/xx_h.png) no-repeat;
    background-size: .2rem .2rem;
  }

  .details .bottom .rightBtn {
    width: 1.3rem;
    color: #fff;
    background: #18b4ed;
    line-height: .6rem;
    font-size: .18rem;
  }

  /**/

  .color_gray {
    color: #b2b2b2;
  }

  .add_shows {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background: rgba(0, 0, 0, .3);
  }

  .add_shows_div {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2.2rem;
    height: 1rem;
    background: #fff;
    margin: -0.5rem 0 0 -1.1rem;
    border-radius: 0.1rem;
    padding: 0.1rem 0;
  }

  .add_shows_div h3 {
    text-align: center;
    padding: 0 0.08rem;
  }

  .add_shows_div div {
    margin: .3rem auto 0;
    text-align: center;
  }

  .add_shows_div div span {
    font-size: 0.12rem;
    padding: 0.08rem .2rem;
    text-align: center;
    background: #18b4ed;
    border-radius: 0.1rem;
    color: #fff;
    margin: 0 .1rem;
  }

  .add_shows_div div span:nth-child(1) {
    background: #fff;
    color: #18b4ed;
    border: 0.01rem solid #18b4ed;
  }
</style>
<style>
  .details .white.van-nav-bar .van-icon {
    color: #18B4ED;
  }

  .details .detail .van-rate__item {
    width: .12rem !important;
  }

  .details .user_other .van-rate__item {
    width: .09rem !important;
  }
</style>
