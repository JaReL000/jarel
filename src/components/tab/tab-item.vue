<template>
  <div
    :class="[
      `${prefix}-tab-item`,
      currentSelected ? activeClass : '', 
      {
        [`${prefix}-tab-selected`]: currentSelected, 
        [`${prefix}-tab-disabled`]: disabled
      }
    ]"
    :style="style"
    @click="onItemClick">
    <slot></slot>
    <span
      :class=`${prefix}-tab-item-badge`
      :style="{background: badgeBackground, color: badgeColor}"
      v-if="typeof badgeLabel !== 'undefined' && badgeLabel !== ''"
    >{{ badgeLabel }}</span>
  </div>
</template>

<script>
import { childMixin } from 'utils/multi-items'

export default {
  name: 'jinr-tab-item',
  mixins: [childMixin],
  props: {
    activeClass: String,
    disabled: Boolean,
    badgeBackground: {
      type: String,
      default: '#f74c31'
    },
    badgeColor: {
      type: String,
      default: '#fff'
    },
    badgeLabel: String,
    prefix: {
      type: String,
      default: 'jinr'
    }
  },
  computed: {
    style () {
      return {
        borderWidth: this.$parent.lineWidth + 'px',
        borderColor: this.$parent.activeColor,
        color: this.currentSelected ? this.$parent.activeColor : this.disabled ? this.$parent.disabledColor : this.$parent.defaultColor,
        border: this.$parent.animate ? 'none' : 'auto'
      }
    }
  }
}
</script>
