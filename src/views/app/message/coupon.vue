<template lang="pug">
div.minirefresh-wrap.coupon-lists.fixed.fixed-x(:class="{'jrx-header-top': $root.showHeader}")#minirefresh
  //- scroll(:data="lists"  class="toplist" ref="lists" )
  div.minirefresh-scroll
    ul(v-if="show&&lists.length!==0")
      li(
        v-for="(item, index) in lists"
        @click="routerPush('/welfare/detail', {type: type(item.msg_type), cuserid: item.type_ref_id})"
      )
        div.top
          h4(v-text="item.title")
          span(v-text="item.c_time")
        p(v-html="item.content")
//-     div.more( @click="initFun" v-if="show&&responseing") 点击更多数据
//-   <div class="noData" v-if="show&&lists.length===0">
//-     <img src="../images/noData.png">
//-     <p>暂无数据</p>
//-  </div>
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
    computed: {},
    created() {
      // this.initFun()
    },
    mounted() {
      //  setTimeout(() => {
       this.refs =  this.RefreshUp('#minirefresh',this.initFun)

      //  }, 1000);
    },
    methods: {
      //  `msg_type` tinyint(4) NOT NULL COMMENT
      // '<字典>消息_类型：1-系统|2-福利(红包)|3-福利(卡劵)',
      type(num){
        return (num==2 ? 22 : 0)
      },

      initFun(){
        this.responseing = false
        this.$http({
        method: 'message.list',
        page: this.indexPage,
        token: this.$root.appData.token,
        msg_type: 'coupon' //system 系统消息 coupon 福利消息 notice公告 bigdatas 大数据
      }).then((response) => {
          this.total = response.total
          if(this.indexPage>1 && (response.total > this.lists.length)){
            this.lists = this.lists.concat(response.list)
          }else{
            this.lists = response.list
            this.show = true
          }
          this.indexPage++
          this.$nextTick(()=>{
            // 请求长度是否等于数组条数
            this.responseing = !(this.total === this.lists.length)
            this.refs.endUpLoading(this.total === this.lists.length)
          })

        })
      },
      test(){
        console.log('进来了')
      }
    }
  }
</script>

<style lang="stylus">

.coupon-lists
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: scroll;
  background: #fff;
  ul
    padding 0 34px
    li
      padding 18px 0 26px
      border-bottom 1px #e6e6e6 solid
    .top
      overflow hidden
      line-height 55px
      h4
        float left
        height 55px
        font-size 30px
        width 60%
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
