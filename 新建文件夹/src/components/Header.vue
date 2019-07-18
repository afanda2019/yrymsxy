<template>
  <div class="page-wrap">
    <van-nav-bar
      :title="title"
      left-arrow
      @click-left="back()"
    >
      <div slot="right" v-if="rightIcon!= ''">
       <!--<van-icon :name="rightIcon" size="20px" />--> 
       <van-icon :name="rightIcon" size="20px" :info="numCart" @click="$emit('right-click')"/>
      </div>
    </van-nav-bar>
    <div class="page-content" >
      <slot></slot>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Header',
    props: {
      title: {
        type: String,
        default: '标题'
      },
      rightIcon: {
        type: String,
        default: ''
      },
      numCart: {
        type: String,
        default: ''
      }
    },
    methods: {
    back() {
      // this.$goBack(this);
      this.$router.go(-1);
    },
    openPage(str,id){
      this.$router.push({name:str,query: {type_id: id}});
    },
    }

  }
</script>

<style scoped>
  .page-wrap {
    position   : absolute;
    top        : 0;
    left       : 0;
    right      : 0;
    bottom     : 0;
    z-index    : 999;
    background : #fff;
  }

  .page-wrap .page-content {
    max-height : calc(100vh - 46px);
    height     : calc(100vh - 46px);
    overflow-y : scroll;
    -webkit-overflow-scrolling:touch
  }

  .page-wrap .van-nav-bar {
    background : #46bba9;
  }

  .page-wrap .van-nav-bar .van-icon {
    color : #fff;
  }

  .page-wrap .van-nav-bar .van-nav-bar__title {
    color : #fff;

  }
  .van-info{
    border: none!important;
  }
</style>
