<template>
  <div class="jr-keyboard">
    <div class="keyboard">
      <!-- 键盘列表 -->
      <transition name="fold">
        <div class="keyboard-main fixed-x" v-if="showKeyboard">
          <div class="keyboard-main-header">
            <div
              class="empty"
              @click="closeFun"
            ></div>
            <h1
              class="title"
              v-if="!showVer"
            >请输入密码</h1>
            <h1
              class="title"
              v-if="showVer"
            >请输入验证码</h1>
          </div>
          <div class="keyboard-main-frame">
            <div
              :class="{loadPwd: !showVer, loadVer: showVer}"
              v-if="showLoading">
              <Loading ></Loading>
            </div>

            <!--密码输入框-->
            <div class="from-pwd" v-show="!showVer && !showLoading">
              <!--，用于余额提现-->
              <!-- <h5>金额<span v-text="money || '1'"></span>元</h5> -->
              <ul>
                <!-- v-text="item.boll" -->
                <li
                  v-for="(item, index) in balls"
                  :class="{bai:balls[index].show}"
                  :key="index"
                ><span v-if="item.show"></span></li>
              </ul>
              <a
                class="forget"
                href="javascript:;"
                @click="tipsFun"
              >忘记密码？</a>
            </div>
            <!--验证码输入框-->
            <div class="from-ver" v-show="showVer && !showLoading">
              <div class="verifica_text">
                <span
                  v-for="(item, index) in balls"
                  v-text="item.verNum"
                  :key="index"
                ></span>
              </div>
              <input
                type="button"
                class="verifica_btn"
                value="发送验证码"
                @click="getVerificationCode"
              />
            </div>
          </div>
          <table class="keyboard-main-content" ref="listContent">
            <tbody>
              <tr v-for="(items, index) in keyBoardlists" :key="index">
                <td
                  v-if="item!=='del'"
                  v-for="(item, index) in items"
                  @click.stop="keyBoard(item)"
                  v-text="item==='clean'?'清除':item"
                  :class="{clean:item==='clean'}"
                  :key="index"
                ></td>
                <td
                  v-if="item==='del'"
                  v-for="item in items"
                  @click.stop="keyBoardDel"
                  :class="{del:item==='del'}"
                  :key="item"
                ><img
                  src="../assets/delete_data64.png"
                  alt=""></td>
              </tr>
            </tbody>
          </table>
        </div>
      </transition>
    </div>
    <!-- 底部模糊层 -->
    <transition name="fade">
      <div
        class="keyboard-mask"
        v-show="showKeyboard"
        @click="closeFun"
      ></div>
    </transition>
</div>
</template>

<script >

let boll = '●'

export default {
  components: {},
  props: {
    showKeyboard: {
      type: Boolean,
      defaule: false
    },
    coupon_id: {
      type: String,
      defaule: ''
    },
    money: {
      type: [String, Number],
    },
    payType: {
      type: Number
    },
    payProductid: {
      type: Number
    },
    type: {
      type: Number
    },
    buyType: {
      type: Number
    },
    cuserid: {
      type: Number
    }
  },
  data () {
    return {
      showLoading: false,
      dropBalls: [],
      keyBoardlists: [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['clean', '0', 'del'],
      ],
      payNum: '',
      // 键盘数据
      balls: [
        {show: false, boll, verNum: ''},
        {show: false, boll, verNum: ''},
        {show: false, boll, verNum: ''},
        {show: false, boll, verNum: ''},
        {show: false, boll, verNum: ''},
        {show: false, boll, verNum: ''},
      ],
      verNum: '', // 验证码专用
      payPwd: '', // 密码专用
      showVer: false, // 是否显示验证码
      play: null,
      token: '',
      numReCi: 0,
      orderid: '',
      resposeing: false,
    };
  },
  computed: {},
  methods: {
    tipsFun(){
      this.$flash("请移步鲸鱼APP找回密码");
    },
    // 清除键盘数据
    closeFun () {
      if(this.showLoading) return
      this.orderid = ''
      this._initKeyBoard(false)
      this.$emit('closekeyBoardFun', false)

    },

    // 键盘操作
    keyBoard(val){
      if(this.showLoading) return
      if(val !== 'clean'){

        // 验证码
        if(val){
          this.balls[this.payPwd.length].verNum = val
          this.verNum += val
        }

        if(this.payPwd.length<5){
          this.balls[this.payPwd.length].show = true
          this.payPwd += val

        }else if(this.payPwd.length === 5) {
          this.balls[this.payPwd.length].show = true
          this.payPwd += val

          if(this.payType===31) {
            if (!this.showVer) {
              // 请求
              this.validOrder()
            } else {
              this.validateCode()
            }
          }else {
            this.validOrder()
          }
        }
      }else {
        this._initKeyBoard(this.showVer)

      }

    },

    // 初始化键盘数据
    _initKeyBoard(bool){
      clearInterval(this.play)
      this.verNum = ''
      this.payPwd = ''
      this.showVer = bool ? bool: false
      // this.showVer =  false
      this.balls.forEach((ele, index)=>{
        ele.show = false
        ele.verNum = ''
      })
    },

    // 删除按钮
    keyBoardDel(){
      if(this.showLoading) return

      let indexNum = !this.showVer ? this.payPwd.length : this.verNum.length
      if(indexNum===0){
        this.balls[0].verNum = ''
        this.balls[0].show = false
        this.payPwd = this.verNum = ''
        return
      }
      this.balls[indexNum-1].show = false
      this.balls[indexNum-1].verNum = ''
      this.payPwd = this.payPwd.substring(0,this.payPwd.length-1)
      this.verNum = this.verNum.substring(0,this.verNum.length-1)
    },

    // 提交订单
    validOrder(){
      this.showLoading = !this.showLoading
      let params={
        servicename : 'order.submitOrder', //   orderCreate
        money: this.money || '',
        // passwd: this.payPwd,
        passwd: this.encrypt(this.payPwd)  || '',
        // platform: '', //平台
        src_ref_id:  this.payProductid  || '', //支付来源id 活期为1
        pay_type: this.payType  || '', // 支付方式列表id 11-余额|12-产品|21-现金(红包)|22-体验金(红包)|31-银行卡|32-微信|33-存票
        productid: this.$route.params.productid  || '', //产品id
        type: this.type  || '', // 1转入 2转出 3充值  4提现
        buy_type: this.buyType  || '', // 废弃
        cuserid: this.cuserid  || '',
        combination_id : sessionStorage['combination_id']  || '',
        param : sessionStorage['param']  || '',
      }
      // if(this.$root.checked){
      //   params.combination_id = sessionStorage['combination_id']
      //   params.param = sessionStorage['param']
      // }

      this.$http(params).then((res)=>{
        // 没有设置交易密码进行跳转
        if(res===1000302){
          this.$flash("你还没有设置交易密码,请先设置交易密码")
          setTimeout(()=>{
            this.routerReplace('/certification/password')
          },1000)
          return
        }

        // 存储订单id
        if(res.orderid){
          this.orderid = res.orderid
        }
        // 银行卡相关操作
        if(this.payType === 31){
          this.showLoading = !this.showLoading

          this.showVer = true
          // 初始化键盘
          this._initKeyBoard(this.showVer)
          // 倒计时
          this.$nextTick(()=>{this._countDown()})
          return
        }

        // 查询订单
        this.orderQuery(this.orderid)

      }).catch((error)=>{
        this.showLoading = false
        this._initKeyBoard(this.showVer)
        console.log(res.msg)
      });
    },

    // 查询订单
    orderQuery(orderid){
      let params={
        servicename : 'order.orderDetail',
        orderid: orderid  || '',
      }

      this.$http(params).then((res)=>{
        // 还在转菊花
        // this.showLoading = !this.showLoading
        this._initKeyBoard(this.showVer) // 初始化键盘
        this.$emit('goToDone', res.list)
        // this.clearSessionStorage()
      }).catch((error)=>{
        this.showLoading = false
        console.log(res.msg)
      });
    },

    // 清除活动标识
    clearSessionStorage(){
      sessionStorage.removeItem("combination_id")
      sessionStorage.removeItem("param")
    },

    // 验证验证码
    validateCode(){
      this.showLoading = !this.showLoading
      let params={
        servicename : 'order.payValidate',
        sms_code: this.verNum  || '',
        orderid: this.orderid  || '',
      }

      this.$http(params).then((res)=>{

        if(res.code === 1000305){
          console.log(res.code);


          this.showLoading = !this.showLoading
          this.$nextTick(()=>{
            let verificaBtn = document.getElementsByClassName('verifica_btn')[0]
            verificaBtn.disabled = true
            // 接着倒计时 初始化键盘
            this.verNum = ''
            this.payPwd = ''
            this.balls.forEach((ele, index)=>{
              ele.show = false
              ele.verNum = ''
            })
          })

          this.$flash(res.msg)
        }else{
          console.log(res.code);
          this.showLoading = !this.showLoading

          this._initKeyBoard(this.showVer) // 初始化键盘
          // this.showVer = false
          clearInterval(this.play)
          this.orderQuery(this.orderid)
        }



      }).catch((error)=>{
        this.showLoading = !this.showLoading
        console.log(this.showVer)
        this.showVer = false
        this._initKeyBoard(this.showVer)

      });
    },

     // 发送验证码
    getVerificationCode(){
      if(this.resposeing) return
      this.resposeing = true
      console.log('请求短信');

      this.showLoading = !this.showLoading
      let params={
        servicename : 'order.paySmsResend',
        orderid: this.orderid  || '',
      }

      this.$http(params).then((res)=>{
        setTimeout(()=> {
          this.resposeing = false
        }, 1000);
        this.showLoading = !this.showLoading
        this._initKeyBoard(this.showVer) // 初始化键盘
        this.$nextTick(()=>{this._countDown()}) // 倒计时
      }).catch((error)=>{
        this.showLoading = !this.showLoading
        console.log(this.showVer)
        this._initKeyBoard(this.showVer)
      });
    },

    // 倒计时效果
    _countDown(){
      clearInterval(this.play)

      let codeTime = 60
      let verificaBtn = document.getElementsByClassName('verifica_btn')[0]

      verificaBtn.value = codeTime + 's'
      verificaBtn.disabled = true
      verificaBtn.setAttribute('class', 'verifica_btn')

      // 时间倒计时
      this.play = setInterval(() => {
        let verificaBtn = document.getElementsByClassName('verifica_btn')[0]
        codeTime--
        if (codeTime === 0) {
          verificaBtn.value = '重新获取'
          clearInterval(this.play)
          verificaBtn.disabled = false
          verificaBtn.setAttribute('class', 'verifica_btn')
          return
        }
        verificaBtn.value = codeTime + 's'
      }, 1000)
    },

  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.keyboard
  position fixed
  left 0
  bottom 0
  z-index 2
  width 100%
  height rem(0)
  color rgba(255, 255,255, 0.4)
  .keyboard-main  //购物车清单
    position: absolute
    left: 0
    top: 0
    z-index: -1
    width: 100%
    transform: translate3d(0,-100%,0)
    transition: all .3s
    background: #ffffff
    color wordDfColor
    &.fold-enter
      transform: translate3d(0,0,0)
    &.fold-leave
      transform: translate3d(0,-100%,0)
    &.fold-leave-active
      transform: translate3d(0,0,0)
    .keyboard-main-header
      position relative
      height: rem(100)
      line-height: @height
      padding: 0 rem(32)
      font-size: rem(44)
      &:before
        content ''
        position absolute
        height 1px
        width 100%
        bottom 0
        right 0
        background-color #e9e9e9
      .empty
        float left
        margin-top rem(25)
        padding rem(10)
        margin-right rem(10)
        border-radius 50%
        position relative
        width rem(30)
        height @width
        border-radius 50%
        &:before,&:after
          content ''
          position absolute
          height rem(2.5)
          width 60%
          top 50%
          left 0
          margin-top -.04rem
          border-radius .01rem
          background huise9
        &:before
          transform rotate(45deg)
        &:after
          transform rotate(-45deg)
      .title
        // font-size rem(32)
        text-align center
        text-indent rem(-60)
        color: rgb(7,17,27)
    .keyboard-main-frame
      text-align center
      .loadPwd
        height rem(310)
        position relative
      .from-pwd
        // height rem(310)
        padding 60px 0 0
        h5
          padding-top rem(15)
          line-height rem(100)
          font-size rem(28)
        ul
          margin 0 rem(30)
          overflow hidden
          border 1px solid #acacac
          border-radius rem(12)
          li
            position relative
            float left
            height rem(100)
            width 112px
            line-height @height
            font-size rem(85)
            border-right  1px solid #acacac
            color #f3f5f7
            span
              position absolute
              top 50%
              left 50%
              width rem(26)
              height @width
              border-radius 50%
              transform translate3d(-50%, -50%, 0)
              background-color #000
          li.bai
            color wordDfColor
          li:last-child
            border-right none
        &>a.forget
          display block
          width auto
          height auto
          position static
          padding-right rem(35)
          margin-bottom rem(42)
          border-top none
          text-align right
          line-height rem(50)
          font-size rem(28)
          background-color #ffffff
          color mainColor
      .loadVer
        position relative
        height rem(90)
        padding rem(36) rem(48) rem(42)
      .from-ver
        height rem(90)
        padding rem(36) rem(48) rem(42)
        line-height @height
        text-align center
        background-color baise
        .verifica_text
          float left
          overflow hidden
          height rem(90)
          padding 0 rem(80)
          border-radius rem(12)
          background-color #f3f3f3
          span
            display inline-block
            width rem(34)
            font-size rem(46)
        input.verifica_btn
          float right
          width rem(220)
          height rem(90)
          border none
          line-height @height
          font-size rem(36)
          border-radius rem(12)
          background-color mainColor
          color #ececec
        input::-webkit-input-placeholder
          font-size rem(30)
          line-height rem(90)
          color baise
        input.verifica_btn:disabled
          background-color #ccc
          letter-spacing 2px
          color baise
        input.verifica_btn:active
          background-color #6699ff
    .keyboard-main-content
      width 100%
      padding-left  rem(32)
      background: #fff
      text-align center
      tr
        border-top 1px solid #dfdfdf
        &>td:nth-child(3)
          border-right  none
      td
        border-right  1px solid #dfdfdf
        width 33.3%
        line-height rem(108)
        font-size rem(60)
        color wordDfColor
        &:active
          background-color #ebebeb
      .clean
        font-size rem(32)
        &:active
          background-color mainColor
      .del
        display table-cell
        background-color mainColor
        &:active
          background-color #ebebeb
        img
          width rem(54)
          vertical-align middle
.keyboard-mask  //遮罩层
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: rgba(0,0,0,0.6)
  //filter: blur(rem(10))
  backdrop-filter: blur(10px)
  &.fade-enter-active
    opacity: 1
    background: rgba(7,17,27,0.06)
    transition: all .3s
  &.fade-enter, &.fade-leave
    opacity: 0
    background: rgba(7,17,27,0)
    backdrop-filter: blur(0px)
  &.fade-leave-active
    opacity: 0
    background: rgba(7,17,27,0)
    transition: all .3s

</style>
