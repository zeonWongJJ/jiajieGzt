<template>
  <div class="approval_details">
    <van-nav-bar  title="审批详情" left-arrow @click-left="onClickLeft" />
    <ul>
      <li class="li_box">
        <div class="left">
          请假类型
        </div>
        <div class="right">
          <span v-if="list.store_id == 2">病假</span>
          <span v-else-if="list.store_id == 3">调休</span>
          <span v-else-if="list.store_id == 4">婚假</span>
          <span v-else-if="list.store_id == 5">下午</span>
          <span v-else-if="list.store_id == 6">产假</span>
          <span v-else>事假</span>
        </div>
      </li>
      <li class="li_box">
        <div class="left">
        请假时间
      </div>
        <div class="right">
          {{list.start_at}}-{{list.end_at}}
          <span v-if="list.performance_type == 2">上午</span>
          <span v-else-if="list.performance_type == 3">下午</span>
          <span v-else>当天</span>
        </div>

      </li>
      <li class="li_text">
        <div class="text">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{list.leave_reason}}
        </div>
      </li>
    </ul>
    <div class="buttons">
      <div  class="button color1" v-show="!onshowb" @click="onbut(2,list,id)">驳回</div>
      <div class="button color2" v-show="!onshow"  @click="onbut(1,list,id)">同意</div>
      <div class="button color3" v-show="onshow" >已同意</div>
      <div class="button color3" v-show="onshowb">已驳回</div>
    </div>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        onshow:false,
        onshowb:false,
        list:{}
      }
    },
    mounted() {
      this.list = JSON.parse(this.$route.query.listsr)
    },
    methods: {
      onbut(type,item){
        let list = {}
        list.leave_id = itemx
        list.review_type = type
        this.$fetch('review_leave_request', list, '', 'POST').then(rs => {
          console.log(rs)
          this.onshow = true
          this.onshowb = true
          this.$route.push({
            path:'/approval'
          })

        }).catch(e => {
          console.log('ree')
        })
      },
      onClickLeft(){
      this.$store.commit('store_show', true )
        window.history.go(-1);
      },
    }
  }
</script>

<style scoped lang="less">
  .approval_details{
    .li_box{
      display: flex;
      padding: 0 .12rem;
      margin: 0.15rem 0;
      height: .5rem;
      align-items: center;
      box-shadow: 2px 2px 10px rgba(224, 243, 250, 1);
      font-size: .14rem;
      .left{
        flex:0 0 .8rem ;
      }
      .right{
        width: 100%;
      }
    }
    .li_text{
      line-height: .22rem;
      min-height: 1rem;
      padding:.15rem .12rem;
      margin: 0.15rem 0;
      box-shadow: 2px 2px 10px rgba(224, 243, 250, 1);
    }
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
  }

</style>
