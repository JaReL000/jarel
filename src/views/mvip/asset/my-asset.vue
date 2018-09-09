<template>
  <transition name="fate" >
    <div class="my-asset-wrap" >
      <Loading v-show="!show" ></Loading>
      <div class="my-asset fixed-x" v-if="show">
      <jr-banner
        type="asset"
        titleTop="账户总资产(元)"
        :account="account"
        goods_type = 0
        order_type = 0
        productid = 0
        record="/asset/myAsset/jrRecord"
      ></jr-banner>
      <div class="main">
        <ul>
          <li
            v-for="(item, index) in assetList"
            @click.stop="routerToPush(item.ptypeid, item.total_money, item.productid, item.display, item.product_name)"
            :key="index"
          >
            <div class="cell_yue" v-if="item.ptypeid == -1">
              <p>{{item.product_name}}</p>
              <p class="ligth">{{item.total_money}}</p>
            </div>
            <div class="cell_link" v-show="item.ptypeid == -1">
              <span  @click.stop.prevent="routerPush('/balanceOut')">提现</span>
              <span class="active" @click.stop.prevent="routerPush('/balanceIn')">充值</span>
            </div>

            <div class="cell_hd" v-if="item.ptypeid != -1" v-text="item.product_name"></div>
            <div class="cell_bd" v-if="item.ptypeid != -1" v-text="item.total_money"></div>
          </li>
        </ul>
      </div>
      <please
        :showAlert="showAlert"
        @closeFun="closeFun"
      ></please>
      <router-view></router-view>
    </div>
    </div>
  </transition>
</template>

<script>
  import JrBanner from '../components/JrBanner'
  import Please from './Please.vue'

  export default {
    name: 'myAsset',
    components: {
      JrBanner,
      Please
    },
    data() {
      return {
        show:false,
        showAlert: false,
        sildShow: false,
        account: {
          total_money: '0.00',
          income_total: '0.00',
          yesterday_total: '0.00',
        },
        path: this.$Object.goBank,
        assetList:[
          // {ptypeid: -1, total_money: 1212121, productid: -1, display: 1, product_name: '余额'},
          // {ptypeid: 1, total_money: 1212121, productid: 1, display: 1, product_name: '活期'},
          // {ptypeid: 2, total_money: 1212121, productid: 2, display: 1, product_name: '定期'},
          // {ptypeid: 3, total_money: 1212121, productid: 6, display: 1, product_name: '余额'},
          // {ptypeid: 4, total_money: 1212121, productid: 7, display: 1, product_name: '余额'},
        ]
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
          servicename: 'account.myAsset'
        }).then((response)=>{
          this.account = response
          this.assetList = response.list
          this.show = true
          
        }).catch(function(error){
          console.log("失败了:"+error)
          this.show = true
        });
      },

      menuFun(){
        this.sildShow = !this.sildShow
      },

      // 路由跳转
      routerToPush(pathtype, money, productid, display, productName){
        // console.log(pathtype, money, productid, display, productName);
        
        if(!display){
          // this.$flash("请移步鲸鱼APP进行此项操作");
          this.$messagebox({
            title: null ,
            message: '请移步鲸鱼APP进行此项操作',
          })
          return;
        }
        let _path = "/";

        if(productid == -1){
          
          _path = "/balance/index"
        }else if(productid == 1){
          _path = "/asset/currentAsset"
        }else if(productid == 2 || productid == 8){
          _path = "/asset/regularAsset"
        }else if(productid == 7){
          _path = "/asset/quarterAsset"
        }else if(productid == 6){
          _path = "/asset/noonAsset"
        }else if(productid == 5){
          _path = "/asset/weekAsset"
        }else if(productid == -2){
          _path = "/welfare/myCore"
        }
        console.log(_path, money, productid, productName);
        
        this.$router.push({
          path: _path,
          query: {
            money: money,
            productid: productid
          },
          
        })
      },
      closeFun(bool){
        this.showAlert = bool
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.my-asset
  position: fixed
  width: 100%
  top: 0
  bottom: 0
  overflow scroll
  background-color #fff
  &>.main
    position fixed
    top rem(378)
    width 100%
    bottom 0
    overflow scroll
    background #f5f5f5
    &>ul
      // margin-left rem(55)
      // padding-left rem(55)
      // background #f5f5f5
      &>li:first-of-type,
      &>li:nth-of-type(6)
        margin-bottom rem(22)
        border-bottom none
      &>li:last-of-type
        border: none
      li
        display box
        display flex
        justify-content space-between
        box-align center
        align-items center
        border-bottom 1px solid #e6e6e6
        line-height rem(100)
        padding-left rem(30)
        background #ffffff
        &:active
          background-color #ececec
        .cell_hd
          width rem(190)
          font-size rem(30)
          color #333
        .cell_bd
          position relative
          padding-right rem(40)
          font-size rem(32)
          color #999
          &:after
            position: relative;
            top rem(-3)
            right rem(-10)
            content: " ";
            display: inline-block;
            height rem(16)
            width @height
            border-width: 4px 4px 0 0;
            border-color: #C8C8CD;
            border-style: solid;
            transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);

        .cell_link
          margin-right rem(30)
          width 300px
          text-align right
          span
            display inline-block
            width rem(118)
            height rem(58)
            line-height rem(58)
            text-align center
            border 1px solid mColor
            font-size rem(32)
            color mColor
            border-radius rem(10)
          span.active
            color #ffffff
            // background #0C72E3
            background mColor
            margin-left rem(10)

        .cell_yue
          padding rem(20) 0
          line-height rem(50)
          color #888
          .ligth
            color mColor
            font-size rem(34)
          p
            color #333
            font-size rem(28)



</style>
