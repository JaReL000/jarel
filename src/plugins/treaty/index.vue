<style lang="stylus" rel="stylesheet/stylus">
@import "~style/treaty.styl"

  
  
</style>

<template>
  <router-view></router-view>
</template>

<script>
  
  export default {
    data() {
      return {
      }
    },
    computed: {},
    watch: {},
    beforeRouteEnter(to, from, next){
      next(vm =>{
        vm.$root.title = to.name
      })
    },
    created() {},
    mounted() {},
    methods: {},
  }
</script>
