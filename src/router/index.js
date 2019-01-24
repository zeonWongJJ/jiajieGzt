import Vue from 'vue'
import utils from '../utils/utils'
import Router from 'vue-router'
import store from '../vuex/store'
import axios from '../http'

Vue.use(Router)
const routes = [
	//	路由加在这里

	//登陆重定向，
	{
		path: '/',
		name: 'main',
    component: ()=>import(/* webpackChunkName: "group-foo" */ '@/page/main'),
		redirect: {
			name: 'home'
		},

		children: [
		  {
				path: '/index',
				name: 'index',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/index'),
				children: [
					//  主体路由
					//pagse 首页
					{
						path: '/home',
						name: 'home',
            component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/my/my_memder')
					},
					//赚钱
					{
						path: '/makemoney',
						name: 'makemoney',
            component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/makemoneys/makemoney')
					},
					//消息
					{
						path: '/mymess',
						name: 'mymess',
            component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/information/mymess')
					},
					//订单
					{
						path: '/ten_about',
						name: 'ten_about',
            component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/order/ten_about')
					},
					//Mem会员中心
					{
						path: '/member',
						name: 'member',
            component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/my/my_memder')
					},
				]
			},
			//**********登录*************
			{
				path: '/login',
				name: 'login',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/login/loginByMobile')
			},
			// {
			// 	path: '/loginByMobile',
			// 	name: 'loginByMobile',
       //  component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/login/loginByMobile')
			// },

			//***********home***************
			//快速预约
			{
				path: '/fastReservation',
				name: 'fastReservation',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/home/fastReservation')
			},
			{
				path: '/releaseService',
				name: 'releaseService',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/service/releaseService')
			},
			{
				path: '/releaseDemand',
				name: 'releaseDemand',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/demand/releaseDemand')
			},
			//    //需求详情
      {
        path: '/detailDem',
        name: 'detailDem',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/makemoneys/detailDem')
      },
			//服务列表
			{
				path: '/service_list',
				name: 'service_list',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/home/service_list')
			},
			{ //服务详情
				path: '/service_details',
				name: 'service_details',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/home/service_details')
			},
			{ //评价
				path: '/sub_evaluate',
				name: 'sub_evaluate',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/home/sub_evaluate')
			},

			//选择服务型
			{
				path: '/bespeak_order',
				name: 'bespeak_order',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/reservation/bespeak_order')
			},
//			提交订单次
			{
				path: '/reservation_second',
				name: 'reservation_second',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/reservation/reservation_second')
			},
			//周
				{
				path: '/reservation_week',
				name: 'reservation_week',
          component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/reservation/reservation_week')
			},
			//进店看那
			{
				path: '/onshop',
				name: 'onshop',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/home/shop')
			},
			{
				path: 'storeOrders',
				name: 'storeOrders',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/store/storeOrders')
			},
			   //首頁搜一搜
//    {
//      path: '/message',
//      name: 'message',
//      component: resolve =>require(['@/pages/home/message'],resolve)
//	      meta: {
//	        auth: true // 如果此路由需要微信授权请设置为true,默认为false
//	      }
//    },
			//********************我的会员中心
			{
				path: '/about',
				name: 'about',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/my/about')
			},
			//我的发布
			{
				path: '/myfb',
				name: 'myfb',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/my/myfb')
			},
			//我的发布 详情 （区分订单的详情数据）
			{
				path: '/myfb_details',
				name: 'myfb_details',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/my/myfb_details')
			},

			{
				path: '/pers',
				name: 'pers',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/my/pers')
			},
			{ //邀请好友
				path: '/inviting',
				name: 'inviting',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/my/inviting')
			},
			{
				path: '/service',
				name: 'service',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/my/service')
			},
			{
				path: '/myeval',
				name: 'myeval',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/my/myeval')
			},
			//    //editadd编辑地址
      {
        path: '/editadd',
        name: 'editadd',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/my/editadd')
      },
			//			//设置
			{
				path: '/receadd',
				name: 'receadd',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/my/receadd')
			},
			  //订单
      {
        path: 'orders',
        name: 'orders',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/my/orders')
      },
      //    //订单详情
      {
        path: 'orderDetails',
        name: 'orderDetails',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/my/orderDetails')
      },
      //评价
      {
        path: 'menvaluate',
        name: 'menvaluate',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/my/evaluate')
      },
          //设置
      {
        path: '/setup',
        name: 'setup',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/setting/setup')
      },
          {//修改登录密码
        path: '/setlogin',
        name: 'setlogin',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/setting/setlogin')
      },
      {//修改支付密码
        path: '/setpay',
        name: 'setpay',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/setting/setpay')
      },
         //我的余额
      {
        path: '/balance',
        name: 'balance',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/my/balance')
      },
        //余额明细
      {
        path: '/balance_more',
        name: 'balance_more',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/my/balance_more')
      },
      //余额充值
      {
        path: '/recharge',
        name: 'recharge',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/my/recharge')
      },
      //    //我的积分
      {
        path: '/credit',
        name: 'credit',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/my/credit')
      },
      //    //积分明细
      {
        path: '/credit_more',
        name: 'credit_more',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/my/credit_more')
      },
          //提现
      {
        path: 'balance_cash',
        name: 'balance_cash',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/cash/balance_cash')
      },
      {
        path: '/myColl',
        name: 'myColl',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/my/myColl')
      },
       //店铺
      {
        path: 'storeMain',
        name: 'storeMain',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/store/storeMain')
      },
      {
        path: 'upStore',
        name: 'upStore',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/store/upStore')
      },
      {
        path: 'myStore',
        name: 'myStore',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/store/myStore')
      },
      {
        path: 'storeDeal',
        name: 'storeDeal',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/store/storeDeal')
      },
      {
        path: 'serverList',
        name: 'serverList',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/store/serverList')
      },
      {
        path: 'commentAdmin',
        name: 'commentAdmin',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/store/commentAdmin')
      },
      {
        path: 'storeApply',
        name: 'storeApply',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/store/storeApply')
      },
      {
        path: 'store_orders',
        name: 'store_orders',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/store/store_orders')
      },
      {
        path: 'storeProfit',
        name: 'storeProfit',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/store/storeProfit')
      },
      {
        path: 'orderDetails_x',
        name: 'orderDetails_x',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/store/orderDetails_x')
      },
      {
        path: 'store_orders_x',
        name: 'store_orders_x',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/store/store_orders_x')
      },
      {
        path: 'storeSet',
        name: 'storeSet',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/store/storeSet')
      },
      {
        path: 'storeStaff',
        name: 'storeStaff',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/store/storeStaff')
      },
      {
        path: 'staff',
        name: 'staff',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/store/staff')
      },

            {
        path: '/findsub',
        name: 'findsub',
              component: ()=>import(/* webpackChunkName: "group-foo" */ '@/page/findServices/findsub')
      },

      //服务详情
      {
        path: '/details',
        name: 'details',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/page/pages/details')
      },
      //*********************消息

      {
        path: '/notice',
        name: 'notice',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/information/notice')
      },
      {
        path: '/order_error',
        name: 'order_error',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/order/order_error')
      },
      {
        path: '/setCash',
        name :'setCash',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/cash/setCash')
      },
      {
        path: '/binding',
        name :'binding',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/cash/binding')
      },
      {
        path: '/binding_next',
        name :'binding_next',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/cash/binding_next')
      },
      {
        path: '/share',
        name :'share',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/my/share')
      },
      {
        path: '/achievements',
        name :'achievements',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/my/Achievements/achievements')
      },
      {
        path: '/approval',
        name :'approval',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/my/Achievements/approval')
      },

      {
        path: '/approval_details',
        name :'approval_details',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/my/Achievements/approval_details')
      },

      {
        path: '/leave',
        name :'leave',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/my/Achievements/leave')
      },
      {
          path: '/apply_leave',
          name :'apply_leave',
           component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/my/Achievements/ApplyLeave')
    },
      {
        path: '/attendance',
        name :'attendance',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/my/Achievements/attendance')
      },
      {
        path: '/qwa',
        name :'qwa',
        component: ()=>import(/* webpackChunkName: "group-foo" */ '@/pages/my/Achievements/aaa')
      },
		]
	}
]

// 页面刷新，重新给 token 赋值
if(window.localStorage.getItem('token')) {
	store.commit('login', window.localStorage.getItem('token'));
}

var router = new Router({
	routes,
	//  mode: 'history',
	//  打包后打开页面刷新当前页面会404 HTML5 History 模式
	//  	 routes: [shop
	//  	 { path: '*', component: NotFoundComponent }
	//  	 ]
});

function getToken() {
	return localStorage.getItem('token');
	// check_token().then(() => {
	//   return true
	// }).catch(() => {
	//   return false
	// })
}

function check_token() {
	const _fetch = axios({
		url: '/user.check.token',
		method: 'post',
		data: {}
	});
	return new Promise((resolve, reject) => {
		_fetch.then(rs => {
			if(rs.data.error == 0) {
				return resolve()
			} else {
				return reject()
			}
		}).catch(() => {
			return reject()
		})
	})
}

const homePage = ['/home', '/makemoney', '/mymess', '/member', '/ten_about'] // 最顶层的页面
const tokenPage = ['/member','/setup', '/mymess']
router.beforeEach((to, from, next) => {
  store.commit('setRoutePath', to.path)
	if(utils.is_android() && 'undefined' !== typeof android) {
		const indexOf = homePage.indexOf(to.path)
		let json = {
			isArrowFinish: indexOf > -1
		};
		android.androidFinish(JSON.stringify(json))
	}
	if (getToken()) {
        axios({
            url: 'message.unread',
            data: {},
            method: 'POST'
        }).then(rs => {
            store.commit('SET_UNREAD_MESSAGE', parseInt(rs.data.data.unread))
		})
	}
	if(!getToken() && (tokenPage.indexOf(to.path) > -1)) { // 判断是否有token并需要登录
		next({path: '/login'})
	} else {
    next()
  }
})
export default router;
