<template>
  <v-page title="确认下单">
    
    <div class="page-content">
      <div class='address' @click='openPage("address_list")'>
      <van-icon name="location-o" style='padding:8px 10px 0' />
      <div>
        姓名:{{address.name}}&nbsp;电话:{{address.mobile}}<br>
        <span style='font-size:14px;color:#929292'>地址:{{address.province}}-{{address.city}}-{{address.district}}-{{address.province}}</span>
        
      </div>
    
      <!-- <p>点击添加地址</p>-->
      </div>
      <img style='height:2px;display: block;width:100%' src='@/assets/line.png'>
        <div class="order-content">
          <van-card v-for='(list,key) in shopInfo' :key="key"
            :desc="list.sale_price+'积分 x '+list.goods_nums"
            :title="list.goods_name"
            :thumb="list.image_uri"
          />
        </div>
       
      <div class="line"></div>
      <van-cell-group>
        <van-field
          v-model="user_message"
          type="text"
          label="买家留言"
          placeholder="选填：对本次交易的说明（建议填写已和卖家协商一..."
        />
      </van-cell-group>
      <van-cell v-if='listinfo.type==1&&yhq.length>0||listinfo.buyType==1&&yhq.length>0' title="优惠卷抵用：" @click='xzyhq()' :value="yhqtext" size="large" />
      <van-cell title="邮费" :value="youfeiprice" size="large" />
      <div class='listtext'>共1件商品 实付款：<span></span>{{shopInfo[0].sale_price}}积分+{{youfeiprice}}</span></div>
      <van-button size="large" @click='submit()'>立即下单</van-button>
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
        listinfo:{
          buyType:this.$route.query.buyType,//订单类型 1-购物车订单 0-立即购买订单
          type: this.$route.query.type,  // 1-商城商品 2-抢购商品 (少积分商品)
          },
          goods:[{
            id:this.$route.query.id,
            goods_id:this.$route.query.goods_id,
            goods_sku_id:this.$route.query.goods_sku_id,
            goods_nums:this.$route.query.goods_nums,
          }],
          youfei:[{"goods_id":this.$route.query.goods_id||'',"num":this.$route.query.goods_nums||''}],
          shopInfo:[{
            goods_name:this.$route.query.goods_name,
            sale_price:this.$route.query.point,
            image_uri:this.$route.query.image_uri,
            goods_nums:this.$route.query.goods_nums,
          }],
          address:[],
          user_message:'',
          youfeiprice:'无',
          allprice:0,
          yhq:[],
          yhqtext:'选择使用优惠券',

      }
    },
    mounted(){
        if(this.$route.query.buyType==1){
          this.cart_list();
        }else{
          this.yhq_list();
        }
        this.address_list();
        
        
    },
    methods: {
      openPage(str,id){
        this.$router.push({name:str,query: {goods_id:this.$route.query.goods_id,goods_nums:this.$route.query.goods_nums,buyType:this.$route.query.buyType}});
      },
      //选择优惠券
      xzyhq(){
        if(this.listinfo.buyType==1){
          this.$router.push({name:'syyhq',query: {buycart_ids:this.$route.query.buycart_ids,buyType:this.$route.query.buyType}});
        }else{
          this.openPage("syyhq")
        }
        
        
      },
      // 查询用户默认地址
      address_list(){
        this.$ajax('userDefAddr',{
        'userToken':this.$getStorage('token')
        }).then(res => {
          if(res.status == 0){
            this.address = res.data
          }
        })

      },
      // 查询购物车
      cart_list(){
        this.$ajax('buycarList',{
        'userToken':this.$getStorage('token'),
        'id':this.$route.query.buycart_ids
        }).then(res => {
          console.log(res)
          if(res.status == 0){
            this.shopInfo = res.data
            for(var i = 0;i<res.data.length;i++){
              this.youfei[i]= {"goods_id":res.data[i].goods_id,"num":res.data[i].goods_nums}
              this.goods[i]= {
                'id':res.data[i].id,
                'goods_id':res.data[i].goods_id,
                'goods_sku_id':res.data[i].goods_sku_id,
                'goods_nums':res.data[i].goods_nums
              }
            }
            this.yhq_list();
          }
        })
      },
      // 查询用户可用优惠券和油费
      yhq_list(){
        this.$ajax('couponOrder',{
        'userToken':this.$getStorage('token'),
        'goods':this.youfei
        }).then(res => {
          console.log(res)
          if(res.status == 0){
            this.youfeiprice = '￥'+res.data.freight;
            this.yhq = res.data.coupon;
            if(this.listinfo.buyType==0){
              this.allprice = Number(this.shopInfo[0].sale_price) + Number(res.data.freight)-Number(this.$getStorage('price'));
              this.yhqtext ='-'+this.$getStorage('price')

            }else{
              this.allprice = this.$route.query.price/100-Number(res.data.freight)-Number(this.$getStorage('price'));
              this.yhqtext ='-'+this.$getStorage('price')
            }
          }
        })
      },
      submit() { //提交支付
        
        if(this.address == '') {
          alert('请选择地址')
          return;
        }
        console.log()
        this.$ajax('pointAdd',{
        'userToken':this.$getStorage('token'),
        'user_address_id':this.address.id,
        'goods_id':this.$route.query.goods_id,
        'goods_nums':this.$route.query.goods_nums,
        'user_message':this.user_message,
        'goods_sku_id':this.$route.query.goods_sku_id,

        }).then(res => {
          console.log(res)
          if(res.status == 0){
            this.youfeiprice = '￥'+res.data.freight;
            this.yhq = res.data.coupon;
            if(this.listinfo.buyType==0){
              this.allprice = Number(this.shopInfo[0].sale_price) + Number(res.data.freight)
            }
          }
        })
        let _this = this;

    },
      // 订单列表
    list(){
        
      },
    }
  }
</script>

<style scoped>

  .page-content {
    background:#f5f5f5;
    height:calc(100vh - 45px)
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
  .address{padding:10px 15px;line-height:30px;display:flex;background:#fff}
  .van-card{    background-color: #fff;padding: 0;}
  .van-card__title{font-size:16px;margin-bottom:2px}
  .van-card__price{font-size:16px}
  .van-cell__value{color:#ff4700}
  .listtext{line-height:40px;font-size:14px;padding:0 10px;text-align:right;border-bottom:1px solid #f1f1f1;background:#fff}
  .listtext span{
    color:#ff4700;
    font-size:16px
  }
  .van-card__thumb img{
    height:100%
  }
  .van-card__desc{
    font-size:18px;
    color:red;
    margin-top:10px
  }
</style>
