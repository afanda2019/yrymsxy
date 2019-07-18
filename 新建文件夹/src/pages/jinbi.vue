<template>
  <v-page title="我的积分">
    <div class="page-warp">
      <div class='title'>
          <div class='titletxt'>
            <p>金币余额 ( ￥ )</p>
            <p style='font-size:30px'>{{balance}}</p>
          </div>
          <span class='tixian' @click='openPage("tixian",balance)' >提现</span>
      </div>
      <div class='cont'>

        <div class='list'>
          <van-cell @click='openPage("jinbijilu")'  title="佣金记录" icon="orders-o" is-link />
          <van-cell @click='openPage("jinbitixianjilu")'  title="提现记录" icon="cash-back-record" is-link />
          <van-cell title="我的分销会员" icon="friends-o" is-link />
          <van-cell title="邀请二维码" icon="qr" is-link />
        </div>
        <!--<p class='conttitle'>金币明细</p>
        <div class='list'>
          <div class='item'>
            <img src='@/assets/jifen1.png'>
            <div class='itemmid'>
              <p style='line-height:28px'>购买获取s</p>
              <p style='font-size:12px;color:#a0a0a0;line-height:12px'>2019-03-29  09:57:30</p>
            </div>
            <span class='price'>-600</span>
          </div>
          <div class='item'>
            <img src='@/assets/jifen2.png'>
            <div class='itemmid'>
              <p style='line-height:28px'>提现</p>
              <p style='font-size:12px;color:#a0a0a0;line-height:12px'>2019-03-29  09:57:30</p>
            </div>
            <span class='price'>-600</span>
          </div>
          <div class='item'>
            <img src='@/assets/jifen1.png'>
            <div class='itemmid'>
              <p style='line-height:28px'>积分兑换s</p>
              <p style='font-size:12px;color:#a0a0a0;line-height:12px'>2019-03-29  09:57:30</p>
            </div>
            <span class='price'>-600</span>
          </div>
          <div class='item'>
            <img src='@/assets/jifen2.png'>
            <div class='itemmid'>
              <p style='line-height:28px'>积分兑换s</p>
              <p style='font-size:12px;color:#a0a0a0;line-height:12px'>2019-03-29  09:57:30</p>
            </div>
            <span class='price'>-600</span>
          </div>
        </div>
        -->

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
        balance:this.$route.query.name
      }
    },
    mounted(){
      // this.index_info();
    },
    methods:{
    
      openPage(str,id,title){
        this.$router.push({name:str,query: {type_id: id,title:title}});
      },
      onChange(key) {
        this.activeKey = key;
        this.index_list(this.category[this.activeKey].id)
      },
    },

  }
</script>

<style scoped>
.page-warp{
  height:calc(100vh-50px);
  background: #fff;

}
.title{background:url('../assets/jifenbgb.png') no-repeat left top;background-size:100% 100%;width:94%;margin:20px 3% 0;padding:40px 0;color:#fff;font-size:14px;display:flex;justify-content: space-between ;}
.title span{
  padding:4px 20px 4px 30px;font-size:12px;background:#92d7cc;height:20px;line-height:20px;border-radius:8px 0 0 8px
}
.titletxt{padding:0 20px}
p{margin:0}
.cont{
  padding:15px 4% 15px 0;
}
.item{display:flex;padding:10px;border-bottom:1px solid #f1f1f1}
.item img{width:45px;height:45px;}
.itemmid{width:73%;padding:0 10px}
.price{font-size:16px;font-weight:bold;line-height:45px}
</style>
