<template>
  <v-page title="提现明细">
    <div class="page-warp">
      <van-list v-model="loading" :finished="finished"  finished-text="没有更多了" @load="onLoad" style='width:100%' >
      
      <div class='cont'>
        <div class='list' v-for='(item,key) in list' :key="key">
          <div class='item' v-if='item.sort==1'>
            <img src='@/assets/jifen1.png'>
            <div class='itemmid'>
              <p style='line-height:28px'>{{item.remark}}</p>
              <p style='font-size:12px;color:#a0a0a0;line-height:12px'>{{item.change_time}}</p>
            </div>
            <span class='price'>{{item.points}}</span>
          </div>
          <div class='item' v-else>
            <img src='@/assets/jifen2.png'>
            <div class='itemmid'>
              <p style='line-height:28px'>{{item.remark}}</p>
              <p style='font-size:12px;color:#a0a0a0;line-height:12px'>{{item.change_time}}</p>
            </div>
            <span class='price'>{{item.points}}</span>
          </div>
          
        </div>
      </div>
      </van-list>

    </div>
  </v-page>
</template>

<script>
  export default {
    name: 'products_category',
     data () {
      return {
        type_id:'',
        category:[],
        activeKey: 0,
        list:[],
        loading: false,
        finished: false,
        page:1,
        showmore:false,
        points:this.$route.query.name
      }
    },
    mounted(){
    },
    methods:{
    
      openPage(str,id,title){
        this.$router.push({name:str,query: {type_id: id,title:title}});
      },
      jifenshangc(){
        this.$ajax('cashRecord',{
        'userToken':this.$getStorage('token'),
        'page':this.page,
        'limit':10,
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
      onLoad() {
        // 异步更新数据
        setTimeout(() => {
          this.jifenshangc();
          
          // for (let i = 0; i < 10; i++) {
          //   this.list.push(this.list.length + 1);
          // }
          // 加载状态结束
          this.loading = false;

          
        }, 500);
      },
    },

  }
</script>

<style scoped>
.page-warp{
  height:calc(100vh-50px);
  background: #fff;

}
.title{background:url('../assets/jifenbgb.png') no-repeat left top;background-size:100% 100%;width:94%;margin:20px 3% 0;padding:40px 0;color:#fff;font-size:14px}
.titletxt{padding:0 20px}
p{margin:0}
.cont{
  padding:15px 3%;
}
.item{display:flex;padding:10px;border-bottom:1px solid #f1f1f1}
.item img{width:45px;height:45px;}
.itemmid{width:73%;padding:0 10px}
.price{font-size:16px;font-weight:bold;line-height:45px}
</style>
