// 发送密码
validOrder2(){
  this.showLoading = !this.showLoading
  let params = {
    "do_type" : this.do_type,  //1，2，3，4代表，转入，转出，充值，提现 (业务类型)
    "goods_type" : this.goods_type,  // 产品类型
    "pay_type" : this.pay_type, // 支付类型
    "money" : this.money,
    "pass" : this.payPwd,
    "coupon_id" : this.coupon_id, // 卡券id
//        "combination_id" : this.$root.combinationId || ''
    "combination_id" : sessionStorage['combination_id']
  }

  checksApi.validOrder(params).then((response) => {

    this.showLoading = !this.showLoading
    this._initKeyBoard(this.showVer) // 初始化键盘

    if(response.code === 1000){

      // 如果是银行卡
      let bool = (this.pay_type===good_type.bank && this.goods_type===good_type.week) // 周周盈
        || (this.pay_type===good_type.bank && this.goods_type===good_type.balance)  // 余额
        || (this.pay_type===good_type.bank && this.goods_type===good_type.current)  // 活期
        || (this.pay_type===good_type.bank && this.goods_type===good_type.regular)  // 定期
      if(bool){
        this.token = response.data.token
        this.showVer = true
        // 倒计时
        this.$nextTick(()=>{this._countDown()})
        return
      }else {
        this.showVer = false
        this.$emit('goToNext', response.data)
        this.closeFun()
      }

    }else {

      this.$flash(response.msg)
    }
  })
},

 // 发送验证码
 getVerificationCode(){
  let params = {
    token: this.token
  }
  checksApi.getValidCode(params).then((response) => {
    if(response.code === 1000){

      // 倒计时
      this.$nextTick(()=>{this._countDown()})
      clearInterval(this.play)
      this.verNum = ''
      this.payPwd = ''
      this.balls.forEach((ele, index)=>{
        ele.show = false
        ele.verNum = ''
      })

    }else if(response.code === 1001){
      this.payPwd = ''
      this.balls.forEach((ele, index)=>{
        ele.show = false
      })
      this.$flash(response.msg)
    }else {
      this.$flash(response.msg)
    }
  })

},

// 验证验证码
validateCode(){
  clearInterval(this.play)
  this.showLoading = !this.showLoading
  let params = {
    token : this.token,
    code : this.verNum,
    goods_type : this.goods_type,
  }
  console.log(params)
  checksApi.validateCode(params).then((response) => {
    this.showLoading = !this.showLoading
    this._initKeyBoard(this.showVer) // 初始化键盘
    // this.showVer = false // 回退支付键盘
    clearInterval(this.play)

    if(response.code === 1000){
      this.showVer = false
      this.$emit('goToNext', response.data)
      this.closeFun()

    }else if(response.code === 2001){ //不确定因素
      this.showVer = false
      this.$flash(response.msg)
      this.closeFun()

    }else {
      // 清空数据
      this.verNum = ''
      this.balls.forEach((ele, index)=>{
        ele.verNum = ''
      })
      this.$flash(response.msg)
    }
  })
},