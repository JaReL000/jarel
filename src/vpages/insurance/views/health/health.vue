<template>
<div class="health" @scroll="scro">
  <hd :title="{name:'被保人健康告知'}"></hd>
  <div class="health-content-text">
    <p>被保险人是否存在以下状况：</p>
    <p>1.被保险人现时是否正进行任何健康咨询、药物治疗、外科手术，但不包括普通感冒、流感或敏感症；或考虑在短期内寻求诊疗、检查、测试、住院治疗或外科手术？</p>
    <p>2.被保险人最近5年中，在申请如人寿保险、意外伤害保险，重大疾病保险、其它医疗健康保险等任何保险计划时，是否曾被延迟、被拒保、被撤销或被附加任何特别条件（如增加保险费或特别免责条款）？</p>
    <p>3.被保险人是否曾经或正患有如下任一疾病、出现如下任一体征或检查异常、或接受如下任一治疗（相关定义以世界卫生组织颁布的）？ 冠心病、心绞痛、心肌梗塞、心脏瓣膜疾病、各种原因导致的心脏衰竭、先天性心脏缺陷、冠状动脉介入手术或搭桥手术、动脉瘤或血管畸形、血友病、血液凝固障碍、脑卒中； 痴呆、癫痫、多发性硬化、帕金森病、阿尔茨海默病或任何影响脑部或神经系统的失常； 肝脏疾病或症状（如肝炎病毒携带者、肝硬化、肝功能衰竭等）、胃旁路手术、溃疡性结肠炎、胰腺炎； 代谢综合症、各种类型糖尿病、高血压、肾上腺皮质功能不全、肢端肥大症； 恶性肿瘤、白血病、淋巴瘤、良性肿瘤且未手术、不明性质的肿块/息肉/结节/新生物； 精神病、各种类型的抑郁症、自闭症、厌食症或暴食症、试图自杀； 耳疾（如耳聋等）、眼疾（如青光眼、白内障、视网膜出血或剥离等）、鼻部疾病或咽喉疾病（不包括普通感染）； 肢体瘫痪（包括截瘫、偏瘫或全瘫）、类风湿性关节炎、强直性脊柱炎、肌营养不良、股骨头坏死、人工关节置换等其他与骨骼、脊椎骨或肌肉相关的疾病或症状； 肾小球（肾盂）疾病、肾病综合症、慢性肾功能衰竭、肾透析、多囊肾； 肺气肿、慢性阻塞性肺病、肺纤维化、间质性肺病、哮喘； 各种器官移植，如心、肺、肝、肾、胰脏、造血干细胞移植等；</p>
    <p>4.被保险人最近2年中，是否做过以下任意一项检查，且任意一项检查结果有异常： X光、B超、彩超、CT、核磁共振、内窥镜、病理活检、眼底检查、血液检查；</p>
    <p>5.被保险人最近1年中，是否有因病连续住院5天及以上，或病假累计15天及以上？</p>
    <p>6.被保险人最近1年，是否有任何不适症状，如持续发热、眩晕、胸痛、咳血、便血、紫斑、体重下降或上升超过5公斤？</p>
    <p>7.被保险人是否有：艾滋病毒感染史、酗酒史、滥用药物史（酗酒是指每周饮酒单位大于等于50，每一个饮酒单位含12g酒精，相当于1杯（300ml）啤酒或者半杯（150ml）葡萄酒或者45ml白酒）？</p>
    <p>8.2周岁以下被保险人是否存在以下情况：出生时体重低于2.5公斤，早产、窒息、发育迟缓、脑瘫？</p>
  <div class="select">
    <div @click="state=1" :class="{'active':state===1}">部分是</div>
    <div @click="state=2" :class="{'active':state===2}">以上全否</div>
  </div>
  </div>
  <div class="health-bottom">
    <h4>郑重声明：</h4>
    <p>本投保人声明上述内容填写属实，如有隐瞒或告知不实，保险公司有权解除保险合同，对于合同解除前发生的任何事故，保险公司可不承保任何责任。</p>
    <div class="btn">
      <button @click="next">下一步</button>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      state: 0 // 健康状态评估结果 ：0 为选择状态，1不符合要求，2符合要求
    };
  },
  mounted() {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
    // window.scrollTo(0,0)
  },
  methods: {
    scro(e) {
      console.log(e);
    },
    next() {
      let scroll = window.scrollY;
      if (scroll < 100) {
        // scroll += 600;
        window.scrollTo(0, 1300);
        // console.log('---',window.scrollY)
        // console.log('进来了')
      } else {
        if (this.state === 0) {
          this.$flash("请选择你的状态");
        } else if (this.state === 1) {
          this.$messagebox({
            title:'提示',
            message: "<p>您的状态无法投保，</p><p>可联系客服在线咨询</p>",
            showCancelButton: true
          });
        }else if(this.state === 2){ // 符合要求跳转到填写保单页面
           this.$router.push('/insuranceList')
        }else{
          this.$flash('请重新选择')
        }
      }

      console.log(window.scrollY);
    }
  }
};
</script>

<style lang="stylus">
.health {
  color: #666666;
  font-size: 30px;

  .health-content-text {
    padding: 30px;

    >p {
      margin-bottom: 52px;
      line-height: 42px;
    }

    .select {
      display: flex;
      justify-content: space-between;
      color: #333;

      >div {
        flex: 1;
        height: 96px;
        text-align: center;
        margin-right: 53px;
        border: 1px solid #b5b5b5;
        border-radius: 10px;
        line-height: 96px;

        &.active {
          background: #0c72e3;
          color: white;
          border: none;
        }

        &:last-child {
          margin: 0;
        }
      }
    }
  }

  .health-bottom {
    text-align: center;
    padding-bottom: 150px;

    h4 {
      background: #f5f5f5;
      line-height: 108px;
      color: #333333;
      padding: 0 30px;
      text-align: left;
    }

    >p {
      padding: 30px;
      text-align: left;
    }

    >.btn {
      padding: 10px 0;
      position: fixed;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 0);
      width: 100%;
      background: #fff;

      >button {
        background: #0c72e3;
        color: white;
        border: none;
        outline: none;
        width: 687px;
        height: 95px;
        font-size: 30px;
        border-radius: 10px;
        margin-bottom: 62px;
      }
    }
  }
}


</style>

