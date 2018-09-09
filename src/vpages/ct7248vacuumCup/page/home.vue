<template>
  <div class="content">
    <div class="index-wrap">
      <div class="pro-show">
      </div>
      <div class="pic2-box">
        <h2>备受追捧的保温杯</h2>
        <h2 class="center-font">为鱼粉专属定制</h2>
        <h2 class="bottom-font">暖心</h2>
      </div>
      <div class="pic3-box">
        <div class="font-top">
          <p>不管天凉天热，给自己准备一个</p>
          <p>方便携带的保温杯</p>
          <p>随时随地都能喝到温水</p>
          <p>让鲸鱼一年四季温暖你的心</p>
        </div>
        <div class="font-bottom">
          <h2>
            <span style="padding-right:8px;">无尾真空</span>
            <span>超保温保冷</span>
          </h2>
          <p>杯身在真空条件下</p>
          <p>有计算机控制完成抽气、焊接、冷却</p>
          <p>内胆微波镀铜</p>
          <p>有效增加保温保冷时长</p>
        </div>
      </div>
      <div class="pic4-box">
        <div class="font-top">
          <h2>超长保冷保温4-6小时</h2>
          <p>保温效果:60℃以上(4-6小时)</p>
          <p>保冷效果:8℃以下(4-6小时)</p>
          <p>环境温度: 15-25℃</p>
        </div>
        <div class="font-bottom">
          <h2>超长保冷保温4-6小时</h2>
          <p>保温效果:60℃以上(4-6小时)</p>
          <p>保冷效果:8℃以下(4-6小时)</p>
          <p>环境温度: 15-25℃</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as jrUrl from '../urlconfig/urlconfig'
import {getRequest,pattern} from '../util/util'
import Flash from '@/components/flash'
import jinrsdk from 'src/jinr-sdk/index'

export default {
  name: 'index',
}
</script>

<style lang="stylus" scoped>
.content{
    width:100%;
    height:100%;
    overflow:hidden;
    background:#39adf7;
    position:relative;
    box-sizing:border-box;
    padding-top:92px;
    .index-wrap{
        width:100%;
        height:100%;
        overflow-y:scroll;
        -webkit-overflow-scrolling:touch;
        position:relative;
        overflow-x:hidden;
        background:#eeeeee;
        .pro-show{
          width:100%;
          height:967px;
          background:url(../images/pic1.png) no-repeat;
          background-size:cover;
        }
        .pic2-box{
          width:100%;
          height:1234px;
          background:url(../images/pic2.png) no-repeat;
          background-size: contain;
          position:relative;
           h2{
              text-align:center;
              font-size: 48px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 24px;
              letter-spacing: 0px;
              color: #ae7806;
              padding-top:50px;
           }
           .center-font{
            margin-top:586px;
           }
           .bottom-font{
             margin-top:350px;
           }
        }
        .pic3-box{
          width:100%;
          height:1964px;
          margin-top:-110px;
          background:url(../images/pic3.png) no-repeat;
          background-size: cover;
          .font-top{
            padding-top:70px;
            p{
              text-align:center;
              font-size: 30px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 40px;
              letter-spacing: 2px;
              color: #585858;
            }
          }
          .font-bottom{
              padding-top:800px;
              h2{
                text-align:center;
                font-size: 48px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 24px;
                letter-spacing: 0px;
                color: #ae7806;
                padding:0px 0 35px 0;
              }
              p{
                text-align:center;
                font-size: 30px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 40px;
                letter-spacing: 2px;
                color: #585858;
              }
          }
        }
        .pic4-box{
          height:1918px;
          width:100%;
          background: url(../images/pic4.png) no-repeat;
          background-size: cover;
        }
        .pic4-box{
          .font-top{
            padding-top:80px;
          }
          .font-bottom{
            padding-top:730px;
          }
          h2{
            text-align:center;
            font-size: 48px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 24px;
            letter-spacing: 0px;
            color: #ae7806;
            padding-bottom: 30px;
          }
          p{
            text-align:center;
            font-size: 30px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 40px;
            letter-spacing: 2px;
            color: #585858;
          }
        }
      }
}
</style>

  

