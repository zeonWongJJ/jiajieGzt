<template>
	<div class="myColl body">
		<!--<van-nav-bar class="blue" title="我的收藏" :right-text="edit ? '完成' : '编辑'" left-arrow @click-left="onClickLeft" @click-right="edit = !edit" />-->
		<van-nav-bar class="blue" :right-text="edit ? '完成' : '管理'" left-arrow @click-left="onClickLeft" @click-right="edit = !edit">
			<div class="navBox" slot="title">
				<div class="nav" :class="{checked:navIndex == 1}" @click="navIndex = 1;edit = false">服务收藏</div>
				<div class="nav" :class="{checked:navIndex == 2}" @click="navIndex = 2;edit = false">店铺收藏</div>
			</div>

		</van-nav-bar>
		<div class="list">
			<transition name="service">
        <div class="list_container" v-show="navIndex == 1">
          <div class="list_dd" v-for="(ac,y) in service_list" >
						<label v-show="edit">
							<input :checked="checkeds.indexOf(ac.id)>=0" @click="checkOne(ac.id)" type="checkbox" />
						</label>
						<div class="listBox">
							<div class="img">
                <img src="../../assets/img/logo_h.png" v-if="ac.img == ''" alt="" />
								<img :src="uploadFileUrl + ac.img" v-else alt="" />
							</div>

							<ul class="right" @click="$router.push({path:'/service_details?store_id='+ac.service_id})">
								<li>
									<span>{{ac.service_name}}</span>
								</li>
								<div v-html="replaceStyle(ac.service_info)"></div>
								<!--<li>
									<div>
										<span>等级</span>
										<em>{{ac.store_level}}</em>
									</div>
									<div>
										<span>已售</span>
										<em>{{ac.service_sold}}</em>
									</div>
								</li>
								<li>
									<span>¥{{ac.service_remuneration}}</span>
								</li>-->
							</ul>
						</div>
					</div>
				</div>
			</transition>
			<transition name="store">
        <div class="list_container" v-show="navIndex == 2">
          <div class="list_dd" v-for="(ac,y) in store_list" >
						<label v-show="edit">
							<input :checked="checkeds.indexOf(ac.id)>=0" @click="checkOne(ac.id)" type="checkbox" />
						</label>
						<div class="listBox">
							<div class="img">
                <img src="../../assets/img/logo_h.png" v-if="ac.img == ''" alt="" />
                <img :src="uploadFileUrl + ac.img" v-else alt="" />
							</div>
							<ul class="right" @click="$router.push('/onshop?statistics_id='+ac.store_id+'&storeUnshow=1')">
								<li>
									<span>{{ac.store_name}}</span>
								</li>
								<li>{{ac.store_info}}</li>
								<li>
									<div>
										<span>等级</span>
										<em>{{ac.store_level}}</em>
									</div>
									<div>
										<span>已售</span>
										<em>{{ac.store_sold}}</em>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</transition>
		</div>

			<!--<div class="list_dl" v-for="(item,index) in list" :class="index+'_dl'">
				<div class="title">
					<label :for="'dt_'+index">
						<input v-if="edit" @click="checkAll(item.shopList)" type="checkbox" :checked="sureCheck(item.shopList)" />
						<i><img src="../../../static/images/store.png" alt="" /></i>
						<span>{{item.storeName}}</span>
					</label>
				</div>
				<div class="list_dd" v-for="(ac,y) in item.shopList" >
					<label :for="index+'_dd_'+y" v-show="edit">
						<input :checked="checkeds.indexOf(ac.id)>=0" @click="checkOne(ac.id)" type="checkbox" />
					</label>
					<div class="listBox">
						<div class="img">
							<img :src="uploadFileUrl+ac.service_img" alt="" />
						</div>
						<ul class="right">
							<li>
								<span>{{ac.service_name}}</span>
							</li>
							<li>{{ac.service_info}}</li>
							<li>
								<div>
									<span>等级</span>
									<em>{{ac.store_level}}</em>
								</div>
								<div>
									<span>已售</span>
									<em>{{ac.service_sold}}</em>
								</div>
							</li>
							<li>
								<span>¥{{ac.service_remuneration}}</span>
							</li>
						</ul>
					</div>
				</div>
			</div>-->

		<van-tabbar v-show="edit" >
			<van-tabbar-item @click="cancel">取消</van-tabbar-item>
			<van-tabbar-item @click="remove">删除</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	import api from '@/api/api'
	export default {
		data() {
			return {
				edit: 0,
				list:[],
				service_list: [],
				store_list:[],
				checkeds:[],
				uploadFileUrl:api.uploadFileUrl+'/',
				navIndex:1,
			}
		},
		mounted() { //生命周期 user_collect_list
			this.init();
		},
		watch:{
			edit(val){
				this.checkeds = [];
			}
		},
		methods: { //方法
      replaceStyle(str) {
        const reg = /<[^<>]+>/g
        return str.replace(/amp;/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(reg, '');
      },
			init(){//初始化请求
				this.$fetch('user_collect_list', {},'-service').then(rs =>{
					this.service_list = rs
				})
				this.$fetch('user_collect_list', {},'-store').then(rs =>{
			          this.store_list = rs;
				})
			},
			sureCheck(arr){//判断是否全选状态
				let that = this
				let newArr = []
				arr.forEach(function (item) {
		          if(that.checkeds.indexOf(item.id)>=0){newArr.push(item.id)}
		        })
				if(newArr.length == arr.length){//表示勾选列表里已存在所有id
					return 1
				}
				return 0
			},
			checkAll(arr){//全选按钮
				let that = this;
				if (that.sureCheck(arr)) {
			        // 已经全选时，取消全选
			        arr.forEach(function (item) {
			          let idIndex = that.checkeds.indexOf(item.id);
			          that.checkeds.splice(idIndex,1)
			        })

			    } else {
			        arr.forEach(function (item) {
			          that.checkeds.push(item.id)
			        })
			    }
			},
			checkOne(id){//单选
				let idIndex = this.checkeds.indexOf(id)
				if(idIndex>=0){
					//勾选数组中已有该id
					this.checkeds.splice(idIndex, 1)
				}else{
					this.checkeds.push(id)
				}
			},

			//底部按钮
				//取消按钮
			cancel(){
				this.checkeds = []
			},
				//删除按钮
			remove(){
				var that = this;
				var odata = {id:that.checkeds}
				that.$fetch('user_collect_signle', odata).then(rs =>{
		          that.init();
		          that.edit = false;
		        })
			},

			//返回按钮
			onClickLeft() {
				this.$router.back(-1)
			},

			getList(aa){//数组根据store_name分类
				var moth = [],
			    flag = 0,
			    list = aa;
				var wdy = {
				    storeName: '',
				    shopList: ''
				}
				for (var i = 0; i < list.length; i++) {
				    var az = '';
				    for (var j = 0; j < moth.length; j++) {
				        if (moth[j].storeName == list[i]['store_name']) {
				            flag = 1;
				            az = j;
				            break;
				        }
				    }
				    if (flag == 1) {
				        var ab = moth[az];
				        ab.shopList.push(list[i]);
				        flag = 0;

				    } else if (flag == 0) {
				        wdy = {};
				        wdy.storeName = list[i]['store_name'];
				        wdy.shopList = new Array();
				        wdy.shopList.push(list[i]);
				        moth.push(wdy);
				    }
				}

				return moth;
			},
		},
	}
</script>

<style scoped>
	.list_container .title>label,
	.list_container .title,
	.list_container .title>label>i,
	.list_container .list_dd,
	.list_container .list_dd>.listBox,
	.listBox>ul>li {
		display: flex;
		align-items: center;
	}

	.list_container .list_dl:after{
		content: '';
		display: block;
		height: .1rem;
		background: #f5f5f5;
	}
	.list_container .title {
		padding: 0.12rem .15rem;
		justify-content: space-between;
	}

	.list_container .title>label>img {
		width: 0.17rem;
		height: 0.17rem;
		padding-left: 0.12rem;
	}

	.list_container .title>label>i{
		margin-right: 0.06rem;
	}

	.list_container .title>label>i>img {
		width: .15rem;
		height: .15rem;
	}

	.list_container .title>label>span {
		font-size: 0.14rem;
	}

	.list_container .title>div {
		font-size: 0.12rem;
		color: #b2b2b2;
		margin-right: 0.12rem;
	}

	.list_container .list_dd {
		justify-content: flex-start;
		background: #fafafa;
		padding: .1rem .15rem;
		margin-bottom: .2rem;
	}

	.list_container .list_dd label>img {
		width: 0.17rem;
		height: 0.17rem;
		padding-left: 0.12rem;
	}
	.list_container .list_dd input,.list_container .title input{
		width: .2rem;
		height: .2rem;
		background: url(../../../static/images/check.png) no-repeat;
		background-position: center;
		background-size: .17rem .17rem;
		-webkit-appearance:none;
		outline: none;
	}
	.list_container .list_dd input:checked,.list_container .title input:checked{

		background: url(../../../static/images/checked_round.png) no-repeat;
		background-position: center;
		background-size: .17rem .17rem;
	}
	.list_container .list_dd>.listBox {
		align-items: flex-start;
		width: 100%;
	}
	.listBox>ul{
		flex: 1;
		margin-left: 0.15rem;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.listBox>ul>li{
		display: block;
		margin-bottom: 0.09rem;
	}

	.listBox>.img{
		flex: 0 0 .85rem;
		height: 0.85rem;
		border-radius: 0.04rem;
		overflow: hidden;
	}
	.listBox>.img img{
		width: 100%;
		height: auto;
	}

	.listBox>ul>li em {
		font-style: normal;
	}

	.listBox>ul>li:nth-child(1) {
		justify-content: space-between;
	}

	.listBox>ul>li:nth-child(1)>span {
		font-size: 0.16rem;
		font-weight: bold;
	}

	.listBox>ul>li:nth-child(1)>em {
		font-size: 0.12rem;
		color: #ff9c0f;
		padding: 0.01rem 0.05rem;
		border: 1px solid #ff9c0f;
		border-radius: 0.04rem;
	}

	.listBox>ul>li:nth-child(2) {
		font-size: 0.14rem;
		color: #707070;
		overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	}

	.listBox>ul>li:nth-child(3)>div {
		font-size: 0.12rem;
		margin-right: 0.1rem;
	}

	.listBox>ul>li:nth-child(3)>div>em {
		color: #ff3434;
	}

	.listBox>ul>li:nth-child(4)>span {
		font-size: 0.18rem;
		color: #ff3434;
	}

	.listBox>ul>li:nth-child(4)>em {
		font-size: 0.1rem;
		margin-left: 0.16rem;
		color: White;
		background: #ff3434;
		padding: 0.01rem 0.05rem;
		border-radius: 0.04rem;
	}
	.service-enter-active, .service-leave-active {
	    transition: all .5s;
	}
	.service-enter, .service-leave-to /* .fade-leave-active below version 2.1.8 */ {
	    opacity: 0;
	    -webkit-transform: translate(-100%, 0);
	    transform: translate(-100%, 0);
	}
	.store-enter-active, .store-leave-active {
	    transition: all .5s;
	}
	.store-enter, .store-leave-to /* .fade-leave-active below version 2.1.8 */ {
	    opacity: 0;
	    -webkit-transform: translate(100%, 0);
	    transform: translate(100%, 0);
	}
	.myColl{
		height: 100%;
	}
	.list{
		height: calc(100% - 1rem);
		position: relative;
	}
	.list .list_container{
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
	}
</style>
<style>
	.myColl .van-nav-bar__text{
		color:white;
		font-size:0.16rem;
	}
	.myColl .van-nav-bar__text:active{
		background: #18B4ED;
	}
	.myColl .van-tabbar-item__text{
		font-size:0.14rem;
	}
	.myColl .van-tabbar-item:nth-child(2)>.van-tabbar-item__text{
		color:#ff3434;
	}
	.myColl .van-nav-bar .navBox{
	    display: flex;
	    justify-content: space-around;
	    font-size: .16rem;
	}
	.myColl .van-nav-bar .navBox .nav.checked{
		color: orange;
	}
	.myColl .van-tabbar{
		height: .54rem;
	}
</style>
