<template lang="pug">
  div.art-detail(ref="wrapper" v-if="show")
    //- scroll(:data="body" class="toplist" ref="body")
    div.scroll
      div.top
        h4(v-text="title")
        span(v-text="issue_time")
      div.text(v-html="body")
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    data () {
      return {
        show: false,
        issue_time: '',
        title: '',
        time: '',
        body: ''
      }
    },
    created() {
      this.initFun()
    },
    mounted() {},
    methods: {
      initFun(){
        this.$http({
          method: 'article.detail',
          terminal: 1,
          articleid : this.$route.query.articleid, //文章_栏目ID
        }).then((response) => {
          this.title = response.title
          this.issue_time = response.issue_time
           let ishttps = 'https:' == document.location.protocol ? true: false;

          if(ishttps){
            let reg = new RegExp("http:", "g")
            response.body = response.body.replace(reg, "https:");
          }
          // 过滤pre标签
          this.body = response.body.replace("<pre", "<div").replace("</pre>", "</div>")
          this.show = true
        })
      },

    }
  }
</script>

<style lang="stylus">

.art-detail
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width:100%;
  height:100%;
  background: #fff;
  overflow scroll
  -webkit-overflow-scrolling touch
  div.top
    padding 40px 25px 0
    h4
      font-size 32px
      line-height 60px
      // font-weight bold
      // overflow hidden
      // text-overflow ellipsis
      // white-space nowrap
    span
      display block
      font-size 24px
      line-height 40px
      color #999999
  .text
    padding 40px 25px 40px
    font-size 28px
    color #999



</style>
