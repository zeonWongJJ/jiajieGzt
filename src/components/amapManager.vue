<template>
    <div class="amap-page-container">
      <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" :plugin="plugin" :events="events" class="amap-demo">
      	<el-amap-marker :position="center" ></el-amap-marker>
      </el-amap>
    </div>
</template>
<style lang="less" scoped>
	.amap-page-container{
		height: 100%;
		width: 100%;
	}
</style>


<script>
    // NPM 方式
       import { AMapManager } from 'vue-amap'
    // CDN 方式
    //let amapManager = new VueAMap.AMapManager();
    export default{
    	props:{
    		center:{
    			type:Array,
    			default:()=>[113.320906,22.967019]
    		}
    	},
      data: function() {
        return {
          amapManager:'',
          zoom: 18,
          events: {
            init: (o) => {
              console.log(o.getCenter())
              console.log(this.$refs.map.$$getInstance())
              o.getCity(result => {
                console.log(result)
              })
            },
            'moveend': () => {
            },
            'zoomchange': () => {
            },
            'click': (e) => {
            }
          },
          plugin: ['ToolBar', {
            pName: 'MapType',
            defaultType: 0,
            events: {
              init(o) {
                console.log(o);
              }
            }
          }]
        };
      },
      created(){
      	this.amapManager = new AMapManager
      },
      methods: {
      }
    };
</script>
