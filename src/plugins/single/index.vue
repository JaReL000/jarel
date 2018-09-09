<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.quzhong
  text-align center
  position absolute
  top 40% 
  left 50% 
  transform translate3d(-50%, -50%, 0)
  .top-404
    img 
      width 400px
      height auto
  p 
    font-size 30px
    line-height 120px
    // color #adadad
    color #999999
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
