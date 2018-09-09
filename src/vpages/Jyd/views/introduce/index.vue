<template>
<div class="asset x-header-top">
    <div class="head">
        <ul>
            <li :class="{active:tabIndex==0}" @click="tabIndex=0">项目信息<div></div></li>
            <li :class="{active:tabIndex==1}" @click="tabIndex=1">投资记录  <div></div></li>
            <li :class="{active:tabIndex==2}"  @click="tabIndex=2">审核资料 <div></div></li>
        </ul>
    </div>
    <tb1 v-if="tabIndex==0"></tb1>
    <tb2 v-if="tabIndex==1"></tb2>
    <tb3 v-if="tabIndex==2"></tb3>
 
</div>
</template>
<script>
import tb1 from "./tabOne";
import tb2 from "./tabTwo";
import tb3 from "./tabThree"

export default {
  data() {
    return {
      tabIndex: ""
    };
  },
  components: {
      tb1,
      tb2,
      tb3
  }
};
</script>
<style lang="scss">
.head {
  width: 749px;
  height: 90px;
  background-color: #ffffff;
  text-align: center;
  ul {
    li {
      float: left;
      font-size: 28px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 44px;
      letter-spacing: 0px;
      color: #666666;
      width: 33%;
    }
    .active {
      font-size: 30px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 44px;
      letter-spacing: 0px;
      color: #0c72e3;
      text-align: center;
      div {
        width: 30px;
        height: 4px;
        background-color: #0c72e3;
        border-radius: 2px;
        margin: auto;
      }
    }
  }
}

</style>

