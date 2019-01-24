<template>
  <div class="user_order">
    <ul class="top_nav_ul">
      <li v-for="(item,index) in tabs" :class="{li_style:index == num}" @click="tab(index,1)">
        <div class="top_nav_img">{{item}}</div>
      </li>
    </ul>
    <div class="personal">
      <scroller :on-infinite="infinite" ref="list_com_user">
        <div style="height: 1px;"></div>
        <!--必须要有1高度的空元素-->
        <div v-for="(its,index) in list_com" class="list_coms" @click="detailst(its.order_detail.order_sn)">
          <div class="com_tit">
            <div class="com_tit_img">
              <div>
                订单编号：{{its.order_detail.order_sn}}
              </div>
              <div>
                <order-state :order_info="its" :is_store_page="false"></order-state>
              </div>
            </div>

            <!--<order-state :order_info="its" :is_store_page="true"></order-state>-->
          </div>
          <div class="com_com">
            <div style="position: relative;">
              <div class="sys" v-if="its.order_detail.is_sys_order" style="position: absolute;top: 0;right: 0;background: #f00;color: #fff;font-size: .12rem;">周期</div>
              <img src="../../../assets/img/logo_h.png" v-if="its.order_detail.order_pic == ''" />
              <img :src="uploadFileUrl + its.order_detail.order_pic[0]" v-else/>
            </div>
            <div class="com_com_x">
              <!--<div class="com_com_ri" v-if="its.type == 1">
                              企业
                          </div>-->
              <div class="com_com_x_tit" style="font-weight: bold;">
                <!--{{its.order_detail.order_name}}-->
              </div>
              <div class="com_com_x_ov" v-html="replaceStyle(its.order_detail.order_info)"></div>
              <!--<div class="com_com_x_score">
                              <div>
                                  <span>{{its.order_sn}}</span>
                              </div>
                         </div>-->
              <div class="ovh" style="width:2.6rem; overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                <span>{{its.server_info.address_name}}</span>
              </div>
              <div class="com_com_x_score2">
                <div>
                  ￥{{its.payment.order_amount}}
                </div>
              </div>
            </div>

          </div>
          <div class="director" v-if="its.server_info.appointed_row">

            <div style="display: flex;border-bottom: 0.01rem solid #f8f8f8; padding: 0.08rem .1rem;">
              <div class="img"><img src="../../../assets/img/mmen.png" alt="" /></div>
              <div class="left">
                <!--<render-appointed-row :member="its.appointed_row"></render-appointed-row>-->
                <span v-for="(item, i) in its.server_info.appointed_row">
                        <span :class="{i_item : 0 == i } ">{{item.store_director}}</span>,
                  <!--<span>{{item.store_director}}</span>-->
                </span>
              </div>
            </div>
            <div class="right">
              <div>下单时间:{{its.time_record.add_time}}</div>
              <div>
                服务时间:{{its.time_record.contact_appointment_at}}
              </div>
            </div>
          </div>
          <!--anniu-->
          <div class="but_coms" style="display: flex; justify-content:flex-end; align-items:center">
            <template v-if="its.order_detail.order_type == 4">
              <div class="but_coms_but1" @click.stop="shows(its)">
                取消订单
              </div>
            </template>
            <template v-else>
              <div v-if="['SET_UP', 'PENDING_ORDER', 'PENDING_ASSIGN', 'PENDING_DOOR'].indexOf(its.order_detail['order_bis_state_dsc']) > -1 || its.order_detail['order_pay_state_dsc'] == 'PENDING_PAY'" class="but_coms_but1" @click.stop="shows(its)">
                取消订单
              </div>
              <!--<div v-if="its.order_detail.order_is_peddling == 0 && its.order_detail.order_state == 0 || its.order_detail.order_state == 1 || (its.order_detail.order_state == 2 && its.order_detail.order_rate == 0)" class="but_coms_but1" @click.stop="menvaluate(its,index)">临时评价
                                </div>-->
              <div v-if="its.order_detail['order_pay_state_dsc'] == 'PENDING_PAY'" class="but_coms_but3" @click.stop="ofgshow(its, index)">
                去支付
              </div>
              <div v-if="its.order_detail['order_pay_state_dsc'] == 'PENDING_PAY' && its.order_detail['order_bis_state_dsc'] != 'SET_UP'" class="but_coms_but4" @click.stop="call(its.store_info.store_phone)">
                联系商家
              </div>
              <!--<div v-else-if="its.order_is_peddling == 0 && its.order_state == 0" class="but_coms_but3" @click.stop="ofgshow(its, index)">去付款</div>-->
              <!--<div v-if="its.order_state == 1" class="but_coms_but3" @click.stop="ofgshow(its, index)"></div>-->

              <!--<div style="border:none; padding:0; color:#18b4ed;margin-right: 1.5rem;" @click.stop="eval">评价说明</div>-->
              <div v-if="its.order_detail['order_bis_state_dsc'] == 'PENDING_EVALUATE'" class="but_coms_but2" @click.stop="menvaluate(its,index)">
                评价
              </div>
              <div v-if="(its.order_detail['order_pay_state_dsc'] == 'PAY_SUCCESS' &&
            (its.order_detail['order_bis_state_dsc'] == 'COMPLETED' || its.order_detail['order_bis_state_dsc'] == 'CLOSED')) ||
            its.order_detail['order_pay_state_dsc'] == 'REFUNDED'" class="but_coms_but1" @click.stop="shows(its,1)">
                删除订单
              </div>
            </template>

          </div>
        </div>
      </scroller>
    </div>
    <orderConfirmation v-model="payShow" :orderData="orderData" :orderType="4"></orderConfirmation>
  </div>
</template>

<script>
  import api from '@/api/api'
  import orderState from '@/components/orderState'
  import orderConfirmation from '@/components/order_confirmation'
  export default {
    name: "userOrder",
    components: {
      orderState,
      orderConfirmation
    },
    data () {
      return {
        tabs: ['全部', '待付款', '待确认', '待服务', '服务中', '已关闭'],
        num: sessionStorage.getItem('userOrderIndex') || 0, //tab
        uploadFileUrl: api.uploadFileUrl + '/',
        list_com: [],
        firstFinish: false,
        end: false,
        page: 1,
        payShow:false,
        orderData:{},
      }
    },
    mounted () {
      let lists = {}
      let index = this.num
      lists.page = 1
      if(index == 1) {
        lists.condition = {
          "order_state": 0
        }

      } else if(index == 2) {
        lists.condition = {
          "order_state": 1
        }

      } else if(index == 3) {
        lists.condition = {
          "order_state": 2
        }

      } else if(index == 4) {
        lists.condition = {
          "order_rate": 1,
          "order_comment_id": 0,
          "order_state": 3
        }

      } else if (index == 5) {
        lists.condition = {
          'order_state': 4
        }
      }  else {
        lists.condition = {
          "order_type <>": 3
        }

      }
      this.$fetch('ouser_get_order', lists).then(rs => {
        this.list_com = rs //覆盖本地数据
        if(rs.length != 10) { //如果数据长度小于10证明下次请求没有数据
          this.$refs.list_com_user.finishInfinite(true) //执行组件完成上拉方法(true代表没有数据)
          this.end = true
        } else {
          this.$refs.list_com_user.finishInfinite(false) //执行组件完成上拉方法(true代表没有数据)
        }
        this.firstFinish = true
      })
    },
    methods: {
      replaceStyle(str) {
        const reg = /<[^<>]+>/g
        return str.replace(reg, '');
      },
      infinite(done) { //上拉方法
        if(this.firstFinish) { //如果初始化完成才能继续上拉
          if(this.end) { //如果end == true代表已无数据
            setTimeout(() => {
              done(true) //true返回已无数据
            }, 1500)
            return
          } else {
            this.tab(this.num, this.page + 1, done)
          }
        }
      },
      tab(index,page,done) {
        this.end = false
        let lists = {}
        lists.page = page || 1
        this.num = index || 0
        sessionStorage.setItem('userOrderIndex', this.num)
        if(index == 1) {
          lists.condition = {
            "order_state": 0
          }

        } else if(index == 2) {
          lists.condition = {
            "order_state": 1
          }

        } else if(index == 3) {
          lists.condition = {
            "order_state": 2
          }

        } else if(index == 4) {
          lists.condition = {
            "order_rate": 1,
            "order_comment_id": 0,
            "order_state": 3
          }

        } else if (index == 5) {
          lists.condition = {
            'order_state': 4
          }
        }  else {
          lists.condition = {
            "order_type <>": 3
          }

        }
        this.$fetch('ouser_get_order', lists).then(rs => {
          if (lists.page != 1) {
            this.list_com = this.list_com.concat(rs)
          } else {
            this.list_com = rs
          }
          this.page = lists.page
          if (done) {
            if(rs.length != 10) {
              setTimeout(() => {
                done(true)
              })
              this.end = true
            } else {
              setTimeout(() => {
                done()
              })
            }

          }

        }).catch(() => {
          if (done) {
            setTimeout(() => {
              done()
            })
          }
        })
      },
      //打电话
      call(info) {
        if(info) {
          window.location.href = "tel:" + info
        } else {
          this.$toast('拨号失败！')
        }
      },
      //打开取消个人
      shows(its, isdelete) {
        if (!isdelete) {
          this.$dialog.alert({
            title: "提示",
            message: '服务开始前24小时外取消，订单金额100%退还;服务开始前24-2小时取消，订单金额退还80%; 服务开始前2小时内取消，订单金额退还50%。确认要取消订单吗？',
            showCancelButton: true,
          }).then(() => {
            this.$fetch('user_cancel_order', {}, its.order_detail.order_sn).then(rs => {
              this.tab(this.num)
              this.$toast('取消成功')
            })
          }).catch(() => {

          })
        } else {
          this.$dialog.alert({
            title: "提示",
            message: '确认要删除订单吗',
            showCancelButton: true,
          }).then(() => {
            this.$fetch('order_delete', {}, its.order_detail.order_sn).then(rs => {
              this.tab(this.num)
              this.$toast('删除成功');
            })
          }).catch(() => {

          })
        }

      },
      //详情
      detailst(its) {
        let that = this
        that.$router.push({
          path: '/orderDetails',
          query: {
            order_snx: its
          }
        })
      },
      //			评价
      menvaluate(its, index) {
        let that = this
        that.$router.push({
          path: '/menvaluate',
          query: {
            order_snx: its.order_detail.order_sn
          }
        })
      },

      //			支付
      ofgshow(its, index) {
        this.orderData.order_sn = its.order_detail.order_sn;
        this.orderData.total = Number(its.payment.order_amount);
        this.orderData.order_pay_way = its.payment.order_pay_way;
        this.orderData.order_deductible_type = its.payment.order_deductible_type;
        this.payShow = true;

      },
    }
  }
</script>

<style scoped>
  @import "../assets/css/index.css";
  .user_order{
    /*position: relative;*/
    height: 100%;
  }
  .personal{
    height: calc(100% - .44rem);
  }
  .top_nav_ul>li {
    flex: 0 0 16.6%;
  }
</style>
