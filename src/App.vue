<template>
  <div id="app">
    <div>
      <router-view/>
    </div>
    <van-tabbar style='background:#58d0be'>
      <van-tabbar-item to="/">
        <img
          slot="icon"
          slot-scope="props"
          :src="icon.normal0"
        >
        <span style='color:#fff'>首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="mine_order">
        <img
          slot="icon"
          slot-scope="props"
          :src="icon.normal1"
        >
        <span style='color:#fff'>订单</span>
      </van-tabbar-item>
      <van-tabbar-item to="buycar">
       <img
          slot="icon"
          slot-scope="props"
          :src="icon.normal2"
        >
        <span style='color:#fff'>购物车</span>
      </van-tabbar-item>
      <van-tabbar-item to='user_center'>
       <img
          slot="icon"
          slot-scope="props"
          :src="icon.normal3"
        >
        <span style='color:#fff'>我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
  
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      // headerNav,
      active: 0,
      isRouterAlive:true,
      icon: {
        normal0: require('@/assets/footerbar0.png'),
        normal1: require('@/assets/footerbar1.png'),
        normal2: require('@/assets/footerbar2.png'),
        normal3: require('@/assets/footerbar3.png'),

      }
    }
    
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
