<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.balance-explain
  height 100%
  background-color baise
  ul
    margin-left rem(30)
    li
      h2
        padding-left rem(48)
        margin-top rem(38)
        line-height rem(60)
        font-size rem(28)
        background url("../assets/balabce_explain_icon_data64.png") no-repeat left  center \/rem(29) rem(29)
        color wordDfColor
      p
        margin-left rem(48)
        padding-left rem(3)
        padding-bottom rem(30)
        border-bottom 1px solid #e9e9e9
        line-height rem(38)
        font-size rem(26)
        color #666666
</style>
<template>
  <transition name="fate" >
    <div class="balance-explain">
      <ul>
        <li v-for="(item, index) in dataLists" :key="index">
          <h2 v-text="item.h2Word"></h2>
          <p v-html="item.pWord"></p>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'balance-explain',
    components: {},
    data() {
      return {
        dataLists:[
          {h2Word: '1. 什么是余额？', pWord: '余额是鲸鱼为投资人提升产品体验专门开设的一个资金归集账户，支持充值、提现、购买鲸鱼产品，也可申请提现至银行卡。'},
          {h2Word: '2. 账户余额的资金产生收益吗？', pWord: '余额仅做为资金归集账户，不产生收益，您可以选择用余额账户资金投资鲸鱼产品以产生收益。'},
          {h2Word: '账户余额有什么功能？', pWord: '定期类理财产品到期后本金及其收益也将自动转入余额，且转让成功后，转让金额也将自动转入余额。'},
          {h2Word: '余额提现说明', pWord: '每日可提现3次；<br/>提现免手续费；<br/>预计下一个工作日到账，实际到账时间以银行打款为准'},
        ]
      }
    },
    computed: {

    },
    watch: {},
    created() {},
    mounted() {},
    methods: {},
  }
</script>
