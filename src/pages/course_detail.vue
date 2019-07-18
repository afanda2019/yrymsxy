<template>
  <v-page :title="title">
    <div class="content">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for=''><img class='lunbot' src="@/assets/banner.jpg"></van-swipe-item>
        <van-swipe-item><img class='lunbot' src="@/assets/banner.jpg"></van-swipe-item>
      </van-swipe>
      <div class="course-info">
        <div class="title">
          {{shop.goods_name}}
        </div>
        <div class="price">
          <span>
            <small>￥</small>
            <b>{{shop.sale_price}}</b>
          </span>
          <span>销售量:{{shop.total_sale_nums}}</span>
        </div>
        
        
      </div>
      <van-cell title="选择规格：" :value="fenleiName" @click='changsku()' is-link />
      <div class='xiangqingtitle'>详情</div>
      <div class='cont' v-html='xiangqing'>
        
      </div>
      <div style='height:50px'></div>
      <van-goods-action style='z-index:99999'  >
        <van-goods-action-mini-btn
          icon="chat-o"
          text="客服"
          @click='call'
        />
        <van-goods-action-mini-btn v-if='!collectflg' @click='changeCollect(0)'
          icon="star-o"
          text="收藏"
        />
        <van-goods-action-mini-btn v-else style='color:red'  @click='changeCollect(1)'
          icon="star-o"
          text="收藏"
        />
        <van-goods-action-mini-btn style='color:red' @click='openPage("buycar")' 
          icon="cart-o"
          text="购物车"
        />
        <van-goods-action-big-btn
          primary
          text="加入购物车"
           @click="addShopCart()"
          style=" background: #ff9c00;border-radius:0"
        />
        <van-goods-action-big-btn
          primary
          text="立即购买"
         
          style=" background: #46bba9;border-radius:0"
          @click='allligm()'
        />
      </van-goods-action>
      <van-popup v-model="show" @close="onClose" position='bottom'>
        <div class='sku_shop'>
          <img :src='shop.image_uri'>
          <div style='width:60%'>
            <p style='color:red;font-size:20px;line-height:40px'>￥{{sale_price}}</p>
            <div style='display:flex'>
              <p style='color:#aeaeae;width:100%'>销量<van-icon style='margin:2px 5px 0px;float:left' name="orders-o" />{{shop.total_sale_nums}}</p>
              <!--<p style='color:#aeaeae;width:100%'>库存<van-icon style='margin:2px 5px 0px;float:left' name="orders-o" />{{skunum}}</p>-->
            </div>
            
          </div>
        </div>
        <div class='sku_category'>
          <div v-for='(sku_cat,key) in sku' :key="key" >
            <van-cell :title="sku_cat.spec_name"/>
            <div style='height:5px'></div>
            <div class='skulist'>
              <p v-for='(sku_cat_list,index) in sku_cat.spec_value' :key="index"  :class='{"addclass":sku_cat_list.checken} ' @click='changskuActive(sku_cat.spec_id,sku_cat_list.spec_value_id,key,index)'>{{sku_cat_list.spec_value_name}}</p>
            </div>
          </div>
          <p class='num'>
            <span>购买数量</span>
            <van-stepper v-model="num" @minus='minus()' @plus='plus()' />
          </p>
          <div style='height:50px'></div>
        </div>
      </van-popup>
    </div>
    
   
</div>


    
  
  </v-page>
</template>

<script>
  export default {
    name: 'course_detail',
    data () {
      return {
        rightIcon:'cart-o',
        title:'商品详情',
        shop:[],
        productcont:[],
        show:false,
        fenleiid:'',
        fenleiName:'选择规格',
        sku:[],
        skulist:[],
        num:1,
        collectflg:true,
        cartnum:'0',
        evaluates_list:[],//评价
        sale_price:0,
        skunum:0,
      }
    },
    mounted(){
      this.index_info()
      
    },
    methods:{
      
      openPage(str,id,type){
        this.$setStorage('price',0);
        this.$setStorage('id','');
        this.$router.push({name:str,query: {buyType:0,type:1,"id":"0","goods_id":this.$route.query.type_id,"goods_sku_id":this.fenleiid,"goods_nums":this.num,goods_name:this.shop.goods_name,sale_price:this.shop.sale_price,image_uri:this.shop.image_uri }});
      },
      index_info(){
        this.$ajax('detail',{
        'userToken':this.$getStorage('token'),
        'goods_id':this.$route.query.type_id
        }).then(res => {
          console.log(res)
          if(res.status == 0){
            this.shop = res.data;
            this.sku = this.shop.goods_spec_format_array;//商品规格
            this.productcont = this.formatImg(this.shop.goods_detail)
            this.collectflg = this.shop.is_collect;//是否收藏
            this.cartnum = this.shop.buycar_count//购物车数量
            this.evaluates_list =  this.shop.evaluates_list//评价
            this.skulist = this.shop.sku;
            this.sale_price = this.shop.sale_price;
            this.skunum = this.shop.goods_stock;
            this.xiangqing = this.formatImg(this.shop.goods_detail)
            console.log(this.collectflg)
            for(var i = 0;i<this.sku.length;i++){
              for(var m = 0;m<this.sku[i].spec_value.length;m++){
                this.sku[i].spec_value[m].checken = false
              }
            }
          }
        })
      },
      //选择规格 ；获取规格id
    changskuActive(catid,id,smallkey,bigkey){
      this.fenleiid ='';
      this.fenleiName = '';
      for(var s = 0;s< this.sku[smallkey].spec_value.length;s++){
        this.sku[smallkey].spec_value[s].checken = false;
      }
      this.sku[smallkey].spec_value[bigkey].checken = true
      for(var p = 0;p<this.sku.length;p++){
        for(var n= 0 ;n<this.sku[p].spec_value.length;n++){
          if(this.sku[p].spec_value[n].checken){
            this.fenleiName +=this.sku[p].spec_value[n].spec_value_name+','
            this.fenleiid +=this.sku[p].spec_id+':'+this.sku[p].spec_value[n].spec_value_id+';'
          }
        }
      }
      this.fenleiName = this.fenleiName.substr(0, this.fenleiName.length - 1);  
      this.fenleiid = this.fenleiid.substr(0, this.fenleiid.length - 1);  
      for(var index = 0;index<this.skulist.length;index++){
        if(this.fenleiid ==this.skulist[index].sku_id ){
          this.sale_price = this.skulist[index].sale_price;
          this.skunum = this.skulist[index].stock;
        }
      }
     
      },
      //立即购买 
    allligm(){
      if(this.fenleiid||this.shop.goods_spec_format_array.length==0){
        this.show = false;
        
        this.openPage('confirm_order')
       
      }else{
        this.show = true
      }
    },
      changsku(){
        this.show = true
      },
      // 收藏取消收藏
      changeCollect(index){
        this.$ajax('collect',{
        'userToken':this.$getStorage('token'),
        'goods_id':this.$route.query.type_id
        }).then(res => {
          console.log(res)
          if (res.status == 0) {
            if(index==0){
              this.collectflg = true;
              this.$toast('收藏成功');
            }else{
              this.collectflg = false;
              this.$toast('取消收藏');
            }
          }
        })
    },
    //加入购物车
    addShopCart(){
      if(this.fenleiid||this.shop.goods_spec_format_array.length==0){

        this.$ajax('buycar',{
        'userToken':this.$getStorage('token'),
        'goods_id':this.$route.query.type_id,
        'goods_sku_id':this.fenleiid,
        'goods_nums':this.num
        }).then(res => {
          console.log(res)
           if (res.status == 0) {
            this.show = false
            this.cartnum++
            this.$toast('加入购物车成功');
          }
        })
      
      }else{
        this.$toast('选择规格');
        this.show = true
      }
      
    },
      formatImg:function(html){
                var newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
            var match = match.replace(/<img/gi,'<img/style="width:100%"');
            return match;
        });
        return newContent;
      },
      call() { //拨打电话
        window.location.href = 'tel:' + this.kefu;
      },
      onClose(){
        this.show = false
      }
    },
  }
</script>

<style scoped>
  .checkbox-wrap{
    padding: 15px 0;
  }
  .cont{padding:10px 15px 50px;}
  .explain-wrap >>> .van-checkbox__icon--checked .van-icon {
    border-color     : #FA6835;
    background-color : #FA6835;
  }
  .van-button--large {
    border-radius : 5px;
    color         : #fff;
    background    : #0E4548;
  }
  .cont{}
  .van-dialog {
    width : 90%;
  }

  .explain-wrap {
    padding : 15px;
    margin  : 10px;
  }
  .explain-wrap .title {
    margin  : 0;
    padding : 5px 0;
    
  }

  .explain-content-wrap {
    background  : #E7F8F2;
    padding     : 15px;
    font-size   : 15px;
    line-height : 24px;
    color       : #333;
  }
.skulist p.addclass{
   color: #c00;
}
  .explain-content {
    text-indent : 20px;
  }

  .explain-content-wrap .date {
    text-align : right;
    color      : #000;
  }

  .content >>> .van-button--danger {
    background   : linear-gradient(to right, #4FFD74, #20953F);
    border-width : 0;
  }

  .course-info {
    background    : #fff;
    padding       : 15px;
    margin-bottom : 10px;
  }

  .course-info .title {
    font-size : 15px;
    color     : #333;
    text-align:left;
  }

  .price {
    display         : flex;
    margin          : 8px 0 0 0;
    justify-content : space-between;
  }

  .price span:first-child {
    color : #F59C3F;
  }

  .price span:last-child {
    font-size : 14px;
    color     : #999;
  }

  .content {
    height:100vh;
    background : #f7f7f7;
  }

  .audio-wrap {
    text-align    : center;
    margin-bottom : 10px;
    box-shadow    : #999 0 0 18px;
  }
  .van-dialog{
    height: 80%;
    overflow: scroll;
    -webkit-overflow-scrolling:touch
  }

.ljgm{ clear:both; margin-top:10px;}
.ljgm{ background:#0f4549; color:#FFF; text-align:center; line-height:40px;width:100%}
.xiangqingtitle{
  padding:10px;
  text-align:center;
  background:#fff;
  border-bottom:2px solid #f1f1f1
}
.cont{padding:0 15px;}
.cont img{width:100%}
.lunbot{width:100%}

.sku_shop{display:flex;padding:10px 10px;font-size:14px}
.sku_shop img{width:80px;height:80px;border-radius:5px;margin-right:15px}
.skulist {
   display:flex;
   flex-wrap:wrap ;
   padding-left:10px;
   font-size:12px;
}
.skulist p{
  padding:4px 10px;
  border:1px solid #f1f1f1;
  margin:5px;
  color:#ababab
}
.sku_foot{
  display:flex;
  color:#fff;
  font-size:16px;
  text-align:center;
  line-height:40px
}
p{margin:0}
.num{ padding:8px 15px;font-size:14px;display:flex;justify-content:space-between;line-height:30px;color:#333}
</style>
