<template>
   <div class="chose">
       <!-- <hd :title="{name:'每日一股 历史成功率95%'}"></hd> -->
       <div class="content">
          <div class="top-section-box">
            <div class="title">
               <div class="left"></div>
               <div class="right">
                  <div>
                    <p><span>鲸鱼选股</span><span>臻选牛股</span></p>
                    <p>400-992-3866</p>
                  </div>
                  <div>国内<span>首家</span>互联网专家股票投顾服务平台</div>
               </div>
            </div>
            <h3>好友 <span v-text="dayStockData.nickname"></span> 送了你一只牛股</h3>
            <div class="top-section">
             <h4></h4>
             <div class="content">
               <div class="top">
                  <div class="left">
                      <p v-if="dayStockData.stockName"><span v-text="dayStockData.stockName"></span><span v-text="`(${dayStockData.stockCode})`"></span></p>
                      <!-- <p class="line"></p> -->
                      <p v-text="dayStockData.dayRecommend"></p>
                  </div>
                  <div class="right">
                    <p><b v-text="dayStockData.stageIncrease||'--'"></b><span v-if="!!dayStockData.stageIncrease">%</span></p>
                    <p>阶段涨幅</p>
                  </div>

               </div>
               <div class="bottom">
                  <div class="slide-box">
                      <Slide
                        :options="{direction:'left'}"
                        :data="dayStockData.stockNotice"
                        :step="0.5"
                        >
                          <ul>
                            <li v-for="(item,index) in dayStockData.stockNotice" :key="item+index" v-text="item.noticeMeg">
                            </li>
                          </ul>
                      </Slide>
                  </div>
               </div>
               <div class="btn" @click="_register">马上领取更多牛股</div>
             </div>
            </div>
             <!-- <div class="center-section">
                <h3>鲸鱼选股 臻选牛股</h3>
                <p class="ds">专注服务1.2亿中小散户，让炒股更简单 </p>
                <ul>
                  <li v-for="(item,index) in statistics" :key="item+index">
                      <div v-text="item.data"></div>
                      <p v-text="item.ds"></p>
                  </li>
                </ul>
                <div class="ds1">5月份抓10个涨停板</div>
                <div class="ds2">每月荐股&nbsp;&nbsp;本月平均涨幅12%</div>
             </div> -->
          </div>
          <div class="bottom-section">
              <div class="btn-section">
                 <p>如有疑问，请关注<span>鲸鱼选股（微信号：jyxuangu）</span>咨询</p>
                 <p class="btn" @click="_register">马上领取更多牛股</p>
              </div>
          </div>
       </div>
       <Register v-if="!!RegisterShow" @close="_close"></Register>
   </div>
</template>
<script>
export default {
  data() {
    return {
      statistics: [
        {
          data: "110%",
          ds: "五月最高个股涨幅"
        },
        {
          data: "93.8%",
          ds: "五月牛股成功率"
        },
        {
          data: "11",
          ds: "五月11个涨停板"
        },
        {
          data: "20万",
          ds: "五月激活用户数"
        }
      ],
      ListData: [],
      RegisterShow: false,
      dayStockData: {}
    };
  },
  computed: {
    dstock_id() {
      return this.$JinrSDK.WXgetUrl('open_id').dstock_id;
    },
    open_id() {
      return this.$JinrSDK.WXgetUrl('open_id').open_id;
    },
    token() {
      return this.$JinrSDK.WXgetUrl('open_id').token;
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this._dayStock();
    },
    _register() {
      console.log("---");
      this.RegisterShow = true;
    },
    _close(isShow) {
      this.RegisterShow = !!isShow;
    },
    _dayStock() {
      let params = {
        token: this.token,
        open_id: this.open_id,
        dstock_id: this.dstock_id
      };
      this.$http("/xg/app/dayStock", params).then(res => {
        console.log(res);
        this.dayStockData = res.data;
      });
    }
  }
};
</script>

style.<style lang="scss">
.chose {
  > .content {
    position: relative;
    > .top-section-box {
      height: 1072px;
      width: 100%;
      background: url("./images/chose_top-section_bg.png") no-repeat 100%/100%;
      position: relative;
      box-sizing: border-box;
      // overflow: hidden;
      > .title {
        height: 106px;
        background: #fff;
        display: flex;
        justify-content: space-between;
        padding: 18px 18px 0;
        box-sizing: border-box;
        .left {
          width: 75px;
          height: 75px;
          background: url("./images/logo.png") no-repeat 100%/100%;
        }
        .right {
          flex: 1;
          margin-left: 20px;
          font-size: 28px;
          div {
            &:first-child {
              display: flex;
              justify-content: space-between;
              color: #113685;
              font-weight: 500;
            }
            &:last-child {
              > span {
                color: #ff4300;
              }
            }
          }
        }
      }
      > h3 {
        // margin-top:106px;
        text-align: center;
        color: #fff;
        font-size: 32px;
        line-height: 112px;
      }
      .top-section {
        position: absolute;
        top: 222px;
        left: 0;
        width: 100%;
        padding: 40px 35px 0;
        box-sizing: border-box;
        h4 {
          padding-left: 37px;
          margin-bottom: 90px;
        }
        > .content {
          > .top {
            padding-right: 47px;
            display: flex;
            justify-content: space-between;
            margin-bottom: 27px;
            > div.left {
              p {
                // line-height: 80px;
                color: #666;
                font-size: 21px;
                &:first-child {
                  padding-left: 47px;
                  margin-bottom: 35px;
                  font-size: 28px;
                  font-weight: 900;
                }
                &:last-child {
                  font-size: 24px;
                  padding-left: 90px;
                }
              }
            }
            > div.right {
              p {
                &:first-child {
                  font-size: 54px;
                  font-weight: 900;
                  color: #fa5050;
                  > span {
                    font-size: 28px;
                  }
                }
                &:last-child {
                  font-size: 24px;
                  text-align: center;
                  margin-left: -60px;
                }
              }
            }
          }
          .bottom {
            height: 50px;
            line-height: 50px;
            padding-left: 40px;
            color: #ff7701;
            display: flex;
            align-items: center;
            &::before {
              content: "";
              display: block;
              // width: 24px;
              flex: 0 0 24px;
              height: 21px;
              background: url("./images/top-section-box_bottom_horn.png")
                no-repeat 100%/100%;
            }
            >.slide-box{
              flex:1;
            }
            ul {
              li {
                line-height: 55px;
              }
            }
          }
          .btn {
            width: 368px;
            height: 60px;
            font-size: 24px;
            line-height: 60px;
            text-align: center;
            color: #fff;
            border-radius: 30px;
            background: #3a83ff;
            margin: 24px auto 0;
          }
        }
      }
      .center-section {
        width: 100%;
        position: absolute;
        top: 720px;
        left: 0;
        text-align: center;
        color: #fff;
        > h3 {
          font-size: 47px;
          margin-bottom: 10px;
          font-weight: 900;
        }
        > p {
          font-size: 21px;
          margin-bottom: 35px;
        }
        > ul {
          display: flex;
          padding: 0 45px;
          justify-content: space-between;
          box-sizing: border-box;
          li {
            flex: 1;
            > div {
              width: 136px;
              height: 136px;
              border: 4px solid #fff;
              border-radius: 68px;
              font-size: 38px;
              line-height: 136px;
              // font-weight: 900;
              box-sizing: border-box;
              margin-bottom: 20px;
              &:first-child {
                margin-left: 10px;
              }
              &:last-child {
                margin-right: 10px;
              }
            }
            > p {
              white-space: nowrap;
              // margin-left:-15px;
              font-size: 20px;
            }
          }
        }
        > div.ds1 {
          margin-top: 40px;
          font-size: 47px;
        }
        > div.ds2 {
          margin-top: 62px;
          color: #6f9fff;
          font-size: 21px;
        }
      }
    }
    > .bottom-section {
      height: 1500px;
      width: 100%;
      background: url("./images/chose_bottom-section_bg.png") no-repeat 100%/100%;
      > .btn-section {
        width: 100%;
        height: 183px;
        background: #fff;
        position: fixed;
        bottom: 0;
        left: 0;
        text-align: center;
        padding-top: 21px;
        p {
          &:first-child {
            margin-bottom: 27px;
            span {
              color: red;
            }
          }
          &.btn {
            width: 447px;
            margin: 0 auto;
            height: 80px;
            color: #fff;
            background: #3a83ff;
            line-height: 80px;
            border-radius: 40px;
          }
        }
      }
    }
  }
}
</style>

