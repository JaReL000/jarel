<template>
  <div
    :class="[
      `${prefix}-col`,
      {
        [`${prefix}-col-${span}`]: span,
        [`${prefix}-col-offset-${offset}`]: offset,
      }
    ]"
    :style="style"
    @click="goToUrl(url)"
  >
      <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'jinr-col',

  props: {
    span: [Number, String],
    offset: [Number, String],
    prefix: {
      type: String,
      default: 'jinr'
    },
    url: {
      type: String,

    },
    query: {
      type: Object,

    },
    name: {
      type: String,

    }
  },

  computed: {
    gutter() {
      return (this.$parent && Number(this.$parent.gutter)) || 0;
    },
    style() {
      const padding = `${this.gutter / 2}px`;
      return this.gutter
        ? { paddingLeft: padding, paddingRight: padding }
        : {};
    }
  },
  methods: {
    // 跳转路径
    // goToUrl(){
    //   let bool = !/http/.test(this.url)
    //   console.log(bool);
    //   return
    //   if(bool){

    //   }
    //   if(bool){
    //     this.$router.push(this.url)
    //     // this.routerPush(this.url)
    //   }
    // }
  }
};
</script>

<style lang="stylus">
@import "~style/index.styl"

{$prefix}-col 
  float: left;
  box-sizing: border-box;
  font-size 24px

for $num in (1..24)
  {$prefix}-col-{$num}  
    width: floor($num * 100% / 24, 3); 
  {$prefix}-col-offset-{$num} 
    margin-left: floor($num * 100% / 24); 


</style>

