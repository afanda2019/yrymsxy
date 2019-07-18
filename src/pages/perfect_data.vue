<template>
  <v-page title="完善资料">
    <div class="data-form" id="data-form">
      <van-cell-group>
        <van-field label="昵称" v-model='userInfo.cnname' disabled input-align='right'   placeholder="请输入昵称"/>
        <van-field label="手机号" type="tel" v-model='userInfo.mobile' input-align='right'   placeholder="请输入您的手机号"/>
        <van-field label="我的收获地址" type="tel" v-model='userInfo.address' input-align='right' @click='openPage("address_list")'  placeholder=""/>
        
      </van-cell-group>
      <van-button size="large" @click='tijiao_info'>确定</van-button>

    </div>
  </v-page>
</template>

<script>
  export default {
    name: 'perfect_data',
    data () {
      return {
        userInfo:{
          cnname:this.$route.query.name||'',
          address:'添加地址',
          mobile:this.$route.query.phone||'',
        },
        showmask:false
      }
    },
    mounted(){
        this.moren();
    },
    methods:{
      openPage(str,id){
        this.$router.push({name:str,query: {type_id: id}});
      },
      moren(id){
        this.$ajax('userDefAddr',{
        'userToken':this.$getStorage('token')
        }).then(res => {
          if(res.status == 0){
            if(res.data){
              this.userInfo.address = res.data.province+'-'+res.data.city+'-'+res.data.city+'-'+res.data.district+'-'+res.data.address
            }
            
          }
        })
        
      },
      tijiao_info(){
        
        if(this.userInfo.cnname==''){
          this.$toast('输入您的姓名');
          return
        }
        if(this.userInfo.mobile==''){
          this.$toast('输入您的手机号');
          return
        }
        this.$ajax('editInfo',{
        'userToken':this.$getStorage('token'),
        'name':this.userInfo.cnname,
        'phone':this.userInfo.mobile
        }).then(res => {
          let _this = this
          if(res.status == 0){
            _this.$dialog.alert({
              title: '温馨提示',
              message: '修改成功'
            }).then(() => {
              _this.$router.go(-1);
            });

            // 
          }
        })
      }
    },
    
 
  }
</script>

<style scoped>
  .data-form{

  }
  .mask{border-radius:8px;width:80%;margin:0 auto;}
  .mask p{margin:0 auto;line-height:40px;border-bottom:1px solid #f1f1f1;text-align:center}
  #data-form >>> .van-button--large{
    width: 90%;
    margin-left: 5%;
    border-radius: 5px;
    color: #fff;
    background: #46bba9;
    margin-top: 100px;
  }
</style>
