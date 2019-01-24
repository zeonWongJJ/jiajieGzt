<template>
  <div class="member">
    <div class="body">
      <div class="bar_d"></div>
      <!--商家-->
      <div class="business">
        <my-store></my-store>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '@/api/api'
  import utils from '@/utils/utils'
  import myStore from '@/pages/store/store'

  export default {
    components: {
      myStore,
    },
    data() {
      return {
        onshows: true,// c转转
        showStore: false,
        show: true,
        show_money: true,
        show_ewm_plus: false,
        user: {},
        statistics: {},
        store_id: '',//店铺id
        imgs: require('../../../src/assets/img/logo_h.png'),
        store_type: '',
        uploadFileUrl: api.uploadFileUrl + '/',
        store_status: 0,
        staff_pass: 0,
        apiFinish: false,
        user_type: 0
      }
    },

    created() { //生命周期
      sessionStorage.setItem('orderIndex', 0)
    },

    methods: { //方法

    },

  }
</script>
<style type="text/css">
  .member [class*=van-hairline]::after {
    border-bottom: 0;
  }
</style>
<style scoped>
  h4,
  p {
    padding: 0 0;
    margin: 0 0;
  }

  .member {
    position: relative;
    height: 100%;
    overflow: auto;
  }

  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter,
  .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */

  {
    transform: translateX(120px);
    opacity: 0;
  }

  .bar_d {
    height: 2rem;
    width: 100%;
    /*background: #04A220;*/
    background: url(../../assets/img/img_vx/bar_con.png) no-repeat;
    background-size: 100% 100%;
    /*border-radius: 0 0 .5rem .5rem;*/
  }

  .bar_d_2 {
    height: 2rem;
    width: 100%;
    /*background: #04A220;*/
    background: url(../../assets/img/img_vx/bar_d.png) no-repeat;
    background-size: 100% 100%;
  }

  .tan_x {
    display: flex;
    justify-content: center;
  }

  .tan_x li {
    font-size: .18rem;
    height: .4rem;
    line-height: .4rem;
    margin: 0 .3rem;
    color: #fff;
    /*border-bottom: 0.01rem solid #fff;*/
  }

  .tan_x_li {
    color: #fff;
    border-bottom: 0.01rem solid #fff;
  }

  /*个人*/

  .personal {
    position: absolute;
    top: .84rem;
    width: 3.51rem;
    border-radius: .05rem;
    left: 50%;
    margin-left: -1.75rem;
  }

  .personal_head_portrait {
    height: 1.62rem;
    margin-bottom: .15rem;
    background: #fff;
    border-radius: 0.05rem;
    box-shadow: 2px 2px 10px rgba(224, 243, 250, 1);
  }

  .personal_head_portrait_img {
    display: flex;
    justify-content: space-between;
    height: .9rem;
    align-items: center;
    padding-top: .1rem;
  }

  .personal_head_portrait_img_div {
    flex: 0 0 2.5rem;
    display: flex;
    align-items: center;
    /*justify-content: space-between;*/
  }

  .personal_head_portrait_text h4 {
    margin-bottom: .1rem;
  }

  .personal_head_portrait_img_div div img {
    width: .7rem;
    height: .7rem;
    border-radius: 50%;
    margin: 0 .15rem;
  }

  .personal_head_portrait_ewm {
    width: .7rem;
    text-align: center;
    font-size: .10rem;
    margin-right: .15rem;
  }

  .personal_head_portrait_ewm img {
    width: .35rem;
    height: .35rem;
    margin: 0 0 .1rem 0;
  }

  .balance {
    display: flex;
    justify-content: space-between;
  }

  .balance li {
    flex: 0 0 33.3%;
    text-align: center;
  }

  .balance li h4 {
    font-size: .16rem;
    margin-bottom: 0.1rem;
  }

  .balance li span {
    font-size: .12rem;
    color: #b2b2b2;
  }

  .personal_order {
    height: 1.42rem;
    margin-bottom: .17rem;
    background: #fff;
    border-radius: 0.05rem;
    overflow: hidden;
    box-shadow: 2px 2px 10px rgba(224, 243, 250, 1);
  }

  .order {
    background: #fff;
    padding: 0 .15rem;
  }

  .order .title {
    display: flex;
    justify-content: space-between;
    padding: .15rem 0;
    border-bottom: 1px solid #f5f5f5;
  }

  .order .title div:nth-child(1) {
    font-size: .16rem;
  }

  .order .right {
    display: flex;
    align-items: center;
    color: #B2B2B2;
  }

  /*订单的5大块*/

  .order .row {
    display: flex;
    padding: .15rem 0;
    text-align: center;
    margin-bottom: .1rem;
  }

  .order .row .top {
    margin-bottom: .1rem;
    color: #b2b2b2;
  }

  .order .row .span {
    width: 20%;
  }

  /*选择项*/

  .option_li {
    height: .55rem;
    margin-bottom: .05rem;
    background: #fff;
    border-radius: 0.05rem;
    box-shadow: 2px 2px 10px rgba(224, 243, 250, 1);
  }

  /*label*/

  .label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    padding: .15rem;
    /*border-bottom: 1px solid #f5f5f5;*/
  }

  .label.bottom {
    margin-bottom: .1rem;
  }

  .label .left {
    display: flex;
    align-items: center;
  }

  .label .left .logo {
    height: .24rem;
    width: .24rem;
    margin-right: .1rem;
  }

  .label .left .logo > img {
    width: 100%;
    height: auto;
  }

  .right {
    display: flex;
    align-items: center;
    color: #999999;
  }

  .right:after {
    content: '';
    display: block;
    width: .07rem;
    height: .125rem;
    margin-left: .05rem;
    background: url(../../assets/img/right.png) no-repeat;
    background-position: center left;
    background-size: .07rem .125rem;
  }

  /*商家*/

  .business {
    position: absolute;
    top: .2rem;
    width: 3.51rem;
    left: 50%;
    margin-left: -1.75rem;
  }

  .business_head_portrait {
    height: 1.62rem;
    border-radius: 0.05rem;
  }

  .business_head_portrait div:nth-child(1) {
    display: flex;
    align-items: center;
    padding: .07rem 0 0 .07rem;
  }

  .business_head_text {
    width: 1.04rem;
    position: relative;
    /*margin: 0 0 0 0.15rem;*/
  }

  .business_head_text span {
    width: 1.04rem;
    height: .45rem;
    line-height: 0.45rem;
    border-radius: .48rem;
    border: 0.02rem solid #fff;
    font-size: .12rem;
    padding-left: .15rem;
    color: #fff;
    position: absolute;
    left: .2rem;
  }

  .business_head_img {
    width: 0.9rem;
    height: 0.9rem;
    border-radius: 50%;
    background: #18b4ed;
    border: 0.02rem solid #fff;
    position: relative;
    z-index: 999;
  }

  .business_head_img img {
    margin: 0.03rem;
    width: .98rem;
    height: .98rem;
    border-radius: 50%;
  }

  .business_head_ewm {
    margin-left: .54rem;
    width: .36rem;
    height: .36rem;
  }

  .business_head_ewm img {
    width: .36rem;
    height: .36rem;
  }

  .business_head_title {
    margin: .04rem 0 0 0;
    text-align: center;
    color: #fff;
    font-size: .2rem;
  }

  .business_money {
    height: .82rem;
    margin-bottom: .15rem;
    border-radius: 0.05rem;
    background: #fff;
    box-shadow: 2px 2px 10px rgba(224, 243, 250, 1);
    text-align: center;
    padding-top: .2rem;
  }

  .business_money_number_xx {
    /*font-size: .24rem !important;*/
  }

  .business_money_number {
    font-size: .2rem;
    font-weight: 700;
  }

  .business_money_number img {
    margin-left: .22rem;
    width: .2rem;
    height: .13rem;
  }

  .brief_intr_box {
    margin-top: .15rem;
  }

  .brief_intr {
    color: #B2B2B2;
    font-size: .12rem;
  }

  /*弹出的二维码*/

  .showView {
    padding: .25rem;
  }

  .showView .user {
    display: flex;
    align-items: center;
  }

  .showView .user > img {
    width: .81rem;
    height: .81rem;
    border-radius: 50%;
  }

  .showView .code {
    width: 2.5rem;
    height: 2.5rem;
  }

  .showView .code > img {
    width: 100%;
    height: 100%;
  }

  .showView .bottom {
    margin-top: .2rem;
    text-align: center;
  }
</style>
