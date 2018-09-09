<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.article-list
  .lists
    overflow-y:auto     

</style>
<template>
<div class="article-list fixed dynamic fixed-x minirefresh-wrap" id="minirefresh">
  <!-- <scroll :data="lists" class="lists" ref="lists" v-if="show&&lists.length!==0"> -->
    <div class="minirefresh-scroll jinr-scroll lists ">
      <ul>
        <!-- banner图片 -->
        <div class="banner"
          @click="routerPush('/activity/detail', {trendid: lists[indexDef].trendid})"
        ><img 
          :src="lists[indexDef].photo ? buildUrl(lists[indexDef].photo) : require('../images/0000.png')" 
          alt="头图"
        ></div>
        <!-- 列表 -->
        <li 
          class="item-list" 
          v-for="(item, index) in lists"
          :key="index"
          v-if="index"
          @click="routerPush('/activity/detail', {trendid: item.trendid})"
        >
          <div class="item border-bottom-1px">
            <div class="jr-left "><img 
              :src="item.photo ? buildUrl(item.photo) : require('../images/0000.png')" 
              :alt="item.title"></div>
              <!--  -->
            <h6 v-text="item.title"></h6>
            <p v-text="item.summary"></p>
            <i v-text="item.c_time"></i>
          </div>
        </li>
        <div 
          class="more" 
          @click="initFun" 
          v-if="responseing"
        >点击更多数据</div>
        <div class="noData" v-if="show&&lists.length===0">
          <img src="../images/noData.png">
          <p>暂无数据</p>
        </div>
      </ul>
    </div>
    
  <!-- </scroll> -->
</div>
</template>

<script>

export default {
  components: {},
  data() {
    return {
      show: false,
      responseing: true,
      total: 0,
      indexDef: 0,
      indexPage: 1,
      lists:[],
      refs: ''
    }
  },
  computed: {},
  watch: {},
  created() {
    this.initFun()
  },
  mounted() {
    setTimeout(() => {
      
     this.refs = this.RefreshUp('#minirefresh',this.initFun,false)
    }, 500);
  },
  methods: {
    initFun(){
      this.$http({
        method: 'trend.list',
        page: this.indexPage,
        terminal: 1,
        token: this.$root.appData.token,
        acolumnid: this.$route.query.acolumnid || 8, //文章_栏目ID
        type: 1, //1 获取分页 0不获取
      }).then((response) => {

        this.total = response.total
        
        if(this.indexPage>1 && (response.total > this.lists.length)){
          this.lists = this.lists.concat(response.list)
          
        }else{
          this.lists = response.list
          this.show = true
        }
        this.indexPage++
        // this.refs.endUpLoading(true)
        this.$nextTick(()=>{
          // 请求长度是否等于数组条数
          this.responseing = !(this.total === this.lists.length) 
          // console.log('this.refs', )
          // console.log('------', typeof this.refs.endUpLoading)
          typeof this.refs.endUpLoading === 'function'?this.refs.endUpLoading(this.total === this.lists.length):''
          // this.refs.endUpLoading(this.total === this.lists.length)
        })
      })
    },

    defaultImg(){},
  },
}
</script>
