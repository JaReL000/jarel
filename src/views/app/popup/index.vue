<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

html
  background transparent 
  // background-color rgba(0,0,0, 0.2)
body
  background transparent 
.popup
  background transparent 
  background-color transparent
  
</style>
<template>
  <div class="popup fixed"> 
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        topList: []
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {},
  }
</script>
