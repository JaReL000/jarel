<template>
  <scroll ref="contract" class="contract fixed">
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
        let productid = this.$route.query.productid
        return this.productId[productid]
      }
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {},
  }
</script>
