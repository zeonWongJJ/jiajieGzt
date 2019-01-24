<template>
  <div class="orderd">
    <van-nav-bar title="提交订单" left-arrow @click-left="onClickLeft"/>
    <div class="body">
      <div class="adds">

        <div class="addsri" v-if="addnema == ''" @click.stop="addsadd_router">
          <div class="lrm">
            <div>
              添加地址
            </div>
          </div>
          <div class="addcor">
            <!--请选择联系地址-->
          </div>
        </div>
        <div class="addsri" @click="addsadd()" v-else>
          <div class="lrm">
            <div>
              联系人：{{addnema}}
            </div>
            <div>
              {{addtel}}

            </div>
          </div>

          <div class="addcor">
            联系地址：{{addaddres}}{{contact_address_name}}
          </div>
        </div>
        <div class="right"></div>
      </div>

      <div class="com_box">
        <ul>
          <li class="list_coms">
            <div class="com_com">
              <div>
                <img src="../../assets/img/logo_h.png" v-if="lists.service_img == ''"/>
                <img :src="uploadFileUrl + lists.service_img[0]" v-else/>
              </div>
              <div class="com_com_x">
                <div class="com_com_x_score">
                  <div>
                    <span style="font-size: .16rem;">{{lists.service_level_3_name}}</span>
                  </div>
                </div>
                <div class="com_com_x_score_colco" v-clampy="3" v-html="replaceStyle(lists.service_info)"></div>
                <div class="com_com_x_score_colco">已售<span>&nbsp;&nbsp;{{lists.service_sold}}</span></div>
                <div class="com_com_x_score2">
                  <div v-if="lists.pay_way == 1">
                    ￥{{lists.service_remuneration}}/小时
                  </div>
                  <div v-else>
                    ￥{{lists.service_remuneration}}/次
                  </div>
                </div>
              </div>

            </div>
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

      <div class="time" @click="showTime = true">
        <div>上门时间</div>
        <div>{{getTime(currentDate)}}</div>
      </div>
      <div class="time">
        <div>服务时长</div>
        <div @click="sjshow = !sjshow" class="sjshow_on">
          <!--<input v-model="long" type="number" name="long" id="long"/>-->
          {{long}}
        </div>
      </div>

      <div class="notime">
        <div>下单留言：</div>

        <div class="input">
          <textarea name="" v-model="end" rows="4" cols="" placeholder="如有特殊要求，请在此填写附信"></textarea>
        </div>
      </div>
      <div class="money">
        <div>小计：￥</div>
        <div class="num">{{money}}</div>
      </div>
      <div class="oredrs">
        <ul>
          <li>
            <div>
              可用{{user_balance}}余额抵扣 {{money}} 元
            </div>
            <div>
              <input type="checkbox" id="two" value="two" @click="whenChangeType(1)" style="opacity: 0;">
              <label for="two" :class="{ 'labelimg' : isA, 'labelimg2': !isA}"></label>
            </div>
          </li>
          <li>
            <div>
              可用 {{cons_jifen}} 积分抵扣 {{money}} 元
            </div>
            <div>
              <!--<input type="checkbox" id="one" value="one" v-model="picked" @click="toggle2" style="opacity: 0;">-->
              <input type="checkbox" id="one" value="one" @click="whenChangeType(2)" style="opacity: 0;">
              <label for="one" :class="{ 'labelimg' : isA2, 'labelimg2': !isA2}"></label>
            </div>
          </li>
        </ul>
      </div>

      <!--弹出窗-->
      <div class="fug_box" v-show="fgshow" @click.stop="fgbut()">
        <transition name="slide-fade">
          <div class="fug_box_po">
            <div class="fg_fangs">
              选择支付方式
            </div>
            <ul>
              <!--<li @click.stop="fgxuz(fgitem,index)">
                          <div>
                              <img src="../../assets/img/alipay.png" />
                              <span>
                                  {{fgitem.name}}
                              </span>
                          </div>
                          <div :class="{fg_imgsb : index == num}">

                          </div>
                      </li>-->
              <!--<li @click.stop="fgxuz(fgitem,index)">
                          <div>
                              <img src="../../assets/img/wechat.png" />
                              <span>
                                  {{fgitem.name}}
                              </span>
                          </div>
                          <div :class="{fg_imgsb : index == num}">

                          </div>
                      </li>
                      <li @click.stop="fgxuz(fgitem,index)">
                          <div>
                              <img src="../../assets/img/unionpay.png" />
                              <span>
                                  {{fgitem.name}}
                              </span>
                          </div>
                          <div :class="{fg_imgsb : index == num}">

                          </div>
                      </li>-->

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
      <van-popup v-model="showTime" position="bottom">
        <van-datetime-picker v-model="currentDate" confirm-button-text="完成" @change="setTime($event)"
                             @cancel="closeTime"
                             @confirm="timeSuccess" cancel-button-text="返回" type="year-month-day-hour-minute"
                             :min-date="minDate" :formatter="formatter"/>

      </van-popup>
      <div class="bot_b">
        <div>
          <div>
            总价：
            <span v-if="!isA2 && !isA">￥ {{money}}  元</span>
            <span v-else>{{nums}} 元</span>
          </div>
          <div @click="addzhifu()">
            支付
          </div>
        </div>
      </div>

      <div class="addsa" v-show="addshow" @click.stop="addshow = false">
        <div class="addsa_div">
          <ul>
            <li v-for="(aditem,index) in addslists" @click="indexadd(aditem,index)">
              <div class="addsri">
                <div class="lrm">
                  <div>
                    联系人：{{aditem.contact_name}}
                  </div>
                  <div>
                    {{aditem.telephone_number}}
                  </div>
                </div>

                <div class="addcor">
                  联系地址：{{aditem.contact_house_number}}{{contact_address_name}}
                </div>
              </div>
            </li>
            <li>
              <div style="text-align: center;font-size: .16rem;" @click.stop="x_adds()">
                添加新地址
              </div>
            </li>
          </ul>

        </div>
      </div>
    </div>
    <van-popup v-model="sjshow" position="bottom" :overlay="false">
      <van-picker show-toolbar title="请选择服务时长" :columns="columns" @confirm="onconfirm" @cancel="oncancel"
                  @change="onchange"/>
    </van-popup>
    <!--<div v-show="!onshows" style="position: fixed;top: 0;left: 0;right: 0;bottom: 0;width: 100%;height: 100%;background: rgba(0,0,0,0.5); z-index: 999999;">
        <div style="position: absolute;top: 50%;left: 50%;margin: -0.2rem 0 0 -0.2rem;">
            <van-loading type="spinner" />
        </div>
    </div>-->
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
        message: '1',
        columns: [
          '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11',
        ],
        sjshow: false,
        btnState: {
          payBtn: true,
          postPayBtn: true
        },
        picked: 0,
        picked1: 1,
        isA: false,
        isA2: false,
        lists: {},
        imgst: '',
        cons_jifen: '',
        user_balance: '',

        nums: -1,
        order_deductible_type: 0,
        fuck: '123123123',
        onshows: true, //防止多次点击
        addshow: false,
        isshow: false,
        indexs: '',
        num: 0,
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
        listtype: 'alipay',

        //				dizhi
        addslists: [],
        addnema: '',
        contact_lal: '',
        addtel: '',
        addaddres: '',
        contact_address_name: '',

        token: '',
        minDate: this.addMin(),
        showTime: false,

        currentDate: this.addMin(),
        itemdata: '',
        long: 1,
        end: '',
        wechat: this.isWechat(),
        getTimes: '',
        money: 0.00
      }
    },
    mounted() { //生命周期
      this.token = this.$store.state.token
      this.lists = JSON.parse(this.$route.query.lists)
      if (this.lists.pay_way == 1) {
        this.money = this.lists.service_remuneration * this.long
      } else {
        this.money = this.lists.service_remuneration
      }
      this.init();
      this.oaddlists();
    },
    //  watch: {
    //    'long': function (newValue, old) {
    //      if (newValue % 1 !== 0 || newValue < 0) { //整数
    //        this.long = old
    //      }
    //    }
    //  },
    // computed: {
    // 	money() {
    // 		if(this.lists.pay_way == 1) {
    // 			return this.lists.service_remuneration * this.long
    // 		} else {
    // 			return this.lists.service_remuneration
    // 		}
    // 	}
    // },
    watch: {
      long(newVal) {
        this.money = parseFloat(this.lists.service_remuneration * newVal)
      }
    },
    methods: { //方法
      formatter(type, value) {
        if (type === 'year') {
          return `${value}年`;
        } else if (type === 'month') {
          return `${value}月`
        } else if (type === 'day') {
          return `${value}日`
        } else if (type === 'hour') {
          return `${value}时`
        } else if (type === 'minute') {
          return `${value}分`
        }
        return value;
      },

      onchange(picker, value, index) {
        this.message = value

      },
      //  	确定
      onconfirm(picker, value, index) {
        this.long = this.message
        this.sjshow = false
      },
      //  	取消
      oncancel() {
        this.sjshow = false
      },

      replaceStyle(str) {
        const reg = /<[^<>]+>/g
        return str.replace(reg, '');
      },
      isWechat() {
        var ua = navigator.userAgent.toLowerCase();
        return ua.indexOf('micromessenger') != -1;
      },
      addMin() {
        return new Date(new Date().valueOf() + 30 * 60 * 1000)
      },
      onClickLeft() {
        let that = this
        that.$router.back(-1)
      },
      init() {
        let that = this
        that.$fetch('user_info_get',{}).then(rs =>{
          this.cons_jifen = parseFloat(rs.user_score)
          this.user_balance = parseFloat(rs.user_balance)
        })
      },
      //显示选择地址
      addsadd() {
        let that = this
        that.addshow = true
      },
      //选择上门时间
      setTime(time) {
        //     	 this.currentDate = time
        var str = time.getValues();
        this.getTimes = str[0] + str[1] + str[2] + str[3] + str[4];
        this.getTimes = utils.convertDataFormat(this.getTimes);
        this.getTimes = new Date(this.getTimes.replace(/-/g, '/'));
      },
      timeSuccess() {
        if (!this.getTimes) {
          this.currentDate = this.addMin();
        } else {
          this.currentDate = this.getTimes;
        }
        this.showTime = false
      },
      closeTime() {
        this.showTime = false
      },
      //转换时间
      getTime(time) {
        var data = new Date(time)
        if (data) {
          var year = data.getFullYear();
          var month = this.add0(data.getMonth() + 1);
          var day = this.add0(data.getDate());
          var hour = this.add0(data.getHours());
          var minute = this.add0(data.getMinutes());
          return year + '年' + month + '月' + day + '日' + hour + '时' + minute + '分'
        } else {
          console.log('时间格式有误：' + time);
          return ''
        }
      },
      x_adds() {
        let lists = 2
        this.$router.push({
          path: 'editadd',
          query: {
            lists
          }
        })
      },
      add0(time) {
        var time = Number(time);
        if (time < 10) {
          time = '0' + time
        }
        return time
      },

      //抵扣
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
            if (that.money > that.cons_jifen) {
              that.nums = (that.money - that.cons_jifen).toFixed(2)
            } else {
              that.nums = 0
            }
          } else {
            that.isA2 = false
            that.picked = 0
            that.nums = that.money
          }

        } else if (newValue == 1) {
          if (that.isA == that.order_deductible_type) {
            that.picked = 1
            that.isA = !this.isA
            that.isA2 = false
            if (that.money > that.user_balance) {
              that.nums = (that.money - that.user_balance).toFixed(2)
            } else {
              that.nums = 0
            }
          } else {
            that.isA = false
            that.picked = 0
            that.nums = that.money
          }
        } else {
          //					alert(that.order_deductible_type)
        }
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
      //    抵扣支付
      addzhifu() {
        if (this.nums * 100 === 0) {
          this.pay('alipay');
        } else {
          this.fgshow = true
        }
      },
      fgbut_k() {

      },
      fgbut() {
        let that = this
        that.fgshow = false
      },
      //			支付选择
      fgxuz(fgitem, index) {
      	console.log(fgitem);
        let that = this
        that.listtype = fgitem.type
        that.num = index

      },
      addsadd_router() {
        let lists = 2
        this.$router.push({
          path: 'editadd',
          query: {
            lists
          }
        })
      },
      //			地址列表
      oaddlists() {
        let that = this
        let forms = {}
        forms.row = 50
        that.$fetch('user_address_list', forms).then(rs =>{
          that.addslists = rs
          if (that.addslists.length > 0) {
            let arr = that.addslists.reverse()[0]
            that.addnema = arr.contact_name
            that.addtel = arr.telephone_number
            that.addaddres = arr.contact_house_number
            that.contact_lal = arr.contact_lal
            that.contact_address_name = arr.contact_address_name
          }
        })
      },
      indexadd(aditem, index) {
        let that = this
        that.addnema = aditem.contact_name
        this.contact_lal = aditem.contact_lal
        that.addtel = aditem.telephone_number
        that.addaddres = aditem.contact_house_number
        that.contact_address_name = aditem.contact_address_name
      },

      // 统一支付
      pay(service_price_type = null) {
        if (this.long < 1) {
          return this.$toast('请选择服务时长')
        }
        let list = {
          contact_name: this.addnema,
          address_name: this.addaddres + this.contact_address_name,
          order_phone: this.addtel,
          service_length: this.long,
          service_message: this.end,
          order_lal: this.contact_lal
          //service_price_type: this.listtype
        }
        list.contact_appointment_at = utils.convertDataFormat(this.getTime(this.currentDate))

        if (null === service_price_type) {
          if (!this.listtype) {
            return this.$toast('请选择支付类型');
          }
          list.service_price_type = this.listtype
        } else {
          list.service_price_type = service_price_type
        }
        list.order_deductible_type = 0;
        if (this.isA) {
          list.order_deductible_type = 1;
        } else if (this.isA2) {
          list.order_deductible_type = 2;
        }
//				      console.log(list)
//				      return
        // 请求订单
        if (this.onshows) {
          this.onshows = false
          this.$fetch('user_buy_service', list, this.lists.id).then(rs =>{
            let order_sign = rs.order_sign; // 订单签名
            let order_sn = rs.order_sn; // 订单流水号
            window.location.href = `http://jiajie-server.7dugo.com/order.pay?order_sign=${order_sign}&order_sn=${order_sn}`
          })
      		this.onshows = true
        }
      }
    },
  }
</script>

<style scoped>
  .orderd {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background: #f5f5f5;
  }

  .body {
    height: calc(100% - 1rem);
    overflow-y: auto;
  }

  .adds {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: .05rem 0 0 0;
    padding-right: 0.15rem;
    background: #fff;
  }

  .adds .right {
    width: 0.1rem;
    height: 0.2rem;
    background: url(../../assets/img/more_gray.png) no-repeat;
    background-size: 0.1rem 0.2rem;
  }

  .adds .addsri {
    padding: .15rem;
  }

  .lrm {
    display: flex;
    justify-content: space-between;
  }

  .lrm div:nth-child(1) {
    flex: 0 0 1.9rem;
  }

  .addcor {
    flex: 0 0 2.8rem;
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
  }

  .com_com_x_score2 {
    display: flex;
  }

  .com_com_x_score2 > div:nth-child(1) {
    font-size: .18rem;
    color: #ff3434;
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

  .time {
    display: flex;
    justify-content: space-between;
    background: #fff;
    border-top: 0.01rem solid #eee;
    padding: 0.15rem;
  }

  .sjshow_on {
    flex: 1;
    text-align: center;
  }

  .sjshow_on:after {
    content: '';
    width: 0.1rem;
    height: 0.2rem;
    background: url(../../assets/img/more_gray.png) no-repeat !important;
    background-size: 0.1rem 0.2rem;
  }

  .time:after {
    content: '';
    width: 0.1rem;
    height: 0.2rem;
    background: url(../../assets/img/more_gray.png) no-repeat;
    background-size: 0.1rem 0.2rem;
  }

  .time input {
    border: 0;
    width: 100%;
  }

  .notime textarea {
    border: 0.01rem solid #eee;
    border-radius: 0.1rem;
    padding: 0.05rem;
    width: 100%;
  }

  .notime {
    display: flex;
    justify-content: space-between;
    background: #fff;
    border-top: 0.01rem solid #eee;
    padding: 0.15rem;
  }

  .notime > .input {
    flex: 1;
  }

  .money {
    display: flex;
    justify-content: flex-end;
    background: #fff;
    border-top: 0.01rem solid #eee;
    padding: 0.15rem;
  }

  .money > .num {
    color: #ff3434;
  }
</style>
