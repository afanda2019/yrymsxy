<template>
  <v-page  title="领券中心">

    <div class="content">
    <van-tabs color="#F59C3F" v-model="active" title-active-color="#F59C3F" @click="vantab">
      <van-tab title="待使用"/>
      <van-tab title="已使用"/>
      <van-tab title="已过期"/>
    </van-tabs>
    <div class="line"></div>
      <div class='list'>
        <div class='item' v-for='(item,key) in list' :key="key" v-if='type==1'>
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
            <span @click='openPage("products_category",1)'>立即使用</span>
          </div>
        </div>
        <div class='item ysy' v-for='(item,key) in list' :key="key" v-if='type==2'>
          <div class='left'>
            <p style='font-size:35px'>{{item.limit_price}}</p>
            <p class='hiddenel'>{{item.description}}</p>
          </div>
          <div class='mid'>
            <div  class='hiddenel'>{{item.coupon_name}}</div>
            <div style='font-size:10px'>{{item.pbegin}}-{{item.pend}}</div>
            <div style='margin-top:12px'>使用说明</div>
          </div>
          <div class='right' style='margin-top:20px;color:#737373'>
            <span>已使用</span>
          </div>
        </div>
        <div class='item ysy' v-for='(item,key) in list' :key="key" v-if='type==3'>
          <div class='left'>
            <p style='font-size:35px'>{{item.limit_price}}</p>
            <p class='hiddenel'>{{item.description}}</p>
          </div>
          <div class='mid'>
            <div  class='hiddenel'>{{item.coupon_name}}</div>
            <div style='font-size:10px'>{{item.pbegin}}-{{item.pend}}</div>
            <div style='margin-top:12px'>使用说明</div>
          </div>
          <div class='right' style='margin-top:20px;color:#737373'>
            <span>已过期</span>
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
        type:1
      }
    },
    mounted(){
      this.conp_list();
    },
    methods:{
      vantab(index, title){
        this.list=[];
        if(index==0){
           this.type=1
        }else if(index==1){
          this.type=2
        }else{
          this.type=3
        }
        this.conp_list()
      },
      openPage(str,id,type){
        this.$router.push({name:str,query: {type_id: id,type:type}});
      },
      conp_list(){
        this.$ajax('couponMe',{
        'userToken':this.$getStorage('token'),
        'type':this.type
        }).then(res => {
          console.log(res)
          if(res.status == 0){
            this.list = res.data
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
