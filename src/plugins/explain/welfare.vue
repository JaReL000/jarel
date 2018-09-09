<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.transfer-out 
  padding 0  32px 44px
  .hb-rules 
    padding-bottom 250px
    ol  
      position relative
      padding 20px 0px 22px
      &:after 
        content ''
        position absolute
        bottom 0 
        left 0
        width 100%
        border-bottom 1px solid  #ececec
        transform scaleY(0.5)
      div.tiao 
        font-size 30px
        line-height 70px
      p 
        font-size 26px
        line-height 40px
        color #999
        label 
          display block
  .r-notice
    line-height 100px
    font-size 26px
    color red

</style>
<template>
  <scroll ref="explain" class="transfer-out fixed fixed-x">
    <div class="hb-rules">
      <ol>
          <div class="tiao">什么是理财红包</div>
          <p>理财红包是鲸鱼提供给您的投资本金，到期后系统将自动收回所投资的红包，收益可提现。</p>
      </ol>
      <ol>
          <div class="tiao">什么是现金红包</div>
          <p>获得后直接发放至余额账户中，可投资或提现。</p>
      </ol>
      <!--<ol>-->
          <!--<div class="tiao">什么是火箭券</div>-->
          <!--<p>火箭券是鲸鱼平台为用户打造的一种特权， 使用火箭券可在锁定期后不限日期随时转出。（用户每个自然月首次转入资产到周周盈时，系统赠送2张火箭券使用有效期为30天内）</p>-->
      <!--</ol>-->
      <ol>
          <div class="tiao">什么是抵扣券</div>
          <p>满足一定的投资条件即可使用。<br>如：一张100元抵扣券的使用条件是投资定期满1000元可使用。则购买时，只需支付900元。到期后，可提现1000元+1000元所产生的收益。</p>
      </ol>
      <ol>
          <div class="tiao">什么是加息券</div>
          <p>针对卡券中标明的产品进行加息，使用后，将在原有产品收益率的基础上进行加息，产生的额外收益，于对应产品付息日返还到用户账户中。<br>注：同一时间段内，只能使用一张活期加息券。</p>
      </ol>
      <ol>
          <div class="tiao">什么是免手续费券</div>
          <p>免手续费券包含固定金额减免和按比例减免两种，转让时使用可免付相应转让手续费</p>
      </ol>
      <ol>
          <div class="tiao">如何获得福利</div>
          <p>鲸鱼会不定期举行活动赠送卡券奖励，满足活动要求即可获得，请您密切关注鲸鱼的各类活动。</p>
      </ol>
      <ol>
          <div class="tiao">卡券的使用规则</div>
          <p>
              <label><span class="left">1)</span> <span class="right">无使用条件的卡券可直接使用，有使用条件的卡券应在标明的使用条件范围内使用；</span></label>
              <label><span class="left">2)</span> <span class="right">卡券应在标明的有效期内使用，过期将自动作废；</span></label>
              <label><span class="left">3)</span> <span class="right">卡券不可用于兑换现金、不可相互转让；</span></label>
              <label><span class="left">4)</span> <span class="right">单笔投资只能使用1张卡券，且不可与其它类型卡券同时使用，活动奖励自动使用的卡券除外；</span></label>
              <label><span class="left">5)</span> <span class="right">若使用的银行卡单笔投资上限额度未达到卡券最低使用条件时，将不能使用卡券，建议您更换其它支付方式；</span></label>
          </p>
      </ol>
      <p class="r-notice">注： 以上2种券不可同时使用</p>
    </div>
  </scroll>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        // thead: ['转出类型', '转出时间', '到账时间'],
        // tbody: [
        //   {td1: '转出余额', td2: '15:00前', td3: '实时到账'},
        //   {td1: '转出余额', td2: '15:00后', td3: '第二个工作日到账'},
        //   {td1: '转出到银行卡', td2: '当日', td3: '第二个工作日到账'},
        // ],
        thead: ['单笔', '单日', '累计'],
        tbody: [
          {td1: '5万', td2: '10万', td3: '20万/人'},
        ],
        list: [
          {text: '转出资金会在转出当日24：00前到账至余额账户。'},
          {text: '转出资金不享受当日收益。'},
          {text: '每天凌晨0点~4点系统正在进行每日计息，计息期间为保障平台稳定运行，将暂时关闭提现操作。', ge: true},
        ]
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {},
  }
</script>
