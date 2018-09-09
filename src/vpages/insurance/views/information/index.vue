<template>
  <div class="information">
     <hd :title="{name:'投保须知'}" :fixed="true"></hd>
     <Slide :Active="$route.query.index">
          <li class="page">
               <product-introduction></product-introduction>
           </li>
           <li class="page">
               <Insurance-act></Insurance-act>
           </li>
           <li class="page">
             <Claims-process></Claims-process>
          </li>
          <li class="page">
            <CommonProblems></CommonProblems>
          </li>
     </Slide>
     <div class="information-bottom fixed-x"></div>
  </div>
</template>
<script>
import slide from "./slide";
import productIntroduction from './product-introduction';
import InsuranceAct from './Insurance-act';
import ClaimsProcess from './Claims-process';
import CommonProblems from './Common-problems'
export default {
  components: {
    slide,
    productIntroduction,
    InsuranceAct,
    ClaimsProcess,
    CommonProblems
  }
};
</script>
style.<style lang="scss">
.information {
  background:#f5f5f5;
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
    .information-bottom{
      background: #fff;
      position: fixed;
      bottom:0;
      left:0;
      width:100%;
      height:90px;

    }
    .slide{
      padding-bottom: 104px;
    }

  }
}
</style>


