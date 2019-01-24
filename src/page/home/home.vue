<template>
  <div class="home">
    <!--<div v-show="by_show" style="position: fixed;z-index: 99999; top:0;left: 0;right: 0;bottom:0;background: rgba(0,0,0,.5);">
          <div style="width: 3.75rem;position: absolute;top: 40%;left: 50%;margin-left: -0.2rem;" >
              <van-loading type="spinner" color="white" />
          </div>
      </div>-->

    <!--头部-->
    <div class="header">
      <div @click="visible = !visible">{{selected.city ? selected.city.name : '城市'}}</div>
      <div class="searchBox" @click="toSearch">
        <div class="search"></div>
        <input type="search"/>
      </div>
      <div class="message" @click="toMessage"></div>
    </div>

    <!--轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img style="width: 3.75rem;height: 1.52rem;" :src="uploadFileUrl+image.slide_img_url"
             @click="openHref(image.slide_href)"/>
      </van-swipe-item>
    </van-swipe>

    <!--服务选项-->
    <div class="service">
      <div class="serviceItem" v-for="(item, index) in home_cate_list" :key="index">
        <router-link v-bind='{to:"/findsub?item="+ item.id}'>
          <img :src="uploadFileUrl + item.cate_icon"/>
          <div>{{item.cat_name}}</div>
        </router-link>
      </div>
      <!--<div class="serviceItem">
        <router-link v-bind='{to:"/findsub?item="+112}'>
          <img src="../../assets/img/home/office_clean.png"/>
          <div>办公清洁</div>
        </router-link>
      </div>
      <div class="serviceItem" @click="find_services">
        <img src="../../assets/img/home/renovation_clean.png"/>
        <div>开荒清洁</div>
      </div>
      <div class="serviceItem">
        <router-link v-bind='{to:"/findsub?item="+109}'>
          <img src="../../assets/img/home/nanny.png"/>
          <div>保姆月嫂</div>
        </router-link>
      </div>
      <div class="serviceItem" @click="find_services">
        <img src="../../assets/img/home/healthcare.png"/>
        <div>家庭理疗</div>
      </div>
      <div class="serviceItem" @click="find_services">
        <img src="../../assets/img/home/family_clean.png"/>
        <div>家电清洗</div>
      </div>
      <div class="serviceItem">
        <router-link v-bind='{to:"/findsub?item="+108}'>
          <img src="../../assets/img/home/rush_pipe.png"/>
          <div>管道疏通</div>
        </router-link>
      </div>-->
      <div class="serviceItem" @click="find_services">
        <img src="../../assets/img/home/more.png"/>
        <div>更多</div>
      </div>
    </div>

    <!--推荐-->
    <div class="recommend">
      <div class="head">
        <div><span class="color_blue">热门</span><span class="color_orange">推荐</span></div>
        <div class="color_gray" @click="find_services">更多></div>
      </div>
      <div class="content">
        <ul>
          <li v-for="items in list_com" class="list_coms" style="padding-bottom: .1rem" @click="toDetails(items)">
            <!--<div class="com_tit">
                            <div class="com_tit_img">
                                <div><img src="../../../static/images/store.png" /></div>
                                &lt;!&ndash;<div class="name">{{items.store_name}}</div>&ndash;&gt;
                            </div>
                            &lt;!&ndash;'123.178,13.28037'&ndash;&gt;
                            <div>{{getLong(items.service_lal)}}</div>
                        </div>-->
            <!--///-->
            <ul>
              <li class="com_li">
                <!--////////-->
                <div class="com_com">
                  <div>
                    <img src="../../assets/img/logo_h.png" v-if="items.service_img == ''"/>
                    <img :src="uploadFileUrl + items.service_img[0]" v-else/>
                  </div>
                  <div class="com_com_x">
                    <div class="com_com_x_tit">
                      {{items.service_name}}
                    </div>
                    <div class="com_com_x_ov" v-html="replaceStyle(items.service_info)"></div>
                    <div class="com_com_x_score">
                      <div>
                        <span>等级</span>
                        <span class="com_com_x_score_colco">{{items.store_level}}</span>
                      </div>
                      <div>
                        <span>已售</span>
                        <span class="com_com_x_score_colco">{{items.service_sold}}</span>
                      </div>
                    </div>
                    <div class="com_com_x_score2">
                      <div v-if="items.pay_type == 1">
                        ￥{{items.service_remuneration}}元
                      </div>
                      <div v-else>
                        ￥{{items.service_remuneration}}/次
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>

          </li>
        </ul>
      </div>
    </div>

    <CityPicker @on-finish="handleFinish" v-model="visible" :defaultData='defaultData'></CityPicker>

  </div>
</template>

<script>
  import api from '@/api/api'
  import utils from '@/utils/utils'
  import CityPicker from 'vue-citypicker'

  export default {
    name: 'home',
    components: {
      CityPicker,
    },
    data() {
      return {
        //	    	by_show:true,
        //城市
        visible: false,
        defaultData: [],
        selected: {},
        //轮播图
        images: [],
        uploadFileUrl: api.uploadFileUrl + '/',
        //推荐服务
        list_com: [],
        AMap: null,
        lng: 0,
        lat: 0,
        listst: {},
        home_cate_list: []
      }
    },
    created() {
      // const gt = new Date().getTime();
      // let home_cate_list = localStorage.getItem('cache.home.cate.list')
      // if (home_cate_list && localStorage.getItem('cache.home.cate.list.expire') >= gt) {
      //   this.home_cate_list = JSON.parse(home_cate_list);
      // }
      // let images = localStorage.getItem('cache.images.list')
      // if (images) {
      //   this.images = JSON.parse(images)
      // }
      // let list_com = localStorage.getItem('cache.list.com')
      // if (list_com) {
      //   this.list_com = JSON.parse(list_com)
      // }
    },
    mounted() { //生命周期
      this.init();
      this.initCateList();
      if (window.AMap) {
        let that = this;
        this.AMap = window.AMap;
        var map = new AMap.Map('container', {
          resizeEnable: true
        })
        map.plugin('AMap.Geolocation', function () {
          var geolocation = new AMap.Geolocation({
            // 是否使用高精度定位，默认：true
            enableHighAccuracy: true,
            // 设置定位超时时间，默认：无穷大
            timeout: 2000,
          })

          geolocation.getCurrentPosition()
          AMap.event.addListener(geolocation, 'complete', onComplete)
          AMap.event.addListener(geolocation, 'error', onError)

          function onComplete(data) {
            // data是具体的定位信息
            console.log(data);
            that.lng = data.position.lng
            that.lat = data.position.lat
            sessionStorage.setItem('lng', data.position.lng);
            sessionStorage.setItem('lat', data.position.lat);
          }

          function onError(data) {
            console.log(data);
            // 定位出错
          }
        })
      }
    },
    methods: {
      initCateList() {
      	let that = this;
        let lists = {}
        lists.condition = {
          parent_id: 0
          , cate_is_show: 1
        };
        lists.sort = {
          cate_sort: 'desc',
          id: 'desc'
        }
        that.$fetch('category_list', lists).then(rs =>{
          localStorage.setItem('cache.home.cate.list', JSON.stringify(rs));
          that.home_cate_list = rs
        })
      },
      replaceStyle(str) {
        const reg = /<[^<>]+>/g
        return str.replace(reg, '');
      },
      getLong(string) { //计算距离
        if (this.lat && this.lng) {
          if (this.AMap) {
            var p1 = [this.lng, this.lat];
            var p2 = string.split(',');
            var length = this.AMap.GeometryUtil.distance(p1, p2);
            return Number(length / 1000).toFixed(1) + 'km';
          } else {
            console.log('地图组件加载失败')
            return ''
          }
        } else {
          console.log('定位失败')
          return ''
        }
      },
      init() {
        //存储用户店铺状态
        var that = this;
        that.$fetch('user_store_status', {}, '', 'GET').then(rs =>{
          that.$store.commit('store_status',rs.status);
        })
        //轮播图
        let data = {};
        data.condition = {slide_type: 0}
        data.filter = '1'
        that.$fetch('slide_list', data).then(rs =>{
          localStorage.setItem('cache.images.list', JSON.stringify(rs))
          that.images = rs;
        })
        //获取3条热门服务
        var odata = {};
        odata.sort = {
          'a.service_sold': 'desc'
        };
        odata.rows = 3;
        that.$fetch('service_list', odata).then(rs =>{
          localStorage.setItem('cache.list.com', JSON.stringify(rs))
          that.list_com = rs;
        })
      },

      //点击轮播图
      openHref(href) {
        if (href == '#') {
          return
        }
        window.open(href);
      },

      handleFinish(selected) {
        this.selected = selected;
        console.log(selected)
        this.defaultData = [selected.province.code, selected.city.code, selected.area.code];
      },
      //系统消息
      toMessage() {
        this.$router.push({
          path: '/message'
        })
      },
      //搜索
      toSearch() {
        this.$router.push({
          path: '/search'
        })
      },
      //服务详情
      toDetails(items) {
        this.$router.push({
          path: '/details',
          query: {
            serverId: items.id
          }
        })
      },
      find_services() {
        let that = this
        that.$router.push({
          path: '/find_services'
        })
      },
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .home {
    height: 100%;
    background: #f5f5f5;
    overflow-y: auto;
  }

  .header {
    font-size: 0.14rem;
    display: flex;
    justify-content: space-between;
    height: .46rem;
    line-height: .46rem;
    background: #f8f8f8;
    z-index: 999;
    background: #18b4ed;
  }

  .header div:nth-child(1) {
    padding: 0 .1rem;
    color: #fff;
  }

  .header div:nth-child(3) {
    width: .44rem;
  }

  .header .searchBox {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
  }

  .header .searchBox .search {
    position: absolute;
    width: .42rem;
    height: .42rem;
    background: url('../../../static/images/search.png') no-repeat;
    background-position: center;
    background-size: .15rem .15rem;
  }

  .header .searchBox input {
    height: .32rem;
    width: 100%;
    border-radius: .15rem;
    padding: .05rem .1rem .05rem .42rem;
    outline: none;
    border: 1px solid #fff;
  }

  .header .message {
    background: url('../../../static/images/msg.png') no-repeat;
    background-position: center;
    background-size: .22rem .22rem;
  }

  .service {
    display: flex;
    text-align: center;
    padding: .1rem .1rem;
    border-top: 1px solid #f5f5f5;
    background: #fff;
    flex-wrap: wrap;
    overflow: hidden;
  }

  .service .serviceItem {
    flex: 0 0 calc(25% - .2rem);
    padding: .1rem;
  }

  .service .serviceItem div {
    font-size: 0.12rem;
    color: black;
  }

  .service .serviceItem img {
    width: .45rem
  }

  .recommend {
    margin-top: .15rem;
    background: #fff;
    margin-bottom: .2rem;
  }

  .recommend .head {
    display: flex;
    justify-content: space-between;
    padding: .15rem .1rem;
    font-size: .18rem;
    align-items: center;
    border-bottom: 1px solid #f5f5f5;
  }

  .recommend .content .label {
    padding-bottom: .1rem;
  }

  .recommend .content .label .top {
    display: flex;
    justify-content: space-between;
    padding: .1rem;
    border-top: 1px solid #f5f5f5;
  }

  .recommend .content .label .top .name {
    color: #707070;
    display: flex;
    align-items: center;
  }

  .recommend .content .label .top .name img {
    width: .15rem;
    height: .15rem;
    margin-right: .05rem;
  }

  .recommend .content .label .top .color_gray {
    font-size: .12rem;
  }

  .color_gray {
    color: #b2b2b2;
    font-size: .14rem;
  }

  .color_blue {
    color: #18b4ed;
  }

  .color_orange {
    color: #ff9c0f;
  }

  .list_coms {
    padding-bottom: .2rem;
    border-bottom: 1px solid #f5f5f5;
  }

  .com_tit {
    height: .38rem;
    line-height: .38rem;
    padding: 0 .1rem;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .com_tit_img {
    display: flex;
    font-size: .14rem;
    /*font-weight: 600;*/
    align-items: flex-start;
  }

  .com_tit_img > div img {
    width: .15rem;
    height: .15rem;
    margin-top: .11rem;
    margin-right: .05rem;
  }

  .com_tit_img .name {
    color: #707070;
  }

  .com_tit > div:nth-child(2) {
    font-size: .12rem;
    color: #b2b2b2;
  }

  .com_com {
    display: flex;
    background: #fafafa;
  }

  .com_com > div:nth-child(1) {
    flex: 0 0 .85rem;
    height: .85rem;
    margin: .15rem .1rem .1rem .1rem;
    border-radius: .1rem;
    overflow: hidden;
  }

  .com_com > div:nth-child(1) img {
    width: .85rem;
    height: .85rem;
  }

  .com_com_x {
    position: relative;
    flex: 1;
    margin-top: .1rem;
    /*padding-right: .1rem;*/
  }

  .com_com_ri {
    position: absolute;
    top: -.06rem;
    right: 0.1rem;
    border: 0.01rem solid #ff9c0f;
    color: #ff9c0f;
    font-size: .12rem;
    border-radius: .05rem;
    padding: .01rem .03rem;
  }

  .com_com_x_tit {
    font-size: .16rem;
  }

  .com_com_x_ov {
    width: 2.65rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: .14rem;
    color: #707070;
    margin: 0.05rem 0;
  }

  .com_com_x_score {
    display: flex;
    font-size: .12rem;
    margin-bottom: .05rem;
  }

  .com_com_x_score_colco {
    color: #f00;
  }

  .com_com_x_score2 {
    display: flex;
  }

  .com_com_x_score2 > div:nth-child(1) {
    font-size: .18rem;
    color: #f00;
    margin-right: .25rem;
  }

  .com_com_x_score2 > div:nth-child(2) span {
    font-size: .10rem;
    color: #fff;
    background: #f00;
    border-radius: .05rem;
    padding: 0.015rem 0.063rem;
  }
</style>

<style>
  .city-picker-container {
    position: absolute !important;
  }

  /*轮播图*/

  .van-swipe__indicator {
    background-color: rgba(0, 0, 0, 0);
    border: 1px solid #fff;
  }

  .van-swipe__indicator--active {
    background-color: #fff;
  }
</style>
