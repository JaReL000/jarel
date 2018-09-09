<template>
  <div class=" week-cell">
    <div class="week-list" v-if="parseFloat(lockList.list.length)!==0" >
      <div 
        class="list-cell" 
        v-for="(item, index) in lockList.list"
        :key="index"
        >
        <div class="list-cell-top">
          <h6><span v-text="item.order_no"></span></h6>
          <i v-text="item.end_word"></i>
        </div>
        <div class="list-cell-main">
          <div>
            <p>投资本金(元)</p>
            <h5 v-text="item.trade_principal">3.825%</h5>
          </div>
          <div>
            <p>已得收益(元)</p>
            <h5 v-text="item.yield_money">18.1</h5>
          </div>
        </div>
      </div>
       <h3
        class="moreList"
        v-if="((parseFloat(lockList.count)>lockList.list.length) && !responseing)"
        @click="moreLockListFun"
      >点击加载更多</h3>
    </div>
    <div class="listNull"  v-if="parseFloat(lockList.list.length)===0">
      <img
        src="../assets/week_null_bg_data64.png"
        alt="暂无交易记录">
      <h4>您还没有记录哦~</h4>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'week-list',
    components: {},
    props: {
      showDetail: {
        type: Boolean,
        default: false
      },
      lockList: {
        type: Object,
        default: function () {
          return {}
        }
      },
      showList: Boolean,
      responseing: Boolean,
    },
    data() {
      return {
        number: '20160119T223',
        restDay: '剩余锁定5天'
      }
    },
    computed: {},
    watch: {},
    created() {
      
    },
    mounted() {},
    methods: {
      moreLockListFun(){
        this.$emit('moreLockListFun', this.responseing)
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.week-cell 
  top 580px
  overflow scroll
  .listNull
    padding-top rem(20)
    text-align center
    background-color baise
    img
      width rem(200)
    h4
      line-height rem(44)
      font-size rem(30)
      color wordSecondColor
.week-list
  // padding-bottom rem(90)
  .moreList
    line-height rem(90)
  .list-cell
    padding 0 rem(30)
    margin-bottom rem(20)
    background-color baise
    .list-cell-top
      display flex
      justify-content space-between
      align-items center
      border-bottom 1px solid #e8e8e8
      line-height rem(75)
      font-size rem(26)
      h6
        span
          padding-left rem(6)
          font-size rem(28)
      i
        display block
        padding 0 rem(20)
        border 1px solid #fc971f
        height rem(28)
        line-height rem(28)
        border-radius (@height/2)
        font-size rem(20)
        color #fc971f
    .list-cell-main
      display flex
      overflow hidden
      position relative
      margin-bottom rem(20)
      padding rem(34) 0
      background-color baise
      &:before
        content ''
        position absolute
        top 0%
        left 50%
        width rem(3)
        height rem(75)
        transform translate3d(-50%, 60%, 0)
        background-color #e3e3e3
      &>div
        width 50%
        p
          line-height rem(42)
          font-size rem(28)
          color huise9
        h5
          line-height rem(52)
          font-size rem(44)
          color mainColor
  
</style>

