<template>
	<div class="amap-page-container" v-show="value">
		<div class="search-box">
	  		<div class="button close" @click="close">关闭</div>
	  		<input v-model="txt" ref="searchText" id="searchText" @keyup="keyUpSearch" placeholder="请输入地址"/>
	  		<div class="button finish" @click="finish">确定</div>
		</div>
		<el-amap ref="map" vid="amapDemo" :amapmanager="amapManager" :center="mapCenter" :zoom="18" class="amap-demo">
      <el-amap-marker v-for="(marker,index) in markers" :key="index" :position="marker" ></el-amap-marker>
    </el-amap>
    <div class="address_items" id="address_result" v-if="searchData.length > 0">
		  <div class="address_item" v-for="(item,index) in searchData" @click="selectIndex = index">
		    <div class="left">
		    	<div class="title">{{ item.name }}</div>
		    	<div class="description">{{ item.pname }}{{ item.cityname }}{{ item.address }}</div>
		    </div>
		    <i class="iconfont" style="color: #18B4ED;" :class="{'icon-check' : selectIndex == index}"></i>
		  </div>
		</div>
		<div id="temp" style="display:none"></div>
	</div>
</template>

<script>
  	import { AMapManager } from 'vue-amap'
    export default{
    	props:{
    		value:{
    			type:Boolean,
    			default:false
    		},
    		center:{
    			type:String,
    			default: () => ''
    		}
    	},
    	created(){
    		this.amapManager = new AMapManager;
      },
    	watch:{
    		center(val){
    			if(val.length > 0){
    				this.mapCenter = val.split(',')
    				this.markers.push(this.mapCenter);
    			}
    		}
    	},
      	data() {
        	return {
            markers: [],
            searchOption: {
              city: '广州',
              citylimit: true,
              pageSize: 12,
              pageIndex: 1,
              panel: 'search-box'
            },
            txt:'',
            selectIndex:0,
            searchData:'',
            mapCenter: [121.59996, 31.197646],
            amapManager:'',
        };
      },
      methods: {
      	close(){
      		this.$emit('input',false)
      	},
      	finish(){
      		if(this.searchData.length > 0){
      			this.$emit('finish',this.searchData[this.selectIndex])
      		}
      		this.close();
      	},
		keyUpSearch() {
			let _this = this;
			AMap.service(["AMap.PlaceSearch"], function() {
				var placeSearch = new AMap.PlaceSearch({
					pageSize: 12, pageIndex: 1, city: "广州", cityLimit: 'true', panel: 'temp'
				//构造地点查询类 pageSize: 12, pageIndex: 1, city: "成都", //城市 cityLimit: 'true', panel: 'temp'
				//搜索结果的展示面板对元素id，不知道为什么一定要有该参数，最终获取的结果才更完整，参数更多跟完整，
				//所以我在页面随便写了一个<div id="temp" style="display:none"></div>
          		});
          		//关键字查询
          		placeSearch.search(_this.txt, function(status, result) {
		            if (status == 'complete' && result.info == 'OK') {
					//这里可以console.log(result)，查看所有返回的参数，遍历展示这些基本的，我就不赘述
		                _this.searchData = result.poiList.pois
						_this.selectIndex = 0
						_this.markers = []
		                let pois = result.poiList.pois;
		                let latSum = 0;
			          	let lngSum = 0;
			          	if (pois.length > 0) {
				            pois.forEach(poi => {
				              let {lng, lat} = poi.location;
				              lngSum += lng;
				              latSum += lat;
				              _this.markers.push([poi.location.lng, poi.location.lat]);
				            });
				            let center = {
				              lng: lngSum / pois.length,
				              lat: latSum / pois.length
				            };
				            _this.mapCenter = [center.lng, center.lat];
			          	}
		            }
	          	})
	        })
	     }
      }
    };
</script>

<style lang="less" scoped>
	@import './amapSearch/icon/iconfont.css';
    .amap-page-container {
	    position: absolute;
	    background: #fff;
	    top: 0;
	    height: 100%;
	    width: 100%;
	    z-index: 9999;
	    .amap-demo{
	    	height: 50%;
	    }
		.search-box{
			padding: .05rem 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			input{
				flex: 1;
				line-height: .3rem;
				border-radius: .5rem;
				-webkit-appearance: none;
				border: none;
				background: #f5f5f5;
				padding: 0 .1rem;
			}
			.button{
				flex: 0 0 auto;
				font-size: .16rem;
				padding: 0 .1rem;
			}
			.finish{
				color: #18B4ED;
			}
		}
		.address_items{
			height: calc(50% - .4rem);
			overflow-y: auto;
			.address_item{
				padding: .1rem;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
    }
</style>

<style>
	.amap-logo{
		position: absolute;
		z-index: -999;
	}
    .amap_lib_placeSearch_page{
    	display: none;
    }
</style>
