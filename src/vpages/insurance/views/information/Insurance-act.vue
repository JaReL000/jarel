<template>
   <div class="Insurance-act">
      <ul>
        <li><a href="/insurance/insurance/personalAccident.html">个人意外伤害保险条例（2016版）</a> </li>
        <li><a href="/insurance/insurance/medical.html">附加住院医疗费用补偿保险条款（2016版）</a></li>
        <li><router-link to="agreement?index=1">重要告知与申明（2016版）</router-link> </li>
      </ul>
   </div>
</template>
style.<style lang="scss">
.Insurance-act{
  background:#f5f5f5;
  padding:20px 30px;
  >ul{
    li{
      height:104px;
      background:#fff;
      line-height:104px;
      font-size:30px;
      margin-top:20px;
      padding-left:10px;
      color:#333333;
      &:first-child{
        margin:0;
      }
      >a{
        color:#333333;
      }
    }

  }
}
</style>

