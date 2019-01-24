<template>
	<div class="credit">
		<van-nav-bar class="blue" title="我的积分" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
			<!--<van-icon name="question" slot="right" />-->
		</van-nav-bar>
		<div class="body">
			<div class="top">
				<div class="title">当前积分</div>

				<div class="row">
					<div class="sum">{{value}}</div>
					<div class="btn" @click="toBalance_cash">提现</div>
				</div>
				<span class="pointRule" @click="pointRule">积分规则说明 ></span>
			</div>
			<div class="center">
				<div class="title">积分明细</div>
				<div class="ul">
					<scroller :on-infinite="infinite" ref="scroller">
					  <div style="height: 1px;"></div>
					  	<!--必须要有1高度的空元素-->
						<div class="li" @click="toMore(item.pl_id)"  v-for="item in list">
							<div class="row">
								<div class="left">
									<div class="span">{{item.pl_item}}</div>
									<div class="span time">{{item.pl_time}}</div>
								</div>
								<div class="right">{{item.pl_type == 1 ? '+'+item.pl_variation : '-'+item.pl_variation }}</div>
							</div>
						</div>

					</scroller>
				</div>
			</div>
		</div>
		<van-popup class='ruleBox' v-model="rule" position="right" >
			<van-nav-bar class="blue" title="积分说明" left-arrow @click-left="closeLay" ></van-nav-bar>
				<p>
					1.积分获得方式：
				</p>
				<p>(1) 您自己购买帮家洁平台产品/服务时，在订单完成后，帮家洁平台赠送5%的积分返利给您；</p>
				<p>(2) 您通过系统的邀请好友功能邀请好友，当邀请的好友成功注册后，并且购买了帮家洁平台产品/服务，在订单完成后，平台将赠送消费金额2%的积分返利。</p>
				<p>2.积分账户：</p>
				<p>(1) 在帮家洁平台上获得的积分，默认会存入您的帮家洁平台的积分账号；</p>
				<p>(2) 您可以通过平台的积分账号，查看您的积分余额，和积分的变化记录。</p>
				<p>3.积分用途：</p>
				<p>(1) 您在帮家洁平台上使用支付功能的时候，可以选择积分进行抵扣，一个积分抵扣一元钱。</p>
				<p>(2) 积分可以提现，提现比例为一积分等于一元钱。</p>
		</van-popup>
	</div>
</template>

<script>
	import api from '@/api/api'
	export default{
		data () {
    		return {
    			list:[],
				page:1,
				rule:false,
				end:false,
				value:0,
			}
		},
		mounted(){
			this.init();
		},
		methods:{
			init(){//初始化请求
				var that = this;
			  	var lists = {page:that.page}
			  	that.$fetch('user_info_get', {}, '', 'GET').then(rs =>{
            that.value = rs.user_score;
			  	})
			  	that.$fetch('user_jifen_list', lists).then(rs =>{
            that.page++//请求页数自加
            that.list = rs;//覆盖本地数据
            if(rs.length != 10){//如果数据长度小于10证明下次请求没有数据
              that.$refs.scroller.finishInfinite(true);//执行组件完成上拉方法(true代表没有数据)
              that.end = true
            }else{
              that.$refs.scroller.finishInfinite(false);//执行组件完成上拉方法(true代表没有数据)
            }
            that.firstFinish = true//标记已完成第一次上拉
			  	}).catch(e => {
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
	    				that.$fetch('user_jifen_list', lists).then(rs =>{
                setTimeout(() => {
                  that.page++//请求页数自加
                  that.list = that.list.concat(rs);//合并至本地数据
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
	    				}).catch(e=> {
                setTimeout(() => {
                  done(true)
                })
              })
    				}
		  		}
		    },
	    	onClickLeft(){
	    		this.$router.push({
	    			path:'/member'
	    		})
	    	},
	    	onClickRight(){
	    		this.$router.push({
	    			path:'/creditExplain'
	    		})
	    	},
	    	toMore(id){
	    		this.$router.push({
	    			path:'/credit_more',
	    			query:{
	    				pl_id:id
	    			}
	    		})
	    	},
	    	toBalance_cash(){
	    		this.$router.push({
	    			path:'/balance_cash',
	    			query:{
	    				cashNum:2,//余额提现传1，积分提现传2
	    				value:this.value
	    			}
	    		})
	    	},
	    	pointRule(){
	    		this.rule=true;
	    	},
	    	closeLay(){
	    		this.rule=false;
	    	}
		}
	}
</script>

<style scoped>
	.credit{
		background: #f5f5f5;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.credit .body{
		height: calc(100% - .46rem);
		overflow: hidden;
	}
	/*顶部*/
	.credit .body .top{
		color: #fff;
		background: #18B4ED;
		padding: .3rem .15rem;
	}
	.credit .body .top .title{
	}
	.credit .body .top .row{
		display: flex;
		padding: .2rem 0;
		align-items: center;
		justify-content: space-between;
	}
	.credit .body .top .row .sum{
		font-size: .5rem;
	}
	.credit .body .top .row .btn{
		font-size: .18rem;
		width: .8rem;
		height: .35rem;
		line-height: .35rem;
		color: #000000;
		background: #fff;
		text-align: center;
		border-radius: .05rem;
	}
	/*余额明细*/
	.credit .body .center{
		background: #fff;
		margin-top: .1rem;
		height: calc(100% - 1.95rem);
	}
	.credit .body .center .title{
		padding: .15rem 0;
		display: flex;
		align-items: center;
		font-size: .18rem;
	}
	.credit .body .center .title:before{
		content: '';
		width: .05rem;
		height: .23rem;
		background: #ff9c0f;
		margin-right: .1rem;
	}
	.credit .body .center .ul{
		margin-left: .15rem;
		border-top: 1px solid #f5f5f5;
		position: relative;
		height: calc(100% - .5rem);
	}
	.credit .body .center .ul .li{
		border-bottom: 1px solid #f5f5f5;
		padding: .15rem;
		padding-left: 0;
	}
	.credit .body .center .ul .li .row{
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: .16rem;
	}
	.credit .body .center .ul .li .row .span+.span{
		margin-top: .05rem;
	}
	.credit .body .center .ul .li .row .time{
		font-size: .14rem;
		color: #666666;
	}
	.ruleBox{
		width:100%;
		height:100%;
		text-indent: 2em;
		font-size:0.14rem;
	}
	.ruleBox p{
		color:#999;
		padding:0 0.1rem;
		margin:0.1rem 0;
	}
</style>
<style>
	.credit .ruleBox .van-nav-bar__left{
		left:0;
	}
</style>
