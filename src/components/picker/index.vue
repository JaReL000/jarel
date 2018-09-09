<template>
  <div class="van-picker">
    <div class="van-picker__toolbar van-hairline--top-bottom" v-show="showToolbar">
      <slot>
        <a href="javascript:void(0)" class="van-picker__cancel" @click="handlePickerCancel">取消</a>
        <a href="javascript:void(0)" class="van-picker__confirm" @click="handlePickerConfirm">完成</a>
        <div v-if="title" class="van-picker__title">{{ title }}</div>
      </slot>
    </div>
    <div class="van-picker__columns" :class="['van-picker__columns--' + columns.length]">
      <van-picker-column
        v-for="(item, index) in columns"
        :key="index"
        v-model="values[index]"
        :values="item.values"
        :class-name="item.className"
        :itemHeight="itemHeight"
        :visible-item-count="visibileColumnCount"
        :value-key="valueKey"
        @columnChange="columnValueChange(index)"
      />
      <div class="van-picker-center-highlight" :style="{ height: itemHeight + 'px', marginTop: -itemHeight / 2 + 'px' }"></div>
    </div>
  </div>
</template>

<script>
import PickerColumn from './picker-column';

const DEFAULT_ITEM_HEIGHT = 44;

export default {
  name: 'van-picker',

  components: {
    [PickerColumn.name]: PickerColumn
  },

  props: {
    /**
     * 每一列可见备选元素的个数
     */
    visibileColumnCount: {
      type: Number,
      default: 5
    },
    /**
     * 选中元素区高度
     */
    itemHeight: {
      type: Number,
      default: DEFAULT_ITEM_HEIGHT
    },
    /**
     * 对象数组，配置每一列显示的数据
     */
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    /**
     * 否在组件顶部显示一个toolbar
     */
    showToolbar: {
      type: Boolean,
      default: false
    },
    /**
     * 顶部toolbar 显示的title
     */
    title: String,
    valueKey: String
  },

  computed: {
    values() {
      const columns = this.columns || [];
      const values = [];

      columns.forEach(column => {
        values.push(column.value || column.values[column.defaultIndex || 0]);
      });

      return values;
    }
  },

  methods: {
    handlePickerCancel() {
      this.$emit('cancel', this.values);
    },
    handlePickerConfirm() {
      this.$emit('confirm', this.values);
    },
    /**
     * 处理列`change`事件
     */
    columnValueChange(index) {
      this.$emit('change', this, this.values, index);
    },

    /**
     * 获取对应索引的列的实例
     */
    getColumn(index) {
      const children = this.$children.filter(child => child.$options.name === 'van-picker-column');
      return children[index];
    },

    /**
     * 获取对应列中选中的值
     */
    getColumnValue(index) {
      const column = this.getColumn(index);
      return column && column.values[column.valueIndex];
    },

    /**
     * 设置对应列中选中的值
     */
    setColumnValue(index, value) {
      const column = this.getColumn(index);
      if (column) {
        column.currentValue = value;
      }
    },

    /**
     * 获取对应列中所有的备选值
     */
    getColumnValues(index) {
      const column = this.getColumn(index);
      return column && column.currentValues;
    },

    /**
     * 设置对应列中所有的备选值
     */
    setColumnValues(index, values) {
      const column = this.getColumn(index);
      if (column) {
        column.currentValues = values;
      }
    },

    /**
     * 获取所有列中被选中的值，返回一个数组
     */
    getValues() {
      return this.values;
    },

    /**
     * `values`为一个数组，设置所有列中被选中的值
     */
    setValues(values) {
      values.forEach((value, index) => {
        this.setColumnValue(index, value);
      });
    }
  }
};
</script>

<style lang="less">
.van-picker {
  overflow: hidden;
  background-color: white;

  &__toolbar {
    height: 80px;
    line-height: 80px;
    overflow: hidden;
    padding: 0 15px;
  }

  &__cancel {
    color: #3388FF;
    font-size: 30px;
    float: left;
  }

  &__confirm {
    color: #3388FF;
    font-size: 30px;
    float: right;
  }

  &__title {
    height: 40px;
    padding: 0 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    word-break: break-all;
    text-align: center;
  }

  &__columns {
    position: relative;
    overflow: hidden;

    &--1 {
      .van-picker-column {
        width: 100%;
      }
    }

    &--2 {
      .van-picker-column {
        width: 50%;
      }
    }

    &--3 {
      .van-picker-column {
        width: 33.333%;
      }
    }

    &--4 {
      .van-picker-column {
        width: 25%;
      }
    }

    &--5 {
      .van-picker-column {
        width: 20%;
      }
    }
  }

  .van-picker-center-highlight {
    box-sizing: border-box;
    position: absolute;
    left: 0;
    width: 100%;
    top: 50%;
    margin-top: -18px;
    pointer-events: none;
  }

  .van-picker-center-highlight:before,
  .van-picker-center-highlight:after {
    content: '';
    position: absolute;
    height: 1px;
    width: 100%;
    background-color: #eaeaea;
    display: block;
    transform: scaleY(0.5);
  }

  .van-picker-center-highlight:before {
    left: 0;
    top: 0;
    bottom: auto;
    right: auto;
  }

  .van-picker-center-highlight:after {
    left: 0;
    bottom: 0;
    right: auto;
    top: auto;
  }

  &-column {
    font-size: 28px;
    overflow: hidden;
    position: relative;
    max-height: 100%;
    float: left;
    text-align: center;

    &__item {
      height: 44px;
      line-height: 44px;
      padding: 0 10px;
      white-space: nowrap;
      position: relative;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #707274;
      left: 0;
      top: 0;
      width: 100%;
      box-sizing: border-box;
      transition-duration: .3s;

      &--selected {
        color: black;
      }
    }
  }

  .picker-column-wrapper {
    transition-duration: 0.3s;
    transition-timing-function: ease-out;
  }

  .picker-column-wrapper.dragging,
  .picker-column-wrapper.dragging .picker-item {
    transition-duration: 0s;
  }
}
</style>

