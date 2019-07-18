<template>
  <v-page title="确认下单">
   
    <div class="page-content">
      <div class="wdddbg">
          <span><van-icon name="passed" style='font-size:20px;margin:18px 10px 0;float:left;'/>{{orderinfo.type}}</span>
          <img src="@/assets/kuaidi.png" />
        </div>
        <div class='address' @click='openPage("address_list")'>
          <van-icon name="location-o" style='padding:8px 10px 0' />
          <div>
            姓名:{{address.receiver_name}}&nbsp;电话:{{address.receiver_mobile}}<br>
            <span style='font-size:14px;color:#929292'>地址:{{address.receiver_address}}</span>
          </div>
          <!-- <p>点击添加地址</p>-->
        </div>
        <img style='height:2px;display: block;width:100%' src='@/assets/line.png'>
        <div class="order-content">
          <van-card
            :num="list.goods_nums" v-for='(list,key) in orderinfo.goods_list' :key="key"
            :price="list.sale_price"
            :desc="list.sku_name"  
            :title="list.goods_name"
            :thumb="list.image_uri"
          />
        </div>
       
      <div class="line"></div>
      <div class='mid'>
        <p>订单编号：{{orderinfo.order_no}}</p>
        <p>下单时间：{{orderinfo.create_time_frm}}</p>
      </div>
      <van-cell-group>
        <van-field
          v-model="orderinfo.user_message"
          type="text"
          label="买家留言"
          placeholder="选填：对本次交易的说明（建议填写已和卖家协商一..."
        />
      </van-cell-group>
      <van-cell title="优惠卷抵用：" v-if='orderinfo.coupon' :value="orderinfo.coupon.coupon_name" size="large" />
      <van-cell title="邮费：" :value="orderinfo.freight" size="large" />
      <div class='listtext'>共{{orderinfo.goods_list.length}}件商品 实付款：<span>￥{{orderinfo.pay_amount}}</span></div>
    </div>

  </v-page>
</template>

<script>
  // import {wxConfig} from "@/utils/index"
  import wx from "weixin-js-sdk"
  // 微信配置

  export default {
    name: 'confirm_order',
    data () {
      return {
        orderinfo:[],
        address:[],
        
        
      }
    },
    mounted(){
     
        this.order_list();
    },
    methods: {
      openPage(str,id){
        this.$router.push({name:str,query: {type_id: id}});
      },
      config(url){
        
      },
      // 订单列表
      order_list(){
        this.$ajax('payOrder',{
        'userToken':this.$getStorage('token'),
        'id':this.$route.query.type_id
        }).then(res => {
          this.orderinfo = res.data;
          this.address = res.data.address
        })
      },
    }
  }
</script>

<style scoped>

  .page-content {
    background : #f5f5f5;
  }

  .page-content .card-header .logo {
    position : relative;
    top      : 5px;

  }

  .page-content .card-header {
    height        : 50px;
    line-height   : 50px;
    border-bottom : 1px solid #f5f5f5;
    padding       : 0 15px;

  }

  .page-content .classes-price {
    color : #FB561B;
  }

  .page-content .line {
    height : 8px;
  }

  .page-content .order-content {
    border-top:1px solid #f1f1f1;
    padding : 15px;
    background:#fff
  }

  .page-content .left {
    flex : 1 0 25%;
  }

  .page-content .right {
    flex         : 1 0 75%;
    padding-left : 15px;
    padding-top  : 15px;
  }

  .page-content .left img {
    width         : 100%;
    border-radius : 5px;
  }

  .page-content .type {
    color      : #9d9d9d;
    margin-top : 10px;
  }

  .van-button--large {
    width         : 90%;
    margin-left   : 5%;
    border-radius : 5px;
    color         : #fff;
    background    : #f58612;
    margin-top    : 50px;
  }
  .address{padding:10px 15px;line-height:30px;display:flex; background : #fff;}
  .van-card{    background-color: #fff;padding: 0;}
  .van-card__title{font-size:16px;margin-bottom:2px}
  .van-card__price{font-size:16px}
  .van-cell__value{color:#ff4700}
  .listtext{line-height:40px;font-size:14px;padding:0 10px;text-align:right;border-bottom:1px solid #f1f1f1;background:#fff}
  .listtext span{
    color:#ff4700;
    font-size:16px
  }
  .wdddbg{
    background:#46bba9;
    display: flex;justify-content:space-between;
    padding: 30px;
    line-height: 3.5rem;
    color: #fff;
    
    }
  .wdddbg span{padding-left: 1.2rem;background: #46bba9;}
  .wdddbg img{width: 4rem;height: 3.5rem;}
  .mid{padding:10px 15px;background:#fff;}
  .mid p{margin:0;font-size:14px;line-height:30px}
  .van-cell--large .van-cell__title{font-size:14px;}
</style>
