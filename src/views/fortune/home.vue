<template>
<!--首页 -->
  <div class="fortune-home">
    <div class="home-name">
      姓名:<input type="text" placeholder="施主，请报上名来" v-model="text">
    </div>
    <div class="home-test" @click="checkFun()">马上测一测</div>
  </div>
</template>
<script>
   export default{
     data(){
       return{
         text:""
       }
     },
     mounted(){
      console.log(this.text)
     },
     methods:{
      //  点击测试
      checkFun(){
         this.$router.push({path: '/details',query:{userName:this.text}});
        console.log(this.text)
      }
     }
   }
</script>
<style>
body.html{
  margin: 0 auto;
  font-family: PingFang-SC-Heavy;
}
.fortune-home{
  width: 100%;
  /* height: 1334px; */
  background: #f8f4e6;
  background: url("./images/home.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
}
.fortune-home .home-name{
  width: 630px;
  height: 46px;;
  padding-top:1121px;
  margin: 0 auto;
  font-family: MicrosoftYaHei;
	font-size: 36px;
	line-height: 26px;
	color: #333129;
  border-bottom: 1px solid #908a7c;
}
.fortune-home .home-name>input{
  	font-family: MicrosoftYaHei;
    font-size: 36px;
    line-height: 26px;
    color: #908a7c;
    border: 0;
    background: transparent;
    outline:none;
}
.fortune-home .home-test{
  width: 624px;
	height: 122px;
	background-color: #d65245;
  background: url("./images/botton.png") no-repeat center center/100% 100%;
	font-size: 42px;
	line-height: 122px;
  text-align: center;
	color: #ebdec2;
  margin: 25px auto 0;
}
</style>


