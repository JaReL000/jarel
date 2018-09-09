<template>
  <div class="swiper-container">
    <!-- 后退 -->
    <div class="report-title" v-show="titleShow" >
      <div class="title-left" @click="onClickBack"></div>
      <h6>鲸鱼财富报告</h6>
      <!-- {{downloadAPP}} -->
      <div class="title-right">
      </div>
    </div>
    <div class="report-judge" v-show="judge">
      <div class="judge-back" @click="onClickBack">确认</div>
    </div>
    <!-- 页面 -->
    <div class="swiper-wrapper">
      <div class="swiper-slide slide1" style="margin-bottom:0px" ></div>
      <div class="swiper-slide slide2" >
        <h6>亲爱的<span></span>{{this.user_name}}财主</h6>
        <p>{{this.c_time}}我们相遇</p>
      </div>
      <div class="swiper-slide slide3" >
        <h6>截止至2017年12月31日</h6>
        <p>您已加入鲸鱼 
          <i-count-up 
            class="iCountUp"
            :start="0"
            :end="Number(join_days)"
            :decimals="0"
            :duration="5.0"
            :options="options"
            :callback="callback"
          ></i-count-up>
          <span>天</span></p>
      </div>
      <div class="swiper-slide slide4" >
        <div :class="{swiperOther:top}">
          <h6 :class="{swiperOther:top}">您转入鲸鱼的第一笔资金</h6>
          <p class="slide4-money">
              <i-count-up 
                class="iCountUp"
                :start="0"
                :end="Number(first_ordertrade_money) "
                :decimals="0"
                :duration="2.5"
                :options="options"
                :callback="callback"
              ></i-count-up>
            <span>元</span>
          </p>
          <div class="slide4-content" :class="{swiperTwo:top}">
            <p class="slide4-time" v-text="this.first_order.trade_time">2017年6月3日   23:08</p>
            <div :class="{swiperTwo:top}">
              <img src="./images/icon1.png" alt="">
              {{first_order.product_name}}
              <i-count-up 
                class="iCountUp"
                :start="0"
                :end="Number(first_ordertrade_money)"
                :decimals="0"
                :duration="2.5"
                :options="options"
                :callback="callback"
              ></i-count-up>
              <span>元</span>
            </div>
            <div v-show="fristProfit" :class="{swiperTwo:top}">
              <img src="./images/icon2.png" alt="">
              预期收益
              <i-count-up 
                class="iCountUp"
                :start="0"
                :end="Number(first_ordertotal_yield) "
                :decimals="0"
                :duration="2.5"
                :options="options"
                :callback="callback"
              ></i-count-up>
              <span>元</span>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-slide slide5" >
        <div >
          <div class="slide5-left">
            单笔投资最高
            <i-count-up 
              class="iCountUp"
              :start="0"
              :end="Number(highest_ordertrade_money)"
              :decimals="0"
              :duration="2.5"
              :options="options"
              :callback="callback"
            ></i-count-up>
            <span>元</span>
          </div>
          <div class="slide5-right" :class="{swiperThree:top}">
            全国排名第 
            <span v-text="this.rank.rank_highest_order"></span>
            <span>名</span>
          </div>
          <div class="slide5-content" :class="{swiperThree:top}">
            <p class="slide5-time" v-text="this.highest_order.trade_time"></p>
            <div>
              <img src="./images/icon1.png" alt="">
              {{highest_order.product_name}}
              <i-count-up 
                class="iCountUp" :class="{swiperThree:top}"
                :start="0"
                :end="Number(highest_ordertrade_money)"
                :decimals="0"
                :duration="2.5"
                :options="options"
                :callback="callback"
              ></i-count-up>
              <span>元</span>
            </div>
            <div v-show="profitShow" :class="{swiperThree:top}">
              <img src="./images/icon2.png" alt="">
              预期收益
              <i-count-up 
                class="iCountUp"
                :start="0"
                :end="Number(highest_ordertotal_yield)"
                :decimals="0"
                :duration="2.5"
                :options="options"
                :callback="callback"
              ></i-count-up>
              <span>元</span>
            </div>
          </div>
        </div>
        
      </div>
      <div class="swiper-slide slide6" >
        <div class="slide6-left">
          您已累计投资
          <i-count-up 
            class="iCountUp"
            :start="0"
            :end="total_money_total_money"
            :decimals="0"
            :duration="2.5"
            :options="options"
            :callback="callback"
          ></i-count-up>
          <span>元</span>
        </div>
        <div class="slide6-right">
          全国排名第 
          <span v-text="this.rank.rank_total_money"></span>
          <span>名</span>
        </div>
        <div>
          <div class="slide6-chart" :class="{swiperThree:top}">
          <div id="main" style="width: 200px;height:200px;margin:0 auto;" :class="{swiperThree:top}"></div>
          <ul :class="{swiperThree:top}">
              <div class="chart-left" :class="{swiperThree:top}">
                <li><span></span>活期</li>
                <li><span></span>年定期</li>
                <li><span></span>保险箱</li>
              </div>
              <div class="chart-right">
                <li>日增息<span></span></li>
                <li>月定期<span></span></li>
                <li>季定期<span></span></li>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <div class="swiper-slide slide7" >
        <div :class="{swiperFive:top}">
          <div class="slide7-left" :class="{swiperThree:top}">
            您已累计领取体验金
            <i-count-up 
              class="iCountUp"
              :start="0"
              :end="Number(experience_moneytotal_red_packet_money)"
              :decimals="0"
              :duration="2.5"
              :options="options"
              :callback="callback"
            ></i-count-up>
            <span>元</span>
          </div>
          <div class="slide7-right" :class="{swiperThree:top}">
            全国排名第 
            <span v-text="rank.rank_total_redpacket"></span>
            <span>名</span>
          </div>
          <div class="slide7-max slide7-max-d" :class="{swiperSix:top}">
            领取体验金最大金额为
            <i-count-up 
              class="iCountUp"
              :start="0"
              :end="Number(experience_moneymax_red_packet_money)"
              :decimals="0"
              :duration="2.5"
              :options="options"
              :callback="callback"
            ></i-count-up>
            <span>元</span>
          </div>
        </div>
      </div>
      <div class="swiper-slide slide8" >
        <div :class="{swiperSeven:top}">
          <div class="slide8-left" :class="{swiperThree:top}">
            您已累计赚取收益<br>
            <i-count-up 
              class="iCountUp"
              :start="0"
              :end="Number(total_yield_total_yield)"
              :decimals="0"
              :duration="2.5"
              :options="options"
              :callback="callback"
            ></i-count-up>
            <span>元</span>
          </div>
          <div class="slide8-right" :class="{swiperThree:top}">
            全国排名第 
            <span v-text="rank.rank_total_yield"></span>
            <span>名</span>
          </div>
          <div class="slide8-content" :class="{swiperThree:top}">
            <div class="content8-left" :class="{swiperThree:top}">
              投资收益
              <i-count-up 
                class="iCountUp"
                :start="0"
                :end="Number(total_yieldtotal_product_yield)"
                :decimals="0"
                :duration="2.5"
                :options="options"
                :callback="callback"
              ></i-count-up>
              <span>元</span>   
            </div>
            <div class="content8-right">
              其他收益
              <i-count-up 
                class="iCountUp"
                :start="0"
                :end="Number(total_yieldtotal_red_packet_yield)"
                :decimals="0"
                :duration="2.5"
                :options="options"
                :callback="callback"
              ></i-count-up>
              <span>元</span>   
            </div>
          </div>
          <div class="slide8-chart" :class="{swiperThree:top}">
            <div id="mianTwo" style="width: 200px;height:200px;margin:0 auto;"></div>
            <ul>
              <div class="chart-left">
                <li><span></span>活期</li>
                <li><span></span>年定期</li>
                <li><span></span>保险箱</li>
              </div>
              <div class="chart-right">
                <li>日增息<span></span></li>
                <li>月定期<span></span></li>
                <li>季定期<span></span></li>
                <li>福利<span></span></li>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <div class="swiper-slide slide9" >
        <div :class="{swiperSeven:top}">
          <h6 :class="{swiperSix:top}">恭喜{{this.user_name}}财主</h6>
          <p>位列鲸鱼财富榜第 <span v-text="rank.rank_total_yield"></span> <span>名</span></p>
          <div class="slide9-content" :class="{swiperTwo:top}">
            <div class="slide9-one" :class="{swiperTwo:top}">
              加入鲸鱼 <br>
              <i-count-up 
                class="iCountUp"
                :start="0"
                :end="Number(join_days)"
                :decimals="0"
                :duration="2.5"
                :options="options"
                :callback="callback"
            ></i-count-up>
            <span>天</span>
            </div>
            <div class="slide9-two" :class="{swiperTwo:top}">
              累计投资<br>
              <i-count-up 
                class="iCountUp"
                :start="0"
                :end="Number(total_money_total_money)"
                :decimals="0"
                :duration="2.5"
                :options="options"
                :callback="callback"
            ></i-count-up>
            <span>元</span>
            </div>
            <div class="slide9-three" :class="{swiperTwo:top}">
              累计获得<span>(体验金)</span><br>
              <i-count-up class="iCountUp"
              :start="0"
              :end="Number(experience_moneytotal_red_packet_money)"
              :decimals="0"
              :duration="2.5"
              :options="options"
              :callback="callback"
            ></i-count-up>
            <span>元</span>
            </div>
            <div class="slide9-four" :class="{swiperTwo:top}">
              累计赚取<br>
              <i-count-up 
                class="iCountUp"
                :start="0"
                :end="Number(total_yield_total_yield)"
                :decimals="0"
                :duration="2.5"
                :options="options"
                :callback="callback"
            ></i-count-up>
            <span>元</span>
            </div>
          </div>
          <div class="slide9-share" @click="shareToggleFun()">分享我的财富海报至朋友圈</div>
        </div>
      </div>
    </div>
    <!-- Add Pagination -->
    <div class="page-arrow swiper-button-next"></div>
    <share
      :shareType="shareType"
      :imageUrl="imageUrl"
      :text="text"
      :title="title"
      :url="url"
      :showShare="showShare" 
      @shareToggleFun="shareToggleFun"
    ></share>
  </div>
</template>

<script>
import { stringify } from "qs";
import ICountUp from "vue-countup-v2";
import share from "components/share";
import { downloadAPP, mUrl } from "mixins/mixin";
import echarts from "echarts";
export default {
  name: "App",
  components: {
    ICountUp,
    share
  },
  data() {
    return {
      testews:"",
      top:false,//控制不同版本下距离顶部的距离
      pageShow: false, //控制页面显示
      profitShow: false, //控制最高投资预期收益是否是否显示
      fristProfit: false,
      user_name: "",
      c_time: "",
      join_days: +"",
      first_order: {}, //首笔
      first_ordertrade_money: +"", //首笔投资
      first_ordertotal_yield: +"", //首笔预期收益
      highest_order: {}, //最高投资
      highest_ordertrade_money: +"",
      highest_ordertotal_yield: +"",
      total_money: {}, //累计投资
      total_money_total_money: +"",
      // experience_money:{},//体验金
      experience_moneytotal_red_packet_money: +"",
      experience_moneymax_red_packet_money: +"",
      total_yield: {}, //累计投资
      total_yield_total_yield: +"",
      total_yieldtotal_product_yield: +"",
      total_yieldtotal_red_packet_yield: +"",
      rank: {}, //排名
      chartShow: false, //饼图显示
      markShow: false, //弹窗
      first_orderShow: true, //是否投资
      judge: false, //2018年未投资用户不显示
      has_invest: "",
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ",",
        decimal: ".",
        prefix: "",
        suffix: ""
      },
      // shareType:分享类型参数,"0"是图片分享,"1"是活动分享,不能为空,
      // imageUrl:享图片时,图片的Url,分享活动时,分享卡片的小图Url,不能为空,
      // text:分享的文案,不能为空,
      // title:分享的标题,不能为空,
      // url:分享活动时,活动的网站链接地址,分享图片的时候可以为空字符串,
      // showShare:false,分享弹窗
      shareType: "1",
      imageUrl: window.location.origin + require("./images/shareimg.png"),
      text: "记录细节、分享喜悦，鲸鱼为您的幸福生活添砖加瓦！",
      title: "我的鲸鱼财富报告",
      url: "",
      showShare: false, //分享
      //控制title是否显示
      titleShow: true,
      phone: "",
      testTxt:""
    };
  },
  computed: {
    downloadAPP() {
      return downloadAPP;
    }
  },
  mounted() {
    setTimeout(() => {

      this.reportFun()
      this._version();
      this.testFun()

      this.getSwiper();
      this.showTitle();
    }, 400)
    
  },
  created() {},
  methods: {
    //数字滚动插件回调函数
    callback: function(ins) {
      ins.update(ins.endVal);
    },
    //swiper初始化配置
    getSwiper() {
      let that = this;
      let mySwiper = new Swiper(".swiper-container", {
        observer: true, //监听器 当swiper发生变化是重新初始化
        observeParents: true,
        navigation: {
          nextEl: ".swiper-button-next"
        },
        direction: "vertical",
        paginationClickable: true,
        autoplayDisableOnInteraction: false /* 是否要触屏停止滚动 */,
        spaceBetween: 10 /* 间距 */,
        loop: false /* 循环 */,
        slidesPerView: 1,
        breakpoints: {
          1024: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          1000: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          }
        }
      });
      //当swiper发生改变执行的回调
      mySwiper.on("slideChangeTransitionEnd", function() {
        console.log(mySwiper.activeIndex);
        // mySwiper.observertrue=true//监听器 当swiper发生变化是重新初始化
        // mySwiper.observeParents=true//初始化是为了解决页面显示一半和滑动到最后一页点击上跳的问题
        if (mySwiper.activeIndex == mySwiper.slides.length) {
          console.log(mySwiper.slides.length);
          mySwiper.allowSlideNext = false;
        }
      });
    },
    //是否显示分享弹窗
    shareToggleFun() {
      this.showShare = !this.showShare;
    },
    //控制title低于4.1不显示
    showTitle() {
      try {
        let json = JSON.parse(Jinr.getToken());
        // 处理版本如果小于4.1.0 设置为真
        //把"4.1.0"转为话410 把版本号转为纯数字
        let version = parseFloat(json.app_v.replace(".", "").replace(".", ""));
        if (version < 410) {
          this.titleShow = false;
          this.top =true
          //  this.testtst = version

        } else {
          this.titleShow = true;
          this.top = false
        }
      } catch (error) {
        //如果没有获取到token就隐藏
        this.titleShow = false;
      }
    },
    //发送请求获取数据
    reportFun() {
      // let token =
      //   "4649VgEGCQEDAwQGCAJUVA9SWAsEVFUADwMBVlkCAgVXUldWAQYwVwEFVwBaBFUHDwIAVQIFW1FTUA0DCwIFDQAAAlYHVAs4AQMFDhUGBUwGUkEBBw1XBgxWBjkL";
      
      // return;

      //调用客户端的方法获取token
      try {
        let jsons = JSON.parse(Jinr.getToken());
        let token = jsons.token;
        this.initFun(token);
      } catch (error) {
        let token = sessionStorage.getItem('token') 
        this.initFun(token);
      }
    },
    // 初始化数据
    initFun(token) {
      this.$http({
        method: "yearly.report",
        token: token
      }).then(res => {
        let response = res.data;
        console.log(response);
        this.testTxt = response
        this.user_name = response.user_name; //用户姓名
        this.c_time = response.c_time; //加入时间
        this.join_days = response.join_days; //加入天数
        this.first_order = response.first_order; //首笔订单信息
        this.first_ordertrade_money = response.first_order.trade_money;
        this.first_ordertotal_yield = response.first_order.total_yield;
        console.log(this.first_ordertotal_yield)
        this.highest_order = response.highest_order; // 最高投资
        this.highest_ordertrade_money = response.highest_order.trade_money;
        this.highest_ordertotal_yield = response.highest_order.total_yield;
        this.total_money = response.total_money; //总投资
        this.total_money_total_money = response.total_money.total_money;
        // this.experience_money = response.experience_money//体验金页面
        this.experience_moneytotal_red_packet_money =response.experience_money.total_red_packet_money;
        this.experience_moneymax_red_packet_money =response.experience_money.max_red_packet_money;
        this.total_yield = response.total_yield; //总收益
        this.total_yield_total_yield = response.total_yield.total_yield;
        this.total_yieldtotal_product_yield =response.total_yield.total_product_yield;
        this.total_yieldtotal_red_packet_yield =response.total_yield.total_red_packet_yield;
        this.rank = response.rank; //排名
        this.chart1 = response.total_money.data; //饼图1
        this.chart2 = response.total_yield.data; //饼图2
        // this.chart = response.total_yield.data;
        this.has_invest = response.has_invest;
        this.chartShow = true; //饼图是否显示
        this.judgeFun(); //2017为投资不显示财富报告
        this.user_code = response.user_code;
        this.url =window.location.protocol +"//"+window.location.host +"/report/2017/index.html#/shareOne" +"?userCode=" +response.user_code;
        // this.firstFun()
        this.initChart1(response.total_money.data);
        this.initChart2(response.total_yield.data);
        this.fristProfitFun();
        this.profitFun();
      });
    },
    //退回按钮
    onClickBack() {
      try {
        Jinr.finish();
      } catch (error) {
        // this.$router.go(-1)
        this.$router ? this.$router.back() : window.history.back();
      }
    },
    //2018未投资用户不显示财富报告
    judgeFun() {
      if (this.has_invest == 0 || this.has_invest == "0") {
        this.judge = true;
        this.pageShow = false;
      } else {
        this.judge = false;
        this.pageShow = true;
      }
    },
    //最高预期收益为0不显示
    profitFun() {
      if (this.highest_ordertotal_yield == "0" || this.highest_ordertotal_yield == 0){
        this.profitShow = false;
      } else {
        this.profitShow = true;
      }
    },
    //首笔投资
    fristProfitFun() {
      if (this.first_ordertotal_yield== "0" || this.first_ordertotal_yield == 0){
        this.fristProfit = false;
      } else {
        this.fristProfit = true;
      }
    },
    initChart1(chart1) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main"));
      // 绘制图表
      myChart.setOption({
        legend: {
          orient: "vertical",
          x: "left",
          data: ["", "", "", "", ""]
        },
        color: [
          "#15fecf",
          "#edeeb2",
          "#e496f5",
          "#9cfbf3",
          "#f4b694",
          "#91eb8a"
        ],
        series: [
          {
            name: "",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [...chart1]
          }
        ]
      });
    },
    initChart2(chart2) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("mianTwo"));
      // 绘制图表
      myChart.setOption({
        legend: {
          orient: "vertical",
          x: "left",
          data: ["", "", "", "", ""]
        },
        color: [
          "#15fecf",
          "#edeeb2",
          "#e496f5",
          "#9cfbf3",
          "#f4b694",
          "#91eb8a",
          "#eb7cd0"
        ],
        series: [
          {
            name: "",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [...chart2]
          }
        ]
      });
    },
    _version(){
      try {
        let token = Jinr.getToken()
        let version = JSON.parse(token).app_v
        // Flash(version +  ' d')
        return version ? parseFloat(version.replace('.', '').replace('.', '')) : 410
        if (version < 410) {
          this.top =true
          // this.testtst = version
        } else {
          this.top = false
        }
      } catch (error) {
        // Flash(error)
        return 420
      }
    },
    testFun(){
    this.testews =  window.innerHeight
    }
  },
  watch: {
    //watch()监听某个值（双向绑定）的变化，从而达到change事件监听的效果
    //限制可输入字数为11
    phone: {
      handler: function() {
        var _this = this;
        var _sum = 11; //字数限制为11个
        _this.$refs.count.setAttribute("maxlength", _sum);
        _this.number = _this.$refs.count.value.length;
      }
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '~style/mixin.styl';
@import './style/report.styl';

.swiper-slide {
  height: 100% !important;
  margin-bottom: 0px !important;
  padding-bottom: 20px;
}
.echarts {
  width: 400px;
  height: 400px;
}
</style>



