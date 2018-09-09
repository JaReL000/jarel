<template>
   <div class="dialog-box" v-model="show">
      <div class="dialog-content-box">
         <div class="content">
            <div class="text">
               <p>卡券将发放至您的福利账户中，请及时</p>
               <p>使用，<span>7天</span>后过期哦！</p>
            </div>
            <div class="use-btn" @click="_goUse"></div>
            <div class="close-btn" @click="show=false"></div>
         </div>
      </div>
       <div class="dialog-mask"></div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      show: true
    };
  },
  methods:{
    _goUse(){
      console.log('去使用')
      this.$emit('GoUse')
    }
  },
  watch: {
    show(isSHow) {
      if (!isSHow) {
        this.$emit("input", false);
      }
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
      background: url("./images/dialog_bg.png") no-repeat 100%/100%;
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
          background:url('./images/bottom_section_closeBtn.png') no-repeat 100%/100%;
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


