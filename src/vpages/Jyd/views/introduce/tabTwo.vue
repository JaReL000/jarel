<template>
    <div>
        <ul class="topUl">
           <li>投资人</li> 
           <li>投资金额（元）</li> 
           <li>投资时间</li> 
        </ul>
        <div class="record">
            <ul>
                <li>551545*45</li>
                <li>2200</li>
                <li>2018-03-19 20:00:32</li>
            </ul>
            <ul>
                <li>551545*45</li>
                <li>2200</li>
                <li>2018-03-19 20:00:32</li>
            </ul>
            <ul>
                <li>551545*45</li>
                <li>2200</li>
                <li>2018-03-19 20:00:32</li>
            </ul>
        </div>
    </div>
</template>
<style lang="scss">
.topUl {
  width: 100%;
  height: 70px;
  background-color: #f7f7f8;
  text-align: center;
  li {
    font-size: 26px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 88px;
    letter-spacing: 0px;
    color: #666666;
    float: left;
    width: 33%;
  }
}
.record {
  ul {
    width: 100%;
    height: 100px;
    font-size: 26px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 88px;
    letter-spacing: 0px;
    color: #333333;
    border-bottom: 1px solid #eaeaea;
    text-align: center;
    li {
      float: left;
      width: 33.33%;
      height: 100px;
    }
    li:nth-of-type(3) {
      font-size: 24px;
      font-weight: normal;
      font-stretch: normal;
      color: #a5a5a5;
      // width: 141px;
      line-height: 40px;
    }
  }
}
</style>

