<template>
<div class="asset x-header-top">
  <!-- banner -->
  <div class="banner">
    <div class="top">
      <h5>订单金额(元)</h5>
      <h2 v-text="freeze_money">0.00</h2>
    </div>
    <div class="bot">
      <div class="bot_child">
        <h5>累计收益(元)</h5>
        <h6 v-text="receivedMoney">0.00</h6>
      </div>
      <div class="bot_child">
        <h5>冻结金额(元)</h5>
        <h6 v-text="freeze_money">0.00</h6>
      </div>
    </div>
  </div>

  <!-- tab -->
  <div class="tab">
    <div 
      class="tab_item"
      v-for="(item, index) in tabList"
      :key="index"
      @click="chageTabFun(index, item.type)"
    >
      <h3 
        v-text="item.name" 
        :class="{active: item.active}"
      ></h3>
    </div>
  </div>

  <!-- 卡片 -->
  <div
    class="cardList minirefresh-wrap" 
    v-for="(items) in tabList"
    :key="items.name"
    v-show="items.active"
    :id="items.refs"
  >
    <div class="minirefresh-scroll"> 
      <ul v-show="items.list.length">
        <li
          v-for="(item, index) in items.list"
          :key="index"
          @click="routerPush('/asset/detail', {pinvestid: item.pinvestid, userid: item.userid})"
        >
          <h3 v-text="item.project_name">鲸鱼贷B-1820202020202</h3>
          <div class="mind">
            <h4 v-text="item.invest_money">3,500.00</h4>
            <h5 v-text="item.project_period + '个月'">一个月</h5>
            <h6 v-text="item.prospective_yield">100</h6>
          </div>
          <div class="cardList_bot">
            <div class="cardList_bot_l">投资金额(元)</div>
            <div class="cardList_bot_r">预期收益(元)</div>
          </div>
          <div class="cardList_sub">
            <div class="cardList_sub_l">预期年化收益率 <span class="span_color" v-text="item.leftRateInit+'+'+item.rightRateInit">9.5%+0.5%</span></div>
            <div class="cardList_sub_r">下一次还款时间 <span v-text="item.need_time">2018-03-19</span></div>
          </div>
        </li>
      </ul>
    </div>
    <div  class="null" v-show="!items.requesting && !items.list.length">
      <img src="../../images/jyd_null.png" alt="暂无记录">
      <p>您还没有购买记录哦~</p>
    </div>
  </div>
  
</div>
</template>

<script>

export default {
  // name: 'index',
  components: {},
  data() {
    return {
      totalMoney: '0.00',
      freeze_money: '0.00',
      receivedMoney: '0.00',
      // [4 - 投标中 ， 5 - 持有中 ，8 - 已结清 ]
      tabList: [
        {name: '持有中', active:false, type: '4', requesting: true, list: [], refs:"cyz", refreshUp: '', page: 1},
        {name: '投标中', active:false, type: '5', requesting: true, list: [], refs:"tbz", refreshUp: null, page: 1},
        {name: '已结清', active:false, type: '8', requesting: true, list: [], refs:"yjq", refreshUp: null, page: 1},
      ],
      requesting: true
    }
  },
  computed: {},
  watch: {},
  created() {
    this.initAssetFun()
    
  },
  mounted() {
    this.chageTabFun(0, '4')
  },
  methods: {
    initFun(index=0, type=4){
      if(this.requesting){
        this.requesting = false
        this.$http("/jyd/accountUserInvestList", {
          type,
          page: this.tabList[index].page,
        }).then((res) => {
          this.tabList[index].list = this.tabList[index].list.concat(res.data.list);
          this.tabList[index].refreshUp.endUpLoading((res.data.total <= this.tabList[index].list.length));
          console.log(res);

          this.tabList[index].requesting = false
          this.requesting = true
          this.tabList[index].page++
          
        }).catch(error => {
          console.log(error);
          this.requesting = true
        });
      }
      
    },
    initAssetFun(){
      this.$http("/jyd/accountGetUserMoneyInfo", {
        // userid
      }).then((res) => {
        console.log(res);
        this.freeze_money = res.data.freeze_money
        this.receivedMoney = res.data.receivedMoney
        this.totalMoney = res.data.totalMoney

      }).catch(error => {
        console.log(error);
      });
    },
    chageTabFun(index, type){
  
      let length = this.tabList.length
      for (let i = 0; i < length; i++) {
        this.tabList[i].active = false
      }
      if(this.tabList[index].active == false){
        this.tabList[index].active = true
      }
      if(this.tabList[index].requesting){
        console.log(index, type);
        // this.initFun(index, type)
        // this.tabList[index].refreshUp = this.RefreshUp(
        //   `#${this.tabList[index].refs}`, 
        //   this.initFun
        // )
        let _this = this
        _this.tabList[index].refreshUp = new MiniRefresh({
            container: `#${_this.tabList[index].refs}`,
            
            // container: `#cyz`,
            down: {
              callback() {
                // 下拉事件
                // 注意，由于默认情况是开启满屏自动加载的，所以请求失败时，请务必endUpLoading(true)，防止无限请求
                _this.tabList[index].refreshUp.endDownLoading(true);
              },
              isLock: true // 锁定下拉刷新
            },
            up: {
              callback() {
                // 上拉事件
                // 注意，由于默认情况是开启满屏自动加载的，所以请求失败时，请务必endUpLoading(true)，防止无限请求
                // _this.tabList[index].refreshUp.endUpLoading(true);
                console.log('上拉事件sdsdsdsd');
                
                _this.initFun(index, type)
              },
            }
          });
      }
      
    }
  },
}
</script>


<style lang="stylus">
.asset  
  .banner
    // height 440px
    background url('../../images/jyd_bg.png') no-repeat left top
    background-size 100%  100%
    font-size 0
    text-align center
    color #fff
    .top 
      padding-top 75px
      margin-bottom 100px
      h5 
        line-height 66px
        font-size 28px
      h2 
        line-height 92px
        font-size 70px
    .bot 
      overflow hidden
      padding-bottom 22px
      font-size 28px
      .bot_child
        float left
        width 50%
        h5
          line-height 43px
        h6 
          line-height 42px
  .tab
    overflow hidden
    margin-bottom 20px
    text-align center
    background-color #fff
    color #333
    .tab_item
      float left
      width 33.33%
      // height 98px
      line-height 98px
    h3
      margin 0 48px
      font-size 30px
      border-top 5px solid #fff
      border-bottom 5px solid #fff
      &.active
        border-bottom 5px solid #0c72e3
        color #0c72e3
  .cardList
    position relative
    .minirefresh-scroll
      background-color #f5f5f5
      height 660px
    ul
      li
        position relative 
        margin-bottom 20px
        background-color #fff
        h3 
          margin 0 30px 
          line-height 92px
          font-size 30px
          color #333
        .mind
          overflow hidden
          height 54px
          margin 0 30px 
          line-height 54px
          font-size 36px
          h4
            float left  
            width 33.33%
            text-align left 
            color #ff744e 
          h5
            float left 
            width 33.33%
            text-align center 
            color #333
          h6
            float left 
            width 33.33%
            text-align right 
            color #ff744e 
        .cardList_bot
          position relative
          height 38px
          padding 0 30px 20px
          color #bcbcbc
          &:before
            content ''
            position absolute
            height 1px
            width 100%
            bottom 0
            right 0
            background-color: #e5e5e5
            transform:scaleY(0.5)
            -webkit-transform:scaleY(0.5);
          .cardList_bot_l
            float left
            text-align left 
          .cardList_bot_r
            float right
            text-align right  
        .cardList_sub
          height 44px
          margin 0 30px 
          padding-bottom 20px
          line-height @height
          font-size 22px
          color #a5a5a5
          .cardList_sub_l
            float left
          .cardList_sub_r
            float right
          .span_color
            color #ff744e 
  .null
    text-align center
    img 
      padding-top 120px
      width 250px
    p 
      font-size 28px
      line-height 40px
      color rgb(129, 129, 129)


</style>

