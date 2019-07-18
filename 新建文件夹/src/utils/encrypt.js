import {
  CryptoJS
} from './aes'
import {
  aesKey
} from './config'
/**
 * md5 加密
 * @param  string str 要加密的数据
 * @return string
 */
function md5(str) {
  return CryptoJS.MD5(str).toString();
}

/**
 * aes 加密
 * @param  string str 要加密的数据
 * @return string
 */
function aesEncrypt(str) {
	var encryptKey = CryptoJS.enc.Utf8.parse(md5(aesKey));
	var iv = CryptoJS.enc.Utf8.parse(md5(aesKey).substr(0, 16));
  var encrypted  = CryptoJS.AES.encrypt(str, encryptKey, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	});

  return encrypted.toString();
}

/**
 * aes 解密
 * @param  string str 要解密的数据
 * @return string
 */
function aesDecrypt(str) {
	var encryptKey = CryptoJS.enc.Utf8.parse(md5(aesKey));
	var iv = CryptoJS.enc.Utf8.parse(md5(aesKey).substr(0, 16));
  var decrypted  = CryptoJS.AES.decrypt(str, encryptKey, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	});
  return CryptoJS.enc.Utf8.stringify(decrypted);
}

/**
 * 格式化参数对象，按键值自然排序
 * @param  object data 参数对象
 * @return string
 */
function formatParam(data) {
  var key = Object.keys(data).sort();
  var arr = [];
  for (var i = 0; i < key.length; i++) {
    arr.push(key[i] + '=' + data[key[i]]);
  }
  return arr.join('&');
}

/**
 * 生成 sign 签名
 */
export function setSign() {
  var data = typeof(arguments[0]) != 'undefined' ? arguments[0] : new Object();
  data.aes_key = md5(aesKey);
  data.timestamp = (new Date()).getTime();
  console.log(data);
  var param = formatParam(data);
  console.log(param);
  return aesEncrypt(param);
}
