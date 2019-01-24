<template>
  <div>
    <div class="white">
      <van-nav-bar title="个人信息" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="top_img">
      <div class="le_tit">
        头像
      </div>
      <div class="ri_inpu uploa">
        <div v-for="(item,index) in card" v-if="path_img != ''">
          <img :src="item.content"/>
        </div>
        <div class="imgs" v-if="path_img == ''">
          <img src="../../assets/img/logo_h.png" v-if="infoList.user_pic == ''"/>
          <img :src="infoList.user_pic" v-else />
        </div>
        <van-uploader :after-read="onRead">
          <van-icon name="photograph"/>
        </van-uploader>
        <div style="z-index: 2; font-size: .1rem; opacity: .5;" v-if="infoList.user_pic==''">
          上传头像
        </div>
        <!--<img src="../../assets/img/ha.png" alt="" />-->
      </div>
    </div>
    <ul class="com_ul">
      <li>
        <div class="le_tit">
          昵称
        </div>
        <div class="ri_inpu">
          <input type="text" name="" id="" v-model="infoList.user_nickname" placeholder="请输入昵称"/>
        </div>
      </li>
      <!--<li>
                <div class="le_tit">
                    会员号
                </div>
                <div class="ri_inpu">
                    <input type="text" name="" id="" placeholder="ID:13265849568" disabled="disabled"/>
                </div>
            </li>-->
      <!--<li>
                <div class="le_tit">
                    性别
                </div>
                <div class="ri_inpu">
                    <div class="contact_2_but">
                        <button class="but_n b1" @click="butadd(item,index)" type="button" v-for="(item,index) in datas.nvn" :class="{button_colc : index == num}">{{item.name}}</button>
                    </div>
                </div>
            </li>-->
      <li @click="sexClick">
        <div class="le_tit">
          性别
        </div>
        <span>{{infoList.user_sex}}</span>
      </li>
    </ul>
    <van-actionsheet v-model="sexBox" :actions="actions"/>

    <div class="addbut">
      <button @click="addbuts">确 定</button>
    </div>

  </div>
</template>

<!--suppress EqualityComparisonWithCoercionJS -->
<script>
  import api from '@/api/api'

  export default {
    data() {
      return {
        num: 0,
        sexBox: false,
        sex: '',
        uploadFileUrl: api.uploadFileUrl + '/',
        datas: {
          name_in: '', //名字
          mobile_in: '', //手机
          file: '',
        },
        actions: [{
          name: '男',
          callback: this.sexC
        },
          {
            name: '女 ',
            callback: this.sexC
          },
        ],
        infoList: [],
        path_img: '',
        card: [],
      }
    },
    mounted() { //生命周期
      this.userInfo();
    },
    methods: { //方法
      loadImg(filer) { //图片上传方法
        var that = this;
        var lists = {}
        lists.img = filer.content
        that.path = "";
        that.$fetch('uploadBase', lists).then(rs =>{
          that.path_img = rs.path;
          that.$toast('上传成功');
        })
      },
      userInfo() {
        var that = this;
        that.$fetch('user_info_get', {}, '', 'GET').then(rs =>{
          that.infoList = rs
        })
      },
      //			butadd(item, index) {
      //				let that = this
      //				that.num = index
      //				that.iname = item
      //			},
      //			返回上一级
      onClickLeft() {
        // 删除已上传的图片
        this.$fetch('file_remove', {files: this.path_img}).then(rs =>{
        	this.$router.back(-1)
        })

      },
      //图片上传
      onRead(file) {
        this.card.shift();
        this.card.push(file);
        this.loadImg(file)
        console.log(this.card)
      },
      sexClick() {
        var that = this;
        that.sexBox = true;
      },
      sexC(item) {
        this.infoList.user_sex = item.name;
        this.sexBox = false;
      },
      addbuts() {
        var that = this;
        var lists = {};
        if (lists.user_nickname == '') {
          that.$toast("请填写昵称");
        } else {
          lists.user_pic = that.path_img;
          lists.user_nickname = that.infoList.user_nickname;
          if ('男' == that.infoList.user_sex) {
            lists.user_sex = 1;
          } else if ('女' == that.infoList.user_sex) {
            lists.user_sex = 0;
          } else {
            lists.user_sex = -1;
          }
					that.$fetch('user_info_update', lists).then(rs =>{
						if (rs.error == 0) {
              that.$toast("修改成功");
              setTimeout(() => {
                that.$router.push({
                  path: '/member'
                })
              }, 2000)
            } else {
              that.$toast(JSON.stringify(rs.msg))
            }
					})
        }

      },
    },

  }
</script>

<style scoped>
  .top_img {
    display: flex;
    height: .75rem;
    line-height: .75rem;
    padding: 0 .15rem;
    justify-content: space-between;
    border-bottom: .01rem solid #eee;
  }

  .top_img .ri_inpu {
    margin: .125rem 0 0 0;
    width: .5rem;
    height: .5rem;
  }

  .uploa {
    position: relative;
  }

  .uploa div {
    position: absolute;
    top: 0;
    right: .15rem;
    width: .55rem;
    height: .55rem;
    line-height: .55rem;
    text-align: center;
    z-index: 10;
    /*background: #eee;*/
    /*overflow: hidden;*/
  }

  .uploa div:nth-child(1) {
    right: .15rem;
  }

  .top_img .ri_inpu img {
    width: .5rem;
    height: .5rem;
  }

  .le_tit {
    font-size: .16rem;
    font-weight: 700;
  }

  .com_ul li {
    display: flex;
    height: .55rem;
    line-height: .55rem;
    padding: 0 .15rem;
    justify-content: space-between;
    border-bottom: .01rem solid #eee;
  }

  .com_ul .ri_inpu {
    flex: 0 0 2rem;
  }

  .com_ul .ri_inpu input {
    width: 100%;
    border: none;
    background: none;
    text-align: right;
    font-size: .14rem;
  }

  .but_n,
  .but_m {
    width: .62rem;
    height: .3rem;
    line-height: .3rem;
    font-size: 0.14rem;
    background: #fff;
    border: .01rem solid #eee;
    border-radius: 0.05rem;
    cursor: pointer;
    margin: 0 .1rem;
  }

  .button_colc {
    border: .01rem solid #f63;
    color: #f63;
  }

  ::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #b2b2b2;
  }

  .addbut {
    width: 100%;
    position: absolute;
    bottom: 0;
    z-index: 999;
  }

  .addbut button {
    width: 100%;
    height: .44rem;
    line-height: .44rem;
    border: 0;
    background: #007AFF;
    font-size: .16rem;
    color: #fff;
  }
</style>
<style type="text/css">
  .uploa .van-icon {
    opacity: 0 !important;
  }
</style>
