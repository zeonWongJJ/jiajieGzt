import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  	state: { // 状态
	  token:  localStorage.getItem('token'), // 数据持久化
      title: '',
      user_id:  localStorage.getItem('user_id'),
      lat: sessionStorage.getItem('lat'),
      lng: sessionStorage.getItem('lng'),
      show_money: sessionStorage.getItem('show_money'),
	    unread: 0,
      path: '/home',
      store_info: {},
			unitList: [
				{
					id:1,
					unit_name:'元/次'
				},
				{
					id:2,
					unit_name:'元/小时'
				},
				{
					id:3,
					unit_name:'元/个'
				},
				{
					id:4,
					unit_name:'元/平米'
				},
				{
					id:5,
					unit_name:'元/间'
				}
			],
      lastMessage: localStorage.getItem('lastMessage'),
  	},
 	// actions : api,
	mutations : {
		login : (state, data) => {
      localStorage.token = data;
      // document.cookie = token;
      state.token = data;
		},
		logout : (state) => {
      localStorage.clear()
      sessionStorage.clear()
      state.token = null;
		},
		title : (state, data) => {
		    state.title = data;
		},
		goodsListPage : (state, page ) => {
			state.goodsListPage = page;
		},
		goodsAttrPage : (state , page ) => {
			state.goodsAttrPage = page;
		},
		userPhone : (state , data ) => {
			state.userPhone = data;
		},
		store_status : (state , data ) => {
			state.store_status = data;
		},
		setRoutePath : (state , data ) => {
			state.path = data
		},
		lng : (state , data ) => {
			sessionStorage.setItem('lng',data);
			state.lng = data;
		},
		lat : (state , data ) => {
			sessionStorage.setItem('lat',data);
			state.lat = data;
		},
		user_id : (state , data ) => {
			localStorage.user_id = data;
			state.user_id = data;
		},
			oneH : (state , data ) => {
			sessionStorage.setItem('oneH',data);
			state.oneH = data;
		},
			twoH : (state , data ) => {
			sessionStorage.setItem('twoH',data);
			state.twoH = data;
		},
			threeH : (state , data ) => {
			sessionStorage.setItem('threeH',data);
			state.threeH = data;
		},
			fourH : (state , data ) => {
			sessionStorage.setItem('fourH',data);
			state.fourH = data;
		},
			fiveH : (state , data ) => {
			sessionStorage.setItem('fiveH',data);
			state.fiveH = data;
		},
//		店铺
		store_show :(state , data ) =>{
						sessionStorage.setItem('store_show',data);
			state.store_show = data;
		},
		store_type :(state , data ) => {
			sessionStorage.setItem('store_type',data);
			state.store_type = data;
		},
		user_info :(state,data) =>{
			state.user_info = data;
		},
			store_id :(state,data) =>{
				sessionStorage.setItem('store_id',data);
				state.store_id = data;
		},
		set_show_money:(state,data) =>{
			sessionStorage.setItem('show_money',data);
			state.show_money = data;
		},
		notices:(state,data) =>{
			sessionStorage.setItem('notices',data);
			state.notices = data;
		},
    SET_UNREAD_MESSAGE (state, unread) {
			state.unread = unread
		},
    setStoreInfo (state, data) {
		  state.store_info = data
    },
    setUnit (state, data) {
		  state.unitList = data
    },
    setLastMessage (state, data) {
      localStorage.setItem('lastMessage', data)
		  state.lastMessage = data
    }
	},
  getters: {
    token: state => {
      return state.token
    },
    	user_id : state  => {
			 return  state.user_id
		},
  }
})

export default store
