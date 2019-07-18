<template>
  <v-page  title="分类券">

    <div class="content">
      <van-list v-model="loading" :finished="finished"  finished-text="没有更多了" @load="onLoad" style='width:100%' >
        <div style='padding:5px 10px'>
          <div class='yhqcontlist' v-for='(item,key) in list' @click='openPage("spqDetail",item.id)' :key='key'>
            <div class='left'>
              <div class='fenlei'>{{item.ticket_name}}
              <span class='lihx'>立即购买</span>
              </div>
              <div style='font-size:12px;margin-top:8px;'>{{item.describe}}</div>
            </div>
            <div class='right'>
              <div style='font-size:10px;margin-top:-4px;margin-left:4px'>抢购：</div>
              <div class='price'>￥<span  style='font-size:40px;font-weight:600'>{{item.promotion_price}}</span></div>
            </div>
          </div>
        </div>
      </van-list>
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
        loading: false,
        finished: false,
        page:1,
      }
    },
    mounted(){
    },
    methods:{
      openPage(str,id){
        this.$router.push({name:str,query: {type_id: id}});
      },
      index_info(){
        this.$ajax('ticketList',{
        'userToken':this.$getStorage('token'),
        'page':this.page,
        'limit':1,
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
          this.index_info();
          
          // for (let i = 0; i < 10; i++) {
          //   this.list.push(this.list.length + 1);
          // }
          // 加载状态结束
          this.loading = false;

          
        }, 500);
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
  padding:0 2px;
  margin-bottom:8px
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
</style>
