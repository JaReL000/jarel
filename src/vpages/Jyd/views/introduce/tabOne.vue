<template>
    <div>
     <div class="content" > 
        <h3>基本情况</h3>
       <div class="line"></div>
        <div class="content-text">
            本标的为个人资金周转借款，借款人以车辆为抵押物。投资人通过微贷网投资此标获得对应收益。每个借款人经过微贷实体门店风控人员多层严格筛选。
            通过车辆抵质押保障还款来源，稳健可靠。
            <a href="#">查看更多></a>
        </div>
    </div>
    <div class="bgline"> </div>

    <div class="info">
        <h3>借款人信息</h3>
       <div class="line"></div>
       <div class="info-text">姓名<span>某某</span></div>
       <div class="info-text">性别<span>女</span></div>
       <div class="info-text">户籍<span>江西</span></div>
       <div class="info-text">身份证号<span>55545635488****5644888</span></div>
       <div class="info-text">抵押方式<span></span></div>
       <div class="info-text">借款用途<span>某某</span></div>
    </div>

   <div class="bgline"> </div>
    
    <div class="record">
        <h3>借款记录</h3>
       <div class="line"></div>
       <div class="record-left">
           <div>申请借贷<span>2笔</span></div>
           <div>逾期次数<span>2笔</span></div>
           <div>还清期数<span>2笔</span></div>
           <div>待还款数<span>2笔</span></div>
           <div>逾期已还<span>2笔</span></div>
       </div>
       <div class="record-right">
           <div>逾期未还<span>2笔</span></div>
           <div>借贷总额<span>4588元</span></div>
           <div>待还本息<span>5545元</span></div>
           <div>逾期金额<span>265655元</span></div>
       </div>
    </div>

   <div class="bgline"> </div>

    <div class="content">
        <h3>风险评估</h3>
       <div class="line"></div>
        <div class="content-text">
            借款人所属行业风险评估及可能产生的风险结果 :借款人所属批发和零售业，主营建筑材料、五金产品、电子产品的销售，较小。
            <a href="#">查看更多></a>
        </div>
    </div>
    </div>
</template>

<style lang="scss">
.content {
  margin: 0 35px;
  font-family: PingFangSC-Medium;
  h3 {
    font-size: 30px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 88px;
    letter-spacing: 0px;
    color: #333333;
  }
  .line {
    height: 1px;
    background-color: #eaeaea;
    margin-bottom: 33px;
  }
  .content-text {
    font-size: 28px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 40px;
    letter-spacing: 0px;
    color: #333333;
    margin: 0 auto 33px;
    a {
      font-size: 24px;
      color: #0c72e3;
    }
  }
}
.bgline {
  width: 749px;
  height: 20px;
  background-color: #f7f7f8;
//   background-color: red;
}

.info {
  margin: 0 35px;
  font-family: PingFangSC-Medium;
  padding-bottom: 45px;
  h3 {
    font-size: 30px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 88px;
    letter-spacing: 0px;
    color: #333333;
  }
  .line {
    height: 1px;
    background-color: #eaeaea;
    margin-bottom: 33px;
  }
  .info-text {
    font-size: 26px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 54px;
    letter-spacing: 0px;
    color: #a5a5a5;
    span {
      color: #333333;
      float: right;
    }
  }
}
.record {
  margin: 0 35px;
  font-family: PingFangSC-Medium;
  height: 426px;
  h3 {
    font-size: 30px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 88px;
    letter-spacing: 0px;
    color: #333333;
  }
  .line {
    height: 1px;
    background-color: #eaeaea;
    margin-bottom: 33px;
  }
  .record-left {
    float: left;
    width: 226px;
    div {
      font-size: 26px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 54px;
      letter-spacing: 0px;
      color: #a5a5a5;
      span {
        color: #333;
        float: right;
      }
    }
  }
  .record-right {
    float: right;
    width: 330px;
    div {
      font-size: 26px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 54px;
      letter-spacing: 0px;
      color: #a5a5a5;
      span {
        color: #333;
        text-align: left;
        margin-left: 80px;
      }
    }
  }
}
.assess {
  margin: 0 35px;
  font-family: PingFangSC-Medium;
  h3 {
    font-size: 30px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 88px;
    letter-spacing: 0px;
    color: #333333;
  }
  .line {
    height: 1px;
    background-color: #eaeaea;
    margin-bottom: 33px;
  }
}
</style>

