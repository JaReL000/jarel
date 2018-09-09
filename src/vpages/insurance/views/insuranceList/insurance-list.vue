<template>
   <div class="insuranceList" >
       <hd :title="{name:$route.meta}" :fixed="true"></hd>
       <div class="content-box">
          <div class="content" ref="insuranceListContent">
                <!-- 投保人信息 -->
              <div class="section">
                  <h4>投保人信息</h4>
                  <div class="item">
                    <label>为谁投保</label>
                    <div class="nav">
                        <span v-for="(item,key) in b_relations" :key='key'
                        @click="Relationship(key)"
                        :class="{'active':formData.b_relation==key}"
                        v-text="b_relations[key]"
                        ></span>
                    </div>
                  </div>
                    <div class="item">
                        <label>姓名</label>
                        <input type="text" placeholder="请填写" :value="formData.t_name" readonly>
                    </div>
                    <div class="item">
                        <label>证件类型</label>
                        <input type="text" value="身份证"  readonly>
                    </div>
                    <div class="item">
                        <label>证件号码</label>
                        <input type="text" placeholder="请填写" v-model="formData.t_paper_num">
                    </div>
                    <div class="item">
                        <label>性别</label>
                         <div>
                          <p  :class="{'active':formData.t_sex==1}">男</p>
                          <p  :class="{'active':formData.t_sex==2}">女</p>
                        </div>
                    </div>
                    <div class="item">
                        <label>手机号码</label>
                        <input type="text" placeholder="请填写银行卡所绑定的手机号码" v-model="formData.tel">
                    </div>
                    <div class="item" v-if="formData.b_relation==1">
                        <label>职业列表</label>
                        <!-- <input type="text" placeholder="请选择" v-model="formData.zylb_name" @click="select"> -->
                        <p  @click="select" class="professional jobLeft">
                          <span v-if="!viewData.zylb_name" class="placeholder">请选择职业</span>
                          <span v-else v-text="viewData.zylb_name"></span>
                        </p>
                    </div>
              </div>
                <!-- 被保人信息 -->
              <div class="section" v-if="formData.b_relation!=1">
                  <h4>被保人信息</h4>
                    <div class="item">
                        <label>姓名</label>
                        <input type="text" placeholder="请填写" v-model="formData.b_name">
                    </div>
                    <div class="item">
                        <label>证件类型</label>
                        <input type="text" value="身份证"  readonly>
                    </div>
                    <div class="item">
                        <label>证件号码</label>
                        <input type="text" placeholder="请填写" v-model="formData.b_paper_num" @input="getPrice(formData.b_paper_num)">
                    </div>
                    <div class="item">
                        <label>性别</label>
                         <div>
                          <p  :class="{'active':formData.b_sex==1}">男</p>
                          <p  :class="{'active':formData.b_sex==2}">女</p>
                        </div>
                    </div>
                    <!-- <div class="item">
                        <label>手机号码</label>
                        <input type="text" placeholder="请填写银行卡所绑定的手机号码" v-model="formData.tel">
                    </div> -->
                    <div class="item">
                        <label>职业列表</label>
                        <!-- <input type="text" placeholder="请选择" v-model="formData.zylb_name" @click="select"> -->
                        <p  @click="select" class="professional">
                          <span v-if="!viewData.zylb_name" class="placeholder">请选择职业</span>
                          <span v-else v-text="viewData.zylb_name"></span>
                        </p>
                    </div>
              </div>
              <!-- 其他信息 -->
              <div class="section">
                    <h4>其他信息</h4>
                    <div class="item">
                        <label>电子邮箱</label>
                        <input type="text" placeholder="选填" v-model="formData.email">
                        <!-- <p @click="deateSelect"><span v-text="formData.s_time"></span></p> -->
                    </div>
                    <div class="item">
                        <label>起保日期</label>
                        <!-- <input type="text" placeholder="请填写" v-model="formData.s_time"> -->
                        <p @click="deateSelect"><span v-text="formData.s_time"></span></p>
                    </div>
                    <div class="item">
                        <label>受益人</label>
                        <input type="text" value="法定受益人"  readonly>
                    </div>
              </div>
            <h4><i
            @click="isAgree=!isAgree"
            :class="{'agreement':true,'check':isAgree}"
            ></i> 我已阅读并同意<router-link to="/information?index=1">《保险条款》</router-link>和<router-link to="/agreement?index=1">《重要告知于声明》</router-link></h4>
          </div>
       </div>
        <component :is="cp" v-model="show" @Change="dialogChage"></component>
       <div class="btn fixed-x">
          <p>价格：<span v-text="parseFloat(formData.trade_money).toFixed(2)"></span></p>
          <p @click="submit">提交保单</p>
       </div>
   </div>
</template>
<script>
import dialog from "./dialog";
// import { constants } from 'http2';
export default {
  data() {
    return {
      formData: {
        tel: "", // 手机号
        t_name: "", // 投保人姓名
        t_paper_num: "", // 投保人证件号
        t_paper_type: "1", // 投保人证件类型 1身份证 2护照  8其他
        // t_birth: "2018-8-22", // 投保人出生日期
        t_sex: "", // 投保人性别 1男  2女
        b_relation: 1, // 投保关系  1 本人、2 配偶、4子女、6 父母、8其他
        b_name: "", // 被保人姓名
        b_paper_num: "", // 被保人证件号
        b_paper_type: "1", // 被保人证件类型 1身份证 2护照 8其他
        // b_birth: "2018-8-23", // 被保人出生日期
        b_sex: "", // 被保人性别    1男  2女
        plan_type: "", // 投保计划（0，1，2）
        bz_money: "", // 是否有社保0 无  1 有
        s_time: "", // 投保时间（2018-04-14）
        email: "", // 邮箱
        user_id: "", // 用户id
        // zylb_name: "", // 投保人职业名
        zylb: "", // 接口（获取职业类型ApiJyb/job_list）获取（即三级的id）
        trade_money: ""
      },
      show: false, // 控制职业选择模态框
      cp: null, // 职业选择模态框
      b_relations: { 1: "本人", 13: "配偶", 12: "子女", 11: "父母" },
      userData: {}, // 用户信息
      // price: "",
      isAgree: false,
      viewData: {
        zylb_name: ""
      },
      reqSign: false // 节流，请求是否结束
    };
  },
  // beforeRouteEnter(to,form,next){
  //   // console.log(to,'xxx',form)
  //   if(form.fullPath === '/payment'){ // 不能从支付页面返回订单
  //     next('/');
  //   }
  //   next();
  // },
  created() {
    this.init();
    // console.log('xxxxx', this.userData)
    // console.log('---isiOS----', this.$flash({
    //   message:this.$JinrSDK.isiOS
    // }))
  },
  mounted() {},
  components: {
    // dialog
  },
  computed: {
    appData() {
      return this.sessionGet("appData");
    }
  },
  methods: {
    init() {
      this.userData = this.sessionGet("userData");
      this.formData.s_time = this.getDate();
      this.formData.trade_money = this.userData.price;
      this.formData.t_name = this.userData.username || "";
      this.formData.tel = this.userData.bankcard_mobile || "";
      this.formData.t_paper_num = this.userData.identityid || "";
      // 自动填充投保人信息
      this.Relationship(this.formData.b_relation);
      // console.log("---------", this.userData);
      // console.log('===', this.userData)
    },
    submit() {
      let appData = {};
      this.formData.bz_money = this.userData.bz_money; // 是否有社保
      this.formData.plan_type = this.userData.plan_type; //投保计划
      this.formData.user_id = this.userData.userid;
      this.formData.cardNo = this.userData.bank_cardno; ///612522199108222812

      // appData.appid = this.$JinrSDK.appid;
      appData.appid = "jinr_baigebao"; // 固定写死84
      appData.v = "1.0.4"; // 接口版本号
      appData.app_v = this.appData.token || this.$JinrSDK.app_v;
      appData.token = this.appData.appData || this.$JinrSDK.token;
      // this.formData.trade_money = this.price
      // this.formData.s_time = this.getDate(); // 重新获取起保日期
      // this.check()
      if (this.check()) {
        if (this.reqSign) return;
        this.formData.b_birth = this.getBirth(this.formData.b_paper_num); // 投保人生日
        this.formData.t_birth = this.getBirth(this.formData.t_paper_num); // 被保人生日
        this.reqSign = true;
        this.$http(
          "/api/generateOrder",
          Object.assign({}, this.formData, appData),
          "post"
        )
          .then(res => {
            this.reqSign = false;
            if (res.code == 0) {
              this.sessionSet("orderID", res.data);
              this.$router.replace("/payment");
            } else if (res.code == -1) {
              if (res.data.status == 1100) {
                if (res.data.data == 2) {
                  this.$flash("您已购买过改关系类型保险，请在我的保险中查看");
                  setTimeout(() => {
                    this.$router.replace("/");
                  }, 1000);
                } else {
                  this.$flash("订单已提交成功，请在待支付列表中查看");
                  setTimeout(() => {
                    this.$router.replace("/myInsurance?index=3");
                  }, 1000);
                }
              } else {
                this.$flash({
                  message: res.data.data || "code-1提交失败"
                });
              }
            } else {
              this.$flash({
                message: res.data || "提交失败"
              });
            }
          })
          .catch(err => {
            this.reqSign = false;
            this.$flash({
              message: err.msg || "err,请求超时"
            });
          });
      }
    },
    select() {
      this.cp = dialog;
      this.show = true;
    },
    //b_relations
    Relationship(key) {
      // console.log('key', key)
      this.formData.b_relation = key;
      // this.
      if (key == 1) {
        // 被保人为本人时，同步投保人与被保人信息
        this.formData.b_name = this.formData.t_name;
        this.formData.b_paper_num = this.formData.t_paper_num;
        // this.formData.b_paper_type = this.formData.t_paper_type;
        this.formData.b_sex = this.formData.t_sex;
        //  this.$flash('进来了####')
        this.getPrice(this.formData.b_paper_num);
      } else {
        // 不等于1时清空被保人信息
        this.viewData.zylb_name = "";
        this.formData.b_name = "";
        this.formData.b_paper_num = "";
        // this.formData.b_paper_type = '';
        this.formData.b_sex = "";
      }
    },
    dialogChage(opt) {
      // 获取被保人职业
      console.log("opt", opt);
      this.viewData.zylb_name = opt.name;
      this.formData.zylb = opt.id;
      this.show = false;
    },
    check(value, sign) {
      console.log("key", this.formData);
      let formData = this.formData;
      // 身份证正则
      let IdCard = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
      // 手机号码正则
      let phone = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
      //姓名正则
      let name = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
      // 正则邮箱验证
      let email = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
      console.log("formData", formData);
      for (let key in formData) {
        // 验证是否有未填写的信息
        formData[key] = String(formData[key]).trim();
        if (!formData[key] && formData[key] !== 0 && key != "email") {
          this.$flash("请填写所需资料");
          return false;
        }
      }
      if (!IdCard.test(formData.t_paper_num)) {
        this.$flash("投保人证件号输入有误");
        return false;
      } else if (!IdCard.test(formData.b_paper_num)) {
        this.$flash("被保人证件号输入有误");
        return false;
      } else if (!phone.test(formData.tel)) {
        // console.log(formData.tel);
        this.$flash("手机号码输入有误");
        return false;
      } else if (formData.tel !== this.userData.bankcard_mobile) {
        this.$flash("输入手机号与银行预留手机号不一致，请重新输入");
        console.log("-tel---");
        return false;
      } else if (!name.test(formData.b_name)) {
        this.$flash("被保人姓名输入有误");
        return false;
      } else if (formData.email && !email.test(formData.email)) {
        this.$flash("请填写正确邮箱，或者不填");
        return false;
      } else if (!this.isAgree) {
        this.$flash("请同意保险条款");
        // window.scrollTo(0,2000);
        return false;
      } else {
        return true;
      }

      console.log("-----", this.formData);
    },
    getDate() {
      let date = new Date();
      date.setDate(date.getDate() + 1);
      let month =
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1;
      let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
      return `${date.getFullYear()}-${month}-${
        date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
      }`;
      // console.log('temp', temp)
    },
    deateSelect() {
      //初始化日期选择器
      let startTime = this.getDate().split("-")[0];
      let _this = this;
      this.$picker.show({
        type: "datePicker",
        limit: [startTime, 2060],
        date: this.getDate(),
        onOk(date) {
          // this.$flash({
          //   message:_this.getDate()
          // })
          if (new Date(date).getTime() < new Date(_this.getDate()).getTime()) {
            this.$flash("起保时间最早为次日00:00:00");
            return;
          }
          let today = new Date();
          today.setDate(today.getDate() + 31);
          if (today.getTime() < new Date(date).getTime()) {
            this.$flash("起保日期最晚为30天后");
            return;
          }
          //  console.log(today.getTime()>new Date(date).getTime())
          //  console.log(startTime,date, new Date(_this.getDate()).getTime(), new Date(date).getTime())
          _this.formData.s_time = date;
        }
      });
    },
    getBirth(val) {
      // 从身份证中获取日期
      console.log("val---", val);
      val = String(val);
      let year;
      if (val.length === 15) {
        year =
          "19" +
          val.substring(6, 8) +
          "-" +
          val.substring(8, 10) +
          "-" +
          val.substring(10, 12);
      } else if (val.length === 18) {
        year =
          val.substring(6, 10) +
          "-" +
          val.substring(10, 12) +
          "-" +
          val.substring(12, 14);
      } else {
        this.$flash("身份证号码有误");
      }
      return year;
    },
    getPrice(val) {
      // 根据被保人身份证获取保险价格
      // console.log("vla----", this.userData);
      // 身份证正则
      let IdCard = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
      // if(val===15||val===18){
      if (IdCard.test(val)) {
        this.$http(
          "/api/getPrice",
          {
            planType: this.userData.plan_type, // 投保计划
            bzMoney: this.userData.bz_money, // 有无社保
            ageRange: this.getBirth(val) // 生日
          },
          "get"
        ).then(({ data: res }) => {
          this.formData.trade_money = res.price;
        });
      }
      // }
      // this.$http('/api/getPrice')
    },
    // 根据身份证号获取性别
    getSex(num) {
      // 身份证正则
      let IdCard = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
      if (!IdCard.test(num)) {
        return false;
      }
      if (num.length === 15) {
        // 奇数为男，偶数为女
        return !!(num[14] % 2) ? 1 : 2;
      } else if (num.length === 18) {
        return !!(num[16] % 2) ? 1 : 2;
      }
    }
  },
  watch: {
    show(isSHow) {
      if (!isSHow) {
        this.cp = null;
      }
    },
    "formData.b_name"(val) {
      if (this.formData.b_relation == 1) return;
      if (val === this.formData.t_name && val !== "") {
        console.log("");
        this.$flash("投保人与被保人信息一致，请重新输入");
        this.formData.b_name = "";
      }
      console.log("----", val);
    },
    "formData.tel"(val) {
      // 手机号码正则
      // let phone = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
      if (val.length === 11) {
        if (val !== this.userData.bankcard_mobile) {
          // this.formData.tel = ''
          this.$flash("输入手机号与银行预留手机号不一致，请重新输入");
        }
      } else if (val.length > 11) {
        this.formData.tel = val.substring(0, 11);
      }
    },
    "formData.t_paper_num"(val) {
      val = val.trim();
      this.formData.t_sex = this.getSex(val);
      // console.log("1身份证变化了", this.formData.t_sex);
    },
    "formData.b_paper_num"(val) {
      val = val.trim();
      this.formData.b_sex = this.getSex(val);
      // console.log("2变化了", this.formData.b_sex);
    }
  }
};
</script>
style.<style lang="scss">
.insuranceList {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  font-size: 28px;
  .content-box {
    overflow-y: scroll;
    height: 100%;
    .content {
      padding: 90px 0;
      .section {
        > h4 {
          line-height: 104px;
          font-size: 32px;
          color: #333;
          background: #f5f5f5;
          text-align: center;
        }
        > .item {
          padding: 0 30px;
          display: flex;
          line-height: 104px;
          border-bottom: 1px solid #e5e5e5;
          > label {
            padding-right: 30px;
            width: 130px;
          }
          > div {
            flex: 1;
            &.nav {
              display: flex;
              justify-content: space-around;
              align-items: center;
              > span {
                width: 88px;
                text-align: center;
                margin-right: 16px;
                height: 52px;
                border: 1px solid #c5c5c5;
                line-height: 52px;
                border-radius: 10px;
                &.active {
                  background: #0c72e3;
                  color: white;
                  border: none;
                }
              }
            }
          }
          > input {
            flex: 1;
            &:focus {
              // color:red
            }
          }
          > div {
            display: flex;
            // justify-content: space-aro;
            > p {
              width: 100px;
              // background:hotpink;
              display: flex;
              align-items: center;
              &:before {
                content: "";
                display: inline-block;
                width: 33px;
                height: 33px;
                background: url("./images/insuranceList_no-check.png") no-repeat
                  100%/100%;
                // vertical-align: middle;
                margin-right: 20px;
              }
              &:last-child {
                margin-left: 80px;
              }
              &.active {
                &::before {
                  background: url("./images/insuranceList_check.png") no-repeat
                    100%/100%;
                }
              }
            }
          }
          > p {
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            &::after {
              content: "";
              width: 34px;
              height: 35px;
              background: url("./images/insuranceList_date_logo.png") no-repeat
                100%/100%;
            }
            > span.placeholder {
              color: #b2b2b2;
            }
            &.professional {
              display: flex;
              justify-content: space-between;
              align-items: center;
              line-height: 42px;
              font-size: 28px;
              &::after {
                content: "";
                width: 20px;
                height: 20px;
                border-top: 1px solid #999999;
                border-right: 1px solid #999999;
                display: inline-block;
                background-image: none;
                transform: rotateZ(45deg);
              }
            }
          }
        }
      }
      > h4 {
        padding: 0 30px;
        line-height: 102px;
        background: #f5f5f5;
        margin-bottom: 104px;
        position: relative;
        font-size: 24px;
        padding-left: 90px;
        > a {
          color: #0c72e3;
        }
        > i.agreement {
          width: 33px;
          height: 33px;
          box-sizing: border-box;
          position: absolute;
          left: 30px;
          top: 50%;
          transform: translate(0, -50%);
          background: url("./images/insuranceList_no-check.png") no-repeat 100%/100%;
          &.check {
            background: url("./images/insuranceList_check.png") no-repeat 100%/100%;
          }
        }
      }
    }
  }
  > div.btn {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    background: #fff;
    border-top: 1px solid #e5e5e5;
    > p {
      flex: 1;
      height: 104px;
      text-align: center;
      line-height: 104px;
      font-size: 30px;
      > span {
        padding-left: 40px;
        color: #0c72e3;
        font-size: 48px;
        &::before {
          content: "¥";
          font-size: 30px;
          margin: 0 10px;
        }
      }
      &:first-child {
        text-align: left;
        padding-left: 30px;
      }
      &:last-child {
        background: #0c72e3;
        color: #fff;
      }
    }
  }
}
</style>


