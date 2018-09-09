<template>
  <div id="bandcard">
    <div v-show="show && banklistshow">
      <h3 class="toptip">银行信息加密处理,保障用卡安全</h3>
      <ul>
        <li><span>银行卡号</span>
          <p v-show="!identify"><input type="text" v-model="banknum" placeholder="请输入银行卡号"></p>
          <p v-show="identify">{{banknum}}</p>
        </li>
        <li>
          <span>卡类型</span>
          <p v-show="!identify" class="selectcard">
            <select v-model="selectedbak" :disabled="identify">
              <option value="0">请选择银行卡</option>
              <option v-for="(item,index) in banklist" :value="item.bankid" :key="index">{{item.bank_name}}</option>
            </select></p>
            <p v-show="identify">{{bankname}}</p>
        </li>
        <li><span>姓名</span>
          <p v-show="!identify"><input type="text" v-model="username" placeholder="请输入姓名"></p>
          <p v-show="identify">{{username}}</p></li>
        <li><span>证件号</span>
          <p v-show="!identify"><input type="text" v-model="userIdnum" placeholder="请输入证件号码"></p>
          <p v-show="identify">{{userIdnum}}</p>
        </li>
      </ul>
      <h3 class="toptip">*个人信息仅用于银行验证</h3>
      <ul>
        <li><span>手机号码</span>
          <p v-show="!identify"><input type="text" placeholder="请输入银行预留手机号" v-model="telnum"></p>
          <p v-show="identify">{{telnum}}</p>
        </li>
      </ul>
      <div class="fwxy" v-show="!identify">
        <label @click="agreement=!agreement"><span class="agreebtn " :class="{agreebtnyes:agreement}"></span>同意</label>
        <router-link to="/treaty/user">《鲸鱼用户服务协议》</router-link>
        <div class="confirmbox">
          <button :class="{abled:agreement}" :disabled="!agreement" @click="submitcomfirm()">下一步</button>
        </div>
      </div>

      <!-- <messageboad
        v-show="messageshow" 
        :timeController="messagetimmer"
        @getmessageReset="messagetimmer = false"
        @getmessage = "submitcomfirm()"
        ></messageboad> -->

      <!-- <transition name="slide">
        <passwordboad v-show="passwordshow"></passwordboad>
      </transition> -->
    </div>
  </div>
</template>
<script>

export default {
  data(){
    return{
      responseing: false,
      agreement:true, //
      username:'',  //姓名
      userIdnum:'',  //身份证号码
      identify:false, //用于判断是否已经绑定银行卡
      banklist:[],    //可使用的银行卡
      bankname:'',    //获取已绑卡的银行名称

      // passwordshow:false, //控制设置密码组件展示
      // messageshow:false, //控制短信验证码展示

      selectedbak:0,  //记录选择的卡类型
      banknum:'',      //输入的银行卡号
      telnum:'', //输入的银行绑定的电话号码

      // messagetimmer:false, //控制子组件发送短信验证定时器标识 

      show:false,
      banklistshow:false
    }
  },
  components:{
    // messageboad,
    // passwordboad
  
  },
  created(){
    console.log(document.title);
  },
  mounted(){
    this.getinformation()
    this.getbanklist()
  },
  watch:{
    banknum(){
      if (this.banknum && this.banknum.length>15) {
        if(this.responseing){
          return 
        }
        this.responseing = true
        let params = {
          servicename: 'bank.checkBankCardInfo',
          card_no:this.banknum || '',
        }
      this.$http(params).then((response)=>{
          this.responseing = false
          this.selectedbak = response.bank_id
        }).catch((err)=>{
          this.responseing = false
          this.selectedbak = 0
        })
      }else{
        this.selectedbak = 0
      }
    }
  },
  methods:{
    getinformation(){ //获取个人信息
      let params = {
        servicename: 'user.index',
      }
      this.$http(params).then((response)=>{
        this.username = response.userInfo.username  //获取名字
        this.userIdnum = response.userInfo.identityid //获取身份证
        this.telnum = response.bankInfo.mobile   //获取已绑卡的电话号码

        this.identify = response.bankInfo.is_bind_bankcard != 0 ? true : false //初始化绑卡状态判断字段,用于控制控件显示
        this.banknum = response.bankInfo.bank_cardno  //获取已绑卡的卡号
        this.bankname = response.bankInfo.bank_name  //获取已绑卡的银行名称

        this.show = true
      }).catch((err)=>{
        this.show = true
        console.log(err)
      })
    },
    getbanklist(){ //获取银行卡列表
      let params = {
        servicename: 'bank.bindCard',
      }
      this.$http(params).then((response)=>{
        this.banklist = response.bankInfo.bankList.list //获取银行可用列表
        this.banklistshow = true
      }).catch((err)=>{
        this.banklistshow = true
        console.log(err)
      })
    },
    submitcomfirm(){ //提交绑卡
      if(this.responseing){
        return 
      }
      this.responseing = true
      let params = {
        servicename: 'bank.submitBankCard',
        card_no:this.banknum  || '',
        bank_id:this.selectedbak  || '',
        idcard:this.userIdnum  || '',
        idcard_name:this.username  || '',
        mobile:this.telnum || ''
      }
      this.$http(params).then((response)=>{
          // this.$router.push({ 
          //     path: '/bindCard/message',
          //     query: {telnum: this.telnum}
          // })
          
          setTimeout(()=> {
            this.responseing = false
          }, 1000);
          this.routerReplace('/bindCard/message', {telnum: this.telnum})
      }).catch((err) => {
        setTimeout(()=> {
          this.responseing = false
        }, 1000);
        // this.$flash(err)
      })
      // this.messageshow =true
      // this.messagetimmer = true;
    },
    
  },
}
</script>
<style lang="stylus" scoped>
@import "~style/mixin.styl"

.toptip
  color #BBBBBB
  font-size 24px
  padding 8px 30px 0
  height 48px
  line-height 48px
  border-bottom 1px solid #E3E3E3
ul
  background #ffffff;
  li
    padding 0 30px
    height 98px
    line-height 98px
    font-size 32px
    border-bottom 1px solid #E6E6E6;
    color #333333
    span
      width 158px
      float left
    .selectcard
      position relative
      &:after
        position: absolute;
        top 35px
        right 0px
        content: " ";
        display: inline-block;
        height 20px
        width @height
        border-width: 4px 4px 0 0;
        border-color: #C4C4C4;
        border-style: solid;
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    p
      height 98px
      line-height 98px
      padding-left 160px
      select
        -webkit-appearance: listbox;
        border 0px
        color #BBBBBB
        background none
        height 98px
        line-height 98px
        position relative
        left -10px
      input 
        line-height 98px
        background none
        color #000
        &::-webkit-input-placeholder
          color #BBBBBB
    select
      width 100%
.fwxy
  padding 0 30px
  line-height 80px
  color #333333
  font-size 32px
  .xesm
    float right
  .agreebtn
    display inline-block
    width 24px
    height 24px
    background-image url("../assets/xybtn0.png")
    background-repeat no-repeat
    background-size 100% 100%
    margin-right 10px
    position relative
    top 4px
  .agreebtnyes
    background-image url("../assets/xybtn1.png")
    background-repeat no-repeat
    background-size 100% 100%
  label
    font-size 24px
  a
    color #0C72E3
    font-size 24px
.confirmbox
  padding 250px 30px 0
  button
    width 100%;
    line-height 96px
    border 0px
    // background #98C1EE
    background mColor
    border-radius 10px
    font-size 32px
    color #ffffff
  button.abled
    // background #0c72e3
    background mColor
</style>

