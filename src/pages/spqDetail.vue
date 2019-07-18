<template>
  <v-page  title="分类券">

    <div class="content">
        <div style='padding:5px 10px'>
          <div class='yhqcontlist'>
            <div class='left'>
              <div class='fenlei'>{{list.ticket_name}}
              </div>
              <div style='font-size:12px;margin-top:8px;'>{{list.describe}}</div>
            </div>
            <div class='right'>
              <div style='font-size:10px;margin-top:-4px;margin-left:4px'>抢购：</div>
              <div class='price'>￥<span  style='font-size:40px;font-weight:600'>{{list.promotion_price}}</span></div>
            </div>
          </div>
          <div class='yxq'>{{list.pend}}</div>
        </div>
        <div class='cont'>
          <div>
            <p>使用说明</p>
           {{list.content}}
          </div>
         
        </div>
        <div class='tjdz' @click='openPage("ljgmyhq",list.ticket_name,list.promotion_price,list.id)'>立即购买</div>
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
      }
    },
    mounted(){
      this.index_info()
    },
    methods:{
      openPage(str,name,price,id){
        this.$router.push({name:str,query: {name:name,price:price,id:id}});
      },
      index_info(){
        this.$ajax('ticketDetail',{
        'userToken':this.$getStorage('token'),
        'ticket_id':this.$route.query.type_id
        }).then(res => {
          if(res.status == 0){
            this.list =res.data 
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
  p{margin:0}
  
 .hiddenel{
    padding:0 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
              
    }
  .ysy .left{color:#cccccc}
  
.yhqcontlist{
  display:flex;
}
.yhqcontlist .left{
  background:#58d0be;
  color:#fff;
  width:75%;
  padding:15px;

}
.yhqcontlist1 .left{
  background:#a3a3a3;
  color:#fff;

}
.yhqcontlist .right{
  background:#fddb2e;
  color:#0e7363;
  width:25%;
  padding:15px;
}
.yhqcontlist1 .right{
  background:#757575;
  color:#3f3f3f;
}
.yhqcontlist .price{
  text-align:center;
  margin-top:5px;
  text-align:left;
  font-size:12px;
  letter-spacing: -1px; 
  text-align:center
}
.van-popup{width:80%;padding:20px;border-radius:5px}
.title{text-align:center;line-height:50px;color:#666666}
.cont{line-height:25px;font-size:14px;color:#666666}
.lihx{
  font-size:12px!important;float:right;border:1px solid #fff;margin-top:5px;padding:2px 6px;border-radius:5px
}
.fenlei{
  font-size:22px;border-bottom:1px solid #a4ded5;padding-bottom:5px
}
.yxq{
  padding:8px 10px;background:#fff;
  font-size:13px;
  background:#f1f1f1
}
.cont{padding:15px}
.cont div{border:1px solid #ef8140;padding:10px;border-radius:5px}
.cont p{color:#ef8140;font-size:18px;font-weight:bold;text-align:center;line-height:40px}
.tjdz{
    width:90%;
    line-height:40px;
    margin:0 auto;
    background:#46bba9;
    color:#fff;
    text-align:center;
    border-radius:8px
  }
</style>
