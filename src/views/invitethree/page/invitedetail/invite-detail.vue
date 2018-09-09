<template>
  <div class="detail">
    <div class="wrap">
      <img src="../../images/detail.png">
    </div>
    <div class="app-bg6">
      <div>官方客服热线1010-2015</div>
      <div>本活动最终解释权归鲸鱼所有</div>
      <div>-活动仅限部分地区部分用户参与-</div>
      <div>*投资有风险，理财需谨慎</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detail"
}
</script>

<style lang="stylus" scoped>
.detail
  heigth auto
  .wrap
    width 670px
    height 1331px
    background #ffffff
    margin 30px auto 36px
    border-radius 20px
    overflow hidden
    img 
      width 607px
      display block
      margin 42px auto
  .app-bg6
    height 180px
    margin-bottom 20px
    overflow hidden
    text-align center
    font-size 26px
    div:nth-of-type(1),div:nth-of-type(2)
      color #fff
    div:nth-of-type(2)
      margin-bottom 15px
    div:nth-of-type(3)
      color #001b90
      margin-bottom 20px
    div:nth-of-type(4)
      text-align right
      padding-right 24px
      font-size 20px
      color #122b98
</style>
