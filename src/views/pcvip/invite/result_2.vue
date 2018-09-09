<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.result
  // width 780px
  // margin 0 auto
  .banner-vip
    img
      width 100%
      height 360px
  .main
    padding 34px 28px 0
    color #333
    h1.yaoqin
      height: 76px;
      padding-left 50px
      margin-bottom 20px
      line-height @height
      font-size 30px
      background-color: rgb(255, 255, 255);
      box-shadow: 0px 2px 16px 0px rgba(18, 117, 215, 0.16);
      span
        color $mvip-color
    .lists
      padding-top 10px
      text-align center
      .top-title
        overflow hidden
        height 68px
        border-radius 12px
        line-height @height
        background-color #69abf4
      span
        float left
        width 33.3%
        font-size 24px
        color #fff
      .list
        height 335px
        overflow scroll
        ul
          li
            overflow hidden
            height 68px
            line-height @height
            &:nth-child(odd)
              background-color #eff7fc
            span
              color #333
  .footer-r
    position absolute
    bottom 0
    width 100%
    font-size 34px
    text-align center
    a
      display block
      width 100%
      height 98px
      line-height @height
      background-color $mvip-color
      color #fff
    p
      line-height 40px
      font-size 24px
      color #999
  .showAlert
    width 100%
    height 100%
    position fixed
    top 0px
    left 0px
    background rgba(0,0,0,0.5)
    .convip
      position: fixed
      top: 50%
      left: 50%
      transform: translate3d(-50%,-50%,0)
      // width 540px
      // padding: 20px
      border-radius 5px
      background #ffffff
      img
        width 540px
        height 360px
  .icon_edit
    position: fixed;
    bottom: 100px;
    right: 10px;
    z-index 9999
    width: 150px;
    height: @width;
    line-height @width
    text-align: center;
    border-radius: 50%;
    opacity: .98;
    background: #1b9af4;
    box-shadow: 0 6px 30px 0 rgba(52,96,183,.28);
    cursor: pointer;
    .icon_edit .lite-iconf-editor
      font-size: 50px;
    .lite-iconf
      font-size: 35px;
      color: #fff;



</style>
<template>
<div class="result">
  <loading v-if="!show"></loading>
  <div v-if="show">
    <div class="banner-vip"><img src="../assets/vip_pc_banner.jpg" alt="鲸鱼"></div>
    <!-- 主体区域 -->
    <div class="main">
      <h1 class="yaoqin">我累计邀请好友数: <span>{{inviteRanking.count_invite_user}}</span></h1>
      <h1 class="yaoqin">我累计邀请投资额：<span>{{inviteRanking.total_invest_money}}</span></h1>
      <div class="lists">
        <div class="top-title">
          <span>我的好友</span>
          <span>累计投资金额</span>
          <span>邀请时间</span>
        </div>
        <div class="list">
          <ul>
            <li
              v-for="(item, index) in inviteRanking.list"
              :key="index"
            >
              <span>{{item.mobile}}</span>
              <span>￥{{item.money}}</span>
              <span>{{item.date}}</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
    <!-- 尾部 -->
    <div class="footer-r" v-if="!isPc">
      <p>点击右上角，分享邀请好友</p>
      <a
        class="download"
        :href="downloadAPP"
        v-text="'下载APP'"
      ></a>
    </div>

      <div
        class="icon_edit"
        v-if="isPc"
        @click="closeWebPageFun"
      >
        <i class="lite-iconf lite-iconf-editor">OUT</i>
      </div>

  </div>
</div>
</template>

<script>
  import fetchWXconfig from 'utils/fetchWXconfig'
  export default {
    components: {},
    data() {
      return {
        show: false,
        responseing: false,
        inviteRanking: [],
        wxShare: '',
      }
    },
    computed: {
      url(){
        // + window.location.hash
        return window.location.origin + window.location.pathname+'/pc//index.html'
      },
      isPc(){
        let bool = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent ) ? false :  true
        return bool
      }
    },
    watch: {},
    created() {
      console.log('进来了')
      this.initFun()
    },
    mounted() {},
    methods: {
      initFun(){
        if(this.responseing){
          return
        }
        this.responseing = true


        this.$http({
          servicename:'api.activity',
          combination_id: sessionStorage['combination_id']  || '',
          param: sessionStorage['param']  || '',
          url: this.url
        }).then((res)=>{
          // this.show = true
          this.inviteRanking = res.inviteRanking
          this.show = true
          console.log('res', this.show)
          fetchWXconfig(res.wxShare)
          setTimeout(()=> {
            this.responseing = false
          }, 770);

        }).catch((error)=>{
           console.log('res', error)
          this.show = true
          setTimeout(()=> {
            this.responseing = false
          }, 770);
          // this.$router.replace('/invited')
          console.log(error)
        });
      },
      agreeFun() {
        this.isgouZc = !this.isgouZc
      },
      // 获取验证码
      GetVerificationCode() {
        if(!this.verificaTel()) return
        this.$http.post(sendSms, {
          tel: this.telVal,
          event_key: this.event_key
        }, {emulateJSON:true})
        .then((response) => {
          response = response.data
          console.log(response)
          if (response.code == 10000){
            this._countDown()
          }else{
            this.warnInfo = response.data
            this.showWarn = true
          }
        })
      },

      //关闭浏览器
      closeWebPageFun(){
        //close IE
        if (navigator.userAgent.indexOf("MSIE") > 0) {
          if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
          window.opener = null;
          window.close();
          } else {
          window.open('', '_top');
          window.top.close();
          }
        //close firefox
        } else if (navigator.userAgent.indexOf("Firefox") > 0) {
          window.location.href = 'about:blank ';
        //close chrome;It is effective when it is only one.
        } else {
          window.opener = null;
          window.open(' ', '_self');
          window.close();
        }
      }
    },
  }
</script>
