<template>
  <v-page  title="领券中心">
    <div class="content">
      <div class='list'>
        <div class='item' v-for='(list,key) in yhq' :key='key'>
          <div class='left'>
            <p style='font-size:35px'>{{list.limit_price}}</p>
            <p class='hiddenel'>{{list.description}}</p>
          </div>
          <div class='mid'>
            <div  class='hiddenel'>{{list.coupon_name}}</div>
            <div style='font-size:10px'>{{list.register_time}}</div>
            <div style='margin-top:12px'>使用说明</div>
          </div>
          <div class='right'>
            <span @click='ljlq(list.id)'>立即领取</span>
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
        rightIcon:'cart-o',
        title:'商品详情',
        numc:'0',
        yhq:[]
      }
    },
    mounted(){
      this.lqyhq()
    },
    methods:{
      
      openPage(str,id,type){
        this.$router.push({name:str,query: {type_id: id,type:type}});
      },
      lqyhq(){
        this.$ajax('coupon',{
        'userToken':this.$getStorage('token'),
        }).then(res => {
          console.log(res)
          if(res.status == 0){
            this.yhq = res.data;
          }
        })
      },
      ljlq(id){
        this.$ajax('receiveCoupon',{
        'userToken':this.$getStorage('token'),
        'coupon_id':id
        }).then(res => {
          let _this = this
          if(res.status == 0){
            _this.$dialog.alert({
              title: '温馨提示',
              message: '领取成功'
            }).then(() => {
              _this.lqyhq()
            });
            
          }
        })
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
  .mid{width:47%;color:#9d9d9d;font-size:13px;margin-top:14px;text-align:center;line-height:20px}
  .right{width:6%;font-size:15PX;color:#46bba9;text-align:center;margin-top:6px;margin-left:-2px}
  p{margin:0}
  
 .hiddenel{
    padding:0 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
              
    }
  .more{text-align:center;margin-top:10px;font-size:12px}
</style>
