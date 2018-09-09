<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.personalCenter
  ul 
    margin-top 20px
    li
      display box
      display flex
      justify-content space-between
      box-align center
      align-items center
      padding-left rem(28)
      margin-bottom 20px
      line-height rem(100)
      background #ffffff
      &:active
        background-color #ececec
      .cell_hd
        //width rem(190)
        font-size rem(32)
        color #333333
        .cell_bank
          overflow hidden
          padding-left rem(24)
          span, label
            float left
            line-height rem(130)
          span
            font-size rem(32)
          label
            padding-left rem(8)
            font-size rem(26)
            color #888
      
      .cell_bd.maincolor
        color mainColor
      .cell_bd
        position relative
        padding-right rem(48)
        font-size rem(32)
        color #8A8A8A
        &:after
          position: relative;
          top rem(-1)
          right rem(-20)
          content: " ";
          display: inline-block;
          height rem(20)
          width @height
          border-width: 4px 4px 0 0;
          border-color: #C4C4C4;
          border-style: solid;
          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        .cell_img
          float left
          display table-cell
          vertical-align middle
          img
            vertical-align middle
            width rem(60)
            height rem(60)
            font-size 1px
          span
            color #8A8A8A
      
  .btn
    input
      display block
      width 80%
      margin 80px auto 0
      line-height rem(94)
      border-radius rem(8)
      font-size rem(36)
      background-color mColor
      color baise

</style>
<template>
  <transition name="fate" >
    <div class="personalCenter" >
       <Loading v-show="!show" ></Loading>
      <div v-if="show">
      <ul>
        <!-- 实名认证 -->
        <!-- <router-link to="/certification">
        <li>
          <div class="cell_hd" v-text="'实名认证'"></div>
          <div class="cell_bd" v-show="user.identityid" v-text="'已认证'"></div>
          <div class="cell_bd" v-show="!user.identityid" v-text="'去认证'"></div>
        </li>
        </router-link> -->
        <li @click="gobandcard()">
            <div class="cell_hd">银行卡</div>
            <div class="cell_bd">
              <div class="cell_img" v-if="bank.is_bind_bankcard">
                <img 
                  :src="bank.image+'_enable_logo_48x48.png'" 
                  :alt="bank.bank_name"
                >
                <span>{{bank.bank_name}}</span>
                <span>(尾号{{bank.card_last}})</span>
              </div>
              <span v-if="!bank.is_bind_bankcard">去绑定</span>
            </div>
        </li>
        <!-- 手机号 -->
        <li @click="prompt">
          <div class="cell_hd" v-text="'手机号'"></div>
          <div class="cell_bd maincolor" v-text="user.mobile"></div>
        </li>
        <li @click="prompt">
          <div class="cell_hd" v-text="'密码管理'"></div>
          <div class="cell_bd" v-text="''"></div>
        </li>
        <li @click="routerPush('/address/list')">
          <div class="cell_hd" v-text="'收货地址'"></div>
          <div class="cell_bd" v-text="''"></div>
        </li>
      </ul>
      <div class="btn">
        <input
          type="button"
          value="安全退出"
          @click="logoutFun"
        >
      </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      show: false,
      isLogin: false,
      bank: {
        bank_no: "1991"
      },
      user: {
        bk: 0,
      },

    }
  },
  computed: {
  },
  watch: {},
  created() {
    this.$http({
      servicename: 'user.index',
    }).then((response) => {
        console.log(response)
        this.bank = response.bankInfo || false
        this.user = response.userInfo
        this.show = true
    }).catch(err => {
      console.log(err);
      // this.$flash(err)
    });
  },
  mounted() {},
  methods: {
    // 退出登陆
    logoutFun(){
      this.$http({
        servicename: 'user.logout',
      }).then((response) => {
        this.clearAllCookie()
        // this.clearSessionStorage()
        this.$root.checked = false,
        this.routerPush('/')
      }).catch(err => {
        console.log(err);
      });
    },
    gobandcard(){
      this.bank.is_bind_bankcard
        ? this.routerPush('/bindaread') 
        : this.routerReplace('/bindCard')
    },

    // 清除所有cookie
    clearAllCookie() {  
      let keys = document.cookie.match(/[^ =;]+(?=\=)/g);  
      if(keys) {  
        for(let i = keys.length; i--;){
          document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()  
        }   
      }  
    },
    // 清除活动标识
    clearSessionStorage(){
      sessionStorage.removeItem("combination_id")
      sessionStorage.removeItem("param")
    }
  },
}
</script>
