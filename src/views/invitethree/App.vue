<style lang="stylus" rel="stylesheet/stylus">
#app
  width 100%
  height 100%
  /*overflow: hidden;*/

html,body
    width 100%
    height 100%
    /*overflow: hidden;*/
    background #314eca

body>a
  display none
</style>

<template>
    <div id="app">
      <headers v-if="isApp" :title = "{name: '邀请好友享三重礼'}"></headers>
      <router-view></router-view>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import headers from './components/x-header/index'
export default {
  name: "apps",
  components: {
    headers
  },
  computed: {
    ...mapState(['isApp'])
  }
};
</script>


