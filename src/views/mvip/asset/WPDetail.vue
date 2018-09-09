<style lang="stylus" rel="stylesheet/stylus">
@import "../../../style/mixin.styl"

.wp-detail
  position fixed
  left 0
  top 0
  z-index 1
  width 100%
  height 100%
  background rgba(7, 17, 27, 0.6)
  text-align left
  .wp-detail-wrap
    position fixed
    left 50%
    top 50%
    width rem(580)
    padding rem(12) rem(0) 0
    border-radius rem(10)
    transform translate3d(-50%,-50%,0)
    background-color #fff
    h1
      margin 0 rem(40) rem(18)
      border-bottom 1px solid wordSecondColor
      text-align center
      line-height rem(92)
      font-size rem(34)
    ul
      margin 0 rem(56) rem(58)
      padding-left rem(36)
      background url("../assets/wp_detail_bg_data64.png") no-repeat left rem(20) \/ rem(14) rem(276)
      li
        margin-bottom rem(10)
        h3
          line-height rem(58)
          font-size rem(28)
          color mainColor
        p
          line-height rem(32)
          font-size rem(24)
          color huise
    .close
      border-top 1px solid wordSecondColor
      text-align center
      line-height rem(92)
      font-size rem(32)
      color mainColor
      border-radius 0 0 rem(10) rem(10)
      &:active
        background-color mainColor
        color baise

</style>

<template>

    <div class="wp-detail" ref="wpDetailMask" v-show="showDetail">
      <transition name="fate">
        <div class="wp-detail-wrap" v-if="showDetail">
          <h1>产品周期详情</h1>
          <ul>
            <li>
              <h3>投资</h3>
              <p>用户投资日为一个周期起点。</p>
            </li>
            <li>
              <h3>计息</h3>
              <p>资金于15:00前转入，当天计息，T+1日可查看收益；资金于15:00后转入，次日计息，T+2日可查看收益。</p>
            </li>
            <li>
              <h3>转出日</h3>
              <p>转出日指每周固定的某日可免费转出，平台根据用户首次转入当日设为转出日(周一~周日）</p>
            </li>
          </ul>
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
      showDetail: {
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
        this.$refs.wpDetailMask.addEventListener('touchmove', function(e) {
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
