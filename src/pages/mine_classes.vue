<template>
  <v-page title="我的课程">

    <van-tabs color="#F59C3F" title-active-color="#F59C3F">
      <van-tab title="全部课程"/>
      <van-tab title="待付款"/>
      <van-tab title="已付款"/>
    </van-tabs>
    <div class="line"></div>
    <div class="tab-content">
      <div class="classes-list">
        <div class="classes-item">
          <van-card
            price="2000.00"
            title="课程名称课程名称课程名称课程名称课程名称课程名称">
            <div slot="thumb">
              <img class="thumb-img" :src="previewImg" v-auto-height alt="">
            </div>
            <div slot="num">
              <span class="tag tag-success">已付款</span>
            </div>
          </van-card>
        </div>
        <div class="classes-item">
          <van-card
            price="2000.00"
            title="课程名称课程名称课程名称课程名称课程名称课程名称">
            <div slot="thumb">
              <img class="thumb-img" :src="previewImg" v-auto-height alt="">
            </div>
            <div slot="num">
              <span class="tag tag-success">已付款</span>
            </div>
          </van-card>
        </div>
        <div class="classes-item">
          <van-card
            price="2000.00"
            title="课程名称课程名称课程名称课程名称课程名称课程名称">
            <div slot="thumb">
              <img class="thumb-img" :src="previewImg" v-auto-height alt="">
            </div>
            <div slot="num">
              <span class="tag tag-success">已付款</span>
            </div>
          </van-card>
        </div>
        <div class="classes-item">
          <van-card
            price="2000.00"
            title="课程名称课程名称课程名称课程名称课程名称课程名称">
            <div slot="thumb">
              <img class="thumb-img" :src="previewImg" v-auto-height alt="">
            </div>
            <div slot="num">
              <span class="tag tag-success">已付款</span>
            </div>
          </van-card>
        </div>
        <div class="classes-item">
          <van-card
            price="2000.00"
            title="课程名称课程名称课程名称课程名称课程名称课程名称">
            <div slot="thumb">
              <img class="thumb-img" :src="previewImg" v-auto-height alt="">
            </div>
            <div slot="num">
              <span class="tag tag-success">已付款</span>
            </div>
          </van-card>
        </div>
        <div class="classes-item">
          <van-card
            price="2000.00"
            title="课程名称课程名称课程名称课程名称课程名称课程名称">
            <div slot="thumb">
              <img class="thumb-img" :src="previewImg" v-auto-height alt="">
            </div>
            <div slot="num">
              <span class="tag tag-success">已付款</span>
            </div>
          </van-card>
        </div>
        <div class="classes-item">
          <van-card
            price="2000.00"
            title="课程名称课程名称课程名称课程名称课程名称课程名称">
            <div slot="thumb">
              <img class="thumb-img" :src="previewImg" v-auto-height alt="">
            </div>
            <div slot="num">
              <span class="tag tag-success">已付款</span>
            </div>
          </van-card>
        </div>
        <div class="classes-item">
          <van-card
            price="2000.00"
            title="课程名称课程名称课程名称课程名称课程名称课程名称">
            <div slot="thumb">
              <img class="thumb-img" :src="previewImg" v-auto-height alt="">
            </div>
            <div slot="num">
              <span class="tag tag-success">已付款</span>
            </div>
          </van-card>
        </div>
        <div class="classes-item">
          <van-card
            price="2000.00"
            title="课程名称课程名称课程名称课程名称课程名称课程名称">
            <div slot="thumb">
              <img class="thumb-img" :src="previewImg" v-auto-height alt="">
            </div>
            <div slot="num">
              <span class="tag tag-success">已付款</span>
            </div>
          </van-card>
        </div>
      </div>
    </div>
  </v-page>

</template>

<script>
  export default {
    name: 'mine_classes',
    data () {
      return {
        previewImg: require('@/assets/tu_01.jpg')
      }
    }
  }
</script>

<style scoped>
  .line {
    background : #f5f5f5;
  }

  .tab-content {
    height: calc(100% - 44px);
    overflow-y: scroll;
  }

  .thumb-img {
    border-radius : 3px;
  }

  .van-card {
    background : #fff;
    padding:  15px;
    border-bottom: 1px solid #f5f5f5;
  }

  .van-card__title {
    padding-top : 5px;
    font-size   : 15px;
    color       : #333;
    font-weight : unset;
  }

  .van-card__bottom {
    margin-top : 20px;
    font-size  : 16px;
  }

  .tag {
    display       : inline-block;
    border        : 1px solid #F59C3F;
    font-size     : 12px;
    padding       : 3px 10px;
    border-radius : 100px;
    position      : relative;
    top           : -3px;
    color         : #F59C3F;
  }

  .tag-success {
    border-color : #A6E0D1;
    color        : #A6E0D1;

  }
</style>
