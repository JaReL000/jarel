<template>
  <div :class="`${prefix}-slider`">
    <div
      :class="`${prefix}-swiper`"
      :style="{height: xheight}"
    >
      <slot></slot>
      <div
        :class="`${prefix}-swiper-item`"
        v-for="(item, index) in list"
        @click="clickListItem(item)"
        :data-index="index"
        :key="index">
        <a href="javascript:">
          <div
            :class="`${prefix}-img`"
            :style="{backgroundImage: buildBackgroundUrl(item.img)}"
          ></div>
          <p
            :class="`${prefix}-swiper-desc`"
            v-if="showDescMask"
          >{{item.title}}</p>
        </a>
      </div>
      <div
        :class="[
          `${prefix}-swiper-item`,
          `${prefix}-swiper-item-clone`
        ]"
        v-for="(item, index) in listTwoLoopItem"
        @click="clickListItem(item)"
        :data-index="index"
        :key="index"
        v-if="(listTwoLoopItem.length > 0)"
      >
        <a href="javascript:">
          <div
            :class="`${prefix}-img`"
            :style="{backgroundImage: buildBackgroundUrl(item.img)}"
          ></div>
          <p
            :class="`${prefix}-swiper-desc`"
            v-if="showDescMask"
          >{{item.title}}</p>
        </a>
      </div>
    </div>
    <div
      :class="[
        dotsClass,
        `${prefix}-indicator`,
        `${prefix}-indicator-${dotsPosition}`
      ]"
      v-show="showDots"
    >
      <a href="javascript:" v-for="(key, index) in length" :key="index">
        <i
          :class="[
            `${prefix}-icon-dot`,
            {'active': key - 1 === current}
          ]"
        ></i>
      </a>
    </div>
  </div>
</template>

<script>
import Swiper from './swiper.js'
import { go } from 'utils/router'

export default {
  name: 'jinr-swiper',
  created () {
    this.index = this.value || 0
    if (this.index) {
      this.current = this.index
    }
  },
  mounted () {
    this.hasTwoLoopItem()
    this.$nextTick(() => {
      if (!(this.list && this.list.length === 0)) {
        this.render(this.index)
      }
      this.xheight = this.getHeight()
    })
  },
  methods: {
    hasTwoLoopItem () {
      if (this.list.length === 2 && this.loop) {
        this.listTwoLoopItem = this.list
      }
    },
    clickListItem (item) {
      go(item.url, this.$router)
      this.$emit('on-click-list-item', JSON.parse(JSON.stringify(item)))
    },
    // buildBackgroundUrl (url) {
    //   let ishttps = 'https:' == document.location.protocol ? true: false;
    //   if(ishttps){
    //     url = url.replace("http", "https");
    //   }
    //   return `url(${url})`
    // },
    render (index = 0) {
      this.swiper && this.swiper.destroy()
      this.swiper = new Swiper({
        container: this.$el,
        direction: this.direction,
        auto: this.auto,
        loop: this.loop,
        interval: this.interval,
        threshold: this.threshold,
        duration: this.duration,
        height: this.height || this._height,
        minMovingDistance: this.minMovingDistance,
        imgList: this.imgList
      })
      .on('swiped', (prev, index) => {
        this.current = index % this.length
        this.index = index % this.length
      })
      if (index > 0) {
        this.swiper.go(index)
      }
    },
    rerender () {
      if (!this.$el || this.hasRender) {
        return
      }
      this.hasRender = true
      this.hasTwoLoopItem()
      this.$nextTick(() => {
        this.index = this.value || 0
        this.current = this.value || 0
        this.length = this.list.length || this.$children.length
        this.destroy()
        this.render(this.value)
      })
    },
    destroy () {
      this.hasRender = false
      this.swiper && this.swiper.destroy()
    },
    getHeight () {
      // when list.length > 0, it's better to set height or ratio
      const hasHeight = parseInt(this.height, 10)
      if (hasHeight) return this.height
      if (!hasHeight) {
        if (this.aspectRatio) {
          return this.$el.offsetWidth * this.aspectRatio + 'px'
        }
        // return '180px'
        return (370/75)+'rem'
      }
    }
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    showDots: {
      type: Boolean,
      default: true
    },
    showDescMask: {
      type: Boolean,
      default: true
    },
    dotsPosition: {
      type: String,
      default: 'right'
    },
    dotsClass: String,
    auto: {
      type: Boolean,
      default: false
    },
    loop: Boolean,
    interval: {
      type: Number,
      default: 3000
    },
    // 滚动距离开始触发
    threshold: {
      type: Number,
      // default: 350
      // default: window.innerWidth/2 || document.body.clientWidth/2
      default: window.innerWidth/5 || document.body.clientWidth/5
    },
    duration: {
      type: Number,
      default: 300
    },
    height: {
      type: [Function, String],
      default: 'auto'
    },
    aspectRatio: Number,
    minMovingDistance: {
      type: Number,
      default: 0
    },
    value: {
      type: [Number, String],
      // default: 0
    },
    prefix: {
      type: String,
      default: 'jinr'
    }
  },
  data () {
    return {
      hasRender: false,
      current: this.index || 0,
      xheight: 'auto',
      length: this.list.length,
      index: 0,
      // issue #1484 Fix click to fail
      listTwoLoopItem: []
    }
  },
  watch: {
    list (val) {
      this.rerender()
    },
    current (currentIndex) {
      this.index = currentIndex
      this.$emit('on-index-change', currentIndex)
    },
    index (val) {
      const _this = this
      if (val !== this.current) {
        this.$nextTick(() => {
          _this.swiper && _this.swiper.go(val)
        })
      }
      this.$emit('input', val)
    },
    value (val) {
      this.index = val
    }
  },
  beforeDestroy () {
    this.destroy()
  },
  computed: {
    isEnpty(){
      return (this.listTwoLoopItem.length > 0)
    }
  }
}

</script>

<style lang="stylus">
@import '~style/variable-less.styl'
@import "~style/index.styl"


{$prefix}-slider
  overflow: hidden;
  position: relative;
  {$prefix}-indicator,
  {$prefix}-indicator-right
    position: absolute;
    right: 15px;
    bottom: 10px;
    a
      float: left;
      margin-left: 10px;
      {$prefix}-icon-dot
        display: inline-block;
        vertical-align: middle;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        // background-color: #d0cdd1;
        background-color: rgba(255,255,255,0.4)
        &.active
          // background-color: $swiper-indicator-active-color
          background-color: #fff
  {$prefix}-indicator-center
    right: 50%;
    transform: translateX(50%)
  {$prefix}-indicator-left
    left: 15px;
    right: auto;
  {$prefix}-swiper
    overflow: hidden;
    position: relative;
  {$prefix}-swiper-item
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    // background:red;
    a
      display: block;
      width: 100%;
      height: 100%;
      {$prefix}-img
        display: block;
        width: 100%;
        height: 100%;
        background: center center no-repeat;
        background-size: cover;
      {$prefix}-swiper-desc
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 1.4em;
        font-size: 16px;
        padding: 20px 50px 12px 13px;
        margin: 0;
        // background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, .7) 100%);
        color: #fff;
        text-shadow: 0 1px 0 rgba(0, 0, 0, .5);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
</style>
