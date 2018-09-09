<template>
   <div :class="{choose:true,'choose-ios':$JinrSDK.isiOS}">
       <div class="content">
          <div class="top-section-box">
						<div class="sectione2">
							<img src="./images/register_content.png" alt="">
						</div>
						<div class="section3">
							<h3><span v-text="nowMonth"></span>月专家计划已启动</h3>
						</div>
            <div class="section4">
               <div class="title">
                  <h4>精选计划</h4>
               </div>
               <ul>
                 <li v-for="(item,index) in this.$root.intData.list" :key="item+index" v-if="item.earnings">
                    <div class="left_right">
											<div class="left" >
                        <p v-text="item.earnings_name"></p>
                        <p >
													<span v-text="item.earnings? item.earnings.substr(0,item.earnings.length-1) : item.earnings"></span><span>%</span>
                        </p>
                    	</div>
											<div class="right">
													<p>
														<span v-text="item.plan_name"></span>
														<span v-text="item.plan_level_name"></span>
													</p>
													<div class="center">
														<span v-text="item.plan_date_start_name"></span>
														<span v-text="item.run_time_str">1天后运行</span>
													</div>
													<div class="bottm">
														<div>
																<p  class="red">
																	<span
																		v-text="item.target_rate.substr(0,item.target_rate.length-1)"
																	></span><span>%</span>
																</p>
																<span v-text="item.target_rate_name"></span>
														</div>
															<div>
																<p class="green">
																<span
																	v-text="item.loss_rate.substr(0,item.loss_rate.length-1)"
																></span><span>%</span>
																</p>
																<span v-text="item.loss_rate_name"></span>
														</div>
													</div>
											</div>
										</div>
										<div class="bottom">
											<span v-text="item.expert_name">天添盈</span>
											<span class="bottom-left">胜率：<span v-text="item.win_rate"></span></span>
										</div>
                 </li>
               </ul>
            </div>
            <div class="section5">
							<h6>活动规则:</h6>
              <p>1、本活动仅限未注册鲸鱼选股用户参与；</p>
							<p>2、未注册用户通过活动注册成为鲸鱼选股会员，可领取498元红包；</p>
							<p>3、本活动所得红包仅限购买投资计划可使用，红包不可提现；</p>
              <p>4、本活动所得红包有效期 15天，过期无效</p>
							<p>*活动最终解释权归鲸鱼选股所有</p>
							<p>温馨提示：目标收益不等于实际收益。股市有风险，投资需谨慎。</p>
            </div>
          </div>
       </div>
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
      dayStockData: {},
			nowMonth:"",
			// inIData:{}
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
	},
	created() {
		this.getMonth()
		// this._getInit()
	},
  methods: {
		//初始化
    _getInit(){
      let params = {
        data:this.data
      }
      this.$http("xg/app/zeroYuan",params).then(res=>{
				this.inIData = res.data.inIData;
      })
    },
    init() {
      this._dayStock();
    },
    _close(isShow) {
      this.RegisterShow = !!isShow;
    },
    _dayStock() {
      let params = {
        open_id: this.open_id,
        iplan_id: this.iplan_id
      };
      this.$http("/xg/app/activityPlan", params).then(res => {
        console.log(res);
        this.intData = res.data;
      });
		},
		//获取当前月份
		getMonth(){
			let month = new Date().getMonth()
			this.nowMonth = month+1
		}
  }
};
</script>

<style lang="scss">
.choose {
  background: #fff;
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
			>.sectione2{
				width: 100%;
				overflow: hidden;
				>img{
					width: 100%;
				}
			}
			>.section3{
				h3{
					width: 100%;
					font-size: 36px;
					letter-spacing: 0px;
					color: #ff5f32;
					margin: 0 auto;
					text-align: center;
					font-weight: 600;
					border-bottom:2px solid #eee;
					padding-bottom: 31px;
					box-sizing: border-box;
				}
			}
      > .section4 {
        // background: #fff;
        > div.title {
          height: 100px;
          padding: 0 32px;
          display: flex;
          align-items: center;
          line-height: 100px;
					background: #fff;
          > h4 {
            font-size: 32px;
            color: #333;
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
          // padding-left: 43px;
					background: #eee;
          > li {
						padding: 35px 0px 20px 43px;
            margin-bottom: 10px;
						background: #fff;
            &:last-child {
              margin-bottom: 10px;
            }
						>.left_right{
							display: flex;
            	justify-content: space-between;
							> .left {
								width: 190px;
								height: 210px;
								border: 1px solid #e8e8e8;
								border-radius: 10px;
								text-align: center;
								padding-top: 40px;
								box-sizing: border-box;
								>p:first-of-type{
									font-size: 28px;
									color:#666;
								}
								>p:nth-of-type(2) {
									font-family: "DINENGSCHRIFTSTD";
									color: #fa5050;
									>span:nth-of-type(1) {
										font-size: 63px;
										width: 100%;
										word-wrap: break-word;
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
									color: #9e9e9e;
									margin-top: 5px;
									>:first-child{
										margin-right: 20px;
									}
								}
								> .bottm {
									display: flex;
									justify-content: space-between;
									margin-top: 20px;
									margin-right: 200px;
									> div {
										> p {
											font-size: 55px;
											margin-bottom: 5px;
											font-family: "DINENGSCHRIFTSTD";
											// white-space: nowrap;
											span {
												&:last-child {
													font-size: 30px;
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
						>.bottom{
							width: 100%;
							height: 55px;
							border-top: 1px solid #e8e8e8;
							margin-top: 19px;
							padding: 10px 38px 0 10px;
							box-sizing: border-box;
							overflow: hidden;
							>span{
								font-size: 24px;
								line-height: 38px;
								letter-spacing: 1px;
								color: #9e9e9e;
							}
							.bottom-left{
								float: right;
							}
						}
          }
        }
      }
      > .section5 {
        text-align: left;
        padding-top: 47px;
				background: #fff;
				padding-bottom: 20px;
				>h6{
					font-size: 24px;
					color: #000000;
					margin-left: 43px;
					line-height: 40px;
				}
        > p {
					font-size: 24px;
          color: #666666;
					margin: 0 52px 0 43px;
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
				>p:nth-of-type(6){
					text-align: center;
					font-size: 18px;
					letter-spacing: 0px;
					color: #acacac;
				}
      }
    }
  }
}
@font-face {
	font-family: 'DINENGSCHRIFTSTD';
    src: url('../../font/DINENGSCHRIFTSTD.eot'); /* IE9 Compat Modes */
    src: url('../../font/DINENGSCHRIFTSTD.woff2'), /* IE6-IE8 */
         url('../../font/DINENGSCHRIFTSTD.woff') format('woff'), /* Modern Browsers */
         url('../../font/DINENGSCHRIFTSTD.ttf')  format('truetype'), /* Safari, Android, iOS */
         url('../../font/DINENGSCHRIFTSTD.svg') format('svg'); /* Legacy iOS */
}
</style>

