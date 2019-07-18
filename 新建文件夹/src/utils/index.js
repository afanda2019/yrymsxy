import {API_URL, WX_AUTH_URL, CONTENT_TYPE,SUCCESS_CODE} from './config'
// import {encryption} from './data-encryption'
import {
  setSign
} from './encrypt'
import wx from 'weixin-js-sdk'
import axios from 'axios'
import qs from 'qs'

let instance = axios
  .create({baseURL: API_URL, timeout: 10000})
instance
  .defaults
  .headers
  .post['Content-Type'] = CONTENT_TYPE

/**
 * AJAX
 * @param uri
 * @param params
 * @param header
 * @returns {Promise<any>}
 */
export async function ajax (uri, params = {}) {
  let headers = typeof (arguments[2]) === 'undefined' ? { signature: setSign() } : arguments[2];
  console.log('1111' + JSON.stringify(headers))
  return new Promise((resolve, reject) => {
    axios({
      method:'post',
      url: API_URL + uri,
      data: qs.stringify(params),
      headers,
    }).then(function (response) {
      
      resolve(response.data);
    }).catch(function (error) {
      // Toast.fail('网络出错');
      reject(`出错：${error}`);
    })
  });
}
/**
 * 跳转
 * @param url 跳转地址
 * @param params 参数 json格式
 */
export function go(url, params = {}) {
  let queryStr = '?___key=' + Math.random() + '&';
  Object.keys(params).forEach(el => el != '___key' ? queryStr += `${el}=${params[el]}&` : '');
  url = `../${url}/main${queryStr.substr(0, queryStr.length - 1)}`;
  wx.navigateTo({
    url
  });
}
/**
 * 获取url参数
 * @param name
 * @returns {*}
 */
export const getQueryString = name => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}

/**
 * 获取微信code
 *
 * @returns {string}
 */
export const getCode = function (callback) {

  if (getQueryString('code')) {
    var code = getQueryString('code');

    const params = {
      code: code
    }

    ajax('member/getOpenid', params).then((res) => {
      if (res.errno == SUCCESS_CODE) {
        setStorage('token', res.data.token);
        
        setStorage('headerimg', res.data.logo_url);
        setStorage('nickname', res.data.nickname);
        setStorage('is_perfect', res.data.is_perfect);
       
      }
      callback();
    }, (err) => {
      console.log(err)
    })
    
  } else {
    window.location.href = WX_AUTH_URL;
  }
}
// 微信配置
export const wxConfig = function (url) {
  // alert(url.split('#')[0])
  const params = {
    url: url.split('#')[0]
  }
  alert(url.split('#')[0])
  ajax('Wechat/getConfig', params).then((res) => {
    if (res.errno == SUCCESS_CODE) {
      delete res.data.url;
      console.log(res.data)
      //wx.config(res.data);
      // wx.config({
      //   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      //   appId: res.data.appId, // 必填，公众号的唯一标识
      //   timestamp: res.data.timestamp, // 必填，生成签名的时间戳
      //   nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
      //   signature: res.data.signature, // 必填，签名
      //   jsApiList: [ // 必填，需要使用的JS接口列表
      //     'onMenuShareAppMessage',
      //     'onMenuShareTimeline',
      //     'previewImage',
      //     'chooseImage',
      //     'uploadImage',
      //     'chooseWXPay',
      //     'hideMenuItems'
      //   ]
      // });
      // wx.ready(function () {
      //   // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
      //   // wx.hideMenuItems({
      //   //   menuList: [
      //   //     "menuItem:share:appMessage",
      //   //     "menuItem:share:timeline",
      //   //     "menuItem:share:qq",
      //   //     "menuItem:share:QZone",
      //   //     "menuItem:share:weiboApp"
      //   //   ]
      //   // });
      // });

    }
  }, (err) => {
    console.log(err)
  })
}

/**
 * 设置缓存
 *
 * @param key
 * @param val
 */
export const setStorage = (key, val) => {
  if (typeof val == 'object') {
    val = JSON.stringify(val)
  }
  localStorage.setItem(key, val)
}

/**
 * 获取缓存
 *
 * @param key
 * @param isObject 是否是对象
 * @returns {*}
 */
export const getStorage = (key, isObject = false) => {
  if (isObject) {
    return JSON.parse(localStorage.getItem(key))
  }
  return localStorage.getItem(key)
}



// 路由返回判断
export const goBack = function (obj) {
  if (window.history.length <= 1) {
    obj.$router.push({ name: 'home' });
    return false;
  } else {
    obj.$router.go(-1);
  }
}




/**
 * 判断当前浏览器是不是微信浏览器
 *
 * @returns {boolean}
 */
export const isWxBrowser = () => window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'

/**
 * 数字填充 .00
 *
 * @param num 数值
 * @returns {string}
 */

export const keepTwoDecimalFull = num => {
  let result = parseFloat(num)
  if (isNaN(result)) {
    throw new Error('传递参数错误，请检查！')
  }
  result = Math.round(num * 100) / 100
  let s_x = result.toString()
  let pos_decimal = s_x.indexOf('.')
  if (pos_decimal < 0) {
    pos_decimal = s_x.length
    s_x += '.'
  }
  while (s_x.length <= pos_decimal + 2) {
    s_x += '0'
  }
  return s_x
}

