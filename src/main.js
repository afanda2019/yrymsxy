import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
import * as utils from '@/utils'
import vPage from '@/components/Header'
import { SUCCESS_CODE } from './utils/config'
import fastClick from 'fastClick'

Vue.use(Vant)

Vue.config.productionTip = false
fastClick.attach(document.body)
// 没提示
// Object.keys(utils).forEach(key => Vue.prototype['$' + key] = utils[key])
Vue.prototype.$ajax = utils.ajax;
Vue.prototype.$setStorage = utils.setStorage;
Vue.prototype.$getStorage = utils.getStorage;
Vue.prototype.$getCode = utils.getCode;
Vue.prototype.$goBack = utils.goBack;
Vue.prototype.$keepTwoDecimalFull = utils.keepTwoDecimalFull;
Vue.prototype.$isWxBrowser = utils.isWxBrowser;
// Vue.prototype.$token = () => utils.getStorage('token');
// Vue.prototype.$token = () => utils.getStorage('token');
// Vue.prototype.$token ='';
Vue.prototype.SUCCESS_CODE = SUCCESS_CODE;

Vue.prototype.$closeLoading = () => Toast.clear();
Vue.prototype.$ev = new Vue();
Vue.directive('auto-height', {
  inserted: el => el.style.height = el.offsetWidth + 'px',
  update: el => el.style.height = el.offsetWidth + 'px'
})

Vue.component('v-page', vPage)
router.beforeEach((to, from, next) => {
  
  if (localStorage.getItem('token')) {
    next();
  } else {
    // let uri = encodeURIComponent(window.location.href);
    // utils.getCode(function () {
    //   setTimeout(function () {
    //     next();


    //   }, 300)

    // });
    next();
  }
})
/* eslint-disable no-new */

if (!window.location.href.match(/\?#/)) {
  location.replace(window.location.href.split('#')[0] + '?' + window.location.hash);
} else {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    components: {
      App
    },
    template: '<App/>'
  });
}
