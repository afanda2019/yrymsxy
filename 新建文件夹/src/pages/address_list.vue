<template>
  <v-page title="我的收货地址">

    <div class="content">
      <div class="address-wrap">
        <div class="address-item" v-for='(item,key) in addlist' ::key="key">
          <div class="address-title">
            <div>{{item.name}}</div>
            <div>{{item.mobile}}</div>
          </div>
          <div class="address-info">
            {{item.province}}-{{item.city}}-{{item.district}}-{{item.address}}
          </div>
          <div class="address-action">
            <div class="checkbox-wrap" @click='moren(item.id)'>
              <van-checkbox v-model="item.checked" >设为默认</van-checkbox>
            </div>
            <div class="action-wrap">
              <span @click='openPage("eid_address",item.id)'>
                <van-icon name="edit" size="20px" class="action-icon" ></van-icon>
                编辑</span>
              <span  @click='deladdress_list(item.id)'>
                <van-icon name="delete" size="20px" class="action-icon">
                </van-icon>
                删除</span>
            </div>
          </div>
        </div>
      </div>
      <div class='tjdz' @click='openPage("add_address")'>添加地址</div>
      <div style='height:60px'></div>
    </div>

  </v-page>
</template>

<script>
  export default {
    name: 'address_list',
    data () {
      return {
        addlist:[],
        checked:false
      }
    },
    mounted(){
        this.address_list();
    },
    // 订单列表
    methods: {
      openPage(str,id){
        this.$router.push({name:str,query: {id: id}});
      },
      moren(id){
        this.$ajax('setDefAddr',{
        'userToken':this.$getStorage('token'),
        'id':id
        }).then(res => {
          console.log(res)
          if(res.status == 0){
            this.addlist=[]
            this.address_list()
          }
        })
        
      },
      address_list(){
        this.$ajax('addresses',{
        'userToken':this.$getStorage('token')
        }).then(res => {
          console.log(res)
          if(res.status == 0){
            this.addlist = res.data
            for(var i = 0;i<this.addlist.length;i++){
              if(this.addlist[i].is_default==1){
                this.addlist[i].checked = true
              }else{
                this.addlist[i].checked = false
              }
            }
            console.log(this.addlist)
          }
        })
      },
      deladdress_list(id){

        this.$ajax('delAddress',{
        'userToken':this.$getStorage('token'),
        'id':id
        }).then(res => {
          console.log(res)
          if(res.status == 0){
            this.addlist=[]
            this.address_list()
          }
        })
      },
    }
  }
</script>

<style scoped>
 .page-content{
    
  }
  .content {
    padding-top: 10px;
    box-sizing: border-box;
    background:#f1f1f1;
    height:calc(100vh - 46px);
  }

  .content >>> .van-radio__icon--checked .van-icon{
    border-color     : #FA6835;
    background-color : #FA6835;
  }
  .address-wrap {

  }
  .address-wrap span{
    margin-left: 8px;
  }
  .address-item {
    padding    : 15px;
    background : #fff;
    border-bottom: 10px solid #f1f1f1;
    
  }

  .address-item .action-icon {
    position: relative;
    top : 4px;

  }

  .address-item .address-title {
    display       : flex;
    width         : 100%;
    margin-bottom : 8px;
  }

  .address-item .address-title div:first-child {
    flex : 1 0 40%;
  }

  .address-item .address-title div:last-child {
    flex : 1 0 60%;
  }

  .address-item .address-info {
    line-height    : 26px;
    border-bottom  : 1px solid #efefef;
    padding-bottom : 15px;
  }

  .address-action {
    display         : flex;
    padding-top     : 10px;
    justify-content : space-between;
  }
  .tjdz{
    width:90%;
    line-height:40px;
    margin:0 auto;
    background:#46bba9;
    color:#fff;
    text-align:center;
    border-radius:8px
  }
</style>
