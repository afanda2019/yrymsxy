// 接口地址
import md5 from './md5'

export const API_URL = 'http://yanran.ccpingtai.cn/api/v1/'
export const DOMAIN_URL = 'yanranyimei.com/api/'

// 请求头
export const CONTENT_TYPE = 'application/x-www-form-urlencoded;charset=UTF-8'

export const AUTH_URL = window.location.href

export const AUTH_TYPE = 'snsapi_userinfo'

// 请求签名
export const aesKey ='afd3103'
// 成功状态码
export const SUCCESS_CODE = 1000
export const APP_ID = 'wx86b3eb28d7345e28'
export const WX_AUTH_URL = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APP_ID}&redirect_uri=${encodeURIComponent(AUTH_URL)}
&response_type=code&scope=${AUTH_TYPE}&state=STATE#wechat_redirect`

