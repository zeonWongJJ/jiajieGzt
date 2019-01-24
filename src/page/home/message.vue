<template>
	<div class="message">
		<van-nav-bar title="消息" left-arrow @click-left="onClickLeft" />
		<div class="ul">
			<div class="li" v-for="li in list">
				<div class="time">{{getTime(li.message_post_at)}}</div>
				<div class="info" :class="{unread : unread(li.id)}">{{li.message_content}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	import api from '@/api/api'
	export default {
		data() {
			return {
				list : [],
			};
		},
		mounted() {
			//console.log(this.$store.state.token)
			this.init();
//			localStorage.clear();
			//console.log(JSON.parse(localStorage.getItem("msg")))
		},
		methods: {
			onClickLeft() {
				window.history.go(-1);
			},
			init() {
				let that = this;
				that.$fetch('message_list', {})
				.then(rs => {
					that.list = rs
				})
			},
			unread(id){
				let oldVal = localStorage.getItem("msg");
				if(oldVal){
					var arr = JSON.parse(oldVal).concat();
					arr.indexOf(id) === -1 ? arr.push(id) : 0;
					localStorage.setItem('msg', JSON.stringify(arr))
					return arr.indexOf(id) === -1 ? 1 : 0;
				}else{
					var arr = [];
					arr.push(id)
					localStorage.setItem('msg', JSON.stringify(arr))
					return 1
				}
			},
			getTime(time){
				//js内的时间戳指的是当前时间到1970年1月1日00:00:00 UTC对应的毫秒数，和unix时间戳不是一个概念，后者表示秒数，差了1000倍
				//new Date(timestamp)中的时间戳必须是number格式，string会返回Invalid Date。所以比如new Date('11111111')这种写法是错的
				time = Number(time)*1000;
				var date = new Date(time);
				if(date){
					var Y,M,D,h,m,s;
					Y = date.getFullYear() + '-';
					M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
					D = date.getDate() + ' ';
					h = date.getHours() + ':';
					m = date.getMinutes() + ':';
					s = date.getSeconds(); 
					
					//与当前日期对比
					var now = new Date();
					if(now.getFullYear() == date.getFullYear()){
						if(now.getMonth() == date.getMonth() && now.getDate() == date.getDate()){
							return (h+m+s)
						}else{
							return (M+D+h+m+s)
						}
					}else{
						return (Y+M+D+h+m+s)
					}
					
				}else{
					console.log('时间格式有误----:'+time);
				}
				
			}
		}
	}
</script>

<style scoped>
	.message {
		background: #f5f5f5;
	}
	
	.message .ul {
	}
	
	.message .ul .li .time {
		text-align: center;
		padding: .1rem;
		color: #707070;
		font-size: .11rem;
	}
	
	.message .ul .li .info {
		background: #fff;
		padding: .15rem;
		font-size: .16rem;
		color: #333333;
		position: relative;
	}
	.message .ul .li .info.unread:after{
		content: '';
		background: red;
		display: inline-block;
		width:.06rem;
		height: .06rem;
		border-radius: 50%;
		position: absolute;
		right: .15rem;
		top: .15rem;
	}
</style>