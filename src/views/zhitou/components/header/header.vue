<template>
  <div class="jinr-header">
    <i 
      class="arrow"
      @click="goBackFun"
    ></i>
    <h1>邀请好友享三重礼</h1>
  </div>
</template>

<script>

export default {
  name: 'jinr-header',
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
    goBackFun(){
      try {
        Jinr.finish()
      } catch (error) {
        this.$router.go(-1)
      }
    }
  },
}
</script>


<style lang="stylus">
// @import "~style/mixin.styl"
.jinr-header{
  position: fixed;
  left: 0;
  top: -2px;
  z-index: 1000000;
  width: 100%;
  height: 88px;
  background-color: #fff;
  h1{
    height: 88px;
    line-height: 88px;
    font-size: 34px;
    text-align: center;
  }
  i.arrow{
    position: absolute;
    left: 0px;
    top: 0px;
    height: 88px;
    width: 88px;
    background: url('./images/title_arrow.png') no-repeat 40px center;
    background-size:  (25*0.8)px (45*0.8)px;
  }
  span.share {
    position: absolute;
    top: 0;
    right: 0;
    height: 88px;
    width: 88px;
    padding: 0  40px 0 0;
    background: url('./images/title_share.png') no-repeat 40px center;
    background-size:  (55*0.8)px (53*0.8)px;
  }
}
</style>

