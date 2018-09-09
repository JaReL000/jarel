<style lang="stylus" rel="stylesheet/stylus">
@import "../../../style/mixin.styl"

.please
  position fixed
  left 0
  top 0
  width 100%
  height 100%
  background rgba(7, 17, 27, 0.6)
  text-align left
  .please-wrap
    position fixed
    left 50%
    top 50%
    width rem(552)
    border-radius rem(10)
    text-align center
    transform translate3d(-50%,-50%,0)
    background-color #fff
    color wordDfColor
    p.main
      padding rem(46) 0
      line-height rem(44)
      font-size rem(26)
    .close
      border-top 1px solid wordSecondColor
      line-height rem(92)
      font-size rem(32)
      color baise
      border-radius 0 0 rem(10) rem(10)
      background-color mainColor
      &:active
        background-color mainColor
        color baise

</style>

<template>

    <div class="please" ref="pleaseMask" v-show="showAlert">
      <transition name="fate">
        <div class="please-wrap" v-if="showAlert">
          <p class="main">
            更多产品线详情<br/>请前往APP查看
          </p>
          <div
            class="close"
            @click="closeFun"
          >知道了</div>
        </div>
      </transition>
    </div>

</template>

<script>
  export default {
    name: 'wp-detail',
    components: {},
    props: {
      warnInfo: {
        type: String,
        default: '未知错误, 请联系客服！'
      },
      showAlert: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {}
    },
    computed: {
    },
    watch: {},
    created() {},
    mounted() {
      this.$nextTick(() => {
        // 禁止滚动穿透
        this.$refs.pleaseMask.addEventListener('touchmove', function(e) {
          e.preventDefault();
        }, false);
      });
    },
    methods: {
      closeFun(){
        this.$emit('closeFun', false)
      }
    },
  }
</script>
