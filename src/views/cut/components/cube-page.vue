<template>
  <div class="cube-page" :class="type">
    <header class="header">
      <h1>{{title}}</h1>
      <i @click="back" class="cubeic-back"></i>
    </header>
    <div class="wrapper">
      <section v-show="desc" class="desc"><slot name="desc">{{desc}}</slot></section>
      <main class="content">
        <slot name="content">{{content}}</slot>
      </main>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '',
        required: true
      },
      type: {
        type: String,
        default: ''
      },
      desc: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      }
    },
    methods: {
      back() {
        this.$router.back()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~stylus/variable.styl"

  .cube-page
    position: fixed
    z-index: 20
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: #efeff4
    .header
      position: relative
      height: 44*2px
      line-height: 44*2px
      text-align: center
      background-color: #f7f7f7
      box-shadow: 0 1*2px 6*2px #ccc
      -webkit-backface-visibility: hidden
      backface-visibility: hidden
      z-index: 99
      h1
        font-size: 16*2px
        font-weight: 700
      .cubeic-back
        position: absolute
        top: 0
        left: 0
        padding: 0 15*2px
        color: #fc9153
    .wrapper
      width: 100%
      height: calc(100% - 44*2px)
      overflow: auto
      -webkit-overflow-scrolling: touch
      .desc
        padding: 10*2px
        margin: 10*2px 0
        line-height: 20*2px
        font-size: 14*2px
      .content
        margin: 10*2px

    &.option-demo
      .wrapper
        background-color: $color-white
      .title
        font-size: $fontsize-large
        font-weight: 500
        color: $color-dark-grey
        padding: 15*2px
        border-bottom: 1*2px solid rgba(0, 0, 0, .1)
        margin-bottom: 15*2px
      .options
        margin-bottom: 15*2px
      .option-list
        .group
          margin-bottom: 15*2px
          border: 1*2px solid rgba(0, 0, 0, .1)
          border-radius: $radius-size-medium
        .item
          height: 52*2px
          border-bottom: 1*2px solid rgba(0, 0, 0, .1)
          &.sub
            font-size: $fontsize-medium
            background-color: $color-light-grey-opacity
            &.first
              box-shadow: 0 1*2px 1*2px 1*2px #eee inset
            &.last
              border-bottom: none
      .demo
        margin-bottom: 15*2px
        .scroll-list-wrap
          position relative
          height: 480*2px
          border: 1*2px solid rgba(0, 0, 0, .1)
          border-radius: 5*2px
          transform: rotate(0deg) // fix 子元素超出边框圆角部分不隐藏的问题
          overflow: hidden
      .methods
        .method-list
          .group
            margin-bottom: 15*2px
            border: 1*2px solid rgba(0, 0, 0, .1)
            border-radius: $radius-size-medium
          .item
          button
            height: 40*2px
            font-size: $fontsize-large
          .item
            background-color: $color-active-light-gray
            border-bottom: 1*2px solid rgba(0, 0, 0, .1)
          button
            width: 100%
            border-bottom-left-radius: $radius-size-medium
            border-bottom-right-radius: $radius-size-medium
            background-color: $color-orange
            box-shadow: 0 0 0 1*2px $color-orange
            border: none
            outline: none
            color: $color-white
</style>
