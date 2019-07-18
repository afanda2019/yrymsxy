<template>
  <v-page title="意见反馈">
    <div class="content">
      <van-cell-group title="您有什么建议吗?">
        <van-field
          clearable
          placeholder="请填写主题"
          v-model='title'
        />
      </van-cell-group>
      <div class="textarea-content">
        <van-field
          clearable
          type="textarea"
          rows="8"
          placeholder="请输入您的建议"
          v-model='cont'
        />
      </div>
      <van-cell-group title="手机号">
        <van-field
          type="tel"
          clearable
          placeholder="请输入您的手机号"
          v-model='tel'
        />
      </van-cell-group>
      <van-button size="large" @click='aboutUs'>立即提交</van-button>

    </div>

  </v-page>
</template>

<script>
  export default {
    name: 'feedback',
    data () {
      return {
        title:'',
        cont:'',
        tel:''
      }
    },
    methods: {
      aboutUs(){
        if(this.title==''){
          this.$toast('您要说点什么');
          return;
        }
        if(this.cont==''){
          this.$toast('您有什么建议');
          return;
        }
        if(this.tel==''){
          this.$toast('留下您的联系方式！有惊喜哦');
          return;
        }
        this.$ajax('Feedback',{
        'userToken':this.$getStorage('token'),
        'content':this.cont,
        'title':this.title,
        'mobile':this.tel,
        }).then(res => {
          let _this = this
          if(res.status == 0){
            _this.$dialog.alert({
              title: '温馨提示',
              message: '提交成功'
            }).then(() => {
              _this.$router.go(-1);
            });
          }
        })

      },
      formatImg:function(html){
                var newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
            var match = match.replace(/<img/gi,'<img/style="width:100%"');
            return match;
        });
        return newContent;
      }
    }
  }
</script>

<style scoped>
  .content {
    padding : 0 15px;
  }

  .van-cell-group__title {
    color         : #333;
    font-size     : 16px;
    margin-bottom : 8px;
    padding-left  : 0;

  }

  .textarea-content {
    background : #f7f7f7;
    margin     : 10px 0;
  }

  .textarea-content .van-field {
    background : transparent;
  }

  .van-field {
    border        : 1px solid #f7f7f7;
    border-radius : 5px;
  }

  .van-hairline--top-bottom::after {
    border-width : 0;
  }

  .van-button--large {
    width         : 90%;
    margin-left   : 5%;
    border-radius : 5px;
    color         : #fff;
    background    : #f58612;
    margin-top    : 70px;
  }
</style>
