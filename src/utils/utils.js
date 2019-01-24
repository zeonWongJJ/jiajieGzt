const utils = {
  is_weixin() {
    const ua = navigator.userAgent.toLowerCase()
    return ua.match(/MicroMessenger/i) == 'micromessenger'
  },
  is_ios() {
    const u = navigator.userAgent;
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  },
  is_android() {
    const u = navigator.userAgent;
    return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端,一定是app打开才有的
  },
  // is_android_app() {
  //   const u = navigator.userAgent;
  //   return u.indexOf('APP_WEBVIEW') > -1; // android APP
  // },
  is_browser() {
    const ua = navigator.userAgent.toLowerCase()
    const getVersion = ua.indexOf('version') > -1
    return (this.is_ios() && getVersion) || (this.is_android() && !getVersion) || ua.indexOf('browser') > -1 || ua.indexOf('qq') > -1
  },
  loginToJPush (userId) {
      const json = {"userId": userId.toString()}
      if (this.is_android() && typeof android != 'undefined' && typeof android['loginSuccess'] != 'undefined') {
          android.loginSuccess(JSON.stringify(json));
      } else if (this.is_ios() && typeof window['webkit'] != 'undefined' && window.webkit.messageHandlers.loginSuccess) {
          window.webkit.messageHandlers.loginSuccess.postMessage(json);
      }
  },
  /**
   * 调用方法：getUrlParam("id");
   * 假如当网页的网址有这样的参数 test.htm?id=896&s=q&p=5，则调用 GetUrlParam("p")，返回 5
   * @return {string}
   */
  getUrlParam(paraName) {
    const url = document.location.toString();
    const arrObj = url.split("?");

    if (arrObj.length > 1) {
      const arrPara = arrObj[1].split("&");
      let arr;

      for (let i = 0; i < arrPara.length; i++) {
        arr = arrPara[i].split("=");

        if (arr != null && arr[0] == paraName) {
          return arr[1];
        }
      }
    }
    return "";
  },
  /**
   * 转换日期格式
   * 2018年09月20日14时26分 => 2018-9-20 14:26
   * @param dataStr
   */
  convertDataFormat(dataStr) {
    const reg = /^([1-9]\d{3})年(0[1-9]|1[0-2])月(0[0-9]|[1-2][0-9]|3[0-1])日([0-5]\d)时([0-5]\d)分$/;
    if (dataStr.match(reg)) {
      return dataStr.replace(reg, "$1-$2-$3 $4:$5");
    }
    return false;
  },
  pay(orderSN, orderSign, SuccessURL = 'orderDetails', errorURL = 'order_error',order_pay_way = '',order_deductible_type='') {
		let baseURL = window.config.baseURL
    if (baseURL.match(/^(.*)\/$/g)) {
        baseURL = baseURL.replace(/\/$/, '')
    }
  	const successUrl = encodeURIComponent(window.config.touchURL + '#/' + SuccessURL + `?order_snx=${orderSN}&payOrder=1`)
  	const errorUrl = encodeURIComponent(window.config.touchURL + '#/' + errorURL);
		let url = `${baseURL}/order.pay?order_sign=${orderSign}&order_sn=${orderSN}&success_url=${successUrl}&errorUrl=${errorUrl}`
		if(order_pay_way) {
			url += `&order_pay_way=${order_pay_way}`
		}
		if(order_deductible_type){
			url += `&order_deductible_type=${order_deductible_type}`
		}
		window.location.replace(encodeURI(url))
	},

}


export default utils
