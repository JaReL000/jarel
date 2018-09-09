<template>
  <div 
  :class="[
    `${prefix}-cell-group`,
    {
      [`${prefix}-hairline--top-bottom`]: isHairline
    }
  ]"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'jinr-cell-group',
  props: {
    isHairline: {
      type: Boolean,
      default: true
    },
    prefix: {
      type: String,
      default: 'jinr'
    }
  }
};
</script>
