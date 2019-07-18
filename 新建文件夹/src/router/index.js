import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/buycar',
      name: 'buycar',
      component: resolve => require(['@/pages/buycar'], resolve)
    },
    {
      path: '/products_category',
      name: 'products_category',
      component: resolve => require(['@/pages/products_category'], resolve)
    },
    {
      path: '/course_detail',
      name: 'course_detail',
      component: resolve => require(['@/pages/course_detail'], resolve)
    },
    {
      path: '/search',
      name: 'search',
      component: resolve => require(['@/pages/search'], resolve)
    },
    {
      path: '/user_center',
      name: 'user_center',
      component: resolve => require(['@/pages/user_center'], resolve)
    },
    {
      path: '/mine_order',
      name: 'mine_order',
      component: resolve => require(['@/pages/mine_order'], resolve)
    },
    {
      path: '/confirm_order',
      name: 'confirm_order',
      component: resolve => require(['@/pages/confirm_order'], resolve)
    },
    {
      path: '/order_info',
      name: 'order_info',
      component: resolve => require(['@/pages/order_info'], resolve)
    },
    {
      path: '/jifen_order',
      name: 'jifen_order',
      component: resolve => require(['@/pages/jifen_order'], resolve)
    },
    {
      path: '/jifen_info',
      name: 'jifen_info',
      component: resolve => require(['@/pages/jifen_info'], resolve)
    },
    {
      path: '/jifen_products',
      name: 'jifen_products',
      component: resolve => require(['@/pages/jifen_products'], resolve)
    },
    {
      path: '/jifen',
      name: 'jifen',
      component: resolve => require(['@/pages/jifen'], resolve)
    }, 
    {
      path: '/mine_collection',
      name: 'mine_collection',
      component: resolve => require(['@/pages/mine_collection'], resolve)
    }, 
    {
      path: '/feedback',
      name: 'feedback',
      component: resolve => require(['@/pages/feedback'], resolve)
    },
    {
      path: '/perfect_data',
      name: 'perfect_data',
      component: resolve => require(['@/pages/perfect_data'], resolve)
    },
    {
      path: '/address_list',
      name: 'address_list',
      component: resolve => require(['@/pages/address_list'], resolve)
    },
    {
      path: '/add_address',
      name: 'add_address',
      component: resolve => require(['@/pages/add_address'], resolve)
    },
    {
      path: '/eid_address',
      name: 'eid_address',
      component: resolve => require(['@/pages/eid_address'], resolve)
    },
    {
      path: '/lingquyouhuiq',
      name: 'lingquyouhuiq',
      component: resolve => require(['@/pages/lingquyouhuiq'], resolve)
    },
    {
      path: '/jifen_detail',
      name: 'jifen_detail',
      component: resolve => require(['@/pages/jifen_detail'], resolve)
    },
    {
      path: '/qianggou_products',
      name: 'qianggou_products',
      component: resolve => require(['@/pages/qianggou_products'], resolve)
    },
    {
      path: '/qianggou_detail',
      name: 'qianggou_detail',
      component: resolve => require(['@/pages/qianggou_detail'], resolve)
    },
    {
      path: '/wdyhq',
      name: 'wdyhq',
      component: resolve => require(['@/pages/wdyhq'], resolve)
    },
    {
      path: '/spq',
      name: 'spq',
      component: resolve => require(['@/pages/spq'], resolve)
    },
    {
      path: '/spqlist',
      name: 'spqlist',
      component: resolve => require(['@/pages/spqlist'], resolve)
    },
    {
      path: '/spqDetail',
      name: 'spqDetail',
      component: resolve => require(['@/pages/spqDetail'], resolve)
    },
    {
      path: '/jinbi',
      name: 'jinbi',
      component: resolve => require(['@/pages/jinbi'], resolve)
    },
    {
      path: '/products',
      name: 'products',
      component: resolve => require(['@/pages/products'], resolve)
    },
    {
      path: '/ljgmyhq',
      name: 'ljgmyhq',
      component: resolve => require(['@/pages/ljgmyhq'], resolve)
    },
    {
      path: '/syyhq',
      name: 'syyhq',
      component: resolve => require(['@/pages/syyhq'], resolve)
    },
    {
      path: '/confirm_order1',
      name: 'confirm_order1',
      component: resolve => require(['@/pages/confirm_order1'], resolve)
    },
    {
      path: '/order_info1',
      name: 'order_info1',
      component: resolve => require(['@/pages/order_info1'], resolve)
    },
    {
      path: '/jinbijilu',
      name: 'jinbijilu',
      component: resolve => require(['@/pages/jinbijilu'], resolve)
    },
    {
      path: '/jinbitixianjilu',
      name: 'jinbitixianjilu',
      component: resolve => require(['@/pages/jinbitixianjilu'], resolve)
    },
    {
      path: '/tixian',
      name: 'tixian',
      component: resolve => require(['@/pages/tixian'], resolve)
    },
  ] 
})
