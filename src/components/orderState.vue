<template>
  <section>
      <template v-if="order_info.order_detail['order_bis_state_dsc'] == 'CLOSED'">
          <div class="com_tit">已关闭</div>
      </template>
      <template v-else-if="order_info.order_detail['order_pay_state_dsc'] == 'PAY_SUCCESS' || order_info.order_detail['order_bis_state_dsc'] == 'PENDING_CONTACT'">
        <div class="com_tit">{{orderBisStateMap[order_info.order_detail['order_bis_state_dsc']] || '未知'}}</div>
      </template>
      <template v-else>
        <div class="com_tit">{{orderPayStateMap[order_info.order_detail['order_pay_state_dsc']] || '未知'}}</div>
      </template>
  </section>
</template>

<script>
  export default {
    name: 'order_state',
    data() {
      return {
        orderBisStateMap: {
          SET_UP: '创建成功',
          LOCKING: '锁定',
          PENDING_ORDER: '待接单',
          PENDING_ASSIGN: '待分配',
          PENDING_DOOR: '待上门',
          IN_SERVICE: '服务中',
          PENDING_EVALUATE: '待评价',
          CLOSED: '已关闭',
          COMPLETED: '已完成',
          PENDING_CONTACT: '待联系'
        },
        orderPayStateMap: {
          PENDING_PAY: '待付款',
          PAYING: '交易处理中',
          PAY_SUCCESS: '付款成功',
          REFUND_PROCESSING: '退款处理中',
          REFUNDED: '已退款',
        }
      }
    },
    props: ['order_info', 'is_store_page']
  }
</script>

<style scoped>
  .com_tit {
  	/*position: absolute;*/
  	z-index: 999;
    font-size: .12rem;
    color: red;
    margin: -0.05rem 0.14rem 0 0;
  }
</style>
