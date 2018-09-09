<template>
   <div class="ct05hundredMillion" >
      <!-- <hd :title="{name:'新用户注册福利'}"></hd> -->
      <div class="content">
        <h3>恭喜你领取成功</h3>
        <div class="red-envelope">
            <div class="money" v-text="600+'元'"></div>
            <div class="bottom">
               <p class="title">- 红包说明 -</p>
               <p>订购投资计划可以使用</p>
               <p class="title">- 红包有效期 -</p>
               <p><span v-text="startTime"></span> - <span v-text="endTime"></span></p>
               <div class="btn" v-if="IsUse" @click="goUse">立即使用</div>
               <div class="btn used" v-else>已经过期</div>
            </div>
        </div>
      </div>
   </div>
</template>
<script>
export default {
  data() {
    return {
      IsUse:true,
      startTime:'',
      endTime:''
    }
  },
  mounted(){
    this.getDate()
  },
  methods:{
    goUse(){
      try {
        JinrStock.pushInvestPlan()
      } catch (error) {

      }

      console.log('去使用')
    },
    getDate(){
      let temp = new Date()
      this.startTime = `${temp.getFullYear()}/${temp.getMonth()+1<10?`0${temp.getMonth()+1}`:temp.getMonth()+1}/${temp.getDate()<10?`0${temp.getDate()}`:temp.getDate()}`;
      let temp2 = new Date(temp.setDate(temp.getDate()+15));
      console.log('temp2', temp2)
      this.endTime = `${temp2.getFullYear()}/${temp2.getMonth()+1<10?`0${temp2.getMonth()+1}`:temp2.getMonth()+1}/${temp2.getDate()<10?`0${temp2.getDate()}`:temp2.getDate()}`;
    }
  }
};
</script>
<style lang="scss">
.ct05hundredMillion {
  width: 100%;
  .content {
    position: relative;
    height: 1660px;
    background: url("./images/bg1.png") no-repeat 100%/100%;
    h3 {
      position: absolute;
      width: 100%;
      top: 90px;
      left: 0;
      text-align: center;
      font-size: 68px;
      color: #ff5300;
      font-weight: 900;
    }
    .red-envelope {
      position: absolute;
      top: 278px;
      width: 100%;
      text-align: center;
      div.money {
        font-size: 72px;
        color: #ff5300;
        font-weight: 900;
        line-height: 206px;
        margin-bottom: 30px;
        // margin:110px;
      }
      > .bottom {
        color: #fff7f5;
        font-size: 28px;
        // line-height: 50px;
        > .title {
          font-size: 21px;
          margin-top: 10px;
          line-height: 42px;
        }
        .btn{
          width:360px;
          height:80px;
          font-size:36px;
          background: #ffe13c;
          color:#000;
          margin:60px auto 0;
          line-height: 80px;
          text-align: center;
          border-radius: 40px;
        }
        .used{
          background: #a3a3a3;
          color:#515050;
        }
      }
    }
  }
}
</style>


