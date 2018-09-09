<template>
  <transition name="slide" >
    <div class="my-asset-record fixed fixed-x">
      <Loading v-show="!show" ></Loading>
      <div class="record-cell fixed fixed-x"  v-show="show">
        <div class="listNull" v-if="lists[0].list.length===0">
          <img
            src="../assets/week_null_bg_data64.png"
            alt="暂无交易记录">
          <h4>暂无交易记录</h4>
        </div>
        <!---->
        <!-- <h5>2016年1月</h5> -->
        <ul v-if="lists[0].list.length!==0">
          <template v-for="(item, index) in lists">
            <li v-for="(item, index) in item.list" :key="index">
              <div>
                <h2 v-text="item.title"></h2>
                <p v-text="item.c_time"></p>
              </div>
              <div class="right">
                <div class="right-top">
                  <span>{{item.coupon_info}}</span>
                  <h4
                    v-text="item.trade_money + '元'"
                    :class="{in: item.order_type===1, out: item.order_type===2, def: item.order_type===3}"
                  ></h4>
                </div>
                
                <h3 v-text="item.order_status"></h3>
              </div>
            </li>
          </template>
          <h3
            class="moreListFun fixed-x"
            v-if="show&&responseing"
            @click="initFun"
          >点击加载更多</h3>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>

  export default {
    name: 'myAssetRecord',
    components: {},
    data() {
      return {
        show: false,
        listIndex: 2,
        responseing: true,
        indexPage: 1,
        data: {
          isLogin: 1,
          tradeList: [{
            "money": "", // +200.00元
            "type": "转入", // 转入
            "time": "", // 2017-07-24
            "exType": "", //余额-转让
            "status": "" //购买成功
          }],
          
          asset: "1071537.54",
          yesterday_total: "90.61",
          income_total: "2255.84",
          
        },
        total: 0,
        lists: [{
          c_group_time: '',
          count: 0,
          list: [],
        }]
      }
    },
    computed: {

    },
    watch: {},
    created() {
      this.initFun()
    },
    mounted() {},
    methods: {

      initFun(){
        this.$http({
          servicename: 'order.orderList',
          money_type: this.$route.query.money_type || '',  //11余额 12产品  0或空 表示全部
          order_type: this.$route.query.order_type || '', // 1转入  2转出（包括到期转出）3转让 0或空表示全部
          productid: this.$route.query.productid || '', //产品传产品id  其他传空或0
          page: this.indexPage,
          // page_size: 10, //默认15
        }).then((response)=>{
          // this.data = response
          // this.show = true
          console.log(response);
          if(response.list.length==0){
            this.responseing = !response.list
            this.show = true 
            return
          }
          // this.$nextTick(()=>{
          //   // 请求长度是否等于数组条数
          //   // this.responseing = !(this.total === this.lists[0].list.length) 
            

          // }) 
          
          this.total = response.order_count
          if(this.indexPage>1 && (response.order_count > this.lists[0].list.length)){
            this.lists[0].list = this.lists[0].list.concat(response.list[0].list)
          }else{
            this.lists = response.list
            this.show = true 
          }
          this.indexPage++   
          
          
        }).catch((error)=>{
          console.log("失败了:"+error)
        });
      },
    },
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.my-asset-record
  background-color baise
  color wordDfColor
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
  .record-cell
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    height 100%
    background-color baise
    color wordDfColor
    // overflow scroll
    .moreListFun
      text-align center
      line-height rem(120)
      font-size rem(24)
      color #999
    h5
      padding-left rem(44)
      height rem(58)
      line-height @height
      font-size rem(30)
      border-bottom 1px solid #e2e2e2
      background-color #f1f1f1
      color #9d9d9d
    ul
      overflow scroll
      -webkit-overflow-scrolling touch
      position fixed
      width 100%
      // top rem(58)
      top 0
      bottom 0
      background-color #f5f5f5
      &>li:last-of-type
        border none
      li
        display flex
        justify-content space-between
        align-items center
        height rem(123)
        padding-left rem(30)
        padding-right rem(30)
        border-bottom 1px solid #dedede
        background #fff
        h2
          height rem(56)
          line-height @height
          font-size rem(30)
          text-align left
        p
          line-height rem(38)
          font-size rem(24)
          text-align left
          color huise9
        .right
          text-align right
          line-height rem(44)
          font-size rem(34)
          .right-top
            span 
              display inline-block
              font-size 26px
              color #999
            h4
              display inline-block
              font-size rem(30)
          h3
            font-size rem(24)
            color #808080
          h4.in
            color #d14            
          h4.out
            color #42b983
          h4.def
            color def
</style>