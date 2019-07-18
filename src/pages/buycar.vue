<template>
 <!-- <v-page title="购物车" right-icon="delete" @right-click="deleteBuycar" :numCart="num">-->
 <v-page title="购物车">
    <div class="content">
      <div class="buycar-list">
        <div class="buycar-item" v-for='(item,key) in cartInfo' :key='key'>
          <div class="checked-box">
            <van-checkbox  checked-color="#ffbc08" v-model='item.checked' @change='addcourse(key)'/>
          </div>
          <div class="goods-preview">
            <img :src="item.image_uri" v-auto-height alt="">
          </div>
          <div class="goods-info">
            <div class="title">
              {{item.goods_name}}
            </div>
            <div class="price">
              <b>￥{{item.sale_price}}</b>
              <van-stepper class="stepper" v-model="item.goods_nums" min='0' @change='addcart(item.id,item.goods_nums)'/>
            </div>
          </div>
        </div>
      </div>
      <p class='moredata'>已经没有数据了</p>
      <van-submit-bar :price="allprice" button-text="提交订单" @submit="gwc()">
       <!--  <van-checkbox v-model="quanxuan" @change='quanxuans(key)'>全选</van-checkbox>-->

      </van-submit-bar>
    </div>


  </v-page>
</template>

<script>
  export default {
    name: 'buycar',
    data () {
      return {
        value: 0,
        cartInfo:[],
        quanxuan:false,
        allprice:0,
        ids:'',
        num:""
      }
    },
    mounted(){
        this.course_detail();
    },
    methods: {
      // 购物车列表
      course_detail(){

        this.$ajax('buycarList',{
        'userToken':this.$getStorage('token')
        }).then(res => {
          console.log(res)
          if(res.status == 0){
            this.cartInfo = res.data
          }
        })
      },
      // 购物车金额计算
      addcourse(index){
        this.allprice = 0
        for(var i = 0;i<this.cartInfo.length;i++){
          if(this.cartInfo[i].checked){
            this.allprice =Number(this.allprice) + Number((this.cartInfo[i].sale_price*this.cartInfo[i].goods_nums)*100);
            console.log(Number(this.allprice))
            
          }
        }
      },
      gwc(){
        this.$setStorage('price',0);
        this.$setStorage('id','');
        this.ids = ''
        for(var m = 0;m<this.cartInfo.length;m++){
          if(this.cartInfo[m].checked){
            this.ids+=this.cartInfo[m].id+','
          }
        }
        this.ids = this.ids.substring(0, this.ids.length - 1);  
        if(this.ids==''){
          this.$toast('选中您要购买的商品');
          return;
        }else{
          this.$router.push({name:'confirm_order',query: {buycart_ids: this.ids,buyType:1,price:this.allprice,type:1}});
        }
      },
     
      // 购物车++
      addcart(id,num){
        this.$ajax('editCar',{
        'userToken':this.$getStorage('token'),
        'id':id,
        'goods_nums':num
        }).then(res => {
          console.log(res)
          if(res.status == 0){
            this.course_detail();
          }
        })
      },
    }
  }
</script>

<style scoped>
  .van-submit-bar {
    border-top : 1px solid #f7f7f7;
  }
  
  .van-submit-bar__bar {
    padding-left : 15px;
  }

  .van-button--danger {
    background   : linear-gradient(to right, #FEB463, #F48612);
    border-width : 0;
  }

  .buycar-list {
    margin-bottom : 20px;
  }

  .content {
    padding-top : 10px;
    height      : calc(100% - 50px);
    overflow-y  : scroll;
    background  : #f7f7f7;
    box-sizing  : border-box;
  }

  .stepper {
    position : relative;
    top      : -3px;
  }

  .buycar-item {
    background    : #fff;
    display       : flex;
    padding       : 10px 15px;
    border-bottom : 1px solid #f7f7f7;
  }

  .buycar-item:last-child {
    border-bottom : unset;
  }

  .buycar-item .checked-box {
    flex        : 1 0 5%;
    display     : flex;
    align-items : center;
  }

  .buycar-item .goods-preview {
    flex       : 1 0 30%;
    box-sizing : border-box;
    padding    : 5px;
  }

  .buycar-item .goods-preview img {
    width : 100%;
  }

  .buycar-item .goods-info {
    flex         : 1 0 65%;
    padding-left : 10px;
    box-sizing   : border-box;
    padding-top  : 10px;
  }

  .buycar-item .goods-info .title {
    font-size : 15px;
    color     : #333;
    text-align:left
  }

  .buycar-item .goods-info .price {
    color           : #FD8561;
    margin-top      : 13px;
    display         : flex;
    justify-content : space-between;
  }
  .moredata{
    text-align:center;
    color:#a9a9a9;
    margin:5px
  }
</style>
