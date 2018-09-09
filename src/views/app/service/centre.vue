<template>
<div class="centre fixed" v-if="show">
  <scroll :data="topList" class="toplist" ref="toplist">
    <!-- 滚动容器 -->
    <div >
      <jinr-cell-group :isHairline="false">
        <jinr-cell
          title="常见问题"
          value="更多"
          icon="question"
          class="cell bold"
          @click="addBuried"
          is-value-border
        ></jinr-cell>
      </jinr-cell-group>
      <jinr-cell-group>
        <jinr-cell
          v-for="(item, index) in topList"
          :title="item.problem"
          :key="index"
          @click="addBuriedDetail(item)"
          is-hot
        ></jinr-cell>
      </jinr-cell-group>
      <div class="mar-bot"></div>

      <jinr-cell-group :isHairline="false">
        <jinr-cell
          title="联系我们"
          icon="tell"
          class="bold"
        ></jinr-cell>
      </jinr-cell-group>
      <jinr-cell-group>
        <jinr-cell
          v-for="(item, index) in botList"
          :title="item.title"
          :value="item.value"
          :key="index"
          :is-link="item.isLink"
          class="cell"
          @click="click(index)"
        ></jinr-cell>
      </jinr-cell-group>
    </div>
  </scroll>
  <popup
    :showOrHide='showOrHide'
    v-on:changeMask='changeMask'
    :selectVal='selectVal'
  ></popup>
</div>
</template>

<script>
import popup  from '../about/components/popup'
export default {
  components: {
    popup
  },
  data() {
    return {
      show: false,
      showOrHide: false,
      topList: [
        // {title: 'IOS11为什么不能正常使用'},
        // {title: '怎么体现'},
        // {title: '问题1'},
        // {title: '问题2'},
        // {title: '问题3'},
      ],
      botList: [
        {title: '在线客服', value: '立即咨询', isLink: true},
        {title: '客服热线', value: '1010-2015（7:30-24:00）', isLink: true},
        {title: '鲸鱼公众号',  value: '鲸鱼（jingyu-bao）', isLink: true},
      ],
      tell: '10102015', //客服电话
      selectVal: ''
    }
  },
  beforeRouteEnter(to, from, next){
    next(vm =>{
      console.log(vm);
      vm.$root.title = to.name
    })
  },
  computed: {},
  watch: {},
  created() {
    this.initFun()
  },
  mounted() {},
  methods: {
    initFun(){
      this.show = false
      this.$http({
        method: 'problem.hot',
      }).then((response) => {
        this.topList = response.list
        this.show = true
      })
    },

    // 点击列表
    click(index){
      if(index===0){
        // 如果是 iOS 设备
        let bool = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        if (bool && this.$JinrSDK._version()==430) {
            this.$flash('在线客服系统维护中')
        }else{
          try {
            Jinr.pushServiceRobot()  
          } catch (error) {
            this.$flash('请联系客服')
          }

          try {
            Jinr.addBuried('ONLINE_CUSTOMER_SERVICE_HITS', '0')
          } catch (error) {

          }
        }

        // if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        //   this.$flash('在线客服系统维护中')
        // }else{
        //   try {
        //     Jinr.pushServiceRobot()
        //   } catch (error) {
        //     this.$flash('请在鲸鱼APP使用')
        //   }
        //   try {
        //     Jinr.addBuried('ONLINE_CUSTOMER_SERVICE_HITS', '0')
        //   } catch (error) {

        //   }
        // }

      }else if(index===1){
        try {
          Jinr.call(this.tell)
        } catch (error) {
          this.$flash('请在鲸鱼APP使用')
        }
        try {
          Jinr.addBuried('TELEPHONE_HOTLINE_CLICK_AMOUNT', '0')
        } catch (error) {

        }
      }else if(index===2){
        this.selectVal = this.botList[index].value
        this.showOrHide=true
      }
    },
    addBuried(){
      try {
        Jinr.addBuried('MORE_COMMON_PROBLEMS_CLICK_AMOUNT', '0')
      } catch (error) {

      }

      this.routerPush('/service/faq')
    },
    addBuriedDetail(item){
      try {
        Jinr.addBuried('HOT_ISSUES_HITS', '0')
      } catch (error) {

      }
      this.routerPush(`/service/details`, {problemid: item.problemid})
    },


    changeMask(val){
      this.showOrHide=val
    }

  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~style/index.styl"

.centre
  background-color $color-light-grey-def
  .bold
    font-weight bold
  .cell
    {$prefix}-cell__value
      span
        font-weight normal
        font-size 26px
        color #999999
  {$prefix}-icon-question
    display inline-block
    width 40px
    height @width
    background url('./images/Drawer_icon_wenti@2x.png') no-repeat center center
    background-size 35px 35px
  {$prefix}-icon-tell
    display inline-block
    width 40px
    height @width
    background url('./images/Drawer_icon_dianhua@2x.png') no-repeat center center
    background-size 40px 40px
  .mar-bot
    margin-bottom 30px

</style>