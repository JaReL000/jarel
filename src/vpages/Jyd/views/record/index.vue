<template>
<div class="record x-header-top">
 交易记录

  
</div>
</template>

<script>

export default {
  // name: 'index',
  components: {},
  data() {
    return {
      
    }
  },
  computed: {},
  watch: {},
  created() {
    // this.initFun()
  },
  mounted() {},
  methods: {
    initFun(){
      this.$http("/jyd/userInvestList", {})
      .then((res) => {
        console.log(res);
      }).catch(error => {
        console.log(error);
      });
    },
    chageTabFun(index){
      let length = this.tabList.length
      for (let i = 0; i < length; i++) {
        this.tabList[i].active = false
      }
      if(this.tabList[index].active == false){
        this.tabList[index].active = true
      }
      
    }
  },
}
</script>


<style lang="stylus">
.record  
  background-color #f5f5f5
  


</style>

