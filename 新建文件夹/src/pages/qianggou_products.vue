<template>
  <v-page title="商品抢购">
    <div class="page-warp">
      <div class="badge-wrap">
      <van-list v-model="loading" :finished="finished"  finished-text="没有更多了" @load="onLoad" style='width:100%' >
        <div class="badge-content">
          <div class="classes-list">
            <div class="classes-list-item"  @click='openPage("qianggou_detail",pointlist.id)' v-for='(pointlist,key) in list' :key="key">
              <img class="preview" v-auto-height :src="pointlist.image_uri" alt="">
              <div class="classes-info">
                <h3 class="classes-title van-ellipsis">{{pointlist.goods_name}}</h3>
                <div class="classes-price">
                  <small>￥</small>
                  <b>{{pointlist.point}}</b>
                  <small>积分</small>
                </div>
              </div>
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
    name: 'products_category',
     data () {
      return {
        type_id:'',
        category:[],
        activeKey: 0,
        list:[],
        loading: false,
        finished: false,
        title:this.$route.query.title,
        page:1,
      }
    },
    mounted(){
    //  this.index_info()
    },
    methods:{
    
      openPage(str,id,title){
        this.$router.push({name:str,query: {type_id: id,title:title}});
      },
      onChange(key) {
        this.activeKey = key;
        this.index_list(this.category[this.activeKey].id)
      },
     jifenshangc(){
        this.$ajax('spike',{
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
  height:calc(100vh);
  background: #f8f8f8;

}
  .badge-wrap {
    display : flex;
  }

  .badge-wrap .badge-left {
    flex : 1 0 25%;
    height: calc(100vh - 46px);
    background: #fff;
    overflow-y:scroll
  }

  .badge-wrap .badge-content {
    flex       : 1 0 75%;
    height: calc(100vh - 46px);
    overflow-y: scroll;
  }

  .badge-wrap .badge-left .van-badge {
    color      : #333;
    text-align : center;
    background-color: #f8f8f8;
  }

  .badge-wrap .badge-left .van-badge--select {
    border-color : #46bba9;
    color:#46bba9;
    background-color: #fff;
  }
.classes-list{
  display:flex; flex-wrap:wrap;
  padding:5px 5px 0;
}
  .badge-wrap .badge-content .classes-list-item {
    width:40%;
    padding:5px 2%;
    margin:5px 3%;
    background:#fff;
    border-radius:5px;
    box-shadow: 0 0 15px #ecebeb;
    position:relative;
  }

.preview {
    width         :98%;
  }

  .badge-wrap .badge-content .classes-list-item .classes-title {
    padding   : 0;
    margin    : 2px 0 5px;
    font-size : 15px;
    width     : 95%;
    text-align:left
  }

  .badge-wrap .badge-content .classes-list-item .classes-info {
    padding-left : 5px;
  }

  .badge-wrap .badge-content .classes-list-item .classes-desc {
    font-size     : 13px;
    color         : #666;
    background    : #F5F5F5;
    border-radius : 3px;
    padding       : 4px;
    line-height   : 20px;
    margin        : 5px 0;
    width         : 98%;
  }

  .badge-wrap .badge-content .classes-list-item .classes-desc .arrow-icon {
    position : relative;
    top      : 2px;
  }

  .badge-wrap .badge-content .classes-list-item .classes-info .classes-price {
    text-align:left;
    color : red;
  }

  .badge-wrap .badge-content .classes-list-item .classes-info .icon-cart {
    float : right;
    color : #F59C3F;
  }

  .badge-wrap .badge-content .classes-list-item .classes-preview {
    position : relative;
     width         : 80px;
  }

  .badge-wrap .badge-content .classes-list-item .classes-preview .hot {
    position : absolute;
    left     : 0;
    width    : 60%;
    top      : 0;
  }
  .jifenbg{position:absolute;top:15px;left:-7px;width:100px}
  .jifenbg img{width:100px;height:30px}
  .jifenbg p{font-size:12px;position:absolute;top:0;margin:0;width:100px;text-align:center;line-height:25px;color:#fff}
  .showmore{
    line-height:50px;
    text-align:center;
    color:#7d7d7d
  }
  .jifennav{
    display:flex;
    width:100%;
    height:40px;
    line-height:40px;
    background:#fff
  }
  .jifennav div{width:50%;text-align:center;}
  .jifennav div span{padding-left:1.2rem;background:url('../assets/jifenicon1.png') no-repeat left top;background-size:1rem;}
  .jifennav div .span1{padding-left:1.2rem;background:url('../assets/jifenicon2.png') no-repeat left top;background-size:1rem;}
  
</style>
