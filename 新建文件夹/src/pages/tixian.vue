<template>
  <v-page title="提现">
    <div class="page-warp">
      <div class="cont">
			<div>
				<p style="color: #333;font-size: 12px;">提现金额</p>
				<div style="border-bottom: 1px solid #f1f1f1;display: flex;">
					<span style="line-height: 60px;height: 40px;font-size: 12px;">¥&nbsp;</span>
					<input type="number" v-model='price' placeholder="0">
				</div>
			</div>
			<div class="price">
				<div>
					<span style="color:#a0a0a0">可提现金币：</span>
					<span>{{balance}}</span>
				</div>
				<span @click='alltixian()'>全部提现</span>
			</div>
		</div>
    <van-cell-group>
      <van-field
        v-model="bank"
        clearable
        label="银行卡"
        placeholder="请输入银行卡号"
       
      />

      <van-field
        v-model="bankname"
        label="开户行"
        placeholder="请输开户行"
      />
      <van-field
        v-model="username"
        label="姓名"
        placeholder="请输姓名"
      />
      <van-field
        v-model="usertel"
        label="电话"
        placeholder="请输电话"
      />
    </van-cell-group>
    <div class="large" @click='tixian'>确定</div>

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
        balance:this.$route.query.type_id,
        price:0,
        bank:'',
        bankname:'',
        username:'',
        usertel:''
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
      tixian(){
        if(!this.bank){
          this.$toast('输入您的银行卡号');
          return
        }
        if(!this.bankname){
          this.$toast('输入您的开户行姓名');
          return
        }
        if(!this.username){
          this.$toast('输入您的用户名');
          return
        }
        if(!this.usertel){
          this.$toast('输入您的手机号');
          return
        }
        this.$ajax('cash',{
        'userToken':this.$getStorage('token'),
        'money':this.price,
        'card_no':this.bank,
        'bank':this.bankname,
        'name':this.usertel
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
          }else{
            this.$toast(res.message);
          }
        })
      },
      alltixian(){
        this.price= this.balance
      },
     
    },

  }
</script>

<style scoped>
.page-warp{
  height:calc(100vh-50px);
  background: #fff;

}
.cont{width: 94%;margin:10px 3% 0;background: #fff;}
.price{
  display: flex;justify-content:space-between ;
  line-height: 40px;
  color: #e82c00;
  font-size: 14px;
}
.cont input{font-size: 30px;text-align: left;border:none;width:80%}
.large{
    width: 90%;
    margin-left: 5%;
    border-radius: 5px;
    color: #fff;
    background: #46bba9;
    margin-top: 100px;
    line-height:40px;
    text-align:center
  }
</style>
