// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import {Button, Cell} from 'mint-ui'
import VueScroller from 'vue-scroller'
// window.moment = require('moment')
// moment.locale('zh-cn')

Vue.use(VueScroller)
import axios from './http';
import VueAxios from 'vue-axios';
// import vuex from 'vuex';
import 'babel-polyfill'
import store from './vuex/store';
import $ from 'jquery'
import Vant from 'vant';
import 'vant/lib/index.less';
import '@/assets/css/index.css'
import {Toast} from 'vant'
import clampy from '@clampy-js/vue-clampy'

import VueClipboard from 'vue-clipboard2'
// import 'font-awesome.css/css/font-awesome.css'
import initRichText from './utils/editor'
import api from './api/api'
import http from './http'
import config from './config'

import loading from './components/Loading'

Vue.component('onLoading', loading)
$(function () {
  $('body').on('focus', 'input', function () {
    var __this = this;
    setTimeout(function () {
      __this.scrollIntoViewIfNeeded()
    }, 200);
  }).on('focus', 'textarea', function () {
    var __this = this;
    setTimeout(function () {
      __this.scrollIntoViewIfNeeded()
    }, 200);
  })
})

initRichText()
Vue.use(VueClipboard)

import AMap from 'vue-amap';

Vue.use(AMap);

AMap.initAMapApiLoader({
  // 申请的高德key
  key: '0c4feb71c7ebae0c7f02e339f7b470ff',
  // 插件集合
  plugin: ['AMap.Geolocation','AMap.Geocoder','AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
});

Vue.config.productionTip = false

Vue.use(Vant);
Vue.use(clampy)
Vue.use(MintUI);
Vue.component(Button.name, Button)
Vue.component(Cell.name, Cell)

// 用 axios 进行 Ajax 请求
Vue.use(VueAxios, axios);

Vue.prototype.$config = config;

Vue.prototype.$get_thumb_img = (url, w, h) => {
  let baseURL = window.config.baseURL
  if (baseURL.match(/^(.*)\/$/g)) {
    baseURL = baseURL.replace(/\/$/, '')
  }
  return `${baseURL}/get.thumb.img?src_img=/${url}&dst_w=${w}&dst_h=${h}`
}
Vue.prototype.$fetch = (_api, data, _url = '', _type = "POST", toast) => {
  let url = api[_api] ? api[_api] : false
  if (!url) {
    // todo::接口未定义
  }
  _url && (url += `${_url}`)
  let instance
  if (_type === 'POST') {
    instance = http({
      url,
      data,
      method: 'POST'
    })
  } else if (_type === 'GET') {
    instance = http({
      url,
      params: data,
      method: 'GET'
    })
  }
  return new Promise((resolve, reject) => {
    instance.then(rs => {
      // 请求成功回调处理
      if (typeof rs == 'object') {
        if (parseInt(rs.data.error) === 0) {
          resolve(rs.data.data)
        } else {
          if (rs.data.error != 401) {
            !toast && Toast({
              message: rs.data.msg[0]
            });
          }
          reject(rs.data)
        }
      } else {
        Toast({
          mask: true,
          message: '接口服务异常'
        });
      }
    }).catch(err => {
      // 请求失败回调
      reject()
    })
  })
}


new Vue({
  el: '#app',
  router,
  store,
  directives: {
    clampy
  },
//rem,
  components: {App},
  template: '<App/>'
})
