<template>
   <div class="order-dogle">
     <div class="dogle-content" v-model="show">
          <p class="header"><span class="close" @click="show=false">×</span>查询职业类别</p>
          <div class="content">
            <keyboard
             :showKeyboard="true"
             
            ></keyboard>
          </div>
     </div>
   </div>
</template>
<script>
import keyboard from './keyboard'
export default {
  data() {
    return {
      show: true
    };
  },
  components:{
    keyboard
  },
  watch: {
    show(isShow) {
      if (!isShow) {
        this.$emit("input", false);
      }
    }
  }
};
</script>
<style lang="stylus">
.order-dogle {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;

  .dogle-content {
    position: absolute;
    bottom: 0;
    width: 100%;
    // height 873px
    background: white;

    .header {
      position: relative;
      text-align: center;
      line-height: 102px;
      font-size: 32px;
      border-bottom: 1px solid #cccccc;

      >span.close {
        position: absolute;
        left: 32px;
        top: -8px;
        font-size: 64px;
      }
    }
  }
}
</style>


