<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.transfer-out 
  padding 0  32px
  overflow scroll
  -webkit-overflow-scrolling touch
  ul 
    padding-bottom 100px
    li  
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
      h3 
        font-size 30px
        line-height 70px
      p 
        font-size 26px
        line-height 40px
        color #999

</style>
<template>
  <!-- <scroll ref="explain" class="transfer-out fixed "> -->
  <div class="transfer-out fixed ">
    <ul>
				<li>
					<h3>1.什么是转让金额、降价金额？</h3>
					<p><label>转让金额：</label>购买该笔转让需要支付的金额。</p>
					<p><label>降价金额：</label>购买该笔转让可以获得的价格优惠。</p>
				</li>
				<li>
					<h3>2.什么是债权转让？</h3>
					<p>转让就是把自己的东西或合法利益或权利让给他人。在鲸鱼平台转让中，即代表将个人所持有的单笔可转让订单按照一定的折价转手给其他人。</p>
				</li>
				<li>
					<h3>3.什么时候可以转让?</h3>
					<p>需持有日增息/保险箱产品超过60天，即第61天起，且剩余期限大于60天，在此投资时间区间内可申请转让。</p>
				</li>
				<li>
					<h3>4.是否支持部分转让？</h3>
					<p>不支持，目前仅支持单笔日增息/保险箱资产全额转让。</p>
				</li>
				<li>
					<h3>5.可转让金额区间是什么?</h3>
					<p>可转让金额是设置转让金额时不得低于 原日增息/保险箱本金的90%，不得高于转让时的日增息/保险箱本息和，即在出让过程中会有折让金额。</p>
				</li>
				<li>
					<h3>6.什么是降价金额？</h3>
					<p>降价金额是转让人根据自身意愿给予购买转让方的一种价格优惠。</p>
				</li>
				<li>
					<h3>7.申请转让时效?</h3>
					<p>转让有效时限为3个自然日（不包含转让当日），期间可手动撤销转让，每个用户每天最多可撤销转让3次，若转让期间未转让成功，系统将自动撤销转让，需要重新申请转让；转让进入审核，不可撤销转让。</p>
				</li>
				<li>
					<h3>8.是否随时可以购买转让?</h3>
					<p>23:30-次日05:00为系统核查时间，该时段内不允许购买转让。</p>
				</li>
				<li>
					<h3>9.是否收手续费?</h3>
					<p>只有在转让成功后才会收取转让人手续费，手续费为转让金额的0.2%，扣除后默认入账至余额账户中。</p>
				</li>
			</ul>
    </div>
  <!-- </scroll> -->
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
