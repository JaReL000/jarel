<template>
  <div id="app">
   <headers :title = "{name: '周定期'}"></headers>
    <router-view></router-view>
  </div>
</template>

<script>
  import headers from './components/x-header/index'

  export default {
    name: 'carrousel',
    components: {
      headers,
    },
    data() {
      return {}
    },
    computed: {},
    created(){},
    mounted() {},
    methods: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app
  width 100%
  height 100%
  // overflow-x: hidden;

html,body
    width 100%
    height 100%
    overflow-x: hidden;
    background #fff
    -webkit-overflow-scrolling touch

body>a
  display none
</style>