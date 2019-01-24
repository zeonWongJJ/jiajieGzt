<template>
  <div class="myeval">
    <!--头部-->
    <van-nav-bar class="white" title="评价详情" left-arrow @click-left="onClickLeft" v-if="order_comment_id" />
    <van-nav-bar class="white" title="我的评价" left-arrow @click-left="onClickLeft" right-text="评价说明" @click-right="evals" v-else />
    <div class="body">

      <div v-if="eval == ''" style="position:absolute;z-index: 1; margin:0.4rem 0; width: 100%;text-align: center; color: #d2d2d2;">
        				暂无数据
      </div>
      <div class="eval" v-for="(item,index) in eval" v-else>
        <div class="user">
        	<div class="img" v-if="order_comment_id">
          	<img src="../../assets/img/logo_h.png" v-if="item.user_pic == ''"/>
            <img :src="uploadFileUrl + item.user_pic" v-else/>

          </div>
          <div class="img" v-else>
          	<img src="../../assets/img/logo_h.png" v-if="item.user_info.user_pic == ''"/>
            <img :src="uploadFileUrl + item.user_info.user_pic" v-else/>

          </div>
          <div class="right">
          	<div class="name" v-if="order_comment_id">{{item.user_name}}</div>
            <div class="name" v-else>{{item.user_info.user_name}}</div>
            <van-rate :value="parseInt(item.comment_average_score)" disabled-color="#ff3434" void-color="#ceefe8" disabled />
          </div>
        </div>
        <div class="other">
          <div class="time">{{item.add_time}}</div>
          <!--<div class="pay">支付方式:{{item.order_pay_way}}</div>-->
          <div class="product">产品: {{item.order_name}}</div>
        </div>
        <div class="info">{{item.comment_content}}</div>
        <div class="imgs">
            <img v-if="item.comment_img_urls.length > 0" v-for="imgs in item.comment_img_urls" :src="uploadFileUrl + imgs" />
        </div>
      </div>

    </div>
    	<van-popup class='ruleBox' v-model="rule" position="right">
			<van-nav-bar class="" title="评价说明" left-arrow @click-left="closeLay"></van-nav-bar>
			<p>1.订单如果逾期没有评价的话（默认从订单的服务开始时间算起，逾期时间为3天），平台将自动给予好评，逾期时间请参考订单的规则。</p>

		</van-popup>
  </div>
</template>

<script>
  import api from '@/api/api'
  export default{
    data(){
      return{
      	rule:false,
        value:3.5,
        uploadFileUrl:api.uploadFileUrl+'/',
        eval:[],
        order_comment_id:0,
      }
    },
    mounted(){
    	this.order_comment_id = this.$route.query.order_comment_id;
      this.init();
    },
    methods:{
			closeLay() {
				this.rule = false;
			},
    	evals() {
			this.rule = true;
//				this.$dialog.alert({
//					title: "评价说明",
//					message: '订单如果逾期没有评价的话（默认从订单的服务开始时间算起，逾期时间为3天），平台将自动给予好评，逾期时间请参考订单的规则。',
//				}).then(() => {
//				});
			},
      onClickLeft(){
      	 this.$store.commit('store_show', true )
      	if(this.order_comment_id){
      		this.$router.back(-1)
  			}else{
  				this.$router.push({
	          path: '/home'
	        });
  			}
      },
      init(){
      	let that = this;
      	if(that.order_comment_id){
      		that.$fetch('comment_get', {}, that.order_comment_id).then(rs =>{
      			that.eval.push(rs);
      					console.log(rs)
      			if(!rs.error) {
	          } else {
//	            that.$toast(JSON.stringify(rs.data))
							console.log(JSON.stringify(rs.data))
	          }
      		})
	      }else{
	      	that.$fetch('user_comment_list', {rows:100}).then(rs =>{
	      			that.eval = rs;
      					console.log(that.eval)
		  			if(!rs.error) {
//		            that.eval = rs.data;
		          } else {
		            that.$toast(JSON.stringify(rs.data))
		          }
		  		})
	      }
    	}
  	}
	}
</script>

<style scoped>
  .myeval{
  			width: 100%;
		height: 100%;
		background: #F5F5F5;

  }
  .myeval .body{
  			position: absolute;
		top: .46rem;
		left: 0;
		right: 0;
		bottom: 0;
  	height: calc(100% - 0.46rem);
		overflow: auto;
		/*z-index: 9999;*/

  }
  /*评论*/
  .myeval .body .eval{
    margin-bottom: .1rem;
    background: #fff;
    padding: .15rem;
    border-bottom: .01rem solid #eee;
  }
  .myeval .body .eval .img{
    width: .35rem;
    height: .35rem;
    border-radius: 50%;
    overflow: hidden;
  }
  .myeval .body .eval .user{
    display: flex;
  }
  .myeval .body .eval .user .img>img{
    width: 100%;
    height: 100%;
  }
  .myeval .body .eval .user .right{
    flex: 1;
    margin-left: .1rem;
  }
  .myeval .body .eval .other{
    display: flex;
    font-size: .115rem;
    color: #b2b2b2;
    padding: .05rem 0;
  }
  .myeval .body .eval .other>div{
    margin-right: .1rem;
  }
  .myeval .body .eval .imgs{
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
  }
  .myeval .body .eval .imgs>img{
    max-width: 1.04rem;
    height: auto;
    margin-right: .1rem;
    margin-top: .1rem;
  }

	.ruleBox {
		width: 100%;
		height: 100%;
		font-size: 0.14rem;
	}

	.ruleBox p {
			text-indent: 2em;
		color: #999;
		padding: 0 0.1rem;
		margin: 0.1rem 0;
	}
</style>
<style>
	.myeval .van-nav-bar__right{
		font-size: 0.12rem !important;
	}
	.myeval .van-dialog__message {
		font-size: 0.12rem !important;
	}

</style>
