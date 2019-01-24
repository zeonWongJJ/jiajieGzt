<template>
  <div class="orderd">
    <div>
      <van-nav-bar title="订单详情" left-arrow @click-left="onClickLeft"/>
    </div>
    <div>
      <div class="adds">
        <div>
          <img src="../../assets/img/address.png"/>
        </div>
        <div class="addsri">
          <div class="lrm">
            <div>
              联系人：{{addslists.contact_name}}
            </div>
            <div>
              {{addslists.telephone}}
            </div>
          </div>

          <div class="addcor">
            联系地址：{{addslists.house_number}}
          </div>
        </div>
      </div>

      <div class="com_box">
        <ul>
          <li class="list_coms">
            <div class="com_tit">
              <div class="com_tit_img">
                <div>
                  <img src="../../../static/images/store.png"/>
                </div>
                <div>
                  {{addslists.contact_name}}
                </div>
              </div>

            </div>
            <div class="com_com">
              <div>
                <img :src="uploadFileUrl + list_com.subject_img[0]"/>
              </div>
              <div class="com_com_x">
                <div class="com_com_x_tit">
                  {{addslists.order_name}}
                </div>
                <div class="com_com_x_ov">
                  {{addslists.order_info}}
                </div>
                <div class="com_com_x_score2">
                  <div>
                    ￥{{addslists.order_amount}}
                  </div>
                </div>
              </div>

            </div>
          </li>
        </ul>
      </div>

      <div class="oredrs">
        <ul>
          <li>
            <div>订单编号</div>
            <div>{{addslists.order_sn}}</div>
          </li>
          <li>
            <div>支出</div>
            <div style="color: #f00;">{{addslists.order_amount}}</div>
          </li>
          <li>
            <div>支付方式</div>
            <div v-if="addslists.order_pay_way == 'alipay'">
              支付宝
            </div>
            <div v-else-if="addslists.order_pay_way == 'wechat'">
              微信
            </div>
            <div v-else>
              银行卡
            </div>

          </li>
          <li>
            <div>下单时间</div>
            <div>{{addslists.add_time}}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="com_box">
      <ul>
        <li class="list_coms">
          <div class="com_tit">
            <div class="com_tit_img">
              <div>
                <img src="../../../static/images/store.png"/>
              </div>
              <div>
                {{addslists.contact_name}}
              </div>
            </div>

          </div>
          <div class="com_com">
            <div>
              <img :src="uploadFileUrl + list_com.subject_img[0]"/>
            </div>
            <div class="com_com_x">
              <!--<div class="com_com_ri" v-if="addslists.type == 1">
                                  企业
                              </div>-->
              <div class="com_com_x_tit">
                {{addslists.order_name}}
              </div>
              <div class="com_com_x_ov">
                {{addslists.order_info}}
              </div>
              <!--<div class="com_com_x_score">
                                  <div>
                                      <span>评分:</span>
                                      <span class="com_com_x_score_colco">{{addslists.p_score}}</span>
                                  </div>
                                  <div>
                                      <span>已售:</span>
                                      <span class="com_com_x_score_colco">{{addslists.xis}}</span>
                                  </div>
                              </div>-->
              <div class="com_com_x_score2">
                <div>
                  ￥{{addslists.order_amount}}
                </div>
              </div>
            </div>

          </div>
        </li>
      </ul>
    </div>

    <div class="oredrs">
      <ul>
        <li>
          <div>订单编号</div>
          <div>{{addslists.order_sn}}</div>
        </li>
        <li>
          <div>支出</div>
          <div style="color: #f00;">{{addslists.order_amount}}</div>
        </li>
        <li>
          <div>支付方式</div>
          <div v-if="addslists.order_pay_way == 'alipay'">
            支付宝
          </div>
          <div v-else-if="addslists.order_pay_way == 'wechat'">
            微信
          </div>
          <div v-else>
            银行卡
          </div>

        </li>
        <li>
          <div>下单时间</div>
          <div>{{addslists.add_time}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import api from '@/api/api'

  export default {
    data() {
      return {
        addshow: false,
        isshow: false,
        indexs: '',
        num: '',
        uploadFileUrl: api.uploadFileUrl + '/',
        fgshow: false,
        list_com: {
          listname: '',
          payment: '',
          type: '',
          name: "",
          xiangq: "",
          p_score: '',
          xis: '',
          price: '',
          price_y: '',
        },
        fglist: [{
          name: '支付宝',
          imgs: require('../../assets/img/wechat.png'),
        },
          {
            name: '微信',
            imgs: require('../../assets/img/wechat.png'),
          },
          {
            name: '银行',
            imgs: require('../../assets/img/wechat.png'),
          }
        ],
        //				dizhi
        addslists: {},
        list_com: {},
        addnema: '',
        addtel: '',
        addaddres: '',

      }
    },
    beforeUpdate() {
      if (this.dragData) {
        alert('ass')
      } else {
        window.history.go(0)
        alert(111);
      }
    }
    , mounted() { //生命周期
      this.order_getby()
    },
    methods: { //方法
      addsadd() {
        let that = this
        that.addshow = true

      },
      order_getby() {
        let that = this
        that.$fetch('service_get', {}, this.$route.query.its.id).then(rs =>{
          that.addslists = rs.order_info
          that.list_com = rs.entity_row
        })
      },
      onClickLeft() {
        this.$router.push({
          path: '/member'
        })
      },
      //打开
      shows(its, index) {
        let that = this
        that.isshow = true
      },
      //			/刪除
      spilits() {
        let that = this
        that.list_com.splice(that.indexs, 1)
        that.isshow = false
      },
      //			关闭
      xbut() {
        let that = this
        that.isshow = false
      },
      //			付款
      ofgshow() {
        let that = this
        that.fgshow = true
      },
      fgbut() {
        let that = this
        that.fgshow = false
      },
      fgxuz(fgitem, index) {
        let that = this
        that.num = index
      },
      opadd() {
        let that = this
        that.addshow = false
      },
    },

  }
</script>

<style scoped>
  .orderd {
    background: #f5f5f5;
  }

  .commodity {
    background: #FAFAFA;
  }

  .commodity ul {
    background: #FAFAFA;
  }

  .list_coms {
    margin-top: .1rem;
    padding-bottom: .15rem;
    background: #fff;
  }

  .com_li {
    margin-bottom: 0.1rem;
    background: #fff;
    padding: 0 0 0.2rem 0;
  }

  .com_tit {
    height: .38rem;
    line-height: .38rem;
    padding: 0 .1rem;
    background: #fff;
    display: flex;
    justify-content: space-between;
  }

  .com_tit_img {
    display: flex;
    font-size: .14rem;
    font-weight: 600;
    align-items: flex-start;
  }

  .com_tit_img > div img {
    width: .15rem;
    height: .15rem;
    margin-top: .11rem;
    margin-right: .05rem;
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
    flex: 0 0 .9rem;
    margin: .08rem;
    border-radius: .1rem;
    overflow: hidden;
    padding: .05rem 0 0 0;
  }

  .com_com > div:nth-child(1) img {
    width: .9rem;
    height: .9rem;
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
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
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
    margin-right: .05rem;
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

  .but_coms {
    display: flex;
    justify-content: flex-end;
    padding: 0 .15rem;
    background: #fff;
  }

  .but_coms div {
    margin: .08rem 0 .08rem .1rem;
    flex: 0 0 .75rem;
    height: .28rem;
    line-height: .28rem;
    text-align: center;
    padding: .05rem .08rem;
    background: #fff;
    border: 0.01rem solid #B2B2B2;
    border-radius: .3rem;
    font-size: .14rem;
    color: #B2B2B2;
  }

  .but_coms_but1 {
    border: 0.01rem solid #B2B2B2 !important;
    color: #B2B2B2 !important;
  }

  .but_coms_but2 {
    border: 0.01rem solid #f00 !important;
    color: #f00 !important;
  }

  .but_coms_but3 {
    border: 0.01rem solid #f00 !important;
    color: #f00 !important;
  }

  .but_coms_but4 {
    border: 0.01rem solid #18b4ed !important;
    color: #18b4ed !important;
  }

  .po_box {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    /*height: 100%;*/
    background: rgba(0, 0, 0, .3);
    z-index: 9999;
  }

  .po_box_div {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2.75rem;
    height: 1.9rem;
    background: #fff;
    border-radius: .1rem;
    margin: -0.95rem 0 0 -1.375rem;
  }

  .po_box_div_tit {
    color: #18B4ED;
    height: .5rem;
    line-height: .5rem;
    text-align: center;
    border-bottom: .01rem solid #eee;
  }

  .po_box_div_com {
    height: .85rem;
    line-height: .85rem;
    text-align: center;
    font-size: .16rem;
    border-bottom: .01rem solid #eee;
  }

  .po_box_but {
    display: flex;
  }

  .po_box_but div {
    flex: 0 0 49%;
    text-align: center;
    height: .5rem;
    line-height: .5rem;
  }

  .po_box_but div:nth-child(2) {
    border-left: .01rem solid #eee;
    color: #18B4ED;
  }

  .adds {
    display: flex;
    margin: .1rem 0 0 0;
    padding: 0 .15rem;
    background: #fff;
  }

  .adds > div:nth-child(1) {
    flex: 0 0 .5rem;
    height: 1rem;
    line-height: 1rem;
  }

  .adds > div:nth-child(1) img {
    width: .2rem;
  }

  .addsri {
    flex: 0 0 1;
  }

  .lrm {
    display: flex;
    margin: .2rem 0 .05rem 0;
    justify-content: space-between;
  }

  .lrm div:nth-child(1) {
    flex: 0 0 1.9rem;
  }

  .addcor {
    flex: 0 0 2.8rem;
  }

  /*//dingdan*/

  .oredrs {
    margin-top: .1rem;
    background: #FFF;
  }

  .oredrs ul {
    padding: .1rem 0;
  }

  .oredrs ul li {
    display: flex;
    justify-content: space-between;
    padding: 0 .15rem;
    height: .34rem;
    line-height: .34rem;
  }

  .order_but {
    width: 100%;
    height: .67rem;
    line-height: .67rem;
    position: absolute;
    bottom: 0;
    background: #fff;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .order_but div {
    margin: .08rem 0 .08rem .1rem;
    flex: 0 0 .75rem;
    height: .28rem;
    line-height: .28rem;
    text-align: center;
    padding: .05rem .08rem;
    background: #fff;
    border: 0.01rem solid #B2B2B2;
    border-radius: .3rem;
    font-size: .14rem;
    color: #B2B2B2;
    margin-right: .15rem;
  }

  .but_coms_but1 {
    border: 0.01rem solid #B2B2B2 !important;
    color: #B2B2B2 !important;
  }

  .but_coms_but2 {
    border: 0.01rem solid #f00 !important;
    color: #f00 !important;
  }

  .but_coms_but3 {
    border: 0.01rem solid #f00 !important;
    color: #f00 !important;
  }

  .but_coms_but4 {
    border: 0.01rem solid #18b4ed !important;
    color: #18b4ed !important;
  }

  .fug_box {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    /*height: 100%;*/
    background: rgba(0, 0, 0, .3);
    z-index: 9999;
  }

  .fug_box ul li {
    display: flex;
    justify-content: space-between;
    height: .55rem;
    line-height: .55rem;
    padding: 0 .1rem;
    background: #FFF;
    border-bottom: .01rem solid #eee;
    align-items: center;
  }

  .fug_box ul li div:nth-child(1) {
    display: flex;
    align-items: center;
  }

  .fug_box ul li div:nth-child(1) img {
    width: .24rem;
    height: .24rem;
    margin-right: .1rem;
  }

  .fg_imgsb {
    flex: 0 0 .2rem;
    height: .2rem;
    background: url(../../assets/img/checked.png) no-repeat;
    background-size: .18rem;
  }

  .fug_box_po {
    position: absolute;
    /*height: 2.2rem;*/
    overflow: hidden;
    width: 90%;
    margin: 0 5%;
    background: #fff;
    bottom: .15rem;
    border-radius: .1rem;
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter,
  .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */

  {
    transform: translateY(2rem);
    opacity: 0;
  }

  .fg_fangs {
    height: .44rem;
    line-height: .44rem;
    text-align: center;
    border-bottom: .01rem solid #eee;
  }

  .addsa {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    /*height: 100%;*/
    z-index: 9999;
    background: rgba(0, 0, 0, .3);
  }

  .addsa_div {
    background: #fff;
    border-radius: .1rem;
    width: 90%;
    padding: 0 .1rem;
    margin: .65rem auto;
    height: 5rem;
    overflow: auto;
  }

  .addsa_div ul li {
    border-bottom: .01rem solid #eee;
    padding: .1rem 0;
  }
</style>
