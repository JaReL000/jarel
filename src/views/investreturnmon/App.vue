<style lang="stylus" rel="stylesheet/stylus">
#app
  width 100%
  height auto
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

<template>
    <div id="app">
      <headers :title = "{name: '投资返现'}"></headers>
      <router-view></router-view>
    </div>
</template>

<script>
// import {mapState} from 'vuex'
import headers from './components/x-header/index'
export default {
  name: "apps",
  components: {
    headers
  },
  computed: {

  }
};
</script>


