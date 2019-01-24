<template>
	<div class="find">
    <!--head-->
		<div class="head">
			<div class="tan_div">
				<van-nav-bar title="我的订单" right-text="订单说明" @click-right="rule = true" />
				<!--我的订单-->
			</div>
			<!--<ul class="tan_x" v-else>-->
				<!--<li @click="is_user = true" :class="{tan_x_li:is_user}">用户</li>-->
				<!--<li @click="is_user = false" :class="{tan_x_li:!is_user}">{{user_type != 1 ? '商家' : '清洁师'}}</li>-->
			<!--</ul>-->
		</div>

    <!--body-->
    <div class="body">
      <user-order ></user-order>
      <!--<user-order v-if="is_user"></user-order>-->
      <!--<store-order v-else :user_type="user_type"></store-order>-->
    </div>
		<van-popup class='ruleBox' v-model="rule" position="right">
			<div><van-nav-bar title="订单说明" left-arrow @click-left="rule = false;" /></div>
			<p>1.您发布的需求，在您指定的预约时间，如果仍然没有人接单（通常是因为价格过低），帮家洁平台将会自动将您的需求取消，如果您想使需求继续生效，可以通过修改，调整预约时间来使需求重新生效。</p>
			<p>2.您购买的产品，从产品的购买时间算起，逾期15天，如果您在15天内，没有操作确认收货的话，平台将自动确认为您已收货，并更新订单状态为已完成，请您务必及时关注您的订单。</p>
			<p>3.您购买的服务，从服务的开始时间算起，逾期3天，如果您在3天内，没有操作确认服务完成的话，平台将自动确认更新订单状态为服务完成，并请您务必及时关注您的订单。</p>
		</van-popup>
	</div>
</template>

<script>
	import api from '@/api/api'
  import userOrder from './components/userOrder'
  import storeOrder from './components/storeOrder'
	export default {
	  name: 'ten_about',
    components: {
      userOrder,
      storeOrder
    },
		data() {
			return {
        is_user: true,
				uploadFileUrl: api.uploadFileUrl + '/',
				rule: false,
        user_type: 0,
        store_status: 0,
        staff_pass: 0
			}
		},
		created() {
      this.$fetch('user_store_info_get', {}, '', 'POST', 1).then(rs => {
        this.user_type = rs.staff_row.user_type
        this.store_status = rs.staff_row.store_status
        this.staff_pass = rs.staff_row.staff_pass
        if (rs.staff_row && (rs.staff_row.store_status == 1 || rs.staff_row.staff_status == 1) && rs.staff_row.staff_pass == 1) {
          this.is_user = false
        }
      })
		}
	}
</script>
<style scoped>
  @import "./assets/css/index.css";
  .body{
    height: calc(100% - .46rem);
  }
</style>
