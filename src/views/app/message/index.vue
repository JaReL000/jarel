<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.message
  ul.index
    padding 0 30px 0 25px
    li 
      .item 
        display block
        padding  30px 0
        overflow hidden
      .jr-left
        width 70px
        height @width
        padding-top 10px
      .jr-right
        .top
          overflow hidden
          h2 
            float left
            line-height 48px
            font-size 30px
            color #343434
          span 
            float right 
            line-height 38px
            font-size 24px
            color #999999
        p 
          height 44px
          width 590px
          line-height @height
          font-size 26px
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          color #666666

// .noData
//   position absolute
//   top 0
//   left 0
//   right 0
//   bottom 0
//   top 50%
//   left 50%
//   transform translate(-50%,-50%)
//   text-align center
//   img
//     width 300px
//     height 330px
//   p
//     font-size 30px
//     text-align center
//     color #ccc

</style>
<template>
  <div class="message fixed" >
    <ul class="index" v-if="show && !$root.isProd">
      <li 
          class="item-list" 
          v-for="(item, index) in topList"   
          :key="index"
          >
          <router-link 
            class="item border-bottom-1px"
            :to="item.url"
          >
            <div class="jr-left "><img 
              :src="item.image" 
              alt=""></div>
            <div class="jr-right">
              <div class="top">
                <h2>{{item.name}}</h2>
                <span>{{item.c_time}}</span>
              </div>
              <p>{{item.title}}</p>
            </div>
          </router-link>

        </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        show: false,
        topList: [
        //   { 
        //     title: '系统消息', 
        //     datailText: '您于2017年9月7日 10:50:20提交的1000您提提实打实打算啊是大', 
        //     time: '2017.0912',
        //     url: require('../images/message_sys_icon.png'),
        //     path: '/message/system'
        //   },
        //   { 
        //     title: '福利通知', 
        //     datailText: '您于2017年9月7日 10:50:20提交的100', 
        //     time: '2017.0912',
        //     url: require('../images/message_welfare_icon.png'),
        //     path: '/message/welfare'
        //   },
        //   { 
        //     title: '鲸鱼公告', 
        //     datailText: '您于2017年9月7日 10:50:20提交的1000您提提实打实打算啊是大', 
        //     time: '2017.0912',
        //     url: require('../images/message_sys_icon.png'),
        //     path: '/message/notice'
        //   },
        //   { 
        //     title: '鲸鱼大数据', 
        //     datailText: '您于2017年9月7日 10:50:20提交的1000您提提实打实打算啊是大', 
        //     time: '2017.0912',
        //     url: require('../images/message_data_icon.png'),
        //     path: '/message/bigData'
        //   },
        ]
      }
    },
    beforeRouteEnter(to, from, next){
      next(vm =>{
        // console.log(vm);
        vm.$root.title = to.name
      })
    },
    computed: {},
    watch: {},
    created() {
      // console.log('xxxxxxxxxxxxxxxxxxxxx')
      // if(!this.$root.isProd){
      //   this.$http({
      //     method: 'message.centre',
      //     token: this.$root.appData.token,
      //   }).then((response) => {
          
      //     this.topList = response.list
      //     this.show = true
      //   })
      // }
      
    },
    mounted() {},
    methods: {},
  }
</script>
