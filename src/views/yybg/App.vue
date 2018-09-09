
<style lang="stylus" rel="stylesheet/stylus">

@import '~style/mixin.styl';
@import './style/yybg.styl';

.iCountUp {
  font-size: 12em;
  margin: 0;
  color: #4d63bc;
}
</style>

<template>
  <div class="swiper-container">
    <!--进入加载 -->
    <div class="jiazai" style="z-index:100" >
        <div class="jia01" style="top:42%; text-align:center;">
            <img style="width: 106px" src="./images/loading.png" alt=""/>
        </div>
    </div>
    <!-- 后退和分享 -->
    <div class="vux-header x-header">
      <div class="x-header-left"><a class="x-header-back" style=""></a> <div class="left-arrow" style=""  @click="onClickBack()"></div></div>
      <h1 class="x-header-title"><span style="">运营数据</span></h1>
      <div class="x-header-right" @click="shareToggleFun()"><a class="x-header-more"></a></div>
    </div>
    <!-- 页面 -->
    <div class="swiper-wrapper">
      <div class="swiper-slide slide1" id="slide1">
          <h6>2018年鲸鱼</h6>
          <h5>4月份运营数据</h5>
          <!-- <p>有数据   更真实</p> -->
          <!-- <i-count-up
          :start="0"
          :end="120500"
          :decimals="0"
          :duration="2.5"
          :options="options"
          :callback="callback"
        ></i-count-up> -->
      </div>
      <div class="swiper-slide slide2">
          <h4 class="title"><img class="left" src="./images/left.jpg" alt=""/><span>鲸鱼数据总览</span><img class="right" src="./images/right.jpg" alt=""/></h4>
            <ol class="shuju  shuju1">
                <p class="mk1">累计交易金额</p>
                <p class="mk2" id="k-data1"></p>
                <p class="mk3">数据截止于2018年4月底</p>
            </ol>
            <ol class="shuju  shuju2">
                <p class="mk1">累计注册人数</p>
                <p class="mk2" id="k-data2"></p>
                <p class="mk3">数据截止于2018年4月底</p>
            </ol>
            <ol class="shuju  shuju3">
                <p class="mk1">人均投资金额</p>
                <p class="mk2" id="k-data3"></p>
                <p class="mk3">数据截止于2018年4月底</p>
            </ol>

            <ol class="zaiju">
                <div class="zcolumn  zcolumn1">
                    <div class="bestdata">229 亿<b>+</b></div>
                    <div class="dang"></div>
                    <div class="yuefen"><span>02</span><span>03</span><span>04</span><span>月份</span></div>
                </div>
                <div class="zcolumn  zcolumn2">
                    <div class="bestdata"><span>452万<b>+</b></span></div>
                    <div class="dang"></div>
                    <div class="yuefen"><span>02</span><span>03</span><span>04</span><span>月份</span></div>
                </div>
                <div class="zcolumn  zcolumn3">
                    <div class="bestdata"><span>3.8万<b>+</b></span></div>
                    <div class="dang"></div>
                    <div class="yuefen"><span>02</span><span>03</span><span>04</span><span>月份</span></div>
                </div>
            </ol>
      </div>
      <div class="swiper-slide slide3">
          <h4 class="title"><img class="left" src="./images/left.jpg" alt=""/><span>鲸鱼数据总览</span><img class="right" src="./images/right.jpg" alt=""/></h4>
          <ol class="shuju  shuju1">
                <p class="mk1">平台为用户累计赚取</p>
                <p class="mk2" id="s-data1"></p>
                <p class="mk3">数据截止于2018年4月底</p>
            </ol>
            <ol class="shuju  shuju2">
                <p class="mk1">平台累计发放红包</p>
                <p class="mk2" id="s-data2"></p>
                <p class="mk3">数据截止于2018年4月底</p>
            </ol>
      </div>
      <div class="swiper-slide slide4">
          <h4 class="title"><img class="left" src="./images/left.jpg" alt=""/><span>鲸鱼财力地图</span><img class="right" src="./images/right.jpg" alt=""/></h4>
          <img class="best" src="./images/4.jpg" alt="" style="top: 0px; opacity: 0;">
            <h2 class="zhanbi">投资人数占比：</h2>
            <div class="wrapper  wrapper2">
              <ol>
                    <span class="provice">广东省</span>
                    <div class="load-cou">
                        <div class="ak1"></div>
                    </div>
                    <span class="gailv">12.07%</span>
                </ol>
                <ol>
                    <span class="provice">江苏省</span>
                    <div class="load-cou">
                        <div class="ak2"></div>
                    </div>
                    <span class="gailv">11.69%</span>
                </ol>
                <ol>
                    <span class="provice">浙江省</span>
                    <div class="load-cou">
                        <div class="ak4"></div>
                    </div>
                    <span class="gailv">8.21%</span>
                </ol>
                <ol>
                    <span class="provice">山东省</span>
                    <div class="load-cou">
                        <div class="ak3"></div>
                    </div>
                    <span class="gailv">7.39%</span>
                </ol>
                <ol>
                    <span class="provice">上海市</span>
                    <div class="load-cou">
                        <div class="ak5"></div>
                    </div>
                    <span class="gailv">5.44%</span>
                </ol>
            </div>
      </div>
      <div class="swiper-slide slide5">
          <h4 class="title"><img class="left" src="./images/left.jpg" alt=""/><span>鱼粉投资占比</span><img class="right" src="./images/right.jpg" alt=""/></h4>
          <div class="stext  stext1">
                <p class="swe1">活期投资笔数区间分布</p>
                <p class="swe2">数据截止于2018年4月底</p>
            </div>
            <div class="stext  stext2">
                <p class="swe1">定期(月、季、年)投资笔数区间分布</p>
                <p class="swe2">数据截止于2018年4月底</p>
            </div>
            <ol class="datas  datas3">
              <!-- 活期投资 -->
                <div class="column column1">
                    <label class="shu1"><span><a>24.83%</a></span></label>
                    <label class="shu2 good"><span><a>43.71%</a></span></label>
                    <label class="shu3"><span><a>14.43%</a></span></label>
                    <label class="shu4 "><span><a>17.03%</a></span></label>
                </div>
                <!-- 定期投资 -->
                <div class="column column2">
                    <label class="shu1"><span><a>14.14%</a></span></label>
                    <label class="shu2 good"><span><a>56.03%</a></span></label>
                    <label class="shu3"><span><a>24.66%</a></span></label>
                    <label class="shu4"><span><a>5.17%</a></span></label>
                </div>
            </ol>
      </div>
      <div class="swiper-slide slide6">
          <h4 class="title"><img class="left" src="./images/left.jpg" alt=""/><span>鱼粉画像</span><img class="right" src="./images/right.jpg" alt=""/></h4>
          <div class="stext  stext1">
                <p class="swe1">客户年龄分布</p>
                <p class="swe2">数据截止于2018年4月底</p>
            </div>
            <div class="stext  stext2">
                <p class="swe1">客户性别比例</p>
                <p class="swe2">数据截止于2018年4月底</p>
            </div>
            <ol class="datas  datas2">
                <div class="column column1">
                    <label class="shu1"><span><a>11.70%</a></span></label>
                    <label class="shu2  good"><span><a>35.18%</a></span></label>
                    <label class="shu3"><span><a>25.87%</a></span></label>
                    <label class="shu4"><span><a>17.65%</a></span></label>
                    <label class="shu5"><span><a>9.60%</a></span></label>
                </div>
            </ol>
            <ol class="fenbu">
                <div class="men">34.29%</div>
                <div class="women">65.71%</div>
            </ol>
      </div>
      <div class="swiper-slide slide7">
          <h4 class="title"><img class="left" src="./images/left.jpg" alt=""/><span>月度土豪榜</span><img class="right" src="./images/right.jpg" alt=""/></h4>
          <div class="content">
                <p><span class="content-right">月度投资总额</span></p>
                <ul>
                    <li><span>第1名</span><span>陆女士</span><span>134****5835</span><span>554,272</span><span>元</span></li>
                    <li><span>第2名</span><span>舒先生</span><span>135****5655</span><span>554,247</span><span>元</span></li>
                    <li><span>第3名</span><span>姚女士</span><span>136****3555</span><span>549,500</span><span>元</span></li>
                </ul>
                <p>数据截止于2018年04月底</p>
                <p>月度投资总额= 活期投资金额+定期（月、季、年）投资金额</p>
            </div>
      </div>
      <div class="swiper-slide slide8">
          <h4 class="title"><img class="left" src="./images/left.jpg" alt=""/><span>鲸鱼之志，志在蓝海</span><img class="right" src="./images/right.jpg" alt=""/></h4>
          <span  id="myTargetElement"></span>
      </div>
      <div class="swiper-slide slide9 last">
          <div class="yybg-logo">
            </div>
					<div class="yybg-erweima">
						<img src="./images/erweima.png" alt="">
						<h6>鲸鱼微信公众号</h6>
						<p>关注鲸鱼公众号，更多福利在等你</p>
					</div>
					<a class="yybg-download" :href="downloadAPP">立即下载</a>
					<a class="yybg-register" :href="mUrl">立即注册</a>
					<a class="yybg-top" href="#slide1">回到顶部</a>
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
// import $ from "jquery";
// import Swiper from "swiper";
// import CountUp from "countup";
import share from "components/share";
import {
  downloadAPP,
  mUrl,
} from "mixins/mixin";

// import ICountUp from 'vue-countup-v2';

export default {
  name: "index",
  data() {
    return {
      shareType:"1",
      imageUrl:window.location.origin + require("./images/shareimg.png"),
      text:"感恩-信任！鲸鱼将持续为您提供优质的金融服务",
      title:"鲸鱼2018年04月运营报告",
      url:window.location.href,
      showShare:false,
      // options: {
      //   useEasing: true,
      //   useGrouping: true,
      //   separator: ',',
      //   decimal: '.',
      //   prefix: '',
      //   suffix: ''
      // }
      testTxt:"",//测试用
    };
  },
  components: {
    share,
    // ICountUp,
  },
  computed: {
    downloadAPP(){
      return downloadAPP;
    },
    mUrl(){
      return mUrl;
    },
  },
  watch: {},
  created() {
    // this.urltxt= this._getRequest()
    // console.log(this.urltxt)
  },
  mounted() {
    var that = this;
    setTimeout(() => {
      console.log("进入计时器")
      $(".jiazai").fadeOut();
       that.showTitle();//控制头部导航显示
    }, 3000);
    that.getSwiper(); //swiper插件
    that.numgun1(); //控制第二页数字滚动
    that.numgun2(); //控制第三页数字滚动
    that.zhexian(); //控制第二页折线图显示
    that.ditu(); //控制地图页动画显示
    that.touzi(); //投资分布显示
    that.huaxiang(); //画像年龄分布显示
    that.xingbie(); //性别显示
  },
  methods: {
    // callback: function(ins) {
    //   ins.update(ins.endVal + 100);
    // },
    getSwiper() {
      let mySwiper = new Swiper(".swiper-container", {
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
        },
      });
      mySwiper.on("slideChangeTransitionEnd",function () {
        try {
          let json = Jinr.getToken();
          if (mySwiper.activeIndex==mySwiper.slides.length-2) {
            mySwiper.allowSlideNext=false
            $(".page-arrow").hide();
          } else {
            mySwiper.allowSlideNext=true
            $(".page-arrow").show();
          }
        } catch (error) {
          if (mySwiper.activeIndex==mySwiper.slides.length-1) {
            $(".page-arrow").hide();
          } else {
            $(".page-arrow").show();
          }
        }
      });
      $('.yybg-top').click(function(){
        mySwiper.slideTo(0, 1000, false);//切换到第一个slide，速度为1秒
      });
    },
    numgun1() {
      console.log(CountUp);
      $(function() {
        $(".slide1, .slide3").on("click touchstart", function() {
          setTimeout(function() {
            console.log(2222);
            //控制数字变化
            var options = {
              useEasing: true,
              useGrouping: true,
              separator: ",", //此处控制数字之间是否要逗号
              decimal: "."
            };
            console.log(options);
            var kemo1 = new CountUp("k-data1", 0, 22990445613, 0, 0.8, options); //累计交易金额
            var kemo2 = new CountUp("k-data2", 0, 4523657, 0, 0.8, options); //注册人数
            var kemo3 = new CountUp("k-data3", 0, 38097, 0, 0.8, options); //人均投资金额
            $(document).ready(function(e) {
              kemo1.start();
              kemo2.start();
              kemo3.start();
            });
          }, 0);
        });
      });
    },
    numgun2() {
      $(function() {
        $(".slide2, .slide4").on("click touchstart", function() {
          setTimeout(function() {
            //控制数字变化
            var options = {
              useEasing: true,
              useGrouping: true,
              separator: ",", //此处控制数字之间是否要逗号
              decimal: "."
            };
            var demo1 = new CountUp("s-data1", 0, 361750000, 0, 0.8, options);//累计赚取
            var demo2 = new CountUp("s-data2", 0, 45090940000, 0, 0.8, options);//发放红包
            $(document).ready(function(e) {
              demo1.start();
              demo2.start();
            });
          }, 0);
        });
      });
    },
    zhexian() {
      $(function() {
        $(".swiper-slide").on("click touchstart", function() {
          $(
            ".swiper-slide-prev .zcolumn .dang, .swiper-slide-next .zcolumn .dang"
          ).animate({ left: "1%" }, 0);
          $(
            ".swiper-slide-prev .zcolumn .dang, .swiper-slide-next .zcolumn .dang"
          ).css({ opacity: "1" });
          $(
            ".swiper-slide-prev .zcolumn .bestdata, .swiper-slide-next .zcolumn .bestdata"
          ).css({ opacity: "0" });

          setTimeout(function() {
            $(".swiper-slide-active .zcolumn .dang").animate(
              { left: "200%" },
              1500
            );
          }, 300);
          $(".swiper-slide-active .zcolumn .dang").css({ opacity: "0" });

          setTimeout(function() {
            $(".swiper-slide-active .zcolumn .bestdata").css({ opacity: "1" });
          }, 1800);
        });
      });
    },
    ditu() {
      $(function() {
        $(".swiper-slide").on("click touchstart", function() {
          setTimeout(function() {
            $(".swiper-slide-active .ak1").addClass("load-cou-inner1");
            $(".swiper-slide-active .ak2").addClass("load-cou-inner2");
            $(".swiper-slide-active .ak3").addClass("load-cou-inner3");
            $(".swiper-slide-active .ak4").addClass("load-cou-inner4");
            $(".swiper-slide-active .ak5").addClass("load-cou-inner5");
            $(".swiper-slide-active .gailv").animate({ opacity: "1" }, 2000);
            $(".swiper-slide-active .best").animate(
              { top: "0", opacity: "0" },
              1000
            );
          }, 300);

          setTimeout(function() {
            $(".swiper-slide-prev .ak1, .swiper-slide-next .ak1").removeClass(
              "load-cou-inner1"
            );
            $(".swiper-slide-prev .ak2, .swiper-slide-next .ak2").removeClass(
              "load-cou-inner2"
            );
            $(".swiper-slide-prev .ak3, .swiper-slide-next .ak3").removeClass(
              "load-cou-inner3"
            );
            $(".swiper-slide-prev .ak4, .swiper-slide-next .ak4").removeClass(
              "load-cou-inner4"
            );
            $(".swiper-slide-prev .ak5, .swiper-slide-next .ak5").removeClass(
              "load-cou-inner5"
            );
          }, 0);
          setTimeout(function() {
            $(".swiper-slide-prev .gailv, .swiper-slide-next .gailv").animate(
              { opacity: "0" },
              10
            );
            $(".swiper-slide-prev .best, .swiper-slide-next .best").animate(
              { top: "-100%", opacity: "0" },
              10
            );
          }, 300);
        });
      });
    },
    touzi() {
      $(".swiper-slide").on("click touchstart", function() {
        setTimeout(function() {
          $(
            ".swiper-slide-active .datas3 .shu1 span, .swiper-slide-active .datas3 .shu2 span, .swiper-slide-active .datas3 .shu3 span, .swiper-slide-active .datas3 .shu4 span, .swiper-slide-active .datas3 .shu5 span"
          ).css({ opacity: "1" });
          $(".swiper-slide-active .datas3 .column1 .shu1").animate(
            { height: "24.83%" },
            1000
          );
          $(".swiper-slide-active .datas3 .column1 .shu2").animate(
            { height: "43.71%" },
            1000
          );
          $(".swiper-slide-active .datas3 .column1 .shu3").animate(
            { height: "14.43%" },
            1000
          );
          $(".swiper-slide-active .datas3 .column1 .shu4").animate(
            { height: "17.03%" },
            1000
          );

          $(".swiper-slide-active .datas3 .column2 .shu1").animate(
            { height: "14.14%" },
            1000
          );
          $(".swiper-slide-active .datas3 .column2 .shu2").animate(
            { height: "56.03%" },
            1000
          );
          $(".swiper-slide-active .datas3 .column2 .shu3").animate(
            { height: "24.66%" },
            1000
          );
          $(".swiper-slide-active .datas3 .column2 .shu4").animate(
            { height: "5.17%" },
            1000
          );
        }, 500);
        $(
          ".swiper-slide-prev .datas3 .shu1,.swiper-slide-next .datas3 .shu1, .swiper-slide-prev .datas3 .shu2,.swiper-slide-next .datas3 .shu2, .swiper-slide-prev .datas3 .shu3, .swiper-slide-next .datas3 .shu3, .swiper-slide-prev .datas3 .shu4, .swiper-slide-next .datas3 .shu4, .swiper-slide-prev .datas3 .shu5, .swiper-slide-next .datas3 .shu5"
        ).animate({ height: "0" }, 0);

        $(
          ".swiper-slide-prev .datas3 .shu1 span,.swiper-slide-next .datas3 .shu1 span, .swiper-slide-prev .datas3 .shu2 span,.swiper-slide-next .datas3 .shu2 span, .swiper-slide-prev .datas3 .shu3 span,.swiper-slide-next .datas3 .shu3 span, .swiper-slide-prev .datas3 .shu4 span,.swiper-slide-next .datas3 .shu4 span, .swiper-slide-prev .datas3 .shu5 span,.swiper-slide-next .datas3 .shu5 span"
        ).css({ opacity: "0" });
      });
    },
    huaxiang() {
      $(function() {
        $(".swiper-slide").on("click touchstart", function() {
          setTimeout(function() {
            $(
              ".swiper-slide-active .datas2 .shu1 span, .swiper-slide-active .datas2 .shu2 span, .swiper-slide-active .datas2 .shu3 span, .swiper-slide-active .datas2 .shu4 span, .swiper-slide-active .datas2 .shu5 span"
            ).css({ opacity: "1" });
            $(".swiper-slide-active .datas2 .shu1").animate(
              { height: "11.70%" },
              1000
            );
            $(".swiper-slide-active .datas2 .shu2").animate(
              { height: "35.18%" },
              1000
            );
            $(".swiper-slide-active .datas2 .shu3").animate(
              { height: "25.87%" },
              1000
            );
            $(".swiper-slide-active .datas2 .shu4").animate(
              { height: "17.65%" },
              1000
            );
            $(".swiper-slide-active .datas2 .shu5").animate(
              { height: "9.60%" },
              1000
            );
          }, 500);

          $(
            ".swiper-slide-prev .datas2 .shu1,.swiper-slide-next .datas2 .shu1, .swiper-slide-prev .datas2 .shu2,.swiper-slide-next .datas2 .shu2, .swiper-slide-prev .datas2 .shu3, .swiper-slide-next .datas2 .shu3, .swiper-slide-prev .datas2 .shu4, .swiper-slide-next .datas2 .shu4, .swiper-slide-prev .datas2 .shu5, .swiper-slide-next .datas2 .shu5"
          ).animate({ height: "0" }, 0);

          $(
            ".swiper-slide-prev .datas2 .shu1 span,.swiper-slide-next .datas2 .shu1 span, .swiper-slide-prev .datas2 .shu2 span,.swiper-slide-next .datas2 .shu2 span, .swiper-slide-prev .datas2 .shu3 span,.swiper-slide-next .datas2 .shu3 span, .swiper-slide-prev .datas2 .shu4 span,.swiper-slide-next .datas2 .shu4 span, .swiper-slide-prev .datas2 .shu5 span,.swiper-slide-next .datas2 .shu5 span"
          ).css({ opacity: "0" });
        });
      });
    },
    xingbie() {
      $(function() {
        $(".swiper-slide").on("click touchstart", function() {
          setTimeout(function() {
            $(".swiper-slide-active .men").animate(
              { right: "19%", opacity: "1" },
              500
            );
            $(".swiper-slide-prev .men, .swiper-slide-next .men").animate(
              { right: "0", opacity: "0" },
              0
            );

            $(".swiper-slide-active .women").animate(
              { left: "22%", opacity: "1" },
              500
            );
            $(".swiper-slide-prev .women, .swiper-slide-next .women").animate(
              { left: "0", opacity: "0" },
              0
            );
          }, 500);
        });
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
    shareToggleFun(){
      this.showShare = !this.showShare
    },
    showTitle(){
      setTimeout(() => {
        try {
          let json = JSON.parse(Jinr.getToken())
          // 处理版本如果小于4.1.0 设置为真
          //把"4.1.0"转为话410 把版本号转为纯数字
          let version = parseFloat(json.app_v.replace('.', '').replace('.', ''))
          this.testTxt = version
          this.$nextTick(()=>{
            $(".slide9").hide()
          })
          if(version<410){
              $(".vux-header").hide()
          }else{
              $(".vux-header").show()
          }
        } catch (error) {
          console.log("调用了吗")
          $(".slide9").show()
          $(".vux-header").hide()
        }
      },0);
    },

    // 获取url中"?"符后面得字符串，并解析成为一个对象返回。
    // _getRequest () {
    //   // 获取url中"?"符后的字串
    //   const url = location.search
    //   const theRequest = {}
    //   if (url.indexOf('?') !== -1) {
    //     const str = url.substr(1)
    //     const strs = str.split('&')
    //     for (let i = 0; i < strs.length; i++) {
    //       theRequest[strs[i].split('=')[0]] = unescape(strs[i].slice(strs[i].indexOf('=') + 1))
    //     }
    //   }
    //   return theRequest
    // },
  }
};
</script>


