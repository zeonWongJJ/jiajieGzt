<template>
  <div class="leave">
    <van-nav-bar  title="请假记录" left-arrow @click-left="onClickLeft"  @click-right="onClickRight"  right-text="申请请假" />
    <div class="top">
        <div class="top_le">
            {{ dates }}
        </div>
        <div class="top_ri">
            共{{year}}天
        </div>
    </div>
    <ul>
      <li v-if="list == ''">
          暂无请假记录
      </li>
      <li v-for="(item,index) in list" v-else>
        <div class="box">
          <div class="border" :class="{border_type0 : 0 == item.type ,border_type1 : 1 == item.type }">

          </div>
          <div class="box_li">
            <div class="box_li_type">
              <div >事假</div>
              <div class="color">2019-1-1 19：10</div>
            </div>
            <div class="box_li_iofn">
              去结婚去结婚去结婚去结婚
            </div>
            <div class="box_li_itme color">
              请假时间:2019-1-1 （周四）全天
            </div>
            <div class="box_li_show" >
              <span class="color">状态：</span>
              <span  class="colorf" :class="{type1 : 0 == item.type ,type2 : 1 == item.type }">{{item.typename}}</span>
            </div>
          </div>
        </div>
          <!--按钮-->
          <div class="but" v-if="item.type == 2">
            <span>撤销请假</span>
            <span class="reds">编辑请假</span>
          </div>
      </li>
    </ul>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        list: [
          {
            iofn: '去结婚去结婚去结婚去结婚',
            itme:'2019-1-1 19：10',
            shqut:'请假时间:2019-1-1 （周四）全天',
            typename:'已驳回',
            type:'0',
          },
          {
            iofn: '去结婚去结婚去结婚去结婚',
            itme:'2019-1-1 19：10',
            shqut:'请假时间:2019-1-1 （周四）全天',
            typename:'已批准',
            type:'1',
          },
          {
            iofn: '去结婚去结婚去结婚去结婚',
            itme:'2019-1-1 19：10',
            shqut:'请假时间:2019-1-1 （周四）全天',
            typename:'待审批',
            type:'2',
          },
        ],
        dates:'',
        year:'',
      }
    },

    mounted() {
      this.ondate()
      this.info()
    },
    methods: {
      onClickLeft(){
        window.history.go(-1);
      },
      onClickRight() {
        this.$router.push({
          path:'/apply_leave'
        })
      },
      info(){
        let  list = {}
        list.performance_type = 2
        this.$fetch('staff_attendance_records',list, '', 'POST').then(rs => {
          console.log(rs)
          this.list = rs
        }).catch(e => {
          console.log('ree')
        })
      },
      ondate(){
        let data = new Date()
        let getm = (data.getMonth()+1 < 10 ? '0'+(data.getMonth()+1) : data.getMonth()+1) ;
        this.dates = data.getFullYear()+ '年' +   getm + '月'
        this.year = data.getDate()



      },
      // approval_details(item,index){
      //   this.$router.push({
      //     path:'/approval_details',
      //     query:{item}
      //   })
      // }

    }
  }
</script>

<style scoped lang="less">
  .leave{
    font-size: 0.14rem;
    .top{
      padding: 0 0.15rem;
      display: flex;
      height: 0.5rem;
      align-items: center;
      background: #f5f5f5;
      justify-content: space-between;
      .top_le{}
    }

    ul{
      li{


        margin:0.15rem 0 ;
        box-shadow: 2px 2px 10px rgba(224, 243, 250, 1);
        .box{
          display: flex;
          .border_type0{
            color: #ff5b6e !important;
            background: #ff5b6e !important;
          }
          .border_type1{
            color: #8bc34a !important;
            background: #8bc34a !important;
          }
          .border{
            flex: 0 0 0.05rem;
            border-radius:0 0.05rem 0.05rem 0 ;
            background: #ffa200;
        }

        .box_li{
          border-bottom: 0.01rem solid #eeeeee;
          width: 100%;
          padding: 0.1rem ;
          .color{
            font-size:.12rem ;
            color: #888888;
          }
          .colorf{
            color: #ffa200;
          }
          .type1{
            color: #ff5b6e !important;
          }
          .type2{
            color: #8bc34a !important;
          }
          .box_li_type{
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size:.16rem ;
            padding: 0.05rem 0;
          }
          .box_li_iofn{
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .box_li_itme{
            padding: 0.05rem 0;
          }
          .box_li_show{

          }
        }
        }
        .but{
          padding: 0.15rem 0;
          text-align: right;
          /*margin: 0 0.15rem 0 0;*/
          span{
            border-radius:1rem ;
            padding: 0.04rem 0.1rem;
            border: 0.01rem solid #333333;
            color: #333333;
            margin: 0 0.1rem ;
          }
          .reds{
            border: 0.01rem solid #ff5b6e;
            color: #ff5b6e;
          }
        }

      }
    }






  }

</style>
<style type="text/css">
  .leave .van-nav-bar__text{
    color: #fff !important;
    font-size: 0.14rem;
  }

</style>
