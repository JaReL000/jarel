<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"
.scroll-over
  overflow scroll
  -webkit-overflow-scrolling touch
.jinrWelfare-bg2
  img 
    width 100%

.next-go 
  margin-top 20px
  padding-bottom 100px
  height 100px
  line-height @height
  text-align center
  font-size 30px
  background  url('./img/next_go.png')  no-repeat center top
  background-size 58px 53px 
  color #333
  transform: translateY(-8px)
  animation start 1.6s infinite ease-in-out

@keyframes start{
  0%, 30% {
    opacity: 0;
    transform: translateY(-8px)
  }

  95% {
    opacity: 1;
    transform: translateY(28px)
  }
  100% {
    opacity: 0;
    transform: translateY(30px)
  }
}

</style>
<template>
  <div class="fixed ">
    <router-view></router-view>
    <tab></tab>
  </div>
</template>

<script>
  import tab from './components/tab'
  export default {
    components: {tab},
    data() {
      return {}
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {},
  }
</script>
