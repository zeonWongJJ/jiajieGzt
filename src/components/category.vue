<template>
	<transition name="category-transition">
		<div class="categorySelect" v-show="selectShow">
			<van-nav-bar title="选择服务分类">
        <div class="close" slot="right" @click="close">
          <img src="@/assets/img/fastReservation/close_round.png" />
        </div>
			</van-nav-bar>
			<div class="ul">
				<div class="li" :class="{select : category == item.id}" @click="select(item)" v-for="(item,index) in list">
					<!--<img :src="uploadFileUrl + item.cate_icon"/>-->
					<i :class="`iconfont ${item.cate_icon}`"></i>
					<div class="name">{{item.cat_name}}</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import api from '@/api/api'
	export default{
		name:'category',
		props:{
      isHomePage: {
        type: Boolean,
        default: () => true
      },
			value:{
				type:Boolean,
				default:false,
			},
			category:{
				type:Number,
				default:0
			}
		},
		computed: {
      selectShow() {
        return this.value
      },
    },
		data(){
			return{
				list:[],
				uploadFileUrl : api.uploadFileUrl,
			}
		},
		mounted(){
			let category_list = this.$store.state.category_list;
			if(category_list){
				this.list = JSON.parse(category_list);
			}
			//服务分类
			this.$fetch('category_list',{
        condition: {parent_id: 0, cate_is_show: 1},
        sort: {is_self_support: "desc", cate_sort: "desc"},
        only_get_support: 1
			}).then(rs =>{
				let category_list = JSON.stringify(rs);
				this.$store.state.category_list = category_list;
				this.list = rs;
			}).catch(err =>{
				console.log(err);
			})
		},
		methods:{
			close(){
				this.$emit('input', false);
			},
			//选择服务分类
			select(type){
				this.close();
				this.$emit('select',type);
			},
		}
	}
</script>

<style class="less" scoped>
	@import "../assets/categoryIcon/iconfont.css";
	.categorySelect{
		position: absolute;
		top: 0;
		height: 100%;
		width: 100%;
		background: rgba(0,0,0,.4);
	}

	.categorySelect .close{
		display: flex;
		height: .46rem;
		align-items: center;
	}
	.categorySelect .close>img{
		width: .24rem;
		height: .24rem;
	}
	.categorySelect .ul{
		background: #18b4ed;
		padding-top: .1rem;
		color: #fff;
		font-size: .18rem;
	}
	.categorySelect .ul .li{
		display: flex;
		align-items: center;
		height: .6rem;
		padding: 0 .1rem;
	}
	.categorySelect .ul .li.select{
		background: #fff;
		color: #18B4ED;
	}
	.categorySelect .ul .li+.li{
		border-top: 1px solid #fff;
	}
	.categorySelect .ul .li>i{
		font-size: .22rem;
		width: .25rem;
		height: .25rem;
		padding: 0 .2rem;
	}
	.categorySelect .ul .li.select > i {
		color: #18B4ED;
	}
</style>
<style class="less">
	.category-transition-enter-active, .category-transition-leave-active{
	  transition: opacity 0.3s linear;
	}
	.category-transition-enter, .category-transition-leave-to{
	  opacity: 0;
	}
</style>
