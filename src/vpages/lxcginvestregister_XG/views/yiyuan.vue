<template>
   <div class="yiyuan-activity">
     <div class="main">
       <img src="../images/pic1.png" alt="">
       <div class="top-btn">
         <p>6月跟投用户平均收益已超过15%</p>
         <div class="btn" @click="goInvest">马上参与专家操盘计划 ></div>
       </div>
       <img class="pic2" src="../images/pic2.png" alt="">
       <img class="pic3" src="../images/pic3.png" alt="">
       <img src="../images/pic4.png" alt="">
     </div>
     <div id="footer" class="fixed-foot" v-show="searchBarFixed">
        <img src="../images/btn-fixed.png" alt="" @click="goInvest">
     </div>
   </div>
   
</template>
<script>
export default {
  name: "yiyuan",
  data() {
    return {
     searchBarFixed:''
    };
  },
  created() {
    
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  computed: {
   
  },
  methods: {
    handleScroll(){
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (this.scrollTop > 600) {
        this.searchBarFixed = true
      } else {
        this.searchBarFixed = false
      }
    },
    goInvest(){
      try {
        JinrStock.pushInvestPlan()
      } catch (error) {

      }
    }
  }
};
</script>
<style lang="scss">
body{
   background: #f7f8fa;
}
.yiyuan-activity{
  width:100%;
  height:100%;
  .main{
    width:100%;
    margin-bottom:166px;
    img{
      width:100%;
    }
    .top-btn{
      height: 200px;
      background: #ffffff;
      margin:20px 0;
      font-size: 26px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 33px;
      letter-spacing: 0px;
      color: #ff6429;
      text-align: center;
      p{
        padding-top:20px;
      }
      .btn{
        width:643px;
        height:70px;
        background: #fb671a;
        border: 1px solid #ffad67;
        border-radius: 18px;
        margin:20px auto;   
        color:#ffffff;
        line-height: 70px;
      }
    }
    .pic2{
      margin-bottom: 20px;
    }
    .pic3{
      margin-bottom:-5px;
    }
  }
  .fixed-foot{
    position:fixed;
    bottom: 0;
    z-index:999;
    width:100%;
    height: 146px;
    line-height: 146px;
    text-align: center;
    background: #ffffff;
    img{
      width:643px;
      height: 70px;
      vertical-align: middle;
    }
  }
}

</style>


