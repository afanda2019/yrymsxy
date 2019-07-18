<template>
  <v-page title="我的订单">
    <van-tabs color="#F59C3F" v-model="active" title-active-color="#F59C3F" @click="vantab()">
      <van-tab title="全部订单"/>
      <van-tab title="待付款"/>
      <van-tab title="待发货"/>
      <van-tab title="待收货"/>
      <van-tab title="已完成"/>
    </van-tabs>
    <div class="line"></div>
    <div class="tab-content">
      <div class="classes-list">
        <van-list v-model="loading" :finished="finished"  finished-text="没有更多了" @load="onLoad" >
          <div class="classes-item"  @click='openPage("order_info1",item.id)' v-for='(item,key) in list' :key="key">
            <p class='orderno'><span>{{item.sale_time_txt}}</span><van-icon style='font-size:18px' name="delete" @click.stop='del(item.id)' v-if='item.pay_status==0||item.pay_status==255' /></p>
            <div  v-for='(items,index) in item.goods_list'>
              <van-card
                :num="items.goods_nums"
                :desc="item.points"  
                :title="items.goods_name"
                :thumb="items.image_uri"
              />
             
            </div>
            <div class='listtext'>共{{item.goods_list.length}}件商品 实付款：<span>￥{{item.pay_amount}}</span></div>
            <div class='footer clearfix' slot="num">
              <span class="tag tag-success"  v-if='item.order_status==1&&item.pay_status==0'>去支付</span>

              <span class="tag tag-success" v-if='item.order_status==1&&item.pay_status==1&&item.shipping_status==0'>已付款</span>
              <span class="tag tag-success" v-if='list.order_status==255'>已完成</span>
              <span class="tag tag-success" @click.stop='confirmGoods(item.id)' v-if='item.order_status==1&&item.pay_status==1&&item.shipping_status==1'>确认收货</span>
            </div>
          </div>
        </van-list>
      </div>
    </div>
  </v-page>

</template>

<script>
  import wx from "weixin-js-sdk"
  export default {
    name: 'mine_order',
    data () {
      return {
        list:[],
        page:1,
        loading: false,
        finished: false,
        active:this.$route.query.name,
        
      }
    },
    mounted(){
      
    },
    methods:{
      
      openPage(str,id,type){
        this.$router.push({name:str,query: {type_id: id,type:type}});
      },
      vantab(){ 
        this.page=1;
        this.list=[];
        this.loading=false;
        this.finished= false;
        this.shoplist()
      },
     
      del(id){
        this.$ajax('pointDelOrder',{
        'userToken':this.$getStorage('token'),
        'id':id
        }).then(res => {
          if(res.status == 0){
            this.page=1;
            this.list=[];
            this.loading=false;
            this.finished= false;
            this.shoplist()
          }
        })
      },
      confirmGoods(id){
        this.$ajax('pointConfirmGoods',{
        'userToken':this.$getStorage('token'),
        'id':id
        }).then(res => {
          if(res.status == 0){
            this.page=1;
            this.list=[];
            this.loading=false;
            this.finished= false;
            this.shoplist()
          }
        })
      },
      shoplist(){
        this.$ajax('pointOrderList',{
        'userToken':this.$getStorage('token'),
        'tabIndex':this.active,
        'page':this.page,
        'limit':10,
        }).then(res => {
          if(res.status == 0){
            if(res.data.length==0){
                this.finished = true;
                this.loading = false;
                return;
            }else{
              this.page++
              this.list.push.apply(this.list,res.data);
            }
          }
        })
      },

      onLoad() {
        // 异步更新数据
        setTimeout(() => {
          this.shoplist();
          this.loading = false;
        }, 500);
      },
      
    }
  }
</script>

<style scoped>

  .line {
    background : #f5f5f5;
  }

  .tab-content {
    height     : calc(100% - 44px);
    overflow-y : scroll;
  }

  .thumb-img {
    border-radius : 3px;
    width:90px;
    height:90px;
  }

  .van-card {
    background    : #fff;
    padding       : 15px;
    border-bottom : 1px solid #f5f5f5;
  }

  .van-card__title {
    padding-top : 5px;
    font-size   : 15px;
    color       : #333;
    font-weight : unset;
  }

  .van-card__bottom {
    margin-top : 20px;
    font-size  : 16px;
  }

  .tag {
    border        : 1px solid #F59C3F;
    font-size     : 12px;
    padding       : 3px 10px;
    border-radius : 5px;
    position      : relative;
    top           : -3px;
    color         : #F59C3F;
  }

  .tag-success {
    border-color : #ff6616;
    color        : #ff6616;
    float:right;
    margin-right:5px

  }
  .footer{padding:10px;border-bottom:1px solid #f1f1f1;height:20px}
  .orderno{color:#3c3c3c;font-size:14px;border-bottom:1px solid #f1f1f1;margin:0;padding:8px 15px;display:flex; justify-content: space-between}
  .listtext{line-height:40px;font-size:14px;padding:0 10px;text-align:right;border-bottom:1px solid #f1f1f1}
  .listtext span{
    color:#ff4700;
    font-size:16px
  }
  .van-card__desc{font-size:18px;margin-top:15px;color:red}
</style>
