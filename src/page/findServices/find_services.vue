<template>
  <div class="find_serv">
    <div class="f_nav">
      <van-nav-bar title="找服务"/>
    </div>
    <div class="box_x">
      <div class="com">
        <ul class="f_ul">
          <li v-for="(item,index) in list" class="f_ul_li" :class="{ishow : index == num }">
            <div class="f_ul_le" @click="lists(item,index,item.id)">
              {{item.cat_name}}
            </div>

            <div class="f_ul_ri" v-for="item in listst">
              <ul>
                <li class="f_ul_ri_li" v-for="(list,index) in item.children">
                  <div class="f_ul_ri_lile">
                    {{list.cat_name}}
                  </div>
                  <div class="f_ul_ri_liri">
                    <!--v-for="(listss,index) in list.children"-->
                    <span @click="ofindsub(list,index)">
										<!--{{listss.cat_name}}-->
										{{list.cat_name}}
									</span>
                  </div>
                </li>
              </ul>
            </div>

          </li>
        </ul>

      </div>

    </div>

  </div>
</template>

<script>
  import api from '@/api/api'

  export default {
    data() {
      return {
        originLevel: 3, // 默认从3级跳下一个页
        num: 0,
        //				item_id: '',
        li_id: '',
        listst: [],
        list: [{
          name: '家电1',
          lists: [{
            listname: '油烟机1',
            brief: '啊打算发多少发士大夫大师傅',
          },
            {
              listname: '油烟机2',
              brief: '啊打算发多少发士大夫大师傅',
            },
            {
              listname: '油烟机3',
              brief: '啊打算发多少发士大夫大师傅',
            },
            {
              listname: '油烟4机',
              brief: '啊打算发多少发士大夫大师傅',
            }
          ]
        },
          {
            name: '家电2',
            lists: [{
              listname: '油烟机1',
              brief: '啊打算发多少发士大夫大师傅',
            },
              {
                listname: '油烟机2',
                brief: '啊打算发多少发士大夫大师傅',
              },
              {
                listname: '油烟机',
                brief: '啊打算发多少发士大夫大师傅',
              },
              {
                listname: '油烟机',
                brief: '啊打算发多少发士大夫大师傅',
              }
            ]
          },
          {
            name: '家电3',
            lists: [{
              listname: '油烟机',
              brief: '啊打算发多少发士大夫大师傅',
            },
              {
                listname: '油烟机',
                brief: '啊打算发多少发士大夫大师傅',
              },
              {
                listname: '油烟机',
                brief: '啊打算发多少发士大夫大师傅',
              },
              {
                listname: '油烟机',
                brief: '啊打算发多少发士大夫大师傅',
              }
            ]
          },
        ]
      }
    },
    mounted() {
      this.list_posh()
      //			this.lists()
    },
    created() {

    },
    methods: {
      //			1级
      list_posh() {
        let that = this
        let lists = {};
        lists.condition = {
          parent_id: 0
          , cate_is_show: 1
        };
        lists.sort = {
          'a.id': 'asc'
        }
        that.$fetch('category_list', lists).then(rs => {
          that.list = rs;
          let lis = {
            'data-set': 'tree',
            'condition': {
              top_id: that.list[0].id
              , cate_is_show: 1
            }
          }
          that.$fetch('category_list', lis).then(rs => {
            that.listst = rs
          })
       })
      },
      //			2级
      lists(item, index, id) {
        let that = this
        that.num = index
        let lists = {
          'data-set': 'tree',
          'condition': {
            'top_id': id,
            'cate_is_show': 1
          }
        };
        that.$fetch('category_list', lists).then(rs => {
          if (rs.length > 0) {
            that.listst = rs
          } else {
            that.$router.push({
              path: '/findsub',
              query: {
                item: id,
                originLevel: 1
              }
            })
          }
        })
      },
      //			2级跳
      ofindsub(item, index) {
        let that = this
        var item = item.id //传参要转换成json字符串（推荐传参用params//数据保密）
        that.$router.push({
          path: '/findsub',
          query: {
            item,
            originLevel: that.originLevel
          }
        })
      },


    },
  }
</script>

<style scoped>
  .box_x {
    position: absolute;
    top: .46rem;
    left: 0;
    right: 0;
    bottom: 0;
    /*margin-bottom: .25rem;*/
  }

  .com {
    width: 100%;
    /*height: 100%;*/
    height: calc(100% - 0.1rem);
    /*overflow-y: auto;*/
  }

  .f_ul {
    height: calc(100% - 0.1rem);

    position: relative;
    /*top: 0;
        left: 0;
        right: 0;
        bottom: 0;*/
  }

  .f_ul_li {
    color: #333;
    background: #f3f2f3;
  }

  .f_ul_le {
    width: .96rem;
    height: .6rem;
    line-height: .6rem;
    text-align: center;
    border-bottom: .01rem solid #fff;
    position: relative;
    font-size: .14rem;
  }

  .f_ul_ri {
    height: calc(100%);
    position: absolute;
    overflow-y: auto;
    background: #fff;
    top: 0;
    left: 1rem;
    right: 0;
    /*bottom: 0;*/
    padding: 0 0 0 0.1rem;

  }

  .f_ul_ri p {
    height: .34rem;
    line-height: .34rem;
    border-bottom: 0.01rem solid #ddd;
    margin: 0;
  }

  .f_ul_ri_li {
    height: .7rem;
    padding-bottom: 0.1rem;
    border-bottom: 0.01rem solid #ddd;
    color: #333 !important;
  }

  .ishow {
    background: #fff;
    border-left: .02rem solid #18b4ed;
    color: #18b4ed;
  }

  .f_ul_ri_lile {
    padding: .1rem 0 0 0;
    font-size: .18rem;
  }

  .f_ul_ri_liri {
    font-size: .14rem;
    margin: 0.05rem 0 0 0;
    color: #b2b2b2;
    display: flex;
    flex-wrap: wrap;
  }

  .f_ul_ri_liri span {
    font-size: .14rem;
    margin: 0.05rem 0.07rem .1rem;
    color: #707070;
    padding: 0.05rem 0.1rem;
    border-radius: .03rem;
    background: #f5f5f5;
  }</style>
