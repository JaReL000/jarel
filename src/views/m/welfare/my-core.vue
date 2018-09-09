<style lang="stylus" rel="stylesheet/stylus">
@import '~style/mixin.styl';

.my-welfare {
  background-color: #f5f5f5;

  .tab {
    position: fixed;
    left: 0;
    top: 0;
    // z-index 2
    margin-top: 0;
    height: 100px;
    width: 100%;
  }

  .slider {
    width: 100%;
    position: fixed;
    top: 100px;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .financing, .cash, .coupon {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;

    .null {
      padding-top: 120px;
      text-align: center;

      img {
        width: 256px;
        height: 191px;
      }

      h4 {
        margin-bottom: 58px;
        font-size: 44px;
        line-height: 100px;
        color: #b3b3b3;
      }

      input.cell_input {
        height: 68px;
        width: 360px;
        line-height: @height;
        border-radius: (@height / 2);
        border: 1px solid mainColor;
        font-size: 32px;
        background-color: transparent;
        color: mainColor;

        &:active {
          border-color: #b3b3b3;
          color: #b3b3b3;
        }
      }
    }
  }

  .more {
    font-size: 30px;
    line-height: 80px;
    text-align: center;

    &:active {
      color: #999;
    }
  }
}
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
      :threshold="threshold"
      height="100%"
      @on-index-change="onSwitchChange"
      class="slider"
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
          :refName="items.refName" 
          :index="indexItem"
          :isMore="(items.isMore)"
          @moreIngFun="_apiListFun"
          @deActiva="deActiva"
          @goToDetaliFun="goToDetaliFun"
        ></cell>
        </div>
        <!-- 空数据 -->
        <div 
          v-if="items.dataLists.list.length===0 && !items.oneReload"
          class="null"
        >
          <img src="./images/ticket_null.png" alt="空盒子"/>
          <h4>暂无相关福利</h4>
        </div>    
      </jinr-swiper-item> 
    </jinr-swiper>
    <router-view
      :type="type"
    ></router-view>
  </div>
</template>

<script>
import { Cell } from "plugins/welfare";
import welfare from "plugins/welfare/welfare";
import MiniRefreshTools from "components/upRefresh/minirefresh.js"; // 上拉加载插件
export default {
  components: {
    Cell
  },
  mixins: [welfare],
  data() {
    return {
      lineHeight: 3, // 线高度
      getBarWidth: () => {
        return 40 / 75 + "rem";
      }, // 线宽度
      activeColor: "#0c72e3", //tab颜色
      indexTab: 0, // 选项卡与内容绑定
      titleTab: "理财红包", //默认选中
      inputVal: "去活动中心逛逛",
      type: null,
      threshold: window.innerWidth / 2 || document.body.clientWidth / 2,

      /**
       * 类型
       */
      listItems: [
        {
          name: "理财红包",
          refName: "financing",
          type: 22,
          page: 1,
          scroll: null,
          oneReload: true, //是否第一次请求
          responseing: false, //请求中
          isMore: true,
          dataLists: {
            total: 0,
            list: [] //数据源
          },
          api: "red.Packet.list" //红包接口 type 1-理财红包 2-现金红包
        },
        {
          name: "现金红包",
          refName: "cash",
          scroll: null,
          type: 21,
          page: 1,
          oneReload: true,
          responseing: false,
          isMore: true,
          dataLists: { list: [], total: 0 },
          api: "red.Packet.list"
        },
        {
          name: "卡券",
          refName: "coupon",
          scroll: null,
          type: 0,
          page: 1,
          oneReload: true,
          responseing: false,
          isMore: true,
          dataLists: { list: [], total: 0 },
          api: "user.coupon.list"
        }
      ]
    };
  },
  computed: {},
  watch: {},
  created() {
    // this._apiListFun(0);
  },
  mounted() {
    this.upRefresh();
  },
  methods: {
    onTabFun(index) {
       this.resf[index].endUpLoading(this.listItems[index].dataLists.list.length ==  this.total[index])  // 是否停止上拉刷新
    },
    /***
     *
     * @author 7043
     * @param (Number) index 0理财红包 1现金红包 2卡券
     */
    _apiListFun(index) {
      index = typeof index !== "number" ? this.indexTab : index;
      let data = {
        servicename: "Welfare.index",
        type: this.listItems[index].refName,
        page: this.listItems[index].page,
        // page_size: 5 //默认五条
      };
      this._request(index, data);
    },

    // 去激活
    deActiva(index, cuserid, coupon_type) {
      this.$http({
        servicename: "Welfare.activeCoupon",
        cuserid: cuserid || ""
      })
        .then(res => {
          // 成功之后返回data {logId: "15109131405a0eb4745324c"}
          if (res) {
            if (res.code === 1000000) {
              this.$flash(res.msg);
              return;
            }
          }
          this.listItems[2].dataLists.list[index].status = 2;
          this.$flash("激活成功");
        })
        .catch(function(error) {
          console.log("激活失败");
        });
    },

    // 进入详情
    goToDetaliFun(cuserid, type, refName) {
      this.type = type;
      this.$router.push({
        path: `/welfare/myCore/detail`,
        query: {
          refName,
          cuserid
        }
      });
    },
    // 初始化下拉刷新
    upRefresh() {
      this.listItems.forEach((item, index) => {
        var _this = this;
        this.resf[index] = new MiniRefresh({
          container: `#minirefresh${index}`,
          down: {
            callback: function() {},
            isLock: true // 锁定下拉刷新
          },
          up: {
            callback: _this._apiListFun,
            isAuto: true // 如果首次加载不能满屏，上啦加载会失效，即每次请求获取的数据条数少于5条
          },
          isScrollBar: false
        });
      });
    }
  }
};
</script>

