<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.article-list
  .banner 
    height 420px
    font-size 0
    line-height 0
  .toplist
    height: 100%
    overflow: hidden
    ul  
      li.item-list
        padding 24px 24px 0
        .item
          overflow hidden
          padding-bottom 24px
          .jr-left 
            position relative
            width 230px
            height 155px
            padding-right 24px
          h6 
            // margin-bottom 10px
            line-height 52px
            font-size 34px
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
          p 
            font-size 28px
            line-height 40px
            display -webkit-box
            -webkit-box-orient vertical
            -webkit-line-clamp 2
            overflow hidden
          i 
            position absolute
            right 5px 
            bottom 24px
            font-size 16px
            

</style>
<template>
  <div class="article-list fixed" >
    <scroll :data="topList" class="toplist" ref="toplist">
      <ul>
        <!-- banner图片 -->
        <div class="banner"><img 
          :src="topList[index].photo ? topList[index].photo : require('../images/0000.png')" 
          alt="头图"
        ></div>
        <!-- 列表 -->
        <li 
          class="item-list" 
          v-for="(item, index) in topList"
          :key="index"
          v-if="index"
          @click="routerPush('/activity/detail', {articleid: item.articleid})"
        >
          <div class="item border-bottom-1px">
            <div class="jr-left "><img 
              :src="item.photo ? item.photo : require('../images/0000.png')" 
              :alt="item.title"></div>
              <!--  -->
            <h6 v-text="item.title"></h6>
            <p v-text="item.summary"></p>
            <i v-text="item.c_time"></i>
          </div>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>

export default {
  components: {},
  data() {
    return {
      index: 0, //第一张默认
      topList: []
    }
  },
  computed: {},
  watch: {},
  created() {
    this.initFun()
  },
  mounted() {},
  methods: {
    initFun(){
      this.$http({
        method: 'article.list',
        page: 1,
        acolumnid: this.$route.query.acolumnid || 8, //文章_栏目ID
        type: 1, //1 获取分页 0不获取
      }).then((response) => {
        
        this.topList = response.list
        this.show = true
      })
    },

    defaultImg(){}
  },
}
</script>
