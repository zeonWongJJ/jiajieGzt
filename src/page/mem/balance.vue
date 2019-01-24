<template>
	<div class="balance">
		<van-nav-bar class="blue" title="我的余额" left-arrow @click-left="onClickLeft" />
		<div class="body">
			<div class="top">
				<div class="sum">{{value}}</div>
				<div class="row">
					<div class="span" @click="toRecharge"><img src="../../assets/img/recharge.png"/>充值</div>
					<div class="span" @click="toBalance_cash"><img src="../../assets/img/cash.png"/>提现</div>
				</div>
			</div>
			<div class="center">
				<div class="title">余额明细</div>
				<div class="ul">
					<scroller :on-infinite="infinite" ref="scroller">
					  <!-- content goes here -->
					  	<div style="height: 1px;"></div>
					  	<!--必须要有1高度的空元素-->
						<div class="li" @click="toMore(item.ub_id)" v-for="item in balance">
							<div class="row">
								<div class="span">{{item.ub_item}}</div>
								<div class="span time">{{item.ub_time}}</div>
							</div>
							<div class="row">
								<div class="span money">余额：{{item.ub_balance}}</div>
								<div class="span">{{item.ub_type == 1 ? '+'+item.ub_money : '-'+item.ub_money }}</div>
							</div>
						</div>
					</scroller>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import api from '@/api/api'
	export default{
		data(){
    		return {
    			page:1,
    			balance:[],
    			value:0,
    			end:false,
    			firstFinish:false,
			}
		},
		mounted(){
			this.init();
		},
		methods:{

	    	onClickLeft(){
	    		this.$router.push({
	    			path:'/member'
	    		})
	    	},
	    	toMore(id){
	    		this.$router.push({
	    			path:'/balance_more',
	    			query:{
	    				id
	    			}
	    		})
	    	},
	    	toRecharge(){
	    		this.$router.push({
	    			path:'/recharge'
	    		})
	    	},
	    	toBalance_cash(){
	    		this.$router.push({
	    			path:'/balance_cash',
	    			query:{
	    				cashNum:1,//余额提现传1，积分提现传2
	    				value:this.value
	    			}
	    		})
	    	},
	    	init(){//初始化请求
	    		var that = this;
			  	var lists = {page:that.page}
				that.$fetch('user_info_get', {}, '', 'GET').then(rs =>{
          that.value = rs.user_balance
				})
				that.$fetch('user_balance_list', lists).then(rs =>{
          that.page++//请求页数自加
          that.balance = rs;//覆盖本地数据
          if(rs.length != 10){//如果数据长度小于10证明下次请求没有数据
            that.$refs.scroller.finishInfinite(true);//执行组件完成上拉方法(true代表没有数据)
            that.end = true
          }else{
            that.$refs.scroller.finishInfinite(false);//执行组件完成上拉方法(true代表没有数据)
          }
          that.firstFinish = true//标记已完成第一次上拉
				})
	    	},
		    infinite(done) {//上拉方法
			  	var that = this;
	    		if(that.firstFinish){//如果初始化完成才能继续上拉
	    			if(that.end){//如果end == true代表已无数据
	    				setTimeout(() => {
				            done(true)//true返回已无数据
				        }, 1500)
				        return
	    			}else{
	    				var lists = {page:that.page}
						that.$fetch('user_balance_list', lists).then(rs =>{
              setTimeout(() => {
                that.page++//请求页数自加
                that.balance = that.balance.concat(rs);//合并至本地数据
                if(rs.length != 10){//如果数据长度小于10证明下次请求没有数据
                  setTimeout(() => {
                    done(true)//true返回已无数据
                  })
                  that.end = true
                }else{
                  setTimeout(() => {
                    done()
                  })
                }
              },1500)
						}).catch(e => {
              setTimeout(() => {
                done(true)
              })
            })
	    			}

	    		}
		    }
		}
	}
</script>

<style scoped>
	.balance{
		background: #f5f5f5;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.balance .body{
		height: calc(100% - .46rem);
		overflow: hidden;
	}
	/*顶部*/
	.balance .body .top{
		color: #fff;
		background: #18B4ED;
	}
	.balance .body .top .sum{
		font-size: .5rem;
		text-align: center;
		padding: .2rem;
	}
	.balance .body .top .row{
		border-top: 1px solid rgba(255,255,255,.3);
		display: flex;
	}
	.balance .body .top .row .span{
		flex: 0 0 50%;
		text-align: center;
		padding: .15rem 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: .18rem;
		line-height: .18rem;
	}
	.balance .body .top .row .span+.span{
		border-left: 1px solid rgba(255,255,255,.3);
	}
	.balance .body .top .row .span>img{
		width: .175rem;
		height: .18rem;
		margin-right: .1rem;
	}
	/*余额明细*/
	.balance .body .center{
		background: #fff;
		margin-top: .1rem;
		height: calc(100% - 1.7rem);
	}
	.balance .body .center .title{
		padding: .15rem 0;
		display: flex;
		align-items: center;
		font-size: .18rem;
	}
	.balance .body .center .title:before{
		content: '';
		width: .05rem;
		height: .23rem;
		background: #ff9c0f;
		margin-right: .1rem;
	}
	.balance .body .center .ul{
		margin-left: .15rem;
		border-top: 1px solid #f5f5f5;
		position: relative;
		height: calc(100% - .5rem);
	}
	.balance .body .center .ul .li{
		border-bottom: 1px solid #f5f5f5;
		padding: .15rem;
		padding-left: 0;
	}
	.balance .body .center .ul .li .row{
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: .16rem;
	}
	.balance .body .center .ul .li .row+.row{
		margin-top: .05rem;
	}
	.balance .body .center .ul .li .row .time{
		font-size: .12rem;
		color: #b2b2b2;
	}
	.balance .body .center .ul .li .row .money{
		font-size: .12rem;
	}
</style>
