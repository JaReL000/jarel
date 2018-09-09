<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"
  .contact
    overflow scroll
    -webkit-overflow-scrolling touch
    .contact-bg1
      height 359px
      background url('./img/app_bg51.jpg') no-repeat center
      background-size 100% 100%
    ul
      li
        overflow hidden
        width 692px
        height 100px
        margin 0 auto
        box-sizing border-box
        span
          display block
          float left
          width 180px
          height 100%
          line-height 100px
          font-size 34px
          color #333
          float left
          margin-right 260px
        input
          display block
          float left
          width 202px
          text-align right
          height 100%
          line-height 100px
          font-size 27px
          color #999
          margin-right 17px
        b
          display block
          float left
          width 14px
          height 30px
          margin-top 35px
          background url('./img/app_bg37.jpg') no-repeat center
          background-size 100% 100%


</style>
<template>
    <div class="contact fixed">
      <section class="contact-bg1"></section>
      <ul>
        <li class='border-bottom-1px' v-for='(item,index) in dataList' :key='index' @click="showEvent(index)">
          <span>{{item.title}}</span>
          <input type="text" :value='item.content' readonly='readonly'>
          <b></b>
        </li>
      </ul>
      <popup
        :showOrHide='showOrHide'
        v-on:changeMask='changeMask'
        :selectVal='selectVal'
      ></popup>
    </div>
</template>

<script>
  import popup  from './components/popup'
  export default {
    components: {
      popup
    },
    data() {
      return {
        showOrHide: false,
        dataList:[
          {title:'公司网址', content: 'www.jinr.com'},
          {title:'微信服务号', content: 'jingyu-bao'},
          {title:'微信订阅号', content: '鲸鱼订阅号'},
          {title:'客服热线', content: '1010-2015'},
          {title:'企业邮箱', content: 'szjy@jinr.com'}
        ],
        selectVal:'',
        tell: '10102015', //客服电话
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      showEvent(index){
        if(index===3){
          try {
            Jinr.call(this.tell)
          } catch (error) {
            console.log(this.tell);
          }
          return
        }
        this.selectVal=this.dataList[index].content
        this.showOrHide=true
      },
      changeMask(val){
        this.showOrHide = val
      }
    },
  }
</script>
