<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

$cell-height = 180px

ul.ticket-cell
  padding 25px  20px
  li>.main
    overflow hidden
    position relative
    padding  8px
    margin-bottom 15px
    //默认灰色 2已使用 &.expire, &.used //3已过期
    background url('./images/ticket_cell_d.png')  no-repeat left top
    background-size 100% 100%
    &.highlight //1未使用 4去激活
      background-image url('./images/ticket_cell_h.png')
    .jr-left
      position relative
      height $cell-height
      width 30%
      font-size 0px
      text-align center
      line-height @height
      color #fff
      .item-cell
        position relative
        height $cell-height
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
      height $cell-height
      font-size 26px
      background url('./images/ticket_used.png')  no-repeat 96%  bottom
      background-size 122px 86px
      &.highlight
        background transparent
      // 0-去激活(active) 1-未使用(notused) 2-已使用(used)
      // 3-已过期(obsolete) 4-已到期(expire) 5-已中止(suspend)
      &.active
        background-image  transparent
      &.notused
        background-image  transparent
      &.used
        background-image  url('./images/ticket_used.png')
      &.obsolete
        background-image  url('./images/ticket_obsolete.png')
      &.expire
        background-image  url('./images/ticket_expire.png')
      &.suspend
        background-image  transparent
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
          width 70%
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
          right 18px
          top 0%
          bottom 0
          // transform translate3d(0, -50%, 0)
          padding 0  22px
          width 66px
          span
            position absolute
            right 0
            top 50%
            width 100%
            transform translate3d(0, -50%, 0)
            height 46px
            border 1px #ffa21e solid
            border-radius 12px
            line-height @height
            font-size 24px
            text-align center
            background-color #ffa21e
            color #fff
        .cell-choice
          position absolute
          top 0%
          right 10px
          // transform translate3d(0, -50%, 0)
          i.radio
            height $cell-height

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
            <!-- <h2>{{Math.floor(item.rpcfg_money * 100) / 100  }}</h2> -->
            <h2>{{ parseFloat(item.rpcfg_money ) }}</h2>
            <span>元</span>
          </div>
        </div>

        <!-- 右侧 -->
        <div
          class="jr-right"
          :class="{highlight: item.status || item.rpsendid === -1}"
        >
          <div class="item-cell">
            <!-- 红包文案 -->
            <h6>{{ item.rpcfg_name }}</h6>
            <p v-text="item.intro"></p>
            <p>{{ item.description || '参与活动活动' }} </p>
            <!-- 2-5 需求更改 time_end => c_time -->
            <!-- <p>{{'有效期至:'}} <span :class="{h: item.status}">{{item.time_end}}</span></p> -->
            <p>{{'领取时间:'}} <span
              :class="{h: item.status}"
              v-text="item.time_end"
            ></span></p>

            <!-- 红包激活 -->
            <div
              class="activat"
              v-if="(item.rpsendid === -1 && $root.latestVersion && item.status)"
              @click.stop.prevent="pushBindCardFun(index)"
            ><span v-text="'激活'" ></span></div>
          </div>
        </div>
      </div>

      <!--
        卡券 && item.status===4
        0-去激活(active) 1-未使用(notused)
      -->
      <div
        class="main"
        :class="[
          {
            highlight: ((item.status===1 || item.status===0) || (isChoice && item.is_select))
          },
        ]"
        v-if="!type"
      >
        <!--
          coupon_type 1-加息利率|2-抵扣金额|3-免手续费|4-火箭券
        -->
        <div class="jr-left" >
          <!-- 1-加息利率 -->
          <div class="item-cell" v-if="item.coupon_type===1">
            <h2>{{parseFloat(item.money)  }}</h2>
            <span>%</span>
          </div>
          <!-- 2-抵扣金额 -->
          <div class="item-cell" v-if="item.coupon_type===2">
            <h2>{{parseFloat(item.money) }}</h2>
            <span>元</span>
          </div>
          <!-- 3-免手续费 -->
          <div class="item-cell" v-if="item.coupon_type===3">
            <h2>{{parseFloat(item.money)  }}</h2>
            <span>元</span>
          </div>
          <!-- 4-火箭券 -->
          <div class="item-cell" v-if="item.coupon_type===4">
            {{item.status}}
            <img src="./images/ticket_rocket.png" alt="火箭券">
          </div>
        </div>

        <!-- 右侧
          status(旧)	1未使用 2已使用  3已过期  4去激活
          status
          0-去激活(active)
          1-未使用(notused)
          2-已使用(used)
          3-已过期(obsolete)
          4-已到期(expire)
          5-已中止(suspend)
        -->
        <div
          class="jr-right"
          :class="[
            {highlight: ((item.status===1 || item.status===0) || isChoice  )},
            {active: (item.status===0)},
            {notused: (item.status===1)},
            {used: (item.status===2)},
            {obsolete: (item.status===3) },
            {expire: (item.status===4) },
            {suspend: (item.status===5) },
          ]"
        >
          <div class="item-cell">
            <!-- <h6>{{item.coupon_name}}</h6> -->
            <h6>{{item.coupon_type_txt}}</h6>
            <p v-html="item.description || ''"></p>
            <p v-html="item.activity_name || ''"></p>
            <!-- 2-5 需求更改 valid_time_end => c_time -->
            <!-- <p>{{'有效期至:'}} <span :class="{h: (item.status===1 || item.status===0)}">{{item.valid_time_end}}</span></p> -->
            <p>{{'领取时间:'}} <span
              :class="{h: (item.status===1 || item.status===0)}"
              v-text="item.valid_time_end"
            ></span></p>

            <!-- 使用 激活 touchstart -->
            <div
              class="activat"
              v-if="item.status===0 || (item.status===1 && $root.latestVersion)"
              @click.stop.prevent="deActiva(index, item.cuserid, item.coupon_type, item.status)"
            ><span v-text="statusTxt(item.status)" ></span></div>

            <!-- 选择卡券 打勾按钮 -->
            <div
              class="cell-choice"
              v-if="isChoice"
              @click="choiceCouponFun(
                item.selected_name,
                item.cuserid.toString(),
                item.coupon_type.toString(),
                item.use_money_min.toString(),
                index.toString()
              )"
            ><i class="radio" :class="{active: item.select}"></i></div>

          </div>
        </div>
      </div>
    </li>
    <!-- <div
      class="more"
      v-if="isMore"
      @click="moreIngFun"
    >加载更多</div>   -->
  </ul>
</template>

<script>

  export default {
    components: {},
    props: {
      lists: {
        type: Array
      },
      // 是否显示选择打钩
      isChoice: {
        type: [Boolean, String]
      },
      // 福利类型
      type: {
        type: Number
      },
      isMore: {
        type: Boolean
      },
      index: {
        type: Number
      },
      refName: {
        type: String
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
      choiceCouponFun(couponName, couponId, couponType, couponMoney, index){
        if(this.isChoice){
          this.$emit('choiceCouponFun', couponName, couponId, couponType, couponMoney, index)
        }

      },

      // 加载更多
      moreIngFun(){
        this.$emit('moreIngFun', this.index)
      },

      // 激活卡券 使用
      deActiva(index, cuserid, coupon_type, status){
        this.$emit('deActiva', index, cuserid, coupon_type, status)
      },

      // 进去详情
      goToDetaliFun(cuserid){
        this.$emit('goToDetaliFun', cuserid, this.type, this.refName)
      },

      statusTxt(status){
        if(status === 0){
          return '去激活'
        }else if(status === 1){
          return '使用'
        }
      },

      // 跳转绑卡
      pushBindCardFun(index) {
        try {
          let status = Jinr.pushBindCard()
          status = JSON.parse(status)
          // this.$flash(status.bindState)
          if(status.bindState == '1'){
            // this.$flash('已经绑卡')
            this.$emit('changeStatusIndex', index)
          }
        } catch (error) {
          this.$flash(this.changeI18n(error))
        }
      }
    }
  }
</script>

