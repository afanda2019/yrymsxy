<template>
  <div id="pageContent">

    <jroll-infinite class="jroll-vue-infinite" total="10"
                    :pulldown-options="{}"
                    :jroll-options="options"
                    @on-scroll-bottom="scrollBottom"
                    @on-scroll-start="scrollStart"
                    @on-pulldown="pulldown">
        <div class='item' v-for="i in items">{{i.index}}、{{i.text}}</div>
    </jroll-infinite>
  </div>
</template>

<script>
  import JRoll from 'jroll'
  import 'jroll-vue-infinite2'
  import 'jroll-pulldown'
  import Vue from 'vue'

  Vue.component('jroll-infinite', JRoll.VueInfinite2())
  export default {
    name: 'Pulldown',
    data () {
      return {
        page: 0,
        items: [{index: 1, text: 1}],
        options: {
          scrollBarY: true,
          scrollY:true
        }
      }
    },
    methods: {
      pulldown(success){
        console.log('下来刷新')
        setTimeout(success,2000)
      },
      scrollBottom: function (page, success, error) {
        var me = this
        setTimeout(()=>{
          for (var i = 0; i < 10; i++) {
            this.items.push({
              index: i,
              text: i
            })
          }
        },1000);

      },
      scrollStart: function (jroll) {
        // console.log(jroll)
      }
    },
    mounted () {
      new JRoll('#pageContent').on('scrollEnd', function () {
        if (this.y === this.maxScrollY) {
          console.log('已滑动到底部')
        }
      })
    }
  }
</script>

<style scoped>
  #pageContent{
    position: absolute;
    top: 0;
    width: 100%;
    background: #fff;
    z-index: 9999;
    height: 90vh;
    overflow-y: hidden;
  }
</style>
