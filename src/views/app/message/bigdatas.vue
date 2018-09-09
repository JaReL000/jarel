
<template>
<div 
  class="bigData fixed fixed-x iphone-xms" 
  :class="{'jrx-header-top': $root.showHeader}"
>
  <!-- <scroll :data="lists"  ref="lists" > -->
    <ul class="lists" v-if="show&&lists.length!==0">
      <li 
        v-for="(item, index) in lists"
        :key="index"
        @click="goToUrl(item.url)"
      >
        <!-- <div
          class="item border-bottom-1px" 
        >
          <h2>{{item.title}}</h2>
          <span>{{item.issue_time}}</span>
        </div> -->
        <h2 v-text="item.text"></h2>
      </li>  
      <!-- <div 
        class="more" 
        @click="initFun" 
        v-if="show&&responseing"
      >点击更多数据</div> -->
      
    </ul>
    <!-- <div class="noData" v-if="show&&lists.length===0">
      <img src="../images/noData.png">
      <p>暂无数据</p>
    </div> -->
  <!-- </scroll> -->
    
  </div>
</template>

<script>
  import { isMobile, isWeixn } from 'utils/utils'

  let yybgUrl = window.location.protocol+"//"+window.location.host+"/yybg"
  //开发机路径：https://jinrfe.dev.jinr.com/yybg
  //预发布机路径：http://jinrfe.pre.jinr.com/yybg
  //公测机路径：http://jinrfe.beta.jinr.com/yybg
  //正式机路径：https://jinrfe.jinr.com/yybg
  export default {
    data () {
      return {
        show: false,
        responseing: true,
        total: 0,
        indexPage: 1,
        // https://jinrfe.jinr.com/yybg/index.html
        lists:[
          {text: '6月运营报告', url: yybgUrl+'/201806/index.html '},
          {text: '5月运营报告', url: yybgUrl+'/201805/index.html '},
          {text: '4月运营报告', url: yybgUrl+'/201804/index.html '},
          {text: '3月运营报告', url: yybgUrl+'/201803/index.html '},
          {text: '2月运营报告', url: yybgUrl+'/201802/index.html '},
          {text: '1月运营报告', url: yybgUrl+'/201801/index.html '},
          {text: '12月运营报告', url: yybgUrl+'/201712/index.html '},
          {text: '11月运营报告', url: yybgUrl+'/201711/index.html '},
          {text: '10月运营报告', url: yybgUrl+'/201710/index.html '},
          {text: '9月运营报告', url: yybgUrl+'/201709/index.html '},
          {text: '8月运营报告', url: yybgUrl+'/201708/index.html '},
          {text: '7月运营报告', url: yybgUrl+'/201707/index.html '},
          {text: '6月运营报告', url: yybgUrl+'/201706/index.html '},
          {text: '5月运营报告', url: yybgUrl+'/201705/index.html '},
          {text: '4月运营报告', url: yybgUrl+'/201704/index.html '},
          {text: '3月运营报告', url: yybgUrl+'/201703/index.html '},
          {text: '2月运营报告', url: yybgUrl+'/201702/index.html '},
          {text: '1月运营报告', url: yybgUrl+'/201701/index.html '},
          {text: '2016年鲸鱼宝年度报告', url: yybgUrl+'/2106year/index.html'},
          {text: '12月运营报告', url: yybgUrl+'/201612/index.html '},
          {text: '11月运营报告', url: yybgUrl+'/201611/index.html '},
          {text: '10月运营报告', url: yybgUrl+'/201610/index.html '},
          {text: '9月运营报告', url: yybgUrl+'/201609/index.html '},
          {text: '8月运营报告', url: yybgUrl+'/201708/index.html '},
          {text: '7月运营报告', url: yybgUrl+'/201707/index.html '}
        ],
      }
    },
    created() {
      // this.$flash.close()
      if(isWeixn()){
        
        this.$root.showHeader = false
      }
      this.changeTitle("鲸鱼大数据")
      this.initFun()
    },
    mounted() {
      this.show = true
    },
    methods: {
      initFun(){
        
        // this.responseing = false
        this.$http({
          method: 'report.list',
          token: this.$root.appData.token,
          terminal: 1,
          page: this.indexPage,
          msg_type: 'bigdatas' //system 系统消息 coupon 福利消息 notice公告 bigdatas 大数据
        }).then((response) => {
          // this.total = response.total
          // if(this.indexPage>1 && (response.total > this.lists.length)){
          //   this.lists = this.lists.concat(response.list)
            
          // }else{
          //   this.lists = response.list
          //   this.show = true 
          // }
          // this.indexPage++

          // this.$nextTick(()=>{
          //   // 请求长度是否等于数组条数
          //   this.responseing = !(this.total === this.lists.length) 
          // })
        })
      } 
    }
  }
</script>

<style lang="stylus">
.bigData
  overflow scroll
  -webkit-overflow-scrolling touch
  .lists
    padding-top 20px
    li 
      padding  0 30px
      margin 0 30px 20px
      height 172px
      &>h2 
        padding-left 130px
        line-height 172px
        font-weight normal
        font-size 32px
        color #fff
      div.item
        display block
        overflow hidden
        line-height 104px
        h2 
          float left
          padding-left 5px
          font-size 30px
          font-weight bold
          color #343434
          width 60%
          font-weight bold
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
        span 
          float right 
          padding-right 5px
          font-size 24px 
          color #999999 
    li:nth-child(odd)
      background url('./images/message_blue.png')
      background-size cover
    li:nth-child(even)
      background url('./images/message_yellow.png')
      background-size cover
    .more 
      padding-bottom 44px
      line-height 120px
      text-align center
      font-size 26px
      color #999
</style>


