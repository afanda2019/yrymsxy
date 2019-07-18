<template>
  <v-page  title="我的商品券">

    <div class="content">
      <van-tabs color="#F59C3F" v-model="active" title-active-color="#F59C3F" @click="vantab()">
        <van-tab title="未核销"/>
        <van-tab title="已核销"/>
      </van-tabs>
      <div class="line"></div>
      <van-list v-model="loading" :finished="finished"  finished-text="没有更多了" @load="onLoad" >
      <div style='padding:5px 10px'>
        <div class='yhqcontlist' v-for='(item,key) in list' :key="key" v-if='active==0'>
          <div class='left'>
            <div class='fenlei'>{{item.ticket_name}}
            <span class='lihx' @click='hexiao(item.id)'>立即核销</span>
            </div>
            <div style='font-size:12px;margin-top:8px;'>{{item.content}}</div>
          </div>
          <div class='right'>
            <div style='font-size:10px;margin-top:-4px;margin-left:4px'>抢购：</div>
            <div class='price'>￥<span  style='font-size:40px;font-weight:600'>{{item.promotion_price}}</span></div>
          </div>
        </div>
        
        <div class='yhqcontlist yhqcontlist1' v-else  v-for='(item,key) in list' :key="key" v-if='active==1'>
          <div class='left'>
            <div  class='fenlei'>{{item.ticket_name}}
            <span  class='lihx'>已核销</span>
            </div>
            <div style='font-size:12px;margin-top:8px;'>{{item.content}}</div>
          </div>
          <div class='right'>
            <div style='font-size:10px;margin-top:-4px;margin-left:4px'>抢购：</div>
            <div class='price'>￥<span  style='font-size:40px;font-weight:600'>{{item.promotion_price}}</span></div>
          </div>
        </div>
      </div>
      <van-popup v-model="show"  :overlay="true">
        <div>
          <van-cell-group>
            <van-field
              v-model="sms"
              center
              clearable
              placeholder="输入核销码"
            >
              <van-button slot="button" size="small" type="info" @click='cimhexiao'>提交</van-button>
             
            </van-field>
          </van-cell-group>
              <div class='title'>
                优惠券使用说明
              </div>
              <div class='cont'>1 / 优惠券使用说明优惠券使用说明优惠券使用说明优惠券使用说明优惠券优惠券使用说明优惠券使用说明优惠券使用说明！ 2 / 优1 / 优惠券使用说明优惠券使用说明优惠券使用说明优惠券使用说明优惠券优惠券使用说明优惠券使用说明优惠券使用说明！
2 / 优惠券使用说明优惠券使用说明！
3 / 优惠券使用说明优惠券惠券使用说明优惠券使用说明！</div>
        </div>
      </van-popup>
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
        show:false,
        active:0,
        page:1,
        loading: false,
        finished: false,
        sms:'',
        hexiaoid:''
      }
    },
    mounted(){
      
    },
    methods:{
      vantab(){   
        this.page=1;
        this.list=[];
        this.loading=false;
        this.finished= false;
        this.shoplist()
      },
      openPage(str,id,type){
        this.$router.push({name:str,query: {type_id: id,type:type}});
      },
      hexiao(id){
        this.hexiaoid = id;
        this.show = true;
        
      },
      shoplist(){
        this.$ajax('ticketMe',{
        'userToken':this.$getStorage('token'),
        'page':this.page,
        'limit':10,
        'tabIndex':this.active+1
        }).then(res => {
          console.log(res)
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
      cimhexiao(){
        this.$ajax('ticketCancel',{
        'userToken':this.$getStorage('token'),
        'orderid':this.hexiaoid,
        'code':this.sms,
        }).then(res => {
          console.log(res)
          if(res.status == 0){
            this.show = false;
            this.$dialog.alert({
              title: '温馨提示',
              message: '核销成功'
            }).then(() => {
              this.$router.go(-1);
            });
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
.yhqcontlist1 .lihx{
  font-size:12px!important;float:right;border:1px solid #fff;margin-top:5px;padding:2px 6px;border-radius:5px
}
.yhqcontlist1 .fenlei{
  border-bottom:1px solid #d2d2d2;
}
.fenlei{
  font-size:22px;border-bottom:1px solid #a4ded5;padding-bottom:5px
}
</style>
