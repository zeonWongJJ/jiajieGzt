<template>
  <div class="orderd">
    <div>
      <van-nav-bar title="订单详情" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="adds">
      <div>
        <!--<img src="../../assets/img/address.png" />-->
      </div>
      <div class="addsri">
        <div class="lrm">
          <div>
            联系人：{{lists.demand_contact_name}}
          </div>
          <div>
            {{lists.demand_telephone}}
          </div>
        </div>

        <div class="addcor">
          <div>联系地址：</div>
          <div>{{lists.demand_address_name}}{{lists.demand_house_number}}</div>
        </div>
      </div>
    </div>

    <div class="com_box">
      <ul>
        <li class="list_coms">
          <!--<div class="com_tit">
                            <div class="com_tit_img">
                                <div>
                                    <img src="../../../static/images/store.png" />
                                </div>
                                <div>
                                    {{list_com.listname}}
                                </div>
                            </div>

                        </div>-->
          <div class="com_com">
            <div>
              <img :src="lists.demand_img.length > 0 ? uploadFileUrl + lists.demand_img[0] : require('../../assets/img/logo_h.png')"/>
            </div>
            <div class="com_com_x">
              <div class="com_com_x_score">
                <div>
                  <span style="font-size: .16rem;">{{lists.subject_title}}</span>
                </div>
              </div>
              <div class="com_com_x_score">
                <div>
									<span class="com_com_x_score_colco">
										{{lists.demand_info}}
									</span>
                </div>
              </div>
              <div class="com_com_x_score2">
                <div>
                  ￥{{lists.price}}
                </div>
              </div>
            </div>

          </div>
          <!--anniu-->
          <!--<div class="but_coms">
                        <div v-if="its.payment == 11" class="but_coms_but1" @click="shows(its,index)">取消订单</div>
                        <div v-if="its.payment == 11" class="but_coms_but3" @click="shows(its,index)">去付款</div>
                        <div v-else-if="its.payment == 12" class="but_coms_but2" @click="menvaluate(its,index)">评价</div>
                        <div  v-else-if="its.payment == 14"  class="but_coms_but4" @click="shows(its,index)">联系商家</div>
                        <div v-else="its.payment == 13" class="but_coms_but1" @click="shows(its,index)">
                            删除订单
                        </div>

                    </div>-->
          <!--弹出窗-->
          <div class="po_box" v-show="isshow">
            <div class="po_box_div">
              <div class="po_box_div_tit">提示</div>
              <div class="po_box_div_com" v-if="indexs ">
                确定要删除此订单？
              </div>
              <div class="po_box_div_com" v-else>
                确定要取消此订单？
              </div>
              <div class="po_box_but">
                <div @click.stop="xbut()">取消</div>
                <div @click.syop="spilits(its,index)">确认</div>
              </div>
            </div>
          </div>

        </li>

      </ul>
    </div>

    <div
      style="display: flex;justify-content: space-between; background: #fff;border-top: 0.01rem solid #eee;padding: 0.15rem ;">
      <div>服务时间</div>
      <div>
        <!--{{getTime(lists.demand_service_at)}}-->
          {{lists.demand_service_at}}
      </div>
    </div>

    <div class="oredrs">
      <ul>
        <li>
          <div>可用 {{cons_jifen}} 积分抵扣 <span v-if="lists.price > cons_jifen">{{cons_jifen}}</span><span v-else>{{lists.price}}</span>元
          </div>
          <div>
            <!--<input type="checkbox" id="one" value="one" v-model="picked" @click="toggle2" style="opacity: 0;">-->
            <input type="checkbox" id="one" value="one" @click="whenChangeType(2)" style="opacity: 0;">
            <label for="one" :class="{ 'labelimg' : isA2, 'labelimg2': !isA2}">
            </label>
          </div>
        </li>
        <li>
          <div>可用{{user_balance}}余额抵扣 <span v-if="lists.price >= user_balance">{{user_balance}}</span><span v-else> {{lists.price}}</span>元
          </div>
          <div>
            <input type="checkbox" id="two" value="Two" @click="whenChangeType(1)" style="opacity: 0;">
            <label for="two" :class="{ 'labelimg' : isA, 'labelimg2': !isA}">
            </label>
          </div>
        </li>
      </ul>
    </div>

    <!--弹出窗-->
    <div class="fug_box" v-show="fgshow" @click.stop="fgbut()">
      <transition name="slide-fade">
        <div class="fug_box_po" v-show="fgshow">
          <div class="fg_fangs">
            选择支付方式
          </div>
          <ul>
            <li v-for="(fgitem,index) in fglist" @click.stop="fgxuz(fgitem,index)"
                v-if="fgitem.wechat || (!fgitem.wechat && !wechat)">
              <div>
                <img :src="fgitem.imgs"/>
                <span>
									{{fgitem.name}}
								</span>
              </div>
              <div :class="{fg_imgsb : index == num}">

              </div>
            </li>
          </ul>
          <div class="fg_fangs" @click="pay(null)">
            确 定 支 付
          </div>
        </div>
      </transition>
    </div>
    <div class="bot_b">
      <div>
        <div>
          总价：
          <span v-if="!nums">￥ {{lists.price}}  元</span>
          <span v-if="nums">{{nums}} 元</span>
        </div>
        <div @click="fgbut_k()">
          支付
        </div>
      </div>
    </div>
    	<loading :onshows='onshows'></loading>
  </div>

</template>

<script>
  import api from '@/api/api'
  import utils from '@/utils/utils'
	import loading from '@/components/Loading'
	export default {
		components: {
			loading

		},
    data() {
      return {
      	onshows:true,// //防止多次点击
        picked: 0,
        picked1: 1,
        isA: false,
        isA2: false,
        lists: JSON.parse(this.$route.query.lists),
        imgst: '',
        cons_jifen: '',
        user_balance: '',

        nums: false,
        order_deductible_type: 0,
        fuck: '123123123',

        addshow: false,
        isshow: false,
        indexs: '',
        num: null,
        uploadFileUrl: api.uploadFileUrl + '/',
        fgshow: false,

        fglist: [{
          name: '支付宝',
          type: 'alipay',
          imgs: require('../../assets/img/alipay.png'),
          wechat: false
        },
          {
            name: '微信',
            type: 'wechat',
            imgs: require('../../assets/img/wechat.png'),
            wechat: true
          },
          {
            name: '银行',
            type: 'bankcard',
            imgs: require('../../assets/img/unionpay.png'),
            wechat: false
          }
        ],
        listtype: '',
        //				dizhi
        addslists: [],
        addnema: '',
        addtel: '',
        addaddres: '',
        token: this.$store.state.token,
        wechat: false,
        is_all_dk: false // 是否完全抵扣
      }
    },
    mounted() { //生命周期
      this.jifen()
      if (utils.is_weixin()) {
        this.payType = 'wechat';
      }
    },
    methods: { //方法
      /**
       * 统一支付
       * @param demand_price_type
       * @returns {*|VanToast}
       */
      pay(demand_price_type = null) {
      	var data = this.lists;
        if (null === demand_price_type) {
          if (!this.listtype) {
            return this.$toast('请选择支付类型');
          }
          data.demand_price_type = this.listtype
        } else {
          data.demand_price_type = demand_price_type
        }
        if (this.lists.price >= this.cons_jifen) {
          data.demand_remuneration = this.lists.price - this.cons_jifen
          data.demand_remuneration.toFixed(2)
        }else{
        	data.demand_remuneration = this.lists.price
        }
        data.order_deductible_type = this.picked

        data.demand_service_at = utils.convertDataFormat(this.lists.demand_service_at)
//				console.log(data)
//				return
				if(this.onshows){
					this.onshows = false
					this.$fetch('demand_add', data).then(rs =>{
            let order_sign = rs.order_sign
            let order_sn = rs.order_sn
            window.location.href = `http://jiajie-server.7dugo.com/order.pay?order_sign=${order_sign}&order_sn=${order_sn}`
					})
				}
      },
      isWechat() {
        var ua = navigator.userAgent.toLowerCase();
        var isWeixin = ua.indexOf('micromessenger') != -1;
        if (isWeixin) {
          return true;
        } else {
          return false;
        }
      },
      jifen() {
        let that = this
        that.$fetch('user_info_get',{}).then(rs =>{
        	if (rs.error == 0) {
	          that.cons_jifen = Number(rs.data.user_score)
	          that.user_balance = Number(rs.data.user_balance)
	        } else {
	          that.$toast(rs.msg[0]);
	        }
        })
      },
      whenChangeType(newValue) {
        let that = this
        if (newValue == that.order_deductible_type) {
          //					newValue =	 this.order_deductible_type = 0;
          //					this.picked = 0

        } else if (newValue == 2) {
          if (that.isA2 == that.order_deductible_type) {
            that.picked = 2
            that.isA2 = !that.isA2
            that.isA = false
            if (that.lists.price > that.cons_jifen) {
              let nums = ''
              nums = that.lists.price - that.cons_jifen
              that.nums = nums.toFixed(2)
//							that.nums = that.lists.price - that.cons_jifen
            } else {
              that.nums = '0'
              that.is_all_dk = true
            }
          } else {
            that.isA2 = false
            that.picked = 0
            that.nums = that.lists.price
          }

        } else if (newValue == 1) {
          if (that.isA == that.order_deductible_type) {
            that.picked = 1
            that.isA = !this.isA
            that.isA2 = false
            that.nums = '0'
            if (that.lists.price > that.user_balance) {
              let nums = ''
              nums = that.lists.price - that.user_balance
              that.nums = nums.toFixed(2)
            } else {
              that.nums = '0'
              that.is_all_dk = true
            }
          } else {
            that.isA = false
            that.picked = 0
            that.nums = that.lists.price
          }
        } else {

          alert(that.order_deductible_type)
        }
        //				newValue = this.order_deductible_type ;
        // 删除已上传的图片
      },
      onClickLeft() {
      	this.$router.back(-1)
//      let that = this
//      	that.$router.push({
//						path: '/release_dem_rele',
//						query: {
//							lists:this.lists
//						}
//					})

//      this.axios({
//        url: api.file_remove,
//        method: 'post',
//        data: {
//          files: this.lists.demand_img
//        }
//      }).then(rs => {
//        that.$router.back(-1)
//      })
      },
      //转换时间
      getTime(time) {
        var data = new Date(time.replace(/-/g, '/'))
        if (data) {
          var year = data.getFullYear();
          var month = this.add0(data.getMonth() + 1);
          var day = this.add0(data.getDate());
          var hour = this.add0(data.getHours());
          var minute = this.add0(data.getMinutes());
          return year + '-' + month + '-' + day + ' ' + hour + ':' + minute
        } else {
          console.log('时间格式有误：currentDate=' + this.currentDate);
          return ''
        }
      },
      add0(time) {
        var time = Number(time);
        if (time < 10) {
          time = '0' + time
        }
        return time
      },
      toggle() {
        let that = this
        that.isA = !that.isA
        that.isA2 = false

      },
      toggle2() {
        let that = this
        that.isA2 = !that.isA2
        that.isA = false

        if (that.lists.price <= that.cons_jifen) {
          that.nums = '0'
        } else {
          that.nums = that.lists.price
        }

      },
      fgbut_k() {
        if (this.is_all_dk) {
        	if(this.onshows){
        		this.pay('alipay')
        	}
        } else {
          this.fgshow = true
        }
      },
      fgbut() {
        let that = this
        that.fgshow = false
      },
      //			支付选择
      fgxuz(fgitem, index) {
        let that = this
        that.listtype = fgitem.type
        that.num = index
      },
      //提交zhifu
      // ubmission() {
      //   let that = this;
      //   let lists = that.lists
      //   console.log(that.lists)
      //   //				let isnum = ''
      //   lists.demand_price_type = that.listtype
      //   //				lists.order_Deductible_count = that.price
      //   if (that.lists.price >= that.cons_jifen) {
      //     lists.demand_remuneration = that.lists.price - that.cons_jifen
      //     lists.demand_remuneration.toFixed(2)
      //   }
      //   lists.demand_remuneration = that.lists.price
      //   lists.order_deductible_type = that.picked
      //   // lists.demand_service_at = lists.demand_service_at/1000
      //
      //   var qs = require('qs');
      //   that.axios({
      //     method: 'post',
      //     headers: {
      //       "Content-Type": "application/x-www-form-urlencoded"
      //     },
      //     url: api.demand_add,
      //     data: qs.stringify(lists) //传参变量
      //   })
      //     .then(function (res) {
      //       if (res.data.error == 0) {
      //         let order_sign = res.data.data.order_sign
      //         let order_sn = res.data.data.order_sn
      //         window.location.href = `http://7dugo.com/order.pay?order_sign=${order_sign}&order_sn=${order_sn}`
      //       } else {
      //         //					this.$toast(res.data.msg)
      //         that.$toast(res.data.msg);
      //       }
      //     })
      // },
    },
  }

</script>

<style scoped>
  .orderd {
    background: #f5f5f5;
  }

  .adds {
    display: flex;
    margin: .1rem 0 0 0;
    padding: 0 .15rem;
    background: #fff;
  }

  .adds > div:nth-child(1) {
    flex: 0 0 0rem;
    height: 1rem;
    line-height: 1rem;
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
    display: flex;
  }

  .addcor div:nth-child(1) {
    flex: 0 0 1;
  }

  .addcor div:nth-child(1) {
    flex: 0 0 .7rem;
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
    font-size: .14rem;
    margin-bottom: .05rem;
  }

  .com_com_x_score_colco {
    margin-right: .05rem;
    color: #B2B2B2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
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

  .bot_b {
    width: 100%;
    position: absolute;
    bottom: 0;
    height: .54rem;
    line-height: .54rem;
    background: #fff;
  }

  .bot_b > div {
    display: flex;
    justify-content: flex-end;
    height: .54rem;
    line-height: .54rem;
  }

  .bot_b > div div:nth-child(1) {
    font-size: .14rem;
  }

  .bot_b > div div:nth-child(1) span {
    font-size: .16rem;
    color: #f00;
  }

  .bot_b > div div:nth-child(2) {
    flex: 0 0 1.2rem;
    color: #fff;
    margin-left: .1rem;
    font-size: .16rem;
    text-align: center;
    background: #f00;
  }

  .labelimg {
    display: inline-block;
    background: url(../../assets/img/chekcedee.png) no-repeat;
    width: .18rem;
    height: .18rem;
    background-size: .18rem;
    margin-top: .08rem;
  }

  .labelimg2 {
    display: inline-block;
    background: url(../../assets/img/check.png) no-repeat;
    width: .18rem;
    height: .18rem;
    background-size: .18rem;
    margin-top: .08rem;
  }
</style>
