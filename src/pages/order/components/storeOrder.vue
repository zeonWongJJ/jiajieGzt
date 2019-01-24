<template>
  <div class="store_order">
    <ul class="top_nav_ul">
      <li v-for="(item,index) in tabs" :class="{li_style:index == num}" @click="tab(index,1)">
        <div class="top_nav_img">
          {{item.name}}
        </div>
      </li>
    </ul>
    <div class="personal">
      <scroller :on-infinite="infinite_x" ref="list_com_store">
        <div style="height: 1px;"></div>
        <!--必须要有1高度的空元素-->
        <div v-for="(its,index) in list_coms" class="list_coms" @click="detailst(its.order_detail.order_sn)">
          <div class="com_tit">
            <div class="com_tit_img">
              <div>
                订单编号：{{its.order_detail.order_sn}}
              </div>
              <div>
                <order-state :order_info="its" :is_store_page="true"></order-state>
              </div>
            </div>
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
                {{its.order_detail.order_name}}
              </div>
              <div class="com_com_x_ov" v-html="replaceStyle(its.order_detail.order_info)"></div>
              <!--<div class="com_com_x_score">
                                  <div>
                                      <span>{{its.order_sn}}</span>
                                  </div>
                              </div>-->
              <div class="com_com_x_ov" style="width:2.6rem; overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                {{its.server_info.address_name}}<span v-if="its.server_info.house_number != '无门牌号' ">{{its.server_info.house_number}}</span>
              </div>
              <div class="com_com_x_score2">
                <div>
                  ￥{{its.payment.order_amount}}
                </div>
              </div>
            </div>

          </div>
          <div class="director" v-if="its.server_info.appointed_row">
            <div class="right">
              <div>下单时间:{{its.time_record.add_time}}</div>
              <div>
                服务时间:{{its.time_record.contact_appointment_at}}
              </div>
            </div>
            <div style="display: flex;border-bottom: 0.01rem solid #f8f8f8; padding: 0.08rem .1rem;">
              <!--<div class="img"><img src="../../assets/img/mmen.png" alt="" /></div>-->
              <div class="left">
                <!--<render-appointed-row :member="its.appointed_row"></render-appointed-row>-->
                <span  v-for="(item, i) in its.server_info.appointed_row" style="display: flex;">
                                <span style="width: .3rem;height:0.3rem;line-height: .3rem; border-radius: 50%;overflow: hidden;align-items: center;flex-wrap: wrap;">
                                  <img :src="uploadFileUrl + item.user_pic" alt="" style="width: .3rem;height:.3rem;"/>
                                </span>
                              <span style="height:0.3rem;line-height: .3rem;margin-left: 0.05rem;" :class="{i_item : 0 == i } ">{{item.staff_name}}</span>
                  <!--<span>{{item.store_director}}</span>-->
                    </span>
              </div>
            </div>
          </div>
          <!--anniu-->
          <div class="but_coms">
            <!--<div v-if="its.order_state == 0" class="but_coms_but1" >待付款</div>-->
            <div v-if="its.order_detail['order_pay_state_dsc'] == 'PAY_SUCCESS' &&
            its.order_detail['order_bis_state_dsc'] == 'PENDING_ORDER' &&
            user_type != 1" class="but_coms_but3" @click.stop="sureOrder(its)">
              确认接单
            </div>
            <div v-if="its.order_detail['order_pay_state_dsc'] == 'PAY_SUCCESS' &&
            (its.order_detail['order_bis_state_dsc'] == 'COMPLETED' || its.order_detail['order_bis_state_dsc'] == 'CLOSED') ||
            its.order_detail['order_pay_state_dsc'] == 'REFUNDED'" class="but_coms_but1" @click.stop="store_delete_order(its)">
              删除订单
            </div>
            <div v-if="canIreceipt && its.order_detail['order_pay_state_dsc'] == 'PAY_SUCCESS' &&
            its.order_detail['order_bis_state_dsc'] == 'PENDING_DOOR' && its.server_info.appointed_uid.indexOf(user_id) > -1 &&
            its.order_detail._is_accepted != 0" class="but_coms_but2" @click.stop="startServer(its)">
              开始服务
            </div>
            <div v-if="its.order_detail.order_rate == 0 &&
            its.order_detail['order_bis_state_dsc'] == 'IN_SERVICE' &&
            its.server_info.appointed_uid.indexOf(user_id) > -1" class="but_coms_but2" @click.stop="completed(its)">
              已完成
            </div>
            <div class="but_coms_but2" v-if="its.order_detail['order_pay_state_dsc'] == 'PAY_SUCCESS' &&
            its.server_info.appointed_row.length > 0 &&
            its.order_detail['order_bis_state_dsc'] == 'PENDING_DOOR' &&
            its.time_record.order_sm_at == 0 &&
            user_type != 1" @click.stop="f_distri(its)">
              修改分配
            </div>
            <div class="but_coms_but2" v-if="its.order_detail['order_pay_state_dsc'] == 'PAY_SUCCESS' &&
            its.server_info.appointed_row.length == 0 &&
            its.order_detail.order_rate != -1 &&
            its.order_detail['order_bis_state_dsc'] == 'PENDING_ASSIGN' &&
            user_type != 1" @click.stop="f_distri(its)">
              分配人员
            </div>
            <div class="but_coms_but1" v-if="(its.order_detail['order_pay_state_dsc'] == 'PAY_SUCCESS' || its.order_detail['order_pay_state_dsc'] == 'PENDING_PAY') &&
            (its.order_detail['order_bis_state_dsc'] == 'SET_UP' || its.order_detail['order_bis_state_dsc'] == 'PENDING_ORDER' || its.order_detail['order_bis_state_dsc'] == 'PENDING_ASSIGN' || its.order_detail['order_bis_state_dsc'] == 'PENDING_DOOR' &&
            user_type != 1)" @click.stop="o_cancel(its,index)">
              取消订单
            </div>
            <div v-if="its.order_detail['order_pay_state_dsc'] == 'PAY_SUCCESS' && its.order_detail['order_bis_state_dsc'] == 'PENDING_EVALUATE' &&
            its.order_detail.order_rate == 1 && its.order_detail.order_comment_id != 0" class="but_coms_but2" @click.stop="getComment(its.order_detail.order_comment_id)">
              查看评价
            </div>
            <div class="but_coms_but2" v-if="its.order_detail['order_pay_state_dsc'] == 'PAY_SUCCESS' &&
            its.order_detail['order_bis_state_dsc'] == 'PENDING_DOOR' &&
            its.server_info.appointed_uid.indexOf(user_id) > -1 &&
            user_type == 1" @click.stop="refuse(its)">
              拒绝订单
            </div>

            <div class="but_coms_but2" v-if="its.order_detail._is_accepted == 0 && its.server_info.appointed_uid.indexOf(user_id) > -1" @click="sureOrder(its)">
              我知道了
            </div>
          </div>
        </div>
      </scroller>
    </div>

    <!--弹出窗 分配人员-->
    <div class="distri_box" v-show="distri">
      <transition name="slide-fade">
        <div class="distri_biv">
          <div class="distri_biv_div1">
            <div style="color: #B2B2B2;font-size: .12rem;" @click.stop="distri=false">
              返回
            </div>
            <div style="font-size: .14rem;">
              可分配人员
            </div>
            <div style="color: #18B4ED;font-size: .12rem;">
              <span @click.stop="o_distri_ok">确定</span>
            </div>
          </div>
          <div class="distri_biv_div2">
            <ul>
              <li v-if="list_distri.length < 0">
                暂无人员分配
              </li>
              <li v-for="(item,index) in list_distri" v-else>
                <span :class="{distri_biv_div_span: distri_num.indexOf(item.id) > -1}" @click.stop="tab_distri(item,index)">{{item.staff_name}}</span>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <van-dialog
      v-model="cancel_x"
      show-cancel-button
      :before-close="spilits_cancel"
      title="确定要取消此订单？"
    >
      <van-field
        v-model="cancel_reason"
        type="text"
        label="取消原因"
        placeholder="请填写取消原因"
      />
    </van-dialog>
  </div>
</template>

<script>
  import api from '@/api/api'
  import orderState from '@/components/orderState'
  // import renderAppointedRow from '@/components/renderAppointedRow'
  export default {
    name: "storeOrder",
    components: {
      orderState,
      //renderAppointedRow,
    },
    props: {
      user_type: {
        type: [Number, String],
        default: () => 0
      }
    },
    data () {
      return {
        tabs: [{
          name: '全部',
          id: 99
        },
          {
            name: '待付款',
            id: 0
          },
          {
            name: '待确认',
            id: 1
          },
          {
            name: '待服务', //待接单
            id: 1
          },
          {
            name: '服务中',
            id: 2
          }
        ],
        num: 0, //tab
        uploadFileUrl: api.uploadFileUrl + '/',
        user_id: this.$store.state.user_id,
        canIreceipt: false, // 是否可以接单
        list_coms: [],
        store_list_end: false,
        page: 1,
        store_list_end:false,
        firstFinishStore:false,
        distri: false,
        order_sn_ok: '',
        list_distri: [],
        distri_num: [],
        cancel_reason: '',
        cancel_x: false
      }
    },
    mounted () {
      this.$fetch('can_i_use', {
        node_key: 'Store.changeOrderStatus.receipt'
      }, '', 'POST', 1).then(rs => {
        this.canIreceipt = true
      })
      this.$fetch('store_order_list', {page: 1, condition: {"order_type <> ": 3}}, '', 'POST', 1).then(rs => {
        this.list_coms = rs //覆盖本地数据
        this.$refs.list_com_store.finishInfinite(false) //执行组件完成上拉方法(true代表没有数据)
        if(rs.length != 10) {
          //this.store_list_end = true
        }
        this.firstFinishStore = true
      })
    },
    methods: {
      refuse (its) {
        this.$dialog.alert({
          title: "提示",
          message: '确认要拒绝订单吗',
          showCancelButton: true,
        }).then(() => {
          this.$fetch('order_refuse', {order_sn: its.order_detail.order_sn}).then(rs => {
            this.tab(this.num)
            this.$toast('订单已拒绝');
          })
        }).catch(() => {

        })
      },
      replaceStyle(str) {
        const reg = /<[^<>]+>/g
        return str.replace(reg, '');
      },
      infinite_x(done) { //上拉方法
        if(this.firstFinishStore) { //如果初始化完成才能继续上拉
          if(this.store_list_end) { //如果end == true代表已无数据
            setTimeout(() => {
              done(true) //true返回已无数据
            }, 1500)
          } else {
            this.tab(this.num, this.num + 1, done)
          }

        }
      },
      tab(index,page,done) {
        this.store_list_end = false
        let lists = {}
        lists.page = page || 1
        this.num = index || 0
        if (index == 1) {
          lists.condition = {
            "order_state": 0,
            "order_type <> ": 3
          }
        } else if (index == 2) {
          lists.condition = {
            "order_state": 1,
            "order_type <> ": 3
          }
        } else if (index == 3) {
          lists.condition = {
            "order_state": 2,
            "order_type <> ": 3
          }
        } else if (index == 4) {
          lists.condition = {
            "order_state": 3,
            "order_type <> ": 3
          }
        } else {
          lists.condition = {
            "order_type <> ": 3
          }
        }
        this.$fetch('store_order_list', lists).then(rs => {
          if (lists.page != 1) {
            this.list_coms = this.list_coms.concat(rs)
          } else {
            this.list_coms = rs
          }
          this.page = lists.page
          if (done) {
            if (rs.length !== 10) {
              setTimeout(() => {
                done(true)
              })
              this.store_list_end = true
            } else {
              setTimeout(() => {
                done()
              })
            }
          }
        }).catch(e => {
          if (done) {
            setTimeout(() => {
              done()
            })
          }
        })
      },
      f_distri(its) {
        // 获取店员列表
        this.order_sn_ok = its.order_detail.order_sn
        this.list_distri = []
        this.distri_num = []
        this.distri_list()
      },
      //获取可分配人员列表
      distri_list() {
        this.$fetch('staff_get_allocation', {}, this.order_sn_ok).then(rs => {
          rs.forEach(item => {
            if(item.staff_assigned) {
              this.distri_num.push(item.id)
            }
          })
          this.list_distri = rs
          this.distri = true
        })
      },

      //			选人
      tab_distri(item) {
        const indexOf = this.distri_num.indexOf(item.id)
        if(indexOf > -1) {
          this.distri_num.splice(indexOf, 1)
        } else {
          this.distri_num.push(item.id)
        }
      },
      //			分配确定
      o_distri_ok() {
        this.$fetch('appointed_order',{appointed_uid: this.distri_num},this.order_sn_ok).then(rs =>{
          this.distri = false
          this.tab(this.num)
        })
      },
      //打开删除
      store_delete_order(its) {
        this.$dialog.alert({
          title: "提示",
          message: '确认要删除订单吗',
          showCancelButton: true,
        }).then(() => {
          this.$fetch('store_delete_order', {}, its.order_detail.order_sn).then(rs => {
            this.tab(this.num)
            this.$toast('删除成功');
          })
        }).catch(() => {

        })

      },
      sureOrder(its) { //确认接单
        let that = this
        that.$dialog.alert({
          title: "提示",
          message: '确认要接单吗',
          showCancelButton: true,
        }).then(() => {
          this.$fetch('order_change_status_receipt', {}, its.order_detail.order_sn).then(rs =>{
            this.tab(this.num)
          })
        }).catch(() => {

        });
      },
      startServer(its) { //开始服务
        let that = this
        that.$dialog.alert({
          title: "提示",
          message: '确定要开始服务吗',
          showCancelButton: true,
        }).then(() => {
          that.$fetch('order_change_status_begin', {}, its.order_detail.order_sn).then(rs =>{
            this.tab(this.num)
          })
        }).catch(() => {

        });
      },
      completed(its) { //完成
        let that = this
        that.$dialog.alert({
          title: "提示",
          message: '确认要完成成订单吗',
          showCancelButton: true,
        }).then(() => {
          that.$fetch('order_change_status_completed', {}, its.order_detail.order_sn).then(rs =>{
            this.tab(this.num)
          })
        }).catch(() => {

        });
      },
      //详情
      detailst(its) {
        let that = this
        //还差个id
        that.$router.push({
          path: '/orderDetails_x',
          query: {
            its,
            usertype: this.user_type
          }
        })
      },
      // 商店确认取消订单
      o_cancel(its) {
        let that = this
        that.cancel_reason = ''
        that.order_sn_ok = its.order_detail.order_sn
        that.cancel_x = true
      },
      //取消订单
      spilits_cancel(action, done) {
        done()
        if (action === 'confirm') {
          let list = {}
          list.cancel_reason = this.cancel_reason
          this.$fetch('order_cancel', list, this.order_sn_ok).then(rs =>{
            this.$toast('订单已取消')
            this.cancel_x = false
            this.cancel_reason = ''
            this.tab(this.num)
          }).catch(e => {
            this.cancel_x = false
          })
        }
      },
      //			商铺进入我的评价
      getComment(order_comment_id) {
        this.$router.push({
          path: '/myeval',
          query: {
            order_comment_id
          }
        })

      }
    }
  }
</script>

<style scoped>
  @import "../assets/css/index.css";
  .store_order{
    position: relative;
    height: 100%;
  }
  .personal{
    height: calc(100% - .44rem);
  }
</style>
