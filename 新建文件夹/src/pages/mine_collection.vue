<template>
  <v-page title="我的收藏">
    <div class="classes-list">
      <van-list v-model="loading" :finished="finished"  finished-text="没有更多了" @load="onLoad">
        <div class="classes-item" @click='openPage("course_detail",listitem.goods_id)' v-for='(listitem,key) in list' :key="key">
          <van-card
            :price="listitem.goods.sale_price"
            :title="listitem.goods.goods_name"
            :desc="listitem.goods.goods_intro" >
            
            <div slot="thumb">
              <img class="thumb-img" :src="listitem.goods.image_uri">
            </div>
          </van-card>
          <span @click.stop='delcollection(listitem.goods_id)'>取消收藏</span>
        </div>

        
      </van-list>
    </div>
  </v-page>

</template>

<script>
  export default {
    name: 'mine_collection',
     data () {
        return {
          list:[],
          page:1,
          loading: false,
          finished: false,
        }
      },
      methods:{
        openPage(str,id){
          this.$router.push({name:str,query: {type_id: id}});
        },
      shoplist(){
        this.$ajax('collectList',{
        'userToken':this.$getStorage('token'),
        'page':this.page,
        'limit':1,
        }).then(res => {
          console.log(res)
          if(res.status == 0){
            if(res.data.length==0){
                this.finished = true;
                this.loading = false;
                return;
            }else{
              this.page++
              this.list.push.apply(this.list, res.data);
              
            }
          }
        })
      },
      onLoad() {
        // 异步更新数据
        setTimeout(() => {
          this.shoplist();
          
          // for (let i = 0; i < 10; i++) {
          //   this.list.push(this.list.length + 1);
          // }
          // 加载状态结束
          this.loading = false;
        }, 500);
      },
      delcollection(id){
        this.$ajax('deleteCollect',{
        'userToken':this.$getStorage('token'),
        'id':id
        }).then(res => {
          console.log(res)
          if(res.status == 0){
            this.list = [];
            this.page = 1;
            this.loading=false;
            this.finished= false;
          }
        })



      }
    }
  }
</script>

<style scoped>
  .thumb-img {
    border-radius : 3px;
    width:90px;
    height:90px
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
  .classes-item{    position: relative;}
  .classes-item span{position:absolute;right:10px;bottom:15px;font-size:12px;color:red;border:1px solid red;padding:2px 5px;border-radius:5px}
</style>
