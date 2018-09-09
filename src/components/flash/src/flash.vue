<template>
  <transition name="jinr-flash-pop">
    <div
      class="jinr-flash"
      v-show="visible"
      :class="customClass"
      :style="{ 'padding': iconClass === '' ? padding(24) : padding(30) }">
      <i
        class="jinr-flash-icon"
        :class="iconClass"
        v-if="iconClass !== ''"
      ></i>
      <span
        class="jinr-flash-text"
        :style="{ 'padding-top': iconClass === '' ? '0' : padding(10) }"
        v-text="message"
      ></span>
    </div>
  </transition>
</template>

<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.jinr-flash
  position fixed
  min-width 50%
  max-width 80%
  border-radius rem(5)
  background rgba(0, 0, 0, 0.7)
  color #fff
  box-sizing border-box
  text-align center
  z-index 300000
  transition opacity .3s linear
  &.jinr-flash-pop-enter, &.jinr-flash-pop-leave-active
    opacity 0
  &.is-placetop
    top rem(50)
    left 50%
    transform translate(-50%, 0)
  &.is-placemiddle
    left 50%
    top 50%
    transform translate(-50%, -50%)
  &.is-placebottom
    bottom rem(110)
    left 50%
    transform translate(-50%, 0)
  &-icon
    display block
    text-align center
    font-size rem(56)
  &-text
    font-size rem(32)
    display block
    text-align center

</style>

<script type="text/babel">
  export default {
    props: {
      message: String,
      className: {
        type: String,
        default: ''
      },
      position: {
        type: String,
        default: 'middle'
      },
      iconClass: {
        type: String,
        default: ''
      }
    },

    data() {
      return {
        visible: false,
      };
    },

    computed: {
      customClass() {
        var classes = [];
        switch (this.position) {
          case 'top':
            classes.push('is-placetop');
            break;
          case 'bottom':
            classes.push('is-placebottom');
            break;
          default:
            classes.push('is-placemiddle');
        }
        classes.push(this.className);

        return classes.join(' ');
      }
    },
    methods: {
      padding(val){
        val = (val/75).toFixed(4)+'rem'
        return val
      }
    }
  };
</script>
