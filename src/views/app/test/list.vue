<template>
  <list-view 
    class="fixed"
    :item-size-getter="itemSizeGetter"
    :estimated-item-size="30"  
    :data="data"></list-view>
</template>

<script>
import ListView from './list-view'
export default {
    name: 'app',
    data () {
      const data = [];
      for (let i = 0; i < 100; i++) {
        data.push({ value: i });
      }
        return {
            data
        }
    },
    components: {
        ListView
    },
    methods: {
      itemSizeGetter(item) {
        return 30 + item.value % 10;
      }
    },
}
</script>






