export default{
  data(){
    return{
      touchStartY: '',
      touchEndY:'',
      isGoBottom: false,
      // scroll: '',
      // target:'',
      // istouch: false
    }
  },
  methods:{
    scrollFun(a){
      let scroll = this.$refs.picTellBox.scrollTop
      let target = this.$refs.picTellCont.clientHeight - this.$refs.picTellBox.clientHeight-3
      // this.scroll = scroll
      // this.target = target
      console.log('到底了',scroll, target)
      if(scroll>=target){
        // setTimeout(() => {
          this.isGoBottom = true
        // }, 50);
        // this.routerReplace('/picTell/jinrAdvantage')
      }else{
        this.isGoBottom = false
      }
    },
    startEvent(e){
      this.touchStartY  = e.touches[0].clientY
      // e.preventDefault()
      // console.log('e-----', e.preventDefault)
    },
    endEvent(e){
      let touchEndY  = e.changedTouches[0].clientY
      console.log('this.', touchEndY)
      // this.istouch = true
      if( this.touchStartY-touchEndY > 0&&this.isGoBottom){
          console.log('下一页')
          // this.istouch = true
          this.nextPage()
      }
    },
    cancelTouch(e){
      let touchEndY  = e.changedTouches[0].clientY
      // console.log('xxxxxxxxx', this.touchStartY,'...', touchY)
        if( this.touchStartY-touchEndY > 0&&this.isGoBottom){
          console.log('下一页')
          // this.istouch = true
          this.nextPage()
       }
    }
  },
  mounted(){
    // console.log('this,', this.$refs.jinrTreaty)
    if(!this.$refs.picTellBox)return
    this.$refs.picTellBox.addEventListener('scroll',this.scrollFun,false)
    this.$refs.picTellBox.addEventListener('touchstart',this.startEvent,false)
    // this.$refs.picTellBox.addEventListener('touchend',this.endEvent, false)
    this.$refs.picTellBox.addEventListener('touchmove',this.endEvent)
  }
}