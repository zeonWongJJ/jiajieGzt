v,<template>
	<div class="editAdd" v-show="value">
		<div v-show="!amapShow">
			<van-nav-bar v-if="addData.contact_name" title="编辑地址" left-arrow @click-left="onClickLeft" right-text="删除" @click-right="onClickRight" />
			<van-nav-bar v-else title="新增地址" left-arrow @click-left="onClickLeft" />
		</div>

		<div class="box_del">
			<!--联系人-->
			<div class="com_box">
				<form name="input" action="" method="get">
					<div class="contact">
						<div>联系人</div>
						<div class="contact_2">
							<div>
								<input type="text" v-model="name" id="name" placeholder="姓名" />
							</div>
							<div class="contact_2_but">
								<button class="but_n b1" @click="gender = 1" type="button" :class="{button_colc : gender == 1}">男士</button>
								<button class="but_n b1" @click="gender = 2" type="button" :class="{button_colc : gender == 2}">女士</button>
							</div>
						</div>
					</div>
					<div class="ul_div">
						<ul>
							<li class="li_add">
								<div>电话</div>
								<div class="li_mobile">
									<input type="phone" v-model="mobile" id="mobile" placeholder="手机号码" />
								</div>
								<!--<div style="height: 1px;opacity: 0;"></div>-->
							</li>
							<li class="li_add" @click="locationCurrentPosition">
								<div>地址</div>
								<div>{{address.length == 0 ? addressTip : address}}</div>
								<div>
									<img src="../assets/img/more_gray.png" />
								</div>
							</li>
							<li class="li_add">
								<div>门牌号</div>
								<div class="li_mobile">
									<input type="text"  id="addressNum" v-model="addressNum" placeholder="如：钟村街道9号101" />
								</div>
								<!--<div style="height: 1px;opacity: 0;"></div>-->
							</li>
						</ul>
					</div>
				</form>
			</div>

			<div class="but">
				<button type="button" @click="edit">{{addData.contact_name ? '确定修改' : '保存并使用'}}</button>
			</div>
			<div id="temp" style="display:none"></div>
		</div>
		<amap-search v-model="amapShow" @finish="selectAmap" :center="lal"></amap-search>
	</div>
</template>

<script>
	import utils from '@/utils/utils'
	import amapSearch from '@/components/amapSearch'
	export default {
		props:{
			addData:{
				type:Object,
				default:()=>{}
			},
			value:{
				type:Boolean,
				default:false
			}
		},
		components:{
			amapSearch
		},
		data() {
			let self = this
			return {
				name:'',
				gender:'',
				mobile:'',
				address:'',
				addressNum:'',
				lal:'',
				amapShow:false,
				addressTip:'定位中',
			}
		},
		watch:{
			value:function(val){
				if(val){
					if(!this.addData.contact_name){
			        	if (utils.is_android()) {
				            android.locationCurrentPosition();
			        	}
			        	if (utils.is_ios()) {
				            window.webkit.messageHandlers.locationCurrentPosition.postMessage({});
			        	}

					}else{
						this.name = this.addData.contact_name;
						this.mobile = this.addData.telephone_number;
						this.lal = this.addData.contact_lal;
						this.address = this.addData.contact_address_name;
						this.gender = this.addData.contact_gender;
						this.addressNum= this.addData.contact_house_number;

					}
				}
				else{
          this.name = ''
          this.mobile = ''
          this.lal = ''
          this.address = ''
          this.gender = ''
          this.addressNum = ''
        }
			}
		},
    created() {
      let _this = this
      if (utils.is_weixin()) {
        let wx = require('weixin-js-sdk');
        let geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: "all"
        });
        this.$fetch('wechat_get_signpackage',{url: window.location.href.split('#')[0]}).then(rs =>{
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: rs.appId, // 必填，公众号的唯一标识
            timestamp: rs.timestamp, // 必填，生成签名的时间戳
            nonceStr: rs.nonceStr, // 必填，生成签名的随机串
            signature: rs.signature,// 必填，签名
            jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表
          });
          wx.ready(function(){
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            wx.getLocation({
              type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
              success: function (res) {
                _this.lal  =  res.longitude + ',' + res.latitude
                let lal = [res.longitude, res.latitude]
                // var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                // var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                // var speed = res.speed; // 速度，以米/每秒计
                // var accuracy = res.accuracy; // 位置精度
                geocoder.getAddress(lal, function(status, result) {
                  if (status === 'complete' && result.info === 'OK') {
                    if (result && result.regeocode) {
                      _this.address = result.regeocode.formattedAddress
                    }
                  } else{
                    console.log(status, result)
                  }
                });
              }
            });
          });
          wx.error(function(res){
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            console.log(res)
          });
        })
      } else if (utils.is_browser()) {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 10000,          //超过10秒后停止定位，默认：5s
          buttonPosition:'RB',    //定位按钮的停靠位置
          buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点

        });
        geolocation.getCurrentPosition(function(status,result){
          if(status=='complete'){
            _this.address = result.formattedAddress
            _this.lal = result.position.lng + ',' + result.position.lat
          }else{
            _this.addressTip = '定位失败请选择地址'
          }
        });
      }
    },
		mounted() {
      window['locationSuccess'] = res => {
        //provinceName省、cityName市、direction区、address地址、title地名
        this.address = res.address;
        this.lal = res.longitude + ',' + res.latitude;
			}
      window['searchAddressByPoiSuccess'] = res => {
        this.address = (res.provinceName || '') + (res.cityName || '') + (res.direction || '') + (res.address || '') + (res.title || '');
        this.lal = res.longitude + ',' + res.latitude;
			}
		},
		methods: {
			onClickLeft(){
				this.$emit('input',false);
			},
			onClickRight(){//删除
				this.$fetch('user_address_delete', {}, this.addData.id).then(rs =>{
          this.$toast("删除成功");
          setTimeout(()=>{
            this.onClickLeft();
          },1500)
				})
			},
			edit(){
				let forms = {};
				forms.contact_name = this.name;
				forms.telephone_number = this.mobile;
				forms.contact_lal = this.lal;
				forms.contact_address_name = this.address;
				forms.contact_gender = this.gender;
				forms.contact_house_number = this.addressNum;//门牌号
				if(this.addData.contact_name){//编辑
					this.$fetch('user_address_update', forms, this.addData.id).then(rs =>{
            this.$toast("修改成功");
            setTimeout(()=>{
               this.onClickLeft();
            },1500)
          }).catch(err => {
            console.log(err);
          })
				}else{//添加
					this.$fetch('user_address_add', forms, this.addData.id).then(rs =>{
            this.$toast("添加成功");
              setTimeout(()=>{
              this.onClickLeft();
            },1500)
          }).catch(err => {
            console.log(err);
          })
				}
			},
			//地图
			locationCurrentPosition(){
        if (utils.is_android() && typeof android != 'undefined'){
           android.searchAddressByPoi({});
        }else if (utils.is_ios() && window.webkit) {
          window.webkit.messageHandlers.searchAddressByPoi.postMessage({});
        }else{
          this.amapShow = true
        }
			},
			selectAmap(data){
				this.address = data.pname + data.cityname + (data.address || '') + data.name
				this.lal = data.location.lng +','+ data.location.lat;
			}
		},

	}
</script>

<style scoped>
	.editAdd{
		position: absolute;
		top: 0;
		height: 100%;
		width: 100%;
		background: #fff;
		z-index: 100;
	}
	.box_del .com_box {
		height: 100%;
		padding: 0 .15rem;
		background: #fff;
	}

	.button_colc {
		border: .01rem solid #f63;
		color: #f63;
	}

	.box_del .contact {
		display: flex;
		margin-top: .1rem;
		border-bottom: .01rem solid #eee;
	}

	.box_del .contact>div:nth-child(1) {
		flex: 0 0 .87rem;
		font-size: .16rem;
		font-weight: 700;
		height: .55rem;
		line-height: .55rem;
	}

	.box_del .contact_2 {
		width: 100%;
	}

	.box_del .contact_2 div {
		width: 100%;
		font-size: 0.14rem;
		height: .55rem;
		line-height: .55rem;
	}

	.box_del .contact_2 div input {
		width: 100%;
		font-size: 0.14rem;
		border: 0;
		background: none;
	}

	.box_del .contact_2 div:nth-child(1) {
		border-bottom: .01rem solid #eee;
	}

	.box_del .but_n,
	.box_del .but_m {
		width: .62rem;
		height: .3rem;
		line-height: .3rem;
		font-size: 0.14rem;
		background: #fff;
		border: .01rem solid #eee;
		border-radius: 0.05rem;
		cursor: pointer;
	}

	.box_del .but_colco {
		border: .01rem solid #f63;
		color: #f63;
	}

	.box_del .ul_div {}

	.box_del .li_add {
		display: flex;
		height: 0.55rem;
		border-bottom: .01rem solid #EEEEEE;
		align-items: center;
		/*justify-content: space-between;*/
		overflow-y: auto;
	}

	.box_del .li_add>div:nth-child(1) {
		flex: 0 0 .87rem;
		font-size: .16rem;
		font-weight: 700;
	}

	.li_add>div:nth-child(2) {
		flex: 0 0 2rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
	}

	.box_del .li_add>div input {
		width: 100%;
		font-size: 0.14rem;
		border: 0;
		background: none;
	}

	.box_del .li_add>div:nth-child(3) {
		flex: 0 0 .5rem;
		color: #f60;
		text-align: right;
	}

	.box_del .li_add>div:nth-child(3) img {
		width: .09rem;
		height: .18rem;
	}

	.box_del .but {
		padding: 0 .15rem;
		margin-top: .35rem;
	}

	.box_del .but button {
		border: 0;
		height: .5rem;
		line-height: .5rem;
		width: 100%;
		border-radius: .5rem;
		background: #18b4ed;
		color: #FFFFFF;
		font-size: .18rem;
		cursor: pointer;
	}
	.li_mobile{
		flex: 0 0 2.5rem !important;
	}
	/*//ditu*/

	.apms {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #eee;
		z-index: 1009;
	}

	.m-part .mapbox {
		width: 100%;
		height: 3.5rem;
		margin-bottom: 20px;
		float: left;
	}

	.addsr {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 666;
		background: #fff;
	}

	.addss {
		position: absolute;
		top: 4rem;
		background: #fff;
		width: 3.45rem;
		font-size: .16rem;
		padding: .1rem .15rem;
		/*z-index:999;*/
	}

	.addbut {
		width: 100%;
		position: absolute;
		bottom: 0;
		z-index: 999;
	}

	.addbut button {
		width: 100%;
		height: .44rem;
		line-height: .44rem;
		border: 0;
		background: #007AFF;
		font-size: .16rem;
		color: #fff;
	}
</style>
