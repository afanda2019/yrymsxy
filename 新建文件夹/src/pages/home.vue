<template>
  <div class="hello" style='overflow-x:hidden'>
      <div class="header">
        <div class="header_left"><img src="@/assets/sy_01.jpg"></div>
          <div class="header_right" @click='openPage("products_category",1)' ><img src="@/assets/sy_02.jpg"></div>
      </div>
      <!--轮播图-->
      <div style='height:50px'></div>
      <div class="banner">
       <van-swipe :autoplay="3000" indicator-color="#46bba9" >
          <van-swipe-item v-for='(banner,index) in banner_list' :key="index"><img :src="banner.image_uri"></van-swipe-item>
        </van-swipe>
        <div class="sy_ss" @click='openPage("search",1)'>
          <div class='search'>
            <img src="@/assets/ss.png">
            <input type='text' placeholder='请输入搜索内容' readonly>
          </div>
        </div>
      </div>
      <!--nav-->
      <van-row>
        <van-col span="6" v-for='(navlist,navindex) in nav' :key="navindex" v-if='navindex==0'>
          <img class='nav' @click='openPage("products_category",1)' :src="navlist.image_uri">
          <div class='navTest' @click='openPage("products_category",1)'>{{navlist.name}}</div>
        </van-col>
       <van-col span="6" v-for='(navlist,navindex) in nav' :key="navindex" v-if='navindex==1'>
          <img class='nav'  @click='openPage("spqlist",1)' :src="navlist.image_uri">
          <div class='navTest'  @click='openPage("spqlist",1)'>{{navlist.name}}</div>
        </van-col>
        <van-col span="6" v-for='(navlist,navindex) in nav' :key="navindex" v-if='navindex==2'>
          <img class='nav' @click='openPage("jifen_products",1)' :src="navlist.image_uri">
          <div class='navTest' @click='openPage("jifen_products",1)'>{{navlist.name}}</div>
        </van-col>
        <van-col span="6" v-for='(navlist,navindex) in nav' :key="navindex" v-if='navindex==3'>
          <img class='nav' @click='openPage("products_category",1)' :src="navlist.image_uri">
          <div class='navTest' @click='openPage("products_category",1)'>{{navlist.name}}</div>
        </van-col>
      </van-row>
      <!--优惠券-->
      <van-row style='padding:4px'>
        <van-col span="8" style='position:relative' v-for='(ticketlist,key) in ticket' :key="key" v-if='key<3'>
          <img class='navimg' src="@/assets/coun.jpg">
          <div class='yhqcont'  @click='openPage("spqDetail",ticketlist.id)'>
            <div style='font-size:20px;font-weight:900'>{{ticketlist.ticket_En_name}}</div>
            <div style='font-size:16px;font-weight:900'>{{ticketlist.ticket_name}}</div>
            <div style='font-size:12px;color:#7c7c7c;line-height:30px'>{{ticketlist.describe}}</div>
            <div class='counprice'>抢购:￥<span style='font-size:16px;font-weight:600'>{{ticketlist.promotion_price}}</span></div>
          </div>
        </van-col>
      </van-row>
      <van-row gutter="5" style='padding:6px'>
         <van-col span="12"  v-for='(ticketlist,key) in ticket' :key="key" v-if='key>2' >
          <div class='yhqcontlist'  @click='openPage("spqDetail",ticketlist.id)'>
            <div class='left'>
              <div style='font-size:22px;'>{{ticketlist.ticket_name}}</div>
              <div style='font-size:12px;margin-top:5px'>{{ticketlist.describe}}</div>
            </div>
            <div class='right'>
              <div style='font-size:10px;margin-top:-4px;margin-left:4px'>抢购：</div>
              <div class='price'>￥<span  style='font-size:35px;font-weight:600'>{{ticketlist.promotion_price}}</span></div>
            </div>
          </div>
        </van-col>
      </van-row>
      <div style='height:0.5rem'></div>
      <!--限时抢购-->
      <div class='xsqg'>
        <div class='xsqgTitle' style=' justify-content:space-between '>
          <div class='xsqgTitle'>
            <img style='margin-right:4px' src="@/assets/time.png"> 
            <div>限时抢购<span style='background:#fff' class='time' v-html="times2[0]"></span></div>
          </div>
          <div class='xsqgTitle'><div style='color:#a0a0a0' @click='openPage("qianggou_products",1)'>全场特惠中</div><img   style='margin-top:1px;margin-left:4px' src="@/assets/jiantou.png"></div>
        </div>
        <div class='xsqglist' @click='openPage("qianggou_detail",xsqg.goods_id)' v-for='(xsqg,xsqgindex) in timesshop' :key='xsqgindex'>
          <img v-auto-height :src="xsqg.image_uri">
          <div class='xsqglisttext'>
            <div class='title'>{{xsqg.name}}</div>
            <div style='font-size:14px;color:#a2a2a2;line-height:25px'>{{xsqg.describe}}</div>
            <div style='font-size:14px;color:#a2a2a2;'><span style='color:#2d2d2d;'>限时价 <span style='color:red;font-size:18px;'>¥{{xsqg.promotion_price}}</span></span>&nbsp;&nbsp;<span>原价 ¥{{xsqg.sale_price}}</span></div>
            <div class="aui-progress aui-progress aui-progress-xxs" style='position:relative'>
              <div class="aui-progress-bar" :style="{ width: xsqg.baifenbi}"></div>
              <div style='position:absolute;left:6px'>仅剩{{xsqg.naxnum}}件</div>
            </div>
            <div class='msq'>马上抢</div>
          </div>
        </div>
      </div>
      <div style='height:0.4rem;background:#efefef'></div>
      <!--积分商城-->
      <div class='jifenshangc'>
        <img class='jifentitle' src='@/assets/shangctitle.jpg'>
        <div class='shopList'>
          <div class='shopItem' @click='openPage("jifen_detail",pointlist.id)' v-for='(pointlist,pointindex) in point'>
            <img v-auto-height :src='pointlist.image_uri'>
            <div class='title'>{{pointlist.goods_name}}</div>
            <div class='price'><span>{{pointlist.point}}积分</span></div>
          </div>
          
        </div>
        <img style='width:40%' @click='openPage("jifen_products",1)' src='@/assets/chakangengduo.jpg'>
        <div style='height:0.8rem'> </div>
      </div>
      <div style='height:0.4rem;background:#efefef'></div>
      <!--首页商品列表-->
      <div class='shoplistIndex'>
        <div><img src='@/assets/title.jpg'></div>
      </div>
      <div class='shopnav'>
        <div class='shopitem' style='background:#23a390;color:#fff'>商品</div>
        <div class='shopitem' :class="{active:istrue==index}" v-for='(item,index) in goodsList' :key="index" @click='shangpinxuanze(index,item.image_uri)'>{{item.alias_name}}</div>
        <div class='shopitem' style='width:12%;border:none'  @click='openPage("products_category",1)'><img src='@/assets/more.png'></div>
      </div>
      <div class='line'></div>
      <div class='shopcont'>
        <!--
        <div class='shoptitle'>
          <p class='title'>cosmetics</p>
          <p class='name'>{{shopname}}</p>
          <p class='cont'>Smile at customer</p>
        </div>-->
        <div class='shoptitle'>
          <img :src='shopname'>
        </div>
        <div class='shopcontitem' @click='openPage("course_detail",shop.id)' v-for='(shop,index) in goodsitem' :key="index">
          <p>NO.{{index+1}}</p>
          <img :src='shop.image_uri'>
          <span class='shoplisttitle'>{{shop.goods_name}}</span>
          <div class='shopspan'>
            <span style='color:#cf1414'>￥{{shop.sale_price}}</span>
            <span style='background:#f58612;color:#fff;font-size:16px'><van-icon name="cart-o" /></span>
          </div>
        </div>
        
        <div class=' shopcontitem shoptitle' style='background:#fff;height:auto;padding:0 15px'>
          <p style='font-size:18px;text-align:left;margin:5px 0'>To view more</p>
          <p style='font-size:12px;color:#474747;text-align:left;margin:5px 0'>嫣然顾客福利商城</p>
          <p style='font-size:12px;color:#474747;text-align:left;margin:15px 0 0;border:1px solid #1b1b1b;width:70%;text-align:center;line-height:25px;height:25px'>查看更多</p>
        </div>
      </div>
     
      <div style='height:50px'></div>
  </div>
</template>
<script>
export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      banner_list:[],//轮播图
      nav:[],//导航
      ticket:[],//优惠券
      timesshop:[],
      times2:[],
      times1:[],
      width:'0%',
      point:[],
      goodsList:[],
      goodsitem:[],
      shopname:'',
      istrue:0
    }
  },
  mounted(){
    this.$setStorage('token','0E9l6sDGpk62XyfUPhB/5KuO3NJLxuquLfLygxoCsjd47/toUIGARp0J/DCNUNRQg9gZdXxEVaCEDsrWYtrIMA==');
    this.journalism()
  },

  methods:{
    openPage(str,id){
      this.$router.push({name:str,query: {type_id: id}});
    },
    journalism(){
      this.$ajax('index',{
        'userToken':this.$getStorage('token')
      }).then(res => {
        console.log(res)
        if(res.status == 0){
          this.banner_list =res.data.subNavs;
          this.nav = res.data.mainNavs;
          this.ticket = res.data.Ticket;      
          let qiangou = res.data.Spike.Spike_list
          for(var i = 0;i<qiangou.length;i++){
            this.timesshop.push({name:qiangou[i].goods_name,minnum:qiangou[i].all_num,naxnum:qiangou[i].num,image_uri:qiangou[i].image_uri,promotion_price:qiangou[i].promotion_price,sale_price:qiangou[i].sale_price,baifenbi:(qiangou[i].all_num-qiangou[i].num)/qiangou[i].all_num*100+'%',describe:qiangou[i].describe,goods_id:qiangou[i].id});
          }    
          this.times1.push(res.data.Spike.endTime)
          this.point = res.data.Point;
          this.goodsList =  res.data.goodsList;
          this.goodsitem = this.goodsList[0].list;
          this.shopname = this.goodsList[0].image_uri
          this.countDown(1);
        }
      })
    },
    shangpinxuanze(index,name){
      this.goodsitem = this.goodsList[index].list;
      this.istrue = index
      this.shopname = name

    },
    countDown:function(i) {
      let _this = this
      setInterval(function(){
        var nowTime = parseInt(new Date().getTime() / 1000);
        for (var a = 0; a < i; a++) {
            var endtimes = _this.times1[a];
            var leftimes = endtimes - nowTime;
            var d, h, m, s;
            if (leftimes > 0) {
              h = Math.floor(leftimes / 60 / 60);
              m = Math.floor(leftimes / 60 % 60);
              s = Math.floor(leftimes % 60);
              if (h < 10) {
                  h = '0' + h;
              }
              if (m < 10) {
                  m = '0' + m;
              }
              if (s < 10) {
                  s = '0' + s
              }
              var hjdhj = '<span style="background:rgba(0,0,0,0.5);border-radius:4px;color:#fff;padding:1px 4px">' + h + '</span><span>:</span><span style="background:rgba(0,0,0,0.5);border-radius:4px;color:#fff;padding:1px 4px">' + m + '</span><span>:</span><span style="background:rgba(0,0,0,0.5);border-radius:4px;color:#fff;padding:1px 4px">' + s + '</span>';
              _this.times2.splice(a, 1, hjdhj);
            } 
        }
      },1000)
    },
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{text-align:center}
.clearfix:after { content: " "; display:block; clear:both; height:0; overflow:hidden; visibility:hidden;}
.sy_06cont{
  display: flex;
  padding:10px
}
.sy_06_ls_01{padding:10px}
.sy_06_ls_01 img{
  width:100%
}
.nav{
  width:60%;
  margin:10% 20% 0
}
.navimg{
  width:94%;
  margin:10% 3% 0
}
.navTest{font-size:14px}

.sy_06_ls_fd{line:25px;text-align:center;font-size:14px}
.sy_06_ls_fd1{line:25px;text-align:center;background:rgba(60,112,106,0.6);color:#fff;line-height:25px;font-size:14px;width:60%;margin:0 20%;position:absolute;bottom:25px;left:0}
.sy_06_ls_01s{position:relative;padding-right:0}
.sy_06_ls_01s .imgbg{
  position:absolute;
  top:20%;right:12px;
  width:90%
}
html,body{
  background:#f7f7f7
}
*{
  box-sizing:border-box;
}
.header{display: flex;position:fixed;top:0;left:0;z-index:9999;width:100%;height:3rem}
.header_left{width:87%;}
.header img{width:100%;height:100%;display:block}
.header_right{width:13%;}
.banner{width:100%;position: relative;overflow: hidden;}
.banner img{width:100%;display: block;height:17rem}
.sy_ss{width: 100%; overflow: hidden; position:absolute; z-index:99; top:0; left:0;}
.search{
  width:94%; margin:3% auto;
   padding:10px 3% 10px 3%;
  background:rgba(255,255,255,0.7); outline:none; border-radius:8px;
  display: flex;
  
}
.search input{
  background:none;
  border:none;
  width:calc(100% - 20px);
  height:20px;
  line-height:20px;
  font-size:0.6rem;
  padding-left:10px
  
}
.sy_06_ls_01 img{height:16.5rem}
.search img{width:20px;height:20px;}
.navcont{
  padding:20px 10px 10px;
}
.nav{display: flex;justify-content:space-around;padding:5px 0}
.nav img{width:76%;margin:0 12%;}
.nav1 img{width:60%;margin:0 20%;}
.nav p{
  margin:0;
  font-size:14px;
  text-align:center;
  color:#494949
}
#swipeVan{height:40px;width:calc(100% - 80px);line-height:43px}
.swipeVanItem{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  padding-left:15px;
  font-size:14px;
  color :#191919
}
.yhqcont{
  position: absolute;
  left:0;
  top:35px;
  right:0;
  margin:auto
}
.counprice{
  background:#fddb2e;
  width:70%;
  margin:0 15%;
  font-size:12px;
  padding:5px 0;
  color:#0f4549
}
.yhqcontlist{
  display:flex;
  padding:0 2px
}
.yhqcontlist .left{
  background:#58d0be;
  color:#fff;
  width:60%;
  padding:10px 0;

}
.yhqcontlist .right{
  background:#fddb2e;
  color:#0f4549;
  width:40%;
  padding:10px 0;
}
.yhqcontlist .price{
  text-align:center;
  margin-top:5px;
  text-align:left;
  font-size:12px;
  letter-spacing: -1px; 
}
.xsqgTitle{
  display:flex;
  font-size:14px;
  color:#58d0be;
  padding-left:5px;
  padding-right:5px
}
.xsqgTitle img{height:1.2rem;}
.xsqgTitle span{
  background:#ff6862;
  color:#fff;
  font-size:12px;
  padding:1px 4px;
  margin:0 2px;
  border-radius:3px
}
.xsqgright{
  color:#9f9f9f;
}
.xsqglist{
  display:flex;
  padding:0 10px;
  margin-top:10px
}
.xsqglist img{
  width:35%
}
.xsqglisttext{
  padding:10px 0 10px 10px;
  text-align:left;
  width:65%;
  border-bottom:1px solid #f1f1f1
}
.xsqglisttext .title{
  font-size:16px;


}
/*进度条*/
.aui-progress {
	width: 100%;
	height: 1rem;
	border-radius: 0.2rem;
	overflow: hidden;
	background-color: #fff;
  border:1px solid #f7af5a;
}
.aui-progress-bar {
	float: left;
	width: 0;
	height: 100%;
	font-size: 0.6rem;
	line-height: 1rem;
	color: #ffffff;
	text-align: center;
	background-color: #03a9f4;
}
.aui-progress.sm,
.aui-progress-sm {
	height: 0.5rem;
}
.aui-progress.sm,
.aui-progress-sm,
.aui-progress.sm .aui-progress-bar,
.aui-progress-sm .aui-progress-bar {
	border-radius: 1px;
}
.aui-progress.xs,
.aui-progress-xs {
	height: 1rem;
}
.aui-progress.xs,
.aui-progress-xs,
.aui-progress.xs .progress-bar,
.aui-progress-xs .progress-bar {
	border-radius: 1px;
}
.aui-progress.xxs,
.aui-progress-xxs {
	height: 0.15rem;
}
.aui-progress.xxs,
.aui-progress-xxs,
.aui-progress.xxs .progress-bar,
.aui-progress-xxs .progress-bar {
	border-radius: 1px;
}
 .aui-progress-xxs {
    width: 50%;
    height: 1.2rem;
    line-height:1.2rem;
    margin-top: .3rem;
    border-radius: 50px;
    float: left;
    color:#f7af5a;
    font-size:12px;
    text-align:left;
  }
        
.aui-progress-bar {
    background: #fdeedc;
    border-radius: 50px 0 0 50%;
    color:#f7af5a;
}
.msq{
  width:30%;
  height:1.5rem;
  line-height:1.5rem;
  float:right;
  background:#ff6862;
  text-align:center;
  color:#fff;
  border-radius:5px;
  font-size:14px;
  margin-top:1px
}
.jifentitle{
  width:100%;
}
.shopList{
  width:100%;
  display:flex;
  flex-wrap:wrap;
  padding:0.5rem 0.4rem
}
.shopItem{
  width:50%;
  padding:0 0.4rem;
  
}
.shopItem img{
    width:100%

}
.shopItem .title{
  font-size:14px;
  text-align:left;
   text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.shopItem .price{
  color:#d53333;
  text-align:left;
  line-height:30px
}
.shoplistIndex{
  text-align:left
}
.shoplistIndex img{
  padding-left:10px;
  width:90%;
}
.shopnav{
  padding:0 10px;
  display:flex;
}
.shopitem{
  width:22%;
  font-size:14px;
  height:26px;
  line-height:26px;
  border:1px solid #23a390;
  margin:0 4px;
  color:#23a390
}
.shopitem img{width:22px;margin:2px 0}
.shopnav .active{
  background:#f58612;
  border:1px solid #f58612;
  color:#fff;
  
}
.line{border-bottom:1px solid #333;line-height:1px;width:35%;margin:10px 0 0 14px}
.shoptitle{
  text-transform :Uppercase;
  width:48%;
  height: 8rem;
   margin:0 1%;
}
.shoptitle img{width:100%}
.shopcont{display:flex;padding:0 1%;flex-wrap:wrap}
.shopcontitem{
    width:48%;
    background:#f5f4f4;
    margin:0 1% 10px;
    display:block;
    height:16rem;
    font-size:14px
}
.shopcontitem img{width:90%;margin:0 5%;display:block;height:9.5rem}
.shopcontitem:nth-child(odd){
  margin-top:-9rem;
}
.shoptitle .title{
  font-size:12px
}
.shoptitle .name{
  font-size:18px;
  margin:5px 0;
  color:#58d0be;
}
.shoptitle .cont{
  font-size:12px
}
.shopcontitem p{
  color:#0f7465;
  margin:10px 0;
  font-size:14px
}
.shoplisttitle{
  display:block;
  overflow:hidden; 
  white-space: nowrap; 
  text-overflow: ellipsis;
  width:90%;
  margin:0 5%;
  color:#666666;
  line-height:30px;
  
}
.shopspan{
  width:90%;
  margin:0 5%;
  border:1px solid #f58612;
  display:flex;
  height:25px;
  line-height:25px;
  font-size:14px
}
.shopspan span{
  width:50%;
}
.shopspan span i{
  margin-top:4px
}
.jifenshangc{padding-top:10px}
</style>
