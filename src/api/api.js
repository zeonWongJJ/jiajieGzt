export default {
  jsonData: function (data) {
    return data;
  },
  ////////////////////////////////////////////////////////////////////////////////
  convertParam: function (data) {
    return data;
  },
  ////////////////////////////////////////////////////////////////////////////////
//	上传接口 ---------统一
  uploadFileUrl: window.config.baseURL || 'http://jiajie-server.7dugo.com', //拼接
  uploadBase: 'upload.base64', //上传图片

//验证码模块  ------ 获取验证码
  user_code_send: '/user.code.send', //获取验证码
  user_code_check: '/user.code.check',//验证验证码

//	修改用户登录密码
  user_info_update_pwd: '/user.info.update.pwd-', //修改用户登录密码（1，通过旧密码；2，通过验证码）
  user_info_update_payment: '/user.info.update.payment-',//修改用户支付密码
  userpayment_code_check: '/userpayment.code.check',//查询修改支付密码权限
  userpayment_init: '/userpayment.init',//初始设置支付密码

//	登录
  login_user: '/user.login-user', //登录
  user_register: '/user.register', //用户注册接口
  user_logout: '/user.logout',//注销
  can_i_use: '/user.canuse', // 判断是否可以使用某个权限

//评价模块
  comment_list: '/comment.list', //评论列表
  service_comment_list: 'service.comment.list-',
  comment_type_list: '/comment_type_list', //评论分类接口
  comment_detail: '/comment_detail', //获取评论详情
  comment_update_auditing: '/comment_update_auditing', //编辑评论审核状态
  add_comment: '/add_comment', //新增评论
  delete_comment: '/delete_comment', //删除单条评论
  add_comment_type: '/add_comment_type', //新增评论分类
  delete_comment_type: '/delete_comment_type', //删除评论分类
  edit_comment_type: '/edit_comment_type', //编辑评论分类名称
  comment_can_I_do: '/comment.check.canIdo-', // 检查当前评论是否可以操作

  comment_add: '/comment.add',//发布列表
  user_comment_list: '/user.comment.list',//评论列表


//分类发布
  category_list: '/category.list', //需求发布接口
  category_get_payway: '/category.get_payway-', //需求发布接口


//服务管理模块
  service_add: '/service.add', //服务发布。
  service_update: '/service.update-', //服务修改
  service_shelf: '/service.shelf-', //服务上架
  service_delete: '/service.delete-', //服务删除
  service_list: '/service.list', //获取店铺下的服务列表
  service_get: 'service.get-',//服务详情
  demand_receipt: 'demand.receipt-',//服务商接单接口
  user_buy_service: '/user.buy.service-',//用户购买服务
//需求发布接口
  demand_add: '/demand.add', //需求发布接口
  demand_list: '/demand.list', //需求列表
  demand_delete: '/demand.delete-', //删除指定需求
  demand_get: '/demand.get-', //获取指定需求
  demand_examine: '/demand.examine-', //审核指定需求

//我的订单

  order_list: '/order.list', //我的订单
  order_change_status_receipt: 'order.change.status-receipt-',//
  order_change_status_begin: 'order.change.status-begin-',//
  order_change_status_completed: 'order.change.status-completed-',//订单完成

//统一支付订单
  order_pay: '/order.pay', //统一支付订单
  order_sign_get: '/order.sign.get-', //获取订单签名


//消息管理
  message_list: '/message.list', //消息列表获取
  message_get: '/message.get', //获取指定消息

//用户模块--------------一级------------------------
  user_info_get: '/user.info.get',//member获取用户信息
  user_withdraw_account: '/user.withdraw.account',//获取用户支付账号
  user_info_update: 'user.info.update',//修改用户信息
  user_order_statistics: '/user.order.statistics',//
  user_get_share_count: 'user.get.share.count-', // 用户成功推荐人数

//-绑定账号-----二级
  user_bind_alipay: '/user.bind-alipay-bind', //绑定支付宝账号
  user_bind_bank: '/user.bind-bank-bind', //绑定银行卡
  user_bind_wechat: '/user.bind-wechat-bind',//绑定微信
  user_bind_alipay_unbind: '/user.bind-alipay-unbind', //解绑支付宝账号
  user_bind_bank_unbind: '/user.bind-bank-unbind', //解绑银行卡
  user_bind_wechat_unbind: '/user.bind-wechat-unbind',//解绑微信

//-余额模块-----二级
  user_balance_get: '/user.balance.get-', //获取用户余额变动详情
  user_balance_list: '/user.balance.list', //获取用户余额变动列表
  user_withdraw_withdraw_balance: '/user.withdraw-balance', //余额提现
  user_balance_recharge: '/user.balance.recharge-',//余额充值

//-积分模块-----二级
  user_jifen_list: '/user.jifen.list', //用户积分明细
  user_jifen_get: '/user.jifen.get-', //获取用户单条积分详情
  user_withdraw_withdraw_score: '/user.withdraw-score', //积分提现

//-收藏模块-----二级
  user_collect_add: '/user.collect.add', //添加进收藏夹
  user_collect_delete: '/user.collect.delete', //取消收藏
  user_collect_list: '/user.collect.list', //获取用户的收藏列表

//-用户地址模块-----二级
  user_address_add: '/user.address.add', //新增用户地址
  user_address_update: '/user.address.update-', //修改用户地址
  user_address_delete: '/user.address.delete-', //删除用户地址
  user_address_list: '/user.address.list', //获取用户地址列表
  user_address_get: '/user.address.get-', //获取单条用户地址
  user_cancel_order: '/user.cancel.order-', // 用户主动取消订单

//用户模块--------------------emd------------------------


//其他模块--
  jiajie_feedback: '/jiajie.feedback', //意见反馈
  jiajie_report_add: '/jiajie.report.add', //提交举报信息

//流水号查询订单信息
  order_getby_sn: '/order.getby.sn-', //流水号查询订单信息
  ouser_get_order: '/user.get.order', //查询当前登录用户的订单
  order_cancel: '/order.cancel-', //过流水号取消订单
  order_delete: '/order.delete-', //过流水号删除订单

//新
  order_get: '/order.get-', //流水号查询订单信息


//申请店铺
  user_store_status: '/user.store.status',//店铺状态
  user_store_add: '/user.store.add',//
  user_store_info_get: '/user.store.info.get',//当前登录用户的店铺信息
  store_get_servers: '/store.get.servers-',//获取店铺下的所有服务
  user_store_statistics: '/user.store.statistics',//获取店铺的数据统计
  store_today_order: '/store.today.order',//获取店铺今日交易列表
  // store_get_comment: '/store.get.comment',//获取我的店铺下的所有评论
  user_get_demand: '/user.get.demand',
  store_order_list: '/store.order.list',//获取店铺下的订单
  store_order_statistics: '/store.order.statistics',//获取店铺统计信息
  store_nature: '/store.nature',//获取店铺类型1一级，2加盟
  store_income_log: '/store.income.log',//店铺收益列表
  store_receipt_toggle: '/store.receipt.toggle',//店铺自动接单
  store_clerk_list: '/store.clerk.list',//店员管理
  store_staff_info_get: 'store.staff.info.get-',//店员详情
  store_shenhe: '/staff.shenhe-',//审批店员
  staff_set_admin: '/staff.set.admin-',//设置管理员
  store_auditing: '/store.auditing-',//店员（店铺）启用/暂用
  store_staff_remove: '/store.staff.remove-',//移除指定店员
  store_update: '/store.update-',//修改店铺资料
  staff_service_record: '/staff.service.record-',//员工服务列表
  comment_get: '/comment.get-',//查看评论
  get_income_log: '/get.income.log-',//收益明细
  store_delete_order: '/store.delete.order-', // 店铺方删除订单

//首页
  slide_list: '/slide.list',//轮播图


//新      申请店铺
  appointed_order: '/appointed.order-',//指派订单到指定店员

  // 系统级别 接口
  pay_sdk_used: 'pay.sdk.used', // 获取支付调用的地址

  // 文件操作 接口///删除图片
  file_remove: 'file.remove',

//*******************2.0*********************
	user_login_msn:'/user.login-msn',
	user_login_wechat:'/user.login-wechat',
	user_login_alipay: '/user.login-alipay',
	fast_subscribe: '/fast.subscribe',
	order_charge_calc:'/order.charge.calc',//周期时间计费
	service_cyc_orders:'/service.cyc.orders-',//周期服务
	service_util_list:'/service.util.list',//计费单位
	user_collect:'/user.collect-',//收藏\取消服务     collect_type:SERVICE/STORE
	store_staff_add:'/store.staff.add',//加入店铺
	store_get:'/store.get-',//店铺详情
	store_get_comment: '/store.get.comment-',//获取店铺下的所有评论(新)
	store_get_services:'/store.get.services-',//获取店铺下的所有服务(新)
	user_collect_list_service:'/user.collect.list-service',//服务收藏列表
	user_collect_list_store:'/user.collect.list-store',//店铺收藏列表
	demand_list_lal: '/demand.list.lal',
	staff_get_allocation:'/staff.get.allocation-',
	user_collect_signle:'/user.collect',
	message_unread:'/message.unread',//消息
	user_bind_phone: '/user.bind-phone',
  service_get_ordercycle: '/service.get.ordercycle',
  get_platform_benefit: 'get.platform.benefit',
  order_refuse: 'order.refuse',
  config_get: 'config.get-',
  wechat_get_signpackage: 'wechat.get.signpackage',
// ****--绩效-***
staff_attendance_records:'/staff.attendance.records',//获取考勤记录
  staff_performance_statistics:'/staff.performance.statistics',//清洁师月度绩效统计
  review_leave_request:'/review.leave.request',//处理请假申请
  review_leave_list:'/review.leave.list',//获取待办的审批列表
  staff_leave_type_list:'/staff.leave.type.list',//请假类型列表获取
  apply_for_leave:'/apply.for.leave',//清洁师请假
  review_leave_get:'/review.leave.get',//获取指定的审批信息
}
