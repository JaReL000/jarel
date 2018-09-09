<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.my-welfare-detail
  position: fixed
  z-index: 88
  top: 0
  left: 0
  bottom: 0
  right: 0
  background-color baise
  color mainColor
  .top
    position relative
    img
      width 100%
      height auto
    h5
      position absolute
      left 50%
      top rem(100)
      transform translate3d(-50%, 0, 0)
      font-size rem(40)
      line-height rem(80)
      font-weight bold
      color #f4af14
  ul
    padding rem(36) rem(30)
    li
      width:100%;
      font-size rem(26)
      line-height rem(60)
      letter-spacing rem(5)
      text-align left
      color huise
      &.instructions
        // text-align:left;
        >a
          text-decoration:underline;
          color:#0c72e3;
      p
        float left
        // height rem(240)
      // p
      //   float left
      //   height rem(240)
      //   width 22%
      // span 
      //   width 77%
      //   display inline-block
      //   line-height rem(40)
  .btn-status
    float left
    width 100%
    text-align center
    margin-top:100px;
    input 
      width 92%
      margin 0  auto
      height 100px
      border-radius 8px
      font-size 36px
      background #ff8d24
      color baise
    input:disabled
      background-color #ccc
    

</style>
<template>
<transition name="slide" >
  <div class="my-welfare-detail header-top " v-if="show">
    
    <!-- 红包 -->
    <div v-if="show && $route.query.type!=0">
        <div class="top">
        <img src="../images/bg.jpg" alt="红包背景">
        <h5>￥{{parseFloat(dataRed.rpcfg_money)}}</h5>
      </div>
      <ul>
        <li>红包类型:{{dataRed.type}}</li>
        <li>红包来源:{{dataRed.event_ref_id}}</li>
        <li>领取时间:{{dataRed.c_time}}</li>
        <li>有效期到:{{dataRed.time_end}}</li>
        <li><p>使用说明:</p><span>{{dataRed.detail}}</span> </li>
        <li class="instructions"><router-link to="/explain/welfare">如何使用福利卡券?</router-link></li>
      </ul>
      <!-- 红包按钮状态  -->
      <div 
        v-if="(cuserid == -1 && $root.latestVersion)"
        class="btn-status"
      >
        <input
          class="active"
          type="button"
          :disabled="!dataRed.show_status"
          :value="dataRed.text"
          @click="pushBindCardFun"
        >
      </div>
    </div>
    <!-- 卡券 -->
    <div v-if="show && $route.query.type==0">
      <div class="top">
        <img src="../images/bg.jpg" alt="卡券背景">
        <!-- coupon_type 1加息券、2抵扣券、3免手续费券、4火箭券 -->
        <h5 
          v-if="data.coupon_type===2 || data.coupon_type===3"
        >￥{{ parseFloat(data.money) }}</h5>
        <h5 v-if="data.coupon_type===1">{{ parseFloat(data.money) }}%</h5>
      </div>
      <ul>
        <li>卡券名称:{{data.coupon_name}}</li>
        <!-- <li>红包来源: {{data.activity_name}}</li> -->
        <li 
          v-if="data.coupon_type==1"
        >加息天数:{{data.coupon_rate_days}}</li>
        <li
          v-if="data.coupon_type===2 || data.coupon_type===3"
        >有效天数:{{data.valid_days}}</li>
        <li>领取时间:{{data.get_time}}</li>
        <li>有效期到:{{data.valid_time_end}}</li>
        <li><p>使用说明:</p> <span>{{data.description}}</span> </li>
        <li class="instructions"><router-link to="/explain/welfare">如何使用福利卡券?</router-link></li>
      </ul>

      <!-- 卡券按钮状态  -->
      <div 
        v-if="$root.latestVersion"
        class="btn-status"
      >
        <input
          class="active"
          type="button"
          :disabled="!data.show_status"
          :value="data.text"
          @click="activeFun"
        >
      </div>
    </div>
  </div>
</transition>
</template>

<script>

  export default {
    components: {},
    props: {},
    data() { 
      return {
        show: false,
        dataRed: {
          c_time:"", // 领取时间
          detail:"", //描述
          event_ref_id:"参与活动获得", // 红包来源
          rpcfg_money:"50000.0000",
          time_end:"2017-10-30 23:59:59", // 开始时间  
          type:"活动红包",  //  红包类型
        },
        data: {
          activity_name:"活动名称",
          coupon_name:"7061火箭券测试",
          coupon_rate_days:10,
          coupon_type:4,
          description:"",
          get_time:"2017-10-20 15:10:26",
          money:"0.00",
          valid_days:10,
          valid_time_end:"2017-10-29 23:59:59",
        },    
      } 
    },
    computed: {
      cuserid(){
        return this.$route.query.cuserid
      }
    },
    watch: {},
    created() {
      // 判断红包还是卡券
      this.$route.query.type==0
        ? this.initCouponFun() 
        : this.initRedFun()
    },
    mounted() {},
    methods: {
      initCouponFun(){
        let data = {
          method: 'user.coupon.detail',
          token: this.$root.appData.token,
          cuserid: this.cuserid,
          type: this.type
        }
        this.$http(data).then((response) => {
          this.data = response
          this.show = true
        })
      },

      initRedFun(){
        let data = {
          method: 'red.packet.detail',
          token: this.$root.appData.token,
          rpsendid: this.cuserid,
          type: this.type
        }
        
        this.$http(data).then((response) => {
          console.log(response);
          
          this.dataRed = response
          this.show = true
        })
      },
      activeFun(){
        //  coupon_type 为1加息 活期
        if(this.data.coupon_type === 1 && this.data.productid===1){
          let platform = this.isIOS ? 3 : 4   
          this.$http({
            method: 'user.coupon.activate',
            token: this.$root.appData.token,
            platform: this.$root.appData.platform || platform,
            cuserid: this.cuserid
          }).then((res)=>{
            if(res){
              if(res.code === 1000000){
                this.$flash(res.msg)
                return
              }
            }else{
              this.data.show_status = 0
              this.data.text = '已使用'
              this.$flash('激活成功')
            }
                      
          }).catch(function(error){
            this.$flash('激活失败')
          });
        }else{
          this.$JinrSDK.pushProductTurnIn(
            this.data.productid.toString(),
            this.data.productname.toString(), 
            this.data.productType.toString(),  
            '3', 
            '0', 
            this.cuserid.toString(),
            this.data.selected_name,
            '1'
          )
          return

          // try {
          // /**
          //  * productId 产品ID
          //  * productName 产品名字
          //  * productTypeId 产品类型ID
          //  * fromPage 从哪个页面跳转过来的 1-首页 2-资产页 3-详情页  4-活动页 
          //  * eventRefId 活动事件ID,活动的页面点击的时候传，其余默认为“0”
          //  * couponId 卡券ID
          //  * couponName 卡券名称
          //  */  
          //   Jinr.pushProductTurnIn(
          //     this.data.productid.toString(), 
          //     this.data.productname.toString(), 
          //     this.data.productType.toString(), 
          //     '3', 
          //     '0', 
          //     this.cuserid.toString(),
          //     this.data.selected_name
          //   )
          // } catch (error) {
          //   this.$flash(this.changeI18n(error)) 
          // }
        }
      },

      // 跳转绑卡
      pushBindCardFun() {
        
        try {
          let status = Jinr.pushBindCard()
          status = JSON.parse(status)
          // this.$flash(status.bindState)
          if(status.bindState == '1'){
            this.dataRed.show_status = ''
            this.dataRed.text = '已使用'
          }
        } catch (error) {
          this.$flash(this.changeI18n(error))
        }
      }
    },
  }
</script>
