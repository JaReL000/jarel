<template>
  <div id="bindaread">
    <div class="bindar-box">
      <div class="tabbox" :style="{backgroundImage: 'url(' + image + ')'}">
        <!-- <img :src="bank.image+'_enable_logo_48x48.png'"> -->
        <p>{{bank.bank_name}}</p>
        <div><span>**** **** **** </span> <label v-text="bank.card_last"></label></div>
      </div>
    </div>
    <!-- <router-link to="/explain/unbind">
      <div class="jbcard">解绑银行卡</div>
    </router-link> -->
  </div>
</template>

<script>
export default {
  data(){
    return{
      bank:{ //银行卡信息

      },
      image:'' //银行背景图片
    }
  },
  created() {
    let params = {
      servicename: 'user.index',
    }
    this.$http(params).then((response) => {
        console.log(response)
        this.bank = response.bankInfo
        this.image = response.bankInfo.image+'_enable_back.png'
    }).catch(err => {
      // this.$flash(err)
    });
  },
}
</script>

<style lang="stylus" scoped>
  .jbcard
    height 100px
    line-height 100px
    font-size 32px
    background #ffffff
    color #525252
    margin-top 20px
    padding 0 30px
    position relative
    &:after
      position: absolute;
      top: 35px;
      right: 30px;
      content: " ";
      display: inline-block;
      height: 0.2666rem;
      width: 0.2666rem;
      border-width: 4px 4px 0 0;
      border-color: #c4c4c4;
      border-style: solid;
      -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
      transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  .bindar-box
    padding 30px
    .tabbox
      height 200px
      padding 20px
      border-radius 20px
      background-size 100% 100%
      img
        float left
        width 100px
        border-radius 100px
        height 100px
        color #ffffff
      p
        float left
        line-height 110px
        margin-left 100px;
        font-size 32px
        padding 0 30px
        color #ffffff
      div
        clear both
        text-align center
        color #ffffff
        line-height 100px
        font-size 32px
        span 
          vertical-align middle
          margin-top 20px
          line-height 100px
          display inline-block
          font-size 60px
        label 
          vertical-align middle
          line-height 100px
          font-size 60px
          display inline-block
</style>





