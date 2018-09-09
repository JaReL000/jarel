<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"
  .report
    background #f5f5f5
    overflow scroll
    section 
      // height 100%
      overflow scroll
      -webkit-overflow-scrolling touch
      ul
        li
          width 693px
          height 364px
          margin 0 auto
          margin-top 28px
        li:last-child
          margin-bottom 28px
        .more 
          line-height 120px
          text-align center
          font-size 26px
          color #999
</style>
<template>
<div class="report fixed minirefresh-wrap" id="minirefresh">
    <section v-load-more="getArticleList" type="2" class="minirefresh-scroll">
      <ul>
        <li 
          v-for='(item,index) in dataList' 
          :key='index' 
          @click="toDetails(index)"
        >
          <img :src="buildUrl(item.photo)">
        </li>
        <!-- <div 
          class="more " 
          @click="initFun" 
          v-if="responseing && !(total === this.dataList.length) "
        >点击更多数据</div> -->
      </ul>
    </section>
    <router-view></router-view>
</div>
</template>

<script>
  import headTop from './components/headtop'
  import {loadMore} from 'components/loadmore/loadmore'
  export default {
    components: {headTop},
    data() {
      return {
        show: false,
        responseing: true,
        total: 0,
        indexPage: 1,
        dataList:[],
        preventRepeatRequest:false,//防止多次触发数据请求
        resf: ''
      }
    },
    mixins:[loadMore],
    computed: {},
    watch: {},
    created() {
      this.$root.show = true 
      // this.initFun()
    },
    mounted() {
      this.resf = this.RefreshUp('#minirefresh',this.initFun)
    },
    methods: {
      toDetails(index){
        this.$router.push({path:'/about/report/details',query:{articleid:this.dataList[index].articleid}})
      },
      initFun(){
        this.responseing = false
        let terminal = this.isIOS ? 3 : 4
        this.$http({
          method: 'article.list',
          terminal: 1,
          page: this.indexPage,
          token: this.$root.appData.token,
          acolumnid: 104,
          type : 1
        }).then((res)=>{
          this.responseing = true
          this.total = res.count
          if(this.indexPage>1 && (res.count > this.dataList.length)){
            this.dataList = this.dataList.concat(res.list)
          }else{
            this.dataList=res.list
            this.show = true 
          }
          this.resf.endUpLoading(this.dataList.length === res.count)
          this.indexPage++
        })
      },
      // getArticleList(){
      //   if (this.preventRepeatRequest) {
      //     return false;
      //   }
      //   this.preventRepeatRequest = true;
      //   this.page++
      //   let terminal = this.isIOS ? 3 : 4
      //   this.$http({
      //     method: 'article.list',
      //     terminal: 1,
      //     page: this.page,
      //     token: this.getToken(),
      //     acolumnid :104,
      //     type : 1
      //   }).then((res)=>{
      //     this.dataList=[...this.dataList,...res.list]
      //     if (res.list.length >= 4) {
      //       this.preventRepeatRequest = false;
      //     }
      //   })
      // },

    }
  }
</script>
