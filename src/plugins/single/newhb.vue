<style lang="stylus" rel="stylesheet/stylus">
@import '~style/mixin.styl';

.newhb-bestwarp {
  background: #fff;
}

.newhb {
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}

.newhb-top {
  // width: 750px;
  height: 889px;
  background: url('./images/newbg.jpg') no-repeat center;
  background-size: 100% 889px;
  // position: absolute;
  // top: 90px;
}

.newhbbg-img {
  img:nth-of-type(1) {
    width: 120px;
    height: 100px;
    position: absolute;
    top: 1170px;
    right: 70px;
    z-index: 1;
  }

  img:nth-of-type(2) {
    width: 70px;
    height: 58px;
    position: absolute;
    top: 1630px;
    right: 70px;
    z-index: 1;
  }

  img:nth-of-type(3) {
    width: 69px;
    height: 78px;
    position: absolute;
    top: 1620px;
    left: 70px;
    z-index: 1;
  }
}

.newhb-warp {
  // height: 2200px;
  // background url("./images/bg1.jpg") no-repeat center
  background: #fee9a0;
  background-size: 100%;
  padding: 43px;

  .zhuce-warp {
    height: 300px;
    position: relative;
    margin-top: -250px;

    .hb-zhuce {
      // width: 663px;
      height: 184px;
      // position: absolute;
      // top: 740px;
      // left 52px
      padding: 86px 0 0;
      text-align: left;
      background: #fff;
      border-radius: 34px;

      .hb-fuli {
        width: 231px;
        height: 125px;
        // background url("./images/newhb6.png") no-repeat center/231px 125px
        position: absolute;
        top: -60px;
        left: 33%;
      }

      p:nth-of-type(1) {
        text-align: center;
        font-size: 23px;
        // letter-spacing: 1px;
        line-height: 37px;
        color: #666;

        span {
          font-size: 29px;
          color: #f38312;
        }
      }

      p:nth-of-type(2) {
        // padding-left: 60px;
        font-size: 26px;
        line-height: 100px;
        color: #ff4158;
        // padding 0 30px;
        text-align: center;

        span:nth-of-type(1) {
          font-size: 50px;
        }

        span:nth-of-type(2) {
          margin-left: 266px;
        }
      }

      .go-meonth {
        display: block;
        // width: 476px;
        width: 73%;
        height: 77px;
        // background-color: #fc4f66;
        // box-shadow: 0px 6px 0px 0px #c8152d;
        border-radius: 34px;
        position: absolute;
        top: 230px;
        left: 14%;
        font-size: 33px;
        // color: #fff;
        text-align: center;
        line-height: 77px;
        // padding:0 187px;
        margin: 0 auto;
      }
    }
  }

  .bangka-warp {
    height: 300px;
    position: relative;
    margin-top: 150px;

    .hb-bangka {
      // width: 663px;
      height: 184px;
      // position: absolute;
      // top: 740px;
      // left 52px
      padding: 86px 0 0;
      text-align: left;
      background: #fff;
      border-radius: 34px;

      .hb-fuli {
        width: 231px;
        height: 125px;
        // background url("./images/newhb6.png") no-repeat center/231px 125px
        position: absolute;
        top: -60px;
        left: 33%;
      }

      p:nth-of-type(1) {
        text-align: center;
        font-size: 23px;
        // letter-spacing: 1px;
        line-height: 37px;
        color: #666;

        span {
          font-size: 29px;
          color: #f38312;
        }
      }

      p:nth-of-type(2) {
        // padding-left: 60px;
        font-size: 26px;
        line-height: 100px;
        color: #ff4158;
        // padding 0 30px
        text-align: center;

        span:nth-of-type(1) {
          font-size: 50px;
        }

        span:nth-of-type(2) {
          margin-left: 266px;
        }
      }

      .go-meonth {
        display: block;
        width: 73%;
        // width: 476px;
        height: 77px;
        // background-color: #fc4f66;
        // box-shadow: 0px 6px 0px 0px #c8152d;
        border-radius: 34px;
        position: absolute;
        top: 230px;
        left: 14%;
        font-size: 33px;
        // color: #fff;
        text-align: center;
        line-height: 77px;
        // padding:0 187px;
      }
    }
  }

  .touzi-warp {
    margin-top: 150px;
    position: relative;

    .hb-touzi {
      // width: 621px;
      // height 1447px
      // position: absolute;
      // top: 1550px;
      // left: 42px;
      padding: 20px 21px 0;
      text-align: center;
      background: #fff;
      border-radius: 34px;

      .hb-fuli {
        width: 231px;
        height: 125px;
        position: absolute;
        top: -60px;
        left: 33%;
      }

      ul {
        padding-top: 106px;

        li {
          // width: 522px;
          height: 132px;
          // background url("./images/touzi1.png") no-repeat center/643px 213px
          padding: 39px 41px 0 60px;
          position: relative;
          margin-bottom: 23px;

          p {
            font-size: 27px;
            // color #f5f5f5
            text-align: left;
            line-height: 47px;

            .newhb-best {
              font-size: 27px;
            }

            span {
              font-size: 47px;
              // color #fff
            }
          }

          // text-align: right;
          // line-height: 100px;
          // position: absolute;
          // top: 14%;
          // right: 40px;
          // width 100px
          // height 100px
          .go-meonth {
            font-size: 27px;
            position: absolute;
            top: 16px;
            right: 50px;
            width: 100px;
            height: 100px;
            padding-top: 26px;
            text-align: center;
            line-height: 75px;
          }
        }
      }

      .newhb-hot {
        img:nth-of-type(1) {
          width: 58px;
          height: 31px;
          position: absolute;
          bottom: 140px;
          left: 50px;
        }

        img:nth-of-type(2) {
          width: 58px;
          height: 31px;
          position: absolute;
          bottom: 335px;
          left: 50px;
        }
      }
    }
  }

  .hb-slogn {
    font-size: 20px;
    color: #fc4f66;
    text-align: center;
    margin-top: 20px;
    padding-bottom: 200px;
  }
}

.top-list-1 {
  background: url('./images/touzi1.png') no-repeat center;
  background-size: 100% 100%;
}

.top-list-0 {
  background: url('./images/touzi2.png') no-repeat center;
  background-size: 100% 100%;
}

.color-list-1 {
  color: #f5f5f5;
}

.color-list-0 {
  color: #6f6f6f;
}

.button-list-1 {
  background-color: #fc4f66;
  box-shadow: 0 0.08rem 0 0 #c8152d;
  color: #fff;
}

.button-list-0 {
  background-color: #eaeaea;
  box-shadow: 0 0.08rem 0 0 #cbcbcb;
  color: #6f6f6f;
}

@media screen and (max-width: 360px) {
  .newhb-warp .touzi-warp .hb-touzi ul li .color-list-0 {
    font-size: 24px;
    line-height: 24px;
    color: #6f6f6f;
    margin-top: 5px;
  }

  .newhb-warp .touzi-warp .hb-touzi ul li .color-list-1 {
    font-size: 24px;
    line-height: 24px;
    color: #f5f5f5;
    margin-top: 5px;
  }

  .newhb-warp .touzi-warp .hb-touzi ul li .go-meonth {
    top: 32px;
  }
}
</style>
<template>
<div class="newhb-bestwarp" v-if="show">
  <div class="newhb">
    <div class="newhb-top"></div> 
    <div class="newhbbg-img" v-show="sigloShow">
      <img src="./images/newhb7.png" alt="">
      <img src="./images/hb5.png" alt="" v-show="bangkaShow">
      <img src="./images/hb6.png" alt="" v-show="bangkaShow">
    </div>
    <div class="newhb-warp">
      <div class="zhuce-warp">
        <div class="hb-zhuce">
          <div class="hb-fuli">
            <img src="./images/newhb6.png" alt="">
          </div>
          <!-- <p>每一分钟就新增<span>3名</span>鲸鱼财主，<span>400万</span>用户信赖之选</p> -->
          <p>理财红包收益可提现，收益有效期3天</p>
          <p>￥<span v-text="reg_status.money"></span>元<span>理财红包</span></p>
          <!-- 领取按钮备选 -->
          <!-- <button>去领取</button> -->
          <div
            class="go-meonth"
            @click="signFun()"
            :class="'button-list-'+reg_status.status"
          ><div >{{reg_status.text}}</div></div>
        <!-- v-text="reg_status.text" -->
        </div>
      </div>
      <div class="bangka-warp" v-show="bangkaShow" v-if="sigloShow">
        <div class="hb-bangka">
          <div class="hb-fuli">
            <img src="./images/newhb2.png" alt="">
          </div>
          <p>安全运营3年</p>
          <p>￥<span v-text="card_status.money"></span>元<span>理财红包</span></p>
          <!-- <button>去领取</button> -->
          <div
            class="go-meonth"
          @click="bindingFun()"
          :class="'button-list-'+card_status.status">
          <div v-text="card_status.text"></div></div>
      </div> 
      </div>
      <div class="touzi-warp" v-show="sigloShow">
        <div class="hb-touzi">
        <div class="hb-fuli">
          <img src="./images/newhb4.png" alt="">
        </div>
        <!-- <h6>50000元理财红包，200元现金抵扣券</h6> -->
        <ul>
          <li 
            v-for="(touzi,index) in topList" 
            :key='index' 
            :class="'top-list-'+touzi.status"
            
          >
              <p :class="'color-list-'+touzi.status">
                <span v-text="touzi.text_top" class= "newhb-best"></span>
                <span :class="'color-list-'+touzi.status" v-text="touzi.money"></span>
                元</p>
              <p 
                :class="'color-list-'+touzi.status" 
                v-text="touzi.desc"
              ></p>
              <div 
                class="go-meonth"
                @click="initCouponFun(touzi.cuserid, index, touzi.status)"
                :class="'color-list-'+touzi.status"
                v-text="touzi.text"
              ></div>
          </li>
        </ul>
        <div class="newhb-hot" v-show="bangkaShow">
          <img src="./images/hot.png" alt="最热门卡券">
          <img src="./images/hot.png" alt="最热门卡券">                                             
        </div>
      </div>
      </div>
      <div class="hb-slogn">-  存钱赚利息，就用鲸鱼app -<br>
      您通过本软件参与的任何活动与苹果公司无关
      </div>
    </div>    
  </div>
</div>
  
</template>
<script>
export default {
  components: {},
  data() {
    return {
      time: 0,
      timer: "",
      show: false, // 初始化显示
      sigloShow: false,
      productName:"",//第一张券产品名称
      //注册福利
      reg_status: {},
      //绑卡福利
      card_status: {},
      //去使用应传入参数
      listItem: {},
      //投资福利
      topList: [
        // {text1:"最高",text2:"50000",text3:"元",text4:"活期首次投资,投资多少送多少",text5:0},
        // {text2:"5",text3:"元",text4:"投资月定期单笔满1000元可用",text5:1},
        // {text2:"10",text3:"元",text4:"投资季定期单笔满5000元可用",text5:0},
        // {text2:"25",text3:"元",text4:"投资季定期单笔满10000元可用",text5:0},
        // {text2:"10",text3:"元",text4:"投资年定期单笔满3000元可用",text5:0},
        // {text2:"50",text3:"元",text4:"投资年定期单笔满10000元可用",text5:0},
        // {text2:"200",text3:"元",text4:"投资年定期单笔满50000元可用",text5:0}
      ],
      //控制绑卡显示
      bangkaShow: true
      // listItem:{productid:[reg_status.type]}
    };
  },
  computed: {
    // hbWdith(){
    //   let lie = document.documentElement.clientWidth;
    //   return lie
    // }
  },
  watch: {},
  created() {
    this.newLb();
    console.log(this.$route.query.data)
  },
  mounted() {},
  methods: {
    newLb() {
      this.$http({
        method: "home.activity",
        token: this.$root.appData.token,
        token_str:this.$route.query.data
      }).then(response => {
        console.log(response);
        this.reg_status = response.reg_status;
        this.card_status = response.card_status;
        this.topList = response.list;
        this.show = true;
        if (this.card_status.status == "-1") {
          this.bangkaShow = false;
        } else {
          this.bangkaShow = true;
        }
        if (response.is_login) {
          this.sigloShow = true;
        } else {
          this.sigloShow = false;
        }
      });
    },
    // cuserid卡券id
    initCouponFun(cuserid, index, status) {
      //未登陆 跳转注册
      if (this.$root.appData.token == "") {
        try {
          Jinr.pushRegister();
        } catch (error) {
          //提示语 changeI18n（）匹配成用户能识别的话语
          this.$flash(this.changeI18n(error));
        }
        return;
      }
      if (status == "0" || status == 0) {
        return;
      }
      if (index === 0) {
        console.log(this.topList[index].type==1?"活期":"周定期")
        console.log(this.topList[index].type.toString())
        this.productName = this.topList[index].type==1?"活期":"周定期"
        this._deActiva(this.topList[index].type.toString(), this.productName, "1", "0", "0", "1");
        // console.log()
        return;
      }
      let data = {
        method: "user.coupon.detail",
        token: this.$root.appData.token,
        cuserid: cuserid,
        type: "0"
      };
      if (this.time > 0) {
        return;
      }
      this.time = 1;
      this.timer = setInterval(() => {
        this.time--;
        if (this.time == 0) {
          clearInterval(this.timer);
          return;
        }
      }, 1000);
      this.$http(data).then(response => {
        let productid = response.productid.toString();
        let productname = response.productname.toString();
        let productType = response.productType.toString();
        let couponid = data.cuserid.toString();
        this._deActiva(
          productid,
          productname,
          productType,
          couponid,
          response.selected_name,
          "1"
        );
      });
    },
    // 去使用
    _deActiva(productid, productname, productType, couponId, selected_name) {
      this.$JinrSDK.pushProductTurnIn(
        productid,
        productname,
        productType,
        "4",
        "0",
        couponId,
        selected_name, //卡券名称
        "1"
      );
      return;
      // 版本4.1.0以上
      if (this.$root.appVersion > 410) {
        try {
          /**
           * productId 产品ID
           * productName 产品名字
           * productTypeId 产品类型ID
           * fromPage 从哪个页面跳转过来的 1-首页 2-资产页 3-详情页  4-活动页
           * eventRefId 活动事件ID,活动的页面点击的时候传，其余默认为“0”
           * couponId 卡券ID
           * couponName 卡券名称
           * isShowCoupon 是否显示选择卡券
           */
          Jinr.pushProductTurnIn(
            productid,
            productname,
            productType,
            "4",
            "0",
            couponId,
            selected_name, //卡券名称
            "1"
          );
        } catch (error) {
          // this.$flash(this.changeI18n(error))
          // this.$flash(error)
        }
      } else if ((this.$root.appVersion = 410)) {
        try {
          /**
           * productId 产品ID
           * productName 产品名字
           * productTypeId 产品类型ID
           * fromPage 从哪个页面跳转过来的 1-首页 2-资产页 3-详情页  4-活动页
           * eventRefId 活动事件ID,活动的页面点击的时候传，其余默认为“0”
           */

          Jinr.pushProductTurnIn(
            productid,
            productname,
            productType,
            couponId,
            selected_name, //卡券名称
            "4",
            "0"
          );
        } catch (error) {
          this.$flash(this.changeI18n(error));
        }
      } else {
        try {
          /**
           * productId 产品ID
           * productName 产品名字
           * productTypeId 产品类型ID
           * fromPage 从哪个页面跳转过来的 1-首页 2-资产页 3-详情页  4-活动页
           * eventRefId 活动事件ID,活动的页面点击的时候传，其余默认为“0”
           */

          Jinr.pushProductTurnIn(productid, productname, productType, "4", "0");
        } catch (error) {
          this.$flash(this.changeI18n(error));
        }
      }
    },

    // 跳转注册
    signFun() {
      // debugger
      if (this.reg_status.status == "0") {
        return;
      }
      try {
        let status = Jinr.pushRegister();
        status = JSON.parse(status);
        if (status.loginState == "1") {
          // this.$flash('已经绑卡')
          this.reg_status.status = 0;
        }
      } catch (error) {
        //提示语 changeI18n（）匹配成用户能识别的话语
        // this.$flash(this.changeI18n(error))
      }
    },
    //跳转绑卡
    bindingFun() {
      //未登陆 跳转注册
      if (!this.$root.appData.token) {
        try {
          let status = Jinr.pushRegister();
          status = JSON.parse(status);
          // this.$flash(status.loginState)
          if (status.loginState == "1") {
            // this.$flash('已经绑卡')
            this.reg_status.status = 0;
          }
        } catch (error) {
          //提示语 changeI18n（）匹配成用户能识别的话语
          // this.$flash(this.changeI18n(error))
        }
        return;
      }
      // 至灰不能点击
      if (this.card_status.status == 0) {
        return;
      }
      try {
        let status = Jinr.pushBindCard();
        status = JSON.parse(status);
        // this.$flash(status.bindState)
        if (status.bindState == "1") {
          // this.$flash('已经绑卡')
          this.card_status.status = 0;
        }
      } catch (error) {
        //提示语 changeI18n（）匹配成用户能识别的话语
        // this.$flash(this.changeI18n(error))
      }
    },
  }
};
</script>
