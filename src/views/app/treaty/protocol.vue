<template>
  <scroll ref="protocol" class="t-protocol fixed">
    <config
      :title="title"
    ></config>
  </scroll>
</template>

<script>
  import Config  from  'plugins/treaty/components/config'
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
    watch: {},
    created() {},
    mounted() {},
    methods: {
      initFun(){
        let data = {
          method: 'user.info.web',
          token: this.$root.appData.token,
        }

        this.$http(data).then((response) => {
          console.log(response);
          
          this.responseing = false
          this.list = response.list
          
        })
      }
    },
  }
</script>
