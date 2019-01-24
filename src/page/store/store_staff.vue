<template>
	<div class="store_staff">
		<van-nav-bar title="员工管理" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
			<van-icon name="search" color="white" slot="right" />
		</van-nav-bar>
		<div class="body">
			<div class="ul">
				<scroller :on-infinite="infinite" ref="scroller">
					<div style="height: 1px;"></div>
					<!--必须要有1高度的空元素-->
					<div class="li" v-for="item in list" @click="toStaff(item.user_id)">
						<div class="img" :class="{new : item.store_status == 0}">
							<img :src="item.user_pic.length == 0 ? imgs : item.user_pic" />
						</div>
						<div class="grade">等级{{item.store_level}}</div>
						<div class="admin" v-if="item.user_type == 2">管理员</div>
						<div class="admin" v-if="item.user_type == 3">店主</div>
						<div class="order" v-if="item.store_order_count >= 100">已完成订单100</div>
						<div class="name">{{item.store_director}}</div>
					</div>
				</scroller>
			</div>
			<div class="num">{{list.length > 0 ? count + '位工作人员' : ''}}</div>
		</div>
	</div>

</template>

<script>
	import api from '@/api/api'
	export default {
		data() {
			return {
				list: [],
				page: 1,
				end: false,
				count: 0,
        		imgs: require('../../../src/assets/img/logo_h.png')
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				var that = this;
				var lists = {
					page: that.page
				}
				that.$fetch('store_clerk_list', lists).then(rs =>{
          that.page++ //请求页数自加
          that.list = rs; //覆盖本地数据
          that.count = rs.count;
          if(rs.length != 10) { //如果数据长度小于10证明下次请求没有数据
            that.$refs.scroller.finishInfinite(true); //执行组件完成上拉方法(true代表没有数据)
            that.end = true
          } else {
            that.$refs.scroller.finishInfinite(false); //执行组件完成上拉方法(true代表没有数据)
          }
          that.firstFinish = true //标记已完成第一次上拉
				}).catch(e => {
          that.firstFinish = true //标记已完成第一次上拉
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
			onClickLeft() {
				this.$router.push({
					path: '/shop'
				})
			},
			onClickRight() {
				this.$dialog.alert({
					message: '暂不支持搜索'
				})
			},
			toStaff(staff_id) {
				this.$router.push({
					path: '/staff',
					query: {
						staff_id
					}
				})
			},
		}
	}
</script>

<style scoped>
	.store_staff {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #f5f5f5;
	}

	.store_staff .body {
		height: calc(100% - .46rem);
		overflow: hidden;
	}

	.store_staff .body .ul {
		position: relative;
		height: calc(100% - .46rem);
	}

	.store_staff .body .li {
		display: flex;
		align-items: center;
		padding: .15rem;
		background: #fff;
		font-size: .12rem;
		color: #fff;
		border-bottom: 1px solid #f5f5f5;
	}

	.store_staff .body .li .img {
		width: .5rem;
		height: .5rem;
		position: relative;
	}

	.store_staff .body .li .img.new:after {
		content: '';
		position: absolute;
		right: 0.04rem;
		top: 0.04rem;
		width: .05rem;
		height: .05rem;
		background: red;
		border-radius: 50%;
	}

	.store_staff .body .li .img>img {
		border-radius: 50%;
		width: 100%;
		height: 100%;
	}

	.store_staff .body .li .grade,
	.store_staff .body .li .admin,
	.store_staff .body .li .order {
		margin-left: .15rem;
		padding: .05rem .08rem;
		background: #ff9c0f;
		border-radius: .05rem;
	}

	.store_staff .body .li .admin {
		margin-left: .08rem;
		background: #2ddeea;
	}

	.store_staff .body .li .order {
		margin-left: .08rem;
		background: #ff3434;
	}

	.store_staff .body .li .name {
		margin-left: .15rem;
		font-size: .18rem;
		color: #000;
	}

	.store_staff .body .num {
		height: .46rem;
		line-height: .46rem;
		font-size: .18rem;
		text-align: center;
		color: #707070;
	}
</style>
