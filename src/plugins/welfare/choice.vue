<<<<<<< .mine
<template lang="pug">
  //选择卡券  .fixed
  div.choice
    div.choice-top
      h3 不使用卡券
      i.radio(
        :class="{active: topActive}"
        @click="noChoiceFun"
      )
    // bt滚动
    //- scroll(
    //-   :data="lists" 
    //-   class="scroll-cell" 
    //-   ref="cellist"
    //-   v-if="lists.length!==0"
    //- )
    div(
      class="scroll-cell" 
      ref="cellist"
      v-if="lists.length!==0"
    )
      cell( 
        :lists="lists"
        isChoice
        @choiceCouponFun="choiceCouponFun"
      )
        
</template>

<script>
import Cell from './cell'

export default {
  components: {
    Cell
  },
  props: {
    lists: {
      type: Array
    },
    isChoice: {
      type: [Boolean, String]
    },
  },
  data() {
    return {
      topActive: false,
      responseing: false,
      list: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    noChoiceFun(){
      this.$emit('noChoiceFun', '','','','','-1')  
    },

    // 选择卡券
    choiceCouponFun(couponName, couponId, couponType, couponMoney, index){
      console.log(couponName, couponId, couponType, couponMoney, index);
      
      this.$emit('choiceCouponFun', couponName, couponId, couponType, couponMoney, index)
    },
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~style/index"

.choice
  // height 100%;
  padding-top 20px
  // padding-bottom 80px
  background-color $color-light-grey-def
  &-top 
    height 100px
    line-height @height
    background-color $color-white
    h3 
      float left
      padding-left 34px
      font-size 30px
  // .scroll-cell
  //   height auto
  //   top 220px
  //   background transparent
     
</style>
=======
<template lang="pug">
  //选择卡券  .fixed
  div.choice
    div.choice-top
      h3 不使用卡券
      i.radio(
        :class="{active: topActive}"
        @click="noChoiceFun"
      )
    // bt滚动
    //- scroll(
    //-   :data="lists"
    //-   class="scroll-cell"
    //-   ref="cellist"
    //-   v-if="lists.length!==0"
    //- )
    div(
      class="scroll-cell"
      ref="cellist"
      v-if="lists.length!==0"
    )
      cell(
        :lists="lists"
        isChoice
        @choiceCouponFun="choiceCouponFun"
      )

</template>

<script>
import Cell from './cell'

export default {
  components: {
    Cell
  },
  props: {
    lists: {
      type: Array
    },
    isChoice: {
      type: [Boolean, String]
    },
  },
  data() {
    return {
      topActive: false,
      responseing: false,
      list: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    noChoiceFun(){
      this.$emit('noChoiceFun', '','','','','-1')
    },

    // 选择卡券
    choiceCouponFun(couponName, couponId, couponType, couponMoney, index){
      console.log(couponName, couponId, couponType, couponMoney, index);

      this.$emit('choiceCouponFun', couponName, couponId, couponType, couponMoney, index)
    },
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~style/index"

.choice
  // height 100%;
  padding-top 20px
  // padding-bottom 80px
  overflow scroll
  background-color $color-light-grey-def
  &-top
    height 100px
    line-height @height
    background-color $color-white
    h3
      float left
      padding-left 34px
      font-size 30px
  // .scroll-cell
  //   height auto
  //   top 220px
  //   background transparent

</style>
>>>>>>> .r561
