<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.faq-detail 
  bottom 212px
  padding  0 30px
  .scroll-top
    overflow scroll
    -webkit-overflow-scrolling touch
    padding 0  30px 44px
    h1.topTltie
      padding-top 40px
      font-size 38px
      line-height 50px
      font-weight bold
      margin-bottom 30px
      color #333333
    &>.text 
      height 100%
      font-size 30px
      line-height 40px
      color #666666
      table
        width 100%
        margin-bottom 30px
        line-height 60px
        font-size rem(20)
        th
          border 1px solid #0c72e3
          text-align center
          background: #0c72e3;
          color: #fff;
          width: 33.3%;
        td
          border: 1px solid #ccc;
          text-align: center;
          color: #4e4e4e;
  .faq-footer
    position fixed
    left 0 
    bottom 0
    width 100%
    height 210px
    text-align center 
    background-color #fff
    h5 
      padding-bottom 60px
      font-size 30px
      line-height 48px
      a  
        color #0c72e3
    &__items 
      width 100%
      padding-top 18px
      &>div 
        float left 
        width 50%
        height 70px
        font-size 36px
        text-indent 60px
        line-height @height
        background url('./images/Drawer_icon_yijiejue1@2x.png')  no-repeat 105px center
        background-size 42px 44px
      .border-right-1px
        background-image url('./images/Drawer_icon_weijiejue1@2x.png')
      &>div.h 
        background-image  url('./images/Drawer_icon_yijiejue2@2x.png')
      .border-right-1px.h
        background-image  url('./images/Drawer_icon_weijiejue2@2x.png') 
         
              
</style>

<template>
  <div class="faq-detail fixed fixed-x" :class="{'jrx-header-top': $root.showHeader}">
    <!-- <scroll :data="problem" class="scroll-top" ref="problem">
      <h1 class="topTltie">{{problem}}</h1>
      <p>{{answer}}</p>
    </scroll> -->
    <div class="scroll-top fixed " ref="problem">
      <h1 class="topTltie">{{problem}}</h1>
      <div class="text" v-html="answer"></div>
      
    </div>
    <div class="faq-footer fixed-x">
      <h5 class="border-bottom-1px">还有疑问? <a @click="contactFun" href="javascript:;">联系在线客服</a> </h5>
      <div class="faq-footer__items">
        <div class="border-right-1px" :class="{h: resolved}" @click="a">未解决</div>
        <div :class="{h: notResolved}" @click="b">已解决</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  data() {
    return {
      show: false,
      problem: '',
      answer: '',
      resolved: false,
      notResolved: false,
    }
  },
  computed: {},
  watch: {},
  created() {
    this.initFun()
  },
  mounted() {},
  methods: {
    a(){
      if(!this.notResolved){
        this.resolved = true
        this.$http({
          method: 'problem.solve',
          token: this.$root.appData.token,
          // token: '',
          id: this.$route.query.problemid,
          is_solve: 0
        }).then((response) => {
          
          this.show = true
        })
        return
      }
      
    },
    b(){
      if(!this.resolved){
        console.log(1);
        
        this.notResolved = true
        this.$http({
          method: 'problem.solve',
          token: this.$root.appData.token,
          id: this.$route.query.problemid,
          is_solve: 1
        }).then((response) => {
          
          this.show = true
        })
        return
      }
      
    },

    initFunA(){
      
    },

    initFun(){
      this.$http({
        method: 'problem.detail',
        id: this.$route.query.problemid,
        token: this.$root.appData.token,
      }).then((response) => {
        this.responseing = false
        this.problem = response.problem
        let ishttps = 'https:' == document.location.protocol ? true: false;
        if(ishttps){
          let reg = new RegExp("http:", "g")
          response.answer = response.answer.replace(reg, "https:");
        }
        this.answer = response.answer.replace("<pre", "<div").replace("</pre>", "</div>")
        this.show = true
        
      })
    },

    // 联系客服
    contactFun(){
      // 4.3.0 IOS 处理方案
      let bool = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if (bool && this.$JinrSDK._version()===430) {
          this.$flash('在线客服系统维护中')
      }else{
        try {
          Jinr.pushServiceRobot()  
        } catch (error) {
          this.$flash('请联系客服')
        }
      }
    }
  },
}
</script>
