<template>
    <v-page title="添加收货地址">
      <div class="content">
        <van-address-edit
          show-postal
          :address-info="addressInfo"
          :area-list="areaList"
          
          :show-postal="false"
          @save='onSave'
        />
      </div>

    </v-page>
</template>

<script>
  import areaList from '@/utils/area'
  export default {
    name: 'add_address',
    data(){
      return {
        areaList,
        addressInfo:{},
      };
    },
    mounted(){
       if(this.$route.query.id){
         this.order_del()
        }
    },
    methods: {
      openPage(str,id){
        this.$router.push({name:str,query: {type_id: id}});
      },
      onSave(cont) {
        this.addressInfo = cont
        this.$toast('保存地址');
        this.order_list();
      },
      // 订单列表
      order_del(){
        const params = {
          'userToken':this.$getStorage('token'),
          'id':this.$route.query.id,
        }
        this.$ajax('Address/getinfo',params).then((res) => {
          if(res.errno==1000){
            let addressInfo = {
                id:res.data.id,
                name:res.data.cnname,
                tel:res.data.mobile,
                province:res.data.province_name,
                city:res.data.city_name,
                county:res.data.area_name,
                addressDetail:res.data.regiontxt,
                is_default:res.data.isdefault,
               }
            this.addressInfo = addressInfo
          }
          
        }, (err) => {
          console.log(err)
        })
      },
      order_list(){
        this.$ajax('editAddress',{
          'userToken':this.$getStorage('token'),
          'name':this.addressInfo.name,//	string	是	收人名字	
          'mobile':this.addressInfo.tel,//	string	是	手机号	
          'province':this.addressInfo.province,	//string	是	省	
          'city':this.addressInfo.city,//	string	是	市	
          'district':this.addressInfo.county,//	string	是	区	
          'address':this.addressInfo.addressDetail,
          'id':this.$route.query.id,
          'is_default':1
          }).then(res => {
            console.log(res)
            if(res.status == 0){
              this.$dialog.alert({
                title: '温馨提示',
                message: '修改成功'
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
</style>
