<template>
  <div class="home">

    <!--header-->
    <van-nav-bar :title="title" class="white" @click-right="onClickRight">
      <div slot="right"><i class="iconfont icon-saomiao"></i></div>
    </van-nav-bar>
    <div class="body">
      <!--top Button-->
      <div class="heder">
        <div class="heder_div" @click="$router.push('/fastReservation')">
          <div class="heder_div_img">
            <img src="../../assets/img/home/home_t1.png"/>
          </div>
          <div class="heder_div_text">
            10秒快速预约
          </div>
        </div>
        <div class="heder_div" @click="$router.push('/releaseDemand')">
          <div class="heder_div_img">
            <img src="../../assets/img/home/home_t2.png"/>
          </div>
          <div class="heder_div_text">
            发布需求
          </div>
        </div>
      </div>
      <!--banner-->
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <div class="broadcast" @click="service_list(cate_list[0].id, 1)">
            <img src="./assets/img/banner.png"/>
          </div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="broadcast" @click="$router.push('/recharge')">
            <img src="./assets/img/banner_newyear.png"/>
          </div>
        </van-swipe-item>
      </van-swipe>
      <!--banner end-->
      <!--category-->
      <div class="box">
        <div class="centre" v-if="cate_list.length">
          <div class="centre_nai_li" @click="service_list(cate_list[0].id, 1)">
            <div class="centre_div_le_text">
              <h4>{{cate_list[0].cat_name}}</h4>
              <span>{{cate_list[0].cate_remark}}</span>
            </div>
            <div class="centre_div_le_img imgs1">
              <img :src="cate_list[0].cate_cover ? uploadFileUrl + cate_list[0].cate_cover : defaultImg"/>
            </div>
          </div>
          <div class="centre_nai_li" @click="service_list(cate_list[1].id, 1)">
            <div class="centre_div_le_text">
              <h4>{{cate_list[1].cat_name}}</h4>
              <span>{{cate_list[1].cate_remark}}</span>
            </div>
            <div class="centre_div_le_img imgs2">
              <img :src="cate_list[1].cate_cover ? uploadFileUrl + cate_list[1].cate_cover : defaultImg"/>
            </div>
          </div>
          <div class="centre_nai_li" style="margin-top:0.1rem;" @click="service_list(cate_list[2].id, 1)">
            <div class="centre_div_le_text">
              <h4>{{cate_list[2].cat_name}}</h4>
              <span>{{cate_list[2].cate_remark}}</span>
            </div>
            <div class="centre_div_le_img imgs2">
              <img :src="cate_list[2].cate_cover ? uploadFileUrl + cate_list[2].cate_cover : defaultImg"/>
            </div>
          </div>
          <div class="centre_nai_li" style="margin-top: -0.5rem;" @click="service_list(cate_list[3].id, 1)">

            <div class="centre_div_le_text">
              <h4>{{cate_list[3].cat_name}}</h4>
              <span>{{cate_list[3].cate_remark}}</span>
            </div>
            <div class="centre_div_le_img imgs1">
              <img :src="cate_list[3].cate_cover ? uploadFileUrl + cate_list[3].cate_cover : defaultImg"/>
            </div>
          </div>
        </div>
        <!--9宫各-->
        <!--<div class="centre_nai">-->
          <!--<ul>-->
            <!--<li v-if="index>3" class="centre_nai_li flex" v-for="(item,index) in cate_list"-->
                <!--@click="service_list(item.id)">-->
              <!--<div class="centre_nai_li_img">-->
                <!--<img :src="cate_list[index].cate_cover ? uploadFileUrl + cate_list[index].cate_cover : defaultImg"/>-->
              <!--</div>-->
              <!--<div class="centre_nai_li_text">-->
                <!--<h4>{{item.cat_name}}</h4>-->
                <!--<span>{{item.cate_remark || item.cat_name + item.cat_name}}</span>-->
              <!--</div>-->
            <!--</li>-->
            <!--<li class="centre_nai_li" style="height: 1px;visibility: hidden;"></li>-->
            <!--<li class="centre_nai_li" style="height: 1px;visibility: hidden;"></li>-->
            <!--<li class="centre_nai_li" style="height: 1px;visibility: hidden;"></li>-->

          <!--</ul>-->
        <!--</div>-->
      </div>
      <!--category end-->
    </div>
    <van-popup v-model="show_ewm_plus">
      <div class="showView" @click="show_ewm_plus = false">
        <div class="code" v-if=" $store.state.user_info">
          <img :src="uploadFileUrl + $store.state.user_info.user_qrcode"/>
        </div>
        <div class="bottom" style="text-align: center;padding: .2rem;">下单出示会员码，可积累积分</div>
      </div>
    </van-popup>

    <van-popup v-model="ad_newyear_show" style="width: 100%;background: none;user-select: none;">
      <div class="close" style="width: .4rem;float: right;margin-right: .2rem;" @click="ad_newyear_show = false"><img style="width: 100%;" src="../../assets/img/close_white.png" alt=""></div>
      <img src="./assets/img/ad_newyear.png" alt="新春广告" style="width: 100%;" @click="toRecharge">
    </van-popup>
  </div>
</template>
<script>
  import api from '@/api/api'
  import utils from '@/utils/utils'
  export default {
    data() {
      return {
        title: '首页',
        uploadFileUrl: api.uploadFileUrl + '/',
        defaultImg: require('../../assets/img/logo_h.png'),
        cate_list: [],
        show_ewm_plus: false,
        ad_newyear_show: new Date().toLocaleDateString() !== localStorage.getItem('ad_newyear_show')
      }
    },
    created() { //生命周期
      this.category_list = this.$store.state.category_list
      this.init()
      //扫码回调
      window['onScanResultSuccess'] = res => {
        if (res.scan_result) {
          let reg = /^http(.*)/
          if (res.scan_result.match(reg)) {
            window.location.href = res.scan_result
          }
        }
      }

      // console.log(moment.weekdaysShort(moment().week()))
    },
    watch: {
      ad_newyear_show(val) {
        localStorage.setItem('ad_newyear_show', new Date().toLocaleDateString())
      }
    },
    methods: { //方法
      toRecharge () {
        localStorage.setItem('ad_newyear_show', new Date().toLocaleDateString());
        this.$router.push('/recharge');
      },
      onClickRight() { //扫码
        if (utils.is_android() && typeof android != 'undefined') {
          android.callQRCodeScan()
        }
        if (utils.is_ios() && window.webkit && window.webkit.messageHandlers.callQRCodeScan) {
          window.webkit.messageHandlers.callQRCodeScan.postMessage({})
        }
      },
      service_list(id,admin) {
        if (admin) {
          let lists = {}
          lists.condition = {
            'service_level_1': id
          }
          this.$fetch('service_list', lists).then(rs => {
            if (rs.length > 0) {
              this.$store.commit('store_id', rs[0].id)
              this.$router.push({
                path: '/service_details',
                query: {
                  store_id: rs[0].id
                }
              })
            } else {
              this.$router.push({
                path: '/service_list',
                query: {
                  id
                }
              })
            }
          })
        } else {
          this.$router.push({
            path: '/service_list',
            query: {
              id
            }
          })
        }

      },
      init() {
        let lists = {}
        lists.condition = {
          parent_id: 0,
          cate_is_show: 1
        };
        lists.sort = {
          is_self_support: "desc",
          cate_sort: 'desc'
        }
        lists.only_get_support = 1
        this.$fetch('category_list', lists).then(rs => {
          this.cate_list = rs
        })
      },
    }
  }
</script>
<style scoped>
  @import "./assets/icon/iconfont.css";

  h4 {
    margin: 0;
    padding: 0;
  }

  .home {
    height: 100%;
  }

  .home .body {
    height: calc(100% - .46rem);
    overflow-y: auto;
  }

  .box {
    padding: 0 0.12rem;
    overflow: hidden;
  }

  .heder {
    padding: 0.1rem 0.12rem;
    display: flex;
    justify-content: space-between;
  }

  .heder_div {
    width: 48%;
    height: 0.55rem;
    box-shadow: 2px 2px 10px rgba(224, 243, 250, 1);
    text-align: center;
    display: flex;
    align-items: center;
    border-radius: 0.05rem;
  }

  .heder_div_img img {
    width: 0.24rem;
    height: 0.24rem;
    margin: 0 .15rem;
  }

  .heder_div_text {
    font-size: .16rem;
    font-weight: 700;
  }

  .broadcast {
    height: 1.37rem;
    margin: 0 0 0.1rem 0;
  }

  .broadcast img {
    height: 1.37rem;
    width: 100%;
  }

  .centre {
    margin-bottom: .1rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .centre > div {
    width: 48%;
    /*height: 1.95rem;*/
    text-align: center;
  }

  .centre_div_le_img {
    width: auto;
    height: .6rem;
  }

  .centre_div_le_img > img {
    width: auto;
    height: 100%;
  }

  .centre_div_le {
    box-shadow: 2px 2px 10px rgba(224, 243, 250, 1);
  }

  .centre_div_le_text {
    margin: 0.1rem 0 0.2rem 0;
  }

  .centre_div_le_text h4 {
    font-size: 0.16rem;
    color: #18b4ed;
    margin-bottom: 0.05rem;
  }

  .centre_div_le_text span {
    font-size: 0.14rem;
    color: #b2b2b2;
  }

  .centre_div_ri > div {
    margin-bottom: .1rem;
    height: .925rem;
    box-shadow: 2px 2px 10px rgba(224, 243, 250, 1);
    display: flex;
    align-items: center;
  }

  .centre_div_ri .centre_div_ri_img img {
    width: .54rem !important;
    height: .42rem !important;
  }

  .centre_div_ri .centre_div_ri_img2 {
    width: .54rem;
    height: .42rem;
    margin: 0 .15rem;
  }

  .centre_div_ri .centre_div_ri_img2 img {
    width: .4rem !important;
    height: .58rem !important;
  }

  .centre_div_ri .centre_div_ri_text {
    text-align: left;
  }

  .centre_div_ri .centre_div_ri_text h4 {
    font-size: .16rem;
    margin-bottom: 0.05rem;
  }

  .centre_div_ri .centre_div_ri_text span {
    font-size: 0.14rem;
    color: #b2b2b2;
  }

  .centre_nai ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .centre_nai_li {
    width: 48%;
    height: 100%;
    box-shadow: 2px 2px 10px rgba(224, 243, 250, 1);
  }

  .centre_nai_li div {
    text-align: center;
  }

  .centre_nai_li_img img {
    margin: 0.2rem 0 0.12rem 0;
    /*width: 60%;*/
    height: .375rem;
  }

  .centre_nai_li_text h4 {
    font-size: .16rem;
    margin-bottom: 0.05rem;
  }

  .centre_nai_li_text span {
    font-size: 0.14rem;
    color: #b2b2b2;
  }

  .flex {
    display: flex;
    align-items: center;
  }

  .imgs1 {
    padding: 0 0 0.9rem 0;
  }

  .imgs1 img {
    width: 1.32rem;
    height: 1.25rem;
  }

  .imgs2 {
    padding: 0 0 0.3rem 0;
  }

  .imgs2 img {
    width: 0.68rem;
    height: 0.82rem;
  }
</style>
