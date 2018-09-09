<template>
   <div :class="`hd  ${cls}`">
       <!-- <p>今日累计</p> -->
       <slot name="type"></slot>
       <p>邀请好友数（人）</p>
       <h3 v-if="cls==='left'"  v-text="data.today_invite_user||0">99</h3>
       <h3 v-if="cls==='right'" v-text="data.total_invite_user||0" >99</h3>
       <div class="middle">
            <p v-if="cls==='left'"><span>已投资</span><br/><span  v-text="data.today_invest_user||0"></span></p>
            <p v-if="cls==='left'"><span>未投资</span><br/><span  v-text="data.today_uninvest_user||0">90人</span></p>
            <p v-if="cls==='right'"><span>已投资</span><br/><span v-text="data.total_invest_user||0"></span></p>
            <p v-if="cls==='right'"><span>未投资</span><br/><span v-text="data.total_uninvest_user||0">90人</span></p>

       </div>
      <div class="bottom">
           <p v-if="cls==='left'"   v-text="data.today_invest_money"></p>
           <p v-if="cls==='right'"  v-text="data.total_invest_money"></p>
           <!-- <p>今日累计邀请投资金额（元）</p> -->
           <slot name="bottom"></slot>
      </div>
   </div>
</template>
<script>
export default {
  props: {
    cls: {
      type: String,
      default: ""
    },
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>
<style lang="stylus">
div.hd {
  width: 326px;
  height: 422px;
  box-sizing: border-box;
  // padding:0 38px;
  padding-top: 30px;
  text-align: center;
  color: white;

  &.left {
    background: url('./hd_left.png') no-repeat 100% / 100%;
  }

  &.right {
    background: url('./hd_right.png') no-repeat 100% / 100%;
  }

  >p {
    &:nth-child(1) {
      font-size: 24px;
    }

    &:nth-child(2) {
      font-size: 20px;
    }
  }

  >div.middle {
    display: flex;
    margin-bottom: 65px;
    line-height: 32px;

    p {
      flex: 1;

      span {
        &:nth-child(1) {
          font-size: 20px;
        }

        &:nth-child(2) {
          font-size: 24px;
        }
      }
    }
  }

  >h3 {
    font-size: 108px;
    // font-weight: 900px;
    line-height: 108px;
  }

  >div.bottom {
    p:first-child {
      font-size: 34px;
      line-height:42px;

    }

    p:last-child {
      font-size: 20px;
      line-height:28px;
    }
  }
}
</style>
