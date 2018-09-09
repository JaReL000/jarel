<template>
   <div class="bottom-end">
      <p></p>
      <h4 v-text="text"></h4>
      <p></p>
   </div>
</template>
<script>
export default {
  props:{
    text:{
      type: String,
      default:'理财有风险，投资需谨慎'
    }
  }
}
</script>

<style lang="stylus" scoped>

div.bottom-end
  display:flex;
  align-items:center;
  margin 0 34px
  height 90px
  // padding-bottom 10px
  // background-color rgb(245,245,245)
  >p
    flex:1
    height:1px;
    background rgb(229,229,229)
  >h4
    // padding:0 28px;
    height:auto;
    padding 0 20px
    // background rgb(245,245,245);
    text-align: center;
    font-size: 26px;
    color #bdbdbd;


</style>
