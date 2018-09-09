<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

</style>

<template>
  <router-view></router-view>
</template>

<script>
  export default {
    components: {},
    data() {
      return {}
    },
    beforeRouteEnter(to, from, next){
      next(vm =>{
        vm.$root.title = to.name
      })
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {},
  }
</script>
