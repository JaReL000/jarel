<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"
  .pt-tab
    width 100%
    height 82px
    z-index 1
    border-top 1px solid #e6e6e6
    margin-top 17px
    position fixed
    bottom 0px
    background #fff
    display -webkit-flex
    div
      -webkit-flex 1
      font-size 27px
      line-height 82px
      text-align center
      color #999999
      box-sizing border-box
      overflow hidden
      a
        display block
        height 100%
        box-sizing border-box
        color:#999
        &.router-link-active
          display block!important
          height 82px!important
          font-size 27px
          line-height 82px
          text-align center
          box-sizing border-box!important
          border-bottom 7px solid #0c72e3!important
          color #0c72e3!important

</style>
<template>
  <div class="pt-tab fixed-x">
    <div>
      <router-link
        :to='{path:"/picTell/jinrTreaty"}'
        replace
      >鲸鱼</router-link>
    </div>
    <div>
      <router-link
        :to='{path:"/picTell/jinrAdvantage"}' replace
      >三大优势</router-link>
    </div>
    <div>
      <router-link
        :to='{path:"/picTell/jinrWelfare"}'
        replace
      >鲸鱼公益</router-link>
    </div>
    <div>
      <router-link
        :to='{path:"/picTell/jinrTarget"}'
        replace
      >鲸鱼之志</router-link>
    </div>

  </div>
</template>

<script>

export default {
  components: {},
  data() {
    return {

    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {

  },
}
</script>
