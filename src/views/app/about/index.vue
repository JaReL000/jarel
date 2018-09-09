<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.about
  .banner 
    height 370px
    font-size 0
    line-height 0
  .toplist
    height: 100%
    overflow: hidden
    ul  
      li.item-list
        position relative
        padding 0px 24px 0
        .item
          overflow hidden
          padding-bottom 0px
          line-height 100px
          .jr-left 
            display table-cell
            height 96px
            padding-right 24px
            vertical-align middle
            line-height @height
            img 
              width 35px
              height 35px
              vertical-align middle
              line-height 100px
              opacity 0.5
          h6 
            vertical-align middle 
            padding-right 50px
            font-size 32px
            color #333
        &:after
          position: absolute
          top 40px
          right 50px
          content: " "
          display: inline-block;
          height 16px
          width @height
          border-width: 4px 4px 0 0;
          border-color: #C8C8CD;
          border-style: solid;
          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);


</style>
<template>
  <div class="about fixed" :class="{'x-header-potop': $root.showHeader}">
    <scroll :data="topList" class="toplist" ref="toplist">
      <ul>
        <!-- banner图片 -->
        <div class="banner" @click='toDetailes'><img 
          src="./img/app_bg52.png" 
          alt="头图"
        ></div>
        <!-- 列表 -->
        <li 
          class="item-list" 
          v-for="(item, index) in topList"
          :key="index"
          >
          <div 
            class="item border-bottom-1px"
            @click="routerPush(item.path)"
          >
            <div class="jr-left "><img 
              :src="item.iconUrl" 
              alt=""></div>
              <!-- style="font-weight:100;" -->
            <h6 >{{item.title}}</h6>
          </div>
        </li>
      </ul>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  components: {},
  data() {
    return {
      topList: [
        {title: '荣誉资质', path: '/about/honor', iconUrl:require('./img/app_bg53.png')},
        {title: '安全保障', path: '/about/safety', iconUrl:require('./img/app_bg54.png')},
        {title: '公司介绍', path: '/about/introduce', iconUrl:require('./img/app_bg55.png')},
        {title: '媒体报道', path: '/about/report', iconUrl:require('./img/app_bg56.png')},
        {title: '合作伙伴', path: '/about/partner', iconUrl:require('./img/app_bg57.png')},
        {title: '联系我们', path: '/about/contact', iconUrl:require('./img/app_bg58.png')}
      ]
    }
  },
  beforeRouteEnter(to, from, next){
    next(vm =>{
      vm.$root.title = to.name
    })
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    toDetailes(){
      this.routerPush('/picTell/jinrTreaty')
      // this.$router.push('/about/active/jinrTreaty')
    }
  },
}
</script>
