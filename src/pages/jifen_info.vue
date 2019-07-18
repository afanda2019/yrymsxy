<template>
  <v-page title="积分订单">
   
    <div class="page-content">
      <div class="wdddbg">
          <span><van-icon name="passed" style='font-size:20px;margin:18px 10px 0;float:left;'/>完成</span>
          <img src="@/assets/kuaidi.png" />
        </div>
        <div class='address' @click='openPage("address_list")'>
          <van-icon name="location-o" style='padding:8px 10px 0' />
          <div>
            姓名:yu听&nbsp;电话:13161663575<br>
            <span style='font-size:14px;color:#929292'>地址:吉林省-长春市-朝阳区-安联国际10楼1009</span>
          </div>
          <!-- <p>点击添加地址</p>-->
        </div>
        <img style='height:2px;display: block;width:100%' src='@/assets/line.png'>
        <div class="order-content">
          <van-card
            num="2"
            price="2.00"
            desc="描述信息描述信息描述信息"  
            title="商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题"
            thumb="//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg"
          />
          <van-card
            num="2"
            price="2.00"
            desc="描述信息描述信息描述信息"  
            title="商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题"
            thumb="//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg"
          />
        </div>
       
      <div class="line"></div>
      <div class='mid'>
        <p>订单编号：6002132132131</p>
        <p>下单时间：2017-10-11  19:53:42</p>
      </div>
      <van-cell-group>
        <van-field
          v-model="password"
          type="password"
          label="买家留言"
          placeholder="选填：对本次交易的说明（建议填写已和卖家协商一..."
        />
      </van-cell-group>
      <van-cell title="优惠卷抵用：" value="￥200" size="large" />
      <div class='listtext'>共2件商品 实付款：<span>￥69.00</span></div>
    </div>

  </v-page>
</template>

<script>
  // import {wxConfig} from "@/utils/index"
  import wx from "weixin-js-sdk"
  // 微信配置

  export default {
    name: 'confirm_order',
    data () {
      return {
        is_buycart: this.$route.query.is_buycart,	//是否购物车：0否，1是	
        buycart_ids:this.$route.query.buycart_ids||'',//购车ids，已字符串逗号分隔	
        product_id:this.$route.query.id||'',//
        shopceat:this.$route.query.shopceat,//商品还是课程。商品 需要填写地址；课程不需要填写地址
        shopInfo:[],
        address:[],
        price:'',
        pro_type:'',
        addressxianshi:false
      }
    },
    mounted(){
      this.$ajax('Wechat/getConfig', {}).then((res) => {
        if (res.errno == this.SUCCESS_CODE) {
          wx.config(res.data); 
        }
      }, (err) => {
        console.log(err)
      })
        this.is_buycart=this.$route.query.is_buycart,	//是否购物车：0否，1是	
        this.buycart_ids=this.$route.query.buycart_ids||'',//购车ids，已字符串逗号分隔	
        this.product_id=this.$route.query.id||'',//
        this.shopceat=this.$route.query.shopceat//商品还是课程。商品 需要填写地址；课程不需要填写地址
        this.order_list();
        this.address_list();
    },
    methods: {
      openPage(str,id){
        this.$router.push({name:str,query: {type_id: id}});
      },
      config(url){
        
      },
      // 订单列表
      address_list(){
        const params = {
          'token':this.$getStorage('token'),
        }
        this.$ajax('Address/getOrderUsed',params).then((res) => {
          this.$toast.clear()
          if (res.errno == 1000) {
            this.address = res.data
            if(this.address.length==[]){
              
            }else{
              this.addressxianshi = true
            }
          }
        }, (err) => {
          console.log(err)
        })
      },

      submit() { //提交支付
        if(this.$route.query.shopceat==3){
          if(this.address == '') {
            alert('请选择地址')
            // this.$toast();
            return;
          }
        }
        if(this.$route.query.shopceat==3){
          this.pro_type = 0
        }else{
          this.pro_type = 1
        }
        let _this = this;
       const params = {
            'token':this.$getStorage('token'),
            'product_id': this.$route.query.id||'',//单个商品id	
            'is_buycart': this.$route.query.is_buycart,//0单个商品购买，1购物车购买	
            'addressid': this.address.id||0,//商品传地址id，
            'pro_type':this.pro_type,
            'buycart_ids':this.$route.query.buycart_ids||''
        }


        this.$ajax('order/create', params).then(({errno, errmsg, data}) => {
          // this.$closeLoading();
          // setTimeout(function(){
          // setTimeout((function(){
            if (this.SUCCESS_CODE == errno) {
              let payCfg = data.pay;
              let oid = data.orderid;
              payCfg.timestamp = payCfg.timeStamp;
              delete payCfg.timeStamp;
              delete payCfg.appId;
              let _this = this;
              wx.chooseWXPay({
                ...payCfg,
                success(res) {
                  // _this.$toast('支付成功');
                    if( _this.$route.query.shopceat==3){
                    _this.$dialog.alert({
                      title: '温馨提示',
                      message: '支付成功'
                    }).then(() => {
                      _this.$router.replace({name: 'mine_order',query: {oid: oid}});
                    });
                    
                  }else{
                    _this.$dialog.alert({
                      title: '温馨提示',
                      message: '支付成功'
                    }).then(() => {
                      _this.$router.replace({name: 'mine_course',query: {oid: oid}});
                    });
                  }
                },
                fail: function(ret) {
                  if( _this.$route.query.shopceat==3){
                    _this.$dialog.alert({
                      title: '温馨提示',
                      message: '支付失败'
                    }).then(() => {
                    _this.$router.replace({name: 'mine_order',query: {oid: oid}});
                    });
                    
                  }else{
                    _this.$dialog.alert({
                      title: '温馨提示',
                      message: '支付失败'
                    }).then(() => {
                    _this.$router.replace({name: 'mine_course',query: {oid: oid}});
                    });
                    
                  }
                },
                cancel: function(ret) {
                  if( _this.$route.query.shopceat==3){
                    _this.$dialog.alert({
                      title: '温馨提示',
                      message: '支付失败，稍后重试'
                    }).then(() => {
                    _this.$router.replace({name:'mine_order',query: {oid: oid}});
                    });
                    
                  }else{
                    _this.$dialog.alert({
                      title: '温馨提示',
                      message: '支付失败，稍后重试'
                    }).then(() => {
                    _this.$router.replace({name: 'mine_course',query: {oid: oid}});
                    });
                  
                  }
                  
                }
              });
              
            } else {
              // this.$toast(errmsg);
            }
          // },300)
        });





        // this.$ajax('order/create',params).then((res) => {
        //   console.log(res)
        //   if(res.errno == 1000) {
        //     let oid = res.data.orderid;
        //     let wx_sign = res.data.pay;
        //     wx.chooseWXPay({
        //       timestamp: wx_sign.timeStamp,
        //       nonceStr: wx_sign.nonceStr,
        //       package: wx_sign.package,
        //       signType: wx_sign.signType,
        //       paySign: wx_sign.paySign,
        //       success: function(ret) {
        //         // alert(JSON.stringify(ret))
        //         if( _this.$route.query.shopceat==3){
        //           _this.$dialog.alert({
        //             title: '温馨提示',
        //             message: '支付成功'
        //           }).then(() => {
        //             _this.$router.replace({name: 'mine_order',query: {oid: oid}});
        //           });
                  
        //         }else{
        //           _this.$dialog.alert({
        //             title: '温馨提示',
        //             message: '支付成功'
        //           }).then(() => {
        //              _this.$router.replace({name: 'mine_course',query: {oid: oid}});
        //           });
        //         }
        //       },
        //       fail: function(ret) {
        //          if( _this.$route.query.shopceat==3){
        //            _this.$dialog.alert({
        //             title: '温馨提示',
        //             message: '支付失败'
        //           }).then(() => {
        //            _this.$router.replace({name: 'mine_order',query: {oid: oid}});
        //           });
                  
        //         }else{
        //            _this.$dialog.alert({
        //             title: '温馨提示',
        //             message: '支付失败'
        //           }).then(() => {
        //           _this.$router.replace({name: 'mine_course',query: {oid: oid}});
        //           });
                  
        //         }
        //       },
        //       cancel: function(ret) {
        //          if( _this.$route.query.shopceat==3){
        //            _this.$dialog.alert({
        //             title: '温馨提示',
        //             message: '支付失败，稍后重试'
        //           }).then(() => {
        //           _this.$router.replace({name: 'mine_order',query: {oid: oid}});
        //           });
                  
        //         }else{
        //           _this.$dialog.alert({
        //             title: '温馨提示',
        //             message: '支付失败，稍后重试'
        //           }).then(() => {
        //            _this.$router.replace({name: 'mine_course',query: {oid: oid}});
        //           });
                 
        //         }
                 
        //       }
        //     });
        //   }else {
        //     // this.$toast(res.errmsg);
        //   }
        // }, (err) => {
        //   console.log(err)
        // })
     
    },
      // 订单列表
      order_list(){
        const params = {
          'token':this.$getStorage('token'),
          'is_buycart':this.is_buycart,//	string	是	是否购物车：0否，1是	
          'buycart_ids':this.buycart_ids,	//string	否	购车ids，已字符串逗号分隔	
          'product_id':this.product_id,//	string	否	商品id
        }
        this.$ajax('Order/beforeOrderCreate',params).then((res) => {

          this.$toast.clear()
          if (res.errno == 1000) {
            this.shopInfo = res.data.list;
            this.price = res.data.total
            
          }
        }, (err) => {
          console.log(err)
        })
      },
    }
  }
</script>

<style scoped>

  .page-content {
    background : #f5f5f5;
  }

  .page-content .card-header .logo {
    position : relative;
    top      : 5px;

  }

  .page-content .card-header {
    height        : 50px;
    line-height   : 50px;
    border-bottom : 1px solid #f5f5f5;
    padding       : 0 15px;

  }

  .page-content .classes-price {
    color : #FB561B;
  }

  .page-content .line {
    height : 8px;
  }

  .page-content .order-content {
    border-top:1px solid #f1f1f1;
    padding : 15px;
    background:#fff
  }

  .page-content .left {
    flex : 1 0 25%;
  }

  .page-content .right {
    flex         : 1 0 75%;
    padding-left : 15px;
    padding-top  : 15px;
  }

  .page-content .left img {
    width         : 100%;
    border-radius : 5px;
  }

  .page-content .type {
    color      : #9d9d9d;
    margin-top : 10px;
  }

  .van-button--large {
    width         : 90%;
    margin-left   : 5%;
    border-radius : 5px;
    color         : #fff;
    background    : #f58612;
    margin-top    : 50px;
  }
  .address{padding:10px 15px;line-height:30px;display:flex; background : #fff;}
  .van-card{    background-color: #fff;padding: 0;}
  .van-card__title{font-size:16px;margin-bottom:2px}
  .van-card__price{font-size:16px}
  .van-cell__value{color:#ff4700}
  .listtext{line-height:40px;font-size:14px;padding:0 10px;text-align:right;border-bottom:1px solid #f1f1f1;background:#fff}
  .listtext span{
    color:#ff4700;
    font-size:16px
  }
  .wdddbg{
    background:#46bba9;
    display: flex;justify-content:space-between;
    padding: 30px;
    line-height: 3.5rem;
    color: #fff;
    
    }
  .wdddbg span{padding-left: 1.2rem;background: #46bba9;}
  .wdddbg img{width: 4rem;height: 3.5rem;}
  .mid{padding:10px 15px;background:#fff;}
  .mid p{margin:0;font-size:14px;line-height:30px}
  .van-cell--large .van-cell__title{font-size:14px;}
</style>
