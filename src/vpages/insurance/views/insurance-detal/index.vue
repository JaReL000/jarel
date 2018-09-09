<template>
   <div class="insurance-detal">
        <hd
        :title="{name:'臻爱-百万医疗保险'}"
        :rightOptions="{textCopy:'我的保险'}"
        @onClickUrl="goMine"
        ></hd>
        <div class="banner">
            <p>保障期限：1年</p>
            <p>承保年龄：30天-60周岁以上</p>
            <p>已售：<span v-text="soldNum"></span></p>
        </div>
        <div class="banner-bottom">
             <div class="left">
                 <p>臻爱，百万医疗保险</p>
                 <p>意外事故/一般医疗/恶性肿瘤</p>
             </div>
             <div class="right"></div>
        </div>
        <div class="insurance-section1">
            <p ><span>保障利益</span></p>
            <p><span>意外事故及伤残</span><span>10万元</span></p>
            <p><span>一般医疗保险</span><span>100万元</span></p>
            <p><span>恶性肿瘤医疗保险金</span><span>100万元</span></p>
            <div>更多详情，请阅读<router-link to="/information?index=0">《产品介绍》</router-link>和<router-link to="/information?index=1">《保险条例》</router-link></div>
        </div>
        <p ><span>保障期限</span><span>1年</span></p>
        <p ><span>承保年龄</span><span>30天-60周岁</span></p>
        <div class="type-nave">
            <div :class="{active: act===0 }" @click.stop="select(0,'noRequest')">经典版<br/><span v-text="defaultPrice[0]"></span>元起</div>
            <div :class="{active: act===1 }" @click.stop="select(1,'noRequest')">升级版<br/><span v-text="defaultPrice[1]"></span>元起</div>
            <div :class="{active: act===2 }" @click.stop="select(2,'noRequest')">尊享版<br/><span v-text="defaultPrice[2]"></span>元起</div>
        </div>
        <ul class="bottom-nav">
             <li v-for="(item,index) in bottomNav" :key="index">
                 <router-link :to="`/information?index=${index}`">
                    <img :src="item.url" alt="">
                    <p v-text="item.text"></p>
                 </router-link>
             </li>
        </ul>
        <div class="bottom-btn fixed-x">
            <div>
                <a href="http://newm.baigebao.com/Customer/index">
                    <p>
                    <img src="./images/insurance-detal_bottomBtn_1.png" alt=""><br/>客服
                    </p>
                </a>
            </div>
            <p class="btn-p" v-text="'¥'+ parseFloat(price).toFixed(2)"></p>
            <p class="btn-p" @click.stop="submit">立即投保</p>
        </div>
        <component :is="dg" v-model="show">
            <div class="dialog-insurance-content">
               <div class="section section1">
                   <label>出生日期：</label>
                    <div class="left">
                         <!-- <input type="text" ref="birthday" placeholder="请于身份证上的出生年月一致"
                         @click="dataSelect($event)" :value="insuranceData.birthday"
                         @focus="e.target.blur();"
                         > -->
                         <div  class="birthday-value" @click.stop="dataSelect($event)">
                             <span class="placeHolder" v-if="!insuranceData.birthday">请与身份证上的出生年月一致</span>
                             <span class="value" v-else v-text="insuranceData.birthday">请与身份证上的出生年月一致</span>
                        </div>
                         <p>30天60周岁(投保金额与出生日期相关)</p>
                    </div>
               </div>
               <div class="section section2">
                    <label>保障范围：</label>
                    <div class="left">
                        <div class="nav">
                            <p @click.stop="select(0)" :class="{'active':act === 0}">经典版</p>
                            <p @click.stop="select(1)" :class="{'active':act === 1}">升级版</p>
                            <p @click.stop="select(2)" :class="{'active':act === 2}">尊享版</p>
                        </div>
                        <div class="text">
                            <p><span>意外故意伤残</span><span v-text="insuranceType[this.act][0]">10万元</span></p>
                            <p><span>一般医疗保险</span><span v-text="insuranceType[this.act][1]">100万元</span></p>
                            <p><span>恶性肿瘤医疗保险</span><span v-text="insuranceType[this.act][2]">100万元</span></p>
                        </div>
                    </div>
               </div>
                <div class="section section2  section3">
                    <label>有无社保：</label>
                    <div class="left">
                        <div class="nav">
                            <p @click.stop="choose(0)" :class="{'active':insuranceData.security === 0}">有</p>
                            <p @click.stop="choose(1)" :class="{'active':insuranceData.security === 1}">无</p>
                        </div>
                    </div>
               </div>
                <div class="section section2 section4">
                    <label>保险期限：</label>
                    <div class="left">
                        <p>一年</p>
                    </div>
               </div>
                <div class="section section4">
                    <label>保险期限：</label>
                    <div class="left">
                        <p v-text="bx_limit.start"></p>
                        <p v-text="bx_limit.endTime"></p>
                    </div>
               </div>
            </div>
        </component>
   </div>
</template>
<script>
import dogle from "./component/dialog";
export default {
  data() {
    return {
      act: 0, // 社保类型选择 0经典版，1升级版，2尊享版
      defaultPrice: {
        0: "",
        2: "",
        3: ""
      }, // 每种类型保险默认价格
      price: "", // 保险价格
      testSata: 1, // 用户状态模拟
      dg: null,
      show: false,
      bottomNav: [
        {
          url: require("./images/insurance-detal_bottomNav_1.png"),
          text: "产品介绍"
          //   path:''
        },
        {
          url: require("./images/insurance-detal_bottomNav_2.png"),
          text: "保险条例"
        },
        {
          url: require("./images/insurance-detal_bottomNav_3.png"),
          text: "理赔流程"
        },
        {
          url: require("./images/insurance-detal_bottomNav_4.png"),
          text: "常见问题"
        }
      ],
      insuranceType: {
        // 保险类型
        0: ["10万元", "100万元", "100万元"],
        1: ["20万元", "200万元", "200万元"],
        2: ["30万元", "300万元", "300万元"]
      },
      insuranceData: {
        // 保险详细数据
        birthday: "",
        type: {},
        security: 0 // 有无社保
      },
      submitStat: 0, // 第一步
      soldNum: 0,
      userData: {},
      userData_res: {},
      requestIndex: 0,
      bx_limit: {
        start: "",
        endTime: ""
      }
      //   token:''
    };
  },
  mounted() {
    this.init();
    // console.log("=====>>>>", this.getTime());
  },
  computed: {
    appData() {
      return this.sessionGet("appData"); // 获取app登录token
    }
  },
  methods: {
    select(index, sign) {
      // 保险类型选择  'noRequest'
      console.log("xxxxx", Boolean(this.insuranceData.birthday));
      if (sign === "noRequest") {
        this.act = index;
        if (!this.insuranceData.birthday) {
          this.price = this.defaultPrice[index];
        } else {
          this.getTypePrice();
        }
      } else if (!this.insuranceData.birthday) {
        this.$flash("请选择生日");
        return;
      } else {
        this.act = index;
        this.getTypePrice();
      }
    },
    choose(index) {
      if (!this.insuranceData.birthday) {
        this.$flash("请选择生日");
        return;
      }
      this.insuranceData.security = index;
      this.getTypePrice();
    },
    init() {
      this.$http("/api/getPriceDetail", null, "get")
        .then(({ data: res }) => {
          // 获取价格以及数量
          // console.log("xxxx", res);
          if (!res.price || !res.price[0]) {
            this.$flash("请求失败");
            return;
          }
          this.soldNum = res.orderCount.soldCount;
          Object.assign(this.defaultPrice, res.price);
          this.price = res.price[0];
          // this.defaultPrice
        })
        .catch(err => {
          this.$flash("服务器繁忙，请稍后重试");
        });
      // 获取用户信息
      this.getUseData();
    },
    submit() {
      // this.$flash({
      //   message:this.$JinrSDK.token
      // })
      this.$nextTick(() => {
        if (this.submitStat === 0) {
          //线上使用
          if (!this.$JinrSDK.token && !this.appData) {
            // 获取不到token，跳转到登录页面
            this.$JinrSDK.pushLogin();
            this.$flash("您还未登录");
            this.sessionSet("userData", undefined);
            return;
          }
          let res = this.userData_res;
          if (res.code === 1000200) {
            // 获取成功已经登录
            if (res.data.check_status === 1 || res.data.check_status === 4) {
              // 已经绑卡，弹出遮罩层
              this.dg = dogle;
              this.show = true;
              this.submitStat = 1;
              this.userData = res.data;
              this._get_bx_limit();
              this._addRecord(); // 添加一条购买记录
            } else {
              // 没有绑卡，跳转到绑卡页面
              this.$JinrSDK.pushBindCard();
            }
          } else if (res.code === 1000503) {
            this.$flash(res.msg);
          } else {
            if (this.requestIndex > 2) {
              this.$flash({
                message: res.msg || "信号太弱，请稍后再试"
              });
            }
            this.getUseData(this.submit);
          }
        } else {
          // 被保险人健康告知页面
          if (!this.insuranceData.birthday) {
            // 必须选择日期之后才能投保
            this.$flash("请选择生日");
            return;
          }
          this.userData.plan_type = this.act; // 投保计划
          this.userData.bz_money = this.insuranceData.security; // 有无社保
          this.userData.price = this.price; // 初始社保仅用于展示价格
          this.sessionSet("userData", this.userData); // 写入seccionstorage
          this.$router.push("/health");
        }
      });
    },
    getUseData(callback) {
      this.requestIndex++;
      let params = {
        v: "1.0.4", // 接口版本号
        token: this.$JinrSDK.token,
        // appid: this.$JinrSDK.appid,
        appid: "jinr_baigebao",
        app_v: this.$JinrSDK.app_v
      };
      if (!!this.appData) {
        Object.assign(params, this.appData);
      }
      let testData = {
        //  用于测试
        //   token:"46faUwgHU1FWVAYHVldfUwMLB1JTAwJTUFYHUFpXDVBfBgRTMVFSBVABVwdWBF0CB1VZVQ0HClYDW1YEDlIBXARVBFsOPlFRV1wbB1IfCFtFAlgOAAIIBF9qUg",
        // 绑卡的
        v: "1.0.4",
        token:
          "919fAglUVgVUUgAIBVxTDVVRCwNdD1dZAFcHBAYBBFIBBgwCMAdXV1ZXVQtWAQUNVVIEVl9cVgwCAVICVlFVB1kFDFcLbVQFVVodCAAUVQQWAgUPDQ1bCgA9BQ",
        // unique_id: "",
        appid: "jinr_baigebao",
        app_v: "4.3.1"
      };
      // 当有token，并且session中没有写入是写入token;
      if (!this.sessionGet("appData") && this.check(params)) {
        this.sessionSet("appData", params);
      }
      this.$http("/api/getUserInfo", params, "post")
        .then(res => {
          this.userData_res = res;
          this.sessionSet("userData", res.data); // 写入seccionstorage
          if (this.requestIndex < 3) {
            this.$nextTick(() => {
              typeof callback == "function" ? callback() : "";
            });
          }
        })
        .catch(err => {
          this.$flash({
            message: res
          });
        });
    },
    dataSelect(event) {
      // 初始化日期选择器
      let _this = this;
      let time = this.getTime();
      this.$picker.show({
        type: "datePicker",
        limit: time.limit,
        // endTime: '1958-1-1',
        date: time.date,
        onOk(e) {
          let s_time = new Date(e).getTime();
          console.log("xxxxxxx", time.s_time[1], s_time, time.s_time[0]);
          if (s_time < time.s_time[1] || s_time > time.s_time[0]) {
            this.$flash("你不符合投保年龄");
            setTimeout(() => {
              _this.show = false;
            }, 500);
            return;
          }
          _this.insuranceData.birthday = e;
          _this.getTypePrice();
        }
      });
    },
    getTypePrice() {
      // 获取每种保险的价格
      this.$http(
        "/api/getPrice",
        {
          planType: this.act, //保险类型
          bzMoney: this.insuranceData.security, // 有无社保
          ageRange: this.insuranceData.birthday // 生日
        },
        "get"
      ).then(({ data: res }) => {
        this.price = res.price;
        console.log("res------", res);
      });
    },
    getTime(day, age) {
      // 获取日期选择器开始截止时间
      let endTime = new Date();
      let startTime = new Date();
      endTime.setDate(endTime.getDate() - 31);
      startTime.setFullYear(startTime.getFullYear() - 60);
      let s_endTime = endTime.getTime();
      let s_startTime = startTime.getTime();
      let date = `${endTime.getFullYear()}-${endTime.getMonth() +
        1}-${endTime.getDate()}`;
      endTime = endTime.getFullYear();
      startTime = startTime.getFullYear();
      // console.log('----',startTime, endTime)
      //   let today =
      return {
        limit: [startTime, endTime],
        s_time: [s_endTime, s_startTime],
        date
      };
    },
    goMine() {
      // 判断是否可以进入我的模块
      if (!this.$JinrSDK.token && !this.appData) {
        // 获取不到token，跳转到登录页面
        this.$flash("您还未登录");
        return;
      }
      this.$router.push("/myInsurance/?index=1");
    },
    check(params) {
      for (let key in params) {
        let val = params[key].trim();
        if (!val) {
          //   this.$flash("app信息获取失败");
          //   console.log("xxxx");
          return false;
          // break;
        }
      }
      return true;
    },
    _get_bx_limit() {
      //获取保险有效期
      let today = new Date();
      let temp = new Date();
      today.setDate(today.getDate() + 1);
      this.bx_limit.start = `自
        ${today.getFullYear()}年
        ${
          today.getMonth() + 1 < 10
            ? `0${today.getMonth() + 1}`
            : today.getMonth() + 1
        }月
        ${
          today.getDate() < 10 ? `0${today.getDate()}` : today.getDate()
        }日 00:00:00起
      `;
      temp.setFullYear(temp.getFullYear() + 1);

      this.bx_limit.endTime = ` 至
        ${temp.getFullYear()}年
        ${
          temp.getMonth() + 1 < 10
            ? `0${temp.getMonth() + 1}`
            : temp.getMonth() + 1
        }月
        ${
          temp.getDate() < 10 ? `0${temp.getDate()}` : temp.getDate()
        }日 23:59:59止
      `;
    },
    _addRecord(){
      this.$http('/api/orderCount',{
        key:"baigebao"
      },'get').then((res)=>{
        console.log('res',res)
      })
    }
    // goBack(){
    //     // console.log('history.length', history.length)
    //     for(let i=0; Math.abs(i)<history.length;i--){
    //         // i--;
    //         this.$router.go(i)
    //     }
    //     this.$JinrSDK.finish()
    // }
  },
  watch: {
    show(isShow) {
      if (!isShow) {
        this.dg = null;
        this.show = false;
        this.submitStat = 0; // 模态框关闭返回第一步
        // console.log("关闭了--------");
      }
    }
  }
};
</script>
<style lang="stylus">
.insurance-detal {
  background: #f5f5f5;
  font-size: 28px;

  .banner {
    box-sizing: border-box;
    height: 374px;
    background: url('./images/insurance-banner_bg.png') no-repeat;
    background-size: 100% 100%;
    padding: 116px 35px 0;
    font-size: 34px;
    // font-weight 900
    color: #fff;
    line-height: 52px;

    // insurance-detal_banner-bottom.png
    p {
      &:last-child {
        color: #5d8ab9;
        margin-top: 60px;
        // margin-top 116px
      }
    }
  }

  .banner-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    padding: 20px 28px;

    >div {
      font-size: 34px;
      line-height: 64px;

      &.right {
        width: 155px;
        height: 59px;
        background: url('./images/insurance-detal_banner-bottom.png') no-repeat;
        background-size: 100% 100%;
      }

      &.left {
        p:last-child {
          color: #b4b4b4;
        }
      }
    }
  }

  .insurance-section1 {
    margin-top: 30px;
    padding: 0 30px;
    background: #fff;

    >p {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #b4b4b4;
      font-size: 28px;
      line-height: 70px;
      box-sizing: border-box;

      &:first-child {
        color: #333333;
        line-height: 90px;
        color: #282831;
        border-bottom: 1px solid #e5e5e5;
        margin-bottom: 35px;
        padding-right: 20px;
      }
    }

    >div {
      color: #b4b4b4;
      font-size: 28px;
      line-height: 70px;
      box-sizing: border-box;

      >a {
        color: #0d76e4;
      }
    }
  }

  >p {
    margin: 30px 0;
    padding: 0 30px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    line-height: 90px;

    >span {
      &:last-child {
        color: #999999;
      }
    }
  }

  .type-nave {
    display: flex;
    justify-content: space-around;
    background: #fff;
    padding: 14px 0;

    >div {
      flex: 0 1 213px;
      text-align: center;
      height: 96px;
      line-height: 38px;
      padding: 10px 0;
      box-sizing: border-box;
      margin-right: 20px;
      border: 1px solid #e5e5e5;
      border-radius: 10px;
      color: #0c72e3;

      &:last-child {
        margin: 0;
      }

      &.active {
        color: white;
        background: #0f80e8;
        border: none;
      }
    }
  }

  .bottom-nav {
    display: flex;
    justify-content: space-around;
    padding-bottom: 108px;

    >li {
      flex: 1;
      text-align: center;
      // border-right 1px solid #e5e5e5
      position: relative;
      padding: 20px 0;

      >a {
        color: #999999;
      }

      &:after {
        content: '';
        width: 0;
        height: 65px;
        position: absolute;
        right: 0;
        top: 42px;
        border-right: 1px solid #e5e5e5;
      }

      img {
        width: 40px;
      }

      p {
        padding-top: 20px;
      }
    }
  }

  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .bottom-nav {
      padding-bottom: 152px;
    }
  }

  .bottom-btn {
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    background: #fff;
    height: 108px;
    line-height: 108px;
    // box-sizing: border-box;
    border-top: 1px solid #e5e5e5;
    z-index: 999;

    >div {
      padding: 20px 0;
      width: 134px;

      a {
        color: #333;
      }

      p {
        line-height: 21px;
        border-right: 1px solid #e5e5e5;
        text-align: center;

        >img {
          width: 38px;
          padding-bottom: 15px;
        }
      }
    }

    >p {
      text-align: center;
      font-size: 34px;

      &.btn-p {
        flex: 1;
      }

      &:nth-child(2) {
        color: #0c72e3;
      }

      &:last-child {
        background: #0c72e3;
        color: white;
      }
    }
  }

  .dialog-insurance-content {
    padding: 30px 30px 138px;

    .section {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;

      label {
        width: 140px;
      }

      div.left {
        flex: 1;
        line-height: 48px;

        >div.birthday-value {
          width: 100%;
          padding-left: 35px;

          >span.placeHolder {
            color: #999999;
          }
        }

        >p {
          padding-left: 35px;
          border-top: 1px solid #e5e5e5;
          color: #999999;
        }
      }
    }

    .section2 {
      >div.left {
        >.nav {
          display: flex;
          justify-content: space-around;

          >p {
            width: 137px;
            height: 60px;
            border-radius: 10px;
            color: #0c72e3;
            border: 1px solid #0c72e3;
            line-height: 60px;
            text-align: center;
            box-sizing: border-box;

            &.active {
              background: #0c72e3;
              color: white;
            }
          }
        }

        >.text {
          padding: 25px 30px 0;
          color: #999999;
          line-height: 56px;

          >p {
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }

    .section3 {
      >div.left>.nav {
        justify-content: flex-start;

        >p {
          margin-left: 30px;
        }
      }
    }

    .section4 {
      justify-content: flex-start;

      >div.left {
        text-align: left;

        >p {
          border: none;
        }
      }
    }
  }

  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .dialog-insurance-content{
      padding-bottom:178px;
    }
  }
}
</style>


