import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './vuex/store'
import router from './router'
import utils from './utils/utils'

// axios 配置
axios.defaults.timeout = 20000;
//axios.defaults.baseURL = 'http://127.0.0.1:8080/scerp.front.web';
axios.defaults.baseURL = window.config.baseURL
// axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.headers = {"Access-Control-Allow-Headers":"token_id, X-Requested-With, Content-Type"};
// axios.defaults.headers = {"Access-Control-Allow-Headers":"Content-Type"};
// axios.defaults.headers['Content-Type'] = `application/x-www-form-urlencoded`;


// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers['x-token'] = store.state.token
    }
    config.headers['X-SOURCE-SIGN'] = utils.is_weixin() ? 'wechat' : 'app'
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    const statusCode = response.data.error
    if (response.data.msg === 'user-info-error' || response.data.msg === '令牌失效' || statusCode == 401) {
      store.commit('logout')
      router.push({path: '/login'})
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  });

export default axios;
