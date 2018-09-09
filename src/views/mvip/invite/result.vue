<style lang="stylus" rel="stylesheet/stylus">
@import '~style/mixin.styl';
.result
  .banner-vip
    img
      width: 100%;
      height: 360px;
  .main
    padding: 34px 28px 0;
    color: #333;
    h1.yaoqin
      height: 76px;
      padding-left: 50px;
      margin-bottom: 20px;
      line-height: @height;
      font-size: 30px;
      background-color: rgb(255, 255, 255);
      box-shadow: 0px 2px 16px 0px rgba(18, 117, 215, 0.16);
      span
        color: $mvip-color;
    .lists
      position: relative;
      padding-top: 10px;
      text-align: center;

      .top-title
        overflow: hidden;
        height: 68px;
        border-radius: 12px;
        line-height: @height;
        background-color: #69abf4;
        span
          float: left;
          width: 33.3%;
          font-size: 24px;
          color: #fff;
      li
        span
          float: left;
          width: 33.3%;
          font-size: 24px;
          color: #fff;
      .list
        height: 345px;
        ul
          li
            overflow: hidden;
            height: 68px;
            line-height: @height;

            &:nth-child(odd)
              background-color: #eff7fc;
            span
              color: #333;
    .minirefresh-wrap
      top: 80px;
      height: 345px;
  .footer-r
    position: absolute;
    bottom: 0;
    width: 100%;
    font-size: 34px;
    text-align: center;
    a
      display: block;
      width: 100%;
      height: 98px;
      line-height: @height;
      background-color: $mvip-color;
      color: #fff;
    p
      line-height: 40px;
      font-size: 24px;
      color: #999;
  .showAlert
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    background: rgba(0, 0, 0, 0.5);
    .convip
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      border-radius: 5px;
      background: #ffffff;
      img
        width: 540px;
        height: 360px;
  .icon_edit
    position: fixed;
    bottom: 100px;
    right: 10px;
    z-index: 9999;
    width: 150px;
    height: @width;
    line-height: @width;
    text-align: center;
    border-radius: 50%;
    opacity: 0.98;
    background: #1b9af4;
    box-shadow: 0 6px 30px 0 rgba(52, 96, 183, 0.28);
    cursor: pointer;
    .icon_edit .lite-iconf-editor
      font-size: 50px;
    .lite-iconf
      font-size: 35px;
      color: #fff;
  .main1
    div.top
      padding: 35px 38px 0;
      display: flex;
      justify-content: space-between;
    >div.result-tab
      width: 100%;
      margin-top: 24px;
      border-bottom: 1px solid rgb(169, 169, 169);
      ul.tabclick
        display: flex;
        >li
          flex: 1;
          height: 68px;
          text-align: center;
          font-size: 24px;
          color: #000;
          line-height: 68px;
          background: rgb(202, 202, 202);
          &:first-child
            margin-right: 2px;
          &.active
            color: white;
            background: rgb(42, 139, 246);
    >div.table
      >div.table-content-box
        position: relative;

        ul
          box-sizing: border-box;
          padding: 0 20px;

          li
            font-size: 22px;
            color: #666;
            height: 72px;
            line-height: 72px;
            display: flex;
            justify-content: space-around;
            border-bottom: 1px solid rgb(209, 209, 209);
            span
              display: block;
              text-align: center;
              flex: 1 1 auto;
              // overflow: hidden;
              &:first-child
                flex: 0 1 170px;
                line-height: 28px;
                padding-top: 15px;
          &.first
            li
              span
                &:nth-child(2)
                  box-sizing: border-box;
                  width: 150px;
                  flex: 0 1 150px;
                  padding-top: 15px;
                  line-height: 28px;
                  word-wrap: break-word;
                  word-break: normal;
                &:nth-child(3)
                  flex: 0 1 130px;
                &:nth-child(4)
                  width: 100px;
                  flex: 0 0 100px;
                  padding-top: 15px;
                  line-height: 28px;
                  word-wrap: break-word;
                  word-break: normal;
                &:nth-child(5)
                  flex: 0 1 120px;
                  padding-top: 15px;
                  line-height: 28px;
                  word-wrap: break-word;
                  word-break: normal;
          &.second
            li
              span
                &:first-child
                  flex: 0 1 200px;
                  line-height: 72px;
                  padding:0;


                &:nth-child(2)
                  flex: 0 1 190px;
                  line-height: 28px;
                  padding-top: 15px;
                &:nth-child(3)
                  width: 150px;
                  flex: 0 1 150px;
                  padding-top: 15px;
                  line-height: 28px;
                  word-wrap: break-word;
                  word-break: normal;
      .minirefresh-wrap
        // top: 80px;
        height: 340px;
        // overflow hidden;
</style>
<template>
<div class="result">
  <loading v-if="!show"></loading>
  <div >
    <div class="banner-vip" v-if="vip_level===1"><img src="../assets/vip_banner.jpg" alt="鲸鱼"></div>
    <!-- 主体区域  一级邀请人 -->
    <div class="main" v-if="vip_level===1">
      <h1 class="yaoqin">我累计邀请好友数: <span>{{vipdata.total_invite_user}}</span></h1>
      <h1 class="yaoqin">我累计邀请投资额：<span>{{vipdata.total_invest_money}}</span></h1>
      <div class="lists">
        <div class="top-title">
          <span>我的好友</span>
          <span>累计投资金额</span>
          <span>邀请时间</span>
        </div>
        <div class="list minirefresh-wrap" id="minirefresh">
                <div class="minirefresh-scroll">
                    <ul>
                      <li
                        v-for="(item, index) in tbData1"
                        :key="index"
                        >
                          <span>{{item.mobile}}</span>
                          <span>￥{{item.money}}</span>
                          <span>{{item.date}}</span>
                      </li>
                  </ul>
                </div>
        </div>
      </div>
    </div>
     <!-- 主体区域  原始邀请人 -->
    <div class="main1" v-if="vip_level===0">
          <div class="top">
              <hd :cls="'left'" :data="vipdata">
                <p slot="type">今日累计</p>
                <p slot="bottom">今日累计邀请投资金额（元）</p>
              </hd>
              <hd :cls="'right'" :data="vipdata">
                <p slot="type">历史累计</p>
                <p slot="bottom">累计邀请投资金额（元）</p>
              </hd>
          </div>
          <div class="result-tab">
              <ul class="tabclick">
                   <li @click="tbclick(1)" :class="{active:params.vip_level===1}">一级被邀请人（员工）</li>
                   <li @click="tbclick(2)" :class="{active:params.vip_level===2}">二级被邀请人</li>
              </ul>
          </div>
          <div class="table">
             <titles v-if="params.vip_level===1" :items="items0" :cls="'first'"></titles>
             <titles v-if="params.vip_level===2" :items="items1" :cls="'second'"></titles>
             <div class="table-content-box">
                <div class="list minirefresh-wrap" id="minirefresh">
                        <div class="minirefresh-scroll">
                            <ul v-if="params.vip_level===1" class="first">
                              <li
                                v-for="(item, index) in tbData0"
                                :key="index"
                                >
                                  <span>{{item.level_one_inviter}}<br/>{{item.username}}</span>
                                  <span>￥{{item.money}}</span>
                                  <span>{{item.register_date}}</span>
                                  <span>{{item.total_invite_user}}</span>
                                  <span>￥{{item.total_invest_money}}</span>
                              </li>
                          </ul>
                          <ul v-if="params.vip_level===2" class="second">
                              <li
                                v-for="(item, index) in tbData0"
                                :key="index"
                                >
                                  <span>{{item.level_two_inviter}}</span>
                                  <span>{{item.level_one_inviter}}<br/>{{item.username}}</span>
                                  <span>￥{{item.money}}</span>
                                  <span>{{item.register_date}}</span>
                              </li>
                          </ul>
                        </div>
                </div>
             </div>

          </div>
    </div>

    <!-- 尾部 -->
    <div class="footer-r" v-if="!isPc">
      <p>点击右上角，分享邀请好友</p>
      <a
        class="download"
        :href="downloadAPP"
        v-text="'下载APP'"
      ></a>
    </div>

      <div
        class="icon_edit"
        v-if="isPc"
        @click="closeWebPageFun"
      >
        <i class="lite-iconf lite-iconf-editor">OUT</i>
      </div>

  </div>
</div>
</template>

<script>
import fetchWXconfig from "utils/fetchWXconfig";
import MiniRefreshTools from "minirefresh";
import hd from "./hd";
import titles from "./table-title";
import Flash from 'components/flash';
export default {
  components: {
    hd,
    titles
  },
  data() {
    return {
      show: false,
      responseing: false,
      vipdata: {},
      // inviteRanking: [],
      pageTotal: 0,
      tbData1: [],
      tbData0: [],
      wxShare: "",
      dataSign: "",
      vip_level: null,
      params: {
        // 用于存储列表查询参数
        servicename: "user.vipList",
        page: 1,
        page_size: 10,
        vip_level: 1
      },
      resf: null,
      items0: [
        "一级被邀请人",
        "投资额",
        "注册时间",
        "累计邀请人数",
        "累计邀请投资金额"
      ], // 一级邀请人
      items1: ["二级被邀请人", "一级被邀请人", "累计投资金额", "邀请注册时间"], // 二级邀请人
      Isdisable: true,
      oldTBVal: 1 // 重复点击统一tab不发送请求。
    };
  },
  computed: {
    url() {
      // + window.location.hash
      return window.location.origin + window.location.pathname;
    },
    isPc() {
      let bool = /Android|webOS|iPhone|iPod|BlackBerry/i.test(
        navigator.userAgent
      )
        ? false
        : true;
      return bool;
    }
  },
  watch: {},
  created() {
    this.initFun();
    this.shareFun(); // 调取微信分享接口
  },
  mounted() {
    setTimeout(() => {
      this.contentInit();
    }, 1000);
  },
  methods: {
    initFun() {
      // 获取用户初始信息
      this.$http({
        servicename: "user.vipdata"
      })
        .then(res => {
        if(res.code === 1000403){
          Flash('非常抱歉，你无法进入');
          this.$router.replace("/invited");
        }
          this.vipdata = res;
          this.vip_level = res.be_invited_level;
          if (this.vip_level === 1) {
            this.dataSign = "tbData1"; // 二级级邀请人
            this.params.servicename = "user.vipsecondlist";
            this.$delete(this.params, "vip_level"); // 删除级别字段
          } else {
            this.dataSign = "tbData0"; // 原始一级级邀请人
            this.params.vip_level = 1; // 默认请求一级邀请人数据
          }
        })
        .catch(error => {
          this.$router.replace("/invited");
        });
    },
    contentInit() {
      // 下拉初始化
      var _this = this;
      this.resf = new MiniRefresh({
        container: "#minirefresh",
        down: {
          callback: function() {},
          isLock: true // 锁定下拉刷新
        },
        up: {
          callback: _this.getTbData
          // loadFull:{
          //   isEnable:false,
          //   delay:1000
          // }
        },
        isScrollBar: false
      });
    },
    agreeFun() {
      this.isgouZc = !this.isgouZc;
    },
    getTbData(fun) {
      this.$http(this.params)
        .then(res => {
          this.show = true;
          !this.pageTotal ? (this.pageTotal = res.total_count) : "";
          this.params.page++;
          if (this.dataSign === "tbData1") {
            this.tbData1 = this.tbData1.concat(res.list);
            this.resf.endUpLoading(this.tbData1.length === this.pageTotal);
            // console.log('xxxxxxx', this.tbData1.length, this.pageTotal)
          } else {
            this.tbData0 = this.tbData0.concat(res.list);
            this.resf.endUpLoading(this.tbData0.length === this.pageTotal);
            // console.log('this.tbData1',this.resf, this.tbData0.length, this.pageTotal);
            // console.log(this.tbData1, this.tbData0.length, this.pageTotal);
          }
          this.Isdisable = true; // 节流
          // setTimeout(()=> {
          //   this.responseing = false
          // }, 770);
        })
        .catch(error => {
          this.show = true;
          setTimeout(() => {
            this.responseing = false;
          }, 770);
          console.log("报错了");
          // this.$router.replace('/invited')
          console.log("-----", error);
        });
    },
    // 获取验证码
    GetVerificationCode() {
      if (!this.verificaTel()) return;
      this.$http
        .post(
          sendSms,
          {
            tel: this.telVal,
            event_key: this.event_key
          },
          { emulateJSON: true }
        )
        .then(response => {
          response = response.data;
          console.log(response);
          if (response.code == 10000) {
            this._countDown();
          } else {
            this.warnInfo = response.data;
            this.showWarn = true;
          }
        });
    },
    //关闭浏览器
    closeWebPageFun() {
      //close IE
      if (navigator.userAgent.indexOf("MSIE") > 0) {
        if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
          window.opener = null;
          window.close();
        } else {
          window.open("", "_top");
          window.top.close();
        }
        //close firefox
      } else if (navigator.userAgent.indexOf("Firefox") > 0) {
        window.location.href = "about:blank ";
        //close chrome;It is effective when it is only one.
      } else {
        window.opener = null;
        window.open(" ", "_self");
        window.close();
      }
    },
    tbclick(index) {
      console.log('index', index)
      if(this.oldTBVal === index) return
      if (this.Isdisable) {
        this.params.vip_level = index;
        (this.tbData1 = []), (this.tbData0 = []);
        this.pageTotal = null; // 总页码记录清空
        this.params.page = 1; //请求参数页码置零
        this.resf.resetUpLoading(); // 重置上拉加载
        this.Isdisable = false;
        this.oldTBVal = index // 将旧的tab值存起来
      }
    },
    shareFun() {
      this.$http({
        servicename: "api.activity",
        combination_id: sessionStorage["combination_id"] || "",
        param: sessionStorage["param"] || "",
        url: this.url
      })
        .then(res => {
          // this.show = true
          // this.inviteRanking = res.inviteRanking;
          this.show = true;
          // console.log("res", res);
          fetchWXconfig(res.wxShare);
          setTimeout(() => {
            this.responseing = false;
          }, 770);
        })
        .catch(error => {
          console.log("res", error);
          this.show = true;
          setTimeout(() => {
            this.responseing = false;
          }, 770);
          // this.$router.replace('/invited')
          console.log(error);
        });
    }
  }
};
</script>
