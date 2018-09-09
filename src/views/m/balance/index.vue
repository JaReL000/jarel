<template>
  <transition name="fate" >
    <router-view></router-view>
  </transition>
</template>

<script>
  import jrBanner from '../components/JrBanner'
  export default {
    name: 'balance',
    components: {
      jrBanner
    },
    data() {
      return {
      }
    },
    computed: {

    },
    watch: {},
    created() {},
    mounted() {
      this.$messagebox.close()
    },
    methods: {
      goToPush(path){
        this.$router.push({
          path: path,
          query: {}
        })
        
      },

    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"
</style>
