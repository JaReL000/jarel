<template>
  <jinr-cell
    :title="label"
    :required="required"
    :class="['van-field', {
      'van-field--has-textarea': type === 'textarea',
      'van-field--nolabel': !label,
      'van-field--disabled': $attrs.disabled,
      'van-field--error': error,
      'van-field--border': border,
      'van-field--autosize': autosize,
      'van-field--has-icon': hasIcon,
      'van-hairline--surround': border
    }]">
    <textarea
      v-if="type === 'textarea'"
      v-bind="$attrs"
      ref="textarea"
      class="van-field__control"
      :value="value"
      @input="onInput"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
    />
    <input
      v-else
      v-bind="$attrs"  
      class="van-field__control"
      :type="type"
      :value="value"
      @input="onInput"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
    />
    <div
      v-if="hasIcon"
      v-show="$slots.icon || value"
      class="van-field__icon"
      @touchstart.prevent="onClickIcon"
    >
      <slot name="icon">
        <!-- <van-icon :name="icon" /> -->
      </slot>
    </div>
  </jinr-cell>
</template>

<script>
import Cell from '../cell';
// import Icon from '../icon';

const VALID_TYPES = ['text', 'number', 'email', 'url', 'tel', 'date', 'time', 'datetime', 'password', 'textarea'];

export default {
  name: 'van-field',

  components: {
    [Cell.name]: Cell,
    // [Icon.name]: Icon
  },

  props: {
    type: {
      type: String,
      default: 'text',
      validator: value => VALID_TYPES.indexOf(value) > -1
    },
    value: {},
    icon: String,
    label: String,
    error: Boolean,
    required: Boolean,
    border: Boolean,
    autosize: Boolean,
    onIconClick: {
      type: Function,
      default: () => {}
    }
  },

  watch: {
    value() {
      if (this.autosize && this.type === 'textarea') {
        this.$nextTick(this.adjustSize);
      }
    }
  },

  mounted() {
    if (this.autosize && this.type === 'textarea') {
      const el = this.$refs.textarea;
      el.style.height = el.scrollHeight + 'px';
      el.style.overflowY = 'hidden';
    }
  },

  computed: {
    hasIcon() {
      return this.$slots.icon || this.icon;
    }
  },

  methods: {
    onInput(event) {
      this.$emit('input', event.target.value);
    },

    onClickIcon() {
      this.$emit('click-icon');
      this.onIconClick();
    },

    adjustSize() {
      const el = this.$refs.textarea;
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    }
  }
};
</script>

<style lang="less">

.van-field {

  width: 100%;

  .van-cell__title,
  .van-cell__value {
    float: none;
    box-sizing: border-box;
  }

  .van-cell__title {
    width: 90px;
    position: absolute;
    top: 10px;
    left: 0;
  }

  .van-cell__value {
    width: 100%;
    padding-left: 90px;
  }

  &--has-textarea {
    .van-field__control {
      min-height: 60px;
      line-height: 60px;
      color: #000;
      &::-webkit-input-placeholder { 
        line-height: 100px;
      }
    }
    
    
      
  }

  &--nolabel {
    .van-cell__title {
      display: none;
    }

    .van-cell__value {
      width: 100%;
      padding-left: 0;
    }
  }

  &--disabled {
    .van-field__control {
      color: #666;
    }
  }

  &--error {
    .van-field__control {
      &,
      &::placeholder {
        color: red;
      }
    }
  }

  &--border {
    .van-field__control {
      padding-left: 10px;
    }

    &::after {
      border-radius: 2px;
    }
  }

  &--autosize {
    .van-field__control {
      min-height: 0;
    }
  }

  &--has-icon {
    .van-field__control {
      width: 90%;
    }
  }

  &__control {
    border: 0;
    font-size: 30px;
    line-height: 100%;
    height: 100%;
    padding: 0;
    display: block;
    width: 100%;
    resize: none;
  }

  &__icon {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate3d(0, -50%, 0);
    padding: 10px;
  }
}
</style>
