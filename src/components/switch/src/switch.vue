<template>
  <label class="mint-switch">
    <input 
      class="mint-switch-input" 
      :disabled="disabled" 
      @change="$emit('change', currentValue)" 
      type="checkbox" 
      v-model="currentValue"
    >
    <span class="mint-switch-core"></span>
    <div class="mint-switch-label"><slot></slot></div>
  </label>
</template>

<script>
/**
 * mt-switch
 * @module components/switch
 * @desc 切换按钮
 * @param {boolean} [value] - 绑定值，支持双向绑定
 * @param {slot} - 显示内容
 *
 * @example
 * <mt-switch v-model="value"></mt-switch>
 */
export default {
  name: 'mt-switch',

  props: {
    value: [Boolean, Number],
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  }
};
</script>

<style lang="stylus">

.mint-switch
  display: flex;
  align-items: center;
  position: relative;
  * 
    pointer-events: none;
  &-label 
    margin-left: 10px;
    display: inline-block;
    &:empty
      margin-left: 0;
  &-core 
    display: inline-block;
    position: relative;
    width 52*2px;
    height 32*2px
    border: 1px solid #d9d9d9;
    border-radius: 16*2px;
    box-sizing: border-box;
    background: #d9d9d9;
    &::after, &::before 
      content: " ";
      position: absolute 
      top 0
      left  0
      transition: transform .3s;
      border-radius: 15*2px;
    &::after 
      // size: 30px;
      width 30*2px
      height 30*2px
      background-color: #fff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
    &::before 
      // size: 50px 30px;
      width 50*2px;
      height 30*2px
      background-color: #fdfdfd;
  &-input 
    display: none;
    &:checked 
      + .mint-switch-core 
        border-color: #0c72e3;
        background-color: #0c72e3;
        &::before 
          transform: scale(0);
        &::after 
          transform: translateX(20*2px);

</style>
