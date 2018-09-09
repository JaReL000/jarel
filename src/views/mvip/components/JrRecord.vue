<template>
  <transition name="slide" >
  <div class="jrRecord fixed-x" v-if="show">
      <!-- <ul class="tab">
        <li @click="switchOver(1)" :class="[moveType.toString() === '1' ? 'active' : '']">
          <span v-text="tabtitle[0]"></span>
        </li>
        <li @click="switchOver(0)" :class="[moveType.toString() === '0' ? 'active' : '']">
          <span v-text="tabtitle[1]"></span>
        </li>
      </ul> -->
      <div 
      
      ></div>
    <!--交易 & 收益-->
    <!-- 转入记录 -->
    <div class="trade" v-show="moveType.toString() === '1'">
      
      <ul  v-if="detalList.in.list.length" class="fixed-x">
        <template v-for="(item,index) in detalList.in.list">
          <li
            v-for="(item,index) in item.list"
            :key="index"
            >
            <div>
              <h3 v-text="item.title"></h3>
              <p v-text="item.c_time"></p>
            </div>
            <div class="right">
              <div class="right-top">
                <span>{{item.coupon_info}}</span>
                <h4
                  v-text="item.trade_money"
                  :class="{'active': parseInt(item.trade_money)>0}"
                ></h4>
              </div>
              <p v-text="item.order_status"></p>
             
              <!-- <h4
                v-text="item.trade_money"
                :class="{'active': parseInt(item.trade_money)>0}"
              ></h4>
              <p v-text="item.order_status"></p> -->
            </div>
          </li>
        </template>
      </ul>
      <!--无记录-->
      <div class="listNull"  v-if="!detalList.in.list.length">
        <img
          src="../assets/week_null_bg_data64.png"
          alt="暂无交易记录">
        <h4>暂无交易记录</h4>
      </div>
      <h3
        class="moreList"
        v-if="detalList.in.ifMore && detalList.in.list.length!==0 && !responseing"
        @click="transactRecord"
      >点击加载更多</h3>
    </div>

    <!-- 转出记录 -->
    <div class="trade" v-show="moveType.toString() === '0'">
      
      <ul v-if="detalList.out.list.length" >
        <template v-for="(item,index) in detalList.out.list">
          <li
            v-for="(item,index) in item.list"
            :key="index"
            >
            <div>
              <h3 v-text="item.title"></h3>
              <p v-text="item.c_time"></p>
            </div>
            <div class="right">
              <div class="right-top">
                <span>{{item.coupon_info}}</span>
                <h4
                  v-text="item.trade_money"
                  :class="{'active': parseInt(item.trade_money)>0}"
                ></h4>
              </div>
              <p v-text="item.order_status"></p>
              
            </div>
          </li>
        </template>
      </ul>
      <!--无记录-->
      <div class="listNull"  v-if="!detalList.out.list.length ">
        <img
          src="../assets/week_null_bg_data64.png"
          alt="暂无交易记录">
        <h4>暂无交易记录</h4>
      </div>
      <h3
        class="moreList fixed-x"
        v-if="detalList.out.ifMore && detalList.out.list.length!==0 && !responseing"
        @click="transactRecord"
      >点击加载更多</h3>
    </div>
  </div>
  </transition>
</template>

<script>

  export default {
    name: 'tradeRecord',
    components: {},
    props: {
      userName: {
        type: String,
        default: '你好, 请登陆',
      },
    },
    data() {
      return {
        show: false,
        // 是否在请求中，用以控制加载更多按钮是否显示
        responseing: false,
        tabtitle:[
          "转入记录",
          "转出记录"
        ],
        // 表示要展示的数据是转入，还是转出，此参数主要由上层路由传进来。
        moveType: this.$route.query.movetype === undefined ? 1 : this.$route.query.movetype,
        pageName: this.$route.query.title,
        goods_type: this.$route.query.goods_type,
        good_kind: this.$route.query.good_kind,
        // 产品ID，用于接口传参
        productid:this.$route.query.productid,
        detalList: {
          in: {
            list: [],
            ifMore: false,
            index: 1
          },
          out: {
            list: [],
            ifMore: false,
            index: 1
          }
        }
      }
    },
    computed: {
      money_type(){
        if(this.productid == 0){
          return 0;
        }else{
          return this.productid == -1 ? 11 : 12
        }
      },
      order_type () {
        return this.moveType.toString() === '1' ? '1' : '2'
      },
      _move_type () {
        return this.moveType.toString() === '1' ? 'in' : 'out'
      }
    },
    watch: {},
    created() {
      this.transactRecord()
    },
    mounted() {},
    methods: {
      switchOver (type) {
        if (type === this.moveType) return
        this.moveType = type
        if (!this.detalList[this._move_type].list.length) {
          this.transactRecord()
        }
      },
      transactRecord(){
        this.responseing = true
        const move_type = this._move_type
        const params = {
          servicename:'order.orderList',
          // order_type: this.order_type,
          // order_type: 2,
          page: this.detalList[move_type].index,
          money_type: this.money_type || '',
          productid: this.productid || '',
          page_size: 10
        }
        this.$http(params).then((response) => {
          this.responseing = false
          if(response.list.length===0){
            this.detalList[move_type].ifMore = false
          } else {
            this.detalList[move_type].ifMore = true
          }

          if(this.detalList[move_type].index === 1){
            this.detalList[move_type].list = response.list
          } else {
            this.$nextTick(()=>{
              response.list.forEach((value, index) => {
                this.detalList[move_type].list.push(value)
              })
            })
          }
          this.detalList[move_type].index += 1
          this.show = true
        }).catch(err => {
          console.log(err)
          // this.$flash(err)
          this.show = true
        })
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.jrRecord
  position: fixed
  z-index: 100
  top: 0
  left: 0
  bottom: 0
  right: 0
  height 100%
  background-color baise
  overflow scroll 
  -webkit-overflow-scrolling touch
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
    top rem(20)
    bottom 0
    padding-bottom 60px
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
        height rem(123)
        text-align left
        color wordDfColor
        .right
          padding-right rem(5)
          text-align right
          .right-top
            span 
              display inline-block
              font-size 26px
              color #999
            h4
              display inline-block
              line-height rem(55)
              font-size rem(24)
              color #53B864
              &.active
                color #EE5F50
            
          h5
            line-height rem(36)
            font-size rem(30)
        h3
          line-height rem(55)
          font-size rem(26)
          color wordDfColor
        p
          line-height rem(28)
          font-size rem(24)
          color #a7a7a7
        h1
          padding-right rem(5)
          font-size rem(32)
</style>
