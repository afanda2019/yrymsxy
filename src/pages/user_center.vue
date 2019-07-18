<template>
  <div class="hello">
    <div class="ny_tb">
        会员中心
    </div>	
    <!-- 头部 -->
    <!-- 导航按钮 -->
    <div style='height:45px'></div>
    <div style='background:#fff;padding:15px 0'>
      <div class="grzx_01">
        <div class='header' @click='openPage("perfect_data",userinfo.Nickname,userinfo.phone)' >
          <img v-if='userinfo.Headimgurl' :src='userinfo.Headimgurl'>
          <img v-else src='@/assets/header.png'>
          <span>{{userinfo.Nickname}}</span>
        </div>
        <div class='header_nav'>
          <div class='header_nav1'  @click='openPage("jifen",otherinfo.points)'>
            <img src='@/assets/potion.png'>
            <span>{{otherinfo.points}}积分</span>
          </div>
          <div class='header_nav1' @click='openPage("jinbi",otherinfo.balance)'>
            <img src='@/assets/money.png'>
            <span>{{otherinfo.balance}}金币</span>
          </div>
        </div>
      </div>
    </div>
    <div class='wdddtitle'>
      <img src='@/assets/grzx05.png'>
      <span>我的订单</span>
      <span style='float:right;color:#9d9d9d' @click='openPage("mine_order",0)'>查看订单</span>
    </div>
    <van-row style='background:#fff;padding:10px 0'>
      <van-col span="6" style='text-align:center' >
        <img class='wdddicon' src='@/assets/grzx06.png'  @click='openPage("mine_order",1)'>
        <p style='margin:0;font-size:14px;color:#585858'  @click='openPage("mine_order",1)'>待付款</p>
      </van-col>
      <van-col span="6" style='text-align:center'>
        <img class='wdddicon' src='@/assets/grzx07.png'  @click='openPage("mine_order",2)'>
        <p style='margin:0;font-size:14px;color:#585858' @click='openPage("mine_order",2)'>待发货</p>
      </van-col>
      <van-col span="6" style='text-align:center' >
        <img class='wdddicon' src='@/assets/grzx08.png' @click='openPage("mine_order",3)'>
        <p style='margin:0;font-size:14px;color:#585858' @click='openPage("mine_order",3)'>待收货</p>
      </van-col>
      <van-col span="6" style='text-align:center' >
        <img class='wdddicon' src='@/assets/grzx09.png' @click='openPage("mine_order",4)'>
        <p style='margin:0;font-size:14px;color:#585858' @click='openPage("mine_order",4)'>已完成</p>
      </van-col>
    </van-row>
    <div style='margin:10px 0 0 0'>
      <div class='wdddtitle' style='margin:0'  @click='openPage("spq",4)'>
        <img src='@/assets/grzx10.png'>
        <span>我的商品券</span>
        <span style='float:right;color:#9d9d9d'><van-icon name="arrow" /></span>
      </div>
      <div class='wdddtitle' style='margin:0' @click='openPage("mine_collection",4)'>
        <img src='@/assets/grzx11.png'>
        <span>我的收藏</span>
        <span style='float:right;color:#9d9d9d'><van-icon name="arrow" /></span>
      </div>
      <div class='wdddtitle' style='margin:0' @click='openPage("lingquyouhuiq")'>
        <img src='@/assets/grzx12.png'>
        <span>领券中心</span>
        <span style='float:right;color:#9d9d9d'><van-icon name="arrow" /></span>
      </div>
      <div class='wdddtitle' style='margin:0' @click='openPage("wdyhq",4)' >
        <img src='@/assets/grzx12.png'>
        <span>我的优惠券</span>
        <span style='float:right;color:#9d9d9d'><van-icon name="arrow" /></span>
      </div>
      <div class='wdddtitle' style='margin:0' @click='openPage("jifen_order",0)' >
        <img src='@/assets/grzx13.png'>
        <span>积分订单</span>
        <span style='float:right;color:#9d9d9d'><van-icon name="arrow" /></span>
      </div>
      <div class='wdddtitle' style='margin:0'>
        <img src='@/assets/grzx14.png'>
        <span>我的客服</span>
        <span style='float:right;color:#9d9d9d'><van-icon name="arrow" /></span>
      </div>
      <div class='wdddtitle' style='margin:0'  @click='openPage("feedback",4)' >
        <img src='@/assets/grzx15.png'>
        <span>意见反馈</span>
        <span style='float:right;color:#9d9d9d'><van-icon name="arrow" /></span>
      </div>
      <div class='wdddtitle' style='margin:0'  @click='openPage("feedback",4)' >
        <img src='@/assets/grzx15.png'>
        <span>关于平台</span>
        <span style='float:right;color:#9d9d9d'><van-icon name="arrow" /></span>
      </div>
    </div>
   <div style='height:55px;background:#f3f3f3;'></div>
  </div>
</template>

<script>
export default {
  name: 'user_center',
  components: {
    
  },
  data () {
    return {
      userinfo:[],
      otherinfo:[],
      datas: {},
      kefu:''
    }
  },
  mounted(){
      this.getconfig()
  },
  methods: {
    openPage(str,name,phone){
      this.$router.push({name:str,query: {name:name,phone:phone}});
    },
    call() { //拨打电话
      window.location.href = 'tel:' + this.kefu;
    },
    getconfig(){
        this.$ajax('members',{
        'userToken':this.$getStorage('token'),
        }).then(res => {
          console.log(res)
          if(res.status == 0){
            this.userinfo = res.data;
            this.otherinfo = res.data
          }
        })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{background:#f3f3f3;height:calc(100vh - 45px)}
.ny_tb{ background:#46bba9; line-height:45px; position:fixed;top:0;width:100%;z-index:9999; text-align:center; color:#FFF;}
.ny_fh{ width:12px; position:absolute; z-index:99; top:15px; left:15px;}
.grzx_01{background:url('../assets/grzx_03.png') no-repeat left top;background-size:100% 100%;width:94%;padding:20px 0;margin:0 3%;height:7rem}
.grzx_01 .header{display:flex}
.grzx_01 .header img{
  width:70px;
  height:70px;
  border-radius:50%;
  border:6px solid #70cabd;
  margin-left:15px
}
.grzx_01 .header span{
  line-height:82px;
  color:#fff;
  display:block;
  padding:0 10px
}
.header_nav{
  display:flex;
}
.header_nav1{
  width:50%;
  color:#febf24;
  font-size:16px;
  line-height:30px;
  margin-top:15px;
  
}
.header_nav1 img{width:20px;float:left;margin:3px 5px 0 35px}
.wdddtitle{
  margin:8px 0 0;
  background:#fff;
  padding:10px;
  font-size:14px;
  line-height:22px;
  border-bottom:1px solid #f1f1f1

}
.wdddtitle img{width:20px;float:left;margin:0 10px 0 0 }
.wdddicon{width:40px;}
</style>
