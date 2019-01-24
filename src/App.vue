<template>
  <div id="app">
    <keep-alive>
	   <router-view v-if="$route.meta.keepAlive"></router-view>
	  </keep-alive>
	<router-view v-if="!$route.meta.keepAlive"></router-view>

  </div>
</template>

<script>
	import { setRem } from '@/rem'
	import '@/assets/css/icon.css'
	export default {
	  name: 'App',
		mounted() {
				// rem.js的调用
			setRem(window, {
				designWidth: 750,
				designFontSize: 100
			});
		}
	}
</script>

<style>
	#app {
	  font-family: '微软雅黑', 'Avenir', Helvetica, Arial, sans-serif;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	  font-size: .14rem;
		color: #333333;
		height: 100%;
		background: #fff;
		-moz-user-select: none;
		-ms-user-select: none;
		-webkit-user-select: none;
	}
	#Web{
		height: 100%;
	}
	#Web>section{
		height: 100%;
	}
</style>
