<style lang="stylus" rel="stylesheet/stylus">

.register
  padding 26px
  .telbox
    border-bottom 1px solid #CCCCCC
    padding 66px 23px 0
    input 
      font-size 32px
      color #BEBEBE
      line-height 72px
      width 100%
      display block
  .stepnext
    padding-top 100px
    input[type="button"]
      display block
      width 100%
      background-color #0C72E3
      color #ffffff
      font-size 32px
      height 96px
      border-radius 10px
      &:disabled
        background-color #ccc
    p
      line-height 67px
      font-size 22px
      color #666666
      a
        color #0C72E3
</style>
<template>
  <transition name="fater" >
  <div class="register fixed" >
    <div class="telbox">
      <input maxlength="11" type="text" placeholder="请输入手机号码" v-model="tetnum">
      <!-- <div>{{tetnum}}</div> -->
    </div>
    <div class="stepnext">
      <input type="button" :disabled="!disable" value="下一步" @click="next()">
      <!-- <p>点击下一步，即表示您同意<router-link  to="/agreement">《鲸鱼用户服务协议》</router-link></p> -->
      <p>点击下一步，即表示您同意<router-link  to="/treaty/user">《鲸鱼用户服务协议》</router-link></p>
    </div>
  </div>
  </transition>
</template>

<script>
  import Flash from 'components/flash'

  export default {
    name: 'register',
    data() {
      return {
        tetnum:'',
        resposeing: false,
      }
    },
    computed: {
      disable(){
        return this.tetnum.length===11
      }
    },
    watch: {},
    created() {
      if(this.$route.query.tel){
        this.tetnum = this.$route.query.tel
      }
    },
    mounted() {},
    methods: {
      next(){
        //  Flash("手机号码不能为空")
        if(this.tetnum == "" || this.tetnum == null){
          this.$flash("手机号码不能为空")
        }else{
          if(this.resposeing) return
          this.resposeing = true
          this.$http({
            servicename : 'user.userMobileExist',
            mobile : this.tetnum  || '',
          }).then((response)=>{
            setTimeout(()=> {
              this.resposeing = false
            }, 1000);
            this.$router.push({
              path: '/registertwo',
              query: {
                telnum: this.tetnum,
                inviteCode: this.$route.query.inviteCode
              },
            })
          }).catch((error)=>{
            setTimeout(()=> {
              this.resposeing = false
            }, 1000);
            // this.$flash(error)
          });
        }
      }
    },
    components: {}
  }
</script>
