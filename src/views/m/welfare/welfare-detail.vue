<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.my-welfare-detail
  position: fixed
  z-index: 100
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
        // height rem(300)

</style>
<template>
<transition name="slide" >
  <div class="my-welfare-detail" >
    <!-- 红包 -->
    <div v-if="show && type!='coupon'">
        <div class="top">
        <img src="../assets/bg.jpg" alt="红包背景">
        <h5 >￥{{parseFloat(dataRed.rpcfg_money)}}</h5>
      </div>
      <ul>
        <li>红包类型: {{dataRed.type}}</li>
        <li>红包来源: {{dataRed.event_ref_id}}</li>
        <li>领取时间: {{dataRed.c_time}}</li>
        <li>有效期到: {{dataRed.time_end}}</li>
        <li> <p>使用说明:</p> {{dataRed.detail}}</li>
         <li class="instructions"><router-link to="/explain/welfare">如何使用福利卡券?</router-link></li>
      </ul>
    </div>
    <!-- 卡券 -->
    <div v-if="show && type=='coupon'">
      <div class="top">
        <img src="../assets/bg.jpg" alt="卡券背景">
        <!-- coupon_type 1加息券、2抵扣券、3免手续费券、4火箭券 -->
        <h5 
          v-if="data.coupon_type===2 || data.coupon_type===3"
        >￥{{ parseFloat(data.money) }}</h5>
        <h5 v-if="data.coupon_type===1">{{ parseFloat(data.money) }}%</h5>
      </div>
      <ul>
        <li>卡券名称: {{data.coupon_name}}</li>
        <li>红包来源: {{data.activity_name}}</li>
        <li 
          v-if="data.coupon_type==1"
        >加息天数: {{data.coupon_rate_days}}</li>
        <li
          v-if="data.coupon_type===2 || data.coupon_type===3"
        >有效天数: {{data.valid_days}}</li>
        <li>领取时间: {{data.get_time}}</li>
        <li>有效期到: {{data.valid_time_end}}</li>
        <li><p>使用说明:</p> {{data.description}}</li>
        <li class="instructions"><router-link to="/explain/welfare">如何使用福利卡券?</router-link></li>
      </ul>
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
          // c_time:"", // 领取时间
          // detail:"", //描述
          // event_ref_id:"参与活动获得", // 红包来源
          // rpcfg_money:"50000.0000",
          // time_end:"2017-10-30 23:59:59", // 开始时间  
          // type:"活动红包",  //  红包类型
        },
        data: {
          // activity_name:"活动名称",
          // coupon_name:"7061火箭券测试",
          // coupon_rate_days:10,
          // coupon_type:4,
          // description:"",
          // get_time:"2017-10-20 15:10:26",
          // money:"0.00",
          // valid_days:10,
          // valid_time_end:"2017-10-29 23:59:59",
        },    
      } 
    },
    computed: {
      cuserid(){
        return this.$route.query.cuserid
      },
      type(){
        return this.$route.query.refName
      }
    },
    watch: {},
    created() {
      // 判断红包还是卡券
      this.$route.query.refName=='coupon'
        ? this.initCouponFun() 
        : this.initRedFun()
    },
    mounted() {},
    methods: {


      initCouponFun(){
        let data = {
          servicename: 'Welfare.detail',
          couponid: this.cuserid  || '',
          type: this.type  || '',
        }
        this.$http(data).then((response) => {
          this.data = response
          this.show = true
        })
      },

      initRedFun(){
        let data = {
          servicename: 'Welfare.detail',
          couponid: this.cuserid  || '',
          type: this.type  || '',
        }
        
        this.$http(data).then((response) => {
          console.log(response);
          
          this.dataRed = response
          this.show = true
        })
      },

    },
  }
</script>
