<template>
  <div class="cardlist fixed" >
    <div class="selectnone">
      <label >不使用卡券</label> 
      <span 
        class="selectbtn" 
        :class="{selectbtnlight:current_card == ''}"
        @click="selectcard('')"
      ></span>
    </div>
    <div class="selectlist">
      <ul>
        <li v-for="(item,index) in lists" :key="index">
          <div class="ticket">
            <p class="p1">{{item.money}}</p>
            <p class="p2">{{item.coupon_name}}</p>
          </div>
          <div class="ticket-descr">
            <p class="p1">{{item.intro}}</p>
            <p class="p1">参与活动获得</p>
            <p class="p2">有效期至：<span>{{item.valid_time_start}}</span></p>
          </div>
          <span 
            class="selectbtn" 
            :class="{selectbtnlight:current_card == item.cuserid}" 
            @click="selectcard(item.cuserid)"
          ></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showCouponList: {
      type: Boolean,
      default: true
    },
    productid: {
      type: String
    },
    money: {
      type: String,
      default: '0'
    }
  },
  data(){
    return{
      lists:[
        {
          coupon_name: "7061年定期抵扣金",
          coupon_type: 2,
          cuserid: 441074,
          description:"投资年定期满1.00元使用",
          is_select:1,
          money:10,
          selected_name:"10元抵扣券",
          valid_time_end:"2018-01-23"
        }
      ],//卡券
    }
  },
  computed: {},
  created() {
    log
    this.initFun();
  },
  mounted(){},
  methods:{

    //获取卡券列表数据
    initFun(){ 
      let params={
        servicename : 'Welfare.selectCouponList',
        money: this.money || '',
        productid: this.productid || '',
      }

      this.$http(params).then((res)=>{
        this.lists = response.list
      }).catch(function(error){
        console.log(response.msg)
      });

    },
    selectcard(cuserid){//选择卡券方法
      // this.SELECT_CARD_CURENT(cuserid)
    }

  }
}
</script>

<style lang="stylus" scoped>
.selectbtn
  display block
  position absolute
  right 30px
  top 50%
  margin-top -22px
  width 44px
  height 44px
  background-image url("../assets/selectnone.png")
  background-position center
  background-repeat no-repeat
  background-size 100% 100%
.selectbtnlight
  background-image url("../assets/selectok.png")
  background-position center
  background-repeat no-repeat
  background-size 100% 100%
.cardlist
  position fixed
  top 0px
  left 0px
  width 100%
  height 100%
  background #F5F5F5
  .selectnone
    height 100px
    line-height 100px
    padding 0 30px
    margin-top 20px
    background #ffffff
    color #333
    font-size 32px
    position relative
  .selectlist
    padding 30px
    ul
      li
        position relative
        height 180px
        background-image url("../assets/cardbg.png")
        background-position center
        background-repeat no-repeat
        background-size 100% 100%
        margin-bottom 29px
        .ticket
          width 202px
          height 180px
          text-align center
          float left
          color #ffffff
          .p1
            padding-top 32px
            line-height 64px
            font-size 60px
          .p2
            line-height 48px
            font-size 32px
        .ticket-descr
          padding 16px 0 0 257px
          .p1
            line-height 40px
            height 40px
            overflow hidden
            color #414141
            font-size 32px
          .p2
            padding-top 36px
            line-height 34px
            height 34px
            color #999999
            font-size 28px


</style>


