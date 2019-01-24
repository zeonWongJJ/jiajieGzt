<template>
	<div>

		<div id="container" style=" width: 3.75rem;height: 2rem;"></div>

	</div>
</template>

<script>
	import api from '@/api/api'

	export default {
		data() {
			return {
//				lng:'',
//				lat:'',
			}
		},
		props:["lng","lat"],
		created(){
//			this.lng=this.$store.state.lng;
//			this.lat=this.$store.state.lat;

		},
		mounted() { //生命周期 

			var map = new AMap.Map('container', {
				resizeEnable: true,
				zoom: 13,
				center: [this.lng, this.lat]
			});


//			map = new AMap.Map('container', {
//      resizeEnable: true
//  });
			
		AMap.plugin(['AMap.ToolBar'], function (){
					map.addControl(new AMap.ToolBar({
						position: 'RB'
					}))
				})	
			
			
	
//			
//map.plugin('AMap.Geolocation', function() {
//var geolocation = new AMap.Geolocation({
//           enableHighAccuracy: true,//是否使用高精度定位，默认:true
//          timeout: 10000,          //超过10秒后停止定位，默认：无穷大
//          buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
//          zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
//          buttonPosition:'LB'
//})
//
//  map.addControl(geolocation);
//      geolocation.getCurrentPosition();
//      AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
//      AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
//
//function onComplete (data) {
//  // data是具体的定位信息
//  console.log('55',data)
//}
//
//function onError (data) {
//	  console.log('666',data)
//  // 定位出错
//}
//});

			//上初始化，，下标点
			      var marker;
		        var icon = new AMap.Icon({
		            image: 'http://vdata.amap.com/icons/b18/1/2.png',
		            size: new AMap.Size(24, 24)
		        });
		        marker = new AMap.Marker({
		            offset: new AMap.Pixel(-12, -12),
		            zIndex: 101,
		            map: map
		        });
			
			
			
//			var marker, map = new AMap.Map("container", {
//				resizeEnable: true,
//				center: [this.lng, this.lat],
//				zoom: 13
//			});
//			addMarker()	
			// 实例化点标记
//			function addMarker() {
//				marker = new AMap.Marker({
//					icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
//					position: [this.lng, this.lat]
//				});
//				marker.setMap(map);
//			}

		},
		methods: { //方法

		},

	}
</script>

<style scoped>
	
</style>