<template>
  <div class="apply_leave">
    <van-nav-bar  title="申请请假" left-arrow @click-left="onClickLeft" />
    <ul>
      <li class="li_box">
        <div class="left">
          请假类型
        </div>
        <div class="right" @click="eventshow = !eventshow ,timeshow = false">

          <span v-if="values == ''">请选择请假类型</span>
          <span v-else> {{values}}</span>
        </div>
      </li>
      <li class="li_box">
        <div class="left">
          请假时间
        </div>
        <div class="right"  @click="timeshow = !timeshow ,eventshow = false">
          <span v-if="sunval == ''">请选择请假时间</span>
          <span v-else>{{sunval}}</span>
        </div>

      </li>

      <li class="li_text">
        <div class="left">
          请假原因
        </div>
        <div class="text">
          <textarea name="" rows="3" cols="3" v-model="textareatext" placeholder="请输入原因（休息可以不填）">

          </textarea>
        </div>
      </li>
    </ul>
    <!--按钮-->
    <div class="butt" @click="onbut()">
       确定申请
    </div>







    <van-popup v-model="eventshow" position="bottom" :overlay="false">

      <van-picker
        show-toolbar
        title="选择请假类型"
        :columns="leave_type_list"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>


    <van-popup v-model="timeshow" position="bottom" :overlay="false">
      <van-picker
        show-toolbar
        title="选择月份"
        :columns="columnso"
        @change="onChangetime"
        @cancel="onCanceltime"
        @confirm="confirmDate"
      />
    </van-popup>


  </div>
</template>


<script>
  let dateObj = {}
  let nowYear = new Date().getFullYear()
  let nowMonth = new Date().getMonth() + 1;
  let nextYear = nowYear
  let nextMonth = nowMonth + 1
  if (new Date().getMonth() + 1 === 13) {
    nextYear += 1
    nextMonth = 1
  }
  dateObj[nowYear + '年' + nowMonth + '月'] = []
  dateObj[nextYear + '年' + nextMonth + '月'] = []
  let arr = Object.keys(dateObj)
  let nowCount = new Date(nowYear, nowMonth, 0).getDate()
  let nextCount = new Date(nextYear, nextMonth, 0).getDate()
  let weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  for (let j = new Date().getDate();j<nowCount;j++) {
    let day = new Date(nowYear, new Date().getMonth(), j).getDay()
    dateObj[arr[0]].push(j + '日'  + ' '  + weekDay[day])
  }
  for (let i = 1;i<nextCount;i++) {
    let day = new Date(nextYear, nextMonth, i).getDay()
    dateObj[arr[1]].push(i + '日' + ' ' + weekDay[day])
  }
  export default {
    data() {
      return {
        stop: false,
        timeshow:false,
        eventshow:false,
        times:[],
        year:[],
        valuesid:'',// 请假类型id
        values:'',//请假类型索引
        columnso: [
          {
            values: arr,
            className: 'column1'
          },
          {
            values: dateObj[arr[0]],
            className: 'column3'
          },
          {
            values: ['全天', '上午', '下午'] ,
            className: 'column4'
          }
        ],
        textareatext:'',
        subnum:1,//请假默认当天1， 上午：2 下午：3 当天：1
        sunstr:'',//后台需要时间格式， 转的格式
        sunval:'',//显示时间
        leave_type_list:[],//显示请假类型
      }
    },
    mounted(){
      this.onstaff_leave_type_list()
    },
    methods: {

      onClickRight() {
        this.$router.push({
          path:'/apply_leave'
        })
      },
      onClickLeft(){
        window.history.go(-1);
      },
      onstaff_leave_type_list(){
        this.$fetch('staff_leave_type_list', {}, '', 'POST').then(rs => {
         // this.leave_type_list =  rs
          for (let i in rs){
            this.leave_type_list.push(rs[i].type_title)
          }
        }).catch(e => {
          console.log('ree')
        })
      },



      onCanceltime(){
        this.timeshow = false
      },
      onChangetime(picker, values) {
        picker.setColumnValues(1, dateObj[values[0]]);
        // console.log('1',values[0])
        // this.timeshow = false
      },
      confirmDate(val,index) {
        this.sunval = val[0] + val[1] + val[2];
        let str = val[0]+val[1];
        let pattern =  /[\u4e00-\u9fa5]/g;
        let areg = str.replace(pattern, "-");
        let nums = areg.replace(/\s[\x00-\xff]*/g , '');
        this.sunstr = nums.substring(0, nums.length - 1);
        if(val[2] == '下午'){
          this.subnum = 3
        }else if(val[2] == '上午'){
          this.subnum = 2
        }else{
          this.subnum
        }
        console.log('dasf', this.subnum)
        this.timeshow = false
        // this.$fetch('user_store_info_get', {}, '', 'POST').then(rs => {
        //   this.timeshow = false
        // }).catch(e => {
        //   console.log('ree')
        // })

      },

      onbut(){
        if(	!this.stop){
          this.stop =true
          if(this.valuesid == ''){
            this.$toast('请假类型不能为空')
            return
          }else if(this.sunstr == ''){
            this.$toast('请假时间不能为空')
            return
          }else {
            let list = {}
            list.leave_type = this.subnum
            list.leave_day = this.sunstr
            list.leave_reason = this.textareatext // 非必传
            list.leave_label = this.valuesid
            this.$fetch('apply_for_leave', list, '', 'POST').then(rs => {
              console.log(rs)
              setTimeout(()=>{
                $toast('提交成功')
                this.$route.push({
                  path:'/leave'
                })
              },1000)

            }).catch(e => {
              console.log('reess')

            })
          }
        }
      },


      // 请假类型
      onConfirm(picker, value, index) {
        // id 拿补到再走接口  ··临时是用value+1当id，value是下标
        // this.$fetch('staff_leave_type_list', {}, '', 'POST').then(rs => {
        //   // this.leave_type_list =  rs
        //   for (let i in rs){
        //     this.leave_type_list.push(rs[i].type_title)
        //   }
        // }).catch(e => {
        //   console.log('ree')
        // })
        this.values = picker
        this.valuesid = value + 1
        console.log('当前值2',value+1)

        this.eventshow = false
      },
      onCancel(){
        this.eventshow = false
      },
    }
  }
</script>

<style scoped lang="less">
  .apply_leave {

    .li_box {
      display: flex;
      padding: 0 .12rem;
      margin: 0.15rem 0;
      height: .5rem;
      align-items: center;
      box-shadow: 2px 2px 10px rgba(224, 243, 250, 1);
      font-size: .14rem;

      .left {
        flex: 0 0 .8rem;
        color: #333333;
        font-weight: 700;
      }

      .right {
        width: 100%;
      }
    }

    .li_text {
      line-height: .22rem;
      min-height: 1rem;
      padding: .15rem .12rem;
      margin: 0.15rem 0;
      box-shadow: 2px 2px 10px rgba(224, 243, 250, 1);
      .text{
        textarea{
          width: 100%;
          border: none;
        }
      }
      .left {
        flex: 0 0 .8rem;
        color: #333333;
        font-weight: 700;
      }
    }
    .butt{
      border-radius:0.05rem ;
      background: #18b4ed;
      height: .45rem;
      line-height: .45rem;
      text-align: center;
      font-size: 0.16rem;
      color: #fff;
      width: 90%;
      margin: 0 5%;
    }
  }

</style>

