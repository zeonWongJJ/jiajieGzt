<template>
  <div>
    <div class="m-map">
      <div class="search" v-if="placeSearch">
        <input type="text" placeholder="请输入关键字" v-model="searchKey">
        <button type="button" @click="handleSearch">搜索</button>
        <div id="js-result" v-show="searchKey" class="result"></div>
      </div>
      <div id="js-container" class="map"></div>
    </div>
  </div>
</template>

<script>
  import remoteLoad from '@/utils/remoteLoad.js'
  import {MapKey, MapCityName} from '@/utils/config'

  export default {
    props: ['lat', 'lng'],
    data() {
      return {
        searchKey: '',
        placeSearch: null,
        //				    geolocation:null ,
        dragStatus: false,
        AMapUI: null,
        AMap: null,
      }
    },
    watch: {
      searchKey() {
        if (this.searchKey === '') {
          this.placeSearch.clear()
        }
      }
    },
    created() {
      if (window.AMap && window.AMapUI) {
        this.initMap()
      } else {
        Promise.all([
          remoteLoad(`http://webapi.amap.com/maps?v=1.3&key=${MapKey}`),
          remoteLoad('http://webapi.amap.com/ui/1.0/main.js')
        ]).then(() => {
          this.initMap()
        })
      }
    },
    mounted() {
      //	alert(this.lat)
      //			this.init()
      this.initMap();
      
    },
    methods: {
      // 搜索
      handleSearch() {
        if (this.searchKey) {
          this.placeSearch.search(this.searchKey)
        }
      },

      // 实例化地图
      initMap() {
        // 加载PositionPicker，loadUI的路径参数为模块名中 'ui/' 之后的部分
        let AMapUI = this.AMapUI = window.AMapUI
        let AMap = this.AMap = window.AMap
        let that = this;
        AMapUI.loadUI(['misc/PositionPicker'], PositionPicker => {
          let mapConfig = {
            zoom: 16,
            cityName: MapCityName,

          }
          if (this.lat && this.lng) {
            mapConfig.center = [this.lng, this.lat]
          }
          let map = new AMap.Map('js-container', mapConfig)

          //     加载地图搜索插件
          AMap.service('AMap.PlaceSearch', () => {
            //实例化PlaceSearch
            this.placeSearch = new AMap.PlaceSearch({
              pageSize: 5,//每页显示多少行
              pageIndex: 1,//显示的下标从那个开始
              type: '', //type:'餐饮服务',类别，可以以|后面加其他类
              citylimit: true,
              city: MapCityName, //城市
              map: map,//显示地图
              panel: 'js-result'//服务显示的面板
            });
          })

          map.plugin(['AMap.Geolocation'], () => {
            let geolocation = new AMap.Geolocation({
              noGeoLocation: 3,
              enableHighAccuracy: true, //  是否使用高精度定位，默认:true
              timeout: 10000, //  超过10秒后停止定位，默认：无穷大
              maximumAge: 0, // 定位结果缓存0毫秒，默认：0
              convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
              showButton: true, //  显示定位按钮，默认：true
              buttonPosition: 'LB', // 定位按钮停靠位置，默认：'LB'，左下角
              //					          buttonOffset: new AMap.Pixel(10, 20), //  定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
              showMarker: true, //  定位成功后在定位到的位置显示点标记，默认：true
              showCircle: true, //  定位成功后用圆圈表示定位精度范围，默认：true
              panToLocation: true, //  定位成功后将定位到的位置作为地图中心点，默认：true
              zoomToAccuracy: true, //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            })
            map.addControl(geolocation)
            geolocation.getCurrentPosition()


            AMap.event.addListener(geolocation, 'complete', result => {
              this.$emit('datas', result)
              //					          map.setCenter(result.position)
              //					          this.$emit('drag', setCenter)
//							window.location.reload()
              console.log("ss", result.position)
                 console.log("ss", result.message)
//            that.$store.commit('store_show', true)

            }) //  返回定位信息
            AMap.event.addListener(geolocation, 'error', result => {
              console.log(result.position)
              
//						window.location.reload()
            }) //  返回定位出错信息
          })

          // 启用工具条
          AMap.plugin(['AMap.ToolBar'], function () {
            map.addControl(new AMap.ToolBar({
              position: 'RB'
            }))
          })

          // 创建地图拖拽
          let positionPicker = new PositionPicker({
            mode: 'dragMap', // 设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
            map: map // 依赖地图对象
          })
          // 拖拽完成发送自定义 drag 事件
          positionPicker.on('success', positionResult => {

            // 过滤掉初始化地图后的第一次默认拖放
            if (!this.dragStatus) {
              this.dragStatus = true
            } else {
              this.$emit('drag', positionResult)
            }
          })


          // 启动拖放
          positionPicker.start()

        })

      }
    },
//	async created() {
//
//		// 已载入高德地图API，则直接初始化地图
//		if(window.AMap && window.AMapUI) {
//			this.initMap()
//			// 未载入高德地图API，则先载入API再初始化
//		} else {
//			await remoteLoad('https://webapi.amap.com/maps?v=1.3&key=${MapKey}')
//			await remoteLoad('https://webapi.amap.com/ui/1.0/main.js')
//			this.initMap()
//		}
//	}
  }
</script>

<style lang="css">
  .m-map {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .map {
    width: 100%;
    height: 100%;
  }

  .m-map .search {
    position: absolute;
    top: .1rem;
    left: 0px;
    width: 3.75rem;
    z-index: 1;
  }

  .m-map .search input {
    width: 2.5rem;
    border: 1px solid #ccc;
    line-height: 20px;
    padding: 5px;
    outline: none;
    margin: 0 .2rem;
  }

  .m-map .search button {
    line-height: 26px;
    background: #fff;
    border: 1px solid #ccc;
    width: 50px;
    text-align: center;
  }

  .result {
    position: absolute;
    top: 3.4rem;
    left: 0;
    width: 3.75rem;
    height: 2.5rem;
    overflow: auto;
    border: none;
  }

  .amap-pl-pc .poi-more {
    display: none;
  }
</style>
