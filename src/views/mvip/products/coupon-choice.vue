<template >
<!-- 选择卡券  -->
<transition name="slide" >
  <div class="choice fixed" v-if="showCoupon">
    <div class="choice-top">
      <h3>不使用卡券</h3>
      <i 
        class="radio"
        :class="{active: topActive}"
        @click="notChoieFun(-1)"
      ></i>
    </div>
    <scroll 
      :data="couponList"  
      class="scroll-cell" 
      ref="cellist" 
      v-if="couponList.length!==0"
    >
      <cell
        v-if="couponList.length!==0 " 
        :lists="couponList"
        :isChoice="isChoice"
        @choiceCouponFun="choiceCouponFun"
      ></cell>
    </scroll>
    
  </div>  
</transition>    
</template>

<script>
import Cell from './cell'

export default {
  components: {
    Cell
  },
  props: {
    showCoupon: {
      type: Boolean,
      default: false
    },
    productid: {
      type: String
    },
    money: {
      type: [Number, String],
      default: 0
    },
    couponList: Array
  },
  data() {
    return {
      show: false,
      isChoice: true,
      topActive: false,
      responseing: false,
      lists: [
        {
          "cuserid": 2,
          "coupon_type": 1,
          "coupon_name": "定期加息券",
          "money": "4.50",
          "selected_name": "4.50%加息券",
          "description": "",
          "valid_time_end": "2017-09-08",
          "is_select": 1
        },
      ]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    
    // 不使用卡券
    notChoieFun(num){
      this.$emit('selectNameFun', num)
     
    },

    // 选择卡券
    choiceCouponFun(index){
      
      if(this.couponList[index].is_select){
        this.$emit('selectNameFun', index)
      }else{
        this.$flash('不能使用该卡券')
      }
      
    }
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~style/index"

.choice
  padding-top 20px
  padding-bottom 80px
  background-color $color-light-grey-def
  &-top 
    height 100px
    line-height @height
    background-color $color-white
    h3 
      float left
      padding-left 34px
      font-size 30px
  
</style>
