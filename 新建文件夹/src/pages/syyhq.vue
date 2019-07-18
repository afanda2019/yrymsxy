<template>
  <v-page  title="选择优惠券">

    <div class="content">
    <div class="line"></div>
      <div class='list'>
        <div class='item' v-for='(item,key) in list' :key="key">
          <div class='left'>
            <p style='font-size:35px'>{{item.limit_price}}</p>
            <p class='hiddenel'>{{item.description}}</p>
          </div>
          <div class='mid'>
            <div  class='hiddenel'>{{item.coupon_name}}</div>
            <div style='font-size:10px'>{{item.pbegin}}-{{item.pend}}</div>
            <div style='margin-top:12px'>使用说明</div>
          </div>
          <div class='right' >
            <span @click='ljsy(item.limit_price,item.coupon_id)'>立即使用</span>
          </div>
        </div>
        

        <p class='more'>已经没有数据啦</p>
      </div>
    </div>
    
   
</div>
  </v-page>
</template>

<script>
  export default {
    name: 'course_detail',
    data () {
      return {
        list:[],
        yhq:[],
        goods:[]
      }
    },
    mounted(){
      if(this.$route.query.buyType==0){
        this.yhq = [{"goods_id":this.$route.query.goods_id,"num":this.$route.query.goods_nums}];
        this.coupon_list();
      }else{
        this.cart_list()
      }
      
      
    },
    methods:{
      openPage(str,id,type){
        this.$router.push({name:str,query: {type_id: id,type:type}});
      },
      coupon_list(){
        this.$ajax('couponOrder',{
        'userToken':this.$getStorage('token'),
        'goods':this.yhq
        }).then(res => {
          console.log(res)
          if(res.status == 0){
            this.list = res.data.coupon
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
            for(var i = 0;i<res.data.length;i++){
              this.yhq[i]= {"goods_id":res.data[i].goods_id,"num":res.data[i].goods_nums}
              this.goods[i]= {
                'id':res.data[i].id,
                'goods_id':res.data[i].goods_id,
                'goods_sku_id':res.data[i].goods_sku_id,
                'goods_nums':res.data[i].goods_nums
              }
            }
            this.coupon_list();
          }
        })
      },
      ljsy(price,id){
         this.$setStorage('price',price);
         this.$setStorage('id',id);
         this.$router.go(-1);
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
      
    },
  }
</script>

<style scoped>
  .item{
    background:url('../assets/yhqbg.png') no-repeat left top;background-size:100% 100%;
    width:92%;
    margin:10px auto;
    height:6rem;
    border:10px solid #f2f2f2;
    border-radius:6px;
    display:flex;
  
  }
  .left{color:#fff;text-align:center;font-size:12px;width:45%;margin-top:18px}
  .mid{width:46%;color:#9d9d9d;font-size:13px;margin-top:14px;text-align:center;line-height:20px}
  .right{width:5%;font-size:15PX;color:#46bba9;text-align:center;margin-top:6px}
  p{margin:0}
  
 .hiddenel{
    padding:0 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
              
    }
  .ysy .left{color:#cccccc}
    .more{text-align:center;margin-top:10px;font-size:12px}
</style>
