<template>
	<div class="search">
		<van-nav-bar left-arrow @click-left="onClickLeft">
			<van-search
			  v-model="value"
			  show-action
			  @search="onSearch"
			  slot="title"
			  style="background: none;padding: 0;"
			>
			  <div slot="action" @click="onSearch" class="searchBtn">搜索</div>
			</van-search>
		</van-nav-bar>
		<div class="body">
			
			<!--当搜索框有值时，隐藏-->
			<div class="searchBefore" v-show="!value.length">
				<!--<div class="hot">
					<div class="title">热门服务</div>
					<div class="box">
						<div class="item" v-for="item in hot" @click="pushValue(item)">{{item}}</div>
					</div>
				</div>-->
				<div class="history">
					<div class="title">历史搜索<div class="clear" @click="clear"></div></div>
					<div class="box">
						<div class="item" v-for="item in histories" @click="pushValue(item)">{{item}}</div>
					</div>
				</div>
			</div>
			
			<!--当搜索框有值时，显示-->
			<!--<div class="searchAfter" v-show="value.length">
				<div class="item" @click="showList(item.id)" v-for="item in searchAfter">{{item.name}}</div>
			</div>-->
			
			<!--搜索列表-->
			<div class="searchList" v-show="list_com.length > 0">
				<!--<ul class="top_nav_ul">
					<li v-for="(item,index) in tabs" :class="{li_style:index == num}" @click="tab(index)">
						<div class="top_nav_img">{{item.name}}</div>
					</li>
				</ul>-->
				<div class="commodity">
					<ul>
						<li v-for="its in list_com"  class="list_coms"  @click="toDetails(its.id)">
							<div class="com_tit">
								<!--<div class="com_tit_img">
									<div><img src="../../../static/images/store.png" /></div>
									<div>{{its.store_name}}</div>
								</div>-->
							</div>
							<ul>
								<li class="com_li">
									<!--////////-->
									<div class="com_com">
										<div>
											<img src="../../assets/img/logo_h.png" v-if="its.service_img == ''"/>
                    						<img :src="uploadFileUrl + its.service_img[0]" v-else/>
										</div>
										<div class="com_com_x">
											<div class="com_com_ri" v-if="its.type == 1">
												企业
											</div>
											<div class="com_com_x_tit">
												{{its.service_name}}
											</div>
											<div class="com_com_x_ov" v-html="replaceStyle(its.service_info)"></div>
											<div class="com_com_x_score">
												<div>
													<span>等级</span>
													<span class="com_com_x_score_colco">{{its.store_level}}</span>
												</div>
												<div>
													<span>已售</span>
													<span class="com_com_x_score_colco">{{its.service_sold}}</span>
												</div>
											</div>
											<div class="com_com_x_score2">
												<div>
													￥{{its.service_remuneration}}/{{its.pay_type == 1 ? '元' : '次'}}
												</div>
											</div>
										</div>
									</div>
								</li>
							</ul>
	
						</li>
					</ul>
				</div>
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
    		value:'',//搜索值
    		hot:['保洁','企业','空调清洗','冰箱清洗','空调清洗','冰箱清洗'],//热门
    		histories:[],//搜索历史
//  		searchAfter:[
//  			{
//  				id:1,
//  				name:'日常保洁',
//  			},
//  			{
//  				id:2,
//  				name:'家庭长期保洁',
//  			}
//  		],
    		searchId:0,
    		
			tabs: [
				{
					name: '综合排序',
					id: 1
				},
				{
					name: '离我最近',
					id: 2
				},
				{
					name: '评分高',
					id: 3
				},
				{
					name: '销量',
					id: 4
				},
			],
			num: 0, //tab\
    		list_com: [],
    	}
  	},
  	mounted(){
  		this.histories = JSON.parse(localStorage.getItem('histories'));
  	},
	methods: {
		
	    replaceStyle(str) {
	        const reg = /<[^<>]+>/g
	        return str.replace(reg, '');
	    },
    	onSearch(){
			var that = this;
	  		if(that.value != ''){
	  			var odata = {};
				odata.condition = {
					'a.service_name': '%'+that.value+'%'
				};
				that.$fetch('service_list', odata)
				.then(rs =>{
					if(rs.error == 0){
						if(rs.data.length>0){
							that.list_com = rs.data;
							//添加历史记录
							var item = localStorage.getItem('histories');
				  			if(item){
			  					var arr = JSON.parse(item);
				  				if(arr.indexOf(that.value) === -1){
				  					arr.push(that.value)
				  					localStorage.setItem('histories',JSON.stringify(arr))
				  				}
				  			}else{
				  				var arr = [];
				  				arr.push(that.value)
				  				localStorage.setItem('histories',JSON.stringify(arr))
				  			}
				  			that.histories = JSON.parse(localStorage.getItem('histories'));
						}else{
							that.$toast(rs.msg[0]);
						}
					}else{
						that.$toast(rs.msg[0]);
					}
				})
	  		}
    	},
	    //服务详情
	    toDetails(serverId){
				let that = this
//				var items = JSON.stringify(items)
				this.$router.push({
					path:'/details',
					query: {
						serverId
					}
	    	})
	    },
    	onClickLeft(){
    		window.history.go(-1);
    	},
    	clear(){
    		this.histories = [];
    	},
    	pushValue(value){
    		this.value = value;
    	},
    	showList(id){
    		this.searchId = id;
    	},
    	//tab
		tab(index) {
			this.num = index;
		},
		
    }
}
</script>

<style scoped>
	.search{
		
	}
	.search .van-nav-bar{
		background: #fff;
		height: .46rem;
		line-height: .46rem;
	}
	.search .searchBtn{
		color: #18b4ed;
		padding: 0 .1rem;
	}
	/*头部  以上*/
	
	.search .body{
		
	}
	
	.search .searchBefore{
		padding: 0 .15rem;
	}
	.search .title{
		font-size: .16rem;
		padding-top: .2rem;
	}
	.search .box{
		display: flex;
		flex-wrap: wrap;
	}
	.search .box .item{
		background: #f4f4f4;
		border-radius: .05rem;
		padding: 0 .1rem;
		line-height: .33rem;
		margin: .1rem .1rem 0 0;
	}
	.search .history .title{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.search .clear{
		width: .16rem;
		height: .16rem;
		background: url(../../../static/images/clear.png) no-repeat;
		background-position: center;
		background-size: .13rem .14rem;
	}
	/*搜索点击前  以上*/
	.search .searchAfter{
		height: 100%;
		background: #f5f5f5;
	}
	.search .searchAfter .item{
		border-top: 1px solid #f5f5f5;
		padding: .15rem;
		background: #fff;
	}
	
	/*搜索结果*/
	/*列表*/
	.top_nav_ul {
		display: flex;
		background: #fff;
		border-bottom: .05rem solid #eee;
		justify-content: space-between;
	}
	
	.top_nav_ul>li {
		text-align: center;
		height: .54rem;
		line-height: .54rem;
		position: relative;
		flex: 1;
	}
	
	.li_style {
		color: #18B4ED;
	}
	
	.li_style:before {
		content: '';
		position: absolute;
		left: 50%;
		bottom: 0;
		background: #18b4ed;
		width: 0.12rem;
		margin-left: -0.06rem;
		height: 0.02rem;
	}
	
	.van-nav-bar {
		background: #18b4ed;
	}
	
	.top_nav_img {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.searchList{
		height: 100%;
		background: #f5f5f5;
	}
	.com_li {
		background: #fff;
		padding: 0 0 0.2rem 0;
	}
	.list_coms{
		border-bottom: 1px solid #f5f5f5;
	}
	.com_tit {
		height: .38rem;
		line-height: .38rem;
		padding: 0 .1rem;
		background: #fff;
		display: flex;
		justify-content: space-between;
	}
	
	.com_tit_img {
		display: flex;
		font-size: .14rem;
		font-weight: 600;
		align-items: flex-start;
	}
	
	.com_tit_img>div img {
		width: .15rem;
		height: .15rem;
		margin-top: .11rem;
		margin-right: .05rem;
	}
	
	.com_tit>div:nth-child(2) {
		font-size: .12rem;
		color: #b2b2b2;
	}
	
	.com_com {
		display: flex;
		background: #fafafa;
	}
	
	.com_com>div:nth-child(1) {
		flex: 0 0 .85rem;
		margin: .1rem;
		border-radius: .1rem;
		overflow: hidden;
	}
	
	.com_com>div:nth-child(1) img {
		width: .85rem;
	}
	
	.com_com_x {
		position: relative;
		flex: 1;
		margin-top: .1rem;
		/*padding-right: .1rem;*/
	}
	
	.com_com_ri {
		position: absolute;
		top: -.06rem;
		right: 0.1rem;
		border: 0.01rem solid #ff9c0f;
		color: #ff9c0f;
		font-size: .12rem;
		border-radius: .05rem;
		padding: .01rem .03rem;
	}
	
	.com_com_x_tit {
		font-size: .16rem;
	}
	
	.com_com_x_ov {
		width: 2.65rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: .14rem;
		color: #707070;
		margin: 0.05rem 0;
	}
	
	.com_com_x_score {
		display: flex;
		font-size: .12rem;
		margin-bottom: .05rem;
	}
	
	.com_com_x_score_colco {
		color: #f00;
	}
	
	.com_com_x_score2 {
		display: flex;
	}
	
	.com_com_x_score2>div:nth-child(1) {
		font-size: .18rem;
		color: #f00;
		margin-right: .25rem;
	}
	
	.com_com_x_score2>div:nth-child(2) span {
		font-size: .10rem;
		color: #fff;
		background: #f00;
		border-radius: .05rem;
		padding: 0.015rem 0.063rem;
	}
</style>
<style>
	.search .van-nav-bar .van-icon{
		color: #18b4ed;
    	line-height: .46rem;
	}
	.van-icon.van-icon-search{
		color: #707070!important;
		left: .1rem;
	}
	.search .van-nav-bar__title{
		max-width: calc(100% - .5rem);
		margin-left: .5rem;
	}
	.search .van-cell{
		background: #f4f4f4;
		border-radius: .15rem;
		line-height: .24rem;
		padding: .03rem .1rem .03rem .25rem;
		font-size: .14rem;
	}
	.search .van-search__action{
		line-height: .46rem;
		font-size: .14rem;
		
	}
	.search .van-cell__value{
		display: flex;
		padding: 0 0 0 .1rem;
	}
	.search .van-icon.van-icon-clear.van-field__clear{
		line-height: .24rem;
		color: #cccccc;
	}
	.search .van-search{
		height: 0.44rem !important;
		
	}
</style>