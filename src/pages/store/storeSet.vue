<template>
	<div class="storeSet">
		<van-nav-bar title="店铺设置" left-arrow @click-left="onClickLeft"/>
		<div class="body">
			<div class="li right" @click="revise">店铺资料</div>
			<div class="li" v-if="user_type == 3">
				<div>自动接单</div>
				<van-switch :value="delivery" size=".2rem" :loading="loading" @input="change" />
			</div>
		</div>
	</div>
</template>

<script>
	import api from '@/api/api'
	export default{
		data(){
			return{
				delivery:false,
				loading:false,
				user_type:0,
			}
		},
		mounted(){
			this.init();
		},
		methods:{
			init(){
				//店铺详情
				this.$fetch('user_store_info_get',{}).then(rs =>{
          this.user_type = rs.staff_row.user_type;

          if(rs.own_store.store_auto_receipt == '1'){
            this.delivery = true
          }
				})
			},
			change(checked){
				var that = this;
				that.loading = true;
				that.$dialog.confirm({
			        title: '提醒',
			        message: '是否切换开关？'
		      	}).then(() => {
					//店铺自动接单开关切换
					that.$fetch('store_receipt_toggle',{}).then(rs =>{
						if( rs.error== 0 ){
							that.delivery = checked;
							that.loading = false;
							that.$toast('修改成功')
						}else{
							that.$toast(rs.msg[0]);
						}
					})
			    }).catch(() => {
				  // on cancel
				  that.loading = false;
				});
			},
			onClickLeft(){
//				this.$router.back(-1);
				this.$router.push({
					path:'/home'
				})
				this.$store.commit('store_show', false )
			},
			revise(){
				var that = this;
				that.$router.push({
					path: '/storeApply',
					query: {
						type: that.user_type
					}
				})
			}
		}
	}
</script>

<style scoped>
	.storeSet{
		background: #f5f5f5;
	}
	.storeSet .body{

	}
	.storeSet .body .li{
		height: .46rem;
		line-height: .46rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: .18rem;
		background: #fff;
		margin-top: .1rem;
		padding: 0 .15rem;
	}
	.storeSet .body .li.right:after{
		content: '';
		width: .2rem;
		height: .2rem;
		display: block;
		background: url(../../assets/img/right.png) no-repeat;
		background-position: center;
		background-size: auto .14rem;
	}
</style>
<style type="text/css">
	.storeSet .van-switch--on{
		background: #18B4ED;
	}
</style>
