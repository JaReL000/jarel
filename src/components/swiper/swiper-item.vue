<template>
  <div class="jinr-swiper-item minirefresh-wrap" :id="idName">
    <div class="minirefresh-scroll">
       <!-- 容器中的内容必须要用一个父盒子包起来 -->
       <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'jinr-swiper-item',
  props:{
    idName:{
      type:String
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$parent.rerender()
    })
  },
  beforeDestroy () {
    const $parent = this.$parent
    this.$nextTick(() => {
      $parent.rerender()
    })
  }
}
</script>
