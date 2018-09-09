<template>
   <div class="dialog-box" v-model="show" @click="close">
      <div class="dialog-content-box">
         <div class="content">
             <h5>投资产品:{{data.product_name}}</h5>
             <h5>投资利率:{{data.rate_init}}</h5>
             <h5>投资金额:{{data.trade_money}}</h5>
             <h5>卡券id:{{data.couponid}}</h5>
             <h5>预计到期收益:{{data.prospective_coupon_yield}}</h5>
             <h5>投资时间:{{data.trade_time}}</h5>
             <h5>到期时间:{{data.end_time}}</h5>
             <!-- <h5>{{url}}</h5> -->
         </div>
      </div>
       <div class="dialog-mask"></div>
    </div>
</template>
<script>
export default {
  props:{
    data:{}
  },
  data() {
    return {
      show: true
    };
  },
  created(){
    this.url = window.location
  },
  methods:{
    close(){
      this.show=false
      console.log('触发了')
    }
  },
  watch: {
    show(isSHow) {
      if (!isSHow) {
        this.$emit("input", false);
      }
    },
    data(va){
      console.log('va',  va)
    }
  }
};
</script>
style.<style lang="scss">
.dialog-box {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .dialog-content-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -100px;
    > div.content {
      width: 540px;
      height: 525px;
      background: hotpink;
      // background: url("./images/dialog_bg.png") no-repeat 100%/100%;
      position: relative;
      div {
        position: absolute;
        // background: hotpink;
        width:100%;
        text-align: center;
        font-size:28px;
        &.use-btn {
          width: 341px;
          height: 74px;
          margin: 0 auto;
          bottom:74px;
          left: 50%;
          transform: translateX(-50%);
        }
        &.text {
          bottom: 184px;
          color:#fff;
          p>span{
            color:#ffbb4e;
            font-size:30px;
          }
        }
        &.close-btn{
          width:98px;
          height:98px;
          // background:url('./images/bottom_section_closeBtn.png') no-repeat 100%/100%;
          bottom:-172px;
          left:50%;
          transform:translateX(-50%);
        }
      }
    }
  }
  .dialog-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
  }
}
</style>


