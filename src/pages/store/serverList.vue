<template>
	<div class="serverList">
		<div>
			<van-nav-bar title="服务列表" left-arrow right-text="发布" @click-left="onClickLeft"  @click-right="onClickRight" />
		</div>
		<div class="top_nav">
			<div v-if="list_com.length == 0" style="padding: .1rem;text-align: center;">暂无数据</div>
			<div v-else class="commodity">
				<ul>
					<li v-for="(its,index) in list_com" class="list_coms" @click="detailst(its.id)">
						<div class="com_com">
							<div>
								<img src="../../assets/img/logo_h.png" v-if="its.service_img == ''" />
								<img :src="uploadFileUrl + its.service_img[0]"  v-else />
							</div>
							<div class="com_com_x">
								<div class="com_com_x_tit">
									{{its.service_name}}
								</div>
								<div class="com_com_x_ov">
									{{replaceStyle(its.service_info)}}
								</div>
								<div class="com_com_x_score">
									<div style="margin-right: .1rem;">
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
										￥{{its.service_remuneration}}{{getUnit(its.service_value_unit_id)}}
									</div>
								</div>
							</div>
						</div>
						<div class="but_coms">
							<div class="but_coms_but1" @click.stop="isshow = true,ids = its.id,indexs = index">删除服务</div>
							<div class="but_coms_but2" @click.stop="editSer(its)">编辑服务</div>
						</div>
					</li>
				</ul>
			</div>
		</div>

		<!--弹出窗-->
		<div class="po_box" v-show="isshow">
			<div class="po_box_div">
				<div class="po_box_div_tit">提示</div>
				<div class="po_box_div_com">
					<p>确定删除该条服务？</p>
					<p>删除服务后用户将无法查看！</p>
				</div>
				<div class="po_box_but">
					<div @click.stop="isshow = false">取消</div>
					<div @click.stop="spilits">确认</div>
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
				list_com: [],
				isshow: false,
				ids: 0,
				indexs:0,
				storeId:0,
				uploadFileUrl:api.uploadFileUrl+'/',
        unitList: this.$store.state.unitList
			}
		},
		created() { //生命周期
			this.storeId = this.$route.query.storeId
			this.init();
		},
		methods: { //方法

      getUnit(id){
        let name = '';
        if(this.unitList.length){
          this.unitList.forEach(item =>{
            if(item.id == id){
              name = item.unit_name
            }
          })
        }
        return name
      },
      replaceStyle(str) {
        const reg = /<[^<>]+>/g
        return str.replace(reg, '');
      },
			init(){
        this.$fetch('store_get_services', {rows:50}, this.storeId).then(rs =>{
          this.list_com = rs
				})
        this.$fetch('service_util_list').then(rs=>{
          if (rs.length > 0) {
            this.unitList = rs
            this.$store.commit('setUnit', rs)
          }
        })
			},
			onClickLeft() {
				this.$store.commit('store_show', false)
				this.$router.push({
					path:'/home'
				})
			},
			onClickRight(){
				this.$router.push({
					path: "releaseService"
				});
			},
			//详情
			detailst(serverId) {
				this.$router.push({
					path: '/service_details',
					query:{
						store_id:serverId
					}
				})
			},
			//刪除
			spilits() {
				let that = this
				that.$fetch('service_delete', {}, that.ids).then(rs =>{
          that.list_com.splice(that.indexs, 1)
          that.isshow = false
				}).catch(e => {
          that.isshow = false
        })
			},
			//编辑
			editSer(data){
				this.$router.push({
					path: '/releaseService',
					query:{
						id:data.id
					}
				})
			},

		},
	}
</script>

<style scoped>
	.serverList {
		background: #f5f5f5;
	}

	.top_nav {
		position: relative;
		height: calc(100% - .46rem);
		overflow-y: auto;
	}

	.top_nav_ul {
		display: flex;
		background: #fff;
		border-bottom: .02rem solid #eee;
	}

	.top_nav_ul>li {
		text-align: center;
		height: .54rem;
		line-height: .54rem;
		flex: 0 0 20%;
		position: relative;
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
		margin-bottom: -0.02rem;
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
	/*.top_nav_img img{
		width: .1rem;
	}*/

	.spanimg {
		margin: .02rem 0 0 .05rem;
		width: .1rem;
		height: .1rem;
		background: url(../../../static/images/bot_s.png) no-repeat;
		background-size: .1rem;
	}

	.spanimg_s {
		margin: .02rem 0 0 .05rem;
		width: .1rem;
		height: .1rem;
		background: url(../../../static/images/bot_h.png) no-repeat;
		background-size: .1rem;
	}

	.spanimg_h {
		margin: .02rem 0 0 .05rem;
		width: .1rem;
		height: .1rem;
		background: url(../../../static/images/top_s.png) no-repeat;
		background-size: .1rem;
	}
	/*列表*/

	.commodity {
		background: #fff;
	}


	.list_coms {
		margin-top: .1rem;
	}

	.com_li {
		margin-bottom: 0.1rem;
		background: #fff;
		padding: 0 0 0.2rem 0;
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
		border-bottom: 1px solid #f5f5f5;
	}

	.com_com>div:nth-child(1) {
		flex: 0 0 .9rem;
		margin: .08rem;
		border-radius: .1rem;
		overflow: hidden;
		padding: .05rem 0 0 0;
	}

	.com_com>div:nth-child(1) img {
		width: .9rem;
		height: .9rem;
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

	.but_coms {
		display: flex;
		justify-content: flex-end;
		padding: 0 .15rem;
		background: #fff;
	}

	.but_coms div {
		margin: .08rem 0 .08rem .1rem;
		flex: 0 0 .75rem;
		height: .28rem;
		line-height: .28rem;
		text-align: center;
		padding: .05rem .08rem;
		background: #fff;
		border: 0.01rem solid #B2B2B2;
		border-radius: .3rem;
		font-size: .14rem;
		color: #B2B2B2;
	}

	.but_coms_but1 {
		border: 0.01rem solid #B2B2B2 !important;
		color: #B2B2B2 !important;
	}

	.but_coms_but2 {
		border: 0.01rem solid #f00 !important;
		color: #f00 !important;
	}

	.but_coms_but3 {
		border: 0.01rem solid #f00 !important;
		color: #f00 !important;
	}

	.but_coms_but4 {
		border: 0.01rem solid #18b4ed !important;
		color: #18b4ed !important;
	}

	.po_box {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		/*height: 100%;*/
		background: rgba(0, 0, 0, .3);
		z-index: 9999;
	}

	.po_box_div {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 2.75rem;
		background: #fff;
		border-radius: .1rem;
		margin: -0.95rem 0 0 -1.375rem;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
	}

	.po_box_div_tit {
		color: #18B4ED;
		height: .5rem;
		line-height: .5rem;
		text-align: center;
		border-bottom: .01rem solid #eee;
		font-size: .18rem;
	}

	.po_box_div_com {
		text-align: center;
		font-size: .16rem;
		padding: .1rem;
	}

	.po_box_but {
		display: flex;
		border-top: .01rem solid #eee;
	}

	.po_box_but div {
		flex: 0 0 49%;
		text-align: center;
		height: .5rem;
		line-height: .5rem;
	}

	.po_box_but div:nth-child(2) {
		border-left: .01rem solid #eee;
		color: #18B4ED;
	}
</style>
<style type="text/css">
	.serverList .van-nav-bar__text {
		color: #fff !important;
		font-size: .16rem;
	}
</style>
