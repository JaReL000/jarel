<style lang="stylus" rel="stylesheet/stylus">
#app
  width 100%
  height 100%
  /*overflow: hidden;*/

html,body
    width 100%
    height 100%
    /*overflow: hidden;*/
    background #f43635

body>a
  display none
</style>

<template>
    <div id="app">
      <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: "apps"
};
</script>


