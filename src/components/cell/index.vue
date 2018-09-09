<template>
  <a 
    :class="[
      `${prefix}-cell`, 
      `${prefix}-hairline`, 
      { [`${prefix}-cell--required`]: required }
    ]" 
    :href="url"
    @click="$emit('click')">
    <div
      :class="`${prefix}-cell__title`"
      v-if="$slots.title || title"
    >
      <slot name="icon">
        <i 
          v-if="icon" 
          :class="[
            `${prefix}-icon`, 
            `${prefix}-icon-${icon}`
          ]" 
        ></i>
      </slot>
      <slot name="title">
        <span 
          :class="`${prefix}-cell__text`" 
          v-text="title"
        ></span>
        <span 
          :class="`${prefix}-cell__label`" 
          v-if="label" 
          v-text="label"
        ></span>
      </slot>
    </div>
    <div
      v-if="value || $slots.default"
      :class="[
        `${prefix}-cell__value`,
        {
          [`${prefix}-cell__value--link`]: isLink,
          [`${prefix}__value--alone`]: !$slots.title && !title && !label,
          [`${prefix}-cell__value--border`]: isValueBorder
        }
      ]"
    >
      <slot>
        <span v-text="value"></span>
      </slot>
    </div>
    <slot name="right-icon">
      <!-- jr-cell__right-icon jr-icon -->
      <i :class="`${prefix}-cell-arrow`" v-if="isLink"></i>
      <i 
        :class="[
          `${prefix}-cell-radio`,
          {[`active`]: active,}
        ]" 
        v-if="isRadio"
        @click="userFun"
      ></i>
    </slot>
    <slot name="extra"></slot>
  </a>
</template>

<script>
export default {
  name: 'jinr-cell',

  props: {
    icon: String,
    title: String,
    value: [String, Number],
    url: String,
    label: String,
    isLink: Boolean,
    isValueBorder: Boolean,
    isHot: Boolean,
    isRadio: Boolean,
    required: Boolean,
    active: Number,
    prefix: {
      type: String,
      default: 'jinr'
    }
  },
  methods: {
    userFun(){
      this.$emit('userFun')
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~style/index.styl"
@import "~style/hairline.styl"

$white = #fff
$text-color = #333
$gray-darker = #999

{$prefix}-cell 
  position relative
  width: 100%;
  display: table;
  padding: 0px 30px 0px 0;
  box-sizing: border-box;
  line-height: 98px;
  background-color: $white;
  color: $text-color;
  font-size: 30px;
  overflow: hidden;
  &:not(:last-child)::after 
    border-bottom-width: 1px;
  &-group 
    padding-left: 30px;
    background-color: $white;
  &__title 
    display: table-cell;
    min-width: 155px;
    // max-width: 120px;
    max-width 90%
    // width: 155px;
    margin: 0;
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    {$prefix}-icon 
      margin-right: 5px;
      vertical-align: middle;
  &__text 
    vertical-align: middle;
  &__label 
    display: block;
    font-size: 24px;
    line-height: 1.2;
    color: $gray-darker;
  &__value 
    display: table-cell;
    text-align: right;
    vertical-align: middle;
    overflow: hidden;
    &--link 
      padding-right: 20px;
    &--border
      span 
        padding 8px 14px
        border 1px solid #0c72e3
        border-radius 6px
        color #0c72e3 !important
    &--alone 
      text-align: left;   
  &--required 
    overflow: visible;
    &::before 
      content: '*';
      position: absolute;
      left: -7px;
      font-size: 14px;
      color: $red;
  &__right-icon 
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    color: $gray-dark;
    font-size: 12px;
  &-arrow
    position: absolute
    top 40px
    right 32px
    display: inline-block;
    height 16px
    width @height
    border-width: 4px 4px 0 0;
    border-color: #C8C8CD;
    border-style: solid;
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0); 
  &-radio 
    position absolute
    top 50%
    right 20px
    transform translate3d(0%, -50%, 0)
    width 100px
    height @width 
    background url('./images/weixuanzhe@3x.png') no-repeat  center center
    background-size 44px 44px
    &.active
      background-image url('./images/xuanze@3x.png')  

</style>

