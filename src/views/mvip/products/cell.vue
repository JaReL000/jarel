<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

ul.ticket-cell
  padding 25px  20px
  li>.main 
    overflow hidden
    position relative
    padding  8px
    margin-bottom 15px
    //默认灰色 2已使用 &.expire, &.used //3已过期
    background url('../assets/ticket_cell_d.png')  no-repeat left top
    background-size 100% 100%
    &.highlight //1未使用 4去激活
      background-image url('../assets/ticket_cell_h.png')
    .cell-choice
      position absolute
      top 50%
      right 10px 
      transform translate3d(0, -50%, 0) 
    .jr-left
      position relative
      height 180px
      width 30%
      font-size 0px
      text-align center
      line-height @height 
      color #fff
      .item-cell
        position relative
        height 180px
        text-align center
        h2
          font-size 50px
          display inline-block
        span
          padding-left 5px
          font-size 26px
        img 
          position absolute
          top 0 
          left 0 
          right 0 
          bottom 0
          width 88px 
          height @width
          margin auto
    .jr-right
      width 70%
      height 180px
      font-size 26px
      background url('../assets/ticket_used.png')  no-repeat 96%  bottom 
      background-size 122px 86px
      &.highlight
       background transparent
      &.expire
        background-image  url('../assets/ticket_expire.png')
      &.used
        background-image  url('../assets/ticket_used.png')
      .item-cell
        position relative
        padding 2px 0 0 44px 
        h6 
          line-height 58px
          font-size 30px
          font-weight bold
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
        p 
          line-height 38px
          font-size 24px
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          color #666666
          span.h 
            color #ff9533
        .activat //去激活
          position absolute
          right 26px
          top 0%
          bottom 0
          // transform translate3d(0, -50%, 0)
          padding 0  20px
          width 86px
          span 
            position absolute
            right 0
            top 50%
            width 100%
            transform translate3d(0, -50%, 0)
            height 46px
            border 1px mainColor solid
            border-radius 12px
            line-height @height
            text-align center
            
                   

</style>

<template>
  <ul class="ticket-cell">
    <li 
      class="item-list" 
      v-for="(item, index) in lists"
      :key="index"
      @click="goToDetaliFun(item.rpsendid || item.cuserid)"
    >
      <!-- 理财红包 -->
      <!-- 现金红包 -->
      <!-- status 0 过期 1 使用中 -->
      <div 
        class="main lx" 
        :class="{highlight: (item.status) }"
        v-if="type"
      >
        <!-- 左侧 -->
        <div class="jr-left" >
          <div class="item-cell" >
            {{$root.appData.token}}
            <h2>{{Math.floor(item.rpcfg_money * 100) / 100  }}</h2>
            <span>元</span>
          </div>
        </div>
      
        <!-- 右侧 -->
        <div 
          class="jr-right"
          :class="{highlight: item.status }"
        >
          <div class="item-cell">
            <h6>{{ item.rpcfg_name }}</h6>
            <p v-text="item.intro"></p>
            <p>{{ item.description || '参与活动活动' }} </p>
            <p>{{'有效期至:'}} <span :class="{h: item.status}">{{item.time_end}}</span></p>
          </div>
        </div>
      </div>

      <!-- 卡券 && item.status===4 -->
      <div 
        class="main" 
        :class="[
          {highlight: ((item.status===1 || item.status===4) || (isChoice && item.is_select))},
          {expire: (item.status===3)},
          {used: (item.status===2) }
        ]"
        v-if="!type"
      >
        <!-- 
          coupon_type 1-加息利率|2-抵扣金额|3-免手续费|4-火箭券 
          status	1未使用 2已使用  3已过期  4去激活
        --> 
        <div class="jr-left" >
          <!-- 1-加息利率 -->
          <div class="item-cell" v-if="item.coupon_type===1">
            <h2>{{Math.floor(item.money * 100) / 100  }}</h2>
            <span>%</span>
          </div>
          <!-- 2-抵扣金额 -->
          <div class="item-cell" v-if="item.coupon_type===2">
            <h2>{{Math.floor(item.money * 100) / 100  }}</h2>
            <span>元</span>
          </div>
          <!-- 3-免手续费 -->
          <div class="item-cell" v-if="item.coupon_type===3">
            <h2>{{Math.floor(item.money * 100) / 100  }}</h2>
            <span>元</span>
          </div>
          <!-- 4-火箭券 -->
          <div class="item-cell" v-if="item.coupon_type===4">
            {{item.status}}
            <img src="../assets/ticket_rocket.png" alt="火箭券">
          </div>
        </div>
      
        <!-- 右侧 -->
        <div 
          class="jr-right"
          :class="[
            {highlight: ((item.status===1 || item.status===4) || isChoice  )},
            {expire: (item.status===3)},
            {used: (item.status===2) }
          ]"
        >
          <div class="item-cell">
            <h6>{{ item.coupon_name }}</h6>
            <p v-text="item.description || ''"></p> 
            <p v-text="item.activity_name || '参与活动获得'"></p>
            <p>{{'有效期至:'}} <span :class="{h: (item.status===1 && item.status===4)}">{{item.valid_time_end}}</span></p>
            <!-- touchstart -->
            <div 
              class="activat"
              v-if="item.status===4"
              @touchstart.stop.prevent="deActiva(index, item.cuserid, item.coupon_type)"
            ><span v-text="'去激活'" ></span></div>
          </div> 
        </div> 

        <!-- 打勾按钮 -->
        <div 
          class="cell-choice" 
          v-if="isChoice"
          @click="choiceCouponFun(index, item.selected_name, item.cuserid, item.coupon_type, item.money)"
          >
          <!--  -->
          <i class="radio" :class="{active: item.select}"></i>
        </div>      
      </div>
           
    </li>
    <div 
      class="more"
      v-if="isMore"
      @click="moreIngFun"
    >加载更多</div>  
  </ul>
</template>

<script>

  export default {
    components: {},
    props: {
      lists: {
        type: Array
      },
      isChoice: {
        type: [Boolean, String]
      },
      type: {
        type: Number
      },
      isMore: {
        type: Boolean
      },
      index: {
        type: Number
      }
    },
    data() {
      return {}
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      choiceCouponFun(index, couponName, couponId, couponType, couponMoney, ){
        this.$emit('choiceCouponFun', index, couponName, couponId, couponType, couponMoney, )
      },

      // 加载更多
      moreIngFun(){
        this.$emit('moreIngFun', this.index)
      },

      // 激活卡券
      deActiva(cuserid, coupon_type){
        this.$emit('deActiva', cuserid, coupon_type)
      },

      // 进去详情
      goToDetaliFun(cuserid){
        this.$emit('goToDetaliFun', cuserid, this.type)
      }
    }
  }
</script>

