<template lang="pug">
div.minirefresh-wrap.notice-lists.fixed.notice.fixed-x(:class="{'jrx-header-top': $root.showHeader, 'notice-padding': $root.showHeader}")#minirefresh
    //- scroll(:data="lists" class="toplist" ref="lists" v-if="show&&lists.length!==0") 
    div.minirefresh-scroll
      ul.test 
        li(
          v-for="(item, index) in lists" 
          @click="routerPush('/message/detail', {noticeid: item.noticeid}, '公告详情')"
        )
          div.top
            h4(v-text="item.title")
            span(v-text="item.issue_time")
        //- p(v-html="item.intro")
    //-   div.more( @click="initFun" v-if="show&&responseing") 点击更多数据
    <div class="noData" v-if="show&&lists.length===0">
      <img src="../images/noData.png">
      <p>暂无数据</p>
    </div>
</template>

<script>

  export default {
    data () {
      return {
        show: false,
        responseing: true,
        total: 0,
        indexPage: 1,
        lists:[],
        refs: ''
      }
    },
    created() {
      // this.initFun()
    },
    mounted() {
      this.refs = this.RefreshUp('#minirefresh',this.initFun)
    },
    methods: {
      initFun(){
        // this.responseing = false
        this.$http({
          method: 'notice.list',
          token: this.$root.appData.token,
          terminal: 1, //1-APP|2-M站|4-PC端。
          page: this.indexPage,
        }).then((response) => {
          this.total = response.total
          if(this.indexPage>1 && (response.total > this.lists.length)){
            
            this.lists = this.lists.concat(response.list)   
          }else{
            this.lists = response.list
             
            
          }
          this.indexPage++

          this.$nextTick(()=>{
            // 请求长度是否等于数组条数
            this.responseing = !(this.total === this.lists.length) 
            this.show = true
            this.refs.endUpLoading(this.total === this.lists.length)
          })
        })
      }    
    }
  }
</script>

<style lang="stylus">
  
.notice-lists
  // overflow scroll
  -webkit-overflow-scrolling touch
  ul 
    padding 0 34px
    li
      padding 26px 0
      border-bottom 1px #e6e6e6 solid
    .top 
      overflow hidden
      line-height 55px
      h4 
        float left
        height 55px
        font-size 30px
        width 78%
        font-weight bold
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
      span 
        float right 
        font-size 24px 
        color #999999
    .more 
      padding-bottom 44px
      line-height 120px
      text-align center
      font-size 26px
      color #999
    p 
      text-align left 
      font-size 26px
      line-height 36px
      height (36*2)px
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      color #666666
        

</style>
