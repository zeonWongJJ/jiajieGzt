<template>
	<div class="index">
		<div class="content" id="content">
			<router-view></router-view>
		</div>
		<BottomNav :path="toPath"></BottomNav>
	</div>
</template>

<script>
	import BottomNav from '@/components/bottomNav'
	export default {
		name: 'index',
		components: {
			BottomNav,
		},
		watch: {
			'$route' (to, from) {
		    	this.toPath = to.path
		  	}
		},
		data() {
			return {
				toPath:'/home'
			}
		},
		mounted() {
			
		},
		methods: {
			
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
	.index {
		height: 100%;
		background: #fff;
		overflow: hidden;
	}

	.index::-webkit-scrollbar {
		width: 0px
	}

	.warpper {
		background-color: rgba(0, 0, 0, 0);
	}

	.content {
		height: calc(100% - .5rem);
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}

	.content::-webkit-scrollbar {
		width: 0px
	}
</style>
