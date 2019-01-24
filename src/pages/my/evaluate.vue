<template>
  <div class="myevalue">
    <div>
      <van-nav-bar title="评价" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="com_box" v-if="Object.keys(listst).length">
      <!--公司-->
      <div class="company_top">
        <div class="company_top_img" >
          <img src="../../assets/img/logo_h.png" v-if="listst.entity_row.subject_img == ''"   />
          <img :src="uploadFileUrl  + listst.entity_row.subject_img[0]" v-else />
        </div>
        <div>
          {{listst.entity_row.store_name}}
        </div>
      </div>
      <!--文字-->
      <div class="written">
        <div class="company_written_img">
          <div class="written_top_img">
          	    <img src="../../assets/img/logo_h.png" v-if="listst.order_info.order_detail.order_pic == ''"   />
          		  <img :src="uploadFileUrl + listst.order_info.order_detail.order_pic[0]" v-else/>
          </div>
          <div class="company_top_x">
            <div v-for="(item,index) in listxp">
              <div class="company_top_x_img" v-if="num == 0" :class="{company_top_x_img_xing : index == num}"
                   @click="tabx(index)"></div>
              <div class="company_top_x_img" v-if="num == 1" :class="{company_top_x_img_xing2 : index == num}"
                   @click="tabx(index)"></div>
              <div class="company_top_x_img" v-if="num == 2" :class="{company_top_x_img_xing3 : index == num}"
                   @click="tabx(index)"></div>

              <!--<div class="company_top_x_img" :class="{company_top_x_img_xing : index == num}" @click="tabx(index)"></div>-->
              <div>{{item.name}}</div>
            </div>

          </div>
        </div>

        <div class="tests">
          <div>
            <textarea maxlength="200" v-model="test_cao" rows="6" cols="" placeholder="请输入评论"></textarea>
          </div>
          <div class="upimg">
            <ul class="uploade_div_ul">
              <li v-if="file != ''" v-for="(item,index) in file" class="uploade_div_img">
                <span @click="spli(item,index)"></span>
                <img :src="item.content"/>
              </li>
              <li class="uploade_div_img_w">
                <van-uploader :after-read="onRead">
                  <van-icon name="photograph"/>
                </van-uploader>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--星星-->
      <div class="xingx">
        <div class="xingx_x">
          <div>
            技术能力
          </div>
          <div>
            <van-rate v-model="value1" @change="change1"/>
          </div>
        </div>
        <div class="xingx_x">
          <div>
            服务态度
          </div>
          <div>
            <van-rate v-model="value2" @change="change2"/>
          </div>
        </div>
        <div class="xingx_x">
          <div>
            时间效率
          </div>
          <div>
            <van-rate v-model="value3" @change="change3"/>
          </div>
        </div>
      </div>

    </div>

    <div class="but">
      <button @click="upbut()">确定</button>
    </div>
    <on-loading :show="onshows"></on-loading>
  </div>
</template>

<script>
  import api from '@/api/api'
	export default {
    data() {
      return {
      	onshows:false,
        uploadFileUrl: api.uploadFileUrl + '/',
        xshow: false,
        num: 0,
        listxp: [{
          name: '好评'
        },
          {
            name: '中评'
          },
          {
            name: '差评'
          },
        ],
        file: [],
        value1: 5,
        value2: 5,
        value3: 5,
        listst: {},
        test_cao: '',
        imgs: '',
        path_img: [],
      }
    },
    mounted() { //生命周期
      this.order_sn = this.$route.query.order_snx
      this.$fetch('order_getby_sn', {}, this.order_sn).then(rs => {
        this.listst = rs
      })
    },
    methods: { //方法
      upbut() {
        let that = this;
        if(!that.onshows){
        	that.onshows = true
	        let xnum = this.num + 1
	        let lists = {};
	        lists.comment_order_sn = that.$route.query.order_snx//评论的商品(服务)id
	        lists.comment_type_star = xnum//评星级级别，默认好评，1好评2中评3差评
	        lists.comment_content = that.test_cao//评论的内容
	//				lists.product_comment_score = adds	//商品(服务)被评论的分数(星级)
	        lists.comment_img_urls = that.path_img//评论图片地址，可多个，逗号分隔
	        lists.skill_star = that.value1//技能星级
	        lists.attitude_star = that.value2//	服务态度星级
	        lists.time_efficiency_star = that.value3//时间效率星级
        	that.$fetch('comment_add', lists).then(rs =>{
          	that.$toast('评价成功');
            that.$router.push({
              path: '/myeval',
            })
        	}).catch(e =>{
            that.onshows = false
          })
        }
      },
      onClickLeft() {
        this.$router.back(-1)
        // this.$router.push({
        //   path: '/orders'
        // });
      },
      //			tup
      onRead(file) {
        let that = this
        that.file.push(file)
        that.file_img = file.content
        let lists = {}
        lists.img = file.content
        that.$fetch('uploadBase',lists)
        .then(rs =>{
        	that.$toast('上传成功');
        		that.path_img.push(rs.path)
//      	if(rs.error == 0){
//      		that.path_img.push(rs.data.path)
//            that.$toast('上传成功');
//      	}else{
//      		that.$toast(JSON.stringify(rs.msg))
//      	}
        })
      },

      tabx(index) {
        this.num = index;

      }, //删除
      spli(item, index) {
        let that = this
        that.file.splice(index, index + 1)

      },
      oxshow() {
        let that = this
        that.xshow = !that.xshow
      },
      change1(value) {

      },

      change2(value) {

      },
      change3(value) {

      },

    },

  }
</script>

<style scoped>
  .myevalue {
    background: #f5f5f5;
  }

  .company_top {
    height: .65rem;
    line-height: .65rem;
    display: flex;
    padding: 0 .15rem;
    background: #fff;
    margin: .1rem 0;
  }

  .company_top_img {
    height: .45rem;
    line-height: .45rem;
    margin: .1rem .15rem 0 0;
    border-radius: .1rem;
    overflow: hidden;
  }

  .company_top_img img {
    width: .45rem;
    height: .45rem;
    line-height: .45rem;
  }

  .company_top div:nth-child(2) {
    height: .65rem;
    line-height: .65rem;
  }

  .written {
    background: #fff;
    padding: 0 .15rem .15rem;
  }

  .company_written_img {
    display: flex;
    background: #fff;
  }

  .written_top_img {
    width: .45rem;
    height: .45rem;
    line-height: .45rem;
    margin: .1rem .15rem 0 0;
  }

  .written_top_img img {
    width: .45rem;
    height: .45rem;
    line-height: .45rem;
  }

  .company_top_x {
    display: flex;
    align-items: center;
  }

  .company_top_x > div {
    flex: 0 0 1rem;
  }

  .company_top_x > div {
    display: flex;
    align-items: center;
  }

  .company_top_x > div > div:nth-child(1) {
    margin-right: .08rem;
  }

  .company_top_x > div > div img {
    width: .26rem;
    height: .26rem;
  }

  .company_top_x_img {
    width: .24rem;
    height: .24rem;
    background: url(../../assets/img/like.png) no-repeat;
    background-size: .24rem .24rem;
  }

  .company_top_x_img_xing {
    width: .24rem;
    height: .24rem;
    background: url(../../assets/img/xx_h.png) no-repeat;
    background-size: .24rem .24rem;
  }

  .company_top_x_img_xing2 {
    width: .24rem;
    height: .24rem;
    background: url(../../assets/img/xx_bh.png) no-repeat;
    background-size: .24rem .24rem;
  }

  .company_top_x_img_xing3 {
    width: .24rem;
    height: .24rem;
    background: url(../../assets/img/xx_m.png) no-repeat;
    background-size: .24rem .24rem;
  }

  .tests {
    margin: .1rem 0 0 0;
    border: 0.01rem solid #E3E3E3;
    border-radius: .1rem;
  }

  .tests textarea {
    width: 96%;
    border-radius: .1rem;
    padding: 2%;
    border: 0;
  }

  .upimg {
    padding: 0 .1rem;
  }

  /*图片*/

  .uploade_div_ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .uploade_div_img {
    height: .75rem;
    width: .75rem;
    margin-right: 0.11rem;
    margin-bottom: .1rem;
    position: relative;
  }

  .uploade_div_img span {
    content: '';
    width: .18rem;
    height: .18rem;
    line-height: .18rem;
    border-radius: 50%;
    position: absolute;
    top: -0.09rem;
    right: -0.09rem;
    background: url(../../../static/images/gxx_1.png);
    background-size: .18rem .18rem;
  }

  .uploade_div_img img {
    height: .75rem;
    width: .75rem;
  }

  .uploade_div_img_w {
    height: .75rem;
    width: .75rem;
    line-height: .75rem;
    text-align: center;
    border: .01rem dashed #eee;
    margin-right: 0.1rem;
    margin-bottom: .1rem;
  }

  /*.uploade_div_img div {
        height: .78rem;
        width: .78rem;
    }*/
  /*.uploade_div_img div img {
        height: .78rem;
        width: .78rem;
    }*/
  /*.uploade_div div:nth-child(2) {
        height: .78rem;
        width: .78rem;
        line-height: .78rem;
        text-align: center;
        border: .01rem double #eee;
    }*/
  /*//*/

  .div_re,
  .div_re_bottom {
    margin: .1rem 0 0 0;
    padding: 0 .15rem;
    display: flex;
    line-height: .35rem;
    justify-content: space-between;
    background: #fff;
    height: .68rem;
    line-height: .68rem;
  }

  .div_re img {
    width: .08rem;
  }

  .div_re_bottom img {
    width: .08rem;
  }

  .div_re > div:nth-child(1) {
    font-size: .18rem;
    font-weight: 700;
  }

  .div_re > div:nth-child(2) {
    font-size: .16rem;
    color: #B2B2B2;

  }

  .div_re_bottom > div:nth-child(1) {
    font-size: .18rem;
    font-weight: 700;
  }

  .div_re_bottom > div:nth-child(2) {
    display: flex;
  }

  .bo_span {
    font-size: .12rem;
    border: .01rem solid #F0AD4E;
    color: #F0AD4E;
    border-radius: .05rem;
    padding: .01rem .03rem;
    margin: 0 .05rem;
  }

  .xingx {
    background: #fff;
    padding: .15rem;
    margin: .1rem 0 0 0;
  }

  .xingx_x {
    display: flex;
    align-items: center;
    padding: .05rem 0;
  }

  .xingx_x div:nth-child(1) {
    margin-right: .1rem;
  }

  .but {
    padding: .15rem;
  }

  .but button {
    width: 100%;
    border: 0;
    background: #18b4ed;
    height: .5rem;
    line-height: .5rem;
    font-size: .18rem;
    color: #fff;
    border-radius: .1rem;
  }

</style>
