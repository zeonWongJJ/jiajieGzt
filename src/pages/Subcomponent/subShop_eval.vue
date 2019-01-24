<template>
	<div class="subshop">
		<div class="box">
			<div class="types">
				<div class="type" :class="{active: index == indexs}" @click.stop="index_num(item,index)" v-for="(item,index) in types">{{item.name}}<span>{{item.num}}</span></div>
			</div>
			<div class="box_com">

				<scroller :on-infinite="infinite" ref="scroller_comment_list">
					<div class="eval" v-for="(items,index) in comment_list_f" :title="items">
						<div class="user">
							<div class="img" v-if="items.user_pic  == ''">
								<img src="../../assets/img/logo_h.png" />
							</div>
							<div class="img" v-else>
								<!--<img :src="items.user_pic"/>-->
								<img src="../../assets/img/find_server/server_4.png" />
							</div>
							<div class="right">
								<div class="name">{{items.user_name}}</div>
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
						<div class="imgs" >
							<img v-if="items.comment_img_urls.length > 0" v-for="imgs in items.comment_img_urls" :src="uploadFileUrl + imgs"/>

						</div>
					</div>
				</scroller>
			</div>

		</div>
	</div>
</template>

<script>
  import api from '@/api/api'
	export default {
		data() {
			return {
        uploadFileUrl:api.uploadFileUrl+'/',
				storeId: parseInt(this.$route.query.statistics_id || 0),
				page: 1,
				end: false,
				firstFinish: false,
				indexs: 0,
				loading: false,
				finished: false,
				types: [{
						name: '全部',
            num:0,
					},

					{
						name: '好评',
            num:0,
					},
					{
						name: '中评',
            num:0,
					},
					{
						name: '差评',
            num:0,
					}

				],
				comment_list_f: [],
				store:{},
			}
		},
		props: ['serviceData'],
		mounted() { //生命周期 
      this.init()
			this.$fetch('user_store_info_get', {}).then(rs =>{
				const store_info = rs.own_store
				this.types[0].num = store_info.store_comment_count
				this.types[1].num = store_info.store_hp_count
				this.types[2].num = store_info.store_zp_count
				this.types[3].num = store_info.store_cp_count
            	this.store = store_info
        // console.log(store_info)
            })
		},
		methods: { //方法
			//			},
			index_num(item,index){
				this.getCommentList(index)

			},
			init() {	
				this.getCommentList()	
			},
			getCommentList (typeIndex = 0) {
				let conditions = {}

				if (typeIndex) {
					conditions.comment_type = typeIndex
				}

        console.log(conditions)
				this.$fetch('store_get_comment', conditions, this.storeId).then(rs => {
					this.page++ //请求页数自加
						this.comment_list_f = rs; //覆盖本地数据
					if(rs.length != 10) { //如果数据长度小于10证明下次请求没有数据
						this.end = true
						this.$refs.scroller_comment_list.finishInfinite(true); //执行组件完成上拉方法(true代表没有数据)
					} else {
						this.$refs.scroller_comment_list.finishInfinite(false); //执行组件完成上拉方法(true代表没有数据)
					}
					this.firstFinish = true //标记已完成第一次上拉
				})
			},
			infinite(done) { //上拉方法
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
						that.$fetch('comment_list', lists).then(rs => {
							setTimeout(() => {
								that.page++ //请求页数自加
									that.comment_list_f = that.comment_list_f.concat(rs); //合并至本地数据
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
		},

	}
</script>

<style scoped>
	.box {
		position: absolute;
		top: 2.9rem;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 0 .12rem;
		height: calc(100% - 3rem);
		overflow: auto;
	}
	/*评论*/
	
	.types {
		display: flex;
		flex-wrap: wrap;
		padding: .15rem 0;
		background: #fff;
		border-bottom: 1px solid #f5f5f5;
	}
	
	.type {
		background: rgba(255, 52, 52, .1);
		color: #707070;
		margin: .1rem .1rem 0 0;
		padding: .08rem .1rem;
		border-radius: .15rem;
	}
	
	.type.active {
		color: #fff;
		background: #ff3434;
	}
	
	.type>span {
		margin-left: .05rem;
	}
	.box_com{
		position: absolute;
		top: 0.8rem;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
	}
	.eval {
		/*margin-bottom: .1rem;*/
		background: #fff;
		padding: .15rem;
		box-shadow: 2px 2px 10px rgba(224, 243, 250, 1);
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
	
	.eval .user .img>img {
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
	
	.eval .other>div {
		margin-right: .1rem;
	}
	
	.evaluate .body .eval .imgs {
		display: flex;
		align-items: flex-start;
		flex-wrap: wrap;
	}
	
	.eval .imgs>img {
		max-width: .6rem;
		height: auto;
		margin-right: .1rem;
		margin-top: .1rem;
	}
	
	/*.no-data-text {
		margin-top: 1rem;
	}*/
</style>
