<template>
<div
  class="act-news fixed"
  v-if="show"
>
  <!-- <scroll :bounce="bounce" :data="activtyList"> -->
    <!-- 滚动容器 -->
    <div class="news">
      <!-- banner -->
      <jinr-swiper
        auto
        :list="data.bannerList"
        dots-class="custom-bottom"
        dots-position="center"
        v-if="data.bannerList.length"
      ></jinr-swiper>

      <!-- 中间 :url="item.url"-->
      <jinr-row class="mid" >
        <jinr-col
          :span="rowSpan"
          v-for="(item, index) in data.buttonList"
          :key="index"
          :url="item.url"
          :name="item.title"
          @click="addBuried(index)"
        >
          <img :src=" buildUrl(item.img)" :alt="item.title" />
          <p v-text="item.title"></p>
        </jinr-col>
      </jinr-row>
      <div class="looks" v-if="data.bannerList.length && data.buttonList.length"></div>

      <!-- 活动列表 -->
      <ul class="activty" v-if="!!activtyList.length">
        <h1 class="a-hot">热门活动</h1>
        <li
          class="item-list"
          v-for="(item, index) in activtyList"
          :key="index"
          @click="goToUrl(item.url)"
        >
          <div
            class="img-item"
            :style="{backgroundImage: buildBackgroundUrl(item.image)}"
          >
            <span :class="{engActive: item.desc}"><label>{{item.desc}}</label></span>
            <p></p>
          </div>
        </li>
        <!-- <p class="news-prompt" v-show="platform == 3">*您通过本软件参与的任何活动与苹果公司无关</p> -->
      </ul>
      <div class="no-more" v-else>暂无相关活动</div>
      <Detail-end v-show="platform == 3" text = "*您通过本软件参与的任何活动与苹果公司无关"></Detail-end>
    </div>
  <!-- </scroll> -->
</div>


</template>

<script>
import DetailEnd from "../components/bottom-end/bottom-end.vue";
export default {
  components: {
    DetailEnd
  },
  data() {
    return {
      show: false,
      rowNum: 4, //一行小于4就换行
      bounce: true,
      data: {
        bannerList: [],
        buttonList: [],
        platform: ""
      },
      // 活动列表
      activtyList: []
    };
  },
  computed: {
    rowSpan() {
      if (this.data.buttonList.length > this.rowNum) {
        return this.rowNum * 2;
      }
      return parseInt(24 / this.data.buttonList.length);
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$root.title = to.name;
    });
  },
  watch: {},
  created() {
    // ios客户端 存在bug 返回时无法获取token
    if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
      if (sessionStorage.getItem("bak_token")) {
        this.$root.appData.token = sessionStorage.getItem("bak_token");
      } else {
        sessionStorage.setItem("bak_token", this.$root.appData.token);
      }
    }

    this.changeTitle("活动资讯");
    this.initFun();
    this._activtyList();
  },
  mounted() {
    this.platform = this.$JinrSDK.platform; // 获取应用版本号
  },
  methods: {
    addBuried(index) {
      if (index == 0) {
        try {
          Jinr.addBuried("WHALE_SAYS_HITS", "0");
        } catch (error) {}
      } else if (index == 1) {
        try {
          Jinr.addBuried("WHALE_DYNAMIC_HITS", "0");
        } catch (error) {}
      } else if (index == 2) {
        try {
          Jinr.addBuried("WHALE_STORY_HITS", "0");
        } catch (error) {}
      }
      this.routerPush(
        "/service/twoList",
        { typeid: item.ptypeid },
        item.type_name
      );
    },

    // 顶部信息
    initFun() {
      // this.listItems[index].responseing = true //请求中
      this.show = false;
      let data = {
        method: "system.activty.home.ad",
        token: this.$root.appData.token,
        //平台类型 1-PC|2-WAP|3-IOS|4-Android|5-IOS回馈。345都是获取app
        platform: parseInt(this.$JinrSDK.platform),
        longitude: this.$JinrSDK.longitude || "0", //经度
        latitude: this.$JinrSDK.latitude || "0", //纬度
        app_v: this.$JinrSDK.app_v //版本号
      };

      this.$http(data).then(response => {
        response.bannerList = response.bannerList.map((item, index) => ({
          // url: 'http://'+item.url,
          url: item.url,
          img: item.img
        }));

        this.data = response;
        this.show = true;
      });
    },

    // 活动列表
    _activtyList() {
      // this.listItems[index].responseing = true //请求中
      let data = {
        method: "system.activty.home.list",
        token: this.$root.appData.token,
        page: 1,
        //平台类型 1-PC|2-WAP|3-IOS|4-Android|5-IOS回馈。345都是获取app
        platform: parseInt(this.$JinrSDK.platform),
        longitude: this.$JinrSDK.longitude || "0", //经度
        latitude: this.$JinrSDK.latitude || "0", //纬度
        app_v: this.$JinrSDK.app_v //版本号
      };

      this.$http(data).then(response => {
        // 活动页面两个用户反馈看不到活动列表
        // .jinr-msgbox-message
        //   word-wrap break-word
        // this.$messagebox({
        //   title: 'token',
        //   message: Jinr.getToken() || 'err',
        // });
        this.activtyList = response.list;
      });
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~style/index.styl';

.act-news {
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  background-color: $color-white;

  .news {
    &-banner {
      height: 370px;
    }

    .mid {
      overflow: hidden;
      padding: 26px 0 0 0;
      text-align: center;

      img {
        width: 60px;
        height: @width;
      }

      p {
        line-height: 56px;
        font-size: 26px;
      }

      &>div {
        padding-bottom: 15px;
      }
    }

    .looks {
      height: 30px;
      background-color: #f5f5f5;
    }
  }

  .item-list {
    height: 400px;
  }

  ul.activty {
    padding: 0 20px 60px;

    .a-hot {
      padding-left: 48px;
      line-height: 96px;
      font-size: 32px;
      background: url('./images/hot.png') no-repeat left center;
      background-size: 30px 36px;
      color: #333;
    }

    li {
      padding-bottom: 20px;

      .img-item {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 6px;
        background-repeat: no-repeat;
        background-size: 100% 100%;

        span {
          // border-radius 4px
          line-height: 400px;
          border-radius: 6px;
          text-align: center;
          font-size: 26px;

          &.engActive {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.3);
            color: #fff;

            label {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate3d(-50%, -50%, 0);
              width: 160px;
              height: 50px;
              line-height: @height;
              border-radius: 5px;
              background-color: rgba(0, 0, 0, 0.5);
              color: #ccc;
            }
          }
        }
      }
    }
  }
  .no-more{
    font-size:32px;
    text-align center;
    margin:40px;
  }
}
</style>