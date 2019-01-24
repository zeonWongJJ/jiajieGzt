<template>
  <div class="storeProfit">
    <van-nav-bar class="blue" title="服务收益" left-arrow @click-left="onClickLeft"/>
    <div class="body">
      <div class="top">
        <div class="title">当前金额</div>

        <div class="row">
          <div class="sum">{{value}}</div>
        </div>
      </div>
      <div class="center">
        <div class="title">收益明细</div>
        <div class="ul">
          <scroller :on-infinite="infinite" ref="scroller">
            <div style="height: 1px;"></div>
            <!--必须要有1高度的空元素-->
            <!-- @click="toMore(item.id)"-->
            <div class="li" v-for="item in list">
              <div class="row">
                <div class="left">
                  <div class="span">{{item.ub_description}}</div>
                  <div class="span time">{{item.ub_time}}</div>
                </div>
                <div class="right">{{item.ub_type == 1 ? '+' : '-'}}{{item.ub_money}}</div>
              </div>
            </div>

          </scroller>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/api/api'

  export default {
    data() {
      return {
        staffId: 0,
        list: [],
        page: 1,
        end: false,
        value: 0
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {//初始化请求
        var that = this;
        //店铺详情
        that.$fetch('user_store_info_get', {}).then(rs => {
          that.value = rs.own_store.store_wallet
          this.staffId = rs['own_store']['staff_id']
          const staffUserId = rs['staff_row']['user_id']

          const lists = {page: that.page}
          that.$fetch('store_income_log', lists, `-${staffUserId}`).then(rs => {
            that.page++//请求页数自加
            that.list = rs;//覆盖本地数据
            if (rs.length != 10) {//如果数据长度小于10证明下次请求没有数据
              that.$refs.scroller.finishInfinite(true);//执行组件完成上拉方法(true代表没有数据)
              that.end = true
            } else {
              that.$refs.scroller.finishInfinite(false);//执行组件完成上拉方法(true代表没有数据)
            }
            that.firstFinish = true//标记已完成第一次上拉
          }).catch(e => {
            that.firstFinish = true//标记已完成第一次上拉
          })
        })
      },
      infinite(done) {//上拉方法
        var that = this;
        if (that.firstFinish) {//如果初始化完成才能继续上拉
          if (that.end) {//如果end == true代表已无数据
            setTimeout(() => {
              done(true)//true返回已无数据
            }, 1500)
            return
          } else {
            var lists = {page: that.page}
            that.$fetch('store_income_log', lists).then(rs => {
              setTimeout(() => {
                that.page++//请求页数自加
                that.list = that.list.concat(rs);//合并至本地数据
                if (rs.length != 10) {//如果数据长度小于10证明下次请求没有数据
                  setTimeout(() => {
                    done(true)//true返回已无数据
                  })
                  that.end = true
                } else {
                  setTimeout(() => {
                    done()
                  })
                }
              }, 1500)
            }).catch(e => {
              setTimeout(() => {
                done(true)
              })
            })
          }
        }
      },
      onClickLeft() {
			this.$store.commit('store_show', false )
				this.$router.back(-1)
      },
      getTime(time) {
        var data = new Date(time * 1000)
        if (data) {
          var year = data.getFullYear();
          var month = this.add0(data.getMonth() + 1);
          var day = this.add0(data.getDate());
          var hour = this.add0(data.getHours());
          var minute = this.add0(data.getMinutes());
          return year + '-' + month + '-' + day + ' ' + hour + ':' + minute
        } else {
          console.log('时间格式有误:' + time);
          return ''
        }
      },

      add0(time) {
        var time = Number(time);
        if (time < 10) {
          time = '0' + time
        }
        return time
      },
      toMore(id) {
        this.$router.push({
          path: '/credit_more',
          query: {
            id
          }
        })
      },
    }
  }
</script>

<style scoped>
  .storeProfit {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #f5f5f5;
  }

  .storeProfit .body {
    height: calc(100% - .46rem);
    overflow: hidden;
  }

  /*顶部*/
  .storeProfit .body .top {
    color: #fff;
    background: #18B4ED;
    padding: .3rem .15rem;
  }

  .storeProfit .body .top .title {
  }

  .storeProfit .body .top .row {
    display: flex;
    padding: .2rem 0;
    align-items: center;
    justify-content: space-between;
  }

  .storeProfit .body .top .row .sum {
    font-size: .5rem;
  }

  .storeProfit .body .top .row .btn {
    font-size: .18rem;
    width: .8rem;
    height: .35rem;
    line-height: .35rem;
    color: #000000;
    background: #fff;
    text-align: center;
    border-radius: .05rem;
  }

  .storeProfit .body .center {
    background: #fff;
    margin-top: .1rem;
    height: calc(100% - 1.95rem);
  }

  .storeProfit .body .center .title {
    padding: .15rem 0;
    display: flex;
    align-items: center;
    font-size: .18rem;
  }

  .storeProfit .body .center .title:before {
    content: '';
    width: .05rem;
    height: .23rem;
    background: #ff9c0f;
    margin-right: .1rem;
  }

  .storeProfit .body .center .ul {
    margin-left: .15rem;
    border-top: 1px solid #f5f5f5;
    position: relative;
    height: calc(100% - .5rem);
  }

  .storeProfit .body .center .ul .li {
    border-bottom: 1px solid #f5f5f5;
    padding: .15rem;
    padding-left: 0;
  }

  .storeProfit .body .center .ul .li .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: .16rem;
  }

  .storeProfit .body .center .ul .li .left {
    flex: 1;
    overflow: hidden;
  }

  .storeProfit .body .center .ul .li .right {
    font-weight: 700;
  }

  .storeProfit .body .center .ul .li .row .span {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 0.12rem;
  }

  .storeProfit .body .center .ul .li .row .span + .span {
    margin-top: .05rem;
    font-size: 0.12rem;
  }

  .storeProfit .body .center .ul .li .row .time {
    font-size: .14rem;
    color: #666666;
  }
</style>
