<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.two-list
  .listQaa
    height: 100%
    overflow: hidden
    ul  
      li.item-list
        padding  0 33px
        .item
          overflow hidden
          height 100px
          line-height @height
          h3
            float left
            font-size 30px
            padding-left 10px
            width 90%
            font-weight bold
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
          p 
            position relative
            &:after
              position: absolute
              top 40px
              right 10px
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
  <div class="two-list fixed fixed-x" v-if="show">
    <scroll :data="list" class="listQaa" ref="list" v-if="list.length!==0">
      <ul>
        <li 
          class="item-list" 
          v-for="(item, index) in list"
          :key="index"
          @click="addBuried(item)"
          >
          <div class="item border-bottom-1px">
            <h3>{{item.problem}}</h3>
            <p></p>
          </div>
        </li>
      </ul>
    </scroll>
    <div class="noData" v-if="list.length===0">
      <img src="../images/noData.png">
      <p>暂无数据</p>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      show: false,
      list: []
    }
  },
  computed: {},
  watch: {
    router(oldVal, newVal){
      console.log(oldVal,newVal);
      
    }
  },
  created() {
    this.initFun()
    
  },
  mounted() {},
  methods: {
    addBuried(item){
      try {
        Jinr.addBuried('MORE_COMMON_PROBLEMS_SPECIFIC_ITEM_CLICK_AMOUNT_UNDER_ENTRIES', '0')
      } catch (error) {
        
      }
      // item.problem
      this.routerPush(`/service/details`, {problemid: item.problemid})
    },
    goToUrl(id){
      this.$router.push({
        path:'/service/details',
        query: {id}
      })
    },
    initFun(){
      this.show = false
      let data = {
        method: 'problem.list',
        typeid: this.$route.query.typeid
      }
      
      this.$http(data).then((response) => {
        this.responseing = false
        this.list = response.list
        this.show = true
        
      })
    }
  },
}
</script>
