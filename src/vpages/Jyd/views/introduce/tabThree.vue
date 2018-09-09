<template>
    <div class="data">
        <div class="data-box">
            <div class="data-img"></div>
            <p>车辆照片</p>
        </div>
        <div class="data-box">
            <div class="data-img"></div>
            <p>车辆照片</p>
        </div>
        <div class="data-box">
            <div class="data-img"></div>
            <p>车辆照片</p>
        </div>
        <div class="data-box">
            <div class="data-img"></div>
            <p>车辆照片</p>
        </div>
    </div>
</template>

<style lang="scss">
.data {
  margin: 0 32px;
  .data-box {
    width: 333px;
    height: 340px;
    margin: auto;
    text-align: center;
    float: left;
    .data-img {
      width: 333px;
      height: 256px;
      background-color: #ffffff;
      border-radius: 4px;
    }
    p {
      font-family: PingFangSC-Medium;
      font-size: 30px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 84px;
      letter-spacing: 0px;
      color: #333333;
    }
  }
.data-box:nth-of-type(2n){
    margin-left: 17px;
   }
}
</style>
