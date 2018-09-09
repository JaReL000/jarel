<template>
  <div 
    class="list-view" 
    ref="list" 
    @scroll="handleScroll">
    <div     
      class="list-view-phantom"       
      :style="{
         height: contentHeight + 'px'
      }">
    </div>
    <div
      ref="content"
      class="list-view-content">
      <div
        class="list-view-item"
        :style="{
          height: getItemSizeAndOffset(startIndex + index).size + 'px'
        }"
        :key="index"
        v-for="(item, index) in visibleData">
        {{ item.value }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListView',
  props: {
  	data: {
    	type: Array,
      required: true
    },

    // 还没计算高度的元素进行一个预估
    estimatedItemSize: {
      type: Number,
      default: 30
    },

    /**
     * 获取每个列表项的高度
     */
    itemSizeGetter: {
      type: Function
    }
  },
  data() {
    return {
      // 最后的测量指标
      lastMeasuredIndex: -1,
      startIndex: 0,
      sizeAndOffsetCahce: {}, //存储缓存结果
      visibleData: []
    };
  },
  
  computed: {
    /**
     * 滚动区域的真正高度
     * 
     **/
    contentHeight() {
			const { data, lastMeasuredIndex, estimatedItemSize } = this;
      let itemCount = data.length;
      if (lastMeasuredIndex >= 0) {
        const lastMeasuredSizeAndOffset = this.getLastMeasuredSizeAndOffset();
        return lastMeasuredSizeAndOffset.offset + lastMeasuredSizeAndOffset.size + (itemCount - 1 - lastMeasuredIndex) * estimatedItemSize;
      } else {
        return itemCount * estimatedItemSize;
      }
    }
  },

  mounted() {
    this.updateVisibleData();
  },


  methods: {
    /**
     * 获取项目大小和偏移量
     */
  	getItemSizeAndOffset(index) {
      const { lastMeasuredIndex, sizeAndOffsetCahce, data, itemSizeGetter } = this;
      if (lastMeasuredIndex >= index) {
        return sizeAndOffsetCahce[index] || { offset: 0, size: 0 };
      }

      let offset = 0;
      if (lastMeasuredIndex >= 0) {
        const lastMeasured = sizeAndOffsetCahce[lastMeasuredIndex];
        if (lastMeasured) {
          offset = lastMeasured.offset + lastMeasured.size;
        }
      }

      for (let i = lastMeasuredIndex + 1; i <= index && i < data.length; i++) {
        const item = data[i];
        const size = itemSizeGetter.call(null, item, i);
        sizeAndOffsetCahce[i] = {
          size,
          offset
        };
        offset += size;
      }
      this.lastMeasuredIndex = Math.min(index, data.length - 1);
      return sizeAndOffsetCahce[index] || { offset: 0, size: 0 };
    },
    
    /**
     * 计算过高度的列表项的高度和
     */
    getLastMeasuredSizeAndOffset() {
      return this.lastMeasuredIndex >= 0 ? this.sizeAndOffsetCahce[this.lastMeasuredIndex] : { offset: 0, size: 0 };
    },

    /**
     * 
     * 使用过缓存的虚拟列表实际上还有优化的空间，
     * 比如 findNearestItemIndex 的搜索方式是顺序查找的，时间复杂度为 O(N)。
     * 实际上列表项的计算结果天然就是一个有序的数组，
     * 可以使用二分查找来优化已缓存的结果的搜索性能，把时间复杂度降低到 O(lgN) 。
     */
    binarySearch(low, high, offset) {
      let index;

      while (low <= high) {
        const middle = Math.floor((low + high) / 2);
        const middleOffset = this.getItemSizeAndOffset(middle).offset;
        if (middleOffset === offset) {
          index = middle;
          break;
        } else if (middleOffset > offset) {
          high = middle - 1;
        } else {
          low = middle + 1;
        }
      }

      if (low > 0) {
        index = low - 1;
      }

      if (typeof index === 'undefined') {
        index = 0;
      }

      return index;
    },

    exponentialSearch(scrollTop) {
      let bound = 1;
      const data = this.data;
      const start = this.lastMeasuredIndex >= 0 ? this.lastMeasuredIndex : 0;
      while (start + bound < data.length && this.getItemSizeAndOffset(start + bound).offset < scrollTop) {
        bound = bound * 2;
      }
      return this.binarySearch(start + Math.floor(bound / 2), Math.min(start + bound, data.length), scrollTop);
    },

    /**
     * 查找最近项索引  对于已缓存的结果使用二分查找
     */
    findNearestItemIndex(scrollTop) {
      console.log(scrollTop)
      const { data } = this;
      const lastMeasuredOffset = this.getLastMeasuredSizeAndOffset().offset;
      if (lastMeasuredOffset > scrollTop) {
        return this.binarySearch(0, this.lastMeasuredIndex, scrollTop);
      } else {
      	return this.exponentialSearch(scrollTop);
      }
    },

    /**
     * 更新可视区数据虚拟列表
     * 
     */
  	updateVisibleData(scrollTop) {
    	scrollTop = scrollTop || 0;
      const start = this.findNearestItemIndex(scrollTop);
      const end = this.findNearestItemIndex(scrollTop + this.$el.clientHeight) + 1;
      this.visibleData = this.data.slice(start, Math.min(end + 1, this.data.length));
      this.startIndex = start;
      this.$refs.content.style.webkitTransform = `translate3d(0, ${ this.getItemSizeAndOffset(start).offset }px, 0)`;
      // this.$refs.content.style.paddingTop = `${ this.getItemSizeAndOffset(start).offset }px`;
    },

    handleScroll() {
      const scrollTop = this.$el.scrollTop;
      this.updateVisibleData(scrollTop);
    }
  }
}
</script>

<style lang="stylus">

.list-view{
  // height: 400px;
  overflow: auto;
  // position: relative;
  color: #333;
  border: 1px solid #aaa;
}

.list-view-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.list-view-content 
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  // div:nth-child(even)
  //   background-color red
  div
    background-color red


.list-view-item {
  padding: 5px;
  color: #666;
  line-height: 144px;
  box-sizing: border-box;
}


</style>

