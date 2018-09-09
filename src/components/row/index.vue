<template>
  <div 
    :class="`${prefix}-row`" 
    :style="style">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'jinr-row',

  props: {
    prefix: {
      type: String,
      default: 'jinr'
    },
    gutter: {
      type: [Number, String],
      default: 0
    }
  },

  computed: {
    style() {
      const margin = `-${Number(this.gutter) / 2}px`;
      return this.gutter
        ? { marginLeft: margin, marginRight: margin }
        : {};
    }
  }
};
</script>
<style lang="stylus">
@import "~style/index.styl"

{$prefix}-row {
  &:after {
    content: "";
    display: table;
    clear: both;
  }
}
</style>

