<template>
  <div class="attendance">
    <van-nav-bar  title="考核记录" left-arrow @click-left="onClickLeft"  @click-right="onClickRight"  right-text="选择月份" />
    <ul class="ul border_box">
      <li class="li">
        日期
      </li>
      <li class="li">
        状态
      </li>
      <li class="li">
        上班开始
      </li>
      <li class="li">
        完工下班
      </li>
    </ul>

    <ul class="uls">
      <li v-if="list == ''" class="no_time">
        暂无记录
      </li>
      <li class="lis" v-for="(item,index) in list">
        <div class="div">
          {{item.performance_date}}
        </div>
        <div class="div">
            <span v-if="item.type == 0" class="spanc2">请假</span>
            <span v-else-if="item.type == 1" class="spanc3">休息</span>
            <span v-else class="spanc1">正常</span>
        </div>
        <div class="div">

          <span v-if="item.performance_type == 0"  class="spanc2">----</span>
          <span v-else-if="item.performance_type == 1"  class="spanc3">----</span>
          <span v-else class="spanc3">{{item.start_at}}</span>
        </div>
        <div class="div">
          <span v-if="item.performance_type == 0" class="spanc2" >----</span>
          <span v-else-if="item.performance_type == 1"  class="spanc3">----</span>
          <span v-else class="spanc3">{{item.end_at}}</span>
        </div>
      </li>
    </ul>


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
        show:false,
        minDate:new Date(2018, 0, 1),
        maxDate:new Date(2019, 12, 1),
        currentDate:'',
      list:[ ]
      }
    },

    mounted() {
      this.info()
    },
    methods: {
      onClickLeft(){
        window.history.go(-1);
      },
      onClickRight() {
        this.show = true
      },
      cancel(){
        this.show = false
      },
      confirm(value){
        let getm = (value.getMonth()+1 < 10 ? '0'+(value.getMonth()+1) : value.getMonth()+1) ;
        this.dates = value.getFullYear().toString() + '-'+ getm.toString()
        let  list = {}
        list.statistics_month_at = value.getFullYear().toString() + '-'+ getm.toString()
        this.$fetch('staff_attendance_records', list, '', 'POST').then(rs => {
          this.list = rs
        }).catch(e => {
          console.log('ree')
        })
        this.show = false

      },
      info(){
        let  list = {}
        this.$fetch('staff_attendance_records',{}, '', 'POST').then(rs => {
          console.log(rs)
          this.list = rs
        }).catch(e => {
          console.log('ree')
        })
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
  .attendance{
    font-size: 0.14rem;
    .border_box{
      box-shadow: 2px 2px 10px rgba(224, 243, 250, 1);
      font-size: .14rem;
      font-weight: 700;
    }
    .ul{
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: space-between;
      margin-bottom: .15rem;
      .li{
        width: 25%;
        line-height: .5rem;
      }

    }
    .uls{
      .lis{
        width: 100%;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: space-between;
        border-bottom: 0.01rem solid #eeeeee;
        line-height: .5rem;
        .div{
          width: 25%;
          .spanc1{color: #8bc34a}
          .spanc2{color: #ff0000}
          .spanc3{color: #333333}
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
<style type="text/css">
  .attendance .van-nav-bar__text{
    color: #fff !important;
    font-size: 0.14rem;
  }

</style>
