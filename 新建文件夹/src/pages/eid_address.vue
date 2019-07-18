<template>
    <v-page title="添加收货地址">
      <div class="content">
      <van-cell-group>
        <van-field
          v-model="addressInfo.name"
          label="姓名"
          placeholder="收货人姓名"
        />
        <van-field
          v-model="addressInfo.tel"
          label="电话"
          type="number"
          placeholder="收货人手机号"
        />
        <van-field
          v-model="addressInfo.address"
          readonly
          label="地区"
          placeholder="选择省/市/区"
          @click='dizhixianshi'
        />
        <van-field
          v-model="addressInfo.addressDetail"
          label="详细地址"
          placeholder="街道门牌、楼层房间号等信息"

        />
      </van-cell-group>
      <button @click='onSave' class='van-button van-button--danger van-button--normal van-button--block'>保存</button>
      <van-popup v-model="show" position="bottom">
        <van-area :area-list="areaList"  @cancel='closemask' @confirm='addinfo' />
      </van-popup>
      
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
        address:{},
        show:false
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
      dizhixianshi(){
        this.show = true
      },
      closemask(){
        this.show = false
      },
      addinfo(val){
        this.closemask()
        this.address = val
        this.addressInfo.address = val[0].name +'/'+ val[1].name +'/'+ val[2].name ;
        this.addressInfo.province = val[0].name
        this.addressInfo.city = val[1].name
        this.addressInfo.county = val[2].name
        
      },
      onSave() {
        // this.$toast('保存地址');
        this.order_list();
      },
      // 订单列表
      order_del(){
        this.$ajax('userDefAddr',{
        'userToken':this.$getStorage('token'),
        'id':this.$route.query.id
        }).then(res => {
          console.log(res)
          if(res.status == 0){
            let addressInfo = {
              id:res.data.id,
              name:res.data.cnname,
              tel:res.data.mobile,
              address:res.data.province_name +'/'+res.data.city_name+'/'+res.data.area_name,
              province:res.data.province_name,
              city:res.data.city_name,
              county:res.data.area_name,
              addressDetail:res.data.regiontxt,
              is_default:res.data.isdefault,
             }
            this.addressInfo = addressInfo
          }
        })
        
      },
      order_list(){
          if(this.addressInfo.name==''){
             this.$toast('收货人姓名不能为空');
             return;
          }
          if(this.addressInfo.tel==''){
             this.$toast('收货人电话不能为空');
             return;
          }
          if(this.addressInfo.addressDetail==''){
             this.$toast('请填写您的详细');
             return;
          }
          const params = {
            'token':this.$getStorage('token'),
            'cnname':this.addressInfo.name,//	string	是	收人名字	
            'mobile':this.addressInfo.tel,//	string	是	手机号	
            'province_name':this.addressInfo.province,	//string	是	省	
            'city_name':this.addressInfo.city,//	string	是	市	
            'area_name':this.addressInfo.county,//	string	是	区	
            'address':this.addressInfo.addressDetail,
            'id':this.$route.query.id
          }
          this.$ajax('Address/edit',params).then((res) => {
            if(res.errno==1000){
              this.$dialog.alert({
                title: '温馨提示',
                message: '修改成功'
              }).then(() => {
                this.$router.go(-1);
              });
            }
            
          }, (err) => {
            console.log(err)
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
  .van-button{
    background: linear-gradient(to right,#FDAD5A,#F58713);
    border-radius: 5px;
    border: unset;
    width:90%;
    margin:20px 5%
  }
</style>
