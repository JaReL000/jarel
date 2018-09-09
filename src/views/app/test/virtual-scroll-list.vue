<template>
  <div class="fixed">
    <div class="scrollToIndex">
      <span class="indexSpan ceil">
          Start index:
          <input type="text" v-model.number.lazy="startIndex">
      </span>
    </div>
    <div class="changeHeight">
      <span>Index: </span>
      <input type="text" v-model.number="changeHeightIndex" class="ceil">
      <span>Height: </span>
      <input type="text" v-model.number="changeHeight" class="ceil">
      <button @click="eventChangeHeight">Apply</button>
    </div>
    <div class="counter">
      <span class="times">Request times: {{ times }}</span>
      <span class="count">Items count: ({{ times }} + 1) × 20 = {{ items.length }}</span>
    </div>
    <div class="listWrap">
      <!-- <VirtualList class="list"
          :size="50"
          :remain="6"
          :tobottom="toBottom"
      >
          <Item v-for="(udf, index) of items" :index="index" :key="index"></Item>
      </VirtualList> -->
      <VirtualList 
        ref="vsl" 
        :variable="getVariableHeight"
        :size="50"
        :remain="6"
        :totop="toTop"
        :tobottom="toBottom"
        :start="startIndex" 
        class="list"
      >
        <Item
          v-for="(item, index) of items"
          :key="index"
          :index="index"
          :height="item.height"
        ></Item>
      </VirtualList>
      <Loading class="list-loading" :loading="loading"></Loading>
    </div>
    <div class="source">View this demo source code</div>
  </div>
</template>

<script>
  import Item from './item.vue'
  import Loading from './loading.vue'
  import VirtualList from './virtual-list.js'
  import getItems from './getItems'
  const INIT_COUNT = 20

  // const getList = (length) => {
  //   return new Array(length)
  // }

  export default {
    name: 'VirtualScrollList',

    components: {
      Item, 
      VirtualList,
      Loading
    },

    data () {
      return {
        times: 0,
        loading: false,
        startIndex: 0,
        changeHeight: 0,
        changeHeightIndex: 0,
        // items: getList(20)
        count: INIT_COUNT,
        items: getItems(INIT_COUNT)
      }
    },
    methods: {
      getVariableHeight (index) {
        let target = this.items[index]
        return target && target.height
      },

      eventChangeHeight () {
        let height = this.changeHeight
        let index = this.changeHeightIndex
        let length = this.items.length

        if (!length) {
          return alert('empty list now.')
        }

        if (index < 0 || index !== parseInt(index, 10) || index >= length) {
          return alert(`please set a right index: 0 ~ ${length - 1} && int number.`)
        }

        if (height <= 0 || height !== parseInt(height, 10)) {
            return alert('please set a right height: greater than 0 && int number.')
        }

        this.items[index].height = height
        this.$refs.vsl.updateVariable(index)
      },
      toTop () {
        console.log('on the top')
      },
      toBottom () {
        if (!this.loading) {
          this.loading = true
          // Mock for requesting delay.
          setTimeout(() => {
              this.times++
              this.loading = false
              this.items = this.items.concat(getItems(INIT_COUNT))
          }, 2017)
        }
      }
    }
  }
</script>

<style>
  .counter {
        position: relative;
        padding-bottom: 20px;
    }
    .count {
        position: absolute;
        right: 0;
    }
    .listWrap {
        position: relative;
    }
    .list-loading {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
    }
    .list {
        background: #fff;
        border-radius: 3px;
        border: 1px solid #ddd;
        -webkit-overflow-scrolling: touch;
        overflow-scrolling: touch;
    }
    .source {
        text-align: center;
        padding-top: 20px;
    }
    .source a {
        color: #999;
        text-decoration: none;
        font-weight: 100;
    }
    @media (max-width: 640px) {
        .times, .count {
            display: block;
        }
        .count {
            position: relative;
        }
    }
</style>

