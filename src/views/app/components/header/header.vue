<template>
<div class="jinr-header">
  <i
    class="arrow"
    @click="goBackFun"
  ></i>
  <h1>鲸鱼</h1>
  <span
    class="share"
    v-show="$root.showShare"
    @click="showShareFun"
  ></span>
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
    },
    showShareFun(){
      console.log('分享');
      this.$emit('showShareFun')
    }
  },
}
</script>


<style lang="stylus">
@import "~style/mixin.styl"

.jinr-header
  position fixed
  left 0
  top 0
  z-index 100
  width 100%
  height 88px
  background-color #fff
  h1
    height 88px
    line-height @height
    font-size 34px
    text-align center
  i.arrow
    position absolute
    top 0
    left 0
    height 88px
    width @height
    padding 0  40px 0 0
    background url('../../../../images/title_arrow.png') no-repeat 40px center
    background-size  (25*0.8)px (45*0.8)px
  span.share
    position absolute
    top 0
    right 0
    height 88px
    width @height
    padding 0  40px 0 0
    background url('../../../../images/title_share.png') no-repeat 40px center
    background-size  (55*0.8)px (53*0.8)px
</style>

