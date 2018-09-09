<template>
   <div :class="{choose:true,'choose-ios':$JinrSDK.isiOS}" v-if="!responsing">
       <div class="content">
          <div class="top-section-box">
            <div class="title">
               <div class="left"></div>
               <div class="right">
                  <div>
                    <p><span>鲸鱼选股</span></p>
                    <!-- <p>400-992-3866</p> -->
                  </div>
                  <div>国内<span>首家</span>互联网专家股票投顾服务平台</div>
               </div>
            </div>
            <!-- <h3>好友 <span v-text="dayStockData.nickname"></span> 送了你一只牛股</h3> -->
            <div class="top-section">
                 <div class="top-box">
                    <div class="top">
                      <p>
                        <span v-text="intData.plan_name"></span>
                        <span v-text="intData.plan_level_name"></span>
                      </p>
                    </div>
                    <div class="center">
                      <div class="left">
                          <p>
                            <span v-text="intData.target_rate.substr(0,intData.target_rate.length-1)"></span><span>%</span>
                          </p>

                          <p>目标收益</p>
                      </div>
                      <div class="right" v-if="intData.cur_status==3">
                          <p  :class="{green:parseFloat(intData.current_rate)<0}">
                            <span
                            v-text="intData.current_rate"></span><span>%</span>
                          </p>
                          <p>当前收益</p>
                      </div>
                    </div>
                 </div>
                <ul class="bottom">
                    <li>
                       <p v-text="intData.base_rate" class="red"></p>
                       <p v-text="intData.base_rate_name"></p>
                    </li>
                    <li>
                       <p v-text="intData.loss_rate" class="green"></p>
                       <p v-text="intData.loss_rate_name"></p>
                    </li>                 <li>
                       <p v-text="intData.run_time_str"></p>
                       <p v-text="intData.run_time_name"></p>
                    </li>
                </ul>
            </div>
            <div class="section1">
               <p>专家领盘</p>
               <p>短线狙击</p>
               <p>实时盯盘</p>
               <p>买卖无忧</p>
            </div>
            <div class="section2">
               <div class="left">
                  <p>
                    <span v-text="intData.expert_name"></span>
                    <span v-text="intData.srv_level"></span>
                  </p>
                  <p>
                    <span>历史战绩&nbsp;&nbsp;胜率&nbsp;</span>
                    <span v-text="intData.win_rate" class="red"></span>
                  </p>
               </div>
               <div class="right">
                  往期业绩
               </div>
            </div>
            <div class="section3">
                <p class="btn" @click="_register">马上跟投</p>
            </div>
            <div class="section4">
               <div class="title">
                  <h4>往期回顾</h4>
                  <p>历史战绩</p>
                  <p>胜率 <span v-text="intData.win_rate"></span></p>
               </div>
               <ul>
                 <li v-for="(item,index) in  intData.list" :key="item+index">
                    <div class="left" >
                        <p v-text="item.earnings_name"></p>
                        <p >
                          <span v-text="item.earnings.substr(0,item.earnings.length-1)"></span><span>%</span>
                        </p>
                    </div>
                    <div class="right">
                        <p>
                          <span v-text="item.plan_name"></span>
                          <span v-text="item.plan_level_name"></span>
                        </p>
                        <div class="center">
                           <span v-text="item.run_time_str"></span>
                           <span></span>
                        </div>
                        <div class="bottm">
                           <div>
                              <p  :class="{red:item.cur_status==4}">
                                <span
                                   v-text="item.target_rate.substr(0,item.target_rate.length-1)"
                                ></span><span>%</span>
                              </p>
                              <span v-text="item.target_rate_name"></span>
                           </div>
                            <div>
                              <p :class="{green:parseFloat(item.loss_rate)<0}">
                              <span
                                v-text="item.loss_rate.substr(0,item.loss_rate.length-1)"
                              ></span><span>%</span>
                              </p>
                              <span v-text="item.loss_rate_name"></span>
                           </div>
                           <p
                             v-text="['','','','','已成功','已完成','已失败'][item.cur_status]"
                             :class="{faill:item.cur_status==6}"
                           ></p>
                        </div>
                    </div>
                 </li>
               </ul>
            </div>
            <div class="section5">
              <p>温馨提醒：目标收益不代表实际收益</p>
              <p>股市有风险，投资需谨慎</p>
              <p class="btn" @click="_register">立即跟投先挣5%</p>
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
      ListData: [],
      RegisterShow: false,
      dayStockData: {},
      intData: {},
      responsing:true
    };
  },
  computed: {
    iplan_id() {
      return this.$JinrSDK.getUrl().iplan_id;
    },
    open_id() {
      return this.$JinrSDK.getUrl().openid;
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
      this.responsing = true;
      let params = {
        open_id: this.open_id,
        iplan_id: this.iplan_id
      };
      this.$http("/xg/app/activityPlan", params).then(res => {
        console.log(res);
        this.intData = res.data;
        this.responsing = false;
      });
    }
  }
};
</script>

style.<style lang="scss">
.choose {
  background: #f7f8fa;
  > .content {
    position: relative;
    .green {
      color: #37c534 !important;
    }
    .red {
      color: #fa5050 !important;
    }
    > .top-section-box {
      // height: 1072px;
      width: 100%;
      overflow-x: hidden;
      // background: url("./images/chose_top-section_bg.png") no-repeat 100%/100%;
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
              font-weight: 900;
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
      > .top-section {
        .top-box {
          height: 288px;
          width: 100%;
          background: #fff9ee;
          border-top: 1px solid #ffe8bf;
          border-bottom: 1px solid #ffe8bf;
          box-sizing: border-box;
          padding-top: 43px;
          > .top {
            text-align: center;
            display: flex;
            justify-content: center;
            > p {
              position: relative;
              color: #666666;
              span {
                font-size: 38px;
                line-height: 42px;
                &:last-child {
                  position: absolute;
                  right: 0%;
                  transform: translateX(110%);
                  top: -20px;
                  height: 36px;
                  font-size: 21px;
                  font-weight: 900;
                  padding: 0 18px;
                  line-height: 36px;
                  border: 1px solid #4993bc;
                  border-radius: 20px 20px 20px 0;
                  color: #4993bc;
                  // background: url('./images/top_section_tip1.png') no-repeat;
                  // background-size: cover;
                  // color:#4993bc;
                }
              }
            }
          }
          > .center {
            padding-top: 50px;
            display: flex;
            justify-content: space-around;
            //  .left{
            p {
              text-align: center;
              &:first-child {
                color: red;
                font-size: 62px;
              }
              &:last-child {
                margin-top: 22px;
                font-size: 21px;
                color: #666;
              }
              > span {
                &:last-child {
                  font-size: 32px;
                }
              }
            }
            //  }
          }
        }
        > .bottom {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #e8e8e8;
          height: 161px;
          background: #fff;
          li {
            flex: 1;
            border-right: 1px solid #e8e8e8;
            text-align: center;
            padding-top: 48px;
            > p {
              margin-bottom: 15px;
              font-size: 26px;
              &:first-child {
                font-size: 32px;
              }
            }
            &:last-child {
              border-right: none;
            }
          }
        }
      }
      > .section1 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 46px;
        margin-top: 20px;
        background: #fff;
        font-size: 28px;
        color: #2772ff;
      }
      > .section2 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 38px;
        height: 140px;
        margin-top: 20px;
        background: #fff;
        > .left {
          p {
            &:first-child {
              span {
                vertical-align: middle;
                &:first-child {
                  font-size: 30px;
                  color: #000;
                }
                &:last-child {
                  display: inline-block;
                  height: 30px;
                  border: 1px solid #2772ff;
                  box-sizing: border-box;
                  color: #2772ff;
                  border-radius: 15px;
                  font-size: 21px;
                  line-height: 30px;
                  padding: 0 5px;
                  margin-left: 15px;
                }
              }
            }
            &:last-child {
              color: #999;
              margin-top: 14px;
              font-size: 24px;
              // line-height: 42px;
            }
          }
        }
        > .right {
          color: #a0a0a0;
          &::after {
            content: "";
            display: inline-block;
            width: 15px;
            height: 15px;
            border-top: 1px solid #a0a0a0;
            border-right: 1px solid #a0a0a0;
            transform: rotateZ(45deg);
          }
        }
      }
      > .section3 {
        height: 173px;
        width: 100%;
        padding: 0 30px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        margin: 20px 0;
        background: #fff;
        > p {
          height: 103px;
          width: 100%;
          background: #2772ff;
          color: #fff;
          font-size: 32px;
          border-radius: 10px;
          text-align: center;
          line-height: 103px;
        }
      }
      > .section4 {
        background: #fff;
        > div.title {
          height: 100px;
          padding: 0 32px;
          display: flex;
          align-items: center;
          line-height: 100px;
          > h4 {
            font-size: 32px;
            color: #000;
            margin-right: 24px;
          }
          > p {
            margin-right: 24px;
            > span {
              color: #fa5050;
            }
          }
          &::before {
            display: block;
            content: "";
            height: 30px;
            width: 0px;
            border-left: 4px solid #2772ff;
            margin-right: 10px;
          }
        }
        > ul {
          padding-left: 43px;
          > li {
            display: flex;
            justify-content: space-between;
            // align-items: center;
            padding-bottom: 20px;
            padding-right: 21px;
            border-bottom: 1px solid #e8e8e8;
            margin-bottom: 53px;
            &:last-child{
              margin-bottom: 0;
            }
            > .left {
              width: 190px;
              height: 210px;
              border: 1px solid #e8e8e8;
              border-radius: 10px;
              text-align: center;
              padding-top: 40px;
              box-sizing: border-box;

              p {
                &:first-child {
                  margin-bottom: 30px;
                  font-size: 30px;
                }
                &:last-child {
                  font-size: 46px;
                  color: #fa5050;
                  width:100%;
                 word-wrap:break-word;
                  span {
                    &:last-child {
                      font-size: 28px;
                    }
                  }
                }
              }
            }
            > .right {
              flex: 1;
              margin-left: 28px;
              // overflow: hidden;
              > p {
                // overflow: hidden;
                span {
                  &:first-child {
                    font-size: 32px;
                    color: #333440;
                  }
                  &:last-child {
                    display: inline-block;
                    height: 34px;
                    line-height: 34px;
                    padding: 0 10px;
                    border: 1px solid #4993bc;
                    border-radius: 17px 17px 17px 0;
                    transform: translateY(-15px);
                    color: #4993bc;
                  }
                }
              }
              > .center {
                // display: flex;
                // justify-content: space-between;
                color: #666666;
                margin-top: 5px;
              }
              > .bottm {
                display: flex;
                justify-content: space-between;
                margin-top: 20px;
                > div {
                  > p {
                    font-size: 42px;
                    margin-bottom: 5px;
                    // white-space: nowrap;
                    span {
                      &:last-child {
                        font-size: 28px;
                      }
                    }
                  }
                }
                > p {
                  height: 50px;
                  width: 140px;
                  border: 1px solid #ff7701;
                  border-radius: 10px;
                  line-height: 50px;
                  text-align: center;
                  font-size: 28px;
                  color: #ff7701;
                  &.faill {
                    color: #666666;
                    border-color: #666666;
                  }
                }
              }
            }
          }
        }
      }
      > .section5 {
        text-align: center;
        padding-top: 71px;
        background: #fff;
        > p {
          color: #666;
          line-height: 46px;
          &.btn {
            margin: 40px auto;
            height: 105px;
            width: 684px;
            background: #2772ff;
            color: #fff;
            text-align: center;
            line-height: 105px;
            border-radius: 10px;
          }
        }
      }
    }
  }
}
</style>

