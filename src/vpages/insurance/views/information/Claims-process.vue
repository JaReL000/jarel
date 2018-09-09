<template>
  <div class="Claims-process">
       <div class="box" ref="box">
            <div class="left"><p class="line"></p></div>
             <div class="right">
                 <h4>报</h4>
                 <div class="text">
                    <p>拨打全国统一报案电话：</p>
                    <p><span>400-800-2020</span>转人工台接收</p>
                    <p>理赔材料准备</p>
                 </div>
              </div>
       </div>
        <div class="box" ref="box">
            <div class="left"><p class="line"></p></div>
             <div class="right">
                 <h4>备</h4>
                 <div class="text">
                    <p>应备材料于官网理赔</p>
                    <p>中心下载附件查看</p>
                    <p>提交资料</p>
                 </div>
              </div>
       </div>
        <div class="box" ref="box">
            <div class="left"><p class="line"></p></div>
             <div class="right">
                 <h4>快</h4>
                 <div class="text">
                    <p>材料原件提交到当地</p>
                    <p>相关保险门店</p>
                    <p>理赔受理</p>
                 </div>
              </div>
       </div>
       <div class="box" ref="box">
            <div class="left"></div>
             <div class="right">
                 <h4>领</h4>
                 <div class="text">
                    <p><span>三个工作日</span> 完成理赔，收赔偿金</p>
                    <p>特殊案件或调查案件为<span>10日内</span></p>
                    <p>完成理赔收理赔金</p>
                 </div>
              </div>
       </div>
  </div>

</template>
<script>
export default {
  // mounted(){
  //   let box = document.querySelectorAll('.box');
  //   let line = document.querySelectorAll('p.line');
  //   [].forEach.call(box,(v,i)=>{
  //      console.log('---xxx----', v,  v.offsetHeight)
  //      line[i].style.height = v.offsetHeight/2+'px';
  //   })
  // }
};
</script>

style.<style lang="scss">
.Claims-process {
  background: #f5f5f5;
  height: 100%;
  padding: 20px 0 0;
  font-size: 30px;
  box-sizing: border-box;
  > .box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // height:206px;
    margin-bottom: 20px;
    box-sizing: border-box;
    > .left {
      width: 90px;
      text-align: center;
      position: relative;
      &:after {
        content: "";
        display: inline-block;
        height: 50px;
        width: 50px;
        text-align: center;
        background: url("./images/Claims-process_icon.png") no-repeat 100%/100%;
        position: absolute;
        z-index: 10;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      > p.line {
        position: absolute;
        top: 50%;
        left: 50%;
        border-left: 4px solid #e0e3e7;
        width: 0;
        height: 250px;
        transform: translate(-50%, 0);
      }
    }
    > .right {
      flex: 1;
      background: #fff;
      padding: 0 0 20px 30px;
      line-height: 48px;
      color: #999999;
      > h4 {
        line-height: 68px;
        border-bottom: 1px solid #e7e7e7;
        color: #333;
      }
      p {
        span {
          color: #0c72e3;
        }
      }
    }
  }
}
</style>
