<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"
  #headtop
    overflow hidden
    width 100%
    height 100px
    .headtop-con
      height 100%
      overflow hidden
      box-sizing border-box
      border-bottom 1px solid #e6e6e6
      a
        display block
        float left
        width 18px
        height 30px
        background url('../img/app_bg1.png') no-repeat center
        background-size 100% 100%
        margin 34px 260px 0 32px
      div
        float left
        height 100%
        line-height 100px
        font-size 37px
        color #333
        // font-weight 600
</style>
<template>
    <div id="headtop">
      <section class="headtop-con">
        <a href='javascript:;' @click="goBack"></a>
        <div>
          <slot></slot>
        </div>
      </section>
    </div>
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
    methods: {
      goBack(){
        this.$router.go(-1)
      }
    },
  }
</script>