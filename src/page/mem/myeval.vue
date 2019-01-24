<template>
  <div class="myeval">
    <!--头部-->
    <van-nav-bar class="white" title="评价详情" left-arrow @click-left="onClickLeft" v-if="order_comment_id" />
    <van-nav-bar class="white" title="我的评价" left-arrow @click-left="onClickLeft" right-text="评价说明" @click-right="evals" v-else />
    <div class="body">
      <div v-if="eval == ''" style="text-align: center; margin-top: .4rem; color: #d2d2d2;">
        暂无数据{{eval}}11
      </div>
      <div class="eval" v-for="(item,index) in eval" v-else>
        <div class="user">
        	<div class="img" v-if="order_comment_id">
          	<img src="../../assets/img/logo_h.png" v-if="item.user_pic == ''"/>
            <img :src="item.user_pic" v-else/>
            
          </div>
          <div class="img" v-else>
          	<img src="../../assets/img/logo_h.png" v-if="item.user_info.user_pic == ''"/>
            <img :src="item.user_info.user_pic" v-else/>
            
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
  </div>
</template>

<script>
  import api from '@/api/api'
  export default{
    data(){
      return{
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
    	evals() {
				this.$dialog.alert({
					title: "评价说明",
					message: '订单如果逾期没有评价的话（默认从订单的服务开始时间算起，逾期时间为3天），平台将自动给予好评，逾期时间请参考订单的规则。',
				});
			},
      onClickLeft(){
      	if(this.order_comment_id){
      		this.$router.back(-1)
  			}else{
  				this.$router.push({
	          path: '/member'
	        });
  			}
      },
      init(){
      	let that = this;
      	if(that.order_comment_id){
      		that.$fetch('comment_get', {}, that.order_comment_id).then(rs =>{
      			if(!rs.error) {
	            that.eval.push(rs.data);
	          } else {
	            that.$toast(JSON.stringify(rs.data))
	          }
      		})
	      }else{
	      	that.$fetch('user_comment_list', {rows:100}).then(rs =>{
		  			if(!rs.error) {
		            that.eval = rs.data;
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
		background: #f5f5f5;
		position: absolute;
		top: 0rem;
		left: 0;
		right: 0;
		bottom: 0;
  }
  .myeval .body{
  	height: calc(100% - 0.46rem);
		overflow: auto;
    
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
</style>
<style>
	.myeval .van-nav-bar__right{
		font-size: 0.12rem !important;
	}
	.myeval .van-dialog__message {
		font-size: 0.12rem !important;
	}
	
</style>