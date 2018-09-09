<template>
    <div :class="`table-title ${cls}`">
        <p v-for="(item,index) in items" v-text="item"></p>
    </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default() {
        return [];
      }
    },
    cls: {
      type: String,
      default: ""
    }
  }
};
</script>
<style lang="stylus">
div.table-title 
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  height: 116px;
  // line-height:116px;
  border-bottom: 1px solid rgb(209, 209, 209);
  p 
    flex: 1;
    height: 100%;
    border-right: 1px solid rgb(209, 209, 209);
    text-align: center;
    padding-top: 30px;
    font-size: 24px;
    box-sizing: border-box;
    &:last-child 
      border: none;
  &.second 
    p 
      &:first-child 
        flex: 0 1 200px;
      &:nth-child(2) 
        flex: 0 1 190px;
      &:nth-child(3) 
        flex: 0 1 150px;
      // &:nth-child() {
      //   flex: 0 1 140px;
      // }
  &.first 
    p 
      &:first-child 
        flex: 0 1 170px;
      &:nth-child(2) 
        flex: 0 1 150px;
      &:nth-child(3) 
        flex: 0 1 130px;
      &:nth-child(4) 
        flex: 0 1 100px;
      &:nth-child(5) 
        flex: 0 1 120px;

        
</style>


