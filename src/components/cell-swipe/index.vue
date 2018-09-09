<template>
  <div
    v-clickoutside:touchstart="swipeMove"
    :class="`${prefix}-cell-swipe`"
    @click="swipeMove()"
    @touchstart="startDrag"
    @touchmove="onDrag"
    @touchend="endDrag"
    @touchcancel="endDrag"
  >
    <div
      :class="`${prefix}-cell-swipe__wrapper`"
      :style="wrapperStyle"
      @transitionend="swipe = false"
    >
      <div
        :class="`${prefix}-cell-swipe__left`"
        v-if="leftWidth">
        <slot name="left"></slot>
      </div>
      <slot></slot>
      <div
        :class="`${prefix}-cell-swipe__right`"
        v-if="rightWidth">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Clickoutside from 'utils/vant/clickoutside'

export default {
  name: 'jinr-cell-swipe',

  props: {
    leftWidth: {
      type: Number,
      default: 0
    },
    rightWidth: {
      type: Number,
      default: 0
    },
    prefix: {
      type: String,
      default: 'jinr'
    }
  },

  directives: {
    Clickoutside
  },

  data() {
    return {
      offset: 0
    };
  },

  computed: {
    wrapperStyle() {
      return {
        transform: `translate3d(${this.offset}px, 0, 0)`
      };
    }
  },

  methods: {
    resetSwipeStatus() {
      this.swiping = false; // 是否正在拖动
      this.opened = true; // 记录是否滑动左右 或者 注册
    },

    swipeMove(offset = 0) {
      this.offset = offset;
      offset && (this.swiping = true);
    },

    swipeLeaveTransition(direction) {
      const { offset, leftWidth, rightWidth } = this;
      // right
      if (direction > 0 && -offset > rightWidth * 0.4 && rightWidth > 0) {
        this.swipeMove(-rightWidth);
        this.resetSwipeStatus();
      // left
      } else if (direction < 0 && offset > leftWidth * 0.4 && leftWidth > 0) {
        this.swipeMove(leftWidth);
        this.resetSwipeStatus();
      } else {
        this.swipeMove();
      }
    },

    startDrag(event) {
      this.startX = event.changedTouches[0].pageX;
      this.startY = event.changedTouches[0].pageY;
    },

    onDrag(event) {
      if (this.opened) {
        !this.swiping && this.swipeMove();
        this.opened = false;
        return;
      }

      const offsetTop = event.changedTouches[0].pageY - this.startY;
      const offsetLeft = event.changedTouches[0].pageX - this.startX;
      if ((offsetLeft < 0 && -offsetLeft > this.rightWidth) ||
        (offsetLeft > 0 && offsetLeft > this.leftWidth) ||
        (offsetLeft > 0 && !this.leftWidth) ||
        (offsetLeft < 0 && !this.rightWidth)) {
        return;
      }

      const y = Math.abs(offsetTop);
      const x = Math.abs(offsetLeft);
      const swiping = !(x < 5 || (x >= 5 && y >= x * 1.73));
      if (swiping) {
        event.preventDefault();
        this.swipeMove(offsetLeft);
      };
    },

    endDrag() {
      if (this.swiping) {
        this.swipeLeaveTransition(this.offset > 0 ? -1 : 1);
      };
    }
  }
};
</script>

<style lang="stylus">
@import "~style/index.styl"


{$prefix}-cell-swipe {
  overflow: hidden;
  position: relative;

  &__wrapper,
  &__left,
  &__right {
    transition: transform .15s ease-in-out;
  }

  &__left,
  &__right {
    top: 0;
    height: 100%;
    position: absolute;
  }

  &__left {
    left: 0;
    transform: translate3d(-100%, 0, 0);
  }

  &__right {
    right: 0;
    transform: translate3d(100%, 0, 0);
  }
}

</style>

