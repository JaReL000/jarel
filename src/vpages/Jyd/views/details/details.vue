<template>
    <div class="details" v-if="!requestIng">
        <div class="banner">
           <p>预计年化收益率</p>
           <div class="center">
              <span v-text="initData.leftRateInit.substr(0,initData.leftRateInit.length-1)"></span>%<span v-text="!!initData.rightRateInit?`+${initData.rightRateInit.substr(0,initData.rightRateInit.length-1)}`:initData.rightRateInit"></span><span v-text="initData.rightRateInit.substr(initData.rightRateInit.length-1,1)"></span>
           </div>
           <div class="bottom">
              <p v-text="`${initData.per_money_min}元起投`"></p>
              <p v-text="`锁定期${initData.project_period}月`"></p>
              <p v-text="`剩余可投${initData.dropTankMoney}`"></p>
           </div>
        </div>
          <!-- 收益估算 -->
        <detail-reckon
          :rateAll="initData.rate_init||'0'"
          :bankRate="'0.035'"
          :investDays="initData.project_period"
          :ptypeid="initData.repay_way"
          v-if="true"
        ></detail-reckon>
        <div class="projectIntroduce" @click="$router.push('/introduce')">项目介绍</div>
        <div class="projectIntroduce-content">
           <ul>
              <li v-for="(item,index) in qaList" :key="item+index">
                 <h4 class="title" v-text="item.title"></h4>
                 <div class="content" v-html="item.content"></div>
              </li>
           </ul>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      initData: {},
      requestIng: true,
      qaList:[{
        title:'投标前需注意哪些事项？',
        content:`<p>（1）投标前认真阅读该笔借款的详细信息，以确定您所要投的标符合您的风险承受能力和所要求的回报率。</p><p>（2）投标前请核实自己将要投资的金额，确认无误后再进行操作。</p>`
      },{
        title:'如何了解借款人的还款状态？',
        content:`<p>一旦投资成功，您可以在还款计划或我的待收中看到每期的详细还款状态。</p>`
      },{
        title:'投标前需注意投标后是否可以取消？',
        content:`<p>您在投标后不允许取消。若此标满标后，您的资金将转入该标借款人账户。若此标流标，则转为可用金额。</p>`
      },{
        title:'投资金额有限制吗？',
        content:`<p>只要您的资金来源合法，无其他限制情况下，投资金额需大等于100元人民币。</p>`
      },{
        title:'提现多久到账？',
        content:`<p>（提现成功后一般将在1-3个工作日到账，节假日顺延。</p>`
      },{
        title:'提现有手续费吗?',
        content:`<p>每日最多可免费提现3次，3次用完，次日即可再提现。</p>`
      }]
    };
  },
  computed: {
    productId() {
      return this.$route.query.id;
    }
  },
  mounted() {
    this.init();
    console.log("----", this.productId);
  },
  methods: {
    init() {
      this._getDetail();
    },
    _getDetail() {
      this.$http("/jyd/productDetails", {
        productId: this.productId,
        data: "xxxx"
      })
        .then(({ data: res }) => {
          this.initData = res;
          document.querySelector(".vux-header-title>span").innerText =
            res.project_name;
          this.$nextTick(() => {
            this.requestIng = false;
          });
        })
        .catch(error => {
          console.log(error);
          this.requestIng = false;
        });
    }
  }
};
</script>
<style lang="scss">
.details {
  .banner {
    height: 374px;
    background: #1867a4;
    padding-top: 43px;
    box-sizing: border-box;
    > p {
      text-align: center;
      font-size: 24px;
      color: #a8caed;
    }
    .center {
      text-align: center;
      padding-top: 50px;
      font-size: 32px;
      color: #fff;
      span {
        &:first-child {
          font-size: 85px;
        }
        &:nth-child(2) {
          font-size: 65px;
        }
      }
    }
    .bottom {
      display: flex;
      justify-content: space-around;
      margin-bottom: 66px;
      padding-top: 66px;
      > p {
        flex: 0 0 auto;
        padding: 8px 20px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 25px;
        color: #6693c0;
        font-size: 26px;
      }
    }
  }
  >.projectIntroduce{
    height:88px;
    padding:0 32px;
    background: #fff;
    line-height: 88px;
    font-size:28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom:20px;
    &:after{
      content:"";
      display: block;
      width:15px;
      height: 15px;
      border-top:1px solid #c5c5c5;
      border-right:1px solid #c5c5c5;
      transform: rotateZ(45deg)
    }
  }
  >.projectIntroduce-content{
    padding:32px;
    background: #fff;
    ul{
      li{
        >h4{
          font-size:32px;
          color:#282831;
          display: flex;
          align-items: center;
          &::before{
            content: 'hot';
            display: inline-block;
            width:70px;
            height:35px;
            border:1px solid #ff5963;
            color:#ff5963;
            text-align: center;
            line-height: 35px;
            border-radius: 10px;
            margin-right:20px;

          }
        }
      }
    }
  }
}
</style>


