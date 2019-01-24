<template>
	<div>
		<div>
			<van-nav-bar title="服务选择项" left-arrow @click-left="onClickLeft" />
		</div>
		<div class="box">
			<ul>
				<li class="li_div" v-for="(item,index) in list">
					<div class="li_div_le">
						<div class="li_div_le_title">
							{{item.item_name}}
						</div>
						<div class="li_div_le_mey">
							单价:&nbsp;&nbsp;{{item.item_change}}元
						</div>
					</div>
					<div class="li_div_ri">
						<div class="algorithm">
							<div class="reduce" @click="count(item ,index,-1)">
								-
							</div>
							<div class="val">{{item.goodsnumber}}</div>
							<div class="plus" @click="count(item,index ,1)">
								+
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="btn" :class="{btn_h : num == true}" @click="bttn()">
			确 认 选 择
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				num: false,
				list: [],
				goodsnum: [],
				service_id:0,
			}
		},
		mounted() { //生命周期 
			this.init()
			
		},
		methods: { //方法
			init(){
				this.service_id = this.$route.query.service_id
		        this.$fetch('service_get', {
		        	get_store_info:1
		        }, this.service_id).then(rs => {
		        	let list =  rs.service_items;
		        	list.forEach(item =>{
		        		item.goodsnumber=0
		        	})
		          	this.list = list;
		        })
			},
			onClickLeft() {
				let that = this
				that.$router.back(-1)
			},
			count(item, index, val) {
				let arr = []
				arr = this.list;
				this.goodsnum = [];

				if(val > 0) {
					item.goodsnumber++;
				} else {
					if(item.goodsnumber > 0) {
						this.num = false
						item.goodsnumber--;
					}
				}
				for(let i = 0; i < arr.length; i++) {
					this.goodsnum.push(arr[i].goodsnumber)
					if(arr[i].goodsnumber > 0) {
						this.num = true
					} else {}
				}
			},
			bttn() {
				let list = [];
				this.list.forEach(item =>{
					if(item.goodsnumber > 0){
						list.push(item)
					}
				})
				list = JSON.stringify(list)
				if(this.num == true){
					if(this.$route.query.type == 2){
						this.$router.push({
							path: '/reservation_week',
							query:{
								store_id:this.service_id,
								list
							}
						})
					}else{
						this.$router.push({
							path:'/reservation_second',
							query:{
								list,
								store_id:this.service_id
							}
						})
					}
				}
			

			},

		},

	}
</script>

<style lang="less" scoped>
	.box {
		position: absolute;
		top: 0.46rem;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: auto;
		height: calc(100% - 0.46rem);
		padding: 0 .12rem;
		.li_div {
			padding: 0 .1rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: .85rem;
			margin: .1rem 0 0 0;
			box-shadow: 2px 2px 10px rgba(224, 243, 250, 1);
			.li_div_le {
				flex: 0 0 1;
				.li_div_le_title {
					font-size: .18rem;
					font-weight: 700;
				}
				.li_div_le_mey {
					margin-top: .05rem;
					color: #f90;
				}
			}
			.li_div_ri {
				flex: 0 0 1;
				.algorithm {
					display: flex;
					height: .35rem;
					line-height: .35rem;
					width: 1.2rem;
					border: .01rem solid #eee;
					text-align: center;
					.reduce {
						height: .35rem;
						width: .35rem;
						border-right: .01rem solid #eee;
					}
					.val {
						width: .5rem;
					}
					.plus {
						height: .35rem;
						width: .35rem;
						border-left: .01rem solid #eee;
					}
				}
			}
		}
	}
	
	.btn {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: .5rem;
		line-height: .5rem;
		text-align: center;
		background: #ccc;
		font-size: .18rem;
		color: #fff;
	}
	
	.btn_h {
		background: #18B4ED !important;
	}
</style>