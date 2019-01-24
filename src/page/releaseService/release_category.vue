<template>
	<div class="squared">
		<div>
			<van-nav-bar title="选择类型" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
				<van-icon name="wap-nav" color="white" slot="right" />
			</van-nav-bar>
			<div v-show="rishow" @touchmove.prevent="orishow()" @click.stop="orishow()" style="position: fixed;z-index: 9999; top: 0;right: 0;left: 0;bottom: 0; background: rgba(0,0,0,0); ">
				<div style="position: absolute;z-index: 9999; top: .45rem;right: 0;width: 1rem ;background: rgba(0,0,0,.2); ">
					<head-ri></head-ri>
				</div>
			</div>
		</div>
		<!--///-->
		<div class="div_box">
			<ul>
				<li class="div_box_li" v-for="items in list">
					<div class="div_box_li_tit">
						{{items.cat_name}}
					</div>
					<ul class="div_box_li_mul" v-if="!items.children">
						<li class="div_box_li_mis"  @click="release_rele(items,index)">
							<!--暂无项目-->
              {{items.cat_name}}
            </li>
					</ul>
					<ul class="div_box_li_mul" v-else>
						<li class="div_box_li_mis" v-for="(items,index) in items.children" @click="release_rele(items,index)">
							{{items.cat_name}}
						</li>
					</ul>
				</li>
			</ul>
		</div>

	</div>
</template>

<script>
	import api from '@/api/api'
	import headRi from '@/page/pages/head_ri_sub'
	export default {
		components: {
			headRi
		},
		data() {
			return {
				rishow: false,
				list: [{
						name: '家电清洁',
						lists: [{
								name: '油烟机清洗'
							},
							{
								name: '油烟机清洗'
							},
							{
								name: '油烟机清洗'
							},
							{
								name: '油烟机清洗'
							},
							{
								name: '油烟机清洗'
							},
							{
								name: '油烟机清洗'
							},
							{
								name: '油烟机清洗'
							},

						]
					},
					{
						name: '家电清洗',
						lists: [{
								name: '家电清洗'
							},
							{
								name: '家电清洗'
							},
							{
								name: '家电清洗'
							},
							{
								name: '家电清洗'
							},
							{
								name: '家电清洗'
							},
						]
					},
					{
						name: '家电保养',
						lists: [{
								name: '家电保养'
							},
							{
								name: '家电保养'
							},
							{
								name: '家电保养'
							},
						]
					},
					{
						name: '空气治理',
						lists: [{
							name: '空气治理'
						}, ]
					},

				]
			}
		},
		mounted() { //生命周期
			this.list_posh()
		},
		methods: { //方法

			list_posh() {

				let that = this
				let lists = {
					'data-set': 'tree',
				};
				that.$fetch('category_list', lists, '-' + that.$route.query.ids).then(rs =>{
          if (rs.length < 1) {
            that.$router.push({
              path: 'release_rele',
              query: {
                level_1: that.$route.query.ids,
                level_2: that.$route.query.ids,
                level_3: that.$route.query.ids
              }
            })
          }
          that.list = rs
				})
			},
			onClickLeft() {
				this.$router.back(-1)
			},
			onClickRight() {
				let that = this
				that.rishow = !that.rishow
			},
			orishow() {
				let that = this
				that.rishow = false
			},
			release_rele(items, index) {
				let that = this
				console.log(items)
				that.$router.push({
					path: 'release_rele',
					query: {
						// items: JSON.stringify(items)
            // level_1: items.id
            level_1: this.$route.query.ids,
            level_2: items.parent_id,
            level_3: items.id
					}
				})
			}

		},
	}
</script>

<style scoped>
	.div_box {
		padding: 0 .15rem;
	}

	.div_box_li_tit {
		height: .3rem;
		line-height: .3rem;
		color: #0062CC;
	}

	.div_box_li_mul {
		display: flex;
		flex-wrap: wrap;
	}

	.div_box_li_mis {
		flex: 0 0 30%;
		min-height: .2rem;
		background: #f5f5f5;
		text-align: center;
		margin: 1.5%;
		padding: .1rem 0;
		border-radius: .05rem;
	}
</style>
