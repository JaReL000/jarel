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
    &.x-welfare-header-top
      top 88px
  .slider
    width 100%
    position fixed
    top 100px
    right 0
    bottom  0
    left 0
    &.x-welfare-header-top
      top 188px
    &>.jinr-swiper
      background-color #fff
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
    height 180px
    line-height 100px
    text-align center
    &:active
      color #999
  .x-welfare-header-top
    top 88px



</style>

<template>
  <div
    class="my-welfare fixed fixed-x"
  >
    <!-- 选项卡 -->
    <jinr-tab
      class="tab"
      :class="{'x-welfare-header-top': $root.showHeader}"
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
      :threshold="threshold"
      height="100%"
      @on-index-change="onSwitchChange"
      class="slider"
      :class="{'x-welfare-header-top': $root.showHeader}"
    >
      <jinr-swiper-item
        v-for="(items, indexItem) in listItems"
        :key="indexItem"
        :class="items.refName"
        :idName="'minirefresh'+indexItem"
      >
        <div>
          <cell
            v-if="items.dataLists.list.length!==0 "
            :lists="items.dataLists.list"
            :type="items.type"
            :index="indexItem"
            :isMore="(items.isMore)"
            @moreIngFun="_apiListFun"
            @deActiva="deActiva"
            @goToDetaliFun="goToDetaliFun"
            @changeStatusIndex="changeStatusIndex"
          ></cell>
        </div>
        <!-- <div>
          <p v-for="(item,index) in items.dataLists.list">{{item}} </p>
        </div> -->
        <!-- 空数据 -->
        <div
          v-if="items.dataLists.list.length===0 && !items.oneReload"
          class="null"
        >
          <img src="../images/ticket_null.png" alt="空盒子"/>
          <h4>暂无相关福利</h4>
          <input
            class="cell_input"
            :value="inputVal"
            type="button"
            @touchstart.stop.prevent="routerReplace('/activity/news')"
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
  import { Cell } from 'plugins/welfare'
  import welfare from 'plugins/welfare/welfare'
  import MiniRefreshTools from 'minirefresh'
  export default {
    components: {
      Cell
    },
    mixins: [welfare],
    data() {
      return {
        lineHeight: 3, // 线高度
        getBarWidth: () => {return (40/75)+'rem'}, // 线宽度
        activeColor: '#0c72e3', //tab颜色
        indexTab: this.$route.query.index || 0, // 选项卡与内容绑定
        titleTab: '卡券',  //默认选中
        inputVal: '去活动中心逛逛',
        type: null,
        threshold: window.innerWidth/2 || document.body.clientWidth/2,

        /**
         * 类型
         */
        listItems: [
          { name: '卡券', refName: 'coupon', scroll:null,  type: 0, page:1, oneReload: true,  responseing: false, isMore: true, dataLists: {list:[], total: 0,}, api: 'user.coupon.list'  },
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

        ],
      }
    },
    // beforeRouteEnter(to, from, next){
    //   next(vm =>{
    //     vm.$root.title = to.name
    //   })
    // },
    computed: {},
    watch: {},
    created() {

    },
    mounted() {
      this.indexTab = this.$route.query.index || 0
      // console.log(this);
      // this.show = true
      // this.setTitleText(this.$route.name)
      // this.indexTab = index
      // -----------以下为我的注释----------------------
      // let index = this.$route.query.index || 0
      // this._apiListFun(index)
      // setTimeout(()=>{
      this.$nextTick(()=>{
        this.upRefresh()
      })
      // this.$flash({
      //   messages:this.$JinrSDK.getUrl().token
      // })

    },
    methods: {
      onTabFun(index){
        // console.log('--xxx------', index);
        //  this.listItems.forEach((res,i)=>{
            this.resf[index].endUpLoading(this.listItems[index].dataLists.list.length >=  this.total[index])  // 是否停止上拉刷新
        //  })
        // this._apiListFun(index)
      },
      /***
       *
       * @author 7043
       * @param (Number) index 0理财红包 1现金红包 2卡券
       */
      _apiListFun(index){
        console.log('index--------', index)
        index = typeof index !== 'number' ? this.indexTab : index
        console.log('--------', this.listItems, index)
        // debugger
        let data = {
          method: this.listItems[index].api,
          token: this.$root.appData.token||this.$JinrSDK.getUrl().AppToken, // 活动挑战appweb页面时在活动页面url写入app token
          page: this.listItems[index].page,
          page_size: 10
        }
        // console.log('进来了', this.$root.appData.token)

        this.listItems[index].type
          ? (data['type'] = this.listItems[index].type)
          : data
        this._request(index, data)
      },
      // 去激活 或者 去使用
      deActiva(index, cuserid, coupon_type, status){

        if(status === 1){
          let listItem = this.listItems[0].dataLists.list[index]
          // console.log(listItem.cuserid, index);

          if(true){
            this.$JinrSDK.pushProductTurnIn(
              listItem.productid.toString(),
              listItem.productname.toString(),
              listItem.productType.toString(),
              '3',
              '0',
              listItem.cuserid.toString(),
              listItem.selected_name,
              '1'
            )
            // try {
            //   /**
            //    * productId 产品ID
            //    * productName 产品名字
            //    * productTypeId 产品类型ID
            //    * fromPage 从哪个页面跳转过来的 1-首页 2-资产页 3-详情页  4-活动页
            //    * eventRefId 活动事件ID,活动的页面点击的时候传，其余默认为“0”
            //    * couponId 卡券ID
            //    * couponName 卡券名称
            //    */
            //   Jinr.pushProductTurnIn(
            //     listItem.productid.toString(),
            //     listItem.productname.toString(),
            //     listItem.productType.toString(),
            //     '3',
            //     '0',
            //     listItem.cuserid.toString(),
            //     listItem.selected_name
            //   )
            // } catch (error) {
            //   this.$flash(this.changeI18n(error))
            // }
          }
          return
        }
        // this.listItems[2].dataLists.list[index].status = 2
        // return
        let platform = this.isIOS ? 3 : 4
        this.$http({
          method: 'user.coupon.activate',
          token: this.$root.appData.token,
          platform: this.$root.appData.platform || platform,
          cuserid: cuserid
        }).then((res)=>{
          if(res){
            if(res.code === 1000000){
              this.$flash(res.msg)
              return
            }
          }else{
            this.listItems[this.indexTab].dataLists.list[index].status = 2
            this.$flash('激活成功')
          }

        }).catch(function(error){
          this.$flash('激活失败')
        });
      },

      // 改变绑卡之后状态
      changeStatusIndex(index){

        this.listItems[this.indexTab].dataLists.list[index].status = 0
      },

      // 进入详情
      goToDetaliFun(cuserid, type){
        this.type = type
        this.$router.push({
          path: `/welfare/detail`,
          query: {
            type,
            cuserid
          }
        })
      },
      // callb(){
      //   this._apiListFun()
      // },
    // 初始化下拉刷新
      upRefresh(){
        this.listItems.forEach((item,index)=>{
          var _this = this;
          this.resf[index] = new MiniRefresh({
            container: `#minirefresh${index}`,
            down: {
              callback: function() {},
              isLock: true // 锁定下拉刷新
            },
            up: {
              callback: _this._apiListFun,
              isAuto: true,
              // isShowUpLoading	:false
            },
            isScrollBar: false
          });
        })
      }

    }
  }
</script>

