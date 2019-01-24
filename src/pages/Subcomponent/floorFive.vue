<template>
	<div class="five" ref="five">
		<div class="five_box">
      <div class="four_shop">
        <div class="shop_title">
          <div  class="shop_title_img">
            <img v-if="serviceData.store_info.store_pic" :src="uploadFileUrl + serviceData.store_info.store_pic"/>
            <img v-else :src="defaultStorePic"/>
          </div>
          <div  class="shop_title_text">
            <div class="h4_tit">
              <h4>{{serviceData.store_info.store_name}}</h4>
              <div @click="onshop_show()">
                <span v-if="!shop_show">收藏店铺</span>
                <span v-else>已收藏店铺</span>
              </div>

            </div>
            <div class="shop_title_auth">
              <div>
                <img src="../../assets/img/img_vx/shop_h_shou.png"/>
              </div>
              <div>
                企业认证
              </div>
            </div>
            <div class="shop_title_add">{{serviceData.store_info.city_name}}</div>
          </div>
        </div>
        <div class="shop_box">
          <ul class="shop_ul">
            <li class="shop_li">
              <div>{{serviceData.store_info.store_service_count}}</div>
              <div>全部服务</div>
            </li>
            <li class="shop_li">
              <div>{{serviceData.store_info.store_sold}}</div>
              <div>服务次数</div>
            </li>
            <li class="shop_li">
              <div>{{serviceData.store_info.favorable_rate}}%</div>
              <div>好评率</div>
            </li>
          </ul>
          <ul class="shop_ul">
            <!--<li class="shop_li">
                            <span>在线联系</span>
                        </li>-->
            <li class="shop_li" @click="call">
              <span>电话联系</span>
            </li>
            <!--<li class="shop_li">
                            <span>进店看看</span>
                        </li>-->
          </ul>
        </div>
      </div>
			<div class="evaluate">
				<div class="title">用户评价(<span class="color_gray">{{serviceData.row.comment_count.zs}}</span>)</div>
				<div class="types">
					<div class="type">全部<span>{{serviceData.row.comment_count.zs}}</span></div>
					<div class="type">好评<span>{{serviceData.row.comment_count.hp}}</span></div>
					<div class="type">中评<span>{{serviceData.row.comment_count.zp}}</span></div>
					<div class="type">差评<span>{{serviceData.row.comment_count.cp}}</span></div>
					<!--<div class="type">有图<span>{{comment_count.yt}}</span></div>-->
				</div>
				<div v-if="comment_list_f == ''" style="text-align: center;padding:0.05rem 0;margin: .15rem 0; color: #b2b2b2;">
					暂无评论
				</div>
				<div class="eval" v-for="(item,index) in comment_list_f" v-else>
					<div class="user">
						<!--comment_average_score-->
						<!--v-if="item.user_pic  == ''"-->
						<div class="img">
							<img :src="item.user_pic ? uploadFileUrl + item.user_pic : defaultImg" />
						</div>
						<!--<div class="img" v-else>
              <img :src="item.user_pic"/>
            </div>-->
						<div class="right">
							<div class="name">{{item.user_name}}</div>
							<van-rate v-model="value" :size="10" disabled-color="#ff3434" void-color="#ceefe8" disabled/>
						</div>
					</div>
					<div class="other">
						<div class="time">{{item.add_time}}</div>
						<div class="pay">支付方式:{{item.money_type}}</div>
						<div class="product">产品: {{item.service_name}}</div>
					</div>
					<div class="info">
						{{item.comment_content}}
					</div>
					<div class="imgs">
						<template v-for="url in item.comment_img_urls">
							<img :src="uploadFileUrl + url"/>
						</template>

					</div>

				</div>


				<div style="text-align: center;" >
					<div class="more" @click="more()">查看全部评价</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import api from '@/api/api'
	export default {
		props:{
			serviceData:{
				type:Object,
				default:()=>{}
			}
		},
		data() {
			return {
				id:this.serviceData.row.id,
				value: 5,
				comment_list_f: [],
				comment_count:{},
				uploadFileUrl: api.uploadFileUrl +'/',
        defaultStorePic:require('@/assets/img/logo_h.png'),
        shop_show:false,
        click_false:true,
			}
		},
		mounted() { //生命周期
			this.onFive()
			this.lists()
      this.shop_show = this.serviceData.store_collected;
		},
		methods: { //方法
			onFive() {
				let fiveHeight = this.$refs.five.offsetHeight;
				this.$store.commit('fiveH', fiveHeight)
			},
      more() {
        var that = this;
        let ids = that.id
        that.$router.push({
          path: '/sub_evaluate',
          query: {
            ids
          }
        })
      },
			lists() {
				let that = this
				let lists = {}
				lists.rows = 2
				lists.condition = {
					"a.service_id": that.id
				}
				that.$fetch('comment_list', lists).then(rs => {
					that.comment_list_f = rs
				})
			},
      onshop_show(){
        if(this.click_false){
          this.click_false = false
          this.$fetch('user_collect',{collect_type:'STORE'},this.serviceData.row.store_id).then(rs=>{
            this.shop_show = !this.shop_show;
            this.$toast(this.shop_show ? '收藏成功' : '已取消收藏');
            setTimeout(()=>{
              this.click_false = true
            },1000)
          }).catch(e=>{
            this.click_false = true
          })
        }

      },
      call() {
        window.location.href = "tel:" + this.serviceData.store_info.store_phone;
      }
		},

	}
</script>

<style scoped>
	/**/

	.five {background: #fff;}

	.five_box {
		padding: 0 .12rem;
		padding-bottom: .8rem;
	}

	.evaluate {
		padding: 0 .1rem .3rem;
		margin-bottom: .1rem;
		background: #fff;
		box-shadow: 2px 2px 10px rgba(224, 243, 250, 1);
	}
	/*评论*/

	.title {
		padding: 0.12rem 0 .08rem 0;
		font-size: .16rem;
	}

	.evaluate .types {
		display: flex;
		flex-wrap: wrap;
		margin: 0 0 0.05rem 0;
	}

	.evaluate .type {
		background: rgba(255, 52, 52, .1);
		color: #707070;
		margin: .1rem .1rem 0 0;
		padding: .08rem .1rem;
		border-radius: .15rem;
	}

	.evaluate .type>span {
		margin-left: .05rem;
	}

	.evaluate .eval {
		padding: .1rem 0;
		border-bottom: .01rem solid #eee;
	}

	.evaluate .eval .img {
		width: .35rem;
		height: .35rem;
		border-radius: 50%;
		overflow: hidden;
	}

	.evaluate .eval .user {
		display: flex;
	}

	.evaluate .eval .user .img>img {
		width: 100%;
		height: 100%;
	}

	.evaluate .eval .user .right {
		flex: 1;
		margin-left: .1rem;
	}

	.evaluate .eval .other {
		display: flex;
		font-size: .115rem;
		color: #b2b2b2;
		padding: .05rem 0;
	}

	.evaluate .eval .other>div {
		margin-right: .1rem;
	}

	.evaluate .eval .imgs {
		display: flex;
		align-items: flex-start;
		flex-wrap: wrap;
		margin: 0.08rem 0;
	}

	.evaluate .eval .imgs>img {
		max-width: .6rem;
		height: auto;
		margin-right: .1rem;
	}

	.evaluate .more {
		display: inline-block;
		margin: .1rem auto;
		color: #ff3434;
		border: 1px solid #ff3434;
		border-radius: .15rem;
		line-height: .3rem;
		padding: 0 .1rem;
	}
  .four_shop{
    margin-bottom: .15rem;
    padding:.1rem .1rem;
    box-shadow: 2px 2px 10px rgba(224, 243, 250, 1);
    background: #fff;
  }
  .shop_title{
    display: flex;

  }
  .shop_title_img{
    flex: 0 0 0.65rem;
  }
  .shop_title_img img{
    width: .7rem;
    height: .7rem;
  }
  .shop_title_text{
    flex: 0 0 77%;
    margin-left: 0.1rem;
  }
  .shop_title_auth{
    margin: 0.08rem 0 0 0;
    display: flex;
    align-items: center;
  }
  .shop_title_auth img{
    width: .18rem;
    margin:0 0.08rem;
  }
  .shop_title_add{
    margin:0 0.08rem;
  }
  .h4_tit{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .h4_tit h4{
    margin: 0 0;
    padding: 0 0;
    font-weight: 700;
    font-size: .16rem;
  }
  .h4_tit>div{
    color: #f10;
  }
  .shop_ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0.1rem 0 .15rem 0;
  }
  .shop_li {
    width: 1.1rem;
    margin: 0 0 .1rem 0;
    text-align: center;
    font-size: .16rem;
    font-weight: 600;
  }
  .shop_li>div:nth-child(2){
    margin: 0.08rem  0 0.08rem 0 ;
  }
  .shop_li span{
    border: .01rem solid #f90;
    font-size: .14rem !important;
    font-weight: 500;
    border-radius: .5rem;
    padding: 0.08rem .1rem;
    color: #f90;
  }
</style>
