<template>
	<div class="staff">
		<!--header-->
		<van-nav-bar title="员工管理" left-arrow @click-left="onClickLeft" >
			 <!--<van-icon name="search" slot="right" @click-right="onClickRight"/>-->
		</van-nav-bar>
		<!--main-->
		<div class="main">
			<div class="ul">
				<scroller :on-infinite="infinite" ref="scroller">
					<div style="height: 1px;"></div>
					<!--必须要有1高度的空元素-->
					<div class="li" v-for="(item,index) in list" @click="toStaff(item.id)">
						<div class="info">
							<div class="left">
								<div class="img">
									<img :src="(item.user_pic && item.user_pic.length) ? uploadFileUrl + item.user_pic : imgs" />
								</div>
								<div class="center">
									<div class="name">{{item.staff_name}}<span>Lv.{{item.staff_lavel}}</span></div>
									<div class="time">{{item.staff_add_at}}</div>
								</div>
							</div>
							<div class="right" v-if="item.staff_status == 1&& item.staff_pass == 1">
								<div class="btn" @click.stop="setadmin(item.id,index)">{{item.user_type == 2 ? '撤销管理员' : '设置为管理员'}}</div>
								<div class="btn" @click.stop="remove(item.id,index)">移除本账号</div>
							</div>
						</div>
						<div class="service_num" v-if="item.staff_status == 1 && item.staff_pass == 1">
							<div class="all">
								<div class="num">{{item.staff_all_services}}</div>
								<div class="title">全部服务</div>
							</div>
							<div class="finish">
								<div class="num">{{item.staff_total_services}}</div>
								<div class="title">已完成服务</div>
							</div>
						</div>
					</div>
				</scroller>
			</div>
			<!--<div class="num">{{list.length > 0 ? count + '位工作人员' : ''}}</div>-->
		</div>
	</div>
</template>

<script>
	import api from '@/api/api'
	export default{
		data(){
			return{
				list: [],
				page: 1,
				end: false,
				count: 0,
        		imgs: require('../../../src/assets/img/logo_h.png'),
				uploadFileUrl:api.uploadFileUrl+'/',
			}
		},
		mounted(){
			this.init();
		},
		methods:{
			onClickLeft(){
				this.$store.commit('store_show', false )
				this.$router.push('/home');
			},
			onClickRight(){

			},
			init() {
				var that = this;
				var lists = {
					page: that.page
				}
				that.$fetch('store_clerk_list', lists).then(rs =>{
		          that.page++ //请求页数自加
		          that.list = rs; //覆盖本地数据
		          if(rs.length != 10) { //如果数据长度小于10证明下次请求没有数据
		            that.$refs.scroller.finishInfinite(true); //执行组件完成上拉方法(true代表没有数据)
		            that.end = true
		          } else {
		            that.$refs.scroller.finishInfinite(false); //执行组件完成上拉方法(true代表没有数据)
		          }
		          that.firstFinish = true //标记已完成第一次上拉
						}).catch(e => {
		          that.firstFinish = true //标记已完成第一次上拉
		       }).catch(e=>{
		        	that.$refs.scroller.finishInfinite(false);
		        })
			},
			infinite(done) {
				var that = this;
				if(that.firstFinish) { //如果初始化完成才能继续上拉
					if(that.end) { //如果end == true代表已无数据
						setTimeout(() => {
							done(true) //true返回已无数据
						}, 1500)
						return
					} else {
						var lists = {
							page: that.page
						}
						that.$fetch('store_clerk_list',lists).then(rs =>{
			              setTimeout(() => {
			                that.page++ //请求页数自加
			                that.list = that.list.concat(rs); //合并至本地数据
			                if(rs.length != 10) { //如果数据长度小于10证明下次请求没有数据
			                  setTimeout(() => {
			                    done(true) //true返回已无数据
			                  })
			                  that.end = true
			                } else {
			                  setTimeout(() => {
			                    done()
			                  })
			                }
			              }, 1500)
									}).catch(e => {
			              setTimeout(() => {
			                done(true)
			              })
			            })
					}
				}
			},
	    	remove(id,index){
	    		let that = this;
		    	that.$dialog.confirm({
			        title: '提醒',
			        message: '是否移除此账号？'
		      	}).then(() => {
		      		that.$fetch('store_staff_remove', {}, id).then(rs =>{
		                that.$toast('账号已移除');
		                that.list.splice(index, 1);
		      		})
			    }).catch(() => {
				  // on cancel
				});
	    	},
		    setadmin(id,index){
				let that = this;
		    	that.$dialog.confirm({
			        title: '提醒',
			        message: '是否修改管理员权限？'
		      	}).then(() => {
		      		that.$fetch('staff_set_admin', {}, id).then(rs =>{
	                	that.$toast('修改成功');
	                	console.log(that.list[index].user_type)
	                	that.list[index].user_type == 2 ? that.list[index].user_type = 1 : that.list[index].user_type = 2
	                	console.log(that.list[index].user_type)
		      		})
			    }).catch(() => {
				  // on cancel
				});
		    },
			toStaff(staff_id) {
				this.$router.push({
					path: '/staff',
					query: {
						staff_id
					}
				})
			},
		},
	}
</script>

<style lang="less" scoped>
	.staff{
		height: 100%;
		background: #f5f5f5;
		.main{
			height: calc(100% - .46rem);
			position: relative;
			overflow-y: auto;
			.ul{
				padding: .1rem;
				.li{
					background: #fff;
					box-shadow: 3px 3px 13px rgba(148,213,237,.2);
					background: #fff;
					border-radius: 5px;
					overflow: hidden;
					padding: .1rem;
					.info{
						display: flex;
						justify-content: space-between;
						.left{
							display: flex;
							.img{
								width: .94rem;
								height: .94rem;
								img{
									width: 100%;
									height: 100%;
									border-radius: 50%;
								}
							}
							.center{
								margin-left: .1rem;
								display: flex;
								flex-direction: column;
								justify-content: space-around;
								.name{
									font-size: .18rem;
									font-weight: 700;
								}
							}
						}
						.right{
							display: flex;
							flex-direction: column;
							justify-content: space-around;
							.btn{
								color: #18B4ED;
								border-radius: .2rem;
								line-height: .24rem;
								padding: 0 .05rem;
								text-align: center;
								border: 1px solid #18B4ED;
								font-size: .12rem;
							}
						}
					}
					.service_num{
						margin-top: .1rem;
						display: flex;
						justify-content: space-around;
						text-align: center;
						font-size: .16rem;
						.all,.finish{
							>.num{
								margin-bottom: .1rem;
							}
						}
					}
				}
			}

			>.num{
				height: .46rem;
				line-height: .46rem;
				font-size: .18rem;
				text-align: center;
				color: #707070;
			}
		}
	}
</style>
