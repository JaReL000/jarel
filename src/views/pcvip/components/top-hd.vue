<template>
    <div class="top-hd">
       <div class="left">
            <p>
              <a href="javascript:" @click="logoutFun">安全退出：<i class="el-icon-setting"></i></a>
            </p>
            <p>
              我的账户: <span v-text="phone"></span>
            </p>
       </div>
    </div>
</template>
<script>
export default {
  props:['phone'],
  methods:{
    logoutFun() { // 安全退出

      this.$http({
        servicename: "user.logout"
      })
        .then(response => {
          // this.clearAllCookie();
          // this.clearSessionStorage()
          console.log('xxxxxxxx')
          this.routerPush("/");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
</script>

<style lang="stylus">
  div.top-hd
    background:#2a8bf6;
    position relative;
    height:64px;
    div.left 
      text-align right;
      position: absolute;
      right:20px;
      top:10px;
      color:white;
      font-size:14px;
      line-height:24px;
      a 
        color:white;
</style>
