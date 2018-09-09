<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.article-list
  .banner 
    height 440px
    font-size 0
    line-height 0
  .lists
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
            height 134px
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
      .more 
        padding-bottom 44px
        line-height 120px
        text-align center
        font-size 26px
        color #999



// .noData
//   text-align center
//   color #999
//   &>img 
//     padding-top 200px
//     width 300px
//     height @width


</style>
<template>
  <router-view></router-view>
</template>

<script>
  export default {
    components: {},
    data() {
      return {}
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {},
  }
</script>
