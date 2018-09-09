<template>
   <div :class="{'ct05hundredMillion':true,'ct05hundredMillion-IOS':this.$JinrSDK.isiOS}" >
      <!-- <hd :title="{name:'邀请好友领牛股'}"></hd> -->
      <!-- <div class="ct05hundredMillion-box">

      </div> -->
      <!-- <div class="content-box"> -->
         <!-- <div class="box"> -->
            <div class="content">
                <div class="center-section">
                  <h3>成功邀请<span>2</span>位好友领一周会员特权，天天领牛股！</h3>
                  <div class="text">
                      <p>1、每日2:00提前领每日牛股</p>
                      <p>2、每日投资内参速递</p>
                      <p>3、盘中直播解大盘尾盘牛股</p>
                  </div>
                  <div class="label">
                    <span>尾盘牛股</span>
                    <span>成功率95%</span>
                    <span>平均涨幅8%</span>
                  </div>
                </div>
                <div class="bottom-section">
                  <p>活动规则：</p>
                  <p>1、活动仅限鲸鱼选股平台所有会员参与；</p>
                  <p>2、活动期间，鲸鱼用户分享每日一股给好友，每2位好友注册成会鲸鱼会员，邀请者即享每日一股VIP权限一周；</p>
                  <p>3、活动期间，邀请人数不设上限，凡新增2位好友VIP权限即新增一周；</p>
                  <p>4、本活动最终解释权归鲸鱼选股所有，如有疑问，请关注鲸鱼选股（微信号：jyxuangu）咨询</p>
                </div>
            </div>
         <!-- </div> -->
      <!-- </div> -->
      <div class="btn-section">
        <p class="btn" @click="share"></p>
      </div>
   </div>
</template>
<script>
export default {
  data() {
    return {
      IsUse: true,
      shareData: {},
      // isLogin,
      isNum: 0
    };
  },
  computed: {
    token() {
      return this.$JinrSDK.token;
    }
    // isLogin() {
    //   this.$flash('login1=>')
    //   return this.$JinrSDK.isLogin;
    // }
  },
  created() {
    this.init();
    // this.$flash(`${this.$JinrSDK.isiOS}`)
  },
  mounted() {},
  methods: {
    // isLoginFun() {
    //   try {
    //     let isLogin = JinrStock.pushLogin();
    //     // this.$flash(`！----${isLogin}----`);
    //     isLogin = JSON.parse(isLogin).loginState;
    //     return isLogin;
    //   } catch (error) {
    //     return 0;
    //   }
    // },
    init() {
      this.$http("/xg/app/share", { token: this.token })
        .then(res => {
          this.shareData = res.data;
        })
        .catch(error => {});
    },
    share() {
      // this.$flash({message:JinrStock.pushLogin()})
      if (this.$JinrSDK.isLogin == 0) {
        return;
      }
      let { share_img, share_remark, share_title, share_url } = this.shareData;
      let params = {
        imageUrl: share_img, //  享图片时,图片的Url,分享活动时,分享卡片的小图Url,不能为空
        description: share_remark, //  分享的文案,不能为空
        title: share_title, //  分享的标题,不能为空
        url: share_url //  分享活动时,活动的网站链接地址,分享图片的时候可以为空字符串
      };
      this.$JinrSDK.showShare(params);
      // JinrStock.showShare(
      //   String(share_url),
      //   String(share_title),
      //   String(share_img),
      //   String(share_remark)
      // );
    }
  }
};
</script>
<style lang="scss">
.ct05hundredMillion {
  width: 100%;
  // height: 100%;
  padding-bottom: 50px;
  position: relative;
  // overflow: hidden;
  // position: absolute;
  // top:0;
  // left:0;
  // .content-box {
  //   width: 100%;
  //   height: 100%;
  //   overflow: scroll;
  // }
  // .box {
  //   padding-bottom: 150px;
  // }
  .content {
    width: 100%;
    height: 1553px;
    background: url("./images/invite_bg.png") no-repeat 100%/100%;
    position: relative;

    // overflow: scroll;
    .center-section {
      width: 100%;
      height: 380px;
      position: absolute;
      top: 705px;
      text-align: center;
      h3 {
        color: #fff;
        font-size: 32px;
        margin-top: -58px;
      }
      .text {
        margin: 130px 0 35px 0;
        text-align: left;
        padding: 0 75px;
        font-size: 26px;
        line-height: 48px;
      }
      .label {
        display: flex;
        justify-content: space-around;
        padding: 0 65px;
        box-sizing: border-box;
        span {
          flex: 1;
          font-size: 21px;
          margin-right: 40px;
          line-height: 48px;
          background: #ff4d00;
          color: #fff;
          border-radius: 20px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
    .bottom-section {
      font-size: 21px;
      position: absolute;
      width: 100%;
      bottom: 180px;
      left: 0;
      padding: 0 50px;
      box-sizing: border-box;
      > p {
        &:first-child {
          line-height: 58px;
        }
      }
    }
  }
  > .btn-section {
    width: 100%;
    height: 152px;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    // margin-top: 100px;
    p.btn {
      height: 656px;
      height: 150px;
      background: url("./images/bottom-section_btn.png") no-repeat 100%/100%;
      margin: 0 auto;
    }
  }
}
.ct05hundredMillion-IOS {
  padding-bottom: 150px;
  > .btn-section {
    bottom: 120px;
  }
}
</style>


