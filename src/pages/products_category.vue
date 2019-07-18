<template>
  <v-page title="商品分类">
    <div class="page-warp">
      <div class="badge-wrap">
        <div class="badge-left">
          <van-badge-group :active-key="activeKey" @change="onChange">
            <van-badge v-for='(categoryitem,index) in category'  :key="index" :title="categoryitem.name" />
          </van-badge-group>
        </div>
        <div class="badge-content">
          <div class="classes-list">
            <div class="classes-list-item" v-for='(item,index) in list'  @click='openPage("course_detail",item.id,"商品详情")'  :key="index">
              <img class="preview" v-auto-height :src="item.image_uri" alt="">
              <div class="classes-info">
                <h3 class="classes-title van-ellipsis">{{item.goods_name}}</h3>
                <div class="classes-price">
                  <small>￥</small>
                  <b>{{item.sale_price}}</b>
                </div>
              </div>
            </div>
            <div class='showmore' v-if='showmore'>
            暂无数据
            </div>
          </div>
        </div>
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
        showmore:false,
        title:this.$route.query.title
      }
    },
    mounted(){
      this.index_info();
    },
    methods:{
    
      openPage(str,id,title){
        this.$router.push({name:str,query: {type_id: id}});
      },
      onChange(key) {
        this.activeKey = key;
        this.list = this.category[this.activeKey].list
      },
      index_info(){
        this.$ajax('category',{
        'userToken':this.$getStorage('token')
        }).then(res => {
          console.log(res)
          if(res.status == 0){
            this.category = res.data;
            this.list = this.category[0].list
          }
        })
      },
      
    },

  }
</script>

<style scoped>
.page-warp{
  height:calc(100vh - 46px);
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
  display:flex; flex-wrap:wrap 
}
  .badge-wrap .badge-content .classes-list-item {
    width:43%;
    padding:5px 2%;
    margin:5px 1.5%;
    background:#fff
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
  .showmore{
    line-height:50px;
    text-align:center;
    color:#7d7d7d
  }
</style>
