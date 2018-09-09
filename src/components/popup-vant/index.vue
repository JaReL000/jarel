<template>
  <transition :name="currentTransition">
    <div v-show="currentValue" class="van-popup" :class="[position ? 'van-popup--' + position : '']">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import Popup from '../mixins/popup';
export default {
  name: 'van-popup',

  mixins: [Popup],

  props: {
    overlay: {
      default: true
    },

    lockOnScroll: {
      default: false
    },

    closeOnClickOverlay: {
      default: true
    },

    transition: {
      type: String,
      default: 'popup-slide'
    },

    position: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      currentValue: false,
      currentTransition: this.transition
    };
  },

  watch: {
    currentValue(val) {
      this.$emit('input', val);
    },

    value(val) {
      this.currentValue = val;
    }
  },

  beforeMount() {
    if (this.transition !== 'popup-fade') {
      this.currentTransition = `popup-slide-${this.position}`;
    }
  },

  mounted() {
    if (this.value) {
      this.currentValue = true;
      this.open();
    }
  }
};
</script>
<style lang="less">
.van {
  &-modal {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    transition: .5s ease-out;
  }

  &-popup {
    position: fixed;
    background-color: white;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    transition: .2s ease-out;

    &--top {
      width: 100%;
      top: 0;
      right: auto;
      bottom: auto;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
    }

    &--right {
      top: 50%;
      right: 0;
      bottom: auto;
      left: auto;
      transform: translate3d(0, -50%, 0);
    }

    &--bottom {
      width: 100%;
      top: auto;
      bottom: 0;
      right: auto;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
    }

    &--left {
      top: 50%;
      right: auto;
      bottom: auto;
      left: 0;
      transform: translate3d(0, -50%, 0);
    }
  }
}

.popup-slide-top-enter,
.popup-slide-top-leave-active {
  transform: translate3d(-50%, -100%, 0);
}

.popup-slide-right-enter,
.popup-slide-right-leave-active {
  transform: translate3d(100%, -50%, 0);
}

.popup-slide-bottom-enter,
.popup-slide-bottom-leave-active {
  transform: translate3d(-50%, 100%, 0);
}

.popup-slide-left-enter, .popup-slide-left-leave-active {
  transform: translate3d(-100%, -50%, 0);
}

.popup-fade-enter, .popup-fade-leave-active {
  opacity: 0;
}

</style>
