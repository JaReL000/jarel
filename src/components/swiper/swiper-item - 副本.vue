<template>
  <div class="jinr-swiper-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'jinr-swiper-item',
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
