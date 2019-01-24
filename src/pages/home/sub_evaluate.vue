<template>
  <div class="evaluate">
    <!--头部-->
    <van-nav-bar class="white" title="全部评论" left-arrow @click-left="onClickLeft"/>
    <div class="body">
      <div class="types">
        <div class="type" :class="{active: index == indexs}" @click.stop="index_num(index)"
             v-for="(item,index) in types">{{item.name}}<span>{{item.num}}</span></div>
      </div>
      <div v-if="comment_list_f == ''" class="zanshi">
      		暂无评价
      </div>
      <div class="eval" v-for="(items,index) in comment_list_f" v-else>
        <div class="user">
          <div class="img" v-if="items.user_pic  == ''">
            <img src="../../assets/img/logo_h.png"/>
          </div>
          <div class="img" v-else>
            <img :src="uploadFileUrl + items.user_pic"/>
          </div>
          <div class="right">
            <div class="name">{{items.user_name}}</div>
            <van-rate v-model="value" disabled-color="#ff3434" void-color="#ceefe8" disabled/>
          </div>
        </div>
        <div class="other">
          <div class="time">{{items.add_time}}</div>
          <!--<div class="pay">支付方式:定金</div>-->
          <div class="product">产品: {{items.service_name}}</div>
        </div>
        <div class="info">
          {{items.comment_content}}
        </div>
        <div class="imgs">
          <template v-for="url in items.comment_img_urls">
							<img :src="uploadFileUrl + url"/>
						</template>
        </div>
      </div>


    </div>
    <!--body-->

  </div>
</template>

<script>
  import api from '@/api/api'

  export default {
    data() {
      return {
        indexs: 0,
        uploadFileUrl: api.uploadFileUrl + '/',
        types: [
          {
            name: '全部',
            num: 0,
          },
//        {
//          name: '有图',
//          num: 0
//        },
          {
            name: '好评',
            num: 0,
          },
          {
            name: '中评',
            num: 0
          },
          {
            name: '差评',
            num: 0
          }


        ],
        value: 3.5,
        comment_list_f: [],
        nums: {},
        ids : '',
      }
    },
    mounted() { //生命周期
    	if(this.$route.query.ids){
    		this.ids = this.$route.query.ids
    	}else{
    		
    	}
      this.rendDetails()
      this.comment_list()
    },
    methods: {
      onClickLeft() {
         this.$router.push({
			          path: '/service_details',
			          query:{
			          	store_id:this.ids
			          }
			        })
      },

      rendDetails() { //详情信息
        var that = this;
        that.$fetch('service_get', {}, that.ids).then(rs =>{
          const _count = rs.comment_count
          that.types[0].num = _count.zs
//        that.types[1].num = _count.yt
          that.types[1].num = _count.hp
          that.types[2].num = _count.zp
          that.types[3].num = _count.cp
        })
      },
      comment_list() {
        let that = this
        var qs = require('qs');
      	let lists = {}
        lists.condition = {
          "a.service_id": that.ids
        }
        that.$fetch('comment_list', lists).then(rs =>{
          that.comment_list_f = rs
        })

      },
   
    }
  }
</script>

<style scoped>
  .evaluate {
    background: #f5f5f5;
  }

  .evaluate .body {

  }

  /*评论*/
  .evaluate .body .types {
    display: flex;
    flex-wrap: wrap;
    padding: .15rem;
    margin-top: .1rem;
    background: #fff;
    border-bottom: 1px solid #f5f5f5;
  }

  .evaluate .body .type {
    background: rgba(255, 52, 52, .1);
    color: #707070;
    margin: .1rem .1rem 0 0;
    padding: .08rem .1rem;
    border-radius: .15rem;
  }

  .evaluate .body .type.active {
    color: #fff;
    background: #ff3434;
  }

  .evaluate .body .type > span {
    margin-left: .05rem;
  }

  .evaluate .body .eval {
    margin-bottom: .1rem;
    background: #fff;
    padding: .15rem;
  }

  .evaluate .body .eval .img {
    width: .35rem;
    height: .35rem;
    border-radius: 50%;
    overflow: hidden;
  }

  .evaluate .body .eval .user {
    display: flex;
  }

  .evaluate .body .eval .user .img > img {
    width: 100%;
    height: 100%;
  }

  .evaluate .body .eval .user .right {
    flex: 1;
    margin-left: .1rem;
  }

  .evaluate .body .eval .other {
    display: flex;
    font-size: .115rem;
    color: #b2b2b2;
    padding: .05rem 0;
  }

  .evaluate .body .eval .other > div {
    margin-right: .1rem;
  }

  .evaluate .body .eval .imgs {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;

  }

  .evaluate .body .eval .imgs > img {
    max-width: .6rem;
    height: auto;
    margin-right: .1rem;
    margin-top: .1rem;
  }
  .zanshi{
  	padding-top: .5rem;
  	background: #fff;
  	text-align: center;
  	color: #B2B2B2;
  }
</style>
<style>
  .evaluate .white.van-nav-bar .van-icon {
    color: #18B4ED;
  }

  .evaluate .van-rate__item {
    width: .12rem !important;
  }
</style>
