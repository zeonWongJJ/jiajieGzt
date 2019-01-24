<template>
	<div class="find_server">
		<van-nav-bar title="找服务" />
		<div class="body">
			<div class="server" :class="index + 1 ? 'label'+ (index + 1) : ''" v-for="(obj, index) in cate_list" @click="tofindsub(obj.id)">
				<!--<div class="title">
					<div class="cat_name">{{obj.cat_name}}</div>
					<div class="arrow">
						进入此分类
						<img src="../../assets/img/arrow.png"/>
					</div>
				</div>-->

			</div>
		</div>
	</div>
</template>

<script>
	import api from '@/api/api'
	export default {
		name: 'find_server',
		data() {
			return {
				cate_list: [{
						id: 110
					},
					{
						id: 111
					},
					{
						id: 2
					},
					{
						id: 109
					},
					{
						id: 102
					},
					{
						id: 108
					},
					{
						id: 3
					}
				],
				qs: require('qs'),
				uploadFileUrl: api.uploadFileUrl + '/',
			}
		},
		methods: {
			init() {
				let lists = {}
				lists.condition = {
					parent_id: 0,
					cate_is_show: 1
				};
				lists.sort = {
					cate_sort: 'desc',
					id: 'desc'
				}
				this.$fetch('category_list', lists).then(rs => {
					this.cate_list = rs
				})
			},
			tofindsub(id) {
				this.$router.push({
					path: '/findsub',
					query: {
						item: id
					}
				})

			}
		},
		created() {
			//  		this.init();
		}
	}
</script>

<style scoped>
	.find_server .body {
		/*padding:0 .1rem;*/
		display: flex;
		flex-wrap: wrap;
	}
	
	.find_server .server {
		/*float: left;*/
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 1.35rem;
		margin-top: .06rem;
		align-items: flex-start;
		font-size: .18rem;
		background: #f7f7f7;
	}
	
	.find_server .server .cat_name {
		border-bottom: 1px solid #c9c9c9;
	}
	
	.find_server .server .arrow {
		display: flex;
		font-size: .08rem!important;
	}
	
	.find_server .server .arrow>img {
		width: .2rem;
		height: auto;
		margin: auto;
	}
	
	.find_server .server .img {
		width: .5rem;
	}
	
	.find_server .server .img>img {
		width: 100%;
		height: auto;
	}
	
	.find_server .label1 {
		background: url(../../assets/img/find_server/server_1.png) no-repeat;
		background-position: center;
		background-size: 100% auto;
		margin-right: .05rem;
		width: 2.35rem;
		height: 1.4rem;
		flex-direction: row;
	}
	
	.find_server .label2 {
		height: 1.065rem;
		background: url(../../assets/img/find_server/server_2.png) no-repeat;
		background-position: center;
		background-size: 100% auto;
		justify-content: flex-end;
		align-items: center;
	}
	
	.find_server .label2 .title {
		background: #fff;
	}
	
	.find_server .label3 {
		background: url(../../assets/img/find_server/server_3.png) no-repeat;
		background-position: center;
		background-size: 100% auto;
		margin-right: .05rem;
		width: 2.35rem;
		height: 1.4rem;
		flex-direction: row;
	}
	
	.find_server .label4 {
		background: url(../../assets/img/find_server/server_4.png) no-repeat;
		background-position: center;
		background-size: 100% auto;
		height: 1.735rem;
		margin-top: -.27rem;
	}
	
	.find_server .label5 {
		background: url(../../assets/img/find_server/server_5.png) no-repeat;
		background-position: center;
		background-size: 100% auto;
		width: .825rem;
		height: 1.3rem;
		font-size: .14rem;
	}
	
	.find_server .label6 {
		background: url(../../assets/img/find_server/server_6.png) no-repeat;
		background-position: center;
		background-size: 100% auto;
		width: 1.525rem;
		height: 1.3rem;
		margin-right: .05rem;
	}
	
	.find_server .label7 {
		background: url(../../assets/img/find_server/server_7.png) no-repeat;
		background-position: center;
		background-size: 100% auto;
		height: 1.3rem;
	}
</style>