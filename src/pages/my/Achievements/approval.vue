<template>
  <div class="approvals">
    <van-nav-bar  title="审批记录" left-arrow @click-left="onClickLeft" />
  <ul>
    <li v-if="list == ''">
      <div class="no_time">
        暂无审批记录...
      </div>
    </li>
    <li class="list" v-for="(item,index) in list" v-else  @click="approval_details(item,index)">
      <div class="list_box">
        <div class="left">
          <!--name-->
          <div class="name">
            <div class="fz">{{item.name}}</div>
            <div class="itme">{{item.performance_date}}</div>
          </div>
          <!--2-->
          <div class="types">
            {{item.start_at}} - {{item.end_at}}
            <span v-if="item.performance_type == 2">上午</span>
            <span v-else-if="item.performance_type == 3">下午</span>
            <span v-else>当天</span>
            [
            <span v-if="item.store_id == 2">病假</span>
            <span v-else-if="item.store_id == 3">调休</span>
            <span v-else-if="item.store_id == 4">婚假</span>
            <span v-else-if="item.store_id == 5">下午</span>
            <span v-else-if="item.store_id == 6">产假</span>
            <span v-else>事假</span>
            ]
          </div>
          <div class="intr">
            {{item.leave_reason}}
          </div>
        </div>
        <div class="right">
          <img src="../../../assets/img/right.png" height="14" width="8"/>
        </div>
      </div>
      <div class="buttons">
        <div  class="button color1" v-if="item.is_review == 0 " @click.stop="onbut(2,item.id)">驳回</div>
        <div class="button color2" v-if="item.is_review == 0 " @click.stop="onbut(1,item.id)">同意</div>
        <!--<div class="button color3" v-if="item.butt == 3">已同意</div>-->
        <!--<div class="button color3" v-if="item.butt == 4">已驳回</div>-->
      </div>
    </li>

  </ul>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        list:[

          {
            name:'刘恺威',
            type:'事假',
            itme:'2019-1-2 17:21',
            intr:'安德森法大师傅，按时的发，按时的发， 按时的发按时的发按时的发按时的发',
            inof:false,
            butt:1,
            qujian:'2018-1-2 08:11 至 2018-1-3 08:00',
          },

        ]
      }
    },
    mounted() {
      this.info()
    },
    methods: {
      onClickLeft(){
        window.history.go(-1);
      },
      onbut(type,item){
        let list = {}
        list.leave_id = item
        list.review_type = type

        this.$fetch('review_leave_request', list, '', 'POST').then(rs => {
          console.log(rs)
          setTimeout(()=>{

            this.info()

          },100)


        }).catch(e => {
          console.log('ree')
        })
      },
      info(){
        this.$fetch('review_leave_list', {}, '', 'POST').then(rs => {

          this.list = rs
        }).catch(e => {
          console.log('ree')
        })
      },
      approval_details(item,index){
        this.$router.push({
          path:'/approval_details',
          query:{
            listsr :JSON.stringify(item)
          }
        })
      }

    }
}
</script>

<style scoped lang="less">
.approvals{

  ul{
    position: absolute;
    top: .46rem;
    left: 0;
    right: 0;
    bottom: 0;
    height:calc(100% - 0.46rem) ;
    overflow: auto;
    background: #f7f7f7;
    .list{
      background: #fff;
      margin: 0.1rem 0;
      .buttons{
        display: flex;
        justify-content:  flex-end;
        align-items: center;
        padding: 0.1rem 0.1rem 0.1rem 0 ;
        .button{
          background: none;
          border-radius: 5rem;
          padding: 0.1rem 0.25rem;
          margin: 0 .05rem;

        }
        .color1{
          border: 0.01rem solid #333333;
          color: #333333;
        }
        .color2{
          border: 0.01rem solid #ff5b6e;
          color: #ff5b6e;
        }
        .color3{
          border: 0.01rem solid #8bc34a;
          color: #8bc34a;
        }
      }
      /*.list_box:before {*/
        /*content: '';*/
        /*position: absolute;*/
        /*bottom: 0.6rem;*/
        /*width: 100%;*/
        /*height: 0.01rem;*/
        /*border-bottom: 0.01rem solid #000;*/
      /*}*/
      .list_box{
        display: flex;
        padding:.15rem 0 0.1rem 0;
        justify-content: space-between;
        align-items: center;
        border-bottom:0.01rem solid #eeeeee ;

      .right{
        text-align: right;
        flex: 0 0 0.25rem;
        padding:0  0.15rem 0 0;
      }

      .left{
        width: 100%;
        padding:0 0 0 0.15rem;
        .name{
          display: flex;
          margin: 0 0 0.05rem 0;
          justify-content: space-between;
          align-items: center;
          .fz{
            font-size: 0.18rem;
            font-weight: 700;

          }
          .itme{
            color: #999;
          }

        }
        .types{
          margin: 0 0 0.05rem 0;
        }
        .intr{
          margin: 0 0 0.08rem 0;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }


      }

    }

      }
  }
  .no_time{
    text-align: center;
    color: #999;
    margin: 1rem auto;
  }






}

</style>
