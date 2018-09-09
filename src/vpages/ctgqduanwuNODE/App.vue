<template>
  <div id="app">
    <headers :title = "{name: '当父亲节遇上端午节'}"></headers>
    <router-view></router-view>
  </div>
</template>

<script>
// import xHeader from "@/views/app/components/x-header/index";
import headers from './components/x-header/index'
import './plugin/jquery.min.js'
export default {
  name: "carrousel",
  components: {
    headers
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style  lang="stylus" rel="stylesheet/stylus">


  @import './style/animation.styl'; 
// a
//   display none
</style>

