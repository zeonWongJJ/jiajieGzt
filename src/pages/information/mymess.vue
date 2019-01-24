<template>
	<div class="informadton">
		<div>
			<van-nav-bar title="消息" />
		</div>
		<div class="box">
			<div class="inform margins" @click="notice()">
				<div class="inform_img span_po">
          <img src="../../assets/img/img_vx/notification.png" />
          <span v-if="listst > 0">
          <span>{{listst}}</span>
          </span>
				</div>
				<div class="inform_text">
          <div class="inform_text_top_title">
            系统通知
          </div>
					<div class="inform_text_top">
            <div class="inform_new" v-if="listst > 0">您有新的消息</div>
            <template v-else-if="lastMessage && lastMessage.message_notice_uid == this.$store.state.user_id">
              <div class="inform_new">{{lastMessage.message_content}}</div>
              <div class="inform_text_top_deta">{{getTime(lastMessage.message_post_at * 1000)}}</div>
            </template>
					</div>
				</div>
			</div>
			<!--////其他的-->
			<div class="box_inform">
				<a class="item" href="http://lyt.zoosnet.net/lr/chatpre.aspx?id=LYT42657310">
					<div class="inform inform_border">
						<div class="inform_img">
							<img src="../../assets/img/img_vx/service.png" />
						</div>
						<div class="inform_text">
							<div class="inform_text_top">
								<div class="inform_text_top_title">在线客服</div>
							</div>
							<div class="inform_new">
								工作时间10:00-22:00
							</div>
						</div>
					</div>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			  lastMessage: this.$store.state.lastMessage
			}
		},
		computed:{
      listst(){
				 return this.$store.state.unread
			}
		},
		methods: { //方法
			notice() {
				this.$router.push({
					path: "/notice"
				})

				// this.$store.commit('notices',0)
			},
      getTime(time){
        //js内的时间戳指的是当前时间到1970年1月1日00:00:00 UTC对应的毫秒数，和unix时间戳不是一个概念，后者表示秒数，差了1000倍
        //new Date(timestamp)中的时间戳必须是number格式，string会返回Invalid Date。所以比如new Date('11111111')这种写法是错的
        var date = new Date(time);
        if(date){
          var Y,M,D,h,m,s;
          Y = date.getFullYear();
          M = this.add0(date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
          D = this.add0(date.getDate());
          h = this.add0(date.getHours());
          m = this.add0(date.getMinutes());
          s = this.add0(date.getSeconds());

          //与当前日期对比
          var now = new Date();
          if(now.getFullYear() == date.getFullYear()){
            if(now.getMonth() == date.getMonth() && now.getDate() == date.getDate()){
              return (h + ':' +m+ ':' +s)
            }else{
              return (M+ '-' +D+ ' ' +h+ ':' +m+ ':' +s)
            }
          }else{
            return (Y+ '-' +M+ '-' +D+ ' ' +h+ ':' +m+ ':' +s)
          }

        }else{
          console.log('时间格式有误----:'+time);
        }
      },
      add0(time) {
        var time = Number(time);
        if(time < 10) {
          time = '0' + time
        }
        return time
      }
		}

	}
</script>

<style scoped>
	.informadton {
    position: relative;
    height: 100%;
    background: #F5F5F5;
	}

	.box {
		position: absolute;
		top: .46rem;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: auto;
		height: calc(100% - 0.46rem);
		background: #F5F5F5;
	}

	.inform {
		display: flex;
		padding: 0.1rem .12rem;
		height: .7rem;
		align-items: center;
		background: #fff;
	}

	.inform_img {
		flex: 0 0 .65rem
	}

	.span_po {
		position: relative;
	}

	.inform_img>span {
		font-size: .12rem;
		position: absolute;
    left: .3rem;
		color: #fff;
		width: 0.2rem;
		height: .2rem;
		line-height: .2rem;
		background: #f00;
		text-align: center;
		border-radius: 50%;
	}

	.inform_img img {
		width: .4rem;
	}

	.inform_text {
		flex: 0 0 2.8rem;
	}

	.inform_text_top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: .1rem;
	}

	.inform_text_top_title {
		flex: 0 0 1.85rem;
		font-size: .16rem;
		font-weight: 700;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.inform_text_top_deta {
		font-size: .12rem;
		color: #666666;
    margin-left: .1rem;
	}

	.inform_new {
		font-size: .12rem;
		color: #666666;
	}

	.margins {
		margin: 0.1rem 0;
	}

	.inform_border {
		border-bottom: .01rem solid #eee;
	}
</style>
