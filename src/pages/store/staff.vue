<template>
	<div class="staff">
		<van-nav-bar title="详细资料" left-arrow right-text="更多"
			 @click-left="onClickLeft" @click-right="onClickRight" v-if="staff_data.staff_status > 0 && !more" />

		<van-nav-bar title="详细资料" left-arrow @click-left="onClickLeft" v-else-if="!more" />
		<van-nav-bar title="更多" left-arrow @click-left="more = false" v-else />
		<div class="body" v-if="!more">
			<div class="li">
				<div>头像</div>
				<div class="img">
					<img :src="!staff_data.user_pic ? default_img : uploadFileUrl + staff_data.user_pic"/>
				</div>
			</div>
			<div class="li">
				<div>姓名</div>
				<div>{{staff_data.staff_name}}</div>
			</div>
			<div class="li">
				<div>联系方式</div>
        <a :href="'tel:' + staff_data.staff_tel" style="color: #000;">{{staff_data.staff_tel}}</a>
			</div>
			<div class="li">
				<div>身份证号</div>
				<div>{{staff_data.staff_id_card_number}}</div>
			</div>
			<div class="row">
				<div class="item">
					<div class="img">
						<img :src="$get_thumb_img(staff_data.staff_id_card_pic_zm,150,110)" @click="showImg(staff_data.staff_id_card_pic_zm)" />
					</div>
					<div>身份证正面照</div>
				</div>
				<div class="item">
					<div class="img">
						<img :src="$get_thumb_img(staff_data.staff_id_card_pic_bm,150,110)" @click="showImg(staff_data.staff_id_card_pic_bm)" />
					</div>
					<div>身份证反面照</div>
				</div>
			</div>

			<div style="padding: 0 .1rem;">资质证书</div>
			<div class="row">
				<div class="item">
					<div class="img">
            <img v-if="staff_data.staff_cert_pic_zm" :src="$get_thumb_img(staff_data.staff_cert_pic_zm,150,110)"
                 @click="showImg(staff_data.staff_cert_pic_zm)" />
					</div>
					<div>资质证书正面照</div>
				</div>
				<div class="item">
					<div class="img">
            <img v-if="staff_data.staff_cert_pic_bm" :src="$get_thumb_img(staff_data.staff_cert_pic_bm,150,110)"
                 @click="showImg(staff_data.staff_cert_pic_bm)"/>
					</div>
					<div>资质证书反面照</div>
				</div>
			</div>
      <div class="li">
        <div>入驻地址</div>
        <div>{{staff_data.staff_address_info}}</div>
      </div>
			<div class="bottom" v-if="staff_data.staff_pass == 0">
				<div class="btn" @click="dispass">拒绝申请</div>
				<div class="btn blue" @click="pass">通过申请</div>
			</div>
		</div>
		<div class="body" v-else>
			<div class="li">
				<div>申请时间</div>
				<div>{{staff_data.staff_add_at}}</div>
			</div>
			<div class="li">
				<div>设置为管理员</div>
				<van-switch :value="admin" size=".2rem" @input="setadmin" />
			</div>
			<div class="li">
				<div>启用此账号</div>
				<van-switch :value="open" size=".2rem" @input="setopen" />
			</div>
			<div class="li" @click="server_record">
				<div>查看服务记录</div>
				<div class="right"></div>
			</div>
			<div class="btn red" @click="remove">移除本账号</div>
		</div>
		<van-dialog v-model="show" show-cancel-button :before-close="beforeClose">
			<van-field
			    v-model="reason"
			    label="理由"
			    placeholder="请填写拒绝理由"
			  />
		</van-dialog>
    <van-popup v-model="imgShow" style="width: 100%;">
      <img :src="imgSrc" alt="" @click="imgShow = false" style="width: 100%;height: auto;">
    </van-popup>
	</div>
</template>

<script>
	import api from '@/api/api'
	export default{
		data(){
			return{
			  default_img: require('@/assets/img/carWash.png'),
				staff_id:0,//员工id
				staff_data:{},//员工信息
				uploadFileUrl:api.uploadFileUrl+'/',
				show:false,//拒绝弹窗
				reason:'',//拒绝理由
				more:false,//更多
				admin:false,//是否管理员
				open:false,//是否启用
        imgShow:false,
        imgSrc:''
			}
		},
		mounted(){
			this.staff_id = this.$route.query.staff_id;
			this.init();
		},
		methods:{
      showImg(src) {
        this.imgShow = true;
        this.imgSrc = this.uploadFileUrl + src
      },
			init(){
				let that = this;
				if(that.staff_id){
					that.$fetch('store_staff_info_get', {}, that.staff_id).then(rs =>{
            that.staff_data = rs
            if(that.staff_data.staff_status == 1){that.open = true}
            if(that.staff_data.user_type == 2){that.admin = true}
					})
				}else{
					that.$toast('员工id非法？:'+that.staff_id)
				}
			},
			onClickLeft(){
				this.$router.back(-1)
			},
			onClickRight(){
				this.more = true;
			},
			dispass(){
				let that = this;
				that.$dialog.confirm({
			        title: '提醒',
			        message: '是否拒绝？'
		      }).then(() => {
		      		that.show = true;
	      		}).catch(() => {
				  // on cancel
				});
			},
			pass(){
				let that = this;
				var qs = require('qs');
        		var odata = {};
        		odata.pass = 1;
        		odata.reason = '';
        		that.$fetch('store_shenhe', odata, that.staff_data.id).then(rs =>{
              that.$toast('操作成功');
              that.$router.push({
                path:'/storeStaff'
              })
        		})
			},
			beforeClose(action, done) {
				let that = this;
		        if (action === 'confirm') {
		        	if(that.reason.length == 0){
		        		that.$toast('操作失败，请先填写拒绝理由！');
		        		done();
		        	}else{
		        		var odata = {};
		        		odata.pass = -1;
		        		odata.reason = that.reason;
		        		that.$fetch('store_shenhe', odata, that.staff_data.id).then(rs =>{
                  that.$toast('操作成功');
                  that.$router.push({
                    path:'/storeStaff'
                  })
		        		}).catch(e => {
                  done();
                })
		        	}
		      	} else {
		        	done();
		      	}
		    },
		    setadmin(checked){
				let that = this;
		    	that.$dialog.confirm({
			        title: '提醒',
			        message: '是否修改管理员权限？'
		      }).then(() => {
		      		that.$fetch('staff_set_admin', {}, that.staff_id).then(rs =>{
                that.admin = checked;
                that.$toast('修改成功')
		      		})
			    }).catch(() => {
				  // on cancel
				});
		    },
		    setopen(checked){
				let that = this;
		    	that.$dialog.confirm({
			        title: '提醒',
			        message: '是否修改启用此账号？'
		      	}).then(() => {
		      		that.$fetch('store_auditing', {}, that.staff_data.id).then(rs =>{
                that.open = checked;
                that.$toast('修改成功')
		      		})
			    }).catch(() => {
				  // on cancel
				});
	    	},
	    	remove(){
	    		let that = this;
		    	that.$dialog.confirm({
			        title: '提醒',
			        message: '是否移除此账号？'
		      	}).then(() => {
		      		that.$fetch('store_staff_remove', {}, that.staff_id).then(rs =>{
                that.$toast('设置成功')
                that.$router.push({
                  path:'/storeStaff'
                })
		      		})
			    }).catch(() => {
				  // on cancel
				});
	    	},
			server_record(){
				this.$router.push({
					path:'/store_orders_x',
					query:{
						staff_id:this.staff_id,
						fromStaff:1
					}
				})
			}
		}
	}
</script>

<style scoped>
	.staff{
		background: #fff;
	}
	.staff .body{
	}
	.staff .body .li{
		display: flex;
		padding: .1rem;
		justify-content: space-between;
		align-items: center;
	}
	.staff .body .li .right{
		width: .2rem;
		height: .2rem;
		background: url(../../assets/img/right.png) no-repeat;
		background-position: center;
		background-size: auto .15rem;
	}
	.staff .body .li .img{
		width: .5rem;
		height: .5rem;
		border-radius: 50%;
		overflow: hidden;
	}
	.staff .body .li .img>img{
		width: 100%;
		height: auto;
	}
	.staff .body .row{
		display: flex;
		padding: .1rem;
		color: #b2b2b2;
	}

  .staff .body .row .item > div:nth-child(2) {
    margin-top: .1rem;
  }
	.staff .body .row .item{
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border: 1px dashed #b2b2b2;
    padding: .1rem 0;
	}
	.staff .body .row .item+.item{
		margin-left: .15rem;
	}
	.staff .body .row .item .img{
		width: .75rem;
		height: .64rem;
		overflow: hidden;
	}
	.staff .body .row .item .img>img{
		width: 100%;
		height: auto;
	}
	.staff .body .bottom{
		width: 100%;
		display: flex;
	}
	.staff .body .bottom .btn{
		flex: 1;
		line-height: .46rem;
		border: 1px solid #b2b2b2;
		font-size: .16rem;
		border-radius: .1rem;
		margin: .1rem;
		text-align: center;
	}
	.staff .body .bottom .btn.blue{
		border: 0;
		background: #18B4ED;
		color: #fff;
	}
	.staff .body .btn.red{
		padding: .1rem;
		background: red;
		color: #fff;
		border-radius: .1rem;
		text-align: center;
		margin: .1rem;
		font-size: .16rem;
	}
</style>
<style type="text/css">
	.staff .van-switch--on{
		background: #18B4ED;
	}
</style>
