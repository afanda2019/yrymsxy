<template>
    <v-page title="购买优惠券">
      <div class="content">
        <van-cell-group>
          <van-field
            v-model="username"
            label="类别"
            placeholder="收货人姓名"
            input-align='right'
          />
          <van-field
            v-model="usertel"
            label="电话"
            type="number"
            placeholder="收货人手机号"
            input-align='right'
          />
          <div class='num'>
            <span>数量</span>
            <van-stepper v-model="num" disabled />
          </div>
          
          <van-field
            v-model="price"
            label="金额"
            type="text"
            placeholder="100"
            input-align='right'
            disabled
          />
        </van-cell-group>
        <van-button size="large" @click='coupon_'>立即支付</van-button>
      </div>
    </v-page>
</template>
<script>
  export default {
    name: 'ljgmyhq',
    data(){
      return {
        price:this.$route.query.price,
        username:this.$route.query.name,
        usertel:'',
        num:1
      };
    },
    mounted(){
    },
    methods: {
      openPage(str,id){
        this.$router.push({name:str,query: {type_id: id}});
      },
       // 查询用户默认地址
      coupon_(){
        this.$ajax('ticketAdd',{
        'userToken':this.$getStorage('token'),
        'ticketid':this.$route.query.id,
        'mobile':this.usertel
        }).then(res => {
          if(res.status == 0){
           
          }else{
            this.$dialog.alert({
              title: '温馨提示',
              message: res.message
            }).then(() => {
              this.$router.go(-1);
            });
          }
        })

      },
    }
  }
</script>
<style scoped>
  .content{
    height: 100%;
    background: #f7f7f7;
    padding-top: 10px;
    box-sizing: border-box;
  }
  .content >>> .van-address-edit__buttons .van-button{
    background: linear-gradient(to right,#FDAD5A,#F58713);
    border-radius: 5px;
    border: unset;
  }
  .num{font-size:14px;border-bottom:1px solid #f1f1f1;width:94%;margin:0 3%;display:flex;line-height:26px;height: 26px;padding:8px 2px; justify-content: space-between}
  .van-button--large{
    width: 90%;
    margin-left: 5%;
    border-radius: 5px;
    color: #fff;
    background: #46bba9;
    margin-top: 100px;
  }
</style>
