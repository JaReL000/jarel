<template>
  <div class="yearinvest">
    <x-header>一键转入年定期福利</x-header>
    <div class="yearinvest_one">
      <ul v-if="this.cardList.length==3">
        <li v-for="(itme,index) in cardList" :key="index" v-if="itme.is_money==1">
          <p><span v-text="itme.money"></span>元</p>
          <p v-text="itme.walf_name"></p>
          <div v-text="itme.use_limit"></div>
          <p v-text="itme.interest_type"></p>
          <div class="jiahao">+</div>
        </li>
        <li v-else>
          <p>+<span v-text="itme.money"></span>%</p>
          <p v-text="itme.walf_name"></p>
          <div v-text="itme.use_limit"></div>
          <p v-text="itme.interest_type"></p>
          <div class="jiahao">+</div>          
        </li>
      </ul>
      <ul class="twoCard" v-else>
        <li v-for="(itme,index) in cardList" :key="index" v-if="itme.is_money==1">
          <p><span v-text="itme.money"></span>元</p>
          <p v-text="itme.walf_name"></p>
          <div v-text="itme.use_limit"></div>
          <p v-text="itme.interest_type"></p>
          <div class="jiahao">+</div>  
        </li>
        <li v-else>
          <p>+<span v-text="itme.money"></span>%</p>
          <p v-text="itme.walf_name"></p>
          <div v-text="itme.use_limit"></div>
          <p v-text="itme.interest_type"></p>
          <div class="jiahao">+</div>  
        </li>
      </ul>
    </div>
    <div class="yearinvest_two"></div>
    <div class="yearinvest_three"></div>
    <div class="go-to-top" v-show="to_top" @click="toTopFun"></div>
  </div>
</template>

<script>
  import xHeader from '@/views/app/components/x-header/index'
  import './plugin/jquery.min.js'
  import * as jrUrl from './urlconfig/urlconfig'  
  import jinrsdk from 'src/jinr-sdk/index'
  export default {
    name: 'carrousel',
    components: {
      xHeader,
    },
    data() {
      return {
        cardList:[
          // {money:"888",type:"理财红包",rule:"无门槛",conditionsUse:"自动计息"},
          // {money:"1.5",type:"加息券",rule:"无门槛",conditionsUse:"月定期"},
          // {money:"50",type:"现金抵扣券",rule:"满5000可用",conditionsUse:"年定期"},
        ],
        to_top:false,//回到顶部
        cardShow:false,//显示卡券数量
        token:""
      }
    },
    computed: {},
    created(){
      this.token = this.$JinrSDK.token;
    // ios客户端 存在bug 返回时无法获取token
    if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
      setTimeout(() => {
        this.token = this.$JinrSDK.token;
        this.getCardInfo()
        }, 500);
      }else{
        this.getCardInfo()
      }
    },
    mounted() {
      this.goTopFun()      

    },
    methods: {
      //顶部按钮显示
      goTopFun(){ 
        var that = this
        $(window).scroll(function(){
          if($(window).scrollTop()>1020){
            that.to_top = true
          }else{
            that.to_top = false
          }
        })
      },
      //回到顶部
      toTopFun(){
        // $(window).scrollTop(0)
        $("html,body").animate({scrollTop:0},800)
      },
      //获取卡券信息
      getCardInfo(){
        let data={
          v:"1.0.0",
          token:this.token
          // token:"5e08CAhSBlJRVAQDBVNdUVECU1VQCFcPA1tRDlcHBlBfBVwIMQEHAFNRUQBWCVkLVwICUgJUAQICDFNdUVdXBQcGXF0KawRSUFwZAwMcCAsUUgILVwQMAgIwBA"
        }
        this.$http('/app/safeToYearWelfare',data).then(res=>{
          this.cardList = res
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
body,
html 
  width 100%
  background #0fa7f6
  #app
    width 100%
    overflow hidden
  .yearinvest
    width 100%
    overflow hidden
    position relative
    .yearinvest_one
      width 100%
      height 1207px
      overflow hidden
      background url("./images/index_bg1.png") no-repeat center/100% 1207px
      position relative
      ul
        overflow hidden
        position absolute
        top 750px
        li
          width 248px
          height 448px
          background url("./images/litter.png") no-repeat center/100% 100%
          text-align center
          box-sizing border-box
          padding 60px 0 0 15px 
          float left
          position relative          
          p:nth-of-type(1)
            font-size 36px
            background -webkit-linear-gradient(left, #ff3d4d, #ff8e46)
            -webkit-background-clip text
            /* 规定背景的划分区域 */
            -webkit-text-fill-color transparent
            font-weight 600
            span:nth-of-type(1)
              font-size 72px   
              vertical-align -4px        
          p:nth-of-type(2)
            font-size 30px
            color #000
            margin-top 10px
          div
            display inline-block
            padding 0 13px
            background-color #ff8b3d
            font-size 18px
            color #fff
            text-align center
            line-height 30px
            margin 90px auto 0
            box-sizing border-box
          p:nth-of-type(3)
            font-size 30px
            color #6c6c6c
            margin-top 10px
          .jiahao
            font-size 48px
            color #ffffff
            position absolute
            left -15px
            top 140px
            background none
        li:first-of-type
          .jiahao
            display none
      .twoCard
        overflow hidden
        position absolute
        top 750px
        left 30px
        li
          width 340px
          height 448px
          background url("./images/big.png") no-repeat center/100% 100%
          text-align center
          box-sizing border-box
          padding 60px 0 0 15px 
          float left
          p:nth-of-type(1)
            font-size 36px
            background -webkit-linear-gradient(left, #ff3c4d, #ff8e46)
            -webkit-background-clip text
            /* 规定背景的划分区域 */
            -webkit-text-fill-color transparent
            font-weight 600
            span:nth-of-type(1)
              font-size 72px   
              vertical-align -4px        
          p:nth-of-type(2)
            font-size 30px
            color #000
            margin-top 10px
          div
            display inline-block
            padding 0 13px
            background-color #ff8b3d
            font-size 18px
            color #fff
            text-align center
            line-height 30px
            margin 90px auto 0
            box-sizing border-box
          p:nth-of-type(3)
            font-size 30px
            color #6c6c6c
            margin-top 10px
          .jiahao
            font-size 48px
            color #ffffff
            position absolute
            left -25px
            top 140px
            background none
        li:first-of-type
          .jiahao
            display none
    .yearinvest_two
      width 100%
      height 1033px
      overflow hidden
      background url("./images/index_bg2.png") no-repeat center/100% 1033px
    .yearinvest_three
      width 100%
      height 1719px
      overflow hidden
      background url("./images/index_bg3.png") no-repeat center/100% 1719px
    .go-to-top
      width 136px
      height 200px
      position fixed
      right 0
      bottom 350px
      background url("./images/go_top.png") no-repeat center/100% 100%
a
  display none
</style>