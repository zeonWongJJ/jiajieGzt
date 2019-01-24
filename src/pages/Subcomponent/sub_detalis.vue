<template>
	<div>
		<div class="showAbs_box">
			<div class="header-fixed" v-show="!showAbs" :style="opacityStyle">
				<div class="header-fixed-back">
					<div class="left_le" @click="left_le()">
						<img src="../../assets/img/img_vx/shop_le.png" />
					</div>
					<ul>
						<li class="fixed_li" v-for="(item,index) in alist" > 
							<a :href="'#ul'+index"  :class="{shlist :  index ==num}" @click="onshowlist(index)">{{item.name}}</a>	
						
						</li>
					</ul>
					<div class="left_ri">
					<img src="../../assets/img/img_vx/shop_ri.png" />
				</div>
				</div>
			</div>
			
			<div class="box">
				
				
				<div class="left_rigth " v-show="showAbs" >
				<div class="left_le" @click="left_le()">
					<img src="../../assets/img/img_vx/shop_le.png" />
				</div>
				 
				<div class="left_ri">
					<img src="../../assets/img/img_vx/shop_ri.png" />
				</div>
			</div>
					<div  v-for="(item,index) in alist" :id="'ul'+index" :key="index">
						
						<div v-if="index == 0">
							<floor-one></floor-one>								
						</div>
						<div v-else-if="index == 1">
								<floor-two></floor-two>
						</div>
						<div v-else-if="index == 2">
								<floor-three></floor-three>
						</div>
						<div v-else-if="index == 3">
							<floor-four></floor-four>
						</div>
						<div v-else-if="index == 4">
							<floor-five></floor-five>
						</div>
						<div v-else>
								
						</div>
					</div>
			
			</div>
				
		</div>
	</div>
</template>

<script>
	import floorOne from '@/pages/Subcomponent/floorOne';
	import floorTwo from '@/pages/Subcomponent/floorTwo';
	import floorThree from '@/pages/Subcomponent/floorThree';
	import floorFour from '@/pages/Subcomponent/floorFour';
	import floorFive from '@/pages/Subcomponent/floorFive';
	
	export default {
		components: {
			floorOne,
			floorTwo,
			floorThree,
			floorFour,
			floorFive
		},
		data() {
			return {
				alist:[
					{name:"介绍",id:1},
					{name:"流程",id:2},
					{name:"设备",id:3},
					{name:"标准",id:4},
					{name:"评价",id:5},
				],
				event_top:this.$store.state.oneH,
				event_two:this.$store.state.twoH,
				event_three:this.$store.state.threeH,
				event_four:this.$store.state.fourH,
				event_five:this.$store.state.fiveH,
				
				showlist:true,
				num:0,
				showAbs: true,
				opacityStyle: {
					opacity: 0
				}
			}
		},
		methods: {
			left_le(){
				this.$router.push({
					path:'/service_list'
				})
			},
//			handleScroll() {
//				const top = document.documentElement.scrollTop
//				
//				if(top > 10 ) {
//					let opacity = top / 80
//					opacity = opacity > 1 ? 1 : opacity
//					this.opacityStyle = {
//						opacity
//					}
//				
//					this.showAbs = false
//				} else {
//					this.showAbs = true
//				}
//			},
			show_list(){
				const top = document.documentElement.scrollTop;
				let top2 = Number(this.event_top) + Number(this.event_two);
				let top3 = top2 + Number(this.event_three);
				let top4 = top3 + Number(this.event_four);
				let top5 = top4 + Number(this.event_five);
				  console.log(this.event_top);
				  console.log(top2);
				  console.log(top3);
				  console.log(top4);
				  console.log(top5);
				  
				  
				  
				if(top > 0 && top <= this.event_top){
						this.num = 0
				}
				else if(top > this.event_top && top <= top2 ){
					this.num = 1
				}
				else if(top > top2 && top <= top3){
					this.num = 2
				}
				else if(top > top3 && top <= top4 ){
					this.num = 3
				}
				else if(top > top4 && top <= top5 ){
					this.num = 4
				}
				else{
					this.num = 4
				}
			},
			onshowlist(index){
				this.num = index
			
			},
		},
		mounted() {

//			window.addEventListener('scroll', this.handleScroll)
			window.addEventListener('scroll', this.show_list)
		},
		unmounted() {
//			window.removeEventListener('scroll', this.handleScroll)
			window.removeEventListener('scroll', this.show_list)
		}
	}
</script>

<style scoped>
	.showAbs_box{
		/*position: absolute;*/
		/*width: 100%;*/
		/*height: 100%;*/
		/*top: 0;
		left: 0;
		right: 0;
		bottom: 0;*/
		/*height: calc(100% - 0.46rem);*/
		/*overflow: auto;*/
	}
	.box {
		width: 100%;
		/*height: 100%;*/
		position: absolute;
		top: .1rem;
		left: 0;
		right: 0;
		bottom: 0;
		/*overflow: auto;*/
		/*height: calc(100% - 1rem);*/
	}

	.header-fixed {
		position: fixed;
		z-index: 99999;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0rem;
		height: .46rem;
		line-height: .46rem;
		text-align: center;
		color: #fff;
		background: #03B8CC;
		font-size: .22rem;
	}
	.header-fixed-back{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.header-fixed-back .left_le{
		margin: 0 0 0 0.12rem;
	}
	.header-fixed-back .left_ri{
		margin: 0 0.12rem 0 0 ;
	}
	.header-fixed-back ul{
		display: flex;
		width: 65%;
		margin:0  auto;
	}
	.fixed_li{
		font-size: .12rem;
		width: 20%;
	}
	.fixed_li a{
		/*display: block;/*/
		font-size: .12rem;
		color: #FFF
	}
	a.shlist{
		color: #000000 !important;
		padding-bottom: 0.1rem;
		border-bottom: 0.01rem solid #000000;
		
	}
	
	.left_rigth {
		height: .35rem;
		display: flex;
		justify-content: space-between;
		padding: 0.12rem;
	}
	.left_rigth .left_le {
			background: rgba(0, 0, 0, .2);
	}
	.left_rigth .left_ri{
			background: rgba(0, 0, 0, .2);
	}
	  .left_le {
		width: .35rem;
		height: .35rem;
		border-radius: 50%;
	
	}
	
 		.left_ri {
		width: .35rem;
		height: .35rem;
		border-radius: 50%;
		right: 0.12rem;
	}
	
	 .left_ri img {
		padding: .07rem;
		width: .2rem;
		height: .2rem;
	}
	
	.left_le img {
		padding: .1rem .11rem;
		width: .1rem;
		height: .17rem;
	}
	
	.bot_box{
		height: .5rem;
		width: 100%;
		position: absolute;
		top: (100% - 1rem);
		left: 0;
		right: 0;
		bottom:0;
		z-index: 9999;
	}
	
	
</style>