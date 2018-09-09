<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.jr-in-done
  position: fixed
  z-index: 100
  top: 0
  left: 0
  bottom: 0
  right: 0
  padding rem(80) rem(80)
  background-color baise
  color huise
  .in-out
    overflow hidden
    position relative
    // padding-left rem(82)
    background-position left top
    background-repeat no-repeat
    background-size rem(57) rem(431)
    // background-image url("../assets/InOut_bg1.png")
    &.heightImg
      background-image url("../assets/InOut_bg2.png")
    .item
      position relative
      padding-bottom rem(100)
      &::after 
        content: ''
        position: absolute
        top 0
        left 22px
        bottom 0
        width 6px
        height 450px
        z-index -1
        transform scale(.5) translate3d(0, -100%, 0)
        transform-origin 0 0
        pointer-events none
        box-sizing border-box
        border 0 solid #e4e4e4
        background-color #e0e3e7
      &.ban
        color mainColor
      &.ban::after 
        content: '';
        position: absolute;
        top: 0;
        left: 22px;
        width: 6px;
        bottom 0
        transform translate3d(0, -100%, 0)
        z-index 1
        background-color mainColor
      img 
        width 50px 
        height @width
      .r 
        vertical-align middle
        display inline-block
        padding-left 10px
        h2
          line-height rem(32)
          font-size rem(32)
        p
          line-height rem(54)
          font-size rem(26)


  .rocket
    position fixed
    top 0
    left 0
    height 100%
    width 100%
    text-align center
    background-color rgba(7, 17, 27, 0.6)
    .ding
      position relative
    .gotoMy
      position absolute
      left 0
      bottom rem(40)
      width 100%
      height rem(70)
    .rocket-main
      position fixed
      top 45%
      left 50%
      transform translate3d(-50%,-50%,0)
    img
      width rem(590)
    .close-btn
      display inline-block
      margin-top rem(50)
      padding rem(10)
      border 1px #ffffff solid
      margin-right rem(10)
      border-radius 50%
      span
        display block
        position relative
        width rem(40)
        height @width
        padding rem(10)
        &:before,&:after
          content ''
          position absolute
          height 1px
          width 100%
          top 50%
          left 0
          background baise
        &:before
          transform: rotate(45deg);
        &:after
          transform: rotate(-45deg);

</style>
<template>
  <transition name="slide" >
    <div class="jr-in-done" >
      <div class="in-out" >
        <div 
          class="item"
          v-for="(item, index) in orderList"
          :key="index"
          :class="{ban: item.status}"
        >
          <img :src="item.image" alt="">
          <div class="r">
            <h2>{{item.content}}</h2>
            <p >{{item.time}}</p>
          </div>
        </div>

        <div class="line"></div>
      </div>
      <div class="jr-btn">
        <input
          type="button"
          value="完成"
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
    props: {},
    data() {
      return {
        orderList: [],
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
    created() {
      
      let params={
        servicename : 'order.orderDetail',
        orderid: this.$route.query.orderid  || '',
      }

      this.$http(params).then((res)=>{
        document.title = res.title
        this.orderList = res.list
      }).catch(function(error){
        this.showLoading = false
        console.log(res.msg)
      });
    },
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
