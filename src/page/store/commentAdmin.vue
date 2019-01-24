<template>
  <div>
    <div class="commBox">
      <van-nav-bar class="white" title="评价管理" left-arrow @click-left="onClickLeft"/>
      <div class="eval" v-for="(item,index) in list" :key="index">
        <div class="user">
          <div class="img">
          	<img src="../../assets/img/logo_h.png" v-if="item.user_pic == ''" />
            <img :src="item.user_pic" v-else/>
          </div>
          <div class="right">
            <div class="name">{{item.user_name}}</div>
            <van-rate :value="parseInt(item.comment_average_score)" disabled-color="#ff3434" void-color="#ceefe8"
                      disabled/>
          </div>
        </div>
        <div class="other">
          <div class="time">{{item.add_time}}</div>
          <!--<div class="pay">支付方式:{{item.service_id}}</div>-->
          <div class="product">产品: {{item.service_name}}</div>
        </div>
        <div class="info">
          {{item.comment_content}}
        </div>
        <div class="comImg">
          <!--<a v-for="(ac,y) in item.imgList"><img :src="ac.src" alt="" /></a>-->
          <img v-if="item.comment_img_urls.length > 0" v-for="imgs in item.comment_img_urls" :src="uploadFileUrl + imgs"/>
        </div>
        <!--<div class="com">
                      <span @click="remove(index)" class="comGray">删除评价</span>
                      <span v-if="item.id==1" @click="exa(item,index)" class="comRed">审核评价</span>
                  </div>-->
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/api/api'

  export default {

    data() {
      return {
        value: 3.5,
        list: [],
        store_id: 0,
        list_id: '',
        uploadFileUrl: api.uploadFileUrl + '/',
        data: []
      }
    },
    mounted() {//生命周期
      // this.comment_id()
      // this.comment_list()
      this.getCurrentStore()
    },
    methods: {//方法
      getCurrentStore() {
        const that = this;
        that.$fetch('user_store_info_get', {}).then(rs =>{
          const lists = {
            condition: {
              'a.comment_store_id': rs.id
            },
            rows: 500
          };
          that.$fetch('comment_list', lists).then(rs =>{
            that.list = rs
          })
        })
      },
      onClickLeft() {
        this.$router.back(-1);
      },
      //    	comment_id(){
      // 	let that = this;
      // 	let lists={}
      //
      // 	lists.rows = 500
      // 	var qs = require('qs');
      // 	that.axios({
      // 		method: 'post',
      // 		headers: {
      // 			"Content-Type": "application/x-www-form-urlencoded"
      // 		},
      // 		url: api.user_store_info_get,
      // 		data:qs.stringify(lists),
      // 	}).then(function(res) {
      // 		if(res.data.error == 0) {
      // 			console.log(res)
      // 			 that.list_id = res.data.data.id
      // 		} else {
      // 			that.$toast(res.data.msg);
      // 		}
      // 	})
      // },

      //  comment_list(){
      // 	let that = this;
      // 	let lists={}
      // 	lists.condition={
      // 		"a.comment_store_id":that.list_id
      // 	}
      // 	lists.rows = 500
      // 	var qs = require('qs');
      // 	that.axios({
      // 		method: 'post',
      // 		headers: {
      // 			"Content-Type": "application/x-www-form-urlencoded"
      // 		},
      // 		url: api.comment_list,
      // 		data:qs.stringify(lists),
      // 	}).then(function(res) {
      // 		if(res.data.error == 0) {
      // 			console.log(res)
      // 			that.list = res.data.data
      // 		} else {
      // 			that.$toast(res.data.msg);
      // 		}
      // 	})
      // },

    },
  }
</script>

<style scoped>
  .eval {
    margin-bottom: .1rem;
    background: #fff;
    padding: .15rem;
  }

  .eval .img {
    width: .35rem;
    height: .35rem;
    border-radius: 50%;
    overflow: hidden;
  }

  .eval .user {
    display: flex;
  }

  .eval .user .img > img {
    width: 100%;
    height: 100%;
  }

  .eval .user .right {
    flex: 1;
    margin-left: .1rem;
  }

  .eval .other {
    display: flex;
    font-size: .115rem;
    color: #b2b2b2;
    padding: .05rem 0;
  }

  .eval .other > div {
    margin-right: .1rem;
  }

  .eval .comImg {
    margin-top: 0.12rem;
    border-bottom: 1px solid #ddd;
  }

  .eval .comImg img {
    width: 1rem;
    height: 1rem;
    margin-bottom: 0.12rem;
    margin-right: 0.1rem;
  }

  .eval .com {
    height: 0.53rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .eval .com > span {
    padding: 0.05rem 0.1rem;
    font-size: 0.14rem;
    border-radius: 0.2rem;
    margin-left: 0.1rem;
    cursor: pointer;
  }

  .comGray {
    color: #b2b2b2;
    border: 1px solid #b2b2b2;
  }

  .comRed {
    color: #ff3434;
    border: 1px solid #ff3434;
  }
</style>
<style>
  .commBox .van-nav-bar {
    border-bottom: 1px solid #DDD;
  }

  .commBox .van-rate__item {
    width: .12rem !important;
  }
</style>
