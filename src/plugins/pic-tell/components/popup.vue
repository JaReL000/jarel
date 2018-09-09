<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"
  .popup
    width 100%
    height 100%
    position fixed
    left 0px
    right 0px
    top 0px
    bottom 0px
    background rgba(0,0,0,.5)
    .popup-con
      width 100%
      height 340px
      background #fff
      position fixed
      bottom 0px
      overflow hidden
      button
        display block
        width 698px
        height 95px
        outline none
        border 0
        border-radius 4px
        background #0c72e3
        color #fff
        text-align center
        line-height 95px
        font-size 33px
        margin 0 auto
      button:nth-of-type(1)
        margin 52px auto 45px auto
      button:nth-of-type(2)
        background #ffffff
        color #0c72e3
        border 1px solid #0c72e3
  .show-enter-active 
    opacity  1
    transition  opacity .3s
    -webkit-transition  opacity .3s
  .show-leave-active 
    opacity  1
    transition  opacity .3s
    -webkit-transition  opacity .3s
  .show-enter  
    opacity  0.1
  .show-leave-active 
    opacity  0.1



</style>
<template>
    <transition name='show'>
      <div class="popup" v-show='showOrHide' @click.stop="hideMask">
        <div class="popup-con" @click.stop='preventHide'>
          <button id="cpLink" @click.stop="copyLink">复制</button>
          <button @click.stop='quxiao'>取消</button>
        </div>
      </div>
    </transition>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        
      }
    },
    props:['showOrHide','selectVal'],
    computed: {},
    watch: {},
    created() {

    },
    mounted() {},
    methods: {
      hideMask(){
        this.$emit('changeMask',false)
      },
      preventHide(){

      },
      quxiao(){
        this.$emit('changeMask',false)
      },
      copyLink(){
        var temp = document.createElement("input")
        temp.setAttribute("value",this.selectVal)
        document.body.appendChild(temp)
        temp.select()
        document.execCommand("copy")
        document.body.removeChild(temp)
        this.hideMask()
      }
    }
  }
</script>
