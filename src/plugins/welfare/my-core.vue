<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.my-welfare
  background-color #f5f5f5
  .tab
    position fixed
    left 0
    top 0
    // z-index 2
    height 100px
    width 100%
  .slider
    width 100%
    position fixed
    top 100px
    right 0
    bottom  0
    left 0   
  .financing, .cash, .coupon
    position absolute
    top 0 
    bottom 0
    width 100% 
    .null
      padding-top 120px
      text-align center
      img 
        width 256px 
        height 191px
      h4 
        margin-bottom 58px
        font-size 44px 
        line-height 100px
        color #b3b3b3
      input.cell_input
        height 68px
        width 360px
        line-height @height
        border-radius (@height/2)
        border 1px solid mainColor
        font-size 32px
        background-color transparent
        color mainColor
        &:active
          border-color #b3b3b3
          color #b3b3b3
  .more
    font-size 30px
    line-height 80px
    text-align center
    &:active 
      color #999



</style>
<template>
  <div class="my-welfare fixed" >
    <!-- 选项卡 -->
    <jinr-tab
      class="tab"
      :line-width="lineHeight"
      :active-color="activeColor"
      :custom-bar-width="getBarWidth"
      v-model="indexTab"
    >
      <jinr-tab-item
        :selected="titleTab === item"
        v-for="(item, index) in listItems"
        @on-item-click="onTabFun(index)"
        :key="index"
        v-text="item.name"
      ></jinr-tab-item>
    </jinr-tab>

    <!-- 内容 -->
    <jinr-swiper
      v-model="indexTab"
      :aspect-ratio="2"
      :show-dots="false"
      height="100%"
      @on-index-change="onSwitchChange"
      class="slider"
    >
      <jinr-swiper-item 
        v-for="(items, indexItem) in listItems"
        :key="indexItem" 
        :class="items.refName" 
      >
        <cell 
          v-if="items.dataLists.list.length!==0 " 
          :lists="items.dataLists.list"
          :type="items.type"
          :refName="items.refName"
          :index="indexItem"
          :isMore="(items.isMore)"
          @moreIngFun="_apiListFun"
          @deActiva="deActiva"
          @goToDetaliFun="goToDetaliFun"
        ></cell>
        <!-- 空数据 -->
        <div 
          v-if="items.dataLists.list.length===0 && !items.oneReload"
          class="null"
        >
          <img src="./images/ticket_null.png" alt="空盒子"/>
          <h4>暂无相关福利</h4>
          <input
            class="cell_input"
            :value="inputVal"
            type="button"
            @touchstart.stop.prevent="routerPush('/activity/news')"
            /> 
        </div>    
      </jinr-swiper-item> 
    </jinr-swiper>
    <router-view
      :type="type"
    ></router-view>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import Cell from './cell'

  export default {
    components: {
      BScroll,
      Cell
    },
    data() {
      return {
        lineHeight: 3, // 线高度
        getBarWidth: () => {return (40/75)+'rem'}, // 线宽度
        activeColor: '#0c72e3', //tab颜色
        indexTab: 0, // 选项卡与内容绑定
        titleTab: '理财红包',  //默认选中
        inputVal: '去活动中心逛逛',
        type: null,
        
        /**
         * 类型
         */
        listItems: [
          { 
            name: '理财红包',
            refName: 'financing', 
            type: 22, 
            page:1,
            scroll:null,
            oneReload: true, //是否第一次请求
            responseing: false, //请求中
            isMore: true,
            dataLists: {
              total: 0, 
              list: []  //数据源
            }, 
            api: 'red.Packet.list' //红包接口 type 1-理财红包 2-现金红包 
          }, 
          { name: '现金红包', refName: 'cash', scroll:null, type: 21, page:1, oneReload: true, responseing: false, isMore: true, dataLists: {list:[], total: 0,}, api: 'red.Packet.list' }, 
          { name: '卡券', refName: 'coupon', scroll:null,  type: 0, page:1, oneReload: true,  responseing: false, isMore: true, dataLists: {list:[], total: 0,}, api: 'user.coupon.list'  }
        ], 
      }
    },
    computed: {},
    watch: {},
    
    created() {
      this._apiListFun(0)
    },
    mounted() {},
    methods: {
      // 点击tab
      onTabFun(index){},

      // 手势滑动 左右切换
      onSwitchChange(index){
        let obj = this.listItems[index]
        // 第一次请求且非请求中状态
        if(obj.oneReload && !obj.responseing){
          this._apiListFun(index)
        }
      },

      /***
       * 
       * @author 7043
       * @param (Number) index 0理财红包 1现金红包 2卡券
       */
      _apiListFun(index){
        this.listItems[index].responseing = true //请求中
        this.listItems[index].isMore = false
        
        let data = {
          method: this.listItems[index].api,
          token: this.$root.appData.token,
          page: this.listItems[index].page
        }
        this.listItems[index].type
          ? (data['type'] = this.listItems[index].type) 
          : data
        
        // 发送请求
        this.$http(data).then((response) => {
          // 处理数据源 是否第一次请求
          if(this.listItems[index].oneReload){
            this.listItems[index].dataLists = response
            this.listItems[index].oneReload = false 
          }else{
            // 废弃
            // response.list.forEach((value) => {
            //   this.listItems[index].dataLists.list.push(value)
            // });
            this.listItems[index].dataLists.list =
            this.listItems[index].dataLists.list.concat(response.list)
          }

          // 第一次加载添加滚动 其余刷新处理
          this.$nextTick(()=>{
            if(!this.listItems[index].scroll){
              let elClass = '.' + this.listItems[index].refName
              this.listItems[index].scroll = 
              new BScroll(document.querySelector(elClass), {
                  click: true
              })  
            }else{
              this.listItems[index].scroll.refresh()
            } 
            this.listItems[index].page++
          })

          // 一个请求结束
          this.listItems[index].responseing = false
          // 请求长度是否等于数组条数
          this.listItems[index].isMore = 
            !(this.listItems[index].dataLists.list.length >= this.listItems[index].dataLists.total)
        })
      },

      // 去激活
      deActiva(index, cuserid, coupon_type){
        let platform = this.isIOS ? 3 : 4
        
        this.$http({
          method: 'user.coupon.activate',
          token: this.$root.appData.token,
          platform: platform,
          cuserid: cuserid
        }).then((res)=>{ 
          if(res.code === 1000000){
            this.$flash(res.msg)
            
          }else if(res == 1000000){
            this.listItems[2].dataLists.list[index].status = 2
          }
      
        }).catch(function(error){
          console.log(res.msg)
        });
      },

      

      // 进入详情
      goToDetaliFun(cuserid, type){
        this.type = type
        this.$router.push({
          path: `/welfare/myCore/detail`,
          query: {
            type,
            cuserid
          }
        })
      },
    }
  }
</script>

