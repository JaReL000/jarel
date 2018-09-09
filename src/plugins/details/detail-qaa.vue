<template>
  <!-- 问答 -->
  <ul class="qaa">
    <li v-for="(item, index) in qaaList" :key="index">
      <h2 v-text="item.title"></h2>
      <p v-html="item.text"></p>
    </li>
    <div 
      v-if="showMore"
      class="more" 
      @click="routerPush('/service/centre')"
    >查看更多问题</div>
  </ul>
</template>

<script>

  export default {
    props: {
      qaaList: {
        type: Array
      },
      showMore: {
        type: Boolean
      }
    },
    data () {
      return {}
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {}
  }
</script>

<style lang="stylus">
@import '~style/mixin.styl'

// 问答
.qaa
  margin-left 32px
  // padding-bottom 75px
  background-color baise
  li 
    position relative
    padding-top 45px
    //border-bottom 1px #e5e5e5 solid
    &:before
      content ''
      position absolute
      height 1px
      width 100%
      bottom 0
      right 0
      background-color: #e5e5e5
      transform:scaleY(0.5)
      -webkit-transform:scaleY(0.5); 
  h2 
    position relative
    padding-left 90px
    line-height 32px
    margin-bottom 18px
    font-size 32px
    // font-weight bold
    &:before
      content 'hot'
      position absolute
      left 0 
      top -2px
      padding 0 11px 
      line-height 32px
      border 1px #ff5963 solid
      border-radius 8px
      font-size 27px
      color #ff5963
  p 
    padding-bottom: 15px
    padding-right 26px
    line-height 44px
    font-size 30px
    color #666666
  .more 
    margin-left -32px
    height 120px
    line-height 100px
    text-align center
    font-size 30px
    color mainColor
</style>