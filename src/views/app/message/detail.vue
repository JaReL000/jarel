<template lang="pug">
  div.art-detail( v-if="show" :class="{'jrx-header-top': $root.showHeader}")
    div.scroll
      div.top
        h4(v-text="title")
        span(v-text="issue_time")
      div.text(v-html="body")

</template>

<script>
  // import logo from 'assets/img/logo.png'
  // import qs from 'qs'
  // import BScroll from 'better-scroll'

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
    mounted() {
      // new BScroll(this.$refs.wrapper, {
      //   click: true
      // })
    },
    methods: {
      initFun(){
        this.$http({
          method: 'notice.detail',
          terminal: 1,
          noticeid: this.$route.query.noticeid, //文章_栏目ID
        }).then((response) => {
          this.changeTitle('公告详情')
          this.title = response.title
          this.issue_time = response.issue_time
          // 过滤pre标签 ↵ .replace(/[\r\n]/g,"<br />")
          let ishttps = 'https:' == document.location.protocol ? true: false;
          if(ishttps){
            let reg = new RegExp("http:", "g")
            response.body = response.body.replace(reg, "https:");
          }
          this.body = response.body.replace("<pre", "<div").replace("</pre>", "</div>")
          this.show = true
        })
      },

    }
  }
</script>

<style lang="stylus">

.art-detail
  position: fixed
  left 0
  top 0
  right 0
  bottom 0
  width 100%
  height 100%
  background: #fff;
  // overflow scroll
  overflow-y auto
  -webkit-overflow-scrolling touch
  div.top
    padding 40px 25px 0
    h4
      margin-bottom 20px
      font-size 32px
      line-height 50px
      // font-weight bold
    span
      display block
      font-size 24px
      line-height 40px
      color #999999
  .text
    padding 40px 25px 40px
    font-size 28px
    color #999
    img
      text-align center



</style>
