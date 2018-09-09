<template>
<div class="msg" v-if="isShow">
  <div class="msg_con">
    <h3>恭喜您，注册成功</h3>
    <div class="btn" @click="goToAPP">立即使用 赚5%收益</div>
  </div>
</div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      isShow: false
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
  },
  methods: {
    show(){
      this.isShow = true
    },
    close(){
      this.isShow = false
    },
    goToAPP(){
      try {
        JinrStock.pushInvestPlan()
      } catch (error) {

      }
    }
  },
}
</script>


<style lang="stylus">
.msg
  position absolute
  position fixed
  top 0 
  left 0 
  right 0
  bottom 0
  width 100%
  background-color rgba(0,0,0,0.4)
  .msg_con
    position absolute
    top 50%
    left 50%
    transform translate3d(-50%, -50%, 0)
    width 487px
    padding 5px 60px 92px
    border-radius 20px
    background-color #fff
    text-align center
    h3 
      line-height 250px
      font-size 50px
      color #333
    .btn
      line-height 88px
      border-radius 20px
      background #3d85ff
      font-size 38px
      color #fff
    
</style>

