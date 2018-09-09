<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.service
  .list
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
  <div class="service fixed fixed-x" v-if="show">
    <scroll :data="list" class="list" ref="list" v-if="list.length!==0">
      <ul>
        <!-- @click="goToUrl(item.ptypeid)" -->
        <li 
          class="item-list" 
          v-for="(item, index) in list"
          :key="index"
          @click="addBuried(item)"
          >
          <div class="item border-bottom-1px">
            <h3>{{ item.type_name }}</h3>
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
  watch: {},
  created() {
    this.$root.twoTitle = ''
    this.initFun()
  },
  mounted() {},
  methods: {
    addBuried(item){
      try {
        Jinr.addBuried('MORE_COMMON_PROBLEMS_SPECIFIC_ITEM_CLICK_AMOUNT', '0')
      } catch (error) {
        
      }
      console.log(item);
      // if( item.type_name=="常见问题"){
      //    item.type_name = '问题'
      // }
      this.$root.twoTitle = item.type_name
      
      // this.$router.push('/service/twoList', {typeid: item.ptypeid}, item.type_name)
      this.$router.push({
        path:'/service/twoList',
        query: {typeid: item.ptypeid},
      })

      // this.routerPush('/service/twoList', {typeid: item.ptypeid}, item.type_name)
    },
    
    goToUrl(typeid){
      this.$router.push({
        path:'/service/twoList',
        query: {typeid}
      })
    },

    initFun(){
      this.show = false
      let data = {
        method: 'problem.category',
        token: this.$root.appData.token,
        ptypeid: 100011,  // 分类ID
        type_name: 2 // 	分类名称
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
