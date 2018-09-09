<template>
  <scroll ref="protocol" class="t-protocol fixed">
    <config
      :title="title"
    ></config>
  </scroll>
</template>

<script>
  import  Config  from  './components/config'
  export default {
    name: '',
    components: {
      Config
    },
    data() {
      return {}
    },
    computed: {
      title(){
        let productid = this.$route.query.productid || 2
        
        return this.productId[productid]
      }
    },
    beforeRouteEnter(to, from, next){
      next(vm =>{
        vm.$root.title = to.name
      })
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {},
  }
</script>
