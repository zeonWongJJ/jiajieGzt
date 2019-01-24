<template>
	<div class="orderd">
		<van-nav-bar title="提交订单" left-arrow @click-left="onClickLeft" />
		<div class="body">
			<div class="adds">
				<div class="addsri" v-if="addnema == ''" @click="addList = true">
					<div class="lrm">
						<div>
							添加地址
						</div>
					</div>
					<div class="addcor">
						请选择联系地址
					</div>
				</div>
				<div class="addsri" @click="addList = true" v-else>
					<div class="lrm">
						<div>
							联系人：{{addnema}}
						</div>
						<div>
							{{addtel}}

						</div>
					</div>

					<div class="addcor">
						联系地址：{{contact_address_name}}{{addaddres}}
					</div>
				</div>
				<div class="right"></div>
			</div>

			<div class="com_box" v-if="Object.keys(service_info).length">
				<ul class="ul_coms">
					<li class="list_coms">
						<div class="list_coms_dimg">
							<span><img src="../../assets/img/img_vx/shop_busines.png"/></span>
							<span>{{service_info.store_info.store_name}}</span>
						</div>
						<!--简介-->
						<div class="com_com">
							<div>
								<img v-if="service_info.store_info.store_pic && service_info.store_info.store_pic[0] && service_info.store_info.store_pic[0].length" :src="uploadFileUrl + service_info.store_info.store_pic[0]" />
								<img src="../../assets/img/logo_h.png" v-else/>
							</div>
							<div class="com_com_x">
								<div class="com_com_x_score">
									<div>
										<span style="font-size: .16rem;">{{service_info.row.service_name}}</span>
									</div>
								</div>
								<!--<div class="com_com_x_score_colco" v-clampy="3" v-html="replaceStyle(lists.service_info)"></div>-->
								<div class="com_com_x_score_colco">
									<div v-for="(item,index) in lists">
										{{item.item_name}}&nbsp;&nbsp; ￥{{item.item_change}}元 &nbsp;&nbsp;数量：{{item.goodsnumber}}
									</div>
								</div>
								<div class="com_com_x_score2">
									<div>￥{{service_info.row.service_remuneration}}<span>{{getUnit(service_info.row.service_value_unit_id)}}</span></div>
								</div>
                <div>价格已包含自营清洁剂</div>
							</div>

						</div>
						<!--弹出窗-->
						<div class="po_box" v-show="isshow">
							<div class="po_box_div">
								<div class="po_box_div_tit">提示</div>
								<div class="po_box_div_com" v-if="indexs ">
									确定要删除此订单？
								</div>
								<div class="po_box_div_com" v-else>
									确定要取消此订单？
								</div>
								<div class="po_box_but">
									<div @click.stop="xbut()">取消</div>
									<div @click.syop="spilits(its,index)">确认</div>
								</div>
							</div>
						</div>
					</li>
				</ul>

			</div>
			<div class="time" @click="show = true">
				<div>服务时间</div>
				<div>{{resOrder.length ? '已编辑' : '请选择'}}</div>
			</div>
			<div class="orderTime" v-if="resOrder">
				<div class="li" v-for="item in resOrder">
					<div>{{formatTime(item.order_at*1000,item.order_length)}}</div>
					<div>￥{{item.charge}}</div>
				</div>
			</div>
      <!--<div class="notime">-->
        <!--<div>使用自营清洁剂，收费{{config_27_value}}元/小时</div>-->
        <!--<i class="iconfont" style="color: #18B4ED;" :class="[is_use_detergent ? 'icon-checkoutline02' : 'icon-check02']" @click="is_use_detergent = !is_use_detergent"></i>-->
      <!--</div>-->
			<div class="notime">
        <van-field
          style="padding: 0;font-size: .14rem;"
          v-model="end"
          label="下单留言："
          type="textarea"
          placeholder="如有特殊要求，请在此填写附信"
          rows="2"
          autosize
        />
			</div>
			<div class="bot_box">
				<div class="bot_div">
					<div class="bot_div_men">
						<div class="but_num" v-if="long != 1">
							总计：<span class="but_span">￥<span class="but_span_men">{{money}}</span></span>
						</div>
						<div class="but_num" v-else>
							总计：<span class="but_span">￥<span class="but_span_men">{{mennum}}</span></span>
						</div>
					</div>
					<div class="bot_div_zf" @click="pay">
						去支付
					</div>
				</div>

			</div>

			<!--弹出窗-->

			<van-popup v-model="showTime" position="bottom">
				<van-datetime-picker v-model="currentDate" confirm-button-text="完成" @change="setTime($event)" @cancel="closeTime" @confirm="timeSuccess" cancel-button-text="返回" type="year-month-day-hour-minute" :min-date="minDate" :formatter="formatter" />

			</van-popup>

			<div class="addsa" v-show="addList" @click="addList = false;">
				<div class="addsa_div">
					<ul>
						<li v-for="(aditem,index) in addslists" @click="indexadd(aditem,index)">
							<div class="addsri">
								<div class="lrm">
									<div>
										联系人：{{aditem.contact_name}}
									</div>
									<div>
										{{aditem.telephone_number}}
									</div>
								</div>

								<div class="addcor">
									联系地址：{{aditem.contact_address_name}}
								</div>
							</div>
						</li>
						<li>
							<div style="text-align: center;font-size: .16rem;" @click="addShow = true;">
								添加新地址
							</div>
						</li>
						<div>以下地址超出服务范围：</div>
						<li v-for="(aditem,index) in notin" style="color: #969896;">
							<div class="addsri">
								<div class="lrm">
									<div>
										联系人：{{aditem.contact_name}}
									</div>
									<div>
										{{aditem.telephone_number}}
									</div>
								</div>

								<div class="addcor">
									联系地址：{{aditem.contact_address_name}}
								</div>
							</div>
						</li>
					</ul>

				</div>
			</div>

		</div>
		<periodicReservation v-model="show" @finish="getOrder" :service_id="store_id"></periodicReservation>
		<orderConfirmation v-model="payShow" :orderData="orderData" :orderType="2"></orderConfirmation>
		<editAddress v-model="addShow" :addData="{}"></editAddress>
	</div>
</template>

<script>
	import api from '@/api/api'
	import periodicReservation from '@/components/periodicReservation'
	import orderConfirmation from '@/components/order_confirmation'
	import editAddress from '@/components/editAddress'
  import utils from '@/utils/utils'
		export default {
			components:{
			periodicReservation,
			editAddress,
			orderConfirmation
		},
		data() {

			return {
				show:false,
				resOrder:[],
				btnState: {
					payBtn: true,
					postPayBtn: true
				},
				lists: [],
				nums: -1,
				order_deductible_type: 0,
				fuck: '123123123',
				onshows: true, //防止多次点击
				addList: false,
				isshow: false,
				indexs: '',
				num: 0,
				uploadFileUrl: api.uploadFileUrl + '/',
				fgshow: false,

				listtype: 'alipay',
				addslists: [],
				addnema: '',
				contact_lal: '',
				addtel: '',
				addaddres: '',
				contact_address_name: '',
				minDate: this.addMin(),
				showTime: false,
				currentDate: this.addMin(),
				itemdata: '',
				long: 1,
				end: '',
				wechat: this.isWechat(),
				getTimes: '',
				money: 0,
				mennum: 0,
				payShow:false,
				orderData:{},
				addShow:false,
				orderTimes:[],
				service_item:[],
				store_id:this.$route.query.store_id,
				service_info:{},
				unitList:this.$store.state.unitList,
				notin:[],
        is_use_detergent: false,
        config_27_value: 0
			}
		},
		mounted() { //生命周期
			if(this.$route.query.list){
				this.lists = JSON.parse(this.$route.query.list);
				this.lists.forEach(item =>{
					this.service_item.push({
						id:item.id,
						length:item.goodsnumber
					})
				})
			}
			this.init();
			this.getAddressList();
		},
		watch:{
			addShow(val){
				if(!val){
					this.getAddressList()
				}
			},
      is_use_detergent() {
        this.getOrder(this.orderTimes)
      },
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
			getOrder(data){
        if (typeof data == 'object' && Object.keys(data).length > 0) {
          this.resOrder = [];
          if (this.service_item.length) {
            data.service_item = this.service_item
          }
          data.is_use_detergent = (this.is_use_detergent === true ? 1 : 0)
          this.orderTimes = data;
          if (Object.keys(data).length) {
            this.$fetch('order_charge_calc', data, '-' + this.store_id).then(rs => {
              this.resOrder = rs.orders
              this.mennum = rs.total_price
            })
          }
        }
			},
			getDay(time){
				let data = new Date(time)
				if(data){
					let day = data.getDay();
					let cnDay = '';
					switch (day){
						case 0 :
							cnDay = '周日';
							break;
						case 1 :
							cnDay = '周一';
							break;
						case 2 :
							cnDay = '周二';
							break;
						case 3 :
							cnDay = '周三';
							break;
						case 4 :
							cnDay = '周四';
							break;
						case 5:
							cnDay = '周五';
							break;
						case 6 :
							cnDay = '周六';
							break;
					}
					return cnDay
				}else{
					console.log('时间格式有误：' + time);
		          	return ''
				}
			},
			//转换时间
      formatTime(time,longs) {
        let data = new Date(time)
        let data2 = new Date(data.getTime() + longs * 60 * 60 * 1000)
          let year,month,day,hour,minute,hour2,minute2
        if (data) {
            year = data.getFullYear();
          month = this.add0(data.getMonth() + 1);
            day = this.add0(data.getDate());
            hour = this.add0(data.getHours());
            minute = this.add0(data.getMinutes());
        } else {
          console.log('时间格式有误：' + time);
            return ''
        }
        if(data2){
          hour2 = this.add0(data2.getHours());
            minute2 = this.add0(data2.getMinutes());


        }

        return year + '-' + month + '-' + day + '(' + this.getDay(time) + ')' + hour + ':' + minute +'-'+ hour2 + ':' + minute2

      },
      add0(time) {
          var time = Number(time);
          if (time < 10) {
              time = '0' + time
          }
          return time
      },

			formatter(type, value) {
				if(type === 'year') {
					return `${value}年`;
				} else if(type === 'month') {
					return `${value}月`
				} else if(type === 'day') {
					return `${value}日`
				} else if(type === 'hour') {
					return `${value}时`
				} else if(type === 'minute') {
					return `${value}分`
				}
				return value;
			},

			replaceStyle(str) {
				const reg = /<[^<>]+>/g
				return str.replace(reg, '');
			},
			isWechat() {
				var ua = navigator.userAgent.toLowerCase();
				return ua.indexOf('micromessenger') != -1;
			},
			addMin() {
				return new Date(new Date().valueOf() + 30 * 60 * 1000)
			},
			onClickLeft() {
				let that = this
				that.$router.back(-1)
			},
			init() {
				this.$fetch('service_get', {get_store_info:1}, this.store_id).then(rs => {
          this.service_info = rs;
					this.money = rs.row.service_remuneration
        })
        this.$fetch('service_util_list').then(rs=>{
					this.unitList = rs
				})
        this.$fetch('config_get', {}, '27').then(rs => {
          this.config_27_value = rs.config_value
        })
			},
			//选择上门时间
			setTime(time) {
				//     	 this.currentDate = time
				var str = time.getValues();
				this.getTimes = str[0] + str[1] + str[2] + str[3] + str[4];
				this.getTimes = utils.convertDataFormat(this.getTimes);
				this.getTimes = new Date(this.getTimes.replace(/-/g, '/'));
			},
			timeSuccess() {
				if(!this.getTimes) {
					this.currentDate = this.addMin();
				} else {
					this.currentDate = this.getTimes;
				}
				this.showTime = false
			},
			closeTime() {
				this.showTime = false
			},
			//转换时间
			getTime(time) {
				var data = new Date(time)
				if(data) {
					var year = data.getFullYear();
					var month = this.add0(data.getMonth() + 1);
					var day = this.add0(data.getDate());
					var hour = this.add0(data.getHours());
					var minute = this.add0(data.getMinutes());
					return year + '年' + month + '月' + day + '日' + hour + '时' + minute + '分'
				} else {
					console.log('时间格式有误：' + time);
					return ''
				}
			},
			add0(time) {
				var time = Number(time);
				if(time < 10) {
					time = '0' + time
				}
				return time
			},

			//			地址列表
			getAddressList() {
				this.$fetch('user_address_list', {row:50,service_id:this.store_id}).then(rs => {
					this.addslists = rs.within
					this.notin = rs.notin
					if(this.addslists.length > 0) {
						let arr = this.addslists.reverse()[0]
						this.addnema = arr.contact_name
						this.addtel = arr.telephone_number
						this.addaddres = arr.contact_house_number
						this.contact_lal = arr.contact_lal
						this.contact_address_name = arr.contact_address_name
					}
				})
			},
			indexadd(aditem, index) {
				let that = this
				that.addnema = aditem.contact_name
				that.contact_lal = aditem.contact_lal
				that.addtel = aditem.telephone_number
				that.addaddres = aditem.contact_house_number
				that.contact_address_name = aditem.contact_address_name
				that.addList = false
			},

			// 统一支付
			pay() {
        if (this.addnema == '') {
          this.$toast('请添加服务地址')
          return
        }
        if (!this.orderTimes.startTime || !this.orderTimes.order) {
           this.$toast('请选择上门时间')
          return
        }
        let list = {
          contact_name: this.addnema,
          address_name:  this.contact_address_name + this.addaddres,
          order_phone: this.addtel,
          order_lal: this.contact_lal,
          service_message: this.end,
          orders: this.orderTimes.order,
          total: this.mennum,
          service_id: this.store_id,
          startTime: this.orderTimes.startTime,
          cycleLong: this.orderTimes.cycleLong,
          is_use_detergent: (this.is_use_detergent === true ? 1 : 0)
        }
        if (this.service_item) {
          list.service_item = this.service_item
        }
        this.orderData = list;
        if (this.service_info.row.order_charging == 'NON_RESERVATION') {
          this.orderData.order_deductible_type = 0
          this.orderData.service_price_type = 'alipay'
          this.$fetch('service_cyc_orders', this.orderData, this.orderData.service_id).then(rs => {
            let order_sign = rs.order_sign; // 订单签名
            let order_sn = rs.order_sn; // 订单流水号
            utils.pay(order_sn, order_sign);
          }).catch(e => {
            this.loading = false
          })
        } else {
          this.payShow = true
        }
      }
		},
	}
</script>

<style scoped>
  @import "../../assets/icon/iconfont.css";
	.orderd {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		background: #fff;
	}

	.body {
		height: calc(100% - 1rem);
		overflow-y: auto;
		padding: 0 .12rem;
	}

	.adds {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: .05rem 0 0 0;
		padding-right: 0.15rem;
		background: #fff;
		box-shadow: 2px 2px 10px rgba(224, 243, 250, 1);
	}

	.adds .right {
		width: 0.1rem;
		height: 0.2rem;
		background: url(../../assets/img/more_gray.png) no-repeat;
		background-size: 0.1rem 0.2rem;
	}

	.adds .addsri {
		padding: .15rem;
		width: 100%;
	}

	.lrm {
		display: flex;
		justify-content: space-between;
	}

	.lrm div:nth-child(1) {
		flex: 0 0 1.9rem;
	}

	.addcor {
		flex: 0 0 2.8rem;
	}

	.commodity {
		background: #FAFAFA;
	}

	.commodity ul {
		background: #FAFAFA;
	}

	.ul_coms {
		box-shadow: 2px 2px 10px rgba(224, 243, 250, 1);
		margin-bottom: .1rem;
	}

	.list_coms {
		margin-top: .1rem;
		padding-bottom: .15rem;
		background: #fff;
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
		font-size: .14rem;
		color: #707070;
		margin: 0.05rem 0;
	}

	.com_com_x_score {
		display: flex;
		font-size: .14rem;
		margin-bottom: .05rem;
	}

	.com_com_x_score_colco {
		margin-right: .05rem;
		color: #B2B2B2;
		font-size: .12rem;
	}

	.com_com_x_score2 {
		display: flex;
	}

	.com_com_x_score2>div:nth-child(1) {
		font-size: .18rem;
		color: #ff3434;
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
		height: 1.9rem;
		background: #fff;
		border-radius: .1rem;
		margin: -0.95rem 0 0 -1.375rem;
	}

	.po_box_div_tit {
		color: #18B4ED;
		height: .5rem;
		line-height: .5rem;
		text-align: center;
		border-bottom: .01rem solid #eee;
	}

	.po_box_div_com {
		height: .85rem;
		line-height: .85rem;
		text-align: center;
		font-size: .16rem;
		border-bottom: .01rem solid #eee;
	}

	.po_box_but {
		display: flex;
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
	/*//dingdan*/

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

	.fug_box {
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

	.fug_box ul li {
		display: flex;
		justify-content: space-between;
		height: .55rem;
		line-height: .55rem;
		padding: 0 .1rem;
		background: #FFF;
		border-bottom: .01rem solid #eee;
		align-items: center;
	}

	.fug_box ul li div:nth-child(1) {
		display: flex;
		align-items: center;
	}

	.fug_box ul li div:nth-child(1) img {
		width: .24rem;
		height: .24rem;
		margin-right: .1rem;
	}

	.fg_imgsb {
		flex: 0 0 .2rem;
		height: .2rem;
		background: url(../../assets/img/checked.png) no-repeat;
		background-size: .18rem;
	}

	.fug_box_po {
		position: absolute;
		/*height: 2.2rem;*/
		overflow: hidden;
		width: 90%;
		margin: 0 5%;
		background: #fff;
		bottom: .15rem;
		border-radius: .1rem;
	}

	.slide-fade-enter-active {
		transition: all .3s ease;
	}

	.slide-fade-leave-active {
		transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}

	.slide-fade-enter,
	.slide-fade-leave-to
	/* .slide-fade-leave-active for below version 2.1.8 */

	{
		transform: translateY(2rem);
		opacity: 0;
	}

	.fg_fangs {
		height: .44rem;
		line-height: .44rem;
		text-align: center;
		border-bottom: .01rem solid #eee;
	}

	.addsa {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		/*height: 100%;*/
		z-index: 9999;
		background: rgba(0, 0, 0, .3);
	}

	.addsa_div {
		background: #fff;
		border-radius: .1rem;
		width: 90%;
		padding: 0 .1rem;
		margin: .65rem auto;
		height: 5rem;
		overflow: auto;
	}

	.addsa_div ul li {
		border-bottom: .01rem solid #eee;
		padding: .1rem 0;
	}

	.bot_b {
		width: 100%;
		position: absolute;
		bottom: 0;
		height: .54rem;
		line-height: .54rem;
		background: #fff;
	}

	.bot_b>div {
		display: flex;
		justify-content: flex-end;
		height: .54rem;
		line-height: .54rem;
	}

	.bot_b>div div:nth-child(1) {
		font-size: .14rem;
	}

	.bot_b>div div:nth-child(1) span {
		font-size: .16rem;
		color: #f00;
	}

	.bot_b>div div:nth-child(2) {
		flex: 0 0 1.2rem;
		color: #fff;
		margin-left: .1rem;
		font-size: .16rem;
		text-align: center;
		background: #f00;
	}

	.labelimg {
		display: inline-block;
		background: url(../../assets/img/chekcedee.png) no-repeat;
		width: .18rem;
		height: .18rem;
		background-size: .18rem;
		margin-top: .08rem;
	}

	.labelimg2 {
		display: inline-block;
		background: url(../../assets/img/check.png) no-repeat;
		width: .18rem;
		height: .18rem;
		background-size: .18rem;
		margin-top: .08rem;
	}

	.time {
		display: flex;
		justify-content: space-between;
		background: #fff;
		padding: 0.1rem .15rem;
		box-shadow: 2px 2px 10px rgba(224, 243, 250, 1);
		margin-bottom: .1rem;
	}

	.sjshow_on {
		flex: 1;
		text-align: center;
	}

	.sjshow_on:after {
		content: '';
		width: 0.1rem;
		height: 0.2rem;
		background: url(../../assets/img/more_gray.png) no-repeat !important;
		background-size: 0.1rem 0.2rem;
	}

	.time:after {
		content: '';
		width: 0.1rem;
		height: 0.2rem;
		background: url(../../assets/img/more_gray.png) no-repeat;
		background-size: 0.1rem 0.2rem;
	}

	.time input {
		border: 0;
		width: 100%;
	}

	.notime textarea {
		border: 0.01rem solid #eee;
		border-radius: 0.1rem;
		padding: 0.05rem;
		width: 100%;
	}

	.notime {
		display: flex;
		justify-content: space-between;
		background: #fff;
		padding: 0.15rem;
		box-shadow: 2px 2px 10px rgba(224, 243, 250, 1);
		margin-bottom: .1rem;
	}

	.notime>.input {
		flex: 1;
	}

	.money {
		display: flex;
		justify-content: flex-end;
		background: #fff;
		padding: 0.15rem;
	}

	.money>.num {
		color: #ff3434;
	}

	.bot_box {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: .45rem;
		line-height: .45rem;
	}

	.bot_div {
		display: flex;
		justify-content: flex-end;
	}

	.bot_div_zf {
		width: 35%;
		background: #f00;
		text-align: center;
		color: #fff;
		font-size: .16rem;
	}

	.but_num {
		margin-right: .15rem;
	}

	.bot_div_men {
		display: flex;
	}

	.but_span {
		color: #f00;
	}

	.but_span_men {
		color: #f00;
		font-size: .18rem;
	}

	.list_coms_dimg {
		display: flex;
		align-items: center;
	}

	.list_coms_dimg img {
		width: .14rem;
		margin: 0 0.05rem;
	}
	.orderTime .li{
		display: flex;
		justify-content: space-between;
	}
</style>
