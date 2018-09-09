<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.jr-auth-done
  position: fixed
  z-index: 100
  top: 0
  left: 0
  bottom: 0
  right: 0
  padding rem(80) rem(110)
  background-color baise
  color huise
  text-align center
  .top
    img
      padding 40px   0
      width 100px
  h1
    font-size 46px
    line-height 125px
    color #333
  p
    font-size 22px
    line-height 40px
    margin-bottom 100px
  .jr-btn
    input
      width 100%
      height 92px
      border-radius (92/2)px


</style>
<template>
  <transition name="slide" >
    <div class="jr-auth-done" >
      <div class="top"><img src="./bing_ok.png" alt="鲸鱼"></div>
      <h1>绑定成功！</h1>
      <p>你以后在公众号中可以免登陆查看资产啦</p>
      <div class="jr-btn">
        <input
          type="button"
          value="我的资产"
          @click="okFun"
        >
      </div>

    </div>
  </transition>
</template>

<script>

  export default {
    name: 'jrInDone',
    components: {},
    props: {
      orderList: {
        type: Array,
      }
    },
    data() {
      return {
        orderList2: [
          {
            content: "转入1.00元到年定期",
            image:"http://jinrapp.dev.jinr.com/statics/images/icon.png",
            status: 1,
            time: "2017-10-18 15:52:44"
          },
          {
            content: "转入1.00元到年定期",
            image:"http://jinrapp.dev.jinr.com/statics/images/icon.png",
            status: 1,
            time: "2017-10-18 15:52:44"
          },
          {
            content: "转入1.00元到年定期",
            image:"http://jinrapp.dev.jinr.com/statics/images/icon_no.png",
            status: 1,
            time: "2017-10-18 15:52:44"
          },
        ]
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      closeAll(){},
      okFun(){
        this.$router.replace({
          path: '/',
          query: {}
        })
      }

    },
  }
</script>
