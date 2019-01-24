<template>
  <div class="achievements">
    <van-nav-bar  title="绩效" left-arrow @click-left="onClickLeft" />
<div class="box">
    <div class="record_imgs">
      <ul>
        <li @click="onattendance()">
          <img src="../../../assets/img/top.png" height="60" width="60"/>
          <p>考勤记录</p>
        </li>
        <li @click="onleave()">
          <img src="../../../assets/img/top.png" height="60" width="60"/>
          <p>请假记录</p>
        </li>
        <li @click="approvals()">
          <img src="../../../assets/img/top.png" height="60" width="60"/>
          <p>审批记录</p>
        </li>
      </ul>
    </div>

  <!--时间-->
  <div class="times">
      <div>绩效月历统计</div>
      <div> 
        <span class="times_ri" @click="show = !show">
          <span>{{dates}}</span>
          &nbsp;<img src="../../../assets/img/img_vx/service_h_top.png" height="9" width="16" v-if="!show"/>
            <img src="../../../assets/img/img_vx/service_h_tbottom.png" height="9" width="16" v-else/>
        </span>
      </div>
  </div>
  <!--人头-->
  <div class="personnel">
    <ul>
      <li>
        <div class="personnel_img">
          <div class="personnel_img_image">
            <img src="../../../assets/img/top.png" height="60" width="60"/>
          </div>
          <div class="personnel_text">
          {{staff_name}}
          </div>
        </div>
        <!--出勤-->
        <div class="attendance">
          <div class="attendance_day">
            <div class="attendance_title">出勤天数</div>
            <div class="attendance_span">{{day}}天</div>
          </div>
          <div class="attendance_h">
            <div class="attendance_title">出勤时间</div>
            <div class="attendance_span">{{time}}小时</div>
          </div>
        </div>
      </li>
    </ul>

  </div>

</div>
    <van-popup v-model="show" position="bottom" :overlay="false">
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        title="选择月份"
        @confirm="confirm"
        @cancel="cancel"
        :formatter="formatter"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>

  </div>
</template>


<script>
  export default {
    data() {
      return {
        show: false,
        currentDate: '',
        dates:'',
        minHour: 10,
        maxHour: 20,
        minDate:new Date(2019, 0, 1),
        maxDate:new Date(2020, 12, 30),
          day:'',
          time:'',
        staff_name:'',
        // list:[
          // {
          //   name:'杨幂',
          //   day:20,
          //   time:520,
          // },

        // ]
      }
    },
    mounted() {
    this.ondata()
      this.inof()
    },
    methods: {
      // 考勤
      onattendance(){
        this.$router.push({
          path: '/attendance',

        })
      },
     // 请假
      onleave(){
        this.$router.push({
      path: '/leave',

    })
      },
      // 审批
      approvals(){
        this.$router.push({
          path:'/approval'

        })

      },
      inof(){
        let  list = {}
        list.statistics_month_at = this.dates
          list.staff_uid = this.$store.state.user_id
        this.$fetch('staff_performance_statistics', list, '', 'POST').then(rs => {
          console.log(rs.attendance_days)
          this.day = rs.attendance_days
          this.time = rs.attendance_time
          this.staff_name = rs.staff_name
        }).catch(e => {
          console.log('ree')
        })
  },
      ondata(){
        let data = new Date()
        let getm = (data.getMonth()+1 < 10 ? '0'+(data.getMonth()+1) : data.getMonth()+1) ;
       this.dates = data.getFullYear() + '-'+ getm
      },
      onClickLeft(){
        this.$store.commit('store_show', true )
        window.history.go(-1);
      },
      cancel(){
        this.show = false
      },
      confirm(value){
        let getm = (value.getMonth()+1 < 10 ? '0'+(value.getMonth()+1) : value.getMonth()+1) ;
        this.dates = value.getFullYear().toString() + '-'+ getm.toString()

        let  list = {}
        list.statistics_month_at = this.dates
        list.staff_uid = this.$store.state.user_id
        this.$fetch('staff_performance_statistics', list, '', 'POST').then(rs => {
          console.log(rs.attendance_days)
          this.day = rs.attendance_days
          this.time = rs.attendance_time
          this.staff_name = rs.staff_name
          this.show = false
        }).catch(e => {
          console.log('ree')
        })
  },
      setValues(value){
        console.log(value )
      },
      formatter(type, value) {
        if (type === 'year') {
          return `${value}年`;
        } else if (type === 'month') {
          return `${value}月`
        }
        return value;
      },


    }
  }
</script>

<style scoped lang="less">
  .achievements{
    .box{

      .record_imgs{
        ul{
          display: flex;
          justify-content: space-between;
          box-shadow: 0 1px 10px rgba(224, 243, 250, 1);
          li{
            width: 33.33%;
            height: 1.22rem ;
            text-align: center;
            padding: 0.2rem 0 0 0;
            p{
              font-size: 0.16rem;
            }
          }
        }
      }
      .times{
        padding: 0 0.1rem;
        display:flex;
        justify-content: space-between;
        height: .6rem;
        line-height: .6rem;
        margin: .1rem 0 0 0 ;
        box-shadow: 0 1px 10px rgba(224, 243, 250, 1);
        .times_ri{
          padding: .08rem .15rem;
          border: 0.01rem solid #999;
        }
      }
      .personnel{
        position: absolute;
        top: 2.55rem;
        left: 0;
        right: 0;
        bottom: 0;
        margin-bottom: .15rem;
        overflow: auto;
        ul{
          margin-top: .1rem;
          li{
            /*height: 1rem;*/
            border-bottom: 0.01rem solid #eeeeee;
            padding: .1rem .1rem;
            .personnel_img{
              display: flex;
              align-items: center;
              .personnel_img_image{
                img{
                  width: .44rem;
                  height: .44rem;
                }
              }
              .personnel_text{
                    margin-left: .15rem;
              }
            }
            .attendance{
              display: flex;
              font-size: .14rem;
              margin-top: 0.2rem;
              justify-content: space-between;
              align-items: center;
              
              .attendance_day , .attendance_h{
                display: flex;
                align-items: center;
                .attendance_title{
                  margin-right: 0.15rem;
                }
                .attendance_span{
                  color: #999;
                }
              }
              .attendance_day:before ,.attendance_h:before{
                content: '';
                width: 0.15rem;
                height: 0.2rem;
                margin-right: 0.1rem;
                background: #00a2d4;
              }


            }
          }
        }
      }













    }
  }

</style>
