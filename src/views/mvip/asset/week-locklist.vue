<template>
  <div id="weeklocklist">
    <div class="description">
      锁定期金额：本金转入后七天内(含当天)为锁定期，7天内本金锁定不可转出，锁定期后每周转出日可免费转出。
    </div>
    <div class="trade">
      <ul v-if="locklist.length">
          <li v-for="(item,index) in locklist" :key="index">
            <div class="money">
              <h3>投资本金</h3>
              <p>{{item.trade_principal}}</p>
            </div>
            <div class="time">{{item.text}}</div>
            <div class="right">
              <h4>转入时间</h4>
              <p>{{item.trade_time}}</p>
            </div>
          </li>
      </ul>
      <!--无记录-->
      <div class="listNull"  v-else>
        <img
          src="../assets/week_null_bg_data64.png"
          alt="暂无交易记录">
        <h4>暂无交易记录</h4>
      </div>
      <!-- <h3
        class="moreList"
      >点击加载更多</h3> -->
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      locklist:[]
    }
  },
  mounted(){
    this.getdata();
  },
  methods:{
    getdata(){
      const params = {
        servicename:'account.moneyWeekLock',
      }
      this.$http(params).then((res)=>{
        this.locklist = res.list;
      }).catch((err)=>{

      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

#weeklocklist
  position: fixed
  z-index: 100
  top: 0
  left: 0
  bottom: 0
  right: 0
  height 100%
  background-color baise
  .description
    padding rem(10) rem(28) rem(30)
    font-size 28px
    line-height 44px
    color #999999
  .moreList
    text-align center
    line-height rem(90)
  ul.tab
    display flex
    justify-content space-around
    align-items center
    height rem(108)
    border-bottom 1px solid #dedede
    text-align center
    background-color baise
    li
      width rem(200)
      height rem(60)
      border-radius (@height/2)
      line-height @height
      font-size rem(28)
      color wordDfColor
    li.active
      background-color #f4f4f4
      color mainColor
  .listNull
    margin-top rem(20)
    padding-top rem(120)
    text-align center
    background-color baise
    img
      width rem(200)
      padding-bottom rem(38)
    h4
      line-height rem(44)
      font-size rem(30)
      color wordSecondColor
    a
      line-height rem(44)
      font-size rem(24)
      color mainColor
  .trade
    overflow scroll
    position fixed
    width 100%
    top 144px
    bottom 0
    h2
      padding 0 rem(38)
      text-align right
      line-height rem(66)
      font-size rem(26)
      color #666666
      span
        color mainColor
    ul
      padding 0 rem(38)
      background-color baise
      li
        display flex
        justify-content space-between
        align-items center
        border-bottom 1px solid #dedede
        height rem(120)
        text-align left
        color wordDfColor
        position relative
        .money
          float left
        h3
          line-height rem(55)
          font-size rem(26)
          color wordDfColor
          position relative
        .time
          position absolute
          top 25px
          left 150px
          border-radius 20px;
          border 1px solid #FBC876
          color #FBC876
          padding 2px 10px
        p
          line-height rem(28)
          font-size rem(24)
          color #2574DE
        .right
          padding-right rem(5)
          text-align right
          p
            color #a7a7a7
          h4
            line-height rem(55)
            font-size rem(24)
          h5
            line-height rem(36)
            font-size rem(30)
        h1
          padding-right rem(5)
          font-size rem(32)

</style>


