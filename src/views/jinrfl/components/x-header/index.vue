<template>
  <div class="vux-header">
    <div class="vux-header-left">
      <slot name="overwrite-left">
        <transition :name="transition">
          <!-- {{ typeof _leftOptions.backText === 'undefined' ? "返回" : _leftOptions.backText}} -->
          <a
            class="vux-header-back"
            v-show="_leftOptions.showBack"
            @click="onClickBack"
          >{{ typeof _leftOptions.backText === 'undefined' ? "" : _leftOptions.backText}}</a>
        </transition>
        <transition :name="transition">
          <div
            class="left-arrow"
            @click="onClickBack"
            v-show="_leftOptions.showBack"
          ></div>
        </transition>
      </slot>
      <slot name="left"></slot>
    </div>
    <h1 class="vux-header-title" @click="$emit('on-click-title')">
      <slot>
        <transition :name="transition">
          <span v-show="title.name">{{title.name}}</span>
        </transition>
      </slot>
    </h1>
    <div class="vux-header-right">
      <a
        class="vux-header-more"
        @click="$emit('onClickMore')"
        v-if="rightOptions.showMore"
      ></a>
      <a
        class="vux-header-url"
        @click="$emit('onClickUrl', rightOptions.textUrl)"
        v-if="rightOptions.textCopy"
      >{{rightOptions.textCopy}}</a>
      <slot name="right"></slot>
    </div>
  </div>
</template>


<script>
import objectAssign from 'object-assign'

export default {
  name: 'x-header',
  props: {
    leftOptions: Object,
    title: {
      type: Object,
      default () {
        return {
          name: '',

        }
      }
    },
    transition: String,
    rightOptions: {
      type: Object,
      default () {
        return {
          showMore: false,
          textCopy: '',
          textUrl: '',
        }
      }
    }
  },
  computed: {
    _leftOptions () {
      return objectAssign({
        showBack: true,
        preventGoBack: false
      }, this.leftOptions || {})
    }
  },
  methods: {
    onClickBack () {
      if (this._leftOptions.preventGoBack) {
        this.$emit('on-click-back')
      } else {
        try {
          Jinr.finish()
        } catch (error) {
          // this.$router.go(-1)
          this.$router ? this.$router.back() : window.history.back()
        }

      }
    },
  }
}
</script>

<style lang="less">
@import './variable.less';

.vux-header {
  position: relative;
  padding: 3*2px 0;
  box-sizing: border-box;
  // background-color: @header-background-color;
  background-color: #fff;
   &:before {
    content: "";
    position: absolute;
    width: 100%;
    // height: 12*2px;
    // border: 1*2px solid #333; // @header-arrow-color
    // border-width: 1*2px 0 0 1*2px;
    // border-width: 1*2px 0 0 1*2px;
    // transform: rotate(315deg);
    // top: 8*2px;
    // left: 7*2px;
    height: 1px;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
    transform: scaleY(0.2);
  }
}
.vux-header .vux-header-title,.vux-header h1 {
  margin: 0 88*2px;
  line-height: 40*2px;
  text-align: center;
  height: 40*2px;
  font-size: 18*2px;
  font-weight: 400;
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  // color: @header-title-color;
  color: #333;
}
.vux-header .vux-header-title > span {
  display: inline-block;
}
.vux-header .vux-header-left,.vux-header .vux-header-right {
  position: absolute;
  top: 0px;
  display: block;
  font-size: 14*2px;
  line-height: 21*2px;
  color: @header-text-color;
}
.vux-header .vux-header-left a,.vux-header .vux-header-left button,.vux-header .vux-header-right a,.vux-header .vux-header-right button {
  float: left;
  margin-right: 8*2px;
  color: @header-text-color;
}
.vux-header .vux-header-left a:active,.vux-header .vux-header-left button:active,.vux-header .vux-header-right a:active,.vux-header .vux-header-right button:active {
  opacity: .5
}
.vux-header .vux-header-left {
  left: 0px
}
.vux-header .vux-header-left .vux-header-back {
  padding-left: 16*2px;

}

.vux-header .vux-header-left .left-arrow {
  position: absolute;
  width: 30*4px;
  height: 30*3px;
  top: 0px;
  left: 0px;
  background: url('../../../../images/title_arrow.png') no-repeat 30px center;
  background-size: 25*0.8px 45*0.8px;

  // &:before {
  //   content: "";
  //   position: absolute;
  //   width: 12*2px;
  //   height: 12*2px;
  //   border: 1*2px solid #333; // @header-arrow-color
  //   border-width: 1*2px 0 0 1*2px;
  //   transform: rotate(315deg);
  //   top: 8*2px;
  //   left: 7*2px;
  // }
}
.vux-header .vux-header-right {
  right: 0px
}
.vux-header .vux-header-right a,.vux-header .vux-header-right button {
  margin-left: 8*2px;
  margin-right: 0
}
.vux-header .vux-header-right .vux-header-more {
  position: absolute;
  width: 30*4px;
  height: 30*3px;
  top: 0px;
  right: 0px;
  background:  url('../../../../images/title_share.png') no-repeat 30px center;
  background-size:  55*0.8px 53*0.8px;
}
.vux-header .vux-header-right .vux-header-url {
  position: absolute;
  width: 30*5px;
  height: 30*3px;
  top: 0px;
  right: 0px;
  line-height: 30*3.2px;
  background-size:  55*0.8px 53*0.8px;
  color: #333;
}
// .vux-header .vux-header-right .vux-header-more:after {
//   content: "\2022\0020\2022\0020\2022\0020";
//   font-size: 16*2px;
// }
.vux-header-fade-in-right-enter-active {
  animation: fadeinR .5s;
}
.vux-header-fade-in-left-enter-active {
  animation: fadeinL .5s;
}
@keyframes fadeinR {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  100% {
    opacity:1;
    transform:translateX(0);
  }
}
@keyframes fadeinL{
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
