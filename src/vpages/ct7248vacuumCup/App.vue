<template>
  <div id="app">
    <headers :title = "{name: $root.title}"></headers>
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
body,
html 
  height 100%
  width 100%
  #app
    width 100%
    height 100%
   
   
/*********** 适配pc ***********/
html body {
  max-width: 980px;
  margin: 0 auto
}
</style>
