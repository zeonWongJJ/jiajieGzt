<template>
	<div>
		<div class="white">
			<van-nav-bar title="收货地址" left-arrow right-text="新增地址" @click-left="onClickLeft" @click-right="onClickRight" />

		</div>
		<div class="box">

			<!--<div class="com_box" v-if="addshow == true">
				<ul class="ul_box">
					<li v-for="(item,index) in list" v-if="item.type == 1" class="li_box_bey" @click="detailsadds2(item,index)">
						<div class="div_box_bey">
							<div class="tit_bey">{{item.title}}</div>
							<div class="add_bey">
								{{item.adds}}
							</div>
							<div class="contact_bey">
								<span>{{item.name}}</span>
								<span>{{item.met}}</span>
							</div>
						</div>
						<div class="li_box_r_bey">
							<img src="../../assets/img/more_gray.png" />
						</div>
					</li>

				</ul>
			</div>-->


				<div class="com_box" >
				<ul class="ul_box">
					<li v-for="(item,index) in list"  class="li_box_bey" @click="detailsadds(item,index)">
						<div class="div_box_bey">
							<div class="tit_bey">{{item.contact_address_name}}</div>
							<div class="add_bey">
								{{item.contact_house_number}}{{item.contact_address_name}}
							</div>
							<div class="contact_bey">
								<span>{{item.contact_name}}</span>
								<span v-if="item.contact_gender == 1">(先生)</span>
								<span v-else>(女生)</span>
								<span>{{item.telephone_number}}</span>
							</div>
						</div>
						<div class="li_box_r_bey">
							<img src="../../assets/img/more_gray.png" />
						</div>
					</li>

				</ul>
			</div>

			<!--<div class="add_b">
				<div class="add_b_tit">
					以下地址超出配送范围
				</div>
				<div class="po_btr"></div>
				<ul class="ul_box_bey">
					<li v-for="(item,index) in list" v-if="item.type == 2" class="li_box_bey">
						<div class="div_box_bey">
							<div class="tit_bey">{{item.title}}</div>
							<div class="add_bey">
								{{item.adds}}
							</div>
							<div class="contact_bey">
								<span>{{item.name}}</span>
								<span>{{item.met}}</span>
							</div>
						</div>
						<div class="li_box_r_bey">
							<img src="../../assets/img/more_gray.png" />
						</div>
					</li>

				</ul>
			</div>-->
		</div>

	</div>
</template>

<script>
	import api from '@/api/api'
	export default {
//			props: ['addshow'],
		data() {
			return {
				list: [
//				{
//						title: '阿斯顿发放给',
//						name: 'name',
//						adds: '广东省广州市越秀区大东街道兰州牛肉拉面(东华西路)广州市越秀区职业技术学校',
//						met: '15017592475',
//						type: 1,
//					},
//					{
//						title: '阿斯顿发放给',
//						name: 'name',
//						adds: '广东省广州市越秀区大东街道兰州牛肉拉面(东华西路)广州市越秀区职业技术学校',
//						met: '15017592475',
//						type: 1,
//					},
//					{
//						title: '阿斯顿发放给',
//						name: 'name',
//						adds: '广东省广州市越秀区大东街道兰州牛肉拉面(东华西路)广州市越秀区职业技术学校',
//						met: '15017592475',
//						type: 2,
//					},
//					{
//						title: '阿斯顿发放给',
//						name: 'name',
//						adds: '广东省广州市越秀区大东街道兰州牛肉拉面(东华西路)广州市越秀区职业技术学校',
//						met: '15017592475',
//						type: 2,
//					},
//					{
//						title: '阿斯顿发放给',
//						name: 'name',
//						adds: '广东省广州市越秀区大东街道兰州牛肉拉面(东华西路)广州市越秀区职业技术学校',
//						met: '15017592475',
//						type: 2,
//					},
				]
			}
		},
		mounted() { //生命周期
			this.oaddlists()
		},
		methods: { //方法
			oaddlists(){
				let that = this
				let forms = {}
				forms.row = 50
				that.$fetch('user_address_list', forms).then(rs =>{
          that.list = rs
				})
			},
			onClickLeft() {
				this.$router.push({
					path: '/member'
				})
			},
			onClickRight() {
				this.$router.push({
					path: '/editadd'
				})
			},
//			修改吧q
			detailsadds(item,index) {
				let that = this
				let items = JSON.stringify(item)
				that.$router.push({
					path: '/editadd',
					query:{
						items
					}
				})
			},

		},

	}


</script>

<style scoped>
	.box {
		background: #fff;
		height: 100%;
		font-size: 0.14rem;
		overflow: auto;
	}

	.head {
		background: #fff;
		height: 0.44rem;
		display: flex;
		justify-content: space-between;
	}

	.head div {
		line-height: .44rem;
		/*color: #FF6633;*/
	}

	.head div:nth-child(1) {
		flex: 0 0 0.7rem;
		padding: 0.02rem 0 0 .15rem;
		/*text-align: center;*/
	}

	.head div:nth-child(1) img {
		width: .09rem;
		height: .18rem;
	}

	.head div:nth-child(2) {
		flex: 1;
		text-align: center;
		font-size: .18rem;
	}

	.head div:nth-child(3) {
		flex: 0 0 0.7rem;
		font-size: .12rem;
		text-align: center;
	}

	.com_box {
		background: #fff;
		border-top: 0.01rem solid #EEEEEE;
	}

	.li_box_bey {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 0.01rem solid #eee;
		padding: 0 .15rem .15rem;
	}

	.li_box_r_bey {
		flex: 0 0 .3rem;
		margin-top: 0.35rem;
		text-align: center;
	}

	.li_box_r_bey img {
		width: .08rem;
		/*height: .16rem;*/
	}

	.div_box_bey {
		flex: 1;
	}

	.tit_bey {
		height: .45rem;
		line-height: .45rem;
		font-size: .18rem;
		font-weight: 700;
	}

	.add_bey {
		font-size: .14rem;
	}

	.contact_bey {
		margin: .05rem 0 0 0;
	}

	.contact_bey span {
		color: #888;
	}

	.add_b_tit {
		height: .45rem;
		line-height: .45rem;
		padding: 0 .15rem;
		font-size: .18rem;
		border-bottom: 0.01rem solid #eee;
		font-weight: 700;
	}

	.add_b {
		border-top: .1rem solid #EEEEEE;
		position: relative;
		z-index: 20;
	}

	.po_btr {
		position: absolute;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .05);
		z-index: 20;
	}
</style>
