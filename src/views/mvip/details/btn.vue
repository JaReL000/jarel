<template>
  <div class="invest-btn fixed-x" @click="goToUrl">
    <div class="invest-btncenter">
      <a :class="{ open: isOpen}">{{content}}</a>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    content: {
      type: String
    },
    isOpen: {
      type: Number
    },
    isOutOpen: {
      type: Number
    },
    isLogin: {
      type: Boolean
    },
    isShow:{
      type: Boolean
    }
  },
  methods: {
    goToUrl(){
      
      if(this.isOpen !== 0){
        if(!this.isLogin){
          this.routerReplace('/login')
          return
        }
        this.$router.push({
          path: `/productIn/${this.$route.params.productid}`
        })
    
      }

      
      
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~style/index.styl'

.invest-btn
  position fixed
  width 100%
  bottom 0px
  left 0px
  z-index 1
  width 100%
  background #ffffff
  .invest-btncenter
    padding 10px 30px 20px
    a
      display block
      height 96px
      line-height 96px
      text-align center
      border-radius 10px
      font-size 32px
      background-color $color-light-grey-def
      color $color-light-grey-s
      &.open
        // background-color mainColor
        background-color mColor
        color #fff
</style>


